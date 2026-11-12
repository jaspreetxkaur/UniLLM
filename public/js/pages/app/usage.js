// APP PAGE: usage (Database-backed)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function appUsage() {
  return `
    <div class="flex flex-col gap-8 animate-fade-in-up font-sans select-none max-w-6xl">
      <!-- Top Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#292D34] pb-5">
        <div class="flex flex-col gap-1">
          <span class="text-[9px] font-bold text-white uppercase tracking-widest">Resource Telemetry</span>
          <h1 class="font-display font-black text-3xl text-white uppercase leading-none font-bold">Quota & Token Consumption</h1>
          <p class="text-xs text-[#A1A5AD] font-semibold mt-1">Real-time throughput, token consumption, and rate limit monitoring from PostgreSQL.</p>
        </div>
        <div class="flex items-center gap-3">
          <span id="usage-status-badge" class="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-full">
            ● Quotas Nominal
          </span>
        </div>
      </div>

      <!-- Live Rate Meters Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- TPM Meter -->
        <div class="p-6 bg-[#101216] border border-[#292D34] rounded-2xl shadow-xs flex flex-col gap-3">
          <div class="flex justify-between items-center text-xs font-bold text-[#A1A5AD]">
            <span>Total Tokens Consumed</span>
            <span id="usage-token-share" class="text-emerald-400">Active</span>
          </div>
          <span id="usage-total-tokens" class="text-3xl font-display font-black text-white font-mono">...</span>
          <div class="w-full h-2.5 bg-[#15181D] rounded-full overflow-hidden">
            <div id="usage-tokens-progress" class="h-full bg-emerald-400 rounded-full" style="width: 100%"></div>
          </div>
          <span class="text-[10px] text-[#A1A5AD] font-semibold">Total tokens processed to date</span>
        </div>

        <!-- RPM Meter -->
        <div class="p-6 bg-[#101216] border border-[#292D34] rounded-2xl shadow-xs flex flex-col gap-3">
          <div class="flex justify-between items-center text-xs font-bold text-[#A1A5AD]">
            <span>Total Invocations</span>
            <span class="text-white">Gateway</span>
          </div>
          <span id="usage-total-requests" class="text-3xl font-display font-black text-white font-mono">...</span>
          <div class="w-full h-2.5 bg-[#15181D] rounded-full overflow-hidden">
            <div class="h-full bg-white rounded-full" style="width: 100%"></div>
          </div>
          <span class="text-[10px] text-[#A1A5AD] font-semibold">Total completed API requests</span>
        </div>

        <!-- Daily Token Consumption -->
        <div class="p-6 bg-[#101216] border border-[#292D34] rounded-2xl shadow-xs flex flex-col gap-3">
          <div class="flex justify-between items-center text-xs font-bold text-[#A1A5AD]">
            <span>Monthly Budget</span>
            <span id="usage-spend-percent" class="text-[#A1A5AD]">...</span>
          </div>
          <span id="usage-total-spend" class="text-3xl font-display font-black text-white font-mono">...</span>
          <div class="w-full h-2.5 bg-[#15181D] rounded-full overflow-hidden">
            <div id="usage-spend-progress" class="h-full bg-[#A1A5AD] rounded-full" style="width: 0%"></div>
          </div>
          <span id="usage-budget-cap-lbl" class="text-[10px] text-[#A1A5AD] font-semibold">Tracked against monthly quota</span>
        </div>
      </div>

      <!-- Token Breakdown by Model -->
      <div class="bg-[#101216] border border-[#292D34] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
        <h3 class="font-bold text-base text-white">Token Distribution by Model</h3>

        <!-- Detailed Table -->
        <div class="border border-[#292D34] rounded-xl overflow-hidden text-xs">
          <table class="w-full text-left font-semibold">
            <thead class="bg-[#15181D] border-b border-[#292D34] text-[10px] font-bold text-[#A1A5AD] uppercase tracking-wider">
              <tr>
                <th class="px-5 py-3.5">Model</th>
                <th class="px-5 py-3.5">Provider</th>
                <th class="px-5 py-3.5">Requests</th>
                <th class="px-5 py-3.5">Tokens Processed</th>
                <th class="px-5 py-3.5 text-right">Attributed Cost</th>
              </tr>
            </thead>
            <tbody id="usage-models-body" class="divide-y divide-[#292D34] text-[#A1A5AD]">
              <tr>
                <td colspan="5" class="px-5 py-8 text-center text-[#A1A5AD]">
                  <div class="flex items-center justify-center gap-2">
                    <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                    <span>Loading usage telemetry from PostgreSQL...</span>
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

export async function bindAppUsage() {
  const tokenEl = document.getElementById("usage-total-tokens");
  const reqEl = document.getElementById("usage-total-requests");
  const spendEl = document.getElementById("usage-total-spend");
  const spendPercentEl = document.getElementById("usage-spend-percent");
  const spendProgress = document.getElementById("usage-spend-progress");
  const budgetCapLbl = document.getElementById("usage-budget-cap-lbl");
  const modelsBody = document.getElementById("usage-models-body");

  const [overview, costs] = await Promise.all([
    apiService.getAnalyticsOverview('30d'),
    apiService.getCostAnalytics()
  ]);

  if (overview) {
    if (tokenEl) {
      const tokens = overview.totalTokens || 0;
      tokenEl.innerText = tokens >= 1000000 ? `${(tokens / 1000000).toFixed(2)}M` : (tokens >= 1000 ? `${(tokens / 1000).toFixed(1)}k` : tokens.toString());
    }
    if (reqEl) reqEl.innerText = (overview.totalRequests || 0).toLocaleString();
  }

  if (costs) {
    const monthlyBudget = costs.monthlyBudget || 100;
    const totalSpend = costs.totalSpend || 0;
    const percent = Math.min(100, Math.round((totalSpend / (monthlyBudget || 1)) * 100));

    if (spendEl) spendEl.innerText = `$${totalSpend.toFixed(2)} / $${monthlyBudget.toFixed(2)}`;
    if (spendPercentEl) spendPercentEl.innerText = `${percent}% Consumed`;
    if (spendProgress) spendProgress.style.width = `${percent}%`;
    if (budgetCapLbl) budgetCapLbl.innerText = `Remaining: $${(costs.remainingCredit || 0).toFixed(2)}`;

    if (modelsBody) {
      if (!costs.modelBreakdown || costs.modelBreakdown.length === 0) {
        modelsBody.innerHTML = `
          <tr>
            <td colspan="5" class="px-5 py-8 text-center text-[#A1A5AD]">
              <p class="font-bold">No usage records yet.</p>
              <p class="text-[11px] mt-1">Send a query in the <a href="/app/playground" data-link class="text-white underline font-bold">Playground</a> to see live consumption.</p>
            </td>
          </tr>
        `;
      } else {
        modelsBody.innerHTML = costs.modelBreakdown.map(m => `
          <tr class="hover:bg-[#15181D]/50 transition-colors">
            <td class="px-5 py-3.5 font-bold text-white">${m.model}</td>
            <td class="px-5 py-3.5 font-mono text-[10px] uppercase font-bold text-[#A1A5AD]">${m.provider}</td>
            <td class="px-5 py-3.5 font-mono text-[#A1A5AD]">${m.requests}</td>
            <td class="px-5 py-3.5 font-mono font-bold text-white">${m.tokens ? parseInt(m.tokens).toLocaleString() : 0}</td>
            <td class="px-5 py-3.5 font-mono font-bold text-right text-emerald-400">$${parseFloat(m.cost).toFixed(6)}</td>
          </tr>
        `).join("");
      }
    }
  }
}

export default {
  appUsage,
  bindAppUsage
};
