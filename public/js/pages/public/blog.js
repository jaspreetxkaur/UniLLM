// PUBLIC PAGE: Engineering Blog List (Obsidian Architecture Logs)
import { components } from "../../components.js?v=2";

export const mockBlogPosts = [
  {
    id: "avoiding-openai-outages-failover",
    title: "Architecting High-Availability AI Stack: Multi-Provider Failover Strategies",
    excerpt: "How to configure intelligent proxy fallbacks to avoid downtime when foundation model APIs experience outages or rate limits.",
    category: "Reliability",
    readTime: "5 min read",
    date: "Aug 18, 2026",
    author: "Jaspreet Kaur",
    role: "Infrastructure Lead",
    avatarBg: "bg-white/10 text-white border border-white/20"
  },
  {
    id: "semantic-caching-reduce-llm-costs",
    title: "Halving Your API Costs with Local Semantic Caching",
    excerpt: "Discover how semantic vector embeddings allow the gateway to resolve repetitive questions instantly without invoking remote LLM tokens.",
    category: "Cost Control",
    readTime: "8 min read",
    date: "Jul 29, 2026",
    author: "Alex Mercer",
    role: "Principal Architect",
    avatarBg: "bg-[#697DFF]/20 text-[#697DFF] border border-[#697DFF]/30"
  },
  {
    id: "model-context-protocol-mcp-guide",
    title: "First Steps with MCP: Building Custom Agentic Tool Integrations",
    excerpt: "A practical handbook for configuring Model Context Protocol tool servers to give autonomous AI agents direct capabilities on local systems.",
    category: "MCP & Tools",
    readTime: "6 min read",
    date: "Jun 14, 2026",
    author: "Elena Rostova",
    role: "Systems Architect",
    avatarBg: "bg-[#FF9B72]/20 text-[#FF9B72] border border-[#FF9B72]/30"
  }
];

export function blog() {
  return `
    <div class="relative overflow-hidden w-full font-sans bg-[#0B0C0D] text-[#F2EFE8]">
      
      <!-- Top subtle vignette -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-b from-white/[0.04] to-transparent blur-[120px] pointer-events-none -z-10"></div>

      <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24 flex flex-col gap-12">
        
        <!-- Blog Header -->
        <div class="flex flex-col gap-3 text-left">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141615] border border-[rgba(242,239,232,0.14)] text-[11px] font-mono tracking-wider text-[#A6A39C] uppercase self-start">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Engineering Dispatches</span>
          </div>
          <h1 class="font-sans font-extrabold text-4xl sm:text-5xl text-white tracking-tight">Engineering Logs & Architecture</h1>
          <p class="text-sm text-[#A6A39C] max-w-2xl leading-relaxed">
            Deep dives into AI infrastructure, semantic caching mechanisms, system orchestration, and agent tool architectures.
          </p>
        </div>

        <!-- Category filter list -->
        <div class="flex items-center gap-2 border-b border-[rgba(242,239,232,0.14)] pb-4 overflow-x-auto font-mono text-xs">
          <button class="blog-cat-btn px-4 py-2 bg-white text-black font-semibold rounded-lg transition-all" data-cat="all">All Dispatches</button>
          <button class="blog-cat-btn px-4 py-2 border border-[rgba(242,239,232,0.14)] bg-[#141615] hover:bg-[#1A1D1B] text-[#A6A39C] hover:text-white rounded-lg transition-all" data-cat="Reliability">Reliability</button>
          <button class="blog-cat-btn px-4 py-2 border border-[rgba(242,239,232,0.14)] bg-[#141615] hover:bg-[#1A1D1B] text-[#A6A39C] hover:text-white rounded-lg transition-all" data-cat="Cost Control">Cost Control</button>
          <button class="blog-cat-btn px-4 py-2 border border-[rgba(242,239,232,0.14)] bg-[#141615] hover:bg-[#1A1D1B] text-[#A6A39C] hover:text-white rounded-lg transition-all" data-cat="MCP & Tools">MCP & Tools</button>
        </div>

        <!-- Featured Post Card -->
        <div id="blog-featured-card" class="bg-[#141615] border border-[rgba(242,239,232,0.14)] rounded-xl p-8 flex flex-col lg:flex-row justify-between items-center gap-8 shadow-2xl hover:border-white/30 transition-all group">
          <div class="flex flex-col gap-4 lg:w-1/2">
            <div class="flex items-center gap-3 text-[11px] font-mono">
              <span class="px-2.5 py-0.5 rounded bg-[#1A1D1B] border border-[rgba(242,239,232,0.14)] text-white uppercase">${mockBlogPosts[0].category}</span>
              <span class="text-white/20">•</span>
              <span class="text-[#A6A39C]">${mockBlogPosts[0].readTime}</span>
            </div>
            
            <a href="/blog/${mockBlogPosts[0].id}" data-link class="block">
              <h2 class="font-sans font-bold text-2xl sm:text-3xl text-white group-hover:text-neutral-200 transition-colors leading-tight">
                ${mockBlogPosts[0].title}
              </h2>
            </a>

            <p class="text-xs sm:text-sm text-[#A6A39C] leading-relaxed">
              ${mockBlogPosts[0].excerpt}
            </p>

            <!-- Author card -->
            <div class="flex items-center gap-3 pt-4 border-t border-[rgba(242,239,232,0.14)]">
              <div class="w-8 h-8 rounded-lg ${mockBlogPosts[0].avatarBg} flex items-center justify-center font-bold font-mono text-xs">
                JK
              </div>
              <div class="flex flex-col text-xs font-mono">
                <span class="font-bold text-white font-sans">${mockBlogPosts[0].author}</span>
                <span class="text-[10px] text-[#A6A39C]">${mockBlogPosts[0].role}</span>
              </div>
            </div>
          </div>

          <!-- Side Terminal Preview -->
          <div class="lg:w-1/2 w-full bg-[#0B0C0D] border border-[rgba(242,239,232,0.14)] rounded-xl p-6 flex flex-col justify-between font-mono text-xs">
            <div class="flex justify-between items-center text-[#A6A39C] text-[10px] pb-3 border-b border-[rgba(242,239,232,0.14)]">
              <span class="flex items-center gap-2">
                <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>GATEWAY_STATUS: LOGGED</span>
              </span>
              <span>v2.4_EDGE</span>
            </div>
            <div class="space-y-1.5 py-4 text-[11px]">
              <div class="text-white font-semibold">$ unillm telemetry --live</div>
              <div class="text-[#A6A39C]">&gt; [INGRESS] POST /v1/chat/completions (OpenAI SDK)</div>
              <div class="text-emerald-400">&gt; [RESOLVED] upstream: openai/gpt-4o | status: 200 OK (280ms)</div>
              <div class="text-amber-400">&gt; [UPSTREAM_429] Rate limit reached. Failover triggered...</div>
              <div class="text-white">&gt; [CIRCUIT_BREAK] Rerouted to claude-3-5-sonnet in 12ms. OK.</div>
            </div>
            <div class="pt-2 border-t border-[rgba(242,239,232,0.14)] text-[10px] text-[#A6A39C]">
              Persistent connection pool active.
            </div>
          </div>
        </div>

        <!-- Other Articles Grid -->
        <div id="blog-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${mockBlogPosts.slice(1).map(p => `
            <div class="blog-item bg-[#141615] border border-[rgba(242,239,232,0.14)] hover:border-white/30 transition-all rounded-xl p-6 flex flex-col justify-between gap-5 group" data-cat="${p.category}">
              <div class="flex flex-col gap-3">
                <div class="flex items-center gap-2 text-[10px] font-mono">
                  <span class="px-2 py-0.5 rounded bg-[#1A1D1B] border border-[rgba(242,239,232,0.14)] text-white uppercase">${p.category}</span>
                  <span class="text-white/20">•</span>
                  <span class="text-[#A6A39C]">${p.readTime}</span>
                </div>
                
                <a href="/blog/${p.id}" data-link class="block">
                  <h3 class="font-sans font-bold text-lg text-white group-hover:text-neutral-200 transition-colors leading-snug">
                    ${p.title}
                  </h3>
                </a>

                <p class="text-xs text-[#A6A39C] leading-relaxed">
                  ${p.excerpt}
                </p>
              </div>

              <div class="flex items-center gap-3 pt-4 border-t border-[rgba(242,239,232,0.14)]">
                <div class="w-7 h-7 rounded-lg ${p.avatarBg} flex items-center justify-center font-mono font-bold text-[10px]">
                  ${p.author.substring(0, 2).toUpperCase()}
                </div>
                <div class="flex flex-col text-xs font-mono">
                  <span class="font-bold text-white font-sans">${p.author}</span>
                  <span class="text-[10px] text-[#A6A39C]">${p.role}</span>
                </div>
              </div>
            </div>
          `).join("")}
        </div>

        <!-- Newsletter subscription box -->
        <div class="bg-[#141615] border border-[rgba(242,239,232,0.14)] rounded-xl p-8 sm:p-10 flex flex-col sm:flex-row justify-between items-center gap-8 shadow-2xl">
          <div class="flex flex-col gap-2 max-w-lg">
            <span class="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-semibold">Stay Informed</span>
            <h3 class="text-xl font-bold text-white tracking-tight">Subscribe to gateway updates</h3>
            <p class="text-xs text-[#A6A39C] leading-relaxed">
              Receive architecture deep dives, security disclosures, new foundation provider benchmarks, and gateway speed updates directly. Zero advertising.
            </p>
          </div>
          <form id="blog-sub-form" class="flex gap-2 w-full sm:w-auto shrink-0 font-sans">
            <input type="email" required id="blog-sub-email" placeholder="alex@company.com" class="p-3 bg-[#1A1D1B] border border-[rgba(242,239,232,0.14)] rounded-lg outline-none focus:border-white/50 text-xs text-white min-w-[240px] transition-colors" />
            <button type="submit" class="px-5 py-3 bg-[#FF7849] hover:bg-[#ff8a60] text-[#0B0C0D] font-bold shadow-[0_4px_25px_rgba(255,120,73,0.3)] font-semibold rounded-lg text-xs transition-colors shadow-sm">
              Subscribe
            </button>
          </form>
        </div>

      </div>
    </div>
  `;
}

export function bindBlog() {
  const catBtns = document.querySelectorAll(".blog-cat-btn");
  const blogItems = document.querySelectorAll(".blog-item");
  const featuredCard = document.getElementById("blog-featured-card");
  
  catBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      catBtns.forEach(x => {
        x.className = "blog-cat-btn px-4 py-2 border border-[rgba(242,239,232,0.14)] bg-[#141615] hover:bg-[#1A1D1B] text-[#A6A39C] hover:text-white rounded-lg transition-all";
      });
      btn.className = "blog-cat-btn px-4 py-2 bg-white text-black font-semibold rounded-lg transition-all";

      const cat = btn.getAttribute("data-cat");
      
      if (cat === "all" || mockBlogPosts[0].category === cat) {
        featuredCard?.classList.remove("hidden");
      } else {
        featuredCard?.classList.add("hidden");
      }

      blogItems.forEach(item => {
        const itemCat = item.getAttribute("data-cat");
        if (cat === "all" || itemCat === cat) {
          item.classList.remove("hidden");
        } else {
          item.classList.add("hidden");
        }
      });
    });
  });

  const subForm = document.getElementById("blog-sub-form");
  subForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("blog-sub-email")?.value || "Subscriber";
    components.renderToast("success", `Subscribed! Technical logs queued for: ${email}`);
    subForm.reset();
  });
}

export default {
  blog,
  bindBlog
};
