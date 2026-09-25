import { v2 as cloudinary } from 'cloudinary';

// The SDK auto-configures itself from CLOUDINARY_URL if it's set in the
// environment — no explicit cloudinary.config() call needed.
export const cloudinaryEnabled = Boolean(process.env.CLOUDINARY_URL);

export { cloudinary };
