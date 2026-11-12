// ADMIN PAGE: overview (Modern Glassmorphic Redesign)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function adminOverview() {
  const user = apiService.getCurrentUser() || {};
  const orgName = user.org || "Organization";

  return `
    <div class="flex flex-col gap-8 animate-fade-in-up font-sans select-none">
      
      <!-- 1. Hero Header & Quick Action Row -->
      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-2 border-b border-[#292D34]/80">
        <div class="flex flex-col gap-1.5">
          <div class="flex items-center gap-3">
            <h1 class="font-display font-black text-2xl sm:text-3xl text-white tracking-tight uppercase text-gradient-cyan">
              ENTERPRISE COMMAND CENTER
            </h1>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full badge-luminous-emerald font-mono text-[9px] font-extrabold tracking-wider uppercase">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Edge Active
            </span>
          </div>
          <div class="flex flex-wrap items-center gap-2 text-xs text-[#A1A5AD]">
            <span class="text-white font-semibold">${orgName}</span>
            <span>•</span>
            <span class="font-mono text-[#A1A5AD]">Real-time LLM Gateway Orchestration & Governance</span>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <a
            href="/admin/teams"
            data-link
            class="btn-secondary-glass px-4 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-2"
          >
            <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
            Manage Team
          </a>
          <a
            href="/admin/api-keys"
            data-link
            class="btn-primary-gradient px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-lg"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
            + Provision Master Key
          </a>
        </div>
      </div>

      <!-- 2. Four Sleek Glass KPI Metric Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <!-- Metric 1: Active Team Members -->
        <div class="glass-card rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A1A5AD]">Active Team Members</span>
            <div class="w-8 h-8 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-baseline gap-2">
              <span id="admin-stat-members" class="text-3xl font-black font-mono text-white tracking-tight">...</span>
              <span class="text-[10px] font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">RBAC Active</span>
            </div>
            <p class="text-[11px] text-[#A1A5AD] mt-1.5 font-medium flex items-center gap-1.5">
              <span>Organization-wide access controls</span>
            </p>
          </div>
        </div>

        <!-- Metric 2: Gateway Requests (30d) -->
        <div class="glass-card rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A1A5AD]">Gateway Ingress (30d)</span>
            <div class="w-8 h-8 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-baseline gap-2">
              <span id="admin-stat-requests" class="text-3xl font-black font-mono text-white tracking-tight">...</span>
              <span class="text-[10px] font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-full border border-sky-500/20">Live Proxies</span>
            </div>
            <p class="text-[11px] text-[#A1A5AD] mt-1.5 font-medium flex items-center gap-1.5">
              <span>99.98% Gateway SLA Uptime</span>
            </p>
          </div>
        </div>

        <!-- Metric 3: Monthly Spend & Cap -->
        <div class="glass-card rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A1A5AD]">Monthly Spend</span>
            <div class="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex items-baseline gap-2">
              <span id="admin-stat-spend" class="text-3xl font-black font-mono text-white tracking-tight">$0.00</span>
              <span id="admin-stat-quota" class="text-[10px] font-mono font-bold text-[#A1A5AD] bg-[#15181D] px-2 py-0.5 rounded-full border border-[#292D34]">Cap: $100.00</span>
            </div>
            <p class="text-[11px] text-[#A1A5AD] mt-1.5 font-medium flex items-center gap-1.5">
              <span>Aggregated across all workspaces</span>
            </p>
          </div>
        </div>

        <!-- Metric 4: Budget Utilization Gauge -->
        <div class="glass-card rounded-2xl p-5 flex flex-col justify-between relative overflow-hidden group">
          <div class="flex items-center justify-between">
            <span class="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A1A5AD]">Quota Utilization</span>
            <span id="admin-stat-percent" class="text-xs font-mono font-extrabold text-white bg-white/10 px-2 py-0.5 rounded-full border border-white/20">0%</span>
          </div>
          <div class="mt-4">
            <div class="w-full bg-[#08090B] border border-[#292D34] rounded-full h-3 p-0.5 overflow-hidden">
              <div id="admin-stat-progress-bar" class="bg-gradient-to-r from-[white] via-indigo-500 to-purple-500 h-full rounded-full transition-all duration-700 shadow-[0_0_10px_rgba(56,189,248,0.5)]" style="width: 4%"></div>
            </div>
            <div class="flex justify-between items-center text-[10px] font-mono text-[#A1A5AD] mt-2">
              <span>Auto-alert at 80%</span>
              <span class="text-emerald-400 font-bold">Hard Cap Enabled</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Telemetry Visualizer + Live Edge Provider Matrix -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- Left: Gateway Latency Telemetry (8 Cols) -->
        <div class="lg:col-span-8 glass-panel rounded-2xl p-6 flex flex-col justify-between">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#292D34]/80 mb-4 select-none">
            <div class="flex items-center gap-2.5">
              <div class="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_rgba(56,189,248,0.8)]"></div>
              <h3 class="font-bold text-sm text-white tracking-tight uppercase">Organization Latency Telemetry (ms)</h3>
            </div>
            <div class="flex items-center gap-1.5 self-end sm:self-auto bg-[#15181D] p-1 rounded-xl border border-[#292D34] text-[10px] font-mono font-bold text-[#A1A5AD]">
              <button class="px-2.5 py-1 rounded-lg bg-[#101216] text-white border border-[#292D34] shadow-xs">30 Days</button>
              <button class="px-2.5 py-1 rounded-lg hover:text-white transition-colors">7 Days</button>
              <button class="px-2.5 py-1 rounded-lg hover:text-white transition-colors">24h</button>
            </div>
          </div>
          
          <div id="admin-overview-chart" class="h-56 flex items-center justify-center text-[#A1A5AD] text-xs font-mono">
            <div class="flex items-center gap-2">
              <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
              <span>Streaming telemetry metrics from database...</span>
            </div>
          </div>
        </div>

        <!-- Right: AI Provider Live Edge Matrix (4 Cols) -->
        <div class="lg:col-span-4 glass-panel rounded-2xl p-6 flex flex-col gap-4 select-none">
          <div class="flex justify-between items-center pb-3 border-b border-[#292D34]/80 mb-1">
            <div class="flex items-center gap-2">
              <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              <h3 class="font-bold text-xs text-white uppercase tracking-wider">Provider Edge Matrix</h3>
            </div>
            <span class="px-2 py-0.5 rounded-full text-[8px] font-mono font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">All Healthy</span>
          </div>

          <div class="flex flex-col gap-3 font-semibold text-xs">
            <!-- Provider 1: Gemini -->
            <div class="p-3.5 rounded-xl bg-[#15181D]/60 border border-[#292D34] hover:border-emerald-500/30 transition-all flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                <div>
                  <p class="text-xs font-bold text-white">Google Gemini</p>
                  <p class="text-[10px] text-[#A1A5AD] font-mono">1.5 Pro & Flash</p>
                </div>
              </div>
              <div class="text-right">
                <span class="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">142 ms</span>
              </div>
            </div>

            <!-- Provider 2: OpenAI -->
            <div class="p-3.5 rounded-xl bg-[#15181D]/60 border border-[#292D34] hover:border-sky-500/30 transition-all flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]"></div>
                <div>
                  <p class="text-xs font-bold text-white">OpenAI Fleet</p>
                  <p class="text-[10px] text-[#A1A5AD] font-mono">GPT-4o & o1</p>
                </div>
              </div>
              <div class="text-right">
                <span class="text-[10px] font-mono font-bold text-sky-400 bg-sky-500/10 px-2 py-0.5 rounded-md border border-sky-500/20">340 ms</span>
              </div>
            </div>

            <!-- Provider 3: Failover Route -->
            <div class="p-3.5 rounded-xl bg-[#15181D]/60 border border-[#292D34] hover:border-purple-500/30 transition-all flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></div>
                <div>
                  <p class="text-xs font-bold text-white">Automatic Failover</p>
                  <p class="text-[10px] text-[#A1A5AD] font-mono">Dynamic Fallback Chain</p>
                </div>
              </div>
              <div class="text-right">
                <span class="text-[10px] font-mono font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-md border border-purple-500/20">Armed</span>
              </div>
            </div>

            <!-- Provider 4: Cache -->
            <div class="p-3.5 rounded-xl bg-[#15181D]/60 border border-[#292D34] hover:border-amber-500/30 transition-all flex items-center justify-between">
              <div class="flex items-center gap-3">
                <div class="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"></div>
                <div>
                  <p class="text-xs font-bold text-white">Semantic Cache</p>
                  <p class="text-[10px] text-[#A1A5AD] font-mono">0-Token Deduplication</p>
                </div>
              </div>
              <div class="text-right">
                <span class="text-[10px] font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">&lt; 1 ms</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Governance & Security Audit Trail -->
      <div class="glass-panel rounded-2xl overflow-hidden shadow-2xl select-text">
        <div class="h-14 border-b border-[#292D34] px-6 flex items-center justify-between bg-[#15181D]/40 select-none">
          <div class="flex items-center gap-2.5">
            <svg class="w-4 h-4 text-sky-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            <span class="text-xs font-bold text-white uppercase tracking-wider">Recent Governance Audit Trail</span>
          </div>
          <a href="/admin/audit-logs" data-link class="text-[11px] font-bold text-white hover:text-[#0EA5E9] transition-colors uppercase tracking-wider flex items-center gap-1">
            <span>View Full Audit Log</span>
            <span>&rarr;</span>
          </a>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left font-semibold">
            <thead class="bg-[#08090B]/80 text-[10px] font-bold text-[#A1A5AD] uppercase tracking-wider border-b border-[#292D34] select-none">
              <tr>
                <th class="px-6 py-3.5">Action Event</th>
                <th class="px-6 py-3.5">Actor Identity</th>
                <th class="px-6 py-3.5">Metadata & Scope</th>
                <th class="px-6 py-3.5 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody id="admin-overview-logs-body" class="divide-y divide-[#292D34]/60 text-[#A1A5AD]">
              <tr>
                <td colspan="4" class="px-6 py-8 text-center text-[#A1A5AD]">
                  <div class="flex items-center justify-center gap-2">
                    <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                    <span>Loading verified audit events...</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export async function bindAdminOverview() {
  const membersEl = document.getElementById("admin-stat-members");
  const requestsEl = document.getElementById("admin-stat-requests");
  const spendEl = document.getElementById("admin-stat-spend");
  const quotaEl = document.getElementById("admin-stat-quota");
  const percentEl = document.getElementById("admin-stat-percent");
  const progressBarEl = document.getElementById("admin-stat-progress-bar");
  const chartEl = document.getElementById("admin-overview-chart");
  const logsBody = document.getElementById("admin-overview-logs-body");

  try {
    const [members, overview, budget, auditLogs] = await Promise.all([
      apiService.getTeamMembers(),
      apiService.getAnalyticsOverview('30d'),
      apiService.getOrgBudget(),
      apiService.getAuditLogs(6)
    ]);

    if (membersEl) membersEl.innerText = (members ? members.length : 1).toString();

    if (overview) {
      if (requestsEl) requestsEl.innerText = (overview.totalRequests || 0).toLocaleString();
      if (chartEl) {
        chartEl.innerHTML = components.renderAreaChart(overview.latencyHistory, overview.latencyLabels, 190);
      }
    }

    if (budget) {
      const monthlyBudget = budget.monthlyBudgetUsd || budget.monthlyBudget || 100;
      const currentSpend = budget.currentSpendUsd || budget.currentMonthSpend || 0;
      const percent = Math.min(100, Math.round((currentSpend / (monthlyBudget || 1)) * 100));

      if (spendEl) spendEl.innerText = `$${currentSpend.toFixed(2)}`;
      if (quotaEl) quotaEl.innerText = `Cap: $${monthlyBudget.toFixed(2)}`;
      if (percentEl) percentEl.innerText = `${percent}%`;
      if (progressBarEl) progressBarEl.style.width = `${Math.max(3, percent)}%`;
    }

    if (logsBody) {
      if (!auditLogs || auditLogs.length === 0) {
        logsBody.innerHTML = `
          <tr>
            <td colspan="4" class="px-6 py-8 text-center text-[#A1A5AD]">
              <p class="font-bold text-white">No governance audit events yet.</p>
              <p class="text-xs text-[#A1A5AD] mt-1">Actions such as creating API keys and modifying policies will appear here.</p>
            </td>
          </tr>
        `;
      } else {
        logsBody.innerHTML = auditLogs.map(l => {
          let badgeClass = "badge-luminous-sky";
          const action = (l.action || "").toUpperCase();
          if (action.includes("CREATE") || action.includes("INVITE") || action.includes("JOIN")) {
            badgeClass = "badge-luminous-emerald";
          } else if (action.includes("REVOKE") || action.includes("DELETE") || action.includes("BLOCK")) {
            badgeClass = "badge-luminous-rose";
          } else if (action.includes("POLICY") || action.includes("ROLE") || action.includes("LIMIT")) {
            badgeClass = "badge-luminous-purple";
          }

          // Clean details formatting instead of raw JSON dump
          let detailsSummary = "-";
          if (l.details && typeof l.details === "object") {
            const parts = [];
            if (l.details.keyName) parts.push(`Key: "${l.details.keyName}"`);
            if (l.details.name) parts.push(`Name: "${l.details.name}"`);
            if (l.details.email) parts.push(`Email: ${l.details.email}`);
            if (l.details.role) parts.push(`Role: ${l.details.role}`);
            if (parts.length > 0) {
              detailsSummary = parts.join(" • ");
            } else {
              detailsSummary = JSON.stringify(l.details).slice(0, 48) + "...";
            }
          }

          const actorName = l.user || l.email || l.actor_name || "Admin";
          const actorInitial = actorName.charAt(0).toUpperCase();

          return `
            <tr class="hover:bg-[#15181D]/40 transition-colors">
              <td class="px-6 py-4 font-bold text-white">
                <span class="px-2.5 py-1 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider ${badgeClass}">
                  ${l.action}
                </span>
              </td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <div class="w-6 h-6 rounded-full bg-[#292D34] border border-[#2C324E] flex items-center justify-center font-mono font-bold text-[10px] text-white">
                    ${actorInitial}
                  </div>
                  <span class="text-white font-medium">${actorName}</span>
                </div>
              </td>
              <td class="px-6 py-4 font-mono text-xs text-slate-300 truncate max-w-sm">
                ${detailsSummary}
              </td>
              <td class="px-6 py-4 font-mono text-right text-[#A1A5AD]">
                ${l.timestamp ? new Date(l.timestamp).toLocaleDateString() : 'Recent'}
              </td>
            </tr>
          `;
        }).join("");
      }
    }
  } catch (err) {
    console.error("Error binding admin overview:", err);
  }
}

export default {
  adminOverview,
  bindAdminOverview
};
