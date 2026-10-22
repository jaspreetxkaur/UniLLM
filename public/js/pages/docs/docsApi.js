// DOCS PAGE: docsApi - Complete API Reference & Interactive Endpoint Console
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function docsApi() {
  return `
    <div class="flex flex-col gap-12 font-sans select-text pb-20 animate-fade-in-up text-white max-w-6xl">
      
      <!-- HEADER -->
      <div class="flex flex-col gap-4 border-b border-[#1F2438] pb-8">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10121A] border border-[#1F2438] text-[#38BDF8] text-[11px] font-mono font-bold tracking-wide self-start">
          <span class="w-2 h-2 rounded-full bg-[#38BDF8] animate-pulse"></span>
          OPENAI COMPATIBLE REST API v1
        </div>
        <h1 class="font-sans font-bold text-3xl md:text-5xl text-white tracking-tight uppercase">
          API Reference Console
        </h1>
        <p class="text-sm md:text-base text-[#8E98B0] leading-relaxed max-w-3xl">
          Complete REST endpoint specifications, payload schemas, custom gateway routing headers, and real-time response objects for all UniLLM operations.
        </p>
      </div>

      <!-- ENDPOINT 1: CHAT COMPLETIONS -->
      <section id="chat-completions" class="flex flex-col gap-6 scroll-mt-24">
        <div class="flex items-center justify-between flex-wrap gap-4 border-b border-[#1F2438] pb-4">
          <div class="flex items-center gap-3">
            <span class="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono font-bold text-xs">POST</span>
            <h2 class="font-mono font-bold text-lg md:text-xl text-white">/api/v1/chat/completions</h2>
          </div>
          <span class="text-xs text-[#8E98B0] font-mono">Content-Type: application/json</span>
        </div>

        <p class="text-xs md:text-sm text-[#8E98B0] leading-relaxed">
          Generates a model completion for the given chat conversation. Supports all standard OpenAI request fields as well as custom <code class="text-[#38BDF8] font-mono font-bold">x-unillm-*</code> control headers for routing and caching.
        </p>

        <!-- Request Headers Table -->
        <div class="flex flex-col gap-3">
          <h3 class="font-bold text-xs text-white uppercase tracking-wider font-mono">Custom Gateway Headers</h3>
          <div class="overflow-x-auto rounded-xl border border-[#1F2438] bg-[#10121A] shadow-sm">
            <table class="w-full text-left text-xs">
              <thead class="bg-[#161926] border-b border-[#1F2438] text-[#8E98B0] uppercase text-[10px] tracking-wider font-mono">
                <tr>
                  <th class="p-3.5">Header Name</th>
                  <th class="p-3.5">Type</th>
                  <th class="p-3.5">Description</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-[#1F2438] text-[11px] text-[#8E98B0]">
                <tr>
                  <td class="p-3.5 font-mono text-[#38BDF8] font-bold">x-unillm-routing-strategy</td>
                  <td class="p-3.5 font-mono text-[#8E98B0]">string</td>
                  <td class="p-3.5"><code class="font-mono text-[10px] bg-[#161926] border border-[#1F2438] px-1 py-0.5 rounded text-white">lowest-cost</code> | <code class="font-mono text-[10px] bg-[#161926] border border-[#1F2438] px-1 py-0.5 rounded text-white">lowest-latency</code> | <code class="font-mono text-[10px] bg-[#161926] border border-[#1F2438] px-1 py-0.5 rounded text-white">high-reliability</code></td>
                </tr>
                <tr>
                  <td class="p-3.5 font-mono text-[#38BDF8] font-bold">x-unillm-fallback-model</td>
                  <td class="p-3.5 font-mono text-[#8E98B0]">string</td>
                  <td class="p-3.5">Backup model identifier (e.g. <code class="font-mono text-[10px] text-white">gemini-3.6-flash</code>) if the primary model returns an error.</td>
                </tr>
                <tr>
                  <td class="p-3.5 font-mono text-[#38BDF8] font-bold">x-unillm-cache-ttl</td>
                  <td class="p-3.5 font-mono text-[#8E98B0]">integer</td>
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
              <span class="text-[10px] font-mono text-[#8E98B0] font-normal">Standard OpenAI Schema</span>
            </span>
            <div class="rounded-xl border border-[#1F2438] bg-[#07080B] p-4 text-xs font-mono text-[#8E98B0] overflow-x-auto shadow-sm">
              <pre><code>{
  <span class="text-[#38BDF8]">"model"</span>: <span class="text-emerald-400">"gemini-3.6-flash"</span>,
  <span class="text-[#38BDF8]">"messages"</span>: [
    {
      <span class="text-[#38BDF8]">"role"</span>: <span class="text-emerald-400">"system"</span>,
      <span class="text-[#38BDF8]">"content"</span>: <span class="text-emerald-400">"You are a helpful AI assistant."</span>
    },
    {
      <span class="text-[#38BDF8]">"role"</span>: <span class="text-emerald-400">"user"</span>,
      <span class="text-[#38BDF8]">"content"</span>: <span class="text-emerald-400">"Summarize this technical article."</span>
    }
  ],
  <span class="text-[#38BDF8]">"temperature"</span>: <span class="text-amber-400">0.7</span>,
  <span class="text-[#38BDF8]">"max_tokens"</span>: <span class="text-amber-400">1000</span>,
  <span class="text-[#38BDF8]">"stream"</span>: <span class="text-purple-400">false</span>
}</code></pre>
            </div>
          </div>

          <!-- Response Body -->
          <div class="flex flex-col gap-2">
            <span class="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between font-mono">
              Response Body (200 OK)
              <span class="text-[10px] font-mono text-emerald-400 font-bold">Gateway Augmented</span>
            </span>
            <div class="rounded-xl border border-[#1F2438] bg-[#07080B] p-4 text-xs font-mono text-[#8E98B0] overflow-x-auto shadow-sm">
              <pre><code>{
  <span class="text-[#38BDF8]">"id"</span>: <span class="text-emerald-400">"chatcmpl-unillm-8f921ab4"</span>,
  <span class="text-[#38BDF8]">"object"</span>: <span class="text-emerald-400">"chat.completion"</span>,
  <span class="text-[#38BDF8]">"created"</span>: <span class="text-amber-400">1718902800</span>,
  <span class="text-[#38BDF8]">"model"</span>: <span class="text-emerald-400">"gemini-3.6-flash"</span>,
  <span class="text-[#38BDF8]">"choices"</span>: [
    {
      <span class="text-[#38BDF8]">"index"</span>: <span class="text-amber-400">0</span>,
      <span class="text-[#38BDF8]">"message"</span>: {
        <span class="text-[#38BDF8]">"role"</span>: <span class="text-emerald-400">"assistant"</span>,
        <span class="text-[#38BDF8]">"content"</span>: <span class="text-emerald-400">"Here is the concise summary..."</span>
      },
      <span class="text-[#38BDF8]">"finish_reason"</span>: <span class="text-emerald-400">"stop"</span>
    }
  ],
  <span class="text-[#38BDF8]">"usage"</span>: {
    <span class="text-[#38BDF8]">"prompt_tokens"</span>: <span class="text-amber-400">42</span>,
    <span class="text-[#38BDF8]">"completion_tokens"</span>: <span class="text-amber-400">128</span>,
    <span class="text-[#38BDF8]">"total_tokens"</span>: <span class="text-amber-400">170</span>
  },
  <span class="text-[#38BDF8]">"unillm_telemetry"</span>: {
    <span class="text-[#38BDF8]">"cache"</span>: <span class="text-emerald-400">"HIT"</span>,
    <span class="text-[#38BDF8]">"provider"</span>: <span class="text-white">"gemini"</span>,
    <span class="text-[#38BDF8]">"latencyMs"</span>: <span class="text-emerald-400">19</span>,
    <span class="text-[#38BDF8]">"costUsd"</span>: <span class="text-white">0.000045</span>,
    <span class="text-[#38BDF8]">"fallbackTriggered"</span>: <span class="text-purple-400">false</span>
  }
}</code></pre>
            </div>
          </div>
        </div>
      </section>

      <!-- ENDPOINT 2: MODELS LIST -->
      <section id="models-list" class="flex flex-col gap-6 scroll-mt-24">
        <div class="flex items-center justify-between flex-wrap gap-4 border-b border-[#1F2438] pb-4">
          <div class="flex items-center gap-3">
            <span class="px-2.5 py-1 rounded-md bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-[#38BDF8] font-mono font-bold text-xs">GET</span>
            <h2 class="font-mono font-bold text-lg md:text-xl text-white">/api/v1/models</h2>
          </div>
          <span class="text-xs text-[#8E98B0] font-mono">Lists all available registered models</span>
        </div>

        <p class="text-xs md:text-sm text-[#8E98B0] leading-relaxed">
          Returns an array of available LLM models currently configured and active within your UniLLM workspace.
        </p>

        <div class="rounded-xl border border-[#1F2438] bg-[#07080B] p-4 text-xs font-mono text-[#8E98B0] overflow-x-auto shadow-sm">
          <pre><code>{
  <span class="text-[#38BDF8]">"object"</span>: <span class="text-emerald-400">"list"</span>,
  <span class="text-[#38BDF8]">"data"</span>: [
    { <span class="text-[#38BDF8]">"id"</span>: <span class="text-emerald-400">"gemini-3.6-flash"</span>, <span class="text-[#38BDF8]">"object"</span>: <span class="text-emerald-400">"model"</span>, <span class="text-[#38BDF8]">"owned_by"</span>: <span class="text-white">"google"</span>, <span class="text-[#38BDF8]">"context_window"</span>: <span class="text-amber-400">1048576</span> },
    { <span class="text-[#38BDF8]">"id"</span>: <span class="text-emerald-400">"gpt-4o"</span>, <span class="text-[#38BDF8]">"object"</span>: <span class="text-emerald-400">"model"</span>, <span class="text-[#38BDF8]">"owned_by"</span>: <span class="text-white">"openai"</span>, <span class="text-[#38BDF8]">"context_window"</span>: <span class="text-amber-400">128000</span> },
    { <span class="text-[#38BDF8]">"id"</span>: <span class="text-emerald-400">"claude-3-5-sonnet"</span>, <span class="text-[#38BDF8]">"object"</span>: <span class="text-emerald-400">"model"</span>, <span class="text-[#38BDF8]">"owned_by"</span>: <span class="text-white">"anthropic"</span>, <span class="text-[#38BDF8]">"context_window"</span>: <span class="text-amber-400">200000</span> }
  ]
}</code></pre>
        </div>
      </section>

      <!-- ENDPOINT 3: EMBEDDINGS -->
      <section id="embeddings" class="flex flex-col gap-6 scroll-mt-24">
        <div class="flex items-center justify-between flex-wrap gap-4 border-b border-[#1F2438] pb-4">
          <div class="flex items-center gap-3">
            <span class="px-2.5 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-mono font-bold text-xs">POST</span>
            <h2 class="font-mono font-bold text-lg md:text-xl text-white">/v1/embeddings</h2>
          </div>
          <span class="text-xs text-[#8E98B0] font-mono">Vector Embedding Generation</span>
        </div>

        <p class="text-xs md:text-sm text-[#8E98B0] leading-relaxed">
          Converts input strings into vector embeddings using standard models like <code class="font-mono text-[#38BDF8]">text-embedding-3-small</code> or <code class="font-mono text-[#38BDF8]">text-embedding-3-large</code>.
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
