// PUBLIC PAGE: contact (Obsidian Form & Inquiries)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function contact() {
  return `
    <div class="relative overflow-hidden w-full font-sans bg-[#08090B] text-[#F5F5F5]">
      
      <!-- Top subtle vignette -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-b from-white/[0.04] to-transparent blur-[120px] pointer-events-none -z-10"></div>

      <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <section class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div class="lg:col-span-5 flex flex-col gap-6">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#101216] border border-[#292D34] text-[11px] font-mono tracking-wider text-[#A1A5AD] uppercase self-start">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Contact Inquiries</span>
            </div>

            <h1 class="font-sans font-extrabold text-4xl sm:text-5xl text-white tracking-tight leading-[1.08]">
              Connect with infrastructure engineers.
            </h1>

            <p class="text-sm text-[#A1A5AD] leading-relaxed">
              Forward custom proxy integration inquiries, discuss enterprise deployment topologies, or request dedicated staging setups directly with our team.
            </p>

            <div class="flex flex-col gap-3 pt-4 border-t border-[#292D34] text-xs font-mono text-[#A1A5AD]">
              <div>Direct: <span class="text-white">engineering@unillm.io</span></div>
              <div>Security: <span class="text-white">security@unillm.io</span></div>
              <div>Office: <span class="text-white">San Francisco, CA</span></div>
            </div>
          </div>
          
          <div class="lg:col-span-7 bg-[#101216] border border-[#292D34] rounded-xl p-8 shadow-2xl">
            <form id="contact-form" class="flex flex-col gap-4 text-xs font-sans">
              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-mono uppercase tracking-wider text-[#A1A5AD]">Your Name</label>
                <input type="text" id="cont-name" required placeholder="Alex Rivera" class="p-3 border border-[#292D34] rounded-lg bg-[#15181D] text-white placeholder-[#A1A5AD]/50 focus:border-white/50 outline-none text-xs transition-colors" />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-mono uppercase tracking-wider text-[#A1A5AD]">Email Address</label>
                <input type="email" id="cont-email" required placeholder="alex@company.com" class="p-3 border border-[#292D34] rounded-lg bg-[#15181D] text-white placeholder-[#A1A5AD]/50 focus:border-white/50 outline-none text-xs transition-colors" />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-[11px] font-mono uppercase tracking-wider text-[#A1A5AD]">Message Description</label>
                <textarea id="cont-msg" required rows="4" placeholder="Tell us about your infrastructure requirements, traffic volume, or technical questions..." class="p-3 border border-[#292D34] rounded-lg bg-[#15181D] text-white placeholder-[#A1A5AD]/50 focus:border-white/50 outline-none resize-none text-xs transition-colors"></textarea>
              </div>

              <button type="submit" class="w-full py-3.5 bg-white hover:bg-neutral-200 text-black font-semibold rounded-lg text-xs tracking-wider transition-all shadow-sm mt-2">
                Transmit Inquiry →
              </button>
            </form>
          </div>

        </section>
      </div>
    </div>
  `;
}

export function bindContact() {
  const form = document.getElementById("contact-form");
  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    components.renderToast("success", "Inquiry transmitted. Our engineering team will respond within 4 business hours.");
    form.reset();
  });
}

export default {
  contact,
  bindContact
};
