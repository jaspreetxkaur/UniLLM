// PUBLIC PAGE: security
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";
import { icons } from "../../icons.js?v=2";

export function security() {
  return `
    <div class="relative overflow-hidden w-full font-sans">
      <div class="absolute top-[5%] left-[5%] w-[550px] h-[550px] rounded-full blur-[160px] ambient-glow-1 -z-10"></div>
      <div class="absolute top-[40%] right-[5%] w-[600px] h-[600px] rounded-full blur-[170px] ambient-glow-2 -z-10"></div>

      <div class="border-x border-brand-border/60 max-w-7xl mx-auto bg-white/30 backdrop-blur-[1px]">
        <!-- Hero Section -->
        <section class="px-6 lg:px-12 py-16 md:py-24 flex flex-col gap-6 animate-fade-in-up border-b border-brand-border/80">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-150 text-emerald-700 text-[10px] font-bold tracking-wider uppercase rounded-full self-start shadow-sm">
            Security & Trust Center
          </div>
          <h1 class="font-display font-black text-4xl sm:text-6xl text-brand-text tracking-tight uppercase leading-[1.05]">
            ENTERPRISE-GRADE SECURITY & ZERO-DATA RETENTION ARCHITECTURE
          </h1>
          <p class="text-sm sm:text-base text-brand-muted leading-relaxed max-w-3xl font-semibold">
            UniLLM acts as a secure, stateless proxy layer between your applications and third-party AI models. We ensure full data governance, strict compliance, encrypted API key vaults, and automated PII masking without ever storing user prompt contents.
          </p>
        </section>

        <!-- Compliance Badges -->
        <section class="px-6 lg:px-12 py-8 bg-slate-50/80 border-b border-brand-border/80 grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
          <div class="p-4 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col items-center gap-2 hover:border-emerald-200 transition-all">
            <div class="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
              ${icons.shield("w-5 h-5")}
            </div>
            <span class="font-bold text-xs text-slate-800">SOC 2 Type II</span>
            <span class="text-[10px] text-emerald-600 font-bold">Certified Annual</span>
          </div>
          <div class="p-4 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col items-center gap-2 hover:border-emerald-200 transition-all">
            <div class="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
              ${icons.shield("w-5 h-5")}
            </div>
            <span class="font-bold text-xs text-slate-800">HIPAA Compliant</span>
            <span class="text-[10px] text-emerald-600 font-bold">BAA Ready</span>
          </div>
          <div class="p-4 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col items-center gap-2 hover:border-emerald-200 transition-all">
            <div class="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
              ${icons.globe("w-5 h-5")}
            </div>
            <span class="font-bold text-xs text-slate-800">GDPR & CCPA</span>
            <span class="text-[10px] text-emerald-600 font-bold">100% Compliant</span>
          </div>
          <div class="p-4 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col items-center gap-2 hover:border-emerald-200 transition-all">
            <div class="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
              ${icons.lock("w-5 h-5")}
            </div>
            <span class="font-bold text-xs text-slate-800">ISO 27001</span>
            <span class="text-[10px] text-emerald-600 font-bold">Audited Controls</span>
          </div>
          <div class="p-4 bg-white border border-slate-200 rounded-xl shadow-xs flex flex-col items-center gap-2 hover:border-emerald-200 transition-all">
            <div class="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
              ${icons.key("w-5 h-5")}
            </div>
            <span class="font-bold text-xs text-slate-800">AES-256 Vault</span>
            <span class="text-[10px] text-emerald-600 font-bold">HSM Hardware</span>
          </div>
        </section>

        <!-- Security Pillars -->
        <section class="px-6 lg:px-12 py-16 flex flex-col gap-10 border-b border-brand-border/80">
          <div class="flex flex-col gap-2">
            <span class="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Defense In Depth</span>
            <h2 class="font-display font-black text-2xl sm:text-3xl text-brand-text uppercase">Core Security Safeguards</h2>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col gap-4 shadow-sm hover:border-indigo-200 transition-all">
              <div class="w-12 h-12 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-brand-primary">
                ${icons.lock("w-6 h-6 text-brand-primary")}
              </div>
              <h3 class="font-bold text-base text-slate-900">Zero Data Retention</h3>
              <p class="text-xs text-slate-600 leading-relaxed font-semibold">
                Customer prompts, embeddings, and output completions are processed strictly in RAM and immediately discarded once returned. No training on customer data.
              </p>
            </div>

            <div class="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col gap-4 shadow-sm hover:border-emerald-200 transition-all">
              <div class="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                ${icons.shield("w-6 h-6 text-emerald-600")}
              </div>
              <h3 class="font-bold text-base text-slate-900">Real-Time PII Masking</h3>
              <p class="text-xs text-slate-600 leading-relaxed font-semibold">
                Automatically detects and redacts sensitive data (Social Security numbers, credit card numbers, email addresses, medical records) on the fly before reaching LLM providers.
              </p>
            </div>

            <div class="p-6 bg-white border border-slate-200 rounded-2xl flex flex-col gap-4 shadow-sm hover:border-purple-200 transition-all">
              <div class="w-12 h-12 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                ${icons.key("w-6 h-6 text-purple-600")}
              </div>
              <h3 class="font-bold text-base text-slate-900">Encrypted Secrets Vault</h3>
              <p class="text-xs text-slate-600 leading-relaxed font-semibold">
                Your OpenAI, Anthropic, and Google API keys are stored encrypted using AWS KMS / HashiCorp Vault hardware security modules with automatic rotation policies.
              </p>
            </div>
          </div>
        </section>

        <!-- Interactive PII Redaction Demo Widget -->
        <section class="px-6 lg:px-12 py-16 flex flex-col gap-6 border-b border-brand-border/80 bg-slate-900 text-white rounded-3xl mx-6 my-10 relative overflow-hidden">
          <div class="flex flex-col gap-2 z-10">
            <span class="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Interactive Guardrail Demonstration</span>
            <h2 class="font-display font-black text-2xl sm:text-3xl text-white uppercase">Real-Time Prompt Sanitization</h2>
            <p class="text-xs text-indigo-200/80 max-w-xl font-semibold">See how UniLLM's memory-safe proxy parses input text and obfuscates sensitive entities before relaying to external LLMs.</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 z-10 font-mono text-xs">
            <div class="p-5 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-3">
              <div class="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <span>Raw Inbound Request</span>
                <span class="text-rose-400">Contains PII</span>
              </div>
              <div class="p-4 bg-slate-950/80 rounded-xl text-slate-300 leading-relaxed font-mono">
                {<br>
                &nbsp;&nbsp;"model": "gpt-4o",<br>
                &nbsp;&nbsp;"messages": [<br>
                &nbsp;&nbsp;&nbsp;&nbsp;{"role": "user", "content": "Patient John Doe (SSN: <span class="bg-rose-500/30 text-rose-300 px-1 rounded">123-45-6789</span>, Card: <span class="bg-rose-500/30 text-rose-300 px-1 rounded">4111-2222-3333-4444</span>) needs insulin."}<br>
                &nbsp;&nbsp;]<br>
                }
              </div>
            </div>

            <div class="p-5 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-3">
              <div class="flex items-center justify-between text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                <span>Forwarded to Provider</span>
                <span class="text-emerald-400">Sanitized by UniLLM</span>
              </div>
              <div class="p-4 bg-slate-950/80 rounded-xl text-slate-300 leading-relaxed font-mono">
                {<br>
                &nbsp;&nbsp;"model": "gpt-4o",<br>
                &nbsp;&nbsp;"messages": [<br>
                &nbsp;&nbsp;&nbsp;&nbsp;{"role": "user", "content": "Patient [REDACTED_NAME] (SSN: <span class="bg-emerald-500/30 text-emerald-300 px-1 rounded">[SSN_TOKEN_948]</span>, Card: <span class="bg-emerald-500/30 text-emerald-300 px-1 rounded">[CARD_TOKEN_102]</span>) needs insulin."}<br>
                &nbsp;&nbsp;]<br>
                }
              </div>
            </div>
          </div>
        </section>

        <!-- Compliance Whitepaper Download / Request -->
        <section class="px-6 lg:px-12 py-16 flex flex-col sm:flex-row justify-between items-center gap-8 bg-white select-none">
          <div class="flex flex-col gap-2">
            <h3 class="font-display font-black text-2xl text-slate-900 uppercase">Need our SOC 2 Report or BAA?</h3>
            <p class="text-xs text-slate-500 font-semibold">Our security team provides complete audit packages and penetration testing summaries upon request.</p>
          </div>
          <div class="flex items-center gap-4 shrink-0">
            <a href="/talk-to-sales" data-link class="px-6 py-3 bg-brand-primary text-white font-bold rounded-xl text-xs uppercase tracking-wider hover:bg-indigo-700 transition-colors shadow-md">
              Request Security Packet &rarr;
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
