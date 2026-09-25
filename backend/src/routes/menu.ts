import { Router } from 'express';
import { prisma } from '../db';
import { requireAdmin } from '../middleware/auth';

const router = Router();

// Public: fetch all cocktails for the frontend Menu page
router.get('/menu', async (req, res) => {
  try {
    const menu = await prisma.cocktailItem.findMany({
      orderBy: [{ category: 'asc' }, { order: 'asc' }],
    });
    res.json(menu);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch the menu' });
  }
});

// Admin: add a new cocktail
router.post('/admin/menu', requireAdmin, async (req, res) => {
  try {
    const { name, description, category, price, imageUrl, isPromo, order } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: 'name and description are required' });
    }

    const newCocktail = await prisma.cocktailItem.create({
      data: {
        name,
        description,
        category: category === 'NON_ALCOHOLIC' ? 'NON_ALCOHOLIC' : 'ALCOHOLIC',
        price: price ?? null,
        imageUrl: imageUrl || null,
        isPromo: isPromo || false,
        order: order ?? 0,
      },
    });

    res.status(201).json(newCocktail);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create cocktail' });
  }
});

// Admin: update a cocktail
router.put('/admin/menu/:id', requireAdmin, async (req, res) => {
  const { name, description, category, price, imageUrl, isPromo, order } = req.body;
  const id = String(req.params.id);
  try {
    const updated = await prisma.cocktailItem.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(category !== undefined && {
          category: category === 'NON_ALCOHOLIC' ? 'NON_ALCOHOLIC' : 'ALCOHOLIC',
        }),
        ...(price !== undefined && { price }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(isPromo !== undefined && { isPromo: Boolean(isPromo) }),
        ...(order !== undefined && { order }),
      },
    });
    res.json(updated);
  } catch {
    res.status(404).json({ error: 'Cocktail not found' });
  }
});

// Admin: delete a cocktail
router.delete('/admin/menu/:id', requireAdmin, async (req, res) => {
  const id = String(req.params.id);
  try {
    await prisma.cocktailItem.delete({ where: { id } });
    res.status(204).end();
  } catch {
    res.status(404).json({ error: 'Cocktail not found' });
  }
});

export default router;
