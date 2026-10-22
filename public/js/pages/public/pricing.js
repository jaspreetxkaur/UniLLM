// PUBLIC PAGE: pricing (Transparent Pay-As-You-Go & Enterprise Matrix)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function pricing() {
  return `
    <div class="relative overflow-hidden w-full font-sans bg-[#07080B] text-white">
      <!-- Ambient Radial Glows -->
      <div class="absolute top-[5%] right-[10%] w-[550px] h-[550px] rounded-full blur-[180px] bg-[#38BDF8]/5 pointer-events-none -z-10"></div>
      <div class="absolute top-[45%] left-[5%] w-[600px] h-[600px] rounded-full blur-[180px] bg-indigo-500/5 pointer-events-none -z-10"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col gap-20">
        
        <!-- =========================================================
             1. EDITORIAL HEADER & BILLING TOGGLE
        ========================================================= -->
        <section class="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto animate-fade-in-up">
          <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161926] border border-[#1F2438] text-[#38BDF8] text-[11px] font-mono font-bold tracking-wider">
            <span class="w-2 h-2 rounded-full bg-[#38BDF8]"></span>
            TRANSPARENT USAGE-BASED INFRASTRUCTURE
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Predictable pricing. <br/>
            <span class="text-[#38BDF8]">Zero subscription lock-in</span>.
          </h1>

          <p class="text-sm sm:text-base text-[#8E98B0] leading-relaxed max-w-xl">
            Pass through raw model provider token costs with 0% platform markup. Save up to 88% on repeat queries with free in-memory semantic caching.
          </p>

          <!-- Billing Frequency Toggle Switch -->
          <div class="flex items-center gap-3 p-1.5 rounded-full bg-[#10121A] border border-[#1F2438] mt-2">
            <button id="toggle-monthly" class="px-5 py-2 rounded-full text-xs font-bold transition-all bg-[#161926] text-white border border-[#38BDF8]/40 shadow-sm">
              Monthly Prepaid
            </button>
            <button id="toggle-annual" class="px-5 py-2 rounded-full text-xs font-semibold text-[#8E98B0] hover:text-white transition-all flex items-center gap-1.5">
              <span>Annual Volume</span>
              <span class="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">SAVE 20%</span>
            </button>
          </div>
        </section>

        <!-- =========================================================
             2. THE 3-TIER MATRIX (DEVELOPER, PAYG GROWTH, ENTERPRISE)
        ========================================================= -->
        <section class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch select-none">
          
          <!-- Tier 1: Free Developer Sandbox -->
          <div class="rounded-2xl bg-[#10121A] border border-[#1F2438] p-7 sm:p-8 flex flex-col justify-between gap-8 hover:border-[#38BDF8]/40 transition-all">
            <div class="flex flex-col gap-6">
              <div class="flex flex-col gap-1">
                <span class="text-[10px] font-mono font-bold text-[#8E98B0] uppercase tracking-wider">Developer Scope</span>
                <div class="flex items-baseline gap-1 mt-1">
                  <h3 class="text-4xl font-bold text-white">$0</h3>
                  <span class="text-xs text-[#8E98B0] font-mono">/ free forever</span>
                </div>
              </div>
              <p class="text-xs text-[#8E98B0] leading-relaxed">
                Ideal for evaluating gateway latency, testing failover behavior, and local prototyping.
              </p>
              
              <div class="border-t border-[#1F2438] my-1"></div>

              <ul class="text-xs text-[#8E98B0] flex flex-col gap-3">
                <li class="flex items-start gap-2.5">
                  <span class="w-4 h-4 rounded-full bg-[#161926] border border-[#1F2438] flex items-center justify-center text-[#38BDF8] text-[10px] shrink-0 mt-0.5">✓</span>
                  <span class="text-white">10,000 monthly requests</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="w-4 h-4 rounded-full bg-[#161926] border border-[#1F2438] flex items-center justify-center text-[#38BDF8] text-[10px] shrink-0 mt-0.5">✓</span>
                  <span class="text-white">3 active workspace API keys</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="w-4 h-4 rounded-full bg-[#161926] border border-[#1F2438] flex items-center justify-center text-[#38BDF8] text-[10px] shrink-0 mt-0.5">✓</span>
                  <span>Access to 20+ core model endpoints</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="w-4 h-4 rounded-full bg-[#161926] border border-[#1F2438] flex items-center justify-center text-[#38BDF8] text-[10px] shrink-0 mt-0.5">✓</span>
                  <span>Standard edge gateway routing</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="w-4 h-4 rounded-full bg-[#161926] border border-[#1F2438] flex items-center justify-center text-[#38BDF8] text-[10px] shrink-0 mt-0.5">✓</span>
                  <span>Community Discord support</span>
                </li>
              </ul>
            </div>

            <a href="/signup" data-link class="w-full text-center py-3 bg-[#161926] hover:bg-[#1E2235] border border-[#1F2438] text-white font-semibold text-xs rounded-xl transition-all">
              Start Free Developer Tier
            </a>
          </div>

          <!-- Tier 2: Pay-As-You-Go Growth (Recommended Centerpiece) -->
          <div class="rounded-2xl bg-[#121522] border-2 border-[#38BDF8] p-7 sm:p-8 flex flex-col justify-between gap-8 relative shadow-[0_0_35px_rgba(56,189,248,0.1)] hover:-translate-y-1 transition-all">
            <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#38BDF8] text-[#07080B] text-[10px] font-mono font-bold uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-md">
              MOST POPULAR FOR TEAMS
            </span>

            <div class="flex flex-col gap-6">
              <div class="flex flex-col gap-1">
                <span class="text-[10px] font-mono font-bold text-[#38BDF8] uppercase tracking-wider">Metered Production</span>
                <div class="flex items-baseline gap-1 mt-1">
                  <h3 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">Pay-As-You-Go</h3>
                </div>
                <span class="text-[11px] text-[#38BDF8] font-mono">Raw Provider Token Pricing + $0 Platform Fee</span>
              </div>
              <p class="text-xs text-[#8E98B0] leading-relaxed">
                Recharge credits as you grow. Route across OpenAI, Anthropic, Gemini, Groq, and open weights with zero subscription lock-in.
              </p>
              
              <div class="border-t border-[#1F2438] my-1"></div>

              <ul class="text-xs text-[#8E98B0] flex flex-col gap-3">
                <li class="flex items-start gap-2.5">
                  <span class="w-4 h-4 rounded-full bg-[#38BDF8]/20 border border-[#38BDF8]/40 flex items-center justify-center text-[#38BDF8] text-[10px] shrink-0 mt-0.5">✓</span>
                  <span class="text-white font-medium">Unlimited active virtual API keys</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="w-4 h-4 rounded-full bg-[#38BDF8]/20 border border-[#38BDF8]/40 flex items-center justify-center text-[#38BDF8] text-[10px] shrink-0 mt-0.5">✓</span>
                  <span class="text-white font-medium">Full access to 100+ frontier models</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="w-4 h-4 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-[10px] shrink-0 mt-0.5">✓</span>
                  <span class="text-emerald-300 font-medium">Semantic caching: 100% free hits ($0)</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="w-4 h-4 rounded-full bg-[#38BDF8]/20 border border-[#38BDF8]/40 flex items-center justify-center text-[#38BDF8] text-[10px] shrink-0 mt-0.5">✓</span>
                  <span class="text-white">Multi-provider automatic failover</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="w-4 h-4 rounded-full bg-[#38BDF8]/20 border border-[#38BDF8]/40 flex items-center justify-center text-[#38BDF8] text-[10px] shrink-0 mt-0.5">✓</span>
                  <span>Bring-Your-Own-Key (BYOK) support</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="w-4 h-4 rounded-full bg-[#38BDF8]/20 border border-[#38BDF8]/40 flex items-center justify-center text-[#38BDF8] text-[10px] shrink-0 mt-0.5">✓</span>
                  <span>Standard priority SLA & email support</span>
                </li>
              </ul>
            </div>

            <a href="/signup" data-link class="w-full text-center py-3 bg-white hover:bg-slate-200 text-[#07080B] font-bold text-xs rounded-xl transition-all shadow-md">
              Start with $10 Free Credit &rarr;
            </a>
          </div>

          <!-- Tier 3: Enterprise Dedicated -->
          <div class="rounded-2xl bg-[#10121A] border border-[#1F2438] p-7 sm:p-8 flex flex-col justify-between gap-8 hover:border-[#38BDF8]/40 transition-all">
            <div class="flex flex-col gap-6">
              <div class="flex flex-col gap-1">
                <span class="text-[10px] font-mono font-bold text-[#8E98B0] uppercase tracking-wider">Enterprise Scale</span>
                <div class="flex items-baseline gap-1 mt-1">
                  <h3 class="text-4xl font-bold text-white">Custom</h3>
                  <span class="text-xs text-[#8E98B0] font-mono">/ dedicated cluster</span>
                </div>
              </div>
              <p class="text-xs text-[#8E98B0] leading-relaxed">
                Dedicated VPC ingress, bespoke compliance guarantees, Zero Data Retention (ZDR) legal SLA, and custom rate limits.
              </p>
              
              <div class="border-t border-[#1F2438] my-1"></div>

              <ul class="text-xs text-[#8E98B0] flex flex-col gap-3">
                <li class="flex items-start gap-2.5">
                  <span class="w-4 h-4 rounded-full bg-[#161926] border border-[#1F2438] flex items-center justify-center text-[#38BDF8] text-[10px] shrink-0 mt-0.5">✓</span>
                  <span class="text-white">Unlimited proxy request throughput</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="w-4 h-4 rounded-full bg-[#161926] border border-[#1F2438] flex items-center justify-center text-[#38BDF8] text-[10px] shrink-0 mt-0.5">✓</span>
                  <span class="text-white">Dedicated VPC deployment (AWS / GCP / Azure)</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="w-4 h-4 rounded-full bg-[#161926] border border-[#1F2438] flex items-center justify-center text-[#38BDF8] text-[10px] shrink-0 mt-0.5">✓</span>
                  <span class="text-white">SAML SSO, SCIM & RBAC directory sync</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="w-4 h-4 rounded-full bg-[#161926] border border-[#1F2438] flex items-center justify-center text-[#38BDF8] text-[10px] shrink-0 mt-0.5">✓</span>
                  <span>99.999% SLA uptime contract</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="w-4 h-4 rounded-full bg-[#161926] border border-[#1F2438] flex items-center justify-center text-[#38BDF8] text-[10px] shrink-0 mt-0.5">✓</span>
                  <span>Custom PII redactions & HIPAA BAA</span>
                </li>
                <li class="flex items-start gap-2.5">
                  <span class="w-4 h-4 rounded-full bg-[#161926] border border-[#1F2438] flex items-center justify-center text-[#38BDF8] text-[10px] shrink-0 mt-0.5">✓</span>
                  <span>Dedicated Slack channel & solutions architect</span>
                </li>
              </ul>
            </div>

            <a href="/talk-to-sales" data-link class="w-full text-center py-3 bg-[#161926] hover:bg-[#1E2235] border border-[#1F2438] text-white font-semibold text-xs rounded-xl transition-all">
              Request Enterprise Quote
            </a>
          </div>

        </section>

        <!-- =========================================================
             3. INTERACTIVE TOKEN & CACHING COST CALCULATOR
        ========================================================= -->
        <section class="reveal-on-scroll rounded-2xl border border-[#1F2438] bg-[#10121A] p-6 lg:p-10 flex flex-col gap-8">
          <div class="flex flex-col gap-2 max-w-2xl">
            <span class="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">Live Cost Estimator</span>
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              See what semantic caching saves your team
            </h2>
            <p class="text-xs sm:text-sm text-[#8E98B0]">
              Drag the token volume slider to see the difference between raw provider API bills and UniLLM cache-optimized workloads.
            </p>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <!-- Sliders Column (Col 6) -->
            <div class="lg:col-span-6 flex flex-col gap-6 text-xs">
              <div class="flex flex-col gap-2">
                <div class="flex justify-between items-center">
                  <span class="text-[#8E98B0]">Monthly Token Volume:</span>
                  <span id="calc-tokens-label" class="font-mono font-bold text-white text-base">25 Million Tokens</span>
                </div>
                <input
                  type="range"
                  id="calc-token-slider"
                  min="2"
                  max="200"
                  step="2"
                  value="25"
                  class="w-full accent-[#38BDF8] cursor-pointer"
                />
                <div class="flex justify-between text-[10px] font-mono text-[#8E98B0]">
                  <span>2M</span>
                  <span>100M</span>
                  <span>200M+</span>
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <div class="flex justify-between items-center">
                  <span class="text-[#8E98B0]">Expected Cache Repeat Rate:</span>
                  <span id="calc-cache-label" class="font-mono font-bold text-[#38BDF8] text-base">35%</span>
                </div>
                <input
                  type="range"
                  id="calc-cache-slider"
                  min="5"
                  max="80"
                  step="5"
                  value="35"
                  class="w-full accent-[#38BDF8] cursor-pointer"
                />
                <div class="flex justify-between text-[10px] font-mono text-[#8E98B0]">
                  <span>5% (Dynamic queries)</span>
                  <span>80% (Support/Docs/Q&A)</span>
                </div>
              </div>
            </div>

            <!-- Cost Comparison Result Cards (Col 6) -->
            <div class="lg:col-span-6 grid grid-cols-2 gap-4 font-mono text-xs">
              <div class="p-5 rounded-xl bg-[#0A0C13] border border-[#1F2438] flex flex-col justify-between">
                <span class="text-[#8E98B0] text-[10px]">Direct Provider Cost</span>
                <div class="my-2">
                  <span id="calc-direct-cost" class="text-2xl sm:text-3xl font-bold text-white">$125.00</span>
                  <span class="text-[10px] text-[#8E98B0] block mt-0.5">un-cached bill</span>
                </div>
                <span class="text-[#8E98B0] text-[10px]">Zero Cache Protection</span>
              </div>

              <div class="p-5 rounded-xl bg-[#0A0C13] border border-[#38BDF8]/40 flex flex-col justify-between">
                <span class="text-[#38BDF8] text-[10px]">With UniLLM Edge</span>
                <div class="my-2">
                  <span id="calc-unillm-cost" class="text-2xl sm:text-3xl font-bold text-emerald-400">$81.25</span>
                  <span class="text-[10px] text-[#8E98B0] block mt-0.5">actual token spend</span>
                </div>
                <span class="text-emerald-400 text-[10px] font-bold">100% Free Cache Hits</span>
              </div>

              <div class="col-span-2 p-4 rounded-xl bg-[#161926] border border-[#1F2438] flex items-center justify-between">
                <div>
                  <div class="text-[10px] text-[#8E98B0]">Monthly Budget Kept In Your Pocket:</div>
                  <div id="calc-savings-label" class="text-lg font-bold text-emerald-400 mt-0.5">$43.75 saved / month</div>
                </div>
                <a href="/signup" data-link class="px-4 py-2 rounded-lg bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#07080B] font-bold text-xs transition-colors">
                  Claim Free Credits
                </a>
              </div>
            </div>

          </div>
        </section>

        <!-- =========================================================
             4. COMPREHENSIVE FEATURE COMPARISON TABLE
        ========================================================= -->
        <section class="reveal-on-scroll flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <span class="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">Detailed Feature Matrix</span>
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">Compare tier capabilities</h2>
          </div>

          <div class="rounded-2xl border border-[#1F2438] bg-[#10121A] overflow-hidden select-text text-xs">
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="border-b border-[#1F2438] bg-[#0A0C13] text-[#8E98B0] text-[10px] font-mono uppercase tracking-wider">
                    <th class="px-6 py-4">Capability</th>
                    <th class="px-6 py-4">Developer ($0)</th>
                    <th class="px-6 py-4 text-[#38BDF8]">Pay-As-You-Go</th>
                    <th class="px-6 py-4">Enterprise</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#1F2438]/70 text-[#8E98B0]">
                  <tr>
                    <td class="px-6 py-3.5 text-white font-medium">Virtual API Keys</td>
                    <td class="px-6 py-3.5">3 Keys</td>
                    <td class="px-6 py-3.5 text-white font-bold">Unlimited</td>
                    <td class="px-6 py-3.5 text-white font-bold">Unlimited + RBAC</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-3.5 text-white font-medium">Semantic Cache</td>
                    <td class="px-6 py-3.5">Community Tier</td>
                    <td class="px-6 py-3.5 text-emerald-400 font-bold">Sub-15ms In-Memory</td>
                    <td class="px-6 py-3.5 text-emerald-400 font-bold">Dedicated Multi-PoP</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-3.5 text-white font-medium">Model Failover Matrix</td>
                    <td class="px-6 py-3.5">Manual fallback</td>
                    <td class="px-6 py-3.5 text-white font-bold">Automated Circuit Breaker</td>
                    <td class="px-6 py-3.5 text-white font-bold">Automated + Geo-affinity</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-3.5 text-white font-medium">Data Privacy & Retention</td>
                    <td class="px-6 py-3.5">Standard ZDR</td>
                    <td class="px-6 py-3.5 text-white">Zero Data Retention (ZDR)</td>
                    <td class="px-6 py-3.5 text-[#38BDF8] font-bold">ZDR + Legal BAA Contract</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-3.5 text-white font-medium">VPC Peering & Isolation</td>
                    <td class="px-6 py-3.5">—</td>
                    <td class="px-6 py-3.5">—</td>
                    <td class="px-6 py-3.5 text-white font-bold">AWS / GCP / Azure VPC</td>
                  </tr>
                  <tr>
                    <td class="px-6 py-3.5 text-white font-medium">Support SLA</td>
                    <td class="px-6 py-3.5">Community</td>
                    <td class="px-6 py-3.5 text-white">Priority Email (24h)</td>
                    <td class="px-6 py-3.5 text-[#38BDF8] font-bold">15-Minute Critical SLA</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- =========================================================
             5. PRICING FAQ ACCORDION
        ========================================================= -->
        <section class="reveal-on-scroll flex flex-col gap-6 max-w-4xl mx-auto w-full">
          <div class="text-center">
            <span class="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">Pricing Transparency</span>
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">Frequently Asked Questions</h2>
          </div>

          <div class="flex flex-col gap-3 faq-accordion-group">
            
            <div class="faq-accordion-item rounded-xl border border-[#1F2438] bg-[#10121A] overflow-hidden">
              <button class="faq-accordion-trigger w-full px-6 py-4 text-left flex items-center justify-between text-white font-semibold text-sm hover:text-[#38BDF8] transition-colors">
                <span>How does Pay-As-You-Go credit deduction work?</span>
                <span class="faq-accordion-chevron text-[#8E98B0] transition-transform">▼</span>
              </button>
              <div class="faq-accordion-content px-6 pb-4 text-xs text-[#8E98B0] leading-relaxed max-h-0 opacity-0 overflow-hidden transition-all duration-200">
                You add prepaid credits to your account. When requests pass through the gateway, we deduct the exact token cost charged by the upstream provider (e.g. OpenAI, Anthropic, Google) at raw face value. UniLLM charges $0 platform fee on token usage.
              </div>
            </div>

            <div class="faq-accordion-item rounded-xl border border-[#1F2438] bg-[#10121A] overflow-hidden">
              <button class="faq-accordion-trigger w-full px-6 py-4 text-left flex items-center justify-between text-white font-semibold text-sm hover:text-[#38BDF8] transition-colors">
                <span>Do you charge extra for semantic cache hits?</span>
                <span class="faq-accordion-chevron text-[#8E98B0] transition-transform">▼</span>
              </button>
              <div class="faq-accordion-content px-6 pb-4 text-xs text-[#8E98B0] leading-relaxed max-h-0 opacity-0 overflow-hidden transition-all duration-200">
                No. Semantic cache hits cost $0. When an incoming prompt matches a cached embedding within your similarity threshold, UniLLM fulfills the response directly from memory in under 15ms with 100% savings.
              </div>
            </div>

            <div class="faq-accordion-item rounded-xl border border-[#1F2438] bg-[#10121A] overflow-hidden">
              <button class="faq-accordion-trigger w-full px-6 py-4 text-left flex items-center justify-between text-white font-semibold text-sm hover:text-[#38BDF8] transition-colors">
                <span>Can I bring my own cloud provider keys (BYOK)?</span>
                <span class="faq-accordion-chevron text-[#8E98B0] transition-transform">▼</span>
              </button>
              <div class="faq-accordion-content px-6 pb-4 text-xs text-[#8E98B0] leading-relaxed max-h-0 opacity-0 overflow-hidden transition-all duration-200">
                Yes. You can route via UniLLM managed pass-through credits or configure Bring-Your-Own-Key (BYOK) for specific providers in workspace settings, allowing you to leverage enterprise discount commitments with individual cloud vendors.
              </div>
            </div>

            <div class="faq-accordion-item rounded-xl border border-[#1F2438] bg-[#10121A] overflow-hidden">
              <button class="faq-accordion-trigger w-full px-6 py-4 text-left flex items-center justify-between text-white font-semibold text-sm hover:text-[#38BDF8] transition-colors">
                <span>Are unused prepaid credits refundable?</span>
                <span class="faq-accordion-chevron text-[#8E98B0] transition-transform">▼</span>
              </button>
              <div class="faq-accordion-content px-6 pb-4 text-xs text-[#8E98B0] leading-relaxed max-h-0 opacity-0 overflow-hidden transition-all duration-200">
                Yes. Any unused prepaid balance is fully refundable to your original payment method within 30 days of purchase. Simply reach out via your Billing dashboard.
              </div>
            </div>

          </div>
        </section>

        <!-- =========================================================
             6. BOTTOM CTA SECTION
        ========================================================= -->
        <section class="reveal-on-scroll rounded-2xl bg-gradient-to-b from-[#10121A] to-[#0A0C13] border border-[#1F2438] p-8 sm:p-12 text-center flex flex-col items-center gap-6">
          <div class="max-w-xl flex flex-col gap-2">
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Start building with $10 in free credits
            </h2>
            <p class="text-xs sm:text-sm text-[#8E98B0]">
              Get your API key in seconds and connect your application immediately.
            </p>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/signup"
              data-link
              class="px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-[#07080B] text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Get Started Free</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
            <a
              href="/talk-to-sales"
              data-link
              class="px-6 py-3 rounded-full bg-[#161926] hover:bg-[#1F2438] text-white border border-[#1F2438] text-xs font-semibold transition-all"
            >
              Talk to Enterprise Sales →
            </a>
          </div>
        </section>

      </div>
    </div>
  `;
}

export function bindPricing() {
  // 1. Billing Frequency Toggle
  const btnMonthly = document.getElementById("toggle-monthly");
  const btnAnnual = document.getElementById("toggle-annual");

  btnMonthly?.addEventListener("click", () => {
    btnMonthly.className = "px-5 py-2 rounded-full text-xs font-bold transition-all bg-[#161926] text-white border border-[#38BDF8]/40 shadow-sm";
    if (btnAnnual) btnAnnual.className = "px-5 py-2 rounded-full text-xs font-semibold text-[#8E98B0] hover:text-white transition-all flex items-center gap-1.5";
  });

  btnAnnual?.addEventListener("click", () => {
    if (btnMonthly) btnMonthly.className = "px-5 py-2 rounded-full text-xs font-semibold text-[#8E98B0] hover:text-white transition-all";
    btnAnnual.className = "px-5 py-2 rounded-full text-xs font-bold transition-all bg-[#161926] text-white border border-[#38BDF8]/40 shadow-sm flex items-center gap-1.5";
  });

  // 2. Token & Caching Calculator
  const tokenSlider = document.getElementById("calc-token-slider");
  const cacheSlider = document.getElementById("calc-cache-slider");
  const tokensLabel = document.getElementById("calc-tokens-label");
  const cacheLabel = document.getElementById("calc-cache-label");
  const directCostEl = document.getElementById("calc-direct-cost");
  const unillmCostEl = document.getElementById("calc-unillm-cost");
  const savingsLabel = document.getElementById("calc-savings-label");

  const updateCalculator = () => {
    const millionTokens = parseInt(tokenSlider?.value || "25", 10);
    const cachePercent = parseInt(cacheSlider?.value || "35", 10);

    if (tokensLabel) tokensLabel.innerText = `${millionTokens} Million Tokens`;
    if (cacheLabel) cacheLabel.innerText = `${cachePercent}%`;

    // Assuming average blended provider token cost is ~$5.00 per 1M tokens (blend of GPT-4o, Claude 3.5, and Llama 3)
    const directCost = millionTokens * 5.0;
    // Cache hits cost $0, saving (cachePercent%) of the bill
    const savings = directCost * (cachePercent / 100);
    const unillmCost = directCost - savings;

    if (directCostEl) directCostEl.innerText = `$${directCost.toFixed(2)}`;
    if (unillmCostEl) unillmCostEl.innerText = `$${unillmCost.toFixed(2)}`;
    if (savingsLabel) savingsLabel.innerText = `$${savings.toFixed(2)} saved / month`;
  };

  tokenSlider?.addEventListener("input", updateCalculator);
  cacheSlider?.addEventListener("input", updateCalculator);
}

export default {
  pricing,
  bindPricing
};
