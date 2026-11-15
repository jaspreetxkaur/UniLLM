// PUBLIC PAGE: landing (Complete Master Redesign: Graphite × Warm Ivory × Signal Orange × Gateway Green)
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";
import { icons } from "../../icons.js?v=2";

export function landing() {
  const models = apiService.getModels() || [];

  return `
    <div id="landing-root" class="relative overflow-hidden w-full bg-[#0B0C0D] text-[#F2EFE8] font-sans selection:bg-[#FF7849]/30 selection:text-white">
      
      <!-- Subtle Atmospheric Ambient Glows -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[550px] bg-gradient-to-b from-[#FF7849]/[0.05] via-[#42D6A4]/[0.03] to-transparent blur-[160px] pointer-events-none -z-10"></div>
      <div class="absolute top-[2200px] left-1/4 w-[800px] h-[600px] bg-gradient-to-b from-[#42D6A4]/[0.03] to-transparent blur-[160px] pointer-events-none -z-10"></div>
      <div class="absolute top-[4200px] right-1/4 w-[750px] h-[500px] bg-gradient-to-b from-[#FF7849]/[0.03] to-transparent blur-[160px] pointer-events-none -z-10"></div>

      <!-- =========================================================================
           SECTION 1 — HERO: LIVING AI GATEWAY CENTREPIECE
           ========================================================================= -->
      <section id="hero" class="relative pt-12 pb-20 lg:pt-20 lg:pb-32 border-b border-[rgba(242,239,232,0.14)] overflow-hidden">
        <div class="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <!-- Left Hero Content -->
            <div class="lg:col-span-6 flex flex-col gap-6 text-left">
              
              <!-- Eyebrow Badge -->
              <div class="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#141615] border border-[rgba(242,239,232,0.14)] text-[11px] font-mono tracking-widest text-[#A6A39C] uppercase self-start">
                <span class="w-1.5 h-1.5 rounded-full bg-[#42D6A4] animate-pulse"></span>
                <span>AI INFRASTRUCTURE / UNIFIED ACCESS</span>
              </div>

              <!-- Main Headline -->
              <h1 class="font-sans font-extrabold text-4xl sm:text-6xl lg:text-[68px] tracking-[-0.03em] text-[#F2EFE8] leading-[1.04]">
                One gateway.<br/>
                Every model.<br/>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#F2EFE8] via-[#F2EFE8] to-[#A6A39C]">Under your control.</span>
              </h1>

              <!-- Supporting Copy -->
              <p class="text-base sm:text-lg text-[#A6A39C] leading-relaxed max-w-xl font-normal">
                Connect applications to supported AI models through one unified API. Manage access, configure intelligent routing, and observe telemetry without building separate point-to-point integrations.
              </p>

              <!-- CTAs & Supporting Line -->
              <div class="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                <div class="flex items-center gap-3.5">
                  <button
                    id="hero-get-started-btn"
                    class="get-api-key-cta px-7 py-3.5 rounded-lg font-bold text-xs text-[#0B0C0D] bg-[#FF7849] hover:bg-[#ff8a60] transition-all shadow-[0_4px_25px_rgba(255,120,73,0.3)] uppercase tracking-wider cursor-pointer"
                  >
                    Get Your API Key
                  </button>
                  <a
                    href="#architecture-revealed"
                    class="px-7 py-3.5 rounded-lg font-semibold text-xs text-[#F2EFE8] bg-[#141615] hover:bg-[#1E2220] border border-[rgba(242,239,232,0.14)] transition-all uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                  >
                    <span>Explore the Architecture</span>
                  </a>
                </div>
              </div>

              <div class="flex items-center gap-2 text-xs font-mono text-[#A6A39C] pt-1">
                <span class="w-1.5 h-1.5 rounded-full bg-[#42D6A4]"></span>
                <span>OpenAI v1 Spec Compatible • Sub-millisecond Gateway Overhead</span>
              </div>

              <!-- Fine Technical Annotations Ticker -->
              <div class="grid grid-cols-3 gap-3 pt-6 border-t border-[rgba(242,239,232,0.1)] font-mono text-xs max-w-lg">
                <div>
                  <span class="text-[10px] text-[#A6A39C] block uppercase">GATEWAY HOP</span>
                  <span class="text-sm font-bold text-[#F2EFE8]">&lt; 0.8 ms</span>
                </div>
                <div>
                  <span class="text-[10px] text-[#A6A39C] block uppercase">SECURITY</span>
                  <span class="text-sm font-bold text-[#42D6A4]">TLS 1.3 Vault</span>
                </div>
                <div>
                  <span class="text-[10px] text-[#A6A39C] block uppercase">MODEL MARKUP</span>
                  <span class="text-sm font-bold text-[#FF7849]">0% Direct</span>
                </div>
              </div>

            </div>

            <!-- Right: The Signature Living AI Gateway Centrepiece -->
            <div id="hero-gateway-anchor" class="lg:col-span-6 flex flex-col items-center justify-center relative select-none">
              
              <div class="hero-stage-viewport" id="hero-stage-viewport">
                
                <!-- Concentric Atmospheric Orbital Rings -->
                <div class="hero-orbital-ring hero-orbital-ring-1"></div>
                <div class="hero-orbital-ring hero-orbital-ring-2"></div>

                <!-- Live SVG Light Packet Conduits -->
                <svg class="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 540 440" fill="none">
                  <defs>
                    <linearGradient id="heroConduitGradGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#42D6A4" stop-opacity="0.8"/>
                      <stop offset="100%" stop-color="#42D6A4" stop-opacity="0.1"/>
                    </linearGradient>
                    <linearGradient id="heroConduitGradOrange" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stop-color="#FF7849" stop-opacity="0.8"/>
                      <stop offset="100%" stop-color="#FF7849" stop-opacity="0.1"/>
                    </linearGradient>
                  </defs>

                  <!-- Node 1 (Gemini) to Gateway Center (270, 220) -->
                  <path d="M 80,70 C 170,70 200,200 270,220" stroke="rgba(66,214,164,0.25)" stroke-width="1.5" stroke-dasharray="3 3"/>
                  <path d="M 80,70 C 170,70 200,200 270,220" stroke="url(#heroConduitGradGreen)" stroke-width="2" class="hero-svg-packet-line"/>

                  <!-- Node 2 (OpenAI) to Gateway Center -->
                  <path d="M 460,70 C 370,70 340,200 270,220" stroke="rgba(255,120,73,0.25)" stroke-width="1.5" stroke-dasharray="3 3"/>
                  <path d="M 460,70 C 370,70 340,200 270,220" stroke="url(#heroConduitGradOrange)" stroke-width="2" class="hero-svg-packet-line-reverse"/>

                  <!-- Node 3 (Anthropic) to Gateway Center -->
                  <path d="M 70,370 C 160,370 190,240 270,220" stroke="rgba(66,214,164,0.25)" stroke-width="1.5" stroke-dasharray="3 3"/>
                  <path d="M 70,370 C 160,370 190,240 270,220" stroke="url(#heroConduitGradGreen)" stroke-width="2" class="hero-svg-packet-line-reverse"/>

                  <!-- Node 4 (Local/Llama) to Gateway Center -->
                  <path d="M 470,370 C 380,370 350,240 270,220" stroke="rgba(255,120,73,0.25)" stroke-width="1.5" stroke-dasharray="3 3"/>
                  <path d="M 470,370 C 380,370 350,240 270,220" stroke="url(#heroConduitGradOrange)" stroke-width="2" class="hero-svg-packet-line"/>
                </svg>

                <!-- Satellite Provider Node 1: Google Gemini -->
                <div class="hero-satellite-node top-3 left-4 cursor-pointer" id="hero-node-gemini" title="Google Gemini Anycast Gateway">
                  <div class="w-6 h-6 rounded-md bg-[#141615] flex items-center justify-center text-[#4285F4]">
                    ${icons.google("w-4 h-4")}
                  </div>
                  <div class="flex flex-col text-left">
                    <span class="text-[11px] font-mono font-bold text-[#F2EFE8]">Gemini Flash</span>
                    <span class="text-[9px] font-mono text-[#42D6A4]">ONLINE • 42ms P95</span>
                  </div>
                </div>

                <!-- Satellite Provider Node 2: OpenAI -->
                <div class="hero-satellite-node top-3 right-4 cursor-pointer" id="hero-node-openai" title="OpenAI Flagship Endpoint">
                  <div class="w-6 h-6 rounded-md bg-[#141615] flex items-center justify-center text-[#F2EFE8]">
                    ${icons.openai("w-4 h-4")}
                  </div>
                  <div class="flex flex-col text-left">
                    <span class="text-[11px] font-mono font-bold text-[#F2EFE8]">GPT-4o</span>
                    <span class="text-[9px] font-mono text-[#FF7849]">ONLINE • 94ms P95</span>
                  </div>
                </div>

                <!-- Satellite Provider Node 3: Anthropic -->
                <div class="hero-satellite-node bottom-4 left-2 cursor-pointer" id="hero-node-claude" title="Anthropic Failover Standby">
                  <div class="w-6 h-6 rounded-md bg-[#141615] flex items-center justify-center text-[#D97706]">
                    ${icons.anthropic("w-4 h-4")}
                  </div>
                  <div class="flex flex-col text-left">
                    <span class="text-[11px] font-mono font-bold text-[#F2EFE8]">Claude 3.5 Sonnet</span>
                    <span class="text-[9px] font-mono text-[#42D6A4]">HOT STANDBY</span>
                  </div>
                </div>

                <!-- Satellite Provider Node 4: Open Weights / Local -->
                <div class="hero-satellite-node bottom-4 right-2 cursor-pointer" id="hero-node-local" title="Local Private Ingress">
                  <div class="w-6 h-6 rounded-md bg-[#141615] flex items-center justify-center text-[#A6A39C]">
                    ${icons.cpu("w-4 h-4")}
                  </div>
                  <div class="flex flex-col text-left">
                    <span class="text-[11px] font-mono font-bold text-[#F2EFE8]">Llama 3 / vLLM</span>
                    <span class="text-[9px] font-mono text-[#A6A39C]">PRIVATE MESH</span>
                  </div>
                </div>

                <!-- Central 3D Dimensional Gateway Core -->
                <div id="hero-gateway-core" class="hero-gateway-core cursor-pointer" title="Click to test simulated request burst">
                  
                  <!-- Click Shockwave Burst Wave Container -->
                  <div id="hero-burst-anchor" class="absolute inset-0 pointer-events-none"></div>

                  <!-- Prism Core -->
                  <div class="hero-core-prism flex flex-col items-center justify-center p-6 text-center">
                    
                    <div class="luminous-edge-orange"></div>
                    
                    <div class="w-14 h-14 rounded-2xl bg-[#0B0C0D] border-2 border-[#42D6A4] flex items-center justify-center shadow-[0_0_30px_rgba(66,214,164,0.5)] mb-3 relative z-10">
                      <span class="text-[#42D6A4]">${icons.lightning("w-7 h-7")}</span>
                      <span class="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#42D6A4] animate-ping"></span>
                    </div>

                    <span class="font-mono text-sm font-black text-white tracking-[0.2em] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">UNILLM ANYCAST</span>
                    <span class="text-[11px] font-mono text-[#42D6A4] font-bold mt-1 tracking-wider">CORE ROUTER: ACTIVE</span>
                    
                    <div class="flex items-center gap-2 mt-3 px-3 py-1 rounded-full bg-[#0B0C0D] border border-[#42D6A4]/40 text-[10px] font-mono text-[#F2EFE8] shadow-inner">
                      <span class="text-[#A6A39C]">INGRESS: :443</span>
                      <span class="w-1.5 h-1.5 rounded-full bg-[#42D6A4] animate-pulse"></span>
                      <span class="text-[#42D6A4] font-bold">0.8ms HOP</span>
                    </div>

                    <!-- Telemetry status indicator inside core -->
                    <div class="mt-2 text-[9px] font-mono text-[#A6A39C] flex items-center gap-1.5">
                      <span class="w-1 h-1 rounded-full bg-[#FF7849]"></span>
                      <span>MESH ONLINE • 0 DOWNTIME</span>
                    </div>

                    <div class="luminous-edge-green"></div>
                  </div>

                  <!-- Outer Glass Facet Hull (Subtle transparent border framing, no blur) -->
                  <div class="hero-prism-hull p-4 flex flex-col justify-between">
                    <div class="flex items-center justify-between text-[8px] font-mono text-[#A6A39C] px-1">
                      <span>AUTH: BEARING JWT</span>
                      <span class="text-[#42D6A4] font-bold">SYNCHRONIZED</span>
                    </div>
                    <div class="flex items-center justify-between text-[8px] font-mono text-[#A6A39C] px-1">
                      <span>CIRCUIT BREAKER</span>
                      <span class="text-[#FF7849] font-bold">ARMED (0ms FAILOVER)</span>
                    </div>
                  </div>

                </div>

              </div>

              <!-- Interactive Hint Indicator -->
              <span class="text-[10px] font-mono text-[#A6A39C] mt-4 flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#FF7849] animate-pulse"></span>
                <span>Interactive Gateway • Move cursor to inspect depth • Click core to pulse burst</span>
              </span>

            </div>

          </div>

          <!-- Restrained Scroll Cue -->
          <div class="pt-12 flex justify-center">
            <a href="#problem-section" class="flex flex-col items-center gap-2 text-xs font-mono text-[#A6A39C] hover:text-[#F2EFE8] transition-colors cursor-pointer">
              <span>Scroll to observe architecture</span>
              <span class="text-sm animate-bounce">↓</span>
            </a>
          </div>

        </div>
      </section>

      <!-- =========================================================================
           SECTION 2 — THE PROBLEM: AI INFRASTRUCTURE SPRAWL
           ========================================================================= -->
      <section id="problem-section" class="relative py-28 border-b border-[rgba(242,239,232,0.14)] overflow-hidden reveal-on-scroll">
        <div class="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          
          <div class="max-w-3xl mb-16">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141615] border border-[rgba(242,239,232,0.14)] text-[10px] font-mono text-[#FF7849] uppercase tracking-wider mb-4">
              <span>THE INTEGRATION DILEMMA</span>
            </div>
            <h2 class="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[#F2EFE8] leading-tight">
              More models. More moving parts.
            </h2>
            <p class="text-[#A6A39C] text-base sm:text-lg mt-4 leading-relaxed">
              When applications integrate directly with individual model providers, complexity compounds across every deployment. Without a unified gateway, resilience and observability suffer.
            </p>
          </div>

          <!-- Comparison: Point-to-Point Sprawl vs UniLLM Convergence -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            <!-- Left: Point-to-Point Sprawl -->
            <div class="p-8 rounded-2xl bg-[#141615]/70 border border-red-500/20 flex flex-col justify-between relative overflow-hidden">
              <div class="absolute top-0 right-0 px-4 py-1.5 bg-red-500/10 border-b border-l border-red-500/20 text-[10px] font-mono text-red-400 font-semibold uppercase">
                Point-to-Point Sprawl
              </div>
              <div>
                <h3 class="text-xl font-bold text-[#F2EFE8] mb-4">Unmanaged Multi-Provider Architecture</h3>
                <p class="text-sm text-[#A6A39C] leading-relaxed mb-6">
                  Each team manages separate credentials, conflicting SDK versions, incompatible error envelopes, and disjointed billing portals.
                </p>
                <div class="space-y-3 font-mono text-xs text-[#A6A39C]">
                  <div class="p-3 rounded-lg bg-[#0B0C0D] border border-red-500/20 flex items-center justify-between">
                    <span>Fragmented API Keys</span>
                    <span class="text-red-400">High Leakage Risk</span>
                  </div>
                  <div class="p-3 rounded-lg bg-[#0B0C0D] border border-red-500/20 flex items-center justify-between">
                    <span>Upstream 503 Outages</span>
                    <span class="text-red-400">Application Outage</span>
                  </div>
                  <div class="p-3 rounded-lg bg-[#0B0C0D] border border-red-500/20 flex items-center justify-between">
                    <span>Usage & Spend Visibility</span>
                    <span class="text-red-400">Disconnected Logs</span>
                  </div>
                </div>
              </div>
              <div class="pt-6 mt-6 border-t border-[rgba(242,239,232,0.08)] flex items-center gap-2 text-xs font-mono text-red-400">
                <span>⚠ Result: Brittle client-side fallback logic & operational blindness</span>
              </div>
            </div>

            <!-- Right: UniLLM Convergence -->
            <div class="p-8 rounded-2xl bg-[#141615] border border-[#42D6A4]/30 flex flex-col justify-between relative overflow-hidden shadow-[0_0_40px_rgba(66,214,164,0.06)]">
              <div class="absolute top-0 right-0 px-4 py-1.5 bg-[#42D6A4]/10 border-b border-l border-[#42D6A4]/30 text-[10px] font-mono text-[#42D6A4] font-semibold uppercase">
                UniLLM Convergence
              </div>
              <div>
                <h3 class="text-xl font-bold text-[#F2EFE8] mb-4">Unified AI Ingress & Routing Mesh</h3>
                <p class="text-sm text-[#A6A39C] leading-relaxed mb-6">
                  Applications connect to a single high-performance gateway. Authentication, routing rules, token limits, and observability are managed centrally.
                </p>
                <div class="space-y-3 font-mono text-xs text-[#F2EFE8]">
                  <div class="p-3 rounded-lg bg-[#0B0C0D] border border-[#42D6A4]/30 flex items-center justify-between">
                    <span>One Master Virtual Token</span>
                    <span class="text-[#42D6A4]">Workspace Scoped</span>
                  </div>
                  <div class="p-3 rounded-lg bg-[#0B0C0D] border border-[#42D6A4]/30 flex items-center justify-between">
                    <span>Autonomous Circuit Breakers</span>
                    <span class="text-[#42D6A4]">Instant Hot Standby</span>
                  </div>
                  <div class="p-3 rounded-lg bg-[#0B0C0D] border border-[#42D6A4]/30 flex items-center justify-between">
                    <span>Observability & Audit Logs</span>
                    <span class="text-[#42D6A4]">Synchronized Streams</span>
                  </div>
                </div>
              </div>
              <div class="pt-6 mt-6 border-t border-[rgba(242,239,232,0.12)] flex items-center gap-2 text-xs font-mono text-[#42D6A4]">
                <span>✓ Result: Resilient, unified model infrastructure under your complete control</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      <!-- =========================================================================
           SECTION 3 — THE GATEWAY REVEALED: LIVING ARCHITECTURE PIPELINE
           ========================================================================= -->
      <section id="architecture-revealed" class="relative py-28 border-b border-[rgba(242,239,232,0.14)] overflow-hidden reveal-on-scroll">
        <div class="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          
          <div class="max-w-3xl mb-12">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141615] border border-[rgba(242,239,232,0.14)] text-[10px] font-mono text-[#42D6A4] uppercase tracking-wider mb-4">
              <span>LIVING SYSTEM VISUALIZATION</span>
            </div>
            <h2 class="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[#F2EFE8] leading-tight">
              One entry point. A coordinated request path.
            </h2>
            <p class="text-[#A6A39C] text-base sm:text-lg mt-4 leading-relaxed">
              Every request follows a deterministic pipeline through authentication, token rate limits, policy evaluation, and upstream dispatch before delivering normalized streaming output.
            </p>
          </div>

          <!-- Controls Bar -->
          <div class="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-xl bg-[#141615] border border-[rgba(242,239,232,0.14)]">
            <div class="flex items-center gap-3">
              <span class="w-2.5 h-2.5 rounded-full bg-[#42D6A4] animate-pulse"></span>
              <span class="text-xs font-mono text-[#F2EFE8] font-bold">PIPELINE SIMULATOR:</span>
              <span class="text-xs font-mono text-[#A6A39C]" id="pipeline-status-text">Active Journey In Flight</span>
            </div>
            <div class="flex items-center gap-2">
              <button id="pipeline-toggle-btn" class="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-[#0B0C0D] border border-[rgba(242,239,232,0.14)] text-[#F2EFE8] hover:border-[#42D6A4] transition-colors cursor-pointer">
                Pause Simulation
              </button>
              <button id="pipeline-replay-btn" class="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-[#FF7849] text-[#0B0C0D] font-bold hover:bg-[#ff8a60] transition-colors cursor-pointer">
                Replay From Stage 1
              </button>
            </div>
          </div>

          <!-- 7-Stage Living Pipeline Grid -->
          <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8" id="pipeline-stages-container">
            
            <!-- Stage 1: Application -->
            <div class="pipeline-stage-card p-4 flex flex-col justify-between cursor-pointer is-active-step" data-step="1">
              <div>
                <div class="flex items-center justify-between text-[10px] font-mono text-[#A6A39C] mb-2">
                  <span>STAGE 01</span>
                  <span class="text-[#42D6A4]">0.0ms</span>
                </div>
                <div class="pipeline-icon-box w-8 h-8 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.1)] flex items-center justify-center text-[#F2EFE8] mb-3">
                  ${icons.cpu("w-4 h-4")}
                </div>
                <h4 class="text-xs font-bold text-[#F2EFE8]">Application</h4>
                <p class="text-[10px] text-[#A6A39C] mt-1 leading-snug">Client / Agent code issues OpenAI-spec HTTP call.</p>
              </div>
              <div class="mt-3 pt-2 border-t border-[rgba(242,239,232,0.08)] text-[9px] font-mono text-[#42D6A4]">
                POST /v1/chat
              </div>
            </div>

            <!-- Stage 2: Ingress -->
            <div class="pipeline-stage-card p-4 flex flex-col justify-between cursor-pointer" data-step="2">
              <div>
                <div class="flex items-center justify-between text-[10px] font-mono text-[#A6A39C] mb-2">
                  <span>STAGE 02</span>
                  <span class="text-[#42D6A4]">+0.2ms</span>
                </div>
                <div class="pipeline-icon-box w-8 h-8 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.1)] flex items-center justify-center text-[#F2EFE8] mb-3">
                  ${icons.globe("w-4 h-4")}
                </div>
                <h4 class="text-xs font-bold text-[#F2EFE8]">Ingress Edge</h4>
                <p class="text-[10px] text-[#A6A39C] mt-1 leading-snug">TLS termination & HTTP/2 connection pooling.</p>
              </div>
              <div class="mt-3 pt-2 border-t border-[rgba(242,239,232,0.08)] text-[9px] font-mono text-[#A6A39C]">
                Port 443 Anycast
              </div>
            </div>

            <!-- Stage 3: UniLLM Gateway Core -->
            <div class="pipeline-stage-card p-4 flex flex-col justify-between cursor-pointer" data-step="3">
              <div>
                <div class="flex items-center justify-between text-[10px] font-mono text-[#A6A39C] mb-2">
                  <span>STAGE 03</span>
                  <span class="text-[#42D6A4]">+0.4ms</span>
                </div>
                <div class="pipeline-icon-box w-8 h-8 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.1)] flex items-center justify-center text-[#F2EFE8] mb-3">
                  ${icons.lightning("w-4 h-4")}
                </div>
                <h4 class="text-xs font-bold text-[#F2EFE8]">UniLLM Core</h4>
                <p class="text-[10px] text-[#A6A39C] mt-1 leading-snug">Token parsing & telemetry context initialization.</p>
              </div>
              <div class="mt-3 pt-2 border-t border-[rgba(242,239,232,0.08)] text-[9px] font-mono text-[#FF7849]">
                Core Orchestration
              </div>
            </div>

            <!-- Stage 4: Validation & Limits -->
            <div class="pipeline-stage-card p-4 flex flex-col justify-between cursor-pointer" data-step="4">
              <div>
                <div class="flex items-center justify-between text-[10px] font-mono text-[#A6A39C] mb-2">
                  <span>STAGE 04</span>
                  <span class="text-[#42D6A4]">+0.6ms</span>
                </div>
                <div class="pipeline-icon-box w-8 h-8 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.1)] flex items-center justify-center text-[#F2EFE8] mb-3">
                  ${icons.shield("w-4 h-4")}
                </div>
                <h4 class="text-xs font-bold text-[#F2EFE8]">Auth & Quota</h4>
                <p class="text-[10px] text-[#A6A39C] mt-1 leading-snug">Virtual key verify & tenant spend budget enforcement.</p>
              </div>
              <div class="mt-3 pt-2 border-t border-[rgba(242,239,232,0.08)] text-[9px] font-mono text-[#42D6A4]">
                Pass: Key Valid
              </div>
            </div>

            <!-- Stage 5: Routing Policy -->
            <div class="pipeline-stage-card p-4 flex flex-col justify-between cursor-pointer" data-step="5">
              <div>
                <div class="flex items-center justify-between text-[10px] font-mono text-[#A6A39C] mb-2">
                  <span>STAGE 05</span>
                  <span class="text-[#42D6A4]">+0.8ms</span>
                </div>
                <div class="pipeline-icon-box w-8 h-8 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.1)] flex items-center justify-center text-[#F2EFE8] mb-3">
                  ${icons.gitBranch("w-4 h-4")}
                </div>
                <h4 class="text-xs font-bold text-[#F2EFE8]">Routing Policy</h4>
                <p class="text-[10px] text-[#A6A39C] mt-1 leading-snug">Evaluates latency, cost caps, and upstream health.</p>
              </div>
              <div class="mt-3 pt-2 border-t border-[rgba(242,239,232,0.08)] text-[9px] font-mono text-[#42D6A4]">
                Target Resolved
              </div>
            </div>

            <!-- Stage 6: Selected Provider -->
            <div class="pipeline-stage-card p-4 flex flex-col justify-between cursor-pointer" data-step="6">
              <div>
                <div class="flex items-center justify-between text-[10px] font-mono text-[#A6A39C] mb-2">
                  <span>STAGE 06</span>
                  <span class="text-[#FF7849]">+42.0ms</span>
                </div>
                <div class="pipeline-icon-box w-8 h-8 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.1)] flex items-center justify-center text-[#F2EFE8] mb-3">
                  ${icons.server("w-4 h-4")}
                </div>
                <h4 class="text-xs font-bold text-[#F2EFE8]">Model Dispatch</h4>
                <p class="text-[10px] text-[#A6A39C] mt-1 leading-snug">Dispatches to Google / OpenAI / Anthropic upstream.</p>
              </div>
              <div class="mt-3 pt-2 border-t border-[rgba(242,239,232,0.08)] text-[9px] font-mono text-[#42D6A4]">
                Upstream 200 OK
              </div>
            </div>

            <!-- Stage 7: Normalized Stream -->
            <div class="pipeline-stage-card p-4 flex flex-col justify-between cursor-pointer" data-step="7">
              <div>
                <div class="flex items-center justify-between text-[10px] font-mono text-[#A6A39C] mb-2">
                  <span>STAGE 07</span>
                  <span class="text-[#42D6A4]">Delivered</span>
                </div>
                <div class="pipeline-icon-box w-8 h-8 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.1)] flex items-center justify-center text-[#F2EFE8] mb-3">
                  ${icons.chart("w-4 h-4")}
                </div>
                <h4 class="text-xs font-bold text-[#F2EFE8]">Normalized Return</h4>
                <p class="text-[10px] text-[#A6A39C] mt-1 leading-snug">SSE token chunks streamed back with unified traces.</p>
              </div>
              <div class="mt-3 pt-2 border-t border-[rgba(242,239,232,0.08)] text-[9px] font-mono text-[#42D6A4]">
                Stream Closed
              </div>
            </div>

          </div>

          <!-- Live Step Inspector HUD -->
          <div class="p-6 rounded-2xl bg-[#141615] border border-[rgba(242,239,232,0.14)] font-mono text-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="flex flex-col gap-1">
              <div class="flex items-center gap-2">
                <span class="text-[10px] text-[#A6A39C] uppercase tracking-wider">LIVE STAGE TELEMETRY</span>
                <span class="px-2 py-0.5 rounded bg-[#42D6A4]/10 text-[#42D6A4] text-[10px]" id="hud-stage-badge">STAGE 01 OF 07</span>
              </div>
              <span class="text-base font-bold text-[#F2EFE8]" id="hud-stage-name">Application Ingress Request</span>
              <span class="text-xs text-[#A6A39C]" id="hud-stage-desc">Standard OpenAI SDK initializes connection over mutual TLS.</span>
            </div>
            
            <div class="flex items-center gap-6 border-t md:border-t-0 md:border-l border-[rgba(242,239,232,0.1)] pt-4 md:pt-0 md:pl-6">
              <div>
                <span class="text-[10px] text-[#A6A39C] block uppercase">STEP LATENCY</span>
                <span class="text-sm font-bold text-[#42D6A4]" id="hud-step-latency">0.02 ms</span>
              </div>
              <div>
                <span class="text-[10px] text-[#A6A39C] block uppercase">STATUS</span>
                <span class="text-sm font-bold text-[#F2EFE8]" id="hud-step-status">VERIFIED 200</span>
              </div>
              <div>
                <span class="text-[10px] text-[#A6A39C] block uppercase">AUDIT TRACE</span>
                <span class="text-sm font-bold text-[#FF7849]" id="hud-step-trace">tr-unillm-7a8e</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      <!-- =========================================================================
           SECTION 4 — INTELLIGENT ROUTING: LIVING NETWORK MATRIX
           ========================================================================= -->
      <section id="routing-section" class="relative py-28 border-b border-[rgba(242,239,232,0.14)] overflow-hidden reveal-on-scroll">
        <div class="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          
          <div class="max-w-3xl mb-12">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141615] border border-[rgba(242,239,232,0.14)] text-[10px] font-mono text-[#FF7849] uppercase tracking-wider mb-4">
              <span>DYNAMIC POLICY ENGINE</span>
            </div>
            <h2 class="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[#F2EFE8] leading-tight">
              Make the request path deliberate.
            </h2>
            <p class="text-[#A6A39C] text-base sm:text-lg mt-4 leading-relaxed">
              Define routing rules based on latency, complexity, cost caps, or failover requirements. Select a routing strategy below to see how UniLLM directs traffic in real time.
            </p>
          </div>

          <!-- Policy Selectors & Actions -->
          <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div class="flex flex-wrap items-center gap-2" id="routing-policy-selector-group">
              <button data-route="gemini" class="route-selector-btn active px-4 py-2 rounded-lg text-xs font-mono bg-[#FF7849] text-[#0B0C0D] font-bold transition-all cursor-pointer">
                Latency Optimizer (Default)
              </button>
              <button data-route="openai" class="route-selector-btn px-4 py-2 rounded-lg text-xs font-mono bg-[#0B0C0D] text-[#A6A39C] border border-[rgba(242,239,232,0.14)] hover:text-white transition-all cursor-pointer">
                Reasoning Flagship
              </button>
              <button data-route="standby" class="route-selector-btn px-4 py-2 rounded-lg text-xs font-mono bg-[#0B0C0D] text-[#A6A39C] border border-[rgba(242,239,232,0.14)] hover:text-white transition-all cursor-pointer">
                Autonomous Failover
              </button>
              <button data-route="cost" class="route-selector-btn px-4 py-2 rounded-lg text-xs font-mono bg-[#0B0C0D] text-[#A6A39C] border border-[rgba(242,239,232,0.14)] hover:text-white transition-all cursor-pointer">
                Cost Minimum
              </button>
            </div>

            <div class="flex items-center gap-2">
              <button id="simulate-burst-btn" class="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-[#141615] border border-[#42D6A4]/40 text-[#42D6A4] hover:bg-[#1A1D1B] transition-all cursor-pointer">
                Simulate 5x Burst
              </button>
              <button id="reset-route-demo-btn" class="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-[#0B0C0D] border border-[rgba(242,239,232,0.14)] text-[#A6A39C] hover:text-white transition-all cursor-pointer">
                Reset Simulation
              </button>
            </div>
          </div>

          <!-- Visual Network Matrix Canvas & Details -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <!-- Left Network Visual Graphic -->
            <div class="lg:col-span-7 p-6 rounded-2xl bg-[#141615] border border-[rgba(242,239,232,0.14)] relative overflow-hidden min-h-[380px] flex items-center justify-center">
              
              <svg class="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 520 340" fill="none">
                <!-- Conduits from Central Gateway (260, 170) to 4 Targets -->
                <path id="conduit-gemini" d="M 260,170 C 260,80 140,70 90,70" stroke="rgba(242,239,232,0.15)" stroke-width="2" stroke-dasharray="4 4"/>
                <path id="conduit-openai" d="M 260,170 C 260,80 380,70 430,70" stroke="rgba(242,239,232,0.15)" stroke-width="2" stroke-dasharray="4 4"/>
                <path id="conduit-standby" d="M 260,170 C 260,260 140,270 90,270" stroke="rgba(242,239,232,0.15)" stroke-width="2" stroke-dasharray="4 4"/>
                <path id="conduit-cost" d="M 260,170 C 260,260 380,270 430,270" stroke="rgba(242,239,232,0.15)" stroke-width="2" stroke-dasharray="4 4"/>
              </svg>

              <!-- Central Gateway Routing Matrix Hub -->
              <div class="relative z-10 w-28 h-28 rounded-2xl bg-[#0B0C0D] border-2 border-[#42D6A4] flex flex-col items-center justify-center text-center p-2 shadow-[0_0_35px_rgba(66,214,164,0.3)]">
                <div class="w-8 h-8 rounded-lg bg-[#141615] flex items-center justify-center text-[#42D6A4] mb-1">
                  ${icons.gitBranch("w-5 h-5")}
                </div>
                <span class="text-[10px] font-mono font-bold text-white uppercase">UNILLM</span>
                <span class="text-[8px] font-mono text-[#42D6A4] font-semibold">ROUTER HUB</span>
              </div>

              <!-- Satellite Node 1: Gemini (Top Left) -->
              <div class="routing-mesh-node absolute top-6 left-6 p-3 rounded-xl bg-[#0B0C0D] flex items-center gap-3 cursor-pointer is-targeted" data-node="gemini" id="node-gemini">
                <div class="w-7 h-7 rounded-lg bg-[#141615] flex items-center justify-center text-[#4285F4]">
                  ${icons.google("w-4 h-4")}
                </div>
                <div class="text-left font-mono">
                  <div class="text-xs font-bold text-[#F2EFE8]">Gemini 3.6 Flash</div>
                  <div class="text-[9px] text-[#42D6A4]">Lowest P95 (42ms)</div>
                </div>
              </div>

              <!-- Satellite Node 2: OpenAI (Top Right) -->
              <div class="routing-mesh-node absolute top-6 right-6 p-3 rounded-xl bg-[#0B0C0D] flex items-center gap-3 cursor-pointer" data-node="openai" id="node-openai">
                <div class="w-7 h-7 rounded-lg bg-[#141615] flex items-center justify-center text-white">
                  ${icons.openai("w-4 h-4")}
                </div>
                <div class="text-left font-mono">
                  <div class="text-xs font-bold text-[#F2EFE8]">GPT-4o</div>
                  <div class="text-[9px] text-[#A6A39C]">High Reasoning</div>
                </div>
              </div>

              <!-- Satellite Node 3: Claude (Bottom Left) -->
              <div class="routing-mesh-node absolute bottom-6 left-6 p-3 rounded-xl bg-[#0B0C0D] flex items-center gap-3 cursor-pointer" data-node="standby" id="node-standby">
                <div class="w-7 h-7 rounded-lg bg-[#141615] flex items-center justify-center text-[#D97706]">
                  ${icons.anthropic("w-4 h-4")}
                </div>
                <div class="text-left font-mono">
                  <div class="text-xs font-bold text-[#F2EFE8]">Claude 3.5 Sonnet</div>
                  <div class="text-[9px] text-[#A6A39C]">Hot Standby</div>
                </div>
              </div>

              <!-- Satellite Node 4: Local / Cost (Bottom Right) -->
              <div class="routing-mesh-node absolute bottom-6 right-6 p-3 rounded-xl bg-[#0B0C0D] flex items-center gap-3 cursor-pointer" data-node="cost" id="node-cost">
                <div class="w-7 h-7 rounded-lg bg-[#141615] flex items-center justify-center text-[#A6A39C]">
                  ${icons.server("w-4 h-4")}
                </div>
                <div class="text-left font-mono">
                  <div class="text-xs font-bold text-[#F2EFE8]">DeepSeek / Llama</div>
                  <div class="text-[9px] text-[#A6A39C]">Cost Minimal</div>
                </div>
              </div>

            </div>

            <!-- Right Telemetry Readout & Policy Explanation -->
            <div class="lg:col-span-5 flex flex-col gap-5 p-6 rounded-2xl bg-[#141615] border border-[rgba(242,239,232,0.14)]">
              
              <div class="flex items-center justify-between border-b border-[rgba(242,239,232,0.1)] pb-4">
                <div>
                  <span class="text-[10px] font-mono text-[#A6A39C] uppercase block">ACTIVE POLICY</span>
                  <span id="route-policy-desc" class="text-base font-bold text-[#F2EFE8]">Default Latency Optimizer</span>
                </div>
                <span class="px-2.5 py-1 rounded-full bg-[#42D6A4]/10 text-[#42D6A4] text-[10px] font-mono font-bold">
                  ACTIVE ROUTE
                </span>
              </div>

              <div class="text-xs text-[#A6A39C] leading-relaxed" id="route-policy-rationale">
                Requests are routed to the upstream endpoint with the lowest rolling P95 Time-To-First-Token. If upstream latency degrades past 120ms, traffic seamlessly pivots to backup.
              </div>

              <div class="space-y-3 font-mono text-xs pt-2">
                <div class="p-3 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.1)] flex items-center justify-between">
                  <span class="text-[#A6A39C]">Selected Target</span>
                  <span id="route-target-model" class="text-[#F2EFE8] font-bold">Gemini 3.6 Flash</span>
                </div>
                <div class="p-3 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.1)] flex items-center justify-between">
                  <span class="text-[#A6A39C]">Ingress Overhead</span>
                  <span id="route-latency-val" class="text-[#42D6A4] font-bold">~42ms P95 TTFT</span>
                </div>
                <div class="p-3 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.1)] flex items-center justify-between">
                  <span class="text-[#A6A39C]">Token Economics</span>
                  <span id="route-cost-val" class="text-[#FF7849] font-bold">$0.075 / $0.30 per 1M</span>
                </div>
              </div>

              <div class="text-[10px] font-mono text-[#A6A39C] pt-2 border-t border-[rgba(242,239,232,0.08)] flex items-center justify-between">
                <span>Endpoint: api.unillm.com/v1</span>
                <span class="text-[#42D6A4]">SLA 99.99%</span>
              </div>

            </div>

          </div>

        </div>
      </section>

      <!-- =========================================================================
           SECTION 5 — THE MODEL ECOSYSTEM: INTERACTIVE MATRIX & INSPECTOR
           ========================================================================= -->
      <section id="models-section" class="relative py-28 border-b border-[rgba(242,239,232,0.14)] overflow-hidden reveal-on-scroll">
        <div class="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          
          <div class="max-w-3xl mb-12">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141615] border border-[rgba(242,239,232,0.14)] text-[10px] font-mono text-[#42D6A4] uppercase tracking-wider mb-4">
              <span>UNIFIED CATALOGUE</span>
            </div>
            <h2 class="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[#F2EFE8] leading-tight">
              Different models. One integration surface.
            </h2>
            <p class="text-[#A6A39C] text-base sm:text-lg mt-4 leading-relaxed">
              Explore supported models available through your UniLLM gateway. Filter by capability or click any model to view instant specifications and integration code.
            </p>
          </div>

          <!-- Filter & Search Toolbar -->
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div class="flex flex-wrap items-center gap-2" id="model-filter-group">
              <button data-cat="all" class="model-filter-chip active px-3.5 py-1.5 rounded-lg text-xs font-mono bg-[#42D6A4] text-[#0B0C0D] font-bold transition-all cursor-pointer">
                All Models
              </button>
              <button data-cat="Google" class="model-filter-chip px-3.5 py-1.5 rounded-lg text-xs font-mono bg-[#141615] text-[#A6A39C] border border-[rgba(242,239,232,0.14)] hover:text-white transition-all cursor-pointer">
                Google DeepMind
              </button>
              <button data-cat="OpenAI" class="model-filter-chip px-3.5 py-1.5 rounded-lg text-xs font-mono bg-[#141615] text-[#A6A39C] border border-[rgba(242,239,232,0.14)] hover:text-white transition-all cursor-pointer">
                OpenAI
              </button>
              <button data-cat="fast" class="model-filter-chip px-3.5 py-1.5 rounded-lg text-xs font-mono bg-[#141615] text-[#A6A39C] border border-[rgba(242,239,232,0.14)] hover:text-white transition-all cursor-pointer">
                Ultra-Low Latency
              </button>
            </div>

            <!-- Instant Search Bar -->
            <div class="relative w-full sm:w-64">
              <input
                id="model-search-input"
                type="text"
                placeholder="Search models..."
                class="w-full bg-[#141615] border border-[rgba(242,239,232,0.14)] rounded-lg px-3.5 py-2 text-xs font-mono text-[#F2EFE8] placeholder-[#A6A39C]/50 focus:outline-none focus:border-[#42D6A4]"
              />
            </div>
          </div>

          <!-- Model Matrix & Inspector Layout -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <!-- Left: Model Cards Grid -->
            <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4" id="models-matrix-grid">
              ${models.slice(0, 6).map((m, idx) => `
                <div class="model-matrix-card p-5 rounded-xl cursor-pointer ${idx === 0 ? 'is-selected' : ''}" data-model-id="${m.id}" data-provider="${m.provider || 'Gemini'}">
                  <div class="flex items-center justify-between mb-3">
                    <div class="flex items-center gap-2.5">
                      <div class="w-7 h-7 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.1)] flex items-center justify-center text-[#F2EFE8]">
                        ${(m.provider === 'OpenAI') ? icons.openai("w-4 h-4") : icons.google("w-4 h-4")}
                      </div>
                      <span class="text-xs font-bold text-[#F2EFE8]">${m.name}</span>
                    </div>
                    <span class="w-2 h-2 rounded-full bg-[#42D6A4]"></span>
                  </div>

                  <p class="text-[11px] text-[#A6A39C] line-clamp-2 mb-4 leading-relaxed">${m.description || 'Production-grade enterprise LLM endpoint.'}</p>

                  <div class="grid grid-cols-2 gap-2 text-[10px] font-mono pt-3 border-t border-[rgba(242,239,232,0.08)]">
                    <div>
                      <span class="text-[#A6A39C] block">Context</span>
                      <span class="text-[#F2EFE8] font-bold">${m.contextLength || '128k'}</span>
                    </div>
                    <div>
                      <span class="text-[#A6A39C] block">Input / 1M</span>
                      <span class="text-[#42D6A4] font-bold">\$${m.inputCost?.toFixed(3) || '0.075'}</span>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>

            <!-- Right: Interactive Model Inspector Panel -->
            <div class="lg:col-span-5 p-6 rounded-2xl bg-[#141615] border border-[rgba(242,239,232,0.14)] flex flex-col gap-5 sticky top-24">
              
              <div class="flex items-center justify-between border-b border-[rgba(242,239,232,0.1)] pb-4">
                <div>
                  <span class="text-[10px] font-mono text-[#A6A39C] uppercase block">MODEL SPECIFICATION</span>
                  <span id="inspect-model-name" class="text-xl font-bold text-[#F2EFE8]">Gemini 3.6 Flash</span>
                </div>
                <span id="inspect-model-provider" class="px-2.5 py-1 rounded bg-[#42D6A4]/10 text-[#42D6A4] text-[10px] font-mono font-bold">
                  Google DeepMind
                </span>
              </div>

              <div class="space-y-3 font-mono text-xs">
                <div class="p-3 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.1)] flex items-center justify-between">
                  <span class="text-[#A6A39C]">Routing ID</span>
                  <code id="inspect-model-id" class="text-[#42D6A4] font-bold">gemini-3.6-flash</code>
                </div>
                <div class="p-3 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.1)] flex items-center justify-between">
                  <span class="text-[#A6A39C]">Context Window</span>
                  <span id="inspect-model-context" class="text-[#F2EFE8] font-bold">1M tokens</span>
                </div>
                <div class="p-3 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.1)] flex items-center justify-between">
                  <span class="text-[#A6A39C]">Pricing (In / Out)</span>
                  <span id="inspect-model-pricing" class="text-[#FF7849] font-bold">$0.075 / $0.30 per 1M</span>
                </div>
              </div>

              <!-- Integration Snippet -->
              <div>
                <span class="text-[10px] font-mono text-[#A6A39C] block mb-2 uppercase">Instant Integration</span>
                <div class="p-3 rounded-lg bg-[#0B0C0D] border border-[rgba(242,239,232,0.1)] font-mono text-[11px] text-[#A6A39C]">
                  <code>"model": "<span id="inspect-code-model" class="text-[#42D6A4]">gemini-3.6-flash</span>"</code>
                </div>
              </div>

              <div class="pt-2 flex items-center gap-3">
                <a
                  href="/models"
                  class="flex-1 py-2.5 rounded-lg text-center font-bold text-xs text-[#0B0C0D] bg-[#42D6A4] hover:bg-[#38b78c] transition-all uppercase tracking-wider cursor-pointer"
                >
                  Explore Full Registry
                </a>
                <a
                  href="/app/playground"
                  class="py-2.5 px-4 rounded-lg font-semibold text-xs text-[#F2EFE8] bg-[#0B0C0D] border border-[rgba(242,239,232,0.14)] hover:border-white transition-all uppercase tracking-wider cursor-pointer"
                >
                  Playground
                </a>
              </div>

            </div>

          </div>

        </div>
      </section>

      <!-- =========================================================================
           SECTION 6 — OBSERVABILITY & USAGE: LIVING TELEMETRY SURFACE
           ========================================================================= -->
      <section id="observability-section" class="relative py-28 border-b border-[rgba(242,239,232,0.14)] overflow-hidden reveal-on-scroll">
        <div class="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          
          <div class="max-w-3xl mb-12">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141615] border border-[rgba(242,239,232,0.14)] text-[10px] font-mono text-[#FF7849] uppercase tracking-wider mb-4">
              <span>REAL-TIME OBSERVABILITY</span>
            </div>
            <h2 class="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[#F2EFE8] leading-tight">
              Understand what happens after the request.
            </h2>
            <p class="text-[#A6A39C] text-base sm:text-lg mt-4 leading-relaxed">
              Granular request traces, latency percentiles, and token accounting—aggregated cleanly without running third-party sidecars.
            </p>
          </div>

          <!-- Living Telemetry Ticker Gauges -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 font-mono text-xs">
            <div class="p-4 rounded-xl bg-[#141615] border border-[rgba(242,239,232,0.14)]">
              <span class="text-[10px] text-[#A6A39C] block uppercase">P95 TIME-TO-FIRST-TOKEN</span>
              <span class="text-2xl font-bold text-[#42D6A4] mt-1 block">42.4 ms</span>
              <span class="text-[9px] text-[#A6A39C] mt-1 block">Rolling 1-hour P95</span>
            </div>
            <div class="p-4 rounded-xl bg-[#141615] border border-[rgba(242,239,232,0.14)]">
              <span class="text-[10px] text-[#A6A39C] block uppercase">GATEWAY HOP LATENCY</span>
              <span class="text-2xl font-bold text-[#F2EFE8] mt-1 block">0.82 ms</span>
              <span class="text-[9px] text-[#42D6A4] mt-1 block">Anycast Ingress</span>
            </div>
            <div class="p-4 rounded-xl bg-[#141615] border border-[rgba(242,239,232,0.14)]">
              <span class="text-[10px] text-[#A6A39C] block uppercase">TOKENS DISPATCHED</span>
              <span class="text-2xl font-bold text-[#FF7849] mt-1 block">142.8M</span>
              <span class="text-[9px] text-[#A6A39C] mt-1 block">24h Synchronized Count</span>
            </div>
            <div class="p-4 rounded-xl bg-[#141615] border border-[rgba(242,239,232,0.14)]">
              <span class="text-[10px] text-[#A6A39C] block uppercase">FAILOVER RESILIENCE</span>
              <span class="text-2xl font-bold text-[#42D6A4] mt-1 block">100.0%</span>
              <span class="text-[9px] text-[#42D6A4] mt-1 block">Zero Unhandled 5xx</span>
            </div>
          </div>

          <!-- Trace Waterfall & Latency Distribution Chart -->
          <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            <!-- Left: Request Trace Waterfall -->
            <div class="lg:col-span-7 p-6 rounded-2xl bg-[#141615] border border-[rgba(242,239,232,0.14)]">
              <div class="flex items-center justify-between pb-4 border-b border-[rgba(242,239,232,0.1)] mb-4">
                <div class="flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-[#42D6A4]"></span>
                  <span class="font-mono text-xs font-bold text-[#F2EFE8]">Sample Request Waterfall: tr-unillm-7a8e2b</span>
                </div>
                <span class="text-[10px] font-mono text-[#A6A39C]">STATUS: 200 OK</span>
              </div>

              <!-- Waterfall Bars -->
              <div class="space-y-4 font-mono text-xs">
                <div>
                  <div class="flex items-center justify-between text-[11px] mb-1">
                    <span class="text-[#A6A39C]">01 Ingress TLS & DNS Handshake</span>
                    <span class="text-[#42D6A4]">0.4ms</span>
                  </div>
                  <div class="w-full h-2 rounded-full bg-[#0B0C0D] overflow-hidden">
                    <div class="waterfall-segment-bar h-full bg-[#42D6A4] w-[4%]"></div>
                  </div>
                </div>

                <div>
                  <div class="flex items-center justify-between text-[11px] mb-1">
                    <span class="text-[#A6A39C]">02 API Key Auth & Rate Limit Verification</span>
                    <span class="text-[#42D6A4]">0.2ms</span>
                  </div>
                  <div class="w-full h-2 rounded-full bg-[#0B0C0D] overflow-hidden">
                    <div class="waterfall-segment-bar h-full bg-[#42D6A4] w-[2%]"></div>
                  </div>
                </div>

                <div>
                  <div class="flex items-center justify-between text-[11px] mb-1">
                    <span class="text-[#A6A39C]">03 Routing Policy & Circuit Evaluation</span>
                    <span class="text-[#42D6A4]">0.4ms</span>
                  </div>
                  <div class="w-full h-2 rounded-full bg-[#0B0C0D] overflow-hidden">
                    <div class="waterfall-segment-bar h-full bg-[#42D6A4] w-[4%]"></div>
                  </div>
                </div>

                <div>
                  <div class="flex items-center justify-between text-[11px] mb-1">
                    <span class="text-[#A6A39C]">04 Upstream TTFT (Google DeepMind Gemini Flash)</span>
                    <span class="text-[#FF7849]">38.2ms</span>
                  </div>
                  <div class="w-full h-2 rounded-full bg-[#0B0C0D] overflow-hidden">
                    <div class="waterfall-segment-bar h-full bg-[#FF7849] w-[70%]"></div>
                  </div>
                </div>

                <div>
                  <div class="flex items-center justify-between text-[11px] mb-1">
                    <span class="text-[#A6A39C]">05 Full SSE Stream Delivery (542 tokens)</span>
                    <span class="text-[#F2EFE8]">210.8ms</span>
                  </div>
                  <div class="w-full h-2 rounded-full bg-[#0B0C0D] overflow-hidden">
                    <div class="waterfall-segment-bar h-full bg-[#F2EFE8]/70 w-[95%]"></div>
                  </div>
                </div>
              </div>

              <div class="mt-6 pt-4 border-t border-[rgba(242,239,232,0.1)] flex items-center justify-between text-[10px] font-mono text-[#A6A39C]">
                <span>Total Round-Trip: ~250.0ms</span>
                <span class="text-[#42D6A4]">UniLLM Overhead: &lt; 1.0ms</span>
              </div>
            </div>

            <!-- Right: Self-Drawing Latency Percentile Chart -->
            <div class="lg:col-span-5 p-6 rounded-2xl bg-[#141615] border border-[rgba(242,239,232,0.14)] flex flex-col justify-between">
              
              <div>
                <div class="flex items-center justify-between pb-3 border-b border-[rgba(242,239,232,0.1)] mb-4">
                  <span class="font-mono text-xs font-bold text-[#F2EFE8]">P50 - P99 Latency Distribution</span>
                  <span class="text-[10px] font-mono text-[#42D6A4]">BENCHMARK DATA</span>
                </div>

                <!-- SVG Percentile Curve Canvas -->
                <div class="relative w-full h-44 flex items-center justify-center">
                  <svg class="w-full h-full" viewBox="0 0 320 140" fill="none">
                    <!-- Grid Lines -->
                    <line x1="20" y1="20" x2="300" y2="20" stroke="rgba(242,239,232,0.06)" stroke-dasharray="3 3"/>
                    <line x1="20" y1="60" x2="300" y2="60" stroke="rgba(242,239,232,0.06)" stroke-dasharray="3 3"/>
                    <line x1="20" y1="100" x2="300" y2="100" stroke="rgba(242,239,232,0.06)" stroke-dasharray="3 3"/>

                    <!-- Smooth Latency Curve -->
                    <path
                      id="latency-svg-curve"
                      d="M 20,110 C 80,105 140,95 200,75 C 240,60 270,35 300,25"
                      stroke="#42D6A4"
                      stroke-width="3"
                      fill="none"
                      class="latency-curve-draw"
                    />

                    <!-- Markers -->
                    <circle cx="80" cy="105" r="4" fill="#42D6A4"/>
                    <circle cx="200" cy="75" r="4" fill="#42D6A4"/>
                    <circle cx="300" cy="25" r="4" fill="#FF7849"/>
                  </svg>
                </div>

                <div class="grid grid-cols-4 gap-2 font-mono text-[11px] text-center pt-3 border-t border-[rgba(242,239,232,0.08)]">
                  <div>
                    <span class="text-[#A6A39C] block text-[9px]">P50</span>
                    <span class="text-[#F2EFE8] font-bold">28ms</span>
                  </div>
                  <div>
                    <span class="text-[#A6A39C] block text-[9px]">P90</span>
                    <span class="text-[#F2EFE8] font-bold">38ms</span>
                  </div>
                  <div>
                    <span class="text-[#A6A39C] block text-[9px]">P95</span>
                    <span class="text-[#42D6A4] font-bold">42ms</span>
                  </div>
                  <div>
                    <span class="text-[#A6A39C] block text-[9px]">P99</span>
                    <span class="text-[#FF7849] font-bold">64ms</span>
                  </div>
                </div>
              </div>

              <div class="mt-4 pt-3 border-t border-[rgba(242,239,232,0.08)] text-[9px] font-mono text-[#A6A39C] text-center">
                * Simulated benchmark telemetry under synthetic 500 rps load
              </div>

            </div>

          </div>

        </div>
      </section>

      <!-- =========================================================================
           SECTION 7 — DEVELOPER EXPERIENCE: INTERACTIVE CODE TERMINAL
           ========================================================================= -->
      <section id="developer-section" class="relative py-28 border-b border-[rgba(242,239,232,0.14)] overflow-hidden reveal-on-scroll">
        <div class="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          
          <div class="max-w-3xl mb-12">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141615] border border-[rgba(242,239,232,0.14)] text-[10px] font-mono text-[#42D6A4] uppercase tracking-wider mb-4">
              <span>DEVELOPER EXPERIENCE</span>
            </div>
            <h2 class="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[#F2EFE8] leading-tight">
              Keep your integration straightforward.
            </h2>
            <p class="text-[#A6A39C] text-base sm:text-lg mt-4 leading-relaxed">
              Drop UniLLM into your existing OpenAI SDK codebase. Swap your base URL, keep your client patterns, and access every supported model immediately.
            </p>
          </div>

          <!-- Developer Code Terminal -->
          <div class="rounded-2xl bg-[#141615] border border-[rgba(242,239,232,0.14)] overflow-hidden max-w-4xl shadow-2xl">
            
            <!-- Terminal Titlebar -->
            <div class="flex items-center justify-between px-4 py-3 bg-[#0B0C0D] border-b border-[rgba(242,239,232,0.1)]">
              <div class="flex items-center gap-2">
                <span class="w-3 h-3 rounded-full bg-[#FF7849]/60"></span>
                <span class="w-3 h-3 rounded-full bg-yellow-500/60"></span>
                <span class="w-3 h-3 rounded-full bg-[#42D6A4]/60"></span>
                <span id="editor-endpoint-label" class="font-mono text-xs text-[#A6A39C] ml-2 font-medium">POST /v1/chat/completions</span>
              </div>

              <!-- Language Selectors & Copy Button -->
              <div class="flex items-center gap-2">
                <div class="flex items-center bg-[#141615] rounded-lg p-0.5 border border-[rgba(242,239,232,0.1)]">
                  <button data-lang="curl" class="code-tab-btn active px-3.5 py-1.5 rounded-md text-xs font-mono bg-[#FF7849] text-[#0B0C0D] font-bold transition-all cursor-pointer">
                    cURL
                  </button>
                  <button data-lang="nodejs" class="code-tab-btn px-3.5 py-1.5 rounded-md text-xs font-mono text-[#A6A39C] hover:text-white transition-all cursor-pointer">
                    Node.js
                  </button>
                  <button data-lang="python" class="code-tab-btn px-3.5 py-1.5 rounded-md text-xs font-mono text-[#A6A39C] hover:text-white transition-all cursor-pointer">
                    Python
                  </button>
                </div>

                <button id="copy-code-btn" class="px-3 py-1.5 rounded-lg border border-[rgba(242,239,232,0.14)] text-xs font-mono text-[#A6A39C] hover:text-white hover:border-[#42D6A4] transition-all flex items-center gap-1.5 cursor-pointer">
                  <span>Copy</span>
                </button>
              </div>
            </div>

            <!-- Code Content Pane with Line Numbers -->
            <div class="p-6 font-mono text-xs overflow-x-auto flex gap-4">
              <div class="text-[#A6A39C]/40 select-none text-right">
                1<br/>2<br/>3<br/>4<br/>5<br/>6<br/>7<br/>8
              </div>
              <pre class="flex-1 text-[#F2EFE8] leading-relaxed" id="editor-code-snippet"><code><span class="text-[#FF7849] font-bold">curl</span> https://api.unillm.com/v1/chat/completions \\
  -H <span class="text-[#A6A39C]">"Authorization: Bearer YOUR_API_KEY"</span> \\
  -H <span class="text-[#A6A39C]">"Content-Type: application/json"</span> \\
  -d '{
    <span class="text-[#A6A39C]">"model"</span>: <span class="text-[#42D6A4]">"gemini-3.6-flash"</span>,
    <span class="text-[#A6A39C]">"messages"</span>: [{"role": "user", "content": "Explain quantum computing simply."}],
    <span class="text-[#A6A39C]">"temperature"</span>: 0.2
  }'</code></pre>
            </div>

            <!-- Terminal Footer Status Bar -->
            <div class="px-6 py-2.5 bg-[#0B0C0D] border-t border-[rgba(242,239,232,0.08)] flex items-center justify-between font-mono text-[10px] text-[#A6A39C]">
              <span>PROTOCOL: HTTP/2 • OPENAI COMPATIBLE</span>
              <span class="text-[#42D6A4]">0 CODE REFACTOR REQUIRED</span>
            </div>

          </div>

        </div>
      </section>

      <!-- =========================================================================
           SECTION 8 — BUILT FOR A CLEARER AI WORKFLOW: CAPABILITIES
           ========================================================================= -->
      <section id="workflow-section" class="relative py-28 border-b border-[rgba(242,239,232,0.14)] overflow-hidden reveal-on-scroll">
        <div class="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          
          <div class="max-w-3xl mb-16">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141615] border border-[rgba(242,239,232,0.14)] text-[10px] font-mono text-[#FF7849] uppercase tracking-wider mb-4">
              <span>CORE CAPABILITIES</span>
            </div>
            <h2 class="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[#F2EFE8] leading-tight">
              Less integration sprawl. More operational clarity.
            </h2>
            <p class="text-[#A6A39C] text-base sm:text-lg mt-4 leading-relaxed">
              Designed for engineering teams who need multi-model flexibility without managing disparate credentials, fragile fallback scripts, and opaque invoices.
            </p>
          </div>

          <!-- Asymmetric Capability Deep-Dives -->
          <div class="space-y-12">
            
            <!-- Capability 1 -->
            <div class="p-8 sm:p-10 rounded-2xl bg-[#141615] border border-[rgba(242,239,232,0.14)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div class="lg:col-span-6 flex flex-col gap-4 text-left">
                <span class="text-[10px] font-mono text-[#42D6A4] uppercase tracking-widest">CAPABILITY 01 // ACCESS CONTROL</span>
                <h3 class="text-2xl font-bold text-[#F2EFE8]">Key Management & Workspace Isolation</h3>
                <p class="text-sm text-[#A6A39C] leading-relaxed">
                  Generate virtual API keys with enforced monthly budgets, model whitelists, and per-environment rate limits. Rotate credentials cleanly without redeploying microservices.
                </p>
                <div class="flex items-center gap-4 text-xs font-mono text-[#A6A39C] pt-2">
                  <span>✓ Monthly Spend Hard Caps</span>
                  <span>✓ Workspace Segregation</span>
                </div>
              </div>
              <div class="lg:col-span-6 p-6 rounded-xl bg-[#0B0C0D] border border-[rgba(242,239,232,0.1)] font-mono text-xs">
                <div class="flex items-center justify-between text-[#A6A39C] mb-3 pb-2 border-b border-[rgba(242,239,232,0.08)]">
                  <span>KEY IDENTIFIER</span>
                  <span>STATUS</span>
                </div>
                <div class="space-y-2">
                  <div class="flex items-center justify-between p-2 rounded bg-[#141615]">
                    <span class="text-[#F2EFE8]">unillm-prod-gateway-8x</span>
                    <span class="text-[#42D6A4] font-bold">Active • $2,500 Cap</span>
                  </div>
                  <div class="flex items-center justify-between p-2 rounded bg-[#141615]">
                    <span class="text-[#F2EFE8]">unillm-staging-eval-2b</span>
                    <span class="text-[#42D6A4] font-bold">Active • $250 Cap</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Capability 2 -->
            <div class="p-8 sm:p-10 rounded-2xl bg-[#141615] border border-[rgba(242,239,232,0.14)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div class="lg:col-span-6 p-6 rounded-xl bg-[#0B0C0D] border border-[rgba(242,239,232,0.1)] font-mono text-xs order-2 lg:order-1">
                <div class="flex items-center justify-between text-[#A6A39C] mb-3 pb-2 border-b border-[rgba(242,239,232,0.08)]">
                  <span>CIRCUIT STATE</span>
                  <span>HEALTH</span>
                </div>
                <div class="space-y-2">
                  <div class="flex items-center justify-between p-2 rounded bg-[#141615]">
                    <span class="text-[#F2EFE8]">Google DeepMind Primary</span>
                    <span class="text-[#42D6A4]">Closed (Healthy)</span>
                  </div>
                  <div class="flex items-center justify-between p-2 rounded bg-[#141615]">
                    <span class="text-[#F2EFE8]">Anthropic Bedrock Standby</span>
                    <span class="text-[#FF7849]">Armed (0ms Hop)</span>
                  </div>
                </div>
              </div>
              <div class="lg:col-span-6 flex flex-col gap-4 text-left order-1 lg:order-2">
                <span class="text-[10px] font-mono text-[#FF7849] uppercase tracking-widest">CAPABILITY 02 // RELIABILITY</span>
                <h3 class="text-2xl font-bold text-[#F2EFE8]">Intelligent Fallbacks & Circuit Breaking</h3>
                <p class="text-sm text-[#A6A39C] leading-relaxed">
                  Prevent cascading provider outages. When upstream endpoints encounter rate limits or 5xx server errors, UniLLM automatically reroutes traffic to configured healthy standbys with zero customer disruption.
                </p>
                <div class="flex items-center gap-4 text-xs font-mono text-[#A6A39C] pt-2">
                  <span>✓ 0ms Failover Penalty</span>
                  <span>✓ Configurable Circuit Thresholds</span>
                </div>
              </div>
            </div>

            <!-- Capability 3 -->
            <div class="p-8 sm:p-10 rounded-2xl bg-[#141615] border border-[rgba(242,239,232,0.14)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div class="lg:col-span-6 flex flex-col gap-4 text-left">
                <span class="text-[10px] font-mono text-[#42D6A4] uppercase tracking-widest">CAPABILITY 03 // GOVERNANCE</span>
                <h3 class="text-2xl font-bold text-[#F2EFE8]">Enterprise Auditing & Cost Accounting</h3>
                <p class="text-sm text-[#A6A39C] leading-relaxed">
                  Eliminate billing surprises. Real-time token aggregation maps expenditures to specific departments, engineers, and applications before monthly provider reconciliation.
                </p>
                <div class="flex items-center gap-4 text-xs font-mono text-[#A6A39C] pt-2">
                  <span>✓ SOC2 Type II Aligned</span>
                  <span>✓ Exportable CSV / JSON Traces</span>
                </div>
              </div>
              <div class="lg:col-span-6 p-6 rounded-xl bg-[#0B0C0D] border border-[rgba(242,239,232,0.1)] font-mono text-xs">
                <div class="flex items-center justify-between text-[#A6A39C] mb-3 pb-2 border-b border-[rgba(242,239,232,0.08)]">
                  <span>WORKSPACE</span>
                  <span>CONSUMPTION</span>
                </div>
                <div class="space-y-2">
                  <div class="flex items-center justify-between p-2 rounded bg-[#141615]">
                    <span class="text-[#F2EFE8]">Production Agent Fleet</span>
                    <span class="text-[#42D6A4] font-bold">18.4M Tokens ($14.20)</span>
                  </div>
                  <div class="flex items-center justify-between p-2 rounded bg-[#141615]">
                    <span class="text-[#F2EFE8]">Internal Research Cluster</span>
                    <span class="text-[#FF7849] font-bold">8.1M Tokens ($6.45)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      <!-- =========================================================================
           SECTION 9 — FAQ: QUESTIONS BEFORE YOU CONNECT
           ========================================================================= -->
      <section id="faq-section" class="relative py-28 border-b border-[rgba(242,239,232,0.14)] overflow-hidden reveal-on-scroll">
        <div class="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          
          <div class="max-w-3xl mb-12">
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#141615] border border-[rgba(242,239,232,0.14)] text-[10px] font-mono text-[#A6A39C] uppercase tracking-wider mb-4">
              <span>FREQUENTLY ASKED QUESTIONS</span>
            </div>
            <h2 class="text-3xl sm:text-5xl font-extrabold tracking-[-0.03em] text-[#F2EFE8] leading-tight">
              Questions before you connect?
            </h2>
            <p class="text-[#A6A39C] text-base sm:text-lg mt-4 leading-relaxed">
              Clear answers regarding integration, latency overhead, pricing, and architecture.
            </p>
          </div>

          <!-- Accessible Accordion List -->
          <div class="max-w-3xl space-y-4">
            
            <div class="landing-faq-item rounded-xl bg-[#141615] border border-[rgba(242,239,232,0.14)] overflow-hidden">
              <button class="landing-faq-trigger w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base text-[#F2EFE8] hover:text-[#42D6A4] transition-colors cursor-pointer" aria-expanded="false">
                <span>How much latency does the UniLLM gateway introduce?</span>
                <span class="faq-chevron text-[#A6A39C] transition-transform duration-200">↓</span>
              </button>
              <div class="landing-faq-content hidden px-6 pb-6 text-sm text-[#A6A39C] leading-relaxed border-t border-[rgba(242,239,232,0.08)] pt-4">
                UniLLM adds less than 0.9ms of gateway overhead. Ingress TLS termination, API key validation, and routing policies execute directly in compiled native memory buffers before forwarding the connection.
              </div>
            </div>

            <div class="landing-faq-item rounded-xl bg-[#141615] border border-[rgba(242,239,232,0.14)] overflow-hidden">
              <button class="landing-faq-trigger w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base text-[#F2EFE8] hover:text-[#42D6A4] transition-colors cursor-pointer" aria-expanded="false">
                <span>Do I need to rewrite my application code to use UniLLM?</span>
                <span class="faq-chevron text-[#A6A39C] transition-transform duration-200">↓</span>
              </button>
              <div class="landing-faq-content hidden px-6 pb-6 text-sm text-[#A6A39C] leading-relaxed border-t border-[rgba(242,239,232,0.08)] pt-4">
                No. UniLLM is strictly compliant with the OpenAI v1 REST specification. You only change the <code class="text-[#42D6A4]">baseURL</code> and pass your UniLLM API key. All existing SDK client patterns, parameters, and streaming formats work unchanged.
              </div>
            </div>

            <div class="landing-faq-item rounded-xl bg-[#141615] border border-[rgba(242,239,232,0.14)] overflow-hidden">
              <button class="landing-faq-trigger w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base text-[#F2EFE8] hover:text-[#42D6A4] transition-colors cursor-pointer" aria-expanded="false">
                <span>Does UniLLM store or train on prompt data?</span>
                <span class="faq-chevron text-[#A6A39C] transition-transform duration-200">↓</span>
              </button>
              <div class="landing-faq-content hidden px-6 pb-6 text-sm text-[#A6A39C] leading-relaxed border-t border-[rgba(242,239,232,0.08)] pt-4">
                Never. Prompts are streamed through memory and dispatched directly to provider endpoints without persistent storage unless explicit audit payload caching is enabled in workspace security settings.
              </div>
            </div>

            <div class="landing-faq-item rounded-xl bg-[#141615] border border-[rgba(242,239,232,0.14)] overflow-hidden">
              <button class="landing-faq-trigger w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-base text-[#F2EFE8] hover:text-[#42D6A4] transition-colors cursor-pointer" aria-expanded="false">
                <span>How does automatic fallback work during upstream outages?</span>
                <span class="faq-chevron text-[#A6A39C] transition-transform duration-200">↓</span>
              </button>
              <div class="landing-faq-content hidden px-6 pb-6 text-sm text-[#A6A39C] leading-relaxed border-t border-[rgba(242,239,232,0.08)] pt-4">
                You can configure circuit-breaker thresholds in your routing policy. When an upstream provider returns 5xx errors or exceeds your latency SLA, UniLLM instantly dispatches the request to your configured hot standby with zero downtime.
              </div>
            </div>

          </div>

        </div>
      </section>

      <!-- =========================================================================
           SECTION 10 — CLOSING CONVERGENCE CTA
           ========================================================================= -->
      <section id="closing-cta" class="relative py-28 overflow-hidden reveal-on-scroll">
        <div class="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10 text-center">
          
          <div class="max-w-3xl mx-auto flex flex-col items-center">
            
            <div class="w-16 h-16 rounded-2xl bg-[#141615] border border-[#42D6A4]/40 flex items-center justify-center text-[#42D6A4] mb-8 shadow-[0_0_40px_rgba(66,214,164,0.2)]">
              ${icons.logo("w-8 h-8")}
            </div>

            <h2 class="text-4xl sm:text-6xl font-extrabold tracking-[-0.03em] text-[#F2EFE8] leading-[1.08] mb-6">
              Bring your AI models behind one gateway.
            </h2>

            <p class="text-base sm:text-lg text-[#A6A39C] leading-relaxed max-w-xl mb-10">
              Start dispatching requests through a resilient, observable infrastructure layer in less than two minutes.
            </p>

            <div class="flex flex-col sm:flex-row items-center gap-4">
              <button
                class="get-api-key-cta px-8 py-4 rounded-lg font-bold text-xs text-[#0B0C0D] bg-[#FF7849] hover:bg-[#ff8a60] transition-all shadow-[0_4px_30px_rgba(255,120,73,0.35)] uppercase tracking-wider cursor-pointer"
              >
                Create Free Virtual Key
              </button>
              <a
                href="/docs"
                class="px-8 py-4 rounded-lg font-semibold text-xs text-[#F2EFE8] bg-[#141615] hover:bg-[#1E2220] border border-[rgba(242,239,232,0.14)] transition-all uppercase tracking-wider cursor-pointer"
              >
                View API Documentation
              </a>
            </div>

            <div class="flex items-center gap-6 text-xs font-mono text-[#A6A39C] mt-10">
              <span>✓ No credit card required</span>
              <span>✓ Instant setup</span>
              <span>✓ 99.99% SLA</span>
            </div>

          </div>

        </div>
      </section>

    </div>
  `;
}

export function bindLanding() {
  // 1. Mandatory Working CTA Navigation
  const handleGetStartedClick = (e) => {
    e.preventDefault();
    const user = apiService.getCurrentUser();
    if (user) {
      router.navigate("/app/api-keys?action=create");
    } else {
      sessionStorage.setItem("redirect_after_login", "/app/api-keys?action=create");
      router.navigate("/signup?redirect=/app/api-keys?action=create");
    }
  };

  document.querySelectorAll(".get-api-key-cta").forEach(btn => {
    btn.addEventListener("click", handleGetStartedClick);
  });

  // 2. HERO: 3D Gateway Centerpiece Motion & Pointer Interaction
  const heroAnchor = document.getElementById("hero-gateway-anchor");
  const heroCore = document.getElementById("hero-gateway-core");
  const burstAnchor = document.getElementById("hero-burst-anchor");

  if (heroAnchor && heroCore) {
    heroAnchor.addEventListener("mousemove", (e) => {
      const rect = heroAnchor.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const rotY = (x / (rect.width / 2)) * 16;
      const rotX = -(y / (rect.height / 2)) * 14;
      heroCore.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    });

    heroAnchor.addEventListener("mouseleave", () => {
      heroCore.style.transform = "";
    });

    // Click Core: Trigger simulated request burst pulse
    heroCore.addEventListener("click", () => {
      if (burstAnchor) {
        const wave = document.createElement("div");
        wave.className = "hero-burst-wave";
        burstAnchor.appendChild(wave);
        setTimeout(() => {
          if (wave.parentNode) wave.parentNode.removeChild(wave);
          else if (wave.remove) wave.remove();
        }, 700);
      }

      // Briefly illuminate all 4 satellite nodes
      const satellites = document.querySelectorAll(".hero-satellite-node");
      satellites.forEach(node => node.classList.add("node-active"));
      setTimeout(() => {
        satellites.forEach(node => node.classList.remove("node-active"));
      }, 600);

      components.renderToast("info", "UniLLM Core Anycast: Request Burst Dispatched Across 4 Provider Nodes");
    });
  }

  // 3. LIVING SYSTEM PIPELINE (Section 3: Stages 1 to 7 Simulation)
  let currentStep = 1;
  let pipelineTimer = null;
  let isPipelinePaused = false;

  const stageData = {
    1: { name: "Application Ingress Request", desc: "Client application issues OpenAI-spec HTTP call over mutual TLS.", latency: "0.02 ms", status: "VERIFIED 200", trace: "tr-unillm-7a8e" },
    2: { name: "Ingress Edge Anycast Hop", desc: "TLS 1.3 termination, HTTP/2 multiplexing, and header sanitization.", latency: "+0.18 ms", status: "TLS VERIFIED", trace: "hop-edge-01" },
    3: { name: "UniLLM Core Orchestration", desc: "Token payload inspection, context metadata framing, and tracing initialization.", latency: "+0.21 ms", status: "FRAMED", trace: "ctx-unillm-03" },
    4: { name: "Auth & Virtual Key Budgeting", desc: "Workspace quota check, tenant spend rate limiter, and permissions verification.", latency: "+0.24 ms", status: "AUTHORIZED", trace: "key-auth-ok" },
    5: { name: "Dynamic Policy Resolution", desc: "Policy engine evaluates latency table, cost ceilings, and provider circuit states.", latency: "+0.26 ms", status: "RULE_MATCH", trace: "pol-gemini-flash" },
    6: { name: "Upstream Model Dispatch", desc: "Direct secure pipe to Google DeepMind Gemini Flash upstream API.", latency: "+38.4 ms", status: "200 STREAMING", trace: "up-google-08" },
    7: { name: "Normalized Stream Return", desc: "Unified SSE token chunks delivered back to application with complete metrics trace.", latency: "Delivered", status: "STREAM_DONE", trace: "trace-complete" }
  };

  const updatePipelineStep = (step) => {
    currentStep = step;
    const cards = document.querySelectorAll(".pipeline-stage-card");
    cards.forEach(card => {
      const s = parseInt(card.getAttribute("data-step") || "1", 10);
      if (s === step) {
        card.classList.add("is-active-step");
      } else {
        card.classList.remove("is-active-step");
      }
    });

    const data = stageData[step] || stageData[1];
    const hudBadge = document.getElementById("hud-stage-badge");
    const hudName = document.getElementById("hud-stage-name");
    const hudDesc = document.getElementById("hud-stage-desc");
    const hudLatency = document.getElementById("hud-step-latency");
    const hudStatus = document.getElementById("hud-step-status");
    const hudTrace = document.getElementById("hud-step-trace");

    if (hudBadge) hudBadge.innerText = `STAGE 0${step} OF 07`;
    if (hudName) hudName.innerText = data.name;
    if (hudDesc) hudDesc.innerText = data.desc;
    if (hudLatency) hudLatency.innerText = data.latency;
    if (hudStatus) hudStatus.innerText = data.status;
    if (hudTrace) hudTrace.innerText = data.trace;
  };

  const startPipelineCycle = () => {
    if (pipelineTimer) clearInterval(pipelineTimer);
    pipelineTimer = setInterval(() => {
      if (!isPipelinePaused) {
        currentStep = (currentStep >= 7) ? 1 : currentStep + 1;
        updatePipelineStep(currentStep);
      }
    }, 1600);
  };

  // Stage card click jumping
  document.querySelectorAll(".pipeline-stage-card").forEach(card => {
    card.addEventListener("click", () => {
      const step = parseInt(card.getAttribute("data-step") || "1", 10);
      updatePipelineStep(step);
    });
  });

  const toggleBtn = document.getElementById("pipeline-toggle-btn");
  toggleBtn?.addEventListener("click", () => {
    isPipelinePaused = !isPipelinePaused;
    toggleBtn.innerText = isPipelinePaused ? "Resume Simulation" : "Pause Simulation";
  });

  const replayBtn = document.getElementById("pipeline-replay-btn");
  replayBtn?.addEventListener("click", () => {
    isPipelinePaused = false;
    if (toggleBtn) toggleBtn.innerText = "Pause Simulation";
    updatePipelineStep(1);
    components.renderToast("success", "Pipeline journey reset to Stage 01.");
  });

  startPipelineCycle();

  // 4. INTERACTIVE NETWORK ROUTING (Section 4)
  const routeButtons = document.querySelectorAll(".route-selector-btn");
  const policyDesc = document.getElementById("route-policy-desc");
  const policyRationale = document.getElementById("route-policy-rationale");
  const targetModel = document.getElementById("route-target-model");
  const latencyVal = document.getElementById("route-latency-val");
  const costVal = document.getElementById("route-cost-val");
  const simulateBurstBtn = document.getElementById("simulate-burst-btn");
  const resetRouteDemoBtn = document.getElementById("reset-route-demo-btn");

  const routePresets = {
    gemini: {
      policy: "Latency Optimizer (Default)",
      rationale: "Requests are routed to the upstream endpoint with the lowest rolling P95 Time-To-First-Token. If upstream latency degrades past 120ms, traffic seamlessly pivots to backup.",
      model: "Gemini 3.6 Flash",
      latency: "~42ms P95 TTFT",
      cost: "$0.075 / $0.30 per 1M",
      nodeId: "node-gemini",
      conduitId: "conduit-gemini"
    },
    openai: {
      policy: "Reasoning Flagship Evaluator",
      rationale: "Heuristic classifier inspects prompt depth and tool manifests, routing complex multi-step reasoning prompts directly to flagship frontier reasoning models.",
      model: "OpenAI GPT-4o",
      latency: "~94ms P95 TTFT",
      cost: "$2.50 / $10.00 per 1M",
      nodeId: "node-openai",
      conduitId: "conduit-openai"
    },
    standby: {
      policy: "Circuit-Breaker Autonomous Failover",
      rationale: "Monitors upstream HTTP status codes. On detection of 5xx errors or sudden rate exhaustion, requests automatically divert to hot standby without application retries.",
      model: "Claude 3.5 Sonnet (Hot Standby)",
      latency: "~54ms Failover Resolution",
      cost: "$3.00 / $15.00 per 1M",
      nodeId: "node-standby",
      conduitId: "conduit-standby"
    },
    cost: {
      policy: "Cost Ceiling Minimizer",
      rationale: "Optimizes for maximum throughput at the lowest dollar expenditure. Ideal for high-volume indexing, summarization, and offline bulk batch generation.",
      model: "DeepSeek / Llama 3 (Private Mesh)",
      latency: "~18ms Local Wire",
      cost: "$0.02 / $0.05 per 1M",
      nodeId: "node-cost",
      conduitId: "conduit-cost"
    }
  };

  const applyRouteSelection = (key) => {
    const preset = routePresets[key] || routePresets.gemini;

    // Update buttons
    routeButtons.forEach(btn => {
      const bKey = btn.getAttribute("data-route");
      if (bKey === key) {
        btn.className = "route-selector-btn active px-4 py-2 rounded-lg text-xs font-mono bg-[#FF7849] text-[#0B0C0D] font-bold transition-all cursor-pointer";
      } else {
        btn.className = "route-selector-btn px-4 py-2 rounded-lg text-xs font-mono bg-[#0B0C0D] text-[#A6A39C] border border-[rgba(242,239,232,0.14)] hover:text-white transition-all cursor-pointer";
      }
    });

    // Update Network Nodes & Conduits
    document.querySelectorAll(".routing-mesh-node").forEach(node => {
      node.classList.remove("is-targeted");
    });
    const targetEl = document.getElementById(preset.nodeId);
    if (targetEl) targetEl.classList.add("is-targeted");

    // Reset Conduits and illuminate active one
    ["conduit-gemini", "conduit-openai", "conduit-standby", "conduit-cost"].forEach(cid => {
      const el = document.getElementById(cid);
      if (el) {
        el.setAttribute("class", cid === preset.conduitId ? "routing-conduit-active" : "");
      }
    });

    // Update Telemetry Panel
    if (policyDesc) policyDesc.innerText = preset.policy;
    if (policyRationale) policyRationale.innerText = preset.rationale;
    if (targetModel) targetModel.innerText = preset.model;
    if (latencyVal) latencyVal.innerText = preset.latency;
    if (costVal) costVal.innerText = preset.cost;
  };

  routeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const key = btn.getAttribute("data-route") || "gemini";
      applyRouteSelection(key);
    });
  });

  // Clicking on satellite nodes directly
  document.querySelectorAll(".routing-mesh-node").forEach(node => {
    node.addEventListener("click", () => {
      const key = node.getAttribute("data-node") || "gemini";
      applyRouteSelection(key);
    });
  });

  // Simulate Burst Button
  simulateBurstBtn?.addEventListener("click", () => {
    const activeBtn = document.querySelector(".route-selector-btn.active");
    const key = activeBtn?.getAttribute("data-route") || "gemini";
    const preset = routePresets[key];
    components.renderToast("info", `Dispatched 5-request burst along [${preset.policy}] path`);
  });

  // Reset Route Demo Button
  resetRouteDemoBtn?.addEventListener("click", () => {
    applyRouteSelection("gemini");
    components.renderToast("success", "Routing simulation reset to Latency Optimizer.");
  });

  // Initial Route State
  applyRouteSelection("gemini");

  // 5. MODEL ECOSYSTEM MATRIX & INSPECTOR (Section 5)
  const models = apiService.getModels() || [];
  const modelCards = document.querySelectorAll(".model-matrix-card");
  const filterChips = document.querySelectorAll(".model-filter-chip");
  const searchInput = document.getElementById("model-search-input");

  const inspectName = document.getElementById("inspect-model-name");
  const inspectProvider = document.getElementById("inspect-model-provider");
  const inspectId = document.getElementById("inspect-model-id");
  const inspectContext = document.getElementById("inspect-model-context");
  const inspectPricing = document.getElementById("inspect-model-pricing");
  const inspectCode = document.getElementById("inspect-code-model");

  const selectModel = (id) => {
    const m = models.find(item => item.id === id) || models[0];
    if (!m) return;

    modelCards.forEach(c => {
      if (c.getAttribute("data-model-id") === id) {
        c.classList.add("is-selected");
      } else {
        c.classList.remove("is-selected");
      }
    });

    if (inspectName) inspectName.innerText = m.name;
    if (inspectProvider) inspectProvider.innerText = m.provider || "Gemini";
    if (inspectId) inspectId.innerText = m.id;
    if (inspectContext) inspectContext.innerText = m.contextLength || "1M tokens";
    if (inspectPricing) inspectPricing.innerText = `$${m.inputCost?.toFixed(3) || '0.075'} / $${m.outputCost?.toFixed(2) || '0.30'} per 1M`;
    if (inspectCode) inspectCode.innerText = m.id;
  };

  modelCards.forEach(card => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-model-id");
      if (id) selectModel(id);
    });
  });

  filterChips.forEach(chip => {
    chip.addEventListener("click", () => {
      filterChips.forEach(c => {
        c.className = "model-filter-chip px-3.5 py-1.5 rounded-lg text-xs font-mono bg-[#141615] text-[#A6A39C] border border-[rgba(242,239,232,0.14)] hover:text-white transition-all cursor-pointer";
      });
      chip.className = "model-filter-chip active px-3.5 py-1.5 rounded-lg text-xs font-mono bg-[#42D6A4] text-[#0B0C0D] font-bold transition-all cursor-pointer";

      const cat = chip.getAttribute("data-cat") || "all";
      modelCards.forEach(card => {
        const prov = card.getAttribute("data-provider") || "";
        if (cat === "all" || prov.toLowerCase().includes(cat.toLowerCase()) || (cat === "fast" && prov.includes("Gemini"))) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  searchInput?.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase().trim();
    modelCards.forEach(card => {
      const id = card.getAttribute("data-model-id")?.toLowerCase() || "";
      if (id.includes(query)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });

  // 6. OBSERVABILITY: Self-Drawing SVG Latency Curve on Scroll
  const latencyCurve = document.getElementById("latency-svg-curve");
  if (latencyCurve && typeof window !== "undefined" && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          latencyCurve.classList.add("is-drawn");
        }
      });
    }, { threshold: 0.3 });
    observer.observe(latencyCurve);
  } else if (latencyCurve) {
    latencyCurve.classList.add("is-drawn");
  }

  // 7. DEVELOPER EXPERIENCE: Code Tabs & Working Copy
  const codeTabs = document.querySelectorAll(".code-tab-btn");
  const codeSnippet = document.getElementById("editor-code-snippet");
  const endpointLabel = document.getElementById("editor-endpoint-label");
  const copyBtn = document.getElementById("copy-code-btn");

  const codeTemplates = {
    curl: `<span class="text-[#FF7849] font-bold">curl</span> https://api.unillm.com/v1/chat/completions \\
  -H <span class="text-[#A6A39C]">"Authorization: Bearer YOUR_API_KEY"</span> \\
  -H <span class="text-[#A6A39C]">"Content-Type: application/json"</span> \\
  -d '{
    <span class="text-[#A6A39C]">"model"</span>: <span class="text-[#42D6A4]">"gemini-3.6-flash"</span>,
    <span class="text-[#A6A39C]">"messages"</span>: [{"role": "user", "content": "Explain quantum computing simply."}],
    <span class="text-[#A6A39C]">"temperature"</span>: 0.2
  }'`,
    nodejs: `<span class="text-[#A6A39C] font-bold">import</span> OpenAI <span class="text-[#A6A39C] font-bold">from</span> <span class="text-[#42D6A4]">"openai"</span>;

<span class="text-[#A6A39C] font-bold">const</span> client = <span class="text-[#A6A39C] font-bold">new</span> OpenAI({
  baseURL: <span class="text-[#42D6A4]">"https://api.unillm.com/v1"</span>,
  apiKey: process.env.UNILLM_API_KEY
});

<span class="text-[#A6A39C] font-bold">const</span> completion = <span class="text-[#A6A39C] font-bold">await</span> client.chat.completions.create({
  model: <span class="text-[#42D6A4]">"gemini-3.6-flash"</span>,
  messages: [{ role: <span class="text-[#A6A39C]">"user"</span>, content: <span class="text-[#F2EFE8]">"Explain quantum computing simply."</span> }]
});`,
    python: `<span class="text-[#A6A39C] font-bold">from</span> openai <span class="text-[#A6A39C] font-bold">import</span> OpenAI
<span class="text-[#A6A39C] font-bold">import</span> os

client = OpenAI(
    base_url=<span class="text-[#42D6A4]">"https://api.unillm.com/v1"</span>,
    api_key=os.environ.get(<span class="text-[#42D6A4]">"UNILLM_API_KEY"</span>)
)

completion = client.chat.completions.create(
    model=<span class="text-[#42D6A4]">"gemini-3.6-flash"</span>,
    messages=[{<span class="text-[#A6A39C]">"role"</span>: <span class="text-[#A6A39C]">"user"</span>, <span class="text-[#A6A39C]">"content"</span>: <span class="text-[#F2EFE8]">"Explain quantum computing simply."</span>}]
)`
  };

  codeTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      codeTabs.forEach(t => {
        t.className = "code-tab-btn px-3.5 py-1.5 rounded-md text-xs font-mono text-[#A6A39C] hover:text-white transition-all cursor-pointer";
      });
      tab.className = "code-tab-btn active px-3.5 py-1.5 rounded-md text-xs font-mono bg-[#FF7849] text-[#0B0C0D] font-bold transition-all cursor-pointer";

      const lang = tab.getAttribute("data-lang") || "curl";
      if (codeSnippet && codeTemplates[lang]) {
        codeSnippet.innerHTML = `<code>${codeTemplates[lang]}</code>`;
      }
      if (endpointLabel) {
        if (lang === "curl") endpointLabel.innerText = "POST /v1/chat/completions";
        else if (lang === "nodejs") endpointLabel.innerText = "JavaScript OpenAI SDK";
        else if (lang === "python") endpointLabel.innerText = "Python OpenAI SDK";
      }
    });
  });

  copyBtn?.addEventListener("click", () => {
    const activeTab = document.querySelector(".code-tab-btn.active")?.getAttribute("data-lang") || "curl";
    let text = "";
    if (activeTab === "curl") {
      text = `curl https://api.unillm.com/v1/chat/completions \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{\n    "model": "gemini-3.6-flash",\n    "messages": [{"role": "user", "content": "Explain quantum computing simply."}],\n    "temperature": 0.2\n  }'`;
    } else if (activeTab === "nodejs") {
      text = `import OpenAI from "openai";\n\nconst client = new OpenAI({\n  baseURL: "https://api.unillm.com/v1",\n  apiKey: process.env.UNILLM_API_KEY\n});\n\nconst completion = await client.chat.completions.create({\n  model: "gemini-3.6-flash",\n  messages: [{ role: "user", content: "Explain quantum computing simply." }]\n});`;
    } else if (activeTab === "python") {
      text = `from openai import OpenAI\nimport os\n\nclient = OpenAI(\n    base_url="https://api.unillm.com/v1",\n    api_key=os.environ.get("UNILLM_API_KEY")\n)\n\ncompletion = client.chat.completions.create(\n    model="gemini-3.6-flash",\n    messages=[{"role": "user", "content": "Explain quantum computing simply."}]\n)`;
    }

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
    }
    copyBtn.innerText = "Copied ✓";
    copyBtn.classList.add("text-[#42D6A4]", "border-[#42D6A4]");
    setTimeout(() => {
      copyBtn.innerText = "Copy";
      copyBtn.classList.remove("text-[#42D6A4]", "border-[#42D6A4]");
    }, 2000);
    components.renderToast("success", "Integration snippet copied to clipboard.");
  });

  // 8. ACCESSIBLE FAQ ACCORDION (Section 9)
  const faqTriggers = document.querySelectorAll(".landing-faq-trigger");
  faqTriggers.forEach(trigger => {
    trigger.addEventListener("click", () => {
      const parent = trigger.closest(".landing-faq-item");
      const content = parent?.querySelector(".landing-faq-content");
      const chevron = trigger.querySelector(".faq-chevron");
      
      if (content) {
        const isHidden = content.classList.contains("hidden");
        document.querySelectorAll(".landing-faq-content").forEach(c => c.classList.add("hidden"));
        document.querySelectorAll(".landing-faq-trigger").forEach(t => t.setAttribute("aria-expanded", "false"));
        document.querySelectorAll(".faq-chevron").forEach(ch => ch.classList.remove("rotate-180"));
        
        if (isHidden) {
          content.classList.remove("hidden");
          trigger.setAttribute("aria-expanded", "true");
          chevron?.classList.add("rotate-180");
        }
      }
    });
  });

  // 9. SCROLL REVEALS & DYNAMIC SECTION HIGHLIGHTING
  const scrollElements = document.querySelectorAll(".reveal-on-scroll");
  if (typeof window !== "undefined" && "IntersectionObserver" in window) {
    // 9a. Reveal entry animation
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    // 9b. Active Section Spotlight when user scrolls through each feature
    const focusObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("section-focused");
        } else {
          entry.target.classList.remove("section-focused");
        }
      });
    }, { threshold: 0.25, rootMargin: "-10% 0px -20% 0px" });

    scrollElements.forEach(el => {
      // Inject ambient glow backdrop for spotlighting if not present
      if (!el.querySelector(".active-section-glow")) {
        const glow = document.createElement("div");
        glow.className = "active-section-glow";
        el.prepend(glow);
      }
      revealObserver.observe(el);
      focusObserver.observe(el);
    });
  } else {
    scrollElements.forEach(el => el.classList.add("is-revealed"));
  }

  // 10. VISIBILITY MANAGEMENT (Pause background timers when tab hidden)
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (pipelineTimer) clearInterval(pipelineTimer);
    } else {
      startPipelineCycle();
    }
  });
}

export default {
  landing,
  bindLanding
};
