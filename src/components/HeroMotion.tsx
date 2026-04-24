import { motion, useReducedMotion } from 'framer-motion';

export default function HeroMotion() {
  const reduced = useReducedMotion();

  const container = {
    hidden: {},
    show: {
      transition: { staggerChildren: reduced ? 0 : 0.1 },
    },
  };

  const item = reduced
    ? {
        hidden: { opacity: 1, y: 0 },
        show: { opacity: 1, y: 0 },
      }
    : {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
      };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layer 1: Background image */}
      <img
        src="/images/hero-interior.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* Layer 2: Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />

      {/* Layer 3: Content — always on top */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto px-5 text-center"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* Brand accent */}
        <motion.p
          variants={item}
          className="font-zh text-gold text-lg md:text-xl tracking-[0.3em] mb-6"
        >
          爱品味 · SINCE 2019
        </motion.p>

        {/* Main headline */}
        <motion.h1
          variants={item}
          className="font-display text-cream text-4xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight mb-6"
          style={{ fontVariationSettings: '"opsz" 72' }}
        >
          Cozy comfort,<br />
          <span className="text-gold">served daily</span><br />
          in Setapak.
        </motion.h1>

        {/* Subline */}
        <motion.p
          variants={item}
          className="text-cream/70 text-base md:text-lg max-w-lg mx-auto mb-10 leading-relaxed"
        >
          Where friends catch up, couples unwind, and every plate tells a story.
        </motion.p>

        {/* CTAs */}
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/menu"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-gold text-cream font-semibold rounded-full overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-gold/30"
          >
            <span className="relative z-10">View Menu</span>
            <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            <div className="absolute inset-0 bg-gold-dark transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
          </a>
          <a
            href="https://wa.me/60123456789"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 border border-cream/30 text-cream font-medium rounded-full hover:border-gold hover:text-gold transition-all duration-300"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            WhatsApp Us
          </a>
        </motion.div>
      </motion.div>

    </section>
  );
}
