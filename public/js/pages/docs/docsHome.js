// DOCS PAGE: docsHome (Clean, Spacious Developer Documentation)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";
import { icons } from "../../icons.js?v=2";

export function docsHome() {
  return `
    <div class="flex flex-col gap-12 font-sans select-text pb-24 text-[#F2EFE8]">
      
      <!-- Top Documentation Header & Search -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[rgba(242,239,232,0.12)]">
        <div class="flex flex-col gap-1">
          <div class="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#141615] border border-[rgba(242,239,232,0.12)] text-[10px] font-mono tracking-wider text-[#42D6A4] uppercase self-start">
            <span>Core Documentation</span>
          </div>
          <h1 class="font-sans font-extrabold text-3xl sm:text-4xl text-[#F2EFE8] tracking-[-0.03em]">
            Developer Documentation
          </h1>
          <p class="text-xs sm:text-sm text-[#A6A39C]">Everything you need to connect applications and route requests across 50+ frontier AI models.</p>
        </div>

        <div class="relative w-full sm:w-72">
          <svg class="w-4 h-4 text-[#A6A39C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
          </svg>
          <input
            type="text"
            id="docs-top-search"
            placeholder="Filter topics (Quickstart, Auth...)"
            class="w-full pl-9 pr-10 py-2 rounded-lg bg-[#141615] border border-[rgba(242,239,232,0.12)] text-xs text-[#F2EFE8] placeholder-[#A6A39C]/60 outline-none focus:border-[#42D6A4] transition-colors"
          />
          <kbd class="absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-[#1A1D1B] border border-[rgba(242,239,232,0.12)] text-[9px] font-mono text-[#A6A39C]">⌘K</kbd>
        </div>
      </div>

      <!-- SECTION 1: QUICKSTART -->
      <section id="quickstart" class="flex flex-col gap-5 scroll-mt-24">
        <div class="flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <span class="text-[10px] font-mono uppercase text-[#FF7849] font-bold tracking-wider">STEP 01</span>
            <span class="text-xs text-[#A6A39C]">• Drop-in replacement</span>
          </div>
          <h2 class="font-sans font-bold text-2xl text-[#F2EFE8]">Quickstart & Ingress Endpoint</h2>
          <p class="text-xs sm:text-sm text-[#A6A39C] leading-relaxed">
            UniLLM strictly implements the standard OpenAI v1 wire format. Point your existing official SDK (Python, Node.js, cURL) to UniLLM by changing <code class="text-[#F2EFE8] font-mono text-[12px] bg-[#141615] px-1.5 py-0.5 rounded border border-[rgba(242,239,232,0.1)]">baseURL</code> to <code class="text-[#42D6A4] font-mono text-[12px] bg-[#141615] px-1.5 py-0.5 rounded border border-[rgba(242,239,232,0.1)]">https://api.unillm.com/v1</code>.
          </p>
        </div>

        <!-- Code Block Container -->
        <div class="rounded-xl border border-[rgba(242,239,232,0.12)] bg-[#141615] overflow-hidden">
          <div class="flex items-center justify-between px-4 py-2.5 bg-[#0B0C0D] border-b border-[rgba(242,239,232,0.1)] font-mono text-xs">
            <div class="flex items-center gap-2" id="docs-lang-tabs">
              <button data-lang="python" class="docs-lang-btn px-3 py-1 rounded text-xs font-mono font-bold transition-colors bg-[#FF7849] text-[#0B0C0D] cursor-pointer">
                Python
              </button>
              <button data-lang="javascript" class="docs-lang-btn px-3 py-1 rounded text-xs font-mono text-[#A6A39C] hover:text-white transition-colors cursor-pointer">
                Node.js
              </button>
              <button data-lang="curl" class="docs-lang-btn px-3 py-1 rounded text-xs font-mono text-[#A6A39C] hover:text-white transition-colors cursor-pointer">
                cURL
              </button>
              <button data-lang="rest" class="docs-lang-btn px-3 py-1 rounded text-xs font-mono text-[#A6A39C] hover:text-white transition-colors cursor-pointer">
                REST
              </button>
            </div>
            
            <button id="docs-copy-code-btn" class="flex items-center gap-1.5 px-3 py-1 rounded text-xs font-mono text-[#A6A39C] hover:text-white bg-[#141615] border border-[rgba(242,239,232,0.12)] transition-colors cursor-pointer">
              Copy
            </button>
          </div>

          <!-- Code Display Box -->
          <pre class="p-5 overflow-x-auto font-mono text-[12px] leading-relaxed text-[#F2EFE8] bg-[#0B0C0D]" id="docs-code-snippet"><code>from openai import OpenAI

# Initialize standard client with UniLLM gateway endpoint
client = OpenAI(
    base_url="https://api.unillm.com/v1",
    api_key="YOUR_API_KEY"
)

# Route across any model (Gemini, Claude, GPT-4o, Llama) with 0ms code change
response = client.chat.completions.create(
    model="gemini-3.6-flash",
    messages=[
        {"role": "system", "content": "You are an enterprise AI agent."},
        {"role": "user", "content": "Summarize system ingress performance."}
    ],
    temperature=0.2
)

print(response.choices[0].message.content)</code></pre>
        </div>
      </section>

      <!-- SECTION 2: AUTHENTICATION -->
      <section id="authentication" class="flex flex-col gap-4 pt-8 border-t border-[rgba(242,239,232,0.1)] scroll-mt-24">
        <div class="flex flex-col gap-1">
          <span class="text-[10px] font-mono uppercase text-[#42D6A4] font-bold tracking-wider">SECURITY SPECIFICATION</span>
          <h2 class="font-sans font-bold text-2xl text-[#F2EFE8]">Authentication & Master Tokens</h2>
          <p class="text-xs sm:text-sm text-[#A6A39C] leading-relaxed">
            All API requests must supply your workspace token in the standard HTTP <code class="text-[#F2EFE8] font-mono text-[12px] bg-[#141615] px-1.5 py-0.5 rounded">Authorization: Bearer &lt;TOKEN&gt;</code> header.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs pt-2">
          <div class="p-4 rounded-xl bg-[#141615] border border-[rgba(242,239,232,0.1)] flex flex-col gap-2">
            <div class="text-[#42D6A4] font-bold text-[11px] uppercase">Live Master Tokens</div>
            <p class="text-[#A6A39C] text-[11px] leading-normal">Prefix <code class="text-white font-mono">unillm_live_...</code>. Scoped to workspace spend budgets, model allowlists, and audit logs.</p>
          </div>
          <div class="p-4 rounded-xl bg-[#141615] border border-[rgba(242,239,232,0.1)] flex flex-col gap-2">
            <div class="text-[#FF7849] font-bold text-[11px] uppercase">Tenant Isolation</div>
            <p class="text-[#A6A39C] text-[11px] leading-normal">Tokens enforce zero-retention policies. Provider secrets are encrypted in hardware vaults.</p>
          </div>
        </div>
      </section>

      <!-- SECTION 3: MAKING REQUESTS & ROUTING HEADERS -->
      <section id="making-requests" class="flex flex-col gap-5 pt-8 border-t border-[rgba(242,239,232,0.1)] scroll-mt-24">
        <div class="flex flex-col gap-1">
          <span class="text-[10px] font-mono uppercase text-[#A6A39C] font-bold tracking-wider">CUSTOM ROUTING HEADERS</span>
          <h2 class="font-sans font-bold text-2xl text-[#F2EFE8]">Custom Ingress Control Headers</h2>
          <p class="text-xs sm:text-sm text-[#A6A39C] leading-relaxed">
            Optional HTTP headers allow granular control over fallback providers, caching TTLs, and latency caps without modifying payload JSON.
          </p>
        </div>

        <div class="rounded-xl border border-[rgba(242,239,232,0.12)] bg-[#141615] overflow-hidden">
          <table class="w-full text-left font-mono text-xs">
            <thead class="bg-[#0B0C0D] border-b border-[rgba(242,239,232,0.1)] text-[#A6A39C] text-[10px] uppercase tracking-wider">
              <tr>
                <th class="p-3.5">Header</th>
                <th class="p-3.5">Type</th>
                <th class="p-3.5">Description</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[rgba(242,239,232,0.08)] text-[11px] text-[#A6A39C]">
              <tr>
                <td class="p-3.5 font-bold text-[#F2EFE8]">x-unillm-routing-policy</td>
                <td class="p-3.5 text-[#42D6A4]">string</td>
                <td class="p-3.5">Selects strategy: <code class="text-white">lowest-latency</code>, <code class="text-white">cost-minimum</code>, or <code class="text-white">strict-provider</code>.</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-[#F2EFE8]">x-unillm-fallback-model</td>
                <td class="p-3.5 text-[#42D6A4]">string</td>
                <td class="p-3.5">Specifies designated hot-standby model (e.g., <code class="text-white">claude-3-5-sonnet</code>) on 5xx upstream outage.</td>
              </tr>
              <tr>
                <td class="p-3.5 font-bold text-[#F2EFE8]">x-unillm-cache-ttl</td>
                <td class="p-3.5 text-[#42D6A4]">integer</td>
                <td class="p-3.5">Semantic caching expiration window in seconds. Set <code class="text-white">0</code> to bypass cache.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- SECTION 4: UNIFIED RESPONSE FORMAT -->
      <section id="response-format" class="flex flex-col gap-4 pt-8 border-t border-[rgba(242,239,232,0.1)] scroll-mt-24">
        <div class="flex flex-col gap-1">
          <span class="text-[10px] font-mono uppercase text-[#A6A39C] font-bold tracking-wider">WIRE COMPATIBILITY</span>
          <h2 class="font-sans font-bold text-2xl text-[#F2EFE8]">Normalized Stream Response</h2>
          <p class="text-xs sm:text-sm text-[#A6A39C] leading-relaxed">
            Regardless of whether your request is routed to Google Gemini, OpenAI GPT-4o, or Anthropic Claude, token chunks stream back in the identical Server-Sent Events (SSE) format.
          </p>
        </div>

        <div class="p-4 rounded-xl bg-[#141615] border border-[rgba(242,239,232,0.12)] font-mono text-xs flex flex-col gap-2">
          <div class="text-[#A6A39C] text-[10px] uppercase font-bold">Response Envelope Example</div>
          <pre class="text-[11px] text-[#F2EFE8] overflow-x-auto leading-relaxed"><code>{
  "id": "chatcmpl-unillm-89df2a",
  "object": "chat.completion",
  "created": 1730467200,
  "model": "gemini-3.6-flash",
  "choices": [
    {
      "index": 0,
      "message": { "role": "assistant", "content": "Inference resolved in 38ms." },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 24,
    "completion_tokens": 8,
    "total_tokens": 32
  },
  "x_unillm_telemetry": {
    "hop_latency_ms": 0.78,
    "upstream_latency_ms": 38.2,
    "cost_usd": 0.0000042
  }
}</code></pre>
        </div>
      </section>

    </div>
  `;
}

export function bindDocsHome() {
  const tabs = document.querySelectorAll(".docs-lang-btn");
  const codeBox = document.getElementById("docs-code-snippet");
  const copyBtn = document.getElementById("docs-copy-code-btn");

  const snippets = {
    python: `from openai import OpenAI\n\nclient = OpenAI(\n    base_url="https://api.unillm.com/v1",\n    api_key="YOUR_API_KEY"\n)\n\nresponse = client.chat.completions.create(\n    model="gemini-3.6-flash",\n    messages=[{"role": "user", "content": "Summarize system ingress performance."}]\n)\n\nprint(response.choices[0].message.content)`,
    javascript: `import OpenAI from "openai";\n\nconst client = new OpenAI({\n  baseURL: "https://api.unillm.com/v1",\n  apiKey: process.env.UNILLM_API_KEY\n});\n\nconst completion = await client.chat.completions.create({\n  model: "gemini-3.6-flash",\n  messages: [{ role: "user", content: "Summarize system ingress performance." }]\n});\n\nconsole.log(completion.choices[0].message.content);`,
    curl: `curl https://api.unillm.com/v1/chat/completions \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "model": "gemini-3.6-flash",\n    "messages": [{"role": "user", "content": "Summarize system ingress performance."}]\n  }'`,
    rest: `POST /v1/chat/completions HTTP/1.1\nHost: api.unillm.com\nAuthorization: Bearer YOUR_API_KEY\nContent-Type: application/json\n\n{\n  "model": "gemini-3.6-flash",\n  "messages": [{"role": "user", "content": "Summarize system ingress performance."}]\n}`
  };

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => {
        t.className = "docs-lang-btn px-3 py-1 rounded text-xs font-mono text-[#A6A39C] hover:text-white transition-colors cursor-pointer";
      });
      tab.className = "docs-lang-btn px-3 py-1 rounded text-xs font-mono font-bold transition-colors bg-[#FF7849] text-[#0B0C0D] cursor-pointer";

      const lang = tab.getAttribute("data-lang") || "python";
      if (codeBox) {
        codeBox.querySelector("code").innerText = snippets[lang] || snippets.python;
      }
    });
  });

  copyBtn?.addEventListener("click", () => {
    const text = codeBox?.querySelector("code")?.innerText || "";
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
    copyBtn.innerText = "Copied ✓";
    copyBtn.classList.add("text-[#42D6A4]");
    setTimeout(() => {
      copyBtn.innerText = "Copy";
      copyBtn.classList.remove("text-[#42D6A4]");
    }, 2000);
    components.renderToast("success", "Code snippet copied to clipboard.");
  });
}

export default {
  docsHome,
  bindDocsHome
};
