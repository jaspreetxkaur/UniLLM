// Static Mock Datasets for UniLLM Platform

export const modelsList = [
  {
    id: "gemini-3.6-flash",
    name: "Gemini 3.6 Flash",
    provider: "Gemini",
    type: "High Speed Utility (Default)",
    contextLength: "1M tokens",
    inputCost: 0.075,
    outputCost: 0.30,
    latency: 110,
    reliability: 99.98,
    status: "Healthy",
    description: "Ultra-fast, cost-efficient model optimized for low latency and high volume.",
    icon: "gemini"
  },
  {
    id: "gemini-3.7-flash",
    name: "Gemini 3.7 Flash",
    provider: "Gemini",
    type: "Reasoning & Coding",
    contextLength: "1M tokens",
    inputCost: 0.075,
    outputCost: 0.30,
    latency: 180,
    reliability: 99.97,
    status: "Healthy",
    description: "Advanced reasoning and multi-turn coding intelligence with hybrid thinking.",
    icon: "gemini"
  },
  {
    id: "gemini-flash-latest",
    name: "Gemini Flash (Latest)",
    provider: "Gemini",
    type: "Continuous Release",
    contextLength: "1M tokens",
    inputCost: 0.075,
    outputCost: 0.30,
    latency: 120,
    reliability: 99.99,
    status: "Healthy",
    description: "Latest stable release of Gemini Flash with up-to-date provider capabilities.",
    icon: "gemini"
  },
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "OpenAI",
    type: "Fast & Light",
    contextLength: "128K tokens",
    inputCost: 0.15,
    outputCost: 0.60,
    latency: 140,
    reliability: 99.99,
    status: "Healthy",
    description: "Affordable, high-speed intelligence for lightweight tasks and summaries.",
    icon: "openai"
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    type: "Flagship Capability",
    contextLength: "128K tokens",
    inputCost: 5.00,
    outputCost: 15.00,
    latency: 320,
    reliability: 99.98,
    status: "Healthy",
    description: "Flagship multimodal intelligence for complex reasoning, code, and vision.",
    icon: "openai"
  }
];

export const mockRequests = [
  {
    id: "req-unillm-7a8e2b",
    timestamp: "2026-08-19T11:58:32Z",
    user: "Sarah Connor",
    email: "sarah@cyberdyne.org",
    model: "GPT-4o",
    provider: "OpenAI",
    tokensInput: 1540,
    tokensOutput: 450,
    cost: 0.00835,
    latency: 312,
    cache: "MISS",
    status: 200,
    trace: {
      auth: 3,
      rateLimit: 1,
      policy: 2,
      cache: 2,
      router: 4,
      provider: 300,
      response: 3
    }
  },
  {
    id: "req-unillm-9f2b8c",
    timestamp: "2026-08-19T11:56:15Z",
    user: "John Doe",
    email: "john.doe@unillm.com",
    model: "Llama 3 70B (Groq)",
    provider: "Groq",
    tokensInput: 840,
    tokensOutput: 1200,
    cost: 0.00144,
    latency: 58,
    cache: "MISS",
    status: 200,
    trace: {
      auth: 2,
      rateLimit: 1,
      policy: 1,
      cache: 1,
      router: 3,
      provider: 48,
      response: 2
    }
  },
  {
    id: "req-unillm-1b4d5e",
    timestamp: "2026-08-19T11:53:40Z",
    user: "Alice Vance",
    email: "alice@blackmesa.res",
    model: "Gemini 1.5 Flash",
    provider: "Gemini",
    tokensInput: 450,
    tokensOutput: 280,
    cost: 0.00012,
    latency: 98,
    cache: "HIT",
    status: 200,
    trace: {
      auth: 2,
      rateLimit: 1,
      policy: 1,
      cache: 92,
      router: 0,
      provider: 0,
      response: 2
    }
  },
  {
    id: "req-unillm-3c9f8a",
    timestamp: "2026-08-19T11:51:02Z",
    user: "Robert Oppenheimer",
    email: "oppie@manhattan.gov",
    model: "Claude 3.5 Sonnet",
    provider: "Claude",
    tokensInput: 3200,
    tokensOutput: 1800,
    cost: 0.03660,
    latency: 820,
    cache: "MISS",
    status: 504,
    trace: {
      auth: 3,
      rateLimit: 2,
      policy: 2,
      cache: 1,
      router: 5,
      provider: 805,
      response: 2
    }
  },
  {
    id: "req-unillm-2e4d9c",
    timestamp: "2026-08-19T11:48:19Z",
    user: "Ada Lovelace",
    email: "ada@diffengine.org",
    model: "DeepSeek V3",
    provider: "DeepSeek",
    tokensInput: 12000,
    tokensOutput: 1500,
    cost: 0.00210,
    latency: 295,
    cache: "MISS",
    status: 200,
    trace: {
      auth: 4,
      rateLimit: 1,
      policy: 2,
      cache: 2,
      router: 4,
      provider: 279,
      response: 3
    }
  },
  {
    id: "req-unillm-8f7b1e",
    timestamp: "2026-08-19T11:42:01Z",
    user: "Gordon Freeman",
    email: "gordon@blackmesa.res",
    model: "GPT-4o Mini",
    provider: "OpenAI",
    tokensInput: 6500,
    tokensOutput: 890,
    cost: 0.00151,
    latency: 142,
    cache: "MISS",
    status: 200,
    trace: {
      auth: 2,
      rateLimit: 1,
      policy: 1,
      cache: 1,
      router: 4,
      provider: 131,
      response: 2
    }
  },
  {
    id: "req-unillm-4a3b6c",
    timestamp: "2026-08-19T11:39:10Z",
    user: "Robert Oppenheimer",
    email: "oppie@manhattan.gov",
    model: "Llama 3 70B (Groq)",
    provider: "Groq",
    tokensInput: 3200,
    tokensOutput: 1800,
    cost: 0.00331,
    latency: 68,
    cache: "MISS",
    status: 200,
    trace: {
      auth: 3,
      rateLimit: 2,
      policy: 1,
      cache: 1,
      router: 3,
      provider: 56,
      response: 2
    }
  }
];

export const mockEmployees = [
  {
    id: "emp-1",
    name: "Sarah Connor",
    email: "sarah@cyberdyne.org",
    role: "Owner",
    team: "Engineering",
    requests: 12450,
    tokens: 15400000,
    spend: 235.40,
    limit: 500.00,
    lastActive: "2026-08-19T11:58:32Z",
    status: "Active"
  },
  {
    id: "emp-2",
    name: "Gordon Freeman",
    email: "gordon@blackmesa.res",
    role: "Admin",
    team: "Engineering",
    requests: 8430,
    tokens: 9200000,
    spend: 112.10,
    limit: 300.00,
    lastActive: "2026-08-19T11:42:01Z",
    status: "Active"
  },
  {
    id: "emp-3",
    name: "Robert Oppenheimer",
    email: "oppie@manhattan.gov",
    role: "Developer",
    team: "Product",
    requests: 24500,
    tokens: 42000000,
    spend: 489.60,
    limit: 500.00,
    lastActive: "2026-08-19T11:51:02Z",
    status: "Active"
  },
  {
    id: "emp-4",
    name: "Ada Lovelace",
    email: "ada@diffengine.org",
    role: "Developer",
    team: "Product",
    requests: 4520,
    tokens: 31000000,
    spend: 85.20,
    limit: 200.00,
    lastActive: "2026-08-19T11:48:19Z",
    status: "Active"
  },
  {
    id: "emp-5",
    name: "John Doe",
    email: "john.doe@unillm.com",
    role: "Manager",
    team: "Marketing",
    requests: 1230,
    tokens: 1800000,
    spend: 18.50,
    limit: 100.00,
    lastActive: "2026-08-19T11:56:15Z",
    status: "Active"
  },
  {
    id: "emp-6",
    name: "Barney Calhoun",
    email: "barney@blackmesa.res",
    role: "Viewer",
    team: "HR",
    requests: 50,
    tokens: 80000,
    spend: 1.10,
    limit: 20.00,
    lastActive: "2026-08-18T16:22:00Z",
    status: "Suspended"
  }
];

export const mockTeams = [
  {
    id: "team-eng",
    name: "Engineering",
    memberCount: 12,
    requests: 128450,
    tokens: 148000000,
    spend: 1850.40,
    budget: 3000.00
  },
  {
    id: "team-prod",
    name: "Product",
    memberCount: 8,
    requests: 98500,
    tokens: 95000000,
    spend: 1240.20,
    budget: 2000.00
  },
  {
    id: "team-mkt",
    name: "Marketing",
    memberCount: 4,
    requests: 5400,
    tokens: 6500000,
    spend: 64.80,
    budget: 250.00
  },
  {
    id: "team-hr",
    name: "HR",
    memberCount: 2,
    requests: 350,
    tokens: 420000,
    spend: 4.25,
    budget: 50.00
  }
];

export const mockPolicies = [
  {
    id: "pol-1",
    name: "Max Latency Optimization",
    scope: "Organization",
    type: "Routing Rule",
    status: "Active",
    created: "2026-05-12",
    lastModified: "2026-08-01",
    details: "IF Latency > 2s THEN Fallback to Groq Llama 3."
  },
  {
    id: "pol-2",
    name: "Engineering Monthly Spend Cap",
    scope: "Team (Engineering)",
    type: "Spending Limit",
    status: "Active",
    created: "2026-06-01",
    lastModified: "2026-06-01",
    details: "Limit monthly spend to $3,000.00. Action: Block requests & Notify Admin."
  },
  {
    id: "pol-3",
    name: "Llama 3 Preference for Easy Tasks",
    scope: "Organization",
    type: "Model Restriction",
    status: "Active",
    created: "2026-07-20",
    lastModified: "2026-08-15",
    details: "IF Task Complexity = Low THEN Route to Groq Llama 3."
  },
  {
    id: "pol-4",
    name: "Marketing Rate Limit",
    scope: "Team (Marketing)",
    type: "Rate Limit",
    status: "Active",
    created: "2026-08-10",
    lastModified: "2026-08-10",
    details: "Max 30 requests/minute. Action: Warn user."
  },
  {
    id: "pol-5",
    name: "Claude Outage Auto-failover",
    scope: "Organization",
    type: "Routing Rule",
    status: "Active",
    created: "2026-08-18",
    lastModified: "2026-08-18",
    details: "IF Claude Status = Degraded/Outage THEN Failover to GPT-4o."
  }
];

export const mockAuditLogs = [
  {
    id: "aud-109",
    timestamp: "2026-08-19T11:51:02Z",
    actor: "Robert Oppenheimer",
    action: "Requested Claude 3.5 Sonnet (Failed: Timeout)",
    resource: "Model: Claude 3.5 Sonnet",
    status: "Failed"
  },
  {
    id: "aud-108",
    timestamp: "2026-08-19T11:32:15Z",
    actor: "Gordon Freeman (Admin)",
    action: "Rotated API Key 'Cyberdyne Prod'",
    resource: "API Key Management",
    status: "Success"
  },
  {
    id: "aud-107",
    timestamp: "2026-08-19T10:14:40Z",
    actor: "Sarah Connor (Owner)",
    action: "Created Rule 'Claude Outage Auto-failover'",
    resource: "Policies",
    status: "Success"
  },
  {
    id: "aud-106",
    timestamp: "2026-08-19T09:05:12Z",
    actor: "Gordon Freeman (Admin)",
    action: "Updated Team Limits: 'Marketing'",
    resource: "Limits Management",
    status: "Success"
  },
  {
    id: "aud-105",
    timestamp: "2026-08-18T17:40:00Z",
    actor: "Sarah Connor (Owner)",
    action: "Suspended Employee 'Barney Calhoun'",
    resource: "Employee Management",
    status: "Success"
  }
];

export const mockAlerts = [
  {
    id: "alt-1",
    type: "provider",
    severity: "warning",
    title: "Claude Performance Degraded",
    message: "Anthropic Claude API experiencing higher latency than average. Failovers active.",
    timestamp: "12 mins ago",
    read: false
  },
  {
    id: "alt-2",
    type: "budget",
    severity: "critical",
    title: "Engineering Budget at 92%",
    message: "Engineering spent $1,850.40 against their $2,000.00 soft limit.",
    timestamp: "1 hour ago",
    read: false
  },
  {
    id: "alt-3",
    type: "security",
    severity: "info",
    title: "New API Key Created",
    message: "Sarah Connor created API Key 'Cyberdyne Live Gateway Key'.",
    timestamp: "2 hours ago",
    read: true
  }
];

export const mockApiKeys = [
  {
    id: "key-1",
    name: "Cyberdyne Prod API Key",
    created: "2026-04-10",
    lastUsed: "2026-08-19T11:58:32Z",
    requests: 489500,
    status: "Active",
    value: "sk-unillm-live-cyb840s93nf820sks8e2n"
  },
  {
    id: "key-2",
    name: "Sarah Development Key",
    created: "2026-05-15",
    lastUsed: "2026-08-19T11:05:40Z",
    requests: 25400,
    status: "Active",
    value: "sk-unillm-dev-sar840sn82js9s81nd8e"
  },
  {
    id: "key-3",
    name: "Staging Pipeline Router",
    created: "2026-06-20",
    lastUsed: "2026-08-19T10:45:00Z",
    requests: 120400,
    status: "Active",
    value: "sk-unillm-stage-pipe940sjf83js82nsle"
  },
  {
    id: "key-4",
    name: "Legacy Test Key (Deprecated)",
    created: "2026-01-05",
    lastUsed: "2026-03-12T14:30:00Z",
    requests: 450,
    status: "Revoked",
    value: "sk-unillm-rev-test002kfj83ns82ldoe"
  }
];

export const mockDashboardMetrics = {
  requestsToday: 32450,
  requestsChange: 14.8,
  tokensUsedToday: 42800000,
  tokensChange: 8.2,
  spendToday: 359.85,
  spendChange: 11.4,
  averageLatency: 284,
  latencyChange: -4.5,
  successRate: 99.85,
  successRateChange: 0.05
};

export const mockCacheMetrics = {
  hitRate: 24.8,
  requestsSaved: 80540,
  tokensSaved: 104500000,
  costSaved: 954.80,
  cachedItems: [
    { query: "List all items on the agenda for today's meeting", hits: 452, lastUsed: "2026-08-19T11:53:40Z", tokens: 420, costSaved: 0.125 },
    { query: "How to initialize git repository and add remote?", hits: 320, lastUsed: "2026-08-19T11:45:10Z", tokens: 840, costSaved: 0.380 },
    { query: "What is the capital of France?", hits: 1840, lastUsed: "2026-08-19T11:32:00Z", tokens: 85, costSaved: 0.185 },
    { query: "Generate a standard boilerplate for Express server", hits: 110, lastUsed: "2026-08-19T11:21:05Z", tokens: 1540, costSaved: 0.850 }
  ]
};

export const payAsYouGoCredits = {
  purchased: 500.00,
  used: 359.85,
  remaining: 140.15,
  lastPurchaseDate: "2026-08-01",
  paymentMethod: "Visa ending in 4242"
};
