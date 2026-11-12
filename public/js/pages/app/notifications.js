// APP PAGE: notifications
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function appNotifications() {
  const alerts = apiService.getAlerts() || [];

  return `
    <div class="flex flex-col gap-8 animate-fade-in-up font-sans select-none max-w-6xl">
      <!-- Top Title Bar -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#292D34] pb-5">
        <div class="flex flex-col gap-1">
          <span class="text-[9px] font-bold text-white uppercase tracking-widest">Alerts & Subscriptions</span>
          <h1 class="font-display font-black text-3xl text-white uppercase leading-none font-bold">Notifications & Webhooks</h1>
          <p class="text-xs text-[#A1A5AD] font-semibold mt-1">Configure real-time event triggers for budget thresholds, provider downtime, and failover events.</p>
        </div>
        <div class="flex items-center gap-3">
          <button id="test-webhook-btn" class="px-4 py-2 bg-slate-900 hover:bg-white text-black text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center gap-2">
            <span>📡</span>
            <span>Send Test Webhook</span>
          </button>
        </div>
      </div>

      <!-- Channel Integrations Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Slack Integration -->
        <div class="p-6 bg-[#101216] border border-[#292D34] rounded-2xl shadow-xs flex flex-col justify-between gap-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-2xl">💬</span>
              <div class="flex flex-col">
                <span class="font-bold text-sm text-white">Slack Alerts</span>
                <span class="text-[10px] text-[#A1A5AD] font-semibold">#ai-gateway-ops</span>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked class="sr-only peer">
              <div class="w-9 h-5 bg-[#15181D] border border-[#292D34] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white"></div>
            </label>
          </div>
          <p class="text-xs text-[#A1A5AD] leading-relaxed font-semibold">Sends instant alerts on upstream provider HTTP 500 errors and failover redirects.</p>
        </div>

        <!-- PagerDuty Integration -->
        <div class="p-6 bg-[#101216] border border-[#292D34] rounded-2xl shadow-xs flex flex-col justify-between gap-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-2xl">🚨</span>
              <div class="flex flex-col">
                <span class="font-bold text-sm text-white">PagerDuty Incidents</span>
                <span class="text-[10px] text-[#A1A5AD] font-semibold">Sev-1 Gateway Alerts</span>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked class="sr-only peer">
              <div class="w-9 h-5 bg-[#15181D] border border-[#292D34] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white"></div>
            </label>
          </div>
          <p class="text-xs text-[#A1A5AD] leading-relaxed font-semibold">Triggers on-call engineer paging if total fallback pool health drops below 50%.</p>
        </div>

        <!-- Email Summaries -->
        <div class="p-6 bg-[#101216] border border-[#292D34] rounded-2xl shadow-xs flex flex-col justify-between gap-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-2xl">📬</span>
              <div class="flex flex-col">
                <span class="font-bold text-sm text-white">Daily Digest</span>
                <span class="text-[10px] text-[#A1A5AD] font-semibold">Engineering Leads</span>
              </div>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" checked class="sr-only peer">
              <div class="w-9 h-5 bg-[#15181D] border border-[#292D34] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white"></div>
            </label>
          </div>
          <p class="text-xs text-[#A1A5AD] leading-relaxed font-semibold">Daily roll-up of total token spend, cache hit savings, and average routing latencies.</p>
        </div>
      </div>

      <!-- Webhook Endpoints Table -->
      <div class="bg-[#101216] border border-[#292D34] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
        <div class="flex justify-between items-center border-b border-[#292D34] pb-4">
          <div class="flex flex-col">
            <h3 class="font-bold text-base text-white">Custom Webhook Endpoints</h3>
            <p class="text-xs text-[#A1A5AD] font-semibold">Receive JSON payloads on request completion or budget threshold breaches.</p>
          </div>
          <button id="add-webhook-btn" class="px-4 py-2 bg-[#15181D] hover:bg-[#1E2235] border border-[#292D34] text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors">
            + New Webhook
          </button>
        </div>

        <div class="border border-[#292D34] rounded-xl overflow-hidden text-xs">
          <table class="w-full text-left font-semibold">
            <thead class="bg-[#15181D] border-b border-[#292D34] text-[10px] font-bold text-[#A1A5AD] uppercase tracking-wider">
              <tr>
                <th class="px-5 py-3.5">Endpoint URL</th>
                <th class="px-5 py-3.5">Subscribed Events</th>
                <th class="px-5 py-3.5">Last Delivery</th>
                <th class="px-5 py-3.5">Status</th>
                <th class="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#292D34] text-[#A1A5AD]">
              <tr class="hover:bg-[#15181D]/50 transition-colors">
                <td class="px-5 py-3.5 font-mono font-bold text-white">https://api.cyberdyne.org/webhooks/unillm</td>
                <td class="px-5 py-3.5 text-[#A1A5AD]">request.completed, failover.triggered</td>
                <td class="px-5 py-3.5 font-mono text-[#A1A5AD]">2 mins ago (200 OK)</td>
                <td class="px-5 py-3.5"><span class="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-bold">Active</span></td>
                <td class="px-5 py-3.5 text-right"><button class="text-rose-400 hover:underline">Remove</button></td>
              </tr>
              <tr class="hover:bg-[#15181D]/50 transition-colors">
                <td class="px-5 py-3.5 font-mono font-bold text-white">https://hooks.slack.com/services/T00/B00/X00</td>
                <td class="px-5 py-3.5 text-[#A1A5AD]">budget.threshold_80</td>
                <td class="px-5 py-3.5 font-mono text-[#A1A5AD]">3 hours ago (200 OK)</td>
                <td class="px-5 py-3.5"><span class="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 rounded-full text-[10px] font-bold">Active</span></td>
                <td class="px-5 py-3.5 text-right"><button class="text-rose-400 hover:underline">Remove</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export function bindAppNotifications() {
  const testBtn = document.getElementById("test-webhook-btn");
  const addBtn = document.getElementById("add-webhook-btn");

  if (testBtn) {
    testBtn.addEventListener("click", () => {
      testBtn.textContent = "Dispatching Ping...";
      setTimeout(() => {
        testBtn.textContent = "Send Test Webhook";
        alert("Webhook test payload delivered! Status: 200 OK in 44ms.");
      }, 400);
    });
  }

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const url = prompt("Enter your webhook destination URL:", "https://");
      if (url && url.startsWith("http")) {
        alert("Webhook destination registered successfully!");
      }
    });
  }
}

export default {
  appNotifications,
  bindAppNotifications
};
