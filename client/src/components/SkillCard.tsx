import { motion } from "framer-motion";
import { type Skill } from "@shared/schema";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import { Code2 } from "lucide-react";

export function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  // Dynamically resolve icon
  const IconComponent = 
    (SiIcons as any)[skill.icon || ""] || 
    (FaIcons as any)[skill.icon || ""] || 
    Code2;

  // Map icon names to their original brand colors
  const iconColors: Record<string, string> = {
    SiJavascript: "#F7DF1E",
    SiReact: "#61DAFB",
    SiRedux: "#764ABC",
    SiTailwindcss: "#06B6D4",
    SiNodedotjs: "#339933",
    SiExpress: "#ffffff",
    FaJava: "#007396",
    SiMongodb: "#47A248",
    SiMysql: "#4479A1",
    SiFirebase: "#FFCA28",
    SiSupabase: "#3ECF8E",
    SiGoogle: "#4285F4",
    SiOpenai: "#412991",
    FaBrain: "#FF6B6B"
  };

  const IconColor = iconColors[skill.icon || ""] || "currentColor";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center gap-4 text-center group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div 
        className="p-4 rounded-full bg-secondary transition-colors duration-300 text-4xl z-10 flex items-center justify-center"
        style={{ color: IconColor }}
      >
        <IconComponent />
      </div>
      
      <div className="z-10 text-center">
        <h3 className="font-display font-semibold text-lg">{skill.name}</h3>
        <p className="text-xs text-muted-foreground mt-1">
          {skill.yearsOfExp} {skill.yearsOfExp === 1 ? 'Year' : 'Years'} Exp
        </p>
      </div>
      
      <div className="w-full bg-secondary h-1.5 rounded-full overflow-hidden z-10">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.proficiency}%` }}
          transition={{ duration: 1, delay: 0.2 }}
          className="h-full bg-gradient-to-r from-primary to-accent"
        />
      </div>
    </motion.div>
  );
}
