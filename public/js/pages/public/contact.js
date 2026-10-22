// PUBLIC PAGE: contact
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function contact() {
    return `
      <div class="border-x border-brand-border/60 max-w-7xl mx-auto bg-white/30 backdrop-blur-[1px]">
        <section class="px-6 lg:px-12 py-16 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start animate-fade-in-up">
          <div class="lg:col-span-5 flex flex-col gap-4 select-none">
            <span class="text-[9px] font-bold text-brand-primary uppercase tracking-widest bg-indigo-50 border border-indigo-150 px-3 py-1 rounded-full self-start shadow-sm font-bold">GET IN TOUCH</span>
            <h1 class="font-display font-black text-4xl text-brand-text uppercase leading-none">CONNECT WITH INFRAENGINEERS</h1>
            <p class="text-xs text-brand-muted leading-relaxed font-semibold">
              Forward custom proxy integration inquiries or request dedicated staging setups directly.
            </p>
          </div>
          
          <div class="lg:col-span-7 bg-white border border-brand-border rounded-xl p-8 shadow-sm">
            <form id="contact-form" class="flex flex-col gap-4 font-semibold text-xs text-brand-text">
              <div class="flex flex-col gap-1.5">
                <label class="text-[9px] uppercase tracking-wider">Your name</label>
                <input type="text" id="cont-name" required placeholder="Sarah Connor" class="p-3 border border-brand-border rounded-lg bg-brand-bg/40 focus:bg-[#161926] focus:border-brand-primary outline-none font-semibold text-xs" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-[9px] uppercase tracking-wider">Email Address</label>
                <input type="email" id="cont-email" required placeholder="sarah@cyberdyne.org" class="p-3 border border-brand-border rounded-lg bg-brand-bg/40 focus:bg-[#161926] focus:border-brand-primary outline-none font-semibold text-xs" />
              </div>
              <div class="flex flex-col gap-1.5">
                <label class="text-[9px] uppercase tracking-wider">Message Description</label>
                <textarea id="cont-msg" required rows="4" placeholder="Your integration details..." class="p-3 border border-brand-border rounded-lg bg-brand-bg/40 focus:bg-[#161926] focus:border-brand-primary outline-none resize-none font-semibold text-xs"></textarea>
              </div>
              <button type="submit" class="w-full py-3.5 bg-brand-primary hover:bg-indigo-700 text-white font-bold rounded-lg uppercase tracking-wider transition-colors shadow-sm">
                Transmit Inquiry
              </button>
            </form>
          </div>
        </section>
      </div>
    `;
  };

export function bindContact() {
    const form = document.getElementById("contact-form");
    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      components.renderToast("success", "Message transmitted. We will respond shortly.");
      form.reset();
    });
  };

export default {
  contact,
  bindContact
};
