import rateLimit from 'express-rate-limit';

// Standard error handler for rate limit violations
const rateLimitHandler = (message, code = 'rate_limit_exceeded') => (req, res) => {
  res.status(429).json({
    error: {
      message,
      type: 'rate_limit_error',
      code
    }
  });
};

/**
 * Authentication Endpoints Rate Limiter
 * Window: 15 minutes
 * Max: 20 attempts per IP
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 20 : 1000,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler('Too many authentication attempts from this IP. Please try again after 15 minutes.', 'auth_rate_limit_exceeded')
});

/**
 * AI Gateway Traffic Rate Limiter
 * Window: 1 minute
 * Max: 120 requests per IP/token
 */
export const gatewayLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  handler: rateLimitHandler('Too many gateway requests. Please throttle your traffic or contact support.', 'gateway_rate_limit_exceeded')
});
