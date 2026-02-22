import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

import nodemailer from "nodemailer";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Create transporter for email notifications
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'work.uma26@gmail.com',
      // User will need to provide an App Password for this to work
      pass: process.env.GMAIL_APP_PASSWORD 
    }
  });

  // === API ROUTES ===

  app.get(api.skills.list.path, async (_req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  app.get(api.experiences.list.path, async (_req, res) => {
    const experiences = await storage.getExperiences();
    res.json(experiences);
  });

  app.get(api.projects.list.path, async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      
      // Send email notification
      if (process.env.GMAIL_APP_PASSWORD) {
        const mailOptions = {
          from: 'work.uma26@gmail.com',
          to: 'work.uma26@gmail.com',
          subject: `New Portfolio Message from ${input.name}`,
          text: `Name: ${input.name}\nEmail: ${input.email}\n\nMessage:\n${input.message}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error('Error sending email:', error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      }

      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: "Invalid input",
          field: err.errors[0].path.join('.')
        });
        return;
      }
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // === SEED DATA ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingSkills = await storage.getSkills();
  if (existingSkills.length === 0) {
    console.log("Seeding database...");
    
    // Skills
    const skillsData = [
      { name: "JavaScript (ES6+)", category: "Frontend", proficiency: 95, icon: "SiJavascript", yearsOfExp: 2 },
      { name: "React.js", category: "Frontend", proficiency: 90, icon: "SiReact", yearsOfExp: 2 },
      { name: "Next.js", category: "Frontend", proficiency: 85, icon: "SiNextdotjs", yearsOfExp: 2 },
      { name: "Redux", category: "Frontend", proficiency: 85, icon: "SiRedux", yearsOfExp: 2 },
      { name: "Tailwind CSS", category: "Frontend", proficiency: 90, icon: "SiTailwindcss", yearsOfExp: 2 },
      { name: "Node.js", category: "Backend", proficiency: 85, icon: "SiNodedotjs", yearsOfExp: 1.5 },
      { name: "Express.js", category: "Backend", proficiency: 85, icon: "SiExpress", yearsOfExp: 1.5 },
      { name: "MongoDB", category: "Database", proficiency: 85, icon: "SiMongodb", yearsOfExp: 1.5 },
      { name: "Supabase", category: "Database", proficiency: 80, icon: "SiSupabase", yearsOfExp: 1.5 },
      { name: "AWS EC2", category: "Cloud", proficiency: 75, icon: "SiAmazonwebservices", yearsOfExp: 1.5 },
      { name: "Gemini LLM", category: "AI/LLM", proficiency: 85, icon: "SiGoogle", yearsOfExp: 1.5 },
      { name: "Claude API", category: "AI/LLM", proficiency: 85, icon: "SiAntdesign", yearsOfExp: 1.5 },
      { name: "OpenAI API", category: "AI/LLM", proficiency: 85, icon: "SiOpenai", yearsOfExp: 1.5 },
      { name: "Cursor AI", category: "AI/LLM", proficiency: 90, icon: "SiVisualstudiocode", yearsOfExp: 1.5 },
      { name: "Agentic Coding", category: "AI/LLM", proficiency: 85, icon: "FaRobot", yearsOfExp: 1.5 }
    ];

    for (const s of skillsData) {
      // Always update skills to ensure correct values
      const existing = await storage.getSkills();
      const found = existing.find(sk => sk.name === s.name);
      if (!found) {
        await storage.createSkill(s);
      } else {
        // Update existing skill
        await db.update(skills).set(s).where(eq(skills.id, found.id));
      }
    }

    // Experience
    const experienceData = [
      {
        role: "AI Product Engineer [Full Stack]",
        company: "Colligence Research",
        duration: "Jan 2025 – Present",
        location: "Bangalore, INDIA",
        description: JSON.stringify([
          "Developed a real-time AI-based avatar generation system for Circle App.",
          "Implemented multi-account isolated user profile pictures with AI-powered passport photo generation.",
          "Integrated Gemini LLM to automate image-to-avatar transformation with dynamic motion rendering.",
          "Maintained seamless real-time avatar consistency across macOS, Android, and web environments."
        ])
      },
      {
        role: "Full Stack Trainee",
        company: "Masai School",
        duration: "June 2024 – Nov 2024",
        location: "Remote",
        description: JSON.stringify([
          "Developed Aabhar, a full-stack crowdfunding platform supporting campaign creation and contributions.",
          "Implemented frontend features using React Router, Hooks, and Tailwind CSS with clean component architecture.",
          "Built backend APIs using Node.js and Express with MongoDB integration."
        ])
      }
    ];

    for (const e of experienceData) {
      const existing = await storage.getExperiences();
      const found = existing.find(ex => ex.company === e.company && ex.role === e.role);
      if (!found) {
        await storage.createExperience(e);
      } else {
        await db.update(experiences).set(e).where(eq(experiences.id, found.id));
      }
    }

    // Projects
    const projectsData = [
      {
        title: "Staffly",
        description: "AI-Powered HR Management system that revolutionizes workforce management with intelligent automation and data-driven insights.",
        techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
        link: "https://staffly-sooty.vercel.app/",
        githubLink: "https://github.com/umasharma-cell/Staffly",
        imageUrl: "/attached_assets/screenshot-1771738039004.png"
      },
      {
        title: "Aabhar",
        description: "Empowering lives through crowdfunding. A platform connecting people in need with generous donors for medical aid and education.",
        techStack: ["React", "Firebase", "Tailwind CSS", "Framer Motion"],
        link: "https://aabhar-2.netlify.app/",
        githubLink: "https://github.com/Chandrikavishwas/TheAabhar",
        imageUrl: "/attached_assets/screenshot-1771738200639.png"
      },
      {
        title: "PetCare AI",
        description: "AI healthcare system for pets. Understands user queries, provides quick fixes, and handles appointment bookings with doctors.",
        techStack: ["MERN Stack", "Google Gemini API", "SDK", "Context Support"],
        link: "https://petdoc-chat.vercel.app/",
        githubLink: "https://github.com/umasharma-cell/Veterinary-Chatbot",
        imageUrl: "/attached_assets/screenshot-1771738209356.png"
      },
      {
        title: "Smart Book",
        description: "AI-based bookmark manager to save, organize, and sync your bookmarks across devices with intelligent categorization.",
        techStack: ["Next.js", "Supabase", "Tailwind CSS", "AI"],
        link: "https://smart-book-psi.vercel.app/",
        githubLink: "https://github.com/umasharma-cell/smart_book",
        imageUrl: "/attached_assets/screenshot-1771739649923.png"
      },
      {
        title: "Expense Tracker",
        description: "Personal expense management tool to track and manage your expenses efficiently with detailed history and filtering.",
        techStack: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
        link: "https://expense-tracc.vercel.app/",
        githubLink: "https://github.com/umasharma-cell/Project_101",
        imageUrl: "/attached_assets/screenshot-1771739657400.png"
      }
    ];

    for (const p of projectsData) {
      const existing = await storage.getProjects();
      const found = existing.find(proj => proj.title === p.title);
      if (!found) {
        await storage.createProject(p);
      } else {
        await db.update(projects).set(p).where(eq(projects.id, found.id));
      }
    }

    console.log("Database seeded successfully!");
  }
}
