import { motion } from "framer-motion";
import { useState } from "react";

function ParticleDots() {
  const [dots] = useState(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 3 + 2,
    }))
  );

  return (
    <>
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full bg-primary/40"
          style={{ left: `${dot.x}%`, top: `${dot.y}%`, width: dot.size, height: dot.size }}
          animate={{ opacity: [0.1, 0.7, 0.1], scale: [1, 1.8, 1] }}
          transition={{ duration: dot.duration, repeat: Infinity, delay: dot.delay, ease: "easeInOut" }}
        />
      ))}
    </>
  );
}

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-background to-background" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent" />

      <motion.div
        animate={{ x: [0, 120, -40, 0], y: [0, -60, 40, 0], scale: [1, 1.3, 0.9, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -80, 60, 0], y: [0, 80, -40, 0], scale: [1, 1.4, 0.8, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[100px]"
      />
      <motion.div
        animate={{ x: [0, 60, -80, 0], y: [0, -40, 60, 0], scale: [1, 1.2, 1.1, 1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 5 }}
        className="absolute top-2/3 left-1/2 w-[350px] h-[350px] bg-purple-500/8 rounded-full blur-[100px]"
      />

      <ParticleDots />

      <div
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px]"
        style={{
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />
    </div>
  );
}
