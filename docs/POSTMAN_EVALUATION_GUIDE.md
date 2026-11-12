# UniLLM — Postman Evaluation Guide & API Specification

This guide documents the API endpoints of UniLLM for manual evaluation using **Postman** (or `curl`). 

> [!IMPORTANT]
> **Safety Notice for Evaluation**: To preserve database state and avoid accidental data mutation, this document contains explicit curl commands and request templates. Do not send state-changing requests (`POST`, `PUT`, `DELETE`) without confirming authorization and intended workspace targets.

---

## 1. Environment & Setup

In Postman, create an **Environment** named `UniLLM-Local` with the following variables:

| Variable | Initial Value | Current Value | Description |
|---|---|---|---|
| `base_url` | `http://localhost:5173` | `http://localhost:5173` | Base URL of the UniLLM Express server |
| `demo_url` | `http://localhost:5199` | `http://localhost:5199` | Standalone native Node.js HTTP server |
| `token` | *(leave blank)* | *(populated after login)* | JWT authentication token |
| `workspace_id` | *(leave blank)* | *(populated from workspace list)* | Active workspace UUID |
| `document_id` | *(leave blank)* | *(populated from document upload)* | Uploaded document UUID |

---

## 2. Authentication & Session Management

### 2.1 Sign Up (Generate Verification OTP)
- **Method**: `POST`
- **Path**: `{{base_url}}/api/auth/signup`
- **Headers**:
  ```http
  Content-Type: application/json
  ```
- **Body (raw JSON)**:
  ```json
  {
    "name": "Alex Mercer",
    "email": "alex.mercer@example.com",
    "password": "Password123!",
    "orgName": "Mercer Labs"
  }
  ```
- **Expected Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Signed up successfully. Please verify your OTP.",
    "otp": "481920",
    "orgContext": {
      "targetRole": "owner",
      "preferredOrgName": "Mercer Labs"
    }
  }
  ```
  *(Note: In non-production mode, the OTP code is returned in the response and printed to server console for sandbox verification).*
- **Error Cases**:
  - `400 Bad Request`: Missing name, email, or password.
  - `400 Bad Request`: Email address is already registered and verified.

---

### 2.2 Verify OTP & Issue JWT Session
- **Method**: `POST`
- **Path**: `{{base_url}}/api/auth/verify-otp`
- **Headers**:
  ```http
  Content-Type: application/json
  ```
- **Body (raw JSON)**:
  ```json
  {
    "email": "alex.mercer@example.com",
    "otp": "481920",
    "orgContext": {
      "preferredOrgName": "Mercer Labs"
    }
  }
  ```
- **Expected Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Account verified successfully.",
    "user": {
      "id": "6718d7...",
      "name": "Alex Mercer",
      "email": "alex.mercer@example.com",
      "org": "Mercer Labs",
      "role": "owner"
    }
  }
  ```
- **Cookies Set**: `unillm_token` (HTTP-only, SameSite=Lax, Max-Age=7 days).

---

### 2.3 Login
- **Method**: `POST`
- **Path**: `{{base_url}}/api/auth/login`
- **Headers**:
  ```http
  Content-Type: application/json
  ```
- **Body (raw JSON)**:
  ```json
  {
    "email": "alex.mercer@example.com",
    "password": "Password123!"
  }
  ```
- **Expected Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Logged in successfully.",
    "user": {
      "id": "6718d7...",
      "name": "Alex Mercer",
      "email": "alex.mercer@example.com",
      "org": "Mercer Labs",
      "role": "owner"
    }
  }
  ```
- **Postman Tests Script (Auto-save Token)**:
  ```javascript
  const cookieHeader = pm.cookies.get("unillm_token");
  if (cookieHeader) {
    pm.environment.set("token", cookieHeader);
  }
  ```
- **Error Cases**:
  - `400 Bad Request`: Incorrect password.
  - `404 Not Found`: Account not found with this email.

---

### 2.4 Get Current User Profile (AuthN Protected)
- **Method**: `GET`
- **Path**: `{{base_url}}/api/auth/me`
- **Headers**:
  ```http
  Authorization: Bearer {{token}}
  ```
  *(Or send with cookie `unillm_token` automatically managed by Postman / browser).*
- **Expected Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "user": {
      "id": "6718d7...",
      "name": "Alex Mercer",
      "email": "alex.mercer@example.com",
      "org": "Mercer Labs",
      "role": "owner",
      "organizationId": "6718d7...",
      "canCreateApiKeys": true
    }
  }
  ```
- **Error Cases**:
  - `401 Unauthorized`: No token provided or token expired.

---

### 2.5 Logout
- **Method**: `POST`
- **Path**: `{{base_url}}/api/auth/logout`
- **Headers**: None required.
- **Expected Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully."
  }
  ```

---

## 3. Workspace CRUD Operations & Authorization

All workspace operations enforce **tenant isolation**: users can only access workspaces belonging to their own organization.

### 3.1 List All Workspaces (Read - Multiple)
- **Method**: `GET`
- **Path**: `{{base_url}}/api/workspaces`
- **Headers**:
  ```http
  Authorization: Bearer {{token}}
  ```
- **Expected Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "workspaces": [
      {
        "id": "902d13b4-4e20-4a81-...",
        "name": "Default Workspace",
        "isDefault": true,
        "keyCount": 2,
        "requestCount": 18,
        "totalSpend": 0.042150,
        "createdAt": "2026-10-22T06:23:40.000Z"
      }
    ]
  }
  ```

---

### 3.2 Create Workspace (Create)
- **Method**: `POST`
- **Path**: `{{base_url}}/api/workspaces`
- **Headers**:
  ```http
  Authorization: Bearer {{token}}
  Content-Type: application/json
  ```
- **Role Requirement**: `owner` or `admin`.
- **Body (raw JSON)**:
  ```json
  {
    "name": "AI Safety Research Lab"
  }
  ```
- **Expected Response (`201 Created`)**:
  ```json
  {
    "success": true,
    "workspace": {
      "id": "a1b2c3d4-e5f6-...",
      "name": "AI Safety Research Lab",
      "isDefault": false,
      "keyCount": 0,
      "requestCount": 0,
      "totalSpend": 0,
      "createdAt": "2026-10-26T14:40:00.000Z"
    }
  }
  ```
- **Error Cases**:
  - `400 Bad Request`: Empty or missing workspace name.
  - `403 Forbidden`: Authenticated caller has role `member` (lacks administrative permissions).

---

### 3.3 Get Single Workspace by ID (Read - Single)
- **Method**: `GET`
- **Path**: `{{base_url}}/api/workspaces/{{workspace_id}}`
- **Headers**:
  ```http
  Authorization: Bearer {{token}}
  ```
- **Expected Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "workspace": {
      "id": "a1b2c3d4-e5f6-...",
      "name": "AI Safety Research Lab",
      "isDefault": false,
      "keyCount": 0,
      "requestCount": 0,
      "totalSpend": 0,
      "createdAt": "2026-10-26T14:40:00.000Z"
    }
  }
  ```
- **Error Cases**:
  - `404 Not Found`: Workspace does not exist or belongs to another organization.

---

### 3.4 Update Workspace Name (Update)
- **Method**: `PUT`
- **Path**: `{{base_url}}/api/workspaces/{{workspace_id}}`
- **Headers**:
  ```http
  Authorization: Bearer {{token}}
  Content-Type: application/json
  ```
- **Role Requirement**: `owner` or `admin`.
- **Body (raw JSON)**:
  ```json
  {
    "name": "Advanced AI Alignment Workspace"
  }
  ```
- **Expected Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Workspace updated successfully.",
    "workspace": {
      "id": "a1b2c3d4-e5f6-...",
      "name": "Advanced AI Alignment Workspace",
      "isDefault": false,
      "createdAt": "2026-10-26T14:40:00.000Z"
    }
  }
  ```
- **Error Cases**:
  - `400 Bad Request`: Empty name or name exceeding 100 characters.
  - `403 Forbidden`: Caller role is `member`.
  - `404 Not Found`: Workspace not found in user's organization.

---

### 3.5 Delete Workspace (Delete)
- **Method**: `DELETE`
- **Path**: `{{base_url}}/api/workspaces/{{workspace_id}}`
- **Headers**:
  ```http
  Authorization: Bearer {{token}}
  ```
- **Role Requirement**: `owner` or `admin`.
- **Expected Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Workspace deleted successfully."
  }
  ```
- **Error Cases**:
  - `400 Bad Request`: Attempting to delete the organization's default workspace (`is_default: true`).
  - `403 Forbidden`: Standard `member` role attempting deletion.
  - `404 Not Found`: Workspace does not exist.

---

## 4. Multer File Upload & Document Management

Uploaded files are stored on disk under `uploads/documents/` with validated MIME types and randomized UUID names.

### 4.1 Upload Document to Workspace
- **Method**: `POST`
- **Path**: `{{base_url}}/api/workspaces/{{workspace_id}}/documents`
- **Headers**:
  ```http
  Authorization: Bearer {{token}}
  ```
- **Body**: Select `form-data` in Postman:
  - Key: `file` (Change key type from `Text` to `File`)
  - Value: Select a valid file (`.txt`, `.md`, `.json`, `.csv`, `.pdf` up to 5 MB)
- **Expected Response (`201 Created`)**:
  ```json
  {
    "success": true,
    "message": "Document uploaded successfully.",
    "document": {
      "id": "f83a2109-b148-4cb2-9912-...",
      "workspaceId": "a1b2c3d4-e5f6-...",
      "originalName": "model_context.md",
      "mimeType": "text/markdown",
      "sizeBytes": 1420,
      "storage": "local-disk",
      "uploadedBy": {
        "id": "6718d7...",
        "name": "Alex Mercer",
        "email": "alex.mercer@example.com",
        "role": "owner"
      },
      "uploadedAt": "2026-10-26T14:42:00.000Z"
    }
  }
  ```
- **Error Cases**:
  - `400 Bad Request`: `Invalid file extension. Allowed formats: .txt, .md, .json, .csv, .pdf`
  - `400 Bad Request`: `File size exceeds maximum allowed limit of 5 MB.`
  - `400 Bad Request`: `Dangerous file content detected: executable binary masquerading as document.`
  - `400 Bad Request`: `No file provided. Please attach a file under form field "file".`

---

### 4.2 List Uploaded Documents
- **Method**: `GET`
- **Path**: `{{base_url}}/api/workspaces/{{workspace_id}}/documents`
- **Headers**:
  ```http
  Authorization: Bearer {{token}}
  ```
- **Expected Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "count": 1,
    "documents": [
      {
        "id": "f83a2109-b148-4cb2-9912-...",
        "workspaceId": "a1b2c3d4-e5f6-...",
        "originalName": "model_context.md",
        "mimeType": "text/markdown",
        "sizeBytes": 1420,
        "storage": "local-disk",
        "uploadedBy": {
          "id": "6718d7...",
          "name": "Alex Mercer",
          "email": "alex.mercer@example.com",
          "role": "owner"
        },
        "uploadedAt": "2026-10-26T14:42:00.000Z"
      }
    ]
  }
  ```

---

### 4.3 Download Document
- **Method**: `GET`
- **Path**: `{{base_url}}/api/workspaces/{{workspace_id}}/documents/{{document_id}}/download`
- **Headers**:
  ```http
  Authorization: Bearer {{token}}
  ```
- **Expected Response (`200 OK`)**:
  - Response Header: `Content-Disposition: attachment; filename="model_context.md"`
  - Response Header: `Content-Type: text/markdown`
  - Body: Binary stream of the file content.
- **In Postman**: Click the down-arrow next to "Send" and select **"Send and Download"** to save the downloaded file to your local machine.

---

### 4.4 Delete Document
- **Method**: `DELETE`
- **Path**: `{{base_url}}/api/workspaces/{{workspace_id}}/documents/{{document_id}}`
- **Headers**:
  ```http
  Authorization: Bearer {{token}}
  ```
- **Authorization Rule**: `owner` and `admin` can delete any document; standard `member` can only delete their own upload.
- **Expected Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "message": "Document deleted successfully."
  }
  ```
- **Error Cases**:
  - `403 Forbidden`: `Access denied. You do not have permission to delete this document.`
  - `404 Not Found`: Document not found in this workspace.

---

## 5. System Health & Educational Demonstrations

### 5.1 System Health Check
- **Method**: `GET`
- **Path**: `{{base_url}}/api/health`
- **Expected Response (`200 OK`)**:
  ```json
  {
    "status": "ok",
    "uptime": 1284,
    "timestamp": "2026-10-26T14:45:00.000Z"
  }
  ```

---

### 5.2 Express.js Request Lifecycle Trace
- **Method**: `GET`
- **Path**: `{{base_url}}/api/demo/request-lifecycle`
- **Headers**: Optional `Authorization: Bearer {{token}}`
- **Expected Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "title": "Express.js Request-Response Lifecycle Demonstration",
    "totalExecutionTimeMs": 0.452,
    "architecture": {
      "server": "Node.js http.Server + Express 4.x",
      "middlewarePattern": "Chain of Responsibility (next())",
      "errorHandler": "4-argument centralized middleware (err, req, res, next)"
    },
    "stages": [
      { "stage": 1, "name": "TCP/HTTP Ingress & Connection Parsing" },
      { "stage": 2, "name": "Application-Level Middleware Stack" },
      { "stage": 3, "name": "Security & Rate Limiting Guards" },
      { "stage": 4, "name": "Authentication Guard (AuthN)" },
      { "stage": 5, "name": "Authorization & RBAC Guard (AuthZ)" },
      { "stage": 6, "name": "Router Matching & Controller Execution" },
      { "stage": 7, "name": "Response Serialization & Stream Flush" }
    ]
  }
  ```

---

### 5.3 Native Node.js Server & URL Module (Port 5199)
- **Prerequisite**: Start native server via:
  ```bash
  node scripts/demo-node-core.js --serve
  ```
- **Method**: `GET`
- **Path**: `{{demo_url}}/api/native-info?model=gpt-4o&routing=cost-optimized&tier=pro`
- **Expected Response (`200 OK`)**:
  ```json
  {
    "success": true,
    "serverType": "Native Node.js http.Server (Zero Frameworks)",
    "timestamp": "2026-10-26T14:45:10.000Z",
    "urlInspection": {
      "pathname": "/api/native-info",
      "queryParams": {
        "model": "gpt-4o",
        "routing": "cost-optimized",
        "tier": "pro"
      },
      "rawQueryString": "?model=gpt-4o&routing=cost-optimized&tier=pro"
    },
    "nodeRuntime": {
      "version": "v22.x.x",
      "platform": "darwin",
      "uptimeSeconds": 14
    },
    "latencyMs": 0.185
  }
  ```

---

## 6. SQL vs NoSQL Architectural Reference

During your viva, your professor may ask about **Database Fundamentals** and **SQL vs NoSQL**. Here is the authoritative reference based on UniLLM's real architecture:

### 1. Conceptual Comparison

| Feature | Relational Databases (SQL - e.g. PostgreSQL) | Document Databases (NoSQL - e.g. MongoDB) |
|---|---|---|
| **Data Model** | Tabular: Fixed Tables, Columns, Rows | Hierarchical: Flexible JSON-like Documents (BSON) grouped in Collections |
| **Schema Design** | Rigid Schema (`DDL`, strict column types, migrations required for schema changes) | Dynamic / Schema-on-Read: Documents in the same collection can have varying fields |
| **Relationships** | Strict Foreign Keys (`REFERENCES`), Normalized tables with `JOIN`s | Embedded subdocuments (denormalization) or Reference IDs (`_id`) |
| **ACID Guarantees** | Multi-table ACID transactions built-in natively | Single-document atomicity guaranteed natively; multi-document transactions supported |
| **Scaling** | Vertical scaling (Scale-Up: CPU, RAM); sharding is complex | Horizontal scaling (Scale-Out: distributed sharding & replica sets) |

### 2. How This Applies Directly to UniLLM

UniLLM is an AI Gateway that routes LLM requests and tracks token analytics, routing policies, and audit trails.

1. **Why MongoDB Fits UniLLM's Core Workload**:
   - **AI Request Telemetry**: Every LLM completion returns varying provider metadata (e.g. prompt tokens, completion tokens, latency, provider model name, system tags). In MongoDB, this is stored natively as a JSON document in the `ai_requests` collection without rigid SQL schema constraints.
   - **Routing Policies**: LLM fallback lists and tier routing rules (`routing_policies`) contain nested arrays of model names (`['gpt-4o', 'claude-3-5-sonnet', 'gemini-1.5-pro']`). In SQL, this requires an intermediate join table; in MongoDB, it is an embedded array queried with index efficiency.
2. **Where Relational Concepts Are Still Preserved via Mongoose ODM**:
   - In [server/models/](file:///Users/jaspreetkaur0987/Desktop/UniLLM/server/models/), Mongoose provides structured schemas, validation, default values, and compound indexes (`workspaceSchema.index({ organization_id: 1, is_default: -1 })`), giving UniLLM the discipline of relational modeling combined with the high-throughput performance of a document database.
