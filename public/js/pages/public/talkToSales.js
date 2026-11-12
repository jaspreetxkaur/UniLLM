// PUBLIC PAGE: talkToSales (Obsidian Enterprise Sales Engagement)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function talkToSales() {
  return `
    <div class="relative overflow-hidden w-full font-sans bg-[#08090B] text-[#F5F5F5]">
      
      <!-- Top subtle vignette -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-b from-white/[0.04] to-transparent blur-[120px] pointer-events-none -z-10"></div>

      <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <section class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div class="lg:col-span-5 flex flex-col gap-6">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#101216] border border-[#292D34] text-[11px] font-mono tracking-wider text-[#A1A5AD] uppercase self-start">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Enterprise Engagement</span>
            </div>

            <h1 class="font-sans font-extrabold text-4xl sm:text-5xl text-white tracking-tight leading-[1.08]">
              Deploy UniLLM across your organization.
            </h1>

            <p class="text-sm text-[#A1A5AD] leading-relaxed">
              Speak with our enterprise solutions architects about custom VPC deployments, single-tenant clusters, volume pricing, and custom legal SLAs.
            </p>
            
            <div class="flex flex-col gap-3 pt-4 border-t border-[#292D34] text-xs font-mono text-[#A1A5AD]">
              <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> <span>Intelligent Multi-Model Failover Routing</span></div>
              <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> <span>Real-Time In-Memory PII Stripping</span></div>
              <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> <span>Departmental Quota Governance & Spending Caps</span></div>
              <div class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> <span>99.999% SLA with Custom BAA Contracts</span></div>
            </div>
          </div>
          
          <div class="lg:col-span-7 bg-[#101216] border border-[#292D34] rounded-xl p-8 shadow-2xl">
            <form id="talk-sales-form" class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-mono uppercase tracking-wider text-[#A1A5AD]">Your Name</label>
                <input type="text" id="sales-name" required placeholder="Alex Rivera" class="p-3 border border-[#292D34] rounded-lg bg-[#15181D] text-white placeholder-[#A1A5AD]/50 focus:border-white/50 outline-none text-xs transition-colors" />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-mono uppercase tracking-wider text-[#A1A5AD]">Work Email</label>
                <input type="email" id="sales-email" required placeholder="alex@company.com" class="p-3 border border-[#292D34] rounded-lg bg-[#15181D] text-white placeholder-[#A1A5AD]/50 focus:border-white/50 outline-none text-xs transition-colors" />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-mono uppercase tracking-wider text-[#A1A5AD]">Company</label>
                <input type="text" id="sales-company" required placeholder="Acme Technologies" class="p-3 border border-[#292D34] rounded-lg bg-[#15181D] text-white placeholder-[#A1A5AD]/50 focus:border-white/50 outline-none text-xs transition-colors" />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-mono uppercase tracking-wider text-[#A1A5AD]">Role / Title</label>
                <input type="text" id="sales-role" required placeholder="VP Infrastructure" class="p-3 border border-[#292D34] rounded-lg bg-[#15181D] text-white placeholder-[#A1A5AD]/50 focus:border-white/50 outline-none text-xs transition-colors" />
              </div>

              <div class="flex flex-col gap-1.5 sm:col-span-2">
                <label class="text-[11px] font-mono uppercase tracking-wider text-[#A1A5AD]">Requirements Description</label>
                <textarea id="sales-message" rows="4" placeholder="Tell us about expected token volume, provider preferences, or VPC compliance needs..." class="p-3 border border-[#292D34] rounded-lg bg-[#15181D] text-white placeholder-[#A1A5AD]/50 focus:border-white/50 outline-none resize-none text-xs transition-colors"></textarea>
              </div>

              <button type="submit" class="sm:col-span-2 py-3.5 bg-white hover:bg-neutral-200 text-black font-semibold rounded-lg text-xs tracking-wider transition-all shadow-sm mt-2">
                Submit Enterprise Request →
              </button>
            </form>
          </div>

        </section>
      </div>
    </div>
  `;
}

export function bindTalkToSales() {
  const form = document.getElementById("talk-sales-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    components.renderToast("success", "Request received. An enterprise solutions director will follow up within 2 hours.");
    form.reset();
  });
}

export default {
  talkToSales,
  bindTalkToSales
};
