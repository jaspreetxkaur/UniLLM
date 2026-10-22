// ADMIN PAGE: overview (Database-backed)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function adminOverview() {
  return `
    <div class="flex flex-col gap-6 animate-fade-in-up font-sans">
      <div class="flex justify-between items-center select-none">
        <div class="flex flex-col gap-1">
          <h1 class="font-display font-black text-2xl text-brand-text tracking-tight uppercase">ORGANIZATION ADMIN CONSOLE</h1>
          <p class="text-xs text-brand-muted font-semibold">Manage employee permissions, track organization spend allocations, and review audit trails.</p>
        </div>
      </div>

      <div class="border border-brand-border bg-white rounded-xl shadow-sm grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-brand-border select-none overflow-hidden">
        <div class="p-5 flex flex-col justify-between">
          <span class="text-[9px] font-bold text-brand-muted uppercase tracking-wider">Active Members</span>
          <div class="mt-3 flex items-baseline gap-1.5">
            <span id="admin-stat-members" class="text-2xl font-bold font-mono text-brand-text">...</span>
            <span class="text-[9px] text-emerald-600 font-bold font-mono">PostgreSQL</span>
          </div>
        </div>
        
        <div class="p-5 flex flex-col justify-between">
          <span class="text-[9px] font-bold text-brand-muted uppercase tracking-wider">Org Requests (30d)</span>
          <div class="mt-3 flex items-baseline gap-1.5">
            <span id="admin-stat-requests" class="text-2xl font-bold font-mono text-brand-text">...</span>
            <span class="text-[9px] text-indigo-700 font-bold font-mono">Live</span>
          </div>
        </div>

        <div class="p-5 flex flex-col justify-between">
          <span class="text-[9px] font-bold text-brand-muted uppercase tracking-wider">Org Monthly Spend</span>
          <div class="mt-3 flex items-baseline gap-1.5">
            <span id="admin-stat-spend" class="text-2xl font-bold font-mono text-brand-text">...</span>
            <span id="admin-stat-quota" class="text-[9px] text-brand-muted font-bold font-mono">...</span>
          </div>
        </div>

        <div class="p-5 flex flex-col justify-between col-span-2 lg:col-span-1">
          <span class="text-[9px] font-bold text-brand-muted uppercase tracking-wider">Budget Utilization</span>
          <div id="admin-stat-progress" class="mt-3 flex items-baseline gap-1.5 w-full">
            <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
              <div class="bg-brand-primary h-2.5 rounded-full" style="width: 0%"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-8 border border-brand-border bg-white rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div class="flex justify-between items-center mb-6 select-none">
            <h3 class="font-bold text-xs text-brand-text uppercase tracking-wider">Organization Latency Telemetry (ms)</h3>
            <span class="text-[9px] font-bold text-brand-muted uppercase">Past 30 Days</span>
          </div>
          <div id="admin-overview-chart" class="h-44 flex items-center justify-center text-brand-muted text-xs font-semibold">
            Loading telemetry chart...
          </div>
        </div>

        <div class="lg:col-span-4 border border-brand-border bg-white rounded-xl p-6 shadow-sm flex flex-col gap-4 select-none">
          <div class="flex justify-between items-center border-b pb-3 mb-1">
            <h3 class="font-bold text-xs text-brand-text uppercase tracking-wider">System Sandbox Alerts</h3>
            <span class="px-2 py-0.5 rounded text-[8px] font-bold uppercase bg-slate-100 text-slate-500">Demo</span>
          </div>
          <div id="admin-alerts-container" class="flex flex-col gap-3 font-semibold text-xs">
            <div class="p-4 text-center text-slate-400">All gateway systems nominal.</div>
          </div>
        </div>
      </div>

      <div class="border border-brand-border bg-white rounded-xl shadow-sm overflow-hidden select-text">
        <div class="h-12 border-b border-brand-border px-4 flex items-center justify-between bg-brand-bg/40 select-none">
          <span class="text-xs font-bold text-brand-text uppercase tracking-wider">Recent Governance Audit Trail</span>
          <a href="/admin/audit-logs" data-link class="text-[10px] font-bold text-brand-primary hover:underline uppercase tracking-wider">View Full Audit Log &rarr;</a>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left">
            <thead class="bg-brand-bg text-[10px] font-bold text-brand-text uppercase tracking-wider border-b border-brand-border select-none">
              <tr>
                <th class="px-4 py-3.5">Action Event</th>
                <th class="px-4 py-3.5">Actor</th>
                <th class="px-4 py-3.5">Details</th>
                <th class="px-4 py-3.5 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody id="admin-overview-logs-body" class="divide-y divide-brand-border font-semibold text-brand-muted">
              <tr>
                <td colspan="4" class="px-4 py-8 text-center text-brand-muted">
                  Loading audit logs...
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `;
}

export async function bindAdminOverview() {
  const membersEl = document.getElementById("admin-stat-members");
  const requestsEl = document.getElementById("admin-stat-requests");
  const spendEl = document.getElementById("admin-stat-spend");
  const quotaEl = document.getElementById("admin-stat-quota");
  const progressEl = document.getElementById("admin-stat-progress");
  const chartEl = document.getElementById("admin-overview-chart");
  const logsBody = document.getElementById("admin-overview-logs-body");

  const [members, overview, budget, auditLogs] = await Promise.all([
    apiService.getTeamMembers(),
    apiService.getAnalyticsOverview('30d'),
    apiService.getOrgBudget(),
    apiService.getAuditLogs(5)
  ]);

  if (membersEl) membersEl.innerText = (members ? members.length : 0).toString();

  if (overview) {
    if (requestsEl) requestsEl.innerText = (overview.totalRequests || 0).toLocaleString();
    if (chartEl) {
      chartEl.innerHTML = components.renderAreaChart(overview.latencyHistory, overview.latencyLabels, 150);
    }
  }

  if (budget) {
    const monthlyBudget = budget.monthlyBudgetUsd || budget.monthlyBudget || 100;
    const currentSpend = budget.currentSpendUsd || budget.currentMonthSpend || 0;
    const percent = Math.min(100, Math.round((currentSpend / (monthlyBudget || 1)) * 100));

    if (spendEl) spendEl.innerText = `$${currentSpend.toFixed(2)}`;
    if (quotaEl) quotaEl.innerText = `Quota: $${monthlyBudget.toFixed(2)}`;
    if (progressEl) {
      progressEl.innerHTML = `
        <div class="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
          <div class="bg-brand-primary h-2.5 rounded-full" style="width: ${percent}%"></div>
        </div>
      `;
    }
  }

  if (logsBody) {
    if (!auditLogs || auditLogs.length === 0) {
      logsBody.innerHTML = `
        <tr>
          <td colspan="4" class="px-4 py-8 text-center text-slate-400">
            <p class="font-bold">No audit events recorded yet.</p>
          </td>
        </tr>
      `;
    } else {
      logsBody.innerHTML = auditLogs.map(l => `
        <tr class="hover:bg-slate-50/50">
          <td class="px-4 py-3.5 font-bold text-slate-900">
            <span class="px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase bg-slate-100 border border-slate-200 text-slate-700">
              ${l.action}
            </span>
          </td>
          <td class="px-4 py-3.5 font-mono text-slate-700">${l.user || l.email}</td>
          <td class="px-4 py-3.5 font-mono text-slate-500 truncate max-w-xs">${l.details ? JSON.stringify(l.details) : '-'}</td>
          <td class="px-4 py-3.5 font-mono text-right text-slate-500">${new Date(l.timestamp).toLocaleDateString()}</td>
        </tr>
      `).join("");
    }
  }
}

export default {
  adminOverview,
  bindAdminOverview
};
