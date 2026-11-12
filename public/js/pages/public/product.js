// PUBLIC PAGE: product (Obsidian AI Gateway Platform Architecture)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";
import { icons } from "../../icons.js?v=2";

export function product() {
  const architecturalPatterns = [
    {
      headline: "Multi-Cloud Dynamic Failover Matrix",
      quote: "Automated routing across Anthropic, OpenAI, and Google Gemini with real-time circuit breakers eliminates single-provider downtime and mitigates 429 rate limit spikes instantly.",
      author: "High-Availability Pattern",
      role: "Global Edge Orchestration",
      avatarBg: "bg-white/10 text-white border border-white/20",
      company: "Failover Mesh"
    },
    {
      headline: "Sub-10ms Semantic Vector Caching",
      quote: "Zero-latency cache hits on semantically identical prompts bypass upstream inference charges entirely, slashing recurrent API expenditures by up to 68% while delivering near-instant responses.",
      author: "Vector Cache Engine",
      role: "Cosine Similarity Thresholds",
      avatarBg: "bg-[#697DFF]/20 text-[#697DFF] border border-[#697DFF]/40",
      company: "Semantic Edge"
    },
    {
      headline: "Zero Data Retention & Real-Time Redaction",
      quote: "Hardware-level memory routing strips credit card numbers, SSNs, and identifiable entities before payloads exit your virtual network perimeter. No prompts or completions are ever written to disk.",
      author: "Privacy & Compliance Engine",
      role: "Pre-Flight Guardrails",
      avatarBg: "bg-[#FF9B72]/20 text-[#FF9B72] border border-[#FF9B72]/40",
      company: "Data Guard"
    },
    {
      headline: "Universal Wire-Compatible API Specification",
      quote: "Drop-in OpenAI SDK compatibility requires exactly one line change: pointing your baseURL to api.unillm.io. Switch foundation models across providers with zero client-side refactoring.",
      author: "Unified Ingress Standard",
      role: "Standardized Schema Spec",
      avatarBg: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40",
      company: "Single Gateway"
    }
  ];

  return `
    <div class="relative overflow-hidden w-full font-sans bg-[#0B0C0D] text-[#F2EFE8]">
      
      <!-- Subtle monochromatic top vignette -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[450px] bg-gradient-to-b from-[#FF7849]/[0.04] via-[#42D6A4]/[0.02] to-transparent blur-[150px] pointer-events-none -z-10"></div>

      <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24 flex flex-col gap-24">

        <!-- =========================================================
             1. HERO SECTION: TECHNICAL ARCHITECTURE GATEWAY
        ========================================================= -->
        <section class="flex flex-col gap-8 max-w-4xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141615] border border-[rgba(242,239,232,0.14)] text-[11px] font-mono tracking-wider text-[#A6A39C] uppercase self-start">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Universal AI Proxy Layer</span>
            <span class="text-white/20">•</span>
            <span class="text-[#F2EFE8]">v2.4 Spec</span>
          </div>

          <h1 class="font-sans font-extrabold text-4xl sm:text-6xl lg:text-[64px] tracking-[-0.03em] text-[#F2EFE8] leading-[1.05]">
            Architected for resilient, zero-lock-in AI workloads.
          </h1>

          <p class="text-base sm:text-lg text-[#A6A39C] leading-relaxed max-w-2xl font-normal">
            UniLLM sits between your applications and every frontier model provider. Route intelligently, eliminate downtime with automatic fallbacks, cache semantic queries at the edge, and enforce compliance across every token.
          </p>

          <div class="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="/get-started"
              data-link
              class="px-6 py-3 rounded-lg bg-[#FF7849] hover:bg-[#ff8a60] text-[#0B0C0D] font-bold shadow-[0_4px_25px_rgba(255,120,73,0.3)] text-xs font-semibold transition-all inline-flex items-center gap-2 shadow-sm"
            >
              <span>Deploy Ingress Key</span>
              <span class="font-bold">→</span>
            </a>
            <a
              href="/docs"
              data-link
              class="px-6 py-3 rounded-lg bg-[#141615] hover:bg-[#1A1D1B] text-[#F2EFE8] border border-[rgba(242,239,232,0.14)] text-xs font-semibold transition-all inline-flex items-center gap-2"
            >
              <span>Explore Technical Docs</span>
            </a>
          </div>

          <!-- Key Infrastructure Attributes -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[rgba(242,239,232,0.14)]">
            <div class="flex flex-col gap-1">
              <div class="font-mono text-xl font-bold text-white">&lt;14ms</div>
              <div class="text-xs text-[#A6A39C]">Proxy Overhead (P95)</div>
            </div>
            <div class="flex flex-col gap-1">
              <div class="font-mono text-xl font-bold text-white">100+</div>
              <div class="text-xs text-[#A6A39C]">Frontier Models Supported</div>
            </div>
            <div class="flex flex-col gap-1">
              <div class="font-mono text-xl font-bold text-white">100%</div>
              <div class="text-xs text-[#A6A39C]">OpenAI SDK Compatible</div>
            </div>
            <div class="flex flex-col gap-1">
              <div class="font-mono text-xl font-bold text-emerald-400">0B</div>
              <div class="text-xs text-[#A6A39C]">Prompt Data Retained</div>
            </div>
          </div>
        </section>

        <!-- =========================================================
             2. LIVE ARCHITECTURAL PIPELINE (INSPECTOR VISUAL)
        ========================================================= -->
        <section class="flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <span class="text-xs font-mono font-bold text-[#A6A39C] uppercase tracking-wider">Gateway Anatomy</span>
            <h2 class="text-2xl sm:text-4xl font-bold tracking-[-0.03em] text-[#F2EFE8]">
              Deterministic request lifecycle at the global edge
            </h2>
            <p class="text-sm text-[#A6A39C] max-w-2xl">
              Inspect how UniLLM receives standard OpenAI-format inference calls, evaluates policies in streaming memory, and routes to provider backends with zero disk buffering.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            
            <!-- Step 1 -->
            <div class="p-6 rounded-xl bg-[#141615] border border-[rgba(242,239,232,0.14)] flex flex-col justify-between hover:border-white/30 transition-all">
              <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                  <span class="w-8 h-8 rounded-lg bg-white/5 text-white flex items-center justify-center font-mono font-bold text-xs border border-[rgba(242,239,232,0.14)]">01</span>
                  <span class="text-[10px] font-mono text-[#A6A39C] uppercase">Client Ingress</span>
                </div>
                <h3 class="text-sm font-semibold text-white">Inference Request</h3>
                <p class="text-xs text-[#A6A39C] leading-relaxed">
                  Your application dispatches calls to <code class="text-white font-mono text-[11px]">api.unillm.io/v1</code> using any standard OpenAI client library.
                </p>
              </div>
              <div class="mt-6 pt-4 border-t border-[rgba(242,239,232,0.14)] text-[11px] font-mono text-[#A6A39C]">
                HTTP/2 • SSL Session Cache
              </div>
            </div>

            <!-- Step 2 -->
            <div class="p-6 rounded-xl bg-[#141615] border border-[rgba(242,239,232,0.14)] flex flex-col justify-between hover:border-white/30 transition-all">
              <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                  <span class="w-8 h-8 rounded-lg bg-white/5 text-white flex items-center justify-center font-mono font-bold text-xs border border-[rgba(242,239,232,0.14)]">02</span>
                  <span class="text-[10px] font-mono text-[#697DFF] uppercase">Edge Logic</span>
                </div>
                <h3 class="text-sm font-semibold text-white">Policy & Vector Cache</h3>
                <p class="text-xs text-[#A6A39C] leading-relaxed">
                  The gateway evaluates rate limits, redacts configured PII patterns, and queries the semantic cache via vector cosine similarity.
                </p>
              </div>
              <div class="mt-6 pt-4 border-t border-[rgba(242,239,232,0.14)] text-[11px] font-mono text-[#697DFF]">
                Sub-5ms Cache Resolution
              </div>
            </div>

            <!-- Step 3 -->
            <div class="p-6 rounded-xl bg-[#141615] border border-[rgba(242,239,232,0.14)] flex flex-col justify-between hover:border-white/30 transition-all">
              <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                  <span class="w-8 h-8 rounded-lg bg-white/5 text-white flex items-center justify-center font-mono font-bold text-xs border border-[rgba(242,239,232,0.14)]">03</span>
                  <span class="text-[10px] font-mono text-emerald-400 uppercase">Resilience</span>
                </div>
                <h3 class="text-sm font-semibold text-white">Intelligent Failover</h3>
                <p class="text-xs text-[#A6A39C] leading-relaxed">
                  If the target provider returns 429 or 5xx, the gateway activates your fallback chain with sub-50ms failover before the client disconnects.
                </p>
              </div>
              <div class="mt-6 pt-4 border-t border-[rgba(242,239,232,0.14)] text-[11px] font-mono text-emerald-400">
                Zero Upstream Downtime
              </div>
            </div>

            <!-- Step 4 -->
            <div class="p-6 rounded-xl bg-[#141615] border border-[rgba(242,239,232,0.14)] flex flex-col justify-between hover:border-white/30 transition-all">
              <div class="flex flex-col gap-3">
                <div class="flex items-center justify-between">
                  <span class="w-8 h-8 rounded-lg bg-white/5 text-white flex items-center justify-center font-mono font-bold text-xs border border-[rgba(242,239,232,0.14)]">04</span>
                  <span class="text-[10px] font-mono text-[#FF9B72] uppercase">Egress</span>
                </div>
                <h3 class="text-sm font-semibold text-white">Token Streaming</h3>
                <p class="text-xs text-[#A6A39C] leading-relaxed">
                  Server-Sent Events (SSE) stream directly to your client. Token metrics, latency telemetry, and cost calculations are logged asynchronously.
                </p>
              </div>
              <div class="mt-6 pt-4 border-t border-[rgba(242,239,232,0.14)] text-[11px] font-mono text-[#FF9B72]">
                Zero Memory Retention
              </div>
            </div>

          </div>
        </section>

        <!-- =========================================================
             3. CAPABILITY MATRIX WITH INTERACTIVE CODE PANEL
        ========================================================= -->
        <section class="flex flex-col lg:flex-row gap-8 items-start">
          
          <!-- Left: Tab Selectors -->
          <div class="w-full lg:w-5/12 flex flex-col gap-6">
            <div class="flex flex-col gap-2">
              <span class="text-xs font-mono font-bold text-[#A6A39C] uppercase tracking-wider">Control Plane Features</span>
              <h2 class="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#F2EFE8]">
                Engineered for enterprise production
              </h2>
              <p class="text-xs text-[#A6A39C]">
                Select a capability to inspect header configurations and code integration patterns.
              </p>
            </div>

            <div class="flex flex-col gap-3">
              
              <!-- Tab 1: Routing -->
              <button data-tab="routing" class="capability-tab-btn active text-left p-4 rounded-xl border border-white bg-[#1A1D1B] transition-all">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs font-semibold text-white">Dynamic Fallback Chains</span>
                  <span class="text-[10px] font-mono text-white font-bold">ACTIVE</span>
                </div>
                <p class="text-xs text-[#A6A39C]">Define ordered failover arrays. If primary models rate limit, traffic shifts without interrupting active users.</p>
              </button>

              <!-- Tab 2: Caching -->
              <button data-tab="caching" class="capability-tab-btn text-left p-4 rounded-xl border border-[rgba(242,239,232,0.14)] bg-[#141615] hover:border-white/30 transition-all">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs font-semibold text-white">Semantic Vector Caching</span>
                  <span class="text-[10px] font-mono text-[#A6A39C]">LATENCY & COST</span>
                </div>
                <p class="text-xs text-[#A6A39C]">Vector embeddings analyze semantic intent to serve identical answers in &lt;10ms at zero API cost.</p>
              </button>

              <!-- Tab 3: Guardrails -->
              <button data-tab="guardrails" class="capability-tab-btn text-left p-4 rounded-xl border border-[rgba(242,239,232,0.14)] bg-[#141615] hover:border-white/30 transition-all">
                <div class="flex items-center justify-between mb-1">
                  <span class="text-xs font-semibold text-white">PII & Data Guardrails</span>
                  <span class="text-[10px] font-mono text-[#A6A39C]">COMPLIANCE</span>
                </div>
                <p class="text-xs text-[#A6A39C]">Redact credit cards, government IDs, and sensitive tokens in memory before payloads exit your perimeter.</p>
              </button>

            </div>
          </div>

          <!-- Right: Interactive Code Panel matching Active Tab -->
          <div class="w-full lg:w-7/12 rounded-xl bg-[#141615] border border-[rgba(242,239,232,0.14)] p-5 shadow-2xl overflow-hidden font-mono text-xs">
            
            <!-- Code Header with Language Switchers -->
            <div class="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(242,239,232,0.14)]">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-white/20"></span>
                <span id="code-snippet-title" class="text-xs font-semibold text-white">Fallback Configuration (TypeScript)</span>
              </div>
              <div class="flex items-center gap-1.5" id="code-lang-selector">
                <button data-lang="ts" class="code-lang-btn px-2.5 py-1 rounded bg-[#1A1D1B] text-white border border-[rgba(242,239,232,0.14)] text-[10px]">TS</button>
                <button data-lang="py" class="code-lang-btn px-2.5 py-1 rounded text-[#A6A39C] hover:text-white text-[10px]">Python</button>
                <button data-lang="curl" class="code-lang-btn px-2.5 py-1 rounded text-[#A6A39C] hover:text-white text-[10px]">cURL</button>
              </div>
            </div>

            <!-- Preformatted Code Block -->
            <pre class="overflow-x-auto text-[#A6A39C] leading-relaxed text-[11px] p-2" id="product-code-display"><code>import OpenAI from 'openai';

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
        <section class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <div class="flex items-center gap-2">
              <span class="text-xs font-mono font-bold text-[#A6A39C] uppercase tracking-wider">Gateway Live Simulation</span>
              <span class="px-2 py-0.5 rounded bg-white/5 text-white/80 border border-white/10 text-[10px] font-mono">SANDBOX ENGINE</span>
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#F2EFE8]">
              Observe automated gateway behaviors
            </h2>
            <p class="text-xs text-[#A6A39C]">
              Trigger simulated network conditions below to observe automated failover, semantic caching, and PII masking events.
            </p>
          </div>

          <div class="rounded-xl border border-[rgba(242,239,232,0.14)] bg-[#141615] p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <!-- Controls (Col 5) -->
            <div class="lg:col-span-5 flex flex-col gap-4 text-xs font-sans">
              <div class="p-4 rounded-xl bg-[#1A1D1B] border border-[rgba(242,239,232,0.14)] flex flex-col gap-3">
                <span class="font-bold text-white text-xs">Simulate Edge Scenario:</span>
                
                <button id="sim-failover-btn" class="w-full py-2.5 px-4 rounded-lg bg-[#141615] hover:bg-[#1A1D1B] border border-[rgba(242,239,232,0.14)] hover:border-white/30 text-left flex items-center justify-between text-white transition-all">
                  <span class="font-medium">Upstream 429 Rate Limit</span>
                  <span class="text-[10px] font-mono text-emerald-400">Trigger Failover →</span>
                </button>

                <button id="sim-cache-btn" class="w-full py-2.5 px-4 rounded-lg bg-[#141615] hover:bg-[#1A1D1B] border border-[rgba(242,239,232,0.14)] hover:border-white/30 text-left flex items-center justify-between text-white transition-all">
                  <span class="font-medium">Repeat Semantic Query</span>
                  <span class="text-[10px] font-mono text-[#697DFF]">Trigger Cache →</span>
                </button>

                <button id="sim-pii-btn" class="w-full py-2.5 px-4 rounded-lg bg-[#141615] hover:bg-[#1A1D1B] border border-[rgba(242,239,232,0.14)] hover:border-white/30 text-left flex items-center justify-between text-white transition-all">
                  <span class="font-medium">Prompt with Sensitive Token</span>
                  <span class="text-[10px] font-mono text-[#FF9B72]">Trigger Masking →</span>
                </button>
              </div>

              <div class="p-3 bg-[#1A1D1B] border border-[rgba(242,239,232,0.14)] rounded-lg text-[11px] text-[#A6A39C]">
                ℹ️ Executes live in memory to illustrate gateway response envelopes without consuming live API credits.
              </div>
            </div>

            <!-- Terminal Output (Col 7) -->
            <div class="lg:col-span-7 rounded-xl bg-[#0B0C0D] border border-[rgba(242,239,232,0.14)] p-4 flex flex-col justify-between font-mono text-xs">
              <div class="flex items-center justify-between pb-2 mb-3 border-b border-[rgba(242,239,232,0.14)] text-[11px] text-[#A6A39C]">
                <span class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Gateway Telemetry Stream</span>
                </span>
                <span id="sim-status-pill" class="text-emerald-400 font-bold">READY</span>
              </div>
              <div id="sim-log-output" class="h-48 overflow-y-auto space-y-1.5 text-[11px] text-[#A6A39C] pr-2">
                <div>[GATEWAY] UniLLM edge node online. Listening on https://api.unillm.io/v1</div>
                <div>[STATUS] Routing tables initialized for 100+ model targets. Ready.</div>
              </div>
              <div class="pt-2 border-t border-[rgba(242,239,232,0.14)] flex items-center justify-between text-[10px] text-[#A6A39C]">
                <span>Click a scenario button to dispatch simulated traffic.</span>
                <button id="sim-clear-btn" class="hover:text-white transition-colors">Clear Console</button>
              </div>
            </div>

          </div>
        </section>

        <!-- =========================================================
             5. ARCHITECTURAL PATTERNS CAROUSEL
        ========================================================= -->
        <section class="flex flex-col gap-8">
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span class="text-xs font-mono font-bold text-[#A6A39C] uppercase tracking-wider">Production Architecture</span>
              <h2 class="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#F2EFE8] mt-1">
                Verified deployment architectures
              </h2>
            </div>
            
            <!-- Prev / Next Carousel Buttons -->
            <div class="flex items-center gap-2">
              <button id="car-prev-btn" aria-label="Previous Pattern" class="w-10 h-10 rounded-lg bg-[#141615] hover:bg-[#1A1D1B] border border-[rgba(242,239,232,0.14)] flex items-center justify-center text-white transition-colors">
                ←
              </button>
              <button id="car-next-btn" aria-label="Next Pattern" class="w-10 h-10 rounded-lg bg-[#141615] hover:bg-[#1A1D1B] border border-[rgba(242,239,232,0.14)] flex items-center justify-center text-white transition-colors">
                →
              </button>
            </div>
          </div>

          <!-- Carousel Container -->
          <div class="relative overflow-hidden rounded-xl border border-[rgba(242,239,232,0.14)] bg-[#141615] p-8 md:p-12">
            <div id="testimonial-slide-container" class="transition-opacity duration-300">
              <div class="flex flex-col gap-6 max-w-3xl">
                <span id="test-headline" class="text-base sm:text-lg font-bold text-white">
                  ${architecturalPatterns[0].headline}
                </span>
                <blockquote id="test-quote" class="text-base sm:text-xl font-normal text-[#A6A39C] leading-relaxed">
                  "${architecturalPatterns[0].quote}"
                </blockquote>
                <div class="flex items-center gap-3 pt-2">
                  <div id="test-avatar" class="w-9 h-9 rounded-lg ${architecturalPatterns[0].avatarBg} flex items-center justify-center font-bold text-xs font-mono">
                    01
                  </div>
                  <div>
                    <div id="test-author" class="text-sm font-semibold text-white">${architecturalPatterns[0].author}</div>
                    <div id="test-role" class="text-xs text-[#A6A39C] font-mono">${architecturalPatterns[0].role}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Dots Indicator -->
            <div class="flex items-center gap-2 mt-8 pt-6 border-t border-[rgba(242,239,232,0.14)]" id="carousel-dots">
              ${architecturalPatterns.map((_, i) => `
                <button data-slide="${i}" class="car-dot h-1.5 rounded-full transition-all ${i === 0 ? 'bg-white w-6' : 'bg-[rgba(242,239,232,0.14)] w-2 hover:bg-[#A6A39C]'}" aria-label="Go to pattern ${i+1}"></button>
              `).join("")}
            </div>
          </div>
        </section>

        <!-- =========================================================
             6. TECHNICAL FAQ ACCORDION
        ========================================================= -->
        <section class="flex flex-col gap-8 max-w-4xl mx-auto w-full">
          <div class="text-center">
            <span class="text-xs font-mono font-bold text-[#A6A39C] uppercase tracking-wider">Frequently Asked Questions</span>
            <h2 class="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#F2EFE8] mt-1">Everything you need to know about the AI Gateway</h2>
          </div>

          <div class="flex flex-col gap-3 faq-accordion-group">
            
            <div class="faq-accordion-item rounded-xl border border-[rgba(242,239,232,0.14)] bg-[#141615] overflow-hidden">
              <button class="faq-accordion-trigger w-full px-6 py-4 text-left flex items-center justify-between text-white font-semibold text-sm hover:text-white/80 transition-colors">
                <span>How does UniLLM maintain sub-14ms proxy overhead?</span>
                <span class="faq-accordion-chevron text-[#A6A39C] transition-transform">▼</span>
              </button>
              <div class="faq-accordion-content px-6 pb-4 text-xs text-[#A6A39C] leading-relaxed max-h-0 opacity-0 overflow-hidden transition-all duration-200">
                UniLLM routes all ingress traffic through global edge Anycast nodes directly to provider endpoints using persistent HTTP/2 connection pooling. Payloads are processed entirely in streaming memory without disk serialization.
              </div>
            </div>

            <div class="faq-accordion-item rounded-xl border border-[rgba(242,239,232,0.14)] bg-[#141615] overflow-hidden">
              <button class="faq-accordion-trigger w-full px-6 py-4 text-left flex items-center justify-between text-white font-semibold text-sm hover:text-white/80 transition-colors">
                <span>Do I need to rewrite my existing application code?</span>
                <span class="faq-accordion-chevron text-[#A6A39C] transition-transform">▼</span>
              </button>
              <div class="faq-accordion-content px-6 pb-4 text-xs text-[#A6A39C] leading-relaxed max-h-0 opacity-0 overflow-hidden transition-all duration-200">
                No. UniLLM is 100% wire-compatible with the standard OpenAI API specification. You simply point your existing client's <code class="text-white font-mono">baseURL</code> to <code class="text-white font-mono">https://api.unillm.io/v1</code> and use your unified UniLLM API key.
              </div>
            </div>

            <div class="faq-accordion-item rounded-xl border border-[rgba(242,239,232,0.14)] bg-[#141615] overflow-hidden">
              <button class="faq-accordion-trigger w-full px-6 py-4 text-left flex items-center justify-between text-white font-semibold text-sm hover:text-white/80 transition-colors">
                <span>Does UniLLM store or train on my prompt data?</span>
                <span class="faq-accordion-chevron text-[#A6A39C] transition-transform">▼</span>
              </button>
              <div class="faq-accordion-content px-6 pb-4 text-xs text-[#A6A39C] leading-relaxed max-h-0 opacity-0 overflow-hidden transition-all duration-200">
                UniLLM guarantees a Zero Data Retention (ZDR) policy. Prompts and completions are passed directly in memory to your chosen model provider. No payload text is ever retained, logged, or used for model training.
              </div>
            </div>

          </div>
        </section>

        <!-- =========================================================
             7. BOTTOM CALL TO ACTION
        ========================================================= -->
        <section class="rounded-xl bg-[#141615] border border-[rgba(242,239,232,0.14)] p-8 sm:p-12 text-center flex flex-col items-center gap-6">
          <div class="max-w-xl flex flex-col gap-2">
            <h2 class="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#F2EFE8]">
              Ready to unify your AI infrastructure?
            </h2>
            <p class="text-xs sm:text-sm text-[#A6A39C]">
              Deploy in under 5 minutes with free gateway tier. No credit card required.
            </p>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/get-started"
              data-link
              class="px-6 py-3 rounded-lg bg-[#FF7849] hover:bg-[#ff8a60] text-[#0B0C0D] font-bold shadow-[0_4px_25px_rgba(255,120,73,0.3)] text-xs font-semibold transition-all shadow-sm inline-flex items-center gap-2"
            >
              <span>Get Started Free</span>
              <span class="font-bold">→</span>
            </a>
            <a
              href="/docs"
              data-link
              class="px-6 py-3 rounded-lg bg-[#1A1D1B] hover:bg-[#141615] text-[#F2EFE8] border border-[rgba(242,239,232,0.14)] text-xs font-semibold transition-all inline-flex items-center gap-2"
            >
              <span>Read Documentation</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  `;
}

export function bindProduct() {
  // 1. FAQ Accordions
  const accordionTriggers = document.querySelectorAll(".faq-accordion-trigger");
  accordionTriggers.forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      const chevron = btn.querySelector(".faq-accordion-chevron");
      const isOpen = content.classList.contains("max-h-96");

      document.querySelectorAll(".faq-accordion-content").forEach(c => {
        c.classList.remove("max-h-96", "opacity-100");
        c.classList.add("max-h-0", "opacity-0");
      });
      document.querySelectorAll(".faq-accordion-chevron").forEach(ch => {
        ch.style.transform = "rotate(0deg)";
      });

      if (!isOpen) {
        content.classList.remove("max-h-0", "opacity-0");
        content.classList.add("max-h-96", "opacity-100");
        if (chevron) chevron.style.transform = "rotate(180deg)";
      }
    });
  });

  // 2. Production Patterns Carousel
  const architecturalPatterns = [
    {
      headline: "Multi-Cloud Dynamic Failover Matrix",
      quote: "Automated routing across Anthropic, OpenAI, and Google Gemini with real-time circuit breakers eliminates single-provider downtime and mitigates 429 rate limit spikes instantly.",
      author: "High-Availability Pattern",
      role: "Global Edge Orchestration",
      avatarBg: "bg-white/10 text-white border border-white/20",
      company: "Failover Mesh"
    },
    {
      headline: "Sub-10ms Semantic Vector Caching",
      quote: "Zero-latency cache hits on semantically identical prompts bypass upstream inference charges entirely, slashing recurrent API expenditures by up to 68% while delivering near-instant responses.",
      author: "Vector Cache Engine",
      role: "Cosine Similarity Thresholds",
      avatarBg: "bg-[#697DFF]/20 text-[#697DFF] border border-[#697DFF]/40",
      company: "Semantic Edge"
    },
    {
      headline: "Zero Data Retention & Real-Time Redaction",
      quote: "Hardware-level memory routing strips credit card numbers, SSNs, and identifiable entities before payloads exit your virtual network perimeter. No prompts or completions are ever written to disk.",
      author: "Privacy & Compliance Engine",
      role: "Pre-Flight Guardrails",
      avatarBg: "bg-[#FF9B72]/20 text-[#FF9B72] border border-[#FF9B72]/40",
      company: "Data Guard"
    },
    {
      headline: "Universal Wire-Compatible API Specification",
      quote: "Drop-in OpenAI SDK compatibility requires exactly one line change: pointing your baseURL to api.unillm.io. Switch foundation models across providers with zero client-side refactoring.",
      author: "Unified Ingress Standard",
      role: "Standardized Schema Spec",
      avatarBg: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40",
      company: "Single Gateway"
    }
  ];

  let currentSlide = 0;
  const slideContainer = document.getElementById("testimonial-slide-container");
  const headlineEl = document.getElementById("test-headline");
  const quoteEl = document.getElementById("test-quote");
  const avatarEl = document.getElementById("test-avatar");
  const authorEl = document.getElementById("test-author");
  const roleEl = document.getElementById("test-role");
  const dotsContainer = document.getElementById("carousel-dots");

  const updateSlide = (idx) => {
    if (idx < 0) currentSlide = architecturalPatterns.length - 1;
    else if (idx >= architecturalPatterns.length) currentSlide = 0;
    else currentSlide = idx;

    const data = architecturalPatterns[currentSlide];

    if (slideContainer) {
      slideContainer.style.opacity = "0";
      setTimeout(() => {
        if (headlineEl) headlineEl.innerText = data.headline;
        if (quoteEl) quoteEl.innerText = `"${data.quote}"`;
        if (authorEl) authorEl.innerText = data.author;
        if (roleEl) roleEl.innerText = data.role;
        if (avatarEl) {
          avatarEl.className = `w-9 h-9 rounded-lg ${data.avatarBg} flex items-center justify-center font-bold text-xs font-mono`;
          avatarEl.innerText = `0${currentSlide + 1}`;
        }

        if (dotsContainer) {
          dotsContainer.querySelectorAll(".car-dot").forEach((d, i) => {
            if (i === currentSlide) {
              d.className = "car-dot w-6 h-1.5 rounded-full transition-all bg-white";
            } else {
              d.className = "car-dot w-2 h-1.5 rounded-full transition-all bg-[rgba(242,239,232,0.14)] hover:bg-[#A6A39C]";
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

  // 3. Capability Tabs & Code Switcher
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
        b.className = "capability-tab-btn text-left p-4 rounded-xl border border-[rgba(242,239,232,0.14)] bg-[#141615] hover:border-white/30 transition-all";
        const badge = b.querySelector(".font-mono");
        if (badge) badge.className = "text-[10px] font-mono text-[#A6A39C]";
      });

      btn.className = "capability-tab-btn active text-left p-4 rounded-xl border border-white bg-[#1A1D1B] transition-all";
      const activeBadge = btn.querySelector(".font-mono");
      if (activeBadge) activeBadge.className = "text-[10px] font-mono text-white font-bold";

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
        b.className = "code-lang-btn px-2.5 py-1 rounded text-[#A6A39C] hover:text-white text-[10px]";
      });
      btn.className = "code-lang-btn px-2.5 py-1 rounded bg-[#1A1D1B] text-white border border-[rgba(242,239,232,0.14)] text-[10px]";
      updateCodeDisplay();
    });
  });

  // 4. Simulated Edge Interactive Playground
  const simOutput = document.getElementById("sim-log-output");
  const simPill = document.getElementById("sim-status-pill");

  const logSim = (msg, type = "info") => {
    if (!simOutput) return;
    const time = new Date().toLocaleTimeString();
    const colors = {
      info: "text-[#A6A39C]",
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
      logSim("⚠️ Upstream returned HTTP 429: Rate limit reached.", "warning");
      logSim("⚡ Fallback activated. Executing target: anthropic/claude-3-5-sonnet", "info");
      setTimeout(() => {
        logSim("✓ Failover completed in 42ms. Upstream 200 OK. Streaming tokens to client.", "success");
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
      simPill.className = "text-[#697DFF] font-bold";
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
      simPill.className = "text-[#FF9B72] font-bold";
    }
    logSim("→ Inbound payload: \"Process refund for card 4111-2222-3333-4444 exp 12/28\"", "warning");
    logSim("Regex & NLP entity scanner matching pattern: [CREDIT_CARD_VISA]", "info");
    setTimeout(() => {
      logSim("🛡️ PII Redacted: \"Process refund for card [REDACTED_CC] exp [REDACTED_DATE]\"", "success");
      logSim("✓ Sanitized payload securely routed to model provider.", "success");
      if (simPill) {
        simPill.innerText = "PAYLOAD SANITIZED";
        simPill.className = "text-[#FF9B72] font-bold";
      }
    }, 250);
  });

  document.getElementById("sim-clear-btn")?.addEventListener("click", () => {
    if (simOutput) {
      simOutput.innerHTML = `
        <div>[GATEWAY] UniLLM edge node online. Listening on https://api.unillm.io/v1</div>
        <div>[STATUS] Routing tables initialized for 100+ model targets. Ready.</div>
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
