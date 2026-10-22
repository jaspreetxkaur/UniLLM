// PUBLIC PAGE: enterprise (Enterprise Architecture, Privacy & VPC Deployments)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";
import { icons } from "../../icons.js?v=2";

export function enterprise() {
  return `
    <div class="relative overflow-hidden w-full font-sans bg-[#07080B] text-white">
      <!-- Ambient Lighting -->
      <div class="absolute top-[3%] right-[10%] w-[600px] h-[600px] rounded-full blur-[180px] bg-[#38BDF8]/5 pointer-events-none -z-10"></div>
      <div class="absolute top-[45%] left-[5%] w-[650px] h-[650px] rounded-full blur-[190px] bg-indigo-500/5 pointer-events-none -z-10"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col gap-24">
        
        <!-- =========================================================
             1. EDITORIAL HERO WITH ZERO-DATA RETENTION TOPOLOGY
        ========================================================= -->
        <section class="flex flex-col lg:flex-row items-center justify-between gap-12 pt-6 pb-12 border-b border-[#1F2438]">
          <div class="flex-1 flex flex-col gap-6 max-w-2xl animate-fade-in-up">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161926] border border-[#1F2438] text-[#38BDF8] text-[11px] font-mono font-bold tracking-wider self-start">
              <span class="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse"></span>
              MISSION-CRITICAL AI INFRASTRUCTURE
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Private. Resilient. <br/>
              <span class="text-[#38BDF8]">Zero-data retention</span>.
            </h1>

            <p class="text-sm sm:text-base text-[#8E98B0] leading-relaxed">
              Deploy UniLLM inside your private cloud perimeter (AWS, Azure, GCP). Enforce departmental token budgets, redact sensitive PII on the fly, and achieve 99.999% uptime with dedicated engineering support.
            </p>

            <div class="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/talk-to-sales"
                data-link
                class="px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-[#07080B] text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>Talk to Enterprise Sales</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
              <a
                href="/book-demo"
                data-link
                class="px-6 py-3 rounded-full bg-[#161926] hover:bg-[#1F2438] text-white border border-[#1F2438] hover:border-[#38BDF8]/40 text-xs font-semibold transition-all inline-flex items-center gap-2"
              >
                <span>Schedule Private Demo</span>
                <svg class="w-3.5 h-3.5 text-[#8E98B0]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
              </a>
            </div>

            <div class="grid grid-cols-3 gap-4 pt-6 border-t border-[#1F2438]/70 text-xs">
              <div>
                <div class="font-mono text-lg font-bold text-emerald-400">SOC2 Type II</div>
                <div class="text-[11px] text-[#8E98B0]">Certified Audits</div>
              </div>
              <div>
                <div class="font-mono text-lg font-bold text-white">HIPAA BAA</div>
                <div class="text-[11px] text-[#8E98B0]">Provided Legally</div>
              </div>
              <div>
                <div class="font-mono text-lg font-bold text-[#38BDF8]">0-Day</div>
                <div class="text-[11px] text-[#8E98B0]">ZDR Memory Policy</div>
              </div>
            </div>
          </div>

          <!-- Hero Right: Zero Data Retention Live Visual Architecture -->
          <div class="flex-1 w-full max-w-lg lg:max-w-none rounded-2xl border border-[#1F2438] bg-[#10121A] p-6 shadow-2xl relative overflow-hidden font-mono text-xs">
            <div class="flex items-center justify-between pb-3 mb-4 border-b border-[#1F2438] text-[11px] text-[#8E98B0]">
              <span class="text-white font-bold">Zero-Data Retention Perimeter</span>
              <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">VERIFIED ZDR</span>
            </div>

            <div class="space-y-4">
              <!-- Node 1: Inbound VPC Request -->
              <div class="p-3.5 rounded-xl bg-[#0A0C13] border border-[#1F2438] flex items-center justify-between">
                <div>
                  <div class="text-white font-bold">1. Enterprise Client VPC</div>
                  <div class="text-[10px] text-[#8E98B0]">TLS 1.3 • AES-256 GCM In-Flight</div>
                </div>
                <span class="text-[#38BDF8] text-[11px]">PrivateLink</span>
              </div>

              <!-- Connecting Arrow with Beam Pulse -->
              <div class="flex justify-center">
                <svg class="w-4 h-5 text-[#38BDF8]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
              </div>

              <!-- Node 2: UniLLM Memory-Only Proxy -->
              <div class="p-3.5 rounded-xl bg-[#161926] border border-[#38BDF8]/40 flex items-center justify-between">
                <div>
                  <div class="text-white font-bold">2. UniLLM Memory Gateway</div>
                  <div class="text-[10px] text-emerald-400">Zero Disk I/O • In-Memory Redaction</div>
                </div>
                <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px]">NO DISK WRITES</span>
              </div>

              <!-- Connecting Arrow with Beam Pulse -->
              <div class="flex justify-center">
                <svg class="w-4 h-5 text-[#38BDF8]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path></svg>
              </div>

              <!-- Node 3: Model Provider Boundary -->
              <div class="p-3.5 rounded-xl bg-[#0A0C13] border border-[#1F2438] flex items-center justify-between">
                <div>
                  <div class="text-white font-bold">3. Upstream Provider</div>
                  <div class="text-[10px] text-[#8E98B0]">OpenAI / Claude / Vertex AI / Bedrock</div>
                </div>
                <span class="text-purple-400 text-[11px]">Direct Handshake</span>
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-[#1F2438] text-[10px] text-[#8E98B0] flex items-center justify-between">
              <span>Payload automatically evicted on socket close</span>
              <span class="text-emerald-400 font-bold">100% Ephemeral</span>
            </div>
          </div>
        </section>

        <!-- =========================================================
             2. INTERACTIVE DEPLOYMENT TOPOLOGY SELECTOR
        ========================================================= -->
        <section class="reveal-on-scroll flex flex-col gap-10">
          <div class="flex flex-col gap-3 text-center max-w-2xl mx-auto">
            <span class="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">Flexible Deployment Models</span>
            <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Deploy where your data already lives
            </h2>
            <p class="text-xs sm:text-sm text-[#8E98B0] leading-relaxed">
              Choose the exact architecture suited to your corporate security, compliance, and governance requirements.
            </p>
          </div>

          <!-- Deployment Model Tabs -->
          <div class="flex flex-wrap items-center justify-center gap-2 p-1.5 rounded-2xl bg-[#10121A] border border-[#1F2438] max-w-2xl mx-auto w-full" id="deploy-tabs">
            <button data-deploy="vpc" class="deploy-tab-btn px-5 py-2.5 rounded-xl text-xs font-bold transition-all bg-[#161926] text-white border border-[#38BDF8]">
              1. Dedicated VPC Peering
            </button>
            <button data-deploy="cloud" class="deploy-tab-btn px-5 py-2.5 rounded-xl text-xs font-bold transition-all text-[#8E98B0] hover:text-white hover:bg-[#161926]">
              2. Managed Anycast Cloud
            </button>
            <button data-deploy="onprem" class="deploy-tab-btn px-5 py-2.5 rounded-xl text-xs font-bold transition-all text-[#8E98B0] hover:text-white hover:bg-[#161926]">
              3. Self-Hosted Kubernetes
            </button>
          </div>

          <!-- Dynamic Deployment Details Box -->
          <div class="rounded-2xl border border-[#1F2438] bg-[#10121A] p-6 lg:p-10 shadow-2xl" id="deploy-content-panel">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div class="lg:col-span-6 flex flex-col gap-6">
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <span id="deploy-badge" class="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20">
                      TOPOLOGY #1
                    </span>
                    <span id="deploy-subtitle" class="text-[11px] font-mono text-[#8E98B0]">AWS PrivateLink • Azure ExpressRoute</span>
                  </div>
                  <h3 id="deploy-title" class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Dedicated VPC Gateway Peering
                  </h3>
                </div>

                <p id="deploy-desc" class="text-xs sm:text-sm text-[#8E98B0] leading-relaxed">
                  UniLLM instances run inside an isolated single-tenant VPC cluster peered directly into your corporate network. Traffic never traverses the public internet, satisfying strict financial and government security policies.
                </p>

                <div class="grid grid-cols-2 gap-3 text-xs font-mono" id="deploy-specs">
                  <div class="p-3 rounded-xl bg-[#0A0C13] border border-[#1F2438]">
                    <div class="text-[#8E98B0] text-[10px]">Network Perimeter</div>
                    <div class="text-white font-bold mt-0.5">Isolated Single-Tenant</div>
                  </div>
                  <div class="p-3 rounded-xl bg-[#0A0C13] border border-[#1F2438]">
                    <div class="text-[#8E98B0] text-[10px]">Public Ingress</div>
                    <div class="text-emerald-400 font-bold mt-0.5">Disabled (0 Public IPs)</div>
                  </div>
                  <div class="p-3 rounded-xl bg-[#0A0C13] border border-[#1F2438]">
                    <div class="text-[#8E98B0] text-[10px]">Cloud Providers</div>
                    <div class="text-[#38BDF8] font-bold mt-0.5">AWS, GCP, Azure</div>
                  </div>
                  <div class="p-3 rounded-xl bg-[#0A0C13] border border-[#1F2438]">
                    <div class="text-[#8E98B0] text-[10px]">SLA Availability</div>
                    <div class="text-purple-400 font-bold mt-0.5">99.999% Guaranteed</div>
                  </div>
                </div>

                <div class="pt-2">
                  <a href="/talk-to-sales" data-link class="px-5 py-2.5 rounded-full bg-[#161926] hover:bg-[#1F2438] text-white border border-[#1F2438] text-xs font-semibold inline-flex items-center gap-2">
                    <span>Discuss VPC Deployment Architecture</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>

              <!-- Visual Representation -->
              <div class="lg:col-span-6 rounded-xl bg-[#0A0C13] border border-[#1F2438] p-6 flex flex-col gap-4 font-mono text-xs">
                <div class="flex items-center justify-between pb-3 border-b border-[#1F2438] text-[11px] text-[#8E98B0]">
                  <span>VPC Topology Architecture</span>
                  <span class="text-emerald-400">Zero Internet Exposure</span>
                </div>

                <div class="p-4 rounded-xl border border-dashed border-[#38BDF8]/40 bg-[#10121A]/80 flex flex-col gap-3">
                  <div class="flex items-center justify-between text-[11px]">
                    <span class="text-[#38BDF8] font-bold">🔒 Customer Private Network Boundary</span>
                    <span class="text-[#8E98B0]">CIDR 10.0.0.0/16</span>
                  </div>

                  <div class="p-3 rounded-lg bg-[#07080B] border border-[#1F2438] flex items-center justify-between">
                    <div>
                      <div class="text-white font-bold">Internal Microservices</div>
                      <div class="text-[10px] text-[#8E98B0]">Backend APIs, Data Pipelines, RAG Workers</div>
                    </div>
                    <span class="text-emerald-400 text-[10px]">Private Subnet</span>
                  </div>

                  <div class="p-3 rounded-lg bg-[#161926] border border-[#38BDF8]/50 flex items-center justify-between">
                    <div>
                      <div class="text-white font-bold">UniLLM Dedicated VPC Enclave</div>
                      <div class="text-[10px] text-[#38BDF8]">Load Balanced Ingress via PrivateLink</div>
                    </div>
                    <span class="text-white text-[10px] font-bold">Sub-2ms Link</span>
                  </div>
                </div>

                <div class="text-[10px] text-[#8E98B0] flex items-center justify-between pt-1">
                  <span>Direct AWS / GCP Private Service Connect</span>
                  <span class="text-[#38BDF8]">SOC2 Type II Assured</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- =========================================================
             3. SLA & SUPPORT COMMITMENTS (3-COLUMN MATRIX)
        ========================================================= -->
        <section class="reveal-on-scroll flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <span class="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">Service Level Commitments</span>
            <h2 class="text-3xl font-bold tracking-tight text-white">
              Guaranteed availability backed by financial SLAs
            </h2>
            <p class="text-xs sm:text-sm text-[#8E98B0]">
              Every tier provides clear response times, designated engineering contacts, and uptime credits.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            
            <div class="p-7 bg-[#10121A] border border-[#1F2438] rounded-2xl flex flex-col justify-between gap-6 hover:border-[#38BDF8]/40 transition-all">
              <div class="flex flex-col gap-3">
                <span class="text-xs font-mono font-bold text-[#8E98B0] uppercase">Standard Cloud</span>
                <span class="text-3xl font-bold text-white">99.9%</span>
                <p class="text-xs text-[#8E98B0] leading-relaxed">Multi-tenant global edge Anycast mesh with community and email support.</p>
                <div class="border-t border-[#1F2438] pt-3 text-xs text-[#8E98B0] space-y-2">
                  <div class="text-white">• Shared Edge Proxy Network</div>
                  <div>• 24-hour support response SLA</div>
                  <div>• Standard public edge PoPs</div>
                  <div>• Webhook alert notifications</div>
                </div>
              </div>
            </div>

            <div class="p-7 bg-[#121522] border-2 border-[#38BDF8] rounded-2xl flex flex-col justify-between gap-6 shadow-[0_0_30px_rgba(56,189,248,0.1)] relative">
              <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#38BDF8] text-[#07080B] text-[10px] font-mono font-bold uppercase tracking-wider px-3.5 py-0.5 rounded-full">
                MOST ADOPTED
              </span>
              <div class="flex flex-col gap-3">
                <span class="text-xs font-mono font-bold text-[#38BDF8] uppercase">Dedicated Enterprise</span>
                <span class="text-3xl font-bold text-white">99.99%</span>
                <p class="text-xs text-[#8E98B0] leading-relaxed">Dedicated proxy clusters, custom VPC peering, and 1-hour critical response SLA.</p>
                <div class="border-t border-[#1F2438] pt-3 text-xs text-white space-y-2">
                  <div class="font-bold">• Isolated Single-Tenant Compute</div>
                  <div>• Okta / Entra SAML SSO + SCIM Sync</div>
                  <div>• Dedicated shared Slack/Teams channel</div>
                  <div>• 1-hour critical ticket response</div>
                </div>
              </div>
            </div>

            <div class="p-7 bg-[#10121A] border border-[#1F2438] rounded-2xl flex flex-col justify-between gap-6 hover:border-[#38BDF8]/40 transition-all">
              <div class="flex flex-col gap-3">
                <span class="text-xs font-mono font-bold text-[#8E98B0] uppercase">Custom On-Prem / Enclave</span>
                <span class="text-3xl font-bold text-white">99.999%</span>
                <p class="text-xs text-[#8E98B0] leading-relaxed">Air-gapped deployment inside your Kubernetes cluster with 24/7 designated architect.</p>
                <div class="border-t border-[#1F2438] pt-3 text-xs text-[#8E98B0] space-y-2">
                  <div class="text-white">• Self-hosted Helm/Docker deployment</div>
                  <div>• 15-minute response SLA</div>
                  <div>• Custom legal security & BAA contracts</div>
                  <div>• Named designated Solutions Architect</div>
                </div>
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
              Need custom MSA terms or security review?
            </h2>
            <p class="text-xs sm:text-sm text-[#8E98B0]">
              Our solutions team assists with security questionnaires, vendor onboarding, and volume purchase orders.
            </p>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/talk-to-sales"
              data-link
              class="px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-[#07080B] text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Speak with Solutions Architect</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
            <a
              href="/security"
              data-link
              class="px-6 py-3 rounded-full bg-[#161926] hover:bg-[#1F2438] text-white border border-[#1F2438] text-xs font-semibold transition-all"
            >
              Review Security Architecture →
            </a>
          </div>
        </section>

      </div>
    </div>
  `;
}

export function bindEnterprise() {
  const deployTabs = document.querySelectorAll(".deploy-tab-btn");
  const badgeEl = document.getElementById("deploy-badge");
  const subtitleEl = document.getElementById("deploy-subtitle");
  const titleEl = document.getElementById("deploy-title");
  const descEl = document.getElementById("deploy-desc");
  const specsEl = document.getElementById("deploy-specs");

  const deployData = {
    vpc: {
      badge: "TOPOLOGY #1",
      subtitle: "AWS PrivateLink • Azure ExpressRoute",
      title: "Dedicated VPC Gateway Peering",
      desc: "UniLLM instances run inside an isolated single-tenant VPC cluster peered directly into your corporate network. Traffic never traverses the public internet, satisfying strict financial and government security policies.",
      specs: [
        { label: "Network Perimeter", val: "Isolated Single-Tenant", col: "text-white" },
        { label: "Public Ingress", val: "Disabled (0 Public IPs)", col: "text-emerald-400" },
        { label: "Cloud Providers", val: "AWS, GCP, Azure", col: "text-[#38BDF8]" },
        { label: "SLA Availability", val: "99.999% Guaranteed", col: "text-purple-400" }
      ]
    },
    cloud: {
      badge: "TOPOLOGY #2",
      subtitle: "36 Global PoPs • Anycast Edge BGP",
      title: "Managed Multi-Region Anycast Mesh",
      desc: "Zero-infrastructure deployment. Leverage UniLLM's globally distributed edge proxy network for sub-2ms proxy latency with automated multi-cloud upstream failover and in-memory semantic caching.",
      specs: [
        { label: "Network Perimeter", val: "Multi-Region Anycast", col: "text-white" },
        { label: "Edge PoPs", val: "36 Global Locations", col: "text-emerald-400" },
        { label: "Proxy Latency", val: "< 1.8ms Average", col: "text-[#38BDF8]" },
        { label: "Downtime Shield", val: "Automatic Circuit Break", col: "text-amber-400" }
      ]
    },
    onprem: {
      badge: "TOPOLOGY #3",
      subtitle: "Air-Gapped Kubernetes • Helm Charts",
      title: "Self-Hosted On-Premises Cluster",
      desc: "Run UniLLM completely air-gapped within your self-hosted Kubernetes or OpenShift cluster. Keep zero external network dependencies and enforce complete sovereign data residency.",
      specs: [
        { label: "Deployment", val: "Kubernetes / Helm", col: "text-white" },
        { label: "External Telemetry", val: "100% Air-Gapped", col: "text-emerald-400" },
        { label: "Data Residency", val: "Local Storage Only", col: "text-[#38BDF8]" },
        { label: "Support", val: "24/7 Designated Eng", col: "text-purple-400" }
      ]
    }
  };

  deployTabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.deploy;
      if (!mode || !deployData[mode]) return;

      deployTabs.forEach(b => {
        b.className = "deploy-tab-btn px-5 py-2.5 rounded-xl text-xs font-bold transition-all text-[#8E98B0] hover:text-white hover:bg-[#161926]";
      });
      btn.className = "deploy-tab-btn px-5 py-2.5 rounded-xl text-xs font-bold transition-all bg-[#161926] text-white border border-[#38BDF8]";

      const d = deployData[mode];
      if (badgeEl) badgeEl.innerText = d.badge;
      if (subtitleEl) subtitleEl.innerText = d.subtitle;
      if (titleEl) titleEl.innerText = d.title;
      if (descEl) descEl.innerText = d.desc;

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
}

export default {
  enterprise,
  bindEnterprise
};
