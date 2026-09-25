// backend/src/db.ts
import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import dotenv from 'dotenv';

// Explicitly ensure environment variables are loaded
dotenv.config();

// 1. Create a native PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// 2. Pass that pool instance into the Prisma driver adapter
const adapter = new PrismaPg(pool);

// 3. Feed the adapter to PrismaClient
export const prisma = new PrismaClient({ adapter });