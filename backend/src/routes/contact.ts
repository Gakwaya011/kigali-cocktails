import { Router } from 'express';
import { prisma } from '../db';
import { requireAdmin } from '../middleware/auth';
import { contactLimiter } from '../middleware/rateLimit';

const router = Router();

// Public: submitted by the Contact form on both the Home page and the Contact page
router.post('/contact', contactLimiter, async (req, res) => {
  const { firstName, lastName, phone, email, message, source } = req.body;
  if (!firstName || !lastName || !message) {
    return res.status(400).json({ error: 'firstName, lastName, and message are required' });
  }

  try {
    const saved = await prisma.contactMessage.create({
      data: {
        firstName,
        lastName,
        phone: phone || null,
        email: email || null,
        message,
        source: source === 'home' || source === 'contact' ? source : 'unknown',
      },
    });
    res.status(201).json(saved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save message' });
  }
});

// Admin: list all messages, newest first
router.get('/admin/messages', requireAdmin, async (req, res) => {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: 'desc' } });
  res.json(messages);
});

// Admin: mark a message read/unread
router.patch('/admin/messages/:id', requireAdmin, async (req, res) => {
  const { read } = req.body;
  const id = String(req.params.id);
  try {
    const updated = await prisma.contactMessage.update({
      where: { id },
      data: { read: Boolean(read) },
    });
    res.json(updated);
  } catch {
    res.status(404).json({ error: 'Message not found' });
  }
});

// Admin: delete a message
router.delete('/admin/messages/:id', requireAdmin, async (req, res) => {
  const id = String(req.params.id);
  try {
    await prisma.contactMessage.delete({ where: { id } });
    res.status(204).end();
  } catch {
    res.status(404).json({ error: 'Message not found' });
  }
});

export default router;
