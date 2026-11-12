// AUTH PAGE: onboarding
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function onboarding() {
    const user = apiService.getCurrentUser();
    const defaultOrgName = (user && user.org) ? user.org : "Cyberdyne Systems";
    return `
      <div class="flex flex-col gap-8 font-sans max-w-lg mx-auto bg-[#101216] border border-[#292D34] rounded-2xl p-8 shadow-2xl select-none animate-fade-in-up text-left">
        <div class="flex flex-col gap-1.5">
          <span class="text-[9px] font-mono font-bold text-white uppercase tracking-widest bg-white/10 border border-white/20 px-2 py-0.5 rounded self-start">Workspace Onboarding</span>
          <h2 class="font-sans font-bold text-2xl text-white tracking-tight mt-1">Initialize Space</h2>
          <p class="text-xs text-[#A1A5AD]">Complete steps to configure your developer sandbox access credentials.</p>
        </div>
        
        <!-- Step Indicators -->
        <div class="flex justify-between items-center text-[10px] font-mono font-bold text-[#A1A5AD] uppercase tracking-wider border-b border-[#292D34] pb-4">
          <span id="step-lbl-1" class="text-white">1. Org Title</span>
          <span>&rarr;</span>
          <span id="step-lbl-2">2. Region</span>
          <span>&rarr;</span>
          <span id="step-lbl-3">3. Credentials</span>
        </div>
        
        <div class="min-h-40 flex flex-col justify-center">
          <!-- Step 1 Pane -->
          <div id="pane-step-1" class="flex flex-col gap-4 text-xs text-white">
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-mono uppercase tracking-wider text-[#A1A5AD]">Organization Name</label>
              <input type="text" id="ob-org" value="${defaultOrgName}" class="p-3 border border-[#292D34] rounded-xl bg-[#15181D] focus:border-white/40 outline-none text-xs text-white" />
            </div>
            <p class="text-[11px] text-[#A1A5AD] leading-relaxed">This acts as the unique namespace header for your API calls and key tracking catalogs.</p>
          </div>
          
          <!-- Step 2 Pane (Hidden) -->
          <div id="pane-step-2" class="hidden flex flex-col gap-4 text-xs text-white">
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-mono uppercase tracking-wider text-[#A1A5AD]">Default Server Region</label>
              <select id="ob-region" class="p-3 border border-[#292D34] rounded-xl bg-[#15181D] focus:border-white/40 outline-none text-white font-medium text-xs">
                <option value="us-east">US East (N. Virginia)</option>
                <option value="eu-west">EU West (Frankfurt)</option>
                <option value="ap-south">AP South (Mumbai)</option>
              </select>
            </div>
            <p class="text-[11px] text-[#A1A5AD] leading-relaxed">We recommend selecting regions closest to your product deployment servers to achieve minimal proxy latencies.</p>
          </div>
          
          <!-- Step 3 Pane (Hidden) -->
          <div id="pane-step-3" class="hidden flex flex-col gap-4 text-xs text-white">
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-mono uppercase tracking-wider text-[#A1A5AD]">Default Model Enablement</label>
              <div class="flex flex-col gap-2 bg-[#15181D] border border-[#292D34] rounded-xl p-3">
                <label class="flex items-center gap-2.5 cursor-pointer text-white">
                  <input type="checkbox" checked class="rounded accent-white" />
                  <span>OpenAI endpoints</span>
                </label>
                <label class="flex items-center gap-2.5 cursor-pointer text-white">
                  <input type="checkbox" checked class="rounded accent-white" />
                  <span>Anthropic endpoints</span>
                </label>
                <label class="flex items-center gap-2.5 cursor-pointer text-white">
                  <input type="checkbox" checked class="rounded accent-white" />
                  <span>Groq model servers</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div class="flex justify-between items-center pt-4 border-t border-[#292D34]">
          <button id="ob-back" class="hidden text-xs font-semibold text-[#A1A5AD] hover:text-white uppercase tracking-wider">Back</button>
          <div class="flex-grow"></div>
          <button id="ob-next" class="px-6 py-2.5 bg-white hover:bg-neutral-200 text-black font-semibold text-xs rounded-xl uppercase tracking-wider shadow-sm">
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

      l1.className = currentStep >= 1 ? "text-white" : "";
      l2.className = currentStep >= 2 ? "text-white" : "";
      l3.className = currentStep >= 3 ? "text-white" : "";
    };

    back?.addEventListener("click", () => {
      if (currentStep > 1) {
        currentStep--;
        updateView();
      }
    });

    next?.addEventListener("click", async () => {
      if (currentStep < 3) {
        currentStep++;
        updateView();
      } else {
        const orgInput = document.getElementById("ob-org");
        const newOrgName = orgInput ? orgInput.value.trim() : "";
        if (newOrgName) {
          try {
            await apiService.updateProfile({ orgName: newOrgName });
          } catch (e) {}
        }
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
