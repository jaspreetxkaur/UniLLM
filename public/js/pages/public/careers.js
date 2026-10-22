// PUBLIC PAGE: careers
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
    <div class="relative overflow-hidden w-full bg-slate-50/50">
      <div class="absolute top-[8%] left-[8%] w-[450px] h-[450px] rounded-full blur-[160px] bg-indigo-100/40 -z-10"></div>

      <!-- MAIN PAGE CONTENT -->
      <div class="relative w-full overflow-hidden">
        
        <!-- Hero Section -->
        <section class="px-6 lg:px-12 py-16 md:py-20 flex flex-col gap-6 animate-fade-in-up max-w-7xl mx-auto text-center sm:text-left select-none">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-150 text-indigo-650 text-[10px] font-bold tracking-wider uppercase rounded-full self-center sm:self-start shadow-sm">
            Join the Gateway Fleet
          </div>
          <h1 class="font-display font-black text-4xl sm:text-5xl lg:text-[58px] text-slate-900 tracking-tight uppercase leading-none mt-1">
            Build AI Infrastructure
          </h1>
          <p class="text-xs sm:text-sm text-slate-550 leading-relaxed max-w-2xl font-semibold">
            We are engineering the high-performance orchestration layers for AI. Join us to construct Rust-native systems, zero-retention proxies, and developer workspaces.
          </p>
        </section>

        <!-- Company Values / Culture -->
        <section class="px-6 lg:px-12 py-12 max-w-7xl mx-auto border-t border-slate-200">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="p-6 bg-white border border-slate-250/80 rounded-2xl flex flex-col gap-3 shadow-xs">
              <span class="text-xl">🦀</span>
              <h3 class="font-display font-black text-base text-slate-900 uppercase">Rust & Bare Metal</h3>
              <p class="text-xs text-slate-500 font-semibold leading-relaxed">
                We value runtime safety and memory efficiency. Our core proxy proxies are written purely in high-efficiency systems languages.
              </p>
            </div>
            <div class="p-6 bg-white border border-slate-250/80 rounded-2xl flex flex-col gap-3 shadow-xs">
              <span class="text-xl">🛡️</span>
              <h3 class="font-display font-black text-base text-slate-900 uppercase">Zero Retention First</h3>
              <p class="text-xs text-slate-500 font-semibold leading-relaxed">
                Security isn't a bolt-on feature. We design protocols that guarantee client data payload security and compliance.
              </p>
            </div>
            <div class="p-6 bg-white border border-slate-250/80 rounded-2xl flex flex-col gap-3 shadow-xs">
              <span class="text-xl">✈️</span>
              <h3 class="font-display font-black text-base text-slate-900 uppercase">Remote Autonomous Flow</h3>
              <p class="text-xs text-slate-500 font-semibold leading-relaxed">
                We are a remote team working in asynchronous patterns. Choose your own schedules and build space from anywhere.
              </p>
            </div>
          </div>
        </section>

        <!-- Open Roles list -->
        <section class="px-6 lg:px-12 py-16 max-w-7xl mx-auto border-t border-slate-200">
          <div class="flex flex-col gap-2 mb-10 select-none text-center sm:text-left">
            <span class="text-[9px] font-mono font-bold text-indigo-600 uppercase tracking-widest">Active Headcounts</span>
            <h2 class="font-display font-black text-2xl sm:text-3xl text-slate-900 uppercase">Open Engineering Roles</h2>
            <p class="text-xs text-slate-400 font-semibold">Join us to tackle frontier scale and microsecond challenges.</p>
          </div>

          <div class="flex flex-col gap-4">
            ${openRoles.map((role, idx) => `
              <div class="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 hover:border-indigo-350 transition-all duration-300 shadow-xs">
                <div class="flex flex-col gap-1.5 max-w-2xl">
                  <div class="flex flex-wrap items-center gap-2 text-[9px] font-bold">
                    <span class="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 uppercase tracking-wider">${role.team}</span>
                    <span class="text-slate-300">•</span>
                    <span class="text-slate-400 uppercase tracking-wider">${role.location}</span>
                  </div>
                  <h3 class="font-display font-black text-lg text-slate-900 uppercase tracking-tight mt-1">${role.title}</h3>
                  <p class="text-xs text-slate-500 font-semibold leading-relaxed mt-1">${role.desc}</p>
                </div>
                <button type="button" class="apply-trigger-btn px-5 py-2.5 bg-indigo-550 hover:bg-indigo-650 text-white font-bold rounded-xl text-xs uppercase tracking-wider shrink-0 transition-colors shadow-sm" data-role="${role.title}">
                  Apply Now
                </button>
              </div>
            `).join("")}
          </div>
        </section>

        <!-- Careers FAQ section -->
        <section class="px-6 lg:px-12 py-16 max-w-7xl mx-auto border-t border-slate-200">
          <div class="flex flex-col gap-2 mb-10 select-none text-center sm:text-left">
            <span class="text-[9px] font-mono font-bold text-indigo-600 uppercase tracking-widest">Hiring FAQs</span>
            <h2 class="font-display font-black text-2xl sm:text-3xl text-slate-900 uppercase">Careers FAQ</h2>
            <p class="text-xs text-slate-400 font-semibold">Learn about our application pipelines and interviews.</p>
          </div>

          <div class="faq-accordion-group flex flex-col gap-3 max-w-3xl">
            <!-- FAQ 1 -->
            <div class="faq-accordion-item bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200">
              <button type="button" class="faq-accordion-trigger w-full px-6 py-4 flex items-center justify-between text-left select-none outline-none">
                <div class="flex flex-col">
                  <span class="font-bold text-sm text-slate-900 uppercase tracking-tight">How is the interview process structured?</span>
                  <span class="text-[10px] text-slate-400 line-clamp-1 mt-0.5">We run a 3-step technical pipeline.</span>
                </div>
                <span class="faq-accordion-chevron text-slate-400 transition-transform duration-250">&darr;</span>
              </button>
              <div class="faq-accordion-content max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out px-6 pb-5">
                <p class="text-xs text-slate-650 font-semibold leading-relaxed pt-2">
                  Our pipeline comprises a 45-minute technical architecture call, a practical sandbox coding assignment (in Rust/JS depending on the role), and a final culture alignment check with our executive leads.
                </p>
              </div>
            </div>

            <!-- FAQ 2 -->
            <div class="faq-accordion-item bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200">
              <button type="button" class="faq-accordion-trigger w-full px-6 py-4 flex items-center justify-between text-left select-none outline-none">
                <div class="flex flex-col">
                  <span class="font-bold text-sm text-slate-900 uppercase tracking-tight">Are you open to fully remote workers?</span>
                  <span class="text-[10px] text-slate-400 line-clamp-1 mt-0.5">Yes, remote operations are core to our identity.</span>
                </div>
                <span class="faq-accordion-chevron text-slate-400 transition-transform duration-250">&darr;</span>
              </button>
              <div class="faq-accordion-content max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out px-6 pb-5">
                <p class="text-xs text-slate-650 font-semibold leading-relaxed pt-2">
                  Absolutely. We support engineers globally, provided you have a overlap of at least 3 hours with PST/EST zones for synchronous collaborations.
                </p>
              </div>
            </div>

            <!-- FAQ 3 -->
            <div class="faq-accordion-item bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200">
              <button type="button" class="faq-accordion-trigger w-full px-6 py-4 flex items-center justify-between text-left select-none outline-none">
                <div class="flex flex-col">
                  <span class="font-bold text-sm text-slate-900 uppercase tracking-tight">Is there a probation period?</span>
                  <span class="text-[10px] text-slate-400 line-clamp-1 mt-0.5">Yes, we utilize a standard 3-month probation period.</span>
                </div>
                <span class="faq-accordion-chevron text-slate-400 transition-transform duration-250">&darr;</span>
              </button>
              <div class="faq-accordion-content max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out px-6 pb-5">
                <p class="text-xs text-slate-650 font-semibold leading-relaxed pt-2">
                  Yes, we use a standard 3-month probation period to align on remote work paces, system architecture quality, and general gateway security practices.
                </p>
              </div>
            </div>

            <!-- FAQ 4 -->
            <div class="faq-accordion-item bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200">
              <button type="button" class="faq-accordion-trigger w-full px-6 py-4 flex items-center justify-between text-left select-none outline-none">
                <div class="flex flex-col">
                  <span class="font-bold text-sm text-slate-900 uppercase tracking-tight">What equipment or workspace budget is provided?</span>
                  <span class="text-[10px] text-slate-400 line-clamp-1 mt-0.5">We offer premium hardware sets and a home office stipend.</span>
                </div>
                <span class="faq-accordion-chevron text-slate-400 transition-transform duration-250">&darr;</span>
              </button>
              <div class="faq-accordion-content max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out px-6 pb-5">
                <p class="text-xs text-slate-650 font-semibold leading-relaxed pt-2">
                  We provide a top-tier Apple hardware package (MacBook Pro + Studio Display) and a $2,000 office setup budget to set up your home engineering environment.
                </p>
              </div>
            </div>

            <!-- FAQ 5 -->
            <div class="faq-accordion-item bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200">
              <button type="button" class="faq-accordion-trigger w-full px-6 py-4 flex items-center justify-between text-left select-none outline-none">
                <div class="flex flex-col">
                  <span class="font-bold text-sm text-slate-900 uppercase tracking-tight">Do you offer equity options?</span>
                  <span class="text-[10px] text-slate-400 line-clamp-1 mt-0.5">Yes, equity ownership is core to our team model.</span>
                </div>
                <span class="faq-accordion-chevron text-slate-400 transition-transform duration-250">&darr;</span>
              </button>
              <div class="faq-accordion-content max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out px-6 pb-5">
                <p class="text-xs text-slate-650 font-semibold leading-relaxed pt-2">
                  Yes. Every systems engineer receives an equity package from day one, vesting over 4 years with a standard 1-year cliff.
                </p>
              </div>
            </div>

            <!-- FAQ 6 -->
            <div class="faq-accordion-item bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200">
              <button type="button" class="faq-accordion-trigger w-full px-6 py-4 flex items-center justify-between text-left select-none outline-none">
                <div class="flex flex-col">
                  <span class="font-bold text-sm text-slate-900 uppercase tracking-tight">Is remote work available?</span>
                  <span class="text-[10px] text-slate-400 line-clamp-1 mt-0.5">Yes, we are a remote-first engineering organization.</span>
                </div>
                <span class="faq-accordion-chevron text-slate-400 transition-transform duration-250">&darr;</span>
              </button>
              <div class="faq-accordion-content max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out px-6 pb-5">
                <p class="text-xs text-slate-650 font-semibold leading-relaxed pt-2">
                  Yes. We are a remote-first engineering organization, with team members distributed across North America, Europe, and Asia, and support home office setups.
                </p>
              </div>
            </div>

            <!-- FAQ 7 -->
            <div class="faq-accordion-item bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200">
              <button type="button" class="faq-accordion-trigger w-full px-6 py-4 flex items-center justify-between text-left select-none outline-none">
                <div class="flex flex-col">
                  <span class="font-bold text-sm text-slate-900 uppercase tracking-tight">What is the typical interview process?</span>
                  <span class="text-[10px] text-slate-400 line-clamp-1 mt-0.5">A fast, structured process focused on systems engineering.</span>
                </div>
                <span class="faq-accordion-chevron text-slate-400 transition-transform duration-250">&darr;</span>
              </button>
              <div class="faq-accordion-content max-h-0 opacity-0 overflow-hidden transition-all duration-300 ease-in-out px-6 pb-5">
                <p class="text-xs text-slate-650 font-semibold leading-relaxed pt-2">
                  Our process is streamlined: Resume Review -> 30m Intro Chat -> 60m Technical Deep Dive (focusing on system design or Rust programming) -> 45m Executive Alignment.
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>

      <!-- CANDIDATE APPLICATION DRAWER BACKDROP (Hidden) -->
      <div id="drawer-backdrop" class="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs hidden transition-opacity duration-300"></div>

      <!-- CANDIDATE APPLICATION DRAWER (Slides from right) -->
      <div id="careers-drawer" class="fixed inset-y-0 right-0 z-50 w-full max-w-lg bg-white border-l border-slate-200 shadow-2xl transform translate-x-full transition-transform duration-300 ease-out flex flex-col justify-between">
        
        <!-- Drawer Header -->
        <div class="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50 select-none">
          <div class="flex flex-col">
            <span class="text-[9px] font-bold text-indigo-600 uppercase tracking-widest">Workspace Application</span>
            <h3 class="font-display font-black text-xl text-slate-900 uppercase leading-none mt-1">Submit Application</h3>
          </div>
          <button type="button" id="drawer-close-btn" class="w-8 h-8 rounded-full border hover:bg-slate-100 flex items-center justify-center text-slate-500 font-bold select-none text-sm">&times;</button>
        </div>

        <!-- Drawer Form Scrollable -->
        <form id="careers-form" class="flex-grow p-6 overflow-y-auto flex flex-col gap-4 font-semibold text-xs text-slate-700">
          
          <div class="flex flex-col gap-1.5">
            <label class="text-[9px] uppercase tracking-wider text-slate-400">Target Role</label>
            <input id="app-role" type="text" readonly class="p-3 border border-slate-200 bg-slate-100 rounded-xl font-bold text-slate-800 outline-none" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[9px] uppercase tracking-wider text-slate-400">Full Name</label>
            <input id="app-name" type="text" required placeholder="Sarah Connor" class="p-3.5 border border-slate-250 rounded-xl focus:border-indigo-500 outline-none font-semibold text-slate-800" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[9px] uppercase tracking-wider text-slate-400">Email Address</label>
            <input id="app-email" type="email" required placeholder="sarah@cyberdyne.org" class="p-3.5 border border-slate-250 rounded-xl focus:border-indigo-500 outline-none font-semibold text-slate-800" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[9px] uppercase tracking-wider text-slate-400">LinkedIn Profile</label>
            <input id="app-linkedin" type="url" required placeholder="https://linkedin.com/in/sarah" class="p-3.5 border border-slate-250 rounded-xl focus:border-indigo-500 outline-none font-semibold text-slate-800" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[9px] uppercase tracking-wider text-slate-400">Portfolio / GitHub Link</label>
            <input id="app-portfolio" type="url" required placeholder="https://github.com/sarahconnor" class="p-3.5 border border-slate-250 rounded-xl focus:border-indigo-500 outline-none font-semibold text-slate-800" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[9px] uppercase tracking-wider text-slate-400">Attach Resume</label>
            <input id="app-resume" type="text" required placeholder="Paste a link to your resume PDF" class="p-3.5 border border-slate-250 rounded-xl focus:border-indigo-500 outline-none font-semibold text-slate-800" />
          </div>

          <div class="flex flex-col gap-1.5">
            <label class="text-[9px] uppercase tracking-wider text-slate-400">Cover Message</label>
            <textarea id="app-message" rows="4" required placeholder="Describe why bare metal AI infrastructure interests you..." class="p-3.5 border border-slate-250 rounded-xl focus:border-indigo-500 outline-none font-medium text-slate-850"></textarea>
          </div>

        </form>

        <!-- Drawer Footer Actions -->
        <div class="p-6 border-t border-slate-200 bg-slate-50 flex gap-3">
          <button type="button" id="drawer-cancel-btn" class="flex-grow py-3.5 border hover:bg-slate-100 text-slate-650 font-bold rounded-xl uppercase tracking-wider text-center text-xs">
            Cancel
          </button>
          <button type="submit" form="careers-form" class="flex-grow py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl uppercase tracking-wider text-center text-xs shadow-md">
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

  // Open drawer helper
  function openDrawer(roleTitle) {
    if (roleInput) roleInput.value = roleTitle;
    backdrop?.classList.remove("hidden");
    drawer?.classList.remove("translate-x-full");
  }

  // Close drawer helper
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

  // Handle Form Submit
  appForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("app-name").value;
    const submitBtn = appForm.ownerDocument.querySelector("#careers-drawer button[type='submit']");
    
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = "SUBMITTING...";
    }

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = "Submit Application";
      }

      components.renderToast("success", `Application received! Thank you, ${name}.`);
      appForm.reset();
      closeDrawer();
    }, 1500);
  });
}

export default {
  careers,
  bindCareers
};
