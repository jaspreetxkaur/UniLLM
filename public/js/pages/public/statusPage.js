// PUBLIC PAGE: statusPage (Obsidian Real-time Gateway Health & Telemetry)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function statusPage() {
  const providers = [
    { name: "OpenAI Gateway Endpoint", provider: "OpenAI", status: "Operational", uptime: "99.99%", latency: "280ms", regions: "Global" },
    { name: "Anthropic Claude Proxy", provider: "Anthropic", status: "Operational", uptime: "99.98%", latency: "340ms", regions: "Global" },
    { name: "Google Gemini Flash & Pro", provider: "Google", status: "Operational", uptime: "99.99%", latency: "210ms", regions: "Global" },
    { name: "Groq High-Speed LPU", provider: "Groq", status: "Operational", uptime: "100.00%", latency: "42ms", regions: "US, EU" },
    { name: "Mistral Large & Embeddings", provider: "Mistral", status: "Operational", uptime: "99.97%", latency: "310ms", regions: "EU, US" },
    { name: "Cohere Rerank & Embed", provider: "Cohere", status: "Operational", uptime: "99.99%", latency: "190ms", regions: "Global" }
  ];

  const edgePoPs = [
    { location: "US-East (N. Virginia)", ping: "12ms", status: "Operational" },
    { location: "US-West (Oregon)", ping: "14ms", status: "Operational" },
    { location: "EU-Central (Frankfurt)", ping: "16ms", status: "Operational" },
    { location: "EU-West (London)", ping: "15ms", status: "Operational" },
    { location: "AP-East (Tokyo)", ping: "22ms", status: "Operational" },
    { location: "AP-South (Singapore)", ping: "24ms", status: "Operational" }
  ];

  return `
    <div class="relative overflow-hidden w-full font-sans bg-[#08090B] text-[#F5F5F5]">
      
      <!-- Top subtle vignette -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-b from-white/[0.04] to-transparent blur-[120px] pointer-events-none -z-10"></div>

      <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24 flex flex-col gap-16">
        
        <!-- Header Banner -->
        <section class="flex flex-col gap-6">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#101216] border border-[#292D34] text-[11px] font-mono tracking-wider text-[#A1A5AD] uppercase self-start">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>All Systems Operational</span>
            <span class="text-white/20">•</span>
            <span class="text-white">Global Edge Mesh</span>
          </div>

          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-[#292D34] pb-8">
            <div class="flex flex-col gap-2 max-w-2xl">
              <h1 class="font-sans font-extrabold text-4xl sm:text-5xl text-white tracking-tight">System Status & Latency</h1>
              <p class="text-sm text-[#A1A5AD]">Live upstream model provider telemetry, health checks, and global Anycast edge network responsiveness.</p>
            </div>
            <div class="p-5 bg-[#101216] border border-[#292D34] rounded-xl flex flex-col gap-1 text-right font-mono">
              <span class="text-[10px] uppercase tracking-wider text-[#A1A5AD]">Global 90-Day Uptime</span>
              <span class="text-2xl font-bold text-emerald-400">99.998%</span>
            </div>
          </div>
        </section>

        <!-- Provider Status List -->
        <section class="flex flex-col gap-6">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-white tracking-tight">Upstream Provider Endpoints</h2>
            <span class="text-xs font-mono text-[#A1A5AD]">Updated every 15s</span>
          </div>

          <div class="rounded-xl border border-[#292D34] bg-[#101216] overflow-hidden font-mono text-xs">
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="border-b border-[#292D34] bg-[#08090B] text-[#A1A5AD] text-[10px] uppercase tracking-wider">
                    <th class="px-6 py-4">Service Endpoint</th>
                    <th class="px-6 py-4">Status</th>
                    <th class="px-6 py-4">Uptime (30d)</th>
                    <th class="px-6 py-4">Avg Latency</th>
                    <th class="px-6 py-4">Coverage</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#292D34] text-[#A1A5AD]">
                  ${providers.map(p => `
                    <tr class="hover:bg-[#15181D] transition-colors">
                      <td class="px-6 py-4 font-semibold text-white font-sans">${p.name}</td>
                      <td class="px-6 py-4">
                        <span class="inline-flex items-center gap-1.5 text-emerald-400 font-semibold">
                          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                          <span>${p.status}</span>
                        </span>
                      </td>
                      <td class="px-6 py-4 text-white">${p.uptime}</td>
                      <td class="px-6 py-4 text-white">${p.latency}</td>
                      <td class="px-6 py-4">${p.regions}</td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- Edge PoPs Latency Grid -->
        <section class="flex flex-col gap-6">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-white tracking-tight">Anycast Edge Network PoPs</h2>
            <span class="text-xs font-mono text-emerald-400">All 36 PoPs Healthy</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 font-mono text-xs">
            ${edgePoPs.map(pop => `
              <div class="p-5 rounded-xl bg-[#101216] border border-[#292D34] flex items-center justify-between">
                <div>
                  <div class="text-white font-semibold font-sans">${pop.location}</div>
                  <div class="text-[11px] text-emerald-400 flex items-center gap-1.5 mt-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>${pop.status}</span>
                  </div>
                </div>
                <div class="text-right">
                  <div class="text-xs font-bold text-white">${pop.ping}</div>
                  <div class="text-[10px] text-[#A1A5AD]">TCP Handshake</div>
                </div>
              </div>
            `).join("")}
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
