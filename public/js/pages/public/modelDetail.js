// PUBLIC PAGE: modelDetail (Obsidian Model Telemetry & Specs)
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
    <div class="relative overflow-hidden w-full font-sans bg-[#08090B] text-[#F5F5F5]">
      
      <!-- Top subtle vignette -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-b from-white/[0.04] to-transparent blur-[120px] pointer-events-none -z-10"></div>

      <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-12 md:py-20 flex flex-col gap-8">
        
        <a href="/models" data-link class="text-xs font-mono text-[#A1A5AD] hover:text-white flex items-center gap-1.5 self-start transition-colors">
          <span>&larr;</span>
          <span>Back to Model Registry</span>
        </a>
        
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#292D34] pb-6">
          <div class="flex flex-col gap-1.5">
            <div class="flex items-center gap-2">
              <span class="px-2 py-0.5 rounded bg-[#101216] border border-[#292D34] text-[10px] font-mono text-[#A1A5AD] uppercase">${model.provider || "Provider"}</span>
              <span class="text-xs font-mono text-emerald-400">● ${model.status || "Healthy"}</span>
            </div>
            <h1 class="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">${model.name || model.id}</h1>
            <p class="text-xs sm:text-sm text-[#A1A5AD] leading-relaxed max-w-2xl mt-0.5">${model.description || "Specifications, token pricing, and average latency metrics."}</p>
          </div>
          <div class="flex items-center gap-3">
            <a href="/app/playground?model=${encodeURIComponent(model.id)}" data-link class="px-5 py-2.5 rounded-lg bg-white hover:bg-neutral-200 text-black text-xs font-semibold transition-all shadow-sm">
              Launch in Playground →
            </a>
          </div>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 text-xs font-sans mt-2">
          
          <div class="lg:col-span-8 flex flex-col gap-6">
            <div class="grid grid-cols-3 gap-4 font-mono">
              <div class="border border-[#292D34] rounded-xl p-5 bg-[#101216]">
                <span class="text-[10px] uppercase tracking-wider block mb-1 text-[#A1A5AD]">Input Token Price</span>
                <span class="text-lg font-bold text-white">$${inCost} <span class="text-[10px] text-[#A1A5AD] font-normal">/ 1M</span></span>
              </div>
              <div class="border border-[#292D34] rounded-xl p-5 bg-[#101216]">
                <span class="text-[10px] uppercase tracking-wider block mb-1 text-[#A1A5AD]">Output Token Price</span>
                <span class="text-lg font-bold text-white">$${outCost} <span class="text-[10px] text-[#A1A5AD] font-normal">/ 1M</span></span>
              </div>
              <div class="border border-[#292D34] rounded-xl p-5 bg-[#101216]">
                <span class="text-[10px] uppercase tracking-wider block mb-1 text-[#A1A5AD]">Average Latency</span>
                <span class="text-lg font-bold text-emerald-400">${lat}ms</span>
              </div>
            </div>
            
            <div class="border border-[#292D34] rounded-xl p-6 bg-[#101216] flex flex-col gap-3 font-mono">
              <h4 class="font-bold text-xs text-white uppercase tracking-wider border-b border-[#292D34] pb-3 mb-1">Model Telemetry Capabilities</h4>
              <div class="flex justify-between border-b border-[#292D34] pb-3 text-xs">
                <span class="text-[#A1A5AD]">Context Window Limit</span>
                <span class="text-white font-semibold">${model.contextLength || "128k tokens"}</span>
              </div>
              <div class="flex justify-between border-b border-[#292D34] pb-3 text-xs">
                <span class="text-[#A1A5AD]">Architecture Classification</span>
                <span class="text-white font-semibold">${model.type || "General Reasoning"}</span>
              </div>
              <div class="flex justify-between border-b border-[#292D34] pb-3 text-xs">
                <span class="text-[#A1A5AD]">Supported Modalities</span>
                <span class="text-white font-semibold font-sans">Text, Chat Completions, JSON Schema, Function Calling</span>
              </div>
              <div class="flex justify-between text-xs pt-1">
                <span class="text-[#A1A5AD]">Historical SLA Availability</span>
                <span class="text-emerald-400 font-semibold">${model.reliability || 99.98}% SLA</span>
              </div>
            </div>
          </div>
          
          <div class="lg:col-span-4 border border-[#292D34] rounded-xl p-6 bg-[#101216] flex flex-col gap-4 text-xs">
            <h4 class="font-bold text-xs uppercase tracking-wider text-white border-b border-[#292D34] pb-3">Inference Endpoint</h4>
            <p class="text-xs text-[#A1A5AD] leading-relaxed">Execute test requests or benchmark latency directly using the integrated UniLLM developer sandbox.</p>
            
            <div class="p-3 bg-[#08090B] border border-[#292D34] rounded-lg font-mono text-[11px] text-[#A1A5AD]">
              <span class="text-white font-semibold block mb-1">Target ID:</span>
              <code class="text-emerald-400 select-all">${model.id}</code>
            </div>

            <a href="/app/playground?model=${encodeURIComponent(model.id)}" data-link class="w-full py-3 bg-white hover:bg-neutral-200 text-black font-semibold rounded-lg text-xs text-center shadow-sm transition-all mt-1">
              Open in Playground Sandbox
            </a>
            <a href="/docs#quickstart" data-link class="w-full py-2.5 bg-[#15181D] hover:bg-[#20242B] border border-[#292D34] text-white font-semibold rounded-lg text-xs text-center transition-colors">
              Read Integration Guide
            </a>
          </div>

        </div>
      </div>
    </div>
  `;
}

export function bindModelDetail() {}

export default {
  modelDetail,
  bindModelDetail
};
