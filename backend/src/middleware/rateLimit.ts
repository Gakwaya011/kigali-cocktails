import rateLimit from 'express-rate-limit';

// Applied to all /api routes as a broad backstop against scripted abuse.
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later.' },
});

// Tighter limit for login/register — the highest-value targets for
// brute-forcing passwords or spamming account creation.
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true, // only count failed attempts against the limit
  message: { error: 'Too many attempts, please try again in a few minutes.' },
});

// Prevents the public contact form from being spammed, while staying loose
// enough that real visitors sharing an IP (office wifi, mobile carrier NAT)
// don't get falsely blocked.
export const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many messages sent, please try again later.' },
});
