// DOCS PAGE: docsApi - Complete API Reference & Interactive Endpoint Console
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function docsApi() {
  return `
    <div class="flex flex-col gap-12 font-sans select-text pb-20 animate-fade-in-up text-white max-w-6xl">
      
      <!-- HEADER -->
      <div class="flex flex-col gap-4 border-b border-[#292D34] pb-8">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#101216] border border-[#292D34] text-white text-[11px] font-mono font-bold tracking-wide self-start">
          <span class="w-2 h-2 rounded-full bg-white animate-pulse"></span>
          OPENAI COMPATIBLE REST API v1
        </div>
        <h1 class="font-sans font-bold text-3xl md:text-5xl text-white tracking-tight uppercase">
          API Reference Console
        </h1>
        <p class="text-sm md:text-base text-[#A1A5AD] leading-relaxed max-w-3xl">
          Complete REST endpoint specifications, payload schemas, custom gateway routing headers, and real-time response objects for all UniLLM operations.
        </p>
      </div>

      <!-- ENDPOINT 1: CHAT COMPLETIONS -->
      <section id="chat-completions" class="flex flex-col gap-6 scroll-mt-24">
        <div class="flex items-center justify-between flex-wrap gap-4 border-b border-[#292D34] pb-4">
          <div class="flex items-center gap-3">
            <span class="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono font-bold text-xs">POST</span>
            <h2 class="font-mono font-bold text-lg md:text-xl text-white">/api/v1/chat/completions</h2>
          </div>
          <span class="text-xs text-[#A1A5AD] font-mono">Content-Type: application/json</span>
        </div>

        <p class="text-xs md:text-sm text-[#A1A5AD] leading-relaxed">
          Generates a model completion for the given chat conversation. Supports all standard OpenAI request fields as well as custom <code class="text-white font-mono font-bold">x-unillm-*</code> control headers for routing and caching.
        </p>

        <!-- Request Headers Table -->
        <div class="flex flex-col gap-3">
          <h3 class="font-bold text-xs text-white uppercase tracking-wider font-mono">Custom Gateway Headers</h3>
          <div class="overflow-x-auto rounded-xl border border-[#292D34] bg-[#101216] shadow-sm">
            <table class="w-full text-left text-xs">
              <thead class="bg-[#15181D] border-b border-[#292D34] text-[#A1A5AD] uppercase text-[10px] tracking-wider font-mono">
                <tr>
                  <th class="p-3.5">Header Name</th>
                  <th class="p-3.5">Type</th>
                  <th class="p-3.5">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#292D34] text-[11px] text-[#A1A5AD]">
                <tr>
                  <td class="p-3.5 font-mono text-white font-bold">x-unillm-routing-strategy</td>
                  <td class="p-3.5 font-mono text-[#A1A5AD]">string</td>
                  <td class="p-3.5"><code class="font-mono text-[10px] bg-[#15181D] border border-[#292D34] px-1 py-0.5 rounded text-white">lowest-cost</code> | <code class="font-mono text-[10px] bg-[#15181D] border border-[#292D34] px-1 py-0.5 rounded text-white">lowest-latency</code> | <code class="font-mono text-[10px] bg-[#15181D] border border-[#292D34] px-1 py-0.5 rounded text-white">high-reliability</code></td>
                </tr>
                <tr>
                  <td class="p-3.5 font-mono text-white font-bold">x-unillm-fallback-model</td>
                  <td class="p-3.5 font-mono text-[#A1A5AD]">string</td>
                  <td class="p-3.5">Backup model identifier (e.g. <code class="font-mono text-[10px] text-white">gemini-3.6-flash</code>) if the primary model returns an error.</td>
                </tr>
                <tr>
                  <td class="p-3.5 font-mono text-white font-bold">x-unillm-cache-ttl</td>
                  <td class="p-3.5 font-mono text-[#A1A5AD]">integer</td>
                  <td class="p-3.5">Cache duration in seconds (e.g. <code class="font-mono text-[10px] text-white">3600</code>). Set to <code class="font-mono text-[10px] text-white">0</code> to bypass.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Request Body JSON & Response Schema -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Request Body -->
          <div class="flex flex-col gap-2">
            <span class="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between font-mono">
              Request Body (JSON)
              <span class="text-[10px] font-mono text-[#A1A5AD] font-normal">Standard OpenAI Schema</span>
            </span>
            <div class="rounded-xl border border-[#292D34] bg-[#08090B] p-4 text-xs font-mono text-[#A1A5AD] overflow-x-auto shadow-sm">
              <pre><code>{
  <span class="text-white">"model"</span>: <span class="text-emerald-400">"gemini-3.6-flash"</span>,
  <span class="text-white">"messages"</span>: [
    {
      <span class="text-white">"role"</span>: <span class="text-emerald-400">"system"</span>,
      <span class="text-white">"content"</span>: <span class="text-emerald-400">"You are a helpful AI assistant."</span>
    },
    {
      <span class="text-white">"role"</span>: <span class="text-emerald-400">"user"</span>,
      <span class="text-white">"content"</span>: <span class="text-emerald-400">"Summarize this technical article."</span>
    }
  ],
  <span class="text-white">"temperature"</span>: <span class="text-amber-400">0.7</span>,
  <span class="text-white">"max_tokens"</span>: <span class="text-amber-400">1000</span>,
  <span class="text-white">"stream"</span>: <span class="text-purple-400">false</span>
}</code></pre>
            </div>
          </div>

          <!-- Response Body -->
          <div class="flex flex-col gap-2">
            <span class="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between font-mono">
              Response Body (200 OK)
              <span class="text-[10px] font-mono text-emerald-400 font-bold">Gateway Augmented</span>
            </span>
            <div class="rounded-xl border border-[#292D34] bg-[#08090B] p-4 text-xs font-mono text-[#A1A5AD] overflow-x-auto shadow-sm">
              <pre><code>{
  <span class="text-white">"id"</span>: <span class="text-emerald-400">"chatcmpl-unillm-8f921ab4"</span>,
  <span class="text-white">"object"</span>: <span class="text-emerald-400">"chat.completion"</span>,
  <span class="text-white">"created"</span>: <span class="text-amber-400">1718902800</span>,
  <span class="text-white">"model"</span>: <span class="text-emerald-400">"gemini-3.6-flash"</span>,
  <span class="text-white">"choices"</span>: [
    {
      <span class="text-white">"index"</span>: <span class="text-amber-400">0</span>,
      <span class="text-white">"message"</span>: {
        <span class="text-white">"role"</span>: <span class="text-emerald-400">"assistant"</span>,
        <span class="text-white">"content"</span>: <span class="text-emerald-400">"Here is the concise summary..."</span>
      },
      <span class="text-white">"finish_reason"</span>: <span class="text-emerald-400">"stop"</span>
    }
  ],
  <span class="text-white">"usage"</span>: {
    <span class="text-white">"prompt_tokens"</span>: <span class="text-amber-400">42</span>,
    <span class="text-white">"completion_tokens"</span>: <span class="text-amber-400">128</span>,
    <span class="text-white">"total_tokens"</span>: <span class="text-amber-400">170</span>
  },
  <span class="text-white">"unillm_telemetry"</span>: {
    <span class="text-white">"cache"</span>: <span class="text-emerald-400">"HIT"</span>,
    <span class="text-white">"provider"</span>: <span class="text-white">"gemini"</span>,
    <span class="text-white">"latencyMs"</span>: <span class="text-emerald-400">19</span>,
    <span class="text-white">"costUsd"</span>: <span class="text-white">0.000045</span>,
    <span class="text-white">"fallbackTriggered"</span>: <span class="text-purple-400">false</span>
  }
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- ENDPOINT 2: MODELS LIST -->
      <section id="models-list" class="flex flex-col gap-6 scroll-mt-24">
        <div class="flex items-center justify-between flex-wrap gap-4 border-b border-[#292D34] pb-4">
          <div class="flex items-center gap-3">
            <span class="px-2.5 py-1 rounded-md bg-white/15 border border-white/30 text-white font-mono font-bold text-xs">GET</span>
            <h2 class="font-mono font-bold text-lg md:text-xl text-white">/api/v1/models</h2>
          </div>
          <span class="text-xs text-[#A1A5AD] font-mono">Lists all available registered models</span>
        </div>

        <p class="text-xs md:text-sm text-[#A1A5AD] leading-relaxed">
          Returns an array of available LLM models currently configured and active within your UniLLM workspace.
        </p>

        <div class="rounded-xl border border-[#292D34] bg-[#08090B] p-4 text-xs font-mono text-[#A1A5AD] overflow-x-auto shadow-sm">
          <pre><code>{
  <span class="text-white">"object"</span>: <span class="text-emerald-400">"list"</span>,
  <span class="text-white">"data"</span>: [
    { <span class="text-white">"id"</span>: <span class="text-emerald-400">"gemini-3.6-flash"</span>, <span class="text-white">"object"</span>: <span class="text-emerald-400">"model"</span>, <span class="text-white">"owned_by"</span>: <span class="text-white">"google"</span>, <span class="text-white">"context_window"</span>: <span class="text-amber-400">1048576</span> },
    { <span class="text-white">"id"</span>: <span class="text-emerald-400">"gpt-4o"</span>, <span class="text-white">"object"</span>: <span class="text-emerald-400">"model"</span>, <span class="text-white">"owned_by"</span>: <span class="text-white">"openai"</span>, <span class="text-white">"context_window"</span>: <span class="text-amber-400">128000</span> },
    { <span class="text-white">"id"</span>: <span class="text-emerald-400">"claude-3-5-sonnet"</span>, <span class="text-white">"object"</span>: <span class="text-emerald-400">"model"</span>, <span class="text-white">"owned_by"</span>: <span class="text-white">"anthropic"</span>, <span class="text-white">"context_window"</span>: <span class="text-amber-400">200000</span> }
  ]
}</code></pre>
        </div>
      </section>

      <!-- ENDPOINT 3: EMBEDDINGS -->
      <section id="embeddings" class="flex flex-col gap-6 scroll-mt-24">
        <div class="flex items-center justify-between flex-wrap gap-4 border-b border-[#292D34] pb-4">
          <div class="flex items-center gap-3">
            <span class="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono font-bold text-xs">POST</span>
            <h2 class="font-mono font-bold text-lg md:text-xl text-white">/v1/embeddings</h2>
          </div>
          <span class="text-xs text-[#A1A5AD] font-mono">Vector Embedding Generation</span>
        </div>

        <p class="text-xs md:text-sm text-[#A1A5AD] leading-relaxed">
          Converts input strings into vector embeddings using standard models like <code class="font-mono text-white">text-embedding-3-small</code> or <code class="font-mono text-white">text-embedding-3-large</code>.
        </p>
      </section>

    </div>
  `;
}

export function bindDocsApi() {}

export default {
  docsApi,
  bindDocsApi
};
