// PUBLIC PAGE: changelog
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
      description: "Massive performance release bringing sub-18ms semantic vector cache hits, configurable cosine similarity thresholds (0.75-0.98), and automated real-time latency rerouting away from congested provider regions.",
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
        "Custom HTTP response headers (x-unillm-routing-strategy, x-unillm-cache-status).",
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
        "Global edge Anycast proxy distribution across 12 worldwide PoPs.",
        "Developer Console with real-time request tracing and latency graphs.",
        "Pay-as-you-go billing engine."
      ]
    }
  ];

  return `
    <div class="relative overflow-hidden w-full font-sans">
      <div class="absolute top-[5%] left-[5%] w-[550px] h-[550px] rounded-full blur-[160px] ambient-glow-1 -z-10"></div>
      <div class="absolute top-[40%] right-[5%] w-[600px] h-[600px] rounded-full blur-[170px] ambient-glow-2 -z-10"></div>

      <div class="border-x border-brand-border/60 max-w-7xl mx-auto bg-white/30 backdrop-blur-[1px]">
        <!-- Hero Header -->
        <section class="px-6 lg:px-12 py-16 md:py-24 flex flex-col gap-6 animate-fade-in-up border-b border-brand-border/80">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-150 text-brand-primary text-[10px] font-bold tracking-wider uppercase rounded-full self-start shadow-sm">
            Product Updates
          </div>
          <h1 class="font-display font-black text-4xl sm:text-6xl text-brand-text tracking-tight uppercase leading-[1.05]">
            CHANGELOG & RELEASE HISTORY
          </h1>
          <p class="text-sm sm:text-base text-brand-muted leading-relaxed max-w-3xl font-semibold">
            Track weekly improvements, new model provider integrations, architectural optimizations, and platform releases.
          </p>
        </section>

        <!-- Releases Timeline -->
        <section class="px-6 lg:px-12 py-16 flex flex-col gap-12 border-b border-brand-border/80">
          ${releases.map(r => `
            <div class="p-8 bg-white border border-slate-200 rounded-3xl flex flex-col gap-6 shadow-xs relative">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div class="flex items-center gap-3">
                  <span class="text-xl font-display font-black text-slate-900 font-mono">${r.version}</span>
                  <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    r.tag === "LATEST" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                  }">${r.tag}</span>
                </div>
                <span class="text-xs font-mono font-bold text-slate-400">${r.date}</span>
              </div>

              <div class="flex flex-col gap-2">
                <h3 class="font-display font-bold text-xl text-slate-900">${r.title}</h3>
                <p class="text-xs text-slate-600 leading-relaxed font-semibold">${r.description}</p>
              </div>

              <div class="flex flex-col gap-2 pt-2">
                <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Key Enhancements</span>
                <ul class="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700 font-semibold">
                  ${r.features.map(f => `
                    <li class="flex items-start gap-2">
                      <span class="text-emerald-500 font-bold">•</span>
                      <span>${f}</span>
                    </li>
                  `).join("")}
                </ul>
              </div>
            </div>
          `).join("")}
        </section>

        <!-- Bottom Subscribe -->
        <section class="px-6 lg:px-12 py-16 flex flex-col sm:flex-row justify-between items-center gap-8 bg-white select-none">
          <div class="flex flex-col gap-2">
            <h3 class="font-display font-black text-2xl text-slate-900 uppercase">Never miss a platform update</h3>
            <p class="text-xs text-slate-500 font-semibold">Get notified when new foundation models or SDK versions are released.</p>
          </div>
          <div class="flex items-center gap-4 shrink-0">
            <a href="/get-started" data-link class="px-6 py-3 bg-brand-primary text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-indigo-700 transition-colors shadow-md">
              Subscribe to Updates &rarr;
            </a>
          </div>
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
