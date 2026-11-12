// ADMIN PAGE: limits (Database-backed)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function adminLimits() {
  return `
    <div class="flex flex-col gap-8 animate-fade-in-up font-sans select-none max-w-6xl">
      <!-- Top Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#292D34] pb-5">
        <div class="flex flex-col gap-1">
          <span class="text-[9px] font-bold text-indigo-700 uppercase tracking-widest">Enterprise Governance</span>
          <h1 class="font-display font-black text-3xl text-white uppercase leading-none font-bold">Limits & Quota Controls</h1>
          <p class="text-xs text-[#A1A5AD] font-semibold mt-1">Configure monthly organization spending ceilings, threshold alerts, and circuit breakers in PostgreSQL.</p>
        </div>
      </div>

      <!-- Rate Limit Policy Presets -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-6 bg-white border border-[#292D34] rounded-2xl shadow-xs flex flex-col justify-between gap-4">
          <div class="flex justify-between items-start">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Organization Monthly Budget</span>
            <span class="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[9px] font-bold">DATABASE</span>
          </div>
          <div class="flex flex-col gap-1">
            <span id="limit-card-budget" class="text-3xl font-display font-black text-slate-900 font-mono">...</span>
            <span id="limit-card-spend" class="text-xs text-slate-500 font-semibold">Current spend: ...</span>
          </div>
          <button id="open-budget-modal-btn" class="text-xs text-indigo-600 font-bold hover:underline self-start pt-3 border-t w-full text-left">
            Modify Organization Budget &rarr;
          </button>
        </div>

        <div class="p-6 bg-white border border-[#292D34] rounded-2xl shadow-xs flex flex-col justify-between gap-4">
          <div class="flex justify-between items-start">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Gateway Rate Cap</span>
            <span class="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[9px] font-bold">ACTIVE</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-3xl font-display font-black text-slate-900 font-mono">120 RPM</span>
            <span class="text-xs text-slate-500 font-semibold">Peak gateway throughput limit</span>
          </div>
          <span class="text-[10px] text-emerald-600 font-bold pt-3 border-t">● Protected by backend rate limiter</span>
        </div>

        <div class="p-6 bg-white border border-[#292D34] rounded-2xl shadow-xs flex flex-col justify-between gap-4">
          <div class="flex justify-between items-start">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Hard Circuit Breaker</span>
            <span id="limit-card-breaker" class="px-2 py-0.5 bg-rose-50 text-rose-700 rounded text-[9px] font-bold">...</span>
          </div>
          <div class="flex flex-col gap-1">
            <span id="limit-card-threshold" class="text-3xl font-display font-black text-rose-600 font-mono">...</span>
            <span class="text-xs text-slate-500 font-semibold">Blocks calls at 100% budget cap</span>
          </div>
          <span class="text-[10px] text-slate-400 font-semibold pt-3 border-t">Enforced server-side before provider dispatch</span>
        </div>
      </div>

      <!-- Employee Limits Table -->
      <div class="bg-white border border-[#292D34] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
        <div class="flex justify-between items-center">
          <h3 class="font-bold text-base text-slate-900">Per-Member Spend Quotas</h3>
          <a href="/admin/employees" data-link class="text-xs text-white font-bold hover:underline">Manage Team Members &rarr;</a>
        </div>

        <div class="border border-slate-200 rounded-xl overflow-hidden text-xs">
          <table class="w-full text-left font-semibold">
            <thead class="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th class="px-5 py-3.5">Member</th>
                <th class="px-5 py-3.5">Role</th>
                <th class="px-5 py-3.5">Spend To Date</th>
                <th class="px-5 py-3.5">Monthly Limit</th>
                <th class="px-5 py-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody id="employee-limits-body" class="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td colspan="5" class="px-5 py-6 text-center text-slate-400">Loading member quotas...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Edit Budget Modal -->
    <div id="budget-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4 overflow-y-auto">
      <div class="bg-[#101216] border border-[#292D34] rounded-2xl p-6 shadow-2xl max-w-sm w-full my-auto">
        <div class="flex justify-between items-center mb-4 border-b border-[#292D34] pb-3">
          <h3 class="font-bold text-base text-white uppercase tracking-tight">Configure Monthly Budget</h3>
          <button id="close-budget-modal-btn" class="p-1 hover:bg-[#15181D] rounded-lg text-[#A1A5AD] hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form id="edit-budget-form" class="flex flex-col gap-4 text-xs font-semibold">
          <div>
            <label class="block text-[10px] font-bold text-[#A1A5AD] uppercase mb-1">Monthly Budget Cap ($)</label>
            <input type="number" id="budget-input-amount" required min="10" max="100000" step="10" class="w-full p-2.5 border border-[#292D34] rounded-lg bg-[#15181D] text-white focus:border-white outline-none font-mono font-bold" />
          </div>

          <div>
            <label class="block text-[10px] font-bold text-[#A1A5AD] uppercase mb-1">Alert Notification Threshold (%)</label>
            <input type="number" id="budget-input-threshold" required min="1" max="100" class="w-full p-2.5 border border-[#292D34] rounded-lg bg-[#15181D] text-white focus:border-white outline-none font-mono font-bold" />
          </div>

          <div class="flex items-center gap-2 pt-1">
            <input type="checkbox" id="budget-input-hardlimit" class="accent-[white] w-4 h-4 cursor-pointer" />
            <label for="budget-input-hardlimit" class="text-xs text-white font-bold cursor-pointer">Enforce Hard Limit (Block at 100%)</label>
          </div>

          <div class="flex gap-2.5 mt-3">
            <button type="button" id="cancel-budget-btn" class="w-1/2 py-2.5 border border-[#292D34] hover:bg-[#15181D] text-[#A1A5AD] hover:text-white font-bold rounded-lg uppercase tracking-wider text-[11px] transition-colors">
              Cancel
            </button>
            <button type="submit" id="save-budget-submit-btn" class="w-1/2 py-2.5 bg-white hover:bg-neutral-200 text-[#08090B] font-bold rounded-lg uppercase tracking-wider text-[11px] shadow-sm transition-colors">
              Save Budget
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export async function bindAdminLimits() {
  const cardBudget = document.getElementById("limit-card-budget");
  const cardSpend = document.getElementById("limit-card-spend");
  const cardBreaker = document.getElementById("limit-card-breaker");
  const cardThreshold = document.getElementById("limit-card-threshold");
  const empBody = document.getElementById("employee-limits-body");

  const openModalBtn = document.getElementById("open-budget-modal-btn");
  const modal = document.getElementById("budget-modal");
  const closeModalBtn = document.getElementById("close-budget-modal-btn");
  const cancelBtn = document.getElementById("cancel-budget-btn");
  const form = document.getElementById("edit-budget-form");

  const inputAmount = document.getElementById("budget-input-amount");
  const inputThreshold = document.getElementById("budget-input-threshold");
  const inputHardLimit = document.getElementById("budget-input-hardlimit");

  async function loadBudgetData() {
    const budget = await apiService.getOrgBudget();
    if (budget) {
      if (cardBudget) cardBudget.innerText = `$${budget.monthlyBudgetUsd.toFixed(2)} / mo`;
      if (cardSpend) cardSpend.innerText = `Current spend: $${budget.currentSpendUsd.toFixed(4)} (${budget.usagePercent}%)`;
      if (cardBreaker) {
        cardBreaker.innerText = budget.hardLimitEnabled ? 'ENABLED' : 'DISABLED';
        cardBreaker.className = `px-2 py-0.5 rounded text-[9px] font-bold ${budget.hardLimitEnabled ? 'bg-rose-50 text-rose-700' : 'bg-slate-100 text-slate-600'}`;
      }
      if (cardThreshold) cardThreshold.innerText = `Alert at ${budget.alertThresholdPercent}%`;

      if (inputAmount) inputAmount.value = budget.monthlyBudgetUsd;
      if (inputThreshold) inputThreshold.value = budget.alertThresholdPercent;
      if (inputHardLimit) inputHardLimit.checked = budget.hardLimitEnabled;
    }
  }

  async function loadEmployees() {
    const members = await apiService.getTeamMembers();
    if (empBody) {
      if (!members || members.length === 0) {
        empBody.innerHTML = `<tr><td colspan="5" class="px-5 py-6 text-center text-slate-400">No members found.</td></tr>`;
      } else {
        empBody.innerHTML = members.map(m => `
          <tr class="hover:bg-slate-50/50">
            <td class="px-5 py-3.5 font-bold text-slate-900">${m.name}</td>
            <td class="px-5 py-3.5 text-slate-600 uppercase text-[10px] font-bold">${m.role}</td>
            <td class="px-5 py-3.5 font-mono font-bold text-slate-900">$${parseFloat(m.currentSpend || 0).toFixed(4)}</td>
            <td class="px-5 py-3.5 font-mono text-indigo-700 font-bold">${m.monthlySpendLimitUsd ? `$${m.monthlySpendLimitUsd.toFixed(2)} / mo` : 'Unlimited'}</td>
            <td class="px-5 py-3.5 text-right font-bold text-[10px] ${m.status === 'active' ? 'text-emerald-600' : 'text-red-500'}">
              ${m.status === 'active' ? 'Active' : 'Suspended'}
            </td>
          </tr>
        `).join("");
      }
    }
  }

  loadBudgetData();
  loadEmployees();

  // Modal handlers
  openModalBtn?.addEventListener("click", () => modal?.classList.remove("hidden"));
  const closeModal = () => modal?.classList.add("hidden");
  closeModalBtn?.addEventListener("click", closeModal);
  cancelBtn?.addEventListener("click", closeModal);

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const saveBtn = document.getElementById("save-budget-submit-btn");
    if (saveBtn) saveBtn.textContent = "Saving...";

    const res = await apiService.updateOrgBudget({
      monthly_budget_usd: parseFloat(inputAmount.value),
      alert_threshold_percent: parseInt(inputThreshold.value, 10),
      hard_limit_enabled: inputHardLimit.checked
    });

    if (saveBtn) saveBtn.textContent = "Save Budget";

    if (res.success) {
      components.renderToast("success", "Organization budget updated successfully!");
      closeModal();
      loadBudgetData();
    } else {
      components.renderToast("error", res.message || "Failed to update budget.");
    }
  });
}

export default {
  adminLimits,
  bindAdminLimits
};
