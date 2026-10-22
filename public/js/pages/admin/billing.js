// ADMIN PAGE: billing
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function adminBilling() {
  const corporateInvoices = [
    { id: "PO-2026-CYBERDYNE-003", terms: "Net-30 Purchase Order", amount: "$15,000.00", date: "Aug 01, 2026", status: "Active (Due Aug 31)", volume: "Committed 2B Tokens" },
    { id: "PO-2026-CYBERDYNE-002", terms: "Net-30 Purchase Order", amount: "$15,000.00", date: "Jul 01, 2026", status: "Paid", volume: "Committed 2B Tokens" },
    { id: "PO-2026-CYBERDYNE-001", terms: "Net-30 Purchase Order", amount: "$15,000.00", date: "Jun 01, 2026", status: "Paid", volume: "Committed 2B Tokens" }
  ];

  return `
    <div class="flex flex-col gap-8 animate-fade-in-up font-sans select-none max-w-6xl">
      <!-- Top Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-border pb-5">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <span class="text-[9px] font-bold text-indigo-700 uppercase tracking-widest">Enterprise Finance</span>
            <span class="px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-300 rounded text-[9px] font-bold uppercase tracking-wider">Demo / Sandbox Mode</span>
          </div>
          <h1 class="font-display font-black text-3xl text-brand-text uppercase leading-none font-bold">Corporate Billing & Contracts</h1>
          <p class="text-xs text-brand-muted font-semibold mt-1">Enterprise Master Services Agreement (MSA), committed token allowances, and Net-30 invoicing (Simulated sandbox preview).</p>
        </div>
      </div>

      <!-- Contract Overview Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-6 bg-slate-900 text-white rounded-2xl shadow-md flex flex-col justify-between gap-4">
          <div class="flex justify-between items-start">
            <span class="text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider">Annual Contract Line</span>
            <span class="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 rounded text-[9px] font-bold">ENTERPRISE TIER</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-3xl font-display font-black font-mono text-white">$180,000 / yr</span>
            <span class="text-[11px] text-slate-400 font-semibold">Includes 24B annual tokens & 99.999% SLA</span>
          </div>
          <div class="pt-3 border-t border-white/10 flex justify-between text-[10px] text-slate-400">
            <span>Billing Terms: Net-30 Invoiced</span>
            <span class="text-white font-bold">Next PO: Sep 01</span>
          </div>
        </div>

        <div class="p-6 bg-white border border-brand-border rounded-2xl shadow-xs flex flex-col justify-between gap-4">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Payment Method</span>
          <div class="flex flex-col gap-1">
            <span class="font-bold text-sm text-slate-900">ACH / Wire Transfer (JPMorgan Chase)</span>
            <span class="text-xs text-slate-500 font-mono">Routing: ••••••492 (Cyberdyne Corp)</span>
          </div>
          <span class="text-[10px] text-slate-400 font-semibold pt-3 border-t">Tax Exemption ID: US-EIN-94820194</span>
        </div>

        <div class="p-6 bg-white border border-brand-border rounded-2xl shadow-xs flex flex-col justify-between gap-4">
          <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Account Executive</span>
          <div class="flex flex-col gap-1">
            <span class="font-bold text-sm text-slate-900">Marcus Vance</span>
            <span class="text-xs text-indigo-600 font-semibold">marcus.vance@unillm.com</span>
          </div>
          <span class="text-[10px] text-emerald-600 font-bold pt-3 border-t">● Dedicated Solutions Architect Assigned</span>
        </div>
      </div>

      <!-- Purchase Orders Table -->
      <div class="bg-white border border-brand-border rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
        <h3 class="font-bold text-base text-slate-900">Corporate Purchase Orders & Statements</h3>

        <div class="border border-slate-200 rounded-xl overflow-hidden text-xs">
          <table class="w-full text-left font-semibold">
            <thead class="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th class="px-5 py-3.5">PO Number</th>
                <th class="px-5 py-3.5">Billing Terms</th>
                <th class="px-5 py-3.5">Issue Date</th>
                <th class="px-5 py-3.5">Amount</th>
                <th class="px-5 py-3.5">Status</th>
                <th class="px-5 py-3.5 text-right">Invoice Document</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              ${corporateInvoices.map(c => `
                <tr class="hover:bg-slate-50/50">
                  <td class="px-5 py-3.5 font-mono font-bold text-slate-900">${c.id}</td>
                  <td class="px-5 py-3.5 text-slate-600">${c.terms}</td>
                  <td class="px-5 py-3.5 font-mono text-slate-500">${c.date}</td>
                  <td class="px-5 py-3.5 font-mono font-bold text-slate-900">${c.amount}</td>
                  <td class="px-5 py-3.5">
                    <span class="px-2 py-0.5 ${c.status.includes('Active') ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-emerald-50 text-emerald-700 border border-emerald-200'} rounded-full text-[10px] font-bold">
                      ${c.status}
                    </span>
                  </td>
                  <td class="px-5 py-3.5 text-right">
                    <button class="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors">
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

export function bindAdminBilling() {}

export default {
  adminBilling,
  bindAdminBilling
};
