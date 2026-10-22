// AUTH PAGE: resetPassword
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function resetPassword() {
  // Try to parse email from query parameter
  const urlParams = new URLSearchParams(window.location.search);
  const emailVal = urlParams.get("email") || "";

  return `
    <div class="flex flex-col gap-6 font-sans animate-fade-in-up max-w-md mx-auto">
      <div class="flex flex-col gap-1.5 select-none text-center sm:text-left">
        <span class="text-[9px] font-bold text-indigo-600 uppercase tracking-widest bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded self-center sm:self-start shadow-sm">
          Credentials Config
        </span>
        <h2 class="font-display font-black text-3xl text-slate-900 uppercase leading-none mt-1">Set Password</h2>
        <p class="text-xs text-slate-500 font-semibold font-medium">Enter your recovery verification code and set a new password.</p>
      </div>
      
      <form id="reset-form" class="flex flex-col gap-4 font-semibold text-xs text-slate-700">
        <div class="flex flex-col gap-1.5">
          <label class="text-[9px] uppercase tracking-wider text-slate-400">Email Address</label>
          <input id="reset-email" type="email" required value="${emailVal}" placeholder="sarah@cyberdyne.org" class="p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-[#161926] focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 outline-none transition-all duration-200 font-semibold text-xs text-slate-800" />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-[9px] uppercase tracking-wider text-slate-400">6-Digit Recovery Code</label>
          <input id="reset-otp" type="text" required placeholder="000000" maxlength="6" class="p-3.5 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-[#161926] focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 outline-none transition-all duration-200 font-mono font-bold text-sm tracking-wider text-slate-800 text-center" />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-[9px] uppercase tracking-wider text-slate-400">New Secure Password</label>
          <div class="relative">
            <input id="reset-pass" type="password" required placeholder="At least 8 characters" class="w-full p-3.5 pr-10 border border-slate-200 rounded-xl bg-slate-50/50 focus:bg-[#161926] focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100/50 outline-none transition-all duration-200 font-semibold text-xs text-slate-800" />
            <button type="button" id="reset-password-toggle" class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none p-1 text-sm select-none">👁️</button>
          </div>
        </div>
        
        <button type="submit" class="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-bold rounded-xl uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 mt-2">
          Save New Credentials
        </button>
      </form>
      
      <span class="text-xs text-slate-500 text-center mt-2 font-medium">
        <a href="/login" data-link class="text-indigo-600 font-bold hover:underline">&larr; Return to Login</a>
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
