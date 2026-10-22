import crypto from 'crypto';

// Bounded In-Memory LRU Cache Store
const MAX_ENTRIES = 5000;
const cacheStore = new Map();

// Per-Organization Metrics Store
const orgMetricsStore = new Map();

function getOrCreateOrgMetrics(organizationId) {
  if (!orgMetricsStore.has(organizationId)) {
    orgMetricsStore.set(organizationId, {
      cacheHits: 0,
      cacheMisses: 0,
      totalTokensSaved: 0,
      totalDollarsSaved: 0
    });
  }
  return orgMetricsStore.get(organizationId);
}

export const cacheService = {
  /**
   * Generates a deterministic cache key scoped by organization, model, temperature, and messages
   */
  generateKey: (organizationId, model, messages, temperature = 0.7) => {
    let normalized = '';
    if (Array.isArray(messages)) {
      normalized = messages.map(m => `${m.role}:${(m.content || '').trim()}`).join('|');
    } else if (typeof messages === 'string') {
      normalized = messages.trim();
    }
    const hash = crypto.createHash('sha256').update(`${organizationId}:${model}:${temperature}:${normalized}`).digest('hex');
    return `cache:${organizationId}:${hash}`;
  },

  /**
   * Retrieves a cached response if valid and refreshes LRU recency
   */
  get: (key) => {
    // Extract organizationId from key format `cache:${organizationId}:${hash}`
    const parts = key.split(':');
    const organizationId = parts.length >= 3 ? parts[1] : 'global';
    const metrics = getOrCreateOrgMetrics(organizationId);

    const entry = cacheStore.get(key);
    if (!entry) {
      metrics.cacheMisses++;
      return null;
    }

    // Check TTL expiration
    if (Date.now() > entry.expiresAt) {
      cacheStore.delete(key);
      metrics.cacheMisses++;
      return null;
    }

    // Refresh LRU recency (delete and re-insert puts key at end of Map)
    cacheStore.delete(key);
    cacheStore.set(key, entry);

    metrics.cacheHits++;
    metrics.totalTokensSaved += (entry.data.usage?.total_tokens || 0);
    metrics.totalDollarsSaved += (entry.data.unillm_telemetry?.costUsd || 0);

    return entry.data;
  },

  /**
   * Stores a completion in cache with TTL and enforces bounded LRU capacity
   */
  set: (key, data, ttlSeconds = 3600) => {
    // If key already exists, delete it first to refresh insertion order
    if (cacheStore.has(key)) {
      cacheStore.delete(key);
    } else if (cacheStore.size >= MAX_ENTRIES) {
      // LRU Eviction: Remove the oldest (first) entry in the Map
      const oldestKey = cacheStore.keys().next().value;
      if (oldestKey) {
        cacheStore.delete(oldestKey);
      }
    }

    cacheStore.set(key, {
      data,
      expiresAt: Date.now() + (ttlSeconds * 1000)
    });
  },

  /**
   * Returns cache metrics scoped strictly to the requesting organization
   */
  getMetrics: (organizationId = null) => {
    if (!organizationId) {
      // Global overview (internal/server use)
      let totalHits = 0;
      let totalMisses = 0;
      let totalTokens = 0;
      let totalDollars = 0;

      for (const m of orgMetricsStore.values()) {
        totalHits += m.cacheHits;
        totalMisses += m.cacheMisses;
        totalTokens += m.totalTokensSaved;
        totalDollars += m.totalDollarsSaved;
      }

      const total = totalHits + totalMisses;
      const hitRate = total > 0 ? ((totalHits / total) * 100).toFixed(1) : '0.0';

      return {
        entriesCount: cacheStore.size,
        maxCapacity: MAX_ENTRIES,
        cacheHits: totalHits,
        cacheMisses: totalMisses,
        hitRate: parseFloat(hitRate),
        totalTokensSaved: totalTokens,
        totalDollarsSaved: parseFloat(totalDollars.toFixed(6))
      };
    }

    // Organization-Scoped Metrics
    const metrics = getOrCreateOrgMetrics(organizationId);
    
    // Count active non-expired entries belonging to this organization
    let orgEntriesCount = 0;
    const now = Date.now();
    const prefix = `cache:${organizationId}:`;

    for (const [k, v] of cacheStore.entries()) {
      if (k.startsWith(prefix)) {
        if (now <= v.expiresAt) {
          orgEntriesCount++;
        }
      }
    }

    const total = metrics.cacheHits + metrics.cacheMisses;
    const hitRate = total > 0 ? ((metrics.cacheHits / total) * 100).toFixed(1) : '0.0';

    return {
      entriesCount: orgEntriesCount,
      maxCapacity: MAX_ENTRIES,
      cacheHits: metrics.cacheHits,
      cacheMisses: metrics.cacheMisses,
      hitRate: parseFloat(hitRate),
      totalTokensSaved: metrics.totalTokensSaved,
      totalDollarsSaved: parseFloat(metrics.totalDollarsSaved.toFixed(6))
    };
  },

  /**
   * Clears cache entries belonging ONLY to the specified organization
   */
  clearOrganization: (organizationId) => {
    if (!organizationId) return 0;
    const prefix = `cache:${organizationId}:`;
    let deletedCount = 0;

    for (const key of cacheStore.keys()) {
      if (key.startsWith(prefix)) {
        cacheStore.delete(key);
        deletedCount++;
      }
    }

    return deletedCount;
  },

  /**
   * Clears all cache entries across all organizations (for internal testing/maintenance only)
   */
  clear: () => {
    cacheStore.clear();
    orgMetricsStore.clear();
  }
};
