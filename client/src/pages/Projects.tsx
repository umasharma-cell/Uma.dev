import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useProjects } from "@/hooks/use-portfolio";
import { ProjectCard } from "@/components/ProjectCard";

export default function Projects() {
  const { data: projects, isLoading } = useProjects();

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <AnimatedBackground />

      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="mb-16 text-center"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4"
          >
            Portfolio
          </motion.span>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, side projects, and experiments with new technologies.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <motion.div
                key={i}
                className="h-96 bg-secondary/30 rounded-2xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 text-center"
        >
          <motion.a
            href="https://github.com/umasharma-cell"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-purple-500 text-white rounded-full font-bold text-lg shadow-lg shadow-primary/25"
            whileHover={{ scale: 1.05, y: -4, boxShadow: "0 20px 40px rgba(124, 58, 237, 0.3)" }}
            whileTap={{ scale: 0.97 }}
          >
            <Github className="w-6 h-6" />
            View All Projects on GitHub
            <ExternalLink className="w-5 h-5" />
          </motion.a>
          <p className="mt-4 text-muted-foreground">
            Explore more of my work and open source contributions
          </p>
        </motion.div>
      </div>
    </div>
  );
}
