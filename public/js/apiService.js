// API Service Layer to connect UniLLM frontend with backend endpoints
import {
  modelsList,
  mockRequests,
  mockEmployees,
  mockTeams,
  mockPolicies,
  mockAuditLogs,
  mockAlerts,
  mockApiKeys,
  mockDashboardMetrics,
  mockCacheMetrics,
  payAsYouGoCredits
} from "./mockData.js";

// Helper to safely extract error message from backend responses
export const extractErrorMessage = (data, fallback = "An unexpected error occurred.") => {
  if (!data) return fallback;
  if (data.error && typeof data.error === "object" && data.error.message) {
    return data.error.message;
  }
  if (typeof data.error === "string") {
    return data.error;
  }
  if (data.message) {
    return data.message;
  }
  return fallback;
};

// Demo state storage for non-MVP sandbox features only (Billing, Alerts, Credits)
const loadDemoState = (key, fallback) => {
  try {
    const data = localStorage.getItem(`unillm_demo_${key}`);
    return data ? JSON.parse(data) : fallback;
  } catch (e) {
    return fallback;
  }
};

const saveDemoState = (key, data) => {
  try {
    localStorage.setItem(`unillm_demo_${key}`, JSON.stringify(data));
  } catch (e) {}
};

let demoState = {
  alerts: loadDemoState("alerts", mockAlerts),
  credits: loadDemoState("credits", payAsYouGoCredits),
  metrics: loadDemoState("metrics", mockDashboardMetrics)
};

export const apiService = {
  // 1. Unified Auth Headers (Only attaches Authorization if an explicit external API key is provided)
  getAuthHeaders: (apiKey = null) => {
    const headers = { "Content-Type": "application/json" };
    if (apiKey && typeof apiKey === "string" && apiKey.trim()) {
      headers["Authorization"] = `Bearer ${apiKey.trim()}`;
    }
    return headers;
  },

  // 2. Authentication API (Cookie-Only Session Transport)
  login: async (email, password) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-UniLLM-Test-Sandbox": "true" },
        credentials: "same-origin",
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok && data.success && data.user) {
        // Store ONLY sanitized public user profile in sessionStorage (NO JWT / secret tokens)
        const sanitizedUser = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          org: data.user.org,
          role: data.user.role,
          organizationId: data.user.organizationId
        };
        sessionStorage.setItem("unillm_user", JSON.stringify(sanitizedUser));
        localStorage.setItem("unillm_user", JSON.stringify(sanitizedUser));
      }
      return data;
    } catch (err) {
      return { success: false, message: "Network connection failure reaching auth service." };
    }
  },

  signup: async (name, email, password, orgName = "", referralCode = "") => {
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-UniLLM-Test-Sandbox": "true" },
        credentials: "same-origin",
        body: JSON.stringify({ name, email, password, orgName, referralCode })
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network connection failure reaching auth service." };
    }
  },

  verifyOtp: async (email, otp, orgContext = null) => {
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-UniLLM-Test-Sandbox": "true" },
        credentials: "same-origin",
        body: JSON.stringify({ email, otp, orgContext })
      });
      const data = await response.json();
      if (response.ok && data.success && data.user) {
        // Store ONLY sanitized public user profile in sessionStorage (NO JWT / secret tokens)
        const sanitizedUser = {
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          org: data.user.org,
          role: data.user.role,
          organizationId: data.user.organizationId
        };
        sessionStorage.setItem("unillm_user", JSON.stringify(sanitizedUser));
        localStorage.setItem("unillm_user", JSON.stringify(sanitizedUser));
      }
      return data;
    } catch (err) {
      return { success: false, message: "Network connection failure verifying OTP." };
    }
  },

  resendOtp: async (email) => {
    try {
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-UniLLM-Test-Sandbox": "true" },
        credentials: "same-origin",
        body: JSON.stringify({ email })
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network connection failure resending verification code." };
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-UniLLM-Test-Sandbox": "true" },
        credentials: "same-origin",
        body: JSON.stringify({ email })
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network connection failure." };
    }
  },

  resetPassword: async (email, otp, password) => {
    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email, otp, password })
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network connection failure." };
    }
  },

  logout: async () => {
    sessionStorage.removeItem("unillm_user");
    sessionStorage.removeItem("redirect_after_login");
    localStorage.removeItem("unillm_user");
    localStorage.removeItem("redirect_after_login");
    document.cookie = "unillm_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin"
      });
    } catch (e) {}
  },

  getCurrentUser: () => {
    try {
      const data = sessionStorage.getItem("unillm_user") || localStorage.getItem("unillm_user");
      return data ? JSON.parse(data) : null;
    } catch (e) {
      return null;
    }
  },

  updateCurrentUser: (updates) => {
    const user = apiService.getCurrentUser() || {};
    const updated = { ...user, ...updates };
    // Ensure no token property gets attached
    delete updated.token;
    delete updated.jwt;
    sessionStorage.setItem("unillm_user", JSON.stringify(updated));
    localStorage.setItem("unillm_user", JSON.stringify(updated));
    return updated;
  },

  updateProfile: async ({ name, orgName }) => {
    try {
      const response = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ name, orgName })
      });
      const data = await response.json();
      if (data.success && data.user) {
        apiService.updateCurrentUser(data.user);
      }
      return data;
    } catch (err) {
      return { success: false, message: "Network connection failure updating profile." };
    }
  },

  // Authoritative Session Verification against GET /api/auth/me (Cookie-Auth)
  verifySession: async () => {
    try {
      const response = await fetch("/api/auth/me", {
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin"
      });
      if (response.ok) {
        const data = await response.json();
        if (data.success && data.user) {
          const sanitizedUser = {
            id: data.user.id,
            name: data.user.name,
            email: data.user.email,
            org: data.user.org,
            role: data.user.role,
            organizationId: data.user.organizationId,
            canCreateApiKeys: data.user.canCreateApiKeys
          };
          sessionStorage.setItem("unillm_user", JSON.stringify(sanitizedUser));
          return sanitizedUser;
        }
      } else if (response.status === 401) {
        sessionStorage.removeItem("unillm_user");
        sessionStorage.removeItem("redirect_after_login");
        localStorage.removeItem("unillm_user");
        localStorage.removeItem("redirect_after_login");
        document.cookie = "unillm_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
        return null;
      }
    } catch (err) {
      // Offline / network failure; fallback to existing session UI state
    }
    return apiService.getCurrentUser();
  },

  // Workspace active preference (stored locally as active selection)
  getActiveWorkspace: () => {
    return localStorage.getItem("unillm_active_workspace") || "Default Workspace";
  },

  getActiveWorkspaceId: () => {
    return localStorage.getItem("unillm_active_workspace_id") || null;
  },

  setActiveWorkspace: (name, id = null) => {
    localStorage.setItem("unillm_active_workspace", name);
    if (id) {
      localStorage.setItem("unillm_active_workspace_id", id);
    } else {
      localStorage.removeItem("unillm_active_workspace_id");
    }
    return name;
  },

  // 3. Model Queries (Frontend informational catalog from modelsList)
  getModels: () => modelsList,
  getModel: (id) => modelsList.find(m => m.id === id) || modelsList[0],

  // 4. Real AI Gateway Chat Completion (POST /api/v1/chat/completions)
  chatCompletion: async ({ model, messages, temperature = 0.7, max_tokens = 1000, apiKey = null }) => {
    try {
      const headers = apiService.getAuthHeaders(apiKey);

      const response = await fetch("/api/v1/chat/completions", {
        method: "POST",
        headers,
        credentials: "same-origin",
        body: JSON.stringify({
          model: model || "gemini-3.6-flash",
          messages,
          temperature,
          max_tokens
        })
      });

      const data = await response.json();
      return { ok: response.ok, status: response.status, data };
    } catch (err) {
      return {
        ok: false,
        status: 0,
        data: { error: { message: "Network connection failure reaching AI Gateway." } }
      };
    }
  },

  // Live Gateway completion execution for Playground & Console
  runCompletion: async (prompt, systemPrompt, modelId, onChunk) => {
    try {
      const messages = [];
      if (systemPrompt && systemPrompt.trim()) {
        messages.push({ role: "system", content: systemPrompt.trim() });
      }
      messages.push({ role: "user", content: prompt });

      const result = await apiService.chatCompletion({
        model: modelId || "gemini-3.6-flash",
        messages,
        temperature: 0.7,
        max_tokens: 1000
      });

      const data = result.data;

      if (result.ok && data.choices && data.choices[0]) {
        const fullText = data.choices[0].message.content || "";
        const telemetry = data.unillm_telemetry || {};
        const usage = data.usage || {};

        // Stream text smoothly and quickly while preserving 100% of spaces, newlines, and tabs
        const tokens = fullText.match(/(\S+|\s+)/g) || [fullText];
        let currentIdx = 0;
        const chunkSize = 3;
        const streamInterval = setInterval(() => {
          if (currentIdx < tokens.length) {
            const nextBatch = tokens.slice(currentIdx, currentIdx + chunkSize).join("");
            onChunk(nextBatch);
            currentIdx += chunkSize;
          } else {
            clearInterval(streamInterval);

            const realTelemetryObj = {
              id: telemetry.requestId || data.id || `req-${Date.now()}`,
              timestamp: new Date().toISOString(),
              user: apiService.getCurrentUser()?.name || "Developer",
              email: apiService.getCurrentUser()?.email || "dev@unillm.ai",
              model: data.model || modelId,
              provider: telemetry.provider || "gemini",
              tokensInput: usage.prompt_tokens || 0,
              tokensOutput: usage.completion_tokens || 0,
              cost: telemetry.costUsd !== undefined ? telemetry.costUsd : (telemetry.cost || 0),
              latency: telemetry.latencyMs !== undefined ? telemetry.latencyMs : (telemetry.latency || 0),
              cache: telemetry.cacheStatus || telemetry.cache || "MISS",
              status: 200,
              fallbackTriggered: telemetry.isFallback || telemetry.fallbackTriggered || false
            };

            onChunk(null, realTelemetryObj);
          }
        }, 20);

        return () => clearInterval(streamInterval);
      } else {
        const errMsg = extractErrorMessage(data, "Failed to generate AI response.");
        onChunk(`❌ **Gateway Error**: ${errMsg}`);
        onChunk(null, { status: result.status || 500, latency: 0, cost: 0, tokensInput: 0, tokensOutput: 0, cache: "ERROR" });
        return () => {};
      }
    } catch (err) {
      onChunk(`❌ **Network Error**: Unable to reach UniLLM AI Gateway.`);
      onChunk(null, { status: 500, latency: 0, cost: 0, tokensInput: 0, tokensOutput: 0, cache: "ERROR" });
      return () => {};
    }
  },

  simulateCompletion: async (prompt, systemPrompt, modelId, onChunk) => {
    return await apiService.runCompletion(prompt, systemPrompt, modelId, onChunk);
  },

  // 5. Database-Backed Analytics Queries
  getAnalyticsOverview: async (range = '30d') => {
    try {
      const response = await fetch(`/api/analytics/overview?range=${range}`, {
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin"
      });
      const data = await response.json();
      if (response.ok && data.success) {
        return data.overview;
      }
      return null;
    } catch (err) {
      return null;
    }
  },

  getRequests: async (limit = 50) => {
    try {
      const response = await fetch(`/api/analytics/requests?limit=${limit}`, {
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin"
      });
      const data = await response.json();
      if (response.ok && data.success) {
        return data.requests;
      }
      return [];
    } catch (err) {
      return [];
    }
  },

  getRequestLogs: async (limit = 50) => {
    return await apiService.getRequests(limit);
  },

  getCostAnalytics: async () => {
    try {
      const response = await fetch('/api/analytics/costs', {
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin"
      });
      const data = await response.json();
      if (response.ok && data.success) {
        return data.costs;
      }
      return null;
    } catch (err) {
      return null;
    }
  },

  // 6. Organization Budget Management (Database-backed)
  getOrgBudget: async () => {
    try {
      const response = await fetch("/api/organization/budget", {
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin"
      });
      const data = await response.json();
      if (response.ok && data.success) {
        return data.budget;
      }
      return null;
    } catch (err) {
      return null;
    }
  },

  updateOrgBudget: async (budgetData) => {
    try {
      const response = await fetch("/api/organization/budget", {
        method: "PUT",
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin",
        body: JSON.stringify(budgetData)
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network connection failure updating budget." };
    }
  },

  // 7. Team Members Management (Database-backed)
  getTeamMembers: async () => {
    try {
      const response = await fetch("/api/team", {
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin"
      });
      const data = await response.json();
      if (response.ok && data.success) {
        return data.members;
      }
      return [];
    } catch (err) {
      return [];
    }
  },

  getEmployees: async () => {
    return await apiService.getTeamMembers();
  },

  inviteEmployee: async (name, email, role, monthlySpendLimitUsd = 50.00) => {
    try {
      const response = await fetch("/api/team/invite", {
        method: "POST",
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin",
        body: JSON.stringify({ name, email, role, monthlySpendLimitUsd })
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network connection failure inviting team member." };
    }
  },

  suspendEmployee: async (memberId, currentStatus) => {
    try {
      const nextStatus = currentStatus === "active" ? "suspended" : "active";
      const response = await fetch(`/api/team/${memberId}`, {
        method: "PUT",
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin",
        body: JSON.stringify({ status: nextStatus })
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network connection failure updating member status." };
    }
  },

  removeEmployee: async (memberId) => {
    try {
      const response = await fetch(`/api/team/${memberId}`, {
        method: "DELETE",
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin"
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network connection failure removing team member." };
    }
  },

  // 8. Workspaces Management (Database-backed)
  getWorkspaces: async () => {
    try {
      const response = await fetch("/api/workspaces", {
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin"
      });
      const data = await response.json();
      if (response.ok && data.success) {
        return data.workspaces;
      }
      return [];
    } catch (err) {
      return [];
    }
  },

  createWorkspace: async (name) => {
    try {
      const response = await fetch("/api/workspaces", {
        method: "POST",
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin",
        body: JSON.stringify({ name })
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network connection failure creating workspace." };
    }
  },

  deleteWorkspace: async (id) => {
    try {
      const response = await fetch(`/api/workspaces/${id}`, {
        method: "DELETE",
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin"
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network connection failure deleting workspace." };
    }
  },

  updateWorkspace: async (id, name) => {
    try {
      const response = await fetch(`/api/workspaces/${id}`, {
        method: "PUT",
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin",
        body: JSON.stringify({ name })
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network connection failure updating workspace." };
    }
  },

  // Workspace Document Management (Multer file upload)
  uploadDocument: async (workspaceId, file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      // Note: Do NOT set Content-Type header manually; browser automatically sets boundary
      const headers = {};
      const token = apiService.getActiveToken?.();
      if (token) headers["Authorization"] = `Bearer ${token}`;

      const response = await fetch(`/api/workspaces/${workspaceId}/documents`, {
        method: "POST",
        headers,
        credentials: "same-origin",
        body: formData
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network connection failure uploading document." };
    }
  },

  uploadWorkspaceDocument: async function(workspaceId, file) {
    return this.uploadDocument(workspaceId, file);
  },

  getDocuments: async (workspaceId) => {
    try {
      const response = await fetch(`/api/workspaces/${workspaceId}/documents`, {
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin"
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network connection failure fetching documents." };
    }
  },

  downloadDocument: async (workspaceId, documentId) => {
    try {
      const response = await fetch(`/api/workspaces/${workspaceId}/documents/${documentId}/download`, {
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin"
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        return { success: false, message: errorData.message || "Failed to download document." };
      }
      const blob = await response.blob();
      const contentDisposition = response.headers.get("content-disposition");
      let filename = "document";
      if (contentDisposition && contentDisposition.includes("filename=")) {
        const match = contentDisposition.match(/filename="?([^";]+)"?/);
        if (match && match[1]) filename = match[1];
      }
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
      return { success: true, filename };
    } catch (err) {
      return { success: false, message: "Network connection failure downloading document." };
    }
  },

  deleteDocument: async (workspaceId, documentId) => {
    try {
      const response = await fetch(`/api/workspaces/${workspaceId}/documents/${documentId}`, {
        method: "DELETE",
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin"
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network connection failure deleting document." };
    }
  },

  // 9. Routing Policies & Governance Rules (Database-backed)
  getPolicies: async () => {
    try {
      const response = await fetch("/api/policies", {
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin"
      });
      const data = await response.json();
      if (response.ok && data.success) {
        return data.policies;
      }
      return [];
    } catch (err) {
      return [];
    }
  },

  getRoutingRules: async () => {
    return await apiService.getPolicies();
  },

  createRoutingRule: async (policyData) => {
    try {
      const response = await fetch("/api/policies", {
        method: "POST",
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin",
        body: JSON.stringify(policyData)
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network error saving routing policy." };
    }
  },

  addPolicy: async (policyData) => {
    return await apiService.createRoutingRule(policyData);
  },

  updatePolicy: async (id, policyData) => {
    try {
      const response = await fetch(`/api/policies/${id}`, {
        method: "PUT",
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin",
        body: JSON.stringify(policyData)
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network error updating routing policy." };
    }
  },

  deletePolicy: async (id) => {
    try {
      const response = await fetch(`/api/policies/${id}`, {
        method: "DELETE",
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin"
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network error deleting routing policy." };
    }
  },

  togglePolicy: async (id) => {
    try {
      const response = await fetch(`/api/policies/${id}/toggle`, {
        method: "POST",
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin"
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network error toggling routing policy." };
    }
  },

  // 10. API Keys (Database-backed)
  getApiKeys: async (workspaceId = null) => {
    try {
      const url = workspaceId ? `/api/keys?workspaceId=${encodeURIComponent(workspaceId)}` : "/api/keys";
      const response = await fetch(url, {
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin"
      });
      const data = await response.json();
      if (response.ok && data.success) {
        return data.keys;
      }
      return [];
    } catch (err) {
      return [];
    }
  },

  createApiKey: async (name, workspaceId = null) => {
    try {
      const response = await fetch("/api/keys", {
        method: "POST",
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin",
        body: JSON.stringify({ name, workspaceId })
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network error creating API key." };
    }
  },

  revokeApiKey: async (id) => {
    try {
      const response = await fetch(`/api/keys/${id}/revoke`, {
        method: "POST",
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin"
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network error revoking API key." };
    }
  },

  // 11. Compliance Audit Logs (Database-backed)
  getAuditLogs: async (limit = 50) => {
    try {
      const response = await fetch(`/api/audit-logs?limit=${limit}`, {
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin"
      });
      const data = await response.json();
      if (response.ok && data.success) {
        return data.logs;
      }
      return [];
    } catch (err) {
      return [];
    }
  },

  // 12. Smart Edge & In-Memory Cache (Database & Memory backed)
  getCacheMetrics: async () => {
    try {
      const response = await fetch("/api/cache/metrics", {
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin"
      });
      const data = await response.json();
      if (response.ok && data.success) {
        return data.metrics;
      }
      return { hitRate: 0, cacheHits: 0, cacheMisses: 0, totalTokensSaved: 0, totalDollarsSaved: 0 };
    } catch (err) {
      return { hitRate: 0, cacheHits: 0, cacheMisses: 0, totalTokensSaved: 0, totalDollarsSaved: 0 };
    }
  },

  purgeCache: async () => {
    try {
      const response = await fetch("/api/cache/clear", {
        method: "POST",
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin"
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network connection failure clearing cache." };
    }
  },

  // 13. Organization Referral Endpoints
  getReferral: async () => {
    try {
      const response = await fetch("/api/org/referral", {
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin"
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network connection failure." };
    }
  },

  regenerateReferral: async () => {
    try {
      const response = await fetch("/api/org/referral/regenerate", { 
        method: "POST",
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin"
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network connection failure." };
    }
  },

  toggleReferral: async (enabled) => {
    try {
      const response = await fetch("/api/org/referral/toggle", {
        method: "POST",
        headers: apiService.getAuthHeaders(),
        credentials: "same-origin",
        body: JSON.stringify({ enabled })
      });
      return await response.json();
    } catch (err) {
      return { success: false, message: "Network connection failure." };
    }
  },

  // 14. Non-MVP Sandbox Features (Demo / UI Utility State)
  getAlerts: () => demoState.alerts,
  markAlertRead: (id) => {
    demoState.alerts = demoState.alerts.map(a => a.id === id ? { ...a, read: true } : a);
    saveDemoState("alerts", demoState.alerts);
  },

  getCredits: () => demoState.credits,
  buyCredits: (amount) => {
    demoState.credits.purchased += parseFloat(amount);
    demoState.credits.remaining += parseFloat(amount);
    saveDemoState("credits", demoState.credits);
    return demoState.credits;
  },
  updateCreditsSettings: (settings) => {
    demoState.credits = { ...demoState.credits, ...settings };
    saveDemoState("credits", demoState.credits);
    return demoState.credits;
  },
  getMetrics: () => demoState.metrics,
  getTeams: () => mockTeams,
  getTeam: (id) => mockTeams.find(t => t.id === id) || mockTeams[0]
};
