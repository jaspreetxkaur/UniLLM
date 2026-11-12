// PUBLIC / APP PAGE: modelsMarketplace (Obsidian Model Catalogue)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";
import { icons } from "../../icons.js?v=2";

export function modelsMarketplace() {
  const models = apiService.getModels() || [];
  
  return `
    <div class="relative overflow-hidden w-full bg-[#0B0C0D] text-[#F2EFE8] font-sans">
      <div class="relative w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-12 flex flex-col gap-8">
        
        <!-- Header -->
        <div class="flex flex-col gap-2 text-left">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#141615] border border-[rgba(242,239,232,0.14)] text-[11px] font-mono tracking-wider text-[#A6A39C] uppercase self-start">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Universal Model Registry</span>
            <span class="text-white/20">•</span>
            <span class="text-white">50+ Frontier Targets</span>
          </div>
          <h1 class="font-sans font-extrabold text-3xl sm:text-4xl text-white tracking-tight">Frontier Model Registry</h1>
          <p class="text-sm text-[#A6A39C]">Compare token pricing, latency telemetry, context windows, and fallback compatibility across all major foundation providers.</p>
        </div>

        <!-- Filter Pills Bar & Search -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 select-none">
          
          <!-- Category Pills -->
          <div class="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <button class="category-pill active px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#FF7849] text-[#0B0C0D] transition-all shrink-0 cursor-pointer shadow-[0_2px_15px_rgba(255,120,73,0.3)]" data-category="all">All Models</button>
            <button class="category-pill px-3.5 py-1.5 rounded-lg text-xs font-mono bg-[#141615] text-[#A6A39C] hover:text-white border border-[rgba(242,239,232,0.14)] transition-all shrink-0 cursor-pointer" data-category="llm">LLMs</button>
            <button class="category-pill px-3.5 py-1.5 rounded-lg text-xs font-mono bg-[#141615] text-[#A6A39C] hover:text-white border border-[rgba(242,239,232,0.14)] transition-all shrink-0 cursor-pointer" data-category="vision">Vision</button>
            <button class="category-pill px-3.5 py-1.5 rounded-lg text-xs font-mono bg-[#141615] text-[#A6A39C] hover:text-white border border-[rgba(242,239,232,0.14)] transition-all shrink-0 cursor-pointer" data-category="embedding">Embedding</button>
            <button class="category-pill px-3.5 py-1.5 rounded-lg text-xs font-mono bg-[#141615] text-[#A6A39C] hover:text-white border border-[rgba(242,239,232,0.14)] transition-all shrink-0 cursor-pointer" data-category="audio">Audio</button>
            <button class="category-pill px-3.5 py-1.5 rounded-lg text-xs font-mono bg-[#141615] text-[#A6A39C] hover:text-white border border-[rgba(242,239,232,0.14)] transition-all shrink-0 cursor-pointer" data-category="moderation">Moderation</button>
          </div>

          <!-- Search & View Toggle -->
          <div class="flex items-center gap-3">
            <div class="relative w-full sm:w-64">
              <input type="text" id="model-search" placeholder="Search by name, provider..." class="w-full px-3 py-1.5 rounded-lg bg-[#141615] border border-[rgba(242,239,232,0.14)] text-xs text-white placeholder-[#A6A39C]/60 outline-none focus:border-white/50 transition-colors" />
            </div>

            <!-- View Switcher -->
            <div class="flex items-center border border-[rgba(242,239,232,0.14)] rounded-lg p-0.5 bg-[#141615] shrink-0 font-mono text-xs">
              <button id="view-grid-btn" class="px-3 py-1 rounded-md text-xs font-semibold bg-[#1A1D1B] text-white transition-all" title="Grid View">
                Grid
              </button>
              <button id="view-table-btn" class="px-3 py-1 rounded-md text-xs font-semibold text-[#A6A39C] hover:text-white transition-all" title="Table View">
                Table
              </button>
            </div>
          </div>
        </div>

        <!-- GRID VIEW CONTAINER -->
        <div id="models-grid-view" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          ${models.map(m => {
            const rawIn = m.inputCost ?? m.inputCost1M ?? 0;
            const rawOut = m.outputCost ?? m.outputCost1M ?? 0;
            const inCost = rawIn > 0 && rawIn < 0.1 ? rawIn.toFixed(3).replace(/0$/, '') : rawIn.toFixed(2);
            const outCost = rawOut.toFixed(2);
            const latency = m.latency ?? m.averageLatency ?? 280;
            const provider = (m.provider || "Standard").toLowerCase();
            const type = m.type || "LLM";
            
            return `
              <div class="model-card-item rounded-xl bg-[#141615] border border-[rgba(242,239,232,0.14)] hover:border-white/40 p-5 flex flex-col justify-between gap-4 transition-all duration-200 group" data-name="${m.name.toLowerCase()}" data-provider="${provider}" data-category="${type.toLowerCase()}">
                
                <!-- Card Top: Provider & Detail Link -->
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <span class="w-7 h-7 rounded-md bg-[#1A1D1B] border border-[rgba(242,239,232,0.14)] flex items-center justify-center font-mono font-bold text-xs text-white uppercase">
                      ${provider.slice(0, 2)}
                    </span>
                    <span class="text-xs font-mono text-[#A6A39C] uppercase">${m.provider || "Standard"}</span>
                  </div>
                  
                  <a href="/models/${m.id}" data-link class="px-3 py-1 rounded-md bg-[#1A1D1B] hover:bg-[#20242B] text-xs font-semibold text-white border border-[rgba(242,239,232,0.14)] transition-colors">
                    Details
                  </a>
                </div>

                <!-- Model Name & Description -->
                <div>
                  <h3 class="font-sans font-bold text-base text-white group-hover:text-neutral-200 transition-colors">
                    ${m.name}
                  </h3>
                  <p class="text-xs text-[#A6A39C] mt-1 line-clamp-2 leading-relaxed">
                    ${m.description || "High-performance inference with unified token routing."}
                  </p>
                </div>

                <!-- Specs & Metrics -->
                <div class="pt-3 border-t border-[rgba(242,239,232,0.14)] grid grid-cols-3 gap-2 font-mono text-[11px]">
                  <div>
                    <span class="text-[#A6A39C] text-[10px] block">In / 1M</span>
                    <span class="text-white font-semibold">$${inCost}</span>
                  </div>
                  <div>
                    <span class="text-[#A6A39C] text-[10px] block">Out / 1M</span>
                    <span class="text-white font-semibold">$${outCost}</span>
                  </div>
                  <div>
                    <span class="text-[#A6A39C] text-[10px] block">P95 Latency</span>
                    <span class="text-emerald-400 font-semibold">${latency}ms</span>
                  </div>
                </div>

                <!-- Footer Action -->
                <div class="flex items-center justify-between pt-1">
                  <span class="text-[10px] font-mono text-[#A6A39C]">Context: ${m.contextLength || "128k"}</span>
                  <a href="/app/playground?model=${encodeURIComponent(m.id)}" data-link class="text-xs font-semibold text-white hover:text-neutral-300 transition-colors inline-flex items-center gap-1">
                    <span>Try in Playground</span>
                    <span>→</span>
                  </a>
                </div>
              </div>
            `;
          }).join("")}
        </div>

        <!-- TABLE VIEW CONTAINER -->
        <div id="models-table-view" class="hidden rounded-xl border border-[rgba(242,239,232,0.14)] bg-[#141615] overflow-hidden font-mono text-xs">
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="border-b border-[rgba(242,239,232,0.14)] bg-[#0B0C0D] text-[#A6A39C] text-[10px] uppercase tracking-wider">
                  <th class="px-6 py-4">Model Name</th>
                  <th class="px-6 py-4">Provider</th>
                  <th class="px-6 py-4">Context</th>
                  <th class="px-6 py-4">Input / 1M</th>
                  <th class="px-6 py-4">Output / 1M</th>
                  <th class="px-6 py-4">Avg Latency</th>
                  <th class="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[rgba(242,239,232,0.14)] text-[#A6A39C]">
                ${models.map(m => {
                  const rawIn = m.inputCost ?? m.inputCost1M ?? 0;
                  const rawOut = m.outputCost ?? m.outputCost1M ?? 0;
                  const inCost = rawIn > 0 && rawIn < 0.1 ? rawIn.toFixed(3).replace(/0$/, '') : rawIn.toFixed(2);
                  const outCost = rawOut.toFixed(2);
                  const latency = m.latency ?? m.averageLatency ?? 280;
                  const provider = (m.provider || "Standard").toLowerCase();

                  return `
                    <tr class="model-row-item hover:bg-[#1A1D1B] transition-colors" data-name="${m.name.toLowerCase()}" data-provider="${provider}">
                      <td class="px-6 py-3.5 font-bold text-white font-sans">${m.name}</td>
                      <td class="px-6 py-3.5 uppercase text-xs">${m.provider || "Standard"}</td>
                      <td class="px-6 py-3.5">${m.contextLength || "128k"}</td>
                      <td class="px-6 py-3.5 text-white">$${inCost}</td>
                      <td class="px-6 py-3.5 text-white">$${outCost}</td>
                      <td class="px-6 py-3.5 text-emerald-400 font-bold">${latency}ms</td>
                      <td class="px-6 py-3.5 text-right font-sans">
                        <a href="/app/playground?model=${encodeURIComponent(m.id)}" data-link class="px-3 py-1 rounded bg-[#1A1D1B] hover:bg-[#20242B] text-white border border-[rgba(242,239,232,0.14)] text-[11px] font-semibold transition-colors">
                          Test
                        </a>
                      </td>
                    </tr>
                  `;
                }).join("")}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Empty State -->
        <div id="models-empty-state" class="hidden rounded-xl border border-[rgba(242,239,232,0.14)] bg-[#141615] p-12 text-center flex flex-col items-center gap-3">
          <span class="text-2xl">🔍</span>
          <h3 class="text-base font-bold text-white">No models matched your query</h3>
          <p class="text-xs text-[#A6A39C]">Try searching by foundation provider name or clear filters.</p>
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
    viewGridBtn.className = "px-3 py-1 rounded-md text-xs font-semibold bg-[#1A1D1B] text-white transition-all";
    viewTableBtn.className = "px-3 py-1 rounded-md text-xs font-semibold text-[#A6A39C] hover:text-white transition-all";
    if (gridView) gridView.classList.remove("hidden");
    if (tableView) tableView.classList.add("hidden");
  });

  viewTableBtn?.addEventListener("click", () => {
    viewTableBtn.className = "px-3 py-1 rounded-md text-xs font-semibold bg-[#1A1D1B] text-white transition-all";
    viewGridBtn.className = "px-3 py-1 rounded-md text-xs font-semibold text-[#A6A39C] hover:text-white transition-all";
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
      const isGrid = viewGridBtn?.classList.contains("bg-[#1A1D1B]");
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
        x.className = "category-pill px-3.5 py-1.5 rounded-lg text-xs font-mono bg-[#141615] text-[#A6A39C] hover:text-white border border-[rgba(242,239,232,0.14)] transition-all shrink-0 cursor-pointer";
      });
      pill.className = "category-pill active px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold bg-[#FF7849] text-[#0B0C0D] transition-all shrink-0 cursor-pointer shadow-[0_2px_15px_rgba(255,120,73,0.3)]";
      
      activeCategory = pill.getAttribute("data-category") || "all";
      applyFilters();
    });
  });
}

export default {
  modelsMarketplace,
  bindModelsMarketplace
};
