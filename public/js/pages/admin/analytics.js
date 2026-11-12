// ADMIN PAGE: analytics (Database-backed)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function adminAnalytics() {
  return `
    <div class="flex flex-col gap-8 animate-fade-in-up font-sans select-none max-w-6xl">
      <!-- Top Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#292D34] pb-5">
        <div class="flex flex-col gap-1">
          <span class="text-[9px] font-bold text-indigo-700 uppercase tracking-widest">Enterprise Intelligence</span>
          <h1 class="font-display font-black text-3xl text-white uppercase leading-none font-bold">Organization Analytics</h1>
          <p class="text-xs text-[#A1A5AD] font-semibold mt-1">Cross-workspace token consumption, model spend attribution, and cache savings from PostgreSQL.</p>
        </div>
      </div>

      <!-- Top KPI Summary Cards -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div class="p-5 bg-white border border-[#292D34] rounded-2xl shadow-xs flex flex-col gap-1.5">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Org Spend</span>
          <span id="admin-analytics-spend" class="text-3xl font-display font-black text-slate-900 font-mono">...</span>
          <span id="admin-analytics-cache-saved" class="text-[10px] text-emerald-600 font-bold">...</span>
        </div>

        <div class="p-5 bg-white border border-[#292D34] rounded-2xl shadow-xs flex flex-col gap-1.5">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Tokens Processed</span>
          <span id="admin-analytics-tokens" class="text-3xl font-display font-black text-indigo-600 font-mono">...</span>
          <span id="admin-analytics-requests" class="text-[10px] text-slate-400 font-semibold">...</span>
        </div>

        <div class="p-5 bg-white border border-[#292D34] rounded-2xl shadow-xs flex flex-col gap-1.5">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Active Workspaces</span>
          <span id="admin-analytics-workspaces" class="text-3xl font-display font-black text-slate-800 font-mono">...</span>
          <span id="admin-analytics-members" class="text-[10px] text-slate-400 font-semibold">...</span>
        </div>

        <div class="p-5 bg-white border border-[#292D34] rounded-2xl shadow-xs flex flex-col gap-1.5">
          <span class="text-[10px] font-bold uppercase tracking-wider text-slate-400">Cache Hit Rate</span>
          <span id="admin-analytics-hitrate" class="text-3xl font-display font-black text-emerald-600 font-mono">...</span>
          <span class="text-[10px] text-slate-400 font-semibold">Deterministic vector cache</span>
        </div>
      </div>

      <!-- Model Spend Distribution -->
      <div class="bg-white border border-[#292D34] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
        <h3 class="font-bold text-base text-slate-900">Model Spend & Token Attribution</h3>

        <div class="border border-slate-200 rounded-xl overflow-hidden text-xs">
          <table class="w-full text-left font-semibold">
            <thead class="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th class="px-5 py-3.5">Model</th>
                <th class="px-5 py-3.5">Provider</th>
                <th class="px-5 py-3.5">Requests</th>
                <th class="px-5 py-3.5">Tokens Processed</th>
                <th class="px-5 py-3.5 text-right">Attributed Spend</th>
              </tr>
            </thead>
            <tbody id="admin-analytics-table-body" class="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td colspan="5" class="px-5 py-8 text-center text-slate-400">
                  <div class="flex items-center justify-center gap-2">
                    <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                    <span>Loading analytics data from PostgreSQL...</span>
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

export async function bindAdminAnalytics() {
  const spendEl = document.getElementById("admin-analytics-spend");
  const cacheSavedEl = document.getElementById("admin-analytics-cache-saved");
  const tokensEl = document.getElementById("admin-analytics-tokens");
  const requestsEl = document.getElementById("admin-analytics-requests");
  const wsEl = document.getElementById("admin-analytics-workspaces");
  const membersEl = document.getElementById("admin-analytics-members");
  const hitRateEl = document.getElementById("admin-analytics-hitrate");
  const tableBody = document.getElementById("admin-analytics-table-body");

  const [overview, costs, workspaces, members, cache] = await Promise.all([
    apiService.getAnalyticsOverview('30d'),
    apiService.getCostAnalytics(),
    apiService.getWorkspaces(),
    apiService.getTeamMembers(),
    apiService.getCacheMetrics()
  ]);

  if (spendEl && overview) spendEl.innerText = `$${(overview.totalSpend || 0).toFixed(4)}`;
  if (cacheSavedEl && cache) cacheSavedEl.innerText = `▼ $${(cache.totalDollarsSaved || 0).toFixed(4)} saved via Cache`;

  if (tokensEl && overview) {
    const tokens = overview.totalTokens || 0;
    tokensEl.innerText = tokens >= 1000000 ? `${(tokens / 1000000).toFixed(2)}M` : (tokens >= 1000 ? `${(tokens / 1000).toFixed(1)}k` : tokens.toString());
  }
  if (requestsEl && overview) requestsEl.innerText = `${(overview.totalRequests || 0).toLocaleString()} total requests`;

  if (wsEl && workspaces) wsEl.innerText = workspaces.length.toString();
  if (membersEl && members) membersEl.innerText = `${members.length} team members`;

  if (hitRateEl && overview) hitRateEl.innerText = `${overview.cacheHitRate || 0}%`;

  if (tableBody) {
    if (!costs || !costs.modelBreakdown || costs.modelBreakdown.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="5" class="px-5 py-8 text-center text-slate-400">
            <p class="font-bold">No AI usage recorded yet.</p>
            <p class="text-[11px] mt-1">Send a query in the <a href="/app/playground" data-link class="text-white underline font-bold">Playground</a> to start seeing telemetry.</p>
          </td>
        </tr>
      `;
    } else {
      tableBody.innerHTML = costs.modelBreakdown.map(m => `
        <tr class="hover:bg-slate-50/50">
          <td class="px-5 py-3.5 font-bold text-slate-900">${m.model}</td>
          <td class="px-5 py-3.5 font-mono text-[10px] uppercase font-bold text-slate-500">${m.provider}</td>
          <td class="px-5 py-3.5 font-mono text-slate-700">${m.requests}</td>
          <td class="px-5 py-3.5 font-mono font-bold text-slate-900">${m.tokens ? parseInt(m.tokens).toLocaleString() : 0}</td>
          <td class="px-5 py-3.5 font-mono font-bold text-right text-slate-900">$${parseFloat(m.cost).toFixed(6)}</td>
        </tr>
      `).join("");
    }
  }
}

export default {
  adminAnalytics,
  bindAdminAnalytics
};
