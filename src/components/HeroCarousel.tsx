import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Slide {
  gradient: string;
  pattern?: string;
}

const slides: Slide[] = [
  {
    gradient: 'bg-gradient-to-br from-[#2a3025] via-[#3a4535] to-[#2a3025]',
  },
  {
    gradient: 'bg-gradient-to-br from-[#2d3028] via-[#3d4a35] to-[#2d3028]',
  },
  {
    gradient: 'bg-gradient-to-br from-[#252e22] via-[#354230] to-[#252e22]',
  },
];

export default function HeroCarousel({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Background carousel */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className={`absolute inset-0 ${slides[current].gradient}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Subtle dot pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, #FAF6F0 1px, transparent 0)',
              backgroundSize: '40px 40px',
            }}
          />
          {/* Gold accent orb */}
          <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-gold/3 rounded-full blur-[80px]" />
        </motion.div>
      </AnimatePresence>

      {/* Dark vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full">
        {children}
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1 rounded-full transition-all duration-700 ${
              i === current ? 'w-8 bg-gold' : 'w-2 bg-cream/25 hover:bg-cream/40'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
