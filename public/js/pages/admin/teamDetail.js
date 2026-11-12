// ADMIN PAGE: teamDetail
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function adminTeamDetail(params) {
    const t = apiService.getTeam(params.id) || apiService.getTeams()[0];
    return `
      <div class="flex flex-col gap-6 animate-fade-in-up font-sans select-none font-semibold text-xs text-[#A1A5AD]">
        <a href="/admin/teams" data-link class="text-xs font-bold text-white hover:underline flex items-center gap-1.5 self-start uppercase tracking-wider">
          &larr; Back to Teams
        </a>
        
        <div class="flex justify-between items-center border-b pb-4">
          <div class="flex flex-col gap-1">
            <span class="text-[9px] font-bold text-white uppercase tracking-widest font-bold">Team Profile</span>
            <h1 class="font-display font-black text-2xl text-white uppercase leading-none font-bold">${t.name} Department</h1>
            <span class="text-[#A1A5AD] font-bold font-mono">Scope: org-allocated sandboxes</span>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 font-semibold">
          <div class="border border-[#292D34] rounded-xl p-4 bg-white shadow-sm text-center font-bold">
            <span class="text-[9px] font-bold uppercase tracking-wider block mb-1">Total Members</span>
            <span class="text-lg font-bold text-white font-mono">${t.members}</span>
          </div>
          <div class="border border-[#292D34] rounded-xl p-4 bg-white shadow-sm text-center font-bold">
            <span class="text-[9px] font-bold uppercase tracking-wider block mb-1">Expenditure</span>
            <span class="text-lg font-bold text-white font-mono">$${t.spend.toFixed(2)}</span>
          </div>
          <div class="border border-[#292D34] rounded-xl p-4 bg-white shadow-sm text-center font-bold">
            <span class="text-[9px] font-bold uppercase tracking-wider block mb-1">Allocated Budget</span>
            <span class="text-lg font-bold text-white font-mono">$${t.budget}</span>
          </div>
        </div>
      </div>
    `;
  };

export function bindAdminTeamDetail() {};

export default {
  adminTeamDetail,
  bindAdminTeamDetail
};
