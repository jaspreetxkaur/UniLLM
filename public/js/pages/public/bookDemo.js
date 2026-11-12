// PUBLIC PAGE: bookDemo (Obsidian Architecture Demo Scheduling)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function bookDemo() {
  return `
    <div class="relative overflow-hidden w-full font-sans bg-[#08090B] text-[#F5F5F5]">
      
      <!-- Top subtle vignette -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-b from-white/[0.04] to-transparent blur-[120px] pointer-events-none -z-10"></div>

      <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <section class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          <div class="lg:col-span-5 flex flex-col gap-6">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#101216] border border-[#292D34] text-[11px] font-mono tracking-wider text-[#A1A5AD] uppercase self-start">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Architecture Demo</span>
            </div>

            <h1 class="font-sans font-extrabold text-4xl sm:text-5xl text-white tracking-tight leading-[1.08]">
              Reserve an architecture review slot.
            </h1>

            <p class="text-sm text-[#A1A5AD] leading-relaxed">
              Select a convenient time to speak directly with our core gateway solutions engineering team. We'll walk through your production topologies, circuit breaker configurations, and private network deployment options.
            </p>
          </div>
          
          <div class="lg:col-span-7 bg-[#101216] border border-[#292D34] rounded-xl p-8 shadow-2xl flex flex-col gap-6">
            
            <div class="flex flex-col gap-3 font-sans text-xs">
              <span class="text-[11px] font-mono uppercase tracking-wider text-[#A1A5AD]">Select Date</span>
              <div class="grid grid-cols-3 gap-3">
                <button class="calendar-day-btn p-3 border border-[#292D34] bg-[#15181D] rounded-lg text-white font-medium hover:border-white/40 transition-all text-center text-xs" data-val="Aug 20">Aug 20 (Thu)</button>
                <button class="calendar-day-btn p-3 border border-white bg-white text-black font-semibold rounded-lg transition-all text-center text-xs" data-val="Aug 21">Aug 21 (Fri)</button>
                <button class="calendar-day-btn p-3 border border-[#292D34] bg-[#15181D] rounded-lg text-white font-medium hover:border-white/40 transition-all text-center text-xs" data-val="Aug 24">Aug 24 (Mon)</button>
              </div>
            </div>

            <div class="flex flex-col gap-3 font-sans text-xs">
              <span class="text-[11px] font-mono uppercase tracking-wider text-[#A1A5AD]">Select Time Slot (EST)</span>
              <div class="grid grid-cols-4 gap-3">
                <button class="calendar-time-btn p-2.5 border border-[#292D34] bg-[#15181D] rounded-lg text-white font-medium hover:border-white/40 transition-all text-center text-xs">10:00 AM</button>
                <button class="calendar-time-btn p-2.5 border border-white bg-white text-black font-semibold rounded-lg transition-all text-center text-xs">11:30 AM</button>
                <button class="calendar-time-btn p-2.5 border border-[#292D34] bg-[#15181D] rounded-lg text-white font-medium hover:border-white/40 transition-all text-center text-xs">02:00 PM</button>
                <button class="calendar-time-btn p-2.5 border border-[#292D34] bg-[#15181D] rounded-lg text-white font-medium hover:border-white/40 transition-all text-center text-xs">04:30 PM</button>
              </div>
            </div>
            
            <button id="confirm-demo-btn" class="w-full py-3.5 bg-white hover:bg-neutral-200 text-black font-semibold rounded-lg text-xs tracking-wider transition-all shadow-sm mt-2">
              Confirm Reservation →
            </button>
          </div>

        </section>
      </div>
    </div>
  `;
}

export function bindBookDemo() {
  const days = document.querySelectorAll(".calendar-day-btn");
  const times = document.querySelectorAll(".calendar-time-btn");

  days.forEach(btn => {
    btn.addEventListener("click", () => {
      days.forEach(x => {
        x.className = "calendar-day-btn p-3 border border-[#292D34] bg-[#15181D] rounded-lg text-white font-medium hover:border-white/40 transition-all text-center text-xs";
      });
      btn.className = "calendar-day-btn p-3 border border-white bg-white text-black font-semibold rounded-lg transition-all text-center text-xs";
    });
  });

  times.forEach(btn => {
    btn.addEventListener("click", () => {
      times.forEach(x => {
        x.className = "calendar-time-btn p-2.5 border border-[#292D34] bg-[#15181D] rounded-lg text-white font-medium hover:border-white/40 transition-all text-center text-xs";
      });
      btn.className = "calendar-time-btn p-2.5 border border-white bg-white text-black font-semibold rounded-lg transition-all text-center text-xs";
    });
  });

  document.getElementById("confirm-demo-btn")?.addEventListener("click", () => {
    components.renderToast("success", "Demo confirmed! Calendar invitation has been dispatched to your email.");
  });
}

export default {
  bookDemo,
  bindBookDemo
};
