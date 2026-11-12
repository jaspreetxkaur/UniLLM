// ADMIN PAGE: policies
import { apiService, extractErrorMessage } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function adminPolicies() {
    return `
      <div class="flex flex-col gap-6 animate-fade-in-up font-sans">
        <div class="flex justify-between items-center select-none">
          <div class="flex flex-col gap-1">
            <h1 class="font-display font-black text-2xl text-white tracking-tight uppercase">GOVERNANCE POLICY BUILDER</h1>
            <p class="text-xs text-[#A1A5AD] font-semibold">Define logic conditions to automatically route prompts, enforce fallback sequences, or match models.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-5 flex flex-col gap-4 font-semibold text-xs select-none">
            <h3 class="font-bold text-xs text-white uppercase tracking-wider border-b border-[#292D34] pb-3 mb-1">Active Rules List</h3>
            <div id="policies-rules-container" class="flex flex-col gap-3">
              <div class="p-8 text-center text-[#A1A5AD] font-mono text-xs">Loading routing policies from database...</div>
            </div>
          </div>
          
          <div class="lg:col-span-7 bg-[#101216] border border-[#292D34] rounded-xl p-6 shadow-sm flex flex-col gap-5">
            <h3 class="font-bold text-xs text-white uppercase tracking-wider border-b border-[#292D34] pb-3 select-none">Workspace Policy Rule sheet</h3>
            
            <form id="policy-builder-form" class="flex flex-col gap-4 font-semibold text-xs text-white">
              <div class="flex flex-col gap-1.5">
                <label class="text-[9px] font-bold uppercase tracking-wider text-[#A1A5AD] select-none">Policy Rule Title</label>
                <input type="text" id="policy-title" required value="Code Assistant Router" placeholder="e.g. Code Assistant Router" class="p-3 border border-[#292D34] rounded-lg bg-[#15181D] text-white placeholder-[#A1A5AD]/50 focus:border-white outline-none" />
              </div>

              <div class="flex flex-col gap-1.5">
                <label class="text-[9px] font-bold uppercase tracking-wider text-[#A1A5AD] select-none">Evaluation Priority (1 = Highest, 100 = Lower)</label>
                <input type="number" id="policy-priority" required value="10" min="1" max="1000" class="p-2.5 border border-[#292D34] rounded-lg bg-[#15181D] text-white focus:border-white outline-none font-mono" />
              </div>

              <div class="flex flex-col gap-3 bg-[#15181D] border border-[#292D34] rounded-lg p-4 select-none">
                <div class="flex flex-wrap items-center gap-3">
                  <span class="font-black text-white">IF</span>
                  <select id="policy-field" class="p-2 border border-[#292D34] rounded bg-[#101216] text-white font-semibold text-xs outline-none focus:border-white cursor-pointer">
                    <option value="keyword" class="bg-[#101216] text-white">Prompt Contains Keyword</option>
                    <option value="model" class="bg-[#101216] text-white">Requested Model Is</option>
                    <option value="always" class="bg-[#101216] text-white">Always Apply (Default)</option>
                  </select>
                  <span class="text-[#A1A5AD] font-bold" id="policy-op-span">=</span>
                  <input type="text" id="policy-val" value="python, code, debug" placeholder="e.g. python, code, debug" class="p-2 border border-[#292D34] rounded bg-[#101216] text-white placeholder-[#A1A5AD]/50 font-mono text-xs flex-grow outline-none focus:border-white" />
                </div>
                
                <div class="flex flex-wrap items-center gap-3">
                  <span class="font-black text-amber-400">THEN</span>
                  <select id="policy-action-type" class="p-2 border border-[#292D34] rounded bg-[#101216] text-white font-semibold text-xs outline-none focus:border-white cursor-pointer">
                    <option value="route_model" class="bg-[#101216] text-white">Route to Model</option>
                    <option value="fallback_chain" class="bg-[#101216] text-white">Fallback Chain</option>
                  </select>
                  <select id="policy-target-model" class="p-2 border border-[#292D34] rounded bg-[#101216] text-white font-semibold text-xs outline-none focus:border-white cursor-pointer">
                    <option value="gemini-3.6-flash" class="bg-[#101216] text-white">Gemini 3.6 Flash (Fast)</option>
                    <option value="gemini-3.7-flash" class="bg-[#101216] text-white">Gemini 3.7 Flash (Reasoning)</option>
                    <option value="gemini-flash-latest" class="bg-[#101216] text-white">Gemini Flash (Latest)</option>
                    <option value="gpt-4o-mini" class="bg-[#101216] text-white">GPT-4o Mini (OpenAI)</option>
                    <option value="gpt-4o" class="bg-[#101216] text-white">GPT-4o (OpenAI Flagship)</option>
                  </select>
                </div>
              </div>
              
              <button type="submit" id="policy-submit-btn" class="w-full py-3 bg-white hover:bg-[#0EA5E9] text-[#08090B] font-bold rounded-lg uppercase tracking-wider shadow-sm transition-all text-center">
                ACTIVATE POLICY RULE
              </button>
            </form>
          </div>
        </div>
      </div>
    `;
  };

export async function bindAdminPolicies() {
    const container = document.getElementById("policies-rules-container");
    const policyFieldSelect = document.getElementById("policy-field");
    const policyValInput = document.getElementById("policy-val");
    const policyOpSpan = document.getElementById("policy-op-span");

    // Dynamic condition helper
    policyFieldSelect?.addEventListener("change", (e) => {
      const mode = e.target.value;
      if (!policyValInput) return;
      if (mode === "always") {
        policyValInput.value = "";
        policyValInput.placeholder = "Applies to all prompts automatically";
        policyValInput.disabled = true;
        policyValInput.classList.add("opacity-40");
      } else if (mode === "model") {
        policyValInput.disabled = false;
        policyValInput.classList.remove("opacity-40");
        policyValInput.placeholder = "e.g. gpt-4o";
        if (policyValInput.value === "python, code, debug") policyValInput.value = "gpt-4o";
      } else {
        policyValInput.disabled = false;
        policyValInput.classList.remove("opacity-40");
        policyValInput.placeholder = "e.g. python, code, debug";
        if (!policyValInput.value || policyValInput.value === "gpt-4o") policyValInput.value = "python, code, debug";
      }
    });

    // Load active policies from backend
    const loadRules = async () => {
      if (!container) return;
      try {
        const rules = await apiService.getRoutingRules();
        if (!rules || rules.length === 0) {
          container.innerHTML = `
            <div class="border border-dashed border-[#292D34] rounded-xl p-6 text-center text-[#A1A5AD] text-xs">
              No custom routing policies configured yet. The gateway is using default routing.
            </div>
          `;
          return;
        }

        container.innerHTML = rules.map(rule => {
          const isEnabled = (rule.is_active !== false && rule.isActive !== false && rule.enabled !== false);
          const condType = rule.conditionType || rule.condition_type || 'always';
          const condCfg = rule.conditionConfig || rule.condition_config || {};
          const actCfg = rule.actionConfig || rule.action_config || {};
          const targetModel = actCfg.target_model || rule.targetModel || 'gemini-3.6-flash';

          let condDisplay = `Always Active`;
          if (condType === 'keyword') {
            const kws = condCfg.keywords || [rule.conditionValue || 'keyword'];
            condDisplay = `Prompt contains: [${kws.join(', ')}]`;
          } else if (condType === 'model') {
            condDisplay = `Requested Model = ${condCfg.model || rule.conditionValue}`;
          }

          return `
            <div class="border border-[#292D34] rounded-xl p-4 bg-[#101216] shadow-sm flex flex-col gap-2 relative">
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-2">
                  <span class="font-bold text-white">${rule.name}</span>
                  <span class="text-[9px] font-mono px-1.5 py-0.5 bg-[#15181D] border border-[#292D34] text-white rounded font-bold">P${rule.priority || 10}</span>
                </div>
                <div class="flex items-center gap-2">
                  <button data-toggle-id="${rule.id}" class="policy-toggle-btn px-2.5 py-1 rounded-md text-[9px] font-bold font-mono transition-colors ${
                    isEnabled ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20" : "bg-[#15181D] border border-[#292D34] text-[#A1A5AD] hover:text-white"
                  }">${isEnabled ? "Enabled" : "Disabled"}</button>
                  <button data-del-id="${rule.id}" class="policy-del-btn text-[#A1A5AD] hover:text-rose-400 p-1 text-xs transition-colors">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </div>
              </div>
              <p class="text-[10px] text-[#A1A5AD] leading-relaxed">
                <strong class="text-white">IF</strong> ${condDisplay}<br>
                <strong class="text-white">THEN</strong> Route to <span class="font-mono font-bold text-white">${targetModel}</span>
              </p>
            </div>
          `;
        }).join("");

        // Attach event listeners for toggle and delete
        container.querySelectorAll(".policy-toggle-btn").forEach(btn => {
          btn.addEventListener("click", async () => {
            const id = btn.getAttribute("data-toggle-id");
            btn.disabled = true;
            const res = await apiService.togglePolicy(id);
            if (res.success) {
              components.renderToast("success", "Policy status updated.");
            } else {
              components.renderToast("error", extractErrorMessage(res, "Failed to update policy status."));
            }
            await loadRules();
          });
        });

        container.querySelectorAll(".policy-del-btn").forEach(btn => {
          btn.addEventListener("click", async () => {
            const id = btn.getAttribute("data-del-id");
            if (confirm("Are you sure you want to delete this routing policy?")) {
              btn.disabled = true;
              const res = await apiService.deletePolicy(id);
              if (res.success) {
                components.renderToast("success", "Routing policy deleted.");
              } else {
                components.renderToast("error", extractErrorMessage(res, "Failed to delete policy."));
              }
              await loadRules();
            }
          });
        });
      } catch (err) {
        container.innerHTML = `<div class="text-red-600 text-xs p-4">Failed to load policies.</div>`;
      }
    };

    await loadRules();

    const form = document.getElementById("policy-builder-form");
    form?.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById("policy-submit-btn");
      const title = document.getElementById("policy-title").value.trim();
      const priority = parseInt(document.getElementById("policy-priority").value, 10) || 10;
      const field = document.getElementById("policy-field").value;
      const value = document.getElementById("policy-val").value.trim();
      const actionType = document.getElementById("policy-action-type").value;
      const targetModel = document.getElementById("policy-target-model").value;

      if (!title) {
        components.renderToast("error", "Please provide a Policy Rule Title.");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.innerText = "ACTIVATING POLICY...";

      let conditionConfig = {};
      if (field === 'keyword') {
        const keywords = value ? value.split(',').map(s => s.trim()).filter(Boolean) : ['code'];
        conditionConfig = { keywords };
      } else if (field === 'model') {
        conditionConfig = { model: value || 'gemini-3.6-flash' };
      }

      let actionConfig = { target_model: targetModel };
      if (actionType === 'fallback_chain') {
        const fbBackup = (targetModel === 'gemini-3.6-flash') ? 'gemini-flash-latest' : 'gemini-3.6-flash';
        actionConfig = { target_model: targetModel, fallback_models: [fbBackup] };
      }

      try {
        const res = await apiService.createRoutingRule({
          name: title,
          priority,
          enabled: true,
          condition_type: field,
          condition_config: conditionConfig,
          action_type: actionType,
          action_config: actionConfig
        });

        submitBtn.disabled = false;
        submitBtn.innerText = "ACTIVATE POLICY RULE";

        if (res && res.success) {
          components.renderToast("success", "Routing policy successfully created: " + title);
          await loadRules();
        } else {
          components.renderToast("error", extractErrorMessage(res, "Failed to create policy."));
        }
      } catch (err) {
        submitBtn.disabled = false;
        submitBtn.innerText = "ACTIVATE POLICY RULE";
        components.renderToast("error", "Connection error saving policy.");
      }
    });
  };

export default {
  adminPolicies,
  bindAdminPolicies
};
