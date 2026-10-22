// PUBLIC PAGE: about
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";
import { icons } from "../../icons.js?v=2";

export function about() {
  return `
    <div class="relative overflow-hidden w-full font-sans">
      <div class="absolute top-[5%] left-[10%] w-[550px] h-[550px] rounded-full blur-[160px] ambient-glow-1 -z-10"></div>
      <div class="absolute top-[35%] right-[5%] w-[600px] h-[600px] rounded-full blur-[170px] ambient-glow-2 -z-10"></div>
      <div class="absolute top-[70%] left-[15%] w-[500px] h-[500px] rounded-full blur-[150px] ambient-glow-3 -z-10"></div>

      <div class="border-x border-brand-border/60 max-w-7xl mx-auto bg-white/30 backdrop-blur-[1px]">
        <!-- Hero Section -->
        <section class="px-6 lg:px-12 py-16 md:py-24 flex flex-col gap-6 animate-fade-in-up border-b border-brand-border/80">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-150 text-brand-primary text-[10px] font-bold tracking-wider uppercase rounded-full self-start shadow-sm">
            Company & Purpose
          </div>
          <h1 class="font-display font-black text-4xl sm:text-6xl text-brand-text tracking-tight uppercase leading-[1.05]">
            BUILDING THE UNIVERSAL ROUTING LAYER FOR ARTIFICIAL INTELLIGENCE
          </h1>
          <p class="text-sm sm:text-base text-brand-muted leading-relaxed max-w-3xl font-semibold">
            UniLLM was born from a fundamental problem: modern AI applications shouldn't be locked into single-model silos, vulnerable to provider outages, or blind to runaway token expenses. We build the high-availability proxy layer that puts engineering teams in total control.
          </p>
        </section>

        <!-- Stats Grid -->
        <section class="px-6 lg:px-12 py-12 grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-brand-border/80 bg-slate-50/50">
          <div class="flex flex-col gap-1.5 p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
            <span class="text-3xl font-display font-black text-brand-primary">14.2B+</span>
            <span class="text-xs font-bold text-slate-700">Monthly Tokens Routed</span>
            <span class="text-[10px] text-slate-400 font-semibold">Across 180+ countries</span>
          </div>
          <div class="flex flex-col gap-1.5 p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
            <span class="text-3xl font-display font-black text-emerald-600">&lt;14ms</span>
            <span class="text-xs font-bold text-slate-700">Gateway Routing Overhead</span>
            <span class="text-[10px] text-slate-400 font-semibold">Global Edge Anycast</span>
          </div>
          <div class="flex flex-col gap-1.5 p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
            <span class="text-3xl font-display font-black text-indigo-600">99.999%</span>
            <span class="text-xs font-bold text-slate-700">Availability SLA</span>
            <span class="text-[10px] text-slate-400 font-semibold">Zero-downtime failover</span>
          </div>
          <div class="flex flex-col gap-1.5 p-5 bg-white border border-slate-200/80 rounded-2xl shadow-xs">
            <span class="text-3xl font-display font-black text-purple-600">42.8%</span>
            <span class="text-xs font-bold text-slate-700">Average Spend Reduction</span>
            <span class="text-[10px] text-slate-400 font-semibold">Via semantic cache hits</span>
          </div>
        </section>

        <!-- Core Engineering Principles -->
        <section class="px-6 lg:px-12 py-16 flex flex-col gap-10 border-b border-brand-border/80">
          <div class="flex flex-col gap-2">
            <span class="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Our DNA</span>
            <h2 class="font-display font-black text-2xl sm:text-3xl text-brand-text uppercase">Architectural Principles</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col gap-4 shadow-sm">
              <div class="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-brand-primary">
                ${icons.lock("w-5 h-5")}
              </div>
              <h3 class="font-bold text-base text-slate-900">Zero-Retention Security</h3>
              <p class="text-xs text-slate-600 leading-relaxed font-semibold">
                Prompts, completions, and sensitive vector payloads pass through memory without touching persistent storage. We encrypt and forward with cryptographic guarantee.
              </p>
            </div>

            <div class="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col gap-4 shadow-sm">
              <div class="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                ${icons.shield("w-5 h-5")}
              </div>
              <h3 class="font-bold text-base text-slate-900">Autonomous Self-Healing</h3>
              <p class="text-xs text-slate-600 leading-relaxed font-semibold">
                When upstream providers suffer rate-limits (HTTP 429) or transient 500 outages, our intelligent state machine instantaneously shifts load to healthy fallback replicas in under 20 milliseconds.
              </p>
            </div>

            <div class="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col gap-4 shadow-sm">
              <div class="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                ${icons.plug("w-5 h-5")}
              </div>
              <h3 class="font-bold text-base text-slate-900">Drop-In Standard Protocol</h3>
              <p class="text-xs text-slate-600 leading-relaxed font-semibold">
                100% OpenAI-compliant REST interface. You do not need to rewrite your application or learn proprietary SDKs; simply switch your base URL to <code class="bg-slate-100 px-1 py-0.5 rounded text-indigo-700">api.unillm.com/v1</code>.
              </p>
            </div>
          </div>
        </section>

        <!-- Global Edge PoPs Map -->
        <section class="px-6 lg:px-12 py-16 flex flex-col gap-8 border-b border-brand-border/80 bg-slate-900 text-white rounded-3xl mx-6 my-10 overflow-hidden relative">
          <div class="flex flex-col gap-2 z-10">
            <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Global Edge Distribution</span>
            <h2 class="font-display font-black text-2xl sm:text-3xl text-white uppercase">12 Global Gateway PoPs</h2>
            <p class="text-xs text-indigo-200/80 max-w-xl font-semibold">Direct BGP Anycast routes incoming requests to the nearest edge proxy, ensuring sub-15ms connection setup regardless of geography.</p>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 z-10 text-xs">
            <div class="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span class="font-bold">US-East (N. Virginia)</span>
            </div>
            <div class="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span class="font-bold">US-West (Oregon)</span>
            </div>
            <div class="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span class="font-bold">EU-Central (Frankfurt)</span>
            </div>
            <div class="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span class="font-bold">EU-West (London)</span>
            </div>
            <div class="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span class="font-bold">AP-East (Tokyo)</span>
            </div>
            <div class="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span class="font-bold">AP-South (Singapore)</span>
            </div>
            <div class="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span class="font-bold">AP-South (Mumbai)</span>
            </div>
            <div class="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2.5">
              <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span class="font-bold">SA-East (São Paulo)</span>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section class="px-6 lg:px-12 py-16 flex flex-col sm:flex-row justify-between items-center gap-8 bg-white select-none">
          <div class="flex flex-col gap-2">
            <h3 class="font-display font-black text-2xl text-slate-900 uppercase">Ready to elevate your LLM stack?</h3>
            <p class="text-xs text-slate-500 font-semibold">Get started in 5 minutes with our drop-in SDK integration.</p>
          </div>
          <div class="flex items-center gap-4 shrink-0">
            <a href="/get-started" data-link class="px-6 py-3 bg-brand-primary text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-indigo-700 transition-colors shadow-md">
              Start Free Trial &rarr;
            </a>
            <a href="/contact" data-link class="px-6 py-3 border border-slate-200 text-slate-700 font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-slate-50 transition-colors">
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
