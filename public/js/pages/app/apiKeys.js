// APP PAGE: apiKeys (Console API Key & Workspace Management — Obsidian Aesthetic)
import { apiService } from "../../apiService.js?v=5";
import { components } from "../../components.js?v=5";
import { router } from "../../router.js?v=5";

export function appApiKeys() {
  const activeWorkspace = apiService.getActiveWorkspace();

  return `
    <div class="flex flex-col gap-6 animate-fade-in-up font-sans select-none text-[#F5F5F5]">
      
      <!-- Top Bar with Workspace Context -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#292D34]">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <h1 class="font-sans font-bold text-2xl text-white tracking-tight">API Keys</h1>
            <span id="active-ws-badge" class="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-[#101216] text-[#A1A5AD] border border-[#292D34]">
              ${activeWorkspace}
            </span>
          </div>
          <p class="text-xs text-[#A1A5AD]">Create, rotate, and manage secure API keys scoped to your workspace environments.</p>
        </div>
        
        <button id="add-key-btn" class="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-neutral-200 text-black text-xs font-semibold transition-all shadow-sm">
          <span>+</span>
          <span>Create API Key</span>
        </button>
      </div>
      
      <!-- API Keys Table Container -->
      <div id="keys-table-container" class="rounded-xl border border-[#292D34] bg-[#101216] overflow-hidden select-text">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-[#08090B] border-b border-[#292D34] text-[10px] font-mono uppercase text-[#A1A5AD] tracking-wider select-none">
              <th class="px-6 py-4">Name</th>
              <th class="px-6 py-4">Key Prefix</th>
              <th class="px-6 py-4">Workspace</th>
              <th class="px-6 py-4">Created</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="keys-table-body" class="divide-y divide-[#292D34] font-mono text-[#A1A5AD]">
            <tr>
              <td colspan="6" class="px-6 py-12 text-center text-[#A1A5AD]">
                <div class="flex items-center justify-center gap-2">
                  <span class="inline-block w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></span>
                  <span class="font-sans text-xs">Loading API credentials...</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create API Key Modal -->
    <div id="key-modal" class="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm hidden items-center justify-center p-4">
      <div class="w-full max-w-md bg-[#101216] border border-[#292D34] rounded-xl p-6 shadow-2xl animate-fade-in-up text-[#F5F5F5]">
        <div class="flex justify-between items-center pb-4 border-b border-[#292D34] mb-5">
          <div>
            <h2 class="font-sans font-bold text-base text-white">Create API Key</h2>
            <p class="text-[11px] text-[#A1A5AD] mt-0.5">Generate a secret credential to authenticate gateway requests.</p>
          </div>
          <button id="key-modal-close" class="p-1.5 hover:bg-[#15181D] rounded-lg text-[#A1A5AD] hover:text-white transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form id="key-modal-form" class="flex flex-col gap-4 text-xs font-sans">
          <!-- Key Name Input -->
          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A1A5AD]">Key Name / Label</label>
            <input id="key-name-input" type="text" required placeholder="e.g. Production Cluster or Agent Server" class="p-3 rounded-lg border border-[#292D34] bg-[#15181D] text-white placeholder-[#A1A5AD]/50 focus:border-white/50 outline-none transition-colors" />
          </div>

          <!-- Workspace Selector Scope -->
          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A1A5AD]">Workspace Scope</label>
            <select id="key-workspace-select" class="p-3 rounded-lg border border-[#292D34] bg-[#15181D] text-white outline-none focus:border-white/50 transition-colors cursor-pointer font-medium">
              <option value="">Loading workspaces...</option>
            </select>
            <span class="text-[10px] text-[#A1A5AD]/70 font-mono">Telemetry and budget spend will be isolated to this workspace.</span>
          </div>

          <!-- Key Permissions -->
          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-mono font-bold uppercase tracking-wider text-[#A1A5AD]">Permissions Scope</label>
            <select class="p-3 rounded-lg border border-[#292D34] bg-[#15181D] text-white outline-none focus:border-white/50 transition-colors cursor-pointer font-medium">
              <option value="full">Full Inference & Routing Access</option>
              <option value="readonly">Read-only Telemetry Access</option>
            </select>
          </div>
          
          <!-- Actions -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#292D34] mt-2">
            <button type="button" id="key-modal-cancel" class="px-4 py-2 rounded-lg bg-[#15181D] hover:bg-[#20242B] text-xs font-medium text-white border border-[#292D34] transition-colors">
              Cancel
            </button>
            <button type="submit" id="key-generate-submit-btn" class="px-5 py-2 rounded-lg bg-white hover:bg-neutral-200 text-black text-xs font-semibold transition-all shadow-sm flex items-center gap-1.5">
              <span>Create Key</span>
              <span>→</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Secret Key Display Modal (One-time Reveal) -->
    <div id="key-reveal-modal" class="fixed inset-0 z-50 bg-black/85 backdrop-blur-md hidden items-center justify-center p-4">
      <div class="w-full max-w-lg bg-[#101216] border border-[#292D34] rounded-xl p-6 sm:p-8 shadow-2xl animate-fade-in-up flex flex-col gap-5 text-[#F5F5F5]">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 text-emerald-400 shrink-0 font-bold">
            ✓
          </div>
          <div>
            <h3 class="font-sans font-bold text-base text-white">API Key Generated</h3>
            <p class="text-xs text-[#A1A5AD]">Copy this secret key now. It will never be displayed again.</p>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[10px] font-mono uppercase tracking-wider text-[#A1A5AD]">Secret API Key</label>
          <div class="flex items-center gap-2 p-3 bg-[#08090B] text-white font-mono text-xs rounded-lg border border-[#292D34]">
            <span id="revealed-key-text" class="flex-1 truncate select-all"></span>
            <button id="copy-key-btn" class="px-3 py-1.5 bg-white hover:bg-neutral-200 text-black text-xs font-semibold rounded transition-all">
              Copy
            </button>
          </div>
        </div>

        <div class="p-3 bg-[#15181D] border border-[#292D34] rounded-lg text-[#A1A5AD] text-xs leading-relaxed flex items-start gap-2.5">
          <span class="text-sm shrink-0">ℹ️</span>
          <span>We store only a one-way cryptographic SHA-256 hash. If lost, you will need to revoke it and generate a new key.</span>
        </div>

        <button id="close-reveal-btn" class="w-full py-2.5 bg-[#15181D] hover:bg-[#20242B] text-white font-medium rounded-lg text-xs border border-[#292D34] transition-colors">
          Done & Close
        </button>
      </div>
    </div>
  `;
}

export async function bindAppApiKeys() {
  const modal = document.getElementById("key-modal");
  const openBtn = document.getElementById("add-key-btn");
  const closeBtn = document.getElementById("key-modal-close");
  const cancelBtn = document.getElementById("key-modal-cancel");
  const form = document.getElementById("key-modal-form");
  const tableBody = document.getElementById("keys-table-body");
  const tableContainer = document.getElementById("keys-table-container");
  const workspaceSelect = document.getElementById("key-workspace-select");
  
  const revealModal = document.getElementById("key-reveal-modal");
  const revealedKeyText = document.getElementById("revealed-key-text");
  const copyKeyBtn = document.getElementById("copy-key-btn");
  const closeRevealBtn = document.getElementById("close-reveal-btn");

  let availableWorkspaces = [];

  const loadWorkspacesDropdown = async () => {
    try {
      availableWorkspaces = await apiService.getWorkspaces();
      const activeWsId = apiService.getActiveWorkspaceId();
      const activeWsName = apiService.getActiveWorkspace();

      if (workspaceSelect && availableWorkspaces && availableWorkspaces.length > 0) {
        workspaceSelect.innerHTML = availableWorkspaces.map(w => {
          const isSelected = (activeWsId && w.id === activeWsId) || (w.name === activeWsName);
          return `<option value="${w.id}" class="bg-[#101216] text-white" ${isSelected ? 'selected' : ''}>${w.name} ${w.isDefault || w.is_default ? '(Default)' : ''}</option>`;
        }).join("");
      } else if (workspaceSelect) {
        workspaceSelect.innerHTML = `<option value="" class="bg-[#101216] text-white">Default Workspace</option>`;
      }
    } catch {
      if (workspaceSelect) {
        workspaceSelect.innerHTML = `<option value="" class="bg-[#101216] text-white">Default Workspace</option>`;
      }
    }
  };

  const renderTable = async () => {
    if (tableBody) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="6" class="px-6 py-8 text-center text-[#A1A5AD]">
            <div class="flex items-center justify-center gap-2">
              <span class="inline-block w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin"></span>
              <span class="font-sans text-xs">Loading keys...</span>
            </div>
          </td>
        </tr>
      `;
    }

    const keys = await apiService.getApiKeys();
    
    if (!keys || keys.length === 0) {
      tableContainer.innerHTML = `
        <div class="p-12 text-center flex flex-col items-center justify-center gap-3">
          <div class="w-12 h-12 rounded-xl bg-[#15181D] border border-[#292D34] flex items-center justify-center text-white">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
          </div>
          <h3 class="font-bold text-base text-white">No API keys yet</h3>
          <p class="text-xs text-[#A1A5AD] max-w-sm">Create an API key to connect your application to UniLLM.</p>
          <button id="empty-create-key-btn" class="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white hover:bg-neutral-200 text-black text-xs font-semibold transition-all shadow-sm">
            <span>+</span>
            <span>Create API Key</span>
          </button>
        </div>
      `;

      document.getElementById("empty-create-key-btn")?.addEventListener("click", () => {
        openModal();
      });
      return;
    }

    if (!document.getElementById("keys-table-body")) {
      tableContainer.innerHTML = `
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-[#08090B] border-b border-[#292D34] text-[10px] font-mono uppercase text-[#A1A5AD] tracking-wider select-none">
              <th class="px-6 py-4">Name</th>
              <th class="px-6 py-4">Key Prefix</th>
              <th class="px-6 py-4">Workspace</th>
              <th class="px-6 py-4">Created</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="keys-table-body" class="divide-y divide-[#292D34] font-mono text-[#A1A5AD]"></tbody>
        </table>
      `;
    }

    const currentTbody = document.getElementById("keys-table-body");
    currentTbody.innerHTML = keys.map(k => `
      <tr class="hover:bg-[#15181D] transition-colors font-mono">
        <td class="px-6 py-4 font-sans font-bold text-white">${k.name}</td>
        <td class="px-6 py-4">
          <div class="flex items-center gap-2">
            <code class="key-display-text text-xs text-white bg-[#08090B] px-2.5 py-1 rounded border border-[#292D34] font-mono select-all truncate max-w-[220px]" data-full="${k.keySecret || k.keyPrefix || ''}" data-prefix="${k.keyPrefix || k.key_prefix || '••••••••'}">${k.keyPrefix || k.key_prefix || '••••••••'}</code>
            ${k.keySecret ? `
              <button class="toggle-reveal-key-btn p-1 text-[#A1A5AD] hover:text-white rounded hover:bg-[#1A1D24] transition-colors" title="Toggle Show/Hide Secret Key">
                👁️
              </button>
            ` : ''}
            <button class="copy-table-key-btn inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-sans font-medium text-white bg-[#15181D] hover:bg-[#20242B] border border-[#292D34] rounded transition-all cursor-pointer" data-key="${k.keySecret || k.keyPrefix || ''}" title="Copy API Key to Clipboard">
              <svg class="w-3.5 h-3.5 text-[#A1A5AD]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
              <span>Copy</span>
            </button>
          </div>
        </td>
        <td class="px-6 py-4 font-sans text-xs">
          <span class="px-2 py-0.5 rounded-md bg-[#15181D] text-[#A1A5AD] border border-[#292D34]">${k.workspaceName || 'Default Workspace'}</span>
        </td>
        <td class="px-6 py-4 text-xs font-sans text-[#A1A5AD]">${k.createdAt ? new Date(k.createdAt).toLocaleDateString() : (k.created || "Just now")}</td>
        <td class="px-6 py-4">
          <span class="px-2 py-0.5 rounded-md text-[10px] font-mono ${k.status === 'active' || k.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}">${k.status}</span>
        </td>
        <td class="px-6 py-4 text-right">
          ${k.status === 'active' || k.status === 'Active' ? `
            <button class="revoke-key-btn text-xs font-sans text-rose-400 hover:text-rose-300 hover:underline bg-transparent" data-id="${k.id}" data-name="${k.name}">
              Revoke
            </button>
          ` : `
            <span class="text-xs text-[#A1A5AD]/60">Revoked</span>
          `}
        </td>
      </tr>
    `).join("");

    currentTbody.querySelectorAll(".copy-table-key-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-key");
        if (key) {
          navigator.clipboard.writeText(key).then(() => {
            const span = btn.querySelector("span");
            if (span) span.innerText = "Copied! ✓";
            btn.classList.add("text-emerald-400", "border-emerald-500/30");
            components.renderToast("success", "API Key copied to clipboard! ✓");
            setTimeout(() => {
              if (span) span.innerText = "Copy";
              btn.classList.remove("text-emerald-400", "border-emerald-500/30");
            }, 2000);
          });
        }
      });
    });

    currentTbody.querySelectorAll(".toggle-reveal-key-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const row = btn.closest("tr");
        const codeEl = row?.querySelector(".key-display-text");
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

    currentTbody.querySelectorAll(".revoke-key-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        const keyName = btn.getAttribute("data-name");
        if (confirm(`Are you sure you want to revoke API key "${keyName}"? Applications using it will immediately fail authentication.`)) {
          btn.innerText = "Revoking...";
          const res = await apiService.revokeApiKey(id);
          if (res.success) {
            components.renderToast("info", res.message || "API key revoked.");
            renderTable();
          } else {
            components.renderToast("error", res.message || "Failed to revoke key.");
            btn.innerText = "Revoke";
          }
        }
      });
    });
  };

  const openModal = async () => {
    await loadWorkspacesDropdown();
    if (modal) {
      modal.classList.remove("hidden");
      modal.classList.add("flex");
    }
    const input = document.getElementById("key-name-input");
    if (input) {
      input.value = "";
      input.focus();
    }
  };

  const closeModal = () => {
    if (modal) {
      modal.classList.add("hidden");
      modal.classList.remove("flex");
    }
  };

  openBtn?.addEventListener("click", openModal);
  closeBtn?.addEventListener("click", closeModal);
  cancelBtn?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("action") === "create" || window.location.hash === "#create") {
    openModal();
  }

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("key-name-input").value.trim();
    const workspaceId = workspaceSelect ? workspaceSelect.value : null;
    const submitBtn = document.getElementById("key-generate-submit-btn");
    
    if (submitBtn) {
      submitBtn.innerText = "Creating...";
      submitBtn.disabled = true;
    }

    const res = await apiService.createApiKey(name, workspaceId);
    if (submitBtn) {
      submitBtn.innerText = "Create Key →";
      submitBtn.disabled = false;
    }

    if (res.success && res.key && res.key.rawKey) {
      closeModal();
      
      revealedKeyText.innerText = res.key.rawKey;
      revealModal.classList.remove("hidden");
      revealModal.classList.add("flex");
      
      components.renderToast("success", "API Key generated successfully!");
      renderTable();
    } else {
      components.renderToast("error", res.message || "Failed to create API key.");
    }
  });

  copyKeyBtn?.addEventListener("click", () => {
    const rawKey = revealedKeyText.innerText;
    navigator.clipboard.writeText(rawKey).then(() => {
      copyKeyBtn.innerText = "Copied! ✓";
      setTimeout(() => {
        copyKeyBtn.innerText = "Copy";
      }, 2000);
    });
  });

  closeRevealBtn?.addEventListener("click", () => {
    revealModal.classList.add("hidden");
    revealModal.classList.remove("flex");
    revealedKeyText.innerText = "";
  });

  renderTable();
}

export default {
  appApiKeys,
  bindAppApiKeys
};
