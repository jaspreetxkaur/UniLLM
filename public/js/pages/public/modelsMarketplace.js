// PUBLIC / APP PAGE: modelsMarketplace (Redesigned for Screen 06 Dark Cinematic Model Catalogue)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";
import { icons } from "../../icons.js?v=2";

export function modelsMarketplace() {
  const models = apiService.getModels() || [];
  
  return `
    <div class="relative overflow-hidden w-full bg-[#07080B] text-white">
      <div class="relative w-full max-w-7xl mx-auto px-6 lg:px-12 py-10 flex flex-col gap-8 animate-fade-in-up">
        
        <!-- Header (Screen 06) -->
        <div class="flex flex-col gap-1 select-none text-left">
          <h1 class="font-sans font-bold text-3xl text-white tracking-tight">Models</h1>
          <p class="text-xs text-[#8E98B0]">Access 50+ leading AI models through one API.</p>
        </div>

        <!-- Filter Pills Bar & Search (Screen 06) -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
          
          <!-- Category Pills -->
          <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button class="category-pill active px-4 py-1.5 rounded-full text-xs font-medium bg-white text-[#07080B] transition-all shrink-0" data-category="all">All</button>
            <button class="category-pill px-4 py-1.5 rounded-full text-xs font-medium bg-[#10121A] text-[#8E98B0] hover:text-white border border-[#1F2438] transition-all shrink-0" data-category="llm">LLMs</button>
            <button class="category-pill px-4 py-1.5 rounded-full text-xs font-medium bg-[#10121A] text-[#8E98B0] hover:text-white border border-[#1F2438] transition-all shrink-0" data-category="vision">Vision</button>
            <button class="category-pill px-4 py-1.5 rounded-full text-xs font-medium bg-[#10121A] text-[#8E98B0] hover:text-white border border-[#1F2438] transition-all shrink-0" data-category="embedding">Embedding</button>
            <button class="category-pill px-4 py-1.5 rounded-full text-xs font-medium bg-[#10121A] text-[#8E98B0] hover:text-white border border-[#1F2438] transition-all shrink-0" data-category="audio">Audio</button>
            <button class="category-pill px-4 py-1.5 rounded-full text-xs font-medium bg-[#10121A] text-[#8E98B0] hover:text-white border border-[#1F2438] transition-all shrink-0" data-category="moderation">Moderation</button>
          </div>

          <!-- Search & View Toggle -->
          <div class="flex items-center gap-3">
            <div class="relative w-full sm:w-64">
              <svg class="w-3.5 h-3.5 text-[#8E98B0] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              <input type="text" id="model-search" placeholder="Search models..." class="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#10121A] border border-[#1F2438] text-xs text-white placeholder-[#8E98B0]/60 outline-none focus:border-[#38BDF8] transition-colors" />
            </div>

            <!-- View Switcher -->
            <div class="flex items-center border border-[#1F2438] rounded-lg p-0.5 bg-[#10121A] shrink-0">
              <button id="view-grid-btn" class="px-2.5 py-1 rounded text-xs font-medium bg-[#161926] text-white transition-all" title="Card Grid View">
                Grid
              </button>
              <button id="view-table-btn" class="px-2.5 py-1 rounded text-xs font-medium text-[#8E98B0] hover:text-white transition-all" title="Table View">
                Table
              </button>
            </div>
          </div>
        </div>

        <!-- GRID VIEW CONTAINER (Screen 06 Dark Model Cards) -->
        <div id="models-grid-view" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          ${models.map(m => {
            const rawIn = m.inputCost ?? m.inputCost1M ?? 0;
            const rawOut = m.outputCost ?? m.outputCost1M ?? 0;
            const inCost = rawIn > 0 && rawIn < 0.1 ? rawIn.toFixed(3).replace(/0$/, '') : rawIn.toFixed(2);
            const outCost = rawOut.toFixed(2);
            const latency = m.latency ?? m.averageLatency ?? 280;
            const provider = (m.provider || "Standard").toLowerCase();
            const type = m.type || "LLM";
            
            // Provider logo
            let iconSvg = `<span class="text-xs font-mono font-bold text-white uppercase">${provider.slice(0, 2)}</span>`;
            if (provider.includes("openai")) {
              iconSvg = `<svg class="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M22.28 10.05a5.57 5.57 0 0 0-.46-4.41 5.68 5.68 0 0 0-4.88-2.83 5.76 5.76 0 0 0-1.87.31 5.6 5.6 0 0 0-3.92-1.74A5.67 5.67 0 0 0 6 3.65a5.71 5.71 0 0 0-3.7 2.68 5.63 5.63 0 0 0 .74 6.24 5.6 5.6 0 0 0 .46 4.41 5.67 5.67 0 0 0 4.88 2.83c.63 0 1.25-.1 1.84-.31a5.61 5.61 0 0 0 3.94 1.74c2.8 0 5.16-2.03 5.6-4.74a5.67 5.67 0 0 0 3.7-2.68 5.6 5.6 0 0 0-.74-3.77z"/></svg>`;
            } else if (provider.includes("anthropic")) {
              iconSvg = `<div class="w-5 h-5 rounded-md bg-[#D97706]/20 flex items-center justify-center font-bold text-[#F59E0B] text-xs">A</div>`;
            } else if (provider.includes("google") || provider.includes("gemini")) {
              iconSvg = `<div class="w-5 h-5 rounded-md bg-blue-500/20 flex items-center justify-center font-bold text-[#38BDF8] text-xs">G</div>`;
            } else if (provider.includes("meta") || provider.includes("llama")) {
              iconSvg = `<svg class="w-5 h-5 text-blue-400" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-2v-6h2v6zm0-8h-2V7h2v2zm4 8h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>`;
            } else if (provider.includes("mistral")) {
              iconSvg = `<div class="w-5 h-5 rounded-md bg-amber-500/20 flex items-center justify-center font-mono font-bold text-amber-400 text-xs">M</div>`;
            } else if (provider.includes("cohere")) {
              iconSvg = `<div class="w-5 h-5 rounded-md bg-teal-500/20 flex items-center justify-center font-mono font-bold text-teal-400 text-xs">Co</div>`;
            }

            return `
              <div class="model-card-item rounded-xl bg-[#10121A] border border-[#1F2438] hover:border-[#38BDF8]/40 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-10px_rgba(56,189,248,0.12)] p-5 flex flex-col justify-between gap-4 transition-all duration-200 group" data-name="${m.name.toLowerCase()}" data-provider="${provider}" data-category="${type.toLowerCase()}">
                
                <!-- Card Top: Provider Icon & Chat Button (Screen 06) -->
                <div class="flex items-center justify-between">
                  <div class="w-8 h-8 rounded-lg bg-[#161926] border border-[#1F2438] flex items-center justify-center">
                    ${iconSvg}
                  </div>
                  
                  <a href="/app/playground" data-link class="px-3 py-1 rounded-full bg-[#161926] hover:bg-[#1E2235] text-xs font-medium text-white border border-[#1F2438] hover:border-[#38BDF8]/40 transition-colors">
                    Chat
                  </a>
                </div>

                <!-- Model Name & Description -->
                <div>
                  <h3 class="font-sans font-bold text-base text-white group-hover:text-[#38BDF8] transition-colors">
                    ${m.name}
                  </h3>
                  <p class="text-xs text-[#8E98B0] mt-1 line-clamp-2 leading-relaxed">
                    ${m.description || "High-performance inference with unified token routing."}
                  </p>
                </div>

                <!-- Footer: Specs & View Link -->
                <div class="flex items-center justify-between pt-3 border-t border-[#1F2438]/70 text-xs">
                  <span class="text-[#8E98B0] font-mono text-[11px]">$${inCost} / $${outCost} M</span>
                  <a href="/models/${m.id}" data-link class="inline-flex items-center gap-1 text-[#8E98B0] group-hover:text-white font-medium transition-colors">
                    <span>View</span>
                    <span>→</span>
                  </a>
                </div>

              </div>
            `;
          }).join("")}
        </div>

        <!-- TABLE VIEW CONTAINER (Hidden by Default) -->
        <div id="models-table-view" class="hidden rounded-xl border border-[#1F2438] bg-[#10121A] overflow-hidden select-text">
          <table class="w-full text-xs text-left">
            <thead class="bg-[#0D0E15] text-[10px] font-mono uppercase tracking-wider text-[#8E98B0] border-b border-[#1F2438] select-none">
              <tr>
                <th class="px-5 py-3.5">Model Name</th>
                <th class="px-5 py-3.5">Provider</th>
                <th class="px-5 py-3.5">Type</th>
                <th class="px-5 py-3.5">Input / 1M</th>
                <th class="px-5 py-3.5">Output / 1M</th>
                <th class="px-5 py-3.5">Avg Latency</th>
                <th class="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[#1F2438]/70 text-[#8E98B0] font-mono">
              ${models.map(m => {
                const rawIn = m.inputCost ?? m.inputCost1M ?? 0;
                const rawOut = m.outputCost ?? m.outputCost1M ?? 0;
                const inCost = rawIn > 0 && rawIn < 0.1 ? rawIn.toFixed(3).replace(/0$/, '') : rawIn.toFixed(2);
                const outCost = rawOut.toFixed(2);
                const latency = m.latency ?? m.averageLatency ?? 280;
                const provider = (m.provider || "Standard").toLowerCase();
                const type = m.type || "LLM";

                return `
                  <tr class="model-row-item hover:bg-[#161926]/40 transition-colors" data-name="${m.name.toLowerCase()}" data-provider="${provider}">
                    <td class="px-5 py-3.5 font-sans font-bold text-white">
                      <a href="/models/${m.id}" data-link class="hover:text-[#38BDF8] transition-colors">${m.name}</a>
                    </td>
                    <td class="px-5 py-3.5 uppercase text-xs">${provider}</td>
                    <td class="px-5 py-3.5 text-xs font-sans text-white">${type}</td>
                    <td class="px-5 py-3.5 text-white">$${inCost}</td>
                    <td class="px-5 py-3.5 text-white">$${outCost}</td>
                    <td class="px-5 py-3.5 text-white">${latency}ms</td>
                    <td class="px-5 py-3.5 text-right">
                      <a href="/app/playground" data-link class="px-3 py-1 rounded-full bg-[#161926] hover:bg-[#1E2235] text-xs font-sans font-medium text-white border border-[#1F2438] transition-colors">
                        Chat
                      </a>
                    </td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
        </div>

        <!-- Empty State (Hidden) -->
        <div id="models-empty-state" class="hidden py-16 text-center select-none bg-[#10121A] border border-[#1F2438] rounded-xl">
          <span class="text-3xl">🤖</span>
          <h3 class="font-bold text-base text-white mt-3">No models found</h3>
          <p class="text-xs text-[#8E98B0] mt-1">Try broadening your search term or selecting 'All'.</p>
        </div>

      </div>
    </div>
  `;
}

export function bindModelsMarketplace() {
  const searchInput = document.getElementById("model-search");
  const categoryPills = document.querySelectorAll(".category-pill");
  
  const viewGridBtn = document.getElementById("view-grid-btn");
  const viewTableBtn = document.getElementById("view-table-btn");
  const gridView = document.getElementById("models-grid-view");
  const tableView = document.getElementById("models-table-view");
  const emptyState = document.getElementById("models-empty-state");

  const cards = document.querySelectorAll(".model-card-item");
  const rows = document.querySelectorAll(".model-row-item");

  let activeCategory = "all";
  let searchWord = "";

  // View Switchers
  viewGridBtn?.addEventListener("click", () => {
    viewGridBtn.className = "px-2.5 py-1 rounded text-xs font-medium bg-[#161926] text-white transition-all";
    viewTableBtn.className = "px-2.5 py-1 rounded text-xs font-medium text-[#8E98B0] hover:text-white transition-all";
    if (gridView) gridView.classList.remove("hidden");
    if (tableView) tableView.classList.add("hidden");
  });

  viewTableBtn?.addEventListener("click", () => {
    viewTableBtn.className = "px-2.5 py-1 rounded text-xs font-medium bg-[#161926] text-white transition-all";
    viewGridBtn.className = "px-2.5 py-1 rounded text-xs font-medium text-[#8E98B0] hover:text-white transition-all";
    if (tableView) tableView.classList.remove("hidden");
    if (gridView) gridView.classList.add("hidden");
  });

  // Filter Function
  function applyFilters() {
    let visibleCount = 0;

    cards.forEach(el => {
      const name = el.getAttribute("data-name") || "";
      const provider = el.getAttribute("data-provider") || "";
      const cat = el.getAttribute("data-category") || "";
      
      const catMatch = (activeCategory === "all" || cat.includes(activeCategory) || name.includes(activeCategory));
      const searchMatch = (name.includes(searchWord) || provider.includes(searchWord));

      if (catMatch && searchMatch) {
        el.classList.remove("hidden");
        visibleCount++;
      } else {
        el.classList.add("hidden");
      }
    });

    rows.forEach(el => {
      const name = el.getAttribute("data-name") || "";
      const provider = el.getAttribute("data-provider") || "";
      
      const searchMatch = (name.includes(searchWord) || provider.includes(searchWord));
      if (searchMatch) {
        el.classList.remove("hidden");
      } else {
        el.classList.add("hidden");
      }
    });

    if (visibleCount === 0) {
      if (emptyState) emptyState.classList.remove("hidden");
      if (gridView) gridView.classList.add("hidden");
      if (tableView) tableView.classList.add("hidden");
    } else {
      if (emptyState) emptyState.classList.add("hidden");
      const isGrid = viewGridBtn?.classList.contains("bg-[#161926]");
      if (isGrid) {
        if (gridView) gridView.classList.remove("hidden");
        if (tableView) tableView.classList.add("hidden");
      } else {
        if (tableView) tableView.classList.remove("hidden");
        if (gridView) gridView.classList.add("hidden");
      }
    }
  }

  searchInput?.addEventListener("input", (e) => {
    searchWord = e.target.value.toLowerCase().trim();
    applyFilters();
  });

  categoryPills.forEach(pill => {
    pill.addEventListener("click", () => {
      categoryPills.forEach(x => {
        x.className = "category-pill px-4 py-1.5 rounded-full text-xs font-medium bg-[#10121A] text-[#8E98B0] hover:text-white border border-[#1F2438] transition-all shrink-0";
      });
      pill.className = "category-pill active px-4 py-1.5 rounded-full text-xs font-medium bg-white text-[#07080B] transition-all shrink-0";
      
      activeCategory = pill.getAttribute("data-category") || "all";
      applyFilters();
    });
  });
}

export default {
  modelsMarketplace,
  bindModelsMarketplace
};
