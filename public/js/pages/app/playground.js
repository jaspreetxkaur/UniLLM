// APP PAGE: playground (Obsidian & Crisp Monochrome AI Studio — Linear / Vercel Developer Aesthetic)
import { apiService, extractErrorMessage } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=35";
import { router } from "../../router.js?v=2";

export function appPlayground() {
  const models = apiService.getModels();
  
  return `
    <div class="flex flex-col gap-4 animate-fade-in-up font-sans text-[#EDEDED] h-[calc(100vh-120px)] min-h-[640px]">
      
      <!-- Top Studio Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none shrink-0 pb-3 border-b border-white/[0.08]">
        <div class="flex items-center gap-3">
          <div class="w-9 h-9 rounded-lg bg-white/[0.04] border border-white/[0.1] flex items-center justify-center text-white">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
          </div>
          <div>
            <div class="flex items-center gap-2">
              <h1 class="font-bold text-lg text-white tracking-tight">AI Studio</h1>
              <span class="px-2 py-0.5 rounded bg-white/[0.05] border border-white/10 text-[10px] font-mono font-medium text-neutral-300 uppercase">
                Gateway Workbench
              </span>
            </div>
            <p class="text-xs text-[#8A8F98]">Test, benchmark, and stream completions across unified model endpoints.</p>
          </div>
        </div>
        
        <!-- Header Controls & Live Metrics -->
        <div class="flex items-center gap-2">
          <!-- Active Model Indicator Capsule -->
          <div class="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-white">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span class="text-[#8A8F98]">Active:</span>
            <span id="header-active-model-name" class="font-medium text-white">Gemini 3.6 Flash</span>
          </div>

          <!-- Quick Code Snippet Generator -->
          <button id="playground-export-code-btn" class="btn-secondary-glass flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-neutral-300 hover:text-white transition-all">
            <svg class="w-3.5 h-3.5 text-neutral-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path></svg>
            <span>cURL Spec</span>
          </button>
        </div>
      </div>

      <!-- Main 3-Column Studio Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 min-h-0">
        
        <!-- ================= COLUMN 1: PROMPT SESSIONS (Col 3) ================= -->
        <div class="hidden lg:flex lg:col-span-3 rounded-xl glass-panel p-3.5 flex-col justify-between select-none overflow-hidden border border-white/[0.08]">
          <div class="flex flex-col gap-3 min-h-0 flex-1 overflow-hidden">
            <div class="flex items-center justify-between pb-2.5 border-b border-white/[0.08]">
              <div class="flex items-center gap-2">
                <span class="text-xs font-medium text-white uppercase tracking-wider font-mono">Sessions</span>
              </div>
              <button id="new-chat-btn" class="flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.05] hover:bg-white/[0.1] border border-white/10 text-[11px] font-medium text-white transition-all cursor-pointer">
                <span>+</span> New Chat
              </button>
            </div>

            <!-- Chat History List -->
            <div id="playground-sessions-list" class="flex flex-col gap-1.5 overflow-y-auto pr-1 flex-1 min-h-0">
              <!-- Dynamically populated from stored sessions -->
            </div>
          </div>

          <!-- Bottom: Clear All Button -->
          <div class="pt-2.5 border-t border-white/[0.08]">
            <button id="clear-conv-btn" class="w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] text-xs font-mono text-[#8A8F98] hover:text-white border border-white/[0.06] transition-all">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
              <span>Clear Feed</span>
            </button>
          </div>
        </div>

        <!-- ================= COLUMN 2: CHAT WORKSPACE FEED (Col 6) ================= -->
        <div class="lg:col-span-6 rounded-xl glass-panel border border-white/[0.08] flex flex-col h-full overflow-hidden relative">
          
          <!-- Message Feed -->
          <div id="play-feed" class="flex-1 p-4 sm:p-5 overflow-y-auto flex flex-col gap-4 select-text">
            
            <!-- Quick Starter Chips Banner -->
            <div id="playground-welcome-hero" class="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs text-[#8A8F98] leading-relaxed">
              <div class="flex items-center gap-2 mb-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span class="font-bold text-white font-mono text-[11px] uppercase">Unified Gateway Ingress</span>
              </div>
              <p class="text-[11px] text-[#8A8F98] mb-3">
                Send queries to any connected provider. Pay upstream token cost, inspect latency, and test live streaming.
              </p>
              
              <!-- Quick Starter Chips -->
              <div class="flex flex-wrap gap-2 pt-2 border-t border-white/[0.06]">
                <button type="button" class="quick-prompt-btn px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[10px] font-mono text-neutral-300 hover:text-white transition-all" data-prompt="Compare latency across Gemini 3.6 Flash and GPT-4o for a standard summarization task.">
                  ⚡ Benchmark Latency
                </button>
                <button type="button" class="quick-prompt-btn px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[10px] font-mono text-neutral-300 hover:text-white transition-all" data-prompt="Extract key metrics into a strict JSON object with fields: title, sentiment, score, and keywords.">
                  🔍 JSON Extraction
                </button>
                <button type="button" class="quick-prompt-btn px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[10px] font-mono text-neutral-300 hover:text-white transition-all" data-prompt="Provide a step-by-step architectural breakdown of an AI Gateway with semantic caching and rate limiting.">
                  🧠 Architecture Plan
                </button>
              </div>
            </div>

            <!-- Default Assistant Welcome Bubble -->
            <div class="flex justify-start items-start gap-3">
              <div class="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">
                ✦
              </div>
              <div class="max-w-[88%] glass-card border border-white/[0.08] rounded-xl rounded-tl-sm p-4 text-xs text-[#EDEDED] leading-relaxed font-sans">
                <div class="stream-text">
                  Welcome to AI Studio. Configure model settings on the right and submit your prompt to stream from the gateway.
                </div>
                
                <div class="flex items-center gap-3 pt-3 mt-3 border-t border-white/[0.06] text-[10px] font-mono text-[#8A8F98]">
                  <span class="flex items-center gap-1 text-emerald-400">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    Gateway Ready
                  </span>
                  <span>•</span>
                  <span>SSE Direct</span>
                </div>
              </div>
            </div>

          </div>
          
          <!-- Bottom Prompt Input Form -->
          <div class="p-3 border-t border-white/[0.08] bg-[#0A0B0E]/90 backdrop-blur-md">
            <!-- File Attachment Chip -->
            <div id="play-attached-file-badge" class="hidden mb-2 px-3 py-1.5 rounded-lg bg-[#141820] border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center justify-between">
              <div class="flex items-center gap-2">
                <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                <span class="font-bold text-[10px] tracking-wider uppercase text-emerald-400">Attached:</span>
                <span id="play-attached-name" class="text-white truncate max-w-[200px] text-[11px] font-mono">file.pdf</span>
                <span class="text-[9px] bg-emerald-500/20 px-1.5 py-0.5 rounded text-emerald-300 font-mono">Uploaded</span>
              </div>
              <button type="button" id="play-remove-attach-btn" class="text-neutral-400 hover:text-rose-400 font-bold px-1 text-sm leading-none">&times;</button>
            </div>
            <input type="file" id="play-file-input" class="hidden" accept=".pdf,.txt,.json,.md,.csv" />

            <form id="play-prompt-form" class="flex items-center gap-2 p-1 rounded-xl bg-[#121419] border border-white/10 focus-within:border-white/30 transition-all">
              <input
                id="play-input"
                type="text"
                autocomplete="off"
                required
                placeholder="Ask anything or test model reasoning..."
                class="flex-1 bg-transparent px-3 py-2 text-xs text-white placeholder-[#8A8F98]/50 outline-none font-sans"
              />
              
              <!-- Quick Attachment Action -->
              <div class="flex items-center gap-1 text-[#8A8F98] px-1">
                <button type="button" id="play-attach-btn" class="p-1.5 hover:text-white hover:bg-white/5 rounded transition-colors flex items-center gap-1" title="Upload document context">
                  <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                  <span class="font-mono text-[10px] text-emerald-400 font-bold hidden sm:inline">Upload File</span>
                </button>
              </div>

              <!-- Linear-Style Crisp White Send Button -->
              <button
                type="submit"
                id="play-submit-btn"
                class="btn-primary-gradient px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shrink-0 transition-all"
              >
                <span>Send</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </button>
            </form>
          </div>

        </div>

        <!-- ================= COLUMN 3: SETTINGS & TELEMETRY (Col 3) ================= -->
        <div class="lg:col-span-3 rounded-xl glass-panel border border-white/[0.08] p-4 flex flex-col justify-between select-none overflow-y-auto">
          
          <div class="flex flex-col gap-4">
            <div class="flex items-center justify-between border-b border-white/[0.08] pb-2.5">
              <span class="font-bold text-xs text-white uppercase tracking-wider font-mono">Parameters</span>
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            </div>
            
            <!-- Model Selection -->
            <div class="flex flex-col gap-1.5">
              <label class="text-[10px] font-mono uppercase tracking-wider text-[#8A8F98]">Active Model</label>
              <select id="play-model-sel" class="p-2.5 rounded-lg border border-white/10 text-xs bg-[#121419] text-white font-medium outline-none focus:border-white/30 transition-colors cursor-pointer">
                ${models.map(m => `<option value="${m.id}" ${m.id === "gemini-3.6-flash" ? "selected" : ""}>${m.name} (${m.provider})</option>`).join("")}
              </select>
            </div>
            
            <!-- Temperature Slider -->
            <div class="flex flex-col gap-1.5">
              <div class="flex justify-between text-xs text-[#8A8F98]">
                <span>Temperature</span>
                <span id="play-temp-lbl" class="font-mono text-white font-bold">0.7</span>
              </div>
              <input id="play-temp-slider" type="range" min="0" max="2" step="0.1" value="0.7" class="w-full slider-glow cursor-pointer" />
            </div>

            <!-- Max Tokens Slider -->
            <div class="flex flex-col gap-1.5">
              <div class="flex justify-between text-xs text-[#8A8F98]">
                <span>Max Tokens</span>
                <span id="play-tokens-lbl" class="font-mono text-white font-bold">1024</span>
              </div>
              <input id="play-tokens-slider" type="range" min="1" max="4000" step="50" value="1024" class="w-full slider-glow cursor-pointer" />
            </div>

            <!-- Toggles -->
            <div class="flex flex-col gap-2.5 pt-2 border-t border-white/[0.08]">
              <div class="flex items-center justify-between text-xs">
                <span class="text-[#8A8F98]">Stream Response</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked id="toggle-stream" class="sr-only peer">
                  <div class="w-8 h-4.5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-white"></div>
                </label>
              </div>

              <div class="flex items-center justify-between text-xs">
                <span class="text-[#8A8F98]">Semantic Cache</span>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked id="toggle-cache" class="sr-only peer">
                  <div class="w-8 h-4.5 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-3.5 after:w-3.5 after:transition-all peer-checked:bg-white"></div>
                </label>
              </div>
            </div>

            <!-- System Directives -->
            <div class="flex flex-col gap-1.5 pt-2 border-t border-white/[0.08]">
              <label class="text-[10px] font-mono uppercase tracking-wider text-[#8A8F98]">System Directives</label>
              <textarea id="play-sys-prompt" rows="2" placeholder="e.g. You are an expert cloud architect..." class="p-2.5 rounded-lg border border-white/10 text-xs bg-[#121419] text-white placeholder-[#8A8F98]/40 focus:border-white/30 outline-none resize-none"></textarea>
            </div>

            <!-- Observability Telemetry Strip -->
            <div class="p-3 rounded-lg bg-black/40 border border-white/[0.08] text-[11px] font-mono space-y-1.5">
              <div class="flex justify-between items-center">
                <span class="text-[#8A8F98]">Latency</span>
                <span id="stat-latency" class="font-bold text-white">-</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-[#8A8F98]">Tokens</span>
                <span id="stat-tokens" class="text-white">-</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-[#8A8F98]">Upstream Cost</span>
                <span id="stat-cost" class="text-emerald-400 font-bold">-</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-[#8A8F98]">Semantic Cache</span>
                <span id="stat-cache" class="text-white">-</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-[#8A8F98]">Trace ID</span>
                <span id="stat-req-id" class="text-neutral-300 truncate max-w-[100px]">-</span>
              </div>
            </div>

          </div>
          
          <!-- Reset Defaults Button -->
          <div class="pt-3 border-t border-white/[0.08]">
            <button id="reset-settings-btn" class="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs font-mono text-[#8A8F98] hover:text-white transition-colors">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
              <span>Reset Defaults</span>
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
  const sessionsList = document.getElementById("playground-sessions-list");
  const newChatBtn = document.getElementById("new-chat-btn");
  const clearConvBtn = document.getElementById("clear-conv-btn");
  
  // Quick Prompt Buttons
  document.querySelectorAll(".quick-prompt-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const promptText = btn.getAttribute("data-prompt");
      if (input && promptText) {
        input.value = promptText;
        input.focus();
      }
    });
  });

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

  // 1. Session Storage & Persistence
  const currentUser = apiService.getCurrentUser();
  const STORAGE_KEY = `unillm_playground_sessions_${currentUser?.id || "default"}`;

  const formatRelativeTime = (timestamp) => {
    if (!timestamp) return "Just now";
    const diffSec = Math.floor((Date.now() - timestamp) / 1000);
    if (diffSec < 60) return "Just now";
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour}h ago`;
    const diffDays = Math.floor(diffHour / 24);
    if (diffDays === 1) return "Yesterday";
    return `${diffDays}d ago`;
  };

  const getDefaultSessions = () => [
    {
      id: "session_audit_1",
      title: "Gateway Architecture Audit",
      model: "gemini-3.6-flash",
      updatedAt: Date.now() - 2 * 60 * 1000,
      messages: [
        {
          role: "user",
          content: "Provide a high-level security and latency audit of our multi-provider AI Gateway."
        },
        {
          role: "assistant",
          content: "### UniLLM Gateway Architecture Audit Report\n\n1. **Unified Ingress & Edge Proxying**:\n   - Sub-50ms token routing across Gemini, OpenAI, and Anthropic.\n   - Automated upstream rate-limit detection with 0-downtime failover.\n\n2. **Security & Zero-Trust Governance**:\n   - End-to-end PII masking in volatile memory.\n   - Granular RBAC enforcing workspace-level tenant isolation.\n\n3. **Semantic Caching Efficiency**:\n   - Up to 74% reduction in upstream token billing for repeated prompt embeddings.",
          trace: { status: 200, latency: 142, tokensInput: 45, tokensOutput: 180, cost: 0.00012, cache: "HIT", id: "tr_audit_01" }
        }
      ]
    },
    {
      id: "session_json_2",
      title: "JSON Extraction Schema",
      model: "gpt-4o",
      updatedAt: Date.now() - 18 * 60 * 1000,
      messages: [
        {
          role: "user",
          content: "Extract key metrics into a strict JSON object with fields: title, sentiment, score, and keywords."
        },
        {
          role: "assistant",
          content: "```json\n{\n  \"title\": \"Q3 Production Gateway Telemetry\",\n  \"sentiment\": \"OPTIMAL\",\n  \"score\": 0.98,\n  \"keywords\": [\"gateway\", \"latency\", \"failover\", \"resilience\"]\n}\n```",
          trace: { status: 200, latency: 280, tokensInput: 32, tokensOutput: 68, cost: 0.00045, cache: "MISS", id: "tr_json_02" }
        }
      ]
    },
    {
      id: "session_code_3",
      title: "Code Refactoring & Types",
      model: "claude-3.5-sonnet",
      updatedAt: Date.now() - 60 * 60 * 1000,
      messages: [
        {
          role: "user",
          content: "How do I ensure type safety for SSE streaming events across Express and browser Fetch?"
        },
        {
          role: "assistant",
          content: "Use typed event discriminators with a shared TypeScript interface:\n```typescript\ntype StreamEvent =\n  | { type: 'chunk'; text: string }\n  | { type: 'trace'; traceId: string; latencyMs: number }\n  | { type: 'done' };\n```\nThis prevents malformed buffer decoding in downstream client consumers.",
          trace: { status: 200, latency: 310, tokensInput: 52, tokensOutput: 110, cost: 0.00062, cache: "HIT", id: "tr_code_03" }
        }
      ]
    },
    {
      id: "session_agent_4",
      title: "Multi-turn Agent Dialog",
      model: "llama-3.3-70b",
      updatedAt: Date.now() - 24 * 60 * 60 * 1000,
      messages: [
        {
          role: "user",
          content: "Can the gateway orchestrate multiple autonomous agent tools with shared memory?"
        },
        {
          role: "assistant",
          content: "Yes. UniLLM maintains a distributed session state where tool invocations execute as transactional pipeline steps with full audit logging.",
          trace: { status: 200, latency: 420, tokensInput: 64, tokensOutput: 135, cost: 0.00038, cache: "MISS", id: "tr_agent_04" }
        }
      ]
    }
  ];

  const loadSessions = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasContent = parsed.some(s => s.messages && s.messages.length > 0);
          if (hasContent) return parsed;
        }
      }
    } catch (_) {}
    const defaults = getDefaultSessions();
    saveSessions(defaults);
    return defaults;
  };

  const saveSessions = (data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (_) {}
  };

  let sessions = loadSessions();
  let activeSessionId = sessions[0]?.id || `session_${Date.now()}`;

  const resetTelemetry = () => {
    if (latencyStat) latencyStat.innerText = "-";
    if (tokensStat) tokensStat.innerText = "-";
    if (costStat) costStat.innerText = "-";
    if (cacheStat) cacheStat.innerText = "-";
    if (reqIdStat) reqIdStat.innerText = "-";
  };

  const applyTelemetry = (trace) => {
    if (!trace) {
      resetTelemetry();
      return;
    }
    if (trace.status === 200) {
      if (latencyStat) latencyStat.innerText = `${trace.latency}ms`;
      if (tokensStat) tokensStat.innerText = (trace.tokensInput + trace.tokensOutput).toLocaleString();
      if (costStat) costStat.innerText = trace.cost === 0 ? "$0.00" : `$${trace.cost.toFixed(5)}`;
      if (cacheStat) cacheStat.innerHTML = `<span class="px-2 py-0.5 rounded text-[10px] font-mono ${trace.cache === "HIT" ? "bg-emerald-500/10 text-emerald-400" : "bg-white/[0.04] text-[#8A8F98]"}">${trace.cache}</span>`;
      if (reqIdStat) reqIdStat.innerHTML = `<span class="font-mono text-white text-[10px]">${trace.id ? trace.id.substring(0, 10) + '...' : 'ok'}</span>`;
    } else {
      if (latencyStat) latencyStat.innerText = "Error";
      if (tokensStat) tokensStat.innerText = "0";
      if (costStat) costStat.innerText = "$0.00";
      if (cacheStat) cacheStat.innerHTML = `<span class="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/10 text-rose-400">ERROR</span>`;
      if (reqIdStat) reqIdStat.innerHTML = `<span class="text-rose-400 font-mono text-[10px]">Failed (${trace.status})</span>`;
    }
  };

  const bindQuickPromptButtons = () => {
    document.querySelectorAll(".quick-prompt-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const promptText = btn.getAttribute("data-prompt");
        if (input && promptText) {
          input.value = promptText;
          input.focus();
        }
      });
    });
  };

  // Render Chat Feed for the active session
  const renderChatFeed = (session) => {
    if (!feed) return;
    if (!session || !session.messages || session.messages.length === 0) {
      feed.innerHTML = `
        <div id="playground-welcome-hero" class="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08] text-xs text-[#8A8F98] leading-relaxed">
          <div class="flex items-center gap-2 mb-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span class="font-bold text-white font-mono text-[11px] uppercase">Unified Gateway Ingress</span>
          </div>
          <p class="text-[11px] text-[#8A8F98] mb-3">
            Send queries to any connected provider. Pay upstream token cost, inspect latency, and test live streaming.
          </p>
          <div class="flex flex-wrap gap-2 pt-2 border-t border-white/[0.06]">
            <button type="button" class="quick-prompt-btn px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[10px] font-mono text-neutral-300 hover:text-white transition-all" data-prompt="Compare latency across Gemini 3.6 Flash and GPT-4o for a standard summarization task.">
              ⚡ Benchmark Latency
            </button>
            <button type="button" class="quick-prompt-btn px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[10px] font-mono text-neutral-300 hover:text-white transition-all" data-prompt="Extract entity relations from user query into JSON format.">
              🔍 JSON Extraction
            </button>
            <button type="button" class="quick-prompt-btn px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] text-[10px] font-mono text-neutral-300 hover:text-white transition-all" data-prompt="Generate a step-by-step microservice architecture with fallback policies.">
              🧠 Architecture Plan
            </button>
          </div>
        </div>
      `;
      bindQuickPromptButtons();
      resetTelemetry();
      return;
    }

    feed.innerHTML = session.messages.map(m => {
      if (m.role === 'user') {
        return `
          <div class="flex justify-end">
            <div class="max-w-[85%] bg-white/[0.06] border border-white/15 rounded-xl rounded-tr-sm px-4 py-3 text-xs text-white leading-relaxed font-sans shadow-sm whitespace-pre-wrap break-words">
              ${m.content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
            </div>
          </div>
        `;
      } else {
        return `
          <div class="flex justify-start items-start gap-3">
            <div class="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">
              ✦
            </div>
            <div class="max-w-[85%] glass-card border border-white/[0.08] rounded-xl rounded-tl-sm px-4 py-3 text-xs text-[#EDEDED] leading-relaxed font-sans shadow-sm">
              <div class="stream-text whitespace-pre-wrap break-words leading-relaxed font-sans text-xs text-[#EDEDED] select-text">${m.content.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</div>
            </div>
          </div>
        `;
      }
    }).join("");

    feed.scrollTop = feed.scrollHeight;

    const lastTrace = [...session.messages].reverse().find(m => m.role === 'assistant' && m.trace);
    if (lastTrace && lastTrace.trace) {
      applyTelemetry(lastTrace.trace);
    } else {
      resetTelemetry();
    }
  };

  // Render Sessions Sidebar dynamically
  const renderSessionsList = () => {
    if (!sessionsList) return;

    if (!sessions || sessions.length === 0) {
      sessionsList.innerHTML = `
        <div class="p-4 text-center text-xs text-[#8A8F98]/60">
          No sessions yet. Click "+ New Chat" to start.
        </div>
      `;
      return;
    }

    sessionsList.innerHTML = sessions.map(s => {
      const isActive = s.id === activeSessionId;
      const timeStr = formatRelativeTime(s.updatedAt);
      const modelLabel = (s.model || "gemini-3.6-flash").replace(/-/g, " ");

      return `
        <div class="group relative flex items-center">
          <button class="chat-session-item w-full text-left p-2.5 rounded-lg text-xs transition-all flex flex-col gap-0.5 pr-8 ${
            isActive 
              ? 'bg-white/[0.08] border border-white/20 shadow-sm' 
              : 'hover:bg-white/[0.03] border border-transparent hover:border-white/10'
          }" data-id="${s.id}">
            <div class="flex items-center justify-between gap-1">
              <span class="font-medium truncate ${isActive ? 'text-white' : 'text-[#8A8F98] group-hover:text-white'}">
                ${s.title || "New Conversation"}
              </span>
              ${isActive ? '<span class="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0"></span>' : ''}
            </div>
            <span class="text-[10px] text-[#8A8F98]/70 font-mono truncate">
              ${timeStr} • ${modelLabel}
            </span>
          </button>
          <button class="delete-session-btn absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 p-1 hover:bg-rose-500/20 text-[#8A8F98] hover:text-rose-400 rounded transition-all cursor-pointer" data-id="${s.id}" title="Delete session">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
          </button>
        </div>
      `;
    }).join("");

    sessionsList.querySelectorAll(".chat-session-item").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (id && id !== activeSessionId) {
          switchSession(id);
        }
      });
    });

    sessionsList.querySelectorAll(".delete-session-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-id");
        deleteSession(id);
      });
    });
  };

  const switchSession = (id) => {
    if (activeAbort) {
      activeAbort();
      activeAbort = null;
      if (submitBtn) submitBtn.disabled = false;
    }
    activeSessionId = id;
    const session = sessions.find(s => s.id === id);
    if (!session) return;

    if (modelSel && session.model) {
      modelSel.value = session.model;
      if (headerModelName) {
        const opt = modelSel.options[modelSel.selectedIndex];
        headerModelName.innerText = opt ? opt.text.split("(")[0].trim() : session.model;
      }
    }

    renderChatFeed(session);
    renderSessionsList();
  };

  const createNewChat = () => {
    if (activeAbort) {
      activeAbort();
      activeAbort = null;
      if (submitBtn) submitBtn.disabled = false;
    }

    const currentModel = modelSel?.value || "gemini-3.6-flash";
    const newSession = {
      id: `session_${Date.now()}`,
      title: "New Conversation",
      model: currentModel,
      updatedAt: Date.now(),
      messages: []
    };

    sessions.unshift(newSession);
    activeSessionId = newSession.id;
    saveSessions(sessions);

    renderSessionsList();
    renderChatFeed(newSession);

    if (input) {
      input.value = "";
      input.focus();
    }
    components.renderToast("info", "New chat session created");
  };

  const deleteSession = (id) => {
    sessions = sessions.filter(s => s.id !== id);
    if (sessions.length === 0) {
      sessions = [
        {
          id: `session_${Date.now()}`,
          title: "New Conversation",
          model: modelSel?.value || "gemini-3.6-flash",
          updatedAt: Date.now(),
          messages: []
        }
      ];
    }
    if (activeSessionId === id) {
      activeSessionId = sessions[0].id;
    }
    saveSessions(sessions);
    renderSessionsList();
    const active = sessions.find(s => s.id === activeSessionId) || sessions[0];
    renderChatFeed(active);
    components.renderToast("info", "Session deleted.");
  };

  clearConvBtn?.addEventListener("click", () => {
    const currentSession = sessions.find(s => s.id === activeSessionId);
    if (currentSession) {
      currentSession.messages = [];
      saveSessions(sessions);
      renderChatFeed(currentSession);
    }
    components.renderToast("info", "Playground logs cleared for current session.");
  });

  newChatBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    createNewChat();
  });

  document.addEventListener("click", (e) => {
    if (e.target.closest("#new-chat-btn")) {
      e.preventDefault();
      createNewChat();
    }
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

  // Export cURL spec button
  const exportCurlBtn = document.getElementById("playground-export-code-btn");
  exportCurlBtn?.addEventListener("click", () => {
    const modelId = modelSel?.value || "gemini-3.6-flash";
    const temp = tempSlider?.value || "0.7";
    const cURL = `curl https://api.unillm.com/v1/chat/completions \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "model": "${modelId}",\n    "messages": [{"role": "user", "content": "Hello UniLLM!"}],\n    "temperature": ${temp}\n  }'`;
    navigator.clipboard.writeText(cURL);
    components.renderToast("success", "cURL spec copied to clipboard!");
  });

  // Multer Document Attachment in Playground
  const playAttachBtn = document.getElementById("play-attach-btn");
  const playFileInput = document.getElementById("play-file-input");
  const playAttachedBadge = document.getElementById("play-attached-file-badge");
  const playAttachedName = document.getElementById("play-attached-name");
  const playRemoveAttachBtn = document.getElementById("play-remove-attach-btn");
  let activeAttachedDoc = null;

  playAttachBtn?.addEventListener("click", () => {
    playFileInput?.click();
  });

  playFileInput?.addEventListener("change", async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      components.renderToast("error", "File exceeds 5MB payload limit.");
      return;
    }

    const currentWs = apiService.getActiveWorkspace() || { id: "default" };
    components.renderToast("info", `Uploading "${file.name}"...`);

    const res = await apiService.uploadDocument(currentWs.id, file);
    if (res.success) {
      activeAttachedDoc = res.document || { originalName: file.name };
      if (playAttachedName) playAttachedName.innerText = file.name;
      playAttachedBadge?.classList.remove("hidden");
      components.renderToast("success", `File attached: ${file.name}`);
    } else {
      components.renderToast("error", extractErrorMessage(res, "Failed to upload file."));
    }
  });

  playRemoveAttachBtn?.addEventListener("click", () => {
    activeAttachedDoc = null;
    if (playFileInput) playFileInput.value = "";
    playAttachedBadge?.classList.add("hidden");
  });

  form?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const prompt = input.value.trim();
    if (!prompt) return;

    let finalPrompt = prompt;
    if (activeAttachedDoc) {
      finalPrompt = `${prompt}\n\n[Attached Knowledge Document: ${activeAttachedDoc.originalName}]`;
      activeAttachedDoc = null;
      if (playFileInput) playFileInput.value = "";
      playAttachedBadge?.classList.add("hidden");
    }

    let currentSession = sessions.find(s => s.id === activeSessionId);
    if (!currentSession) {
      createNewChat();
      currentSession = sessions.find(s => s.id === activeSessionId);
    }

    // Auto-name session from first prompt if title is generic
    if (currentSession.title === "New Conversation" || !currentSession.title) {
      currentSession.title = prompt.length > 30 ? prompt.slice(0, 30) + "..." : prompt;
    }

    currentSession.updatedAt = Date.now();
    currentSession.model = modelSel?.value || "gemini-3.6-flash";

    // Save user message to session
    currentSession.messages.push({ role: 'user', content: finalPrompt });
    
    // Ensure active session is at top of sessions history list
    const sIndex = sessions.findIndex(s => s.id === currentSession.id);
    if (sIndex > 0) {
      sessions.splice(sIndex, 1);
      sessions.unshift(currentSession);
    }

    saveSessions(sessions);
    renderSessionsList();

    if (activeAbort) {
      activeAbort();
      activeAbort = null;
    }

    // If welcome hero was present, clear feed container
    const welcomeHero = document.getElementById("playground-welcome-hero");
    if (welcomeHero) welcomeHero.remove();

    // Append User Prompt Bubble (Linear Style Crisp Card)
    const userCard = document.createElement("div");
    userCard.className = "flex justify-end";
    userCard.innerHTML = `
      <div class="max-w-[85%] bg-white/[0.06] border border-white/15 rounded-xl rounded-tr-sm px-4 py-3 text-xs text-white leading-relaxed font-sans shadow-sm whitespace-pre-wrap break-words">
        ${prompt.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
      </div>
    `;
    feed.appendChild(userCard);
    input.value = "";
    feed.scrollTop = feed.scrollHeight;

    const systemPrompt = document.getElementById("play-sys-prompt")?.value?.trim() || "";
    const modelId = modelSel?.value || "gemini-3.6-flash";

    // Append Assistant Response Bubble
    const assistantCard = document.createElement("div");
    assistantCard.className = "flex justify-start items-start gap-3";
    assistantCard.innerHTML = `
      <div class="w-7 h-7 rounded-lg bg-white/[0.05] border border-white/10 flex items-center justify-center text-xs font-bold text-white shrink-0">
        ✦
      </div>
      <div class="max-w-[85%] glass-card border border-white/[0.08] rounded-xl rounded-tl-sm px-4 py-3 text-xs text-[#EDEDED] leading-relaxed font-sans shadow-sm">
        <div class="stream-text whitespace-pre-wrap break-words leading-relaxed font-sans text-xs text-[#EDEDED] select-text">Connecting to Gateway...</div>
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

    let accumulatedText = "";
    let isFirstChunk = true;

    // Execute request via real Gateway Proxy
    activeAbort = await apiService.runCompletion(prompt, systemPrompt, modelId, (chunk, requestTraceObj) => {
      if (chunk) {
        if (isFirstChunk) {
          textContainer.textContent = "";
          isFirstChunk = false;
        }
        accumulatedText += chunk;
        textContainer.textContent = accumulatedText;
        feed.scrollTop = feed.scrollHeight;
      } else if (requestTraceObj) {
        activeAbort = null;
        if (submitBtn) submitBtn.disabled = false;
        
        applyTelemetry(requestTraceObj);

        // Save assistant message with telemetry to session
        currentSession.messages.push({
          role: 'assistant',
          content: accumulatedText,
          trace: requestTraceObj
        });
        currentSession.updatedAt = Date.now();
        saveSessions(sessions);
        renderSessionsList();
      }
    });
  });

  // Initial render on page load
  const activeSession = sessions.find(s => s.id === activeSessionId) || sessions[0];
  renderSessionsList();
  renderChatFeed(activeSession);
}

export default {
  appPlayground,
  bindAppPlayground
};
