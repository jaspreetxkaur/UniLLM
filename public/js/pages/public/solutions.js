// PUBLIC PAGE: solutions (Enterprise Architecture Solutions Redesign)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";
import { icons } from "../../icons.js?v=2";

export function solutions() {
  return `
    <div class="relative overflow-hidden w-full font-sans bg-[#07080B] text-white">
      <!-- Ambient Radial Glows -->
      <div class="absolute top-[3%] right-[10%] w-[600px] h-[600px] rounded-full blur-[180px] bg-[#38BDF8]/5 pointer-events-none -z-10"></div>
      <div class="absolute top-[45%] left-[5%] w-[600px] h-[600px] rounded-full blur-[180px] bg-indigo-500/5 pointer-events-none -z-10"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col gap-24">
        
        <!-- =========================================================
             1. EDITORIAL HERO SECTION
        ========================================================= -->
        <section class="flex flex-col lg:flex-row items-center justify-between gap-12 pt-6 pb-12 border-b border-[#1F2438]">
          <div class="flex-1 flex flex-col gap-6 max-w-2xl animate-fade-in-up">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161926] border border-[#1F2438] text-[#38BDF8] text-[11px] font-mono font-bold tracking-wider self-start">
              <span class="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse"></span>
              PRODUCTION SYSTEM ARCHITECTURES
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Architected for scale. <br class="hidden sm:inline" />
              Proven in <span class="text-[#38BDF8]">production</span>.
            </h1>

            <p class="text-sm sm:text-base text-[#8E98B0] leading-relaxed">
              Whether deploying high-volume multi-tenant SaaS platforms, sub-second financial trading assistants, or HIPAA-compliant clinical systems, UniLLM provides the policy guardrails, semantic caching, and resilience required at enterprise scale.
            </p>

            <div class="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/book-demo"
                data-link
                class="px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-[#07080B] text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>Schedule Architecture Review</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
              <a
                href="#solution-blueprints"
                class="px-6 py-3 rounded-full bg-[#161926] hover:bg-[#1F2438] text-white border border-[#1F2438] hover:border-[#38BDF8]/40 text-xs font-semibold transition-all inline-flex items-center gap-2"
              >
                <span>Explore Blueprints</span>
                <svg class="w-3.5 h-3.5 text-[#8E98B0]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg>
              </a>
            </div>
          </div>

          <!-- Hero Right: Live Architecture Blueprint Preview -->
          <div class="flex-1 w-full max-w-lg lg:max-w-none rounded-2xl border border-[#1F2438] bg-[#10121A] p-6 shadow-2xl relative overflow-hidden">
            <div class="flex items-center justify-between pb-3 mb-4 border-b border-[#1F2438] text-xs">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span class="font-mono text-white text-xs font-bold">Active Topology: Multi-Region High-Availability</span>
              </div>
              <span class="px-2 py-0.5 rounded bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20 font-mono text-[10px]">P99 &lt; 380ms</span>
            </div>

            <div class="space-y-4 text-xs font-mono">
              <div class="p-3.5 rounded-xl bg-[#0A0C13] border border-[#1F2438] flex items-center justify-between">
                <div>
                  <div class="text-white font-bold">Ingress Gateway Cluster</div>
                  <div class="text-[11px] text-[#8E98B0]">36 Global Edge PoPs • Anycast BGP</div>
                </div>
                <span class="text-emerald-400 font-bold text-[11px]">100% HEALTH</span>
              </div>

              <div class="p-3.5 rounded-xl bg-[#0A0C13] border border-[#1F2438] flex items-center justify-between">
                <div>
                  <div class="text-white font-bold">In-Memory Semantic Cache</div>
                  <div class="text-[11px] text-[#8E98B0]">Redis Cluster Vector Search • 0.95 Threshold</div>
                </div>
                <span class="text-[#38BDF8] font-bold text-[11px]">84% HIT RATIO</span>
              </div>

              <div class="p-3.5 rounded-xl bg-[#0A0C13] border border-[#1F2438] flex items-center justify-between">
                <div>
                  <div class="text-white font-bold">Provider Circuit Breaker</div>
                  <div class="text-[11px] text-[#8E98B0]">Automated Failover Matrix across 4 Clouds</div>
                </div>
                <span class="text-indigo-400 font-bold text-[11px]">ARMED</span>
              </div>
            </div>
          </div>
        </section>

        <!-- =========================================================
             2. INTERACTIVE BLUEPRINT SELECTOR (EDITORIAL DEEP-DIVES)
        ========================================================= -->
        <section id="solution-blueprints" class="reveal-on-scroll flex flex-col gap-10">
          <div class="flex flex-col gap-3 text-center max-w-2xl mx-auto">
            <span class="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">Enterprise Blueprints</span>
            <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Choose your architecture blueprint
            </h2>
            <p class="text-xs sm:text-sm text-[#8E98B0] leading-relaxed">
              Select an industry scenario below to inspect how UniLLM configures routing policies, caching rules, and compliance guardrails.
            </p>
          </div>

          <!-- Blueprint Tabs Navigation -->
          <div class="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-[#10121A] border border-[#1F2438] max-w-3xl mx-auto w-full" id="blueprint-tabs">
            <button data-blueprint="rag" class="blueprint-tab-btn px-4 py-2.5 rounded-xl text-xs font-bold transition-all bg-[#161926] text-white border border-[#38BDF8]">
              1. Enterprise RAG
            </button>
            <button data-blueprint="fintech" class="blueprint-tab-btn px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-[#8E98B0] hover:text-white hover:bg-[#161926]">
              2. Fintech & Trading
            </button>
            <button data-blueprint="health" class="blueprint-tab-btn px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-[#8E98B0] hover:text-white hover:bg-[#161926]">
              3. Healthcare HIPAA
            </button>
            <button data-blueprint="saas" class="blueprint-tab-btn px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-[#8E98B0] hover:text-white hover:bg-[#161926]">
              4. Multi-Tenant SaaS
            </button>
          </div>

          <!-- Dynamic Blueprint Content Panel -->
          <div class="rounded-2xl border border-[#1F2438] bg-[#10121A] p-6 lg:p-10 shadow-2xl" id="blueprint-content-area">
            
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <!-- Blueprint Details (Col 6) -->
              <div class="lg:col-span-6 flex flex-col gap-6">
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <span id="bp-badge" class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20">
                      BLUEPRINT #1
                    </span>
                    <span id="bp-sla" class="text-[11px] font-mono text-[#8E98B0]">Sub-18ms Latency • 99.99% Uptime</span>
                  </div>
                  <h3 id="bp-title" class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Enterprise RAG & Search
                  </h3>
                </div>

                <p id="bp-desc" class="text-xs sm:text-sm text-[#8E98B0] leading-relaxed">
                  Supercharge Retrieval-Augmented Generation workflows. Automatically route long document chunks to high-context models (Gemini 1.5 Pro, Claude 3.5 Sonnet) while serving repetitive customer queries from sub-18ms semantic vector cache.
                </p>

                <!-- Spec Grid -->
                <div class="grid grid-cols-2 gap-3 text-xs font-mono" id="bp-specs">
                  <div class="p-3 rounded-xl bg-[#0A0C13] border border-[#1F2438]">
                    <div class="text-[#8E98B0] text-[10px]">Context Routing</div>
                    <div class="text-white font-bold mt-0.5">2M Tokens Window</div>
                  </div>
                  <div class="p-3 rounded-xl bg-[#0A0C13] border border-[#1F2438]">
                    <div class="text-[#8E98B0] text-[10px]">Semantic Cache</div>
                    <div class="text-emerald-400 font-bold mt-0.5">85% Hit Rate</div>
                  </div>
                  <div class="p-3 rounded-xl bg-[#0A0C13] border border-[#1F2438]">
                    <div class="text-[#8E98B0] text-[10px]">Fallback Chain</div>
                    <div class="text-[#38BDF8] font-bold mt-0.5">Claude &rarr; GPT-4o &rarr; Groq</div>
                  </div>
                  <div class="p-3 rounded-xl bg-[#0A0C13] border border-[#1F2438]">
                    <div class="text-[#8E98B0] text-[10px]">Cost Reduction</div>
                    <div class="text-purple-400 font-bold mt-0.5">Up to 72% Savings</div>
                  </div>
                </div>

                <div class="pt-2">
                  <a id="bp-action-link" href="/docs#caching" data-link class="px-5 py-2.5 rounded-full bg-[#161926] hover:bg-[#1F2438] text-white border border-[#1F2438] text-xs font-semibold inline-flex items-center gap-2">
                    <span id="bp-action-text">Read RAG Implementation Guide</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>

              <!-- Blueprint Architecture Flow Diagram (Col 6) -->
              <div class="lg:col-span-6 rounded-xl bg-[#0A0C13] border border-[#1F2438] p-5 flex flex-col gap-4 font-mono text-xs">
                <div class="flex items-center justify-between pb-3 border-b border-[#1F2438] text-[11px] text-[#8E98B0]">
                  <span>Execution Topology Diagram</span>
                  <span class="text-[#38BDF8]">Live Flow</span>
                </div>

                <!-- Animated Data Nodes -->
                <div class="space-y-3">
                  <div class="p-3 rounded-lg bg-[#10121A] border border-[#1F2438] flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <span class="w-2 h-2 rounded-full bg-[#38BDF8]"></span>
                      <span class="text-white font-bold">1. Vector Store Embeddings</span>
                    </div>
                    <span class="text-[10px] text-[#8E98B0]">pgvector / Pinecone</span>
                  </div>

                  <div class="flex justify-center">
                    <svg class="w-4 h-6 text-[#38BDF8] animate-bounce" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                  </div>

                  <div class="p-3 rounded-lg bg-[#161926] border border-[#38BDF8]/40 flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span class="text-white font-bold">2. UniLLM Semantic Filter</span>
                    </div>
                    <span class="text-[10px] text-emerald-400 font-bold">&lt; 12ms Edge Cache</span>
                  </div>

                  <div class="flex justify-center">
                    <svg class="w-4 h-6 text-[#38BDF8] animate-bounce" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
                  </div>

                  <div class="p-3 rounded-lg bg-[#10121A] border border-[#1F2438] flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <span class="w-2 h-2 rounded-full bg-indigo-400"></span>
                      <span class="text-white font-bold">3. Upstream Model Dispatch</span>
                    </div>
                    <span class="text-[10px] text-[#8E98B0]">Claude 3.5 Sonnet</span>
                  </div>
                </div>

                <div class="pt-3 border-t border-[#1F2438] text-[10px] text-[#8E98B0] flex items-center justify-between">
                  <span>Guaranteed zero vendor lock-in</span>
                  <span class="text-emerald-400">SOC2 Type II Compliant</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- =========================================================
             3. INTERACTIVE ROI & TOKEN COST CALCULATOR
        ========================================================= -->
        <section class="reveal-on-scroll rounded-2xl border border-[#1F2438] bg-[#10121A] p-6 lg:p-10 flex flex-col gap-8">
          <div class="flex flex-col gap-2 max-w-2xl">
            <span class="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">Enterprise ROI Calculator</span>
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Estimate your monthly gateway savings
            </h2>
            <p class="text-xs sm:text-sm text-[#8E98B0]">
              Adjust your monthly token spend to see the impact of UniLLM’s semantic caching and intelligent model routing.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <!-- Controls (Col 6) -->
            <div class="lg:col-span-6 flex flex-col gap-6">
              <div class="flex flex-col gap-2">
                <div class="flex justify-between items-center text-xs">
                  <span class="font-medium text-[#8E98B0]">Estimated Monthly AI Spend:</span>
                  <span id="roi-spend-display" class="font-mono font-bold text-white text-base">$25,000 / mo</span>
                </div>
                <input
                  type="range"
                  id="roi-spend-slider"
                  min="2000"
                  max="100000"
                  step="1000"
                  value="25000"
                  class="w-full accent-[#38BDF8] cursor-pointer"
                />
                <div class="flex justify-between text-[10px] font-mono text-[#8E98B0]">
                  <span>$2k/mo</span>
                  <span>$50k/mo</span>
                  <span>$100k+/mo</span>
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <div class="flex justify-between items-center text-xs">
                  <span class="font-medium text-[#8E98B0]">Repetitive Query Ratio (Cache Opportunity):</span>
                  <span id="roi-cache-display" class="font-mono font-bold text-[#38BDF8] text-base">40%</span>
                </div>
                <input
                  type="range"
                  id="roi-cache-slider"
                  min="10"
                  max="80"
                  step="5"
                  value="40"
                  class="w-full accent-[#38BDF8] cursor-pointer"
                />
              </div>
            </div>

            <!-- Savings Output Cards (Col 6) -->
            <div class="lg:col-span-6 grid grid-cols-2 gap-4 font-mono text-xs">
              <div class="p-5 rounded-xl bg-[#0A0C13] border border-[#1F2438] flex flex-col justify-between">
                <span class="text-[#8E98B0] text-[10px]">Estimated Monthly Savings</span>
                <div class="my-2">
                  <span id="roi-savings-val" class="text-2xl sm:text-3xl font-bold text-emerald-400">$10,000</span>
                  <span class="text-[10px] text-[#8E98B0] block mt-0.5">/ month saved</span>
                </div>
                <span class="text-[10px] text-[#38BDF8]">Via Vector Caching</span>
              </div>

              <div class="p-5 rounded-xl bg-[#0A0C13] border border-[#1F2438] flex flex-col justify-between">
                <span class="text-[#8E98B0] text-[10px]">Downtime Prevented</span>
                <div class="my-2">
                  <span class="text-2xl sm:text-3xl font-bold text-white">99.99%</span>
                  <span class="text-[10px] text-[#8E98B0] block mt-0.5">SLA availability</span>
                </div>
                <span class="text-emerald-400 text-[10px]">Zero Dropped Queries</span>
              </div>

              <div class="p-5 rounded-xl bg-[#0A0C13] border border-[#1F2438] flex flex-col justify-between">
                <span class="text-[#8E98B0] text-[10px]">Annual Runway Saved</span>
                <div class="my-2">
                  <span id="roi-annual-val" class="text-2xl sm:text-3xl font-bold text-indigo-400">$120,000</span>
                  <span class="text-[10px] text-[#8E98B0] block mt-0.5">/ year preserved</span>
                </div>
                <span class="text-[10px] text-[#8E98B0]">Reinvest in compute</span>
              </div>

              <div class="p-5 rounded-xl bg-[#0A0C13] border border-[#1F2438] flex flex-col justify-between">
                <span class="text-[#8E98B0] text-[10px]">P95 Latency Reduction</span>
                <div class="my-2">
                  <span class="text-2xl sm:text-3xl font-bold text-[#38BDF8]">- 68%</span>
                  <span class="text-[10px] text-[#8E98B0] block mt-0.5">faster responses</span>
                </div>
                <span class="text-[10px] text-emerald-400">&lt; 15ms Cache Hits</span>
              </div>
            </div>

          </div>
        </section>

        <!-- =========================================================
             4. BOTTOM CALL TO ACTION
        ========================================================= -->
        <section class="reveal-on-scroll rounded-2xl bg-gradient-to-b from-[#10121A] to-[#0A0C13] border border-[#1F2438] p-8 sm:p-12 text-center flex flex-col items-center gap-6">
          <div class="max-w-xl flex flex-col gap-2">
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Need a custom deployment architecture?
            </h2>
            <p class="text-xs sm:text-sm text-[#8E98B0]">
              Our solutions team works with enterprise engineering leaders to build multi-region routing topologies with custom SLAs.
            </p>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/book-demo"
              data-link
              class="px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-[#07080B] text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Schedule Architecture Review</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
            <a
              href="/contact"
              data-link
              class="px-6 py-3 rounded-full bg-[#161926] hover:bg-[#1F2438] text-white border border-[#1F2438] text-xs font-semibold transition-all"
            >
              Contact Sales Engineering →
            </a>
          </div>
        </section>

      </div>
    </div>
  `;
}

export function bindSolutions() {
  // 1. Blueprint switcher
  const blueprintData = {
    rag: {
      badge: "BLUEPRINT #1",
      sla: "Sub-18ms Latency • 99.99% Uptime",
      title: "Enterprise RAG & Search",
      desc: "Supercharge Retrieval-Augmented Generation workflows. Automatically route long document chunks to high-context models (Gemini 1.5 Pro, Claude 3.5 Sonnet) while serving repetitive customer queries from sub-18ms semantic vector cache.",
      specs: [
        { label: "Context Routing", val: "2M Tokens Window", col: "text-white" },
        { label: "Semantic Cache", val: "85% Hit Rate", col: "text-emerald-400" },
        { label: "Fallback Chain", val: "Claude → GPT-4o → Groq", col: "text-[#38BDF8]" },
        { label: "Cost Reduction", val: "Up to 72% Savings", col: "text-purple-400" }
      ],
      linkText: "Read RAG Implementation Guide",
      linkHref: "/docs#caching"
    },
    fintech: {
      badge: "BLUEPRINT #2",
      sla: "Sub-20ms Failover Matrix • 99.999% SLA",
      title: "Fintech & Quantitative Systems",
      desc: "Zero-downtime reliability for market analysis and automated fraud detection. Instantaneous sub-20ms failover matrix guarantees queries never drop even during massive provider rate limit surges.",
      specs: [
        { label: "Availability SLA", val: "99.999% Uptime", col: "text-emerald-400" },
        { label: "Failover Speed", val: "< 25ms Switchover", col: "text-white" },
        { label: "Compliance", val: "Audit Immutability", col: "text-[#38BDF8]" },
        { label: "Rate Surges", val: "Automatic Smoothing", col: "text-amber-400" }
      ],
      linkText: "Request Fintech SLA Review",
      linkHref: "/talk-to-sales"
    },
    health: {
      badge: "BLUEPRINT #3",
      sla: "HIPAA & SOC2 Type II • Zero-Data Retention",
      title: "Healthcare & Clinical Notes",
      desc: "Strict HIPAA & SOC2 Type II compliance with zero persistent logging of patient prompt data. Automatically redact Social Security, MRN numbers, and medical record identifiers before payload leaves your perimeter.",
      specs: [
        { label: "PII Masking", val: "Regex & NLP Entity Scrub", col: "text-purple-400" },
        { label: "Data Retention", val: "0-Days (In-Memory Only)", col: "text-emerald-400" },
        { label: "Legal Contract", val: "BAA Provided", col: "text-white" },
        { label: "Encryption", val: "AES-256 + TLS 1.3", col: "text-[#38BDF8]" }
      ],
      linkText: "Explore Healthcare Compliance",
      linkHref: "/security"
    },
    saas: {
      badge: "BLUEPRINT #4",
      sla: "Multi-Tenant Isolation • Spend Attribution",
      title: "Multi-Tenant SaaS Applications",
      desc: "Attribute token usage and costs down to individual client IDs. Set customer-level rate quotas (RPM/TPM) and prevent single noisy tenants from exhausting your provider API capacity.",
      specs: [
        { label: "Spend Attribution", val: "Granular Client Headers", col: "text-amber-400" },
        { label: "Rate Limiting", val: "Per-Tenant Tier Quotas", col: "text-white" },
        { label: "Over-Budget Guard", val: "Automatic Circuit Break", col: "text-rose-400" },
        { label: "Webhooks", val: "Real-Time Quota Events", col: "text-[#38BDF8]" }
      ],
      linkText: "View Multi-Tenant Pricing Matrix",
      linkHref: "/pricing"
    }
  };

  const tabs = document.querySelectorAll(".blueprint-tab-btn");
  const badgeEl = document.getElementById("bp-badge");
  const slaEl = document.getElementById("bp-sla");
  const titleEl = document.getElementById("bp-title");
  const descEl = document.getElementById("bp-desc");
  const specsEl = document.getElementById("bp-specs");
  const actionLink = document.getElementById("bp-action-link");
  const actionText = document.getElementById("bp-action-text");

  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const bp = btn.dataset.blueprint;
      if (!bp || !blueprintData[bp]) return;

      tabs.forEach(b => {
        b.className = "blueprint-tab-btn px-4 py-2.5 rounded-xl text-xs font-bold transition-all text-[#8E98B0] hover:text-white hover:bg-[#161926]";
      });
      btn.className = "blueprint-tab-btn px-4 py-2.5 rounded-xl text-xs font-bold transition-all bg-[#161926] text-white border border-[#38BDF8]";

      const d = blueprintData[bp];
      if (badgeEl) badgeEl.innerText = d.badge;
      if (slaEl) slaEl.innerText = d.sla;
      if (titleEl) titleEl.innerText = d.title;
      if (descEl) descEl.innerText = d.desc;
      if (actionText) actionText.innerText = d.linkText;
      if (actionLink) actionLink.setAttribute("href", d.linkHref);

      if (specsEl) {
        specsEl.innerHTML = d.specs.map(s => `
          <div class="p-3 rounded-xl bg-[#0A0C13] border border-[#1F2438]">
            <div class="text-[#8E98B0] text-[10px]">${s.label}</div>
            <div class="${s.col} font-bold mt-0.5">${s.val}</div>
          </div>
        `).join("");
      }
    });
  });

  // 2. ROI Calculator
  const spendSlider = document.getElementById("roi-spend-slider");
  const cacheSlider = document.getElementById("roi-cache-slider");
  const spendDisplay = document.getElementById("roi-spend-display");
  const cacheDisplay = document.getElementById("roi-cache-display");
  const savingsVal = document.getElementById("roi-savings-val");
  const annualVal = document.getElementById("roi-annual-val");

  const calcROI = () => {
    const spend = parseInt(spendSlider?.value || "25000", 10);
    const cacheRatio = parseInt(cacheSlider?.value || "40", 10) / 100;

    if (spendDisplay) spendDisplay.innerText = `$${spend.toLocaleString()} / mo`;
    if (cacheDisplay) cacheDisplay.innerText = `${Math.round(cacheRatio * 100)}%`;

    // Semantic cache saves ~90% of cached query cost
    const monthlySavings = Math.round(spend * cacheRatio * 0.9);
    const annualSavings = monthlySavings * 12;

    if (savingsVal) savingsVal.innerText = `$${monthlySavings.toLocaleString()}`;
    if (annualVal) annualVal.innerText = `$${annualSavings.toLocaleString()}`;
  };

  spendSlider?.addEventListener("input", calcROI);
  cacheSlider?.addEventListener("input", calcROI);
}

export default {
  solutions,
  bindSolutions
};
