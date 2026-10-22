// PUBLIC PAGE: landing (Rebuilt according to Master Implementation Brief)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";
import { icons } from "../../icons.js?v=2";

let scrollCleanupHandler = null;

export function landing() {
  return `
    <div class="relative overflow-hidden w-full bg-[#07080B] text-white">
      <!-- Background subtle atmospheric gradients -->
      <div class="absolute top-0 right-1/4 w-[750px] h-[750px] rounded-full bg-[#38BDF8]/[0.03] blur-[170px] pointer-events-none -z-10"></div>
      <div class="absolute top-1/3 left-0 w-[650px] h-[650px] rounded-full bg-indigo-500/[0.02] blur-[160px] pointer-events-none -z-10"></div>

      <!-- ================= SECTION 02: HERO ================= -->
      <section class="relative pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#1F2438]/70 overflow-hidden">
        <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            <!-- LEFT: Hero Copy & Actions -->
            <div class="lg:col-span-6 flex flex-col gap-6 z-10">
              
              <!-- Eyebrow Pill -->
              <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#10121A] border border-[#1F2438] text-[11px] font-mono tracking-widest text-[#8E98B0] uppercase self-start">
                <span class="w-1.5 h-1.5 rounded-full bg-[#38BDF8] animate-pulse"></span>
                ONE API. EVERY AI MODEL.
              </div>

              <!-- Main Headline (Required verbatim) -->
              <h1 class="font-sans font-bold text-4xl sm:text-5xl lg:text-[62px] tracking-tight text-white leading-[1.08]">
                One API.<br/>
                <span class="text-white">Every leading</span><br/>
                AI model.
              </h1>

              <!-- Supporting Copy (Required verbatim) -->
              <p class="text-base sm:text-lg text-[#8E98B0] leading-relaxed max-w-xl font-normal">
                Access multiple AI model providers through one unified API. Manage credentials, route requests and understand usage without juggling separate provider integrations.
              </p>

              <!-- CTAs -->
              <div class="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  id="hero-get-api-key-btn"
                  class="get-api-key-cta inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#07080B] font-semibold text-sm hover:bg-slate-200 transition-all shadow-[0_0_24px_rgba(255,255,255,0.12)] cursor-pointer group"
                >
                  Get My API Key
                  <span class="transition-transform group-hover:translate-x-1 font-bold">→</span>
                </button>

                <a
                  href="/models"
                  data-link
                  class="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#10121A] text-white border border-[#1F2438] hover:border-[#38BDF8]/40 hover:bg-[#161926] text-sm font-medium transition-all"
                >
                  Explore Models
                </a>
              </div>

              <!-- 3 Concise Supporting Statements (Required verbatim) -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 mt-2 border-t border-[#1F2438]/80 text-xs text-[#8E98B0] font-mono">
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  <span class="text-white font-medium">One unified API</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#38BDF8]"></span>
                  <span class="text-white font-medium">Multiple model providers</span>
                </div>
                <div class="flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                  <span class="text-white font-medium">Simple developer integration</span>
                </div>
              </div>

            </div>

            <!-- RIGHT: Custom Technical Gateway Routing Visual -->
            <div class="lg:col-span-6 relative flex items-center justify-center select-none py-6 lg:py-8">
              <div class="relative w-[320px] h-[320px] sm:w-[440px] sm:h-[440px] lg:w-[490px] lg:h-[490px] flex items-center justify-center">
                
                <!-- Celestial Crescent Glow (Lensed Arc) -->
                <div class="absolute -inset-4 rounded-full pointer-events-none opacity-80"
                     style="background: radial-gradient(circle at 65% 35%, rgba(56, 189, 248, 0.16) 0%, rgba(56, 189, 248, 0.04) 45%, transparent 70%);">
                </div>

                <!-- Crescent Rim Arc SVG -->
                <svg class="absolute inset-0 w-full h-full pointer-events-none -rotate-12" viewBox="0 0 500 500">
                  <defs>
                    <linearGradient id="crescentRimGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.85" />
                      <stop offset="30%" stop-color="#FFFFFF" stop-opacity="0.95" />
                      <stop offset="70%" stop-color="#38BDF8" stop-opacity="0.25" />
                      <stop offset="100%" stop-color="#38BDF8" stop-opacity="0.0" />
                    </linearGradient>
                  </defs>
                  <circle cx="250" cy="250" r="230" fill="none" stroke="url(#crescentRimGrad)" stroke-width="1.5" stroke-dasharray="240 1200" stroke-linecap="round" />
                </svg>

                <!-- Outer Orbit Ring -->
                <div class="orbital-ring-spin-reverse absolute w-[92%] h-[92%] rounded-full border border-[#1F2438]/70 pointer-events-none"></div>

                <!-- Mid Orbit Ring -->
                <div class="orbital-ring-spin-slow absolute w-[70%] h-[70%] rounded-full border border-dashed border-[#1F2438] pointer-events-none"></div>

                <!-- Inner Orbit Ring -->
                <div class="absolute w-[48%] h-[48%] rounded-full border border-[#1F2438]/50 pointer-events-none"></div>

                <!-- Traveling Orbital Light Signals -->
                <div class="orbit-signal-1"></div>
                <div class="orbit-signal-2"></div>

                <!-- Central Core Orb (UniLLM Routing Intelligence) -->
                <div class="relative w-[136px] h-[136px] sm:w-[164px] sm:h-[164px] rounded-full bg-gradient-to-b from-[#121522] via-[#0A0C13] to-[#07080B] border border-[#1F2438] shadow-[0_0_60px_rgba(56,189,248,0.12),inset_0_0_30px_rgba(56,189,248,0.06)] flex flex-col items-center justify-center p-3 text-center z-10 transition-transform duration-300 hover:scale-105">
                  <div class="flex items-center gap-1.5 text-white font-bold tracking-tight text-xs sm:text-sm">
                    <span class="text-[#38BDF8]">✦</span>
                    UniLLM
                  </div>
                  <div class="text-[7px] sm:text-[8px] font-mono tracking-widest text-[#8E98B0] uppercase mt-1">
                    ROUTING GATEWAY
                  </div>
                  <div class="mt-1.5 sm:mt-2 flex items-center gap-1.5">
                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span class="text-[8px] sm:text-[9px] font-mono text-[#8E98B0]">ONLINE</span>
                  </div>
                </div>

                <!-- Provider Badge: Gemini -->
                <div class="orbital-node orbital-float-3 absolute top-[44%] right-[2%] sm:right-[5%] flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#10121A]/90 border border-[#1F2438] hover:border-[#38BDF8]/60 transition-all cursor-pointer shadow-lg">
                  <div class="w-4 h-4 rounded-full bg-blue-500/15 flex items-center justify-center">
                    <span class="text-[10px] font-bold text-[#38BDF8]">G</span>
                  </div>
                  <span class="text-[11px] sm:text-xs text-white font-medium">Gemini 3.6</span>
                </div>

                <!-- Provider Badge: GPT-4o -->
                <div class="orbital-node orbital-float-2 absolute top-[34%] left-[2%] sm:left-[5%] flex items-center gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full bg-[#10121A]/90 border border-[#1F2438] hover:border-white/50 transition-all cursor-pointer shadow-lg">
                  <div class="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[10px] text-white">
                    <svg class="w-3 h-3 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.28 10.05a5.57 5.57 0 0 0-.46-4.41 5.68 5.68 0 0 0-4.88-2.83 5.76 5.76 0 0 0-1.87.31 5.6 5.6 0 0 0-3.92-1.74A5.67 5.67 0 0 0 6 3.65a5.71 5.71 0 0 0-3.7 2.68 5.63 5.63 0 0 0 .74 6.24 5.6 5.6 0 0 0 .46 4.41 5.67 5.67 0 0 0 4.88 2.83c.63 0 1.25-.1 1.84-.31a5.61 5.61 0 0 0 3.94 1.74c2.8 0 5.16-2.03 5.6-4.74a5.67 5.67 0 0 0 3.7-2.68 5.6 5.6 0 0 0-.74-3.77z"/>
                    </svg>
                  </div>
                  <span class="text-[11px] sm:text-xs text-white font-medium">GPT-4o</span>
                </div>

                <!-- Provider Badge: Claude -->
                <div class="orbital-node orbital-float-1 absolute top-[8%] right-[18%] sm:right-[24%] flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#10121A]/90 border border-[#1F2438] hover:border-[#F97316]/60 transition-all cursor-pointer shadow-lg">
                  <div class="w-4 h-4 rounded-full bg-[#D97706]/20 border border-[#D97706]/40 flex items-center justify-center text-[9px] text-[#F59E0B] font-bold">
                    C
                  </div>
                  <span class="text-[11px] sm:text-xs text-white font-medium">Claude 3.5</span>
                </div>

                <!-- Provider Badge: Llama -->
                <div class="orbital-node orbital-float-1 absolute bottom-[14%] left-[8%] sm:left-[12%] flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#10121A]/90 border border-[#1F2438] hover:border-blue-400/60 transition-all cursor-pointer shadow-lg">
                  <div class="w-4 h-4 rounded-full bg-blue-600/20 flex items-center justify-center">
                    <span class="text-[10px] font-mono font-bold text-blue-400">🦙</span>
                  </div>
                  <span class="text-[11px] sm:text-xs text-white font-medium">Llama 3.3</span>
                </div>

                <!-- Provider Badge: Mistral -->
                <div class="orbital-node orbital-float-2 absolute bottom-[18%] right-[14%] sm:right-[18%] flex items-center gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#10121A]/90 border border-[#1F2438] hover:border-amber-500/60 transition-all cursor-pointer shadow-lg">
                  <div class="w-4 h-4 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <span class="text-[10px] font-mono font-bold text-amber-400">M</span>
                  </div>
                  <span class="text-[11px] sm:text-xs text-white font-medium">Mistral Large</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- ================= SECTION 03: PRODUCT DASHBOARD PREVIEW ================= -->
      <section class="py-16 sm:py-20 border-b border-[#1F2438]/70 bg-[#090B10]">
        <div class="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col gap-8">
          
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div class="text-[11px] font-mono uppercase tracking-widest text-[#38BDF8] mb-1">Developer Console Preview</div>
              <h2 class="text-2xl sm:text-3xl font-bold text-white tracking-tight">Real-time observability. Total control.</h2>
            </div>
            <span class="text-xs font-mono text-[#8E98B0] bg-[#10121A] px-3 py-1 rounded-full border border-[#1F2438]">
              Interactive Architecture Preview
            </span>
          </div>

          <!-- Wide Desktop Product Frame -->
          <div class="rounded-2xl border border-[#1F2438] bg-[#07080B] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] overflow-hidden select-none">
            
            <!-- Window Topbar with Browser Controls -->
            <div class="h-10 bg-[#10121A] border-b border-[#1F2438] px-4 flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-red-500/70"></span>
                <span class="w-3 h-3 rounded-full bg-amber-500/70"></span>
                <span class="w-3 h-3 rounded-full bg-emerald-500/70"></span>
                <span class="ml-4 text-[11px] font-mono text-[#8E98B0]">unillm.com/app/overview</span>
              </div>
              <div class="flex items-center gap-3 text-[11px] font-mono text-[#8E98B0]">
                <span class="flex items-center gap-1.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Live Cluster: US-East</span>
              </div>
            </div>

            <!-- Dashboard Mockup Inside Frame -->
            <div class="p-6 lg:p-8 flex flex-col gap-6 bg-[#07080B]">
              
              <!-- Top Dashboard Header & Controls -->
              <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-[#1F2438]">
                <div>
                  <div class="flex items-center gap-2">
                    <h3 class="font-bold text-lg text-white">Dashboard</h3>
                    <span class="px-2 py-0.5 rounded text-[9px] font-mono bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30">Active Workspace</span>
                  </div>
                  <p class="text-xs text-[#8E98B0]">Default Workspace • Cyberdyne Systems</p>
                </div>
                
                <div class="flex items-center gap-2 text-xs">
                  <span class="px-3 py-1.5 rounded-lg bg-[#10121A] border border-[#1F2438] text-white font-mono">Oct 1 – Oct 31</span>
                  <button class="get-api-key-cta px-3.5 py-1.5 rounded-lg bg-white text-[#07080B] font-semibold text-xs transition-all shadow-sm">
                    + Create API Key
                  </button>
                </div>
              </div>

              <!-- 4 Overview Metrics Cards -->
              <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div class="p-4 rounded-xl bg-[#10121A] border border-[#1F2438]">
                  <span class="text-[11px] text-[#8E98B0] font-mono uppercase">Gateway Balance</span>
                  <div class="mt-1 flex items-baseline justify-between">
                    <span class="text-xl font-bold font-mono text-white">$140.15</span>
                    <span class="text-[9px] text-emerald-400 font-mono">Active</span>
                  </div>
                </div>

                <div class="p-4 rounded-xl bg-[#10121A] border border-[#1F2438]">
                  <span class="text-[11px] text-[#8E98B0] font-mono uppercase">Total Requests</span>
                  <div class="mt-1 flex items-baseline justify-between">
                    <span class="text-xl font-bold font-mono text-white">12,482</span>
                    <span class="text-[9px] text-emerald-400 font-mono">▲ +12%</span>
                  </div>
                </div>

                <div class="p-4 rounded-xl bg-[#10121A] border border-[#1F2438]">
                  <span class="text-[11px] text-[#8E98B0] font-mono uppercase">Token Volume</span>
                  <div class="mt-1 flex items-baseline justify-between">
                    <span class="text-xl font-bold font-mono text-white">8.4M</span>
                    <span class="text-[9px] text-emerald-400 font-mono">▲ +18%</span>
                  </div>
                </div>

                <div class="p-4 rounded-xl bg-[#10121A] border border-[#1F2438]">
                  <span class="text-[11px] text-[#8E98B0] font-mono uppercase">Avg. Routing P95</span>
                  <div class="mt-1 flex items-baseline justify-between">
                    <span class="text-xl font-bold font-mono text-[#38BDF8]">110 ms</span>
                    <span class="text-[9px] text-emerald-400 font-mono">▼ -15ms</span>
                  </div>
                </div>
              </div>

              <!-- Charts & Traces Row -->
              <div class="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <!-- Request Volume Area Chart Preview -->
                <div class="lg:col-span-7 p-4 rounded-xl bg-[#10121A] border border-[#1F2438] flex flex-col justify-between">
                  <div class="flex justify-between items-center mb-3">
                    <span class="text-xs font-bold text-white">Request Volume History</span>
                    <span class="text-[10px] font-mono text-emerald-400">99.98% Success</span>
                  </div>
                  <!-- SVG Mock Chart -->
                  <div class="h-36 w-full">
                    <svg class="w-full h-full" viewBox="0 0 500 120" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="prevChartGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stop-color="#38BDF8" stop-opacity="0.3"/>
                          <stop offset="100%" stop-color="#38BDF8" stop-opacity="0.0"/>
                        </linearGradient>
                      </defs>
                      <path d="M 0 100 Q 80 40, 160 70 T 320 30 T 500 20 L 500 120 L 0 120 Z" fill="url(#prevChartGrad)" />
                      <path d="M 0 100 Q 80 40, 160 70 T 320 30 T 500 20" fill="none" stroke="#38BDF8" stroke-width="2" />
                    </svg>
                  </div>
                </div>

                <!-- Recent Traces Table Preview -->
                <div class="lg:col-span-5 p-4 rounded-xl bg-[#10121A] border border-[#1F2438] flex flex-col justify-between text-xs">
                  <div class="flex justify-between items-center mb-2 pb-2 border-b border-[#1F2438]">
                    <span class="font-bold text-white">Recent Gateway Traces</span>
                    <span class="text-[10px] font-mono text-[#8E98B0]">Sub-ms Ingestion</span>
                  </div>
                  <div class="divide-y divide-[#1F2438]/60 font-mono text-[11px] text-[#8E98B0]">
                    <div class="py-1.5 flex justify-between items-center">
                      <span class="text-white">POST /v1/chat (gemini-3.6)</span>
                      <span class="text-emerald-400 font-bold">200 OK • 110ms</span>
                    </div>
                    <div class="py-1.5 flex justify-between items-center">
                      <span class="text-white">POST /v1/chat (gpt-4o)</span>
                      <span class="text-emerald-400 font-bold">200 OK • 240ms</span>
                    </div>
                    <div class="py-1.5 flex justify-between items-center">
                      <span class="text-white">POST /v1/chat (claude-3.5)</span>
                      <span class="text-emerald-400 font-bold">200 OK • 310ms</span>
                    </div>
                    <div class="py-1.5 flex justify-between items-center">
                      <span class="text-white">POST /v1/chat (cache-hit)</span>
                      <span class="text-[#38BDF8] font-bold">200 OK • 18ms</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      <!-- ================= SECTION 04: TRUST AND SOCIAL PROOF ================= -->
      <section class="py-12 border-b border-[#1F2438]/70 bg-[#07080B] select-none">
        <div class="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col items-center gap-6 text-center">
          <span class="text-xs font-mono font-bold text-[#8E98B0] uppercase tracking-widest">
            Built for developers working with AI
          </span>

          <!-- Provider Logos / Strips -->
          <div class="flex flex-wrap items-center justify-center gap-8 sm:gap-12 text-[#8E98B0] font-mono text-xs sm:text-sm">
            <div class="flex items-center gap-2 hover:text-white transition-colors">
              <span class="w-2 h-2 rounded-full bg-[#38BDF8]"></span>
              <span>Google Gemini</span>
            </div>
            <div class="flex items-center gap-2 hover:text-white transition-colors">
              <span class="w-2 h-2 rounded-full bg-white"></span>
              <span>OpenAI</span>
            </div>
            <div class="flex items-center gap-2 hover:text-white transition-colors">
              <span class="w-2 h-2 rounded-full bg-[#F59E0B]"></span>
              <span>Anthropic Claude</span>
            </div>
            <div class="flex items-center gap-2 hover:text-white transition-colors">
              <span class="w-2 h-2 rounded-full bg-blue-400"></span>
              <span>Meta Llama 3</span>
            </div>
            <div class="flex items-center gap-2 hover:text-white transition-colors">
              <span class="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>Mistral AI</span>
            </div>
            <div class="flex items-center gap-2 hover:text-white transition-colors">
              <span class="w-2 h-2 rounded-full bg-teal-400"></span>
              <span>Cohere</span>
            </div>
          </div>
        </div>
      </section>

      <!-- ================= SECTION 05: CORE CAPABILITIES ================= -->
      <section class="py-16 sm:py-20 border-b border-[#1F2438]/70 bg-[#0A0C13]">
        <div class="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col gap-12">
          
          <div class="flex flex-col gap-2 max-w-2xl">
            <h2 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">Everything you need to work with AI models</h2>
            <p class="text-sm sm:text-base text-[#8E98B0] leading-relaxed">
              One integration for model access, usage visibility and the workflows your application depends on.
            </p>
          </div>

          <!-- Varied Layout: 2 Large Featured Compositions + 5 Compact Capability Blocks -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <!-- A. Unified API (Featured Large) -->
            <div class="lg:col-span-2 p-7 rounded-2xl bg-[#10121A] border border-[#1F2438] flex flex-col justify-between gap-6 hover:border-[#38BDF8]/40 transition-all">
              <div class="flex flex-col gap-3">
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161926] border border-[#1F2438] text-[10px] font-mono text-[#38BDF8] uppercase self-start">
                  Core Architecture
                </div>
                <h3 class="text-2xl font-bold text-white tracking-tight">A. Unified OpenAI-Compatible Interface</h3>
                <p class="text-xs sm:text-sm text-[#8E98B0] leading-relaxed max-w-xl">
                  One API endpoint to invoke Google Gemini, OpenAI GPT-4o, Anthropic Claude, and open-source weights. Swap models by passing a model string parameter without altering client request schemas.
                </p>
              </div>
              <div class="p-4 rounded-xl bg-[#07080B] border border-[#1F2438] font-mono text-xs text-[#8E98B0]">
                <span class="text-[#38BDF8]">curl</span> https://api.unillm.com/v1/chat/completions -d '{"model": "gemini-3.6-flash"}'
              </div>
            </div>

            <!-- B. Model Discovery -->
            <div class="p-7 rounded-2xl bg-[#10121A] border border-[#1F2438] flex flex-col justify-between gap-6 hover:border-[#38BDF8]/40 transition-all">
              <div class="flex flex-col gap-3">
                <span class="text-xs font-mono font-bold text-[#38BDF8] uppercase">Catalogue</span>
                <h3 class="text-xl font-bold text-white">B. Model Discovery</h3>
                <p class="text-xs text-[#8E98B0] leading-relaxed">
                  Browse 50+ models with live latency benchmarks, context windows, and transparent token pricing per 1M tokens.
                </p>
              </div>
              <a href="/models" data-link class="text-xs font-mono text-[#38BDF8] hover:text-white flex items-center gap-1">
                Explore catalogue &rarr;
              </a>
            </div>

            <!-- C. API Key Management -->
            <div class="p-7 rounded-2xl bg-[#10121A] border border-[#1F2438] flex flex-col justify-between gap-6 hover:border-[#38BDF8]/40 transition-all">
              <div class="flex flex-col gap-3">
                <span class="text-xs font-mono font-bold text-[#38BDF8] uppercase">Security</span>
                <h3 class="text-xl font-bold text-white">C. API Key Management</h3>
                <p class="text-xs text-[#8E98B0] leading-relaxed">
                  Issue scoped credentials, set team rate limits, and revoke compromised keys instantly with zero server downtime.
                </p>
              </div>
              <button class="get-api-key-cta text-xs font-mono text-[#38BDF8] hover:text-white flex items-center gap-1 text-left cursor-pointer">
                Manage credentials &rarr;
              </button>
            </div>

            <!-- D. Usage and Cost Visibility -->
            <div class="p-7 rounded-2xl bg-[#10121A] border border-[#1F2438] flex flex-col justify-between gap-6 hover:border-[#38BDF8]/40 transition-all">
              <div class="flex flex-col gap-3">
                <span class="text-xs font-mono font-bold text-[#38BDF8] uppercase">Telemetry</span>
                <h3 class="text-xl font-bold text-white">D. Usage & Cost Visibility</h3>
                <p class="text-xs text-[#8E98B0] leading-relaxed">
                  Per-request token breakdown and exact pass-through expense tracking. Real-time metrics prevent unexpected billing surprises.
                </p>
              </div>
              <a href="/app/usage" data-link class="text-xs font-mono text-[#38BDF8] hover:text-white flex items-center gap-1">
                View telemetry &rarr;
              </a>
            </div>

            <!-- E. Provider Routing -->
            <div class="p-7 rounded-2xl bg-[#10121A] border border-[#1F2438] flex flex-col justify-between gap-6 hover:border-[#38BDF8]/40 transition-all">
              <div class="flex flex-col gap-3">
                <span class="text-xs font-mono font-bold text-[#38BDF8] uppercase">Intelligence</span>
                <h3 class="text-xl font-bold text-white">E. Provider Routing</h3>
                <p class="text-xs text-[#8E98B0] leading-relaxed">
                  Route to target models based on live availability, lowest p95 latency, or configured fallback retry priorities.
                </p>
              </div>
              <a href="/app/routing" data-link class="text-xs font-mono text-[#38BDF8] hover:text-white flex items-center gap-1">
                Routing rules &rarr;
              </a>
            </div>

            <!-- F. Developer Playground (Col 2 width on large) -->
            <div class="lg:col-span-2 p-7 rounded-2xl bg-[#10121A] border border-[#1F2438] flex flex-col justify-between gap-6 hover:border-[#38BDF8]/40 transition-all">
              <div class="flex flex-col gap-3">
                <span class="text-xs font-mono font-bold text-[#38BDF8] uppercase">Workspace</span>
                <h3 class="text-xl font-bold text-white">F. Developer Playground</h3>
                <p class="text-xs sm:text-sm text-[#8E98B0] leading-relaxed max-w-xl">
                  Interactive multi-model workspace. Test prompts against Claude, Gemini, and GPT-4o side-by-side to compare output speed and quality before deploying.
                </p>
              </div>
              <a href="/app/playground" data-link class="text-xs font-mono text-[#38BDF8] hover:text-white flex items-center gap-1">
                Open playground &rarr;
              </a>
            </div>

            <!-- G. Reliability and Observability -->
            <div class="p-7 rounded-2xl bg-[#10121A] border border-[#1F2438] flex flex-col justify-between gap-6 hover:border-[#38BDF8]/40 transition-all">
              <div class="flex flex-col gap-3">
                <span class="text-xs font-mono font-bold text-emerald-400 uppercase">Resilience</span>
                <h3 class="text-xl font-bold text-white">G. Reliability & Observability</h3>
                <p class="text-xs text-[#8E98B0] leading-relaxed">
                  Automatic retry chains on upstream 429/500 errors and semantic caching that resolves frequent queries in under 18ms.
                </p>
              </div>
              <a href="/docs#caching" data-link class="text-xs font-mono text-emerald-400 hover:text-white flex items-center gap-1">
                Caching specs &rarr;
              </a>
            </div>

          </div>

        </div>
      </section>

      <!-- ================= SECTION 06: HOW IT WORKS ================= -->
      <section class="py-16 sm:py-20 border-b border-[#1F2438]/70 bg-[#07080B]">
        <div class="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col gap-12">
          
          <div class="flex flex-col gap-2 max-w-2xl">
            <div class="text-[11px] font-mono uppercase tracking-widest text-[#38BDF8]">Architecture Flow</div>
            <h2 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">From your application to the right model</h2>
            <p class="text-sm sm:text-base text-[#8E98B0]">
              Three simple steps to integrate, route, and scale AI inference.
            </p>
          </div>

          <!-- 3 Steps Grid -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <!-- Step 01: Connect -->
            <div class="p-7 rounded-2xl bg-[#10121A] border border-[#1F2438] flex flex-col justify-between gap-6">
              <div class="flex flex-col gap-3">
                <span class="text-2xl font-bold font-mono text-[#38BDF8]">01</span>
                <h3 class="text-xl font-bold text-white">Connect</h3>
                <p class="text-xs text-[#8E98B0] leading-relaxed">
                  Use the existing supported API interface and configure your gateway credentials with the standard OpenAI SDK client.
                </p>
              </div>
              <div class="p-3 bg-[#07080B] rounded-xl border border-[#1F2438] font-mono text-[10px] text-[#38BDF8]">
                baseURL: "https://api.unillm.com/v1"
              </div>
            </div>

            <!-- Step 02: Choose -->
            <div class="p-7 rounded-2xl bg-[#10121A] border border-[#1F2438] flex flex-col justify-between gap-6">
              <div class="flex flex-col gap-3">
                <span class="text-2xl font-bold font-mono text-[#38BDF8]">02</span>
                <h3 class="text-xl font-bold text-white">Choose</h3>
                <p class="text-xs text-[#8E98B0] leading-relaxed">
                  Select a supported model or provider using the actual product workflow. Target Gemini, Claude, GPT-4o, or custom aliases.
                </p>
              </div>
              <div class="p-3 bg-[#07080B] rounded-xl border border-[#1F2438] font-mono text-[10px] text-white">
                model: "gemini-3.6-flash"
              </div>
            </div>

            <!-- Step 03: Build -->
            <div class="p-7 rounded-2xl bg-[#10121A] border border-[#1F2438] flex flex-col justify-between gap-6">
              <div class="flex flex-col gap-3">
                <span class="text-2xl font-bold font-mono text-emerald-400">03</span>
                <h3 class="text-xl font-bold text-white">Build</h3>
                <p class="text-xs text-[#8E98B0] leading-relaxed">
                  Send requests and inspect the response and available usage information. Tokens stream back with zero payload buffering.
                </p>
              </div>
              <div class="p-3 bg-[#07080B] rounded-xl border border-[#1F2438] font-mono text-[10px] text-emerald-400">
                stream: true → Sub-ms token SSE
              </div>
            </div>

          </div>

          <!-- Technical Flow Visualizer (Application → Gateway → Provider → Response) -->
          <div class="p-6 sm:p-8 rounded-2xl bg-[#10121A] border border-[#1F2438] flex flex-col gap-4">
            <span class="text-[10px] font-mono uppercase tracking-widest text-[#8E98B0]">Technical Routing Path</span>
            <div class="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center font-mono text-xs">
              <div class="p-4 rounded-xl bg-[#07080B] border border-[#1F2438]">
                <span class="text-[#38BDF8] block text-[10px] mb-1">01 INGESTION</span>
                <span class="text-white font-bold">Application</span>
              </div>
              <div class="p-4 rounded-xl bg-[#121522] border border-[#38BDF8] shadow-[0_0_20px_rgba(56,189,248,0.1)]">
                <span class="text-[#38BDF8] block text-[10px] mb-1">02 GATEWAY</span>
                <span class="text-white font-bold">LLM Gateway</span>
              </div>
              <div class="p-4 rounded-xl bg-[#07080B] border border-[#1F2438]">
                <span class="text-[#38BDF8] block text-[10px] mb-1">03 DISPATCH</span>
                <span class="text-white font-bold">Selected Model</span>
              </div>
              <div class="p-4 rounded-xl bg-[#07080B] border border-[#1F2438]">
                <span class="text-emerald-400 block text-[10px] mb-1">04 STREAM</span>
                <span class="text-white font-bold">Live Response</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- ================= SECTION 07: DEVELOPER INTEGRATION ================= -->
      <section class="py-16 sm:py-20 border-b border-[#1F2438]/70 bg-[#0A0C13]">
        <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            <div class="lg:col-span-5 flex flex-col gap-4">
              <div class="text-[11px] font-mono uppercase tracking-widest text-[#38BDF8]">OpenAI-Compatible Integration</div>
              <h2 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">Keep your workflow. Change how you access models.</h2>
              <p class="text-sm sm:text-base text-[#8E98B0] leading-relaxed">
                Get started with a clear, copyable example using the API interface supported by LLM Gateway.
              </p>

              <div class="flex flex-col gap-2.5 pt-2 text-xs sm:text-sm text-[#8E98B0]">
                <div class="flex items-center gap-2.5">
                  <div class="w-4 h-4 rounded-full bg-[#161926] border border-[#1F2438] flex items-center justify-center text-[#38BDF8] text-[10px]">✓</div>
                  <span>Zero code changes to existing OpenAI client libraries</span>
                </div>
                <div class="flex items-center gap-2.5">
                  <div class="w-4 h-4 rounded-full bg-[#161926] border border-[#1F2438] flex items-center justify-center text-[#38BDF8] text-[10px]">✓</div>
                  <span>Automatic retries and graceful fallback across providers</span>
                </div>
                <div class="flex items-center gap-2.5">
                  <div class="w-4 h-4 rounded-full bg-[#161926] border border-[#1F2438] flex items-center justify-center text-[#38BDF8] text-[10px]">✓</div>
                  <span>Unified streaming tokens with sub-millisecond overhead</span>
                </div>
              </div>
            </div>

            <!-- Right: Code Panel with Language Tabs -->
            <div class="lg:col-span-7">
              <div class="rounded-2xl bg-[#090A0F] border border-[#1F2438] overflow-hidden shadow-2xl transition-all duration-200">
                <div class="flex items-center justify-between px-4 py-3 bg-[#10121A] border-b border-[#1F2438]">
                  <div class="flex items-center gap-3">
                    <div class="hidden sm:flex items-center gap-1.5 mr-1">
                      <span class="w-2.5 h-2.5 rounded-full bg-red-500/70"></span>
                      <span class="w-2.5 h-2.5 rounded-full bg-amber-500/70"></span>
                      <span class="w-2.5 h-2.5 rounded-full bg-emerald-500/70"></span>
                    </div>
                    <div class="flex items-center gap-1.5">
                      <button data-tab="curl" class="code-tab-btn px-3 py-1 rounded-md text-xs font-mono text-white bg-[#161926] border border-[#1F2438] transition-all">cURL</button>
                      <button data-tab="nodejs" class="code-tab-btn px-3 py-1 rounded-md text-xs font-mono text-[#8E98B0] hover:text-white transition-all">JavaScript</button>
                      <button data-tab="python" class="code-tab-btn px-3 py-1 rounded-md text-xs font-mono text-[#8E98B0] hover:text-white transition-all">Python</button>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <span id="tab-endpoint-lbl" class="hidden sm:inline text-[11px] font-mono text-[#8E98B0]">POST /v1/chat/completions</span>
                    <button id="copy-payload-btn" class="px-3 py-1 rounded bg-[#161926] hover:bg-[#1E2235] text-xs font-mono text-[#8E98B0] hover:text-white transition-all border border-[#1F2438] cursor-pointer">
                      Copy
                    </button>
                  </div>
                </div>

                <div class="p-5 font-mono text-xs leading-relaxed text-[#8E98B0] overflow-x-auto bg-[#07080B]">
                  <pre id="code-snippet-box" class="whitespace-pre"><span class="text-[#38BDF8]">curl</span> https://api.unillm.com/v1/chat/completions \\
  -H <span class="text-emerald-400">"Authorization: Bearer sk-unillm-live-placeholder"</span> \\
  -H <span class="text-emerald-400">"Content-Type: application/json"</span> \\
  -d '{
    <span class="text-[#818CF8]">"model"</span>: <span class="text-emerald-400">"gemini-3.6-flash"</span>,
    <span class="text-[#818CF8]">"messages"</span>: [{"role": <span class="text-emerald-400">"user"</span>, "content": <span class="text-emerald-400">"Explain quantum computing in simple terms."</span>}],
    <span class="text-[#818CF8]">"temperature"</span>: <span class="text-amber-400">0.2</span>
  }'</pre>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- ================= SECTION 08: MODEL PROVIDERS ================= -->
      <section class="py-16 sm:py-20 border-b border-[#1F2438]/70 bg-[#07080B]">
        <div class="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col gap-10">
          
          <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <h2 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">Explore the models that power your applications</h2>
              <p class="text-sm sm:text-base text-[#8E98B0] mt-1">
                Find the models and providers available through the gateway.
              </p>
            </div>
            <a href="/models" data-link class="text-xs font-mono text-[#38BDF8] hover:text-white flex items-center gap-1">
              View all 50+ models &rarr;
            </a>
          </div>

          <!-- Compact Model Directory Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div class="p-5 rounded-xl bg-[#10121A] border border-[#1F2438] flex flex-col justify-between gap-4">
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-[10px] font-mono text-[#38BDF8]">Google</span>
                  <span class="text-[9px] font-mono text-emerald-400">110ms</span>
                </div>
                <h3 class="font-bold text-white text-base">Gemini 3.6 Flash</h3>
                <p class="text-xs text-[#8E98B0] mt-1">1M context window. High throughput reasoning.</p>
              </div>
              <div class="pt-3 border-t border-[#1F2438] font-mono text-[10px] text-[#8E98B0]">
                $0.075 / $0.30 per 1M tokens
              </div>
            </div>

            <div class="p-5 rounded-xl bg-[#10121A] border border-[#1F2438] flex flex-col justify-between gap-4">
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-[10px] font-mono text-white">OpenAI</span>
                  <span class="text-[9px] font-mono text-emerald-400">240ms</span>
                </div>
                <h3 class="font-bold text-white text-base">GPT-4o</h3>
                <p class="text-xs text-[#8E98B0] mt-1">128k context window. Multimodal frontier model.</p>
              </div>
              <div class="pt-3 border-t border-[#1F2438] font-mono text-[10px] text-[#8E98B0]">
                $5.00 / $15.00 per 1M tokens
              </div>
            </div>

            <div class="p-5 rounded-xl bg-[#10121A] border border-[#1F2438] flex flex-col justify-between gap-4">
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-[10px] font-mono text-[#F59E0B]">Anthropic</span>
                  <span class="text-[9px] font-mono text-emerald-400">310ms</span>
                </div>
                <h3 class="font-bold text-white text-base">Claude 3.5 Sonnet</h3>
                <p class="text-xs text-[#8E98B0] mt-1">200k context window. Industry-leading code generation.</p>
              </div>
              <div class="pt-3 border-t border-[#1F2438] font-mono text-[10px] text-[#8E98B0]">
                $3.00 / $15.00 per 1M tokens
              </div>
            </div>

            <div class="p-5 rounded-xl bg-[#10121A] border border-[#1F2438] flex flex-col justify-between gap-4">
              <div>
                <div class="flex justify-between items-center mb-2">
                  <span class="text-[10px] font-mono text-amber-400">Mistral</span>
                  <span class="text-[9px] font-mono text-emerald-400">195ms</span>
                </div>
                <h3 class="font-bold text-white text-base">Mistral Large 2</h3>
                <p class="text-xs text-[#8E98B0] mt-1">128k context window. Advanced multilingual reasoning.</p>
              </div>
              <div class="pt-3 border-t border-[#1F2438] font-mono text-[10px] text-[#8E98B0]">
                $2.00 / $6.00 per 1M tokens
              </div>
            </div>

          </div>

        </div>
      </section>

      <!-- ================= SECTION 09: USAGE AND CONTROL ================= -->
      <section class="py-16 sm:py-20 border-b border-[#1F2438]/70 bg-[#0A0C13]">
        <div class="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div class="lg:col-span-5 flex flex-col gap-4">
              <div class="text-[11px] font-mono uppercase tracking-widest text-[#38BDF8]">Operational Control</div>
              <h2 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">Understand your usage. Stay in control.</h2>
              <p class="text-sm sm:text-base text-[#8E98B0] leading-relaxed">
                Granular visibility into request counts, token breakdown, and exact spend attribution across all connected models and team workspaces.
              </p>
              
              <div class="flex flex-col gap-3 pt-2 text-xs font-mono text-[#8E98B0]">
                <div class="flex justify-between py-2 border-b border-[#1F2438]">
                  <span>Semantic Vector Caching</span>
                  <span class="text-emerald-400 font-bold">100% Free Cache Hits ($0)</span>
                </div>
                <div class="flex justify-between py-2 border-b border-[#1F2438]">
                  <span>Spend Alerts & Quotas</span>
                  <span class="text-white">Hard RPM & Monthly Caps</span>
                </div>
                <div class="flex justify-between py-2">
                  <span>Audit Trail</span>
                  <span class="text-white">Immutable Request Logs</span>
                </div>
              </div>
            </div>

            <!-- Right: Data Visualisation Card -->
            <div class="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#10121A] border border-[#1F2438] flex flex-col gap-5 shadow-2xl">
              <div class="flex justify-between items-center border-b border-[#1F2438] pb-3">
                <span class="text-xs font-bold text-white font-mono">Real-time Spend Breakdown</span>
                <span class="text-xs font-mono text-[#38BDF8]">$12.48 Month-to-date</span>
              </div>
              <div class="space-y-3 text-xs font-mono">
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-white">Google Gemini</span>
                    <span class="text-[#8E98B0]">$4.80 (38%)</span>
                  </div>
                  <div class="w-full h-2 rounded-full bg-[#161926] overflow-hidden">
                    <div class="h-full bg-[#38BDF8] rounded-full" style="width: 38%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-white">OpenAI GPT-4o</span>
                    <span class="text-[#8E98B0]">$4.10 (33%)</span>
                  </div>
                  <div class="w-full h-2 rounded-full bg-[#161926] overflow-hidden">
                    <div class="h-full bg-white rounded-full" style="width: 33%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between mb-1">
                    <span class="text-white">Anthropic Claude</span>
                    <span class="text-[#8E98B0]">$3.58 (29%)</span>
                  </div>
                  <div class="w-full h-2 rounded-full bg-[#161926] overflow-hidden">
                    <div class="h-full bg-[#F59E0B] rounded-full" style="width: 29%"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- ================= SECTION 10: PRICING OVERVIEW ================= -->
      <section class="py-16 sm:py-20 border-b border-[#1F2438]/70 bg-[#07080B]">
        <div class="max-w-[1400px] mx-auto px-6 lg:px-12 flex flex-col gap-12">
          
          <div class="text-center max-w-2xl mx-auto flex flex-col items-center gap-3">
            <div class="text-[11px] font-mono uppercase tracking-widest text-[#38BDF8]">Usage-Based Model</div>
            <h2 class="text-3xl sm:text-4xl font-bold text-white tracking-tight">Straightforward access to AI models</h2>
            <p class="text-sm sm:text-base text-[#8E98B0]">Raw provider pass-through token costs with zero flat platform fees.</p>
          </div>

          <!-- Pricing Grid (3 Authentic Tiers) -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch select-none">
            
            <!-- Tier 1: Free Sandbox -->
            <div class="p-7 rounded-2xl bg-[#10121A] border border-[#1F2438] hover:border-[#38BDF8]/40 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div class="text-xs font-mono text-[#8E98B0] uppercase">Prototype Sandbox</div>
                <div class="text-3xl font-bold text-white mt-2 mb-3">$0 <span class="text-xs font-normal text-[#8E98B0]">/ sandbox</span></div>
                <p class="text-xs text-[#8E98B0] mb-4 leading-relaxed">Perfect for prototyping applications and local API evaluations.</p>
                <div class="space-y-2.5 text-xs text-[#8E98B0] border-t border-[#1F2438]/60 pt-4">
                  <div class="flex items-center gap-2.5 text-white"><span>✓</span> 5,000 monthly requests</div>
                  <div class="flex items-center gap-2.5 text-white"><span>✓</span> 2 active virtual keys</div>
                  <div class="flex items-center gap-2.5"><span>✓</span> 5 core model endpoints</div>
                  <div class="flex items-center gap-2.5"><span>✓</span> Basic telemetry logs</div>
                </div>
              </div>
              <a href="/signup" data-link class="mt-6 w-full py-3 rounded-xl bg-[#161926] hover:bg-[#1E2235] text-white text-xs font-semibold text-center border border-[#1F2438] transition-all">
                Start Free Sandbox
              </a>
            </div>

            <!-- Tier 2: Pay-As-You-Go (Highlighted Centerpiece) -->
            <div class="p-7 rounded-2xl bg-[#121522] border-2 border-[#38BDF8] flex flex-col justify-between relative shadow-[0_0_35px_rgba(56,189,248,0.12)] hover:-translate-y-0.5 transition-all duration-200">
              <div class="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#38BDF8] text-[#07080B] text-[10px] font-mono font-bold uppercase tracking-wider">
                CORE PLATFORM
              </div>
              <div>
                <div class="text-xs font-mono text-[#38BDF8] uppercase">Metered Gateway</div>
                <div class="text-3xl font-bold text-white mt-2 mb-1">Pay-As-You-Go</div>
                <div class="text-[11px] font-mono text-[#38BDF8] mb-3">Raw Token Cost + $0 Platform Fee</div>
                <p class="text-xs text-[#8E98B0] mb-4 leading-relaxed">Add prepaid query credits. Pay only for upstream provider tokens with zero fixed subscription.</p>
                <div class="space-y-2.5 text-xs text-[#8E98B0] border-t border-[#1F2438]/60 pt-4">
                  <div class="flex items-center gap-2.5 text-white"><span>✓</span> Unlimited active virtual keys</div>
                  <div class="flex items-center gap-2.5 text-white"><span>✓</span> Access all 50+ frontier models</div>
                  <div class="flex items-center gap-2.5 text-white"><span>✓</span> Zero monthly platform subscription</div>
                  <div class="flex items-center gap-2.5 text-emerald-400"><span>✓</span> Free semantic cache hits ($0.00)</div>
                  <div class="flex items-center gap-2.5"><span>✓</span> Auto-failover retry chains</div>
                </div>
              </div>
              <button class="get-api-key-cta mt-6 w-full py-3 rounded-xl bg-white hover:bg-slate-200 text-[#07080B] text-xs font-bold text-center transition-all shadow-md cursor-pointer">
                Select Pay-As-You-Go
              </button>
            </div>

            <!-- Tier 3: Enterprise -->
            <div class="p-7 rounded-2xl bg-[#10121A] border border-[#1F2438] hover:border-[#38BDF8]/40 hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between">
              <div>
                <div class="text-xs font-mono text-[#8E98B0] uppercase">Enterprise Scope</div>
                <div class="text-3xl font-bold text-white mt-2 mb-3">Custom <span class="text-xs font-normal text-[#8E98B0]">/ volume</span></div>
                <p class="text-xs text-[#8E98B0] mb-4 leading-relaxed">Dedicated VPC clusters, custom SLA guarantees, and enterprise governance.</p>
                <div class="space-y-2.5 text-xs text-[#8E98B0] border-t border-[#1F2438]/60 pt-4">
                  <div class="flex items-center gap-2.5 text-white"><span>✓</span> Dedicated isolated VPC host</div>
                  <div class="flex items-center gap-2.5 text-white"><span>✓</span> 99.999% SLA Uptime Agreement</div>
                  <div class="flex items-center gap-2.5 text-white"><span>✓</span> Okta SSO & SCIM User Sync</div>
                  <div class="flex items-center gap-2.5"><span>✓</span> Dedicated accounts engineer</div>
                </div>
              </div>
              <a href="/talk-to-sales" data-link class="mt-6 w-full py-3 rounded-xl bg-[#161926] hover:bg-[#1E2235] text-white text-xs font-semibold text-center border border-[#1F2438] transition-all">
                Contact Enterprise Sales
              </a>
            </div>

          </div>

          <div class="text-center pt-2">
            <a href="/pricing" data-link class="inline-flex items-center gap-2 text-xs font-mono text-[#38BDF8] hover:text-white transition-colors">
              Compare full pricing policy & credit terms
              <span>→</span>
            </a>
          </div>

        </div>
      </section>

      <!-- ================= SECTION 11: FAQ ================= -->
      <section class="py-16 sm:py-20 border-b border-[#1F2438]/70 bg-[#0A0C13]">
        <div class="max-w-3xl mx-auto px-6 w-full flex flex-col gap-8 select-none">
          
          <div class="text-center flex flex-col items-center gap-2">
            <span class="text-[10px] font-mono font-bold text-[#38BDF8] uppercase tracking-widest">Questions & Answers</span>
            <h2 class="text-3xl font-bold text-white tracking-tight">Frequently Asked Questions</h2>
          </div>

          <div class="flex flex-col gap-3">
            
            <!-- Q1 -->
            <div class="faq-item rounded-xl bg-[#10121A] border border-[#1F2438] overflow-hidden">
              <button class="faq-trigger w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#161926]/50 transition-colors">
                <span class="font-semibold text-sm text-white">What is LLM Gateway?</span>
                <span class="faq-chevron text-[#8E98B0] text-sm transition-transform duration-200">↓</span>
              </button>
              <div class="faq-content hidden px-6 pb-5 pt-1 text-xs text-[#8E98B0] leading-relaxed border-t border-[#1F2438]/50">
                LLM Gateway is a unified API proxy that allows you to access multiple AI model providers (Google, OpenAI, Anthropic, open-source) through a single endpoint with automated routing, semantic caching, and consolidated usage tracking.
              </div>
            </div>

            <!-- Q2 -->
            <div class="faq-item rounded-xl bg-[#10121A] border border-[#1F2438] overflow-hidden">
              <button class="faq-trigger w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#161926]/50 transition-colors">
                <span class="font-semibold text-sm text-white">How do I get an API key?</span>
                <span class="faq-chevron text-[#8E98B0] text-sm transition-transform duration-200">↓</span>
              </button>
              <div class="faq-content hidden px-6 pb-5 pt-1 text-xs text-[#8E98B0] leading-relaxed border-t border-[#1F2438]/50">
                Click "Get My API Key" on this page. If you don't have an account, register in under a minute. You will be taken directly to your API Keys console to generate a secure virtual key.
              </div>
            </div>

            <!-- Q3 -->
            <div class="faq-item rounded-xl bg-[#10121A] border border-[#1F2438] overflow-hidden">
              <button class="faq-trigger w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#161926]/50 transition-colors">
                <span class="font-semibold text-sm text-white">Which AI models are supported?</span>
                <span class="faq-chevron text-[#8E98B0] text-sm transition-transform duration-200">↓</span>
              </button>
              <div class="faq-content hidden px-6 pb-5 pt-1 text-xs text-[#8E98B0] leading-relaxed border-t border-[#1F2438]/50">
                We support 50+ frontier and open-weights models including Google Gemini 3.6 & 3.7 Flash, OpenAI GPT-4o & GPT-4o-mini, Anthropic Claude 3.5 Sonnet, Meta Llama 3.3, and Mistral Large 2.
              </div>
            </div>

            <!-- Q4 -->
            <div class="faq-item rounded-xl bg-[#10121A] border border-[#1F2438] overflow-hidden">
              <button class="faq-trigger w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#161926]/50 transition-colors">
                <span class="font-semibold text-sm text-white">How does the API integration work?</span>
                <span class="faq-chevron text-[#8E98B0] text-sm transition-transform duration-200">↓</span>
              </button>
              <div class="faq-content hidden px-6 pb-5 pt-1 text-xs text-[#8E98B0] leading-relaxed border-t border-[#1F2438]/50">
                Our gateway is 100% OpenAI-compatible. Set your client's baseURL to <code class="px-1.5 py-0.5 rounded bg-[#161926] text-[#38BDF8] font-mono">https://api.unillm.com/v1</code> and pass your UniLLM secret key in the Authorization header. No code rewrite is required.
              </div>
            </div>

            <!-- Q5 -->
            <div class="faq-item rounded-xl bg-[#10121A] border border-[#1F2438] overflow-hidden">
              <button class="faq-trigger w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#161926]/50 transition-colors">
                <span class="font-semibold text-sm text-white">How are usage and costs calculated?</span>
                <span class="faq-chevron text-[#8E98B0] text-sm transition-transform duration-200">↓</span>
              </button>
              <div class="faq-content hidden px-6 pb-5 pt-1 text-xs text-[#8E98B0] leading-relaxed border-t border-[#1F2438]/50">
                You pay raw upstream token costs with zero markup. Prepaid credits are deducted per request according to upstream provider rates. Semantic cache hits cost $0.00.
              </div>
            </div>

            <!-- Q6 -->
            <div class="faq-item rounded-xl bg-[#10121A] border border-[#1F2438] overflow-hidden">
              <button class="faq-trigger w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-[#161926]/50 transition-colors">
                <span class="font-semibold text-sm text-white">Where can I manage my API keys?</span>
                <span class="faq-chevron text-[#8E98B0] text-sm transition-transform duration-200">↓</span>
              </button>
              <div class="faq-content hidden px-6 pb-5 pt-1 text-xs text-[#8E98B0] leading-relaxed border-t border-[#1F2438]/50">
                Navigate to <code class="px-1.5 py-0.5 rounded bg-[#161926] text-[#38BDF8] font-mono">/app/api-keys</code> in your authenticated console to create new keys, view usage timestamps, and revoke compromised keys immediately.
              </div>
            </div>

          </div>

        </div>
      </section>

      <!-- ================= SECTION 12: FINAL CTA ================= -->
      <section class="py-16 sm:py-24 bg-[#07080B] text-center select-none">
        <div class="max-w-[850px] mx-auto px-6 flex flex-col items-center gap-6">
          <div class="text-[11px] font-mono uppercase tracking-widest text-[#38BDF8]">Unified AI Access</div>
          <h2 class="text-3xl sm:text-5xl font-bold text-white tracking-tight">Ready to build with one API?</h2>
          <p class="text-sm sm:text-base text-[#8E98B0] max-w-lg leading-relaxed">
            Get started with LLM Gateway and connect your application to supported AI models.
          </p>

          <div class="flex flex-wrap items-center justify-center gap-3.5 pt-2">
            <button
              id="final-get-api-key-btn"
              class="get-api-key-cta inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#07080B] font-semibold text-sm hover:bg-slate-200 transition-all shadow-[0_0_24px_rgba(255,255,255,0.15)] cursor-pointer group"
            >
              Get My API Key
              <span class="transition-transform group-hover:translate-x-1 font-bold">→</span>
            </button>

            <a
              href="/models"
              data-link
              class="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full bg-[#10121A] text-white border border-[#1F2438] hover:border-[#38BDF8]/40 hover:bg-[#161926] text-sm font-medium transition-all"
            >
              Explore Models
            </a>
          </div>
        </div>
      </section>

    </div>
  `;
}

export function bindLanding() {
  // 1. Mandatory CTA Behaviour: Get My API Key
  const handleGetApiKeyClick = (e) => {
    e.preventDefault();
    const user = apiService.getCurrentUser();
    
    if (user) {
      // Already authenticated -> Open API key creation flow directly
      router.navigate("/app/api-keys?action=create");
    } else {
      // Not authenticated -> Preserve intended destination and initiate signup/login
      sessionStorage.setItem("redirect_after_login", "/app/api-keys?action=create");
      router.navigate("/signup?redirect=/app/api-keys?action=create");
    }
  };

  document.querySelectorAll(".get-api-key-cta").forEach(btn => {
    btn.addEventListener("click", handleGetApiKeyClick);
  });

  // 2. Code Snippet Tabs
  const codeSnippetBox = document.getElementById("code-snippet-box");
  const tabs = document.querySelectorAll(".code-tab-btn");
  const endpointLbl = document.getElementById("tab-endpoint-lbl");

  const codeTemplates = {
    curl: `<span class="text-[#38BDF8]">curl</span> https://api.unillm.com/v1/chat/completions \\
  -H <span class="text-emerald-400">"Authorization: Bearer sk-unillm-live-placeholder"</span> \\
  -H <span class="text-emerald-400">"Content-Type: application/json"</span> \\
  -d '{
    <span class="text-[#818CF8]">"model"</span>: <span class="text-emerald-400">"gemini-3.6-flash"</span>,
    <span class="text-[#818CF8]">"messages"</span>: [{"role": <span class="text-emerald-400">"user"</span>, "content": <span class="text-emerald-400">"Explain quantum computing in simple terms."</span>}],
    <span class="text-[#818CF8]">"temperature"</span>: <span class="text-amber-400">0.2</span>
  }'`,
    nodejs: `<span class="text-[#818CF8]">import</span> OpenAI <span class="text-[#818CF8]">from</span> <span class="text-emerald-400">"openai"</span>;

<span class="text-[#818CF8]">const</span> client = <span class="text-[#818CF8]">new</span> OpenAI({
  baseURL: <span class="text-emerald-400">"https://api.unillm.com/v1"</span>,
  apiKey: process.env.<span class="text-[#38BDF8]">UNILLM_API_KEY</span>
});

<span class="text-[#818CF8]">const</span> completion = <span class="text-[#818CF8]">await</span> client.chat.completions.create({
  model: <span class="text-emerald-400">"gemini-3.6-flash"</span>,
  messages: [{ role: <span class="text-emerald-400">"user"</span>, content: <span class="text-emerald-400">"Explain quantum computing in simple terms."</span> }]
});`,
    python: `<span class="text-[#818CF8]">from</span> openai <span class="text-[#818CF8]">import</span> OpenAI
<span class="text-[#818CF8]">import</span> os

client = OpenAI(
    base_url=<span class="text-emerald-400">"https://api.unillm.com/v1"</span>,
    api_key=os.environ.get(<span class="text-emerald-400">"UNILLM_API_KEY"</span>)
)

completion = client.chat.completions.create(
    model=<span class="text-emerald-400">"gemini-3.6-flash"</span>,
    messages=[{<span class="text-emerald-400">"role"</span>: <span class="text-emerald-400">"user"</span>, <span class="text-emerald-400">"content"</span>: <span class="text-emerald-400">"Explain quantum computing in simple terms."</span>}]
)`
  };

  tabs.forEach(btn => {
    btn.addEventListener("click", () => {
      tabs.forEach(x => {
        x.classList.remove("text-white", "bg-[#161926]", "border", "border-[#1F2438]");
        x.classList.add("text-[#8E98B0]");
      });
      btn.classList.add("text-white", "bg-[#161926]", "border", "border-[#1F2438]");
      btn.classList.remove("text-[#8E98B0]");
      
      const tab = btn.getAttribute("data-tab");
      if (codeSnippetBox && codeTemplates[tab]) {
        codeSnippetBox.innerHTML = codeTemplates[tab];
      }
      if (endpointLbl) {
        if (tab === "curl") {
          endpointLbl.innerText = "POST /v1/chat/completions";
        } else if (tab === "nodejs") {
          endpointLbl.innerText = "JavaScript OpenAI SDK";
        } else if (tab === "python") {
          endpointLbl.innerText = "Python OpenAI SDK";
        }
      }
    });
  });

  // 3. Code Copy Action
  const copyPayloadBtn = document.getElementById("copy-payload-btn");
  copyPayloadBtn?.addEventListener("click", () => {
    const activeBtn = document.querySelector(".code-tab-btn.text-white");
    const activeTab = activeBtn ? activeBtn.getAttribute("data-tab") : "curl";
    let plainText = "";
    if (activeTab === "curl") {
      plainText = `curl https://api.unillm.com/v1/chat/completions \\\n  -H "Authorization: Bearer sk-unillm-live-placeholder" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "model": "gemini-3.6-flash",\n    "messages": [{"role": "user", "content": "Explain quantum computing in simple terms."}],\n    "temperature": 0.2\n  }'`;
    } else if (activeTab === "nodejs") {
      plainText = `import OpenAI from "openai";\n\nconst client = new OpenAI({\n  baseURL: "https://api.unillm.com/v1",\n  apiKey: process.env.UNILLM_API_KEY\n});\n\nconst completion = await client.chat.completions.create({\n  model: "gemini-3.6-flash",\n  messages: [{ role: "user", content: "Explain quantum computing in simple terms." }]\n});`;
    } else if (activeTab === "python") {
      plainText = `from openai import OpenAI\nimport os\n\nclient = OpenAI(\n    base_url="https://api.unillm.com/v1",\n    api_key=os.environ.get("UNILLM_API_KEY")\n)\n\ncompletion = client.chat.completions.create(\n    model="gemini-3.6-flash",\n    messages=[{"role": "user", "content": "Explain quantum computing in simple terms."}]\n)`;
    }
    navigator.clipboard.writeText(plainText);
    copyPayloadBtn.innerText = "Copied ✓";
    copyPayloadBtn.classList.add("text-[#38BDF8]", "border-[#38BDF8]");
    setTimeout(() => {
      copyPayloadBtn.innerText = "Copy";
      copyPayloadBtn.classList.remove("text-[#38BDF8]", "border-[#38BDF8]");
    }, 2000);
    components.renderToast("success", "Code snippet copied!");
  });

  // 4. FAQ Accordion Expansion
  const faqTriggers = document.querySelectorAll(".faq-trigger");
  faqTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const parent = trigger.closest(".faq-item");
      const content = parent?.querySelector(".faq-content");
      const chevron = trigger.querySelector(".faq-chevron");
      
      if (content) {
        const isHidden = content.classList.contains("hidden");
        document.querySelectorAll(".faq-content").forEach(c => c.classList.add("hidden"));
        document.querySelectorAll(".faq-chevron").forEach(ch => ch.classList.remove("rotate-180"));
        
        if (isHidden) {
          content.classList.remove("hidden");
          chevron?.classList.add("rotate-180");
        }
      }
    });
  });
}

export default {
  landing,
  bindLanding
};
