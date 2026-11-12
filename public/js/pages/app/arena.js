// APP PAGE: arena
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function appArena() {
    return `
      <div class="flex flex-col gap-6 animate-fade-in-up font-sans select-none">
        <div class="flex flex-col gap-1.5">
          <div class="flex items-center gap-2">
            <span class="text-[9px] font-bold text-white uppercase tracking-widest">Model Sandbox Battle</span>
            <span class="px-2 py-0.5 bg-amber-100 text-amber-800 border border-amber-300 rounded text-[9px] font-bold uppercase tracking-wider">Demo / Sandbox Mode</span>
          </div>
          <h1 class="font-display font-black text-2xl text-white uppercase leading-none">Model Arena Comparator</h1>
          <p class="text-xs text-[#A1A5AD] font-semibold font-bold">Distribute single inputs side-by-side to OpenAI, Claude, Gemini and Groq (Interactive comparison playground).</p>
        </div>
        
        <form id="arena-form" class="bg-[#101216] border border-[#292D34] rounded-xl p-4 shadow-sm flex flex-col sm:flex-row gap-3 items-center">
          <input id="arena-input" type="text" autocomplete="off" required placeholder="Submit prompt (e.g. Write a python regex matching emails)..." class="flex-grow p-3 border border-[#292D34] rounded-lg text-xs bg-[#08090B] text-white placeholder-[#A1A5AD]/60 focus:bg-[#08090B] focus:border-white outline-none font-semibold" />
          <button type="submit" class="w-full sm:w-auto px-6 py-3 bg-white hover:bg-neutral-200 text-[#08090B] font-bold text-xs rounded-lg transition-colors flex items-center gap-1.5 justify-center shadow-sm uppercase tracking-wider shrink-0 font-bold">
            <span>BATTLE TEST</span>
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
          </button>
        </form>

        <div id="arena-recommendation-card" class="hidden border border-[#292D34] bg-[#15181D] rounded-xl p-4 text-xs font-semibold text-white gap-2.5">
          <svg class="w-5 h-5 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <div>
            <span class="font-bold uppercase tracking-wider text-[9px] block mb-0.5 text-white font-bold">UniLLM Intelligent routing directive</span>
            <span id="arena-rec-text" class="text-white font-semibold">Evaluating response metrics...</span>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <!-- GPT-4o Column -->
          <div class="border border-[#292D34] bg-[#101216] rounded-xl p-5 shadow-sm flex flex-col justify-between gap-5 relative overflow-hidden">
            <span class="absolute top-0 right-4 transform -translate-y-1/2 bg-[#15181D] border border-[#292D34] text-white text-[8px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-sm">FLAGSHIP</span>
            <div class="flex flex-col gap-3">
              <div class="flex justify-between items-center border-b border-[#292D34] pb-3 font-semibold">
                <span class="font-bold text-xs text-white">GPT-4o (OpenAI)</span>
                <span class="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">Active</span>
              </div>
              <div id="arena-text-1" class="text-xs text-[#A1A5AD] leading-relaxed font-semibold min-h-36 max-h-48 overflow-y-auto pr-1">Ready for input...</div>
            </div>
            <div class="border-t border-[#292D34] pt-3 text-[10px] text-[#A1A5AD] font-bold flex flex-col gap-1 font-mono">
              <span>Latency: <span id="arena-lat-1" class="text-white font-bold">-</span></span>
              <span>Cost: <span id="arena-cost-1" class="text-white font-bold">-</span></span>
            </div>
          </div>
          
          <!-- Gemini 3.6 Flash Column -->
          <div class="border border-[#292D34] bg-[#101216] rounded-xl p-5 shadow-sm flex flex-col justify-between gap-5 relative overflow-hidden">
            <span class="absolute top-0 right-4 transform -translate-y-1/2 bg-[#15181D] border border-[#292D34] text-emerald-400 text-[8px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-sm">DEFAULT</span>
            <div class="flex flex-col gap-3">
              <div class="flex justify-between items-center border-b border-[#292D34] pb-3 font-semibold">
                <span class="font-bold text-xs text-white">Gemini 3.6 Flash</span>
                <span class="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">Active</span>
              </div>
              <div id="arena-text-2" class="text-xs text-[#A1A5AD] leading-relaxed font-semibold min-h-36 max-h-48 overflow-y-auto pr-1">Ready for input...</div>
            </div>
            <div class="border-t border-[#292D34] pt-3 text-[10px] text-[#A1A5AD] font-bold flex flex-col gap-1 font-mono">
              <span>Latency: <span id="arena-lat-2" class="text-white font-bold">-</span></span>
              <span>Cost: <span id="arena-cost-2" class="text-white font-bold">-</span></span>
            </div>
          </div>

          <!-- Gemini 3.7 Flash Column -->
          <div class="border border-[#292D34] bg-[#101216] rounded-xl p-5 shadow-sm flex flex-col justify-between gap-5 relative overflow-hidden">
            <span class="absolute top-0 right-4 transform -translate-y-1/2 bg-[#15181D] border border-[#292D34] text-purple-400 text-[8px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-sm">REASONING</span>
            <div class="flex flex-col gap-3">
              <div class="flex justify-between items-center border-b border-[#292D34] pb-3 font-semibold">
                <span class="font-bold text-xs text-white">Gemini 3.7 Flash</span>
                <span class="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">Active</span>
              </div>
              <div id="arena-text-3" class="text-xs text-[#A1A5AD] leading-relaxed font-semibold min-h-36 max-h-48 overflow-y-auto pr-1">Ready for input...</div>
            </div>
            <div class="border-t border-[#292D34] pt-3 text-[10px] text-[#A1A5AD] font-bold flex flex-col gap-1 font-mono">
              <span>Latency: <span id="arena-lat-3" class="text-white font-bold">-</span></span>
              <span>Cost: <span id="arena-cost-3" class="text-white font-bold">-</span></span>
            </div>
          </div>

          <!-- GPT-4o Mini Column -->
          <div class="border border-[#292D34] bg-[#101216] rounded-xl p-5 shadow-sm flex flex-col justify-between gap-5 relative overflow-hidden">
            <span class="absolute top-0 right-4 transform -translate-y-1/2 bg-[#15181D] border border-[#292D34] text-white text-[8px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-sm">FASTEST</span>
            <div class="flex flex-col gap-3">
              <div class="flex justify-between items-center border-b border-[#292D34] pb-3 font-semibold">
                <span class="font-bold text-xs text-white">GPT-4o Mini</span>
                <span class="text-[9px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">Active</span>
              </div>
              <div id="arena-text-4" class="text-xs text-[#A1A5AD] leading-relaxed font-semibold min-h-36 max-h-48 overflow-y-auto pr-1">Ready for input...</div>
            </div>
            <div class="border-t border-[#292D34] pt-3 text-[10px] text-[#A1A5AD] font-bold flex flex-col gap-1 font-mono">
              <span>Latency: <span id="arena-lat-4" class="text-white font-bold">-</span></span>
              <span>Cost: <span id="arena-cost-4" class="text-white font-bold">-</span></span>
            </div>
          </div>
        </div>
      </div>
    `;
  };

export function bindAppArena() {
    const form = document.getElementById("arena-form");
    const input = document.getElementById("arena-input");
    const recCard = document.getElementById("arena-recommendation-card");
    const recText = document.getElementById("arena-rec-text");

    const columns = [
      { id: "gpt-4o", textId: "arena-text-1", latId: "arena-lat-1", costId: "arena-cost-1" },
      { id: "gemini-3.6-flash", textId: "arena-text-2", latId: "arena-lat-2", costId: "arena-cost-2" },
      { id: "gemini-3.7-flash", textId: "arena-text-3", latId: "arena-lat-3", costId: "arena-cost-3" },
      { id: "gpt-4o-mini", textId: "arena-text-4", latId: "arena-lat-4", costId: "arena-cost-4" }
    ];

    let abortFns = [];

    form?.addEventListener("submit", (e) => {
      e.preventDefault();
      const prompt = input.value.trim();
      if (!prompt) return;

      abortFns.forEach(fn => fn());
      abortFns = [];

      recCard.classList.remove("hidden");
      recCard.classList.add("flex");
      recText.innerText = "Evaluating queries against models complexity limits...";

      setTimeout(() => {
        if (prompt.length < 50) {
          recText.innerHTML = `This query is classified as <strong>Low Complexity</strong>. Routing to <strong>Llama 3 (Groq)</strong> is recommended to achieve the fastest generation speeds (58ms) and reduce costs by <strong>92%</strong>.`;
        } else {
          recText.innerHTML = `This query requires <strong>Frontier Reasoning</strong>. Routing to <strong>GPT-4o (OpenAI)</strong> is recommended to guarantee maximum factual accuracy.`;
        }
      }, 900);

      columns.forEach(col => {
        const textDiv = document.getElementById(col.textId);
        const latDiv = document.getElementById(col.latId);
        const costDiv = document.getElementById(col.costId);

        let colAccumulated = "";
        let colFirstChunk = true;
        textDiv.className = "stream-text whitespace-pre-wrap break-words leading-relaxed font-sans text-xs text-[#EDEDED]";
        textDiv.textContent = "Thinking...";
        latDiv.innerText = "Streaming...";
        costDiv.innerText = "-";

        const abort = apiService.simulateCompletion(prompt, "", col.id, (chunk, trace) => {
          if (chunk) {
            if (colFirstChunk) {
              textDiv.textContent = "";
              colFirstChunk = false;
            }
            colAccumulated += chunk;
            textDiv.textContent = colAccumulated;
          } else if (trace) {
            latDiv.innerText = `${trace.latency}ms`;
            costDiv.innerText = `$${trace.cost.toFixed(5)}`;
          }
        });
        abortFns.push(abort);
      });
    });
  };

export default {
  appArena,
  bindAppArena
};
