import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-white/5 py-12 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-center md:text-left">
          <h3 className="text-xl font-display font-bold text-white">Uma Sharma</h3>
          <p className="text-muted-foreground text-sm mt-2">Full Stack Engineer • AI Enthusiast • Builder</p>
        </div>

        <div className="flex items-center gap-6">
          <SocialLink href="https://github.com/umasharma-cell" icon={<Github className="w-5 h-5" />} />
          <SocialLink href="https://www.linkedin.com/in/uma-sharma82/" icon={<Linkedin className="w-5 h-5" />} />
          <SocialLink href="mailto:work.uma26@gmail.com" icon={<Mail className="w-5 h-5" />} />
          <SocialLink href="https://twitter.com" icon={<Twitter className="w-5 h-5" />} />
        </div>
      </div>
      
      <div className="container mx-auto px-6 mt-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Uma Sharma. All rights reserved. Built with React, Tailwind & Framer Motion.
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="p-3 rounded-full bg-secondary/50 text-foreground hover:bg-primary hover:text-white transition-all duration-300 hover:-translate-y-1"
    >
      {icon}
    </a>
  );
}
