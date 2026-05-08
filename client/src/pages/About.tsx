import { motion } from "framer-motion";
import { MapPin, Briefcase } from "lucide-react";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { useExperiences, useSkills } from "@/hooks/use-portfolio";
import { SkillCard } from "@/components/SkillCard";

export default function About() {
  const { data: experiences, isLoading: loadingExp } = useExperiences();
  const { data: skills, isLoading: loadingSkills } = useSkills();

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
        {/* Header with circular photo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-4xl mx-auto mb-24"
        >
          <div className="flex flex-col md:flex-row gap-10 items-center md:items-start">
            {/* Circular photo with animated glowing ring */}
            <div className="flex-shrink-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="relative"
              >
                {/* Animated rotating gradient ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-1 rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, hsl(263 70% 50%), hsl(180 100% 50%), hsl(263 70% 50%))",
                  }}
                />
                {/* Inner black ring to create border effect */}
                <div className="absolute inset-0 rounded-full bg-background m-[2px]" />

                {/* Photo */}
                <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden m-1">
                  <img
                    src="/attached_assets/uma-photo.jpg"
                    alt="Uma Sharma"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Pulsing glow behind */}
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 20px hsla(263, 70%, 50%, 0.3), 0 0 40px hsla(263, 70%, 50%, 0.15)",
                      "0 0 30px hsla(263, 70%, 50%, 0.5), 0 0 60px hsla(263, 70%, 50%, 0.25)",
                      "0 0 20px hsla(263, 70%, 50%, 0.3), 0 0 40px hsla(263, 70%, 50%, 0.15)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-full pointer-events-none"
                />
              </motion.div>
            </div>

            {/* Bio text */}
            <div className="text-center md:text-left">
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4"
              >
                About Me
              </motion.span>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-4xl md:text-6xl font-display font-bold mb-6"
              >
                Uma Sharma
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="prose prose-invert prose-lg max-w-none text-muted-foreground space-y-4"
              >
                <p className="text-lg text-foreground/90 font-medium">
                  A passionate Full Stack Engineer driven by the challenge of building scalable, high-performance web applications.
                </p>
                <p>
                  With a strong foundation in the MERN stack and a keen interest in AI/LLM integration, I bridge the gap between complex backend logic and intuitive frontend experiences.
                </p>
                <p>
                  My journey involves solving real-world problems through code, optimizing performance, and crafting pixel-perfect interfaces. Whether it's architecting a microservices backend or animating a landing page, I love every part of the process.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="max-w-4xl mx-auto mb-24"
        >
          <div className="flex items-center gap-3 mb-12">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="p-3 rounded-xl bg-primary/10 border border-primary/20"
            >
              <Briefcase className="text-primary w-6 h-6" />
            </motion.div>
            <h2 className="text-3xl font-display font-bold">Experience</h2>
          </div>

          <div className="space-y-12 border-l-2 border-primary/20 pl-8 ml-4 md:ml-0">
            {loadingExp ? (
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-secondary rounded w-1/4 mb-2"></div>
                    <div className="h-20 bg-secondary rounded w-full"></div>
                  </div>
                ))}
              </div>
            ) : (
              experiences?.map((exp, idx) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: idx * 0.15,
                    duration: 0.7,
                    ease: [0.23, 1, 0.32, 1],
                  }}
                  className="relative group"
                >
                  {/* Timeline dot with pulse */}
                  <div className="absolute -left-[41px] top-0">
                    <div className="w-5 h-5 rounded-full bg-primary border-4 border-background" />
                    <motion.div
                      animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute inset-0 rounded-full bg-primary"
                    />
                  </div>

                  <motion.div
                    className="p-6 rounded-2xl bg-secondary/10 border border-white/5 hover:border-primary/20 hover:bg-secondary/20 transition-all duration-300"
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="text-xl font-bold text-foreground">{exp.role}</h3>
                      <span className="text-primary font-mono text-sm px-3 py-1 rounded-full bg-primary/10 border border-primary/20 w-fit mt-2 md:mt-0">
                        {exp.duration}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <span className="font-semibold text-white/80">{exp.company}</span>
                      {exp.location && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {exp.location}
                        </span>
                      )}
                    </div>

                    <ul className="list-disc list-outside ml-4 space-y-2 text-muted-foreground text-sm">
                      {JSON.parse(exp.description).map((point: string, i: number) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: idx * 0.1 + i * 0.05 }}
                        >
                          {point}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))
            )}
          </div>
        </motion.div>

        {/* Skills Section */}
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4"
            >
              Skills & Tools
            </motion.span>
            <h2 className="text-3xl font-display font-bold">Technical Skills</h2>
          </motion.div>

          {loadingSkills ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-secondary rounded-2xl animate-pulse" />
              ))}
            </div>
          ) : (
            <div className="space-y-16">
              {Object.entries(skillsByCategory || {}).map(([category, catSkills]) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className="text-xl text-primary font-bold mb-6 border-b border-white/10 pb-2 inline-block">
                    {category}
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                    {catSkills.map((skill, idx) => (
                      <SkillCard key={skill.id} skill={skill} index={idx} />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
