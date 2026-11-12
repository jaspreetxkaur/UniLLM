// ADMIN PAGE: apiKeys (Database-backed Obsidian & Crisp Monochrome — Linear / Vercel Developer Aesthetic)
import { apiService, extractErrorMessage } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function adminApiKeys() {
  return `
    <div class="flex flex-col gap-6 animate-fade-in-up font-sans select-none max-w-6xl text-[#EDEDED]">
      <!-- Top Header -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/[0.08] pb-5">
        <div class="flex flex-col gap-1">
          <span class="text-[10px] font-mono font-bold text-[#8A8F98] uppercase tracking-widest">Enterprise Access Control</span>
          <h1 class="font-bold text-2xl sm:text-3xl text-white tracking-tight">Organization Master API Keys</h1>
          <p class="text-xs text-[#8A8F98]">Generate and manage org-level proxy credentials with workspace spending policies and instant cryptographic revocation.</p>
        </div>
        <div class="flex items-center gap-3">
          <button id="create-master-key-btn" class="btn-primary-gradient px-4 py-2 rounded-lg text-xs font-semibold text-black bg-white hover:bg-neutral-200 transition-all shadow-sm flex items-center gap-1.5 cursor-pointer">
            <span>+</span>
            <span>Create Master Key</span>
          </button>
        </div>
      </div>

      <!-- Keys Table -->
      <div class="glass-panel border border-white/[0.08] rounded-xl overflow-hidden shadow-2xl flex flex-col">
        <div class="px-5 py-4 border-b border-white/[0.08] flex items-center justify-between">
          <span class="font-medium text-xs text-white uppercase tracking-wider font-mono">Provisioned Master Credentials</span>
          <span class="text-[11px] font-mono text-[#8A8F98]">SHA-256 Hashed at Rest</span>
        </div>

        <div class="overflow-x-auto text-xs">
          <table class="w-full text-left">
            <thead class="bg-white/[0.02] border-b border-white/[0.08] text-[10px] font-mono font-medium text-[#8A8F98] uppercase tracking-wider">
              <tr>
                <th class="px-5 py-3.5">Key Identifier</th>
                <th class="px-5 py-3.5">Token Prefix</th>
                <th class="px-5 py-3.5">Workspace Scope</th>
                <th class="px-5 py-3.5">Created Date</th>
                <th class="px-5 py-3.5">Status</th>
                <th class="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody id="admin-keys-table-body" class="divide-y divide-white/[0.04] text-neutral-300 font-mono">
              <tr>
                <td colspan="6" class="px-5 py-8 text-center text-[#8A8F98]">
                  <div class="flex items-center justify-center gap-2">
                    <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                    <span class="font-sans text-xs">Loading master credentials from database...</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Create Master Key Modal -->
    <div id="admin-key-modal" class="fixed inset-0 bg-[#08090A]/85 backdrop-blur-md z-50 hidden flex items-center justify-center p-4">
      <div class="glass-panel border border-white/15 rounded-2xl p-6 shadow-2xl max-w-md w-full animate-fade-in-up text-[#EDEDED]">
        <div class="flex justify-between items-center mb-4 border-b border-white/[0.08] pb-3">
          <h3 class="font-bold text-sm text-white uppercase tracking-wider font-mono">Create Master Key</h3>
          <button id="close-admin-key-modal-btn" class="p-1 hover:bg-white/10 rounded-lg text-[#8A8F98] hover:text-white transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form id="admin-create-key-form" class="flex flex-col gap-4 text-xs font-sans">
          <div>
            <label class="block text-[10px] font-mono uppercase text-[#8A8F98] mb-1">Key Label</label>
            <input type="text" id="admin-key-name-input" required placeholder="e.g. Production Cluster Gateway" class="w-full p-2.5 border border-white/10 rounded-lg bg-[#121419] text-white placeholder-[#8A8F98]/50 focus:border-white/30 outline-none font-medium text-xs" />
          </div>

          <div>
            <label class="block text-[10px] font-mono uppercase text-[#8A8F98] mb-1">Workspace Scope</label>
            <select id="admin-key-workspace-select" class="w-full p-2.5 border border-white/10 rounded-lg bg-[#121419] text-white focus:border-white/30 outline-none font-medium text-xs cursor-pointer">
              <option value="">Default Workspace</option>
            </select>
            <span class="text-[10px] text-[#8A8F98]/70 font-mono mt-1 block">Traffic telemetry and budgets will be isolated to this workspace.</span>
          </div>

          <div class="flex gap-2.5 mt-2">
            <button type="button" id="cancel-admin-key-btn" class="w-1/2 py-2 border border-white/10 hover:bg-white/5 text-[#8A8F98] hover:text-white font-medium rounded-lg text-xs transition-colors">
              Cancel
            </button>
            <button type="submit" id="submit-admin-key-btn" class="w-1/2 py-2 btn-primary-gradient text-black font-semibold rounded-lg text-xs shadow-sm transition-colors">
              Generate Key
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Secret Key Display Modal (One-Time Display) -->
    <div id="admin-key-reveal-modal" class="fixed inset-0 z-50 bg-[#08090A]/90 backdrop-blur-md hidden items-center justify-center p-4">
      <div class="w-full max-w-lg glass-panel border border-white/15 rounded-2xl p-6 sm:p-8 shadow-2xl animate-fade-in-up flex flex-col gap-5 text-[#EDEDED]">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400 shrink-0">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <div>
            <h3 class="font-bold text-sm text-white tracking-wide uppercase font-mono">Master Key Generated</h3>
            <p class="text-xs text-[#8A8F98] mt-0.5">Copy this raw token immediately. It is never stored in plaintext and cannot be recovered.</p>
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-[10px] uppercase font-mono font-medium text-[#8A8F98]">Secret Master Token</label>
          <div class="flex items-center gap-2 p-2.5 bg-black/60 text-white font-mono text-xs rounded-lg border border-white/10">
            <span id="admin-revealed-key-text" class="flex-1 truncate select-all"></span>
            <button id="admin-copy-key-btn" class="px-3 py-1 bg-white hover:bg-neutral-200 text-black text-xs font-semibold rounded transition-all">
              Copy
            </button>
          </div>
        </div>

        <button id="admin-close-reveal-btn" class="w-full py-2.5 bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 font-medium rounded-lg text-xs transition-colors">
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
  const workspaceSelect = document.getElementById("admin-key-workspace-select");
  
  const revealModal = document.getElementById("admin-key-reveal-modal");
  const revealedKeyText = document.getElementById("admin-revealed-key-text");
  const copyKeyBtn = document.getElementById("admin-copy-key-btn");
  const closeRevealBtn = document.getElementById("admin-close-reveal-btn");

  const loadWorkspacesDropdown = async () => {
    try {
      const workspaces = await apiService.getWorkspaces();
      if (workspaceSelect && workspaces && workspaces.length > 0) {
        workspaceSelect.innerHTML = workspaces.map(w => {
          const id = w.id || w._id;
          const isDef = w.isDefault || w.is_default;
          return `<option value="${id}" class="bg-[#121419] text-white">${w.name} ${isDef ? '(Default)' : ''}</option>`;
        }).join("");
      } else if (workspaceSelect) {
        workspaceSelect.innerHTML = `<option value="" class="bg-[#121419] text-white">Default Workspace</option>`;
      }
    } catch {
      if (workspaceSelect) {
        workspaceSelect.innerHTML = `<option value="" class="bg-[#121419] text-white">Default Workspace</option>`;
      }
    }
  };

  async function loadKeys() {
    const keys = await apiService.getApiKeys();
    if (!keys || keys.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="px-5 py-8 text-center text-[#8A8F98]">
            <p class="font-medium">No master keys created yet.</p>
            <p class="text-[11px] mt-1 text-[#8A8F98]/70">Click "Create Master Key" above to provision an organization credential.</p>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = keys.map(k => `
      <tr class="hover:bg-white/[0.02] transition-colors">
        <td class="px-5 py-3.5 font-medium text-white">${k.name}</td>
        <td class="px-5 py-3.5">
          <div class="flex items-center gap-2">
            <span class="admin-key-display-text bg-white/[0.04] px-2.5 py-1 rounded border border-white/[0.06] text-white font-mono text-xs select-all truncate max-w-[220px]" data-full="${k.keySecret || k.keyPrefix || ''}" data-prefix="${k.keyPrefix || k.key_prefix || "••••••••"}">${k.keyPrefix || k.key_prefix || "••••••••"}</span>
            ${k.keySecret ? `
              <button class="admin-toggle-reveal-btn p-1 text-[#8A8F98] hover:text-white rounded hover:bg-white/10 transition-colors cursor-pointer" title="Toggle Show/Hide Secret Key">
                👁️
              </button>
            ` : ''}
            <button class="admin-copy-table-key-btn inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-sans font-medium text-white bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 rounded transition-all cursor-pointer" data-key="${k.keySecret || k.keyPrefix || ''}" title="Copy Master Key">
              <svg class="w-3.5 h-3.5 text-[#8A8F98]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              <span>Copy</span>
            </button>
          </div>
        </td>
        <td class="px-5 py-3.5 text-neutral-300 font-sans">${k.workspaceName || "Default Workspace"}</td>
        <td class="px-5 py-3.5 text-[#8A8F98]">${k.createdAt ? new Date(k.createdAt).toLocaleDateString() : (k.created || "Recently")}</td>
        <td class="px-5 py-3.5">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase font-mono ${
            k.status === 'active' || k.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/[0.04] text-[#8A8F98] border border-white/[0.08]'
          }">
            ${k.status}
          </span>
        </td>
        <td class="px-5 py-3.5 text-right font-sans">
          ${k.status === 'active' || k.status === 'Active' ? `
            <button class="admin-revoke-key-btn text-rose-400 hover:text-rose-300 text-xs font-medium hover:underline cursor-pointer" data-id="${k.id}">
              Revoke
            </button>
          ` : `
            <span class="text-[#8A8F98]/50 uppercase text-[10px]">Revoked</span>
          `}
        </td>
      </tr>
    `).join("");

    tableBody.querySelectorAll(".admin-copy-table-key-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-key");
        if (key) {
          navigator.clipboard.writeText(key).then(() => {
            const span = btn.querySelector("span");
            if (span) span.innerText = "Copied! ✓";
            btn.classList.add("text-emerald-400", "border-emerald-500/30");
            components.renderToast("success", "Master API Key copied to clipboard! ✓");
            setTimeout(() => {
              if (span) span.innerText = "Copy";
              btn.classList.remove("text-emerald-400", "border-emerald-500/30");
            }, 2000);
          });
        }
      });
    });

    tableBody.querySelectorAll(".admin-toggle-reveal-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const row = btn.closest("tr");
        const codeEl = row?.querySelector(".admin-key-display-text");
        if (!codeEl) return;
        const isRevealed = codeEl.getAttribute("data-revealed") === "true";
        if (isRevealed) {
          codeEl.innerText = codeEl.getAttribute("data-prefix") || "";
          codeEl.setAttribute("data-revealed", "false");
          btn.innerText = "👁️";
        } else {
          codeEl.innerText = codeEl.getAttribute("data-full") || "";
          codeEl.setAttribute("data-revealed", "true");
          btn.innerText = "🔒";
        }
      });
    });

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
  loadWorkspacesDropdown();

  openBtn?.addEventListener("click", () => {
    modal.classList.remove("hidden");
    document.getElementById("admin-key-name-input").value = "";
    loadWorkspacesDropdown();
    document.getElementById("admin-key-name-input")?.focus();
  });

  const closeModal = () => modal?.classList.add("hidden");
  closeBtn?.addEventListener("click", closeModal);
  cancelBtn?.addEventListener("click", closeModal);

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("admin-key-name-input").value.trim();
    const workspaceId = workspaceSelect?.value || null;
    const submitBtn = document.getElementById("submit-admin-key-btn");
    submitBtn.innerText = "Generating...";
    submitBtn.disabled = true;

    const res = await apiService.createApiKey(name, workspaceId);
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
