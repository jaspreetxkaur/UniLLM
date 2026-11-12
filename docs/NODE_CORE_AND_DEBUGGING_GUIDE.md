# UniLLM — Node.js Core, Modules, Debugging & Package Management Guide

This guide provides practical, step-by-step demonstrations for the Node.js core curriculum topics listed on your syllabus.

---

## 1. Native Node.js HTTP Server & URL Module

UniLLM's production gateway is built on Express.js, which itself is an abstraction over Node.js's native `http` module. To demonstrate how raw Node.js operates without any external frameworks, a dedicated demonstration script is provided in [scripts/demo-node-core.js](file:///Users/jaspreetkaur0987/Desktop/UniLLM/scripts/demo-node-core.js).

### How to Run the Demonstration:
```bash
npm run demo:node
```

### What This Demonstrates to the Professor:
1. **`http.createServer((req, res) => ...)`**:
   - Creates a raw local HTTP server on port `5199` (completely isolated from UniLLM's port `5173`).
   - Receives incoming HTTP requests without Express middleware.
   - Manually sets status codes and response headers using `res.writeHead(200, { 'Content-Type': 'application/json' })`.
   - Flushes raw chunks and terminates the connection via `res.end()`.
2. **WHATWG `URL` and `URLSearchParams`**:
   - Parses the request URL: `new URL(req.url, 'http://localhost:5199')`.
   - Extracts pathname (`parsedUrl.pathname`).
   - Reads query string parameters: `searchParams.get('model')`, `searchParams.get('routing')`.
   - Distinguishes query parameters from path segments.
3. **Native HTTP Client (`http.get`)**:
   - Automatically issues a real HTTP GET request over the local network to test the native server.
   - Collects incoming data chunks via stream listeners (`data` and `end`).

### Persistent Mode (Keep Server Running for Browser Inspection):
```bash
node scripts/demo-node-core.js --serve
```
Open in browser or Postman:
- `http://localhost:5199/api/native-info?model=gpt-4o&routing=cost-optimized&tier=pro`

---

## 2. Module Systems: ES Modules (ESM) vs CommonJS (CJS)

### How Modules Work in UniLLM:
- UniLLM specifies `"type": "module"` in [package.json](file:///Users/jaspreetkaur0987/Desktop/UniLLM/package.json).
- All `.js` files in the repository are treated as modern **ECMAScript Modules (ESM)**.
- ESM uses `import` and `export` statements, which are statically analyzed at compile/load time and support asynchronous loading and top-level `await`.

### Interoperability with CommonJS:
To demonstrate that Node.js supports both systems, [scripts/demo-cjs-helper.cjs](file:///Users/jaspreetkaur0987/Desktop/UniLLM/scripts/demo-cjs-helper.cjs) uses traditional CommonJS (`module.exports = { ... }`).

In ESM files, CommonJS modules can be imported using Node's `createRequire`:
```javascript
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

// Synchronously load a CommonJS module inside an ES Module
const cjsModule = require('./demo-cjs-helper.cjs');
console.log(cjsModule.computeMemoryStats());
```

### Key Differences Summary:
| Feature | ES Modules (ESM) | CommonJS (CJS) |
|---|---|---|
| **Syntax** | `import { x } from './m.js'` / `export const x` | `const x = require('./m')` / `module.exports` |
| **Parsing** | Asynchronous, static parsing before execution | Synchronous, dynamic execution at runtime |
| **Top-Level `await`** | Supported natively | Not supported (requires wrapping in `async IIFE`) |
| **File Scope** | `import.meta.url` | `__filename` and `__dirname` |
| **Node.js Declaration** | `"type": "module"` in `package.json` or `.mjs` | Default without `"type": "module"` or `.cjs` |

---

## 3. Nodemon (Automatic Server Reloading)

Nodemon monitors files in the project directory. When any backend JavaScript file is modified and saved, Nodemon automatically kills the existing Node process and spawns a fresh process with the updated code.

### How to Demonstrate to the Professor:
1. Start the server using the Nodemon script configured in `package.json`:
   ```bash
   npm run dev
   ```
2. Terminal displays:
   ```text
   [nodemon] 3.1.14
   [nodemon] to restart at any time, enter `rs`
   [nodemon] watching path(s): *.*
   [nodemon] watching extensions: js,mjs,cjs,json
   [nodemon] starting `node server.js`
   ⚡ UniLLM Gateway Server Listening on Port 5173
   ```
3. Open any server file (e.g., [server.js](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server.js) or a route file). Add a harmless comment or save the file.
4. Point out to your professor the terminal output:
   ```text
   [nodemon] restarting due to changes...
   [nodemon] starting `node server.js`
   ```
5. You can also type `rs` and press Enter to trigger a manual restart at any time.

---

## 4. Node.js Debugging Walkthrough

### Option A: Using the Built-in V8 Inspector with Chrome DevTools
1. Start UniLLM with the inspector flag:
   ```bash
   node --inspect server.js
   ```
   *(Or `node --inspect-brk server.js` to pause execution on the very first line before startup).*
2. Terminal displays:
   ```text
   Debugger listening on ws://127.0.0.1:9229/...
   For help, see: https://nodejs.org/en/docs/inspector
   ```
3. Open Google Chrome and navigate to:
   ```text
   chrome://inspect
   ```
4. Under **Remote Target**, click **"inspect"** next to `server.js`.
5. Chrome opens a dedicated DevTools window attached directly to your Node.js runtime.
6. Press `Cmd + P` (or `Ctrl + P`), search for `workspaceController.js`, and click on a line number (e.g., line 15) to set a breakpoint.
7. Send a request to that endpoint (or click in the web UI). Execution immediately pauses on your breakpoint!
8. Show your professor:
   - **Call Stack**: Trace how the request flowed from `node:net` → `express` → `workspaceController`.
   - **Scope Panel**: Inspect `req.body`, `req.user`, `req.params`.
   - **Console Tab**: Evaluate live variables (e.g., typing `req.user.name` prints the user's name).
   - **Step Controls**: Step over (`F10`) and Step into (`F11`).

### Option B: Using VS Code Integrated Debugger
1. Open the Command Palette in VS Code (`Cmd + Shift + P`).
2. Type and select **"Debug: Create JavaScript Debug Terminal"**.
3. In this debug terminal, simply run:
   ```bash
   npm start
   ```
4. Set breakpoints by clicking in the gutter next to any line number in VS Code. Breakpoints will bind automatically.

---

## 5. Package Management in Node.js (`package.json`)

Inspect [package.json](file:///Users/jaspreetkaur0987/Desktop/UniLLM/package.json):

```json
{
  "name": "unillm-gateway",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "demo:node": "node scripts/demo-node-core.js",
    "test": "node test_workspace_keys.mjs ..."
  },
  "dependencies": {
    "express": "^4.21.2",
    "mongoose": "^9.11.3",
    "multer": "^2.5.0",
    "jsonwebtoken": "^9.0.3"
  },
  "devDependencies": {
    "nodemon": "^3.1.14"
  }
}
```

### Explanation of Core Concepts:
1. **Manifest File (`package.json`)**:
   - Defines project metadata (`name`, `version`, `type: "module"`).
   - Manages dependencies and executable lifecycle scripts.
2. **`dependencies` vs `devDependencies`**:
   - **`dependencies`**: Required at runtime in production (e.g., `express`, `mongoose`, `multer`, `jsonwebtoken`). Without these, the application cannot serve requests or connect to the database.
   - **`devDependencies`**: Required only during development and testing (e.g., `nodemon`). In a production container, running `npm install --omit=dev` saves disk space and reduces attack surface by omitting dev tools.
3. **Semantic Versioning (SemVer: `MAJOR.MINOR.PATCH`)**:
   - Example: `"express": "^4.21.2"`
   - `^` (Caret): Permits backward-compatible updates up to the next major version (e.g., `4.22.0`, but not `5.0.0`).
   - `~` (Tilde): Permits only patch bugfixes (e.g., `4.21.3`).
4. **Deterministic Lockfile (`package-lock.json`)**:
   - Locks the exact resolved version, integrity hash (`sha512`), and dependency sub-tree for every package.
   - Guarantees identical installations across different machines and deployment environments (`npm ci`).
