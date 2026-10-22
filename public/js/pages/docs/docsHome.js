// DOCS PAGE: docsHome (Redesigned for Screen 09 Dark Cinematic Documentation)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";
import { icons } from "../../icons.js?v=2";

export function docsHome() {
  return `
    <div class="flex flex-col gap-8 font-sans select-text pb-20 animate-fade-in-up text-white max-w-7xl mx-auto">
      
      <!-- Top Documentation Header & Search (Screen 09) -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#1F2438]">
        <div>
          <h1 class="font-sans font-bold text-3xl text-white tracking-tight">Documentation</h1>
          <p class="text-xs text-[#8E98B0]">Everything you need to start building with UniLLM.</p>
        </div>

        <!-- Documentation Search Bar with ⌘K (Screen 09) -->
        <div class="relative w-full sm:w-80">
          <svg class="w-4 h-4 text-[#8E98B0] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <input
            type="text"
            placeholder="Search documentation..."
            class="w-full pl-10 pr-12 py-2 rounded-xl bg-[#10121A] border border-[#1F2438] text-xs text-white placeholder-[#8E98B0]/60 outline-none focus:border-[#38BDF8] transition-colors"
          />
          <kbd class="absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 rounded bg-[#161926] border border-[#1F2438] text-[10px] font-mono text-[#8E98B0]">⌘K</kbd>
        </div>
      </div>

      <!-- Main Docs Layout (Left Tree + Content) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        <!-- Left Navigation Tree (Screen 09) -->
        <div class="lg:col-span-3 rounded-xl bg-[#10121A] border border-[#1F2438] p-4 flex flex-col gap-6 select-none sticky top-24">
          
          <!-- Introduction Group -->
          <div class="flex flex-col gap-1.5">
            <span class="text-[10px] font-mono uppercase tracking-widest text-[#8E98B0] px-2 mb-1">Introduction</span>
            <a href="#quickstart" class="docs-nav-link active flex items-center px-3 py-1.5 rounded-lg bg-[#161926] border border-[#1F2438] text-xs font-medium text-white transition-colors">
              Quickstart
            </a>
            <a href="#authentication" class="docs-nav-link flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-[#8E98B0] hover:text-white hover:bg-[#161926]/50 transition-colors">
              Authentication
            </a>
            <a href="#making-requests" class="docs-nav-link flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-[#8E98B0] hover:text-white hover:bg-[#161926]/50 transition-colors">
              Making Requests
            </a>
            <a href="#response-format" class="docs-nav-link flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-[#8E98B0] hover:text-white hover:bg-[#161926]/50 transition-colors">
              Response Format
            </a>
          </div>

          <!-- Models Group -->
          <div class="flex flex-col gap-1.5">
            <span class="text-[10px] font-mono uppercase tracking-widest text-[#8E98B0] px-2 mb-1">Endpoints</span>
            <a href="/models" data-link class="docs-nav-link flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium text-[#8E98B0] hover:text-white hover:bg-[#161926]/50 transition-colors">
              <span>Models</span>
              <span class="text-[10px] text-[#38BDF8] font-mono">50+</span>
            </a>
            <a href="#errors" class="docs-nav-link flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-[#8E98B0] hover:text-white hover:bg-[#161926]/50 transition-colors">
              Errors
            </a>
            <a href="#rate-limits" class="docs-nav-link flex items-center px-3 py-1.5 rounded-lg text-xs font-medium text-[#8E98B0] hover:text-white hover:bg-[#161926]/50 transition-colors">
              Rate Limits
            </a>
          </div>

        </div>

        <!-- Right Documentation Content (Screen 09) -->
        <div class="lg:col-span-9 flex flex-col gap-10">
          
          <!-- QUICKSTART SECTION (Screen 09) -->
          <section id="quickstart" class="rounded-2xl bg-[#10121A] border border-[#1F2438] p-6 sm:p-8 flex flex-col gap-6 shadow-sm">
            <div class="flex flex-col gap-1">
              <h2 class="font-sans font-bold text-xl text-white">Quickstart</h2>
              <p class="text-xs text-[#8E98B0]">Get up and running with UniLLM in minutes.</p>
            </div>

            <!-- Code Editor Box (Screen 09) -->
            <div class="rounded-xl border border-[#1F2438] bg-[#0A0C13] overflow-hidden shadow-xl">
              <!-- Code Toolbar -->
              <div class="flex items-center justify-between px-4 py-2.5 bg-[#0D0E15] border-b border-[#1F2438]">
                <!-- Language Selector Tabs (Screen 09: Python, JavaScript, cURL, REST) -->
                <div class="flex items-center gap-1.5" id="docs-lang-tabs">
                  <button data-lang="python" class="docs-lang-btn px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors bg-[#161926] text-white border border-[#1F2438]">
                    Python
                  </button>
                  <button data-lang="javascript" class="docs-lang-btn px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors text-[#8E98B0] hover:text-white">
                    JavaScript
                  </button>
                  <button data-lang="curl" class="docs-lang-btn px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors text-[#8E98B0] hover:text-white">
                    cURL
                  </button>
                  <button data-lang="rest" class="docs-lang-btn px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors text-[#8E98B0] hover:text-white">
                    REST
                  </button>
                </div>
                
                <button id="docs-copy-code-btn" class="flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-mono text-[#8E98B0] hover:text-white bg-[#161926] border border-[#1F2438] transition-colors">
                  <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                  <span>Copy</span>
                </button>
              </div>

              <!-- Code Snippet Body (Exact matching Python snippet from Screen 09) -->
              <div class="p-5 font-mono text-xs leading-relaxed text-[#8E98B0] overflow-x-auto">
                <pre><code id="docs-code-snippet"><span class="text-[#818CF8]">from</span> unillm <span class="text-[#818CF8]">import</span> UniLLM

client = UniLLM(api_key=<span class="text-emerald-400">"YOUR_API_KEY"</span>)
response = client.chat.completions.create(
    model=<span class="text-emerald-400">"auto"</span>,
    messages=[
        {<span class="text-emerald-400">"role"</span>: <span class="text-emerald-400">"user"</span>, <span class="text-emerald-400">"content"</span>: <span class="text-emerald-400">"Explain quantum computing in simple terms."</span>}
    ]
)
<span class="text-[#38BDF8]">print</span>(response.choices[<span class="text-amber-400">0</span>].message.content)</code></pre>
              </div>
            </div>

            <!-- Steps list -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#1F2438]">
              <div class="flex flex-col gap-1.5 p-3.5 rounded-xl bg-[#161926]/40 border border-[#1F2438]">
                <span class="text-xs font-mono font-bold text-[#38BDF8]">1. Install SDK</span>
                <p class="text-xs text-[#8E98B0]">Install via pip or npm with zero additional runtime dependencies.</p>
              </div>
              <div class="flex flex-col gap-1.5 p-3.5 rounded-xl bg-[#161926]/40 border border-[#1F2438]">
                <span class="text-xs font-mono font-bold text-[#38BDF8]">2. Set API Key</span>
                <p class="text-xs text-[#8E98B0]">Generate a key in your dashboard and pass it to the client.</p>
              </div>
              <div class="flex flex-col gap-1.5 p-3.5 rounded-xl bg-[#161926]/40 border border-[#1F2438]">
                <span class="text-xs font-mono font-bold text-[#38BDF8]">3. Route Calls</span>
                <p class="text-xs text-[#8E98B0]">Use 'auto' for intelligent routing or specify any frontier model name.</p>
              </div>
            </div>
          </section>

          <!-- AUTHENTICATION SECTION -->
          <section id="authentication" class="rounded-2xl bg-[#10121A] border border-[#1F2438] p-6 sm:p-8 flex flex-col gap-4">
            <h2 class="font-sans font-bold text-xl text-white">Authentication</h2>
            <p class="text-xs text-[#8E98B0] leading-relaxed">
              UniLLM authenticates API requests using Bearer authentication tokens. Include your API key in the <code class="px-1.5 py-0.5 rounded bg-[#161926] font-mono text-xs text-[#38BDF8] border border-[#1F2438]">Authorization</code> header:
            </p>
            <div class="p-3.5 rounded-xl bg-[#0A0C13] border border-[#1F2438] font-mono text-xs text-emerald-400">
              Authorization: Bearer sk-unillm-live-cyb840s
            </div>
          </section>

          <!-- ERROR HANDLING SECTION -->
          <section id="errors" class="rounded-2xl bg-[#10121A] border border-[#1F2438] p-6 sm:p-8 flex flex-col gap-4">
            <h2 class="font-sans font-bold text-xl text-white">Error Handling</h2>
            <p class="text-xs text-[#8E98B0] leading-relaxed">
              UniLLM normalizes all upstream error formats into clean, predictable OpenAI-compatible error payloads.
            </p>
            <div class="overflow-x-auto rounded-xl border border-[#1F2438]">
              <table class="w-full text-left text-xs font-mono">
                <thead class="bg-[#0D0E15] text-[#8E98B0] border-b border-[#1F2438]">
                  <tr>
                    <th class="p-3">Status</th>
                    <th class="p-3 font-sans">Meaning</th>
                    <th class="p-3 font-sans">Automated Gateway Action</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#1F2438] text-[#8E98B0]">
                  <tr>
                    <td class="p-3 text-emerald-400 font-bold">200</td>
                    <td class="p-3 font-sans text-white">Success</td>
                    <td class="p-3 font-sans">Request processed successfully</td>
                  </tr>
                  <tr>
                    <td class="p-3 text-amber-400 font-bold">429</td>
                    <td class="p-3 font-sans text-white">Rate Limit Exceeded</td>
                    <td class="p-3 font-sans">Automatic instant failover to secondary provider</td>
                  </tr>
                  <tr>
                    <td class="p-3 text-rose-400 font-bold">500 / 503</td>
                    <td class="p-3 font-sans text-white">Provider Outage</td>
                    <td class="p-3 font-sans">Transparent fallback to healthy alternative model</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

        </div>

      </div>

    </div>
  `;
}

export function bindDocsHome() {
  const langTabs = document.querySelectorAll(".docs-lang-btn");
  const codeSnippet = document.getElementById("docs-code-snippet");
  const copyBtn = document.getElementById("docs-copy-code-btn");

  const snippets = {
    python: `<span class="text-[#818CF8]">from</span> unillm <span class="text-[#818CF8]">import</span> UniLLM

client = UniLLM(api_key=<span class="text-emerald-400">"YOUR_API_KEY"</span>)
response = client.chat.completions.create(
    model=<span class="text-emerald-400">"auto"</span>,
    messages=[
        {<span class="text-emerald-400">"role"</span>: <span class="text-emerald-400">"user"</span>, <span class="text-emerald-400">"content"</span>: <span class="text-emerald-400">"Explain quantum computing in simple terms."</span>}
    ]
)
<span class="text-[#38BDF8]">print</span>(response.choices[<span class="text-amber-400">0</span>].message.content)`,
    javascript: `<span class="text-[#818CF8]">import</span> { UniLLM } <span class="text-[#818CF8]">from</span> <span class="text-emerald-400">"@unillm/sdk"</span>;

<span class="text-[#818CF8]">const</span> client = <span class="text-[#818CF8]">new</span> UniLLM({ apiKey: <span class="text-emerald-400">"YOUR_API_KEY"</span> });
<span class="text-[#818CF8]">const</span> response = <span class="text-[#818CF8]">await</span> client.chat.completions.create({
  model: <span class="text-emerald-400">"auto"</span>,
  messages: [{ role: <span class="text-emerald-400">"user"</span>, content: <span class="text-emerald-400">"Explain quantum computing in simple terms."</span> }]
});
console.log(response.choices[<span class="text-amber-400">0</span>].message.content);`,
    curl: `<span class="text-[#38BDF8]">curl</span> https://api.unillm.com/v1/chat/completions \\
  -H <span class="text-emerald-400">"Authorization: Bearer YOUR_API_KEY"</span> \\
  -H <span class="text-emerald-400">"Content-Type: application/json"</span> \\
  -d '{
    <span class="text-[#818CF8]">"model"</span>: <span class="text-emerald-400">"auto"</span>,
    <span class="text-[#818CF8]">"messages"</span>: [{"role": <span class="text-emerald-400">"user"</span>, "content": <span class="text-emerald-400">"Explain quantum computing in simple terms."</span>}]
  }'`,
    rest: `<span class="text-[#38BDF8]">POST</span> /v1/chat/completions HTTP/1.1
Host: api.unillm.com
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json

{
  <span class="text-[#818CF8]">"model"</span>: <span class="text-emerald-400">"auto"</span>,
  <span class="text-[#818CF8]">"messages"</span>: [{"role": <span class="text-emerald-400">"user"</span>, "content": <span class="text-emerald-400">"Explain quantum computing."</span>}]
}`
  };

  langTabs.forEach(btn => {
    btn.addEventListener("click", () => {
      langTabs.forEach(b => {
        b.className = "docs-lang-btn px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors text-[#8E98B0] hover:text-white";
      });
      btn.className = "docs-lang-btn px-3 py-1 rounded-md text-xs font-mono font-medium transition-colors bg-[#161926] text-white border border-[#1F2438]";
      
      const lang = btn.getAttribute("data-lang");
      if (codeSnippet && snippets[lang]) {
        codeSnippet.innerHTML = snippets[lang];
      }
    });
  });

  copyBtn?.addEventListener("click", () => {
    const rawText = codeSnippet.innerText;
    navigator.clipboard.writeText(rawText).then(() => {
      copyBtn.innerHTML = `<span>✓</span> Copied!`;
      setTimeout(() => {
        copyBtn.innerHTML = `
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
          <span>Copy</span>
        `;
      }, 2000);
    });
  });
}

export default {
  docsHome,
  bindDocsHome
};
