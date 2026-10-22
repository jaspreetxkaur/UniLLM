// Client-side Router for UniLLM SPA (Single Page Application)
import { apiService } from "./apiService.js?v=7";
import { components } from "./components.js?v=7";
import { pages } from "./pages.js?v=7";

// Helper to convert route path (e.g. '/app/requests/:id') to Regex
const pathToRegex = (path) => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

// Helper to extract URL params (like id)
const getParams = (match, pathPattern) => {
  const values = match.slice(1);
  const keys = Array.from(pathPattern.matchAll(/:(\w+)/g)).map(result => result[1]);
  return Object.fromEntries(keys.map((key, i) => [key, values[i]]));
};

// Route registry defining path, handler page, layout, and page titles
const routes = [
  // Public Routes
  { path: "/", view: "landing", layout: "public", title: "UniLLM — Unified AI Gateway" },
  { path: "/product", view: "product", layout: "public", title: "Product Features — UniLLM" },
  { path: "/solutions", view: "solutions", layout: "public", title: "Enterprise Solutions — UniLLM" },
  { path: "/models", view: "modelsMarketplace", layout: "public", title: "Model Marketplace — UniLLM" },
  { path: "/models/:id", view: "modelDetail", layout: "public", title: "Model Details — UniLLM" },
  { path: "/developers", view: "developers", layout: "public", title: "Developer Center — UniLLM" },
  { path: "/pricing", view: "pricing", layout: "public", title: "Pricing & Credits — UniLLM" },
  { path: "/enterprise", view: "enterprise", layout: "public", title: "Enterprise Control — UniLLM" },
  { path: "/about", view: "about", layout: "public", title: "About Us — UniLLM" },
  { path: "/security", view: "security", layout: "public", title: "Security Protocols — UniLLM" },
  { path: "/status", view: "statusPage", layout: "public", title: "System Status — UniLLM" },
  { path: "/contact", view: "contact", layout: "public", title: "Contact Support — UniLLM" },
  { path: "/changelog", view: "changelog", layout: "public", title: "Product Changelog — UniLLM" },
  { path: "/book-demo", view: "bookDemo", layout: "public", title: "Book a Product Demo — UniLLM" },
  { path: "/talk-to-sales", view: "talkToSales", layout: "public", title: "Talk to Infrastructure Experts — UniLLM" },
  { path: "/get-started", view: "getStarted", layout: "public", title: "Get Started — UniLLM" },
  { path: "/careers", view: "careers", layout: "public", title: "Careers — UniLLM" },
  { path: "/blog", view: "blog", layout: "public", title: "Engineering Blog — UniLLM" },
  { path: "/blog/:id", view: "blogDetail", layout: "public", title: "Blog Post — UniLLM" },

  // Auth Routes
  { path: "/login", view: "login", layout: "auth", title: "Log In — UniLLM" },
  { path: "/signup", view: "signup", layout: "auth", title: "Create Account — UniLLM" },
  { path: "/forgot-password", view: "forgotPassword", layout: "auth", title: "Reset Password — UniLLM" },
  { path: "/reset-password", view: "resetPassword", layout: "auth", title: "Set New Password — UniLLM" },
  { path: "/onboarding", view: "onboarding", layout: "auth", title: "Onboarding Wizard — UniLLM" },
  { path: "/dashboard", view: "appOverview", layout: "app", title: "Developer Dashboard — UniLLM" },

  // App Routes (Individual Developers)
  { path: "/app", view: "appOverview", layout: "app", title: "Developer Dashboard — UniLLM" },
  { path: "/app/playground", view: "appPlayground", layout: "app", title: "Model Playground — UniLLM" },
  { path: "/app/models", view: "appModels", layout: "app", title: "Registered Models — UniLLM" },
  { path: "/app/models/:id", view: "appModelDetail", layout: "app", title: "Model Specs — UniLLM" },
  { path: "/app/arena", view: "appArena", layout: "app", title: "Model Arena Battle — UniLLM" },
  { path: "/app/requests", view: "appRequests", layout: "app", title: "Requests Log — UniLLM" },
  { path: "/app/requests/:id", view: "appRequestTrace", layout: "app", title: "Request Tracing Details — UniLLM" },
  { path: "/app/analytics", view: "appAnalytics", layout: "app", title: "Usage Analytics — UniLLM" },
  { path: "/app/costs", view: "appCosts", layout: "app", title: "Cost Dashboard — UniLLM" },
  { path: "/app/routing", view: "appRouting", layout: "app", title: "Dynamic Routing Rules — UniLLM" },
  { path: "/app/cache", view: "appCache", layout: "app", title: "Smart Cache Settings — UniLLM" },
  { path: "/app/api-keys", view: "appApiKeys", layout: "app", title: "API Keys Console — UniLLM" },
  { path: "/app/usage", view: "appUsage", layout: "app", title: "Monthly Quotas — UniLLM" },
  { path: "/app/billing", view: "appBilling", layout: "app", title: "Billing Console — UniLLM" },
  { path: "/app/notifications", view: "appNotifications", layout: "app", title: "Inbox & Alerts — UniLLM" },
  { path: "/app/settings", view: "appSettings", layout: "app", title: "Account Settings — UniLLM" },

  // Admin Routes (Organization Panel)
  { path: "/admin", view: "adminOverview", layout: "admin", title: "Org Dashboard — UniLLM" },
  { path: "/admin/employees", view: "adminEmployees", layout: "admin", title: "Manage Members — UniLLM" },
  { path: "/admin/employees/:id", view: "adminEmployeeDetail", layout: "admin", title: "Member Details — UniLLM" },
  { path: "/admin/referrals", view: "adminReferrals", layout: "admin", title: "Employee Referral — UniLLM" },
  { path: "/admin/teams", view: "adminTeams", layout: "admin", title: "Org Teams — UniLLM" },
  { path: "/admin/teams/:id", view: "adminTeamDetail", layout: "admin", title: "Team Settings — UniLLM" },
  { path: "/admin/models", view: "adminModels", layout: "admin", title: "Org Model Governance — UniLLM" },
  { path: "/admin/policies", view: "adminPolicies", layout: "admin", title: "Org Governance Policies — UniLLM" },
  { path: "/admin/policies/new", view: "adminPolicies", layout: "admin", title: "Create Governance Policy — UniLLM" },
  { path: "/admin/limits", view: "adminLimits", layout: "admin", title: "Member Quotas — UniLLM" },
  { path: "/admin/alerts", view: "adminAlerts", layout: "admin", title: "System Alerts — UniLLM" },
  { path: "/admin/audit-logs", view: "adminAuditLogs", layout: "admin", title: "Governance Audit Logs — UniLLM" },
  { path: "/admin/api-keys", view: "adminApiKeys", layout: "admin", title: "Organization API Keys — UniLLM" },
  { path: "/admin/analytics", view: "adminAnalytics", layout: "admin", title: "Org Insights — UniLLM" },
  { path: "/admin/costs", view: "adminCosts", layout: "admin", title: "Org Cost Intelligence — UniLLM" },
  { path: "/admin/billing", view: "adminBilling", layout: "admin", title: "Org Subscriptions — UniLLM" },
  { path: "/admin/security", view: "adminSecurity", layout: "admin", title: "Org Security Console — UniLLM" },
  { path: "/admin/settings", view: "adminSettings", layout: "admin", title: "Org Settings — UniLLM" },

  // Docs Layout Routes
  { path: "/docs", view: "docsHome", layout: "docs", title: "Documentation — UniLLM" },
  { path: "/api-reference", view: "docsApi", layout: "docs", title: "API Reference Console — UniLLM" }
];

export const router = {
  navigate: (path) => {
    // Check if target is an in-page hash on current path
    const url = new URL(path, window.location.origin);
    const isSamePath = url.pathname === window.location.pathname;

    if (isSamePath && url.hash) {
      window.history.pushState(null, null, path);
      const targetId = url.hash.replace("#", "");
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
    }

    window.history.pushState(null, null, path);
    router.resolve();
  },

  resolve: () => {
    // Current URL pathname
    let path = window.location.pathname;

    // Check if route matches any defined route in the registry
    let match = null;
    let route = null;

    for (let r of routes) {
      const regex = pathToRegex(r.path);
      const testMatch = path.match(regex);
      if (testMatch) {
        match = testMatch;
        route = r;
        break;
      }
    }

    // Session Guard check
    const isLoggedIn = !!(sessionStorage.getItem("unillm_user") || localStorage.getItem("unillm_user"));
    if (route) {
      const isProtectedRoute = ["app", "admin"].includes(route.layout);
      if (isProtectedRoute && !isLoggedIn) {
        sessionStorage.setItem("redirect_after_login", window.location.pathname);
        window.history.replaceState(null, null, "/login");
        path = "/login";
        for (let r of routes) {
          if (r.path === "/login") {
            route = r;
            match = ["/login"];
            break;
          }
        }
      } else if (isLoggedIn && ["/login", "/signup", "/forgot-password", "/reset-password"].includes(route.path)) {
        window.history.replaceState(null, null, "/app");
        path = "/app";
        for (let r of routes) {
          if (r.path === "/app") {
            route = r;
            match = ["/app"];
            break;
          }
        }
      }
    }

    // Fallback if route does not exist (404 Page)
    if (!route) {
      document.title = "404 - Request Took a Wrong Turn — UniLLM";
      const root = document.getElementById("root");
      root.innerHTML = components.PublicLayout(pages.render404());
      components.bindPublicLayout();
      if (pages.bind404) pages.bind404();
      return;
    }

    // Set page title
    document.title = route.title;

    // Extract URL parameters
    const params = getParams(match, route.path);

    // Call Layout builders to construct shell, and inject Page content
    const root = document.getElementById("root");
    const pageHtml = pages[route.view](params);

    if (route.layout === "public") {
      root.innerHTML = components.PublicLayout(pageHtml);
      components.bindPublicLayout();
    } else if (route.layout === "auth") {
      root.innerHTML = components.AuthLayout(pageHtml);
      components.bindAuthLayout();
    } else if (route.layout === "app") {
      root.innerHTML = components.AppLayout(pageHtml);
      components.bindAppLayout();
    } else if (route.layout === "admin") {
      root.innerHTML = components.AdminLayout(pageHtml);
      components.bindAdminLayout();
    } else if (route.layout === "docs") {
      root.innerHTML = components.DocsLayout(pageHtml);
      components.bindDocsLayout();
    }

    // Bind page-specific Javascript handlers
    const bindFunctionName = `bind${route.view.charAt(0).toUpperCase() + route.view.slice(1)}`;
    if (pages[bindFunctionName]) {
      pages[bindFunctionName](params);
    }

    // Trigger Command Palette and Notification listeners on application layouts
    if (["app", "admin", "docs"].includes(route.layout)) {
      components.bindGlobalOverlays();
    }

    // Setup scroll reveal visual observer
    setupScrollReveals();

    // Bind dynamic FAQ accordions automatically
    bindGlobalFaqAccordions();

    // Scroll handling: check for hash or top
    if (window.location.hash) {
      const hashId = window.location.hash.replace("#", "");
      setTimeout(() => {
        const targetEl = document.getElementById(hashId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  }
};

// Intersection Observer for scroll reveal animations
function setupScrollReveals() {
  const elements = document.querySelectorAll(".reveal-on-scroll");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.1 });
  
  elements.forEach(el => observer.observe(el));
}

// Global FAQ Accordion binder with smooth height transitions
function bindGlobalFaqAccordions() {
  const accordionItems = document.querySelectorAll(".faq-accordion-item");
  accordionItems.forEach(item => {
    const trigger = item.querySelector(".faq-accordion-trigger");
    const content = item.querySelector(".faq-accordion-content");
    const chevron = item.querySelector(".faq-accordion-chevron");
    
    if (trigger && content) {
      if (trigger.getAttribute("data-faq-bound") === "true") return;
      trigger.setAttribute("data-faq-bound", "true");

      trigger.addEventListener("click", () => {
        const isOpen = item.classList.contains("active");
        
        // Collapse sibling accordion items
        const group = item.closest(".faq-accordion-group") || item.parentElement;
        if (group) {
          const siblings = group.querySelectorAll(".faq-accordion-item");
          siblings.forEach(sib => {
            if (sib !== item) {
              sib.classList.remove("active");
              const sibContent = sib.querySelector(".faq-accordion-content");
              const sibChevron = sib.querySelector(".faq-accordion-chevron");
              if (sibContent) {
                sibContent.style.maxHeight = "0px";
                sibContent.style.opacity = "0";
              }
              if (sibChevron) {
                sibChevron.style.transform = "rotate(0deg)";
              }
            }
          });
        }
        
        if (isOpen) {
          item.classList.remove("active");
          content.style.maxHeight = "0px";
          content.style.opacity = "0";
          if (chevron) chevron.style.transform = "rotate(0deg)";
        } else {
          item.classList.add("active");
          content.style.maxHeight = content.scrollHeight + "px";
          content.style.opacity = "1";
          if (chevron) chevron.style.transform = "rotate(180deg)";
        }
      });
    }
  });
}

// Bootstrap router listeners on startup
window.addEventListener("popstate", () => router.resolve());

document.addEventListener("DOMContentLoaded", async () => {
  // Capture local links and navigate via SPA
  document.body.addEventListener("click", (e) => {
    const link = e.target.closest("[data-link]");
    if (link) {
      e.preventDefault();
      router.navigate(link.getAttribute("href"));
    }
  });

  // Initial resolve from fast local state
  router.resolve();

  // Authoritative background verification with /api/auth/me
  const verifiedUser = await apiService.verifySession();
  const currentPath = window.location.pathname;
  const isProtectedRoute = currentPath.startsWith("/app") || currentPath.startsWith("/admin");
  if (isProtectedRoute && !verifiedUser) {
    sessionStorage.setItem("redirect_after_login", currentPath);
    router.navigate("/login");
  }
});
