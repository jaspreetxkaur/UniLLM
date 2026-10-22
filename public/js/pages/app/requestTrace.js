// APP PAGE: requestTrace
import { apiService } from "../../apiService.js?v=2";
import { components } from "../../components.js?v=2";
import { router } from "../../router.js?v=2";

export function appRequestTrace(params) {
    const r = apiService.getRequestTrace(params.id);
    if (!r) return `<div class="p-12 text-center text-xs text-brand-muted select-none font-bold">Trace ID ${params.id} not found in gateway log cache.</div>`;

    return `
      <div class="flex flex-col gap-6 animate-fade-in-up font-sans select-none">
        <a href="/app/requests" data-link class="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1.5 self-start uppercase tracking-wider">
          &larr; Back to Requests Log
        </a>
        
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-brand-border pb-5">
          <div class="flex flex-col gap-1">
            <span class="text-[9px] font-bold text-brand-primary uppercase tracking-widest">Transaction Audit</span>
            <h1 class="font-display font-black text-2xl text-brand-text uppercase leading-none font-bold">Request ${r.id}</h1>
            <span class="text-xs text-brand-muted font-bold">Timestamp: ${new Date(r.timestamp).toLocaleString()}</span>
          </div>
          <span class="px-3 py-1 bg-green-50 border border-green-200 text-green-700 text-xs font-bold rounded-full uppercase tracking-wider">200 OK SUCCESS</span>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div class="lg:col-span-8 flex flex-col gap-6">
            <div class="grid grid-cols-3 gap-4 font-semibold text-xs text-[#8E98B0]">
              <div class="border border-[#1F2438] rounded-xl p-4 bg-[#10121A] shadow-sm text-center">
                <span class="text-[9px] font-bold uppercase tracking-wider block mb-1">Latency Duration</span>
                <span class="text-lg font-bold text-white font-mono">${r.latency}ms</span>
              </div>
              <div class="border border-[#1F2438] rounded-xl p-4 bg-[#10121A] shadow-sm text-center">
                <span class="text-[9px] font-bold uppercase tracking-wider block mb-1">Tokens Volume</span>
                <span class="text-lg font-bold text-white font-mono">${r.tokensInput + r.tokensOutput}</span>
                <span class="text-[8px] block mt-0.5 font-bold font-mono">${r.tokensInput} in / ${r.tokensOutput} out</span>
              </div>
              <div class="border border-[#1F2438] rounded-xl p-4 bg-[#10121A] shadow-sm text-center">
                <span class="text-[9px] font-bold uppercase tracking-wider block mb-1">Inference Cost</span>
                <span class="text-lg font-bold text-white font-mono">${r.cost === 0 ? "$0.00" : `$${r.cost.toFixed(5)}`}</span>
              </div>
            </div>

            <!-- Detailed Stage Timelines -->
            <div class="border border-[#1F2438] bg-[#10121A] rounded-xl p-6 shadow-sm">
              <h3 class="font-bold text-xs text-white uppercase tracking-wider border-b border-[#1F2438] pb-3 mb-6">Trace Pipeline Stages</h3>
              
              <div class="relative border-l border-[#1F2438] pl-6 flex flex-col gap-8 text-xs font-semibold text-white">
                <div class="relative">
                  <div class="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-[#38BDF8] border border-[#07080B]"></div>
                  <div class="flex justify-between items-center font-bold">
                    <span>1. SSL Handshake & TLS verification</span>
                    <span class="font-mono text-[#8E98B0] font-bold">${r.trace.auth}ms</span>
                  </div>
                </div>
                <div class="relative">
                  <div class="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-[#38BDF8] border border-[#07080B]"></div>
                  <div class="flex justify-between items-center font-bold">
                    <span>2. Governance policy inspection</span>
                    <span class="font-mono text-[#8E98B0] font-bold">${r.trace.policy}ms</span>
                  </div>
                </div>
                <div class="relative">
                  <div class="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-[#38BDF8] border border-[#07080B]"></div>
                  <div class="flex justify-between items-center font-bold">
                    <span>3. Smart Cache cache check</span>
                    <span class="font-mono text-[#8E98B0] font-bold">${r.trace.cache}ms</span>
                  </div>
                </div>
                <div class="relative">
                  <div class="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-[#38BDF8] border border-[#07080B]"></div>
                  <div class="flex justify-between items-center font-bold">
                    <span>4. Router destination calculation</span>
                    <span class="font-mono text-[#8E98B0] font-bold">${r.trace.router}ms</span>
                  </div>
                </div>
                <div class="relative">
                  <div class="absolute -left-[31px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#38BDF8] border border-[#07080B] animate-pulse"></div>
                  <div class="flex justify-between items-center font-bold">
                    <div class="flex flex-col gap-0.5">
                      <span>5. Provider request payload completion</span>
                      <span class="text-[9px] text-[#8E98B0] font-bold">Model ID: ${r.model.toLowerCase()}</span>
                    </div>
                    <span class="font-mono text-[#8E98B0] font-bold">${r.trace.provider}ms</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="lg:col-span-4 border border-[#1F2438] bg-[#10121A] rounded-xl p-5 shadow-sm flex flex-col gap-4 text-xs font-semibold text-[#8E98B0]">
            <h3 class="font-bold text-xs text-white border-b border-[#1F2438] pb-3 uppercase tracking-wider">Trace Metadata</h3>
            <div class="flex justify-between border-b border-[#1F2438] pb-2">
              <span>Origin Name</span>
              <span class="text-white font-bold">${r.user}</span>
            </div>
            <div class="flex justify-between border-b border-[#1F2438] pb-2">
              <span>Default Workspace</span>
              <span class="text-white font-bold">Cyberdyne Lab</span>
            </div>
            <div class="flex justify-between">
              <span>Uptime SLA Contract</span>
              <span class="text-emerald-400 font-bold font-mono">99.95%</span>
            </div>
          </div>
        </div>

        <div class="border border-[#1F2438] rounded-xl p-6 bg-[#10121A] shadow-sm select-text">
          <h3 class="font-bold text-xs text-white mb-4 uppercase tracking-wider">Raw JSON Completion Response</h3>
          <pre class="font-mono text-xs text-[#8E98B0] p-4 bg-[#07080B] border border-[#1F2438] rounded-lg overflow-x-auto whitespace-pre-wrap select-all"><code>{
  "id": "${r.id}",
  "object": "chat.completion",
  "created": ${Math.floor(new Date(r.timestamp).getTime() / 1000)},
  "model": "${r.model.toLowerCase().replace(/\s/g, "-")}",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "Simulation response matching output model ${r.model}"
      },
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": ${r.tokensInput},
    "completion_tokens": ${r.tokensOutput},
    "total_tokens": ${r.tokensInput + r.tokensOutput}
  }
}</code></pre>
        </div>
      </div>
    `;
  };

export function bindAppRequestTrace() {};

export default {
  appRequestTrace,
  bindAppRequestTrace
};
