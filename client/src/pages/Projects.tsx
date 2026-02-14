import { motion } from "framer-motion";
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16 text-center"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Projects</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work, side projects, and experiments with new technologies.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 bg-secondary/30 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects?.map((project, idx) => (
              <ProjectCard key={project.id} project={project} index={idx} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
