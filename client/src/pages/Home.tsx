import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { SkillCard } from "@/components/SkillCard";
import { ProjectCard } from "@/components/ProjectCard";
import { useSkills, useProjects, useExperiences } from "@/hooks/use-portfolio";
import { useRef } from "react";

// Staggered word reveal animation
const wordAnimation = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: [0.23, 1, 0.32, 1] },
  }),
};

function AnimatedHeading({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={wordAnimation}
          initial="hidden"
          animate="visible"
          className="inline-block mr-[0.3em]"
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function Home() {
  const { data: skills } = useSkills();
  const { data: projects } = useProjects();

  // Featured order: Document Processing, PetCare AI (Veterinary), Aabhar
  const featuredOrder = ["Document Processing", "PetCare AI", "Aabhar"];
  const featuredProjects = projects
    ? featuredOrder
        .map((title) => projects.find((p) => p.title === title))
        .filter(Boolean) as typeof projects
    : [];
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.8], [0, 100]);

  return (
    <div className="min-h-screen">
      <AnimatedBackground />

      {/* Hero Section */}
      <section ref={heroRef} className="min-h-screen flex flex-col items-center justify-center relative px-6 text-center overflow-hidden">
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="max-w-5xl z-10"
        >
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="mb-8 inline-block"
          >
            <span className="px-5 py-2.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium tracking-wide inline-flex items-center gap-2">
              <motion.span
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-4 h-4" />
              </motion.span>
              Available for work
            </span>
          </motion.div>

          {/* Main heading with letter-by-letter animation */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 tracking-tight leading-tight">
            <AnimatedHeading text="Building digital" />
            <br />
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent"
            >
              experiences
            </motion.span>
            <AnimatedHeading text=" that matter." />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            I'm Uma Sharma, a Full Stack Engineer based in Bangalore, specializing in scalable MERN applications and real-time AI solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/projects">
              <motion.span
                className="px-8 py-4 bg-gradient-to-r from-primary to-purple-500 text-white rounded-full font-bold text-lg shadow-lg shadow-primary/25 flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.05, y: -3, boxShadow: "0 20px 40px rgba(124, 58, 237, 0.3)" }}
                whileTap={{ scale: 0.97 }}
              >
                View Projects <ArrowRight className="w-5 h-5" />
              </motion.span>
            </Link>
            <Link href="/contact">
              <motion.span
                className="px-8 py-4 bg-secondary/50 backdrop-blur-sm text-white rounded-full font-bold text-lg border border-white/10 flex items-center gap-2 cursor-pointer"
                whileHover={{ scale: 1.05, y: -3, borderColor: "rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.97 }}
              >
                Contact Me
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Skills Preview */}
      <section className="py-24 px-6 relative z-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            className="text-center mb-16"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4"
            >
              What I work with
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Tech Stack</h2>
            <p className="text-muted-foreground max-w-lg mx-auto">The tools I use to bring ideas to life</p>
          </motion.div>

          {skills ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {skills.slice(0, 10).map((skill, idx) => (
                <SkillCard key={skill.id} skill={skill} index={idx} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center py-20">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"
              />
            </div>
          )}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 px-6 relative z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.03] to-transparent pointer-events-none" />
        <div className="container mx-auto relative">
          <div className="flex justify-between items-end mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4"
              >
                Portfolio
              </motion.span>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Selected Work</h2>
              <p className="text-muted-foreground">Some of my favorite projects</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/projects">
                <motion.span
                  className="hidden md:flex items-center gap-2 text-primary hover:text-accent transition-colors cursor-pointer font-medium"
                  whileHover={{ x: 5 }}
                >
                  View all <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center md:hidden"
          >
            <Link href="/projects" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-medium">
              View all projects <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

        {/* Decorative orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[150px] pointer-events-none"
        />

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-2xl mx-auto relative z-10"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Let's work{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              together
            </span>
          </h2>
          <p className="text-muted-foreground text-lg mb-10">
            Have a project in mind? I'm always open to discussing new opportunities and ideas.
          </p>
          <Link href="/contact">
            <motion.span
              className="inline-block px-10 py-5 bg-white text-black rounded-full font-bold text-xl cursor-pointer"
              whileHover={{ scale: 1.05, y: -4, boxShadow: "0 20px 40px rgba(255,255,255,0.15)" }}
              whileTap={{ scale: 0.97 }}
            >
              Get in Touch
            </motion.span>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
