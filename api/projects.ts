import type { VercelRequest, VercelResponse } from '@vercel/node';
import { drizzle } from 'drizzle-orm/node-postgres';
import { pgTable, text, serial, jsonb } from 'drizzle-orm/pg-core';
import pg from 'pg';

const { Pool } = pg;

// Define projects table inline
const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  techStack: jsonb('tech_stack').$type<string[]>().notNull(),
  link: text('link'),
  githubLink: text('github_link'),
  imageUrl: text('image_url'),
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
    const result = await db.select().from(projects);
    await pool.end();

    return res.status(200).json(result);
  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}
