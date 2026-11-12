// APP PAGE: overview (Master Redesign for Authenticated Dashboard)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=11";
import { router } from "../../router.js?v=2";

let activeRange = '30d';
let activeUsageType = 'all';

export function appOverview() {
  const currentUser = apiService.getCurrentUser() || { name: "Developer", org: "Personal Space" };
  const orgName = currentUser.org || "Personal Space";
  const activeWorkspaceName = apiService.getActiveWorkspace() || "Default Workspace";
  const credits = apiService.getCredits() || { remaining: 140.15 };
  const balance = typeof credits.remaining === "number" ? credits.remaining : 140.15;

  return `
    <div id="overview-container" class="flex flex-col gap-6 animate-fade-in-up font-sans text-[#F2EFE8] select-none">
      
      <!-- C. Dashboard Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[rgba(242,239,232,0.08)]">
        <div class="flex flex-col gap-1.5">
          <div class="flex items-center gap-3">
            <h1 class="text-xl md:text-2xl font-bold text-[#F2EFE8] tracking-tight">Dashboard</h1>
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#42D6A4]/10 text-[#42D6A4] border border-[#42D6A4]/20">
              <span class="w-1.5 h-1.5 rounded-full bg-[#42D6A4]"></span> Live Edge 99.99%
            </span>
          </div>
          <div class="flex items-center gap-2 text-xs text-[#A6A39C]">
            <span id="overview-active-ws-title" class="text-[#F2EFE8] font-medium">${activeWorkspaceName}</span>
            <span class="text-[rgba(242,239,232,0.25)]">•</span>
            <span class="font-mono text-[#A6A39C]">${orgName}</span>
          </div>
        </div>
        
        <!-- Header Actions: Create API Key & Top Up Credits -->
        <div class="flex items-center gap-2.5">
          <a
            href="/app/billing"
            data-link
            id="overview-topup-btn"
            class="px-3.5 py-2 rounded-lg bg-[#141615] hover:bg-[#1A1D1B] border border-[rgba(242,239,232,0.12)] hover:border-[rgba(242,239,232,0.22)] text-xs font-semibold text-[#F2EFE8] transition-all flex items-center gap-2"
          >
            <svg class="w-3.5 h-3.5 text-[#A6A39C]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path></svg>
            Top Up Credits
          </a>
          <a
            href="/app/api-keys?action=create"
            data-link
            id="overview-create-key-btn"
            class="px-4 py-2 rounded-lg bg-[#F2EFE8] hover:bg-white text-[#0B0C0D] text-xs font-semibold transition-all flex items-center gap-2 shadow-xs"
          >
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg>
            Create API Key
          </a>
        </div>
      </div>

      <!-- D. Overview Filters Bar -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#141615] border border-[rgba(242,239,232,0.08)] p-2 rounded-xl text-xs">
        <!-- Usage Type Filter Tabs -->
        <div class="flex items-center gap-1" id="usage-type-filters">
          <button data-type="all" class="filter-type-btn px-3 py-1.5 rounded-lg font-medium transition-all bg-[#1A1D1B] text-[#F2EFE8] border border-[rgba(242,239,232,0.14)] font-semibold">
            All Requests
          </button>
          <button data-type="chat" class="filter-type-btn px-3 py-1.5 rounded-lg font-medium transition-all text-[#A6A39C] hover:text-[#F2EFE8] hover:bg-[#1A1D1B]/50 border border-transparent">
            Chat Completions
          </button>
          <button data-type="embeddings" class="filter-type-btn px-3 py-1.5 rounded-lg font-medium transition-all text-[#A6A39C] hover:text-[#F2EFE8] hover:bg-[#1A1D1B]/50 border border-transparent">
            Embeddings
          </button>
        </div>

        <!-- Date Range Filter Tabs -->
        <div class="flex items-center gap-1 self-end sm:self-auto" id="date-range-filters">
          <span class="text-[11px] text-[#A6A39C] mr-1.5">Range:</span>
          <button data-range="7d" class="filter-range-btn px-2.5 py-1 rounded-md font-mono text-[11px] transition-all text-[#A6A39C] hover:text-[#F2EFE8] hover:bg-[#1A1D1B] border border-transparent">
            7d
          </button>
          <button data-range="30d" class="filter-range-btn px-2.5 py-1 rounded-md font-mono text-[11px] transition-all bg-[#1A1D1B] text-[#F2EFE8] border border-[rgba(242,239,232,0.14)] font-semibold">
            30d
          </button>
          <button data-range="90d" class="filter-range-btn px-2.5 py-1 rounded-md font-mono text-[11px] transition-all text-[#A6A39C] hover:text-[#F2EFE8] hover:bg-[#1A1D1B] border border-transparent">
            90d
          </button>
        </div>
      </div>
      
      <!-- E. 5 Key Metrics Cards Row -->
      <div id="overview-metrics-row" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        
        <!-- Metric 1: Available Balance -->
        <div class="bg-[#141615] border border-[rgba(242,239,232,0.08)] hover:border-[rgba(242,239,232,0.18)] rounded-xl p-5 flex flex-col justify-between transition-all duration-200">
          <div class="flex items-center justify-between">
            <span class="text-xs text-[#A6A39C] font-medium">Available Balance</span>
            <span class="w-1.5 h-1.5 rounded-full bg-[#42D6A4]"></span>
          </div>
          <div class="mt-4">
            <span id="metric-balance" class="text-2xl font-bold font-mono text-[#F2EFE8] tracking-tight">$${balance.toFixed(2)}</span>
            <p class="text-[11px] text-[#A6A39C]/80 mt-1 font-normal">Auto-recharge enabled</p>
          </div>
        </div>

        <!-- Metric 2: Total Spend -->
        <div class="bg-[#141615] border border-[rgba(242,239,232,0.08)] hover:border-[rgba(242,239,232,0.18)] rounded-xl p-5 flex flex-col justify-between transition-all duration-200">
          <div class="flex items-center justify-between">
            <span class="text-xs text-[#A6A39C] font-medium">Total Spend</span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#42D6A4]/10 text-[#42D6A4] border border-[#42D6A4]/20 font-medium">Active</span>
          </div>
          <div class="mt-4">
            <span id="metric-total-spend" class="text-2xl font-bold font-mono text-[#F2EFE8] tracking-tight">$12.48</span>
            <p class="text-[11px] text-[#A6A39C]/80 mt-1 font-normal">Direct provider pass-through</p>
          </div>
        </div>
        
        <!-- Metric 3: Request Volume -->
        <div class="bg-[#141615] border border-[rgba(242,239,232,0.08)] hover:border-[rgba(242,239,232,0.18)] rounded-xl p-5 flex flex-col justify-between transition-all duration-200">
          <div class="flex items-center justify-between">
            <span class="text-xs text-[#A6A39C] font-medium">Request Volume</span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1A1D1B] text-[#A6A39C] border border-[rgba(242,239,232,0.1)] font-medium">99.98% OK</span>
          </div>
          <div class="mt-4">
            <span id="metric-total-requests" class="text-2xl font-bold font-mono text-[#F2EFE8] tracking-tight">12,482</span>
            <p class="text-[11px] text-[#A6A39C]/80 mt-1 font-normal">Total API calls processed</p>
          </div>
        </div>
        
        <!-- Metric 4: Total Tokens -->
        <div class="bg-[#141615] border border-[rgba(242,239,232,0.08)] hover:border-[rgba(242,239,232,0.18)] rounded-xl p-5 flex flex-col justify-between transition-all duration-200">
          <div class="flex items-center justify-between">
            <span class="text-xs text-[#A6A39C] font-medium">Total Tokens</span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1A1D1B] text-[#A6A39C] border border-[rgba(242,239,232,0.1)] font-medium">In + Out</span>
          </div>
          <div class="mt-4">
            <span id="metric-total-tokens" class="text-2xl font-bold font-mono text-[#F2EFE8] tracking-tight">8.4M</span>
            <p class="text-[11px] text-[#A6A39C]/80 mt-1 font-normal">Token volume routed</p>
          </div>
        </div>

        <!-- Metric 5: Avg Latency -->
        <div class="bg-[#141615] border border-[rgba(242,239,232,0.08)] hover:border-[rgba(242,239,232,0.18)] rounded-xl p-5 flex flex-col justify-between transition-all duration-200">
          <div class="flex items-center justify-between">
            <span class="text-xs text-[#A6A39C] font-medium">Avg. Latency</span>
            <span class="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#42D6A4]/10 text-[#42D6A4] border border-[#42D6A4]/20 font-medium">P95</span>
          </div>
          <div class="mt-4">
            <span id="metric-avg-latency" class="text-2xl font-bold font-mono text-[#F2EFE8] tracking-tight">280 ms</span>
            <p class="text-[11px] text-[#A6A39C]/80 mt-1 font-normal">Global edge routing</p>
          </div>
        </div>
      </div>

      <!-- H. Quick Actions Bar -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <a href="/app/api-keys?action=create" data-link class="bg-[#141615] border border-[rgba(242,239,232,0.08)] hover:border-[rgba(242,239,232,0.2)] hover:bg-[#1A1D1B] p-3.5 rounded-xl flex items-center gap-3 group transition-all">
          <div class="w-8 h-8 rounded-lg bg-[#1A1D1B] border border-[rgba(242,239,232,0.1)] text-[#F2EFE8] flex items-center justify-center shrink-0 group-hover:text-[#FF7849] transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
          </div>
          <div class="flex flex-col truncate">
            <span class="text-xs font-semibold text-[#F2EFE8] group-hover:text-[#FF7849] transition-colors truncate">New API Key</span>
            <span class="text-[11px] text-[#A6A39C] truncate">Generate secret token</span>
          </div>
        </a>

        <a href="/app/playground" data-link class="bg-[#141615] border border-[rgba(242,239,232,0.08)] hover:border-[rgba(242,239,232,0.2)] hover:bg-[#1A1D1B] p-3.5 rounded-xl flex items-center gap-3 group transition-all">
          <div class="w-8 h-8 rounded-lg bg-[#1A1D1B] border border-[rgba(242,239,232,0.1)] text-[#F2EFE8] flex items-center justify-center shrink-0 group-hover:text-[#FF7849] transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <div class="flex flex-col truncate">
            <span class="text-xs font-semibold text-[#F2EFE8] group-hover:text-[#FF7849] transition-colors truncate">Open Playground</span>
            <span class="text-[11px] text-[#A6A39C] truncate">Test model inference</span>
          </div>
        </a>

        <a href="/app/models" data-link class="bg-[#141615] border border-[rgba(242,239,232,0.08)] hover:border-[rgba(242,239,232,0.2)] hover:bg-[#1A1D1B] p-3.5 rounded-xl flex items-center gap-3 group transition-all">
          <div class="w-8 h-8 rounded-lg bg-[#1A1D1B] border border-[rgba(242,239,232,0.1)] text-[#F2EFE8] flex items-center justify-center shrink-0 group-hover:text-[#FF7849] transition-colors">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"></path></svg>
          </div>
          <div class="flex flex-col truncate">
            <span class="text-xs font-semibold text-[#F2EFE8] group-hover:text-[#FF7849] transition-colors truncate">Explore Models</span>
            <span class="text-[11px] text-[#A6A39C] truncate">Latency & pricing specs</span>
          </div>
        </a>

        <a href="/docs" data-link class="bg-[#141615] border border-[rgba(242,239,232,0.08)] hover:border-[rgba(242,239,232,0.2)] hover:bg-[#1A1D1B] p-3.5 rounded-xl flex items-center gap-3 group transition-all">
          <div class="w-8 h-8 rounded-lg bg-[#1A1D1B] border border-[rgba(242,239,232,0.1)] text-[#42D6A4] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
          </div>
          <div class="flex flex-col truncate">
            <span class="text-xs font-semibold text-[#F2EFE8] group-hover:text-[#42D6A4] transition-colors truncate">API Reference</span>
            <span class="text-[11px] text-[#A6A39C] truncate">Documentation & SDKs</span>
          </div>
        </a>
      </div>

      <!-- Dedicated Workspace API Keys Section -->
      <div class="bg-[#141615] border border-[rgba(242,239,232,0.08)] rounded-xl overflow-hidden shadow-xs select-text">
        <div class="h-14 border-b border-[rgba(242,239,232,0.08)] px-5 sm:px-6 flex items-center justify-between select-none">
          <div class="flex items-center gap-3">
            <span class="text-sm font-semibold text-[#F2EFE8]">Workspace API Keys</span>
            <span id="overview-ws-key-count" class="px-2 py-0.5 rounded text-[11px] font-mono bg-[#1A1D1B] text-[#A6A39C] border border-[rgba(242,239,232,0.1)]">0 keys</span>
            <span class="text-xs text-[rgba(242,239,232,0.2)] hidden sm:inline">•</span>
            <span id="overview-active-ws-scope" class="text-xs text-[#A6A39C] hidden sm:inline">Active Scope: <span class="text-[#F2EFE8] font-medium">${activeWorkspaceName}</span></span>
          </div>
          <div class="flex items-center gap-3">
            <a href="/app/api-keys" data-link class="text-xs text-[#A6A39C] hover:text-[#F2EFE8] transition-colors hidden sm:flex items-center gap-1 font-medium">
              All Keys →
            </a>
            <a
              href="/app/api-keys?action=create"
              data-link
              class="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 bg-[#F2EFE8] hover:bg-white text-[#0B0C0D] shadow-xs"
            >
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg>
              <span>Create API Key</span>
            </a>
          </div>
        </div>

        <div id="overview-keys-container">
          <div class="p-8 text-center flex items-center justify-center gap-2 text-xs text-[#A6A39C]">
            <svg class="animate-spin h-4 w-4 text-[#A6A39C]" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
            <span>Loading workspace credentials...</span>
          </div>
        </div>
      </div>

      <!-- F. Main Analytics Area: Charts Row -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- Left: Request Volume / Spend Over Time (Col 7) -->
        <div class="lg:col-span-7 bg-[#141615] border border-[rgba(242,239,232,0.08)] rounded-xl p-5 flex flex-col justify-between">
          <div class="flex justify-between items-center mb-4 select-none">
            <div class="flex items-center gap-2.5">
              <div class="w-2 h-2 rounded-full bg-[#42D6A4] shadow-[0_0_8px_rgba(66,214,164,0.4)]"></div>
              <h3 class="font-semibold text-sm text-[#F2EFE8]">Gateway Request Volume</h3>
              <span id="chart-range-indicator" class="text-[10px] font-mono text-[#A6A39C] px-2 py-0.5 rounded bg-[#1A1D1B] border border-[rgba(242,239,232,0.08)]">Last 30 Days</span>
            </div>
            <a href="/app/usage" data-link class="text-xs text-[#A6A39C] hover:text-[#F2EFE8] transition-colors flex items-center gap-1 font-medium">
              Full Usage →
            </a>
          </div>
          <div id="overview-latency-chart" class="h-48 flex items-center justify-center text-[#A6A39C] text-xs">
            Loading telemetry data...
          </div>
        </div>
        
        <!-- Right: Model Usage Donut (Col 5) -->
        <div class="lg:col-span-5 bg-[#141615] border border-[rgba(242,239,232,0.08)] rounded-xl p-5 flex flex-col justify-between">
          <div class="flex justify-between items-center mb-4 select-none">
            <div class="flex items-center gap-2.5">
              <div class="w-2 h-2 rounded-full bg-[#FF7849] shadow-[0_0_8px_rgba(255,120,73,0.4)]"></div>
              <h3 class="font-semibold text-sm text-[#F2EFE8]">Model Share Distribution</h3>
            </div>
            <a href="/app/models" data-link class="text-xs text-[#A6A39C] hover:text-[#F2EFE8] transition-colors flex items-center gap-1 font-medium">
              All Models →
            </a>
          </div>
          <div id="overview-donut-chart" class="h-48 flex items-center justify-center text-[#A6A39C] text-xs">
            Loading model distribution...
          </div>
        </div>
      </div>

      <!-- G. Recent Activity Table -->
      <div class="bg-[#141615] border border-[rgba(242,239,232,0.08)] rounded-xl overflow-hidden shadow-xs select-text">
        <div class="h-12 border-b border-[rgba(242,239,232,0.08)] px-5 flex items-center justify-between select-none">
          <div class="flex items-center gap-2.5">
            <span class="text-sm font-semibold text-[#F2EFE8]">Recent Gateway Traces</span>
            <span class="px-2 py-0.5 rounded text-[10px] font-mono bg-[#1A1D1B] text-[#A6A39C] border border-[rgba(242,239,232,0.08)]">Edge logs</span>
          </div>
          <a href="/app/requests" data-link class="text-xs text-[#A6A39C] hover:text-[#F2EFE8] transition-colors flex items-center gap-1 font-medium">
            View All Traces →
          </a>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-xs text-left">
            <thead>
              <tr class="border-b border-[rgba(242,239,232,0.08)] bg-[#0B0C0D] text-[#A6A39C] text-[10px] font-mono uppercase tracking-wider">
                <th class="px-5 py-2.5">Endpoint & Model</th>
                <th class="px-5 py-2.5">Status</th>
                <th class="px-5 py-2.5">Latency</th>
                <th class="px-5 py-2.5 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody id="overview-traces-body" class="divide-y divide-[rgba(242,239,232,0.06)] font-mono text-[#A6A39C]">
              <!-- Mock default trace rows while live data binds -->
              <tr class="hover:bg-[#1A1D1B]/40 transition-colors">
                <td class="px-5 py-3.5 text-[#F2EFE8] font-medium">
                  <span class="px-1.5 py-0.5 rounded bg-[#1A1D1B] text-[#A6A39C] text-[10px] mr-2 border border-[rgba(242,239,232,0.08)]">POST</span>
                  /v1/chat/completions
                  <span class="text-[11px] text-[#A6A39C] ml-2 font-mono">(gpt-4o)</span>
                </td>
                <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#42D6A4]/10 text-[#42D6A4] border border-[#42D6A4]/20">200 OK</span></td>
                <td class="px-5 py-3.5 text-[#F2EFE8]">1.2s</td>
                <td class="px-5 py-3.5 text-[#A6A39C] text-right">Just now</td>
              </tr>
              <tr class="hover:bg-[#1A1D1B]/40 transition-colors">
                <td class="px-5 py-3.5 text-[#F2EFE8] font-medium">
                  <span class="px-1.5 py-0.5 rounded bg-[#1A1D1B] text-[#A6A39C] text-[10px] mr-2 border border-[rgba(242,239,232,0.08)]">POST</span>
                  /v1/chat/completions
                  <span class="text-[11px] text-[#A6A39C] ml-2 font-mono">(claude-3-5-sonnet)</span>
                </td>
                <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#42D6A4]/10 text-[#42D6A4] border border-[#42D6A4]/20">200 OK</span></td>
                <td class="px-5 py-3.5 text-[#F2EFE8]">0.8s</td>
                <td class="px-5 py-3.5 text-[#A6A39C] text-right">3 mins ago</td>
              </tr>
              <tr class="hover:bg-[#1A1D1B]/40 transition-colors">
                <td class="px-5 py-3.5 text-[#F2EFE8] font-medium">
                  <span class="px-1.5 py-0.5 rounded bg-[#1A1D1B] text-[#A6A39C] text-[10px] mr-2 border border-[rgba(242,239,232,0.08)]">POST</span>
                  /v1/embeddings
                  <span class="text-[11px] text-[#A6A39C] ml-2 font-mono">(text-embedding-3-small)</span>
                </td>
                <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#42D6A4]/10 text-[#42D6A4] border border-[#42D6A4]/20">200 OK</span></td>
                <td class="px-5 py-3.5 text-[#F2EFE8]">0.3s</td>
                <td class="px-5 py-3.5 text-[#A6A39C] text-right">7 mins ago</td>
              </tr>
              <tr class="hover:bg-[#1A1D1B]/40 transition-colors">
                <td class="px-5 py-3.5 text-[#F2EFE8] font-medium">
                  <span class="px-1.5 py-0.5 rounded bg-[#1A1D1B] text-[#A6A39C] text-[10px] mr-2 border border-[rgba(242,239,232,0.08)]">GET</span>
                  /v1/models
                  <span class="text-[11px] text-[#A6A39C] ml-2 font-mono">(catalogue)</span>
                </td>
                <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#42D6A4]/10 text-[#42D6A4] border border-[#42D6A4]/20">200 OK</span></td>
                <td class="px-5 py-3.5 text-[#F2EFE8]">0.1s</td>
                <td class="px-5 py-3.5 text-[#A6A39C] text-right">12 mins ago</td>
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
              { name: "GPT-4o", value: 42, color: "#42D6A4" },
              { name: "Claude 3.5", value: 28, color: "#FF7849" },
              { name: "Gemini 1.5", value: 18, color: "#38BDF8" },
              { name: "Llama 3", value: 8, color: "#A78BFA" },
              { name: "Others", value: 4, color: "#A6A39C" }
            ];
        donutChartEl.innerHTML = components.renderDonutChart(spendData);
      }

      // Render Recent Request Traces if available
      if (tracesBodyEl && overview.recentRequests && overview.recentRequests.length > 0) {
        tracesBodyEl.innerHTML = overview.recentRequests.map(log => {
          const isOk = log.status >= 200 && log.status < 300 || log.status === "Success";
          const dateStr = log.timestamp ? new Date(log.timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }) : "Just now";
          return `
            <tr class="hover:bg-[#1A1D1B]/40 transition-colors">
              <td class="px-5 py-3.5 text-[#F2EFE8] font-medium">
                <span class="px-1.5 py-0.5 rounded bg-[#1A1D1B] text-[#A6A39C] text-[10px] mr-2 border border-[rgba(242,239,232,0.08)]">POST</span>
                /v1/chat/completions
                <span class="text-[11px] text-[#A6A39C] ml-2 font-mono">(${log.model || 'model'})</span>
              </td>
              <td class="px-5 py-3.5">
                <span class="px-2 py-0.5 rounded-full font-mono text-[10px] font-medium ${isOk ? "bg-[#42D6A4]/10 text-[#42D6A4] border border-[#42D6A4]/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"}">
                  ${log.status === "Success" ? "200 OK" : (log.status || "200 OK")}
                </span>
              </td>
              <td class="px-5 py-3.5 text-[#F2EFE8]">${(log.latency / 1000).toFixed(1)}s</td>
              <td class="px-5 py-3.5 text-[#A6A39C] text-right">${dateStr}</td>
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
          { name: "GPT-4o", value: 42, color: "#42D6A4" },
          { name: "Claude 3.5", value: 28, color: "#FF7849" },
          { name: "Gemini 1.5", value: 18, color: "#38BDF8" },
          { name: "Llama 3", value: 8, color: "#A78BFA" },
          { name: "Others", value: 4, color: "#A6A39C" }
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
        b.className = "filter-range-btn px-2.5 py-1 rounded-md font-mono text-[11px] transition-all text-[#A6A39C] hover:text-[#F2EFE8] hover:bg-[#1A1D1B] border border-transparent";
      });
      btn.className = "filter-range-btn px-2.5 py-1 rounded-md font-mono text-[11px] transition-all bg-[#1A1D1B] text-[#F2EFE8] border border-[rgba(242,239,232,0.14)] font-semibold";
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
        b.className = "filter-type-btn px-3 py-1.5 rounded-lg font-medium transition-all text-[#A6A39C] hover:text-[#F2EFE8] hover:bg-[#1A1D1B]/50 border border-transparent";
      });
      btn.className = "filter-type-btn px-3 py-1.5 rounded-lg font-medium transition-all bg-[#1A1D1B] text-[#F2EFE8] border border-[rgba(242,239,232,0.14)] font-semibold";
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
    if (activeWsScopeEl) activeWsScopeEl.innerHTML = `Active Scope: <span class="text-[#F2EFE8] font-medium">${activeWsName}</span>`;

    try {
      const keys = await apiService.getApiKeys(activeWsId);
      if (wsKeyCountEl) {
        wsKeyCountEl.innerText = `${keys ? keys.length : 0} ${keys && keys.length === 1 ? 'key' : 'keys'}`;
      }

      if (!keys || keys.length === 0) {
        wsKeysContainer.innerHTML = `
          <div class="p-8 text-center flex flex-col items-center justify-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-[#1A1D1B] border border-[rgba(242,239,232,0.1)] flex items-center justify-center text-[#A6A39C]">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
            </div>
            <div>
              <h4 class="text-[#F2EFE8] font-semibold text-sm">No API keys yet</h4>
              <p class="text-xs text-[#A6A39C] mt-1 max-w-sm font-normal">Create an API key to connect your application to UniLLM.</p>
            </div>
            <a href="/app/api-keys?action=create" data-link class="mt-2 px-3.5 py-1.5 rounded-lg bg-[#F2EFE8] hover:bg-white text-[#0B0C0D] text-xs font-semibold transition-all inline-flex items-center gap-2 shadow-xs">
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
                <tr class="border-b border-[rgba(242,239,232,0.08)] bg-[#0B0C0D] text-[#A6A39C] text-[10px] font-mono uppercase tracking-wider">
                  <th class="px-5 py-2.5">Name</th>
                  <th class="px-5 py-2.5">Key Prefix</th>
                  <th class="px-5 py-2.5">Workspace</th>
                  <th class="px-5 py-2.5">Status</th>
                  <th class="px-5 py-2.5">Created</th>
                  <th class="px-5 py-2.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[rgba(242,239,232,0.06)] font-mono text-[#A6A39C]">
                ${keys.slice(0, 3).map(k => `
                  <tr class="hover:bg-[#1A1D1B]/40 transition-colors">
                    <td class="px-5 py-3 text-[#F2EFE8] font-sans font-medium">${k.name}</td>
                    <td class="px-5 py-3">
                      <div class="flex items-center gap-1.5">
                        <code class="text-[11px] text-[#F2EFE8] bg-[#0B0C0D] px-2 py-0.5 rounded border border-[rgba(242,239,232,0.1)]">${k.keyPrefix || k.key_prefix || 'sk-...'}</code>
                        <button class="overview-copy-key-btn px-2 py-0.5 text-[10px] font-sans text-neutral-300 hover:text-white rounded bg-[#1A1D1B] hover:bg-[#252926] border border-[rgba(242,239,232,0.1)] cursor-pointer" data-key="${k.keySecret || k.keyPrefix || ''}" title="Copy API Key">Copy</button>
                      </div>
                    </td>
                    <td class="px-5 py-3 font-sans text-xs">
                      <span class="px-2 py-0.5 rounded bg-[#1A1D1B] text-[#A6A39C] border border-[rgba(242,239,232,0.08)]">${k.workspaceName || activeWsName}</span>
                    </td>
                    <td class="px-5 py-3">
                      <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium ${k.status === 'revoked' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' : 'bg-[#42D6A4]/10 text-[#42D6A4] border border-[#42D6A4]/20'}">
                        ${k.status === 'revoked' ? 'Revoked' : 'Active'}
                      </span>
                    </td>
                    <td class="px-5 py-3 font-sans text-xs text-[#A6A39C]">${k.createdAt ? new Date(k.createdAt).toLocaleDateString() : 'Just now'}</td>
                    <td class="px-5 py-3 text-right font-sans">
                      <a href="/app/api-keys" data-link class="text-xs text-[#A6A39C] hover:text-[#F2EFE8] font-medium">Manage →</a>
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
          ${keys.length > 3 ? `
            <div class="px-5 py-2.5 bg-[#0B0C0D] border-t border-[rgba(242,239,232,0.08)] flex items-center justify-between text-xs text-[#A6A39C]">
              <span>Showing 3 of ${keys.length} keys</span>
              <a href="/app/api-keys" data-link class="text-[#F2EFE8] hover:underline font-medium">View all keys →</a>
            </div>
          ` : ''}
        `;

        wsKeysContainer.querySelectorAll(".overview-copy-key-btn").forEach(btn => {
          btn.addEventListener("click", () => {
            const key = btn.getAttribute("data-key");
            if (key) {
              navigator.clipboard.writeText(key).then(() => {
                btn.innerText = "Copied! ✓";
                components.renderToast("success", "API Key copied to clipboard! ✓");
                setTimeout(() => {
                  btn.innerText = "Copy";
                }, 2000);
              });
            }
          });
        });
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
