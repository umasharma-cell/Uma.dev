import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/about#skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

function scrollToSkills() {
  setTimeout(() => {
    const el = document.getElementById("skills");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, 100);
}

function handleResumeClick(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  const url = "/attached_assets/Uma_Sharma_Resume_.pdf";
  // Trigger download
  const a = document.createElement("a");
  a.href = url;
  a.download = "Uma_Sharma_Resume_.pdf";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  // Also open for preview
  window.open(url, "_blank");
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-background/60 backdrop-blur-2xl border-b border-white/5 py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <Link href="/">
          <motion.span
            className="text-2xl font-display font-bold tracking-tighter cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white">UMA</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">.DEV</span>
          </motion.span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => {
            const isHash = link.href.includes("#");
            const isActive = isHash
              ? location === "/about" && window.location.hash === "#skills"
              : location === link.href;

            const handleClick = isHash
              ? (e: React.MouseEvent) => {
                  e.preventDefault();
                  if (location !== "/about") {
                    navigate("/about");
                  }
                  scrollToSkills();
                }
              : (e: React.MouseEvent) => {
                  if (location === link.href) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                };

            return (
              <Link
                key={link.href}
                href={isHash ? "/about" : link.href}
                onClick={handleClick}
                className={cn(
                  "relative px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300 rounded-full",
                  isActive ? "text-white" : "text-muted-foreground hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-primary/15 border border-primary/30 rounded-full"
                    transition={{ type: "spring", bounce: 0.25, duration: 0.5 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </Link>
            );
          })}
          <motion.a
            href="/attached_assets/Uma_Sharma_Resume_.pdf"
            onClick={handleResumeClick}
            className="ml-4 px-5 py-2.5 text-sm font-bold bg-gradient-to-r from-primary to-purple-500 text-white rounded-full hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 flex items-center gap-2"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" /> Resume
          </motion.a>
        </div>

        <motion.button
          className="md:hidden text-white p-2 rounded-full bg-secondary/50 backdrop-blur-sm"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.9 }}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="md:hidden bg-background/95 backdrop-blur-2xl border-b border-white/10 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-2">
              {links.map((link, idx) => {
                const isHash = link.href.includes("#");
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link
                      href={isHash ? "/about" : link.href}
                      className={cn(
                        "block text-lg font-medium py-3 px-4 rounded-xl transition-all",
                        location === link.href ? "text-primary bg-primary/10" : "text-foreground hover:bg-secondary/50"
                      )}
                      onClick={(e: React.MouseEvent) => {
                        if (isHash) {
                          e.preventDefault();
                          if (location !== "/about") {
                            navigate("/about");
                          }
                          scrollToSkills();
                        } else if (location === link.href) {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                        setIsOpen(false);
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
