// APP PAGE: overview (Master Redesign for Authenticated Dashboard)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

let activeRange = '30d';
let activeUsageType = 'all';

export function appOverview() {
  const currentUser = apiService.getCurrentUser() || { name: "Jaspreet", org: "Cyberdyne Systems" };
  const orgName = currentUser.org || "Cyberdyne Systems";
  const activeWorkspaceName = apiService.getActiveWorkspace() || "Default Workspace";
  const credits = apiService.getCredits() || { remaining: 140.15 };
  const balance = typeof credits.remaining === "number" ? credits.remaining : 140.15;

  return `
    <div id="overview-container" class="flex flex-col gap-6 animate-fade-in-up font-sans text-white select-none">
      
      <!-- C. Dashboard Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#1F2438]/80">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <h1 class="font-sans font-bold text-2xl text-white tracking-tight">Dashboard</h1>
            <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Live Edge
            </span>
          </div>
          <div class="flex items-center gap-2 text-xs text-[#8E98B0]">
            <span id="overview-active-ws-title" class="text-white font-medium">${activeWorkspaceName}</span>
            <span>•</span>
            <span class="font-mono text-[#8E98B0]">${orgName}</span>
          </div>
        </div>
        
        <!-- Header Actions: Create API Key & Top Up Credits -->
        <div class="flex items-center gap-3">
          <a
            href="/app/billing"
            data-link
            id="overview-topup-btn"
            class="px-4 py-2 rounded-xl bg-[#10121A] hover:bg-[#161926] border border-[#1F2438] hover:border-[#38BDF8]/40 text-xs font-semibold text-white transition-all flex items-center gap-2 shadow-sm"
          >
            <svg class="w-3.5 h-3.5 text-[#38BDF8]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            Top Up Credits
          </a>
          <a
            href="/app/api-keys?action=create"
            data-link
            id="overview-create-key-btn"
            class="px-4 py-2 rounded-xl bg-white hover:bg-slate-200 text-[#07080B] text-xs font-semibold transition-all flex items-center gap-2 shadow-sm font-sans"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
            + Create API Key
          </a>
        </div>
      </div>

      <!-- D. Overview Filters Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#10121A] border border-[#1F2438] p-2.5 rounded-xl text-xs">
        <!-- Usage Type Filter Tabs -->
        <div class="flex items-center gap-1.5" id="usage-type-filters">
          <button data-type="all" class="filter-type-btn px-3 py-1.5 rounded-lg font-medium transition-all bg-[#161926] text-white border border-[#1F2438]">
            All Requests
          </button>
          <button data-type="chat" class="filter-type-btn px-3 py-1.5 rounded-lg font-medium transition-all text-[#8E98B0] hover:text-white hover:bg-[#161926]/60">
            Chat Completions
          </button>
          <button data-type="embeddings" class="filter-type-btn px-3 py-1.5 rounded-lg font-medium transition-all text-[#8E98B0] hover:text-white hover:bg-[#161926]/60">
            Embeddings
          </button>
        </div>

        <!-- Date Range Filter Tabs -->
        <div class="flex items-center gap-1.5 self-end sm:self-auto" id="date-range-filters">
          <span class="text-[11px] text-[#8E98B0] mr-1">Range:</span>
          <button data-range="7d" class="filter-range-btn px-2.5 py-1 rounded-md font-mono text-[11px] transition-all text-[#8E98B0] hover:text-white hover:bg-[#161926]">
            7d
          </button>
          <button data-range="30d" class="filter-range-btn px-2.5 py-1 rounded-md font-mono text-[11px] transition-all bg-[#161926] text-white border border-[#1F2438] font-bold">
            30d
          </button>
          <button data-range="90d" class="filter-range-btn px-2.5 py-1 rounded-md font-mono text-[11px] transition-all text-[#8E98B0] hover:text-white hover:bg-[#161926]">
            90d
          </button>
        </div>
      </div>
      
      <!-- E. 5 Key Metrics Cards Row -->
      <div id="overview-metrics-row" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        
        <!-- Metric 1: Available Balance -->
        <div class="p-4 rounded-xl bg-[#10121A] border border-[#1F2438] flex flex-col justify-between hover:border-[#38BDF8]/30 transition-all">
          <div class="flex items-center justify-between">
            <span class="text-xs text-[#8E98B0] font-medium">Available Balance</span>
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
          </div>
          <div class="mt-3">
            <span id="metric-balance" class="text-2xl font-bold font-mono text-white">$${balance.toFixed(2)}</span>
            <p class="text-[10px] text-[#8E98B0] mt-1">Auto-recharge enabled</p>
          </div>
        </div>

        <!-- Metric 2: Total Spend -->
        <div class="p-4 rounded-xl bg-[#10121A] border border-[#1F2438] flex flex-col justify-between hover:border-[#38BDF8]/30 transition-all">
          <div class="flex items-center justify-between">
            <span class="text-xs text-[#8E98B0] font-medium">Total Spend</span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded text-emerald-400 bg-emerald-500/10">30d active</span>
          </div>
          <div class="mt-3">
            <span id="metric-total-spend" class="text-2xl font-bold font-mono text-white">$12.48</span>
            <p class="text-[10px] text-[#8E98B0] mt-1">Direct provider pass-through</p>
          </div>
        </div>
        
        <!-- Metric 3: Request Volume -->
        <div class="p-4 rounded-xl bg-[#10121A] border border-[#1F2438] flex flex-col justify-between hover:border-[#38BDF8]/30 transition-all">
          <div class="flex items-center justify-between">
            <span class="text-xs text-[#8E98B0] font-medium">Request Volume</span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded text-[#38BDF8] bg-[#38BDF8]/10">99.98% OK</span>
          </div>
          <div class="mt-3">
            <span id="metric-total-requests" class="text-2xl font-bold font-mono text-white">12,482</span>
            <p class="text-[10px] text-[#8E98B0] mt-1">Total API calls processed</p>
          </div>
        </div>
        
        <!-- Metric 4: Total Tokens -->
        <div class="p-4 rounded-xl bg-[#10121A] border border-[#1F2438] flex flex-col justify-between hover:border-[#38BDF8]/30 transition-all">
          <div class="flex items-center justify-between">
            <span class="text-xs text-[#8E98B0] font-medium">Total Tokens</span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded text-indigo-400 bg-indigo-500/10">In + Out</span>
          </div>
          <div class="mt-3">
            <span id="metric-total-tokens" class="text-2xl font-bold font-mono text-white">8.4M</span>
            <p class="text-[10px] text-[#8E98B0] mt-1">Token volume routed</p>
          </div>
        </div>

        <!-- Metric 5: Avg Latency -->
        <div class="p-4 rounded-xl bg-[#10121A] border border-[#1F2438] flex flex-col justify-between hover:border-[#38BDF8]/30 transition-all">
          <div class="flex items-center justify-between">
            <span class="text-xs text-[#8E98B0] font-medium">Avg. Latency</span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded text-emerald-400 bg-emerald-500/10">P95</span>
          </div>
          <div class="mt-3">
            <span id="metric-avg-latency" class="text-2xl font-bold font-mono text-white">280 ms</span>
            <p class="text-[10px] text-[#8E98B0] mt-1">Global edge routing</p>
          </div>
        </div>
      </div>

      <!-- H. Quick Actions Bar -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <a href="/app/api-keys?action=create" data-link class="p-3 rounded-xl bg-[#10121A] border border-[#1F2438] hover:border-[#38BDF8]/40 hover:bg-[#161926] transition-all flex items-center gap-3 group">
          <div class="w-8 h-8 rounded-lg bg-[#38BDF8]/10 text-[#38BDF8] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
          </div>
          <div class="flex flex-col truncate">
            <span class="text-xs font-semibold text-white group-hover:text-[#38BDF8] transition-colors truncate">New API Key</span>
            <span class="text-[10px] text-[#8E98B0] truncate">Generate secret token</span>
          </div>
        </a>

        <a href="/app/playground" data-link class="p-3 rounded-xl bg-[#10121A] border border-[#1F2438] hover:border-[#38BDF8]/40 hover:bg-[#161926] transition-all flex items-center gap-3 group">
          <div class="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <div class="flex flex-col truncate">
            <span class="text-xs font-semibold text-white group-hover:text-[#38BDF8] transition-colors truncate">Open Playground</span>
            <span class="text-[10px] text-[#8E98B0] truncate">Test model inference</span>
          </div>
        </a>

        <a href="/app/models" data-link class="p-3 rounded-xl bg-[#10121A] border border-[#1F2438] hover:border-[#38BDF8]/40 hover:bg-[#161926] transition-all flex items-center gap-3 group">
          <div class="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
          </div>
          <div class="flex flex-col truncate">
            <span class="text-xs font-semibold text-white group-hover:text-[#38BDF8] transition-colors truncate">Explore Models</span>
            <span class="text-[10px] text-[#8E98B0] truncate">View latency & pricing</span>
          </div>
        </a>

        <a href="/docs" data-link class="p-3 rounded-xl bg-[#10121A] border border-[#1F2438] hover:border-[#38BDF8]/40 hover:bg-[#161926] transition-all flex items-center gap-3 group">
          <div class="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <div class="flex flex-col truncate">
            <span class="text-xs font-semibold text-white group-hover:text-[#38BDF8] transition-colors truncate">API Reference</span>
            <span class="text-[10px] text-[#8E98B0] truncate">5-minute quickstart</span>
          </div>
        </a>
      </div>

      <!-- Dedicated Workspace API Keys Section -->
      <div class="rounded-xl bg-[#10121A] border border-[#1F2438] overflow-hidden select-text">
        <div class="h-14 border-b border-[#1F2438] px-5 flex items-center justify-between select-none">
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2">
              <span class="text-sm font-semibold text-white">Workspace API Keys</span>
              <span id="overview-ws-key-count" class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#161926] text-[#38BDF8] border border-[#1F2438]">0 keys</span>
            </div>
            <span class="text-xs text-[#8E98B0] hidden sm:inline">•</span>
            <span id="overview-active-ws-scope" class="text-xs text-[#8E98B0] hidden sm:inline">Active Scope: <span class="text-white font-medium">${activeWorkspaceName}</span></span>
          </div>
          <div class="flex items-center gap-3">
            <a href="/app/api-keys" data-link class="text-xs text-[#8E98B0] hover:text-white transition-colors hidden sm:flex items-center gap-1">
              All Keys →
            </a>
            <a
              href="/app/api-keys?action=create"
              data-link
              class="px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-200 text-[#07080B] text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg>
              <span>Create API Key</span>
            </a>
          </div>
        </div>

        <div id="overview-keys-container">
          <div class="p-8 text-center flex items-center justify-center gap-2 text-xs text-[#8E98B0]">
            <svg class="animate-spin h-4 w-4 text-[#38BDF8]" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
            <span>Loading workspace credentials...</span>
          </div>
        </div>
      </div>

      <!-- F. Main Analytics Area: Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- Left: Request Volume / Spend Over Time (Col 7) -->
        <div class="lg:col-span-7 rounded-xl bg-[#10121A] border border-[#1F2438] p-5 flex flex-col justify-between">
          <div class="flex justify-between items-center mb-4 select-none">
            <div class="flex items-center gap-2">
              <h3 class="font-semibold text-sm text-white">Gateway Request Volume</h3>
              <span id="chart-range-indicator" class="text-[10px] font-mono text-[#8E98B0] px-2 py-0.5 rounded bg-[#161926]">Last 30 Days</span>
            </div>
            <a href="/app/usage" data-link class="text-xs text-[#8E98B0] hover:text-white transition-colors flex items-center gap-1">
              Full Usage →
            </a>
          </div>
          <div id="overview-latency-chart" class="h-48 flex items-center justify-center text-[#8E98B0] text-xs">
            Loading telemetry data...
          </div>
        </div>
        
        <!-- Right: Model Usage Donut (Col 5) -->
        <div class="lg:col-span-5 rounded-xl bg-[#10121A] border border-[#1F2438] p-5 flex flex-col justify-between">
          <div class="flex justify-between items-center mb-4 select-none">
            <h3 class="font-semibold text-sm text-white">Model Share Distribution</h3>
            <a href="/app/models" data-link class="text-xs text-[#8E98B0] hover:text-white transition-colors flex items-center gap-1">
              All Models →
            </a>
          </div>
          <div id="overview-donut-chart" class="h-48 flex items-center justify-center text-[#8E98B0] text-xs">
            Loading model distribution...
          </div>
        </div>
      </div>

      <!-- G. Recent Activity Table -->
      <div class="rounded-xl bg-[#10121A] border border-[#1F2438] overflow-hidden select-text">
        <div class="h-12 border-b border-[#1F2438] px-5 flex items-center justify-between select-none">
          <div class="flex items-center gap-2">
            <span class="text-sm font-semibold text-white">Recent Gateway Traces</span>
            <span class="px-2 py-0.5 rounded-full text-[9px] font-mono bg-[#161926] text-[#8E98B0]">Real-time edge logs</span>
          </div>
          <a href="/app/requests" data-link class="text-xs text-[#8E98B0] hover:text-white transition-colors flex items-center gap-1">
            View All Traces →
          </a>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left">
            <thead>
              <tr class="border-b border-[#1F2438] bg-[#0A0C13] text-[#8E98B0] text-[10px] font-mono uppercase tracking-wider">
                <th class="px-5 py-2.5">Endpoint & Model</th>
                <th class="px-5 py-2.5">Status</th>
                <th class="px-5 py-2.5">Latency</th>
                <th class="px-5 py-2.5 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody id="overview-traces-body" class="divide-y divide-[#1F2438]/70 font-mono text-[#8E98B0]">
              <!-- Mock default trace rows while live data binds -->
              <tr class="hover:bg-[#161926]/50 transition-colors">
                <td class="px-5 py-3.5 text-white font-medium">
                  <span class="px-2 py-0.5 rounded bg-[#161926] text-[#38BDF8] text-[10px] mr-2">POST</span>
                  /v1/chat/completions
                  <span class="text-[11px] text-[#8E98B0] ml-2 font-mono">(gpt-4o)</span>
                </td>
                <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">200 OK</span></td>
                <td class="px-5 py-3.5 text-white">1.2s</td>
                <td class="px-5 py-3.5 text-[#8E98B0] text-right">Just now</td>
              </tr>
              <tr class="hover:bg-[#161926]/50 transition-colors">
                <td class="px-5 py-3.5 text-white font-medium">
                  <span class="px-2 py-0.5 rounded bg-[#161926] text-[#38BDF8] text-[10px] mr-2">POST</span>
                  /v1/chat/completions
                  <span class="text-[11px] text-[#8E98B0] ml-2 font-mono">(claude-3-5-sonnet)</span>
                </td>
                <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">200 OK</span></td>
                <td class="px-5 py-3.5 text-white">0.8s</td>
                <td class="px-5 py-3.5 text-[#8E98B0] text-right">3 mins ago</td>
              </tr>
              <tr class="hover:bg-[#161926]/50 transition-colors">
                <td class="px-5 py-3.5 text-white font-medium">
                  <span class="px-2 py-0.5 rounded bg-[#161926] text-[#818CF8] text-[10px] mr-2">POST</span>
                  /v1/embeddings
                  <span class="text-[11px] text-[#8E98B0] ml-2 font-mono">(text-embedding-3-small)</span>
                </td>
                <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">200 OK</span></td>
                <td class="px-5 py-3.5 text-white">0.3s</td>
                <td class="px-5 py-3.5 text-[#8E98B0] text-right">7 mins ago</td>
              </tr>
              <tr class="hover:bg-[#161926]/50 transition-colors">
                <td class="px-5 py-3.5 text-white font-medium">
                  <span class="px-2 py-0.5 rounded bg-[#161926] text-amber-400 text-[10px] mr-2">GET</span>
                  /v1/models
                  <span class="text-[11px] text-[#8E98B0] ml-2 font-mono">(catalogue)</span>
                </td>
                <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">200 OK</span></td>
                <td class="px-5 py-3.5 text-white">0.1s</td>
                <td class="px-5 py-3.5 text-[#8E98B0] text-right">12 mins ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;
}

export async function bindAppOverview() {
  const reqCountEl = document.getElementById("metric-total-requests");
  const tokensEl = document.getElementById("metric-total-tokens");
  const spendEl = document.getElementById("metric-total-spend");
  const latencyEl = document.getElementById("metric-avg-latency");
  const balanceEl = document.getElementById("metric-balance");
  
  const latencyChartEl = document.getElementById("overview-latency-chart");
  const donutChartEl = document.getElementById("overview-donut-chart");
  const tracesBodyEl = document.getElementById("overview-traces-body");
  const rangeIndicatorEl = document.getElementById("chart-range-indicator");

  // Filter bindings
  const rangeBtns = document.querySelectorAll(".filter-range-btn");
  const typeBtns = document.querySelectorAll(".filter-type-btn");

  const loadData = async (range = activeRange) => {
    if (rangeIndicatorEl) {
      rangeIndicatorEl.innerText = range === "7d" ? "Last 7 Days" : (range === "90d" ? "Last 90 Days" : "Last 30 Days");
    }

    // Real analytics overview from backend
    const overview = await apiService.getAnalyticsOverview(range);

    if (overview) {
      if (overview.totalRequests > 0) {
        if (reqCountEl) reqCountEl.innerText = overview.totalRequests.toLocaleString();
        if (tokensEl) {
          const tokens = overview.totalTokens;
          tokensEl.innerText = tokens >= 1000000 ? `${(tokens / 1000000).toFixed(1)}M` : (tokens >= 1000 ? `${(tokens / 1000).toFixed(1)}k` : tokens.toString());
        }
        if (spendEl) spendEl.innerText = `$${overview.totalSpend.toFixed(2)}`;
        if (latencyEl) latencyEl.innerText = `${overview.averageLatency} ms`;
      }

      // Render Charts
      if (latencyChartEl) {
        let data = overview.totalRequests > 0 && overview.latencyHistory.length > 0 
          ? overview.latencyHistory 
          : (range === "7d" ? [420, 680, 510, 890, 720, 1140, 930] : (range === "90d" ? [1800, 2400, 3100, 2900, 4200, 5100, 4800] : [120, 240, 180, 310, 220, 410, 280]));
        let labels = overview.totalRequests > 0 && overview.latencyLabels.length > 0 
          ? overview.latencyLabels 
          : (range === "7d" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : (range === "90d" ? ["Aug", "Sep", "Oct"] : ["Oct 1", "Oct 5", "Oct 10", "Oct 15", "Oct 20", "Oct 25", "Oct 31"]));
        
        latencyChartEl.innerHTML = components.renderAreaChart(data, labels, 160);
      }

      if (donutChartEl) {
        const spendData = (overview.spendByProvider && overview.spendByProvider.length > 0)
          ? overview.spendByProvider
          : [
              { name: "GPT-4o", value: 42, color: "#38BDF8" },
              { name: "Claude 3.5", value: 28, color: "#818CF8" },
              { name: "Gemini 1.5", value: 18, color: "#34D399" },
              { name: "Llama 3", value: 8, color: "#F59E0B" },
              { name: "Others", value: 4, color: "#64748B" }
            ];
        donutChartEl.innerHTML = components.renderDonutChart(spendData);
      }

      // Render Recent Request Traces if available
      if (tracesBodyEl && overview.recentRequests && overview.recentRequests.length > 0) {
        tracesBodyEl.innerHTML = overview.recentRequests.map(log => {
          const isOk = log.status >= 200 && log.status < 300 || log.status === "Success";
          const dateStr = log.timestamp ? new Date(log.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "Just now";
          return `
            <tr class="hover:bg-[#161926]/50 transition-colors">
              <td class="px-5 py-3.5 text-white font-medium">
                <span class="px-2 py-0.5 rounded bg-[#161926] text-[#38BDF8] text-[10px] mr-2">POST</span>
                /v1/chat/completions
                <span class="text-[11px] text-[#8E98B0] ml-2 font-mono">(${log.model || 'model'})</span>
              </td>
              <td class="px-5 py-3.5">
                <span class="px-2 py-0.5 rounded font-bold ${isOk ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"}">
                  ${log.status === "Success" ? "200 OK" : (log.status || "200 OK")}
                </span>
              </td>
              <td class="px-5 py-3.5 text-white">${(log.latency / 1000).toFixed(1)}s</td>
              <td class="px-5 py-3.5 text-[#8E98B0] text-right">${dateStr}</td>
            </tr>
          `;
        }).join("");
      }
    } else {
      // Fallback data
      if (latencyChartEl) {
        const fallbackData = range === "7d" ? [420, 680, 510, 890, 720, 1140, 930] : [140, 260, 200, 320, 240, 420, 280];
        const fallbackLabels = range === "7d" ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] : ["Oct 1", "Oct 5", "Oct 10", "Oct 15", "Oct 20", "Oct 25", "Oct 31"];
        latencyChartEl.innerHTML = components.renderAreaChart(fallbackData, fallbackLabels, 160);
      }
      if (donutChartEl) {
        donutChartEl.innerHTML = components.renderDonutChart([
          { name: "GPT-4o", value: 42, color: "#38BDF8" },
          { name: "Claude 3.5", value: 28, color: "#818CF8" },
          { name: "Gemini 1.5", value: 18, color: "#34D399" },
          { name: "Llama 3", value: 8, color: "#F59E0B" },
          { name: "Others", value: 4, color: "#64748B" }
        ]);
      }
    }
  };

  // Attach Range Filter Click Listeners
  rangeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const range = btn.dataset.range;
      if (!range) return;
      activeRange = range;
      rangeBtns.forEach(b => {
        b.className = "filter-range-btn px-2.5 py-1 rounded-md font-mono text-[11px] transition-all text-[#8E98B0] hover:text-white hover:bg-[#161926]";
      });
      btn.className = "filter-range-btn px-2.5 py-1 rounded-md font-mono text-[11px] transition-all bg-[#161926] text-white border border-[#1F2438] font-bold";
      loadData(range);
    });
  });

  // Attach Usage Type Filter Click Listeners
  typeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;
      if (!type) return;
      activeUsageType = type;
      typeBtns.forEach(b => {
        b.className = "filter-type-btn px-3 py-1.5 rounded-lg font-medium transition-all text-[#8E98B0] hover:text-white hover:bg-[#161926]/60";
      });
      btn.className = "filter-type-btn px-3 py-1.5 rounded-lg font-medium transition-all bg-[#161926] text-white border border-[#1F2438]";
      loadData(activeRange);
    });
  });

  // Load real workspace API keys
  const loadWorkspaceKeys = async () => {
    const wsKeysContainer = document.getElementById("overview-keys-container");
    const wsKeyCountEl = document.getElementById("overview-ws-key-count");
    const activeWsNameEl = document.getElementById("overview-active-ws-title");
    const activeWsScopeEl = document.getElementById("overview-active-ws-scope");
    
    if (!wsKeysContainer) return;

    const activeWsName = apiService.getActiveWorkspace() || "Default Workspace";
    const activeWsId = apiService.getActiveWorkspaceId();

    if (activeWsNameEl) activeWsNameEl.innerText = activeWsName;
    if (activeWsScopeEl) activeWsScopeEl.innerHTML = `Active Scope: <span class="text-white font-medium">${activeWsName}</span>`;

    try {
      const keys = await apiService.getApiKeys(activeWsId);
      if (wsKeyCountEl) {
        wsKeyCountEl.innerText = `${keys ? keys.length : 0} ${keys && keys.length === 1 ? 'key' : 'keys'}`;
      }

      if (!keys || keys.length === 0) {
        wsKeysContainer.innerHTML = `
          <div class="p-8 text-center flex flex-col items-center justify-center gap-3">
            <div class="w-12 h-12 rounded-xl bg-[#161926] border border-[#1F2438] flex items-center justify-center text-[#38BDF8]">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
            </div>
            <div>
              <h4 class="text-white font-semibold text-sm">No API keys yet</h4>
              <p class="text-xs text-[#8E98B0] mt-1 max-w-sm font-medium">Create an API key to connect your application to UniLLM.</p>
            </div>
            <a href="/app/api-keys?action=create" data-link class="mt-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-200 text-[#07080B] text-xs font-semibold transition-all inline-flex items-center gap-2 shadow-sm font-sans">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg>
              <span>Create API Key</span>
            </a>
          </div>
        `;
      } else {
        wsKeysContainer.innerHTML = `
          <div class="overflow-x-auto">
            <table class="w-full text-xs text-left">
              <thead>
                <tr class="border-b border-[#1F2438] bg-[#0A0C13] text-[#8E98B0] text-[10px] font-mono uppercase tracking-wider">
                  <th class="px-5 py-2.5">Name</th>
                  <th class="px-5 py-2.5">Key Prefix</th>
                  <th class="px-5 py-2.5">Workspace</th>
                  <th class="px-5 py-2.5">Status</th>
                  <th class="px-5 py-2.5">Created</th>
                  <th class="px-5 py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#1F2438]/70 font-mono text-[#8E98B0]">
                ${keys.slice(0, 3).map(k => `
                  <tr class="hover:bg-[#161926]/40 transition-colors">
                    <td class="px-5 py-3 text-white font-sans font-semibold">${k.name}</td>
                    <td class="px-5 py-3">
                      <code class="text-[11px] text-[#38BDF8] bg-[#07080B] px-2 py-0.5 rounded border border-[#1F2438]">${k.keyPrefix || k.key_prefix || 'sk-...'}</code>
                    </td>
                    <td class="px-5 py-3 font-sans text-xs">
                      <span class="px-2 py-0.5 rounded bg-[#161926] text-[#8E98B0] border border-[#1F2438]">${k.workspaceName || activeWsName}</span>
                    </td>
                    <td class="px-5 py-3">
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${k.status === 'revoked' ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}">
                        ${k.status === 'revoked' ? 'Revoked' : 'Active'}
                      </span>
                    </td>
                    <td class="px-5 py-3 font-sans text-xs text-[#8E98B0]">${k.createdAt ? new Date(k.createdAt).toLocaleDateString() : 'Just now'}</td>
                    <td class="px-5 py-3 text-right font-sans">
                      <a href="/app/api-keys" data-link class="text-xs text-[#38BDF8] hover:text-[#0EA5E9] font-medium">Manage →</a>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
          ${keys.length > 3 ? `
            <div class="px-5 py-2.5 bg-[#0A0C13] border-t border-[#1F2438] flex items-center justify-between text-xs text-[#8E98B0]">
              <span>Showing 3 of ${keys.length} keys</span>
              <a href="/app/api-keys" data-link class="text-[#38BDF8] hover:underline">View all keys →</a>
            </div>
          ` : ''}
        `;
      }
    } catch (e) {
      if (wsKeysContainer) {
        wsKeysContainer.innerHTML = `
          <div class="p-6 text-center text-xs text-rose-400">
            Failed to load workspace API keys. Please refresh or verify authentication.
          </div>
        `;
      }
    }
  };

  // Initial load
  await loadData(activeRange);
  await loadWorkspaceKeys();
}

export default {
  appOverview,
  bindAppOverview
};
