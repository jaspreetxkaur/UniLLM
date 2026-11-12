import jwt from 'jsonwebtoken';

export const demoController = {
  /**
   * Educational demonstration endpoint for Express.js Request Lifecycle
   * GET /api/demo/request-lifecycle
   */
  getRequestLifecycle: (req, res) => {
    const endNs = process.hrtime.bigint();
    const durationMs = req._startNs ? Number(endNs - req._startNs) / 1e6 : 0;

    // Check optional authentication token without rejecting unauthenticated calls
    let authStatus = {
      authenticated: false,
      authMechanism: 'None (Unauthenticated / Public demo probe)',
      userRole: 'guest'
    };

    try {
      const authHeader = req.headers.authorization;
      const cookieToken = req.cookies && req.cookies.unillm_token;
      let token = null;

      if (authHeader && authHeader.startsWith('Bearer ')) {
        token = authHeader.split(' ')[1];
        authStatus.authMechanism = 'HTTP Authorization Header (Bearer JWT)';
      } else if (cookieToken) {
        token = cookieToken;
        authStatus.authMechanism = 'httpOnly Session Cookie (unillm_token)';
      }

      if (token) {
        const decoded = jwt.verify(
          token,
          process.env.JWT_SECRET || 'unillm_super_secret_jwt_key_development_2026'
        );
        authStatus.authenticated = true;
        authStatus.userRole = req.user?.role || 'verified_token_holder';
      }
    } catch (_) {
      authStatus.authMechanism = 'Invalid or expired token detected';
    }

    const stages = [
      {
        stage: 1,
        name: 'TCP/HTTP Ingress & Connection Parsing',
        description: 'Node.js native http.Server receives the raw TCP connection, parses HTTP headers (Method, URL, Protocol), and delegates to Express application listener.',
        details: {
          method: req.method,
          path: req.path,
          protocol: req.protocol.toUpperCase(),
          httpVersion: req.httpVersion,
          hasKeepAlive: req.headers.connection === 'keep-alive'
        }
      },
      {
        stage: 2,
        name: 'Application-Level Middleware Stack',
        description: 'Express processes global middleware registered with app.use(): express.json() parses JSON bodies, express.urlencoded() parses form payloads, and cookieParser() parses HTTP cookies into req.cookies.',
        details: {
          jsonBodyParserActive: true,
          cookieCount: Object.keys(req.cookies || {}).length,
          queryParamCount: Object.keys(req.query || {}).length
        }
      },
      {
        stage: 3,
        name: 'Security & Rate Limiting Guards',
        description: 'Express-rate-limit validates IP request frequency to prevent abuse before reaching downstream business logic.',
        details: {
          rateLimiterActive: true,
          status: 'Allowed (within threshold limits)'
        }
      },
      {
        stage: 4,
        name: 'Authentication Guard (AuthN)',
        description: 'Authentication middleware inspects the Authorization header or session cookies to resolve and verify the caller identity.',
        details: authStatus
      },
      {
        stage: 5,
        name: 'Authorization & RBAC Guard (AuthZ)',
        description: 'Role-based access control (requireRole) verifies whether the resolved identity has permissions to access the target route.',
        details: {
          requiredRole: 'Public/Educational (No elevated role required for demonstration)',
          status: 'Authorized'
        }
      },
      {
        stage: 6,
        name: 'Router Matching & Controller Execution',
        description: 'Express matches the route pattern (GET /api/demo/request-lifecycle) and executes the controller handler to formulate the payload.',
        details: {
          router: 'demoRoutes.js',
          controller: 'demoController.getRequestLifecycle',
          status: 'Executing handler'
        }
      },
      {
        stage: 7,
        name: 'Response Serialization & Stream Flush',
        description: 'The controller calls res.status(200).json(...) which serializes the payload to JSON, computes Content-Length and Content-Type headers, flushes the HTTP response buffer, and closes the request stream.',
        details: {
          statusCode: 200,
          contentType: 'application/json; charset=utf-8',
          elapsedMs: parseFloat(durationMs.toFixed(3))
        }
      }
    ];

    return res.status(200).json({
      success: true,
      title: 'Express.js Request-Response Lifecycle Demonstration',
      totalExecutionTimeMs: parseFloat(durationMs.toFixed(3)),
      architecture: {
        server: 'Node.js http.Server + Express 4.x',
        middlewarePattern: 'Chain of Responsibility (next())',
        errorHandler: '4-argument centralized middleware (err, req, res, next)'
      },
      stages
    });
  }
};
