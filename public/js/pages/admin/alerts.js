// ADMIN PAGE: alerts
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function adminAlerts() {
  const alerts = apiService.getAlerts() || [];

  return `
    <div class="flex flex-col gap-8 animate-fade-in-up font-sans select-none max-w-6xl">
      <!-- Top Title Bar -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-border pb-5">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <span class="text-[9px] font-bold text-indigo-700 uppercase tracking-widest">Enterprise Governance</span>
            <span class="px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-300 rounded text-[9px] font-bold uppercase tracking-wider">Demo / Sandbox Mode</span>
          </div>
          <h1 class="font-display font-black text-3xl text-brand-text uppercase leading-none font-bold">Budget & Anomaly Alerts</h1>
          <p class="text-xs text-brand-muted font-semibold mt-1">Configure automated budget alerts, runaway token spike breakers, and provider downtime triggers (Simulated notification triggers).</p>
        </div>
        <div class="flex items-center gap-3">
          <button id="create-alert-rule-btn" class="px-5 py-2.5 bg-indigo-950 hover:bg-slate-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center gap-2">
            <span>+</span>
            <span>New Alert Rule</span>
          </button>
        </div>
      </div>

      <!-- Active Threshold Rules Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Monthly Budget Alert -->
        <div class="p-6 bg-white border border-brand-border rounded-2xl shadow-xs flex flex-col justify-between gap-4">
          <div class="flex justify-between items-start">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Org Spend Threshold</span>
            <span class="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[9px] font-bold">ACTIVE</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-3xl font-display font-black text-slate-900 font-mono">80% of $10,000</span>
            <span class="text-xs text-slate-500 font-semibold">Triggers at $8,000.00 spend</span>
          </div>
          <div class="pt-3 border-t flex items-center justify-between text-[11px] text-slate-500 font-semibold">
            <span>Notify: Finance Team</span>
            <button class="text-indigo-600 font-bold hover:underline">Edit</button>
          </div>
        </div>

        <!-- Token Velocity Spike Alert -->
        <div class="p-6 bg-white border border-brand-border rounded-2xl shadow-xs flex flex-col justify-between gap-4">
          <div class="flex justify-between items-start">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Token Velocity Spike</span>
            <span class="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[9px] font-bold">ACTIVE</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-3xl font-display font-black text-slate-900 font-mono">&gt; 2M tokens / hr</span>
            <span class="text-xs text-slate-500 font-semibold">Detects runaway script loops</span>
          </div>
          <div class="pt-3 border-t flex items-center justify-between text-[11px] text-slate-500 font-semibold">
            <span>Action: Auto-throttle 50%</span>
            <button class="text-indigo-600 font-bold hover:underline">Edit</button>
          </div>
        </div>

        <!-- Provider Uptime Degraded Alert -->
        <div class="p-6 bg-white border border-brand-border rounded-2xl shadow-xs flex flex-col justify-between gap-4">
          <div class="flex justify-between items-start">
            <span class="text-xs font-bold text-slate-500 uppercase tracking-wider">Provider Error Spikes</span>
            <span class="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[9px] font-bold">ACTIVE</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-3xl font-display font-black text-slate-900 font-mono">Error Rate &gt; 5%</span>
            <span class="text-xs text-slate-500 font-semibold">Over 2-minute rolling window</span>
          </div>
          <div class="pt-3 border-t flex items-center justify-between text-[11px] text-slate-500 font-semibold">
            <span>Action: Force Failover</span>
            <button class="text-indigo-600 font-bold hover:underline">Edit</button>
          </div>
        </div>
      </div>

      <!-- Recent Triggered Alerts Log -->
      <div class="bg-white border border-brand-border rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
        <h3 class="font-bold text-base text-slate-900">Historical Alert Log</h3>

        <div class="border border-slate-200 rounded-xl overflow-hidden text-xs">
          <table class="w-full text-left font-semibold">
            <thead class="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th class="px-5 py-3.5">Severity</th>
                <th class="px-5 py-3.5">Alert Event</th>
                <th class="px-5 py-3.5">Department</th>
                <th class="px-5 py-3.5">Timestamp</th>
                <th class="px-5 py-3.5">Resolution</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-slate-700">
              <tr class="hover:bg-slate-50/50">
                <td class="px-5 py-3.5"><span class="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-[10px] font-bold">Warning</span></td>
                <td class="px-5 py-3.5 font-bold text-slate-900">Engineering token spend reached 75% of monthly budget ($4,500.00)</td>
                <td class="px-5 py-3.5">Core Engineering</td>
                <td class="px-5 py-3.5 font-mono text-slate-500">Aug 22, 11:30 UTC</td>
                <td class="px-5 py-3.5 text-emerald-600 font-bold">Acknowledged</td>
              </tr>
              <tr class="hover:bg-slate-50/50">
                <td class="px-5 py-3.5"><span class="px-2 py-0.5 bg-rose-50 text-rose-700 rounded-full text-[10px] font-bold">Critical</span></td>
                <td class="px-5 py-3.5 font-bold text-slate-900">Upstream OpenAI latency exceeded 1,200ms threshold (Failover initiated)</td>
                <td class="px-5 py-3.5">All Workspaces</td>
                <td class="px-5 py-3.5 font-mono text-slate-500">Aug 21, 14:22 UTC</td>
                <td class="px-5 py-3.5 text-emerald-600 font-bold">Auto-Resolved</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export function bindAdminAlerts() {
  const newBtn = document.getElementById("create-alert-rule-btn");
  if (newBtn) {
    newBtn.addEventListener("click", () => {
      alert("Opening Enterprise Alert Rule Builder modal...");
    });
  }
}

export default {
  adminAlerts,
  bindAdminAlerts
};
