// ADMIN PAGE: apiKeys (Database-backed)
import { apiService, extractErrorMessage } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function adminApiKeys() {
  return `
    <div class="flex flex-col gap-8 animate-fade-in-up font-sans select-none max-w-6xl">
      <!-- Top Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-border pb-5">
        <div class="flex flex-col gap-1">
          <span class="text-[9px] font-bold text-indigo-700 uppercase tracking-widest">Enterprise Access</span>
          <h1 class="font-display font-black text-3xl text-brand-text uppercase leading-none font-bold">Organization Master API Keys</h1>
          <p class="text-xs text-brand-muted font-semibold mt-1">Generate org-level API keys with strict department budgets and key lifecycle controls in PostgreSQL.</p>
        </div>
        <div class="flex items-center gap-3">
          <button id="create-master-key-btn" class="px-5 py-2.5 bg-indigo-950 hover:bg-slate-900 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-colors shadow-xs flex items-center gap-2">
            <span>+</span>
            <span>Create Master Key</span>
          </button>
        </div>
      </div>

      <!-- Keys Table -->
      <div class="bg-white border border-brand-border rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col gap-6">
        <h3 class="font-bold text-base text-slate-900">Provisioned Master Keys</h3>

        <div class="border border-slate-200 rounded-xl overflow-hidden text-xs">
          <table class="w-full text-left font-semibold">
            <thead class="bg-slate-50 border-b border-slate-200 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th class="px-5 py-3.5">Key Identifier</th>
                <th class="px-5 py-3.5">Token Prefix</th>
                <th class="px-5 py-3.5">Workspace</th>
                <th class="px-5 py-3.5">Created Date</th>
                <th class="px-5 py-3.5">Status</th>
                <th class="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody id="admin-keys-table-body" class="divide-y divide-slate-100 text-slate-700">
              <tr>
                <td colspan="6" class="px-5 py-8 text-center text-slate-400">
                  <div class="flex items-center justify-center gap-2">
                    <svg class="animate-spin h-4 w-4 text-brand-primary" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                    <span>Loading organization keys from database...</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Create Master Key Modal -->
    <div id="admin-key-modal" class="fixed inset-0 bg-[#07080B]/80 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
      <div class="bg-[#10121A] border border-[#1F2438] rounded-2xl p-6 shadow-2xl max-w-md w-full animate-scale-up">
        <div class="flex justify-between items-center mb-4 border-b border-[#1F2438] pb-3">
          <h3 class="font-bold text-base text-white uppercase tracking-tight">Create Master Key</h3>
          <button id="close-admin-key-modal-btn" class="p-1 hover:bg-[#161926] rounded-lg text-[#8E98B0] hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form id="admin-create-key-form" class="flex flex-col gap-4 text-xs font-semibold">
          <div>
            <label class="block text-[10px] font-bold text-[#8E98B0] uppercase mb-1">Key Label</label>
            <input type="text" id="admin-key-name-input" required placeholder="e.g. Production Cluster Gateway" class="w-full p-2.5 border border-[#1F2438] rounded-lg bg-[#161926] text-white placeholder-[#8E98B0]/50 focus:border-[#38BDF8] outline-none font-bold" />
          </div>

          <div class="flex gap-2.5 mt-2">
            <button type="button" id="cancel-admin-key-btn" class="w-1/2 py-2.5 border border-[#1F2438] hover:bg-[#161926] text-[#8E98B0] hover:text-white font-bold rounded-lg uppercase tracking-wider text-[11px] transition-colors">
              Cancel
            </button>
            <button type="submit" id="submit-admin-key-btn" class="w-1/2 py-2.5 bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#07080B] font-bold rounded-lg uppercase tracking-wider text-[11px] shadow-sm transition-colors">
              Generate Key
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Secret Key Display Modal (One-Time Display) -->
    <div id="admin-key-reveal-modal" class="fixed inset-0 z-50 bg-[#07080B]/85 backdrop-blur-md hidden items-center justify-center p-4">
      <div class="w-full max-w-lg bg-[#10121A] border border-[#1F2438] rounded-2xl p-6 sm:p-8 shadow-2xl animate-fade-in-up flex flex-col gap-5">
        <div class="flex items-center gap-3 text-emerald-400">
          <div class="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <div>
            <h3 class="font-display font-black text-base text-white uppercase leading-tight">Master Key Created!</h3>
            <p class="text-[11px] text-[#8E98B0] font-medium">Copy this raw token immediately. It is never stored in plaintext and cannot be shown again.</p>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[9px] uppercase tracking-wider font-bold text-[#8E98B0]">Secret Master Token</label>
          <div class="flex items-center gap-2 p-3 bg-[#161926] text-[#38BDF8] font-mono text-xs rounded-xl border border-[#1F2438]">
            <span id="admin-revealed-key-text" class="flex-1 truncate select-all"></span>
            <button id="admin-copy-key-btn" class="px-3 py-1.5 bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#07080B] text-[10px] font-bold uppercase rounded-lg transition-all flex items-center gap-1.5">
              <span>Copy</span>
            </button>
          </div>
        </div>

        <button id="admin-close-reveal-btn" class="w-full py-3 bg-[#161926] hover:bg-[#1F2438] text-white border border-[#1F2438] font-bold rounded-xl text-xs uppercase tracking-wider transition-colors">
          Done & Close
        </button>
      </div>
    </div>
  `;
}

export async function bindAdminApiKeys() {
  const tableBody = document.getElementById("admin-keys-table-body");
  const openBtn = document.getElementById("create-master-key-btn");
  const modal = document.getElementById("admin-key-modal");
  const closeBtn = document.getElementById("close-admin-key-modal-btn");
  const cancelBtn = document.getElementById("cancel-admin-key-btn");
  const form = document.getElementById("admin-create-key-form");
  
  const revealModal = document.getElementById("admin-key-reveal-modal");
  const revealedKeyText = document.getElementById("admin-revealed-key-text");
  const copyKeyBtn = document.getElementById("admin-copy-key-btn");
  const closeRevealBtn = document.getElementById("admin-close-reveal-btn");

  async function loadKeys() {
    const keys = await apiService.getApiKeys();
    if (!keys || keys.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="px-5 py-8 text-center text-slate-400">
            <p class="font-bold">No master keys created yet.</p>
            <p class="text-[11px] mt-1">Click "Create Master Key" above to provision a server proxy key.</p>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = keys.map(k => `
      <tr class="hover:bg-slate-50/50 font-semibold">
        <td class="px-5 py-3.5 font-bold text-slate-900">${k.name}</td>
        <td class="px-5 py-3.5 font-mono text-slate-500">${k.keyPrefix || k.key_prefix || "••••••••"}</td>
        <td class="px-5 py-3.5 text-slate-700 font-bold">${k.workspaceName || "Default Workspace"}</td>
        <td class="px-5 py-3.5 text-slate-500">${k.createdAt ? new Date(k.createdAt).toLocaleDateString() : (k.created || "Recently")}</td>
        <td class="px-5 py-3.5">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
            k.status === 'active' || k.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
          }">
            ${k.status}
          </span>
        </td>
        <td class="px-5 py-3.5 text-right">
          ${k.status === 'active' || k.status === 'Active' ? `
            <button class="admin-revoke-key-btn text-rose-600 font-bold hover:underline" data-id="${k.id}">
              Revoke
            </button>
          ` : `
            <span class="text-slate-400 font-bold uppercase text-[10px]">Revoked</span>
          `}
        </td>
      </tr>
    `).join("");

    document.querySelectorAll(".admin-revoke-key-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        if (confirm("Revoke this master API key? All applications using it will be denied immediately.")) {
          btn.innerText = "Revoking...";
          const res = await apiService.revokeApiKey(id);
          if (res.success) {
            components.renderToast("info", res.message || "Master key revoked.");
            loadKeys();
          } else {
            components.renderToast("error", extractErrorMessage(res, "Failed to revoke key."));
            btn.innerText = "Revoke";
          }
        }
      });
    });
  }

  loadKeys();

  openBtn?.addEventListener("click", () => {
    modal.classList.remove("hidden");
    document.getElementById("admin-key-name-input").value = "";
    document.getElementById("admin-key-name-input")?.focus();
  });

  const closeModal = () => modal?.classList.add("hidden");
  closeBtn?.addEventListener("click", closeModal);
  cancelBtn?.addEventListener("click", closeModal);

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("admin-key-name-input").value.trim();
    const submitBtn = document.getElementById("submit-admin-key-btn");
    submitBtn.innerText = "Generating...";
    submitBtn.disabled = true;

    const res = await apiService.createApiKey(name);
    submitBtn.innerText = "Generate Key";
    submitBtn.disabled = false;

    if (res.success && res.key && res.key.rawKey) {
      closeModal();
      revealedKeyText.innerText = res.key.rawKey;
      revealModal.classList.remove("hidden");
      revealModal.classList.add("flex");
      components.renderToast("success", "Master API Key created successfully!");
      loadKeys();
    } else {
      components.renderToast("error", extractErrorMessage(res, "Failed to create master key."));
    }
  });

  copyKeyBtn?.addEventListener("click", () => {
    navigator.clipboard.writeText(revealedKeyText.innerText).then(() => {
      copyKeyBtn.innerText = "Copied! ✓";
      setTimeout(() => { copyKeyBtn.innerText = "Copy"; }, 2000);
    });
  });

  closeRevealBtn?.addEventListener("click", () => {
    revealModal.classList.add("hidden");
    revealModal.classList.remove("flex");
    revealedKeyText.innerText = "";
  });
}

export default {
  adminApiKeys,
  bindAdminApiKeys
};
