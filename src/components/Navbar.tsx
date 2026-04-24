import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Menu', href: '/menu' },
  { label: 'About', href: '/about' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  // Close mobile menu on Astro page navigation
  useEffect(() => {
    const handler = () => setMobileOpen(false);
    document.addEventListener('astro:after-swap', handler);
    return () => document.removeEventListener('astro:after-swap', handler);
  }, []);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${
          scrolled
            ? 'bg-cream/90 backdrop-blur-xl shadow-[0_1px_0_rgba(176,141,87,0.15)]'
            : 'bg-transparent'
        }`}
        style={{ viewTransitionName: 'navbar' } as React.CSSProperties}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-center justify-between h-18 md:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 group">
              <span className="font-zh text-gold text-xl md:text-2xl tracking-wide transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110">
                爱品味
              </span>
              <span className="hidden sm:block w-px h-5 bg-taupe/30" />
              <span
                className={`hidden sm:block font-display text-sm tracking-widest uppercase transition-colors duration-500 ${
                  scrolled ? 'text-charcoal' : 'text-white'
                }`}
              >
                Ai Delicious
              </span>
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`nav-underline relative text-sm font-medium tracking-wide uppercase transition-colors duration-500 hover:text-gold ${
                    scrolled ? 'text-charcoal' : 'text-white'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://wa.me/60123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-elastic inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-cream text-sm font-semibold rounded-full hover:shadow-lg hover:shadow-gold/25"
              >
                <MessageCircle size={16} />
                WhatsApp Us
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 transition-colors duration-300 ${
                scrolled ? 'text-charcoal' : 'text-white'
              }`}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-cream"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="flex flex-col items-center justify-center h-full gap-8">
              <motion.span
                className="font-zh text-gold text-3xl mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              >
                爱品味
              </motion.span>
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  className="font-display text-3xl text-charcoal hover:text-gold transition-colors duration-300"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15 + i * 0.08,
                    duration: 0.5,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="https://wa.me/60123456789"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-elastic mt-4 inline-flex items-center gap-2 px-8 py-3 bg-gold text-cream font-semibold rounded-full"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <MessageCircle size={18} />
                WhatsApp Us
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
