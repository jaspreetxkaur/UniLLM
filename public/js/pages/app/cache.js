// APP PAGE: cache (Database & In-Memory Live Engine)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function appCache() {
  return `
    <div class="flex flex-col gap-8 animate-fade-in-up font-sans select-none max-w-6xl">
      <!-- Top Title Bar -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#292D34] pb-5">
        <div class="flex flex-col gap-1">
          <span class="text-[9px] font-bold text-white uppercase tracking-widest">Performance Optimization</span>
          <h1 class="font-display font-black text-3xl text-white uppercase leading-none">Smart Semantic Cache</h1>
          <p class="text-xs text-[#A1A5AD] font-semibold mt-1">Serve cached LLM completions in sub-15ms and eliminate duplicate upstream token costs.</p>
        </div>
        <div class="flex items-center gap-3">
          <button id="purge-cache-btn" class="px-4 py-2 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center gap-1.5">
            <span>🗑️</span>
            <span>Purge Vector Cache</span>
          </button>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div class="p-5 bg-white border border-[#292D34] rounded-2xl shadow-xs flex flex-col gap-1.5">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cache Hit Ratio</span>
          <div class="flex items-baseline gap-2">
            <span id="cache-stat-hitrate" class="text-3xl font-display font-black text-emerald-600 font-mono">...</span>
          </div>
          <span class="text-[10px] text-slate-400 font-semibold">Real-time hit rate</span>
        </div>

        <div class="p-5 bg-white border border-[#292D34] rounded-2xl shadow-xs flex flex-col gap-1.5">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Spend Saved</span>
          <div class="flex items-baseline gap-2">
            <span id="cache-stat-saved-spend" class="text-3xl font-display font-black text-white font-mono">...</span>
          </div>
          <span class="text-[10px] text-slate-400 font-semibold">Avoided token API calls</span>
        </div>

        <div class="p-5 bg-white border border-[#292D34] rounded-2xl shadow-xs flex flex-col gap-1.5">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Cached Keys</span>
          <div class="flex items-baseline gap-2">
            <span id="cache-stat-entries" class="text-3xl font-display font-black text-slate-800 font-mono">...</span>
          </div>
          <span class="text-[10px] text-slate-400 font-semibold">Active semantic vectors</span>
        </div>

        <div class="p-5 bg-white border border-[#292D34] rounded-2xl shadow-xs flex flex-col gap-1.5">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cache Response Latency</span>
          <div class="flex items-baseline gap-2">
            <span class="text-3xl font-display font-black text-purple-600 font-mono">~12ms</span>
          </div>
          <span class="text-[10px] text-slate-400 font-semibold">Direct memory HIT</span>
        </div>
      </div>

      <!-- Cache Configuration Controls -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div class="lg:col-span-7 bg-white border border-[#292D34] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
          <div class="flex justify-between items-center border-b pb-4">
            <div class="flex flex-col">
              <h3 class="font-bold text-base text-slate-900">Deterministic Matching Configuration</h3>
              <p class="text-xs text-slate-500 font-semibold">Tune how UniLLM checks and stores repeated user prompts.</p>
            </div>
          </div>

          <div class="flex flex-col gap-3">
            <div class="flex justify-between items-center text-xs font-bold">
              <label class="text-slate-700">Similarity Hash Algorithm</label>
              <span class="font-mono text-white bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">SHA-256 (Normalized)</span>
            </div>
            <div class="p-3 bg-slate-50 border rounded-xl text-xs text-slate-600">
              ⚡ <strong>Zero Token Latency:</strong> When identical prompts are submitted, UniLLM intercepts the request before dispatching upstream, returning instant cached completions and recording <code>cache_status = 'HIT'</code> in PostgreSQL.
            </div>
          </div>
        </div>

        <div class="lg:col-span-5 bg-white border border-[#292D34] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col justify-between gap-6">
          <div>
            <h3 class="font-bold text-base text-slate-900 mb-2">Cache Health Summary</h3>
            <p class="text-xs text-slate-500 font-semibold mb-4">Cache entries expire automatically according to their 1-hour TTL window.</p>
            <div class="flex flex-col gap-2 font-mono text-xs text-slate-700">
              <div class="flex justify-between"><span>Cache Hits:</span><span id="cache-stat-hits" class="font-bold text-emerald-600">0</span></div>
              <div class="flex justify-between"><span>Cache Misses:</span><span id="cache-stat-misses" class="font-bold text-slate-500">0</span></div>
              <div class="flex justify-between"><span>Tokens Saved:</span><span id="cache-stat-tokens" class="font-bold text-indigo-600">0</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

export async function bindAppCache() {
  const hitRateEl = document.getElementById("cache-stat-hitrate");
  const savedSpendEl = document.getElementById("cache-stat-saved-spend");
  const entriesEl = document.getElementById("cache-stat-entries");
  const hitsEl = document.getElementById("cache-stat-hits");
  const missesEl = document.getElementById("cache-stat-misses");
  const tokensEl = document.getElementById("cache-stat-tokens");
  const purgeBtn = document.getElementById("purge-cache-btn");

  async function loadMetrics() {
    const metrics = await apiService.getCacheMetrics();
    if (hitRateEl) hitRateEl.innerText = `${metrics.hitRate || 0}%`;
    if (savedSpendEl) savedSpendEl.innerText = `$${(metrics.totalDollarsSaved || 0).toFixed(4)}`;
    if (entriesEl) entriesEl.innerText = (metrics.entriesCount || 0).toString();
    if (hitsEl) hitsEl.innerText = (metrics.cacheHits || 0).toString();
    if (missesEl) missesEl.innerText = (metrics.cacheMisses || 0).toString();
    if (tokensEl) tokensEl.innerText = (metrics.totalTokensSaved || 0).toLocaleString();
  }

  loadMetrics();

  if (purgeBtn) {
    purgeBtn.addEventListener("click", async () => {
      if (!confirm("Are you sure you want to purge the cache?")) return;
      purgeBtn.textContent = "Purging...";
      const res = await apiService.purgeCache();
      if (res.success) {
        components.renderToast("success", "Smart cache purged successfully!");
        loadMetrics();
      } else {
        components.renderToast("error", res.message || "Failed to purge cache.");
      }
      purgeBtn.textContent = "Purge Vector Cache";
    });
  }
}

export default {
  appCache,
  bindAppCache
};
