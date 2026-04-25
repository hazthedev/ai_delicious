import { useState, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import site from '../data/site.json';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const formspreeId = import.meta.env.PUBLIC_FORMSPREE_ID;
  const hasFormEndpoint = Boolean(formspreeId && formspreeId !== 'your-form-id');
  const whatsappHref = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi! I'd like to make a reservation or enquiry.")}`;

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
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        body: form,
        headers: { Accept: 'application/json' },
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  if (!hasFormEndpoint) {
    return (
      <div className="bg-surface rounded-2xl border border-charcoal/5 p-10 md:p-12 text-center">
        <div className="w-14 h-14 bg-sage/15 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-sage">
            <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
          </svg>
        </div>
        <h3 className="font-display text-2xl text-charcoal mb-3 tracking-tight">Message us on WhatsApp</h3>
        <p className="text-taupe text-sm leading-relaxed mb-8 max-w-xs mx-auto">
          For reservations and quick enquiries, WhatsApp is the fastest way to reach us.
        </p>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-elastic inline-flex items-center justify-center w-full py-4 bg-[#25D366] text-white font-semibold text-sm rounded-full hover:shadow-lg hover:shadow-[#25D366]/25"
        >
          Open WhatsApp
        </a>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-2xl border border-charcoal/5 p-8 md:p-10">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-14"
          >
            <div className="w-14 h-14 bg-sage/15 rounded-full flex items-center justify-center mx-auto mb-5">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-7 h-7 text-sage">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-display text-2xl text-charcoal mb-2 tracking-tight">Message sent!</h3>
            <p className="text-taupe text-sm">We will get back to you shortly. Thank you!</p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3.5 bg-cream border border-charcoal/8 rounded-xl text-charcoal text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all placeholder:text-taupe/50"
                placeholder="Your name"
              />
              {errors.name && <p className="text-rose-500 text-xs mt-1.5">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="contact" className="block text-sm font-medium text-charcoal mb-2">
                Phone / Email
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                className="w-full px-4 py-3.5 bg-cream border border-charcoal/8 rounded-xl text-charcoal text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all placeholder:text-taupe/50"
                placeholder="012-345 6789 or your@email.com"
              />
              {errors.contact && <p className="text-rose-500 text-xs mt-1.5">{errors.contact}</p>}
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-charcoal mb-2">
                Reservation Date <span className="text-taupe font-normal">(optional)</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                className="w-full px-4 py-3.5 bg-cream border border-charcoal/8 rounded-xl text-charcoal text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-3.5 bg-cream border border-charcoal/8 rounded-xl text-charcoal text-sm focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/20 transition-all resize-none placeholder:text-taupe/50"
                placeholder="Tell us what you would like..."
              />
              {errors.message && <p className="text-rose-500 text-xs mt-1.5">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-4 bg-gold text-cream font-semibold text-sm rounded-full hover:bg-gold-dark transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed tracking-wide"
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
