import { motion } from "framer-motion";
import { Calendar, MapPin, Briefcase } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useExperiences, useSkills } from "@/hooks/use-portfolio";
import { SkillCard } from "@/components/SkillCard";

export default function About() {
  const { data: experiences, isLoading: loadingExp } = useExperiences();
  const { data: skills, isLoading: loadingSkills } = useSkills();

  // Group skills by category
  const skillsByCategory = skills?.reduce((acc, skill) => {
    const category = skill.category || "Other";
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <AnimatedBackground />

      <div className="container mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-8">About Me</h1>
          <div className="prose prose-invert prose-lg max-w-none text-muted-foreground">
            <p className="text-xl text-foreground font-medium mb-6">
              I'm Uma Sharma, a passionate Full Stack Engineer driven by the challenge of building scalable, high-performance web applications.
            </p>
            <p className="mb-4">
              With a strong foundation in the MERN stack and a keen interest in AI/LLM integration, I bridge the gap between complex backend logic and intuitive frontend experiences.
            </p>
            <p>
              My journey involves solving real-world problems through code, optimizing performance, and crafting pixel-perfect interfaces. Whether it's architecting a microservices backend or animating a landing page, I love every part of the process.
            </p>
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-24"
        >
          <h2 className="text-3xl font-display font-bold mb-12 flex items-center gap-3">
            <Briefcase className="text-primary" /> Experience
          </h2>

          <div className="space-y-12 border-l-2 border-primary/20 pl-8 ml-4 md:ml-0">
            {loadingExp ? (
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-secondary rounded w-1/4"></div>
                <div className="h-20 bg-secondary rounded w-full"></div>
              </div>
            ) : (
              experiences?.map((exp, idx) => (
                <motion.div 
                  key={exp.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-primary border-4 border-background" />
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-foreground">{exp.role}</h3>
                    <span className="text-primary font-mono text-sm px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit mt-2 md:mt-0">
                      {exp.duration}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="font-semibold text-white">{exp.company}</span>
                    {exp.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {exp.location}
                      </span>
                    )}
                  </div>

                  <ul className="list-disc list-outside ml-4 space-y-2 text-muted-foreground">
                    {JSON.parse(exp.description).map((point: string, i: number) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Skills Section */}
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-display font-bold mb-12">Technical Skills</h2>
          
          {loadingSkills ? (
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               {[1,2,3,4].map(i => <div key={i} className="h-32 bg-secondary rounded-2xl animate-pulse" />)}
             </div>
          ) : (
            <div className="space-y-16">
              {Object.entries(skillsByCategory || {}).map(([category, catSkills]) => (
                <div key={category}>
                  <h3 className="text-xl text-primary font-bold mb-6 border-b border-white/10 pb-2 inline-block">
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                    {catSkills.map((skill, idx) => (
                      <SkillCard key={skill.id} skill={skill} index={idx} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
