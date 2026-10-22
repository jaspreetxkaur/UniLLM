// AUTH PAGE: onboarding
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function onboarding() {
    return `
      <div class="flex flex-col gap-8 font-sans max-w-lg mx-auto bg-white border border-brand-border rounded-xl p-8 shadow-premium select-none animate-fade-in-up">
        <div class="flex flex-col gap-1.5">
          <span class="text-[9px] font-bold text-brand-primary uppercase tracking-widest">Workspace Onboarding</span>
          <h2 class="font-display font-black text-2xl text-brand-text uppercase leading-none">Initialize Space</h2>
          <p class="text-xs text-brand-muted font-semibold font-bold">Complete steps to configure your developer sandbox access credentials.</p>
        </div>
        
        <!-- Step Indicators -->
        <div class="flex justify-between items-center text-[10px] font-bold text-brand-muted uppercase tracking-wider border-b border-brand-border/60 pb-4">
          <span id="step-lbl-1" class="text-brand-primary">1. Org Title</span>
          <span>&rarr;</span>
          <span id="step-lbl-2">2. Region</span>
          <span>&rarr;</span>
          <span id="step-lbl-3">3. Credentials</span>
        </div>
        
        <div class="min-h-40 flex flex-col justify-center">
          <!-- Step 1 Pane -->
          <div id="pane-step-1" class="flex flex-col gap-4 font-semibold text-xs text-brand-text">
            <div class="flex flex-col gap-1.5">
              <label class="text-[9px] uppercase tracking-wider">Organization Name</label>
              <input type="text" id="ob-org" value="Cyberdyne Systems" class="p-3 border border-brand-border rounded-lg bg-brand-bg/40 focus:bg-[#161926] focus:border-brand-primary outline-none font-semibold text-xs" />
            </div>
            <p class="text-[11px] text-brand-muted leading-relaxed font-semibold">This acts as the unique namespace header for your API calls and key tracking catalogs.</p>
          </div>
          
          <!-- Step 2 Pane (Hidden) -->
          <div id="pane-step-2" class="hidden flex flex-col gap-4 font-semibold text-xs text-brand-text">
            <div class="flex flex-col gap-1.5">
              <label class="text-[9px] uppercase tracking-wider">Default Server Region</label>
              <select id="ob-region" class="p-3 border border-brand-border rounded-lg bg-brand-bg/40 focus:bg-[#161926] focus:border-brand-primary outline-none font-bold text-xs">
                <option value="us-east">US East (N. Virginia)</option>
                <option value="eu-west">EU West (Frankfurt)</option>
                <option value="ap-south">AP South (Mumbai)</option>
              </select>
            </div>
            <p class="text-[11px] text-brand-muted leading-relaxed font-semibold">We recommend selecting regions closest to your product deployment servers to achieve minimal proxy latencies.</p>
          </div>
          
          <!-- Step 3 Pane (Hidden) -->
          <div id="pane-step-3" class="hidden flex flex-col gap-4 font-semibold text-xs text-brand-text">
            <div class="flex flex-col gap-1.5">
              <label class="text-[9px] uppercase tracking-wider">Default Model Enablement</label>
              <div class="flex flex-col gap-2 bg-brand-bg/40 border rounded-lg p-3">
                <label class="flex items-center gap-2.5 cursor-pointer font-bold">
                  <input type="checkbox" checked class="rounded text-brand-primary" />
                  <span>OpenAI endpoints</span>
                </label>
                <label class="flex items-center gap-2.5 cursor-pointer font-bold">
                  <input type="checkbox" checked class="rounded text-brand-primary" />
                  <span>Anthropic endpoints</span>
                </label>
                <label class="flex items-center gap-2.5 cursor-pointer font-bold">
                  <input type="checkbox" checked class="rounded text-brand-primary" />
                  <span>Groq model servers</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-between items-center pt-4 border-t border-brand-border/60">
          <button id="ob-back" class="hidden text-xs font-bold text-brand-muted hover:text-brand-text uppercase tracking-wider">Back</button>
          <div class="flex-grow"></div>
          <button id="ob-next" class="px-6 py-2.5 bg-brand-primary hover:bg-indigo-700 text-white font-bold text-xs rounded-lg uppercase tracking-wider shadow-sm">
            Next Step
          </button>
        </div>
      </div>
    `;
  };

export function bindOnboarding() {
    let currentStep = 1;
    const back = document.getElementById("ob-back");
    const next = document.getElementById("ob-next");
    const p1 = document.getElementById("pane-step-1");
    const p2 = document.getElementById("pane-step-2");
    const p3 = document.getElementById("pane-step-3");
    
    const l1 = document.getElementById("step-lbl-1");
    const l2 = document.getElementById("step-lbl-2");
    const l3 = document.getElementById("step-lbl-3");

    const updateView = () => {
      p1.classList.add("hidden");
      p2.classList.add("hidden");
      p3.classList.add("hidden");
      if (currentStep === 1) p1.classList.remove("hidden");
      else if (currentStep === 2) p2.classList.remove("hidden");
      else if (currentStep === 3) p3.classList.remove("hidden");

      if (currentStep === 1) back.classList.add("hidden");
      else back.classList.remove("hidden");

      if (currentStep === 3) next.innerText = "FINISH DEPLOYMENT";
      else next.innerText = "Next Step";

      l1.className = currentStep >= 1 ? "text-brand-primary" : "";
      l2.className = currentStep >= 2 ? "text-brand-primary" : "";
      l3.className = currentStep >= 3 ? "text-brand-primary" : "";
    };

    back?.addEventListener("click", () => {
      if (currentStep > 1) {
        currentStep--;
        updateView();
      }
    });

    next?.addEventListener("click", () => {
      if (currentStep < 3) {
        currentStep++;
        updateView();
      } else {
        components.renderToast("success", "Workspace proxy deployed successfully!");
        const returnUrl = sessionStorage.getItem("redirect_after_login");
        if (returnUrl && returnUrl !== "/login") {
          sessionStorage.removeItem("redirect_after_login");
          router.navigate(returnUrl);
        } else {
          router.navigate("/app");
        }
      }
    });
  };

export default {
  onboarding,
  bindOnboarding
};
