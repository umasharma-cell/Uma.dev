import type { VercelRequest, VercelResponse } from '@vercel/node';
import { drizzle } from 'drizzle-orm/node-postgres';
import { pgTable, text, serial } from 'drizzle-orm/pg-core';
import pg from 'pg';

const { Pool } = pg;

// Define experiences table inline
const experiences = pgTable('experiences', {
  id: serial('id').primaryKey(),
  role: text('role').notNull(),
  company: text('company').notNull(),
  duration: text('duration').notNull(),
  description: text('description').notNull(),
  location: text('location'),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ message: 'DATABASE_URL not configured' });
    }

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle(pool);
    const result = await db.select().from(experiences);
    await pool.end();

    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Error fetching experiences:', error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}
