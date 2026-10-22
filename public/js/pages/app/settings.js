// APP PAGE: settings (Redesigned for Screen 10 Dark Cinematic Settings)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function appSettings() {
  const user = apiService.getCurrentUser() || { name: "Jaspreet Kaur", email: "jaspreet@example.com", role: "Owner" };
  const initial = user.name ? user.name[0].toUpperCase() : "J";

  return `
    <div class="flex flex-col gap-6 animate-fade-in-up font-sans select-none max-w-4xl text-white">
      
      <!-- Top Title Bar (Screen 10) -->
      <div class="flex flex-col gap-1 pb-2">
        <h1 class="font-sans font-bold text-2xl text-white tracking-tight">Settings</h1>
        <p class="text-xs text-[#8E98B0]">Manage your account and preferences.</p>
      </div>

      <!-- Settings Sub-tabs (Screen 10) -->
      <div class="flex items-center gap-2 overflow-x-auto pb-1 select-none">
        <button class="settings-tab-btn active px-4 py-1.5 rounded-full text-xs font-medium bg-[#161926] text-white border border-[#1F2438] transition-all" data-tab="profile">
          Profile
        </button>
        <button class="settings-tab-btn px-4 py-1.5 rounded-full text-xs font-medium text-[#8E98B0] hover:text-white transition-all" data-tab="organization">
          Organization
        </button>
        <button class="settings-tab-btn px-4 py-1.5 rounded-full text-xs font-medium text-[#8E98B0] hover:text-white transition-all" data-tab="billing">
          Billing
        </button>
        <button class="settings-tab-btn px-4 py-1.5 rounded-full text-xs font-medium text-[#8E98B0] hover:text-white transition-all" data-tab="preferences">
          Preferences
        </button>
      </div>

      <!-- Profile Information Card (Screen 10) -->
      <div class="rounded-2xl bg-[#10121A] border border-[#1F2438] p-6 sm:p-8 flex flex-col gap-6">
        <div>
          <h2 class="font-sans font-bold text-base text-white">Profile information</h2>
          <p class="text-xs text-[#8E98B0] mt-0.5">Update your display name and public account identity.</p>
        </div>

        <form id="developer-profile-form" class="flex flex-col gap-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <!-- Name -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-mono uppercase tracking-wider text-[#8E98B0]">Name</label>
              <input 
                type="text" 
                id="developer-profile-name" 
                value="${user.name || ''}" 
                placeholder="e.g. Jaspreet Kaur"
                class="p-3 rounded-xl border border-[#1F2438] bg-[#161926] text-white placeholder-[#8E98B0]/50 focus:border-[#38BDF8] outline-none transition-colors" 
                required
              />
            </div>

            <!-- Email -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-mono uppercase tracking-wider text-[#8E98B0]">Email</label>
              <input 
                type="email" 
                value="${user.email || ''}" 
                class="p-3 rounded-xl border border-[#1F2438] bg-[#121522] text-[#8E98B0] font-mono outline-none cursor-not-allowed" 
                readonly 
                title="Email address is tied to your primary credentials"
              />
            </div>
          </div>

          <!-- Profile Picture Row (Screen 10) -->
          <div class="flex items-center justify-between pt-4 border-t border-[#1F2438]">
            <div class="flex items-center gap-3">
              <span class="text-xs text-[#8E98B0]">Profile Picture</span>
              <div class="w-8 h-8 rounded-full bg-[#161926] border border-[#1F2438] text-white font-bold text-xs flex items-center justify-center">
                ${initial}
              </div>
            </div>
            <button type="button" class="px-3.5 py-1.5 rounded-lg bg-[#161926] hover:bg-[#1E2235] text-xs text-white border border-[#1F2438] transition-colors">
              Change
            </button>
          </div>

          <!-- Save Button (Screen 10) -->
          <div class="flex justify-end pt-3">
            <button 
              type="submit" 
              id="save-profile-btn" 
              class="px-6 py-2.5 rounded-full bg-white hover:bg-slate-200 text-[#07080B] font-semibold text-xs transition-all shadow-sm"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <!-- Gateway Routing Defaults Card -->
      <div class="rounded-2xl bg-[#10121A] border border-[#1F2438] p-6 sm:p-8 flex flex-col gap-6">
        <div>
          <h2 class="font-sans font-bold text-base text-white">Default Gateway Fallbacks</h2>
          <p class="text-xs text-[#8E98B0] mt-0.5">Configure models when client requests omit explicit model parameters.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-mono uppercase tracking-wider text-[#8E98B0]">Primary Default Model</label>
            <select class="p-3 rounded-xl border border-[#1F2438] bg-[#161926] text-white focus:border-[#38BDF8] outline-none cursor-pointer">
              <option value="gpt-4o">OpenAI GPT-4o (Default)</option>
              <option value="claude-3-5-sonnet">Anthropic Claude 3.5 Sonnet</option>
              <option value="gemini-1.5-pro">Google Gemini 1.5 Pro</option>
              <option value="groq-llama-3-70b">Groq Llama 3 70B</option>
            </select>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-mono uppercase tracking-wider text-[#8E98B0]">Automatic Fallback Model</label>
            <select class="p-3 rounded-xl border border-[#1F2438] bg-[#161926] text-white focus:border-[#38BDF8] outline-none cursor-pointer">
              <option value="claude-3-5-sonnet">Anthropic Claude 3.5 Sonnet (Default)</option>
              <option value="gemini-1.5-pro">Google Gemini 1.5 Pro</option>
              <option value="gpt-4o-mini">OpenAI GPT-4o Mini</option>
            </select>
          </div>
        </div>

        <!-- Telemetry & Logging Toggle -->
        <div class="flex items-center justify-between pt-4 border-t border-[#1F2438]">
          <div class="flex flex-col">
            <span class="text-xs font-medium text-white">Detailed Request Telemetry & Tracing</span>
            <span class="text-[11px] text-[#8E98B0]">Capture latency, token counts, and routing decisions in Console Traces.</span>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked class="sr-only peer">
            <div class="w-9 h-5 bg-[#161926] border border-[#1F2438] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#38BDF8]"></div>
          </label>
        </div>

        <div class="flex justify-end pt-2">
          <button id="save-settings-btn" class="px-5 py-2.5 rounded-full bg-[#161926] hover:bg-[#1E2235] text-white text-xs font-medium border border-[#1F2438] transition-colors">
            Save Preferences
          </button>
        </div>
      </div>

      <!-- Active Session & Security Card -->
      <div class="rounded-2xl bg-[#10121A] border border-rose-900/30 p-6 sm:p-8 flex flex-col gap-4">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 class="font-sans font-bold text-sm text-rose-400">Active Session & Security</h3>
            <p class="text-xs text-[#8E98B0] mt-0.5">End your current session across this device.</p>
          </div>
          <button id="profile-logout-btn" class="px-4 py-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-semibold flex items-center gap-2 transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Log Out
          </button>
        </div>
      </div>

    </div>
  `;
}

export function bindAppSettings() {
  const profileForm = document.getElementById("developer-profile-form");
  const saveProfileBtn = document.getElementById("save-profile-btn");
  const nameInput = document.getElementById("developer-profile-name");

  profileForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const newName = nameInput.value.trim();
    if (!newName) {
      components.renderToast("error", "Full name cannot be empty.");
      return;
    }

    saveProfileBtn.disabled = true;
    saveProfileBtn.innerText = "Saving...";

    setTimeout(() => {
      apiService.updateCurrentUser({ name: newName });
      saveProfileBtn.disabled = false;
      saveProfileBtn.innerText = "Save Changes";
      components.renderToast("success", `Profile name updated to ${newName}!`);
      router.resolve();
    }, 250);
  });

  const saveBtn = document.getElementById("save-settings-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      saveBtn.textContent = "Saving...";
      setTimeout(() => {
        saveBtn.textContent = "Save Preferences";
        components.renderToast("success", "Workspace preferences updated successfully!");
      }, 350);
    });
  }

  const profileLogoutBtn = document.getElementById("profile-logout-btn");
  profileLogoutBtn?.addEventListener("click", () => {
    apiService.logout();
    components.renderToast("info", "Logged out successfully.");
    router.navigate("/login");
  });
}

export default {
  appSettings,
  bindAppSettings
};
