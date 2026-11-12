# UniLLM — Professor Evaluation & Viva Checklist

This master checklist maps every mandatory syllabus topic directly to the UniLLM codebase, providing:
1. Core viva concepts you must explain.
2. Code references (files, functions, routes) to show the professor.
3. Concrete practical demonstrations to perform.
4. Likely viva questions with concise, technically accurate answers.
5. Honest implementation limitations to disclose.

---

## Topic 1: HTML, CSS, JavaScript (Frontend Integration)

### 1. Concepts to Explain
- **Single Page Application (SPA) Architecture**: The client loads a single HTML file ([public/index.html](file:///Users/jaspreetkaur0987/Desktop/UniLLM/public/index.html)) and dynamically renders views without full page refreshes using vanilla JavaScript components.
- **Client-Server Communication**: Frontend calls backend REST APIs using the browser's native `fetch()` API with JSON bodies and credentials (`credentials: 'include'` for cookies).
- **Scalable Vector Graphics (SVG)**: Custom brand logo ([public/unillm-logo.svg](file:///Users/jaspreetkaur0987/Desktop/UniLLM/public/unillm-logo.svg)) using XML-based vector paths and linear gradients for resolution independence.

### 2. Code References
- **Shell**: [public/index.html](file:///Users/jaspreetkaur0987/Desktop/UniLLM/public/index.html)
- **Components & Routing**: [public/js/components.js](file:///Users/jaspreetkaur0987/Desktop/UniLLM/public/js/components.js)
- **API Client**: [public/js/apiService.js](file:///Users/jaspreetkaur0987/Desktop/UniLLM/public/js/apiService.js)
- **Brand SVG**: [public/unillm-logo.svg](file:///Users/jaspreetkaur0987/Desktop/UniLLM/public/unillm-logo.svg)

### 3. Practical Demonstration
1. Open `http://localhost:5173` in Google Chrome.
2. Open Chrome DevTools (`F12` or `Cmd + Option + I`) → **Network** tab.
3. Click navigation items (e.g. Workspaces or DevPass). Point out that the page URL changes and data is fetched via asynchronous `fetch()` requests without reloading the HTML page.

### 4. Likely Viva Questions & Answers
- **Q: Why use Vanilla JavaScript instead of a framework like React or Angular?**
  - **A**: Vanilla JS demonstrates complete mastery of DOM manipulation, event delegation, and asynchronous fetch without reliance on heavy build abstractions. *(Note: React was marked optional on our syllabus).*
- **Q: How does the client maintain user sessions?**
  - **A**: The server sets an `httpOnly` cookie (`unillm_token`) on authentication. The browser automatically includes this cookie in subsequent `fetch()` calls via `credentials: 'include'`, preventing XSS attacks from accessing the token.

---

## Topic 2: Express.js

### 1. Concepts to Explain
- **Application & Server Setup**: Initializing `express()`, wrapping with `http.createServer()`, and configuring port listeners.
- **Middleware Chain of Responsibility**: Each middleware function receives `(req, res, next)`. Calling `next()` passes execution to the next handler; calling `res.send()` or `res.json()` terminates the cycle.
- **Modular Routing**: Separating route definitions into domain routers (`keyRoutes`, `workspaceRoutes`, `policyRoutes`) mounted via `app.use('/api/...', router)`.
- **Centralized Error Handling**: 4-argument error middleware `(err, req, res, next)` catching uncaught errors and normalizing HTTP responses.

### 2. Code References
- **Entry & Setup**: [server.js:31-70](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server.js#L31-L70)
- **Modular Routers**: [server/routes/workspaceRoutes.js](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server/routes/workspaceRoutes.js), [server/routes/policyRoutes.js](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server/routes/policyRoutes.js)
- **Centralized Error Handler**: [server.js:651-660](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server.js#L651-L660)
- **Request Lifecycle Demo**: [server/routes/demoRoutes.js](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server/routes/demoRoutes.js) and [server/controllers/demoController.js](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server/controllers/demoController.js)

### 3. Practical Demonstration
1. Open Postman or terminal curl:
   ```bash
   curl -s http://localhost:5173/api/demo/request-lifecycle | jq .
   ```
2. Walk the professor through the 7 stages returned in the JSON:
   - Stage 1: Ingress & TCP parsing.
   - Stage 2: `express.json()` and `cookieParser()`.
   - Stage 3: Rate limiter validation.
   - Stage 4: Authentication guard.
   - Stage 5: RBAC guard.
   - Stage 6: Route handler execution.
   - Stage 7: Response serialization and stream flush.

### 4. Likely Viva Questions & Answers
- **Q: How does Express know a middleware is an error handler?**
  - **A**: By its function arity (number of parameters). A standard middleware takes 3 arguments `(req, res, next)`, whereas an error handler must declare exactly 4 arguments: `(err, req, res, next)`.
- **Q: What is the purpose of `express.json({ limit: '1mb' })`?**
  - **A**: It parses incoming request payloads with `Content-Type: application/json` and populates `req.body`. The `1mb` limit prevents denial-of-service (DoS) memory exhaustion from oversized payloads.

---

## Topic 3: Node.js (Core Runtime & Modules)

### 1. Concepts to Explain
- **Event Loop & Asynchronous I/O**: Single-threaded event loop delegating non-blocking network and filesystem I/O to libuv worker threads.
- **Native HTTP & URL Modules**: Low-level stream servers (`http.createServer`) and standard URL query string parsing without third-party frameworks.
- **Module Systems (ESM vs CommonJS)**: Static ESM (`import`/`export`) with top-level await vs dynamic CommonJS (`require`/`module.exports`).
- **Debugging & Package Management**: Node V8 inspector (`node --inspect`), Nodemon process monitoring, and `package.json` dependency declarations.

### 2. Code References
- **Native HTTP & URL Demo Script**: [scripts/demo-node-core.js](file:///Users/jaspreetkaur0987/Desktop/UniLLM/scripts/demo-node-core.js)
- **CommonJS Interop Helper**: [scripts/demo-cjs-helper.cjs](file:///Users/jaspreetkaur0987/Desktop/UniLLM/scripts/demo-cjs-helper.cjs)
- **Package Manifest**: [package.json](file:///Users/jaspreetkaur0987/Desktop/UniLLM/package.json)
- **Debugging & Runtime Guide**: [docs/NODE_CORE_AND_DEBUGGING_GUIDE.md](file:///Users/jaspreetkaur0987/Desktop/UniLLM/docs/NODE_CORE_AND_DEBUGGING_GUIDE.md)

### 3. Practical Demonstration
1. **Run the Native Node.js Demo**:
   ```bash
   npm run demo:node
   ```
   Show the output demonstrating:
   - Native HTTP server listening on isolated port `5199`.
   - Query string parsing using the WHATWG `URL` class.
   - Native `http.get` making an HTTP request without external libraries.
   - CommonJS memory stats loaded dynamically via `createRequire`.
2. **Demonstrate Nodemon Auto-Reload**:
   ```bash
   npm run dev
   ```
   Save any file (e.g. `server.js`) and show the terminal restarting automatically with `[nodemon] restarting due to changes...`.

### 4. Likely Viva Questions & Answers
- **Q: What is the difference between `dependencies` and `devDependencies`?**
  - **A**: `dependencies` (like Express and Mongoose) are mandatory in production for the app to run. `devDependencies` (like Nodemon) are tooling only needed during local development and testing.
- **Q: What does the `^` (caret) symbol mean in `package.json`?**
  - **A**: It follows Semantic Versioning (SemVer) and allows npm to install minor and patch updates (e.g. `^4.21.2` allows `4.22.0`, but prevents breaking major changes like `5.0.0`).

---

## Topic 4: Multer (File Upload Handling)

### 1. Concepts to Explain
- **Multipart Form Data**: How binary files are streamed across HTTP using boundary-separated multipart streams.
- **Multer Middleware**: Intercepts `multipart/form-data`, validates files, and writes to disk.
- **Security Safeguards**:
  - Whitelist validation of extensions and MIME types.
  - Deep magic-byte inspection (blocking executable binary masquerading).
  - Randomized UUID filenames preventing path-traversal attacks (`../`).
  - File size limits (5 MB max) returning HTTP `400` / `413`.
  - Multi-tenant workspace isolation.

### 2. Code References
- **Upload Middleware**: [server/middleware/upload.js](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server/middleware/upload.js)
- **Document Controller**: [server/controllers/documentController.js](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server/controllers/documentController.js)
- **Document Router**: [server/routes/documentRoutes.js](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server/routes/documentRoutes.js)

### 3. Practical Demonstration
1. In Postman, call `POST /api/workspaces/{{workspace_id}}/documents` with form-data `file` containing a `.txt` or `.md` file. Show HTTP `201 Created`.
2. Call `GET /api/workspaces/{{workspace_id}}/documents` to show the document listed with metadata.
3. Call `GET /api/workspaces/{{workspace_id}}/documents/{{doc_id}}/download` using Postman's "Send and Download" to retrieve the file.
4. Try uploading a `.js` or `.exe` file or an oversized file (> 5 MB). Show that Multer immediately rejects it with `400 Bad Request`.

### 4. Likely Viva Questions & Answers
- **Q: Why can't we trust the `file.mimetype` sent by the browser?**
  - **A**: The client controls the `Content-Type` header and can maliciously claim an `.exe` file is `text/plain`. That is why UniLLM uses two-tier validation: checking the extension AND inspecting the initial file header bytes (magic bytes).
- **Q: Why store uploaded files on disk instead of directly in MongoDB?**
  - **A**: Storing large binaries in MongoDB bloats document size, increases RAM working set, and degrades query cache efficiency. Files are better served from disk or object storage, storing only lightweight metadata descriptors in the database.

---

## Topic 5: Authentication & Authorization (AuthN vs AuthZ)

### 1. Concepts to Explain
- **Authentication (AuthN)**: "Who are you?" Verifying user identity via password hashing (Node.js `crypto.scryptSync` with salt) and multi-factor OTP verification.
- **JSON Web Tokens (JWT)**: Stateless cryptographic tokens signed with HMAC-SHA256 containing user ID and expiration claims.
- **Session Management**: Dual support for `httpOnly` secure cookies and `Authorization: Bearer <token>` headers.
- **Authorization (AuthZ / RBAC)**: "What are you permitted to do?" Checking user roles (`owner`, `admin`, `member`) on specific routes using [server/middleware/rbac.js](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server/middleware/rbac.js).

### 2. Code References
- **Scrypt Hashing & Password Verification**: [server.js:81-100](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server.js#L81-L100)
- **Token Generation**: [server.js:103-105](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server.js#L103-L105)
- **Auth Guard Middleware**: [server/middleware/auth.js](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server/middleware/auth.js)
- **RBAC Guard Middleware**: [server/middleware/rbac.js](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server/middleware/rbac.js)

### 3. Practical Demonstration
1. **Demonstrate Authentication (401 Unauthorized)**:
   - Call `GET http://localhost:5173/api/auth/me` without any token or cookie.
   - Show response: `401 Unauthorized` (`Authentication required. No session token provided.`).
2. **Demonstrate Authorization (403 Forbidden)**:
   - Log in as a standard `member` (or show code in [server/routes/workspaceRoutes.js](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server/routes/workspaceRoutes.js)).
   - Attempt to call `POST /api/workspaces` (requires `owner` or `admin`).
   - Show response: `403 Forbidden` (`Access denied. Requires one of the following roles: [owner, admin]`).

### 4. Likely Viva Questions & Answers
- **Q: Why use `scrypt` instead of `md5` or `sha256` for password storage?**
  - **A**: Plain SHA-256 and MD5 are fast cryptographic hashes vulnerable to GPU brute-force attacks. `scrypt` is a memory-hard key derivation function that requires significant RAM and CPU time, neutralizing hardware brute-forcing.
- **Q: What is the difference between 401 Unauthorized and 403 Forbidden?**
  - **A**: `401 Unauthorized` indicates an **Authentication** failure (the client has not provided valid credentials). `403 Forbidden` indicates an **Authorization** failure (the client is authenticated, but their role lacks permission for the resource).

---

## Topic 6: MongoDB & Mongoose ODM

### 1. Concepts to Explain
- **NoSQL Document Database**: Data stored as flexible BSON documents grouped into collections.
- **Mongoose ODM**: Object Data Modeling layer providing schemas, validation rules, default values, virtual getters, and indexes on top of MongoDB.
- **Full CRUD Operations**:
  - **C**reate: `Workspace.create(...)`
  - **R**ead: `Workspace.find(...)`, `Workspace.findOne(...)`, Aggregation pipelines (`$match`, `$group`, `$sum`)
  - **U**pdate: `Workspace.save()`, `updateOne(...)`, `findByIdAndUpdate(...)`
  - **D**elete: `Workspace.deleteOne(...)`

### 2. Code References
- **Connection Lifecycle & Graceful Shutdown**: [server/config/mongo.js](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server/config/mongo.js)
- **Mongoose Models**: 9 schemas in [server/models/](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server/models/) (e.g. [Workspace.js](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server/models/Workspace.js), [User.js](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server/models/User.js))
- **CRUD Service Implementation**: [server/services/workspaceService.js](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server/services/workspaceService.js)
- **Aggregation Pipelines**: [server/services/workspaceService.js:16-33](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server/services/workspaceService.js#L16-L33)

### 3. Practical Demonstration
1. Show Mongoose schema in [server/models/Workspace.js](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server/models/Workspace.js):
   - Compound index: `{ organization_id: 1, is_default: -1, created_at: 1 }`.
   - Virtual `id` getter mapping MongoDB `_id` to `id`.
2. Demonstrate complete Workspace CRUD in Postman:
   - **Create**: `POST /api/workspaces` → creates document in MongoDB.
   - **Read**: `GET /api/workspaces` → executes Mongoose aggregation pipeline computing key and cost totals.
   - **Update**: `PUT /api/workspaces/:id` → updates workspace name and updates audit log.
   - **Delete**: `DELETE /api/workspaces/:id` → deletes document from collection.

### 4. Likely Viva Questions & Answers
- **Q: What is a Mongoose virtual property?**
  - **A**: A document property that is computed on the fly and not persisted to MongoDB storage. UniLLM uses `workspaceSchema.virtual('id').get(function() { return this._id; })` to provide clean REST API responses without modifying database keys.
- **Q: What is the difference between `find().lean()` and standard `find()` in Mongoose?**
  - **A**: Standard `find()` returns heavy Mongoose Document instances with change tracking, getters, and methods. Calling `.lean()` returns plain JavaScript objects, significantly reducing memory overhead and query execution time for read-only operations.

---

## 7. Honest Implementation Disclosures & Limitations

During evaluation, explaining design decisions and acknowledging trade-offs demonstrates professional engineering maturity:

1. **Local Disk Storage for Uploads**:
   - *Disclosure*: Document binaries and metadata reside on the local disk under `uploads/documents/`. In ephemeral cloud deployments (like AWS Lambda or stateless Docker containers replaced without persistent volume mounts), files would be lost upon container restart unless backed by persistent volumes or cloud object storage (e.g. S3).
2. **Instance-Local WebSockets**:
   - *Disclosure*: Socket.io real-time updates run on the single server instance. Scaling horizontally across multiple servers would require a Redis adapter (e.g. `@socket.io/redis-adapter`) to broadcast events across nodes.
3. **Frontend Framework**:
   - *Disclosure*: UniLLM uses vanilla JavaScript components with native DOM manipulation and CSS rather than React.js, matching the whiteboard syllabus where React was marked optional.
