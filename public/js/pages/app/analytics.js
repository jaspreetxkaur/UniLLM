// APP PAGE: analytics (Database-backed)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function appAnalytics() {
  return `
    <div class="flex flex-col gap-6 animate-fade-in-up font-sans select-none">
      <div class="flex justify-between items-center">
        <div class="flex flex-col gap-1">
          <span class="text-[9px] font-bold text-white uppercase tracking-widest">Workspace Observability</span>
          <h1 class="font-display font-black text-2xl text-white uppercase leading-none">Usage & Cost Analytics</h1>
          <p class="text-xs text-[#A1A5AD] font-bold">Monitor live query counts, token consumption, and model expenditures from PostgreSQL.</p>
        </div>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 font-semibold text-xs text-[#A1A5AD]">
        <div class="border border-[#292D34] rounded-xl p-4 bg-[#101216] shadow-sm">
          <span class="text-[9px] font-bold uppercase tracking-wider block mb-1">Total Requests</span>
          <span id="analytics-total-requests" class="text-lg font-bold text-white font-mono">...</span>
        </div>
        <div class="border border-[#292D34] rounded-xl p-4 bg-[#101216] shadow-sm">
          <span class="text-[9px] font-bold uppercase tracking-wider block mb-1">Tokens Consumed</span>
          <span id="analytics-total-tokens" class="text-lg font-bold text-white font-mono">...</span>
        </div>
        <div class="border border-[#292D34] rounded-xl p-4 bg-[#101216] shadow-sm">
          <span class="text-[9px] font-bold uppercase tracking-wider block mb-1">Total Expenditure</span>
          <span id="analytics-total-spend" class="text-lg font-bold text-white font-mono">...</span>
        </div>
        <div class="border border-[#292D34] rounded-xl p-4 bg-[#101216] shadow-sm">
          <span class="text-[9px] font-bold uppercase tracking-wider block mb-1">Average Latency</span>
          <span id="analytics-avg-latency" class="text-lg font-bold text-emerald-400 font-mono">...</span>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div class="lg:col-span-8 bg-[#101216] border border-[#292D34] rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <h3 class="font-bold text-xs text-white mb-4 uppercase tracking-wider">Gateway Latency Telemetry (ms)</h3>
          <div id="analytics-area-chart" class="h-56 flex items-center justify-center text-[#A1A5AD] text-xs font-semibold">
            Loading inference traffic...
          </div>
        </div>
        
        <div class="lg:col-span-4 bg-[#101216] border border-[#292D34] rounded-xl p-6 shadow-sm flex flex-col gap-4">
          <h3 class="font-bold text-xs text-white uppercase tracking-wider border-b border-[#292D34] pb-3">Spend by Provider</h3>
          <div id="analytics-donut-chart" class="flex-grow flex items-center justify-center text-[#A1A5AD] text-xs font-semibold">
            Loading provider distribution...
          </div>
        </div>
      </div>
    </div>
  `;
}

export async function bindAppAnalytics() {
  const reqEl = document.getElementById("analytics-total-requests");
  const tokenEl = document.getElementById("analytics-total-tokens");
  const spendEl = document.getElementById("analytics-total-spend");
  const latencyEl = document.getElementById("analytics-avg-latency");
  const areaChartEl = document.getElementById("analytics-area-chart");
  const donutChartEl = document.getElementById("analytics-donut-chart");

  const overview = await apiService.getAnalyticsOverview('30d');

  if (!overview) return;

  if (reqEl) reqEl.innerText = overview.totalRequests.toLocaleString();
  if (tokenEl) {
    const tokens = overview.totalTokens;
    tokenEl.innerText = tokens >= 1000000 ? `${(tokens / 1000000).toFixed(2)}M` : (tokens >= 1000 ? `${(tokens / 1000).toFixed(1)}k` : tokens.toString());
  }
  if (spendEl) spendEl.innerText = `$${overview.totalSpend.toFixed(4)}`;
  if (latencyEl) latencyEl.innerText = `${overview.averageLatency}ms`;

  if (areaChartEl) {
    areaChartEl.innerHTML = components.renderAreaChart(overview.latencyHistory, overview.latencyLabels, 200);
  }

  if (donutChartEl) {
    donutChartEl.innerHTML = components.renderDonutChart(overview.spendByProvider);
  }
}

export default {
  appAnalytics,
  bindAppAnalytics
};
