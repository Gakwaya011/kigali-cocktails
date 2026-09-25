import { Router } from 'express';
import { prisma } from '../db';
import { requireAdmin } from '../middleware/auth';

const router = Router();

// Public: list packages for the homepage Packages section
router.get('/packages', async (req, res) => {
  const packages = await prisma.bookingPackage.findMany({ orderBy: { order: 'asc' } });
  res.json(packages);
});

// Admin: create a package
router.post('/admin/packages', requireAdmin, async (req, res) => {
  const { title, description, price, features, featured, order } = req.body;
  if (!title || !description || price === undefined) {
    return res.status(400).json({ error: 'title, description, and price are required' });
  }
  try {
    const created = await prisma.bookingPackage.create({
      data: {
        title,
        description,
        price,
        features: Array.isArray(features) ? features : [],
        featured: Boolean(featured),
        order: order ?? 0,
      },
    });
    res.status(201).json(created);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create package' });
  }
});

// Admin: update a package
router.put('/admin/packages/:id', requireAdmin, async (req, res) => {
  const { title, description, price, features, featured, order } = req.body;
  const id = String(req.params.id);
  try {
    const updated = await prisma.bookingPackage.update({
      where: { id },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price }),
        ...(features !== undefined && { features }),
        ...(featured !== undefined && { featured: Boolean(featured) }),
        ...(order !== undefined && { order }),
      },
    });
    res.json(updated);
  } catch {
    res.status(404).json({ error: 'Package not found' });
  }
});

// Admin: delete a package
router.delete('/admin/packages/:id', requireAdmin, async (req, res) => {
  const id = String(req.params.id);
  try {
    await prisma.bookingPackage.delete({ where: { id } });
    res.status(204).end();
  } catch {
    res.status(404).json({ error: 'Package not found' });
  }
});

export default router;
