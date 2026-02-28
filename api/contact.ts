import type { VercelRequest, VercelResponse } from '@vercel/node';
import { drizzle } from 'drizzle-orm/node-postgres';
import { pgTable, text, serial, timestamp } from 'drizzle-orm/pg-core';
import pg from 'pg';
import nodemailer from 'nodemailer';
import { z } from 'zod';

const { Pool } = pg;

// Define contactMessages table inline
const contactMessages = pgTable('contact_messages', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  message: z.string().min(1),
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    if (!process.env.DATABASE_URL) {
      return res.status(500).json({ message: 'DATABASE_URL not configured' });
    }

    const input = contactSchema.parse(req.body);

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle(pool);

    const [message] = await db.insert(contactMessages).values(input).returning();

    // Send email notification
    if (process.env.GMAIL_APP_PASSWORD) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'work.uma26@gmail.com',
          pass: process.env.GMAIL_APP_PASSWORD,
        },
      });

      await transporter.sendMail({
        from: 'work.uma26@gmail.com',
        to: 'work.uma26@gmail.com',
        subject: `New Portfolio Message from ${input.name}`,
        text: `Name: ${input.name}\nEmail: ${input.email}\n\nMessage:\n${input.message}`,
      });
    }

    await pool.end();
    return res.status(201).json(message);
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Invalid input',
        field: error.errors[0].path.join('.'),
      });
    }
    console.error('Error submitting contact:', error);
    return res.status(500).json({ message: error.message || 'Internal server error' });
  }
}
