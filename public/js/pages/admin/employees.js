// ADMIN PAGE: employees (Database-backed)
import { apiService, extractErrorMessage } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function adminEmployees() {
  return `
    <div class="flex flex-col gap-6 animate-fade-in-up font-sans">
      <div class="flex justify-between items-center select-none">
        <div class="flex flex-col gap-1">
          <h1 class="font-display font-black text-2xl text-white tracking-tight uppercase">ORGANIZATION TEAM MEMBERS</h1>
          <p class="text-xs text-[#A1A5AD] font-semibold">Invite team members, assign RBAC roles, allocate monthly spend caps, and manage access in PostgreSQL.</p>
        </div>
        <button id="add-member-btn" class="px-5 py-2.5 bg-white text-black hover:bg-neutral-200 font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 shadow-sm uppercase tracking-wider">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg>
          Invite Member
        </button>
      </div>

      <div class="border border-[#292D34] bg-[#101216] rounded-xl shadow-sm overflow-hidden select-text relative">
        <table class="w-full text-xs text-left">
          <thead class="bg-[#15181D] text-[10px] font-bold text-white uppercase tracking-wider border-b border-[#292D34] select-none">
            <tr>
              <th class="px-6 py-4">Member</th>
              <th class="px-6 py-4">Role</th>
              <th class="px-6 py-4">Spend To Date</th>
              <th class="px-6 py-4">Monthly Cap</th>
              <th class="px-6 py-4">API Keys Access</th>
              <th class="px-6 py-4">Status</th>
              <th class="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody id="members-table-body" class="divide-y divide-[#292D34] font-semibold text-[#A1A5AD]">
            <tr>
              <td colspan="7" class="px-6 py-8 text-center text-[#A1A5AD]">
                <div class="flex items-center justify-center gap-2">
                  <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                  <span>Loading team members from database...</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Member Details Drawer -->
    <div id="member-detail-drawer" class="fixed inset-y-0 right-0 w-80 bg-[#101216] border-l border-[#292D34] shadow-2xl flex flex-col justify-between p-6 transform translate-x-full transition-transform duration-300 select-none z-50">
      <div class="flex flex-col gap-6">
        <div class="flex justify-between items-center border-b border-[#292D34] pb-3">
          <span class="font-display font-bold text-sm text-white uppercase">Member Details</span>
          <button id="close-member-drawer-btn" class="p-1 hover:bg-[#15181D] rounded-lg text-[#A1A5AD] hover:text-white">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <div class="flex flex-col gap-4 text-xs font-semibold text-[#A1A5AD]">
          <div class="flex flex-col gap-1">
            <span class="text-[9px] uppercase font-bold text-[#A1A5AD]/70">Member Name</span>
            <span id="member-lbl-name" class="font-bold text-sm text-white">-</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[9px] uppercase font-bold text-[#A1A5AD]/70">Email Address</span>
            <span id="member-lbl-email" class="font-bold text-white font-mono text-xs">-</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[9px] uppercase font-bold text-[#A1A5AD]/70">Role Scope</span>
            <span id="member-lbl-role" class="font-bold text-white capitalize">-</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[9px] uppercase font-bold text-[#A1A5AD]/70">Current Spend</span>
            <span id="member-lbl-spend" class="font-bold text-white font-mono text-emerald-400">-</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[9px] uppercase font-bold text-[#A1A5AD]/70">Requests Processed</span>
            <span id="member-lbl-requests" class="font-bold text-white font-mono">-</span>
          </div>
        </div>
      </div>
      
      <button id="member-action-close" class="w-full py-2.5 bg-[#15181D] hover:bg-[#1E232B] text-white border border-[#292D34] font-bold rounded-lg text-xs uppercase tracking-wider transition-colors">Close Details</button>
    </div>

    <!-- Invite Member Modal -->
    <div id="invite-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 hidden flex items-center justify-center p-4 overflow-y-auto">
      <div class="bg-[#101216] border border-[#292D34] rounded-2xl p-6 shadow-2xl max-w-md w-full my-auto">
        <div class="flex justify-between items-center mb-4 border-b border-[#292D34] pb-3">
          <h3 class="font-bold text-base text-white uppercase tracking-tight">Invite New Team Member</h3>
          <button id="close-invite-modal-btn" class="p-1 hover:bg-[#15181D] rounded-lg text-[#A1A5AD] hover:text-white transition-colors">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form id="invite-member-form" class="flex flex-col gap-4 text-xs font-semibold">
          <div>
            <label class="block text-[10px] font-bold text-[#A1A5AD] uppercase mb-1">Full Name</label>
            <input type="text" id="invite-name" required placeholder="e.g. Alex Morgan" class="w-full p-2.5 border border-[#292D34] rounded-lg bg-[#15181D] text-white placeholder-[#A1A5AD]/50 focus:border-white outline-none font-bold" />
          </div>

          <div>
            <label class="block text-[10px] font-bold text-[#A1A5AD] uppercase mb-1">Email Address</label>
            <input type="email" id="invite-email" required placeholder="alex@company.com" class="w-full p-2.5 border border-[#292D34] rounded-lg bg-[#15181D] text-white placeholder-[#A1A5AD]/50 focus:border-white outline-none font-bold" />
          </div>

          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[10px] font-bold text-[#A1A5AD] uppercase mb-1">Role</label>
              <select id="invite-role" class="w-full p-2.5 border border-[#292D34] rounded-lg bg-[#15181D] text-white focus:border-white outline-none font-bold cursor-pointer">
                <option value="developer" class="bg-[#101216] text-white">Developer</option>
                <option value="admin" class="bg-[#101216] text-white">Admin</option>
                <option value="viewer" class="bg-[#101216] text-white">Viewer</option>
              </select>
            </div>

            <div>
              <label class="block text-[10px] font-bold text-[#A1A5AD] uppercase mb-1">Monthly Spend Cap ($)</label>
              <input type="number" id="invite-spend-cap" value="50" min="5" max="1000" class="w-full p-2.5 border border-[#292D34] rounded-lg bg-[#15181D] text-white focus:border-white outline-none font-mono font-bold" />
            </div>
          </div>

          <div class="flex gap-2.5 mt-2">
            <button type="button" id="cancel-invite-btn" class="w-1/2 py-2.5 border border-[#292D34] hover:bg-[#15181D] text-[#A1A5AD] hover:text-white font-bold rounded-lg uppercase tracking-wider text-[11px] transition-colors">
              Cancel
            </button>
            <button type="submit" id="submit-invite-btn" class="w-1/2 py-2.5 bg-white hover:bg-neutral-200 text-[#08090B] font-bold rounded-lg uppercase tracking-wider text-[11px] shadow-sm transition-colors">
              Send Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  `;
}

export async function bindAdminEmployees() {
  const tableBody = document.getElementById("members-table-body");
  const inviteBtn = document.getElementById("add-member-btn");
  const inviteModal = document.getElementById("invite-modal");
  const closeInviteModalBtn = document.getElementById("close-invite-modal-btn");
  const cancelInviteBtn = document.getElementById("cancel-invite-btn");
  const inviteForm = document.getElementById("invite-member-form");

  const drawer = document.getElementById("member-detail-drawer");
  const closeDrawerBtn = document.getElementById("close-member-drawer-btn");
  const closeDrawerBottomBtn = document.getElementById("member-action-close");

  const lblName = document.getElementById("member-lbl-name");
  const lblEmail = document.getElementById("member-lbl-email");
  const lblRole = document.getElementById("member-lbl-role");
  const lblSpend = document.getElementById("member-lbl-spend");
  const lblRequests = document.getElementById("member-lbl-requests");

  // Fetch real team members from PostgreSQL
  async function loadMembers() {
    const members = await apiService.getTeamMembers();
    if (!members || members.length === 0) {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" class="px-6 py-8 text-center text-[#A1A5AD]">
            <p class="font-bold">No members found.</p>
            <p class="text-[11px] mt-1">Click "Invite Member" above to add developers to your organization.</p>
          </td>
        </tr>
      `;
      return;
    }

    tableBody.innerHTML = members.map(m => `
      <tr class="hover:bg-brand-bg/40 cursor-pointer member-row" 
          data-name="${m.name}" 
          data-email="${m.email}" 
          data-role="${m.role}" 
          data-spend="$${parseFloat(m.currentSpend || m.current_spend || 0).toFixed(4)}"
          data-requests="${m.requestCount || m.request_count || 0}">
        <td class="px-6 py-4 font-bold text-white">
          <div class="flex flex-col">
            <span>${m.name}</span>
            <span class="text-[10px] text-[#A1A5AD] font-normal font-mono">${m.email}</span>
          </div>
        </td>
        <td class="px-6 py-4">
          <span class="px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
            m.role === 'owner' ? 'bg-indigo-50 border border-indigo-200 text-indigo-700' :
            m.role === 'admin' ? 'bg-purple-50 border border-purple-200 text-purple-700' :
            'bg-slate-100 border border-slate-200 text-slate-700'
          }">${m.role}</span>
        </td>
        <td class="px-6 py-4 font-mono text-white">$${parseFloat(m.currentSpend || m.current_spend || 0).toFixed(4)}</td>
        <td class="px-6 py-4 font-mono">${m.monthlySpendLimitUsd || m.monthly_spend_limit_usd ? `$${(m.monthlySpendLimitUsd || m.monthly_spend_limit_usd).toFixed(2)}` : 'Unlimited'}</td>
        <td class="px-6 py-4">
          <span class="text-[10px] ${m.canCreateApiKeys !== false ? 'text-emerald-600 font-bold' : 'text-slate-400'}">${m.canCreateApiKeys !== false ? 'Allowed' : 'Disabled'}</span>
        </td>
        <td class="px-6 py-4">
          <span class="inline-flex items-center gap-1.5 font-bold text-[10px] ${m.status === 'active' ? 'text-emerald-600' : 'text-red-500'}">
            <span class="w-2 h-2 rounded-full ${m.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}"></span>
            ${m.status === 'active' ? 'Active' : 'Suspended'}
          </span>
        </td>
        <td class="px-6 py-4 text-right select-none" onclick="event.stopPropagation();">
          ${m.role !== 'owner' ? `
            <button class="toggle-status-btn text-[10px] font-bold ${m.status === 'active' ? 'text-amber-600 hover:underline' : 'text-emerald-600 hover:underline'}" data-id="${m.memberId || m.id}" data-status="${m.status}">
              ${m.status === 'active' ? 'Suspend' : 'Activate'}
            </button>
            <button class="remove-member-btn text-[10px] font-bold text-red-600 hover:underline ml-3" data-id="${m.memberId || m.id}">
              Remove
            </button>
          ` : '<span class="text-[10px] text-slate-400 italic">Owner</span>'}
        </td>
      </tr>
    `).join("");

    // Bind row click for details drawer
    document.querySelectorAll(".member-row").forEach(row => {
      row.addEventListener("click", () => {
        if (lblName) lblName.innerText = row.getAttribute("data-name");
        if (lblEmail) lblEmail.innerText = row.getAttribute("data-email");
        if (lblRole) lblRole.innerText = row.getAttribute("data-role");
        if (lblSpend) lblSpend.innerText = row.getAttribute("data-spend");
        if (lblRequests) lblRequests.innerText = row.getAttribute("data-requests");

        drawer?.classList.remove("translate-x-full");
      });
    });

    // Bind Suspend / Activate
    document.querySelectorAll(".toggle-status-btn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        const status = btn.getAttribute("data-status");
        btn.innerText = "...";
        const res = await apiService.suspendEmployee(id, status);
        if (res.success) {
          components.renderToast("success", `Member status updated to ${status === 'active' ? 'suspended' : 'active'}.`);
          loadMembers();
        } else {
          components.renderToast("error", extractErrorMessage(res, "Failed to update member status."));
          btn.innerText = status === 'active' ? 'Suspend' : 'Activate';
        }
      });
    });

    // Bind Remove
    document.querySelectorAll(".remove-member-btn").forEach(btn => {
      btn.addEventListener("click", async (e) => {
        e.stopPropagation();
        if (!confirm("Are you sure you want to remove this member from the organization?")) return;
        const id = btn.getAttribute("data-id");
        btn.innerText = "...";
        const res = await apiService.removeEmployee(id);
        if (res.success) {
          components.renderToast("success", "Member removed from organization.");
          loadMembers();
        } else {
          components.renderToast("error", extractErrorMessage(res, "Failed to remove member."));
          btn.innerText = "Remove";
        }
      });
    });
  }

  loadMembers();

  // Drawer handlers
  const closeDrawer = () => drawer?.classList.add("translate-x-full");
  closeDrawerBtn?.addEventListener("click", closeDrawer);
  closeDrawerBottomBtn?.addEventListener("click", closeDrawer);

  // Modal handlers
  inviteBtn?.addEventListener("click", () => inviteModal?.classList.remove("hidden"));
  const closeModal = () => inviteModal?.classList.add("hidden");
  closeInviteModalBtn?.addEventListener("click", closeModal);
  cancelInviteBtn?.addEventListener("click", closeModal);

  // Handle invite submission
  inviteForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("invite-name").value.trim();
    const email = document.getElementById("invite-email").value.trim();
    const role = document.getElementById("invite-role").value;
    const spendCap = parseFloat(document.getElementById("invite-spend-cap").value) || 50.00;
    const submitBtn = document.getElementById("submit-invite-btn");

    submitBtn.innerText = "Inviting...";
    submitBtn.disabled = true;

    const res = await apiService.inviteEmployee(name, email, role, spendCap);
    submitBtn.innerText = "Send Invitation";
    submitBtn.disabled = false;

    if (res.success) {
      components.renderToast("success", `Member ${name} invited successfully!`);
      closeModal();
      inviteForm.reset();
      loadMembers();
    } else {
      components.renderToast("error", extractErrorMessage(res, "Failed to invite member."));
    }
  });
}

export default {
  adminEmployees,
  bindAdminEmployees
};
