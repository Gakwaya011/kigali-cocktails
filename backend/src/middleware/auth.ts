import type { Request, Response, NextFunction } from 'express';
import { verifyAuthToken } from '../lib/jwt';
import { prisma } from '../db';

const COOKIE_NAME = 'klc_auth';

declare global {
  namespace Express {
    interface Request {
      user?: { userId: string; role: 'USER' | 'ADMIN' };
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.[COOKIE_NAME];
  if (!token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  try {
    req.user = verifyAuthToken(token);
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired session' });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  requireAuth(req, res, () => {
    // Check the live DB role rather than the role embedded in the token:
    // the token's role is a snapshot from login time, so if an account is
    // promoted to admin after that, an already-issued token would otherwise
    // stay locked out of admin routes until it happens to be reissued.
    prisma.user
      .findUnique({ where: { id: req.user!.userId }, select: { role: true } })
      .then((dbUser) => {
        if (dbUser?.role !== 'ADMIN') {
          return res.status(403).json({ error: 'Admin access required' });
        }
        next();
      })
      .catch(next);
  });
}

export { COOKIE_NAME };
