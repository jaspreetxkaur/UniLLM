import { apiService } from "./apiService.js?v=2";
import { router } from "./router.js?v=2";

export const components = {
  // RENDER NAVBAR (Universal Navigation Bar)
  renderNavbar: (user) => {
    return `
<!-- =========================================================
     PREMIUM NAVIGATION
========================================================= -->

<nav
  id="public-navbar"
  class="fixed top-0 left-0 w-full z-50 transition-all duration-300 bg-[#07080B]/85 backdrop-blur-md border-b border-[#1F2438]/80 px-4 sm:px-6 lg:px-8 py-3.5"
>
  <div class="max-w-7xl mx-auto flex items-center justify-between">
    <div class="flex items-center gap-10">

      <!-- =====================================================
           LOGO (UniLLM Official Vector Logo)
      ====================================================== -->
      <a
        href="/"
        data-link
        class="group flex items-center shrink-0 select-none"
        aria-label="UniLLM Home"
      >
        <img src="/unillm-logo.svg?v=2" alt="UniLLM" class="h-7 w-auto transition-transform group-hover:scale-[1.02]" />
      </a>

      <!-- =====================================================
           DESKTOP NAVIGATION (Section 1 Required Items)
      ====================================================== -->
      <div class="hidden lg:flex items-center gap-6">
        <a
          href="/developers"
          data-link
          class="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          DevPass
        </a>
        <a
          href="/blog"
          data-link
          class="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          Lounge
        </a>
        <a
          href="/models"
          data-link
          class="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          Models
        </a>
        <a
          href="/product"
          data-link
          class="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          Products
        </a>
        <a
          href="/solutions"
          data-link
          class="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          Resources
        </a>
        <a
          href="/app/playground"
          data-link
          class="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          AI
        </a>
        <a
          href="/docs"
          data-link
          class="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          Docs
        </a>
        <a
          href="/pricing"
          data-link
          class="text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          Pricing
        </a>
      </div>
    </div>

    <!-- =====================================================
         RIGHT ACTIONS (Screen 01 Reference)
    ====================================================== -->
    <div class="flex items-center gap-3 shrink-0">
      <!-- Search trigger icon button -->
      <a
        href="/api-reference"
        data-link
        class="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-full border border-[#1F2438] bg-[#10121A] text-slate-400 hover:text-white hover:border-slate-500 transition-colors"
        title="Search Documentation"
      >
        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
      </a>

      ${user ? `
        <!-- Authenticated User Profile & Dashboard Navigation -->
        <a
          href="/app"
          data-link
          class="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 border border-[#1F2438] bg-[#10121A] hover:bg-[#161926] text-white font-semibold rounded-full text-xs transition-all shadow-xs"
        >
          <span class="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
          Console
        </a>
        <button
          id="navbar-logout-btn"
          class="hidden sm:inline-flex items-center justify-center px-3.5 py-2 border border-[#1F2438] bg-[#10121A] hover:bg-red-950/40 hover:text-red-400 hover:border-red-800 text-slate-400 font-semibold rounded-full text-xs transition-all"
          title="Sign Out"
        >
          Log Out
        </button>
      ` : `
        <!-- Log In Button -->
        <a
          href="/login"
          data-link
          class="hidden sm:inline-flex items-center justify-center px-4 py-2 text-slate-300 hover:text-white font-semibold text-xs transition-colors"
        >
          Sign In
        </a>

        <!-- Get Started Button (Solid white pill with black text matching Screen 01) -->
        <a
          href="/signup"
          data-link
          class="inline-flex items-center justify-center px-4 py-2 rounded-full text-xs font-bold text-black bg-white hover:bg-slate-100 transition-all shadow-md shadow-white/10"
        >
          Get Started &rarr;
        </a>
      `}

      <!-- =================================================
           MOBILE MENU BUTTON
      ================================================== -->
      <button
        id="mobile-menu-btn"
        class="lg:hidden relative w-9 h-9 flex items-center justify-center rounded-xl border border-[#1F2438] bg-[#10121A] text-slate-300 hover:text-white transition-all"
        aria-label="Toggle Menu"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          ></path>
        </svg>
      </button>
    </div>

  </div>
</nav>


<!-- =========================================================
     MOBILE NAVIGATION DRAWER
========================================================= -->

<div
  id="mobile-drawer"
  class="fixed inset-0 z-[60] bg-black/75 backdrop-blur-md opacity-0 pointer-events-none transition-all duration-300"
>

  <div
    class="absolute right-0 top-0 h-full w-[86%] max-w-sm bg-[#0D0E15] border-l border-[#1F2438] shadow-2xl p-6 flex flex-col justify-between transform translate-x-full transition-transform duration-300"
  >

    <!-- Drawer header -->
    <div>
      <div class="flex justify-between items-center mb-8 select-none">
        <div class="flex items-center gap-2">
          <span class="text-sky-400 font-extrabold text-lg">✦</span>
          <span class="font-sans font-bold text-lg text-white">
            UniLLM
          </span>
        </div>

        <button
          id="close-drawer-btn"
          class="w-9 h-9 flex items-center justify-center rounded-xl border border-[#1F2438] bg-[#161926] hover:bg-[#1E2235] text-slate-400 hover:text-white transition-all"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </      <!-- Mobile links -->
      <div class="flex flex-col">
        <a
          href="/developers"
          data-link
          class="group flex items-center justify-between py-3 border-b border-[#1F2438]/60 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          DevPass
          <span class="text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
        </a>

        <a
          href="/blog"
          data-link
          class="group flex items-center justify-between py-3 border-b border-[#1F2438]/60 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          Lounge
          <span class="text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
        </a>

        <a
          href="/models"
          data-link
          class="group flex items-center justify-between py-3 border-b border-[#1F2438]/60 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          Models
          <span class="text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
        </a>

        <a
          href="/product"
          data-link
          class="group flex items-center justify-between py-3 border-b border-[#1F2438]/60 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          Products
          <span class="text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
        </a>

        <a
          href="/solutions"
          data-link
          class="group flex items-center justify-between py-3 border-b border-[#1F2438]/60 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          Resources
          <span class="text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
        </a>

        <a
          href="/app/playground"
          data-link
          class="group flex items-center justify-between py-3 border-b border-[#1F2438]/60 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          AI
          <span class="text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
        </a>

        <a
          href="/docs"
          data-link
          class="group flex items-center justify-between py-3 border-b border-[#1F2438]/60 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          Docs
          <span class="text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
        </a>

        <a
          href="/pricing"
          data-link
          class="group flex items-center justify-between py-3 border-b border-[#1F2438]/60 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
        >
          Pricing
          <span class="text-slate-500 group-hover:text-sky-400 group-hover:translate-x-1 transition-transform">&rarr;</span>
        </a>
      </div></div>
    </div>

    <!-- Mobile actions -->
    <div class="flex flex-col gap-3">
      ${user ? `
        <a
          href="/app"
          data-link
          class="w-full flex items-center justify-center gap-2 py-3 bg-white text-black font-bold rounded-full text-xs transition-colors shadow-sm"
        >
          Open Console &rarr;
        </a>
        <button
          id="mobile-navbar-logout-btn"
          class="w-full text-center py-3 border border-red-900/60 bg-red-950/20 text-red-400 font-semibold rounded-full hover:bg-red-950/40 transition-colors text-xs"
        >
          Log Out
        </button>
      ` : `
        <a
          href="/login"
          data-link
          class="w-full text-center py-3 border border-[#1F2438] text-slate-300 hover:text-white font-semibold rounded-full hover:bg-[#161926] transition-colors text-xs"
        >
          Sign In
        </a>

        <a
          href="/signup"
          data-link
          class="w-full flex items-center justify-center gap-2 py-3 bg-white text-black font-bold rounded-full text-xs transition-colors shadow-md"
        >
          Get Started &rarr;
        </a>
      `}
    </div>

  </div>

</div>
    `;
  },

  bindNavbar: () => {
    const navbar = document.getElementById("public-navbar");
    const mobileBtn = document.getElementById("mobile-menu-btn");
    const closeBtn = document.getElementById("close-drawer-btn");
    const drawer = document.getElementById("mobile-drawer");
    const drawerInner = drawer?.firstElementChild;

    if (navbar) {
      const handleScroll = () => {
        if (window.scrollY > 15) {
          navbar.classList.add("bg-[#07080B]/95", "py-2.5", "shadow-lg", "border-[#1F2438]");
          navbar.classList.remove("bg-[#07080B]/80", "py-3.5", "border-[#1F2438]/60");
        } else {
          navbar.classList.add("bg-[#07080B]/80", "py-3.5", "border-[#1F2438]/60");
          navbar.classList.remove("bg-[#07080B]/95", "py-2.5", "shadow-lg", "border-[#1F2438]");
        }
      };
      window.addEventListener("scroll", handleScroll);
      handleScroll();

      const openDrawer = () => {
        if (drawer && drawerInner) {
          drawer.classList.remove("opacity-0", "pointer-events-none");
          drawerInner.classList.remove("translate-x-full");
        }
      };
      const closeDrawer = () => {
        if (drawer && drawerInner) {
          drawer.classList.add("opacity-0", "pointer-events-none");
          drawerInner.classList.add("translate-x-full");
        }
      };

      mobileBtn?.addEventListener("click", openDrawer);
      closeBtn?.addEventListener("click", closeDrawer);
      drawer?.addEventListener("click", (e) => {
        if (e.target === drawer) closeDrawer();
      });

      const navLogoutBtn = document.getElementById("navbar-logout-btn");
      navLogoutBtn?.addEventListener("click", () => {
        apiService.logout();
        components.renderToast("info", "Logged out successfully.");
        router.navigate("/login");
      });

      const mobileNavLogoutBtn = document.getElementById("mobile-navbar-logout-btn");
      mobileNavLogoutBtn?.addEventListener("click", () => {
        closeDrawer();
        apiService.logout();
        components.renderToast("info", "Logged out successfully.");
        router.navigate("/login");
      });

      window.addEventListener("popstate", () => {
        window.removeEventListener("scroll", handleScroll);
      }, { once: true });
    }
  },

  // 1. PUBLIC MARKETING LAYOUT
  PublicLayout: (content) => {
    const user = apiService.getCurrentUser();
    return `
      <!-- Ambient Glow Layers for Visual Depth -->
      <div class="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none">
        <div class="absolute top-0 left-0 w-full h-[50vh] ambient-glow-1"></div>
        <div class="absolute top-[30vh] left-[20vw] w-[80vw] h-[60vh] ambient-glow-2"></div>
        <div class="absolute top-[60vh] right-[10vw] w-[60vw] h-[50vh] ambient-glow-3"></div>
      </div>

      ${components.renderNavbar(user)}

<!-- =========================================================
     CONTENT AREA
========================================================= -->

<main class="flex-grow pt-20 min-h-screen">
  ${content}
</main>

      <!-- Public Footer (Screen 01 Reference - Tightened Spacing) -->
      <footer class="bg-[#07080B] border-t border-[#1F2438] py-10 px-6 lg:px-12 mt-4 relative select-none">
        <div class="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8 mb-8">
          <!-- Col 1: Brand Info -->
          <div class="col-span-2 flex flex-col gap-3.5">
            <a href="/" data-link class="flex items-center shrink-0 select-none" aria-label="UniLLM Home">
              <img src="/unillm-logo.svg?v=2" alt="UniLLM" class="h-7 w-auto" />
            </a>
            <p class="text-[10px] font-mono font-bold text-sky-400/90 tracking-widest uppercase">ONE API. EVERY AI MODEL. COMPLETE CONTROL.</p>
            <p class="text-xs text-slate-400 leading-relaxed max-w-sm font-medium">Access, route and manage 50+ leading AI models through a single, intelligent API — built for developers, teams and enterprises.</p>
          </div>
          
          <!-- Col 2: Product -->
          <div>
            <span class="text-[11px] font-bold text-white uppercase tracking-wider mb-3.5 block">Product</span>
            <div class="flex flex-col gap-2.5 text-xs text-slate-400 font-medium">
              <a href="/product" data-link class="hover:text-white transition-colors">Platform Overview</a>
              <a href="/models" data-link class="hover:text-white transition-colors">Model Marketplace</a>
              <a href="/app/playground" data-link class="hover:text-white transition-colors">Gateway Playground</a>
              <a href="/pricing" data-link class="hover:text-white transition-colors">Pricing Matrix</a>
            </div>
          </div>
          
          <!-- Col 3: Developers -->
          <div>
            <span class="text-[11px] font-bold text-white uppercase tracking-wider mb-3.5 block">Developers</span>
            <div class="flex flex-col gap-2.5 text-xs text-slate-400 font-medium">
              <a href="/docs" data-link class="hover:text-white transition-colors">Documentation</a>
              <a href="/api-reference" data-link class="hover:text-white transition-colors">API Reference</a>
              <a href="/developers" data-link class="hover:text-white transition-colors">SDK Libraries</a>
              <a href="/status" data-link class="hover:text-white transition-colors">System Uptime</a>
            </div>
          </div>
          
          <!-- Col 4: Enterprise -->
          <div>
            <span class="text-[11px] font-bold text-white uppercase tracking-wider mb-3.5 block">Enterprise</span>
            <div class="flex flex-col gap-2.5 text-xs text-slate-400 font-medium">
              <a href="/enterprise" data-link class="hover:text-white transition-colors">Enterprise Control</a>
              <a href="/solutions" data-link class="hover:text-white transition-colors">Solutions</a>
              <a href="/talk-to-sales" data-link class="hover:text-white transition-colors">Talk to Sales</a>
              <a href="/security" data-link class="hover:text-white transition-colors">Security Audit</a>
            </div>
          </div>
        </div>
        
        <div class="max-w-7xl mx-auto pt-8 border-t border-[#1F2438] flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-medium">
          <span>&copy; 2026 UniLLM Inc. All rights reserved.</span>
          <div class="flex items-center gap-6">
            <span class="inline-flex items-center gap-1.5 text-emerald-400">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Operational &bull; 99.9% Uptime
            </span>
            <a href="/security" data-link class="hover:text-white transition-colors">Privacy</a>
            <a href="/security" data-link class="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    `;
  },

  bindPublicLayout: () => {
    components.bindNavbar();
  },

  // 2. AUTHENTICATION LAYOUT (Screen 02 & 03 Reference)
  AuthLayout: (content) => {
    const isSignup = window.location.pathname.includes("signup");
    return `
      <div class="min-h-screen flex flex-col md:flex-row bg-[#07080B] font-sans">
        <!-- Left Branding Pane with Celestial Crescent Arc (Screens 02 & 03) -->
        <div class="hidden md:flex md:w-5/12 bg-[#090B10] text-white p-12 lg:p-16 flex-col justify-between relative overflow-hidden select-none border-r border-[#1F2438] crescent-light-bg min-h-screen">
          
          <a href="/" data-link class="flex items-center z-10 self-start group shrink-0 select-none" aria-label="UniLLM Home">
            <img src="/unillm-logo.svg?v=2" alt="UniLLM" class="h-8 w-auto transition-transform group-hover:scale-[1.02]" />
          </a>
          
          <div class="flex flex-col gap-6 z-10 my-auto max-w-sm">
            <h1 class="font-display font-black text-4xl lg:text-5xl leading-[1.1] text-white">
              ${isSignup ? "Start building<br>today." : "One account.<br>Infinite possibilities."}
            </h1>
            <p class="text-xs text-slate-400 leading-relaxed font-medium">
              ${isSignup 
                ? "Get access to 50+ AI models, intelligent routing and powerful tools." 
                : "Access the world's best AI models with a single, powerful API."}
            </p>

            <div class="flex flex-col gap-3 pt-2 text-xs font-semibold text-slate-300">
              <div class="flex items-center gap-2.5">
                <span class="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                <span>Unified API across 50+ frontier models</span>
              </div>
              <div class="flex items-center gap-2.5">
                <span class="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                <span>Intelligent latency routing and failover</span>
              </div>
              <div class="flex items-center gap-2.5">
                <span class="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                <span>Enterprise grade security and telemetry</span>
              </div>
            </div>
          </div>
          
          <div class="text-[11px] text-slate-500 font-medium z-10">
            &copy; 2026 UniLLM Inc. Global AI Gateway.
          </div>
        </div>
        
        <!-- Right Auth Content Frame (Screens 02 & 03 Card) -->
        <div class="flex-grow flex flex-col items-center justify-center p-6 sm:p-12 md:p-16 md:w-7/12 bg-[#07080B] min-h-screen relative overflow-hidden auth-form-stage">
          
          <!-- Extremely Subtle Ambient Glow Behind Form -->
          <div class="auth-ambient-glow" aria-hidden="true"></div>

          <!-- Mobile Brand Logo -->
          <a href="/" data-link class="md:hidden flex items-center mb-8 select-none group relative z-10 shrink-0" aria-label="UniLLM Home">
            <img src="/unillm-logo.svg?v=2" alt="UniLLM" class="h-8 w-auto" />
          </a>

          <div class="w-full max-w-md auth-card-container rounded-2xl p-8 sm:p-10 animate-fade-in-up relative z-10">
            <!-- Tabs (Sign In / Create Account) -->
            <div class="flex items-center bg-[#07080B] p-1 border border-[#1F2438] rounded-xl mb-6 text-xs font-bold select-none">
              <a href="/login" data-link class="flex-1 py-2 text-center rounded-lg transition-all ${!isSignup ? 'bg-[#161926] text-white shadow-xs' : 'text-slate-400 hover:text-white'}">
                Sign In
              </a>
              <a href="/signup" data-link class="flex-1 py-2 text-center rounded-lg transition-all ${isSignup ? 'bg-[#161926] text-white shadow-xs' : 'text-slate-400 hover:text-white'}">
                Create Account
              </a>
            </div>

            ${content}
          </div>
        </div>
      </div>
    `;
  },

  bindAuthLayout: () => {},

  // Helper: Top Right User Profile Dropdown with Role indicator (Admin vs Employee)
  renderUserProfileDropdown: (user, explicitRole = null) => {
    const rawRole = explicitRole || user.role || (user.orgName === "enterprise" || (user.email && user.email.toLowerCase().includes("admin")) ? "Admin" : "Employee");
    const isAdmin = rawRole.toLowerCase().includes("admin") || rawRole.toLowerCase().includes("owner");
    const roleTitle = isAdmin ? "ADMIN" : "EMPLOYEE";
    const initials = (user.name || "User")
      .split(" ")
      .filter(Boolean)
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "U";

    return `
      <!-- User Profile Top Right Dropdown -->
      <div class="relative" id="topbar-user-profile-container">
        <button
          id="topbar-profile-btn"
          class="flex items-center gap-2.5 pl-1.5 pr-3 py-1 rounded-full border border-[rgba(242,239,232,0.12)] bg-[#141615] hover:bg-[#1A1D1B] hover:border-[rgba(242,239,232,0.22)] transition-all duration-200 shadow-xs outline-none select-none group"
          title="Account Profile (${roleTitle})"
        >
          <div class="w-7 h-7 rounded-full bg-[#1A1D1B] border border-[rgba(242,239,232,0.14)] flex items-center justify-center font-mono font-semibold text-[11px] text-[#F2EFE8] tracking-wider shrink-0">
            ${initials}
          </div>
          
          <div class="hidden sm:flex flex-col items-start text-left leading-tight">
            <span class="text-[12px] font-semibold text-[#F2EFE8] tracking-tight group-hover:text-white transition-colors truncate max-w-[120px]">${user.name}</span>
            <div class="flex items-center gap-1 mt-0.5">
              ${isAdmin ? `
                <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8.5px] font-mono font-semibold tracking-wider bg-[#FF7849]/10 text-[#FF7849] border border-[#FF7849]/20 leading-none">
                  ADMIN
                </span>
              ` : `
                <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full text-[8.5px] font-mono font-semibold tracking-wider bg-[#42D6A4]/10 text-[#42D6A4] border border-[#42D6A4]/20 leading-none">
                  MEMBER
                </span>
              `}
            </div>
          </div>

          <svg class="w-3.5 h-3.5 text-[#A6A39C] group-hover:text-[#F2EFE8] transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg>
        </button>

        <!-- Dropdown Menu Box -->
        <div
          id="topbar-profile-menu"
          class="hidden absolute right-0 top-[48px] z-50 w-72 bg-[#141615] border border-[rgba(242,239,232,0.14)] rounded-xl shadow-2xl p-2.5 select-none animate-fade-in-up text-[#F2EFE8]"
        >
          <div class="px-3.5 py-3 rounded-lg bg-[#1A1D1B] border border-[rgba(242,239,232,0.08)] mb-2">
            <div class="flex items-center justify-between mb-1.5">
              <span class="text-[9px] font-mono font-bold text-[#A6A39C] uppercase tracking-widest">Active Identity</span>
              <span class="px-2 py-0.5 rounded-full text-[9px] font-mono font-semibold uppercase tracking-wider ${isAdmin ? "bg-[#FF7849]/10 text-[#FF7849] border border-[#FF7849]/20" : "bg-[#42D6A4]/10 text-[#42D6A4] border border-[#42D6A4]/20"}">
                ${isAdmin ? "Admin Access" : "Developer Access"}
              </span>
            </div>
            <p class="text-[13px] font-semibold text-[#F2EFE8] truncate leading-tight">${user.name}</p>
            <p class="text-[11px] text-[#A6A39C] font-normal truncate mt-0.5 font-mono">${user.email}</p>
          </div>

          <div class="flex flex-col gap-0.5 text-xs font-medium">
            <a href="/app/settings" data-link class="flex items-center gap-2.5 px-3 py-2 text-[#A6A39C] hover:text-[#F2EFE8] hover:bg-[#1A1D1B] rounded-lg transition-colors">
              <svg class="w-4 h-4 text-[#A6A39C]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
              Account Settings
            </a>

            <a href="/app/api-keys" data-link class="flex items-center gap-2.5 px-3 py-2 text-[#A6A39C] hover:text-[#F2EFE8] hover:bg-[#1A1D1B] rounded-lg transition-colors">
              <svg class="w-4 h-4 text-[#A6A39C]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg>
              API Keys Console
            </a>

            ${isAdmin ? `
              <a href="/admin" data-link class="flex items-center gap-2.5 px-3 py-2 text-[#FF7849] hover:text-[#ff926b] hover:bg-[#1A1D1B] rounded-lg transition-colors font-medium">
                <svg class="w-4 h-4 text-[#FF7849]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                Organization Admin Portal
              </a>
            ` : `
              <a href="/app" data-link class="flex items-center gap-2.5 px-3 py-2 text-[#42D6A4] hover:bg-[#1A1D1B] rounded-lg transition-colors font-medium">
                <svg class="w-4 h-4 text-[#42D6A4]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                Developer Dashboard
              </a>
            `}
          </div>

          <div class="border-t border-[rgba(242,239,232,0.08)] my-1.5"></div>

          <button
            id="topbar-dropdown-logout-btn"
            class="w-full flex items-center gap-2.5 px-3 py-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg text-xs font-semibold transition-colors"
          >
            <svg class="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Log Out of Session
          </button>
        </div>
      </div>
    `;
  },

  // 3. INDIVIDUAL / DEVELOPER DASHBOARD LAYOUT (Screens 04-07 & 10 Reference)
  AppLayout: (content) => {
    const user = apiService.getCurrentUser() || { name: "Jaspreet", email: "jaspreet@example.com" };
    const currentPath = window.location.pathname;
    const activeWorkspace = apiService.getActiveWorkspace();
    
    const menuItems = [
      { name: "Overview", path: "/app", icon: "grid" },
      { name: "Playground", path: "/app/playground", icon: "terminal" },
      { name: "Knowledge Base", path: "/admin/teams", icon: "file-text" },
      { name: "Models", path: "/app/models", icon: "cpu" },
      { name: "API Keys", path: "/app/api-keys", icon: "key" },
      { name: "Usage", path: "/app/usage", icon: "bar-chart" },
      { name: "Billing", path: "/app/billing", icon: "credit-card" },
      { name: "Team", path: "/admin/teams", icon: "users" },
      { name: "Settings", path: "/app/settings", icon: "settings" }
    ];

    const alerts = apiService.getAlerts();
    const unreadCount = alerts.filter(a => !a.read).length;

    return `
      <div class="min-h-screen flex bg-[#0B0C0D] font-sans text-[#F2EFE8]">
        <!-- Sidebar -->
        <aside id="dashboard-sidebar" class="fixed inset-y-0 left-0 z-30 w-60 bg-[#0B0C0D] border-r border-[rgba(242,239,232,0.08)] flex flex-col justify-between transition-transform duration-300 transform md:translate-x-0 -translate-x-full select-none">
          <div>
            <!-- Header -->
            <div class="h-16 border-b border-[rgba(242,239,232,0.08)] px-5 flex items-center justify-between">
              <a href="/" data-link class="flex items-center shrink-0" aria-label="UniLLM Home">
                <img src="/unillm-logo.svg?v=2" alt="UniLLM" class="h-6 w-auto" />
              </a>
              
              <!-- Close btn mobile -->
              <button id="sidebar-close-btn" class="md:hidden p-1.5 hover:bg-[#141615] rounded-lg text-[#A6A39C] hover:text-[#F2EFE8]">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <!-- Navigation Links -->
            <nav class="px-3 py-4 flex flex-col gap-1 overflow-y-auto max-h-[calc(100vh-160px)]">
              ${menuItems.map(item => {
                const isActive = currentPath === item.path || (item.path !== "/app" && currentPath.startsWith(item.path));
                return `
                  <a href="${item.path}" data-link class="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all ${
                    isActive
                      ? "bg-[#141615] text-[#F2EFE8] font-semibold border-l-2 border-[#42D6A4]"
                      : "text-[#A6A39C] hover:bg-[#141615]/70 hover:text-[#F2EFE8] font-medium border-l-2 border-transparent"
                  }">
                    ${getSidebarIconSvg(item.icon, isActive)}
                    <span>${item.name}</span>
                  </a>
                `;
              }).join("")}
            </nav>
          </div>
          
          <!-- Profile Footer Box -->
          <div class="p-3 border-t border-[rgba(242,239,232,0.08)] flex items-center justify-between select-none bg-[#0B0C0D]">
            <a href="/app/settings" data-link class="flex items-center gap-2.5 hover:opacity-90 transition-opacity max-w-[170px] group">
              <div class="w-8 h-8 rounded-full bg-[#141615] border border-[rgba(242,239,232,0.12)] flex items-center justify-center font-bold text-[#F2EFE8] font-mono text-xs shrink-0">
                ${(user.name || "User").slice(0, 1).toUpperCase()}
              </div>
              <div class="flex flex-col truncate">
                <span class="text-xs font-semibold text-[#F2EFE8] group-hover:text-white transition-colors truncate">${user.name || "Jaspreet"}</span>
                <span class="text-[10px] text-[#A6A39C] truncate">Personal</span>
              </div>
            </a>
            
            <button id="logout-btn" class="p-1.5 text-[#A6A39C] hover:text-[#FF7849] hover:bg-[#141615] rounded-lg transition-colors" title="Log Out">
              <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </button>
          </div>
        </aside>

        <!-- Main Window Area -->
        <div class="flex-grow md:pl-60 flex flex-col min-h-screen bg-[#0B0C0D]">
          <!-- Top bar -->
          <header class="h-16 border-b border-[rgba(242,239,232,0.08)] bg-[#0B0C0D]/90 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-20 select-none">
            <div class="flex items-center gap-4">
              <!-- Mobile Sidebar Toggle -->
              <button id="mobile-sidebar-toggle" class="md:hidden p-2 rounded-lg hover:bg-[#141615] text-[#F2EFE8]">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </button>
              
              <!-- Workspace Selector Dropdown -->
              <div class="relative">
                <button
                  id="workspace-dropdown-btn"
                  class="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-[rgba(242,239,232,0.12)] bg-[#141615] hover:bg-[#1A1D1B] hover:border-[rgba(242,239,232,0.22)] transition-all text-xs font-semibold text-[#F2EFE8] shadow-xs group"
                >
                  <div class="w-2 h-2 rounded-full bg-[#42D6A4] shadow-[0_0_8px_rgba(66,214,164,0.4)]"></div>
                  <span id="current-workspace-name" class="font-sans font-bold text-[#F2EFE8] max-w-[120px] sm:max-w-[180px] truncate">${activeWorkspace}</span>
                  <svg class="w-3.5 h-3.5 text-[#A6A39C] group-hover:text-[#F2EFE8] transition-colors" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path></svg>
                </button>
                <div id="workspace-menu" class="absolute left-0 mt-2 w-64 bg-[#141615] border border-[rgba(242,239,232,0.14)] rounded-xl shadow-2xl p-2 hidden z-50 flex flex-col gap-1 animate-scale-up text-[#F2EFE8]">
                  <div class="px-3 py-1.5 text-[9px] font-mono font-bold text-[#A6A39C] uppercase tracking-widest select-none">Switch Workspace</div>
                  <div id="workspace-options-list" class="flex flex-col gap-1 max-h-48 overflow-y-auto">
                    <!-- Populated dynamically -->
                  </div>
                  <div class="border-t border-[rgba(242,239,232,0.08)] my-1"></div>
                  <a href="/admin/teams" data-link class="w-full text-left px-3 py-2 hover:bg-[#1A1D1B] text-[#42D6A4] rounded-lg flex items-center gap-1.5 font-medium text-xs transition-colors">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path></svg> Manage Workspaces
                  </a>
                </div>
              </div>

              <!-- Cmd+K Palette Search trigger button -->
              <button id="topbar-search-trigger" class="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-[rgba(242,239,232,0.1)] rounded-xl bg-[#141615] hover:bg-[#1A1D1B] text-[#A6A39C] hover:text-[#F2EFE8] text-xs font-medium w-56 select-none outline-none transition-colors">
                <svg class="w-3.5 h-3.5 text-[#A6A39C]" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span class="flex-grow text-left text-[11px]">Search docs...</span>
                <kbd class="px-1.5 py-0.5 border border-[rgba(242,239,232,0.12)] rounded bg-[#0B0C0D] text-[9px] font-mono font-bold text-[#A6A39C]">⌘K</kbd>
              </button>
            </div>
            
            <div class="flex items-center gap-4">
              <a href="/docs" data-link class="hidden md:inline-flex text-xs font-semibold text-[#A6A39C] hover:text-[#F2EFE8] transition-colors">Docs</a>
              <a href="/api-reference" data-link class="hidden md:inline-flex text-xs font-semibold text-[#A6A39C] hover:text-[#F2EFE8] transition-colors">API Reference</a>
              
              <div class="border-l border-[rgba(242,239,232,0.08)] h-5 hidden md:block"></div>
              
              <!-- Notifications drawer toggle -->
              <button id="notification-drawer-toggle" class="p-2 hover:bg-[#141615] rounded-xl text-[#A6A39C] hover:text-[#F2EFE8] relative outline-none transition-colors">
                <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                ${unreadCount > 0 ? `<div class="absolute right-2.5 top-2.5 w-1.5 h-1.5 rounded-full bg-[#FF7849]"></div>` : ""}
              </button>

              ${components.renderUserProfileDropdown(user)}
            </div>
          </header>

          <!-- App Main Content Viewport -->
          <main class="flex-grow p-6 md:p-8 max-w-7xl mx-auto w-full">
            ${content}
          </main>
        </div>
      </div>
      
      <!-- Overlays -->
      ${components.renderCmdPalette()}
      ${components.renderNotificationDrawer(alerts)}
    `;
  },

  bindAppLayout: () => {
    const sidebar = document.getElementById("dashboard-sidebar");
    const mobileBtn = document.getElementById("mobile-sidebar-toggle");
    const closeBtn = document.getElementById("sidebar-close-btn");
    
    const dropdownBtn = document.getElementById("workspace-dropdown-btn");
    const dropdownMenu = document.getElementById("workspace-menu");
    const workspaceNameEl = document.getElementById("current-workspace-name");

    mobileBtn?.addEventListener("click", () => sidebar.classList.remove("-translate-x-full"));
    closeBtn?.addEventListener("click", () => sidebar.classList.add("-translate-x-full"));

    const refreshWorkspaceDropdown = async () => {
      const workspaces = await apiService.getWorkspaces();
      const currentName = apiService.getActiveWorkspace();
      const optionsContainer = document.getElementById("workspace-options-list");
      if (optionsContainer && workspaces && workspaces.length > 0) {
        optionsContainer.innerHTML = workspaces.map(w => {
          const isSelected = w.name === currentName;
          return `
            <button class="workspace-option w-full text-left px-3 py-2 ${isSelected ? 'bg-[#161926] text-white border border-[#38BDF8]/30 font-bold' : 'hover:bg-[#161926]/70 text-[#8E98B0] hover:text-white'} rounded-xl flex items-center justify-between text-xs transition-colors" data-workspace="${w.name}" data-workspace-id="${w.id}">
              <div class="flex items-center gap-2 truncate">
                <div class="w-2 h-2 rounded-full ${isSelected ? 'bg-[#38BDF8]' : 'bg-[#56617A]'}"></div>
                <span class="truncate">${w.name}</span>
              </div>
              ${w.isDefault || w.is_default ? '<span class="text-[8px] text-[#8E98B0] font-mono px-1.5 py-0.5 rounded bg-[#07080B]">Default</span>' : ''}
            </button>
          `;
        }).join("");

        optionsContainer.querySelectorAll(".workspace-option").forEach((opt) => {
          opt.addEventListener("click", (e) => {
            e.stopPropagation();
            const selected = opt.getAttribute("data-workspace");
            const selectedId = opt.getAttribute("data-workspace-id");
            if (selected) {
              apiService.setActiveWorkspace(selected, selectedId);
              if (workspaceNameEl) workspaceNameEl.textContent = selected;
              components.renderToast("success", `Active workspace: ${selected}`);
              dropdownMenu?.classList.add("hidden");
              router.resolve();
            }
          });
        });
      }
    };

    dropdownBtn?.addEventListener("click", async (e) => {
      e.stopPropagation();
      dropdownMenu?.classList.toggle("hidden");
      if (!dropdownMenu?.classList.contains("hidden")) {
        await refreshWorkspaceDropdown();
      }
    });

    document.addEventListener("click", () => dropdownMenu?.classList.add("hidden"));

    const logoutBtn = document.getElementById("logout-btn");
    logoutBtn?.addEventListener("click", () => {
      apiService.logout();
      router.navigate("/login");
    });

    const topbarProfileBtn = document.getElementById("topbar-profile-btn");
    const topbarProfileMenu = document.getElementById("topbar-profile-menu");
    const topbarLogoutBtn = document.getElementById("topbar-dropdown-logout-btn");

    topbarProfileBtn?.addEventListener("click", (e) => {
      e.stopPropagation();
      topbarProfileMenu?.classList.toggle("hidden");
    });
    document.addEventListener("click", () => {
      topbarProfileMenu?.classList.add("hidden");
    });

    topbarLogoutBtn?.addEventListener("click", () => {
      apiService.logout();
      components.renderToast("info", "Logged out successfully.");
      router.navigate("/login");
    });
  },

  // 4. BUSINESS / ORGANIZATION ADMIN LAYOUT
  AdminLayout: (content) => {
    const user = apiService.getCurrentUser() || { name: "Organization Admin", email: "admin@unillm.ai", org: "UniLLM", role: "admin" };
    const currentPath = window.location.pathname;

    const orgDisplayName = (user?.org || "UniLLM").replace(/\s+Systems|\s+Corp/i, "");
    const roleDisplayName = user?.role ? (user.role.charAt(0).toUpperCase() + user.role.slice(1).toLowerCase()) : "Admin";
    const sidebarTitle = `${orgDisplayName} ${roleDisplayName}`.toUpperCase();

    const adminMenuItems = [
      { name: "Overview", path: "/admin", icon: "shield-alert" },
      { name: "Knowledge Base", path: "/admin/teams", icon: "file-text" },
      { name: "Employees Catalog", path: "/admin/employees", icon: "users" },
      { name: "Employee Referral", path: "/admin/referrals", icon: "user-plus" },
      { name: "Team Settings", path: "/admin/teams", icon: "briefcase" },
      { name: "Model Settings", path: "/admin/models", icon: "cpu" },
      { name: "Governance Policies", path: "/admin/policies", icon: "check-square" },
      { name: "Limits & Quotas", path: "/admin/limits", icon: "sliders" },
      { name: "Budget Alerts", path: "/admin/alerts", icon: "bell-ring" },
      { name: "Governance Audit Logs", path: "/admin/audit-logs", icon: "file-text" },
      { name: "Organization API Keys", path: "/admin/api-keys", icon: "key" },
      { name: "Org Insights", path: "/admin/analytics", icon: "bar-chart-2" },
      { name: "Cost Intelligence", path: "/admin/costs", icon: "line-chart" },
      { name: "Billing & Invoices", path: "/admin/billing", icon: "credit-card" },
      { name: "Security & SSO", path: "/admin/security", icon: "lock" },
      { name: "Org Settings", path: "/admin/settings", icon: "settings" }
    ];

    const alerts = apiService.getAlerts();
    const unreadCount = alerts.filter(a => !a.read).length;

    return `
      <div class="min-h-screen flex bg-[#07080B] font-sans text-white">
        <!-- Sidebar -->
        <aside id="dashboard-sidebar" class="fixed inset-y-0 left-0 z-30 w-64 bg-[#090B10] border-r border-[#1B1F2E] flex flex-col justify-between transition-transform duration-300 transform md:translate-x-0 -translate-x-full select-none">
          <div>
            <!-- Branding Panel -->
            <div class="h-16 border-b border-[#1B1F2E] px-5 flex items-center justify-between">
              <a href="/" data-link class="flex items-center gap-2 shrink-0" aria-label="UniLLM Home">
                <img src="/unillm-logo.svg?v=2" alt="UniLLM" class="h-6 w-auto" />
                <span class="text-[8px] font-mono font-bold text-[#38BDF8] bg-[#38BDF8]/10 border border-[#38BDF8]/20 px-1.5 py-0.5 rounded-full uppercase shrink-0">ORG</span>
              </a>
              
              <button id="sidebar-close-btn" class="md:hidden p-1.5 hover:bg-[#161926] rounded-lg text-slate-400">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <a href="/admin/settings" data-link class="px-5 py-3 border-b border-[#1B1F2E] flex items-center justify-between hover:bg-[#121520] transition-colors group cursor-pointer" title="Click to edit Organization & Admin profile">
              <div class="flex items-center gap-2 text-[10px] font-mono font-bold text-slate-400 group-hover:text-white uppercase tracking-wider select-none truncate">
                <svg class="w-4 h-4 text-purple-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                <span class="truncate">${sidebarTitle}</span>
              </div>
              <svg class="w-3.5 h-3.5 text-slate-500 group-hover:text-sky-400 opacity-60 group-hover:opacity-100 transition-opacity shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            </a>
            
            <!-- Admin Navigation links -->
            <nav class="px-3 py-3 flex flex-col gap-0.5 overflow-y-auto max-h-[calc(100vh-220px)]">
              ${adminMenuItems.map(item => {
                const isActive = currentPath === item.path;
                return `
                  <a href="${item.path}" data-link class="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-[#161926] text-white font-bold border-l-2 border-[#38BDF8] shadow-xs"
                      : "text-slate-400 hover:bg-[#10121A] hover:text-white"
                  }">
                    ${getSidebarIconSvg(item.icon, isActive)}
                    <span>${item.name}</span>
                  </a>
                `;
              }).join("")}
            </nav>
          </div>
          
          <!-- User Profile box -->
          <div class="p-3 border-t border-[#1B1F2E] flex items-center justify-between select-none bg-[#090B10]">
            <a href="/admin/settings" data-link class="flex items-center gap-2.5 hover:opacity-90 transition-opacity max-w-[170px] group">
              <div class="w-8 h-8 rounded-full bg-slate-800 border border-[#1F2438] flex items-center justify-center font-bold text-white font-mono text-[11px] shrink-0">
                ${(user.name || "Admin").split(" ").filter(Boolean).map(n => n[0]).join("").toUpperCase().slice(0, 2) || "AD"}
              </div>
              <div class="flex flex-col truncate">
                <span class="text-xs font-bold text-white group-hover:text-sky-400 transition-colors truncate">${user.name}</span>
                <span class="text-[10px] font-mono text-purple-400 truncate">🛡️ Org Admin</span>
              </div>
            </a>
            
            <button id="logout-btn" class="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-950/30 rounded-lg transition-colors" title="Log Out">
              <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            </button>
          </div>
        </aside>

        <!-- Main Workspace Frame -->
        <div class="flex-grow md:pl-64 flex flex-col bg-[#07080B] min-h-screen">
          <!-- Top bar -->
          <header class="h-16 border-b border-[#1B1F2E] bg-[#0A0B0F]/90 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-20 select-none">
            <div class="flex items-center gap-4">
              <button id="mobile-sidebar-toggle" class="md:hidden p-2 rounded-lg hover:bg-[#161926] text-white">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"></path></svg>
              </button>
              
              <button id="topbar-search-trigger" class="hidden sm:flex items-center gap-2 px-3 py-1.5 border border-[#1F2438] rounded-xl bg-[#10121A] hover:bg-[#161926] text-slate-400 text-xs font-medium w-64 select-none outline-none transition-colors">
                <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <span class="flex-grow text-left text-[11px]">Search settings...</span>
                <kbd class="px-1.5 py-0.5 border border-[#1F2438] rounded bg-[#07080B] text-[9px] font-mono font-bold text-slate-400">⌘K</kbd>
              </button>
            </div>
            
            <div class="flex items-center gap-4">
              <a href="/app" data-link class="text-[10px] font-mono font-bold px-3 py-1.5 bg-[#10121A] border border-[#1F2438] text-white rounded-lg hover:bg-[#161926] hover:border-[#38BDF8]/40 transition-colors uppercase tracking-wider">
                Developer Console
              </a>
              
              <div class="border-l border-[#1B1F2E] h-5 hidden sm:block"></div>
              
              <button id="notification-drawer-toggle" class="p-2 hover:bg-[#161926] rounded-xl text-slate-400 hover:text-white relative outline-none transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                ${unreadCount > 0 ? `<div class="absolute right-2.5 top-2.5 w-1.5 h-1.5 rounded-full bg-sky-400"></div>` : ""}
              </button>

              ${components.renderUserProfileDropdown(user, "Admin")}
            </div>
          </header>

          <!-- Admin Content Viewport -->
          <main class="flex-grow p-6 md:p-8 max-w-7xl mx-auto w-full bg-[#07080B]">
            ${content}
          </main>
        </div>
      </div>
      
      <!-- Overlays -->
      ${components.renderCmdPalette()}
      ${components.renderNotificationDrawer(alerts)}
    `;
  },

  bindAdminLayout: () => {
    components.bindAppLayout();
  },

  // 5. DOCUMENTATION LAYOUT (Clean, Spacious 2-Column Developer Layout)
  DocsLayout: (content) => {
    const user = apiService.getCurrentUser();
    const currentPath = window.location.pathname;

    return `
      ${components.renderNavbar(user)}

      <div class="min-h-screen bg-[#0B0C0D] text-[#F2EFE8] font-sans pt-16">
        <div class="max-w-[1440px] mx-auto flex">
          
          <!-- Clean Fixed-Width Sidebar (250px) -->
          <aside class="hidden lg:flex w-64 shrink-0 border-r border-[rgba(242,239,232,0.1)] bg-[#0B0C0D] px-4 py-8 select-none sticky top-16 h-[calc(100vh-64px)] flex-col justify-between overflow-y-auto">
            
            <div class="flex flex-col gap-6">
              
              <!-- Search Box -->
              <div class="relative">
                <svg class="w-3.5 h-3.5 text-[#A6A39C] absolute left-3 top-2.5 pointer-events-none" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                <input 
                  id="docs-sidebar-search" 
                  type="text" 
                  placeholder="Search docs..." 
                  class="w-full bg-[#141615] border border-[rgba(242,239,232,0.12)] rounded-lg pl-8 pr-8 py-1.5 text-xs text-[#F2EFE8] placeholder-[#A6A39C]/60 outline-none focus:border-[#42D6A4] transition-colors" 
                />
                <span class="absolute right-2 top-1.5 text-[9px] font-mono text-[#A6A39C] border border-[rgba(242,239,232,0.12)] px-1 rounded bg-[#1A1D1B]">/</span>
              </div>

              <!-- Clean Navigation Links -->
              <nav id="docs-sidebar-nav" class="flex flex-col gap-5 text-xs">
                
                <!-- Group 1: Overview -->
                <div class="flex flex-col gap-1 docs-nav-group">
                  <span class="text-[10px] font-mono uppercase tracking-wider text-[#A6A39C] px-2 mb-0.5">Getting Started</span>
                  <a href="/docs#quickstart" class="docs-nav-item flex items-center px-2.5 py-1.5 rounded-lg font-medium transition-colors border-l-2 ${currentPath === "/docs" ? "bg-[#141615] text-[#F2EFE8] border-[#42D6A4]" : "border-transparent text-[#A6A39C] hover:text-white hover:bg-[#141615]/60"}">
                    Quickstart
                  </a>
                  <a href="/docs#authentication" class="docs-nav-item flex items-center px-2.5 py-1.5 rounded-lg font-medium border-l-2 border-transparent text-[#A6A39C] hover:text-white hover:bg-[#141615]/60 transition-colors">
                    Authentication
                  </a>
                  <a href="/docs#making-requests" class="docs-nav-item flex items-center px-2.5 py-1.5 rounded-lg font-medium border-l-2 border-transparent text-[#A6A39C] hover:text-white hover:bg-[#141615]/60 transition-colors">
                    Making Requests
                  </a>
                  <a href="/docs#response-format" class="docs-nav-item flex items-center px-2.5 py-1.5 rounded-lg font-medium border-l-2 border-transparent text-[#A6A39C] hover:text-white hover:bg-[#141615]/60 transition-colors">
                    Response Format
                  </a>
                </div>

                <!-- Group 2: Endpoints & Routing -->
                <div class="flex flex-col gap-1 docs-nav-group">
                  <span class="text-[10px] font-mono uppercase tracking-wider text-[#A6A39C] px-2 mb-0.5">Core Gateway</span>
                  <a href="/api-reference" data-link class="docs-nav-item flex items-center justify-between px-2.5 py-1.5 rounded-lg font-medium border-l-2 ${currentPath === "/api-reference" ? "bg-[#141615] text-[#F2EFE8] border-[#42D6A4]" : "border-transparent text-[#A6A39C] hover:text-white hover:bg-[#141615]/60"} transition-colors">
                    <span>API Reference</span>
                    <span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#42D6A4]/10 text-[#42D6A4]">v1</span>
                  </a>
                  <a href="/models" data-link class="docs-nav-item flex items-center justify-between px-2.5 py-1.5 rounded-lg font-medium border-l-2 border-transparent text-[#A6A39C] hover:text-white hover:bg-[#141615]/60 transition-colors">
                    <span>Model Catalog</span>
                    <span class="text-[9px] font-mono text-[#A6A39C]">50+</span>
                  </a>
                  <a href="/docs#rate-limits" class="docs-nav-item flex items-center px-2.5 py-1.5 rounded-lg font-medium border-l-2 border-transparent text-[#A6A39C] hover:text-white hover:bg-[#141615]/60 transition-colors">
                    Rate Limits & Quotas
                  </a>
                  <a href="/docs#errors" class="docs-nav-item flex items-center px-2.5 py-1.5 rounded-lg font-medium border-l-2 border-transparent text-[#A6A39C] hover:text-white hover:bg-[#141615]/60 transition-colors">
                    Error Handling
                  </a>
                </div>

                <!-- Group 3: SDKs & Tools -->
                <div class="flex flex-col gap-1 docs-nav-group">
                  <span class="text-[10px] font-mono uppercase tracking-wider text-[#A6A39C] px-2 mb-0.5">Resources</span>
                  <a href="/developers" data-link class="docs-nav-item flex items-center px-2.5 py-1.5 rounded-lg font-medium border-l-2 border-transparent text-[#A6A39C] hover:text-white hover:bg-[#141615]/60 transition-colors">
                    SDK Libraries
                  </a>
                  <a href="/app/playground" data-link class="docs-nav-item flex items-center px-2.5 py-1.5 rounded-lg font-medium border-l-2 border-transparent text-[#A6A39C] hover:text-white hover:bg-[#141615]/60 transition-colors">
                    Model Playground
                  </a>
                  <a href="/app/api-keys" data-link class="docs-nav-item flex items-center px-2.5 py-1.5 rounded-lg font-medium border-l-2 border-transparent text-[#A6A39C] hover:text-white hover:bg-[#141615]/60 transition-colors">
                    API Keys
                  </a>
                </div>

              </nav>
            </div>

            <!-- Sidebar Footer Status -->
            <div class="pt-4 border-t border-[rgba(242,239,232,0.1)] flex items-center justify-between text-[11px] font-mono text-[#A6A39C]">
              <span class="flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 rounded-full bg-[#42D6A4]"></span>
                API v1 Active
              </span>
              <span>0.8ms hop</span>
            </div>

          </aside>

          <!-- Main Spacious Content Area (Max width 920px, clean centered breathing room) -->
          <main class="flex-grow min-w-0 px-6 sm:px-12 py-10 max-w-[920px]">
            ${content}
          </main>

        </div>
      </div>
    `;
  },

  bindDocsLayout: () => {
    components.bindNavbar();

    // 1. Sidebar real-time search filter
    const searchInput = document.getElementById("docs-sidebar-search");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        const navItems = document.querySelectorAll(".docs-nav-item");
        const groups = document.querySelectorAll(".docs-nav-group");

        navItems.forEach(item => {
          const text = item.textContent.toLowerCase();
          if (!query || text.includes(query)) {
            item.style.display = "flex";
          } else {
            item.style.display = "none";
          }
        });

        // Hide empty groups
        groups.forEach(group => {
          const visibleItems = group.querySelectorAll('.docs-nav-item:not([style*="display: none"])');
          if (visibleItems.length === 0) {
            group.style.display = "none";
          } else {
            group.style.display = "flex";
          }
        });
      });

      // Keyboard shortcut "/" to focus search
      window.addEventListener("keydown", (e) => {
        if (e.key === "/" && document.activeElement !== searchInput) {
          e.preventDefault();
          searchInput.focus();
        }
      });
    }

    // 2. Smooth topic sliding & Scrollspy for Docs topics
    const navLinks = document.querySelectorAll(".docs-nav-item");
    const rightTocLinks = document.querySelectorAll("aside a[href^='#']");

    function smoothScrollToTopic(targetId) {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.classList.add("ring-1", "ring-[#42D6A4]/30", "transition-all", "duration-500", "rounded-xl");
        setTimeout(() => {
          el.classList.remove("ring-1", "ring-[#42D6A4]/30");
        }, 1200);
      }
    }

    function setActiveDocsLink(activeHref) {
      navLinks.forEach(link => {
        const linkHref = link.getAttribute("href") || "";
        const isMatch = (linkHref === activeHref) || 
                        ((activeHref === "/docs" || activeHref === "" || activeHref === "/docs#") && linkHref === "/docs#quickstart");

        // Clean up any legacy light-mode classes if present
        link.classList.remove("bg-indigo-50/80", "text-brand-primary", "shadow-xs", "ring-1", "ring-indigo-200/60", "text-slate-600");

        if (isMatch) {
          link.classList.add("bg-[#141615]", "text-[#F2EFE8]", "font-semibold", "border-[#42D6A4]");
          link.classList.remove("text-[#A6A39C]", "border-transparent");
        } else if (linkHref.startsWith("/docs#") || linkHref === "/docs") {
          link.classList.remove("bg-[#141615]", "text-[#F2EFE8]", "border-[#42D6A4]", "font-semibold", "text-white");
          link.classList.add("text-[#A6A39C]", "border-transparent");
        }
      });

      rightTocLinks.forEach(link => {
        const linkHash = link.getAttribute("href") || "";
        if (activeHref.endsWith(linkHash)) {
          link.classList.add("text-[#42D6A4]", "font-semibold");
          link.classList.remove("text-[#A6A39C]");
        } else {
          link.classList.remove("text-[#42D6A4]", "font-semibold");
          link.classList.add("text-[#A6A39C]");
        }
      });
    }

    // Set initial active state based on hash or default to quickstart
    if (window.location.pathname === "/docs") {
      const currentHash = window.location.hash || "#quickstart";
      setActiveDocsLink(`/docs${currentHash}`);
    }

    navLinks.forEach(link => {
      const href = link.getAttribute("href") || "";
      if (href.includes("#") && href.startsWith("/docs#")) {
        link.addEventListener("click", (e) => {
          if (window.location.pathname === "/docs") {
            e.preventDefault();
            const hash = href.split("#")[1];
            window.history.pushState(null, null, href);
            smoothScrollToTopic(hash);
            setActiveDocsLink(href);
          }
        });
      }
    });

    rightTocLinks.forEach(link => {
      const href = link.getAttribute("href") || "";
      if (href.startsWith("#")) {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          const hash = href.replace("#", "");
          window.history.pushState(null, null, `/docs#${hash}`);
          smoothScrollToTopic(hash);
          setActiveDocsLink(`/docs#${hash}`);
        });
      }
    });

    // Scrollspy with Intersection Observer for doc sections
    const sectionIds = ["quickstart", "authentication", "making-requests", "response-format"];
    const sectionElements = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

    if (sectionElements.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveDocsLink(`/docs#${entry.target.id}`);
          }
        });
      }, { rootMargin: "-10% 0px -65% 0px", threshold: 0 });

      sectionElements.forEach(sec => observer.observe(sec));
    }
  },

  // 6. GLOBAL PORTAL COMMAND PALETTE (CMD+K)
  renderCmdPalette: () => {
    return `
      <div id="cmd-palette" class="fixed inset-0 z-50 bg-[#07080B]/80 backdrop-blur-sm hidden items-start justify-center pt-[15vh] px-4 select-none">
        <div class="w-full max-w-xl bg-[#10121A] border border-[#1F2438] rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[50vh] animate-fade-in-up text-white">
          <!-- Search Header -->
          <div class="h-14 border-b border-[#1F2438] px-4 flex items-center gap-3 bg-[#0D0E15]">
            <svg class="w-4 h-4 text-[#8E98B0] shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input id="cmd-input" type="text" placeholder="Search commands, rules or model names (e.g. playground, routing)..." class="flex-grow bg-transparent border-0 outline-none text-xs font-medium text-white placeholder-[#8E98B0]/60" />
            <span class="text-[9px] text-[#8E98B0] px-1.5 py-0.5 border border-[#1F2438] rounded bg-[#161926] font-mono uppercase">Esc</span>
          </div>
          
          <!-- Search Results -->
          <div id="cmd-results" class="flex-grow overflow-y-auto p-2 text-xs text-[#8E98B0] flex flex-col gap-0.5 select-text">
            <!-- Populated via javascript -->
          </div>
          
          <!-- Footer Guide -->
          <div class="h-9 border-t border-[#1F2438] bg-[#07080B] px-4 flex items-center justify-between text-[10px] text-[#8E98B0] font-mono">
            <div class="flex items-center gap-4">
              <span><kbd class="font-mono text-white">↑↓</kbd> Navigate</span>
              <span><kbd class="font-mono text-white">Enter</kbd> Select</span>
            </div>
            <span>UniLLM Gateway Console</span>
          </div>
        </div>
      </div>
    `;
  },

  // 7. GLOBAL NOTIFICATIONS DRAWER
  renderNotificationDrawer: (alerts) => {
    return `
      <div id="notification-drawer" class="fixed inset-y-0 right-0 z-45 w-80 bg-[#090B10] border-l border-[#1B1F2E] shadow-2xl hidden flex-col justify-between animate-fade-in-up select-none text-white">
        <div>
          <div class="h-16 border-b border-[#1B1F2E] px-5 flex items-center justify-between">
            <span class="font-sans font-bold text-sm text-white">Notification Inbox</span>
            <button id="notification-close-btn" class="p-1.5 hover:bg-[#161926] rounded-lg text-slate-400">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
          
          <div class="overflow-y-auto max-h-[calc(100vh-130px)] divide-y divide-[#1B1F2E] select-text">
            ${alerts.map(item => `
              <div class="p-4 ${item.read ? "bg-[#090B10]" : "bg-[#10121A]"} hover:bg-[#161926] transition-colors relative" data-alert-id="${item.id}">
                <div class="flex items-start gap-2.5">
                  <div class="mt-0.5 shrink-0">
                    ${item.severity === "critical" 
                      ? `<div class="w-2 h-2 rounded-full bg-rose-500"></div>` 
                      : item.severity === "warning"
                      ? `<div class="w-2 h-2 rounded-full bg-amber-400"></div>`
                      : `<div class="w-2 h-2 rounded-full bg-[#38BDF8]"></div>`}
                  </div>
                  <div class="flex flex-col gap-1 pr-8">
                    <span class="text-xs font-semibold text-white">${item.title}</span>
                    <span class="text-[11px] text-[#8E98B0] leading-relaxed">${item.message}</span>
                    <span class="text-[9px] text-[#8E98B0]/70 font-mono">${item.timestamp}</span>
                  </div>
                </div>
                ${!item.read ? `<button class="mark-read-btn absolute right-3 top-3.5 text-[9px] text-[#38BDF8] font-mono hover:underline">Mark read</button>` : ""}
              </div>
            `).join("")}
            ${alerts.length === 0 ? `
              <div class="p-8 text-center text-xs text-[#8E98B0]">
                No active notifications. Gateway running smoothly.
              </div>
            ` : ""}
          </div>
        </div>
        
        <div class="p-4 border-t border-[#1B1F2E] bg-[#07080B] flex items-center justify-between text-xs text-[#8E98B0]">
          <span class="font-mono text-[10px]">Telemetry Active</span>
          <button id="clear-alerts-btn" class="font-semibold text-[#38BDF8] hover:underline text-xs">Dismiss all</button>
        </div>
      </div>
    `;
  },

  // 8. GLOBAL OVERLAYS INTERACTION EVENT BINDERS
  bindGlobalOverlays: () => {
    const palette = document.getElementById("cmd-palette");
    const cmdInput = document.getElementById("cmd-input");
    const cmdResults = document.getElementById("cmd-results");
    const triggerBtn = document.getElementById("topbar-search-trigger");

    const commands = [
      { name: "Open Playground Console", action: () => router.navigate("/app/playground"), keywords: "play, terminal, code, chat, stream" },
      { name: "View Model Marketplace", action: () => router.navigate("/app/models"), keywords: "models, marketplace, gpt, gemini, claude" },
      { name: "Arena Comparison Battle", action: () => router.navigate("/app/arena"), keywords: "arena, match, compare, benchmark" },
      { name: "Requests Observability Logs", action: () => router.navigate("/app/requests"), keywords: "requests, traces, debugging, logs" },
      { name: "Routing Rules Configurator", action: () => router.navigate("/app/routing"), keywords: "routing, fallback, rules, complexity" },
      { name: "Smart Caching Settings", action: () => router.navigate("/app/cache"), keywords: "cache, smart caching, latency" },
      { name: "API Key Management Console", action: () => router.navigate("/app/api-keys"), keywords: "api, keys, tokens" },
      { name: "Monthly Usage Quotas", action: () => router.navigate("/app/usage"), keywords: "usage, limits, quotas" },
      { name: "Account settings", action: () => router.navigate("/app/settings"), keywords: "settings, profile, security" },
      { name: "Admin: Organization Overview", action: () => router.navigate("/admin"), keywords: "admin, dashboard, audit, logs" },
      { name: "Admin: Employees Catalog", action: () => router.navigate("/admin/employees"), keywords: "admin, members, teams, staff" },
      { name: "Admin: Employee Referral", action: () => router.navigate("/admin/referrals"), keywords: "admin, referral, invite, join code, employee" }
    ];

    const openPalette = () => {
      palette.classList.remove("hidden");
      palette.classList.add("flex");
      cmdInput.value = "";
      renderResults("");
      cmdInput.focus();
    };

    const closePalette = () => {
      palette.classList.add("hidden");
      palette.classList.remove("flex");
    };

    const renderResults = (query) => {
      const filtered = commands.filter(c => 
        c.name.toLowerCase().includes(query.toLowerCase()) || 
        c.keywords.toLowerCase().includes(query.toLowerCase())
      );

      cmdResults.innerHTML = filtered.map((item, idx) => `
        <button class="w-full text-left px-3 py-2 rounded-lg hover:bg-indigo-50 hover:text-brand-primary flex items-center justify-between transition-colors ${idx === 0 ? "bg-indigo-50/40 text-brand-primary font-bold" : "text-brand-text"}" data-index="${idx}">
          <span class="font-bold">${item.name}</span>
          <span class="text-[9px] text-brand-muted/70 font-mono italic">Shortcut</span>
        </button>
      `).join("");

      Array.from(cmdResults.children).forEach((btn, idx) => {
        btn.addEventListener("click", () => {
          filtered[idx].action();
          closePalette();
        });
      });
    };

    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openPalette();
      }
      if (e.key === "Escape") {
        closePalette();
        closeNotifications();

        // Close any active open modals
        const openModals = [
          "key-modal", "key-reveal-modal", "rule-modal", "workspace-modal",
          "invite-modal", "budget-modal", "admin-key-modal", "admin-key-reveal-modal"
        ];
        openModals.forEach(id => {
          const el = document.getElementById(id);
          if (el && !el.classList.contains("hidden")) {
            el.classList.add("hidden");
            el.classList.remove("flex");
          }
        });

        // Close any open slide-out drawers
        const drawers = ["request-detail-drawer", "member-detail-drawer"];
        drawers.forEach(id => {
          const el = document.getElementById(id);
          if (el && !el.classList.contains("translate-x-full")) {
            el.classList.add("translate-x-full");
          }
        });

        // Close dropdown menus
        document.getElementById("workspace-menu")?.classList.add("hidden");
        document.getElementById("topbar-profile-menu")?.classList.add("hidden");
      }
    });

    triggerBtn?.addEventListener("click", openPalette);
    palette?.addEventListener("click", (e) => {
      if (e.target === palette) closePalette();
    });

    cmdInput?.addEventListener("input", (e) => {
      renderResults(e.target.value);
    });

    // Notifications binding
    const drawer = document.getElementById("notification-drawer");
    const drawerToggle = document.getElementById("notification-drawer-toggle");
    const drawerClose = document.getElementById("notification-close-btn");
    const markBtns = document.querySelectorAll(".mark-read-btn");
    const clearBtn = document.getElementById("clear-alerts-btn");

    const openNotifications = () => {
      drawer.classList.remove("hidden");
      drawer.classList.add("flex");
    };

    const closeNotifications = () => {
      drawer.classList.add("hidden");
      drawer.classList.remove("flex");
    };

    drawerToggle?.addEventListener("click", (e) => {
      e.stopPropagation();
      openNotifications();
    });
    drawerClose?.addEventListener("click", closeNotifications);
    drawer?.addEventListener("click", (e) => e.stopPropagation());
    document.addEventListener("click", closeNotifications);

    markBtns.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const alertId = btn.closest("[data-alert-id]").getAttribute("data-alert-id");
        apiService.markAlertRead(alertId);
        router.resolve();
        openNotifications();
      });
    });

    clearBtn?.addEventListener("click", () => {
      apiService.getAlerts().forEach(a => apiService.markAlertRead(a.id));
      router.resolve();
    });
  },

  // 9. DYNAMIC TOASTS (Guaranteed Dark Obsidian Aesthetic)
  renderToast: (type, text) => {
    // Remove any existing toast so toasts do not stack awkwardly
    document.querySelectorAll(".unillm-toast-popup").forEach(el => el.remove());

    const toast = document.createElement("div");
    toast.className = "unillm-toast-popup";
    
    const isSuccess = type === "success";
    const isError = type === "error";

    // Bulletproof inline CSS - 0 dependency on Tailwind compilation
    toast.style.position = "fixed";
    toast.style.bottom = "24px";
    toast.style.right = "24px";
    toast.style.zIndex = "999999";
    toast.style.display = "flex";
    toast.style.alignItems = "center";
    toast.style.gap = "10px";
    toast.style.padding = "12px 18px";
    toast.style.borderRadius = "12px";
    toast.style.border = isSuccess 
      ? "1px solid rgba(16, 185, 129, 0.4)" 
      : isError 
      ? "1px solid rgba(244, 63, 94, 0.4)" 
      : "1px solid rgba(56, 189, 248, 0.4)";
    toast.style.backgroundColor = isSuccess ? "#0D1813" : isError ? "#1A0F12" : "#11141A";
    toast.style.color = "#FFFFFF";
    toast.style.boxShadow = "0 20px 25px -5px rgba(0, 0, 0, 0.8), 0 10px 10px -5px rgba(0, 0, 0, 0.6)";
    toast.style.fontFamily = "Inter, system-ui, sans-serif";
    toast.style.fontSize = "12px";
    toast.style.fontWeight = "600";
    toast.style.maxWidth = "360px";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(16px)";
    toast.style.transition = "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)";
    toast.style.pointerEvents = "none";

    const iconColor = isSuccess ? "#34D399" : isError ? "#FB7185" : "#38BDF8";
    const iconSvg = isSuccess 
      ? `<svg style="width:16px;height:16px;color:${iconColor};flex-shrink:0;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>`
      : isError
      ? `<svg style="width:16px;height:16px;color:${iconColor};flex-shrink:0;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>`
      : `<svg style="width:16px;height:16px;color:${iconColor};flex-shrink:0;" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;

    toast.innerHTML = `
      ${iconSvg}
      <span style="color:#FFFFFF;letter-spacing:0.01em;">${text}</span>
    `;

    document.body.appendChild(toast);

    // Trigger smooth fade & slide up
    requestAnimationFrame(() => {
      setTimeout(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0px)";
      }, 10);
    });

    // Auto-dismiss after 2.6s
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(16px)";
      setTimeout(() => toast.remove(), 300);
    }, 2600);
  },

  // 10. DYNAMIC AREA CHART (Dark Cinematic SVG implementation)
  renderAreaChart: (data, labels, height = 180) => {
    if (!data || data.length === 0) return `<div class="h-32 bg-[#141615] rounded-xl border border-[rgba(242,239,232,0.08)] flex items-center justify-center text-xs text-[#A6A39C] font-mono">No telemetry data recorded.</div>`;
    
    const maxVal = Math.max(...data) || 10;
    const minVal = Math.min(...data) || 0;
    const range = maxVal - minVal;
    
    const chartHeight = height;
    const chartWidth = 600;
    const topOffset = 20;
    const bottomOffset = 25;
    const leftOffset = 45;
    const rightOffset = 20;
    
    const widthActive = chartWidth - leftOffset - rightOffset;
    const heightActive = chartHeight - topOffset - bottomOffset;

    const points = data.map((val, idx) => {
      const x = leftOffset + (idx * (widthActive / (data.length - 1)));
      const normalizedY = range === 0 ? 0.5 : (val - minVal) / range;
      const y = chartHeight - bottomOffset - (normalizedY * heightActive);
      return { x, y, val };
    });

    const dLine = points.map((p, idx) => `${idx === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(" ");
    const dArea = `${dLine} L ${points[points.length - 1].x} ${chartHeight - bottomOffset} L ${points[0].x} ${chartHeight - bottomOffset} Z`;

    const gradId = `area-grad-${Math.random().toString(36).substr(2, 9)}`;

    return `
      <svg viewBox="0 0 ${chartWidth} ${chartHeight}" class="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="${gradId}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#42D6A4" stop-opacity="0.22" />
            <stop offset="60%" stop-color="#42D6A4" stop-opacity="0.05" />
            <stop offset="100%" stop-color="#42D6A4" stop-opacity="0.00" />
          </linearGradient>
        </defs>
        
        <!-- Grid horizontal lines -->
        <line x1="${leftOffset}" y1="${topOffset}" x2="${chartWidth - rightOffset}" y2="${topOffset}" stroke="rgba(242, 239, 232, 0.07)" stroke-dasharray="3 3" stroke-width="1" />
        <line x1="${leftOffset}" y1="${topOffset + heightActive / 2}" x2="${chartWidth - rightOffset}" y2="${topOffset + heightActive / 2}" stroke="rgba(242, 239, 232, 0.07)" stroke-dasharray="3 3" stroke-width="1" />
        <line x1="${leftOffset}" y1="${chartHeight - bottomOffset}" x2="${chartWidth - rightOffset}" y2="${chartHeight - bottomOffset}" stroke="rgba(242, 239, 232, 0.1)" stroke-width="1" />
        
        <!-- Y Axis Labels -->
        <text x="36" y="${topOffset + 4}" font-size="9" fill="#A6A39C" font-family="'JetBrains Mono', monospace" text-anchor="end">${maxVal >= 1000 ? (maxVal/1000).toFixed(1) + 'k' : maxVal.toFixed(maxVal > 10 ? 0 : 1)}</text>
        <text x="36" y="${topOffset + heightActive / 2 + 4}" font-size="9" fill="#A6A39C" font-family="'JetBrains Mono', monospace" text-anchor="end">${((maxVal + minVal) / 2) >= 1000 ? (((maxVal + minVal) / 2)/1000).toFixed(1) + 'k' : ((maxVal + minVal) / 2).toFixed(maxVal > 10 ? 0 : 1)}</text>
        <text x="36" y="${chartHeight - bottomOffset + 4}" font-size="9" fill="#A6A39C" font-family="'JetBrains Mono', monospace" text-anchor="end">${minVal.toFixed(0)}</text>
        
        <!-- Path -->
        <path d="${dArea}" fill="url(#${gradId})" />
        <path d="${dLine}" fill="none" stroke="#42D6A4" stroke-width="2" class="chart-draw-line" stroke-linecap="round" stroke-linejoin="round" />
        
        <!-- Circle points -->
        ${points.map(p => `
          <circle cx="${p.x}" cy="${p.y}" r="3.5" fill="#0B0C0D" stroke="#42D6A4" stroke-width="1.8" class="cursor-pointer hover:r-5 transition-all" />
        `).join("")}
        
        <!-- X Axis Labels -->
        ${labels.map((lbl, idx) => {
          const x = leftOffset + (idx * (widthActive / (labels.length - 1)));
          return `<text x="${x}" y="${chartHeight - 6}" font-size="9" fill="#A6A39C" font-family="'JetBrains Mono', monospace" text-anchor="middle">${lbl}</text>`;
        }).join("")}
      </svg>
    `;
  },

  // 11. DYNAMIC DONUT CHART (Dark Cinematic SVG implementation)
  renderDonutChart: (data) => {
    const defaultColors = ["#42D6A4", "#FF7849", "#38BDF8", "#A78BFA", "#F59E0B", "#A6A39C"];
    const total = data.reduce((acc, curr) => acc + curr.value, 0) || 1;
    const radius = 48;
    const circ = 2 * Math.PI * radius;
    
    let currentOffset = 0;
    const slices = data.map((item, idx) => {
      const percentage = (item.value / total) * 100;
      const strokeLength = (percentage / 100) * circ;
      const strokeOffset = currentOffset;
      currentOffset += strokeLength;
      const color = item.color || defaultColors[idx % defaultColors.length];
      return { ...item, color, percentage, strokeLength, strokeOffset };
    });

    return `
      <div class="flex items-center gap-6 w-full justify-around select-none">
        <svg viewBox="0 0 120 120" class="w-28 h-28 transform -rotate-90 shrink-0">
          <circle cx="60" cy="60" r="${radius}" fill="none" stroke="rgba(242, 239, 232, 0.08)" stroke-width="10" />
          ${slices.map(item => `
            <circle cx="60" cy="60" r="${radius}" 
              fill="none" 
              stroke="${item.color}" 
              stroke-width="10" 
              stroke-dasharray="${item.strokeLength} ${circ - item.strokeLength}"
              stroke-dashoffset="${-item.strokeOffset}"
              stroke-linecap="round"
              class="chart-grow-bar hover:opacity-90 transition-opacity"
            />
          `).join("")}
        </svg>
        
        <div class="flex flex-col gap-2 min-w-0 flex-1">
          ${slices.map(item => `
            <div class="flex items-center justify-between text-xs font-mono">
              <div class="flex items-center gap-2 min-w-0">
                <div class="w-2 h-2 rounded-full shrink-0" style="background-color: ${item.color}"></div>
                <span class="text-[#F2EFE8] truncate font-sans">${item.name}</span>
              </div>
              <span class="text-[#A6A39C] pl-2">${item.percentage.toFixed(0)}%</span>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  },

  // 12. PROGRESS BAR
  renderProgressBar: (percentage, colorClass = "bg-[#38BDF8]") => {
    const capped = Math.min(percentage, 100);
    return `
      <div class="flex flex-col gap-1.5 w-full font-mono select-none">
        <div class="flex justify-between items-center text-[10px] text-[#8E98B0] uppercase tracking-wider">
          <span>Usage</span>
          <span class="${percentage >= 90 ? "text-rose-400 font-bold" : percentage >= 75 ? "text-amber-400 font-bold" : "text-white font-bold"}">${percentage.toFixed(1)}%</span>
        </div>
        <div class="w-full h-1.5 rounded-full bg-[#161926] border border-[#1F2438]/60 overflow-hidden">
          <div class="h-full rounded-full ${colorClass} transition-all duration-500" style="width: ${capped}%"></div>
        </div>
      </div>
    `;
  }
};

function getSidebarIconSvg(iconName, isActive) {
  const activeColor = isActive ? "text-[#42D6A4]" : "text-[#A6A39C] group-hover:text-[#F2EFE8]";
  
  if (iconName === "grid") {
    return `<svg class="w-4 h-4 ${activeColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>`;
  }
  if (iconName === "terminal") {
    return `<svg class="w-4 h-4 ${activeColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>`;
  }
  if (iconName === "cpu") {
    return `<svg class="w-4 h-4 ${activeColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2z"></path></svg>`;
  }
  if (iconName === "swords") {
    return `<svg class="w-4 h-4 ${activeColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"></path></svg>`;
  }
  if (iconName === "activity") {
    return `<svg class="w-4 h-4 ${activeColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>`;
  }
  if (iconName === "bar-chart" || iconName === "bar-chart-2") {
    return `<svg class="w-4 h-4 ${activeColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>`;
  }
  if (iconName === "dollar-sign" || iconName === "line-chart") {
    return `<svg class="w-4 h-4 ${activeColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`;
  }
  if (iconName === "git-branch") {
    return `<svg class="w-4 h-4 ${activeColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M18 10a3 3 0 11-3-3m3 3a3 3 0 00-3-3m3 3V7M6 14a3 3 0 113-3m-3 3a3 3 0 003-3m-3 3v1c0 2.206 1.794 4 4 4h4a4 4 0 004-4v-1"></path></svg>`;
  }
  if (iconName === "database") {
    return `<svg class="w-4 h-4 ${activeColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>`;
  }
  if (iconName === "key") {
    return `<svg class="w-4 h-4 ${activeColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m-2-2a2 2 0 00-2 2m2-2V5a2 2 0 10-4 0v2m4 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>`;
  }
  if (iconName === "sliders") {
    return `<svg class="w-4 h-4 ${activeColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m0 10v-6m0 6a2 2 0 100-4m0 4a2 2 0 110-4m-8-2V4m0 6a2 2 0 100 4m0-4a2 2 0 110 4m0 6v-2m16-4V4m0 10a2 2 0 100 4m0-4a2 2 0 110 4m0 6v-6"></path></svg>`;
  }
  if (iconName === "credit-card") {
    return `<svg class="w-4 h-4 ${activeColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>`;
  }
  if (iconName === "bell" || iconName === "bell-ring") {
    return `<svg class="w-4 h-4 ${activeColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>`;
  }
  if (iconName === "settings") {
    return `<svg class="w-4 h-4 ${activeColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`;
  }
  if (iconName === "shield-alert") {
    return `<svg class="w-4 h-4 ${activeColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>`;
  }
  if (iconName === "users") {
    return `<svg class="w-4 h-4 ${activeColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`;
  }
  if (iconName === "briefcase") {
    return `<svg class="w-4 h-4 ${activeColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>`;
  }
  if (iconName === "check-square") {
    return `<svg class="w-4 h-4 ${activeColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>`;
  }
  if (iconName === "file-text") {
    return `<svg class="w-4 h-4 ${activeColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 01-2-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>`;
  }
  if (iconName === "lock") {
    return `<svg class="w-4 h-4 ${activeColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>`;
  }
  if (iconName === "user-plus") {
    return `<svg class="w-4 h-4 ${activeColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>`;
  }
  
  return `<svg class="w-4 h-4 ${activeColor}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg>`;
}
