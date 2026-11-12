// APP PAGE: requests (Database-backed)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function appRequests() {
  return `
    <div class="flex flex-col gap-6 animate-fade-in-up font-sans relative overflow-hidden">
      <div class="flex justify-between items-center select-none">
        <div class="flex flex-col gap-1">
          <span class="text-[9px] font-bold text-white uppercase tracking-widest">Observability Logs</span>
          <h1 class="font-display font-black text-2xl text-white uppercase leading-none">Requests Trace Log</h1>
          <p class="text-xs text-[#A1A5AD] font-bold">Audit every transaction flowing through your namespace endpoints in PostgreSQL.</p>
        </div>
      </div>
      
      <div class="border border-[#292D34] bg-[#101216] rounded-xl shadow-sm overflow-hidden select-none">
        <table class="w-full text-left border-collapse text-xs font-semibold text-white">
          <thead>
            <tr class="bg-[#15181D] border-b border-[#292D34] font-bold uppercase text-[9px] text-[#A1A5AD] tracking-wider">
              <th class="px-6 py-4">Request ID</th>
              <th class="px-6 py-4">Timestamp</th>
              <th class="px-6 py-4">Model Destination</th>
              <th class="px-6 py-4">Tokens</th>
              <th class="px-6 py-4">Latency</th>
              <th class="px-6 py-4">Cost</th>
              <th class="px-6 py-4">Cache</th>
              <th class="px-6 py-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody id="requests-table-body" class="divide-y divide-[#292D34]/60">
            <tr>
              <td colspan="8" class="px-6 py-8 text-center text-[#A1A5AD]">
                <div class="flex items-center justify-center gap-2">
                  <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                  <span>Loading live request telemetry from Supabase...</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Request Details Drawer -->
      <div id="request-detail-drawer" class="fixed inset-y-0 right-0 w-96 bg-[#101216] border-l border-[#292D34] shadow-2xl flex flex-col justify-between p-6 transform translate-x-full transition-transform duration-300 z-50">
        <div class="flex flex-col gap-6 overflow-y-auto select-none">
          <div class="flex justify-between items-center border-b border-[#292D34] pb-3 shrink-0">
            <span class="font-display font-bold text-sm text-white uppercase tracking-wider">Transaction Trace</span>
            <button id="close-drawer-btn" class="p-1.5 hover:bg-[#15181D] rounded-lg text-[#A1A5AD]">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <div class="flex flex-col gap-4 text-xs font-semibold text-[#A1A5AD]">
            <div class="flex flex-col gap-1 border-b border-[#292D34] pb-3">
              <span class="text-[9px] uppercase font-bold text-[#A1A5AD]">Request ID</span>
              <span id="trace-lbl-id" class="font-bold text-xs text-white font-mono select-all truncate">-</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-[9px] uppercase font-bold text-[#A1A5AD]">Target Model & Provider</span>
              <span id="trace-lbl-model" class="font-bold text-white">-</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-[9px] uppercase font-bold text-[#A1A5AD]">Execution Latency</span>
              <span id="trace-lbl-lat" class="font-bold text-emerald-400 font-mono">-</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-[9px] uppercase font-bold text-[#A1A5AD]">Tokens (Prompt / Completion / Total)</span>
              <span id="trace-lbl-tokens" class="font-bold text-white font-mono">-</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-[9px] uppercase font-bold text-[#A1A5AD]">Calculated Cost</span>
              <span id="trace-lbl-cost" class="font-bold text-white font-mono">-</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-[9px] uppercase font-bold text-[#A1A5AD]">Invoking Principal</span>
              <span id="trace-lbl-user" class="font-bold text-white">-</span>
            </div>
            <div class="flex flex-col gap-1 border-t border-[#292D34] pt-3">
              <span class="text-[9px] uppercase font-bold text-[#A1A5AD]">Cache Status</span>
              <span id="trace-lbl-cache" class="font-bold text-white">-</span>
            </div>
          </div>
        </div>
        
        <div class="pt-4 border-t border-[#292D34] shrink-0">
          <button id="close-drawer-bottom-btn" class="w-full py-2.5 bg-[#15181D] hover:bg-[#1E2235] border border-[#292D34] text-white font-bold rounded-lg text-xs uppercase tracking-wider">
            Close Trace
          </button>
        </div>
      </div>
    </div>
  `;
}

export async function bindAppRequests() {
  const tableBody = document.getElementById("requests-table-body");
  const drawer = document.getElementById("request-detail-drawer");
  const closeBtn = document.getElementById("close-drawer-btn");
  const closeBottomBtn = document.getElementById("close-drawer-bottom-btn");

  const lblId = document.getElementById("trace-lbl-id");
  const lblModel = document.getElementById("trace-lbl-model");
  const lblLat = document.getElementById("trace-lbl-lat");
  const lblTokens = document.getElementById("trace-lbl-tokens");
  const lblCost = document.getElementById("trace-lbl-cost");
  const lblUser = document.getElementById("trace-lbl-user");
  const lblCache = document.getElementById("trace-lbl-cache");

  // Fetch real logs from PostgreSQL
  const requests = await apiService.getRequests(50);

  if (!requests || requests.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="8" class="px-6 py-8 text-center text-[#A1A5AD]">
          <p class="font-bold">No AI requests logged yet.</p>
          <p class="text-[11px] mt-1">Send a prompt in the <a href="/app/playground" data-link class="text-white underline font-bold">Playground</a> or use your <a href="/app/api-keys" data-link class="text-white underline font-bold">API Key</a>.</p>
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = requests.map(r => `
    <tr class="request-row hover:bg-[#15181D]/50 cursor-pointer transition-colors"
        data-id="${r.id}"
        data-model="${r.model}"
        data-provider="${r.provider}"
        data-latency="${r.latency}"
        data-cost="${r.cost}"
        data-tokens-input="${r.tokensInput || 0}"
        data-tokens-output="${r.tokensOutput || 0}"
        data-tokens-total="${r.totalTokens || 0}"
        data-user="${r.user || r.keyName || 'Developer'}"
        data-cache="${r.cache || 'MISS'}"
        data-status="${r.statusCode || 200}"
        data-stamp="${r.timestamp}">
      <td class="px-6 py-4 font-mono text-white font-bold truncate max-w-[140px]">${r.id ? r.id.substring(0, 13) + '...' : '-'}</td>
      <td class="px-6 py-4 text-[#A1A5AD] font-semibold">${new Date(r.timestamp).toLocaleTimeString()}</td>
      <td class="px-6 py-4 font-bold text-white">${r.model}</td>
      <td class="px-6 py-4 font-mono text-[#A1A5AD]">${r.totalTokens || (r.tokensInput + r.tokensOutput) || 0}</td>
      <td class="px-6 py-4 font-mono font-bold text-emerald-400">${r.latency}ms</td>
      <td class="px-6 py-4 font-mono text-white">${r.cost === 0 ? "$0.00" : `$${parseFloat(r.cost).toFixed(5)}`}</td>
      <td class="px-6 py-4">
        <span class="px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${r.cache === "HIT" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-[#15181D] text-[#A1A5AD] border border-[#292D34]"}">${r.cache || 'MISS'}</span>
      </td>
      <td class="px-6 py-4 text-right">
        <span class="w-2 h-2 rounded-full ${r.statusCode === 200 || r.status === 'success' ? 'bg-emerald-400' : 'bg-rose-500'} inline-block"></span>
      </td>
    </tr>
  `).join("");

  // Drawer binding
  document.querySelectorAll(".request-row").forEach(row => {
    row.addEventListener("click", () => {
      if (lblId) lblId.innerText = row.getAttribute("data-id");
      if (lblModel) lblModel.innerText = `${row.getAttribute("data-model")} (${row.getAttribute("data-provider")})`;
      if (lblLat) lblLat.innerText = `${row.getAttribute("data-latency")}ms`;
      if (lblTokens) lblTokens.innerText = `${row.getAttribute("data-tokens-input")} in / ${row.getAttribute("data-tokens-output")} out (${row.getAttribute("data-tokens-total")} total)`;
      if (lblCost) lblCost.innerText = `$${parseFloat(row.getAttribute("data-cost")).toFixed(6)} USD`;
      if (lblUser) lblUser.innerText = row.getAttribute("data-user");
      if (lblCache) lblCache.innerText = row.getAttribute("data-cache");

      drawer?.classList.remove("translate-x-full");
    });
  });

  const closeDrawer = () => {
    drawer?.classList.add("translate-x-full");
  };

  closeBtn?.addEventListener("click", closeDrawer);
  closeBottomBtn?.addEventListener("click", closeDrawer);
}

export default {
  appRequests,
  bindAppRequests
};
