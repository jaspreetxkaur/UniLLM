// PUBLIC PAGE: about (Obsidian Architectural Principles & Purpose)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";
import { icons } from "../../icons.js?v=2";

export function about() {
  return `
    <div class="relative overflow-hidden w-full font-sans bg-[#08090B] text-[#F5F5F5]">
      
      <!-- Top subtle vignette -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-b from-white/[0.04] to-transparent blur-[120px] pointer-events-none -z-10"></div>

      <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24 flex flex-col gap-20">
        
        <!-- Hero Section -->
        <section class="flex flex-col gap-6 max-w-4xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#101216] border border-[#292D34] text-[11px] font-mono tracking-wider text-[#A1A5AD] uppercase self-start">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Engineering Mission</span>
            <span class="text-white/20">•</span>
            <span class="text-white">Universal Routing</span>
          </div>

          <h1 class="font-sans font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-[1.08]">
            Building the universal routing layer for artificial intelligence.
          </h1>

          <p class="text-base text-[#A1A5AD] leading-relaxed max-w-2xl font-normal">
            UniLLM was born from a fundamental problem: modern AI applications shouldn't be locked into single-model silos, vulnerable to provider outages, or blind to runaway token expenses. We build the high-availability proxy layer that puts engineering teams in total control.
          </p>
        </section>

        <!-- Stats Grid -->
        <section class="grid grid-cols-2 md:grid-cols-4 gap-4 font-mono">
          <div class="p-6 rounded-xl bg-[#101216] border border-[#292D34] flex flex-col gap-1">
            <span class="text-2xl sm:text-3xl font-bold text-white">14.2B+</span>
            <span class="text-xs font-semibold text-[#A1A5AD] font-sans">Monthly Tokens Routed</span>
            <span class="text-[10px] text-[#A1A5AD]/70">Global Ingress Traffic</span>
          </div>
          <div class="p-6 rounded-xl bg-[#101216] border border-[#292D34] flex flex-col gap-1">
            <span class="text-2xl sm:text-3xl font-bold text-emerald-400">&lt;14ms</span>
            <span class="text-xs font-semibold text-[#A1A5AD] font-sans">Gateway Routing Overhead</span>
            <span class="text-[10px] text-[#A1A5AD]/70">Global Edge Anycast</span>
          </div>
          <div class="p-6 rounded-xl bg-[#101216] border border-[#292D34] flex flex-col gap-1">
            <span class="text-2xl sm:text-3xl font-bold text-white">99.999%</span>
            <span class="text-xs font-semibold text-[#A1A5AD] font-sans">Availability SLA</span>
            <span class="text-[10px] text-[#A1A5AD]/70">Automated Failover Mesh</span>
          </div>
          <div class="p-6 rounded-xl bg-[#101216] border border-[#292D34] flex flex-col gap-1">
            <span class="text-2xl sm:text-3xl font-bold text-white">42.8%</span>
            <span class="text-xs font-semibold text-[#A1A5AD] font-sans">Average Spend Reduction</span>
            <span class="text-[10px] text-[#A1A5AD]/70">Via Semantic Cache Hits</span>
          </div>
        </section>

        <!-- Core Engineering Principles -->
        <section class="flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <span class="text-xs font-mono font-bold text-[#A1A5AD] uppercase tracking-wider">Our DNA</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">Architectural Principles</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 bg-[#101216] border border-[#292D34] rounded-xl flex flex-col gap-4">
              <div class="w-10 h-10 rounded-lg bg-[#15181D] border border-[#292D34] flex items-center justify-center text-white font-mono font-bold text-sm">
                01
              </div>
              <h3 class="font-bold text-base text-white">Zero-Retention Security</h3>
              <p class="text-xs text-[#A1A5AD] leading-relaxed">
                Prompts, completions, and sensitive vector payloads pass strictly through in-memory streams without touching persistent disk storage. Cryptographic forwarding guarantees compliance.
              </p>
            </div>

            <div class="p-6 bg-[#101216] border border-[#292D34] rounded-xl flex flex-col gap-4">
              <div class="w-10 h-10 rounded-lg bg-[#15181D] border border-[#292D34] flex items-center justify-center text-emerald-400 font-mono font-bold text-sm">
                02
              </div>
              <h3 class="font-bold text-base text-white">Autonomous Circuit Breaking</h3>
              <p class="text-xs text-[#A1A5AD] leading-relaxed">
                When upstream providers experience HTTP 429 rate limits or transient outages, our state machine shifts load to healthy fallback replicas in under 45 milliseconds.
              </p>
            </div>

            <div class="p-6 bg-[#101216] border border-[#292D34] rounded-xl flex flex-col gap-4">
              <div class="w-10 h-10 rounded-lg bg-[#15181D] border border-[#292D34] flex items-center justify-center text-white font-mono font-bold text-sm">
                03
              </div>
              <h3 class="font-bold text-base text-white">Drop-In Standard Protocol</h3>
              <p class="text-xs text-[#A1A5AD] leading-relaxed">
                100% OpenAI-compliant REST interface. You do not need to rewrite your application or adopt vendor-locked libraries; simply switch your base URL to <code class="text-white font-mono text-[11px]">api.unillm.io/v1</code>.
              </p>
            </div>
          </div>
        </section>

        <!-- Global Edge Distribution -->
        <section class="p-8 sm:p-12 rounded-xl border border-[#292D34] bg-[#101216] flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <span class="text-xs font-mono font-bold text-[#A1A5AD] uppercase tracking-wider">Global Infrastructure</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">Global Edge Anycast Nodes</h2>
            <p class="text-xs sm:text-sm text-[#A1A5AD] max-w-xl">Direct BGP Anycast routes incoming requests to the nearest edge proxy, ensuring sub-15ms connection setup regardless of geography.</p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
            <div class="p-3 bg-[#08090B] border border-[#292D34] rounded-lg flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span class="text-white">US-East (N. Virginia)</span>
            </div>
            <div class="p-3 bg-[#08090B] border border-[#292D34] rounded-lg flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span class="text-white">US-West (Oregon)</span>
            </div>
            <div class="p-3 bg-[#08090B] border border-[#292D34] rounded-lg flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span class="text-white">EU-Central (Frankfurt)</span>
            </div>
            <div class="p-3 bg-[#08090B] border border-[#292D34] rounded-lg flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span class="text-white">EU-West (London)</span>
            </div>
            <div class="p-3 bg-[#08090B] border border-[#292D34] rounded-lg flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span class="text-white">AP-East (Tokyo)</span>
            </div>
            <div class="p-3 bg-[#08090B] border border-[#292D34] rounded-lg flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span class="text-white">AP-South (Singapore)</span>
            </div>
            <div class="p-3 bg-[#08090B] border border-[#292D34] rounded-lg flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span class="text-white">AP-South (Mumbai)</span>
            </div>
            <div class="p-3 bg-[#08090B] border border-[#292D34] rounded-lg flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span class="text-white">SA-East (São Paulo)</span>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section class="p-8 sm:p-12 rounded-xl bg-[#101216] border border-[#292D34] flex flex-col sm:flex-row justify-between items-center gap-8">
          <div class="flex flex-col gap-2">
            <h3 class="text-2xl font-bold text-white tracking-tight">Ready to elevate your LLM stack?</h3>
            <p class="text-xs sm:text-sm text-[#A1A5AD]">Deploy in 5 minutes with our drop-in SDK integration.</p>
          </div>
          <div class="flex items-center gap-4 shrink-0">
            <a href="/get-started" data-link class="px-6 py-3 bg-white hover:bg-neutral-200 text-black font-semibold rounded-lg text-xs transition-colors shadow-sm inline-flex items-center gap-2">
              <span>Start Free Trial</span>
              <span class="font-bold">→</span>
            </a>
            <a href="/contact" data-link class="px-6 py-3 border border-[#292D34] hover:bg-[#15181D] text-white font-semibold rounded-lg text-xs transition-colors">
              Contact Team
            </a>
          </div>
        </section>

      </div>
    </div>
  `;
}

export function bindAbout() {}

export default {
  about,
  bindAbout
};
