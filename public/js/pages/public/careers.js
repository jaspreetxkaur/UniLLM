// PUBLIC PAGE: careers (Obsidian Engineering Roles & Culture)
import { components } from "../../components.js?v=2";

const openRoles = [
  {
    title: "Senior Systems Engineer (Rust)",
    team: "Core Infrastructure",
    location: "San Francisco, CA / Remote",
    type: "Full-Time",
    desc: "Build our ultra-low latency gateway router core, optimization kernels, and caching vector databases in bare-metal Rust."
  },
  {
    title: "Infrastructure & Security Engineer",
    team: "Security Systems",
    location: "Remote",
    type: "Full-Time",
    desc: "Scale our secure proxy vaults, design audit-logging streams, and implement Zero-Retention infrastructure pipelines."
  },
  {
    title: "Senior Frontend Product Engineer",
    team: "Product & Console",
    location: "Remote (Global)",
    type: "Full-Time",
    desc: "Craft real-time observability matrices, playground interfaces, and complex interactive dashboard components."
  }
];

export function careers() {
  return `
    <div class="relative overflow-hidden w-full font-sans bg-[#08090B] text-[#F5F5F5]">
      
      <!-- Top subtle vignette -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[300px] bg-gradient-to-b from-white/[0.04] to-transparent blur-[120px] pointer-events-none -z-10"></div>

      <div class="max-w-[1400px] mx-auto px-6 lg:px-12 py-16 lg:py-24 flex flex-col gap-20">
        
        <!-- Hero Section -->
        <section class="flex flex-col gap-6 max-w-4xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#101216] border border-[#292D34] text-[11px] font-mono tracking-wider text-[#A1A5AD] uppercase self-start">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span>Join the Team</span>
            <span class="text-white/20">•</span>
            <span class="text-white">Active Headcounts</span>
          </div>

          <h1 class="font-sans font-extrabold text-4xl sm:text-6xl text-white tracking-tight leading-[1.08]">
            Engineer the future of AI infrastructure.
          </h1>

          <p class="text-base text-[#A1A5AD] leading-relaxed max-w-2xl font-normal">
            We are engineering the high-performance routing and observability layers for AI. Join us to construct Rust-native proxy cores, zero-retention memory pipelines, and developer tooling.
          </p>
        </section>

        <!-- Company Values / Culture -->
        <section class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 bg-[#101216] border border-[#292D34] rounded-xl flex flex-col gap-3">
            <span class="w-8 h-8 rounded-lg bg-[#15181D] border border-[#292D34] flex items-center justify-center font-mono font-bold text-xs text-white">01</span>
            <h3 class="font-bold text-base text-white">Systems Precision</h3>
            <p class="text-xs text-[#A1A5AD] leading-relaxed">
              We value runtime safety and memory efficiency. Our core proxy routers are architected for deterministic latency and minimal memory footprint.
            </p>
          </div>

          <div class="p-6 bg-[#101216] border border-[#292D34] rounded-xl flex flex-col gap-3">
            <span class="w-8 h-8 rounded-lg bg-[#15181D] border border-[#292D34] flex items-center justify-center font-mono font-bold text-xs text-emerald-400">02</span>
            <h3 class="font-bold text-base text-white">Zero Retention by Design</h3>
            <p class="text-xs text-[#A1A5AD] leading-relaxed">
              Security is foundational. We design network protocols that guarantee client data payload security and compliance at hardware level.
            </p>
          </div>

          <div class="p-6 bg-[#101216] border border-[#292D34] rounded-xl flex flex-col gap-3">
            <span class="w-8 h-8 rounded-lg bg-[#15181D] border border-[#292D34] flex items-center justify-center font-mono font-bold text-xs text-white">03</span>
            <h3 class="font-bold text-base text-white">Autonomous Remote Flow</h3>
            <p class="text-xs text-[#A1A5AD] leading-relaxed">
              We operate as an asynchronous, distributed engineering group. High autonomy, continuous delivery, and transparent code reviews.
            </p>
          </div>
        </section>

        <!-- Open Roles list -->
        <section class="flex flex-col gap-6">
          <div class="flex flex-col gap-2">
            <span class="text-xs font-mono font-bold text-[#A1A5AD] uppercase tracking-wider">Active Headcounts</span>
            <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">Open Engineering Positions</h2>
          </div>

          <div class="flex flex-col gap-4">
            ${openRoles.map((role) => `
              <div class="bg-[#101216] border border-[#292D34] rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 hover:border-white/30 transition-all">
                <div class="flex flex-col gap-1.5 max-w-2xl">
                  <div class="flex flex-wrap items-center gap-2 text-[10px] font-mono">
                    <span class="px-2 py-0.5 rounded bg-[#15181D] text-[#A1A5AD] border border-[#292D34] uppercase">${role.team}</span>
                    <span class="text-white/30">•</span>
                    <span class="text-[#A1A5AD] uppercase">${role.location}</span>
                  </div>
                  <h3 class="font-bold text-lg text-white mt-1">${role.title}</h3>
                  <p class="text-xs text-[#A1A5AD] leading-relaxed">${role.desc}</p>
                </div>
                <button type="button" class="apply-trigger-btn px-5 py-2.5 bg-white hover:bg-neutral-200 text-black font-semibold rounded-lg text-xs shrink-0 transition-colors shadow-sm" data-role="${role.title}">
                  Apply Now →
                </button>
              </div>
            `).join("")}
          </div>
        </section>

      </div>

      <!-- CANDIDATE APPLICATION DRAWER BACKDROP -->
      <div id="drawer-backdrop" class="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm hidden transition-opacity duration-300"></div>

      <!-- CANDIDATE APPLICATION DRAWER -->
      <div id="careers-drawer" class="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-[#101216] border-l border-[#292D34] shadow-2xl transform translate-x-full transition-transform duration-300 ease-out flex flex-col justify-between font-sans">
        
        <!-- Drawer Header -->
        <div class="p-6 border-b border-[#292D34] flex justify-between items-center bg-[#08090B]">
          <div class="flex flex-col">
            <span class="text-[10px] font-mono text-[#A1A5AD] uppercase">Application</span>
            <h3 class="text-lg font-bold text-white tracking-tight mt-0.5">Submit Application</h3>
          </div>
          <button type="button" id="drawer-close-btn" class="w-8 h-8 rounded-lg border border-[#292D34] bg-[#15181D] hover:bg-[#20242B] flex items-center justify-center text-[#A1A5AD] hover:text-white font-mono text-sm">&times;</button>
        </div>

        <!-- Drawer Form Scrollable -->
        <form id="careers-form" class="flex-grow p-6 overflow-y-auto flex flex-col gap-4 text-xs font-sans">
          
          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-mono uppercase tracking-wider text-[#A1A5AD]">Target Role</label>
            <input id="app-role" type="text" readonly class="p-3 border border-[#292D34] bg-[#08090B] rounded-lg font-semibold text-white outline-none" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-mono uppercase tracking-wider text-[#A1A5AD]">Full Name</label>
            <input id="app-name" type="text" required placeholder="Alex Rivera" class="p-3 border border-[#292D34] rounded-lg bg-[#15181D] text-white placeholder-[#A1A5AD]/50 focus:border-white/50 outline-none text-xs transition-colors" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-mono uppercase tracking-wider text-[#A1A5AD]">Email Address</label>
            <input id="app-email" type="email" required placeholder="alex@company.com" class="p-3 border border-[#292D34] rounded-lg bg-[#15181D] text-white placeholder-[#A1A5AD]/50 focus:border-white/50 outline-none text-xs transition-colors" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-mono uppercase tracking-wider text-[#A1A5AD]">Portfolio / GitHub URL</label>
            <input id="app-portfolio" type="url" required placeholder="https://github.com/username" class="p-3 border border-[#292D34] rounded-lg bg-[#15181D] text-white placeholder-[#A1A5AD]/50 focus:border-white/50 outline-none text-xs transition-colors" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-mono uppercase tracking-wider text-[#A1A5AD]">Resume Link or PDF URL</label>
            <input id="app-resume" type="text" required placeholder="Link to public resume PDF" class="p-3 border border-[#292D34] rounded-lg bg-[#15181D] text-white placeholder-[#A1A5AD]/50 focus:border-white/50 outline-none text-xs transition-colors" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[10px] font-mono uppercase tracking-wider text-[#A1A5AD]">Cover Note</label>
            <textarea id="app-message" rows="4" required placeholder="Describe what drives your interest in systems engineering and AI infrastructure..." class="p-3 border border-[#292D34] rounded-lg bg-[#15181D] text-white placeholder-[#A1A5AD]/50 focus:border-white/50 outline-none resize-none text-xs transition-colors"></textarea>
          </div>

        </form>

        <!-- Drawer Footer Actions -->
        <div class="p-6 border-t border-[#292D34] bg-[#08090B] flex gap-3">
          <button type="button" id="drawer-cancel-btn" class="flex-grow py-3 border border-[#292D34] bg-[#15181D] hover:bg-[#20242B] text-[#A1A5AD] hover:text-white font-semibold rounded-lg text-xs transition-colors">
            Cancel
          </button>
          <button type="submit" form="careers-form" class="flex-grow py-3 bg-white hover:bg-neutral-200 text-black font-semibold rounded-lg text-xs transition-all shadow-sm">
            Submit Application
          </button>
        </div>

      </div>

    </div>
  `;
}

export function bindCareers() {
  const backdrop = document.getElementById("drawer-backdrop");
  const drawer = document.getElementById("careers-drawer");
  const closeBtn = document.getElementById("drawer-close-btn");
  const cancelBtn = document.getElementById("drawer-cancel-btn");
  const appForm = document.getElementById("careers-form");
  const roleInput = document.getElementById("app-role");
  
  const applyBtns = document.querySelectorAll(".apply-trigger-btn");

  function openDrawer(roleTitle) {
    if (roleInput) roleInput.value = roleTitle;
    backdrop?.classList.remove("hidden");
    drawer?.classList.remove("translate-x-full");
  }

  function closeDrawer() {
    backdrop?.classList.add("hidden");
    drawer?.classList.add("translate-x-full");
  }

  applyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const role = btn.getAttribute("data-role") || "Engineering Role";
      openDrawer(role);
    });
  });

  closeBtn?.addEventListener("click", closeDrawer);
  cancelBtn?.addEventListener("click", closeDrawer);
  backdrop?.addEventListener("click", closeDrawer);

  appForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("app-name")?.value || "Candidate";
    components.renderToast("success", `Application received for ${roleInput?.value || "role"}! Thank you, ${name}.`);
    appForm.reset();
    closeDrawer();
  });
}

export default {
  careers,
  bindCareers
};
