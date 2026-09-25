import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import crypto from 'crypto';
import fs from 'fs/promises';
import { prisma } from '../db';
import { requireAdmin } from '../middleware/auth';
import { cloudinary, cloudinaryEnabled } from '../lib/cloudinary';

const router = Router();

const UPLOADS_DIR = path.join(__dirname, '..', '..', 'uploads');

// Cloudinary uploads are streamed from memory; local-disk uploads (dev
// fallback when CLOUDINARY_URL isn't set) are written straight to /uploads.
const storage = cloudinaryEnabled
  ? multer.memoryStorage()
  : multer.diskStorage({
      destination: (req, file, cb) => cb(null, UPLOADS_DIR),
      filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${crypto.randomUUID()}${ext}`);
      },
    });

const upload = multer({
  storage,
  limits: { fileSize: 8 * 1024 * 1024 }, // 8MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('Only image files are allowed'));
    }
    cb(null, true);
  },
});

function uploadToCloudinary(buffer: Buffer): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: 'kigali-luxury-cocktails/gallery' },
      (error, result) => {
        if (error || !result) return reject(error ?? new Error('Cloudinary upload failed'));
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
}

// Public: fetch admin-added gallery images
router.get('/gallery', async (req, res) => {
  const images = await prisma.galleryImage.findMany({ orderBy: { order: 'asc' } });
  res.json(images);
});

// Admin: upload a new gallery image
router.post('/admin/gallery', requireAdmin, upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'An image file is required' });
  }
  try {
    let url: string;
    let publicId: string | null = null;

    if (cloudinaryEnabled) {
      const uploaded = await uploadToCloudinary(req.file.buffer);
      url = uploaded.url;
      publicId = uploaded.publicId;
    } else {
      url = `/uploads/${req.file.filename}`;
    }

    const created = await prisma.galleryImage.create({
      data: {
        url,
        publicId,
        caption: req.body.caption || null,
        order: req.body.order ? Number(req.body.order) : 0,
      },
    });
    res.status(201).json(created);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save gallery image' });
  }
});

// Admin: delete a gallery image
router.delete('/admin/gallery/:id', requireAdmin, async (req, res) => {
  const id = String(req.params.id);
  try {
    const deleted = await prisma.galleryImage.delete({ where: { id } });
    if (deleted.publicId) {
      await cloudinary.uploader.destroy(deleted.publicId).catch(() => {
        // remote file already gone — not fatal
      });
    } else {
      const filePath = path.join(UPLOADS_DIR, path.basename(deleted.url));
      await fs.unlink(filePath).catch(() => {
        // file already gone or was never local — not fatal
      });
    }
    res.status(204).end();
  } catch {
    res.status(404).json({ error: 'Image not found' });
  }
});

export default router;
