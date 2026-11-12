// APP PAGE: costs (Database-backed)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function appCosts() {
  return `
    <div class="flex flex-col gap-6 animate-fade-in-up font-sans select-none">
      <div class="flex justify-between items-center">
        <div class="flex flex-col gap-1">
          <span class="text-[9px] font-bold text-white uppercase tracking-widest">Financial Observability</span>
          <h1 class="font-display font-black text-2xl text-white uppercase leading-none">Cost & Budget Management</h1>
          <p class="text-xs text-[#A1A5AD] font-bold">Monitor real-time AI spending and budget caps derived from Supabase PostgreSQL.</p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <!-- Account Balance Card -->
        <div class="lg:col-span-4 border border-[#292D34] bg-[#101216] rounded-xl p-5 shadow-sm flex flex-col justify-between gap-6 font-semibold text-xs text-[#A1A5AD]">
          <div class="flex flex-col gap-4">
            <h3 class="font-bold text-xs text-white border-b border-[#292D34] pb-3 uppercase tracking-wider">Organization Budget</h3>
            <div class="flex justify-between items-center">
              <span>Remaining Budget</span>
              <span id="cost-remaining-balance" class="text-lg font-bold text-emerald-400 font-mono">...</span>
            </div>
            <div class="flex justify-between items-center border-t border-[#292D34] pt-3">
              <span>Monthly Budget Cap</span>
              <span id="cost-budget-cap" class="text-white font-bold font-mono">...</span>
            </div>
            <div class="flex justify-between items-center border-t border-[#292D34] pt-3">
              <span>Total Month Spend</span>
              <span id="cost-total-spend" class="text-white font-bold font-mono text-white">...</span>
            </div>
          </div>
          
          <div class="p-4 bg-[#15181D] border border-[#292D34] rounded-lg text-[11px] text-[#A1A5AD]">
            🔒 <strong class="text-white">Hard Limit Active:</strong> Requests will be gracefully throttled if your monthly spend reaches the cap to prevent surprise billing.
          </div>
        </div>
        
        <!-- Spend Breakdown by Model -->
        <div class="lg:col-span-8 bg-[#101216] border border-[#292D34] rounded-xl p-6 shadow-sm flex flex-col gap-4">
          <h3 class="font-bold text-xs text-white uppercase tracking-wider border-b border-[#292D34] pb-3">Real-Time Expenditure by Model</h3>
          
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left">
              <thead class="bg-[#15181D] text-[9px] font-bold text-white uppercase tracking-wider border-b border-[#292D34]">
                <tr>
                  <th class="px-4 py-3">Model</th>
                  <th class="px-4 py-3">Provider</th>
                  <th class="px-4 py-3">Requests</th>
                  <th class="px-4 py-3">Tokens</th>
                  <th class="px-4 py-3">Total Cost</th>
                </tr>
              </thead>
              <tbody id="cost-breakdown-body" class="divide-y divide-[#292D34] font-semibold text-[#A1A5AD]">
                <tr>
                  <td colspan="5" class="px-4 py-8 text-center text-[#A1A5AD]">
                    Loading cost breakdown from PostgreSQL...
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

export async function bindAppCosts() {
  const remEl = document.getElementById("cost-remaining-balance");
  const capEl = document.getElementById("cost-budget-cap");
  const spendEl = document.getElementById("cost-total-spend");
  const breakdownBody = document.getElementById("cost-breakdown-body");

  // Fetch real cost analytics
  const costs = await apiService.getCostAnalytics();

  if (!costs) return;

  if (remEl) remEl.innerText = `$${costs.remainingCredit.toFixed(4)}`;
  if (capEl) capEl.innerText = `$${costs.monthlyBudget.toFixed(2)}`;
  if (spendEl) spendEl.innerText = `$${costs.totalSpend.toFixed(6)}`;

  if (breakdownBody) {
    if (!costs.modelBreakdown || costs.modelBreakdown.length === 0) {
      breakdownBody.innerHTML = `
        <tr>
          <td colspan="5" class="px-4 py-8 text-center text-[#A1A5AD]">
            <p class="font-bold">No AI usage recorded yet.</p>
            <p class="text-[11px] mt-1">Send a query in the <a href="/app/playground" data-link class="text-white underline font-bold">Playground</a> to see live model expenditures.</p>
          </td>
        </tr>
      `;
    } else {
      breakdownBody.innerHTML = costs.modelBreakdown.map(m => `
        <tr class="hover:bg-[#15181D]">
          <td class="px-4 py-3 text-white font-bold">${m.model}</td>
          <td class="px-4 py-3 uppercase text-[10px] font-bold text-[#A1A5AD]">${m.provider}</td>
          <td class="px-4 py-3 font-mono">${m.requests}</td>
          <td class="px-4 py-3 font-mono">${m.tokens ? parseInt(m.tokens).toLocaleString() : 0}</td>
          <td class="px-4 py-3 font-mono font-bold text-white">$${parseFloat(m.cost).toFixed(6)}</td>
        </tr>
      `).join("");
    }
  }
}

export default {
  appCosts,
  bindAppCosts
};
