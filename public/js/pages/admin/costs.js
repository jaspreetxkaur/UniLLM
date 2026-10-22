// ADMIN PAGE: costs (Database-backed)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function adminCosts() {
  return `
    <div class="flex flex-col gap-8 animate-fade-in-up font-sans select-none max-w-6xl">
      <!-- Top Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-border pb-5">
        <div class="flex flex-col gap-1">
          <span class="text-[9px] font-bold text-indigo-700 uppercase tracking-widest">Enterprise Finance</span>
          <h1 class="font-display font-black text-3xl text-brand-text uppercase leading-none font-bold">Cost Intelligence & Budgets</h1>
          <p class="text-xs text-brand-muted font-semibold mt-1">Organization monthly spend quotas, real-time expenditure caps, and model unit costs in PostgreSQL.</p>
        </div>
      </div>

      <!-- Cost Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-6 bg-white border border-brand-border rounded-2xl shadow-xs flex flex-col justify-between gap-4">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Organization Monthly Budget</span>
          <div class="flex items-baseline gap-2">
            <span id="admin-costs-allocated" class="text-3xl font-display font-black text-slate-900 font-mono">...</span>
          </div>
          <span id="admin-costs-remaining" class="text-xs text-slate-500 font-semibold pt-3 border-t">Remaining limit: ...</span>
        </div>

        <div class="p-6 bg-white border border-brand-border rounded-2xl shadow-xs flex flex-col justify-between gap-4">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Month-to-Date Spend</span>
          <div class="flex items-baseline gap-2">
            <span id="admin-costs-spent" class="text-3xl font-display font-black text-indigo-600 font-mono">...</span>
            <span id="admin-costs-percent" class="text-xs text-slate-400 font-mono font-bold">...</span>
          </div>
          <span id="admin-costs-status" class="text-xs text-emerald-600 font-bold pt-3 border-t">● Within active threshold</span>
        </div>

        <div class="p-6 bg-white border border-brand-border rounded-2xl shadow-xs flex flex-col justify-between gap-4">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Semantic Cache Savings</span>
          <div class="flex items-baseline gap-2">
            <span id="admin-costs-cache-saved" class="text-3xl font-display font-black text-emerald-600 font-mono">...</span>
          </div>
          <span class="text-xs text-emerald-600 font-bold pt-3 border-t">Direct token cost reduction</span>
        </div>
      </div>

      <!-- Model Expenditure Table -->
      <div class="bg-white border border-brand-border rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
        <h3 class="font-bold text-base text-slate-900">Model Expenditure & Token Attribution</h3>

        <div class="border border-slate-200 rounded-xl overflow-hidden text-xs">
          <table class="w-full text-left font-semibold">
            <thead class="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th class="px-5 py-3.5">Model</th>
                <th class="px-5 py-3.5">Provider</th>
                <th class="px-5 py-3.5">Requests</th>
                <th class="px-5 py-3.5">Tokens Consumed</th>
                <th class="px-5 py-3.5 text-right">Total Incurred Cost</th>
              </tr>
            </thead>
            <tbody id="admin-costs-table-body" class="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td colspan="5" class="px-5 py-8 text-center text-slate-400">
                  <div class="flex items-center justify-center gap-2">
                    <svg class="animate-spin h-4 w-4 text-brand-primary" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                    <span>Loading financial expenditure from PostgreSQL...</span>
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

export async function bindAdminCosts() {
  const allocEl = document.getElementById("admin-costs-allocated");
  const remEl = document.getElementById("admin-costs-remaining");
  const spentEl = document.getElementById("admin-costs-spent");
  const percentEl = document.getElementById("admin-costs-percent");
  const cacheEl = document.getElementById("admin-costs-cache-saved");
  const tableBody = document.getElementById("admin-costs-table-body");

  const [costs, cache] = await Promise.all([
    apiService.getCostAnalytics(),
    apiService.getCacheMetrics()
  ]);

  if (costs) {
    const monthlyBudget = costs.monthlyBudget || 100;
    const totalSpend = costs.totalSpend || 0;
    const percent = Math.min(100, Math.round((totalSpend / (monthlyBudget || 1)) * 100));

    if (allocEl) allocEl.innerText = `$${monthlyBudget.toFixed(2)}`;
    if (remEl) remEl.innerText = `Remaining limit: $${(costs.remainingCredit || 0).toFixed(2)}`;
    if (spentEl) spentEl.innerText = `$${totalSpend.toFixed(4)}`;
    if (percentEl) percentEl.innerText = `(${percent}%)`;

    if (tableBody) {
      if (!costs.modelBreakdown || costs.modelBreakdown.length === 0) {
        tableBody.innerHTML = `
          <tr>
            <td colspan="5" class="px-5 py-8 text-center text-slate-400">
              <p class="font-bold">No expenditure recorded yet.</p>
              <p class="text-[11px] mt-1">Send requests in the <a href="/app/playground" data-link class="text-brand-primary underline font-bold">Playground</a> to see live attribution.</p>
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

  if (cacheEl && cache) {
    cacheEl.innerText = `$${(cache.totalDollarsSaved || 0).toFixed(4)}`;
  }
}

export default {
  adminCosts,
  bindAdminCosts
};
