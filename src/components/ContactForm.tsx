import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (form: FormData) => {
    const errs: Record<string, string> = {};
    if (!form.get('name')) errs.name = 'Please enter your name';
    if (!form.get('contact')) errs.contact = 'Please enter your phone or email';
    if (!form.get('message')) errs.message = 'Please enter a message';
    return errs;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('sending');

    try {
      const res = await fetch(
        `https://formspree.io/f/${import.meta.env.PUBLIC_FORMSPREE_ID || 'your-form-id'}`,
        {
          method: 'POST',
          body: form,
          headers: { Accept: 'application/json' },
        }
      );
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="bg-surface rounded-2xl border border-charcoal/5 p-8 md:p-10">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8 text-sage">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-display text-2xl text-charcoal mb-2">Message sent!</h3>
            <p className="text-taupe">We'll get back to you shortly. Thank you!</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-5"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-1.5">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 bg-cream border border-charcoal/10 rounded-xl text-charcoal text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all"
                placeholder="Your name"
              />
              {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-charcoal mb-1.5">
                Phone / Email
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                className="w-full px-4 py-3 bg-cream border border-charcoal/10 rounded-xl text-charcoal text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all"
                placeholder="012-345 6789 or your@email.com"
              />
              {errors.contact && <p className="text-rose-500 text-xs mt-1">{errors.contact}</p>}
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-charcoal mb-1.5">
                Reservation Date <span className="text-taupe font-normal">(optional)</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="w-full px-4 py-3 bg-cream border border-charcoal/10 rounded-xl text-charcoal text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-3 bg-cream border border-charcoal/10 rounded-xl text-charcoal text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 transition-all resize-none"
                placeholder="Tell us what you'd like..."
              />
              {errors.message && <p className="text-rose-500 text-xs mt-1">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-3.5 bg-gold text-cream font-semibold rounded-full hover:bg-gold-dark transition-colors duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {status === 'sending' ? (
                <span className="inline-flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" className="opacity-20"/><path d="M4 12a8 8 0 018-8" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>

            {status === 'error' && (
              <p className="text-rose-500 text-sm text-center">
                Something went wrong. Please try WhatsApp instead.
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
