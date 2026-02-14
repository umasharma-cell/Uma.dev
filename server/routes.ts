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
      },
      {
        role: "Frontend Intern",
        company: "Minzor Pvt Ltd",
        duration: "August 2023 – October 2023",
        location: "Remote",
        description: JSON.stringify([
          "Contributed to the development of UniMart, a real-time e-commerce web application.",
          "Proficient in HTML, semantic elements, forms validation, and local storage.",
          "Integrated Firebase authentication and data handling.",
          "Collaborated with a team to improve UI performance and cross-browser compatibility."
        ])
      }
    ];

    for (const e of experienceData) {
      await storage.createExperience(e);
    }

    // Projects
    const projectsData = [
      {
        title: "Staffly — HRMS",
        description: "Full-stack HRMS application to manage employees, roles, attendance, and organizational data. Features secure REST APIs and role-based access control.",
        techStack: ["Node.js", "Express", "React", "Tailwind CSS"],
        link: "#",
        githubLink: "#"
      },
      {
        title: "Aabhar Crowdfunding",
        description: "Crowdfunding platform enabling users to create campaigns and support causes in real time. Focused on scalability, clean UI design, and secure API interactions.",
        techStack: ["React", "Node.js", "Express", "MongoDB"],
        link: "#",
        githubLink: "#"
      },
      {
        title: "Circle App AI Avatar",
        description: "Real-time AI-based avatar generation system improving user engagement through animated avatars. Integrated Gemini LLM for dynamic motion.",
        techStack: ["Gemini LLM", "React", "Node.js", "AI"],
        link: "#",
        githubLink: "#"
      }
    ];

    for (const p of projectsData) {
      await storage.createProject(p);
    }

    console.log("Database seeded successfully!");
  }
}
