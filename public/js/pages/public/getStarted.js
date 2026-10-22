// PUBLIC PAGE: getStarted
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function getStarted() {
    return `
      <div class="relative overflow-hidden w-full">
        <div class="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full blur-[160px] ambient-glow-1 -z-10"></div>
        <div class="relative w-full overflow-hidden">
          <section class="px-6 lg:px-12 py-16 md:py-28 flex flex-col gap-12 animate-fade-in-up">
            <div class="flex flex-col gap-4 select-none">
              <div class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-150 text-brand-primary text-[10px] font-bold tracking-wider uppercase rounded-full self-start shadow-sm">
                Get Started
              </div>
              <h1 class="font-display font-black text-5xl sm:text-6xl text-brand-text tracking-tight uppercase leading-none">INITIALIZE YOUR<br>SANDBOX ACCESS</h1>
              <p class="text-xs text-brand-muted leading-relaxed max-w-2xl font-semibold">
                Set up a development account to access multiple model backends through our unified developer sandbox endpoints.
              </p>
            </div>

            <div class="scroll-connector-line"></div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 font-semibold select-none">
              <div class="border border-brand-border bg-white rounded-xl p-6 shadow-sm flex flex-col gap-3 hover:border-brand-primary/50 transition-all">
                <span class="text-[10px] font-bold text-brand-primary">STEP 01</span>
                <h3 class="font-bold text-sm text-brand-text">Register Sandbox</h3>
                <p class="text-xs text-brand-muted leading-relaxed">Create a workspace profile and get your proxy authorization headers.</p>
                <a href="/signup" data-link class="text-[11px] text-brand-primary hover:underline font-bold mt-2">Sign Up &rarr;</a>
              </div>
              <div class="border border-brand-border bg-white rounded-xl p-6 shadow-sm flex flex-col gap-3 hover:border-brand-primary/50 transition-all">
                <span class="text-[10px] font-bold text-brand-primary">STEP 02</span>
                <h3 class="font-bold text-sm text-brand-text">Configure Base URL</h3>
                <p class="text-xs text-brand-muted leading-relaxed">Swap model endpoints base URLs from OpenAI to our proxy gateway.</p>
              </div>
              <div class="border border-brand-border bg-white rounded-xl p-6 shadow-sm flex flex-col gap-3 hover:border-brand-primary/50 transition-all">
                <span class="text-[10px] font-bold text-brand-primary">STEP 03</span>
                <h3 class="font-bold text-sm text-brand-text">Start Inference</h3>
                <p class="text-xs text-brand-muted leading-relaxed">Deliver your first prompt. Observe tracing metrics in your logs console.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    `;
  };

export function bindGetStarted() {};

export default {
  getStarted,
  bindGetStarted
};
