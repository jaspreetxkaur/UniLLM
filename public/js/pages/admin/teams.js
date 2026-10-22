// ADMIN PAGE: teams (Database-backed Workspaces & Teams)
import { apiService, extractErrorMessage } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function adminTeams() {
  return `
    <div class="flex flex-col gap-6 animate-fade-in-up font-sans select-none">
      <div class="flex justify-between items-center border-b pb-4">
        <div class="flex flex-col gap-1">
          <span class="text-[9px] font-bold text-brand-primary uppercase tracking-widest">Multi-Environment Isolation</span>
          <h1 class="font-display font-black text-2xl text-brand-text uppercase leading-none">Workspaces & Teams</h1>
          <p class="text-xs text-brand-muted font-semibold">Isolate development, staging, and production API keys and telemetry in PostgreSQL.</p>
        </div>

        <button id="create-workspace-btn" class="px-5 py-2.5 bg-brand-primary hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm uppercase tracking-wider">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg>
          New Workspace
        </button>
      </div>
      
      <div id="workspaces-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 font-semibold text-xs text-brand-text">
        <div class="col-span-full py-12 text-center text-brand-muted">
          <div class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-4 w-4 text-brand-primary" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
            <span>Loading workspaces from database...</span>
          </div>
        </div>
      </div>

      <!-- Create Workspace Modal -->
      <div id="workspace-modal" class="fixed inset-0 bg-[#07080B]/80 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4">
        <div class="bg-[#10121A] border border-[#1F2438] rounded-2xl p-6 shadow-2xl max-w-sm w-full animate-scale-up text-white">
          <div class="flex justify-between items-center mb-4">
            <h3 class="font-bold text-base text-white tracking-tight uppercase">Create Workspace</h3>
            <button id="close-workspace-modal-btn" class="p-1 hover:bg-[#161926] rounded-lg text-[#8E98B0] hover:text-white transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          
          <form id="create-workspace-form" class="flex flex-col gap-4 text-xs font-semibold">
            <div>
              <label class="block text-[10px] font-mono font-bold text-[#8E98B0] uppercase mb-1.5">Workspace Name</label>
              <input type="text" id="workspace-name-input" required placeholder="e.g. Production Cluster" style="background-color: #161926 !important; color: #ffffff !important; border: 1px solid #1F2438 !important; caret-color: #38BDF8 !important;" class="w-full p-3 border border-[#1F2438] rounded-xl bg-[#161926] focus:bg-[#161926] focus:border-[#38BDF8] outline-none text-white font-medium placeholder-[#8E98B0]/50 transition-colors" />
            </div>

            <div class="flex gap-2.5 mt-2">
              <button type="button" id="cancel-workspace-btn" class="w-1/2 py-2.5 border border-[#1F2438] hover:bg-[#161926] text-[#8E98B0] hover:text-white font-semibold rounded-xl text-xs transition-colors">
                Cancel
              </button>
              <button type="submit" id="submit-workspace-btn" class="w-1/2 py-2.5 bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#07080B] font-bold rounded-xl text-xs shadow-sm transition-colors">
                Create
              </button>
            </div>
          </form>
        </div>
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

  async function loadWorkspaces() {
    const workspaces = await apiService.getWorkspaces();
    if (!workspaces || workspaces.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-12 text-center text-brand-muted">
          <p class="font-bold">No workspaces found.</p>
          <p class="text-[11px] mt-1">Create your first workspace to isolate developer environments.</p>
        </div>
      `;
      return;
    }

    grid.innerHTML = workspaces.map(w => `
      <div class="border border-brand-border bg-white rounded-xl p-5 shadow-sm flex flex-col justify-between gap-4 hover:border-brand-primary/50 transition-all">
        <div class="flex flex-col gap-1.5">
          <div class="flex justify-between items-center">
            <span class="font-bold text-sm text-brand-text">${w.name}</span>
            ${w.isDefault || w.is_default ? '<span class="px-2 py-0.5 rounded text-[8px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">Default</span>' : ''}
          </div>
          <span class="text-[10px] text-brand-muted font-semibold">${w.keyCount || w.key_count || 0} API Keys Attached</span>
        </div>
        <div class="border-t border-brand-border/60 pt-3 text-[10px] text-brand-muted font-bold flex flex-col gap-1 font-mono">
          <div class="flex justify-between"><span>Total Requests:</span><span>${w.requestCount || w.request_count || 0}</span></div>
          <div class="flex justify-between"><span>Total Spend:</span><span>$${parseFloat(w.totalSpend || w.total_spend || 0).toFixed(4)}</span></div>
        </div>
        ${!(w.isDefault || w.is_default) ? `
          <div class="border-t border-brand-border/60 pt-2 text-right">
            <button class="delete-ws-btn text-[10px] font-bold text-red-600 hover:underline" data-id="${w.id}">
              Delete Workspace
            </button>
          </div>
        ` : ''}
      </div>
    `).join("");

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

  // Modal handlers
  createBtn?.addEventListener("click", () => {
    modal?.classList.remove("hidden");
    document.getElementById("workspace-name-input")?.focus();
  });
  const closeModal = () => modal?.classList.add("hidden");
  closeModalBtn?.addEventListener("click", closeModal);
  cancelBtn?.addEventListener("click", closeModal);

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("workspace-name-input").value.trim();
    const submitBtn = document.getElementById("submit-workspace-btn");
    submitBtn.innerText = "Creating...";
    submitBtn.disabled = true;

    const res = await apiService.createWorkspace(name);
    submitBtn.innerText = "Create";
    submitBtn.disabled = false;

    if (res.success) {
      components.renderToast("success", `Workspace "${name}" created!`);
      closeModal();
      form.reset();
      loadWorkspaces();
    } else {
      components.renderToast("error", extractErrorMessage(res, "Failed to create workspace."));
    }
  });
}

export default {
  adminTeams,
  bindAdminTeams
};
