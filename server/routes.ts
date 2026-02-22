import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
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
      { name: "Redux", category: "Frontend", proficiency: 85, icon: "SiRedux", yearsOfExp: 2 },
      { name: "Tailwind CSS", category: "Frontend", proficiency: 90, icon: "SiTailwindcss", yearsOfExp: 2 },
      { name: "Node.js", category: "Backend", proficiency: 85, icon: "SiNodedotjs", yearsOfExp: 1 },
      { name: "Express.js", category: "Backend", proficiency: 85, icon: "SiExpress", yearsOfExp: 1 },
      { name: "Java", category: "Backend", proficiency: 75, icon: "FaJava", yearsOfExp: 1 },
      { name: "MongoDB", category: "Database", proficiency: 85, icon: "SiMongodb", yearsOfExp: 1 },
      { name: "MySQL", category: "Database", proficiency: 80, icon: "SiMysql", yearsOfExp: 1 },
      { name: "Firebase", category: "Database", proficiency: 80, icon: "SiFirebase", yearsOfExp: 1 },
      { name: "Supabase", category: "Database", proficiency: 75, icon: "SiSupabase", yearsOfExp: 1 },
      { name: "Gemini LLM", category: "AI/LLM", proficiency: 80, icon: "SiGoogle", yearsOfExp: 1 },
      { name: "OpenAI API", category: "AI/LLM", proficiency: 85, icon: "SiOpenai", yearsOfExp: 1 },
      { name: "Prompt Engineering", category: "AI/LLM", proficiency: 90, icon: "FaBrain", yearsOfExp: 1 }
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
