// PUBLIC PAGE: developers (Developer Experience & SDK Quickstart Hub)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";
import { icons } from "../../icons.js?v=2";

export function developers() {
  return `
    <div class="relative overflow-hidden w-full font-sans bg-[#07080B] text-white">
      <!-- Ambient Lighting -->
      <div class="absolute top-[3%] left-[10%] w-[550px] h-[550px] rounded-full blur-[180px] bg-[#38BDF8]/5 pointer-events-none -z-10"></div>
      <div class="absolute top-[40%] right-[5%] w-[600px] h-[600px] rounded-full blur-[180px] bg-indigo-500/5 pointer-events-none -z-10"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col gap-24">
        
        <!-- =========================================================
             1. EDITORIAL DEVELOPER HERO WITH LIVE PROXY TERMINAL
        ========================================================= -->
        <section class="flex flex-col lg:flex-row items-center justify-between gap-12 pt-6 pb-12 border-b border-[#1F2438]">
          <div class="flex-1 flex flex-col gap-6 max-w-2xl animate-fade-in-up">
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#161926] border border-[#1F2438] text-[#38BDF8] text-[11px] font-mono font-bold tracking-wider self-start">
              <span class="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse"></span>
              DEVELOPER CENTER • OPEN PROTOCOL
            </div>

            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              Built for builders. <br/>
              Drop-in <span class="text-[#38BDF8]">OpenAI parity</span>.
            </h1>

            <p class="text-sm sm:text-base text-[#8E98B0] leading-relaxed">
              Standardize your model stack with one universal endpoint. No proprietary SDK lock-in: continue using official OpenAI or Anthropic libraries by swapping just your <code class="text-white">baseURL</code>.
            </p>

            <div class="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="/docs#quickstart"
                data-link
                class="px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-[#07080B] text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>5-Minute Quickstart</span>
                <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </a>
              <a
                href="/app/playground"
                data-link
                class="px-6 py-3 rounded-full bg-[#161926] hover:bg-[#1F2438] text-white border border-[#1F2438] hover:border-[#38BDF8]/40 text-xs font-semibold transition-all inline-flex items-center gap-2"
              >
                <span>Interactive Playground</span>
                <svg class="w-3.5 h-3.5 text-[#8E98B0]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
              </a>
            </div>

            <!-- Install One-Liner Box -->
            <div class="p-3 bg-[#10121A] border border-[#1F2438] rounded-xl flex items-center justify-between text-xs font-mono max-w-lg mt-2">
              <div class="flex items-center gap-2 truncate">
                <span class="text-[#38BDF8] select-none">$</span>
                <span id="install-cmd-text" class="text-white select-all">npm install @unillm/sdk</span>
              </div>
              <button id="copy-install-btn" class="px-3 py-1 bg-[#161926] hover:bg-[#1E2235] text-[#8E98B0] hover:text-white rounded-lg border border-[#1F2438] text-[10px] transition-colors shrink-0">
                Copy
              </button>
            </div>
          </div>

          <!-- Hero Right: Live Interactive Terminal Proxy -->
          <div class="flex-1 w-full max-w-lg lg:max-w-none rounded-2xl border border-[#1F2438] bg-[#10121A] p-5 shadow-2xl relative overflow-hidden font-mono text-xs">
            <div class="flex items-center justify-between pb-3 mb-4 border-b border-[#1F2438] text-[11px] text-[#8E98B0]">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-rose-500/80"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-amber-500/80"></span>
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/80"></span>
                <span class="text-white font-medium ml-2">Live Gateway Proxy Tester</span>
              </div>
              <button id="dev-execute-btn" class="px-3 py-1 rounded bg-[#38BDF8] hover:bg-[#0EA5E9] text-[#07080B] font-bold text-[10px] transition-colors">
                Run Request &rarr;
              </button>
            </div>

            <!-- Inbound Request Preview -->
            <div class="space-y-3">
              <div class="p-3 bg-[#0A0C13] rounded-xl border border-[#1F2438]">
                <div class="text-[#8E98B0] text-[10px] mb-1">INBOUND REQUEST:</div>
                <div class="text-[#38BDF8] font-bold">curl -X POST https://api.unillm.io/v1/chat/completions \\</div>
                <div class="text-white pl-4">-H "Authorization: Bearer unillm_live_..." \\</div>
                <div class="text-white pl-4">-d '{"model":"openai/gpt-4o","stream":true}'</div>
              </div>

              <!-- Live Execution Output Box -->
              <div class="p-3 bg-[#07080B] rounded-xl border border-[#1F2438] h-40 overflow-y-auto space-y-1 text-[11px]" id="dev-terminal-stream">
                <div class="text-[#8E98B0]">[SYSTEM] Proxy ready. Click "Run Request" to stream tokens.</div>
              </div>
            </div>
          </div>
        </section>

        <!-- =========================================================
             2. MULTI-LANGUAGE SDK QUICKSTARTS (EDITORIAL TABS)
        ========================================================= -->
        <section class="reveal-on-scroll flex flex-col gap-8">
          <div class="flex flex-col gap-2">
            <span class="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">Multi-Language Ecosystem</span>
            <h2 class="text-3xl font-bold tracking-tight text-white">
              Official SDK libraries and community integrations
            </h2>
            <p class="text-xs sm:text-sm text-[#8E98B0]">
              First-class typed support for modern edge runtimes and standard AI frameworks.
            </p>
          </div>

          <!-- Language Selector Bar -->
          <div class="flex items-center gap-2 p-1.5 rounded-xl bg-[#10121A] border border-[#1F2438] max-w-xl" id="sdk-tabs">
            <button data-sdk="ts" class="sdk-tab-btn flex-1 py-2 rounded-lg text-xs font-bold transition-all bg-[#161926] text-white border border-[#38BDF8]">
              TypeScript
            </button>
            <button data-sdk="py" class="sdk-tab-btn flex-1 py-2 rounded-lg text-xs font-bold transition-all text-[#8E98B0] hover:text-white hover:bg-[#161926]">
              Python
            </button>
            <button data-sdk="go" class="sdk-tab-btn flex-1 py-2 rounded-lg text-xs font-bold transition-all text-[#8E98B0] hover:text-white hover:bg-[#161926]">
              Go
            </button>
            <button data-sdk="curl" class="sdk-tab-btn flex-1 py-2 rounded-lg text-xs font-bold transition-all text-[#8E98B0] hover:text-white hover:bg-[#161926]">
              cURL
            </button>
          </div>

          <!-- Code Display Container -->
          <div class="rounded-2xl border border-[#1F2438] bg-[#10121A] p-6 lg:p-8 shadow-2xl flex flex-col gap-4 font-mono text-xs">
            <div class="flex items-center justify-between pb-3 border-b border-[#1F2438] text-[11px]">
              <span id="sdk-code-heading" class="text-white font-semibold">Node.js / TypeScript SDK Quickstart</span>
              <button id="sdk-copy-code-btn" class="px-3 py-1 bg-[#161926] hover:bg-[#1E2235] text-[#8E98B0] hover:text-white rounded-lg border border-[#1F2438] transition-colors">
                Copy Code
              </button>
            </div>
            <pre class="overflow-x-auto text-[#8E98B0] leading-relaxed text-[11px] p-2" id="sdk-code-block"><code>import { UniLLM } from '@unillm/sdk';

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
        <section class="reveal-on-scroll flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <span class="text-xs font-mono font-bold text-[#38BDF8] uppercase tracking-wider">Gateway Protocol</span>
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Specialized request headers for runtime control
            </h2>
            <p class="text-xs text-[#8E98B0]">
              Pass standard HTTP headers to control caching, automated retry policies, and fallback order per request.
            </p>
          </div>

          <div class="rounded-2xl border border-[#1F2438] bg-[#10121A] overflow-hidden font-mono text-xs select-text">
            <div class="overflow-x-auto">
              <table class="w-full text-left">
                <thead>
                  <tr class="border-b border-[#1F2438] bg-[#0A0C13] text-[#8E98B0] text-[10px] uppercase tracking-wider">
                    <th class="px-6 py-4">HTTP Header</th>
                    <th class="px-6 py-4">Type</th>
                    <th class="px-6 py-4">Description</th>
                    <th class="px-6 py-4">Example Value</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#1F2438]/70 text-[#8E98B0]">
                  <tr class="hover:bg-[#161926]/40 transition-colors">
                    <td class="px-6 py-3.5 text-[#38BDF8] font-bold">x-unillm-fallback</td>
                    <td class="px-6 py-3.5">string</td>
                    <td class="px-6 py-3.5 font-sans">Comma-separated backup model identifiers to execute on 429/5xx</td>
                    <td class="px-6 py-3.5 text-white">claude-3-5-sonnet,llama-3</td>
                  </tr>
                  <tr class="hover:bg-[#161926]/40 transition-colors">
                    <td class="px-6 py-3.5 text-[#38BDF8] font-bold">x-unillm-cache</td>
                    <td class="px-6 py-3.5">boolean</td>
                    <td class="px-6 py-3.5 font-sans">Enable or disable vector semantic caching for the query</td>
                    <td class="px-6 py-3.5 text-white">true</td>
                  </tr>
                  <tr class="hover:bg-[#161926]/40 transition-colors">
                    <td class="px-6 py-3.5 text-[#38BDF8] font-bold">x-unillm-guardrails</td>
                    <td class="px-6 py-3.5">string</td>
                    <td class="px-6 py-3.5 font-sans">Enforce automated PII stripping and toxicity filtering</td>
                    <td class="px-6 py-3.5 text-white">pii-redact,toxicity-block</td>
                  </tr>
                  <tr class="hover:bg-[#161926]/40 transition-colors">
                    <td class="px-6 py-3.5 text-[#38BDF8] font-bold">x-unillm-timeout</td>
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
        <section class="reveal-on-scroll rounded-2xl bg-gradient-to-b from-[#10121A] to-[#0A0C13] border border-[#1F2438] p-8 sm:p-12 text-center flex flex-col items-center gap-6">
          <div class="max-w-xl flex flex-col gap-2">
            <h2 class="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Start building in the model playground
            </h2>
            <p class="text-xs sm:text-sm text-[#8E98B0]">
              Test real prompts, inspect token latency, and compare model responses side by side.
            </p>
          </div>

          <div class="flex flex-wrap items-center justify-center gap-4">
            <a
              href="/app/playground"
              data-link
              class="px-6 py-3 rounded-full bg-white hover:bg-slate-200 text-[#07080B] text-xs font-bold transition-all shadow-md inline-flex items-center gap-2"
            >
              <span>Open Playground</span>
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </a>
            <a
              href="/docs"
              data-link
              class="px-6 py-3 rounded-full bg-[#161926] hover:bg-[#1F2438] text-white border border-[#1F2438] text-xs font-semibold transition-all"
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
      <div class="text-[#38BDF8]">[PROXY] Connecting to global edge mesh (Washington DC)...</div>
      <div class="text-[#8E98B0]">[AUTH] API Key verified. Tenant: Production Workspace</div>
      <div class="text-[#8E98B0]">[CACHE] Vector lookup miss (1.1ms). Dispatching to openai/gpt-4o...</div>
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
        b.className = "sdk-tab-btn flex-1 py-2 rounded-lg text-xs font-bold transition-all text-[#8E98B0] hover:text-white hover:bg-[#161926]";
      });
      btn.className = "sdk-tab-btn flex-1 py-2 rounded-lg text-xs font-bold transition-all bg-[#161926] text-white border border-[#38BDF8]";

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
