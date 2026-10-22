// PUBLIC PAGE: statusPage
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function statusPage() {
  const providers = [
    { name: "OpenAI Gateway Endpoint", provider: "OpenAI", status: "Operational", uptime: "99.99%", latency: "280ms", regions: "Global", icon: "🟢" },
    { name: "Anthropic Claude Proxy", provider: "Anthropic", status: "Operational", uptime: "99.98%", latency: "340ms", regions: "Global", icon: "🟢" },
    { name: "Google Gemini Flash & Pro", provider: "Google", status: "Operational", uptime: "99.99%", latency: "210ms", regions: "Global", icon: "🟢" },
    { name: "Groq High-Speed LPU", provider: "Groq", status: "Operational", uptime: "100.00%", latency: "42ms", regions: "US, EU", icon: "🟢" },
    { name: "Mistral Large & Embeddings", provider: "Mistral", status: "Operational", uptime: "99.97%", latency: "310ms", regions: "EU, US", icon: "🟢" },
    { name: "Cohere Rerank & Embed", provider: "Cohere", status: "Operational", uptime: "99.99%", latency: "190ms", regions: "Global", icon: "🟢" }
  ];

  const edgePoPs = [
    { location: "US-East (N. Virginia)", ping: "12ms", status: "Healthy" },
    { location: "US-West (Oregon)", ping: "14ms", status: "Healthy" },
    { location: "EU-Central (Frankfurt)", ping: "16ms", status: "Healthy" },
    { location: "EU-West (London)", ping: "15ms", status: "Healthy" },
    { location: "AP-East (Tokyo)", ping: "22ms", status: "Healthy" },
    { location: "AP-South (Singapore)", ping: "24ms", status: "Healthy" }
  ];

  return `
    <div class="relative overflow-hidden w-full font-sans">
      <div class="absolute top-[5%] left-[5%] w-[550px] h-[550px] rounded-full blur-[160px] ambient-glow-2 -z-10"></div>
      <div class="border-x border-brand-border/60 max-w-7xl mx-auto bg-white/30 backdrop-blur-[1px]">
        
        <!-- Header Banner -->
        <section class="px-6 lg:px-12 py-16 md:py-20 flex flex-col gap-6 animate-fade-in-up border-b border-brand-border/80">
          <div class="flex items-center gap-3">
            <span class="flex h-3 w-3 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span class="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
              All Gateway Systems 100% Operational
            </span>
          </div>

          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
            <div class="flex flex-col gap-2">
              <h1 class="font-display font-black text-4xl sm:text-5xl text-brand-text uppercase tracking-tight">System Status & Latency</h1>
              <p class="text-xs text-brand-muted font-semibold max-w-xl">Live health checks, upstream model provider telemetry, and real-time Anycast edge network responsiveness.</p>
            </div>
            <div class="p-4 bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col gap-1 text-right">
              <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Global 90-Day Uptime</span>
              <span class="text-2xl font-display font-black text-emerald-600 font-mono">99.998%</span>
            </div>
          </div>
        </section>

        <!-- Provider Status List -->
        <section class="px-6 lg:px-12 py-12 flex flex-col gap-6 border-b border-brand-border/80">
          <div class="flex items-center justify-between">
            <h2 class="font-display font-black text-xl text-slate-900 uppercase">Provider Connectors</h2>
            <span class="text-[11px] font-mono text-slate-400 font-bold">Updated every 15s</span>
          </div>

          <div class="border border-slate-200 bg-white rounded-2xl overflow-hidden shadow-xs divide-y divide-slate-100">
            ${providers.map(p => `
              <div class="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50/60 transition-colors">
                <div class="flex items-center gap-3.5">
                  <span class="w-3 h-3 rounded-full bg-emerald-500 shrink-0"></span>
                  <div class="flex flex-col">
                    <span class="font-bold text-sm text-slate-900">${p.name}</span>
                    <span class="text-[10px] text-slate-400 font-semibold font-mono">Regions: ${p.regions}</span>
                  </div>
                </div>

                <div class="flex items-center gap-6 text-xs font-mono">
                  <div class="flex flex-col text-right">
                    <span class="text-[10px] text-slate-400 font-bold uppercase">Avg Latency</span>
                    <span class="font-bold text-slate-700">${p.latency}</span>
                  </div>
                  <div class="flex flex-col text-right">
                    <span class="text-[10px] text-slate-400 font-bold uppercase">90D Uptime</span>
                    <span class="font-bold text-emerald-700">${p.uptime}</span>
                  </div>
                  <span class="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg text-[10px] font-bold uppercase">
                    ${p.status}
                  </span>
                </div>
              </div>
            `).join("")}
          </div>
        </section>

        <!-- Edge PoPs Ping Telemetry -->
        <section class="px-6 lg:px-12 py-12 flex flex-col gap-6 border-b border-brand-border/80 bg-slate-50/50">
          <h2 class="font-display font-black text-xl text-slate-900 uppercase">Global Edge Gateway PoPs</h2>
          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            ${edgePoPs.map(ep => `
              <div class="p-4 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col gap-1.5 text-center">
                <span class="text-[10px] font-bold text-slate-500 truncate">${ep.location}</span>
                <span class="text-lg font-mono font-black text-brand-primary">${ep.ping}</span>
                <span class="text-[9px] font-bold text-emerald-600 uppercase">● ${ep.status}</span>
              </div>
            `).join("")}
          </div>
        </section>

        <!-- Incident History -->
        <section class="px-6 lg:px-12 py-12 flex flex-col gap-6">
          <h2 class="font-display font-black text-xl text-slate-900 uppercase">Recent Incident History</h2>
          
          <div class="flex flex-col gap-4">
            <div class="p-5 bg-white border border-slate-200 rounded-2xl flex flex-col gap-2 shadow-xs">
              <div class="flex items-center justify-between border-b pb-2">
                <span class="font-bold text-xs text-slate-900">Upstream OpenAI GPT-4o Latency Spike (Resolved)</span>
                <span class="text-[10px] font-mono text-slate-400">Aug 21, 2026 - 14:22 UTC</span>
              </div>
              <p class="text-xs text-slate-600 font-semibold leading-relaxed">
                OpenAI US-East experienced elevated API response latencies. UniLLM auto-routing immediately shifted 42% of traffic to Claude 3.5 Sonnet and Gemini 1.5 Pro with 0 request drops. Resolved in 18 minutes.
              </p>
            </div>

            <div class="p-5 bg-white border border-slate-200 rounded-2xl flex flex-col gap-2 shadow-xs">
              <div class="flex items-center justify-between border-b pb-2">
                <span class="font-bold text-xs text-slate-900">Scheduled Frankfurt Edge Maintenance (Completed)</span>
                <span class="text-[10px] font-mono text-slate-400">Aug 14, 2026 - 02:00 UTC</span>
              </div>
              <p class="text-xs text-slate-600 font-semibold leading-relaxed">
                Routine BGP edge proxy node upgrades in EU-Central. BGP Anycast rerouted European traffic to London PoP seamlessly with +3ms delta.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  `;
}

export function bindStatusPage() {}

export default {
  statusPage,
  bindStatusPage
};
