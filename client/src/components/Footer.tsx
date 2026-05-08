import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 py-12 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <h3 className="text-xl font-display font-bold">
            <span className="text-white">Uma</span>{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Sharma</span>
          </h3>
          <p className="text-muted-foreground text-sm mt-2">Full Stack Engineer • AI Enthusiast • Builder</p>
        </motion.div>

        <div className="flex items-center gap-4">
          {[
            { href: "https://github.com/umasharma-cell", icon: <Github className="w-5 h-5" /> },
            { href: "https://www.linkedin.com/in/uma-sharma82/", icon: <Linkedin className="w-5 h-5" /> },
            { href: "mailto:work.uma26@gmail.com", icon: <Mail className="w-5 h-5" /> },
            { href: "https://twitter.com", icon: <Twitter className="w-5 h-5" /> },
          ].map((social, idx) => (
            <motion.a
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-secondary/50 text-foreground border border-white/5 hover:border-primary/30 hover:bg-primary/10 hover:text-primary transition-all duration-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -4, scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 mt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Uma Sharma. All rights reserved.
      </div>
    </footer>
  );
}
