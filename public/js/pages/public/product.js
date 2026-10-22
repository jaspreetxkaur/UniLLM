// PUBLIC PAGE: product (AI Gateway Platform Redesign)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";
import { icons } from "../../icons.js?v=2";

export function product() {
  const testimonials = [
    {
      quote: "UniLLM gives NVIDIA engineers a single, consistent way to access more than 100 AI model endpoints across cloud providers, open source deployments, and internal NVIDIA services.",
      author: "Ajay Dogra",
      role: "Product, NVIDIA",
      avatarBg: "bg-[#76B900]/20 text-[#76B900] border border-[#76B900]/40",
      company: "NVIDIA",
      headline: "Single access source with consistency"
    },
    {
      quote: "UniLLM has let my team provide the latest LLM models to our users, usually within a day of them being released… it has saved us months of work.",
      author: "David Leen",
      role: "Staff Software Engineer, Netflix",
      avatarBg: "bg-[#E50914]/20 text-[#E50914] border border-[#E50914]/40",
      company: "Netflix",
      headline: "New models in a day, not hours of rework"
    },
    {
      quote: "UniLLM streamlines the complexities of managing multiple LLM models across our distributed production workloads.",
      author: "Mark Koltnuk",
      role: "Principal Architect, GenAI Platform, Lemonade",
      avatarBg: "bg-[#FF0055]/20 text-[#FF0055] border border-[#FF0055]/40",
      company: "Lemonade",
      headline: "Multiple models, one interface"
    },
    {
      quote: "If we decide to switch the backend model, it’s a simple configuration update in the gateway; no code changes, procurement cycles, or repetitive security reviews required.",
      author: "Dennis Henry",
      role: "Productivity Architect, Okta",
      avatarBg: "bg-[#007DC1]/20 text-[#007DC1] border border-[#007DC1]/40",
      company: "Okta",
      headline: "Swap models without new security reviews"
    }
  ];

  return `
    <div class="relative overflow-hidden w-full font-sans bg-[#07080B] text-white">
      <!-- Ambient Radial Lighting -->
      <div class="absolute top-[2%] left-[10%] w-[600px] h-[600px] rounded-full blur-[180px] bg-[#38BDF8]/5 pointer-events-none -z-10"></div>
      <div class="absolute top-[40%] right-[5%] w-[700px] h-[700px] rounded-full blur-[200px] bg-indigo-500/5 pointer-events-none -z-10"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col gap-24">

        <!-- =========================================================
             1. EDITORIAL HERO SECTION (Distinct from Landing Page)
        ========================================================= -->
        <section class="flex flex-col lg:flex-row items-center justify-between gap-12 pt-6 pb-12 border-b border-[#1F2438]">
          <div class="flex-1 flex flex-col gap-6 max-w-2xl animate-fade-in-up">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161926] border border-[#1F2438] text-[#38BDF8] text-[11px] font-mono font-bold tracking-wider self-start">
              <span class="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse"></span>
              AI GATEWAY ENGINE • PRODUCTION READY
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              A single intelligent proxy for all <span class="text-[#38BDF8]">frontier models</span>.
            </h1>

            <p class="text-sm sm:text-base text-[#8E98B0] leading-relaxed">
              Standardize your AI infrastructure with a unified OpenAI-compatible endpoint. Route by latency, enforce budgets, cache semantically, and achieve zero downtime with automated upstream failovers.
            </p>

            <div class="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/get-started"
                data-link
                class="px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-[#07080B] text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>Deploy Gateway Free</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
              <a
                href="#connected-workflow"
                class="px-6 py-3 rounded-full bg-[#161926] hover:bg-[#1F2438] text-white border border-[#1F2438] hover:border-[#38BDF8]/40 text-xs font-semibold transition-all inline-flex items-center gap-2"
              >
                <span>Explore Architecture</span>
                <svg class="w-3.5 h-3.5 text-[#8E98B0]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg>
              </a>
            </div>

            <!-- Fast Metrics Badges -->
            <div class="grid grid-cols-3 gap-4 pt-6 border-t border-[#1F2438]/70 text-xs">
              <div>
                <div class="font-mono text-lg font-bold text-white">&lt; 1.2ms</div>
                <div class="text-[11px] text-[#8E98B0]">Proxy Overhead</div>
              </div>
              <div>
                <div class="font-mono text-lg font-bold text-emerald-400">99.99%</div>
                <div class="text-[11px] text-[#8E98B0]">Uptime Guarantee</div>
              </div>
              <div>
                <div class="font-mono text-lg font-bold text-[#38BDF8]">100+</div>
                <div class="text-[11px] text-[#8E98B0]">Supported LLMs</div>
              </div>
            </div>
          </div>

          <!-- Hero Right: Live Gateway Edge Inspector Visual -->
          <div class="flex-1 w-full max-w-lg lg:max-w-none rounded-2xl border border-[#1F2438] bg-[#10121A] p-5 shadow-2xl relative overflow-hidden">
            <div class="flex items-center justify-between pb-3 mb-4 border-b border-[#1F2438] text-xs">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                <span class="font-mono text-[11px] text-[#8E98B0] ml-2">gateway-edge-us-east.unillm.io</span>
              </div>
              <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[10px]">LIVE 200 OK</span>
            </div>

            <!-- Live Routing Pipeline View -->
            <div class="space-y-3 font-mono text-xs">
              <div class="p-3 rounded-xl bg-[#0A0C13] border border-[#1F2438] flex items-center justify-between">
                <div class="flex items-center gap-2.5">
                  <span class="px-2 py-0.5 rounded bg-[#38BDF8]/10 text-[#38BDF8] text-[10px] font-bold">POST</span>
                  <span class="text-white">/v1/chat/completions</span>
                </div>
                <span class="text-[#8E98B0] text-[11px]">420 tokens</span>
              </div>

              <!-- Gateway Processing Steps -->
              <div class="pl-4 border-l-2 border-[#38BDF8]/40 space-y-2 py-1 text-[11px]">
                <div class="flex items-center justify-between text-[#8E98B0]">
                  <span class="flex items-center gap-1.5 text-white">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></span>
                    1. Semantic Cache Check
                  </span>
                  <span class="text-amber-400 font-bold">MISS (0.8ms)</span>
                </div>
                <div class="flex items-center justify-between text-[#8E98B0]">
                  <span class="flex items-center gap-1.5 text-white">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></span>
                    2. Data Masking & PII Filter
                  </span>
                  <span class="text-emerald-400 font-bold">CLEAN (0.3ms)</span>
                </div>
                <div class="flex items-center justify-between text-[#8E98B0]">
                  <span class="flex items-center gap-1.5 text-white">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    3. Smart Route: Target
                  </span>
                  <span class="text-[#38BDF8] font-bold">anthropic/claude-3-5-sonnet</span>
                </div>
                <div class="flex items-center justify-between text-[#8E98B0]">
                  <span class="flex items-center gap-1.5 text-white">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    4. Streaming Stream-Through
                  </span>
                  <span class="text-emerald-400 font-bold">285ms to first token</span>
                </div>
              </div>

              <!-- Provider Health Status Row -->
              <div class="pt-3 border-t border-[#1F2438] flex items-center justify-between text-[11px]">
                <div class="flex items-center gap-3">
                  <span class="flex items-center gap-1 text-[#8E98B0]"><span class="w-2 h-2 rounded-full bg-emerald-400"></span> OpenAI</span>
                  <span class="flex items-center gap-1 text-[#8E98B0]"><span class="w-2 h-2 rounded-full bg-emerald-400"></span> Anthropic</span>
                  <span class="flex items-center gap-1 text-[#8E98B0]"><span class="w-2 h-2 rounded-full bg-emerald-400"></span> Gemini</span>
                </div>
                <span class="text-[#38BDF8] text-[10px]">Zero Down-Time Mesh</span>
              </div>
            </div>
          </div>
        </section>

        <!-- =========================================================
             2. SECTION B: CONNECTED VISUAL FLOW (APPLICATION -> GATEWAY -> PROVIDER -> RESPONSE)
        ========================================================= -->
        <section id="connected-workflow" class="reveal-on-scroll flex flex-col gap-10">
          <div class="flex flex-col gap-3 text-center max-w-2xl mx-auto">
            <span class="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">End-to-End Visual Workflow</span>
            <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              How requests flow through the UniLLM Gateway
            </h2>
            <p class="text-xs sm:text-sm text-[#8E98B0] leading-relaxed">
              Every query executes in real-time through an ultra-fast proxy pipeline with hardware-accelerated routing, automatic fallback, and instant token streaming.
            </p>
          </div>

          <!-- The 4-Step Connected Workflow Diagram with Animated SVG Beam -->
          <div class="relative rounded-2xl bg-[#10121A] border border-[#1F2438] p-6 lg:p-10 overflow-hidden">
            
            <!-- SVG Flow Line on Desktop -->
            <div class="hidden lg:block absolute top-[90px] left-[12%] right-[12%] h-4 pointer-events-none z-0">
              <svg class="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 800 20">
                <!-- Base Track -->
                <line x1="0" y1="10" x2="800" y2="10" stroke="#1F2438" stroke-width="2" stroke-dasharray="4 4" />
                <!-- Animated Travelling Electric Blue Beam -->
                <line x1="0" y1="10" x2="800" y2="10" stroke="#38BDF8" stroke-width="2.5" class="animate-flow-beam" />
              </svg>
            </div>

            <!-- Steps Grid -->
            <div class="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <!-- Step 1: Application Client -->
              <div class="p-5 rounded-xl bg-[#0A0C13] border border-[#1F2438] hover:border-[#38BDF8]/60 transition-all group flex flex-col justify-between">
                <div class="flex flex-col gap-3">
                  <div class="flex items-center justify-between">
                    <span class="w-8 h-8 rounded-lg bg-[#38BDF8]/10 text-[#38BDF8] flex items-center justify-center font-mono font-bold text-xs border border-[#38BDF8]/20 group-hover:scale-110 transition-transform">
                      01
                    </span>
                    <span class="text-[10px] font-mono text-[#8E98B0] px-2 py-0.5 rounded bg-[#161926]">Input</span>
                  </div>
                  <h3 class="text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors">1. Application Client</h3>
                  <p class="text-xs text-[#8E98B0] leading-relaxed">
                    Your service sends standard OpenAI SDK requests pointing to <code class="text-[#38BDF8] text-[10px]">api.unillm.io/v1</code>.
                  </p>
                </div>
                <div class="mt-4 pt-3 border-t border-[#1F2438]/80 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Standard SDK Compatibility
                </div>
              </div>

              <!-- Step 2: UniLLM Gateway Edge -->
              <div class="p-5 rounded-xl bg-[#0A0C13] border border-[#1F2438] hover:border-[#38BDF8]/60 transition-all group flex flex-col justify-between">
                <div class="flex flex-col gap-3">
                  <div class="flex items-center justify-between">
                    <span class="w-8 h-8 rounded-lg bg-[#38BDF8]/10 text-[#38BDF8] flex items-center justify-center font-mono font-bold text-xs border border-[#38BDF8]/20 group-hover:scale-110 transition-transform">
                      02
                    </span>
                    <span class="text-[10px] font-mono text-[#38BDF8] px-2 py-0.5 rounded bg-[#38BDF8]/10">Edge Core</span>
                  </div>
                  <h3 class="text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors">2. UniLLM Gateway</h3>
                  <p class="text-xs text-[#8E98B0] leading-relaxed">
                    Instantly verifies API key credentials, queries the semantic cache, applies PII masking, and picks the optimal route.
                  </p>
                </div>
                <div class="mt-4 pt-3 border-t border-[#1F2438]/80 text-[10px] font-mono text-[#38BDF8] flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></span> Cache, Guardrails & Policy
                </div>
              </div>

              <!-- Step 3: Model Provider -->
              <div class="p-5 rounded-xl bg-[#0A0C13] border border-[#1F2438] hover:border-[#38BDF8]/60 transition-all group flex flex-col justify-between">
                <div class="flex flex-col gap-3">
                  <div class="flex items-center justify-between">
                    <span class="w-8 h-8 rounded-lg bg-[#38BDF8]/10 text-[#38BDF8] flex items-center justify-center font-mono font-bold text-xs border border-[#38BDF8]/20 group-hover:scale-110 transition-transform">
                      03
                    </span>
                    <span class="text-[10px] font-mono text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10">Upstream</span>
                  </div>
                  <h3 class="text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors">3. Model Provider</h3>
                  <p class="text-xs text-[#8E98B0] leading-relaxed">
                    Executes query across OpenAI, Anthropic, Gemini, Groq, or AWS Bedrock with automatic retry on 429/5xx.
                  </p>
                </div>
                <div class="mt-4 pt-3 border-t border-[#1F2438]/80 text-[10px] font-mono text-indigo-400 flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-indigo-400"></span> 50ms Auto-Fallback
                </div>
              </div>

              <!-- Step 4: Streamed Response -->
              <div class="p-5 rounded-xl bg-[#0A0C13] border border-[#1F2438] hover:border-[#38BDF8]/60 transition-all group flex flex-col justify-between">
                <div class="flex flex-col gap-3">
                  <div class="flex items-center justify-between">
                    <span class="w-8 h-8 rounded-lg bg-[#38BDF8]/10 text-[#38BDF8] flex items-center justify-center font-mono font-bold text-xs border border-[#38BDF8]/20 group-hover:scale-110 transition-transform">
                      04
                    </span>
                    <span class="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10">Output</span>
                  </div>
                  <h3 class="text-sm font-bold text-white group-hover:text-[#38BDF8] transition-colors">4. Stream Response</h3>
                  <p class="text-xs text-[#8E98B0] leading-relaxed">
                    Streams Server-Sent Events (SSE) tokens directly to client, records trace latency, and updates spend quotas.
                  </p>
                </div>
                <div class="mt-4 pt-3 border-t border-[#1F2438]/80 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Real-Time Telemetry
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- =========================================================
             3. SPLIT-SCREEN ARCHITECTURE DEEP-DIVE WITH CODE SWITCHER
        ========================================================= -->
        <section class="reveal-on-scroll flex flex-col lg:flex-row items-center gap-12">
          
          <!-- Left: Feature Tabs & Bullet Points -->
          <div class="flex-1 flex flex-col gap-6">
            <div class="flex flex-col gap-2">
              <span class="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">Enterprise Capabilities</span>
              <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Eliminate fragility without refactoring your codebase.
              </h2>
              <p class="text-xs sm:text-sm text-[#8E98B0] leading-relaxed">
                Click a capability below to inspect how the gateway handles enterprise traffic automatically.
              </p>
            </div>

            <!-- Tab Buttons -->
            <div class="flex flex-col gap-3" id="product-capability-tabs">
              
              <button data-tab="routing" class="capability-tab-btn active text-left p-4 rounded-xl border border-[#38BDF8] bg-[#161926] transition-all">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-sm font-bold text-white">1. Intelligent Multi-Provider Fallback</span>
                  <span class="text-[10px] font-mono text-[#38BDF8] font-bold">ACTIVE</span>
                </div>
                <p class="text-xs text-[#8E98B0]">When OpenAI returns 429 or 503, the gateway immediately fails over to Claude 3.5 or Groq without client disruption.</p>
              </button>

              <button data-tab="caching" class="capability-tab-btn text-left p-4 rounded-xl border border-[#1F2438] bg-[#10121A] hover:border-[#38BDF8]/40 transition-all">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-sm font-bold text-white">2. High-Hit Semantic Caching</span>
                  <span class="text-[10px] font-mono text-[#8E98B0]">SUB-10MS</span>
                </div>
                <p class="text-xs text-[#8E98B0]">Vector-similarity cache serves semantically identical requests in under 10ms, cutting API costs by up to 88%.</p>
              </button>

              <button data-tab="guardrails" class="capability-tab-btn text-left p-4 rounded-xl border border-[#1F2438] bg-[#10121A] hover:border-[#38BDF8]/40 transition-all">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-sm font-bold text-white">3. PII Masking & Data Residency</span>
                  <span class="text-[10px] font-mono text-[#8E98B0]">COMPLIANCE</span>
                </div>
                <p class="text-xs text-[#8E98B0]">Redacts credit cards, SSNs, and medical records before payloads exit your private network perimeter.</p>
              </button>

            </div>
          </div>

          <!-- Right: Interactive Code Panel matching Active Tab -->
          <div class="flex-1 w-full rounded-2xl bg-[#0A0C13] border border-[#1F2438] p-5 shadow-2xl overflow-hidden font-mono text-xs">
            
            <!-- Code Header with Language Switchers -->
            <div class="flex items-center justify-between pb-3 mb-4 border-b border-[#1F2438]">
              <div class="flex items-center gap-2">
                <span id="code-snippet-title" class="text-xs font-semibold text-white">Fallback Configuration (TypeScript)</span>
              </div>
              <div class="flex items-center gap-1.5" id="code-lang-selector">
                <button data-lang="ts" class="code-lang-btn px-2.5 py-1 rounded bg-[#161926] text-white border border-[#1F2438] text-[10px]">TS</button>
                <button data-lang="py" class="code-lang-btn px-2.5 py-1 rounded text-[#8E98B0] hover:text-white text-[10px]">Python</button>
                <button data-lang="curl" class="code-lang-btn px-2.5 py-1 rounded text-[#8E98B0] hover:text-white text-[10px]">cURL</button>
              </div>
            </div>

            <!-- Preformatted Code Block -->
            <pre class="overflow-x-auto text-[#8E98B0] leading-relaxed text-[11px] p-2" id="product-code-display"><code>import OpenAI from 'openai';

// Simply swap the baseURL to your UniLLM Gateway
const client = new OpenAI({
  apiKey: process.env.UNILLM_API_KEY,
  baseURL: 'https://api.unillm.io/v1',
  defaultHeaders: {
    'x-unillm-fallback': 'anthropic/claude-3-5-sonnet,groq/llama-3.3-70b',
    'x-unillm-cache': 'true'
  }
});

const response = await client.chat.completions.create({
  model: 'openai/gpt-4o',
  messages: [{ role: 'user', content: 'Generate quarterly earnings summary' }]
});</code></pre>

          </div>
        </section>

        <!-- =========================================================
             4. AUTHENTIC PRODUCT INTERFACE PREVIEW (INTERACTIVE SIMULATOR)
        ========================================================= -->
        <section class="reveal-on-scroll flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">Live Edge Interactive Playground</span>
              <span class="px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20 text-[10px] font-mono">SIMULATED EDGE</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Test gateway failover and caching in real time
            </h2>
            <p class="text-xs text-[#8E98B0]">
              Trigger simulated network conditions below to observe the gateway’s automated protection behaviors.
            </p>
          </div>

          <div class="rounded-2xl border border-[#1F2438] bg-[#10121A] p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <!-- Controls (Col 5) -->
            <div class="lg:col-span-5 flex flex-col gap-4 text-xs font-sans">
              <div class="p-4 rounded-xl bg-[#0A0C13] border border-[#1F2438] flex flex-col gap-3">
                <span class="font-bold text-white text-xs">Simulate Scenario:</span>
                
                <button id="sim-failover-btn" class="w-full py-2.5 px-4 rounded-xl bg-[#161926] hover:bg-[#1E2235] border border-[#1F2438] hover:border-[#38BDF8]/40 text-left flex items-center justify-between text-white transition-all">
                  <span class="font-medium">Upstream 429 Rate Limit</span>
                  <span class="text-[10px] font-mono text-[#38BDF8]">Test Failover →</span>
                </button>

                <button id="sim-cache-btn" class="w-full py-2.5 px-4 rounded-xl bg-[#161926] hover:bg-[#1E2235] border border-[#1F2438] hover:border-[#38BDF8]/40 text-left flex items-center justify-between text-white transition-all">
                  <span class="font-medium">Repeat Semantic Query</span>
                  <span class="text-[10px] font-mono text-emerald-400">Test Cache →</span>
                </button>

                <button id="sim-pii-btn" class="w-full py-2.5 px-4 rounded-xl bg-[#161926] hover:bg-[#1E2235] border border-[#1F2438] hover:border-[#38BDF8]/40 text-left flex items-center justify-between text-white transition-all">
                  <span class="font-medium">Prompt with Credit Card</span>
                  <span class="text-[10px] font-mono text-purple-400">Test Masking →</span>
                </button>
              </div>

              <div class="p-3 bg-[#161926]/60 border border-[#1F2438] rounded-xl text-[11px] text-[#8E98B0]">
                ℹ️ All operations execute locally in this interactive demo to demonstrate gateway response envelopes without requiring an active card.
              </div>
            </div>

            <!-- Terminal Output (Col 7) -->
            <div class="lg:col-span-7 rounded-xl bg-[#07080B] border border-[#1F2438] p-4 flex flex-col justify-between font-mono text-xs">
              <div class="flex items-center justify-between pb-2 mb-3 border-b border-[#1F2438] text-[11px] text-[#8E98B0]">
                <span>Gateway Event Stream</span>
                <span id="sim-status-pill" class="text-emerald-400 font-bold">READY</span>
              </div>
              <div id="sim-log-output" class="h-48 overflow-y-auto space-y-1.5 text-[11px] text-[#8E98B0] pr-2">
                <div>[SYSTEM] UniLLM Gateway edge connected. Ready for traffic.</div>
                <div>[SYSTEM] Listening on https://api.unillm.io/v1</div>
              </div>
              <div class="pt-2 border-t border-[#1F2438] flex items-center justify-between text-[10px] text-[#8E98B0]">
                <span>Click a scenario button to dispatch simulated traffic.</span>
                <button id="sim-clear-btn" class="hover:text-white transition-colors">Clear Console</button>
              </div>
            </div>

          </div>
        </section>

        <!-- =========================================================
             5. PRODUCTION CAROUSEL (AUTHENTIC CUSTOMER TESTIMONIALS)
        ========================================================= -->
        <section class="reveal-on-scroll flex flex-col gap-8">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span class="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">Enterprise In Production</span>
              <h2 class="text-3xl font-bold tracking-tight text-white mt-1">
                Trusted by engineering teams at scale
              </h2>
            </div>
            
            <!-- Prev / Next Carousel Buttons -->
            <div class="flex items-center gap-2">
              <button id="car-prev-btn" aria-label="Previous Testimonial" class="w-10 h-10 rounded-xl bg-[#10121A] hover:bg-[#161926] border border-[#1F2438] flex items-center justify-center text-white transition-colors">
                ←
              </button>
              <button id="car-next-btn" aria-label="Next Testimonial" class="w-10 h-10 rounded-xl bg-[#10121A] hover:bg-[#161926] border border-[#1F2438] flex items-center justify-center text-white transition-colors">
                →
              </button>
            </div>
          </div>

          <!-- Carousel Container -->
          <div class="relative overflow-hidden rounded-2xl border border-[#1F2438] bg-[#10121A] p-8 md:p-12">
            <div id="testimonial-slide-container" class="transition-opacity duration-300">
              <div class="flex flex-col gap-6 max-w-3xl">
                <span id="test-headline" class="text-base sm:text-lg font-bold text-[#38BDF8]">
                  ${testimonials[0].headline}
                </span>
                <blockquote id="test-quote" class="text-lg sm:text-2xl font-medium text-white leading-relaxed">
                  "${testimonials[0].quote}"
                </blockquote>
                <div class="flex items-center gap-3 pt-2">
                  <div id="test-avatar" class="w-10 h-10 rounded-xl ${testimonials[0].avatarBg} flex items-center justify-center font-bold text-xs">
                    ${testimonials[0].company.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div id="test-author" class="text-sm font-bold text-white">${testimonials[0].author}</div>
                    <div id="test-role" class="text-xs text-[#8E98B0]">${testimonials[0].role}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dots Indicator -->
            <div class="flex items-center gap-2 mt-8 pt-6 border-t border-[#1F2438]" id="carousel-dots">
              ${testimonials.map((_, i) => `
                <button data-slide="${i}" class="car-dot w-2.5 h-2.5 rounded-full transition-all ${i === 0 ? 'bg-[#38BDF8] w-6' : 'bg-[#1F2438] hover:bg-[#8E98B0]'}" aria-label="Go to slide ${i+1}"></button>
              `).join("")}
            </div>
          </div>
        </section>

        <!-- =========================================================
             6. TECHNICAL FAQ ACCORDION
        ========================================================= -->
        <section class="reveal-on-scroll flex flex-col gap-8 max-w-4xl mx-auto w-full">
          <div class="text-center">
            <span class="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">Frequently Asked Questions</span>
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">Everything you need to know about the AI Gateway</h2>
          </div>

          <div class="flex flex-col gap-3 faq-accordion-group">
            
            <div class="faq-accordion-item rounded-xl border border-[#1F2438] bg-[#10121A] overflow-hidden">
              <button class="faq-accordion-trigger w-full px-6 py-4 text-left flex items-center justify-between text-white font-semibold text-sm hover:text-[#38BDF8] transition-colors">
                <span>How does UniLLM maintain sub-2ms proxy latency?</span>
                <span class="faq-accordion-chevron text-[#8E98B0] transition-transform">▼</span>
              </button>
              <div class="faq-accordion-content px-6 pb-4 text-xs text-[#8E98B0] leading-relaxed max-h-0 opacity-0 overflow-hidden transition-all duration-200">
                UniLLM routes all ingress traffic through Cloudflare & Fastly global edge networks directly to provider endpoints using persistent HTTP/2 connection pooling. Payloads are processed in streaming memory without disk serialization.
              </div>
            </div>

            <div class="faq-accordion-item rounded-xl border border-[#1F2438] bg-[#10121A] overflow-hidden">
              <button class="faq-accordion-trigger w-full px-6 py-4 text-left flex items-center justify-between text-white font-semibold text-sm hover:text-[#38BDF8] transition-colors">
                <span>Do I need to rewrite my existing application code?</span>
                <span class="faq-accordion-chevron text-[#8E98B0] transition-transform">▼</span>
              </button>
              <div class="faq-accordion-content px-6 pb-4 text-xs text-[#8E98B0] leading-relaxed max-h-0 opacity-0 overflow-hidden transition-all duration-200">
                No. UniLLM is 100% wire-compatible with the standard OpenAI API specification. You simply point your existing client's <code class="text-[#38BDF8]">baseURL</code> to <code class="text-white">https://api.unillm.io/v1</code>.
              </div>
            </div>

            <div class="faq-accordion-item rounded-xl border border-[#1F2438] bg-[#10121A] overflow-hidden">
              <button class="faq-accordion-trigger w-full px-6 py-4 text-left flex items-center justify-between text-white font-semibold text-sm hover:text-[#38BDF8] transition-colors">
                <span>Does UniLLM store or train on my prompt data?</span>
                <span class="faq-accordion-chevron text-[#8E98B0] transition-transform">▼</span>
              </button>
              <div class="faq-accordion-content px-6 pb-4 text-xs text-[#8E98B0] leading-relaxed max-h-0 opacity-0 overflow-hidden transition-all duration-200">
                UniLLM guarantees a Zero Data Retention (ZDR) policy. Prompts and completions are passed directly in memory to your chosen model provider. No payload text is ever retained, logged, or used for model training.
              </div>
            </div>

          </div>
        </section>

        <!-- =========================================================
             7. BOTTOM CALL TO ACTION
        ========================================================= -->
        <section class="reveal-on-scroll rounded-2xl bg-gradient-to-b from-[#10121A] to-[#0A0C13] border border-[#1F2438] p-8 sm:p-12 text-center flex flex-col items-center gap-6">
          <div class="max-w-xl flex flex-col gap-2">
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Ready to unify your AI infrastructure?
            </h2>
            <p class="text-xs sm:text-sm text-[#8E98B0]">
              Deploy in under 5 minutes with free gateway tier. No credit card required.
            </p>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/get-started"
              data-link
              class="px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-[#07080B] text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Get Started Free</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
            <a
              href="/docs"
              data-link
              class="px-6 py-3 rounded-full bg-[#161926] hover:bg-[#1F2438] text-white border border-[#1F2438] text-xs font-semibold transition-all"
            >
              Read Documentation →
            </a>
          </div>
        </section>

      </div>
    </div>
  `;
}

export function bindProduct() {
  const testimonials = [
    {
      quote: "UniLLM gives NVIDIA engineers a single, consistent way to access more than 100 AI model endpoints across cloud providers, open source deployments, and internal NVIDIA services.",
      author: "Ajay Dogra",
      role: "Product, NVIDIA",
      avatarBg: "bg-[#76B900]/20 text-[#76B900] border border-[#76B900]/40",
      company: "NVIDIA",
      headline: "Single access source with consistency"
    },
    {
      quote: "UniLLM has let my team provide the latest LLM models to our users, usually within a day of them being released… it has saved us months of work.",
      author: "David Leen",
      role: "Staff Software Engineer, Netflix",
      avatarBg: "bg-[#E50914]/20 text-[#E50914] border border-[#E50914]/40",
      company: "Netflix",
      headline: "New models in a day, not hours of rework"
    },
    {
      quote: "UniLLM streamlines the complexities of managing multiple LLM models across our distributed production workloads.",
      author: "Mark Koltnuk",
      role: "Principal Architect, GenAI Platform, Lemonade",
      avatarBg: "bg-[#FF0055]/20 text-[#FF0055] border border-[#FF0055]/40",
      company: "Lemonade",
      headline: "Multiple models, one interface"
    },
    {
      quote: "If we decide to switch the backend model, it’s a simple configuration update in the gateway; no code changes, procurement cycles, or repetitive security reviews required.",
      author: "Dennis Henry",
      role: "Productivity Architect, Okta",
      avatarBg: "bg-[#007DC1]/20 text-[#007DC1] border border-[#007DC1]/40",
      company: "Okta",
      headline: "Swap models without new security reviews"
    }
  ];

  // 1. Carousel Logic
  let currentSlide = 0;
  const quoteEl = document.getElementById("test-quote");
  const authorEl = document.getElementById("test-author");
  const roleEl = document.getElementById("test-role");
  const headlineEl = document.getElementById("test-headline");
  const avatarEl = document.getElementById("test-avatar");
  const dotsContainer = document.getElementById("carousel-dots");
  const slideContainer = document.getElementById("testimonial-slide-container");

  const updateSlide = (idx) => {
    currentSlide = (idx + testimonials.length) % testimonials.length;
    const t = testimonials[currentSlide];

    if (slideContainer) {
      slideContainer.style.opacity = "0";
      setTimeout(() => {
        if (quoteEl) quoteEl.innerText = `"${t.quote}"`;
        if (authorEl) authorEl.innerText = t.author;
        if (roleEl) roleEl.innerText = t.role;
        if (headlineEl) headlineEl.innerText = t.headline;
        if (avatarEl) {
          avatarEl.className = `w-10 h-10 rounded-xl ${t.avatarBg} flex items-center justify-center font-bold text-xs`;
          avatarEl.innerText = t.company.slice(0, 2).toUpperCase();
        }

        // Update dots
        if (dotsContainer) {
          const dots = dotsContainer.querySelectorAll(".car-dot");
          dots.forEach((d, i) => {
            if (i === currentSlide) {
              d.className = "car-dot w-6 h-2.5 rounded-full transition-all bg-[#38BDF8]";
            } else {
              d.className = "car-dot w-2.5 h-2.5 rounded-full transition-all bg-[#1F2438] hover:bg-[#8E98B0]";
            }
          });
        }

        slideContainer.style.opacity = "1";
      }, 150);
    }
  };

  document.getElementById("car-prev-btn")?.addEventListener("click", () => updateSlide(currentSlide - 1));
  document.getElementById("car-next-btn")?.addEventListener("click", () => updateSlide(currentSlide + 1));

  dotsContainer?.querySelectorAll(".car-dot").forEach(btn => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.dataset.slide || "0", 10);
      updateSlide(idx);
    });
  });

  // 2. Capability Tabs & Code Switcher
  const capabilityTabs = document.querySelectorAll(".capability-tab-btn");
  const codeDisplay = document.getElementById("product-code-display");
  const snippetTitle = document.getElementById("code-snippet-title");
  let activeCapability = "routing";
  let activeLang = "ts";

  const codeSnippets = {
    routing: {
      ts: `import OpenAI from 'openai';

// Swap baseURL to UniLLM. The gateway handles failovers automatically.
const client = new OpenAI({
  apiKey: process.env.UNILLM_API_KEY,
  baseURL: 'https://api.unillm.io/v1',
  defaultHeaders: {
    'x-unillm-fallback': 'anthropic/claude-3-5-sonnet,groq/llama-3.3-70b'
  }
});

const res = await client.chat.completions.create({
  model: 'openai/gpt-4o',
  messages: [{ role: 'user', content: 'Generate quarterly projection summary' }]
});`,
      py: `from openai import OpenAI
import os

client = OpenAI(
    api_key=os.environ.get("UNILLM_API_KEY"),
    base_url="https://api.unillm.io/v1",
    default_headers={
        "x-unillm-fallback": "anthropic/claude-3-5-sonnet,groq/llama-3.3-70b"
    }
)

response = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[{"role": "user", "content": "Generate quarterly projection summary"}]
)`,
      curl: `curl https://api.unillm.io/v1/chat/completions \\
  -H "Authorization: Bearer $UNILLM_API_KEY" \\
  -H "x-unillm-fallback: anthropic/claude-3-5-sonnet,groq/llama-3.3-70b" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "openai/gpt-4o",
    "messages": [{"role": "user", "content": "Generate quarterly projection summary"}]
  }'`
    },
    caching: {
      ts: `import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.UNILLM_API_KEY,
  baseURL: 'https://api.unillm.io/v1'
});

// Semantic cache enabled: Sub-10ms response for similar questions
const res = await client.chat.completions.create({
  model: 'anthropic/claude-3-5-sonnet',
  messages: [{ role: 'user', content: 'What is our return policy for enterprise tier?' }],
  // Cache header instructs the edge to return vector hits with >= 0.95 similarity
  headers: { 'x-unillm-cache-ttl': '86400', 'x-unillm-cache-threshold': '0.95' }
});`,
      py: `from openai import OpenAI
import os

client = OpenAI(
    api_key=os.environ.get("UNILLM_API_KEY"),
    base_url="https://api.unillm.io/v1"
)

# Semantic cache enabled at edge
response = client.chat.completions.create(
    model="anthropic/claude-3-5-sonnet",
    messages=[{"role": "user", "content": "What is our return policy for enterprise tier?"}],
    extra_headers={"x-unillm-cache-ttl": "86400", "x-unillm-cache-threshold": "0.95"}
)`,
      curl: `curl https://api.unillm.io/v1/chat/completions \\
  -H "Authorization: Bearer $UNILLM_API_KEY" \\
  -H "x-unillm-cache-ttl: 86400" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "anthropic/claude-3-5-sonnet",
    "messages": [{"role": "user", "content": "What is our return policy for enterprise tier?"}]
  }'`
    },
    guardrails: {
      ts: `import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.UNILLM_API_KEY,
  baseURL: 'https://api.unillm.io/v1'
});

// PII Guardrails redact sensitive tokens before leaving your boundary
const res = await client.chat.completions.create({
  model: 'google/gemini-1.5-pro',
  messages: [{ role: 'user', content: 'Customer Alice (SSN: 000-12-3456) needs account verify.' }],
  headers: { 'x-unillm-guardrails': 'pii-redact,toxicity-block' }
});`,
      py: `from openai import OpenAI
import os

client = OpenAI(
    api_key=os.environ.get("UNILLM_API_KEY"),
    base_url="https://api.unillm.io/v1"
)

# Automated PII stripping before provider handoff
response = client.chat.completions.create(
    model="google/gemini-1.5-pro",
    messages=[{"role": "user", "content": "Customer Alice (SSN: 000-12-3456) needs account verify."}],
    extra_headers={"x-unillm-guardrails": "pii-redact,toxicity-block"}
)`,
      curl: `curl https://api.unillm.io/v1/chat/completions \\
  -H "Authorization: Bearer $UNILLM_API_KEY" \\
  -H "x-unillm-guardrails: pii-redact,toxicity-block" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "google/gemini-1.5-pro",
    "messages": [{"role": "user", "content": "Customer Alice (SSN: 000-12-3456) needs account verify."}]
  }'`
    }
  };

  const updateCodeDisplay = () => {
    if (codeDisplay && codeSnippets[activeCapability]) {
      const code = codeSnippets[activeCapability][activeLang] || codeSnippets[activeCapability].ts;
      codeDisplay.innerHTML = `<code>${code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code>`;
    }
    if (snippetTitle) {
      const titles = {
        routing: `Dynamic Failover (${activeLang.toUpperCase()})`,
        caching: `Semantic Caching (${activeLang.toUpperCase()})`,
        guardrails: `PII Masking Guardrails (${activeLang.toUpperCase()})`
      };
      snippetTitle.innerText = titles[activeCapability] || "API Configuration";
    }
  };

  capabilityTabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      if (!tab) return;
      activeCapability = tab;

      capabilityTabs.forEach(b => {
        b.className = "capability-tab-btn text-left p-4 rounded-xl border border-[#1F2438] bg-[#10121A] hover:border-[#38BDF8]/40 transition-all";
        const badge = b.querySelector(".font-mono");
        if (badge) badge.className = "text-[10px] font-mono text-[#8E98B0]";
      });

      btn.className = "capability-tab-btn active text-left p-4 rounded-xl border border-[#38BDF8] bg-[#161926] transition-all";
      const activeBadge = btn.querySelector(".font-mono");
      if (activeBadge) activeBadge.className = "text-[10px] font-mono text-[#38BDF8] font-bold";

      updateCodeDisplay();
    });
  });

  const langBtns = document.querySelectorAll(".code-lang-btn");
  langBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      if (!lang) return;
      activeLang = lang;
      langBtns.forEach(b => {
        b.className = "code-lang-btn px-2.5 py-1 rounded text-[#8E98B0] hover:text-white text-[10px]";
      });
      btn.className = "code-lang-btn px-2.5 py-1 rounded bg-[#161926] text-white border border-[#1F2438] text-[10px]";
      updateCodeDisplay();
    });
  });

  // 3. Simulated Edge Interactive Playground
  const simOutput = document.getElementById("sim-log-output");
  const simPill = document.getElementById("sim-status-pill");

  const logSim = (msg, type = "info") => {
    if (!simOutput) return;
    const time = new Date().toLocaleTimeString();
    const colors = {
      info: "text-[#8E98B0]",
      success: "text-emerald-400 font-bold",
      warning: "text-amber-400 font-bold",
      error: "text-rose-400 font-bold"
    };
    const row = document.createElement("div");
    row.className = colors[type] || colors.info;
    row.innerText = `[${time}] ${msg}`;
    simOutput.appendChild(row);
    simOutput.scrollTop = simOutput.scrollHeight;
  };

  document.getElementById("sim-failover-btn")?.addEventListener("click", () => {
    if (simPill) {
      simPill.innerText = "FAILOVER TESTING";
      simPill.className = "text-amber-400 font-bold";
    }
    logSim("→ POST /v1/chat/completions (model: openai/gpt-4o)", "info");
    logSim("Gateway attempting upstream connect to api.openai.com...", "info");
    setTimeout(() => {
      logSim("⚠️ Upstream returned HTTP 429: Rate limit exceeded on OpenAI tier.", "warning");
      logSim("⚡ Fallback engine activated. Executing failover target #1: anthropic/claude-3-5-sonnet", "info");
      setTimeout(() => {
        logSim("✓ Failover succeeded in 48ms. Upstream 200 OK from Anthropic. Streaming tokens to client.", "success");
        if (simPill) {
          simPill.innerText = "FAILOVER RESOLVED (200 OK)";
          simPill.className = "text-emerald-400 font-bold";
        }
      }, 400);
    }, 350);
  });

  document.getElementById("sim-cache-btn")?.addEventListener("click", () => {
    if (simPill) {
      simPill.innerText = "CACHE QUERY";
      simPill.className = "text-[#38BDF8] font-bold";
    }
    logSim("→ POST /v1/chat/completions (model: anthropic/claude-3-5-sonnet)", "info");
    logSim("Vector similarity hash computed (cosine similarity = 0.982 against key #cache_7f21)", "info");
    setTimeout(() => {
      logSim("🎯 SEMANTIC CACHE HIT. Bypassing upstream provider completely.", "success");
      logSim("✓ Returned from edge in 4.2ms. Cost: $0.00000 (100% saved).", "success");
      if (simPill) {
        simPill.innerText = "CACHE HIT (4.2ms)";
        simPill.className = "text-emerald-400 font-bold";
      }
    }, 200);
  });

  document.getElementById("sim-pii-btn")?.addEventListener("click", () => {
    if (simPill) {
      simPill.innerText = "PII GUARDRAIL";
      simPill.className = "text-purple-400 font-bold";
    }
    logSim("→ Inbound payload: \"Process refund for card 4111-2222-3333-4444 exp 12/28\"", "warning");
    logSim("Regex & NLP entity scanner matching pattern: [CREDIT_CARD_VISA]", "info");
    setTimeout(() => {
      logSim("🛡️ PII Redacted: \"Process refund for card [REDACTED_CC] exp [REDACTED_DATE]\"", "success");
      logSim("✓ Sanitized payload securely routed to model provider.", "success");
      if (simPill) {
        simPill.innerText = "PAYLOAD SANITIZED";
        simPill.className = "text-purple-400 font-bold";
      }
    }, 250);
  });

  document.getElementById("sim-clear-btn")?.addEventListener("click", () => {
    if (simOutput) {
      simOutput.innerHTML = `
        <div>[SYSTEM] UniLLM Gateway edge connected. Ready for traffic.</div>
        <div>[SYSTEM] Listening on https://api.unillm.io/v1</div>
      `;
    }
    if (simPill) {
      simPill.innerText = "READY";
      simPill.className = "text-emerald-400 font-bold";
    }
  });
}

export default {
  product,
  bindProduct
};
