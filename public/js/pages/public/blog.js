// PUBLIC PAGE: Engineering Blog List
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
    avatarBg: "bg-indigo-600 text-white"
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
    avatarBg: "bg-emerald-600 text-white"
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
    avatarBg: "bg-purple-600 text-white"
  }
];

export function blog() {
  return `
    <div class="relative overflow-hidden w-full bg-slate-50/50">
      <div class="absolute top-[10%] right-[10%] w-[400px] h-[400px] rounded-full blur-[180px] bg-indigo-100/40 -z-10"></div>
      
      <div class="relative w-full overflow-hidden">
        <section class="px-6 lg:px-12 py-16 md:py-20 flex flex-col gap-10 animate-fade-in-up max-w-7xl mx-auto">
          
          <!-- Blog Header -->
          <div class="flex flex-col gap-3 select-none text-center sm:text-left">
            <span class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-150 text-indigo-650 text-[10px] font-bold tracking-wider uppercase rounded-full self-center sm:self-start shadow-sm">
              UniLLM Logs & Reports
            </span>
            <h1 class="font-display font-black text-4xl sm:text-5xl text-slate-900 tracking-tight uppercase leading-none mt-1">Engineering Blog</h1>
            <p class="text-xs text-slate-500 leading-relaxed max-w-2xl font-semibold">
              Deep dives into AI infrastructure, semantic caching mechanisms, system orchestration, and agent tool architectures.
            </p>
          </div>

          <!-- Category filter list -->
          <div class="flex items-center gap-2 border-b border-slate-200 pb-3 select-none overflow-x-auto scrollbar-none">
            <button class="blog-cat-btn px-4 py-2 border border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-xl transition-all" data-cat="all">All Logs</button>
            <button class="blog-cat-btn px-4 py-2 border border-slate-200 hover:border-indigo-300 bg-white text-slate-700 text-xs font-bold rounded-xl transition-all" data-cat="Reliability">Reliability</button>
            <button class="blog-cat-btn px-4 py-2 border border-slate-200 hover:border-indigo-300 bg-white text-slate-700 text-xs font-bold rounded-xl transition-all" data-cat="Cost Control">Cost Control</button>
            <button class="blog-cat-btn px-4 py-2 border border-slate-200 hover:border-indigo-300 bg-white text-slate-700 text-xs font-bold rounded-xl transition-all" data-cat="MCP & Tools">MCP & Tools</button>
          </div>

          <!-- Featured Post Card -->
          <div id="blog-featured-card" class="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row justify-between items-center gap-8 shadow-sm hover:border-indigo-300 transition-all duration-300 group select-none">
            <div class="flex flex-col gap-4 lg:w-1/2">
              <div class="flex items-center gap-3 text-[10px] font-bold text-indigo-600">
                <span class="px-2.5 py-0.5 border border-indigo-200 rounded bg-indigo-50 uppercase">${mockBlogPosts[0].category}</span>
                <span>•</span>
                <span class="text-slate-450">${mockBlogPosts[0].readTime}</span>
              </div>
              
              <a href="/blog/${mockBlogPosts[0].id}" data-link class="block">
                <h2 class="font-display font-black text-2xl sm:text-3xl text-slate-900 group-hover:text-indigo-600 transition-colors uppercase leading-tight">
                  ${mockBlogPosts[0].title}
                </h2>
              </a>

              <p class="text-xs text-slate-500 font-semibold leading-relaxed">
                ${mockBlogPosts[0].excerpt}
              </p>

              <!-- Author card -->
              <div class="flex items-center gap-3 pt-4 border-t border-slate-100">
                <div class="w-9 h-9 rounded-xl ${mockBlogPosts[0].avatarBg} flex items-center justify-center font-bold font-mono text-xs shadow-xs">
                  JK
                </div>
                <div class="flex flex-col text-xs">
                  <span class="font-bold text-slate-900">${mockBlogPosts[0].author}</span>
                  <span class="text-[10px] text-slate-450 font-bold">${mockBlogPosts[0].role}</span>
                </div>
              </div>
            </div>

            <!-- Side visual decoration -->
            <div class="lg:w-1/2 w-full h-[200px] sm:h-[260px] bg-gradient-to-br from-indigo-900 to-indigo-950 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between text-white font-mono text-[10px] overflow-hidden relative shadow-inner">
              <div class="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-indigo-500/10 blur-[40px]"></div>
              <div class="flex justify-between items-center opacity-40 select-none">
                <span>GATEWAY_STATUS: LOGGED</span>
                <span>0.1.2_BUILD</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-indigo-400 font-bold">$ unillm logs --tail=10</span>
                <span class="text-slate-400">&gt; [INFO] Request POST /v1/chat/completions routed.</span>
                <span class="text-emerald-400">&gt; [SUCCESS] OpenAI resolved. Status 200 OK (320ms)</span>
                <span class="text-amber-400">&gt; [WARN] Primary rate-limit reached. Shifting queue load...</span>
                <span class="text-indigo-400">&gt; [FAILOVER] Secondary fallback Claude resolved (12ms)</span>
              </div>
              <span class="text-indigo-500 self-end select-none">■</span>
            </div>
          </div>

          <!-- Other Articles Grid -->
          <div id="blog-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${mockBlogPosts.slice(1).map(p => `
              <div class="blog-item bg-white border border-slate-200 hover:border-indigo-350 hover:shadow-lg transition-all duration-300 rounded-2xl p-6 flex flex-col justify-between gap-5 group" data-cat="${p.category}">
                <div class="flex flex-col gap-3">
                  <div class="flex items-center gap-2 text-[9px] font-bold text-indigo-600">
                    <span class="px-2 py-0.5 border border-indigo-150 rounded bg-indigo-50/50 uppercase">${p.category}</span>
                    <span>•</span>
                    <span class="text-slate-400">${p.readTime}</span>
                  </div>
                  
                  <a href="/blog/${p.id}" data-link class="block">
                    <h3 class="font-display font-black text-lg text-slate-900 group-hover:text-indigo-600 transition-colors uppercase leading-snug">
                      ${p.title}
                    </h3>
                  </a>

                  <p class="text-xs text-slate-500 font-semibold leading-relaxed">
                    ${p.excerpt}
                  </p>
                </div>

                <div class="flex items-center gap-3 pt-3 border-t border-slate-100 mt-2">
                  <div class="w-8 h-8 rounded-lg ${p.avatarBg} flex items-center justify-center font-bold font-mono text-[10px] shadow-xs">
                    ${p.author.substring(0, 2).toUpperCase()}
                  </div>
                  <div class="flex flex-col text-[11px]">
                    <span class="font-bold text-slate-900">${p.author}</span>
                    <span class="text-[9px] text-slate-450 font-bold">${p.role}</span>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>

          <!-- Newsletter subscription box -->
          <div class="bg-slate-900 text-white border border-slate-800 rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row justify-between items-center gap-8 shadow-md mt-10">
            <div class="flex flex-col gap-2 max-w-lg">
              <span class="text-[9px] font-mono font-bold text-indigo-400 uppercase tracking-widest">Keep updated</span>
              <h3 class="font-display font-black text-2xl uppercase">Subscribe to proxy updates</h3>
              <p class="text-xs text-slate-400 font-semibold leading-relaxed">
                Receive logs, security patches, new provider releases, and gateway speed updates directly. Zero advertising.
              </p>
            </div>
            <form id="blog-sub-form" class="flex gap-2 w-full sm:w-auto shrink-0">
              <input type="email" required id="blog-sub-email" placeholder="sarah@cyberdyne.org" class="p-3 bg-white/5 border border-white/10 rounded-xl outline-none focus:border-indigo-500 font-semibold text-xs text-white min-w-[200px]" />
              <button type="submit" class="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl uppercase tracking-wider text-xs shadow-md">
                Subscribe
              </button>
            </form>
          </div>

        </section>
      </div>
    </div>
  `;
}

export function bindBlog() {
  const catBtns = document.querySelectorAll(".blog-cat-btn");
  const blogItems = document.querySelectorAll(".blog-item");
  const featuredCard = document.getElementById("blog-featured-card");
  
  // Category filters
  catBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      catBtns.forEach(x => {
        x.className = "blog-cat-btn px-4 py-2 border border-slate-200 hover:border-indigo-300 bg-white text-slate-700 text-xs font-bold rounded-xl transition-all";
      });
      btn.className = "blog-cat-btn px-4 py-2 border border-indigo-200 bg-indigo-50 text-indigo-700 text-xs font-bold rounded-xl transition-all";

      const cat = btn.getAttribute("data-cat");
      
      // Toggle visibility of featured card
      if (cat === "all" || mockBlogPosts[0].category === cat) {
        featuredCard?.classList.remove("hidden");
      } else {
        featuredCard?.classList.add("hidden");
      }

      // Filter grid items
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

  // Subscription Form Submit
  const subForm = document.getElementById("blog-sub-form");
  subForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("blog-sub-email").value;
    components.renderToast("success", `Subscribed! Proxy logs queued for: ${email}`);
    subForm.reset();
  });
}

export default {
  blog,
  bindBlog
};
