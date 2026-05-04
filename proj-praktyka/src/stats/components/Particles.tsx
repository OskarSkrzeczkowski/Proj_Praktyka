import { motion } from 'framer-motion';
import { useMemo } from 'react';
export const Particles = () => {

    const particles = useMemo(() => Array.from({ length: 100 }, (_, i) => ({
        id: i,
        size: Math.random() * 6 + 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
        yMove: Math.random() * -100 - 50,
        duration: Math.random() * 10 + 10,
        delay: Math.random() * 10,
    })), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-white/20"
          style={{

            width: p.size + 'px',
            height: p.size + 'px',
            left: p.left + '%',
            top: p.top + '%',
            filter: 'blur(1px)',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
          animate={{
            y: [0, p.yMove],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};