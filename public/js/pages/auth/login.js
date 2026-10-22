// AUTH PAGE: login
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

let unverifiedEmail = "";

export function login() {
  return `
    <div class="flex flex-col gap-6 font-sans animate-fade-in-up max-w-md mx-auto w-full">
      
      <!-- Header -->
      <div class="flex flex-col gap-1.5 select-none text-left">
        <h2 class="font-sans font-bold text-2xl text-white tracking-tight">Welcome back</h2>
        <p class="text-xs text-[#8E98B0]">Sign in to your UniLLM account</p>
      </div>

      <!-- DEV OTP DEBUG NOTIFICATION -->
      <div id="dev-login-otp-alert" class="hidden p-3.5 bg-[#10121A] border border-[#38BDF8]/40 rounded-xl text-xs text-white font-medium">
        <div class="flex items-center gap-2">
          <span class="flex w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse"></span>
          <span class="font-bold uppercase tracking-wider text-[9px] text-[#38BDF8]">Development / Demo Mode OTP</span>
        </div>
        <div class="mt-1 text-[#8E98B0]">
          Use verification code <strong id="dev-login-otp-code" class="font-mono text-white bg-[#161926] border border-[#1F2438] px-1.5 py-0.5 rounded text-sm tracking-widest">000000</strong> to verify your account.
        </div>
        <p class="mt-1.5 text-[9px] text-[#8E98B0] uppercase tracking-wider font-mono">
          Demo mode — email delivery will be connected in a future backend phase.
        </p>
      </div>
      
      <!-- LOGIN STEP 1: Credentials Form -->
      <form id="login-form" class="flex flex-col gap-4 text-xs">
        <div class="flex flex-col gap-1.5">
          <label class="text-[10px] font-mono uppercase tracking-wider text-[#8E98B0]">Email address</label>
          <div class="relative">
            <input id="login-email" type="email" required placeholder="name@company.com" class="w-full p-3.5 pl-10 border border-[#1F2438] rounded-xl bg-[#10121A] focus:bg-[#161926] focus:border-[#38BDF8] outline-none transition-all duration-200 text-xs text-white placeholder-[#8E98B0]/40" />
            <svg class="w-4 h-4 text-[#8E98B0] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-[10px] font-mono uppercase tracking-wider text-[#8E98B0]">Password</label>
          <div class="relative">
            <input id="login-password" type="password" required placeholder="••••••••" class="w-full p-3.5 pl-10 pr-10 border border-[#1F2438] rounded-xl bg-[#10121A] focus:bg-[#161926] focus:border-[#38BDF8] outline-none transition-all duration-200 text-xs text-white placeholder-[#8E98B0]/40" />
            <svg class="w-4 h-4 text-[#8E98B0] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            <button type="button" id="login-password-toggle" class="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E98B0] hover:text-white focus:outline-none p-1 text-sm select-none">👁️</button>
          </div>
        </div>

        <div class="flex items-center justify-between text-xs pt-0.5">
          <label class="flex items-center gap-2 cursor-pointer text-[#8E98B0] hover:text-white select-none">
            <input type="checkbox" checked class="w-3.5 h-3.5 rounded bg-[#10121A] border-[#1F2438] accent-[#38BDF8] focus:ring-0 cursor-pointer" />
            <span>Remember me</span>
          </label>
          <a href="/forgot-password" data-link class="text-xs text-[#8E98B0] hover:text-[#38BDF8] transition-colors">Forgot password?</a>
        </div>
        
        <button type="submit" class="w-full py-3.5 bg-white hover:bg-slate-200 text-[#07080B] font-semibold text-sm rounded-xl transition-all duration-200 shadow-md hover:shadow-lg mt-2 flex items-center justify-center gap-1.5 group">
          Sign In
          <span class="transition-transform group-hover:translate-x-1 font-bold">→</span>
        </button>
      </form>

      <!-- LOGIN STEP 2: Pending Account Verification Form -->
      <form id="login-otp-form" class="hidden flex flex-col gap-5 text-xs">
        <p class="text-xs text-[#8E98B0] leading-relaxed text-center bg-[#10121A] p-3.5 border border-[#1F2438] rounded-xl">
          Your account is registered but not verified. Enter code sent to <span class="font-bold text-white font-mono" id="login-otp-target-email">...</span>
        </p>

        <div class="flex flex-col gap-1.5">
          <label class="text-[10px] font-mono uppercase tracking-wider text-[#8E98B0] block text-center">6-Digit Verification Code</label>
          <div class="flex justify-center gap-2">
            <input type="text" id="login-otp-val" required placeholder="000000" maxlength="6" class="w-40 tracking-[0.6em] text-center p-3 border border-[#1F2438] rounded-xl bg-[#10121A] focus:bg-[#161926] focus:border-[#38BDF8] outline-none transition-all duration-200 font-mono font-bold text-lg text-white" />
          </div>
        </div>

        <button type="submit" class="w-full py-3.5 bg-white hover:bg-slate-200 text-[#07080B] font-bold text-sm rounded-xl transition-all duration-200 shadow-md">
          Verify and Activate Account
        </button>

        <div class="flex justify-between items-center text-xs pt-2">
          <button type="button" id="login-otp-back" class="text-[#8E98B0] hover:text-white font-medium">
            &larr; Return to Login
          </button>
          <button type="button" id="login-otp-resend" class="text-[#38BDF8] hover:underline font-medium">
            Resend Code
          </button>
        </div>
      </form>
      
      <!-- SSO Divider -->
      <div class="relative flex py-1 items-center text-[10px] text-[#8E98B0] font-mono select-none uppercase tracking-wider">
        <div class="flex-grow border-t border-[#1F2438]"></div>
        <span class="flex-shrink mx-4">Or continue with</span>
        <div class="flex-grow border-t border-[#1F2438]"></div>
      </div>
      
      <!-- Social SSO Buttons (Google, GitHub, Microsoft) -->
      <div class="grid grid-cols-2 gap-3 select-none text-xs">
        <a href="/api/auth/oauth/google" class="flex items-center justify-center gap-2.5 py-3 border border-[#1F2438] rounded-xl hover:bg-[#161926] hover:border-[#38BDF8]/40 transition-all bg-[#10121A] text-white shadow-sm cursor-pointer no-underline">
          <svg class="w-4 h-4" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/></svg>
          Google
        </a>
        <a href="/api/auth/oauth/github" class="flex items-center justify-center gap-2.5 py-3 border border-[#1F2438] rounded-xl hover:bg-[#161926] hover:border-[#38BDF8]/40 transition-all bg-[#10121A] text-white shadow-sm cursor-pointer no-underline">
          <svg class="w-4 h-4 fill-white" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
          GitHub
        </a>
      </div>
      
      <span class="text-xs text-[#8E98B0] text-center mt-2">
        Don't have an account? <a href="/signup" data-link class="text-white font-medium hover:text-[#38BDF8] underline">Create one</a>
      </span>
    </div>
  `;
}

export function bindLogin() {
  const loginForm = document.getElementById("login-form");
  const otpForm = document.getElementById("login-otp-form");
  const devAlert = document.getElementById("dev-login-otp-alert");
  const devCode = document.getElementById("dev-login-otp-code");
  const otpTargetEmail = document.getElementById("login-otp-target-email");

  // Check URL query parameters for OAuth error redirects or intended destination
  const urlParams = new URLSearchParams(window.location.search);
  const redirectParam = urlParams.get("redirect");
  if (redirectParam) {
    sessionStorage.setItem("redirect_after_login", redirectParam);
  }
  const oauthError = urlParams.get("error");
  if (oauthError) {
    components.renderToast("error", decodeURIComponent(oauthError));
    window.history.replaceState({}, document.title, window.location.pathname);
  }

  // Password visibility toggle
  const pwdInput = document.getElementById("login-password");
  const pwdToggle = document.getElementById("login-password-toggle");
  pwdToggle?.addEventListener("click", () => {
    if (pwdInput.type === "password") {
      pwdInput.type = "text";
      pwdToggle.innerText = "🔒";
    } else {
      pwdInput.type = "password";
      pwdToggle.innerText = "👁️";
    }
  });

  // Step 1: Submit Credentials
  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("login-email").value;
    const pass = document.getElementById("login-password").value;
    
    const submitBtn = loginForm.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.innerText = "VERIFYING SECURITY...";
    
    const res = await apiService.login(email, pass);
    submitBtn.disabled = false;
    submitBtn.innerText = "Authenticate Credentials";

    if (res.success) {
      components.renderToast("success", `Welcome back, ${res.user.name}`);
      const returnUrl = sessionStorage.getItem("redirect_after_login");
      if (returnUrl && returnUrl !== "/login") {
        sessionStorage.removeItem("redirect_after_login");
        router.navigate(returnUrl);
      } else {
        router.navigate("/app");
      }
    } else if (res.requireOtp) {
      // Account is pending OTP verification
      unverifiedEmail = email;
      otpTargetEmail.innerText = email;
      
      loginForm.classList.add("hidden");
      otpForm.classList.remove("hidden");
      
      if (res.otp) {
        devAlert.classList.remove("hidden");
        devCode.innerText = res.otp;
        components.renderToast("success", `Account pending verification. Code: ${res.otp}`);
      }
    } else {
      components.renderToast("error", res.message || "Access denied. Check credentials.");
    }
  });

  // Step 2: Submit OTP code verification
  otpForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const otp = document.getElementById("login-otp-val").value;
    const submitBtn = otpForm.querySelector("button[type='submit']");
    
    submitBtn.disabled = true;
    submitBtn.innerText = "ACTIVATING SANDBOX...";

    const res = await apiService.verifyOtp(unverifiedEmail, otp);
    submitBtn.disabled = false;
    submitBtn.innerText = "Verify and Activate Account";

    if (res.success) {
      components.renderToast("success", "Account verified and active!");
      const returnUrl = sessionStorage.getItem("redirect_after_login");
      if (returnUrl && returnUrl !== "/login") {
        sessionStorage.removeItem("redirect_after_login");
        router.navigate(returnUrl);
      } else {
        router.navigate("/app");
      }
    } else {
      components.renderToast("error", res.message || "Invalid verification code.");
    }
  });

  // Step 2: back to login
  const backBtn = document.getElementById("login-otp-back");
  backBtn?.addEventListener("click", () => {
    otpForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
    devAlert.classList.add("hidden");
  });

  // Step 2: resend OTP code for login
  const resendBtn = document.getElementById("login-otp-resend");
  resendBtn?.addEventListener("click", async () => {
    resendBtn.disabled = true;
    resendBtn.innerText = "Resending...";
    
    // Call forgot-password backend endpoint to re-generate OTP for verification
    const res = await apiService.forgotPassword(unverifiedEmail);
    resendBtn.disabled = false;
    resendBtn.innerText = "Resend Code";

    if (res.success && res.otp) {
      devCode.innerText = res.otp;
      components.renderToast("success", `New OTP generated: ${res.otp}`);
    } else {
      components.renderToast("error", "Error re-generating security code.");
    }
  });
}

export default {
  login,
  bindLogin
};
