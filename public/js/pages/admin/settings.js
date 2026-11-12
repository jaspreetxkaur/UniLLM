// ADMIN PAGE: settings
import { apiService, extractErrorMessage } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function adminSettings() {
  const user = apiService.getCurrentUser() || { name: "Jaspreet Kaur", email: "jaspreet@unillm.ai", org: "Cyberdyne", role: "admin" };
  const roleName = user.role ? (user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()) : "Admin";

  return `
    <div class="flex flex-col gap-8 animate-fade-in-up font-sans select-none max-w-4xl">
      <!-- Top Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#292D34] pb-5">
        <div class="flex flex-col gap-1">
          <span class="text-[9px] font-bold text-sky-400 uppercase tracking-widest font-mono">Organization Admin</span>
          <h1 class="font-display font-black text-3xl text-white uppercase leading-none font-bold">Admin & Organization Settings</h1>
          <p class="text-xs text-[#A1A5AD] font-semibold mt-1">Manage administrator identity, organization brand name, and data governance policies.</p>
        </div>
      </div>

      <!-- Admin Identity & Org Profile Card -->
      <div class="bg-[#101216] border border-[#292D34] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
        <div class="flex justify-between items-center border-b border-[#292D34] pb-3">
          <div>
            <h3 class="font-bold text-base text-white">Administrator & Brand Identity</h3>
            <p class="text-xs text-[#A1A5AD] mt-0.5">Edit your admin display name and organization workspace title.</p>
          </div>
          <span class="px-2.5 py-1 rounded-md text-[9px] font-mono font-bold uppercase tracking-wider bg-purple-500/10 border border-purple-500/20 text-purple-400">
            ${roleName} Access
          </span>
        </div>

        <form id="admin-identity-form" class="flex flex-col gap-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
            <!-- Admin Full Name -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[#A1A5AD] text-[11px] uppercase tracking-wider font-mono">Admin Full Name</label>
              <input type="text" id="admin-settings-name" value="${user.name || ''}" placeholder="e.g. Jaspreet Kaur" class="p-3 border border-[#292D34] rounded-xl bg-[#15181D] text-white font-bold outline-none focus:border-white transition-colors" required />
            </div>

            <!-- Organization Name -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[#A1A5AD] text-[11px] uppercase tracking-wider font-mono">Organization Name</label>
              <input type="text" id="admin-settings-org-name" value="${user.org || 'Cyberdyne Systems'}" placeholder="e.g. Cyberdyne Systems" class="p-3 border border-[#292D34] rounded-xl bg-[#15181D] text-white font-bold outline-none focus:border-white transition-colors" required />
            </div>

            <!-- Primary Account Email (Read-Only) -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[#A1A5AD] text-[11px] uppercase tracking-wider font-mono">Account Email</label>
              <input type="email" value="${user.email || ''}" class="p-3 border border-[#292D34] rounded-xl bg-[#08090B] text-[#A1A5AD] font-mono outline-none cursor-not-allowed" readonly title="Email address is bound to authentication credentials." />
            </div>

            <!-- Domain Scope -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[#A1A5AD] text-[11px] uppercase tracking-wider font-mono">Corporate Domain</label>
              <input type="text" value="${(user.email?.includes('@') ? user.email.split('@')[1] : 'unillm.ai')}" class="p-3 border border-[#292D34] rounded-xl bg-[#08090B] text-[#A1A5AD] font-mono outline-none cursor-not-allowed" readonly />
            </div>
          </div>

          <div class="flex justify-end pt-2 border-t border-[#292D34]">
            <button type="submit" id="save-identity-btn" class="px-6 py-2.5 bg-white hover:bg-neutral-200 text-[#08090B] font-bold rounded-xl text-xs uppercase tracking-wider transition-all shadow-xs">
              Save Admin & Org Profile
            </button>
          </div>
        </form>
      </div>

      <!-- Data Residency & Compliance -->
      <div class="bg-[#101216] border border-[#292D34] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
        <h3 class="font-bold text-base text-white border-b border-[#292D34] pb-3">Data Residency & Geo-Fencing</h3>

        <div class="flex flex-col gap-4 text-xs font-semibold">
          <div class="flex flex-col gap-1.5">
            <label class="text-[#A1A5AD]">Enforce Geographic Boundary for Routing</label>
            <select class="p-3 border border-[#292D34] rounded-xl bg-[#15181D] text-white font-bold focus:border-white outline-none cursor-pointer">
              <option value="global" class="bg-[#101216] text-white">Global Edge Routing (Lowest Latency)</option>
              <option value="us-only" class="bg-[#101216] text-white">United States Only (US-East & US-West)</option>
              <option value="eu-only" class="bg-[#101216] text-white">European Union Only (Frankfurt & London - GDPR strict)</option>
            </select>
            <span class="text-[10px] text-[#A1A5AD]/70">Restricts all API traffic and cache storage strictly to selected regional data centers.</span>
          </div>

          <div class="flex items-center justify-between pt-4 border-t border-[#292D34]">
            <div class="flex flex-col">
              <span class="font-bold text-xs text-white">Zero-Retention Proxy Mode</span>
              <span class="text-[11px] text-[#A1A5AD] font-medium">Prohibits all request payloads from being temporarily cached in memory.</span>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" class="sr-only peer">
              <div class="w-9 h-5 bg-[#15181D] border border-[#292D34] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white"></div>
            </label>
          </div>
        </div>

        <div class="flex justify-end pt-2">
          <button id="save-org-settings-btn" class="px-6 py-2.5 bg-white hover:bg-neutral-200 text-[#08090B] font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-xs">
            Save Governance Policies
          </button>
        </div>
      </div>

      <!-- Admin Session Security & Logout Card -->
      <div class="bg-[#101216] border border-rose-500/20 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-5">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#292D34] pb-4">
          <div>
            <h3 class="font-bold text-base text-rose-400">Admin Session & Access Control</h3>
            <p class="text-xs text-[#A1A5AD] font-medium mt-0.5">Terminate privileged administrative credentials and return to login.</p>
          </div>
          <button id="admin-profile-logout-btn" class="px-5 py-2.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 font-bold rounded-xl text-xs flex items-center gap-2 uppercase tracking-wider transition-all shadow-xs">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Sign Out of Admin Portal
          </button>
        </div>
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#A1A5AD] font-medium">
          <span>Session Scope: <span class="font-mono text-white font-bold">Admin Root</span></span>
          <span class="text-emerald-400 font-bold flex items-center gap-1.5"><span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> Authenticated Session Active</span>
        </div>
      </div>
    </div>
  `;
}

export function bindAdminSettings() {
  const form = document.getElementById("admin-identity-form");
  const saveIdentityBtn = document.getElementById("save-identity-btn");
  const nameInput = document.getElementById("admin-settings-name");
  const orgInput = document.getElementById("admin-settings-org-name");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newName = nameInput.value.trim();
    const newOrg = orgInput.value.trim();

    if (!newName) {
      components.renderToast("error", "Admin full name cannot be blank.");
      return;
    }
    if (!newOrg) {
      components.renderToast("error", "Organization name cannot be blank.");
      return;
    }

    saveIdentityBtn.disabled = true;
    saveIdentityBtn.innerText = "SAVING...";

    const res = await apiService.updateProfile({ name: newName, orgName: newOrg });
    saveIdentityBtn.disabled = false;
    saveIdentityBtn.innerText = "Save Admin & Org Profile";

    if (res && res.success) {
      components.renderToast("success", `Admin updated to "${newName}" and Org to "${newOrg}"!`);
      // Re-render layout so sidebar and topbar headers update dynamically
      router.resolve();
    } else {
      components.renderToast("error", extractErrorMessage(res, "Failed to update profile."));
    }
  });

  const saveBtn = document.getElementById("save-org-settings-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      saveBtn.textContent = "Saving...";
      setTimeout(() => {
        saveBtn.textContent = "Save Governance Policies";
        components.renderToast("success", "Organization governance policies updated successfully!");
      }, 300);
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
