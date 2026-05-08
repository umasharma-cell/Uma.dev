import { motion } from "framer-motion";
import { type Skill } from "@shared/schema";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import { Code2 } from "lucide-react";

const iconColors: Record<string, string> = {
  SiJavascript: "#F7DF1E", SiTypescript: "#3178C6", SiReact: "#61DAFB",
  SiNextdotjs: "#ffffff", SiRedux: "#764ABC", SiTailwindcss: "#06B6D4",
  SiHtml5: "#E34F26", SiFramer: "#0055FF", SiNodedotjs: "#339933",
  SiExpress: "#ffffff", SiPostgresql: "#4169E1", SiMongodb: "#47A248",
  SiSupabase: "#3FCF8E", SiFirebase: "#FFCA28", SiAmazonwebservices: "#FF9900",
  SiVercel: "#ffffff", SiGit: "#F05032", SiVisualstudiocode: "#007ACC",
  SiDrizzle: "#C5F74F", SiVite: "#646CFF", SiOpenai: "#412991",
  SiGoogle: "#4285F4", SiAnthropic: "#D4A574",
  FaServer: "#06B6D4", FaRobot: "#8B5CF6", FaBrain: "#EC4899",
  FaMicrochip: "#10B981", FaDatabase: "#F59E0B",
};

export function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  const IconComponent =
    (SiIcons as any)[skill.icon || ""] ||
    (FaIcons as any)[skill.icon || ""] ||
    Code2;

  const iconColor = iconColors[skill.icon || ""] || "#8B5CF6";

  // Alternate direction: even from left, odd from right
  const fromLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: fromLeft ? -80 : 80, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.04,
        ease: [0.23, 1, 0.32, 1],
      }}
      whileHover={{
        scale: 1.08,
        y: -8,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
      className="group relative p-5 rounded-2xl bg-secondary/20 border border-white/5 hover:border-primary/40 hover:bg-secondary/40 transition-colors duration-300 cursor-default overflow-hidden"
    >
      {/* Hover glow background */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${iconColor}15, transparent 70%)`,
        }}
      />

      <div className="relative z-10 flex flex-col items-center text-center gap-3">
        <motion.div
          className="p-3 rounded-xl bg-white/5 group-hover:bg-white/10 transition-colors duration-300"
          whileHover={{ rotate: [0, -10, 10, 0] }}
          transition={{ duration: 0.4 }}
        >
          <IconComponent className="w-7 h-7" style={{ color: iconColor }} />
        </motion.div>

        <div>
          <h3 className="text-sm font-bold text-foreground group-hover:text-white transition-colors">
            {skill.name}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {skill.yearsOfExp} {skill.yearsOfExp === 1 ? "Year" : "Years"} Exp
          </p>
        </div>

        {/* Proficiency bar */}
        <div className="w-full h-1 rounded-full bg-white/5 overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ background: `linear-gradient(90deg, ${iconColor}, ${iconColor}80)` }}
            initial={{ width: 0 }}
            whileInView={{ width: `${skill.proficiency}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.04 + 0.3, ease: "easeOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
}
