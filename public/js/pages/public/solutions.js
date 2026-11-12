// PUBLIC PAGE: solutions (Obsidian Enterprise Architecture Solutions)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";
import { icons } from "../../icons.js?v=2";

export function solutions() {
  return `
    <div class="relative overflow-hidden w-full font-sans bg-[#0B0C0D] text-[#F2EFE8]">
      
      <!-- Monochromatic background ambiance -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[450px] bg-gradient-to-b from-[#FF7849]/[0.04] via-[#42D6A4]/[0.02] to-transparent blur-[150px] pointer-events-none -z-10"></div>

      <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24 flex flex-col gap-24">
        
        <!-- =========================================================
             1. EDITORIAL HERO SECTION
        ========================================================= -->
        <section class="flex flex-col lg:flex-row items-center justify-between gap-12 pb-16 border-b border-[rgba(242,239,232,0.14)]">
          <div class="flex-1 flex flex-col gap-6 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141615] border border-[rgba(242,239,232,0.14)] text-[11px] font-mono tracking-wider text-[#A6A39C] uppercase self-start">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Production Blueprints</span>
              <span class="text-white/20">•</span>
              <span class="text-white">Enterprise Topologies</span>
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-[-0.03em] text-[#F2EFE8] leading-[1.08]">
              Architected for scale.<br />
              Hardened for production.
            </h1>

            <p class="text-base text-[#A6A39C] leading-relaxed">
              Whether deploying high-volume multi-tenant SaaS platforms, sub-second financial trading assistants, or zero-data-retention healthcare systems, UniLLM provides the policy guardrails, semantic caching, and resilience required at enterprise scale.
            </p>

            <div class="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/book-demo"
                data-link
                class="px-6 py-3 rounded-lg bg-[#FF7849] hover:bg-[#ff8a60] text-[#0B0C0D] font-bold shadow-[0_4px_25px_rgba(255,120,73,0.3)] text-xs font-semibold transition-all shadow-sm inline-flex items-center gap-2"
              >
                <span>Schedule Architecture Review</span>
                <span class="font-bold">→</span>
              </a>
              <a
                href="#solution-blueprints"
                class="px-6 py-3 rounded-lg bg-[#141615] hover:bg-[#1A1D1B] text-[#F2EFE8] border border-[rgba(242,239,232,0.14)] text-xs font-semibold transition-all inline-flex items-center gap-2"
              >
                <span>Explore Blueprints</span>
                <span>↓</span>
              </a>
            </div>
          </div>

          <!-- Hero Right: Live Architecture Blueprint Preview -->
          <div class="flex-1 w-full max-w-lg lg:max-w-none rounded-xl border border-[rgba(242,239,232,0.14)] bg-[#141615] p-6 shadow-2xl relative overflow-hidden font-mono">
            <div class="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(242,239,232,0.14)] text-xs">
              <div class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span class="text-white text-xs font-semibold">Topology: Multi-Region Ingress</span>
              </div>
              <span class="px-2 py-0.5 rounded bg-white/5 text-[#A6A39C] border border-[rgba(242,239,232,0.14)] text-[10px]">P99 &lt; 380ms</span>
            </div>

            <div class="space-y-3 text-xs">
              <div class="p-4 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.14)] flex items-center justify-between">
                <div>
                  <div class="text-white font-medium">Ingress Gateway Cluster</div>
                  <div class="text-[11px] text-[#A6A39C] mt-0.5">36 Global Edge PoPs • Anycast Routing</div>
                </div>
                <span class="text-emerald-400 font-bold text-[11px]">ONLINE</span>
              </div>

              <div class="p-4 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.14)] flex items-center justify-between">
                <div>
                  <div class="text-white font-medium">In-Memory Semantic Cache</div>
                  <div class="text-[11px] text-[#A6A39C] mt-0.5">Cosine Similarity 0.95 Threshold</div>
                </div>
                <span class="text-white font-bold text-[11px]">84% HIT RATIO</span>
              </div>

              <div class="p-4 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.14)] flex items-center justify-between">
                <div>
                  <div class="text-white font-medium">Multi-Cloud Circuit Breaker</div>
                  <div class="text-[11px] text-[#A6A39C] mt-0.5">Automated Failover Matrix across 4 Clouds</div>
                </div>
                <span class="text-white/80 font-bold text-[11px]">ARMED</span>
              </div>
            </div>
          </div>
        </section>

        <!-- =========================================================
             2. INTERACTIVE BLUEPRINT SELECTOR
        ========================================================= -->
        <section id="solution-blueprints" class="flex flex-col gap-10">
          <div class="flex flex-col gap-3 text-center max-w-2xl mx-auto">
            <span class="text-xs font-mono font-bold text-[#A6A39C] uppercase tracking-wider">Enterprise Blueprints</span>
            <h2 class="text-3xl sm:text-4xl font-bold tracking-[-0.03em] text-[#F2EFE8]">
              Choose your architecture blueprint
            </h2>
            <p class="text-sm text-[#A6A39C]">
              Select a domain use case to inspect topological routing, compliance enforcement, and resilience parameters.
            </p>
          </div>

          <!-- Blueprint Tab Strip -->
          <div class="flex items-center justify-center flex-wrap gap-2">
            <button data-blueprint="rag" class="blueprint-tab-btn px-4 py-2 rounded-lg text-xs font-semibold transition-all bg-[#1A1D1B] text-white border border-white">
              Enterprise RAG & Search
            </button>
            <button data-blueprint="finance" class="blueprint-tab-btn px-4 py-2 rounded-lg text-xs font-semibold transition-all text-[#A6A39C] hover:text-white hover:bg-[#141615] border border-transparent">
              Financial Risk & Trading
            </button>
            <button data-blueprint="healthcare" class="blueprint-tab-btn px-4 py-2 rounded-lg text-xs font-semibold transition-all text-[#A6A39C] hover:text-white hover:bg-[#141615] border border-transparent">
              Healthcare & HIPAA Clinical
            </button>
            <button data-blueprint="saas" class="blueprint-tab-btn px-4 py-2 rounded-lg text-xs font-semibold transition-all text-[#A6A39C] hover:text-white hover:bg-[#141615] border border-transparent">
              Multi-Tenant SaaS
            </button>
          </div>

          <!-- Active Blueprint Detail Card -->
          <div class="rounded-xl border border-[rgba(242,239,232,0.14)] bg-[#141615] p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <!-- Left Info (Col 7) -->
            <div class="lg:col-span-7 flex flex-col gap-6">
              <div class="flex items-center gap-3">
                <span id="bp-badge" class="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white/5 text-white border border-[rgba(242,239,232,0.14)]">
                  RELIABILITY & SPEED
                </span>
                <span id="bp-sla" class="text-xs font-mono text-emerald-400">99.99% Availability SLA</span>
              </div>

              <div>
                <h3 id="bp-title" class="text-2xl font-bold text-white mb-2">High-Throughput Enterprise RAG</h3>
                <p id="bp-desc" class="text-xs sm:text-sm text-[#A6A39C] leading-relaxed">
                  Decouple ingestion and retrieval pipelines. Semantic caching eliminates repetitive embeddings costs while dynamic failover shifts heavy queries across Claude, GPT-4o, and Llama 3 when rate limits are triggered.
                </p>
              </div>

              <!-- Technical Specifications Grid -->
              <div class="grid grid-cols-2 gap-3 font-mono text-xs" id="bp-specs">
                <div class="p-3 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.14)]">
                  <div class="text-[#A6A39C] text-[10px]">Fallback Chain</div>
                  <div class="text-white font-bold mt-0.5">Claude → GPT-4o → Groq</div>
                </div>
                <div class="p-3 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.14)]">
                  <div class="text-[#A6A39C] text-[10px]">Semantic Cache</div>
                  <div class="text-emerald-400 font-bold mt-0.5">Sub-8ms Hits</div>
                </div>
                <div class="p-3 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.14)]">
                  <div class="text-[#A6A39C] text-[10px]">Rate Limit Shield</div>
                  <div class="text-white font-bold mt-0.5">Token Bucket Pooling</div>
                </div>
                <div class="p-3 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.14)]">
                  <div class="text-[#A6A39C] text-[10px]">Audit Immutability</div>
                  <div class="text-white/80 font-bold mt-0.5">Cryptographic Hash</div>
                </div>
              </div>

              <div>
                <a
                  id="bp-action-link"
                  href="/docs"
                  data-link
                  class="inline-flex items-center gap-2 text-xs font-semibold text-white hover:text-neutral-300 transition-colors"
                >
                  <span id="bp-action-text">Read RAG Deployment Guide</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            <!-- Right Interactive Flow Diagram (Col 5) -->
            <div class="lg:col-span-5 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.14)] p-5 font-mono text-xs">
              <div class="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(242,239,232,0.14)] text-[11px] text-[#A6A39C]">
                <span>Pipeline Architecture</span>
                <span class="text-emerald-400">Flow Active</span>
              </div>

              <div class="flex flex-col gap-3">
                <div class="p-3 rounded-lg bg-[#141615] border border-[rgba(242,239,232,0.14)] flex items-center justify-between">
                  <span class="text-white font-medium">Application Backend</span>
                  <span class="text-[10px] text-[#A6A39C]">OpenAI SDK Ingress</span>
                </div>

                <div class="flex justify-center text-[#A6A39C]">↓</div>

                <div class="p-3 rounded-lg bg-[#1A1D1B] border border-white/20 flex items-center justify-between">
                  <div>
                    <span class="text-white font-semibold block">UniLLM Gateway</span>
                    <span class="text-[10px] text-[#A6A39C]">Vector Cache & Fallback Routing</span>
                  </div>
                  <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                </div>

                <div class="flex justify-center text-[#A6A39C]">↓</div>

                <div class="p-3 rounded-lg bg-[#141615] border border-[rgba(242,239,232,0.14)] flex items-center justify-between">
                  <span class="text-white font-medium">Target Provider Pool</span>
                  <span class="text-[10px] text-emerald-400">Auto Balanced</span>
                </div>
              </div>
            </div>

          </div>
        </section>

        <!-- =========================================================
             3. INTERACTIVE ROI & TOKEN COST CALCULATOR
        ========================================================= -->
        <section class="rounded-xl border border-[rgba(242,239,232,0.14)] bg-[#141615] p-6 lg:p-10 flex flex-col gap-8">
          <div class="flex flex-col gap-2 max-w-2xl">
            <span class="text-xs font-mono font-bold text-[#A6A39C] uppercase tracking-wider">Inference Efficiency Calculator</span>
            <h2 class="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#F2EFE8]">
              Estimate your monthly infrastructure savings
            </h2>
            <p class="text-xs sm:text-sm text-[#A6A39C]">
              Adjust monthly spend to inspect the direct impact of UniLLM’s semantic vector caching and intelligent model routing.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <!-- Controls (Col 6) -->
            <div class="lg:col-span-6 flex flex-col gap-6">
              <div class="flex flex-col gap-2">
                <div class="flex justify-between items-center text-xs">
                  <span class="font-medium text-[#A6A39C]">Monthly AI Spend:</span>
                  <span id="roi-spend-display" class="font-mono font-bold text-white text-base">$25,000 / mo</span>
                </div>
                <input
                  type="range"
                  id="roi-spend-slider"
                  min="2000"
                  max="100000"
                  step="1000"
                  value="25000"
                  class="w-full accent-white cursor-pointer"
                />
                <div class="flex justify-between text-[10px] font-mono text-[#A6A39C]">
                  <span>$2k/mo</span>
                  <span>$50k/mo</span>
                  <span>$100k+/mo</span>
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <div class="flex justify-between items-center text-xs">
                  <span class="font-medium text-[#A6A39C]">Repetitive Query Ratio (Semantic Opportunity):</span>
                  <span id="roi-cache-display" class="font-mono font-bold text-white text-base">40%</span>
                </div>
                <input
                  type="range"
                  id="roi-cache-slider"
                  min="10"
                  max="80"
                  step="5"
                  value="40"
                  class="w-full accent-white cursor-pointer"
                />
              </div>
            </div>

            <!-- Savings Output Cards (Col 6) -->
            <div class="lg:col-span-6 grid grid-cols-2 gap-4 font-mono text-xs">
              <div class="p-5 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.14)] flex flex-col justify-between">
                <span class="text-[#A6A39C] text-[10px]">Estimated Monthly Savings</span>
                <div class="my-2">
                  <span id="roi-savings-val" class="text-2xl sm:text-3xl font-bold text-emerald-400">$10,000</span>
                  <span class="text-[10px] text-[#A6A39C] block mt-0.5">/ month saved</span>
                </div>
                <span class="text-[10px] text-white">Via Vector Caching</span>
              </div>

              <div class="p-5 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.14)] flex flex-col justify-between">
                <span class="text-[#A6A39C] text-[10px]">Downtime Prevented</span>
                <div class="my-2">
                  <span class="text-2xl sm:text-3xl font-bold text-white">99.99%</span>
                  <span class="text-[10px] text-[#A6A39C] block mt-0.5">SLA availability</span>
                </div>
                <span class="text-emerald-400 text-[10px]">Zero Dropped Queries</span>
              </div>

              <div class="p-5 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.14)] flex flex-col justify-between">
                <span class="text-[#A6A39C] text-[10px]">Annual Budget Preserved</span>
                <div class="my-2">
                  <span id="roi-annual-val" class="text-2xl sm:text-3xl font-bold text-white">$120,000</span>
                  <span class="text-[10px] text-[#A6A39C] block mt-0.5">/ year preserved</span>
                </div>
                <span class="text-[10px] text-[#A6A39C]">Reinvest in Compute</span>
              </div>

              <div class="p-5 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.14)] flex flex-col justify-between">
                <span class="text-[#A6A39C] text-[10px]">P95 Latency Reduction</span>
                <div class="my-2">
                  <span class="text-2xl sm:text-3xl font-bold text-white">- 68%</span>
                  <span class="text-[10px] text-[#A6A39C] block mt-0.5">faster responses</span>
                </div>
                <span class="text-[10px] text-emerald-400">&lt; 15ms Cache Hits</span>
              </div>
            </div>

          </div>
        </section>

        <!-- =========================================================
             4. BOTTOM CALL TO ACTION
        ========================================================= -->
        <section class="rounded-xl bg-[#141615] border border-[rgba(242,239,232,0.14)] p-8 sm:p-12 text-center flex flex-col items-center gap-6">
          <div class="max-w-xl flex flex-col gap-2">
            <h2 class="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#F2EFE8]">
              Need a custom deployment architecture?
            </h2>
            <p class="text-xs sm:text-sm text-[#A6A39C]">
              Our solutions team works with enterprise engineering leaders to build multi-region routing topologies with custom SLAs.
            </p>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/book-demo"
              data-link
              class="px-6 py-3 rounded-lg bg-[#FF7849] hover:bg-[#ff8a60] text-[#0B0C0D] font-bold shadow-[0_4px_25px_rgba(255,120,73,0.3)] text-xs font-semibold transition-all shadow-sm inline-flex items-center gap-2"
            >
              <span>Schedule Architecture Review</span>
              <span class="font-bold">→</span>
            </a>
            <a
              href="/contact"
              data-link
              class="px-6 py-3 rounded-lg bg-[#1A1D1B] hover:bg-[#141615] text-[#F2EFE8] border border-[rgba(242,239,232,0.14)] text-xs font-semibold transition-all"
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
  // 1. Interactive Blueprints
  const blueprintData = {
    rag: {
      badge: "RELIABILITY & SPEED",
      sla: "99.99% Availability SLA",
      title: "High-Throughput Enterprise RAG",
      desc: "Decouple ingestion and retrieval pipelines. Semantic caching eliminates repetitive embeddings costs while dynamic failover shifts heavy queries across Claude, GPT-4o, and Llama 3 when rate limits are triggered.",
      specs: [
        { label: "Fallback Chain", val: "Claude → GPT-4o → Groq", col: "text-white" },
        { label: "Semantic Cache", val: "Sub-8ms Hits", col: "text-emerald-400" },
        { label: "Rate Limit Shield", val: "Token Bucket Pooling", col: "text-white" },
        { label: "Audit Immutability", val: "Cryptographic Hash", col: "text-[#A6A39C]" }
      ],
      linkText: "Read RAG Deployment Guide",
      linkHref: "/docs"
    },
    finance: {
      badge: "ULTRA LOW LATENCY",
      sla: "Sub-15ms Gateway Overhead",
      title: "Algorithmic Risk & Trading Assistants",
      desc: "Deterministic sub-15ms gateway routing with guaranteed connection pooling across primary financial model providers. Enforces strict parameter limits and multi-region failover matrices.",
      specs: [
        { label: "P99 Overhead", val: "< 14.2ms Edge", col: "text-emerald-400" },
        { label: "Compliance", val: "Audit Immutability", col: "text-white" },
        { label: "Failover Speed", val: "< 45ms Re-Route", col: "text-white" },
        { label: "Egress Controls", val: "Strict Schema Guard", col: "text-[#A6A39C]" }
      ],
      linkText: "Inspect Financial Compliance Spec",
      linkHref: "/security"
    },
    healthcare: {
      badge: "ZERO DATA RETENTION",
      sla: "HIPAA Compliant Architecture",
      title: "Clinical Intelligence & Healthcare Platforms",
      desc: "Hardware-enforced zero-data retention. Inbound patient payloads pass through real-time PII stripping filters before routing to HIPAA-eligible foundation models.",
      specs: [
        { label: "PII Masking", val: "SSN, MRN, Names", col: "text-emerald-400" },
        { label: "Storage", val: "Zero Disk Writes", col: "text-white" },
        { label: "Encryption", val: "AES-256 + TLS 1.3", col: "text-white" },
        { label: "BAA Available", val: "Enterprise Tier", col: "text-[#A6A39C]" }
      ],
      linkText: "Download Healthcare BAA Information",
      linkHref: "/enterprise"
    },
    saas: {
      badge: "MULTI-TENANT GOVERNANCE",
      sla: "Granular Team Quotas",
      title: "Multi-Tenant SaaS Foundation Layer",
      desc: "Deliver custom AI features to thousands of end-customers with per-workspace API keys, budget enforcement, hard spend caps, and token attribution.",
      specs: [
        { label: "Isolation", val: "Workspace Segregated", col: "text-white" },
        { label: "Budgets", val: "Hard Cap Enforced", col: "text-emerald-400" },
        { label: "Attribution", val: "Per-Tenant Billing", col: "text-white" },
        { label: "Webhooks", val: "Real-Time Quota Events", col: "text-[#A6A39C]" }
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
        b.className = "blueprint-tab-btn px-4 py-2 rounded-lg text-xs font-semibold transition-all text-[#A6A39C] hover:text-white hover:bg-[#141615] border border-transparent";
      });
      btn.className = "blueprint-tab-btn px-4 py-2 rounded-lg text-xs font-semibold transition-all bg-[#1A1D1B] text-white border border-white";

      const d = blueprintData[bp];
      if (badgeEl) badgeEl.innerText = d.badge;
      if (slaEl) slaEl.innerText = d.sla;
      if (titleEl) titleEl.innerText = d.title;
      if (descEl) descEl.innerText = d.desc;
      if (actionText) actionText.innerText = d.linkText;
      if (actionLink) actionLink.setAttribute("href", d.linkHref);

      if (specsEl) {
        specsEl.innerHTML = d.specs.map(s => `
          <div class="p-3 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.14)]">
            <div class="text-[#A6A39C] text-[10px]">${s.label}</div>
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
