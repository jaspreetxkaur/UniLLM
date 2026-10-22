// ADMIN PAGE: settings
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function adminSettings() {
  return `
    <div class="flex flex-col gap-8 animate-fade-in-up font-sans select-none max-w-4xl">
      <!-- Top Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-border pb-5">
        <div class="flex flex-col gap-1">
          <span class="text-[9px] font-bold text-indigo-700 uppercase tracking-widest">Organization Admin</span>
          <h1 class="font-display font-black text-3xl text-brand-text uppercase leading-none font-bold">Organization Settings</h1>
          <p class="text-xs text-brand-muted font-semibold mt-1">Manage organization profile, data residency constraints, and model access policies.</p>
        </div>
      </div>

      <!-- Org Profile -->
      <div class="bg-[#10121A] border border-[#1F2438] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
        <h3 class="font-bold text-base text-white border-b border-[#1F2438] pb-3">Organization Profile</h3>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
          <div class="flex flex-col gap-1.5">
            <label class="text-[#8E98B0] text-[11px]">Organization Name</label>
            <input type="text" value="Cyberdyne Systems Corp" class="p-3 border border-[#1F2438] rounded-xl bg-[#161926] text-white font-bold outline-none focus:border-[#38BDF8]" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[#8E98B0] text-[11px]">Primary Domain</label>
            <input type="text" value="cyberdyne.org" class="p-3 border border-[#1F2438] rounded-xl bg-[#161926] text-white font-bold outline-none" readonly />
          </div>
        </div>
      </div>

      <!-- Data Residency & Compliance -->
      <div class="bg-[#10121A] border border-[#1F2438] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
        <h3 class="font-bold text-base text-white border-b border-[#1F2438] pb-3">Data Residency & Geo-Fencing</h3>

        <div class="flex flex-col gap-4 text-xs font-semibold">
          <div class="flex flex-col gap-1.5">
            <label class="text-[#8E98B0]">Enforce Geographic Boundary for Routing</label>
            <select class="p-3 border border-[#1F2438] rounded-xl bg-[#161926] text-white font-bold focus:border-[#38BDF8] outline-none cursor-pointer">
              <option value="global" class="bg-[#10121A] text-white">Global Edge Routing (Lowest Latency)</option>
              <option value="us-only" class="bg-[#10121A] text-white">United States Only (US-East & US-West)</option>
              <option value="eu-only" class="bg-[#10121A] text-white">European Union Only (Frankfurt & London - GDPR strict)</option>
            </select>
            <span class="text-[10px] text-[#8E98B0]/70">Restricts all API traffic and cache storage strictly to selected regional data centers.</span>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-[#1F2438]">
            <div class="flex flex-col">
              <span class="font-bold text-xs text-white">Zero-Retention Proxy Mode</span>
              <span class="text-[11px] text-[#8E98B0] font-medium">Prohibits all request payloads from being temporarily cached in memory.</span>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer">
              <div class="w-9 h-5 bg-[#161926] border border-[#1F2438] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#38BDF8]"></div>
            </label>
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <button id="save-org-settings-btn" class="px-6 py-2.5 bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#07080B] font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-xs">
            Save Organization Policies
          </button>
        </div>
      </div>

      <!-- Admin Session Security & Logout Card -->
      <div class="bg-[#10121A] border border-rose-500/20 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-5">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#1F2438] pb-4">
          <div>
            <h3 class="font-bold text-base text-rose-400">Admin Session & Access Control</h3>
            <p class="text-xs text-[#8E98B0] font-medium mt-0.5">Terminate privileged administrative credentials and return to login.</p>
          </div>
          <button id="admin-profile-logout-btn" class="px-5 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold rounded-xl text-xs flex items-center gap-2 uppercase tracking-wider transition-all shadow-xs">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Sign Out of Admin Portal
          </button>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#8E98B0] font-medium">
          <span>Session Scope: <span class="font-mono text-white font-bold">Admin Root</span></span>
          <span class="text-emerald-600 font-bold flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Authenticated Session Active</span>
        </div>
      </div>
    </div>
  `;
}

export function bindAdminSettings() {
  const saveBtn = document.getElementById("save-org-settings-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      saveBtn.textContent = "Saving...";
      setTimeout(() => {
        saveBtn.textContent = "Save Organization Policies";
        components.renderToast("success", "Organization governance policies updated successfully!");
      }, 350);
    });
  }

  const adminLogoutBtn = document.getElementById("admin-profile-logout-btn");
  adminLogoutBtn?.addEventListener("click", () => {
    apiService.logout();
    components.renderToast("info", "Logged out of admin session.");
    router.navigate("/login");
  });
}

export default {
  adminSettings,
  bindAdminSettings
};
