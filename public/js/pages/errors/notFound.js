// ERRORS PAGE: notFound
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function render404() {
    return `
      <section class="min-h-screen flex flex-col justify-center items-center p-6 text-center bg-brand-bg font-sans select-none">
        <div class="w-16 h-16 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-brand-primary text-2xl shadow-sm mb-6 animate-pulse-slow">
          ⚠️
        </div>
        
        <h1 class="font-display font-black text-3xl sm:text-4xl text-brand-text tracking-tight mb-3">THIS ROUTE DOESN'T EXIST.</h1>
        <p class="text-sm text-brand-muted max-w-sm mb-8 leading-relaxed">Looks like this request took a wrong turn or the connection endpoint has changed.</p>
        
        <a href="/" data-link class="px-6 py-3 bg-brand-primary hover:bg-indigo-700 text-white font-bold text-xs rounded-lg transition-colors shadow-sm shadow-indigo-100">
          Back to UniLLM Gateway
        </a>
      </section>
    `;
  };

export function bind404() {};

export default {
  render404,
  bind404
};
