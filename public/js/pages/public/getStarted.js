// PUBLIC PAGE: getStarted (Obsidian Developer Onboarding Hub)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function getStarted() {
  return `
    <div class="relative overflow-hidden w-full font-sans bg-[#08090B] text-[#F5F5F5]">
      
      <!-- Top subtle vignette -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-b from-white/[0.04] to-transparent blur-[120px] pointer-events-none -z-10"></div>

      <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24 flex flex-col gap-16">
        
        <!-- Header -->
        <div class="flex flex-col gap-4 max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#101216] border border-[#292D34] text-[11px] font-mono tracking-wider text-[#A1A5AD] uppercase self-start">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Developer Quickstart</span>
            <span class="text-white/20">•</span>
            <span class="text-white">Free Sandbox Tier</span>
          </div>

          <h1 class="font-sans font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-[1.08]">
            Initialize your gateway access in under two minutes.
          </h1>

          <p class="text-base text-[#A1A5AD] leading-relaxed">
            Get your unified API key, configure your client library, and route your first prompt across 50+ frontier foundation models.
          </p>
        </div>

        <!-- 3 Architecture Steps -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          
          <!-- Step 1 -->
          <div class="p-6 rounded-xl bg-[#101216] border border-[#292D34] flex flex-col justify-between gap-6 hover:border-white/30 transition-all">
            <div class="flex flex-col gap-3 font-sans">
              <span class="font-mono text-xs text-emerald-400 font-bold">STEP 01</span>
              <h3 class="text-lg font-bold text-white">Generate Ingress Key</h3>
              <p class="text-xs text-[#A1A5AD] leading-relaxed">
                Create your developer account to access your sandboxed API key with \$10 in complimentary test inference credits.
              </p>
            </div>
            <a href="/signup" data-link class="px-4 py-2.5 rounded-lg bg-white hover:bg-neutral-200 text-black font-semibold text-xs text-center transition-all shadow-sm font-sans">
              Create Account →
            </a>
          </div>

          <!-- Step 2 -->
          <div class="p-6 rounded-xl bg-[#101216] border border-[#292D34] flex flex-col justify-between gap-6 hover:border-white/30 transition-all">
            <div class="flex flex-col gap-3 font-sans">
              <span class="font-mono text-xs text-white font-bold">STEP 02</span>
              <h3 class="text-lg font-bold text-white">Configure Base URL</h3>
              <p class="text-xs text-[#A1A5AD] leading-relaxed">
                Point standard OpenAI SDK client instances to <code class="text-white font-mono text-[11px]">https://api.unillm.io/v1</code> with zero code refactoring.
              </p>
            </div>
            <a href="/docs#quickstart" data-link class="px-4 py-2.5 rounded-lg bg-[#15181D] hover:bg-[#20242B] text-white border border-[#292D34] font-semibold text-xs text-center transition-colors font-sans">
              View Code Snippets
            </a>
          </div>

          <!-- Step 3 -->
          <div class="p-6 rounded-xl bg-[#101216] border border-[#292D34] flex flex-col justify-between gap-6 hover:border-white/30 transition-all">
            <div class="flex flex-col gap-3 font-sans">
              <span class="font-mono text-xs text-[#A1A5AD] font-bold">STEP 03</span>
              <h3 class="text-lg font-bold text-white">Stream & Observe</h3>
              <p class="text-xs text-[#A1A5AD] leading-relaxed">
                Dispatch your first completion. Observe live latency, semantic cache hits, and token usage in your developer console.
              </p>
            </div>
            <a href="/app/overview" data-link class="px-4 py-2.5 rounded-lg bg-[#15181D] hover:bg-[#20242B] text-white border border-[#292D34] font-semibold text-xs text-center transition-colors font-sans">
              Open Dashboard
            </a>
          </div>

        </div>

        <!-- Terminal Quickstart Block -->
        <section class="rounded-xl border border-[#292D34] bg-[#101216] p-6 lg:p-8 font-mono text-xs flex flex-col gap-4">
          <div class="flex items-center justify-between pb-3 border-b border-[#292D34] text-[11px] text-[#A1A5AD]">
            <span class="text-white font-semibold">Test Direct cURL Completion</span>
            <span>Zero Install Required</span>
          </div>
          <pre class="overflow-x-auto text-[#A1A5AD] leading-relaxed p-2 text-[11px]"><code>curl https://api.unillm.io/v1/chat/completions \\
  -H "Authorization: Bearer $UNILLM_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "openai/gpt-4o",
    "messages": [{"role": "user", "content": "Hello UniLLM gateway!"}]
  }'</code></pre>
        </section>

      </div>
    </div>
  `;
}

export function bindGetStarted() {}

export default {
  getStarted,
  bindGetStarted
};
