// ADMIN PAGE: teams (Database-backed Workspaces & Teams)
import { apiService, extractErrorMessage } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function adminTeams() {
  return `
    <div class="flex flex-col gap-6 animate-fade-in-up font-sans select-none">
      <div class="flex justify-between items-center border-b border-[#292D34] pb-4">
        <div class="flex flex-col gap-1">
          <span class="text-[9px] font-bold text-sky-400 uppercase tracking-widest font-mono">Multi-Environment Isolation</span>
          <h1 class="font-display font-black text-2xl text-white uppercase leading-none">Workspaces & Teams</h1>
          <p class="text-xs text-[#A1A5AD] font-semibold">Create, rename, and isolate development, staging, and production workspace environments.</p>
        </div>

        <button id="create-workspace-btn" class="px-5 py-2.5 bg-white text-black hover:bg-neutral-200 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm uppercase tracking-wider">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg>
          New Workspace
        </button>
      </div>
      
      <div id="workspaces-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-semibold text-xs text-white">
        <div class="col-span-full py-12 text-center text-[#A1A5AD]">
          <div class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
            <span>Loading workspaces from database...</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Workspace Modal -->
    <div id="workspace-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4 overflow-y-auto">
      <div class="bg-[#101216] border border-[#292D34] rounded-2xl p-6 shadow-2xl max-w-sm w-full text-white my-auto">
        <div class="flex justify-between items-center mb-4 border-b border-[#292D34] pb-3">
          <h3 class="font-bold text-base text-white tracking-tight uppercase">Create Workspace</h3>
          <button id="close-workspace-modal-btn" class="p-1 hover:bg-[#15181D] rounded-lg text-[#A1A5AD] hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form id="create-workspace-form" class="flex flex-col gap-4 text-xs font-semibold">
          <div>
            <label class="block text-[10px] font-mono font-bold text-[#A1A5AD] uppercase mb-1.5">Workspace Name</label>
            <input type="text" id="workspace-name-input" required placeholder="e.g. Production Cluster" class="w-full p-3 border border-[#292D34] rounded-xl bg-[#15181D] focus:border-white outline-none text-white font-medium placeholder-[#A1A5AD]/50 transition-colors" />
          </div>

          <div class="flex gap-2.5 mt-2">
            <button type="button" id="cancel-workspace-btn" class="w-1/2 py-2.5 border border-[#292D34] hover:bg-[#15181D] text-[#A1A5AD] hover:text-white font-semibold rounded-xl text-xs transition-colors">
              Cancel
            </button>
            <button type="submit" id="submit-workspace-btn" class="w-1/2 py-2.5 bg-white hover:bg-neutral-200 text-[#08090B] font-bold rounded-xl text-xs shadow-sm transition-colors">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Edit/Rename Workspace Modal -->
    <div id="edit-workspace-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4 overflow-y-auto">
      <div class="bg-[#101216] border border-[#292D34] rounded-2xl p-6 shadow-2xl max-w-sm w-full text-white my-auto">
        <div class="flex justify-between items-center mb-4 border-b border-[#292D34] pb-3">
          <h3 class="font-bold text-base text-white tracking-tight uppercase">Rename Workspace</h3>
          <button id="close-edit-modal-btn" class="p-1 hover:bg-[#15181D] rounded-lg text-[#A1A5AD] hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form id="edit-workspace-form" class="flex flex-col gap-4 text-xs font-semibold">
          <input type="hidden" id="edit-workspace-id" />
          <div>
            <label class="block text-[10px] font-mono font-bold text-[#A1A5AD] uppercase mb-1.5">New Workspace Name</label>
            <input type="text" id="edit-workspace-name-input" required placeholder="e.g. Core Staging Environment" class="w-full p-3 border border-[#292D34] rounded-xl bg-[#15181D] focus:border-white outline-none text-white font-medium placeholder-[#A1A5AD]/50 transition-colors" />
          </div>

          <div class="flex gap-2.5 mt-2">
            <button type="button" id="cancel-edit-btn" class="w-1/2 py-2.5 border border-[#292D34] hover:bg-[#15181D] text-[#A1A5AD] hover:text-white font-semibold rounded-xl text-xs transition-colors">
              Cancel
            </button>
            <button type="submit" id="submit-edit-btn" class="w-1/2 py-2.5 bg-white hover:bg-neutral-200 text-[#08090B] font-bold rounded-xl text-xs shadow-sm transition-colors">
              Save Name
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export async function bindAdminTeams() {
  const grid = document.getElementById("workspaces-grid");
  const createBtn = document.getElementById("create-workspace-btn");
  const modal = document.getElementById("workspace-modal");
  const closeModalBtn = document.getElementById("close-workspace-modal-btn");
  const cancelBtn = document.getElementById("cancel-workspace-btn");
  const form = document.getElementById("create-workspace-form");

  const editModal = document.getElementById("edit-workspace-modal");
  const closeEditModalBtn = document.getElementById("close-edit-modal-btn");
  const cancelEditBtn = document.getElementById("cancel-edit-btn");
  const editForm = document.getElementById("edit-workspace-form");
  const editIdInput = document.getElementById("edit-workspace-id");
  const editNameInput = document.getElementById("edit-workspace-name-input");

  async function loadWorkspaces() {
    const workspaces = await apiService.getWorkspaces();
    if (!workspaces || workspaces.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-12 text-center text-[#A1A5AD]">
          <p class="font-bold">No workspaces found.</p>
          <p class="text-[11px] mt-1">Create your first workspace to isolate developer environments.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = workspaces.map(w => {
      const isDef = w.isDefault || w.is_default;
      return `
        <div class="border border-[#292D34] bg-[#101216] rounded-xl p-5 shadow-sm flex flex-col justify-between gap-4 hover:border-white/30 transition-all">
          <div class="flex flex-col gap-1.5">
            <div class="flex justify-between items-center">
              <span class="font-bold text-sm text-white">${w.name}</span>
              ${isDef ? '<span class="px-2 py-0.5 rounded text-[8px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono">Default</span>' : ''}
            </div>
            <span class="text-[10px] text-[#A1A5AD] font-semibold">${w.keyCount || w.key_count || 0} API Keys Attached</span>
          </div>

          <div class="border-t border-[#292D34] pt-3 text-[10px] text-[#A1A5AD] font-bold flex flex-col gap-1 font-mono">
            <div class="flex justify-between"><span>Total Requests:</span><span>${w.requestCount || w.request_count || 0}</span></div>
            <div class="flex justify-between"><span>Total Spend:</span><span>$${parseFloat(w.totalSpend || w.total_spend || 0).toFixed(4)}</span></div>
          </div>

          <div class="border-t border-[#292D34] pt-2.5 flex items-center justify-between">
            <button class="edit-ws-btn text-[10px] font-mono font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1 transition-colors" data-id="${w.id}" data-name="${w.name}">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
              Rename
            </button>
            ${!isDef ? `
              <button class="delete-ws-btn text-[10px] font-bold text-rose-400 hover:text-rose-300 hover:underline transition-colors" data-id="${w.id}">
                Delete Workspace
              </button>
            ` : '<span class="text-[9px] font-mono text-[#A1A5AD]/60">Default Cluster</span>'}
          </div>
        </div>
      `;
    }).join("");

    // Bind Edit/Rename buttons
    document.querySelectorAll(".edit-ws-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const currentName = btn.getAttribute("data-name");
        if (editIdInput) editIdInput.value = id;
        if (editNameInput) editNameInput.value = currentName;
        editModal?.classList.remove("hidden");
        editNameInput?.focus();
      });
    });

    // Bind delete buttons
    document.querySelectorAll(".delete-ws-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        if (!confirm("Are you sure you want to delete this workspace?")) return;
        const id = btn.getAttribute("data-id");
        btn.innerText = "Deleting...";
        const res = await apiService.deleteWorkspace(id);
        if (res.success) {
          components.renderToast("success", "Workspace deleted.");
          loadWorkspaces();
        } else {
          components.renderToast("error", extractErrorMessage(res, "Failed to delete workspace."));
          btn.innerText = "Delete Workspace";
        }
      });
    });
  }

  loadWorkspaces();

  // Create Modal handlers
  createBtn?.addEventListener("click", () => {
    modal?.classList.remove("hidden");
    document.getElementById("workspace-name-input")?.focus();
  });
  const closeModal = () => modal?.classList.add("hidden");
  closeModalBtn?.addEventListener("click", closeModal);
  cancelBtn?.addEventListener("click", closeModal);

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const input = document.getElementById("workspace-name-input");
    const name = input.value.trim();
    if (!name) return;

    const submitBtn = document.getElementById("submit-workspace-btn");
    submitBtn.innerText = "Creating...";
    submitBtn.disabled = true;

    const res = await apiService.createWorkspace(name);
    submitBtn.innerText = "Create";
    submitBtn.disabled = false;

    if (res.success) {
      components.renderToast("success", `Workspace "${name}" created!`);
      closeModal();
      input.value = "";
      loadWorkspaces();
    } else {
      components.renderToast("error", extractErrorMessage(res, "Failed to create workspace."));
    }
  });

  // Edit Modal handlers
  const closeEditModal = () => editModal?.classList.add("hidden");
  closeEditModalBtn?.addEventListener("click", closeEditModal);
  cancelEditBtn?.addEventListener("click", closeEditModal);

  editForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = editIdInput.value;
    const newName = editNameInput.value.trim();
    if (!id || !newName) return;

    const submitBtn = document.getElementById("submit-edit-btn");
    submitBtn.innerText = "Saving...";
    submitBtn.disabled = true;

    const res = await apiService.updateWorkspace(id, newName);
    submitBtn.innerText = "Save Name";
    submitBtn.disabled = false;

    if (res.success) {
      components.renderToast("success", `Workspace renamed to "${newName}"!`);
      closeEditModal();
      loadWorkspaces();
    } else {
      components.renderToast("error", extractErrorMessage(res, "Failed to update workspace name."));
    }
  });
}

export default {
  adminTeams,
  bindAdminTeams
};
