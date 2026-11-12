// PUBLIC PAGE: Engineering Blog Detail (Obsidian Technical Reader)
import { mockBlogPosts } from "./blog.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

const detailContents = {
  "avoiding-openai-outages-failover": {
    h1: "Multi-Provider Failover Strategies",
    content: `
      <p class="text-[#A1A5AD] leading-relaxed font-normal">
        Modern AI gateways mitigate upstream instability by acting as an intelligent failover proxy. When a remote API provider returns a 5xx gateway error or triggers HTTP 429 rate limits, the gateway catches the event in streaming memory and shifts the load to secondary models (like Anthropic Claude or Google Gemini) in sub-50ms intervals.
      </p>
      
      <h3 class="font-bold text-base text-white mt-8 mb-3" id="failover-mechanics">1. Failover Routing Mechanics</h3>
      <p class="text-[#A1A5AD] leading-relaxed font-normal">
        The gateway maintains active TCP connection pools across provider endpoints. Ingress requests pass through dynamic state machine evaluation:
      </p>
      <ul class="list-disc list-inside flex flex-col gap-2 mt-3 font-normal text-[#A1A5AD] pl-2 font-mono text-xs">
        <li>Continuous socket monitoring with configurable TCP timeout thresholds (e.g., 2500ms).</li>
        <li>Automated upstream response code evaluation (500, 502, 503, 429).</li>
        <li>Instant fallback redirection without disconnecting client HTTP/2 sockets.</li>
      </ul>

      <h3 class="font-bold text-base text-white mt-8 mb-3" id="configuration-example">2. Gateway Configuration Example</h3>
      <p class="text-[#A1A5AD] leading-relaxed font-normal mb-4">
        Below is a declarative failover policy definition configured via standard request headers:
      </p>
      <div class="bg-[#08090B] text-white p-5 rounded-xl font-mono text-[11px] leading-relaxed border border-[#292D34]">
<pre class="overflow-x-auto">{
  "routing_rules": {
    "primary": "openai/gpt-4o",
    "fallbacks": [
      "anthropic/claude-3-5-sonnet",
      "google/gemini-1.5-pro"
    ],
    "timeout_ms": 2500,
    "retry_on_status": [500, 502, 503, 429],
    "circuit_breaker": {
      "consecutive_failures": 3,
      "cooldown_period_sec": 30
    }
  }
}</pre>
      </div>

      <h3 class="font-bold text-base text-white mt-8 mb-3" id="verifying-failover">3. Verifying Failover in Production</h3>
      <p class="text-[#A1A5AD] leading-relaxed font-normal">
        Edge telemetry streams events to the developer console in real time. When failover is triggered, response headers specify the exact upstream provider that satisfied the request:
      </p>
      <div class="p-3 bg-[#08090B] border border-[#292D34] rounded-lg font-mono text-xs text-emerald-400 mt-2">
        x-unillm-routed-model: anthropic/claude-3-5-sonnet (failover activated from openai/gpt-4o)
      </div>
    `
  },
  "semantic-caching-reduce-llm-costs": {
    h1: "Halving Your API Costs with Local Semantic Caching",
    content: `
      <p class="text-[#A1A5AD] leading-relaxed font-normal">
        Repetitive inference calls consume budget unnecessarily. Standard exact-match string caches fail because user phrasing variations produce different hash keys. Semantic vector caching solves this by parsing embedding cosine distance.
      </p>
      
      <h3 class="font-bold text-base text-white mt-8 mb-3" id="cache-inner-workings">1. How Semantic Vector Caching Works</h3>
      <p class="text-[#A1A5AD] leading-relaxed font-normal">
        The gateway computes an embedding for the prompt and executes an approximate nearest neighbor search:
      </p>
      <ul class="list-disc list-inside flex flex-col gap-2 mt-3 font-normal text-[#A1A5AD] pl-2 font-mono text-xs">
        <li>Prompt is vectorized via lightweight edge embedding models in under 2ms.</li>
        <li>Cosine similarity is evaluated against cached vector records in in-memory Redis index.</li>
        <li>If similarity exceeds threshold (e.g. >= 0.95), the gateway returns the cached token stream directly.</li>
      </ul>

      <h3 class="font-bold text-base text-white mt-8 mb-3" id="cache-advantages">2. Latency and Budget Advantages</h3>
      <p class="text-[#A1A5AD] leading-relaxed font-normal">
        A semantic cache hit resolves in under 10ms compared to 400ms+ for remote model invocation. It incurs \$0.00 in upstream token fees, delivering significant cost reduction on frequent queries.
      </p>
    `
  },
  "model-context-protocol-mcp-guide": {
    h1: "First Steps with MCP: Building Custom Tool Integrations",
    content: `
      <p class="text-[#A1A5AD] leading-relaxed font-normal">
        Model Context Protocol (MCP) normalizes tool integrations for AI models and multi-agent systems. It allows LLMs to query databases, invoke local operating system tools, or execute scripts via a standardized protocol.
      </p>
      
      <h3 class="font-bold text-base text-white mt-8 mb-3" id="mcp-protocol">1. The MCP Tool Schema</h3>
      <p class="text-[#A1A5AD] leading-relaxed font-normal">
        MCP tools define capabilities and schemas in standardized JSON format, enabling unified model consumption across OpenAI, Claude, and local open-weights deployments.
      </p>
    `
  }
};

export function blogDetail() {
  const path = window.location.pathname;
  const parts = path.split("/");
  const blogId = parts[parts.length - 1];

  const meta = mockBlogPosts.find(p => p.id === blogId) || mockBlogPosts[0];
  const detail = detailContents[meta.id] || detailContents[mockBlogPosts[0].id];
  const related = mockBlogPosts.filter(p => p.id !== meta.id);

  return `
    <div class="relative overflow-hidden w-full font-sans bg-[#08090B] text-[#F5F5F5]">
      
      <!-- Top subtle vignette -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-b from-white/[0.04] to-transparent blur-[120px] pointer-events-none -z-10"></div>

      <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <section class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <!-- LEFT SIDEBAR: Table of Contents & Back link -->
          <div class="lg:col-span-3 flex flex-col gap-8 sticky top-24 select-none">
            <a href="/blog" data-link class="text-white hover:text-neutral-300 font-semibold text-xs flex items-center gap-1.5 transition-colors font-mono">
              <span>&larr;</span>
              <span>Back to all logs</span>
            </a>

            <div class="flex flex-col gap-3 border-l border-[#292D34] pl-4 font-mono text-xs">
              <span class="text-[10px] uppercase tracking-wider text-[#A1A5AD] font-bold">On this page</span>
              <ul class="flex flex-col gap-2.5 text-[#A1A5AD]">
                <li><a href="#introduction" class="hover:text-white transition-colors">Introduction</a></li>
                <li><a href="#failover-mechanics" class="hover:text-white transition-colors">1. Mechanics</a></li>
                <li><a href="#configuration-example" class="hover:text-white transition-colors">2. Configuration</a></li>
                <li><a href="#verifying-failover" class="hover:text-white transition-colors">3. Verification</a></li>
              </ul>
            </div>
          </div>

          <!-- MIDDLE CONTENT: Dynamic Article Content -->
          <div class="lg:col-span-6 bg-[#101216] border border-[#292D34] rounded-xl p-8 sm:p-10 shadow-2xl">
            <div class="flex flex-col gap-4">
              <!-- Eyebrow -->
              <div class="flex items-center gap-2 text-[10px] font-mono">
                <span class="px-2.5 py-0.5 rounded bg-[#15181D] border border-[#292D34] text-white uppercase">${meta.category}</span>
                <span class="text-white/20">•</span>
                <span class="text-[#A1A5AD]">${meta.date}</span>
                <span class="text-white/20">•</span>
                <span class="text-[#A1A5AD]">${meta.readTime}</span>
              </div>

              <h1 class="font-sans font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight leading-tight mt-1">
                ${detail.h1}
              </h1>

              <!-- Author details -->
              <div class="flex items-center gap-3 py-4 border-y border-[#292D34] my-2 select-none font-mono">
                <div class="w-8 h-8 rounded-lg ${meta.avatarBg} flex items-center justify-center font-bold text-xs">
                  ${meta.author.substring(0, 2).toUpperCase()}
                </div>
                <div class="flex flex-col text-xs">
                  <span class="font-bold text-white font-sans">${meta.author}</span>
                  <span class="text-[10px] text-[#A1A5AD]">${meta.role}</span>
                </div>
              </div>

              <!-- Main Content Body -->
              <div class="mt-4 flex flex-col gap-4 text-xs sm:text-sm text-[#A1A5AD] leading-relaxed" id="introduction">
                ${detail.content}
              </div>

            </div>
          </div>

          <!-- RIGHT SIDEBAR: Related Articles -->
          <div class="lg:col-span-3 flex flex-col gap-6 sticky top-24 select-none">
            <span class="text-[10px] font-mono uppercase tracking-wider text-[#A1A5AD] font-bold border-b border-[#292D34] pb-2">Related Articles</span>
            <div class="flex flex-col gap-4">
              ${related.map(p => `
                <div class="flex flex-col gap-1 p-4 rounded-lg bg-[#101216] border border-[#292D34] hover:border-white/30 transition-all">
                  <span class="text-[10px] font-mono text-[#A1A5AD] uppercase">${p.category}</span>
                  <a href="/blog/${p.id}" data-link class="font-sans font-semibold text-white hover:text-neutral-300 transition-colors text-xs leading-snug">
                    ${p.title}
                  </a>
                  <p class="text-[11px] text-[#A1A5AD] line-clamp-2 mt-1">${p.excerpt}</p>
                </div>
              `).join("")}
            </div>
          </div>

        </section>
      </div>
    </div>
  `;
}

export function bindBlogDetail() {
  const tocLinks = document.querySelectorAll('a[href^="#"]');
  tocLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href")?.substring(1);
      const targetEl = targetId ? document.getElementById(targetId) : null;
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
}

export default {
  blogDetail,
  bindBlogDetail
};
