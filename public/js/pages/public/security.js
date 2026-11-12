// PUBLIC PAGE: security (Obsidian Trust Center & Zero-Data Retention Architecture)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";
import { icons } from "../../icons.js?v=2";

export function security() {
  return `
    <div class="relative overflow-hidden w-full font-sans bg-[#08090B] text-[#F5F5F5]">
      
      <!-- Top subtle vignette -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-b from-white/[0.04] to-transparent blur-[120px] pointer-events-none -z-10"></div>

      <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24 flex flex-col gap-20">
        
        <!-- Hero Section -->
        <section class="flex flex-col gap-6 max-w-4xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#101216] border border-[#292D34] text-[11px] font-mono tracking-wider text-[#A1A5AD] uppercase self-start">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Security & Trust Center</span>
            <span class="text-white/20">•</span>
            <span class="text-white">ZDR Guarantee</span>
          </div>

          <h1 class="font-sans font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-[1.08]">
            Enterprise security & zero-data retention architecture.
          </h1>

          <p class="text-base text-[#A1A5AD] leading-relaxed max-w-2xl font-normal">
            UniLLM operates as a stateless proxy layer between your applications and third-party AI models. We enforce data governance, strict compliance, encrypted API key vaults, and automated PII masking without ever storing user prompt contents.
          </p>
        </section>

        <!-- Compliance Badges Strip -->
        <section class="grid grid-cols-2 md:grid-cols-5 gap-3 font-mono text-center">
          <div class="p-5 bg-[#101216] border border-[#292D34] rounded-xl flex flex-col items-center gap-2">
            <span class="text-xs font-semibold text-white">SOC 2 Type II</span>
            <span class="text-[10px] text-emerald-400">Certified Annual</span>
          </div>
          <div class="p-5 bg-[#101216] border border-[#292D34] rounded-xl flex flex-col items-center gap-2">
            <span class="text-xs font-semibold text-white">HIPAA BAA</span>
            <span class="text-[10px] text-emerald-400">Contract Ready</span>
          </div>
          <div class="p-5 bg-[#101216] border border-[#292D34] rounded-xl flex flex-col items-center gap-2">
            <span class="text-xs font-semibold text-white">GDPR & CCPA</span>
            <span class="text-[10px] text-emerald-400">Zero Retention</span>
          </div>
          <div class="p-5 bg-[#101216] border border-[#292D34] rounded-xl flex flex-col items-center gap-2">
            <span class="text-xs font-semibold text-white">ISO 27001</span>
            <span class="text-[10px] text-emerald-400">Audited Controls</span>
          </div>
          <div class="p-5 bg-[#101216] border border-[#292D34] rounded-xl flex flex-col items-center gap-2">
            <span class="text-xs font-semibold text-white">AES-256 Vault</span>
            <span class="text-[10px] text-emerald-400">HSM Hardware</span>
          </div>
        </section>

        <!-- Security Pillars Grid -->
        <section class="flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <span class="text-xs font-mono font-bold text-[#A1A5AD] uppercase tracking-wider">Defense In Depth</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">Core Security Safeguards</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="p-6 bg-[#101216] border border-[#292D34] rounded-xl flex flex-col gap-3">
              <span class="w-8 h-8 rounded-lg bg-[#15181D] border border-[#292D34] flex items-center justify-center font-mono font-bold text-xs text-white">01</span>
              <h3 class="font-bold text-base text-white">Zero Data Retention</h3>
              <p class="text-xs text-[#A1A5AD] leading-relaxed">
                Customer prompts, embeddings, and output completions are processed strictly in RAM and immediately evicted once streamed. No customer tokens are ever stored or used for model training.
              </p>
            </div>

            <div class="p-6 bg-[#101216] border border-[#292D34] rounded-xl flex flex-col gap-3">
              <span class="w-8 h-8 rounded-lg bg-[#15181D] border border-[#292D34] flex items-center justify-center font-mono font-bold text-xs text-emerald-400">02</span>
              <h3 class="font-bold text-base text-white">Real-Time PII Masking</h3>
              <p class="text-xs text-[#A1A5AD] leading-relaxed">
                Automated regex and NLP filters identify and redact sensitive entities (SSNs, credit card numbers, email addresses, medical records) on the fly before reaching LLM provider endpoints.
              </p>
            </div>

            <div class="p-6 bg-[#101216] border border-[#292D34] rounded-xl flex flex-col gap-3">
              <span class="w-8 h-8 rounded-lg bg-[#15181D] border border-[#292D34] flex items-center justify-center font-mono font-bold text-xs text-white">03</span>
              <h3 class="font-bold text-base text-white">Encrypted Secrets Vault</h3>
              <p class="text-xs text-[#A1A5AD] leading-relaxed">
                Upstream provider credentials (OpenAI, Anthropic, Google keys) are stored encrypted using AWS KMS / HashiCorp Vault hardware security modules with automatic rotation policies.
              </p>
            </div>
          </div>
        </section>

        <!-- CTA Section -->
        <section class="p-8 sm:p-12 rounded-xl bg-[#101216] border border-[#292D34] flex flex-col sm:flex-row justify-between items-center gap-8">
          <div class="flex flex-col gap-2">
            <h3 class="text-2xl font-bold text-white tracking-tight">Need a custom Security Review or BAA?</h3>
            <p class="text-xs sm:text-sm text-[#A1A5AD]">Our compliance team provides complete SOC2 packets and executes HIPAA Business Associate Agreements.</p>
          </div>
          <div class="flex items-center gap-4 shrink-0">
            <a href="/talk-to-sales" data-link class="px-6 py-3 bg-white hover:bg-neutral-200 text-black font-semibold rounded-lg text-xs transition-colors shadow-sm inline-flex items-center gap-2">
              <span>Request Security Packet</span>
              <span class="font-bold">→</span>
            </a>
          </div>
        </section>

      </div>
    </div>
  `;
}

export function bindSecurity() {}

export default {
  security,
  bindSecurity
};
