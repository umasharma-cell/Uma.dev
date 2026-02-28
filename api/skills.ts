import type { VercelRequest, VercelResponse } from '@vercel/node';
import { drizzle } from 'drizzle-orm/node-postgres';
import { pgTable, text, serial, integer, real } from 'drizzle-orm/pg-core';
import pg from 'pg';

const { Pool } = pg;

// Define skills table inline to avoid import issues
const skills = pgTable('skills', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  category: text('category').notNull(),
  proficiency: integer('proficiency').default(100),
  icon: text('icon'),
  yearsOfExp: real('years_of_exp').default(1),
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
    const result = await db.select().from(skills);
    await pool.end();

    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Error fetching skills:', error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}
