/**
 * UniLLM — Node.js Core Modules & Architecture Demonstration
 * File: scripts/demo-node-core.js
 * 
 * Demonstrates:
 * 1. Native HTTP Server (http.createServer without Express)
 * 2. WHATWG URL Module & Query String Parsing (URL, URLSearchParams, fileURLToPath)
 * 3. ES Modules (ESM) vs CommonJS (CJS) Interoperability
 * 4. Asynchronous Request/Response Stream Processing
 * 5. Native HTTP Client (http.get / http.request)
 * 
 * Usage:
 * - Run educational demo suite: npm run demo:node
 * - Keep standalone server alive: node scripts/demo-node-core.js --serve
 */

import http from 'node:http';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import path from 'node:path';

// ============================================================================
// 1. MODULE SYSTEMS DEMONSTRATION (ESM vs CommonJS)
// ============================================================================
console.log('='.repeat(70));
console.log('📚 [Node.js Core Demo] Section 1: Module Systems (ESM vs CommonJS)');
console.log('='.repeat(70));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const require = createRequire(import.meta.url);

// Import CommonJS helper into ES Module environment
const cjsHelper = require('./demo-cjs-helper.cjs');

console.log('👉 Current File (ESM import.meta.url) :', import.meta.url);
console.log('👉 Converted to Local Path (__filename)  :', __filename);
console.log('👉 Directory Name (__dirname)            :', __dirname);
console.log('👉 Imported CommonJS Module System       :', cjsHelper.moduleSystem);
console.log('👉 CJS Helper Formatted Timestamp        :', cjsHelper.formatTimestamp());
console.log('👉 CJS Helper Process Memory Stats       :', cjsHelper.computeMemoryStats());
console.log('   ✓ Verified: ESM and CommonJS interoperate seamlessly via createRequire().\n');

// ============================================================================
// 2. WHATWG URL MODULE & QUERY STRING DEMONSTRATION
// ============================================================================
console.log('='.repeat(70));
console.log('📚 [Node.js Core Demo] Section 2: URL Module & Query String Parsing');
console.log('='.repeat(70));

const sampleUrlString = 'http://localhost:5199/api/gateway/route?model=gpt-4o&routing=cost-optimized&tier=pro&tags=ai&tags=production#section-routing';
const parsedUrl = new URL(sampleUrlString);

console.log('👉 Raw URL String     :', sampleUrlString);
console.log('👉 Protocol           :', parsedUrl.protocol);
console.log('👉 Hostname & Port    :', parsedUrl.host);
console.log('👉 Pathname           :', parsedUrl.pathname);
console.log('👉 Search (Query Raw) :', parsedUrl.search);
console.log('👉 Hash (Fragment)    :', parsedUrl.hash);

console.log('\n🔍 URLSearchParams Inspection:');
console.log('   - model              :', parsedUrl.searchParams.get('model'));
console.log('   - routing strategy   :', parsedUrl.searchParams.get('routing'));
console.log('   - tier               :', parsedUrl.searchParams.get('tier'));
console.log('   - tags (all values)  :', parsedUrl.searchParams.getAll('tags'));
console.log('   - has "cost_limit"   :', parsedUrl.searchParams.has('cost_limit'));
console.log('   ✓ Verified: WHATWG URL API handles paths, queries, and fragments natively.\n');

// ============================================================================
// 3. NATIVE NODE.JS HTTP SERVER (NO EXPRESS)
// ============================================================================
const DEMO_PORT = process.env.DEMO_PORT || 5199;

const nativeServer = http.createServer(async (req, res) => {
  const reqStartNs = process.hrtime.bigint();
  const requestUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  // Endpoint 1: Health & Runtime Info
  if (req.method === 'GET' && requestUrl.pathname === '/api/native-info') {
    const elapsedMs = Number(process.hrtime.bigint() - reqStartNs) / 1e6;
    
    const payload = {
      success: true,
      serverType: 'Native Node.js http.Server (Zero Frameworks)',
      timestamp: new Date().toISOString(),
      urlInspection: {
        pathname: requestUrl.pathname,
        queryParams: Object.fromEntries(requestUrl.searchParams.entries()),
        rawQueryString: requestUrl.search
      },
      headers: {
        host: req.headers.host,
        userAgent: req.headers['user-agent'] || 'native-client',
        accept: req.headers.accept || '*/*'
      },
      nodeRuntime: {
        version: process.version,
        platform: process.platform,
        architecture: process.arch,
        uptimeSeconds: Math.floor(process.uptime())
      },
      latencyMs: parseFloat(elapsedMs.toFixed(3))
    };

    const responseBody = JSON.stringify(payload, null, 2);
    res.writeHead(200, {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Length': Buffer.byteLength(responseBody),
      'X-Powered-By': 'NodeJS-Native-HTTP'
    });
    res.end(responseBody);
    return;
  }

  // Endpoint 2: Streaming Chunk Echo (POST)
  if (req.method === 'POST' && requestUrl.pathname === '/api/stream-echo') {
    const chunks = [];
    
    req.on('data', (chunk) => {
      chunks.push(chunk);
    });

    req.on('end', () => {
      const body = Buffer.concat(chunks).toString('utf8');
      const elapsedMs = Number(process.hrtime.bigint() - reqStartNs) / 1e6;

      const payload = {
        success: true,
        endpoint: 'Native Streaming Chunk Echo',
        bytesReceived: Buffer.byteLength(body),
        receivedBody: body,
        streamStatus: 'COMPLETED',
        elapsedMs: parseFloat(elapsedMs.toFixed(3))
      };

      const responseBody = JSON.stringify(payload, null, 2);
      res.writeHead(200, {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': Buffer.byteLength(responseBody)
      });
      res.end(responseBody);
    });
    return;
  }

  // Default 404 Route
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    success: false,
    message: `Native route not found for ${req.method} ${requestUrl.pathname}`,
    availableRoutes: ['GET /api/native-info', 'POST /api/stream-echo']
  }));
});

// ============================================================================
// 4. RUN SERVER & VERIFY VIA NATIVE HTTP CLIENT
// ============================================================================
nativeServer.listen(DEMO_PORT, () => {
  console.log('='.repeat(70));
  console.log(`⚡ [Node.js Core Demo] Native HTTP Server Listening on Port ${DEMO_PORT}`);
  console.log(`👉 Isolated from UniLLM production port 5173`);
  console.log(`👉 Access URL: http://localhost:${DEMO_PORT}/api/native-info`);
  console.log('='.repeat(70));

  const shouldKeepAlive = process.argv.includes('--serve');

  // Trigger self-verification request using native http.get
  const testUrl = `http://127.0.0.1:${DEMO_PORT}/api/native-info?model=gpt-4o&routing=cost-optimized&tier=pro`;
  console.log(`\n📡 Sending live client request to: ${testUrl}`);

  http.get(testUrl, (clientRes) => {
    let rawData = '';
    clientRes.on('data', (chunk) => { rawData += chunk; });
    clientRes.on('end', () => {
      try {
        const parsed = JSON.parse(rawData);
        console.log(`\n📥 Live HTTP Response Received (Status: ${clientRes.statusCode} ${clientRes.statusMessage}):`);
        console.log('--------------------------------------------------');
        console.log('Headers Received       :', clientRes.headers['x-powered-by']);
        console.log('Server Type            :', parsed.serverType);
        console.log('Parsed Query Model     :', parsed.urlInspection.queryParams.model);
        console.log('Parsed Query Routing   :', parsed.urlInspection.queryParams.routing);
        console.log('Processing Latency     :', parsed.latencyMs, 'ms');
        console.log('--------------------------------------------------');
        console.log('✓ Verified: Native HTTP server & URL module executed successfully!\n');

        if (!shouldKeepAlive) {
          console.log('🛑 [Node.js Core Demo] Demonstration suite complete. Closing native server cleanly.');
          nativeServer.close(() => {
            console.log('   (To keep server running interactively, pass the --serve flag)');
            process.exit(0);
          });
        } else {
          console.log('🚀 Server is running in persistent mode (--serve). Press Ctrl+C to terminate.');
        }
      } catch (err) {
        console.error('Error parsing response:', err);
        nativeServer.close(() => process.exit(1));
      }
    });
  }).on('error', (err) => {
    console.error('Client request error:', err.message);
    nativeServer.close(() => process.exit(1));
  });
});
