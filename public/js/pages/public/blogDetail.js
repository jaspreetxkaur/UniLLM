// PUBLIC PAGE: Engineering Blog Detail
import { mockBlogPosts } from "./blog.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

const detailContents = {
  "avoiding-openai-outages-failover": {
    h1: "Multi-Provider Failover Strategies",
    content: `
      <p class="text-slate-650 leading-relaxed font-semibold">
        Modern AI gateways solve provider instability by acting as an intelligent failover proxy. When a remote API (like OpenAI) goes down, returns a 5xx error, or ratelimits requests (429 status code), the gateway catches it instantly and reroutes the traffic to alternative providers like Anthropic Claude or Google Gemini within milliseconds.
      </p>
      
      <h3 class="font-display font-black text-lg text-slate-900 uppercase mt-8 mb-3" id="failover-mechanics">1. Failover Routing Mechanics</h3>
      <p class="text-slate-600 leading-relaxed font-semibold">
        A primary proxy is configured with a list of backup providers sorted by weight, cost, or geographical latency. The gateway initiates request sequences and monitors connection lifecycles:
      </p>
      <ul class="list-disc list-inside flex flex-col gap-2 mt-3 font-semibold text-slate-650 pl-2">
        <li>Connection monitoring with configurable TCP timeouts (e.g. 5000ms threshold).</li>
        <li>Automatic response scanning for HTTP status logs (503, 502, 429).</li>
        <li>Instant fallback redirection without disconnecting client sockets.</li>
      </ul>

      <h3 class="font-display font-black text-lg text-slate-900 uppercase mt-8 mb-3" id="configuration-example">2. Gateway Configuration Example</h3>
      <p class="text-slate-600 leading-relaxed font-semibold mb-4">
        Below is a standard declarative failover policy definition stashed in the gateway proxy directory:
      </p>
      <div class="bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-[11px] leading-relaxed shadow-inner border border-slate-800">
<pre class="overflow-x-auto">{
  "routing_rules": {
    "openai-gpt4": {
      "primary": "openai/gpt-4o",
      "fallbacks": [
        "anthropic/claude-3-5-sonnet",
        "google/gemini-1.5-pro"
      ],
      "timeout_ms": 4000,
      "retry_on_status": [500, 502, 503, 429],
      "backoff_policy": {
        "type": "exponential",
        "base_ms": 100,
        "max_ms": 1000
      }
    }
  }
}</pre>
      </div>

      <h3 class="font-display font-black text-lg text-slate-900 uppercase mt-8 mb-3" id="verifying-failover">3. Verifying Failover in Production</h3>
      <p class="text-slate-600 leading-relaxed font-semibold">
        Monitoring tools stream proxy logs directly to logging platforms. When failover is triggered, operations logs record the shift in traffic:
      </p>
      <p class="text-slate-600 leading-relaxed font-semibold mt-2">
        By implementing multi-provider routing policy rules, you ensure your platform maintains 99.99% operational uptime even when primary AI APIs suffer outages.
      </p>
    `
  },
  "semantic-caching-reduce-llm-costs": {
    h1: "Halving Your API Costs with Local Semantic Caching",
    content: `
      <p class="text-slate-650 leading-relaxed font-semibold">
        AI model responses can be expensive. Many user requests are repetitive—such as common FAQs, support questions, or identical coding prompt parameters. Standard key-value caches fail because user phrasing varies slightly. Semantic caching solves this by parsing vector distance metrics.
      </p>
      
      <h3 class="font-display font-black text-lg text-slate-900 uppercase mt-8 mb-3" id="cache-inner-workings">1. How Semantic Caching Works</h3>
      <p class="text-slate-600 leading-relaxed font-semibold">
        Instead of matching exact string keys, the gateway computes vector embeddings for incoming prompts:
      </p>
      <ul class="list-disc list-inside flex flex-col gap-2 mt-3 font-semibold text-slate-650 pl-2">
        <li>Incoming query is converted to a vector embedding array.</li>
        <li>The embedding is compared to stashed cache records in a vector index.</li>
        <li>If the distance metric is below the threshold (e.g. Cosine Distance < 0.15), the gateway serves the stashed response instantly.</li>
      </ul>

      <h3 class="font-display font-black text-lg text-slate-900 uppercase mt-8 mb-3" id="cache-advantages">2. Latency and Budget Advantages</h3>
      <p class="text-slate-600 leading-relaxed font-semibold">
        A cache hit resolves in under 15ms compared to 400ms+ for a remote LLM API call. It costs $0.00 in token budgets, providing a 100% budget savings on matched queries.
      </p>

      <h3 class="font-display font-black text-lg text-slate-900 uppercase mt-8 mb-3" id="caching-code">3. Python Gateway Caching Code</h3>
      <p class="text-slate-600 leading-relaxed font-semibold mb-4">
        Below is a mock example of implementing semantic cache evaluations inside a gateway request pipeline:
      </p>
      <div class="bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-[11px] leading-relaxed shadow-inner border border-slate-800">
<pre class="overflow-x-auto">import numpy as np

def check_semantic_cache(prompt_embedding, threshold=0.15):
    # Retrieve stashed cache indexes
    cached_vectors = get_cached_embeddings()
    for cache_id, vector in cached_vectors.items():
        # Compute Cosine Distance
        distance = cosine_distance(prompt_embedding, vector)
        if distance &lt; threshold:
            return get_cached_response(cache_id)
            
    return None # Cache MISS</pre>
      </div>
    `
  },
  "model-context-protocol-mcp-guide": {
    h1: "First Steps with MCP: Building Custom Tool Integrations",
    content: `
      <p class="text-slate-650 leading-relaxed font-semibold">
        Model Context Protocol (MCP) is a standard protocol created to normalize tool integrations for LLMs and swarms. It allows AI models to call local operating system actions, query databases, or execute secure scripts in a uniform format.
      </p>
      
      <h3 class="font-display font-black text-lg text-slate-900 uppercase mt-8 mb-3" id="mcp-protocol">1. The MCP Tool Schema</h3>
      <p class="text-slate-600 leading-relaxed font-semibold">
        MCP tools list functions and parameters in a schema similar to standard JSON schemas, allowing compatible models to call them directly:
      </p>

      <h3 class="font-display font-black text-lg text-slate-900 uppercase mt-8 mb-3" id="mcp-json">2. Sample Tool Declaration</h3>
      <p class="text-slate-600 leading-relaxed font-semibold mb-4">
        Here is a sample tool schema for fetching file details on a local machine:
      </p>
      <div class="bg-slate-900 text-slate-200 p-5 rounded-2xl font-mono text-[11px] leading-relaxed shadow-inner border border-slate-800">
<pre class="overflow-x-auto">{
  "name": "read_local_file",
  "description": "Read file data from the filesystem.",
  "parameters": {
    "type": "object",
    "properties": {
      "path": {
        "type": "string",
        "description": "Absolute path to local target file."
      }
    },
    "required": ["path"]
  }
}</pre>
      </div>

      <h3 class="font-display font-black text-lg text-slate-900 uppercase mt-8 mb-3" id="mcp-integration">3. Gateway MCP Architecture</h3>
      <p class="text-slate-600 leading-relaxed font-semibold">
        By running an MCP server alongside the UniLLM proxy gateway, engineers can expose microservices safely to multiple systems while logging every action taken.
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
    <div class="relative overflow-hidden w-full bg-slate-50/50">
      <div class="relative w-full overflow-hidden">
        <section class="px-6 lg:px-12 py-16 md:py-20 animate-fade-in-up max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          <!-- LEFT SIDEBAR: Table of Contents & Back link -->
          <div class="lg:col-span-3 flex flex-col gap-8 sticky top-24 select-none">
            <a href="/blog" data-link class="text-indigo-650 hover:text-indigo-850 font-bold text-xs flex items-center gap-1">
              &larr; Back to all logs
            </a>

            <div class="flex flex-col gap-4 border-l border-slate-200 pl-4">
              <span class="text-[9px] uppercase tracking-widest text-slate-400 font-bold">On this page</span>
              <ul class="flex flex-col gap-3 text-xs font-semibold text-slate-550">
                <li><a href="#introduction" class="hover:text-indigo-600">Introduction</a></li>
                <li><a href="#failover-mechanics" class="hover:text-indigo-600">1. Inner Mechanics</a></li>
                <li><a href="#configuration-example" class="hover:text-indigo-600">2. Gateway Configuration</a></li>
                <li><a href="#verifying-failover" class="hover:text-indigo-600">3. Verification in Prod</a></li>
              </ul>
            </div>
          </div>

          <!-- MIDDLE CONTENT: Dynamic Article Content -->
          <div class="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div class="flex flex-col gap-4">
              <!-- Eyebrow -->
              <div class="flex items-center gap-2 text-[9px] font-bold text-indigo-600">
                <span class="px-2 py-0.5 border border-indigo-150 rounded bg-indigo-50 uppercase">${meta.category}</span>
                <span>•</span>
                <span class="text-slate-400">${meta.date}</span>
                <span>•</span>
                <span class="text-slate-400">${meta.readTime}</span>
              </div>

              <h1 class="font-display font-black text-3xl sm:text-4xl text-slate-900 uppercase leading-tight mt-1">
                ${detail.h1}
              </h1>

              <!-- Author details -->
              <div class="flex items-center gap-3 py-4 border-y border-slate-100 my-2 select-none">
                <div class="w-9 h-9 rounded-xl ${meta.avatarBg} flex items-center justify-center font-bold font-mono text-xs shadow-xs">
                  ${meta.author.substring(0, 2).toUpperCase()}
                </div>
                <div class="flex flex-col text-xs">
                  <span class="font-bold text-slate-900">${meta.author}</span>
                  <span class="text-[10px] text-slate-450 font-bold">${meta.role}</span>
                </div>
              </div>

              <!-- Main Content Body -->
              <div class="mt-4 flex flex-col gap-5 text-slate-700" id="introduction">
                ${detail.content}
              </div>

            </div>
          </div>

          <!-- RIGHT SIDEBAR: Related Articles -->
          <div class="lg:col-span-3 flex flex-col gap-6 sticky top-24 select-none">
            <h4 class="text-[9px] uppercase tracking-widest text-slate-400 font-bold border-b border-slate-200 pb-2">Related Articles</h4>
            <div class="flex flex-col gap-5">
              ${related.map(p => `
                <div class="flex flex-col gap-1.5 group">
                  <span class="text-[8px] uppercase tracking-wider text-indigo-500 font-bold">${p.category}</span>
                  <a href="/blog/${p.id}" data-link class="font-display font-bold text-slate-900 hover:text-indigo-600 transition-colors uppercase leading-snug text-xs">
                    ${p.title}
                  </a>
                  <p class="text-[10px] text-slate-450 line-clamp-2">${p.excerpt}</p>
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
  // Smooth scroll links inside sidebar
  const tocLinks = document.querySelectorAll('a[href^="#"]');
  tocLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetEl = document.getElementById(targetId);
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
