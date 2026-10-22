// PUBLIC PAGE: talkToSales
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function talkToSales() {
    return `
      <div class="relative overflow-hidden w-full">
        <div class="absolute top-[10%] left-[5%] w-[500px] h-[500px] rounded-full blur-[150px] ambient-glow-2 -z-10"></div>

        <div class="relative w-full overflow-hidden">
          <section class="px-6 lg:px-12 py-16 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start animate-fade-in-up">
            <div class="lg:col-span-5 flex flex-col gap-6 select-none">
              <span class="text-[10px] font-bold text-brand-primary tracking-widest uppercase bg-indigo-50 border border-indigo-150 px-3 py-1 rounded-full self-start shadow-sm font-bold">Contact Sales</span>
              <h2 class="font-display font-black text-5xl text-brand-text tracking-tight uppercase leading-none">SEE UNILLM<br>IN ACTION.</h2>
              <p class="text-xs text-brand-muted leading-relaxed font-semibold">
                Get in touch with our solutions engineering team. We'll set up a customized demo workspace, establish isolated private gateways, and review SSO configurations.
              </p>
              
              <ul class="flex flex-col gap-3 font-semibold text-xs text-brand-muted">
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-brand-primary"></span> Intelligent Multi-model Routing</li>
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-brand-primary"></span> Real-time Observability & Tracing</li>
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-brand-primary"></span> Quota Governance & Spending Caps</li>
                <li class="flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-brand-primary"></span> Automatic Latency Outage Protection</li>
              </ul>
            </div>
            
            <div class="lg:col-span-7 bg-white border border-brand-border rounded-xl p-8 shadow-sm">
              <form id="talk-sales-form" class="grid grid-cols-1 sm:grid-cols-2 gap-4 font-semibold text-xs text-brand-text">
                <div class="flex flex-col gap-1.5">
                  <label class="text-[9px] font-bold uppercase tracking-wider">Your Name</label>
                  <input type="text" id="sales-name" required placeholder="Sarah Connor" class="p-3 border border-brand-border rounded-lg bg-brand-bg/40 focus:bg-[#161926] focus:border-brand-primary outline-none" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-[9px] font-bold uppercase tracking-wider">Work Email</label>
                  <input type="email" id="sales-email" required placeholder="sarah@cyberdyne.org" class="p-3 border border-brand-border rounded-lg bg-brand-bg/40 focus:bg-[#161926] focus:border-brand-primary outline-none" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-[9px] font-bold uppercase tracking-wider">Company</label>
                  <input type="text" id="sales-company" required placeholder="Cyberdyne Systems" class="p-3 border border-brand-border rounded-lg bg-brand-bg/40 focus:bg-[#161926] focus:border-brand-primary outline-none" />
                </div>
                <div class="flex flex-col gap-1.5">
                  <label class="text-[9px] font-bold uppercase tracking-wider">Role</label>
                  <input type="text" id="sales-role" required placeholder="VP Infrastructure" class="p-3 border border-brand-border rounded-lg bg-brand-bg/40 focus:bg-[#161926] focus:border-brand-primary outline-none" />
                </div>
                <div class="flex flex-col gap-1.5 sm:col-span-2">
                  <label class="text-[9px] font-bold uppercase tracking-wider">Message</label>
                  <textarea id="sales-message" rows="4" placeholder="Tell us about your corporate gateway scope..." class="p-3 border border-brand-border rounded-lg bg-brand-bg/40 focus:bg-[#161926] focus:border-brand-primary outline-none resize-none"></textarea>
                </div>
                <button type="submit" class="sm:col-span-2 py-3.5 bg-brand-primary hover:bg-indigo-700 text-white font-bold rounded-lg uppercase tracking-wider shadow-sm transition-all text-center">
                  SUBMIT REQUEST
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    `;
  };

export function bindTalkToSales() {
    const form = document.getElementById("talk-sales-form");
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("sales-name").value.trim();
      components.renderToast("success", `Thank you, ${name}. Request logged.`);
      form.reset();
    });
  };

export default {
  talkToSales,
  bindTalkToSales
};
