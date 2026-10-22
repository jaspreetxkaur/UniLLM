// PUBLIC PAGE: bookDemo
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function bookDemo() {
    return `
      <div class="relative overflow-hidden w-full">
        <div class="absolute top-[10%] right-[5%] w-[500px] h-[500px] rounded-full blur-[150px] ambient-glow-3 -z-10"></div>

        <div class="relative w-full overflow-hidden">
          <section class="px-6 lg:px-12 py-16 md:py-28 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start animate-fade-in-up">
            <div class="lg:col-span-5 flex flex-col gap-6 select-none">
              <span class="text-[10px] font-bold text-brand-primary tracking-widest uppercase bg-indigo-50 border border-indigo-150 px-3 py-1 rounded-full self-start shadow-sm font-bold">Interactive Demo</span>
              <h2 class="font-display font-black text-5xl text-brand-text tracking-tight uppercase leading-none">RESERVE A MEETING<br>SLOT INSTANTLY.</h2>
              <p class="text-xs text-brand-muted leading-relaxed font-semibold">
                Select a convenient slot on our interactive timeline to speak with our core gateway solutions engineering team.
              </p>
            </div>
            
            <div class="lg:col-span-7 bg-white border border-brand-border rounded-xl p-8 shadow-sm flex flex-col gap-6 select-none">
              <div class="flex flex-col gap-3 font-semibold text-xs text-brand-text">
                <span class="text-[10px] uppercase font-bold tracking-wider text-brand-muted/70">Select Date Slot</span>
                <div class="grid grid-cols-3 gap-3">
                  <button class="calendar-day-btn p-3 border rounded-lg hover:border-brand-primary transition-all text-center" data-val="Aug 20">Aug 20 (Thu)</button>
                  <button class="calendar-day-btn p-3 border rounded-lg hover:border-brand-primary transition-all text-center border-brand-primary bg-indigo-50/20 text-brand-primary font-bold" data-val="Aug 21">Aug 21 (Fri)</button>
                  <button class="calendar-day-btn p-3 border rounded-lg hover:border-brand-primary transition-all text-center" data-val="Aug 24">Aug 24 (Mon)</button>
                </div>
              </div>

              <div class="flex flex-col gap-3 font-semibold text-xs text-brand-text">
                <span class="text-[10px] uppercase font-bold tracking-wider text-brand-muted/70">Select Time Slot (EST)</span>
                <div class="grid grid-cols-4 gap-3">
                  <button class="calendar-time-btn p-2 border rounded-lg hover:border-brand-primary transition-all text-center">10:00 AM</button>
                  <button class="calendar-time-btn p-2 border rounded-lg hover:border-brand-primary transition-all text-center border-brand-primary bg-indigo-50/20 text-brand-primary font-bold">11:30 AM</button>
                  <button class="calendar-time-btn p-2 border rounded-lg hover:border-brand-primary transition-all text-center">02:00 PM</button>
                  <button class="calendar-time-btn p-2 border rounded-lg hover:border-brand-primary transition-all text-center">04:30 PM</button>
                </div>
              </div>
              
              <button id="confirm-demo-btn" class="w-full py-3.5 bg-brand-primary hover:bg-indigo-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider mt-2 shadow-sm">
                CONFIRM RESERVATION
              </button>
            </div>
          </section>
        </div>
      </div>
    `;
  };

export function bindBookDemo() {
    const days = document.querySelectorAll(".calendar-day-btn");
    const times = document.querySelectorAll(".calendar-time-btn");

    days.forEach(btn => {
      btn.addEventListener("click", () => {
        days.forEach(x => {
          x.classList.remove("border-brand-primary", "bg-indigo-50/20", "text-brand-primary", "font-bold");
        });
        btn.classList.add("border-brand-primary", "bg-indigo-50/20", "text-brand-primary", "font-bold");
      });
    });

    times.forEach(btn => {
      btn.addEventListener("click", () => {
        times.forEach(x => {
          x.classList.remove("border-brand-primary", "bg-indigo-50/20", "text-brand-primary", "font-bold");
        });
        btn.classList.add("border-brand-primary", "bg-indigo-50/20", "text-brand-primary", "font-bold");
      });
    });

    const confirmBtn = document.getElementById("confirm-demo-btn");
    confirmBtn?.addEventListener("click", () => {
      components.renderToast("success", "Demo reservation confirmed. Check your email inbox.");
    });
  };

export default {
  bookDemo,
  bindBookDemo
};
