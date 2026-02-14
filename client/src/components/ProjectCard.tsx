import { motion } from "framer-motion";
import { type Project } from "@shared/schema";
import { Github, ExternalLink } from "lucide-react";

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group relative rounded-2xl overflow-hidden bg-secondary/20 border border-white/5 hover:border-primary/50 transition-all duration-300"
    >
      {/* Image Area - Placeholder if no image */}
      <div className="aspect-video bg-secondary/50 overflow-hidden relative">
        {project.imageUrl ? (
          <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-secondary to-background">
            <span className="text-4xl font-display font-bold text-white/10">{project.title[0]}</span>
          </div>
        )}
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.githubLink && (
            <a 
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white rounded-full text-black hover:scale-110 transition-transform"
            >
              <Github className="w-5 h-5" />
            </a>
          )}
          {project.link && (
            <a 
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-primary rounded-full text-white hover:scale-110 transition-transform"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-display font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{project.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span 
              key={tech} 
              className="text-xs px-2 py-1 rounded-md bg-secondary text-secondary-foreground border border-white/5"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
