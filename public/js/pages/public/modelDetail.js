// PUBLIC PAGE: modelDetail
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function modelDetail(params) {
  const modelId = params?.id || (window.location.pathname.split("/").pop());
  const model = apiService.getModel(modelId) || apiService.getModels()[0] || {
    id: "unknown",
    name: "Foundation Model",
    provider: "OpenAI",
    inputCost: 2.50,
    outputCost: 10.00,
    latency: 320,
    contextLength: "128K tokens",
    description: "Multi-modal reasoning model with fast routing capabilities."
  };

  const inCost = (model.inputCost ?? model.inputCost1M ?? 0).toFixed(2);
  const outCost = (model.outputCost ?? model.outputCost1M ?? 0).toFixed(2);
  const lat = model.latency ?? model.averageLatency ?? 0;

  return `
    <div class="border-x border-brand-border/60 max-w-7xl mx-auto bg-white/30 backdrop-blur-[1px]">
      <section class="px-6 lg:px-12 py-16 md:py-28 flex flex-col gap-8 animate-fade-in-up select-none">
        <a href="/models" data-link class="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1.5 self-start uppercase tracking-wider">
          &larr; Back to Marketplace
        </a>
        
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
          <div class="flex flex-col gap-1">
            <span class="text-[9px] font-bold text-brand-primary uppercase tracking-widest">${model.provider || "Provider"} Endpoint</span>
            <h1 class="font-display font-black text-4xl text-brand-text uppercase leading-none font-bold">${model.name || model.id}</h1>
            <p class="text-xs text-brand-muted leading-relaxed max-w-xl font-semibold mt-1">${model.description || "Full specifications and average performance telemetry statistics."}</p>
          </div>
          <div class="flex items-center gap-3">
            <span class="px-3 py-1 bg-green-50 border border-green-200 text-green-700 text-xs font-bold rounded-full">
              ● ${model.status || "Healthy"}
            </span>
          </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs font-semibold text-brand-muted mt-4">
          <div class="lg:col-span-8 flex flex-col gap-6">
            <div class="grid grid-cols-3 gap-4">
              <div class="border border-brand-border rounded-xl p-4 bg-white shadow-sm text-center">
                <span class="text-[9px] font-bold uppercase tracking-wider block mb-1 text-slate-400">Input Token Price</span>
                <span class="text-sm font-bold text-brand-text font-mono">$${inCost} / 1M</span>
              </div>
              <div class="border border-brand-border rounded-xl p-4 bg-white shadow-sm text-center">
                <span class="text-[9px] font-bold uppercase tracking-wider block mb-1 text-slate-400">Output Token Price</span>
                <span class="text-sm font-bold text-brand-text font-mono">$${outCost} / 1M</span>
              </div>
              <div class="border border-brand-border rounded-xl p-4 bg-white shadow-sm text-center">
                <span class="text-[9px] font-bold uppercase tracking-wider block mb-1 text-slate-400">Average Latency</span>
                <span class="text-sm font-bold text-brand-text font-mono">${lat}ms</span>
              </div>
            </div>
            
            <div class="border border-brand-border rounded-xl p-6 bg-white shadow-sm flex flex-col gap-3">
              <h4 class="font-bold text-xs text-brand-text uppercase tracking-wider border-b pb-3 mb-1">Model Telemetry Capabilities</h4>
              <div class="flex justify-between border-b pb-2.5">
                <span>Context window length limit</span>
                <span class="text-brand-text font-bold font-mono">${model.contextLength || "128k tokens"}</span>
              </div>
              <div class="flex justify-between border-b pb-2.5">
                <span>Model Architecture / Type</span>
                <span class="text-brand-text font-bold">${model.type || "General Reasoning"}</span>
              </div>
              <div class="flex justify-between border-b pb-2.5">
                <span>Supported request protocols</span>
                <span class="text-brand-text font-bold">Text, Chat Completions, JSON Schema, Function Calling</span>
              </div>
              <div class="flex justify-between">
                <span>Reliability Rating</span>
                <span class="text-green-700 font-bold uppercase font-mono">${model.reliability || 99.98}% SLA</span>
              </div>
            </div>
          </div>
          
          <div class="lg:col-span-4 border border-brand-border rounded-xl p-5 bg-white shadow-sm flex flex-col gap-4 text-xs font-semibold text-brand-text">
            <h4 class="font-bold text-xs uppercase tracking-wider border-b pb-3">Test Endpoint</h4>
            <p class="text-[11px] text-brand-muted leading-relaxed">Run comparative test runs or query this endpoint directly using our developer playground sandbox.</p>
            <a href="/app/playground" data-link class="w-full py-3 bg-brand-primary hover:bg-indigo-700 text-white font-bold rounded-lg text-xs uppercase tracking-wider text-center shadow-sm transition-colors">
              Open Playground Sandbox
            </a>
            <a href="/docs#demo-guide" data-link class="w-full py-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold rounded-lg text-xs uppercase tracking-wider text-center transition-colors">
              View Integration Guide
            </a>
          </div>
        </div>
      </section>
    </div>
  `;
}

export function bindModelDetail() {}

export default {
  modelDetail,
  bindModelDetail
};
