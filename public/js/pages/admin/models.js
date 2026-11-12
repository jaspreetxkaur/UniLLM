// ADMIN PAGE: models
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function adminModels() {
    const models = apiService.getModels();
    return `
      <div class="flex flex-col gap-6 animate-fade-in-up font-sans select-none">
        <div class="flex justify-between items-center border-b pb-4">
          <div class="flex flex-col gap-1">
            <span class="text-[9px] font-bold text-white uppercase tracking-widest">Governance Settings</span>
            <h1 class="font-display font-black text-2xl text-white uppercase leading-none font-bold">Model Enablement</h1>
            <p class="text-xs text-[#A1A5AD] font-semibold font-bold">Configure active LLM endpoints and regional routing flags.</p>
          </div>
        </div>
        
        <div class="border border-[#292D34] bg-white rounded-xl shadow-sm overflow-hidden text-xs font-semibold text-white bg-white">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-brand-bg/40 border-b border-[#292D34] font-bold uppercase text-[9px] text-[#A1A5AD] tracking-wider">
                <th class="px-6 py-4">Model identifier</th>
                <th class="px-6 py-4">Endpoint provider</th>
                <th class="px-6 py-4">Uptime SLA</th>
                <th class="px-6 py-4">Quota status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-brand-border/60">
              ${models.map(m => `
                <tr>
                  <td class="px-6 py-4 font-mono font-bold">${m.id}</td>
                  <td class="px-6 py-4 text-[#A1A5AD]">${m.provider}</td>
                  <td class="px-6 py-4 text-[#A1A5AD] font-mono">99.99%</td>
                  <td class="px-6 py-4 text-green-700 font-bold uppercase">Online</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      </div>
    `;
  };

export function bindAdminModels() {};

export default {
  adminModels,
  bindAdminModels
};
