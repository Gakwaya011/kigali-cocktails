import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../db';
import { signAuthToken } from '../lib/jwt';
import { requireAuth, COOKIE_NAME } from '../middleware/auth';
import { authLimiter } from '../middleware/rateLimit';

const router = Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// In production, frontend and backend are on different real domains over HTTPS,
// so the cookie needs SameSite=None + Secure to be sent cross-site at all.
// Locally, both run on http://localhost (different ports only, same site), where
// SameSite=None without Secure is rejected by browsers — Lax works fine there instead.
const isProd = process.env.NODE_ENV === 'production';
const cookieOptions = {
  httpOnly: true,
  secure: isProd,
  sameSite: (isProd ? 'none' : 'lax') as 'none' | 'lax',
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

// Public sign-up. Always creates a USER-role account — role is never taken
// from the request body, so this can never be used to create an admin.
router.post('/register', authLimiter, async (req, res) => {
  const name = typeof req.body.name === 'string' ? req.body.name.trim() : '';
  const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body.password === 'string' ? req.body.password : '';

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Name, email, and password are required' });
  }
  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ error: 'Enter a valid email address' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ error: 'An account with that email already exists' });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: { name, email, passwordHash, role: 'USER' },
  });

  const token = signAuthToken({ userId: user.id, role: user.role });
  res.cookie(COOKIE_NAME, token, cookieOptions);
  res.status(201).json({ id: user.id, name: user.name, email: user.email, role: user.role });
});

router.post('/login', authLimiter, async (req, res) => {
  const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
  const password = typeof req.body.password === 'string' ? req.body.password : '';
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  const token = signAuthToken({ userId: user.id, role: user.role });
  res.cookie(COOKIE_NAME, token, cookieOptions);
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
});

router.post('/logout', (req, res) => {
  res.clearCookie(COOKIE_NAME, cookieOptions);
  res.json({ ok: true });
});

router.get('/me', requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.user!.userId } });
  if (!user) {
    return res.status(401).json({ error: 'Not authenticated' });
  }
  res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
});

export default router;
