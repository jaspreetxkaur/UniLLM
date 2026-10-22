/**
 * Role-Based Access Control (RBAC) Middleware Guard
 * Usage: router.put('/budget', authenticateUser, requireRole(['owner', 'admin']), controller.update)
 */
export const requireRole = (allowedRoles = ['owner']) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        error: {
          message: 'Authentication required before checking permissions.',
          type: 'authentication_error',
          code: 'unauthorized'
        }
      });
    }

    const userRole = (req.user.role || '').toLowerCase();
    const normalizedAllowed = allowedRoles.map(r => r.toLowerCase());

    if (!normalizedAllowed.includes(userRole)) {
      return res.status(403).json({
        error: {
          message: `Access denied. Requires one of the following roles: [${allowedRoles.join(', ')}]. Your current role is '${req.user.role}'.`,
          type: 'permission_denied_error',
          code: 'insufficient_permissions'
        }
      });
    }

    next();
  };
};
