// ADMIN PAGE: security
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function adminSecurity() {
  return `
    <div class="flex flex-col gap-8 animate-fade-in-up font-sans select-none max-w-6xl">
      <!-- Top Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-border pb-5">
        <div class="flex flex-col gap-1">
          <span class="text-[9px] font-bold text-indigo-700 uppercase tracking-widest">Enterprise Security</span>
          <h1 class="font-display font-black text-3xl text-brand-text uppercase leading-none font-bold">Single Sign-On (SSO) & Compliance</h1>
          <p class="text-xs text-brand-muted font-semibold mt-1">Configure SAML 2.0 Identity Providers, SCIM user lifecycle synchronization, and audit log streaming.</p>
        </div>
      </div>

      <!-- SAML SSO Config Card -->
      <div class="bg-[#10121A] border border-[#1F2438] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
        <div class="flex justify-between items-center border-b border-[#1F2438] pb-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl">🛡️</span>
            <div class="flex flex-col">
              <h3 class="font-bold text-base text-white">SAML 2.0 Identity Provider</h3>
              <p class="text-xs text-[#8E98B0] font-medium">Enforce corporate authentication across all developer workspaces.</p>
            </div>
          </div>
          <span class="px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold rounded-full">
            ● Configured & Active (Okta)
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-semibold">
          <div class="flex flex-col gap-1.5">
            <label class="text-[#8E98B0] text-[11px]">SAML Single Sign-On URL (ACS)</label>
            <input type="text" value="https://api.unillm.com/sso/saml/acs/cyberdyne" class="p-3 border border-[#1F2438] rounded-xl bg-[#161926] text-white font-mono font-bold outline-none" readonly />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[#8E98B0] text-[11px]">Audience URI (SP Entity ID)</label>
            <input type="text" value="https://api.unillm.com/sso/saml/metadata/cyberdyne" class="p-3 border border-[#1F2438] rounded-xl bg-[#161926] text-white font-mono font-bold outline-none" readonly />
          </div>
        </div>

        <div class="flex items-center justify-between pt-4 border-t border-[#1F2438]">
          <div class="flex flex-col">
            <span class="font-bold text-xs text-white">Enforce SSO for All Team Members</span>
            <span class="text-[11px] text-[#8E98B0] font-medium">Disallow password-based login for users on the @cyberdyne.org domain.</span>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked class="sr-only peer">
            <div class="w-9 h-5 bg-[#161926] border border-[#1F2438] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#38BDF8]"></div>
          </label>
        </div>
      </div>

      <!-- Audit Log SIEM Streaming -->
      <div class="bg-[#10121A] border border-[#1F2438] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
        <div class="flex justify-between items-center border-b border-[#1F2438] pb-4">
          <div class="flex items-center gap-3">
            <span class="text-2xl">📡</span>
            <div class="flex flex-col">
              <h3 class="font-bold text-base text-white">Audit Log SIEM Streaming</h3>
              <p class="text-xs text-[#8E98B0] font-medium">Stream real-time security events to your corporate SIEM (Datadog, Splunk, AWS S3).</p>
            </div>
          </div>
          <button id="configure-siem-btn" class="px-4 py-2 bg-[#161926] hover:bg-[#1F2438] text-white border border-[#1F2438] font-bold rounded-xl text-xs uppercase tracking-wider transition-colors">
            + Add SIEM Destination
          </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-semibold">
          <div class="p-4 bg-[#161926] border border-[#1F2438] rounded-xl flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-xl">🐶</span>
              <div class="flex flex-col">
                <span class="font-bold text-white">Datadog Security Stream</span>
                <span class="text-[10px] text-[#8E98B0] font-mono">https://http-intake.logs.datadoghq.com</span>
              </div>
            </div>
            <span class="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[9px] font-bold">STREAMING</span>
          </div>

          <div class="p-4 bg-[#161926] border border-[#1F2438] rounded-xl flex items-center justify-between">
            <div class="flex items-center gap-3">
              <span class="text-xl">🪣</span>
              <div class="flex flex-col">
                <span class="font-bold text-white">AWS S3 Cold Archive</span>
                <span class="text-[10px] text-[#8E98B0] font-mono">s3://cyberdyne-audit-vault-us-east-1</span>
              </div>
            </div>
            <span class="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded text-[9px] font-bold">STREAMING</span>
          </div>
        </div>
      </div>
    </div>
  `;
}

export function bindAdminSecurity() {
  const siemBtn = document.getElementById("configure-siem-btn");
  if (siemBtn) {
    siemBtn.addEventListener("click", () => {
      alert("Opening SIEM integration wizard (Splunk, Datadog, S3, Sumo Logic)...");
    });
  }
}

export default {
  adminSecurity,
  bindAdminSecurity
};
