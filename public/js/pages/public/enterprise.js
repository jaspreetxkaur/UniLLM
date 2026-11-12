// PUBLIC PAGE: enterprise (Obsidian Enterprise Architecture, Privacy & VPC)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";
import { icons } from "../../icons.js?v=2";

export function enterprise() {
  return `
    <div class="relative overflow-hidden w-full font-sans bg-[#08090B] text-[#F5F5F5]">
      
      <!-- Monochromatic ambient lighting -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-white/[0.04] to-transparent blur-[120px] pointer-events-none -z-10"></div>

      <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24 flex flex-col gap-24">
        
        <!-- =========================================================
             1. EDITORIAL HERO WITH ZERO-DATA RETENTION TOPOLOGY
        ========================================================= -->
        <section class="flex flex-col lg:flex-row items-center justify-between gap-12 pb-16 border-b border-[#292D34]">
          <div class="flex-1 flex flex-col gap-6 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#101216] border border-[#292D34] text-[11px] font-mono tracking-wider text-[#A1A5AD] uppercase self-start">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Enterprise Infrastructure</span>
              <span class="text-white/20">•</span>
              <span class="text-white">Zero Data Retention</span>
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-tight text-white leading-[1.08]">
              Private. Resilient.<br />
              Zero data retention.
            </h1>

            <p class="text-base text-[#A1A5AD] leading-relaxed">
              Deploy UniLLM inside your private cloud perimeter (AWS, Azure, GCP). Enforce departmental token budgets, redact sensitive PII on the fly, and achieve 99.999% uptime with dedicated engineering support.
            </p>

            <div class="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/talk-to-sales"
                data-link
                class="px-6 py-3 rounded-lg bg-white hover:bg-neutral-200 text-black text-xs font-semibold transition-all shadow-sm inline-flex items-center gap-2"
              >
                <span>Talk to Enterprise Sales</span>
                <span class="font-bold">→</span>
              </a>
              <a
                href="/book-demo"
                data-link
                class="px-6 py-3 rounded-lg bg-[#101216] hover:bg-[#15181D] text-[#F5F5F5] border border-[#292D34] text-xs font-semibold transition-all inline-flex items-center gap-2"
              >
                <span>Schedule Architecture Demo</span>
              </a>
            </div>

            <div class="grid grid-cols-3 gap-4 pt-6 border-t border-[#292D34] text-xs">
              <div>
                <div class="font-mono text-lg font-bold text-emerald-400">SOC2 Type II</div>
                <div class="text-[11px] text-[#A1A5AD] mt-0.5">Annual External Audits</div>
              </div>
              <div>
                <div class="font-mono text-lg font-bold text-white">HIPAA BAA</div>
                <div class="text-[11px] text-[#A1A5AD] mt-0.5">Executed Contracts</div>
              </div>
              <div>
                <div class="font-mono text-lg font-bold text-white">0-Day</div>
                <div class="text-[11px] text-[#A1A5AD] mt-0.5">ZDR Ephemeral Routing</div>
              </div>
            </div>
          </div>

          <!-- Hero Right: Zero Data Retention Live Visual Architecture -->
          <div class="flex-1 w-full max-w-lg lg:max-w-none rounded-xl border border-[#292D34] bg-[#101216] p-6 shadow-2xl relative overflow-hidden font-mono text-xs">
            <div class="flex items-center justify-between pb-3 mb-4 border-b border-[#292D34] text-[11px] text-[#A1A5AD]">
              <span class="text-white font-semibold">Zero-Data Retention Perimeter</span>
              <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px]">VERIFIED ZDR</span>
            </div>

            <div class="space-y-3">
              <!-- Node 1: Inbound VPC Request -->
              <div class="p-3.5 rounded-lg bg-[#08090B] border border-[#292D34] flex items-center justify-between">
                <div>
                  <div class="text-white font-medium">1. Enterprise Client VPC</div>
                  <div class="text-[10px] text-[#A1A5AD] mt-0.5">TLS 1.3 • AES-256 GCM In-Flight</div>
                </div>
                <span class="text-white text-[11px]">PrivateLink</span>
              </div>

              <!-- Connecting Arrow -->
              <div class="flex justify-center text-[#A1A5AD]">↓</div>

              <!-- Node 2: UniLLM Memory-Only Proxy -->
              <div class="p-3.5 rounded-lg bg-[#15181D] border border-white/20 flex items-center justify-between">
                <div>
                  <div class="text-white font-semibold">2. UniLLM Ephemeral Gateway</div>
                  <div class="text-[10px] text-emerald-400 mt-0.5">Zero Disk I/O • In-Memory Redaction</div>
                </div>
                <span class="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] border border-emerald-500/20">NO DISK WRITES</span>
              </div>

              <!-- Connecting Arrow -->
              <div class="flex justify-center text-[#A1A5AD]">↓</div>

              <!-- Node 3: Model Provider Boundary -->
              <div class="p-3.5 rounded-lg bg-[#08090B] border border-[#292D34] flex items-center justify-between">
                <div>
                  <div class="text-white font-medium">3. Upstream Provider Pool</div>
                  <div class="text-[10px] text-[#A1A5AD] mt-0.5">OpenAI / Claude / Vertex AI / Bedrock</div>
                </div>
                <span class="text-[#A1A5AD] text-[11px]">Direct Handshake</span>
              </div>
            </div>

            <div class="mt-4 pt-3 border-t border-[#292D34] text-[10px] text-[#A1A5AD] flex items-center justify-between">
              <span>Payload evicted on socket close</span>
              <span class="text-emerald-400 font-bold">100% Ephemeral</span>
            </div>
          </div>
        </section>

        <!-- =========================================================
             2. INTERACTIVE DEPLOYMENT TOPOLOGY SELECTOR
        ========================================================= -->
        <section class="flex flex-col gap-10">
          <div class="flex flex-col gap-3 text-center max-w-2xl mx-auto">
            <span class="text-xs font-mono font-bold text-[#A1A5AD] uppercase tracking-wider">Deployment Topologies</span>
            <h2 class="text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Deploy where your data already lives
            </h2>
            <p class="text-sm text-[#A1A5AD]">
              Choose the exact architecture suited to your corporate security, compliance, and governance requirements.
            </p>
          </div>

          <!-- Deployment Model Tabs -->
          <div class="flex flex-wrap items-center justify-center gap-2 max-w-2xl mx-auto w-full" id="deploy-tabs">
            <button data-deploy="vpc" class="deploy-tab-btn px-4 py-2 rounded-lg text-xs font-semibold transition-all bg-[#15181D] text-white border border-white">
              1. Dedicated VPC Peering
            </button>
            <button data-deploy="cloud" class="deploy-tab-btn px-4 py-2 rounded-lg text-xs font-semibold transition-all text-[#A1A5AD] hover:text-white hover:bg-[#101216] border border-transparent">
              2. Managed Anycast Cloud
            </button>
            <button data-deploy="onprem" class="deploy-tab-btn px-4 py-2 rounded-lg text-xs font-semibold transition-all text-[#A1A5AD] hover:text-white hover:bg-[#101216] border border-transparent">
              3. Self-Hosted Kubernetes
            </button>
          </div>

          <!-- Dynamic Deployment Details Box -->
          <div class="rounded-xl border border-[#292D34] bg-[#101216] p-6 lg:p-10 shadow-2xl" id="deploy-content-panel">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div class="lg:col-span-6 flex flex-col gap-6">
                <div>
                  <div class="flex items-center gap-2 mb-2">
                    <span id="deploy-badge" class="px-2.5 py-0.5 rounded-md text-[10px] font-mono font-bold bg-white/5 text-white border border-[#292D34]">
                      TOPOLOGY #1
                    </span>
                    <span id="deploy-subtitle" class="text-[11px] font-mono text-[#A1A5AD]">AWS PrivateLink • Azure ExpressRoute</span>
                  </div>
                  <h3 id="deploy-title" class="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    Dedicated VPC Gateway Peering
                  </h3>
                </div>

                <p id="deploy-desc" class="text-xs sm:text-sm text-[#A1A5AD] leading-relaxed">
                  UniLLM instances run inside an isolated single-tenant VPC cluster peered directly into your corporate network. Traffic never traverses the public internet, satisfying strict financial and government security policies.
                </p>

                <div class="grid grid-cols-2 gap-3 text-xs font-mono" id="deploy-specs">
                  <div class="p-3 rounded-lg bg-[#08090B] border border-[#292D34]">
                    <div class="text-[#A1A5AD] text-[10px]">Network Perimeter</div>
                    <div class="text-white font-bold mt-0.5">Isolated Single-Tenant</div>
                  </div>
                  <div class="p-3 rounded-lg bg-[#08090B] border border-[#292D34]">
                    <div class="text-[#A1A5AD] text-[10px]">Public Ingress</div>
                    <div class="text-emerald-400 font-bold mt-0.5">Disabled (0 Public IPs)</div>
                  </div>
                  <div class="p-3 rounded-lg bg-[#08090B] border border-[#292D34]">
                    <div class="text-[#A1A5AD] text-[10px]">Cloud Providers</div>
                    <div class="text-white font-bold mt-0.5">AWS, GCP, Azure</div>
                  </div>
                  <div class="p-3 rounded-lg bg-[#08090B] border border-[#292D34]">
                    <div class="text-[#A1A5AD] text-[10px]">SLA Availability</div>
                    <div class="text-white font-bold mt-0.5">99.999% Guaranteed</div>
                  </div>
                </div>

                <div class="pt-2">
                  <a href="/talk-to-sales" data-link class="px-4 py-2 rounded-lg bg-[#15181D] hover:bg-[#101216] text-white border border-[#292D34] text-xs font-semibold inline-flex items-center gap-2">
                    <span>Discuss VPC Architecture</span>
                    <span>→</span>
                  </a>
                </div>
              </div>

              <!-- Visual Representation -->
              <div class="lg:col-span-6 rounded-lg bg-[#08090B] border border-[#292D34] p-6 flex flex-col gap-4 font-mono text-xs">
                <div class="flex items-center justify-between pb-3 border-b border-[#292D34] text-[11px] text-[#A1A5AD]">
                  <span>VPC Topology Architecture</span>
                  <span class="text-emerald-400">Zero Internet Exposure</span>
                </div>

                <div class="p-4 rounded-lg border border-dashed border-[#292D34] bg-[#101216] flex flex-col gap-3">
                  <div class="flex items-center justify-between text-[11px]">
                    <span class="text-white font-semibold">🔒 Private Network Perimeter</span>
                    <span class="text-[#A1A5AD]">CIDR 10.0.0.0/16</span>
                  </div>

                  <div class="p-3 rounded-lg bg-[#08090B] border border-[#292D34] flex items-center justify-between">
                    <div>
                      <div class="text-white font-medium">Internal Workloads</div>
                      <div class="text-[10px] text-[#A1A5AD] mt-0.5">Backend APIs, Data Pipelines, RAG</div>
                    </div>
                    <span class="text-emerald-400 text-[10px]">Private Subnet</span>
                  </div>

                  <div class="p-3 rounded-lg bg-[#15181D] border border-white/20 flex items-center justify-between">
                    <div>
                      <div class="text-white font-semibold">UniLLM Dedicated VPC Enclave</div>
                      <div class="text-[10px] text-[#A1A5AD] mt-0.5">Ingress via PrivateLink</div>
                    </div>
                    <span class="text-white text-[10px] font-bold">Sub-2ms Link</span>
                  </div>
                </div>

                <div class="text-[10px] text-[#A1A5AD] flex items-center justify-between pt-1">
                  <span>Direct AWS / GCP Private Service Connect</span>
                  <span class="text-white">SOC2 Assured</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        <!-- =========================================================
             3. SLA & SUPPORT COMMITMENTS (3-COLUMN MATRIX)
        ========================================================= -->
        <section class="flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <span class="text-xs font-mono font-bold text-[#A1A5AD] uppercase tracking-wider">Service Level Commitments</span>
            <h2 class="text-3xl font-bold tracking-tight text-white">
              Guaranteed availability backed by financial SLAs
            </h2>
            <p class="text-xs sm:text-sm text-[#A1A5AD]">
              Every tier provides clear response times, designated engineering contacts, and uptime credits.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans">
            
            <div class="p-7 bg-[#101216] border border-[#292D34] rounded-xl flex flex-col justify-between gap-6 hover:border-white/20 transition-all">
              <div class="flex flex-col gap-3">
                <span class="text-xs font-mono font-semibold text-[#A1A5AD] uppercase">Standard Cloud</span>
                <span class="text-3xl font-bold text-white">99.9%</span>
                <p class="text-xs text-[#A1A5AD] leading-relaxed">Multi-tenant global edge Anycast mesh with community and email support.</p>
                <div class="border-t border-[#292D34] pt-3 text-xs text-[#A1A5AD] space-y-2">
                  <div class="text-white">• Shared Edge Proxy Network</div>
                  <div>• 24-hour support response SLA</div>
                  <div>• Standard public edge PoPs</div>
                  <div>• Webhook alert notifications</div>
                </div>
              </div>
            </div>

            <!-- Most Adopted Centerpiece -->
            <div class="p-7 bg-[#15181D] border-2 border-white rounded-xl flex flex-col justify-between gap-6 relative shadow-lg">
              <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-white text-black text-[10px] font-mono font-bold uppercase tracking-wider px-3.5 py-0.5 rounded-full">
                RECOMMENDED
              </span>
              <div class="flex flex-col gap-3">
                <span class="text-xs font-mono font-semibold text-white uppercase">Dedicated Enterprise</span>
                <span class="text-3xl font-bold text-white">99.99%</span>
                <p class="text-xs text-[#A1A5AD] leading-relaxed">Dedicated proxy clusters, custom VPC peering, and 1-hour critical response SLA.</p>
                <div class="border-t border-[#292D34] pt-3 text-xs text-white space-y-2">
                  <div class="font-semibold">• Isolated Single-Tenant Compute</div>
                  <div>• Okta / Entra SAML SSO + SCIM Sync</div>
                  <div>• Dedicated shared Slack/Teams channel</div>
                  <div>• 1-hour critical ticket response</div>
                </div>
              </div>
            </div>

            <div class="p-7 bg-[#101216] border border-[#292D34] rounded-xl flex flex-col justify-between gap-6 hover:border-white/20 transition-all">
              <div class="flex flex-col gap-3">
                <span class="text-xs font-mono font-semibold text-[#A1A5AD] uppercase">Custom On-Prem / Enclave</span>
                <span class="text-3xl font-bold text-white">99.999%</span>
                <p class="text-xs text-[#A1A5AD] leading-relaxed">Air-gapped deployment inside your Kubernetes cluster with 24/7 designated architect.</p>
                <div class="border-t border-[#292D34] pt-3 text-xs text-[#A1A5AD] space-y-2">
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
        <section class="rounded-xl bg-[#101216] border border-[#292D34] p-8 sm:p-12 text-center flex flex-col items-center gap-6">
          <div class="max-w-xl flex flex-col gap-2">
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Need custom MSA terms or security review?
            </h2>
            <p class="text-xs sm:text-sm text-[#A1A5AD]">
              Our solutions team assists with security questionnaires, vendor onboarding, and volume purchase orders.
            </p>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/talk-to-sales"
              data-link
              class="px-6 py-3 rounded-lg bg-white hover:bg-neutral-200 text-black text-xs font-semibold transition-all shadow-sm inline-flex items-center gap-2"
            >
              <span>Speak with Solutions Architect</span>
              <span class="font-bold">→</span>
            </a>
            <a
              href="/security"
              data-link
              class="px-6 py-3 rounded-lg bg-[#15181D] hover:bg-[#101216] text-[#F5F5F5] border border-[#292D34] text-xs font-semibold transition-all"
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
        { label: "Cloud Providers", val: "AWS, GCP, Azure", col: "text-white" },
        { label: "SLA Availability", val: "99.999% Guaranteed", col: "text-white" }
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
        { label: "Proxy Latency", val: "< 14.2ms Overhead", col: "text-white" },
        { label: "Downtime Shield", val: "Automatic Circuit Break", col: "text-white" }
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
        { label: "Data Residency", val: "Local Compute Only", col: "text-white" },
        { label: "Support", val: "24/7 Designated Eng", col: "text-white" }
      ]
    }
  };

  deployTabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const mode = btn.dataset.deploy;
      if (!mode || !deployData[mode]) return;

      deployTabs.forEach(b => {
        b.className = "deploy-tab-btn px-4 py-2 rounded-lg text-xs font-semibold transition-all text-[#A1A5AD] hover:text-white hover:bg-[#101216] border border-transparent";
      });
      btn.className = "deploy-tab-btn px-4 py-2 rounded-lg text-xs font-semibold transition-all bg-[#15181D] text-white border border-white";

      const d = deployData[mode];
      if (badgeEl) badgeEl.innerText = d.badge;
      if (subtitleEl) subtitleEl.innerText = d.subtitle;
      if (titleEl) titleEl.innerText = d.title;
      if (descEl) descEl.innerText = d.desc;

      if (specsEl) {
        specsEl.innerHTML = d.specs.map(s => `
          <div class="p-3 rounded-lg bg-[#08090B] border border-[#292D34]">
            <div class="text-[#A1A5AD] text-[10px]">${s.label}</div>
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
