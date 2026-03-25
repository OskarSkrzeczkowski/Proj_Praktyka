import { motion } from 'framer-motion';

export const Particles = () => {

  const particles = Array.from({ length: 300 });

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white/20"
          style={{

            width: Math.random() * 6 + 2 + 'px',
            height: Math.random() * 6 + 2 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            filter: 'blur(1px)',
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            willChange: 'transform',
            transform: 'translateZ(0)',
          }}
          animate={{
            y: [0, Math.random() * -100 - 50],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  );
};