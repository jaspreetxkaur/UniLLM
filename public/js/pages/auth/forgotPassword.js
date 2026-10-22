// AUTH PAGE: forgotPassword
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function forgotPassword() {
  return `
    <div class="flex flex-col gap-6 font-sans animate-fade-in-up max-w-md mx-auto">
      <div class="flex flex-col gap-1.5 select-none text-center sm:text-left">
        <span class="text-[9px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded self-center sm:self-start shadow-sm">
          Password Recovery
        </span>
        <h2 class="font-display font-black text-3xl text-slate-900 uppercase leading-none mt-1">Reset Access</h2>
        <p class="text-xs text-slate-500 font-semibold font-medium">We will generate security credentials reset logs for your email.</p>
      </div>

      <!-- DEV RECOVERY OTP DEBUG NOTIFICATION -->
      <div id="dev-recovery-alert" class="hidden p-3.5 bg-indigo-50 border border-indigo-150 rounded-xl text-xs text-indigo-800 font-medium">
        <div class="flex items-center gap-2">
          <span class="flex w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
          <span class="font-bold uppercase tracking-wider text-[9px]">Development / Demo Mode OTP</span>
        </div>
        <div class="mt-1 text-slate-700">
          Use recovery code <strong id="dev-recovery-code" class="font-mono text-indigo-700 bg-white border px-1.5 py-0.5 rounded text-sm tracking-widest">000000</strong> on the next screen.
        </div>
        <p class="mt-1.5 text-[9px] text-indigo-500 uppercase tracking-wider font-bold">
          Demo mode — email delivery will be connected in a future backend phase.
        </p>
      </div>
      
      <form id="forgot-form" class="flex flex-col gap-4 font-semibold text-xs text-slate-700">
        <div class="flex flex-col gap-1.5">
          <label class="text-[9px] uppercase tracking-wider text-slate-400">Email Address</label>
          <input id="forgot-email" type="email" required placeholder="sarah@cyberdyne.org" class="p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-[#161926] focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 outline-none transition-all duration-200 font-semibold text-xs text-slate-800" />
        </div>
        
        <button type="submit" class="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold rounded-xl uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 mt-2">
          Send Recovery Code
        </button>
      </form>
      
      <span class="text-xs text-slate-500 text-center mt-2 font-medium">
        <a href="/login" data-link class="text-indigo-600 font-bold hover:underline">&larr; Back to login</a>
      </span>
    </div>
  `;
}

export function bindForgotPassword() {
  const form = document.getElementById("forgot-form");
  const devAlert = document.getElementById("dev-recovery-alert");
  const devCode = document.getElementById("dev-recovery-code");

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("forgot-email").value;
    const submitBtn = form.querySelector("button[type='submit']");
    
    submitBtn.disabled = true;
    submitBtn.innerText = "TRANSMITTING CODE...";

    const res = await apiService.forgotPassword(email);
    submitBtn.disabled = false;
    submitBtn.innerText = "Send Recovery Code";

    if (res.success) {
      if (res.otp) {
        devAlert.classList.remove("hidden");
        devCode.innerText = res.otp;
        components.renderToast("success", `Recovery OTP generated: ${res.otp}`);
        
        setTimeout(() => {
          router.navigate(`/reset-password?email=${encodeURIComponent(email)}`);
        }, 1500);
      }
    } else {
      components.renderToast("error", res.message || "Failed to locate email address.");
    }
  });
}

export default {
  forgotPassword,
  bindForgotPassword
};
