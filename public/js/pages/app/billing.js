// APP PAGE: billing
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function appBilling() {
  const credits = apiService.getCredits() || {
    purchased: 500.00,
    used: 359.85,
    remaining: 140.15,
    lastPurchaseDate: "2026-08-01",
    paymentMethod: "Visa ending in 4242",
    autoRecharge: true,
    autoRechargeThreshold: 25.00,
    autoRechargeAmount: 100.00
  };

  const balance = typeof credits.remaining === "number" ? credits.remaining : 140.15;
  const autoRecharge = credits.autoRecharge !== false;
  const threshold = credits.autoRechargeThreshold || 25.00;
  const rechargeAmount = credits.autoRechargeAmount || 100.00;

  const invoices = [
    { id: "INV-2026-008", date: "Aug 01, 2026", amount: "$100.00", status: "Paid", tokens: "42.5M Tokens" },
    { id: "INV-2026-007", date: "Jul 01, 2026", amount: "$150.00", status: "Paid", tokens: "64.1M Tokens" },
    { id: "INV-2026-006", date: "Jun 01, 2026", amount: "$100.00", status: "Paid", tokens: "38.9M Tokens" }
  ];

  return `
    <div class="flex flex-col gap-6 animate-fade-in-up font-sans select-none max-w-6xl text-white">
      <!-- Top Title Bar -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#1F2438] pb-5">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <span class="text-[9px] font-bold text-[#38BDF8] uppercase tracking-widest font-mono">Financial Infrastructure</span>
            <span class="px-2 py-0.5 bg-amber-500/10 text-amber-300 border border-amber-500/20 rounded text-[9px] font-mono font-bold uppercase tracking-wider">Demo / Sandbox Mode</span>
          </div>
          <h1 class="font-sans font-bold text-2xl text-white tracking-tight">Billing & Credits</h1>
          <p class="text-xs text-[#8E98B0] mt-0.5">Prepay credit tokens, manage automated replenishment triggers, and view statements.</p>
        </div>
        <div class="flex items-center gap-3">
          <button id="trigger-topup-modal-btn" class="px-5 py-2.5 bg-white hover:bg-slate-200 text-[#07080B] font-semibold rounded-full text-xs transition-all shadow-sm flex items-center gap-2">
            <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"></path></svg>
            Add Prepaid Credits
          </button>
        </div>
      </div>

      <!-- Main Balance Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
        <!-- Prepaid Balance Card -->
        <div class="p-6 bg-[#10121A] border border-[#1F2438] text-white rounded-2xl shadow-lg flex flex-col justify-between gap-5 relative overflow-hidden">
          <div class="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-[#38BDF8]/15 to-transparent rounded-full blur-xl pointer-events-none"></div>
          <div class="flex justify-between items-start">
            <span class="text-[10px] font-mono font-bold text-[#8E98B0] uppercase tracking-wider">Gateway Balance</span>
            <span class="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[9px] font-mono font-bold tracking-wider">ACTIVE</span>
          </div>
          <div class="flex flex-col gap-1.5">
            <span id="credit-balance-display" class="text-4xl font-sans font-bold font-mono tracking-tight text-white">$${balance.toFixed(2)}</span>
            <span class="text-[11px] text-[#8E98B0] flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Estimated runtime: ~28 days remaining
            </span>
          </div>
          <div class="pt-4 border-t border-[#1F2438] flex justify-between items-center text-[10px] text-[#8E98B0] font-mono">
            <span>Auto-Replenish</span>
            <span class="text-white font-bold" id="auto-recharge-summary-text">
              ${autoRecharge ? `$${rechargeAmount} below $${threshold}` : "Disabled"}
            </span>
          </div>
        </div>

        <!-- Payment Method Card -->
        <div class="p-6 bg-[#10121A] border border-[#1F2438] rounded-2xl shadow-xs flex flex-col justify-between gap-5">
          <div class="flex justify-between items-start">
            <span class="text-[10px] font-mono font-bold text-[#8E98B0] uppercase tracking-wider">Primary Instrument</span>
            <button id="edit-payment-method-btn" class="text-[#38BDF8] text-xs font-semibold hover:underline">Edit Credit Card</button>
          </div>
          <div class="flex items-center gap-3">
            <div class="w-10 h-7 bg-[#161926] border border-[#1F2438] rounded-lg flex items-center justify-center font-bold text-[10px] tracking-wider text-white font-mono">
              VISA
            </div>
            <div class="flex flex-col">
              <span class="font-bold text-xs text-white" id="card-digits-display">${credits.paymentMethod || "Visa ending in 4242"}</span>
              <span class="text-[10px] text-[#8E98B0] font-mono">Expires 12/2028</span>
            </div>
          </div>
          <span class="text-[10px] text-[#8E98B0] pt-4 border-t border-[#1F2438]">Primary payment source for credit replenishment triggers.</span>
        </div>

        <!-- Month-to-Date Spend -->
        <div class="p-6 bg-[#10121A] border border-[#1F2438] rounded-2xl shadow-xs flex flex-col justify-between gap-5">
          <span class="text-[10px] font-mono font-bold text-[#8E98B0] uppercase tracking-wider">Month-to-Date Cost</span>
          <div class="flex flex-col gap-1.5">
            <span class="text-3xl font-bold text-white font-mono tracking-tight">$42.15</span>
            <span class="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
              ▼ 38% vs. last month (Cache hits)
            </span>
          </div>
          <a href="/app/costs" data-link class="text-xs font-semibold text-[#38BDF8] hover:underline pt-4 border-t border-[#1F2438] flex items-center gap-1">
            <span>View Spend Intelligence</span>
            <span>&rarr;</span>
          </a>
        </div>
      </div>

      <!-- Quick Add Credits Form -->
      <div id="topup-options-card" class="hidden bg-[#10121A] border border-[#1F2438] rounded-2xl p-6 sm:p-8 shadow-2xl animate-fade-in-up">
        <div class="flex justify-between items-start border-b border-[#1F2438] pb-4 mb-5">
          <div>
            <h3 class="font-bold text-base text-white">Purchase Prepaid Credits</h3>
            <p class="text-xs text-[#8E98B0] mt-0.5">Select a prepaid allowance below to instantly replenish your developer gateway credit.</p>
          </div>
          <button id="close-topup-card-btn" class="p-1 hover:bg-[#161926] rounded-lg text-slate-400 hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <button class="topup-amount-btn px-4 py-3 border border-[#1F2438] bg-[#161926] rounded-xl font-mono font-bold text-white hover:border-[#38BDF8]/40 text-sm transition-all" data-amount="25">
            $25.00
          </button>
          <button class="topup-amount-btn px-4 py-3 border-2 border-[#38BDF8] bg-[#38BDF8]/10 rounded-xl font-mono font-bold text-[#38BDF8] text-sm transition-all relative" data-amount="50">
            $50.00
            <span class="absolute -top-2 right-2 bg-[#38BDF8] text-[#07080B] text-[8px] px-1.5 py-0.5 rounded-full font-mono font-bold uppercase">Popular</span>
          </button>
          <button class="topup-amount-btn px-4 py-3 border border-[#1F2438] bg-[#161926] rounded-xl font-mono font-bold text-white hover:border-[#38BDF8]/40 text-sm transition-all" data-amount="100">
            $100.00
          </button>
          <button class="topup-amount-btn px-4 py-3 border border-[#1F2438] bg-[#161926] rounded-xl font-mono font-bold text-white hover:border-[#38BDF8]/40 text-sm transition-all" data-amount="250">
            $250.00
          </button>
        </div>

        <div class="flex justify-end gap-3">
          <button id="cancel-topup-btn" class="px-5 py-2.5 bg-[#161926] hover:bg-[#1E2235] border border-[#1F2438] text-white font-medium rounded-xl text-xs uppercase tracking-wider transition-colors">
            Cancel
          </button>
          <button id="execute-topup-btn" class="px-6 py-2.5 bg-white hover:bg-slate-200 text-[#07080B] font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm">
            Confirm Purchase ($50.00)
          </button>
        </div>
      </div>

      <!-- Auto Replenishment Trigger Settings -->
      <div class="bg-[#10121A] border border-[#1F2438] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
        <div class="flex justify-between items-center border-b border-[#1F2438] pb-4">
          <div>
            <h3 class="font-bold text-base text-white">Auto-Replenish Configuration</h3>
            <p class="text-xs text-[#8E98B0] mt-0.5">Protect client gateways from credit exhaustion by automatically charging the primary card.</p>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" id="auto-recharge-toggle" ${autoRecharge ? "checked" : ""} class="sr-only peer">
            <div class="w-9 h-5 bg-[#161926] border border-[#1F2438] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#38BDF8]"></div>
          </label>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs font-semibold" id="recharge-settings-form-box">
          <div class="flex flex-col gap-1.5">
            <label class="text-[#8E98B0]">Minimum Balance Threshold (Trigger)</label>
            <select id="recharge-threshold-select" class="p-3 border border-[#1F2438] rounded-xl bg-[#161926] text-white font-mono focus:border-[#38BDF8] outline-none">
              <option value="10" ${threshold === 10 ? "selected" : ""}>$10.00</option>
              <option value="25" ${threshold === 25 ? "selected" : ""}>$25.00 (Default)</option>
              <option value="50" ${threshold === 50 ? "selected" : ""}>$50.00</option>
              <option value="100" ${threshold === 100 ? "selected" : ""}>$100.00</option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[#8E98B0]">Refill Replenishment Amount</label>
            <select id="recharge-amount-select" class="p-3 border border-[#1F2438] rounded-xl bg-[#161926] text-white font-mono focus:border-[#38BDF8] outline-none">
              <option value="50" ${rechargeAmount === 50 ? "selected" : ""}>$50.00</option>
              <option value="100" ${rechargeAmount === 100 ? "selected" : ""}>$100.00 (Default)</option>
              <option value="250" ${rechargeAmount === 250 ? "selected" : ""}>$250.00</option>
              <option value="500" ${rechargeAmount === 500 ? "selected" : ""}>$500.00</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <button id="save-billing-settings-btn" class="px-6 py-2.5 bg-white hover:bg-slate-200 text-[#07080B] font-semibold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm">
            Save Recharge Preferences
          </button>
        </div>
      </div>

      <!-- Invoices History -->
      <div class="bg-[#10121A] border border-[#1F2438] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
        <div class="flex justify-between items-center border-b border-[#1F2438] pb-4">
          <div>
            <h3 class="font-bold text-base text-white">Statements & Receipts</h3>
            <p class="text-xs text-[#8E98B0] mt-0.5">Download full tax compliance invoices in PDF format for accounting cycles.</p>
          </div>
          <span class="text-xs font-mono font-bold text-[#8E98B0] bg-[#161926] border border-[#1F2438] px-2.5 py-1 rounded-lg">3 Statements Issued</span>
        </div>

        <div class="border border-[#1F2438] rounded-xl overflow-hidden text-xs bg-[#0D0E15]">
          <table class="w-full text-left font-medium">
            <thead class="bg-[#161926] border-b border-[#1F2438] text-[10px] font-mono uppercase text-[#8E98B0] tracking-wider">
              <tr>
                <th class="px-5 py-3.5">Statement ID</th>
                <th class="px-5 py-3.5">Date</th>
                <th class="px-5 py-3.5">Amount</th>
                <th class="px-5 py-3.5">Volume</th>
                <th class="px-5 py-3.5">Status</th>
                <th class="px-5 py-3.5 text-right">Receipt Document</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#1F2438]/70 text-[#8E98B0] font-mono">
              ${invoices.map(inv => `
                <tr class="hover:bg-[#161926]/40 transition-colors">
                  <td class="px-5 py-3.5 font-bold text-white">${inv.id}</td>
                  <td class="px-5 py-3.5 text-[#8E98B0]">${inv.date}</td>
                  <td class="px-5 py-3.5 font-bold text-white">${inv.amount}</td>
                  <td class="px-5 py-3.5 text-[#8E98B0]">${inv.tokens}</td>
                  <td class="px-5 py-3.5">
                    <span class="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-[10px] font-mono">
                      ${inv.status}
                    </span>
                  </td>
                  <td class="px-5 py-3.5 text-right font-sans">
                    <button class="download-invoice-btn px-3 py-1 bg-[#161926] hover:bg-[#1E2235] hover:text-[#38BDF8] border border-[#1F2438] text-white rounded-lg text-xs font-medium transition-all" data-inv="${inv.id}">
                      Download PDF ↓
                    </button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export function bindAppBilling() {
  const triggerTopupBtn = document.getElementById("trigger-topup-modal-btn");
  const topupCard = document.getElementById("topup-options-card");
  const closeTopupBtn = document.getElementById("close-topup-card-btn");
  const cancelTopupBtn = document.getElementById("cancel-topup-btn");
  const executeTopupBtn = document.getElementById("execute-topup-btn");
  const amountButtons = document.querySelectorAll(".topup-amount-btn");
  const balanceDisplay = document.getElementById("credit-balance-display");
  const pdfBtns = document.querySelectorAll(".download-invoice-btn");

  let selectedAmount = 50;

  // Recharge trigger settings
  const rechargeToggle = document.getElementById("auto-recharge-toggle");
  const thresholdSelect = document.getElementById("recharge-threshold-select");
  const amountSelect = document.getElementById("recharge-amount-select");
  const saveRechargeBtn = document.getElementById("save-billing-settings-btn");
  const rechargeSettingsBox = document.getElementById("recharge-settings-form-box");
  const summaryText = document.getElementById("auto-recharge-summary-text");

  // Show / Hide topup options
  triggerTopupBtn?.addEventListener("click", () => {
    topupCard?.classList.remove("hidden");
    topupCard?.scrollIntoView({ behavior: "smooth", block: "center" });
  });

  closeTopupBtn?.addEventListener("click", () => topupCard?.classList.add("hidden"));
  cancelTopupBtn?.addEventListener("click", () => topupCard?.classList.add("hidden"));

  // Amount selector
  amountButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      amountButtons.forEach(b => {
        b.classList.remove("border-2", "border-brand-primary", "bg-indigo-50/30", "text-brand-primary");
        b.classList.add("border", "border-slate-200", "text-slate-700");
      });
      btn.classList.add("border-2", "border-brand-primary", "bg-indigo-50/30", "text-brand-primary");
      btn.classList.remove("border", "border-slate-200", "text-slate-700");
      selectedAmount = parseFloat(btn.getAttribute("data-amount"));
      if (executeTopupBtn) {
        executeTopupBtn.textContent = `Confirm Purchase ($${selectedAmount.toFixed(2)})`;
      }
    });
  });

  // Execute purchase
  executeTopupBtn?.addEventListener("click", () => {
    executeTopupBtn.disabled = true;
    executeTopupBtn.textContent = "Processing Payment...";

    setTimeout(() => {
      const updated = apiService.buyCredits(selectedAmount);
      executeTopupBtn.disabled = false;
      executeTopupBtn.textContent = `Confirm Purchase ($${selectedAmount.toFixed(2)})`;
      
      if (balanceDisplay) {
        balanceDisplay.textContent = "$" + updated.remaining.toFixed(2);
      }
      
      topupCard?.classList.add("hidden");
      components.renderToast("success", `Successfully added $${selectedAmount.toFixed(2)} in prepaid credits!`);
      
      // Update summary text
      const current = apiService.getCredits();
      if (summaryText && current) {
        summaryText.textContent = current.autoRecharge ? `$${current.autoRechargeAmount} below $${current.autoRechargeThreshold}` : "Disabled";
      }
    }, 600);
  });

  // Auto recharge toggle visually updates options
  rechargeToggle?.addEventListener("change", (e) => {
    if (e.target.checked) {
      rechargeSettingsBox?.classList.remove("opacity-50", "pointer-events-none");
    } else {
      rechargeSettingsBox?.classList.add("opacity-50", "pointer-events-none");
    }
  });

  // Save recharge preferences
  saveRechargeBtn?.addEventListener("click", () => {
    const active = rechargeToggle ? rechargeToggle.checked : true;
    const thresholdVal = parseFloat(thresholdSelect ? thresholdSelect.value : 25);
    const refillVal = parseFloat(amountSelect ? amountSelect.value : 100);

    saveRechargeBtn.disabled = true;
    saveRechargeBtn.textContent = "Saving Configuration...";

    setTimeout(() => {
      const updated = apiService.updateCreditsSettings({
        autoRecharge: active,
        autoRechargeThreshold: thresholdVal,
        autoRechargeAmount: refillVal
      });

      saveRechargeBtn.disabled = false;
      saveRechargeBtn.textContent = "Save Recharge Preferences";

      if (summaryText) {
        summaryText.textContent = updated.autoRecharge ? `$${updated.autoRechargeAmount} below $${updated.autoRechargeThreshold}` : "Disabled";
      }

      components.renderToast("success", "Auto-replenishment preferences saved successfully.");
    }, 400);
  });

  // Download PDF simulation
  pdfBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const invId = btn.getAttribute("data-inv") || "INV-001";
      btn.disabled = true;
      btn.textContent = "Preparing...";
      setTimeout(() => {
        btn.disabled = false;
        btn.textContent = "Download PDF ↓";
        components.renderToast("success", `Statement ${invId} download initiated.`);
      }, 500);
    });
  });

  // Edit credit card triggers prompt
  const editCardBtn = document.getElementById("edit-payment-method-btn");
  const cardDigitsDisplay = document.getElementById("card-digits-display");
  editCardBtn?.addEventListener("click", () => {
    const newCard = prompt("Enter replacement card details (last 4 digits only for demo):", "5124");
    if (newCard && newCard.trim()) {
      const finalVal = `Visa ending in ${newCard.trim().slice(-4)}`;
      apiService.updateCreditsSettings({ paymentMethod: finalVal });
      if (cardDigitsDisplay) {
        cardDigitsDisplay.textContent = finalVal;
      }
      components.renderToast("success", "Credit instrument updated successfully.");
    }
  });
}

export default {
  appBilling,
  bindAppBilling
};
