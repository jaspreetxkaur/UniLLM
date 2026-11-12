// AUTH PAGE: forgotPassword
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function forgotPassword() {
  return `
    <div class="flex flex-col gap-6 font-sans animate-fade-in-up max-w-md mx-auto w-full text-left">
      <div class="flex flex-col gap-1.5 select-none">
        <span class="text-[9px] font-mono font-bold text-white uppercase tracking-widest bg-white/10 border border-white/20 px-2.5 py-0.5 rounded self-start">
          Password Recovery
        </span>
        <h2 class="font-sans font-bold text-2xl text-white tracking-tight mt-1">Reset Access</h2>
        <p class="text-xs text-[#A1A5AD]">We will generate a security recovery code for your account.</p>
      </div>

      <!-- DEV RECOVERY OTP DEBUG NOTIFICATION -->
      <div id="dev-recovery-alert" class="hidden p-3.5 bg-[#15181D] border border-white/20 rounded-xl text-xs text-white font-medium">
        <div class="flex items-center gap-2">
          <span class="flex w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span class="font-bold uppercase tracking-wider text-[9px] text-white">Development / Demo Mode OTP</span>
        </div>
        <div class="mt-1 text-[#A1A5AD]">
          Use recovery code <strong id="dev-recovery-code" class="font-mono text-white bg-[#101216] border border-[#292D34] px-1.5 py-0.5 rounded text-sm tracking-widest">000000</strong> on the next screen.
        </div>
        <p class="mt-1.5 text-[9px] text-[#A1A5AD]/80 uppercase tracking-wider font-mono">
          Demo mode — email delivery will be connected in a future backend phase.
        </p>
      </div>
      
      <form id="forgot-form" class="flex flex-col gap-4 text-xs">
        <div class="flex flex-col gap-1.5">
          <label class="text-[10px] font-mono uppercase tracking-wider text-[#A1A5AD]">Email Address</label>
          <input id="forgot-email" type="email" required placeholder="sarah@cyberdyne.org" class="p-3.5 border border-[#292D34] rounded-xl bg-[#101216] focus:bg-[#15181D] focus:border-white/40 outline-none transition-all duration-200 text-xs text-white placeholder-[#A1A5AD]/40" />
        </div>
        
        <button type="submit" class="w-full py-3.5 bg-white hover:bg-neutral-200 text-black font-semibold text-xs rounded-xl transition-all duration-200 shadow-md hover:shadow-lg mt-2 flex items-center justify-center gap-1.5 group">
          Send Recovery Code
          <span class="transition-transform group-hover:translate-x-1 font-bold">→</span>
        </button>
      </form>
      
      <span class="text-xs text-[#A1A5AD] text-center mt-2 font-medium">
        <a href="/login" data-link class="text-white hover:underline">&larr; Back to login</a>
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
