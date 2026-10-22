// ADMIN PAGE: auditLogs (Database-backed)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function adminAuditLogs() {
  return `
    <div class="flex flex-col gap-6 animate-fade-in-up font-sans select-none">
      <div class="flex justify-between items-center border-b pb-4">
        <div class="flex flex-col gap-1">
          <span class="text-[9px] font-bold text-brand-primary uppercase tracking-widest">Compliance Telemetry</span>
          <h1 class="font-display font-black text-2xl text-brand-text uppercase leading-none">Governance Audit Trail</h1>
          <p class="text-xs text-brand-muted font-semibold">Audit administrator operations, member invitations, key lifecycle, and policy changes.</p>
        </div>
      </div>
      
      <div class="border border-brand-border bg-white rounded-xl shadow-sm overflow-hidden text-xs font-semibold text-brand-text bg-white">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="bg-brand-bg/40 border-b border-brand-border font-bold uppercase text-[9px] text-brand-muted tracking-wider">
              <th class="px-6 py-4">Action Event</th>
              <th class="px-6 py-4">Actor</th>
              <th class="px-6 py-4">Event Details</th>
              <th class="px-6 py-4">IP Address</th>
              <th class="px-6 py-4 text-right">Timestamp</th>
            </tr>
          </thead>
          <tbody id="audit-logs-table-body" class="divide-y divide-brand-border/60">
            <tr>
              <td colspan="5" class="px-6 py-8 text-center text-brand-muted">
                Loading compliance audit trail from PostgreSQL...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `;
}

export async function bindAdminAuditLogs() {
  const tableBody = document.getElementById("audit-logs-table-body");
  const logs = await apiService.getAuditLogs(50);

  if (!logs || logs.length === 0) {
    tableBody.innerHTML = `
      <tr>
        <td colspan="5" class="px-6 py-8 text-center text-brand-muted">
          <p class="font-bold">No audit events recorded yet.</p>
          <p class="text-[11px] mt-1">Actions like creating keys, inviting members, and managing workspaces will appear here.</p>
        </td>
      </tr>
    `;
    return;
  }

  tableBody.innerHTML = logs.map(l => `
    <tr class="hover:bg-brand-bg/40">
      <td class="px-6 py-4 font-bold text-brand-text">
        <span class="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-slate-100 border border-slate-200 text-slate-700">
          ${l.action}
        </span>
      </td>
      <td class="px-6 py-4">
        <div class="flex flex-col">
          <span class="font-bold text-brand-text">${l.user}</span>
          <span class="text-[10px] text-brand-muted font-mono">${l.email}</span>
        </div>
      </td>
      <td class="px-6 py-4 font-mono text-[11px] text-brand-muted truncate max-w-xs">
        ${l.details ? JSON.stringify(l.details) : '-'}
      </td>
      <td class="px-6 py-4 font-mono text-brand-muted">${l.ipAddress}</td>
      <td class="px-6 py-4 text-brand-muted font-mono text-right text-[11px]">
        ${new Date(l.timestamp).toLocaleString()}
      </td>
    </tr>
  `).join("");
}

export default {
  adminAuditLogs,
  bindAdminAuditLogs
};
