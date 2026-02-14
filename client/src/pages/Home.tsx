import { motion } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { SkillCard } from "@/components/SkillCard";
import { ProjectCard } from "@/components/ProjectCard";
import { useSkills, useProjects, useExperiences } from "@/hooks/use-portfolio";

export default function Home() {
  const { data: skills } = useSkills();
  const { data: projects } = useProjects();
  const { data: experiences } = useExperiences();

  const featuredProjects = projects?.slice(0, 3) || [];

  return (
    <div className="min-h-screen">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl z-10"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 inline-block"
          >
            <span className="px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium tracking-wide">
              Available for work
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold mb-6 tracking-tight leading-tight">
            Building digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-accent animate-pulse">
              experiences
            </span> that matter.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            I'm Uma Sharma, a Full Stack Engineer specializing in scalable MERN applications and real-time AI solutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/projects" className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg hover:bg-primary/90 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/25 flex items-center gap-2">
              View Projects <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/contact" className="px-8 py-4 bg-secondary text-white rounded-full font-bold text-lg hover:bg-secondary/80 hover:scale-105 transition-all duration-300 border border-white/5">
              Contact Me
            </Link>
          </div>
        </motion.div>

        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground"
        >
          <ChevronDown className="w-8 h-8" />
        </motion.div>
      </section>

      {/* Skills Preview */}
      <section className="py-24 px-6 relative z-10">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Tech Stack</h2>
            <p className="text-muted-foreground">The tools I use to bring ideas to life</p>
          </motion.div>

          {skills ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {skills.slice(0, 10).map((skill, idx) => (
                <SkillCard key={skill.id} skill={skill} index={idx} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          )}
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 px-6 bg-secondary/10 relative z-10">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-16">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Selected Work</h2>
              <p className="text-muted-foreground">Some of my favorite projects</p>
            </motion.div>
            <Link href="/projects" className="hidden md:flex items-center gap-2 text-primary hover:text-accent transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>

          <div className="mt-12 text-center md:hidden">
            <Link href="/projects" className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors">
              View all projects <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -z-10" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">Let's work together</h2>
          <p className="text-muted-foreground text-lg mb-10">
            Have a project in mind? I'm always open to discussing new opportunities and ideas.
          </p>
          <Link href="/contact" className="px-10 py-5 bg-white text-black rounded-full font-bold text-xl hover:bg-gray-200 hover:scale-105 transition-all duration-300">
            Get in Touch
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
