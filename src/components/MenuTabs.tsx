import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import menuData from '../data/menu.json';

type Tag = 'halal' | 'popular' | 'new' | 'vegetarian';

const categories = ['All', ...menuData.map((c) => c.category)];

const tagColors: Record<Tag, string> = {
  halal: 'bg-sage/20 text-sage',
  popular: 'bg-gold/15 text-gold-dark',
  new: 'bg-rose-100 text-rose-600',
  vegetarian: 'bg-emerald-100 text-emerald-700',
};

export default function MenuTabs() {
  const [active, setActive] = useState('All');
  const [activeFilters, setActiveFilters] = useState<Tag[]>([]);
  const reduced = useReducedMotion();

  const allItems = menuData.flatMap((cat) =>
    cat.items.map((item) => ({ ...item, category: cat.category }))
  );

  const filtered = allItems.filter((item) => {
    const matchCategory = active === 'All' || item.category === active;
    const matchTags = activeFilters.length === 0 || activeFilters.every((f) => item.tags.includes(f));
    return matchCategory && matchTags;
  });

  const toggleFilter = (tag: Tag) => {
    setActiveFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <div>
      {/* Category tabs */}
      <div className="sticky top-18 md:top-20 z-30 bg-cream/95 backdrop-blur-lg border-b border-charcoal/5">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex gap-1 overflow-x-auto py-4 scrollbar-none -mx-5 px-5 md:mx-0 md:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`relative px-5 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-colors duration-300 ${
                  active === cat
                    ? 'text-cream'
                    : 'text-taupe hover:text-charcoal'
                }`}
              >
                {active === cat && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-charcoal rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filter chips */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-6 pb-2">
        <div className="flex gap-2 flex-wrap">
          {(['halal', 'popular', 'new'] as Tag[]).map((tag) => (
            <button
              key={tag}
              onClick={() => toggleFilter(tag)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full border transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] capitalize ${
                activeFilters.includes(tag)
                  ? 'bg-charcoal text-cream border-charcoal scale-105'
                  : 'bg-transparent text-taupe border-charcoal/10 hover:border-charcoal/30 hover:scale-105'
              }`}
            >
              {tag === 'halal' ? 'Halal ✓' : tag}
            </button>
          ))}
        </div>
      </div>

      {/* Menu grid */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.name}
                layout
                initial={reduced ? false : { opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.95 }}
                transition={{
                  duration: 0.5,
                  delay: reduced ? 0 : i * 0.03,
                  ease: [0.16, 1, 0.3, 1],
                  layout: { type: 'spring', stiffness: 300, damping: 28 },
                }}
                className="group card-hover bg-surface rounded-2xl overflow-hidden border border-charcoal/5"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover img-zoom"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/20 to-transparent overlay-fade group-hover:opacity-0" />
                  {/* Tags */}
                  {item.tags.length > 0 && (
                    <div className="absolute top-3 left-3 flex gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`px-2.5 py-1 text-[10px] font-semibold rounded-full uppercase tracking-wider backdrop-blur-sm ${tagColors[tag as Tag] || 'bg-cream/90 text-charcoal'}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg text-charcoal leading-snug" style={{ fontVariationSettings: '"opsz" 20' }}>
                      {item.name}
                    </h3>
                    <span className="text-gold font-semibold text-lg whitespace-nowrap">
                      RM {item.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-taupe text-sm mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-taupe text-lg">No dishes match your filters.</p>
            <button
              onClick={() => { setActiveFilters([]); setActive('All'); }}
              className="mt-4 text-gold font-medium hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
