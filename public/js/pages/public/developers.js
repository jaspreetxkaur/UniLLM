// PUBLIC PAGE: developers (Obsidian Developer Experience & SDK Hub)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";
import { icons } from "../../icons.js?v=2";

export function developers() {
  return `
    <div class="relative overflow-hidden w-full font-sans bg-[#0B0C0D] text-[#F2EFE8]">
      
      <!-- Monochromatic top background gradient -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[450px] bg-gradient-to-b from-[#FF7849]/[0.04] via-[#42D6A4]/[0.02] to-transparent blur-[150px] pointer-events-none -z-10"></div>

      <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24 flex flex-col gap-24">
        
        <!-- =========================================================
             1. EDITORIAL DEVELOPER HERO WITH LIVE PROXY TERMINAL
        ========================================================= -->
        <section class="flex flex-col lg:flex-row items-center justify-between gap-12 pb-16 border-b border-[rgba(242,239,232,0.14)]">
          <div class="flex-1 flex flex-col gap-6 max-w-2xl">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141615] border border-[rgba(242,239,232,0.14)] text-[11px] font-mono tracking-wider text-[#A6A39C] uppercase self-start">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Developer Protocol</span>
              <span class="text-white/20">•</span>
              <span class="text-white">OpenAI Parity</span>
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-[-0.03em] text-[#F2EFE8] leading-[1.08]">
              Standardized inference.<br />
              Drop-in OpenAI parity.
            </h1>

            <p class="text-base text-[#A6A39C] leading-relaxed">
              Standardize your AI infrastructure with one universal endpoint. No proprietary SDK lock-in: continue using official OpenAI, LangChain, or Vercel AI libraries by swapping your <code class="text-white font-mono text-[13px]">baseURL</code> to <code class="text-white font-mono text-[13px]">api.unillm.io/v1</code>.
            </p>

            <div class="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/docs#quickstart"
                data-link
                class="px-6 py-3 rounded-lg bg-[#FF7849] hover:bg-[#ff8a60] text-[#0B0C0D] font-bold shadow-[0_4px_25px_rgba(255,120,73,0.3)] text-xs font-semibold transition-all shadow-sm inline-flex items-center gap-2"
              >
                <span>5-Minute Quickstart</span>
                <span class="font-bold">→</span>
              </a>
              <a
                href="/app/playground"
                data-link
                class="px-6 py-3 rounded-lg bg-[#141615] hover:bg-[#1A1D1B] text-[#F2EFE8] border border-[rgba(242,239,232,0.14)] text-xs font-semibold transition-all inline-flex items-center gap-2"
              >
                <span>Open Playground</span>
                <span>↗</span>
              </a>
            </div>

            <!-- Install One-Liner Box -->
            <div class="p-3 bg-[#141615] border border-[rgba(242,239,232,0.14)] rounded-lg flex items-center justify-between text-xs font-mono max-w-lg mt-2">
              <div class="flex items-center gap-2 truncate">
                <span class="text-[#A6A39C] select-none">$</span>
                <span id="install-cmd-text" class="text-white select-all">npm install @unillm/sdk</span>
              </div>
              <button id="copy-install-btn" class="px-3 py-1 bg-[#1A1D1B] hover:bg-[#20242B] text-[#A6A39C] hover:text-white rounded border border-[rgba(242,239,232,0.14)] text-[10px] transition-colors shrink-0">
                Copy
              </button>
            </div>
          </div>

          <!-- Hero Right: Live Interactive Terminal Proxy -->
          <div class="flex-1 w-full max-w-lg lg:max-w-none rounded-xl border border-[rgba(242,239,232,0.14)] bg-[#141615] p-5 shadow-2xl relative overflow-hidden font-mono text-xs">
            <div class="flex items-center justify-between pb-3 mb-4 border-b border-[rgba(242,239,232,0.14)] text-[11px] text-[#A6A39C]">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-white/20"></span>
                <span class="text-white font-medium ml-1">Gateway Ingress Tester</span>
              </div>
              <button id="dev-execute-btn" class="px-3 py-1 rounded bg-[#FF7849] hover:bg-[#ff8a60] text-[#0B0C0D] font-bold shadow-[0_4px_25px_rgba(255,120,73,0.3)] font-semibold text-[10px] transition-colors">
                Run Request &rarr;
              </button>
            </div>

            <!-- Inbound Request Preview -->
            <div class="space-y-3">
              <div class="p-3 bg-[#0B0C0D] rounded-lg border border-[rgba(242,239,232,0.14)]">
                <div class="text-[#A6A39C] text-[10px] mb-1 uppercase font-semibold">Inbound Request:</div>
                <div class="text-white font-semibold">curl -X POST https://api.unillm.io/v1/chat/completions \\</div>
                <div class="text-[#A6A39C] pl-4">-H "Authorization: Bearer unillm_live_..." \\</div>
                <div class="text-[#A6A39C] pl-4">-d '{"model":"openai/gpt-4o","stream":true}'</div>
              </div>

              <!-- Live Execution Output Box -->
              <div class="p-3 bg-[#0B0C0D] rounded-lg border border-[rgba(242,239,232,0.14)] h-40 overflow-y-auto space-y-1 text-[11px]" id="dev-terminal-stream">
                <div class="text-[#A6A39C]">[STATUS] Edge connected. Click "Run Request" to stream tokens.</div>
              </div>
            </div>
          </div>
        </section>

        <!-- =========================================================
             2. MULTI-LANGUAGE SDK QUICKSTARTS
        ========================================================= -->
        <section class="flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <span class="text-xs font-mono font-bold text-[#A6A39C] uppercase tracking-wider">Multi-Language Ecosystem</span>
            <h2 class="text-3xl font-bold tracking-[-0.03em] text-[#F2EFE8]">
              Official SDK libraries and community integrations
            </h2>
            <p class="text-xs sm:text-sm text-[#A6A39C]">
              First-class typed support for modern edge runtimes and standard AI frameworks.
            </p>
          </div>

          <!-- Language Selector Bar -->
          <div class="flex items-center gap-2 p-1 rounded-lg bg-[#141615] border border-[rgba(242,239,232,0.14)] max-w-xl" id="sdk-tabs">
            <button data-sdk="ts" class="sdk-tab-btn flex-1 py-1.5 rounded-md text-xs font-semibold transition-all bg-[#1A1D1B] text-white border border-white">
              TypeScript
            </button>
            <button data-sdk="py" class="sdk-tab-btn flex-1 py-1.5 rounded-md text-xs font-semibold transition-all text-[#A6A39C] hover:text-white hover:bg-[#1A1D1B] border border-transparent">
              Python
            </button>
            <button data-sdk="go" class="sdk-tab-btn flex-1 py-1.5 rounded-md text-xs font-semibold transition-all text-[#A6A39C] hover:text-white hover:bg-[#1A1D1B] border border-transparent">
              Go
            </button>
            <button data-sdk="curl" class="sdk-tab-btn flex-1 py-1.5 rounded-md text-xs font-semibold transition-all text-[#A6A39C] hover:text-white hover:bg-[#1A1D1B] border border-transparent">
              cURL
            </button>
          </div>

          <!-- Code Display Container -->
          <div class="rounded-xl border border-[rgba(242,239,232,0.14)] bg-[#141615] p-6 lg:p-8 shadow-2xl flex flex-col gap-4 font-mono text-xs">
            <div class="flex items-center justify-between pb-3 border-b border-[rgba(242,239,232,0.14)] text-[11px]">
              <span id="sdk-code-heading" class="text-white font-semibold">Node.js / TypeScript SDK Quickstart</span>
              <button id="sdk-copy-code-btn" class="px-3 py-1 bg-[#1A1D1B] hover:bg-[#20242B] text-[#A6A39C] hover:text-white rounded border border-[rgba(242,239,232,0.14)] transition-colors">
                Copy Code
              </button>
            </div>
            <pre class="overflow-x-auto text-[#A6A39C] leading-relaxed text-[11px] p-2" id="sdk-code-block"><code>import { UniLLM } from '@unillm/sdk';

const unillm = new UniLLM({
  apiKey: process.env.UNILLM_API_KEY,
  // Automatic multi-cloud failover chain
  fallbacks: ['anthropic/claude-3-5-sonnet', 'groq/llama-3.3-70b']
});

const stream = await unillm.chat.completions.create({
  model: 'openai/gpt-4o',
  messages: [{ role: 'user', content: 'What is the speed of light?' }],
  stream: true
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}</code></pre>
          </div>
        </section>

        <!-- =========================================================
             3. ADVANCED GATEWAY HEADERS REFERENCE
        ========================================================= -->
        <section class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <span class="text-xs font-mono font-bold text-[#A6A39C] uppercase tracking-wider">Gateway Protocol</span>
            <h2 class="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#F2EFE8]">
              Specialized request headers for runtime control
            </h2>
            <p class="text-xs text-[#A6A39C]">
              Pass standard HTTP headers to control caching, automated retry policies, and fallback order per request.
            </p>
          </div>

          <div class="rounded-xl border border-[rgba(242,239,232,0.14)] bg-[#141615] overflow-hidden font-mono text-xs select-text">
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="border-b border-[rgba(242,239,232,0.14)] bg-[#0B0C0D] text-[#A6A39C] text-[10px] uppercase tracking-wider">
                    <th class="px-6 py-4">HTTP Header</th>
                    <th class="px-6 py-4">Type</th>
                    <th class="px-6 py-4">Description</th>
                    <th class="px-6 py-4">Example Value</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[rgba(242,239,232,0.14)] text-[#A6A39C]">
                  <tr class="hover:bg-[#1A1D1B] transition-colors">
                    <td class="px-6 py-3.5 text-white font-bold">x-unillm-fallback</td>
                    <td class="px-6 py-3.5">string</td>
                    <td class="px-6 py-3.5 font-sans">Comma-separated backup model identifiers to execute on 429/5xx</td>
                    <td class="px-6 py-3.5 text-white">claude-3-5-sonnet,llama-3</td>
                  </tr>
                  <tr class="hover:bg-[#1A1D1B] transition-colors">
                    <td class="px-6 py-3.5 text-white font-bold">x-unillm-cache</td>
                    <td class="px-6 py-3.5">boolean</td>
                    <td class="px-6 py-3.5 font-sans">Enable or disable vector semantic caching for the query</td>
                    <td class="px-6 py-3.5 text-white">true</td>
                  </tr>
                  <tr class="hover:bg-[#1A1D1B] transition-colors">
                    <td class="px-6 py-3.5 text-white font-bold">x-unillm-guardrails</td>
                    <td class="px-6 py-3.5">string</td>
                    <td class="px-6 py-3.5 font-sans">Enforce automated PII stripping and toxicity filtering</td>
                    <td class="px-6 py-3.5 text-white">pii-redact,toxicity-block</td>
                  </tr>
                  <tr class="hover:bg-[#1A1D1B] transition-colors">
                    <td class="px-6 py-3.5 text-white font-bold">x-unillm-timeout</td>
                    <td class="px-6 py-3.5">integer</td>
                    <td class="px-6 py-3.5 font-sans">Maximum upstream provider wait time in milliseconds before fallback</td>
                    <td class="px-6 py-3.5 text-white">2500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- =========================================================
             4. BOTTOM CTA
        ========================================================= -->
        <section class="rounded-xl bg-[#141615] border border-[rgba(242,239,232,0.14)] p-8 sm:p-12 text-center flex flex-col items-center gap-6">
          <div class="max-w-xl flex flex-col gap-2">
            <h2 class="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#F2EFE8]">
              Start building in the model playground
            </h2>
            <p class="text-xs sm:text-sm text-[#A6A39C]">
              Test real prompts, inspect token latency, and compare model responses side by side.
            </p>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/app/playground"
              data-link
              class="px-6 py-3 rounded-lg bg-[#FF7849] hover:bg-[#ff8a60] text-[#0B0C0D] font-bold shadow-[0_4px_25px_rgba(255,120,73,0.3)] text-xs font-semibold transition-all shadow-sm inline-flex items-center gap-2"
            >
              <span>Open Playground</span>
              <span class="font-bold">→</span>
            </a>
            <a
              href="/docs"
              data-link
              class="px-6 py-3 rounded-lg bg-[#1A1D1B] hover:bg-[#141615] text-[#F2EFE8] border border-[rgba(242,239,232,0.14)] text-xs font-semibold transition-all"
            >
              Read Full API Reference →
            </a>
          </div>
        </section>

      </div>
    </div>
  `;
}

export function bindDevelopers() {
  // 1. Copy install command
  const copyBtn = document.getElementById("copy-install-btn");
  const installText = document.getElementById("install-cmd-text");
  copyBtn?.addEventListener("click", () => {
    if (installText) {
      navigator.clipboard.writeText(installText.innerText).then(() => {
        copyBtn.innerText = "Copied! ✓";
        setTimeout(() => { copyBtn.innerText = "Copy"; }, 2000);
      });
    }
  });

  // 2. Live Terminal Simulator
  const executeBtn = document.getElementById("dev-execute-btn");
  const streamEl = document.getElementById("dev-terminal-stream");
  let isRunning = false;

  executeBtn?.addEventListener("click", () => {
    if (isRunning || !streamEl) return;
    isRunning = true;
    executeBtn.innerText = "Streaming...";
    executeBtn.classList.add("opacity-50");

    streamEl.innerHTML = `
      <div class="text-white font-medium">[PROXY] Connecting to global edge mesh (Washington DC)...</div>
      <div class="text-[#A6A39C]">[AUTH] API Key verified. Tenant: Production Workspace</div>
      <div class="text-[#A6A39C]">[CACHE] Vector lookup miss (1.1ms). Dispatching to openai/gpt-4o...</div>
    `;

    const sampleTokens = [
      "The", " speed", " of", " light", " in", " vacuum", " is", " exactly", " 299,792,458",
      " meters", " per", " second", " (~300,000", " km/s)."
    ];

    let tokenIdx = 0;
    const tokenInterval = setInterval(() => {
      if (tokenIdx < sampleTokens.length) {
        const span = document.createElement("span");
        span.className = "text-white font-bold";
        span.innerText = sampleTokens[tokenIdx];
        streamEl.appendChild(span);
        streamEl.scrollTop = streamEl.scrollHeight;
        tokenIdx++;
      } else {
        clearInterval(tokenInterval);
        const footer = document.createElement("div");
        footer.className = "text-emerald-400 font-bold mt-2";
        footer.innerText = "[200 OK] Stream finished in 184ms | Total tokens: 14 | Overhead: 0.8ms";
        streamEl.appendChild(footer);
        streamEl.scrollTop = streamEl.scrollHeight;
        isRunning = false;
        executeBtn.innerText = "Run Request →";
        executeBtn.classList.remove("opacity-50");
      }
    }, 70);
  });

  // 3. SDK Code Tab Switcher
  const sdkTabs = document.querySelectorAll(".sdk-tab-btn");
  const sdkCodeBlock = document.getElementById("sdk-code-block");
  const sdkHeading = document.getElementById("sdk-code-heading");

  const sdkCodes = {
    ts: {
      heading: "Node.js / TypeScript SDK Quickstart",
      code: `import { UniLLM } from '@unillm/sdk';

const unillm = new UniLLM({
  apiKey: process.env.UNILLM_API_KEY,
  // Automatic multi-cloud failover chain
  fallbacks: ['anthropic/claude-3-5-sonnet', 'groq/llama-3.3-70b']
});

const stream = await unillm.chat.completions.create({
  model: 'openai/gpt-4o',
  messages: [{ role: 'user', content: 'What is the speed of light?' }],
  stream: true
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || '');
}`
    },
    py: {
      heading: "Python Native SDK Quickstart",
      code: `from unillm import UniLLM
import os

client = UniLLM(
    api_key=os.environ.get("UNILLM_API_KEY"),
    fallbacks=["anthropic/claude-3-5-sonnet", "groq/llama-3.3-70b"]
)

stream = client.chat.completions.create(
    model="openai/gpt-4o",
    messages=[{"role": "user", "content": "What is the speed of light?"}],
    stream=True
)

for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="", flush=True)`
    },
    go: {
      heading: "Golang SDK Quickstart",
      code: `package main

import (
    "context"
    "fmt"
    "github.com/unillm/go-sdk"
)

func main() {
    client := unillm.NewClient(
        unillm.WithAPIKey("UNILLM_API_KEY"),
        unillm.WithFallbacks([]string{"anthropic/claude-3-5-sonnet"}),
    )

    resp, err := client.ChatCompletion(context.Background(), &unillm.ChatRequest{
        Model: "openai/gpt-4o",
        Messages: []unillm.Message{{Role: "user", Content: "What is the speed of light?"}},
    })
    if err != nil {
        panic(err)
    }
    fmt.Println(resp.Choices[0].Message.Content)
}`
    },
    curl: {
      heading: "Direct HTTP / cURL Proxy Request",
      code: `curl https://api.unillm.io/v1/chat/completions \\
  -H "Authorization: Bearer $UNILLM_API_KEY" \\
  -H "x-unillm-fallback: anthropic/claude-3-5-sonnet,groq/llama-3.3-70b" \\
  -H "x-unillm-cache: true" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "openai/gpt-4o",
    "messages": [{"role": "user", "content": "What is the speed of light?"}]
  }'`
    }
  };

  sdkTabs.forEach(btn => {
    btn.addEventListener("click", () => {
      const sdk = btn.dataset.sdk;
      if (!sdk || !sdkCodes[sdk]) return;

      sdkTabs.forEach(b => {
        b.className = "sdk-tab-btn flex-1 py-1.5 rounded-md text-xs font-semibold transition-all text-[#A6A39C] hover:text-white hover:bg-[#1A1D1B] border border-transparent";
      });
      btn.className = "sdk-tab-btn flex-1 py-1.5 rounded-md text-xs font-semibold transition-all bg-[#1A1D1B] text-white border border-white";

      if (sdkHeading) sdkHeading.innerText = sdkCodes[sdk].heading;
      if (sdkCodeBlock) {
        sdkCodeBlock.innerHTML = `<code>${sdkCodes[sdk].code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code>`;
      }
    });
  });

  document.getElementById("sdk-copy-code-btn")?.addEventListener("click", () => {
    if (sdkCodeBlock) {
      navigator.clipboard.writeText(sdkCodeBlock.innerText).then(() => {
        const b = document.getElementById("sdk-copy-code-btn");
        if (b) {
          b.innerText = "Copied! ✓";
          setTimeout(() => { b.innerText = "Copy Code"; }, 2000);
        }
      });
    }
  });
}

export default {
  developers,
  bindDevelopers
};
