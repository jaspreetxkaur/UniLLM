# UniLLM — Unified AI Gateway & Management Platform

[![Node.js Version](https://img.shields.io/badge/Node.js-%3E%3D20.0.0-339933?logo=node.js)](https://nodejs.org/)
[![Database](https://img.shields.io/badge/Database-MongoDB%20via%20Mongoose-47A248?logo=mongodb)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Framework-Express.js%204.21-000000?logo=express)](https://expressjs.com/)
[![Architecture](https://img.shields.io/badge/Frontend-Vanilla%20JS%20SPA-F7DF1E?logo=javascript)](./public)

UniLLM is an enterprise-grade AI gateway and governance platform that provides a single OpenAI-compatible ingress endpoint to route, balance, monitor, and safeguard requests across upstream LLM providers (Google Gemini, OpenAI, Anthropic, and local endpoints).

---

## 🏛️ System Architecture

```
                      ┌──────────────────────────────────────────────┐
                      │          Client Applications & SDKs           │
                      │       (Python, Node.js, cURL, REST API)      │
                      └──────────────────────┬───────────────────────┘
                                             │ HTTP / Authorization: Bearer <YOUR_API_KEY>
                                             ▼
                      ┌──────────────────────────────────────────────┐
                      │              UniLLM Edge Gateway             │
                      │  - API Key Validation & Workspace Scoping    │
                      │  - Rate Limiting & Budget Controls           │
                      │  - Semantic & SHA-256 Response Caching       │
                      │  - Dynamic Fallback & Circuit Breaking       │
                      └──────┬───────────────────────┬───────────────┘
                             │                       │
              ┌──────────────┴────────┐     ┌────────┴──────────────┐
              ▼                       ▼     ▼                       ▼
    ┌──────────────────┐    ┌──────────────────┐  ┌──────────────────┐
    │  OpenAI Provider │    │  Gemini Provider │  │ Custom Endpoints │
    │ (GPT-4o, o1, etc)│    │ (Flash, Pro, etc)│  │  (vLLM, Ollama)  │
    └──────────────────┘    └──────────────────┘  └──────────────────┘
              │                       │                     │
              └──────────────┬────────┴─────────────────────┘
                             ▼
                      ┌──────────────────────────────────────────────┐
                      │          Persistence & Observability         │
                      │  - MongoDB (Users, Workspaces, Keys, Logs)   │
                      │  - Realtime Telemetry via Socket.IO          │
                      │  - Audit Trails & Latency Waterfalls         │
                      └──────────────────────────────────────────────┘
```

---

## 📁 Repository Structure

```
UniLLM/
├── server.js                      # Main Express server entry point & auth endpoints
├── server/
│   ├── config/                    # Database connections (mongo.js, models.js)
│   ├── controllers/               # Route controllers (gateway, keys, team, etc.)
│   ├── middleware/                # Auth, apiKeyAuth, RBAC, rateLimiter, upload
│   ├── models/                    # Mongoose schemas (User, Workspace, ApiKey, etc.)
│   ├── providers/                 # Upstream AI adapters (OpenAI, Gemini, Factory)
│   ├── realtime/                  # Socket.IO live stream engine
│   ├── routes/                    # Express modular route definitions
│   ├── services/                  # Business logic (gateway, routing, cache, audit)
│   └── utils/                     # Error normalizers and input validators
├── public/                        # Single Page Application (Zero-build Vanilla JS)
│   ├── index.html                 # Main SPA entry point
│   ├── css/style.css              # Custom styling & animations
│   └── js/
│       ├── router.js              # Client-side hash/history router
│       ├── components.js          # Shared UI navigation & layouts (App, Docs, Public)
│       ├── apiService.js          # Client-side API client & mock fallbacks
│       └── pages/                 # Modular page views (app, admin, auth, docs, public)
├── scripts/                       # Migration scripts, test suites & demo helpers
│   ├── demo-node-core.js          # Node.js core event loop & lifecycle demo
│   ├── migrate-pg-to-mongo.js     # Historical PostgreSQL-to-MongoDB migration script
│   └── test-phase*.js             # Automated blackbox and integration test suites
├── docs/                          # Faculty Evaluation Documentation
│   ├── PROFESSOR_EVALUATION_CHECKLIST.md  # Detailed curriculum & syllabus compliance
│   ├── POSTMAN_EVALUATION_GUIDE.md        # API collection & request payloads
│   └── NODE_CORE_AND_DEBUGGING_GUIDE.md   # Node.js internals & lifecycle hooks
└── backups/                       # Baseline migration records & verification reports
```

---

## 🚀 Quickstart & Installation

### Prerequisites

- **Node.js**: `>= 20.0.0`
- **MongoDB**: `>= 6.0` (running locally on `mongodb://127.0.0.1:27017` or via MongoDB Atlas)
- **API Keys**: Google Gemini API key or OpenAI API key (optional for mocked routing)

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/jaspreetkaur0987/UniLLM.git
cd UniLLM
npm install
```

### 2. Configure Environment

Copy the example configuration:

```bash
cp .env.example .env
```

Ensure `.env` contains:

```env
PORT=5173
NODE_ENV=development
MONGODB_URI=mongodb://127.0.0.1:27017/unillm
JWT_SECRET=your_jwt_secret_key_minimum_32_characters
GEMINI_API_KEY=your_gemini_key_here
OPENAI_API_KEY=your_openai_key_here
```

### 3. Start the Server

```bash
npm start
```

Or run with automatic restarts during development:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Testing & Verification

Run the automated integration and regression test suite:

```bash
npm test
```

Run the Node.js Core and Event Loop demonstration:

```bash
npm run demo:node
```

Run syntax checks across the entire codebase:

```bash
node -e '
const fs = require("fs"), { execSync } = require("child_process");
function check(d) {
  for (const f of fs.readdirSync(d)) {
    if (f === "node_modules" || f === ".git") continue;
    const p = d + "/" + f;
    if (fs.statSync(p).isDirectory()) check(p);
    else if (f.endsWith(".js") || f.endsWith(".mjs")) execSync(`node --check "${p}"`);
  }
}
check(".");
console.log("All JavaScript files passed syntax verification!");
'
```

---

## 🎓 Faculty Evaluation References

For academic evaluations, code walkthroughs, and viva preparations, refer to the documentation in [`docs/`](./docs):

- **[`docs/PROFESSOR_EVALUATION_CHECKLIST.md`](./docs/PROFESSOR_EVALUATION_CHECKLIST.md)**: Comprehensive map of project features against evaluation criteria (Authentication, Multitenancy, Routing, DB Schemas, Error Handling).
- **[`docs/POSTMAN_EVALUATION_GUIDE.md`](./docs/POSTMAN_EVALUATION_GUIDE.md)**: Ready-to-run API specifications and payload samples.
- **[`docs/NODE_CORE_AND_DEBUGGING_GUIDE.md`](./docs/NODE_CORE_AND_DEBUGGING_GUIDE.md)**: Node.js runtime mechanics, event loop profiling, and memory management.

---

## 🔒 Security & Privacy

- **Password Hashing**: Cryptographic `scrypt` hashing with unique per-user salts and timing-safe comparisons.
- **JWT Authorization**: HTTP-only session cookies with role-based access control (RBAC).
- **API Key Vault**: Virtual keys are hashed with `SHA-256`; secret tokens are only shown once upon creation.
- **Tenant Isolation**: Strict workspace-level data scoping across all database queries.
