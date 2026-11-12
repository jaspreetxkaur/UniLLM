// AUTH PAGE: resetPassword
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function resetPassword() {
  // Try to parse email from query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const emailVal = urlParams.get("email") || "";

  return `
    <div class="flex flex-col gap-6 font-sans animate-fade-in-up max-w-md mx-auto w-full text-left">
      <div class="flex flex-col gap-1.5 select-none">
        <span class="text-[9px] font-mono font-bold text-white uppercase tracking-widest bg-white/10 border border-white/20 px-2.5 py-0.5 rounded self-start">
          Credentials Config
        </span>
        <h2 class="font-sans font-bold text-2xl text-white tracking-tight mt-1">Set Password</h2>
        <p class="text-xs text-[#A1A5AD]">Enter your recovery verification code and set a new password.</p>
      </div>
      
      <form id="reset-form" class="flex flex-col gap-4 text-xs">
        <div class="flex flex-col gap-1.5">
          <label class="text-[10px] font-mono uppercase tracking-wider text-[#A1A5AD]">Email Address</label>
          <input id="reset-email" type="email" required value="${emailVal}" placeholder="sarah@cyberdyne.org" class="p-3.5 border border-[#292D34] rounded-xl bg-[#101216] focus:bg-[#15181D] focus:border-white/40 outline-none transition-all duration-200 text-xs text-white placeholder-[#A1A5AD]/40" />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-[10px] font-mono uppercase tracking-wider text-[#A1A5AD]">6-Digit Recovery Code</label>
          <input id="reset-otp" type="text" required placeholder="000000" maxlength="6" class="p-3.5 border border-[#292D34] rounded-xl bg-[#101216] focus:bg-[#15181D] focus:border-white/40 outline-none transition-all duration-200 font-mono font-bold text-sm tracking-wider text-white text-center" />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-[10px] font-mono uppercase tracking-wider text-[#A1A5AD]">New Secure Password</label>
          <div class="relative">
            <input id="reset-pass" type="password" required placeholder="At least 8 characters" class="w-full p-3.5 pr-10 border border-[#292D34] rounded-xl bg-[#101216] focus:bg-[#15181D] focus:border-white/40 outline-none transition-all duration-200 text-xs text-white placeholder-[#A1A5AD]/40" />
            <button type="button" id="reset-password-toggle" class="absolute right-3 top-1/2 -translate-y-1/2 text-[#A1A5AD] hover:text-white focus:outline-none p-1 text-sm select-none">👁️</button>
          </div>
        </div>
        
        <button type="submit" class="w-full py-3.5 bg-white hover:bg-neutral-200 text-black font-semibold text-xs rounded-xl transition-all duration-200 shadow-md hover:shadow-lg mt-2 flex items-center justify-center gap-1.5 group">
          Save New Credentials
          <span class="transition-transform group-hover:translate-x-1 font-bold">→</span>
        </button>
      </form>
      
      <span class="text-xs text-[#A1A5AD] text-center mt-2 font-medium">
        <a href="/login" data-link class="text-white hover:underline">&larr; Return to Login</a>
      </span>
    </div>
  `;
}

export function bindResetPassword() {
  const form = document.getElementById("reset-form");

  // Password visibility toggle
  const pwdInput = document.getElementById("reset-pass");
  const pwdToggle = document.getElementById("reset-password-toggle");
  pwdToggle?.addEventListener("click", () => {
    if (pwdInput.type === "password") {
      pwdInput.type = "text";
      pwdToggle.innerText = "🔒";
    } else {
      pwdInput.type = "password";
      pwdToggle.innerText = "👁️";
    }
  });

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("reset-email").value;
    const otp = document.getElementById("reset-otp").value;
    const password = document.getElementById("reset-pass").value;
    
    if (password.length < 8) {
      components.renderToast("error", "Password must be at least 8 characters long.");
      return;
    }

    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.innerText = "SAVING NEW CREDENTIALS...";

    const res = await apiService.resetPassword(email, otp, password);
    submitBtn.disabled = false;
    submitBtn.innerText = "Save New Credentials";

    if (res.success) {
      components.renderToast("success", "Password updated successfully!");
      router.navigate("/login");
    } else {
      components.renderToast("error", res.message || "Failed to reset password.");
    }
  });
}

export default {
  resetPassword,
  bindResetPassword
};
