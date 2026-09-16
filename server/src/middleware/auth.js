import jwt from 'jsonwebtoken';
import prisma from '../lib/prisma.js';

const JWT_SECRET = process.env.JWT_SECRET || 'shramikid_super_secret_jwt_key_2026_bd_secure_token';

/**
 * Authentication Middleware: Validates Bearer token and populates req.user
 */
export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Please provide a valid token.',
      });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: {
        workerProfile: {
          include: {
            skills: true,
            workExperiences: true,
            trainings: true,
          },
        },
        employerProfile: true,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User belonging to this token no longer exists.',
      });
    }

    // Attach sanitized user to request object
    const { passwordHash, ...sanitizedUser } = user;
    req.user = sanitizedUser;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token. Please log in again.',
      });
    }
    return res.status(500).json({
      success: false,
      message: 'Authentication error',
      error: error.message,
    });
  }
};

/**
 * Role-Based Authorization Middleware
 * @param  {...string} allowedRoles (e.g. 'worker', 'employer', 'admin')
 */
export const requireRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required.',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: Access restricted to ${allowedRoles.join(' or ')} role(s).`,
      });
    }

    next();
  };
};

/**
 * Optional Auth Middleware: If token is present, populate req.user; otherwise proceed as guest
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
        include: {
          workerProfile: true,
          employerProfile: true,
        },
      });
      if (user) {
        const { passwordHash, ...sanitizedUser } = user;
        req.user = sanitizedUser;
      }
    }
  } catch (err) {
    // Ignore invalid optional tokens
  }
  next();
};
