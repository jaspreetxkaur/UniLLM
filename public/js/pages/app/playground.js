// APP PAGE: playground (Redesigned for Screen 05 Dark Cinematic 3-Column Experience)
import { apiService, extractErrorMessage } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function appPlayground() {
  const models = apiService.getModels();
  
  return `
    <div class="flex flex-col gap-5 animate-fade-in-up font-sans text-white h-[calc(100vh-130px)]">
      
      <!-- Top Header (Screen 05) -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none shrink-0">
        <div>
          <h1 class="font-sans font-bold text-2xl text-white tracking-tight">Playground</h1>
          <p class="text-xs text-[#8E98B0]">Test and compare responses from different models.</p>
        </div>
        
        <div class="flex items-center gap-2">
          <!-- Quick Model Badge -->
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#10121A] border border-[#1F2438] text-xs font-mono text-white">
            <span class="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse"></span>
            <span id="header-active-model-name">Claude 3.5</span>
          </div>

          <!-- Compare button -->
          <button id="playground-compare-btn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#10121A] hover:bg-[#161926] border border-[#1F2438] text-xs text-[#8E98B0] hover:text-white transition-colors">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path></svg>
            <span>Compare</span>
          </button>
        </div>
      </div>

      <!-- Main 3-Column Workspace (Screen 05) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0">
        
        <!-- ================= COLUMN 1: SESSIONS / MESSAGES (Col 3) ================= -->
        <div class="hidden lg:flex lg:col-span-3 rounded-xl bg-[#10121A] border border-[#1F2438] p-4 flex-col justify-between select-none overflow-hidden">
          <div class="flex flex-col gap-3 min-h-0">
            <div class="flex items-center justify-between pb-2 border-b border-[#1F2438]">
              <span class="text-xs font-semibold text-white">Messages</span>
              <button id="new-chat-btn" class="flex items-center gap-1 text-[11px] font-medium text-[#38BDF8] hover:text-white transition-colors">
                <span>+</span> New chat
              </button>
            </div>

            <!-- Chat History List -->
            <div class="flex flex-col gap-1 overflow-y-auto pr-1">
              <button class="chat-session-item active w-full text-left p-2.5 rounded-lg bg-[#161926] border border-[#1F2438] text-xs transition-colors flex flex-col gap-0.5">
                <span class="text-white font-medium truncate">Summarize research paper...</span>
                <span class="text-[10px] text-[#8E98B0] font-mono">12 min ago</span>
              </button>
              
              <button class="chat-session-item w-full text-left p-2.5 rounded-lg hover:bg-[#161926]/50 text-xs transition-colors flex flex-col gap-0.5">
                <span class="text-[#8E98B0] hover:text-white font-medium truncate">Sentiment analysis</span>
                <span class="text-[10px] text-[#8E98B0]/60 font-mono">2 min ago</span>
              </button>

              <button class="chat-session-item w-full text-left p-2.5 rounded-lg hover:bg-[#161926]/50 text-xs transition-colors flex flex-col gap-0.5">
                <span class="text-[#8E98B0] hover:text-white font-medium truncate">Code explanation</span>
                <span class="text-[10px] text-[#8E98B0]/60 font-mono">1 hour ago</span>
              </button>

              <button class="chat-session-item w-full text-left p-2.5 rounded-lg hover:bg-[#161926]/50 text-xs transition-colors flex flex-col gap-0.5">
                <span class="text-[#8E98B0] hover:text-white font-medium truncate">Image analysis</span>
                <span class="text-[10px] text-[#8E98B0]/60 font-mono">1 day ago</span>
              </button>

              <button class="chat-session-item w-full text-left p-2.5 rounded-lg hover:bg-[#161926]/50 text-xs transition-colors flex flex-col gap-0.5">
                <span class="text-[#8E98B0] hover:text-white font-medium truncate">Translate text</span>
                <span class="text-[10px] text-[#8E98B0]/60 font-mono">1 day ago</span>
              </button>
            </div>
          </div>

          <!-- Bottom: Clear All Button -->
          <div class="pt-3 border-t border-[#1F2438]">
            <button id="clear-conv-btn" class="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-[#161926] hover:bg-[#1E2235] text-xs font-mono text-[#8E98B0] hover:text-white border border-[#1F2438] transition-colors">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              <span>Clear all</span>
            </button>
          </div>
        </div>

        <!-- ================= COLUMN 2: CHAT FEED (Col 6) ================= -->
        <div class="lg:col-span-6 rounded-xl bg-[#10121A] border border-[#1F2438] flex flex-col h-full overflow-hidden">
          
          <!-- Message Feed -->
          <div id="play-feed" class="flex-1 p-5 overflow-y-auto flex flex-col gap-4 select-text">
            
            <!-- User Prompt Card -->
            <div class="flex justify-end">
              <div class="max-w-[85%] bg-[#161926] border border-[#1F2438] rounded-2xl rounded-tr-sm px-4 py-3 text-xs text-white leading-relaxed font-sans shadow-sm">
                Summarize this research paper in simple terms.
              </div>
            </div>

            <!-- Assistant Response Card -->
            <div class="flex justify-start items-start gap-3">
              <div class="w-7 h-7 rounded-lg bg-[#161926] border border-[#1F2438] flex items-center justify-center text-xs font-bold text-[#38BDF8] shrink-0">
                ✦
              </div>
              <div class="max-w-[85%] bg-[#121522] border border-[#1F2438] rounded-2xl rounded-tl-sm px-4 py-3 text-xs text-[#E2E8F0] leading-relaxed font-sans shadow-sm">
                <div class="stream-text">
                  This paper explores how large language models can be made more efficient by using adaptive routing across specialized models. It shows that intelligently selecting the right model for each query can reduce cost, improve response quality, and enable more scalable AI systems.
                </div>
                
                <!-- Bubble Action Bar -->
                <div class="flex items-center gap-3 pt-3 mt-2 border-t border-[#1F2438]/60 text-[#8E98B0]">
                  <button class="hover:text-white transition-colors" title="Copy response">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                  </button>
                  <button class="hover:text-white transition-colors" title="Regenerate">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                  </button>
                </div>
              </div>
            </div>

          </div>
          
          <!-- Bottom Prompt Input Form (Screen 05) -->
          <div class="p-3 border-t border-[#1F2438] bg-[#0D0E15]">
            <form id="play-prompt-form" class="flex items-center gap-2 p-1.5 rounded-xl bg-[#161926] border border-[#1F2438] focus-within:border-[#38BDF8] transition-colors">
              <input
                id="play-input"
                type="text"
                autocomplete="off"
                required
                placeholder="Ask anything..."
                class="flex-1 bg-transparent px-3 py-2 text-xs text-white placeholder-[#8E98B0]/60 outline-none font-sans"
              />
              
              <!-- Action Icons -->
              <div class="flex items-center gap-1 text-[#8E98B0] px-1">
                <button type="button" class="p-1.5 hover:text-white transition-colors" title="Attach file">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                </button>
                <button type="button" class="p-1.5 hover:text-white transition-colors" title="Voice input">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path></svg>
                </button>
              </div>

              <!-- Solid White Arrow Submit Button -->
              <button
                type="submit"
                id="play-submit-btn"
                class="w-8 h-8 rounded-lg bg-white hover:bg-slate-200 text-[#07080B] flex items-center justify-center transition-all shrink-0"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </form>
          </div>

        </div>

        <!-- ================= COLUMN 3: SETTINGS & OBSERVABILITY (Col 3) ================= -->
        <div class="lg:col-span-3 rounded-xl bg-[#10121A] border border-[#1F2438] p-5 flex flex-col justify-between select-none overflow-y-auto">
          
          <div class="flex flex-col gap-5">
            <h3 class="font-semibold text-xs text-white border-b border-[#1F2438] pb-3">Settings</h3>
            
            <!-- Model Selection -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-mono uppercase tracking-wider text-[#8E98B0]">Model</label>
              <select id="play-model-sel" class="p-2.5 rounded-lg border border-[#1F2438] text-xs bg-[#161926] text-white font-medium outline-none focus:border-[#38BDF8] transition-colors cursor-pointer">
                ${models.map(m => `<option value="${m.id}" ${m.id === "gemini-3.6-flash" ? "selected" : ""}>${m.name} (${m.provider})</option>`).join("")}
              </select>
            </div>
            
            <!-- Temperature Slider -->
            <div class="flex flex-col gap-2">
              <div class="flex justify-between text-xs text-[#8E98B0]">
                <span>Temperature</span>
                <span id="play-temp-lbl" class="font-mono text-white">0.7</span>
              </div>
              <input id="play-temp-slider" type="range" min="0" max="2" step="0.1" value="0.7" class="w-full accent-[#38BDF8] bg-[#161926] h-1.5 rounded-lg cursor-pointer" />
            </div>

            <!-- Max Tokens Slider -->
            <div class="flex flex-col gap-2">
              <div class="flex justify-between text-xs text-[#8E98B0]">
                <span>Max tokens</span>
                <span id="play-tokens-lbl" class="font-mono text-white">1024</span>
              </div>
              <input id="play-tokens-slider" type="range" min="1" max="4000" step="50" value="1024" class="w-full accent-[#38BDF8] bg-[#161926] h-1.5 rounded-lg cursor-pointer" />
            </div>

            <!-- Toggles (Screen 05) -->
            <div class="flex flex-col gap-3 pt-2 border-t border-[#1F2438]">
              <div class="flex items-center justify-between text-xs">
                <span class="text-[#8E98B0]">Stream response</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked id="toggle-stream" class="sr-only peer">
                  <div class="w-9 h-5 bg-[#161926] border border-[#1F2438] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#38BDF8]"></div>
                </label>
              </div>

              <div class="flex items-center justify-between text-xs">
                <span class="text-[#8E98B0]">Show reasoning</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" id="toggle-reasoning" class="sr-only peer">
                  <div class="w-9 h-5 bg-[#161926] border border-[#1F2438] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#38BDF8]"></div>
                </label>
              </div>
            </div>

            <!-- System Directives -->
            <div class="flex flex-col gap-1.5 pt-2 border-t border-[#1F2438]">
              <label class="text-[10px] font-mono uppercase tracking-wider text-[#8E98B0]">System Directives</label>
              <textarea id="play-sys-prompt" rows="2" placeholder="You are an expert AI assistant..." class="p-2.5 rounded-lg border border-[#1F2438] text-xs bg-[#161926] text-white placeholder-[#8E98B0]/50 focus:border-[#38BDF8] outline-none resize-none"></textarea>
            </div>

            <!-- Observability Telemetry Strip -->
            <div class="p-3 rounded-lg bg-[#161926] border border-[#1F2438] text-[11px] font-mono space-y-2">
              <div class="flex justify-between">
                <span class="text-[#8E98B0]">Latency</span>
                <span id="stat-latency" class="text-white">-</span>
              </div>
              <div class="flex justify-between">
                <span class="text-[#8E98B0]">Tokens</span>
                <span id="stat-tokens" class="text-white">-</span>
              </div>
              <div class="flex justify-between">
                <span class="text-[#8E98B0]">Cost</span>
                <span id="stat-cost" class="text-white">-</span>
              </div>
              <div class="flex justify-between">
                <span class="text-[#8E98B0]">Cache</span>
                <span id="stat-cache" class="text-white">-</span>
              </div>
              <div class="flex justify-between">
                <span class="text-[#8E98B0]">Trace ID</span>
                <span id="stat-req-id" class="text-[#38BDF8] truncate max-w-[100px]">-</span>
              </div>
            </div>

          </div>
          
          <!-- Reset Button (Screen 05) -->
          <div class="pt-4 border-t border-[#1F2438]">
            <button id="reset-settings-btn" class="w-full flex items-center justify-center gap-1.5 py-2 text-xs font-mono text-[#8E98B0] hover:text-white transition-colors">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              <span>Reset</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  `;
}

export function bindAppPlayground() {
  const feed = document.getElementById("play-feed");
  const form = document.getElementById("play-prompt-form");
  const input = document.getElementById("play-input");
  const submitBtn = document.getElementById("play-submit-btn");
  const modelSel = document.getElementById("play-model-sel");
  const headerModelName = document.getElementById("header-active-model-name");
  
  const tempSlider = document.getElementById("play-temp-slider");
  const tempLbl = document.getElementById("play-temp-lbl");
  tempSlider?.addEventListener("input", (e) => {
    if (tempLbl) tempLbl.innerText = e.target.value;
  });
  
  const tokensSlider = document.getElementById("play-tokens-slider");
  const tokensLbl = document.getElementById("play-tokens-lbl");
  tokensSlider?.addEventListener("input", (e) => {
    if (tokensLbl) tokensLbl.innerText = e.target.value;
  });

  const latencyStat = document.getElementById("stat-latency");
  const tokensStat = document.getElementById("stat-tokens");
  const costStat = document.getElementById("stat-cost");
  const cacheStat = document.getElementById("stat-cache");
  const reqIdStat = document.getElementById("stat-req-id");

  let activeAbort = null;

  modelSel?.addEventListener("change", () => {
    if (headerModelName) {
      const selectedOption = modelSel.options[modelSel.selectedIndex];
      headerModelName.innerText = selectedOption ? selectedOption.text.split("(")[0].trim() : "Model";
    }
    if (activeAbort) {
      activeAbort();
      activeAbort = null;
      if (submitBtn) submitBtn.disabled = false;
    }
  });

  const clearBtn = document.getElementById("clear-conv-btn");
  const newChatBtn = document.getElementById("new-chat-btn");

  const resetChatFeed = () => {
    if (activeAbort) {
      activeAbort();
      activeAbort = null;
      if (submitBtn) submitBtn.disabled = false;
    }
    if (feed) {
      feed.innerHTML = `
        <div class="flex justify-start items-start gap-3">
          <div class="w-7 h-7 rounded-lg bg-[#161926] border border-[#1F2438] flex items-center justify-center text-xs font-bold text-[#38BDF8] shrink-0">
            ✦
          </div>
          <div class="max-w-[85%] bg-[#121522] border border-[#1F2438] rounded-2xl rounded-tl-sm px-4 py-3 text-xs text-[#8E98B0] leading-relaxed font-sans">
            Playground ready. Choose your model configuration in the right panel and send a message.
          </div>
        </div>
      `;
    }
    if (latencyStat) latencyStat.innerText = "-";
    if (tokensStat) tokensStat.innerText = "-";
    if (costStat) costStat.innerText = "-";
    if (cacheStat) cacheStat.innerText = "-";
    if (reqIdStat) reqIdStat.innerText = "-";
  };

  clearBtn?.addEventListener("click", () => {
    resetChatFeed();
    components.renderToast("info", "Playground logs cleared.");
  });

  newChatBtn?.addEventListener("click", () => {
    resetChatFeed();
    components.renderToast("success", "Started new chat session.");
  });

  const resetSettingsBtn = document.getElementById("reset-settings-btn");
  resetSettingsBtn?.addEventListener("click", () => {
    if (tempSlider) {
      tempSlider.value = "0.7";
      if (tempLbl) tempLbl.innerText = "0.7";
    }
    if (tokensSlider) {
      tokensSlider.value = "1024";
      if (tokensLbl) tokensLbl.innerText = "1024";
    }
    const sysPrompt = document.getElementById("play-sys-prompt");
    if (sysPrompt) sysPrompt.value = "";
    components.renderToast("info", "Settings reset to defaults.");
  });

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const prompt = input.value.trim();
    if (!prompt) return;

    if (activeAbort) {
      activeAbort();
      activeAbort = null;
    }

    // Append User Prompt Bubble
    const userCard = document.createElement("div");
    userCard.className = "flex justify-end";
    userCard.innerHTML = `
      <div class="max-w-[85%] bg-[#161926] border border-[#1F2438] rounded-2xl rounded-tr-sm px-4 py-3 text-xs text-white leading-relaxed font-sans shadow-sm">
        ${prompt.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
      </div>
    `;
    feed.appendChild(userCard);
    input.value = "";
    feed.scrollTop = feed.scrollHeight;

    const systemPrompt = document.getElementById("play-sys-prompt")?.value?.trim() || "";
    const modelId = modelSel?.value || "gemini-3.6-flash";
    const modelObj = apiService.getModel(modelId) || { provider: "Gemini", name: "Gemini 3.6 Flash" };

    // Append Assistant Response Bubble
    const assistantCard = document.createElement("div");
    assistantCard.className = "flex justify-start items-start gap-3";
    assistantCard.innerHTML = `
      <div class="w-7 h-7 rounded-lg bg-[#161926] border border-[#1F2438] flex items-center justify-center text-xs font-bold text-[#38BDF8] shrink-0">
        ✦
      </div>
      <div class="max-w-[85%] bg-[#121522] border border-[#1F2438] rounded-2xl rounded-tl-sm px-4 py-3 text-xs text-[#E2E8F0] leading-relaxed font-sans shadow-sm">
        <div class="stream-text">Connecting to Gateway...</div>
      </div>
    `;
    feed.appendChild(assistantCard);
    feed.scrollTop = feed.scrollHeight;

    const textContainer = assistantCard.querySelector(".stream-text");

    if (latencyStat) latencyStat.innerText = "Querying...";
    if (tokensStat) tokensStat.innerText = "-";
    if (costStat) costStat.innerText = "-";
    if (cacheStat) cacheStat.innerText = "-";
    if (reqIdStat) reqIdStat.innerHTML = "-";

    if (submitBtn) submitBtn.disabled = true;

    // Execute request via real Gateway Proxy
    activeAbort = await apiService.runCompletion(prompt, systemPrompt, modelId, (chunk, requestTraceObj) => {
      if (chunk) {
        if (textContainer.innerText === "Connecting to Gateway...") textContainer.innerText = "";
        textContainer.innerText += chunk;
        feed.scrollTop = feed.scrollHeight;
      } else if (requestTraceObj) {
        activeAbort = null;
        if (submitBtn) submitBtn.disabled = false;
        
        if (requestTraceObj.status === 200) {
          if (latencyStat) latencyStat.innerText = `${requestTraceObj.latency}ms`;
          if (tokensStat) tokensStat.innerText = (requestTraceObj.tokensInput + requestTraceObj.tokensOutput).toLocaleString();
          if (costStat) costStat.innerText = requestTraceObj.cost === 0 ? "$0.00" : `$${requestTraceObj.cost.toFixed(5)}`;
          if (cacheStat) cacheStat.innerHTML = `<span class="px-2 py-0.5 rounded text-[10px] font-mono ${requestTraceObj.cache === "HIT" ? "bg-emerald-500/10 text-emerald-400" : "bg-[#161926] text-[#8E98B0]"}">${requestTraceObj.cache}</span>`;
          if (reqIdStat) reqIdStat.innerHTML = `<span class="font-mono text-[#38BDF8] text-[10px]">${requestTraceObj.id ? requestTraceObj.id.substring(0, 10) + '...' : 'ok'}</span>`;
        } else {
          if (latencyStat) latencyStat.innerText = "Error";
          if (tokensStat) tokensStat.innerText = "0";
          if (costStat) costStat.innerText = "$0.00";
          if (cacheStat) cacheStat.innerHTML = `<span class="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 text-rose-400">ERROR</span>`;
          if (reqIdStat) reqIdStat.innerHTML = `<span class="text-rose-400 font-mono text-[10px]">Failed (${requestTraceObj.status})</span>`;
        }
      }
    });
  });
}

export default {
  appPlayground,
  bindAppPlayground
};
