// PUBLIC PAGE: changelog (Obsidian Release History & Technical Milestones)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function changelog() {
  const releases = [
    {
      version: "v2.4.0",
      date: "August 20, 2026",
      tag: "LATEST",
      title: "Semantic Vector Caching 2.0 & Dynamic Latency Rerouting",
      description: "Massive performance release bringing sub-14ms semantic vector cache hits, configurable cosine similarity thresholds (0.75-0.98), and automated real-time latency rerouting away from congested provider regions.",
      features: [
        "Semantic Vector Cache 2.0 with Redis vector index and cosine similarity tuning.",
        "Dynamic Anycast Latency Routing with automated HTTP 429 backoff.",
        "Added Claude 3.5 Sonnet and Gemini 1.5 Pro multimodal token telemetry.",
        "Interactive Model Arena in Developer Console."
      ]
    },
    {
      version: "v2.3.0",
      date: "July 28, 2026",
      tag: "FEATURE",
      title: "Autonomous Failover Circuit Breakers & Custom Guardrails",
      description: "Upgraded gateway resilience engine to support multi-provider fallback chains with zero request drops during upstream outages.",
      features: [
        "Configurable multi-tier fallback chains (e.g. OpenAI -> Claude -> Gemini).",
        "In-flight regex PII masking and prompt injection detection.",
        "Custom HTTP response headers (x-unillm-fallback, x-unillm-cache).",
        "Downloadable PDF invoicing and auto-recharge triggers in Developer Console."
      ]
    },
    {
      version: "v2.2.0",
      date: "June 15, 2026",
      tag: "GOVERNANCE",
      title: "Enterprise Governance, Department Budgets & SAML SSO",
      description: "Added full organization governance tools for enterprise administrators to isolate team budgets, enforce hard quotas, and manage SAML single sign-on.",
      features: [
        "SAML 2.0 SSO & SCIM user provisioning for Okta, Azure AD, and Google Workspace.",
        "Per-employee and per-team daily token budget limits.",
        "SOC 2 Type II compliance audit logging and immutable log export.",
        "Organization Master API keys with granular IP allowlists."
      ]
    },
    {
      version: "v2.1.0",
      date: "May 02, 2026",
      tag: "PROVIDERS",
      title: "Amazon Bedrock & Google Cloud Vertex Native Connectors",
      description: "Direct integration for enterprise cloud providers without requiring external proxy hops.",
      features: [
        "Native AWS Bedrock IAM role assumption and VPC endpoint support.",
        "Google Cloud Vertex AI direct OAuth2 service account connector.",
        "Cohere Rerank v3 and Mistral Large embeddings support.",
        "Enhanced playground parameter controls (temperature, frequency penalty, top_p)."
      ]
    },
    {
      version: "v2.0.0",
      date: "March 18, 2026",
      tag: "MAJOR",
      title: "UniLLM 2.0 Core Gateway Launch",
      description: "The initial major release of the universal OpenAI-compatible routing gateway with support for 50+ foundation models.",
      features: [
        "100% OpenAI-compliant REST proxy interface.",
        "Global edge Anycast proxy distribution across 36 worldwide PoPs.",
        "Developer Console with real-time request tracing and latency graphs.",
        "Pay-as-you-go billing engine."
      ]
    }
  ];

  return `
    <div class="relative overflow-hidden w-full font-sans bg-[#08090B] text-[#F5F5F5]">
      
      <!-- Top subtle vignette -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-b from-white/[0.04] to-transparent blur-[120px] pointer-events-none -z-10"></div>

      <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24 flex flex-col gap-16">
        
        <!-- Hero Header -->
        <section class="flex flex-col gap-6 max-w-4xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#101216] border border-[#292D34] text-[11px] font-mono tracking-wider text-[#A1A5AD] uppercase self-start">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Platform Updates</span>
            <span class="text-white/20">•</span>
            <span class="text-white">v2.4 Active</span>
          </div>

          <h1 class="font-sans font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-[1.08]">
            Changelog & engineering releases.
          </h1>

          <p class="text-base text-[#A1A5AD] leading-relaxed max-w-2xl font-normal">
            Track architectural improvements, new model provider integrations, edge performance benchmarks, and platform feature releases.
          </p>
        </section>

        <!-- Releases Timeline -->
        <section class="flex flex-col gap-6">
          ${releases.map(r => `
            <div class="p-8 bg-[#101216] border border-[#292D34] rounded-xl flex flex-col gap-5 hover:border-white/30 transition-all">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#292D34] pb-4 font-mono">
                <div class="flex items-center gap-3">
                  <span class="text-xl font-bold text-white">${r.version}</span>
                  <span class="px-2.5 py-0.5 rounded text-[10px] font-bold ${r.tag === 'LATEST' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-[#15181D] text-[#A1A5AD] border border-[#292D34]'}">
                    ${r.tag}
                  </span>
                </div>
                <span class="text-xs text-[#A1A5AD]">${r.date}</span>
              </div>

              <div class="flex flex-col gap-2">
                <h2 class="text-lg font-bold text-white tracking-tight">${r.title}</h2>
                <p class="text-xs sm:text-sm text-[#A1A5AD] leading-relaxed">${r.description}</p>
              </div>

              <div class="p-4 rounded-lg bg-[#08090B] border border-[#292D34] flex flex-col gap-2 font-mono text-xs">
                <span class="text-[10px] uppercase tracking-wider text-[#A1A5AD] font-bold">Key Technical Updates:</span>
                <ul class="space-y-1.5 text-[#A1A5AD]">
                  ${r.features.map(f => `
                    <li class="flex items-start gap-2">
                      <span class="text-white">•</span>
                      <span>${f}</span>
                    </li>
                  `).join("")}
                </ul>
              </div>
            </div>
          `).join("")}
        </section>

      </div>
    </div>
  `;
}

export function bindChangelog() {}

export default {
  changelog,
  bindChangelog
};
