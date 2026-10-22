// APP PAGE: apiKeys (Console API Key & Workspace Management)
import { apiService } from "../../apiService.js?v=5";
import { components } from "../../components.js?v=5";
import { router } from "../../router.js?v=5";

export function appApiKeys() {
  const activeWorkspace = apiService.getActiveWorkspace();

  return `
    <div class="flex flex-col gap-6 animate-fade-in-up font-sans select-none text-white">
      
      <!-- Top Bar with Workspace Context -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1F2438]">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <h1 class="font-sans font-bold text-2xl text-white tracking-tight">API Keys</h1>
            <span id="active-ws-badge" class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#161926] text-[#38BDF8] border border-[#1F2438]">
              ${activeWorkspace}
            </span>
          </div>
          <p class="text-xs text-[#8E98B0]">Create, rotate, and manage secure API keys scoped to your workspace environments.</p>
        </div>
        
        <button id="add-key-btn" class="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#07080B] text-xs font-bold transition-all shadow-sm">
          <span>+</span>
          <span>Create API Key</span>
        </button>
      </div>
      
      <!-- API Keys Table Container -->
      <div id="keys-table-container" class="rounded-xl border border-[#1F2438] bg-[#10121A] overflow-hidden select-text">
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-[#0D0E15] border-b border-[#1F2438] text-[10px] font-mono uppercase text-[#8E98B0] tracking-wider select-none">
              <th class="px-6 py-4">Name</th>
              <th class="px-6 py-4">Key Prefix</th>
              <th class="px-6 py-4">Workspace</th>
              <th class="px-6 py-4">Created</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="keys-table-body" class="divide-y divide-[#1F2438]/70 font-mono text-[#8E98B0]">
            <tr>
              <td colspan="6" class="px-6 py-12 text-center text-[#8E98B0]">
                <div class="flex items-center justify-center gap-2">
                  <svg class="animate-spin h-4 w-4 text-[#38BDF8]" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                  <span class="font-sans text-xs">Loading API credentials...</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Create API Key Modal -->
    <div id="key-modal" class="fixed inset-0 z-50 bg-[#07080B]/85 backdrop-blur-sm hidden items-center justify-center p-4">
      <div class="w-full max-w-md bg-[#10121A] border border-[#1F2438] rounded-2xl p-6 shadow-2xl animate-fade-in-up text-white">
        <div class="flex justify-between items-center pb-4 border-b border-[#1F2438] mb-5">
          <div>
            <h2 class="font-sans font-bold text-base text-white">Create API Key</h2>
            <p class="text-[11px] text-[#8E98B0] mt-0.5">Generate a secret credential to authenticate gateway requests.</p>
          </div>
          <button id="key-modal-close" class="p-1.5 hover:bg-[#161926] rounded-lg text-[#8E98B0] hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form id="key-modal-form" class="flex flex-col gap-4 text-xs font-sans">
          <!-- Key Name Input -->
          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8E98B0]">Key Name / Label</label>
            <input id="key-name-input" type="text" required placeholder="e.g. Production Cluster or Agent Server" class="p-3 rounded-xl border border-[#1F2438] bg-[#161926] text-white placeholder-[#8E98B0]/50 focus:border-[#38BDF8] outline-none transition-colors" />
          </div>

          <!-- Workspace Selector Scope -->
          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8E98B0]">Workspace Scope</label>
            <select id="key-workspace-select" class="p-3 rounded-xl border border-[#1F2438] bg-[#161926] text-white outline-none focus:border-[#38BDF8] transition-colors cursor-pointer font-medium">
              <option value="">Loading workspaces...</option>
            </select>
            <span class="text-[10px] text-[#8E98B0]/70 font-mono">Telemetry and budget spend will be isolated to this workspace.</span>
          </div>

          <!-- Key Permissions -->
          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8E98B0]">Permissions Scope</label>
            <select class="p-3 rounded-xl border border-[#1F2438] bg-[#161926] text-white outline-none focus:border-[#38BDF8] transition-colors cursor-pointer font-medium">
              <option value="full">Full Inference & Routing Access</option>
              <option value="readonly">Read-only Telemetry Access</option>
            </select>
          </div>
          
          <!-- Actions -->
          <div class="flex items-center justify-end gap-3 pt-4 border-t border-[#1F2438] mt-2">
            <button type="button" id="key-modal-cancel" class="px-5 py-2.5 rounded-xl bg-[#161926] hover:bg-[#1E2235] text-xs font-medium text-white border border-[#1F2438] transition-colors">
              Cancel
            </button>
            <button type="submit" id="key-generate-submit-btn" class="px-6 py-2.5 rounded-xl bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#07080B] text-xs font-bold transition-all shadow-sm flex items-center gap-1.5">
              <span>Create Key</span>
              <span>→</span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Secret Key Display Modal (One-time Reveal) -->
    <div id="key-reveal-modal" class="fixed inset-0 z-50 bg-[#07080B]/90 backdrop-blur-md hidden items-center justify-center p-4">
      <div class="w-full max-w-lg bg-[#10121A] border border-[#1F2438] rounded-2xl p-6 sm:p-8 shadow-2xl animate-fade-in-up flex flex-col gap-5 text-white">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/30 text-emerald-400 shrink-0">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>
          </div>
          <div>
            <h3 class="font-sans font-bold text-base text-white">API Key Generated!</h3>
            <p class="text-xs text-[#8E98B0]">Copy this key now. For your security, it will never be displayed again.</p>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-[10px] font-mono uppercase tracking-wider text-[#8E98B0]">Secret API Key</label>
          <div class="flex items-center gap-2 p-3 bg-[#0A0C13] text-[#38BDF8] font-mono text-xs rounded-xl border border-[#1F2438]">
            <span id="revealed-key-text" class="flex-1 truncate select-all"></span>
            <button id="copy-key-btn" class="px-3.5 py-1.5 bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#07080B] text-xs font-bold rounded-lg transition-all flex items-center gap-1.5">
              <span>Copy</span>
            </button>
          </div>
        </div>

        <div class="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-300 text-xs leading-relaxed flex items-start gap-2.5">
          <span class="text-sm shrink-0">⚠️</span>
          <span>We store only a one-way cryptographic SHA-256 hash of this key. If you lose it, you will need to revoke it and generate a new key.</span>
        </div>

        <button id="close-reveal-btn" class="w-full py-3 bg-[#161926] hover:bg-[#1E2235] text-white font-medium rounded-xl text-xs border border-[#1F2438] transition-colors">
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

  // Populate real workspaces into modal dropdown
  const loadWorkspacesDropdown = async () => {
    try {
      availableWorkspaces = await apiService.getWorkspaces();
      const activeWsId = apiService.getActiveWorkspaceId();
      const activeWsName = apiService.getActiveWorkspace();

      if (workspaceSelect && availableWorkspaces && availableWorkspaces.length > 0) {
        workspaceSelect.innerHTML = availableWorkspaces.map(w => {
          const isSelected = (activeWsId && w.id === activeWsId) || (w.name === activeWsName);
          return `<option value="${w.id}" class="bg-[#10121A] text-white" ${isSelected ? 'selected' : ''}>${w.name} ${w.isDefault || w.is_default ? '(Default)' : ''}</option>`;
        }).join("");
      } else if (workspaceSelect) {
        workspaceSelect.innerHTML = `<option value="" class="bg-[#10121A] text-white">Default Workspace</option>`;
      }
    } catch {
      if (workspaceSelect) {
        workspaceSelect.innerHTML = `<option value="" class="bg-[#10121A] text-white">Default Workspace</option>`;
      }
    }
  };

  // Load real API Keys from Backend
  const renderTable = async () => {
    tableBody.innerHTML = `
      <tr>
        <td colspan="6" class="px-6 py-8 text-center text-[#8E98B0]">
          <div class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-4 w-4 text-[#38BDF8]" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
            <span class="font-sans text-xs">Loading keys...</span>
          </div>
        </td>
      </tr>
    `;

    const keys = await apiService.getApiKeys();
    
    // Explicit Empty State Requirement: Do not display a pre-created fake key
    if (!keys || keys.length === 0) {
      tableContainer.innerHTML = `
        <div class="p-12 text-center flex flex-col items-center justify-center gap-3">
          <div class="w-12 h-12 rounded-2xl bg-[#161926] border border-[#1F2438] flex items-center justify-center text-[#38BDF8]">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
          </div>
          <h3 class="font-bold text-base text-white">No API keys yet</h3>
          <p class="text-xs text-[#8E98B0] max-w-sm font-medium">Create an API key to connect your application to UniLLM.</p>
          <button id="empty-create-key-btn" class="mt-2 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#07080B] text-xs font-bold transition-all shadow-sm">
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

    // Reconstruct table if it was previously replaced with empty state
    if (!document.getElementById("keys-table-body")) {
      tableContainer.innerHTML = `
        <table class="w-full text-left border-collapse text-xs">
          <thead>
            <tr class="bg-[#0D0E15] border-b border-[#1F2438] text-[10px] font-mono uppercase text-[#8E98B0] tracking-wider select-none">
              <th class="px-6 py-4">Name</th>
              <th class="px-6 py-4">Key Prefix</th>
              <th class="px-6 py-4">Workspace</th>
              <th class="px-6 py-4">Created</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="keys-table-body" class="divide-y divide-[#1F2438]/70 font-mono text-[#8E98B0]"></tbody>
        </table>
      `;
    }

    const currentTbody = document.getElementById("keys-table-body");
    currentTbody.innerHTML = keys.map(k => `
      <tr class="hover:bg-[#161926]/40 transition-colors font-mono">
        <td class="px-6 py-4 font-sans font-bold text-white">${k.name}</td>
        <td class="px-6 py-4">
          <code class="text-xs text-[#38BDF8] bg-[#07080B] px-2 py-0.5 rounded border border-[#1F2438]">${k.keyPrefix || k.key_prefix || 'sk-...'}</code>
        </td>
        <td class="px-6 py-4 font-sans text-xs">
          <span class="px-2 py-0.5 rounded-md bg-[#161926] text-[#8E98B0] border border-[#1F2438]">${k.workspaceName || 'Default Workspace'}</span>
        </td>
        <td class="px-6 py-4 text-xs font-sans text-[#8E98B0]">${k.createdAt ? new Date(k.createdAt).toLocaleDateString() : (k.created || "Just now")}</td>
        <td class="px-6 py-4">
          <span class="px-2 py-0.5 rounded-full text-[10px] font-mono ${k.status === 'active' || k.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'}">${k.status}</span>
        </td>
        <td class="px-6 py-4 text-right">
          ${k.status === 'active' || k.status === 'Active' ? `
            <button class="revoke-key-btn text-xs font-sans text-rose-400 hover:text-rose-300 hover:underline bg-transparent" data-id="${k.id}" data-name="${k.name}">
              Revoke
            </button>
          ` : `
            <span class="text-xs text-[#8E98B0]/60">Revoked</span>
          `}
        </td>
      </tr>
    `).join("");

    // Bind Revoke buttons
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

  // Auto-open modal if URL specifies action=create
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get("action") === "create" || window.location.hash === "#create") {
    openModal();
  }

  // Handle form submission
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
