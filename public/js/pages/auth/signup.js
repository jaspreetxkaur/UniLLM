// AUTH PAGE: signup
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

let registeredEmail = "";

export function signup() {
  return `
    <div class="flex flex-col gap-6 font-sans animate-fade-in-up max-w-md mx-auto w-full">
      

      <!-- Header -->
      <div class="flex flex-col gap-1.5 select-none text-left">
        <span id="signup-badge" class="hidden text-[9px] font-mono uppercase tracking-widest text-[#38BDF8]">
          Developer Account
        </span>
        <h2 id="signup-title" class="font-sans font-bold text-2xl text-white tracking-tight">Create your account</h2>
        <p id="signup-subtitle" class="text-xs text-[#8E98B0]">It takes less than a minute.</p>
      </div>

      <!-- DEV OTP DEBUG NOTIFICATION -->
      <div id="dev-otp-alert" class="hidden p-3.5 bg-[#10121A] border border-[#38BDF8]/40 rounded-xl text-xs text-white font-medium">
        <div class="flex items-center gap-2">
          <span class="flex w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse"></span>
          <span class="font-bold uppercase tracking-wider text-[9px] text-[#38BDF8]">Development / Demo Mode OTP</span>
        </div>
        <div class="mt-1 text-[#8E98B0]">
          Use verification code <strong id="dev-otp-code" class="font-mono text-white bg-[#161926] border border-[#1F2438] px-1.5 py-0.5 rounded text-sm tracking-widest">000000</strong> to authenticate this demo workspace.
        </div>
        <p class="mt-1.5 text-[9px] text-[#8E98B0] uppercase tracking-wider font-mono">
          Demo mode — email delivery will be connected in a future backend phase.
        </p>
      </div>
      
      <!-- SIGNUP STEP 1: Registration Form -->
      <form id="signup-form" class="flex flex-col gap-4 text-xs">
        <div class="flex flex-col gap-1.5">
          <label class="text-[10px] font-mono uppercase tracking-wider text-[#8E98B0]">Full name</label>
          <div class="relative">
            <input id="signup-name" type="text" required placeholder="Sarah Connor" class="w-full p-3.5 pl-10 border border-[#1F2438] rounded-xl bg-[#10121A] focus:bg-[#161926] focus:border-[#38BDF8] outline-none transition-all duration-200 text-xs text-white placeholder-[#8E98B0]/40" />
            <svg class="w-4 h-4 text-[#8E98B0] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-[10px] font-mono uppercase tracking-wider text-[#8E98B0]">Email address</label>
          <div class="relative">
            <input id="signup-email" type="email" required placeholder="name@company.com" class="w-full p-3.5 pl-10 border border-[#1F2438] rounded-xl bg-[#10121A] focus:bg-[#161926] focus:border-[#38BDF8] outline-none transition-all duration-200 text-xs text-white placeholder-[#8E98B0]/40" />
            <svg class="w-4 h-4 text-[#8E98B0] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-[10px] font-mono uppercase tracking-wider text-[#8E98B0]">Password</label>
          <div class="relative">
            <input id="signup-password" type="password" required placeholder="••••••••" class="w-full p-3.5 pl-10 pr-10 border border-[#1F2438] rounded-xl bg-[#10121A] focus:bg-[#161926] focus:border-[#38BDF8] outline-none transition-all duration-200 text-xs text-white placeholder-[#8E98B0]/40" />
            <svg class="w-4 h-4 text-[#8E98B0] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
            <button type="button" id="signup-password-toggle" class="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E98B0] hover:text-white focus:outline-none p-1 text-sm select-none">👁️</button>
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-[10px] font-mono uppercase tracking-wider text-[#8E98B0]">Confirm password</label>
          <div class="relative">
            <input id="signup-confirm-password" type="password" required placeholder="••••••••" class="w-full p-3.5 pl-10 pr-10 border border-[#1F2438] rounded-xl bg-[#10121A] focus:bg-[#161926] focus:border-[#38BDF8] outline-none transition-all duration-200 text-xs text-white placeholder-[#8E98B0]/40" />
            <button type="button" id="signup-confirm-toggle" class="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#8E98B0] hover:text-white focus:outline-none p-1 text-sm select-none">👁️</button>
          </div>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-[10px] font-mono uppercase tracking-wider text-[#8E98B0]">Referral code <span class="text-[#8E98B0]/60 lowercase font-sans">(optional)</span></label>
          <input id="signup-referral" type="text" placeholder="EMP-XXXXXXXX" autocomplete="off" class="p-3.5 border border-[#1F2438] rounded-xl bg-[#10121A] focus:bg-[#161926] focus:border-[#38BDF8] outline-none transition-all duration-200 font-mono font-bold text-xs text-white uppercase tracking-widest placeholder-[#8E98B0]/40" />
        </div>

        <div id="signup-tier-wrap" class="flex flex-col gap-1.5">
          <label class="text-[10px] font-mono uppercase tracking-wider text-[#8E98B0]">Workspace Tier</label>
          <select id="signup-type" class="p-3.5 border border-[#1F2438] rounded-xl bg-[#10121A] focus:bg-[#161926] focus:border-[#38BDF8] outline-none text-white font-medium text-xs transition-all duration-200 cursor-pointer">
            <option value="individual" class="bg-[#10121A]">Free Developer Sandbox</option>
            <option value="team" class="bg-[#10121A]">Team Workspace Scope</option>
            <option value="business" class="bg-[#10121A]">Enterprise Dedicated Instance</option>
          </select>
        </div>

        <!-- Agreement -->
        <label class="flex items-start gap-2.5 cursor-pointer text-xs text-[#8E98B0] pt-1 select-none">
          <input type="checkbox" checked required class="w-3.5 h-3.5 mt-0.5 rounded bg-[#10121A] border-[#1F2438] accent-[#38BDF8] cursor-pointer" />
          <span>I agree to the <a href="/terms" data-link class="text-white underline hover:text-[#38BDF8]">Terms of Service</a> and <a href="/privacy" data-link class="text-white underline hover:text-[#38BDF8]">Privacy Policy</a></span>
        </label>
        
        <button type="submit" class="w-full py-3.5 bg-white hover:bg-slate-200 text-[#07080B] font-semibold text-sm rounded-xl transition-all duration-200 shadow-md hover:shadow-lg mt-2 flex items-center justify-center gap-1.5 group">
          Create Account
          <span class="transition-transform group-hover:translate-x-1 font-bold">→</span>
        </button>
      </form>

      <!-- SIGNUP STEP 2: OTP Verification Form (Hidden by default) -->
      <form id="signup-otp-form" class="hidden flex flex-col gap-5 text-xs">
        <p class="text-xs text-[#8E98B0] leading-relaxed text-center bg-[#10121A] p-3.5 border border-[#1F2438] rounded-xl">
          We have generated an authorization code for email: <span class="font-bold text-white font-mono" id="otp-target-email">...</span>
        </p>

        <div class="flex flex-col gap-1.5">
          <label class="text-[10px] font-mono uppercase tracking-wider text-[#8E98B0] block text-center">6-Digit Verification Code</label>
          <div class="flex justify-center gap-2">
            <input type="text" id="otp-val" required placeholder="000000" maxlength="6" class="w-40 tracking-[0.6em] text-center p-3 border border-[#1F2438] rounded-xl bg-[#10121A] focus:bg-[#161926] focus:border-[#38BDF8] outline-none transition-all duration-200 font-mono font-bold text-lg text-white" />
          </div>
        </div>

        <button type="submit" class="w-full py-3.5 bg-white hover:bg-slate-200 text-[#07080B] font-bold text-sm rounded-xl transition-all duration-200 shadow-md">
          Verify Security Code
        </button>

        <div class="flex justify-between items-center text-xs pt-2">
          <button type="button" id="signup-otp-back" class="text-[#8E98B0] hover:text-white font-medium">
            &larr; Change email
          </button>
          <button type="button" id="signup-otp-resend" class="text-[#38BDF8] hover:underline font-medium">
            Resend Code
          </button>
        </div>
      </form>
      
      <div id="signup-sso-wrap" class="flex flex-col gap-3">
        <!-- SSO Divider -->
        <div class="relative flex py-1 items-center text-[10px] text-[#8E98B0] font-mono select-none uppercase tracking-wider">
          <div class="flex-grow border-t border-[#1F2438]"></div>
          <span class="flex-shrink mx-4">Or continue with</span>
          <div class="flex-grow border-t border-[#1F2438]"></div>
        </div>
        
        <!-- Social SSO Buttons (Google, GitHub) -->
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
      </div>

      <span class="text-xs text-[#8E98B0] text-center mt-2">
        Already have an account? <a href="/login" data-link class="text-white font-medium hover:text-[#38BDF8] underline">Sign in</a>
      </span>
    </div>
  `;
}

export function bindSignup() {
  const signupForm = document.getElementById("signup-form");
  const otpForm = document.getElementById("signup-otp-form");
  const devAlert = document.getElementById("dev-otp-alert");
  const devCode = document.getElementById("dev-otp-code");
  const optTargetEmail = document.getElementById("otp-target-email");
  const referralInput = document.getElementById("signup-referral");
  const ssoWrap = document.getElementById("signup-sso-wrap");
  const presetRef = new URLSearchParams(window.location.search).get("ref");

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

  const applyEmployeeJoinMode = (code) => {
    if (!code) return;
    if (referralInput) referralInput.value = code.toUpperCase();
    const badge = document.getElementById("signup-badge");
    const title = document.getElementById("signup-title");
    const subtitle = document.getElementById("signup-subtitle");
    const tierWrap = document.getElementById("signup-tier-wrap");
    if (badge) badge.textContent = "Employee Join";
    if (title) title.textContent = "Join as employee";
    if (subtitle) subtitle.textContent = "Use your organization referral code to create an employee account.";
    if (tierWrap) tierWrap.classList.add("hidden");
  };

  if (presetRef) applyEmployeeJoinMode(presetRef);

  referralInput?.addEventListener("input", () => {
    referralInput.value = referralInput.value.toUpperCase();
    if (referralInput.value.trim()) applyEmployeeJoinMode(referralInput.value.trim());
  });

  // Password visibility toggle
  const pwdInput = document.getElementById("signup-password");
  const pwdToggle = document.getElementById("signup-password-toggle");
  pwdToggle?.addEventListener("click", () => {
    if (pwdInput.type === "password") {
      pwdInput.type = "text";
      pwdToggle.innerText = "🔒";
    } else {
      pwdInput.type = "password";
      pwdToggle.innerText = "👁️";
    }
  });

  // Confirm password visibility toggle
  const confirmInput = document.getElementById("signup-confirm-password");
  const confirmToggle = document.getElementById("signup-confirm-toggle");
  confirmToggle?.addEventListener("click", () => {
    if (confirmInput.type === "password") {
      confirmInput.type = "text";
      confirmToggle.innerText = "🔒";
    } else {
      confirmInput.type = "password";
      confirmToggle.innerText = "👁️";
    }
  });

  // Step 1: Sign up submit
  signupForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("signup-name").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("signup-confirm-password").value;
    const type = document.getElementById("signup-type").value;
    const referralCode = document.getElementById("signup-referral")?.value.trim() || "";
    
    // Client-side validations
    if (password.length < 8) {
      components.renderToast("error", "Password must be at least 8 characters long.");
      return;
    }
    if (!/[0-9]/.test(password) || !/[a-zA-Z]/.test(password)) {
      components.renderToast("error", "Password must contain both letters and numbers.");
      return;
    }
    if (password !== confirmPassword) {
      components.renderToast("error", "Passwords do not match.");
      return;
    }
    
    const submitBtn = signupForm.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.innerText = "DEPLOYING GATEWAY SPACE...";
    
    const res = await apiService.signup(name, email, password, type, referralCode);
    submitBtn.disabled = false;
    submitBtn.innerText = "Create Gateway Space";

    if (res.success) {
      registeredEmail = email;
      optTargetEmail.innerText = email;
      
      // Dynamic view transition
      signupForm.classList.add("hidden");
      ssoWrap?.classList.add("hidden");
      otpForm.classList.remove("hidden");
      
      // Render simulated OTP for demonstration
      if (res.otp) {
        devAlert.classList.remove("hidden");
        devCode.innerText = res.otp;
        components.renderToast("success", `Verification code printed in terminal: ${res.otp}`);
      }
    } else {
      components.renderToast("error", res.message || "Failed to deploy space.");
    }
  });

  // Step 2: OTP verification submit
  otpForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const otp = document.getElementById("otp-val").value;
    const submitBtn = otpForm.querySelector("button[type='submit']");
    
    submitBtn.disabled = true;
    submitBtn.innerText = "AUTHENTICATING...";

    const res = await apiService.verifyOtp(registeredEmail, otp);
    submitBtn.disabled = false;
    submitBtn.innerText = "Verify Security Code";

    if (res.success) {
      components.renderToast("success", res.user?.role === "Employee" ? "Employee account verified!" : "Sandbox workspace verified!");
      const returnUrl = sessionStorage.getItem("redirect_after_login");
      if (returnUrl && returnUrl !== "/login") {
        router.navigate(returnUrl);
      } else {
        router.navigate(res.user?.role === "Employee" ? "/app" : "/onboarding");
      }
    } else {
      components.renderToast("error", res.message || "Invalid or expired OTP code.");
    }
  });

  // Step 2: back to signup change email
  const backBtn = document.getElementById("signup-otp-back");
  backBtn?.addEventListener("click", () => {
    otpForm.classList.add("hidden");
    signupForm.classList.remove("hidden");
    ssoWrap?.classList.remove("hidden");
    devAlert.classList.add("hidden");
  });

  // Step 2: resend OTP code
  const resendBtn = document.getElementById("signup-otp-resend");
  resendBtn?.addEventListener("click", async () => {
    resendBtn.disabled = true;
    resendBtn.innerText = "Resending...";
    
    const name = document.getElementById("signup-name").value;
    const password = document.getElementById("signup-password").value;
    const type = document.getElementById("signup-type").value;
    const referralCode = document.getElementById("signup-referral")?.value.trim() || "";
    
    const res = await apiService.signup(name, registeredEmail, password, type, referralCode);
    resendBtn.disabled = false;
    resendBtn.innerText = "Resend Code";

    if (res.success && res.otp) {
      devCode.innerText = res.otp;
      components.renderToast("success", `New OTP generated: ${res.otp}`);
    } else {
      components.renderToast("error", "Error resending security code.");
    }
  });
}

export default {
  signup,
  bindSignup
};
