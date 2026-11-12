// ADMIN PAGE: employee referral code
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";

const formatJoinedAt = (iso) => {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return iso;
  }
};

const joinLinkFor = (code) => `${window.location.origin}/signup?ref=${encodeURIComponent(code || "")}`;

const renderJoins = (joins = []) => {
  if (!joins.length) {
    return `<div class="text-center py-10 text-xs text-[#A1A5AD] font-semibold">No employees have joined with this code yet.</div>`;
  }
  return `
    <table class="w-full text-xs text-left">
      <thead class="bg-brand-bg text-[10px] font-bold text-white uppercase tracking-wider border-b border-[#292D34]">
        <tr>
          <th class="px-6 py-3">Employee</th>
          <th class="px-6 py-3">Email</th>
          <th class="px-6 py-3 text-right">Joined</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-brand-border font-semibold text-[#A1A5AD]">
        ${joins.map((join) => `
          <tr>
            <td class="px-6 py-3.5 font-bold text-white">${join.name}</td>
            <td class="px-6 py-3.5 font-mono">${join.email}</td>
            <td class="px-6 py-3.5 text-right font-mono">${formatJoinedAt(join.joinedAt)}</td>
          </tr>
        `).join("")}
      </tbody>
    </table>
  `;
};

export function adminReferrals() {
  return `
    <div class="flex flex-col gap-8 animate-fade-in-up font-sans max-w-4xl">
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#292D34] pb-5 select-none">
        <div class="flex flex-col gap-1">
          <span class="text-[9px] font-bold text-white uppercase tracking-widest">Organization Admin</span>
          <h1 class="font-display font-black text-3xl text-white uppercase leading-none">Employee Referral</h1>
          <p class="text-xs text-[#A1A5AD] font-medium mt-1">Share this code so teammates can create an employee account and join the organization.</p>
        </div>
      </div>

      <div class="bg-[#101216] border border-[#292D34] rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-[#292D34] pb-4">
          <div>
            <h3 class="font-bold text-base text-white">Organization join code</h3>
            <p class="text-xs text-[#A1A5AD] font-medium mt-0.5">Employees enter this during signup, or open the invite link you share.</p>
          </div>
          <label class="inline-flex items-center gap-2.5 cursor-pointer select-none">
            <span class="text-[10px] font-bold uppercase tracking-wider text-[#A1A5AD]">Joining enabled</span>
            <input id="referral-enabled" type="checkbox" class="sr-only peer" checked>
            <div class="relative w-9 h-5 bg-[#15181D] border border-[#292D34] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-white"></div>
          </label>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[9px] uppercase tracking-wider text-[#A1A5AD] font-bold">Referral code</label>
          <div class="flex flex-col sm:flex-row gap-3">
            <div id="referral-code" class="flex-1 px-4 py-3.5 rounded-xl border border-[#292D34] bg-[#15181D] font-mono font-black text-lg sm:text-xl tracking-[0.18em] text-white text-center sm:text-left">
              Loading…
            </div>
            <button type="button" id="copy-referral-code-btn" class="px-5 py-3 bg-white hover:bg-[#0EA5E9] text-[#08090B] font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-sm">
              Copy code
            </button>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[9px] uppercase tracking-wider text-[#A1A5AD] font-bold">Invite link</label>
          <div class="flex flex-col sm:flex-row gap-3">
            <input id="referral-link" type="text" readonly class="flex-1 p-3.5 border border-[#292D34] rounded-xl bg-[#15181D] text-white font-mono text-xs outline-none focus:border-white" value="" />
            <button type="button" id="copy-referral-link-btn" class="px-5 py-3 bg-[#15181D] hover:bg-[#292D34] text-white border border-[#292D34] font-bold rounded-xl text-xs uppercase tracking-wider transition-colors">
              Copy link
            </button>
          </div>
        </div>

        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-[#292D34]">
          <p class="text-[11px] text-[#A1A5AD] font-medium leading-relaxed max-w-md">
            Regenerating invalidates the previous code. Anyone still using the old code will need the new one.
          </p>
          <button type="button" id="regenerate-referral-btn" class="px-5 py-2.5 bg-[#15181D] hover:bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:border-amber-500/60 font-bold rounded-xl text-xs uppercase tracking-wider transition-colors">
            Regenerate code
          </button>
        </div>
      </div>

      <div class="bg-[#101216] border border-[#292D34] rounded-2xl shadow-xs overflow-hidden">
        <div class="px-6 py-4 border-b border-[#292D34] flex items-center justify-between select-none">
          <h3 class="font-bold text-sm text-white">Employees joined via referral</h3>
          <span id="referral-join-count" class="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A1A5AD]">0 joined</span>
        </div>
        <div id="referral-joins-table">
          ${renderJoins([])}
        </div>
      </div>
    </div>
  `;
}

export function bindAdminReferrals() {
  const codeEl = document.getElementById("referral-code");
  const linkEl = document.getElementById("referral-link");
  const countEl = document.getElementById("referral-join-count");
  const tableEl = document.getElementById("referral-joins-table");
  const enabledEl = document.getElementById("referral-enabled");

  const applyReferral = (referral) => {
    if (!referral) return;
    if (codeEl) codeEl.textContent = referral.code || "—";
    if (linkEl) linkEl.value = joinLinkFor(referral.code);
    if (enabledEl) enabledEl.checked = !!referral.enabled;
    const joins = referral.joins || [];
    if (countEl) countEl.textContent = `${joins.length} joined`;
    if (tableEl) tableEl.innerHTML = renderJoins(joins);
  };

  const copyText = async (value, successMessage) => {
    try {
      await navigator.clipboard.writeText(value);
      components.renderToast("success", successMessage);
    } catch {
      components.renderToast("error", "Could not copy to clipboard.");
    }
  };

  apiService.getReferral().then((res) => {
    if (res.success) applyReferral(res.referral);
    else components.renderToast("error", res.message || "Could not load referral code.");
  });

  document.getElementById("copy-referral-code-btn")?.addEventListener("click", () => {
    copyText(codeEl?.textContent?.trim() || "", "Referral code copied.");
  });

  document.getElementById("copy-referral-link-btn")?.addEventListener("click", () => {
    copyText(linkEl?.value || "", "Invite link copied.");
  });

  document.getElementById("regenerate-referral-btn")?.addEventListener("click", async () => {
    const confirmed = window.confirm("Regenerate the employee referral code? The current code will stop working.");
    if (!confirmed) return;
    const res = await apiService.regenerateReferral();
    if (res.success) {
      applyReferral(res.referral);
      components.renderToast("success", "New employee referral code generated.");
    } else {
      components.renderToast("error", res.message || "Could not regenerate code.");
    }
  });

  enabledEl?.addEventListener("change", async () => {
    const res = await apiService.toggleReferral(enabledEl.checked);
    if (res.success) {
      applyReferral(res.referral);
      components.renderToast("success", enabledEl.checked ? "Employee joining is enabled." : "Employee joining is disabled.");
    } else {
      enabledEl.checked = !enabledEl.checked;
      components.renderToast("error", res.message || "Could not update joining status.");
    }
  });
}

export default {
  adminReferrals,
  bindAdminReferrals
};
