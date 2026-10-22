// APP PAGE: routing (Database-backed Dynamic Routing Engine)
import { apiService, extractErrorMessage } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function appRouting() {
  return `
    <div class="flex flex-col gap-6 animate-fade-in-up font-sans relative overflow-hidden select-none">
      <div class="flex justify-between items-center">
        <div class="flex flex-col gap-1">
          <span class="text-[9px] font-bold text-brand-primary uppercase tracking-widest">Routing Core</span>
          <h1 class="font-display font-black text-2xl text-brand-text uppercase leading-none">Dynamic Routing Engine</h1>
          <p class="text-xs text-brand-muted font-semibold">Enforce server-side routing policies by matching prompt criteria and model fallbacks.</p>
        </div>
        <button id="add-rule-btn" class="text-xs font-bold px-4 py-2.5 bg-brand-primary hover:bg-indigo-700 text-white rounded-lg transition-all shadow-sm uppercase tracking-wider font-bold">
          Create Rule
        </button>
      </div>
      
      <div id="routing-rules-container" class="flex flex-col gap-4">
        <div class="border border-[#1F2438] bg-[#10121A] rounded-xl p-8 shadow-sm text-center text-[#8E98B0]">
          <div class="flex items-center justify-center gap-2">
            <svg class="animate-spin h-4 w-4 text-[#38BDF8]" viewBox="0 0 24 24" fill="none"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
            <span>Loading routing policies from database...</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Rule Modal Overlay -->
    <div id="rule-modal" class="fixed inset-0 z-50 bg-[#07080B]/80 backdrop-blur-sm hidden items-center justify-center p-4">
      <div class="w-full max-w-md bg-[#10121A] border border-[#1F2438] rounded-xl p-6 shadow-2xl animate-fade-in-up">
        <div class="flex justify-between items-center pb-3 border-b border-[#1F2438] mb-4">
          <span class="font-display font-bold text-sm text-white uppercase tracking-wider">Create Routing Policy</span>
          <button id="rule-modal-close" class="p-1.5 hover:bg-[#161926] rounded-lg text-[#8E98B0]">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        
        <form id="rule-modal-form" class="flex flex-col gap-4 font-semibold text-xs text-white">
          <div class="flex flex-col gap-1.5">
            <label class="text-[9px] uppercase tracking-wider text-[#8E98B0]">Policy Name</label>
            <input id="rule-name-input" type="text" required placeholder="e.g. Code Keyword Router" class="p-3 border border-[#1F2438] rounded-lg bg-[#07080B] text-white placeholder-[#8E98B0]/60 focus:bg-[#07080B] focus:border-[#38BDF8] outline-none font-semibold text-xs" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[9px] uppercase tracking-wider text-[#8E98B0]">Evaluation Priority (1 = Highest)</label>
            <input id="rule-priority-input" type="number" required value="10" min="1" max="1000" class="p-2.5 border border-[#1F2438] rounded-lg bg-[#07080B] text-white placeholder-[#8E98B0]/60 focus:bg-[#07080B] focus:border-[#38BDF8] outline-none font-mono text-xs" />
          </div>
          
          <div class="flex flex-col gap-3 bg-[#161926] border border-[#1F2438] rounded-lg p-4 select-none">
            <div class="flex flex-wrap items-center gap-3">
              <span class="font-black text-[#38BDF8]">IF</span>
              <select id="rule-cond-type" class="p-2 border border-[#1F2438] rounded bg-[#10121A] text-white font-semibold text-xs outline-none">
                <option value="keyword">Prompt Contains Keyword</option>
                <option value="model">Requested Model Is</option>
                <option value="always">Always Apply (Default)</option>
              </select>
              <span class="text-[#8E98B0] font-bold">=</span>
              <input type="text" id="rule-cond-val" placeholder="e.g. python, debug, sql" class="p-2 border border-[#1F2438] rounded font-mono text-xs flex-grow outline-none bg-[#10121A] text-white placeholder-[#8E98B0]/60" />
            </div>
            
            <div class="flex flex-wrap items-center gap-3">
              <span class="font-black text-[#818CF8]">THEN</span>
              <select id="rule-action-type" class="p-2 border border-[#1F2438] rounded bg-[#10121A] text-white font-semibold text-xs outline-none">
                <option value="route_model">Route to Target Model</option>
                <option value="fallback_chain">Fallback Chain</option>
              </select>
              <select id="rule-target-model" class="p-2 border border-[#1F2438] rounded bg-[#10121A] text-white font-semibold text-xs outline-none">
                <option value="gemini-3.6-flash">Gemini 3.6 Flash (Fast)</option>
                <option value="gemini-3.7-flash">Gemini 3.7 Flash (Reasoning)</option>
                <option value="gemini-flash-latest">Gemini Flash (Latest)</option>
                <option value="gpt-4o-mini">GPT-4o Mini (OpenAI)</option>
                <option value="gpt-4o">GPT-4o (OpenAI Flagship)</option>
              </select>
            </div>
          </div>
          
          <button type="submit" id="submit-rule-btn" class="w-full py-3.5 bg-[#38BDF8] hover:bg-sky-400 text-[#07080B] font-bold rounded-lg uppercase tracking-wider transition-colors shadow-sm">
            Publish Routing Policy
          </button>
        </form>
      </div>
    </div>
  `;
}

export async function bindAppRouting() {
  const container = document.getElementById("routing-rules-container");
  const modal = document.getElementById("rule-modal");
  const openBtn = document.getElementById("add-rule-btn");
  const closeBtn = document.getElementById("rule-modal-close");
  const form = document.getElementById("rule-modal-form");
  const submitBtn = document.getElementById("submit-rule-btn");

  async function loadPolicies() {
    const policies = await apiService.getPolicies();
    if (!container) return;

    if (!policies || policies.length === 0) {
      container.innerHTML = `
        <div class="border border-dashed border-[#1F2438] rounded-xl p-8 text-center text-[#8E98B0] text-xs bg-[#10121A]">
          <p class="font-bold">No custom routing policies configured yet.</p>
          <p class="text-[11px] mt-1">Click "Create Rule" above to add dynamic model routing conditions.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = policies.map(p => {
      const isEnabled = (p.is_active !== false && p.isActive !== false);
      const condType = p.condition_type || p.conditionType || 'always';
      const condCfg = p.condition_config || p.conditionConfig || {};
      const actType = p.action_type || p.actionType || 'route_model';
      const actCfg = p.action_config || p.actionConfig || {};
      const targetModel = actCfg.target_model || actCfg.targetModel || 'gemini-3.6-flash';

      let condText = 'Always Active';
      if (condType === 'keyword') {
        const kw = condCfg.keywords || condCfg.keyword || [];
        condText = `Prompt contains: "${Array.isArray(kw) ? kw.join(', ') : kw}"`;
      } else if (condType === 'model') {
        condText = `Requested model is "${condCfg.model || 'any'}"`;
      }

      let actText = `Route to ${targetModel}`;
      if (actType === 'fallback_chain') {
        const chain = actCfg.chain || [targetModel, 'gemini-flash-latest'];
        actText = `Fallback: ${chain.join(' → ')}`;
      }

      return `
        <div class="border border-[#1F2438] bg-[#10121A] rounded-xl p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-semibold text-xs text-white">
          <div class="flex flex-col gap-1">
            <div class="flex items-center gap-2">
              <span class="font-bold text-white text-sm">${p.name}</span>
              <span class="text-[8px] font-mono font-bold text-[#8E98B0] border border-[#1F2438] px-1.5 py-0.5 rounded bg-[#161926] uppercase">Priority ${p.priority || 10}</span>
              <span class="px-2 py-0.5 rounded text-[8px] font-bold uppercase ${isEnabled ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-[#161926] text-[#8E98B0]'}">
                ${isEnabled ? 'Active' : 'Disabled'}
              </span>
            </div>
            <div class="flex items-center gap-2 text-[#8E98B0] font-mono text-[11px] mt-1">
              <span>IF: <strong class="text-white">${condText}</strong></span>
              <span>&rarr;</span>
              <span>THEN: <strong class="text-[#38BDF8]">${actText}</strong></span>
            </div>
          </div>
          <div class="flex items-center gap-2 shrink-0">
            <button class="toggle-rule-btn text-[10px] font-bold px-3 py-1.5 border border-[#1F2438] rounded hover:bg-[#161926] bg-[#10121A] text-white" data-id="${p.id}">
              ${isEnabled ? "Disable" : "Enable"}
            </button>
            <button class="delete-rule-btn text-[10px] font-bold px-3 py-1.5 border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 rounded bg-[#10121A]" data-id="${p.id}">
              Delete
            </button>
          </div>
        </div>
      `;
    }).join("");

    // Bind toggle buttons
    container.querySelectorAll(".toggle-rule-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        const id = btn.getAttribute("data-id");
        btn.innerText = "...";
        const res = await apiService.togglePolicy(id);
        if (res.success) {
          components.renderToast("info", res.message || "Policy updated.");
          loadPolicies();
        } else {
          components.renderToast("error", extractErrorMessage(res, "Failed to toggle policy."));
          loadPolicies();
        }
      });
    });

    // Bind delete buttons
    container.querySelectorAll(".delete-rule-btn").forEach(btn => {
      btn.addEventListener("click", async () => {
        if (!confirm("Are you sure you want to delete this routing rule?")) return;
        const id = btn.getAttribute("data-id");
        btn.innerText = "...";
        const res = await apiService.deletePolicy(id);
        if (res.success) {
          components.renderToast("info", "Routing policy deleted.");
          loadPolicies();
        } else {
          components.renderToast("error", extractErrorMessage(res, "Failed to delete policy."));
          loadPolicies();
        }
      });
    });
  }

  loadPolicies();

  openBtn?.addEventListener("click", () => {
    modal?.classList.remove("hidden");
    modal?.classList.add("flex");
    document.getElementById("rule-name-input")?.focus();
  });

  const closeModal = () => {
    modal?.classList.add("hidden");
    modal?.classList.remove("flex");
  };

  closeBtn?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("rule-name-input").value.trim();
    const priority = parseInt(document.getElementById("rule-priority-input").value, 10) || 10;
    const condType = document.getElementById("rule-cond-type").value;
    const condVal = document.getElementById("rule-cond-val").value.trim();
    const actionType = document.getElementById("rule-action-type").value;
    const targetModel = document.getElementById("rule-target-model").value;

    let condition_config = {};
    if (condType === "keyword") {
      condition_config = { keywords: condVal ? condVal.split(",").map(s => s.trim()).filter(Boolean) : ["code"] };
    } else if (condType === "model") {
      condition_config = { model: condVal || "gemini-3.6-flash" };
    }

    let action_config = {};
    if (actionType === "route_model") {
      action_config = { target_model: targetModel };
    } else if (actionType === "fallback_chain") {
      const backup = (targetModel === "gemini-3.6-flash") ? "gemini-flash-latest" : "gemini-3.6-flash";
      action_config = { chain: [targetModel, backup] };
    }

    if (submitBtn) {
      submitBtn.innerText = "Publishing...";
      submitBtn.disabled = true;
    }

    const res = await apiService.createRoutingRule({
      name,
      priority,
      condition_type: condType,
      condition_config,
      action_type: actionType,
      action_config,
      is_active: true
    });

    if (submitBtn) {
      submitBtn.innerText = "Publish Routing Policy";
      submitBtn.disabled = false;
    }

    if (res.success) {
      components.renderToast("success", `Policy '${name}' deployed!`);
      closeModal();
      form.reset();
      loadPolicies();
    } else {
      components.renderToast("error", extractErrorMessage(res, "Failed to create policy."));
    }
  });
}

export default {
  appRouting,
  bindAppRouting
};
