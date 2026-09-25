// backend/src/index.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import path from 'path';

import authRoutes from './routes/auth';
import contactRoutes from './routes/contact';
import packagesRoutes from './routes/packages';
import menuRoutes from './routes/menu';
import galleryRoutes from './routes/gallery';
import { apiLimiter } from './middleware/rateLimit';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Required for express-rate-limit to see the real client IP (not the proxy's)
// when deployed behind a reverse proxy/load balancer, as most hosts use.
app.set('trust proxy', 1);

app.use(
  helmet({
    // The frontend and this API are on different origins, and the frontend
    // loads gallery images directly from here — helmet's default
    // same-origin resource policy would block that image loading.
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json({ limit: '100kb' }));
app.use(cookieParser());
app.use('/api', apiLimiter);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// ----------------------------------------
// API ENDPOINTS
// ----------------------------------------

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date() });
});

app.use('/api/auth', authRoutes);
app.use('/api', contactRoutes);
app.use('/api', packagesRoutes);
app.use('/api', menuRoutes);
app.use('/api', galleryRoutes);

// ----------------------------------------
// Centralized error handler (Express 5 auto-forwards async rejections here)
// ----------------------------------------
app.use((err: Error, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server executing on http://localhost:${PORT}`);
});
