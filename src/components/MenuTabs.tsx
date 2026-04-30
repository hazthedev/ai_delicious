import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CakeSlice, Coffee, Flame, Leaf, Soup, Star, Utensils } from 'lucide-react';
import menuData from '../data/menu.json';

type Tag = 'popular' | 'new' | 'vegetarian' | 'signature';

const categories = ['All', ...menuData.map((c) => c.category)];

const tagColors: Record<Tag, string> = {
  popular: 'bg-gold/15 text-gold-dark',
  new: 'bg-rose-50 text-rose-500',
  vegetarian: 'bg-emerald-50 text-emerald-600',
  signature: 'bg-egg/20 text-charcoal',
};

const categoryIcons: Record<string, React.ElementType> = {
  'Dumplings (Fried)': Flame,
  'Dumplings (Steamed)': Soup,
  'Dumplings (Boiled)': Utensils,
  'Hand-Pulled Noodles': Utensils,
  'Mutton & Lamb': Flame,
  'Rice Dishes': Utensils,
  'Drinks': Coffee,
};

const categoryGradients: Record<string, string> = {
  'Dumplings (Fried)': 'from-green-50/60 via-cream-dark to-emerald-50/40',
  'Dumplings (Steamed)': 'from-emerald-50/50 via-cream-dark to-green-50/30',
  'Dumplings (Boiled)': 'from-teal-50/40 via-cream-dark to-emerald-50/30',
  'Hand-Pulled Noodles': 'from-lime-50/50 via-cream-dark to-green-50/30',
  'Mutton & Lamb': 'from-stone-100/50 via-cream-dark to-green-50/20',
  'Rice Dishes': 'from-amber-50/40 via-cream-dark to-green-50/20',
  'Drinks': 'from-sky-50/40 via-cream-dark to-teal-50/30',
};

function MenuPlaceholder({ category }: { category: string }) {
  const Icon = categoryIcons[category] ?? Utensils;
  const gradient = categoryGradients[category] ?? 'from-gold/8 via-cream-dark to-sage/8';
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(43,36,32,0.03)_1px,transparent_0)] bg-[length:20px_20px] md:bg-[length:24px_24px]" />
      <div className="relative flex h-14 w-14 md:h-16 md:w-16 items-center justify-center rounded-xl md:rounded-2xl bg-surface/90 text-gold/70 shadow-sm ring-1 ring-charcoal/5">
        <Icon size={28} strokeWidth={1.2} aria-hidden="true" />
      </div>
    </div>
  );
}

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
      <div className="sticky top-16 md:top-20 z-30 bg-cream/90 backdrop-blur-xl border-b border-charcoal/5">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex gap-1 overflow-x-auto py-4 scrollbar-none -mx-5 px-5 md:mx-0 md:px-0">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`relative px-5 py-2.5 text-[13px] font-medium whitespace-nowrap rounded-full transition-colors duration-300 ${
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
      <div className="max-w-7xl mx-auto px-5 md:px-8 pt-8 pb-3">
        <div className="flex gap-2 flex-wrap">
          {(['popular', 'new', 'signature'] as Tag[]).map((tag) => (
            <button
              key={tag}
              onClick={() => toggleFilter(tag)}
              className={`px-4 py-1.5 text-[11px] font-medium rounded-full border transition-all duration-400 ease-[cubic-bezier(0.34,1.56,0.64,1)] uppercase tracking-wider ${
                activeFilters.includes(tag)
                  ? 'bg-charcoal text-cream border-charcoal scale-105'
                  : 'bg-transparent text-taupe border-charcoal/10 hover:border-charcoal/25 hover:scale-105'
              }`}
            >
              {tag === 'signature' ? 'Signature 招牌' : tag}
            </button>
          ))}
        </div>
      </div>

      {/* Menu grid */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10 pb-16">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.name}
                layout
                initial={reduced ? false : { opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduced ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{
                  duration: 0.5,
                  delay: reduced ? 0 : i * 0.04,
                  ease: [0.16, 1, 0.3, 1],
                  layout: { type: 'spring', stiffness: 300, damping: 28 },
                }}
                className="group card-hover bg-surface rounded-2xl overflow-hidden border border-charcoal/5"
              >
                {/* Icon placeholder panel */}
                <div className="relative aspect-[16/10] md:aspect-[4/3] overflow-hidden">
                  <MenuPlaceholder category={item.category} />
                  {/* Category badge */}
                  <span className="absolute bottom-3 right-3 rounded-full bg-surface/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-taupe backdrop-blur-sm">
                    {item.category}
                  </span>
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
                <div className="p-5 md:p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-display text-lg text-charcoal leading-snug tracking-tight" style={{ fontVariationSettings: '"opsz" 20' }}>
                      {item.name}
                    </h3>
                    <span className="text-gold font-semibold text-base whitespace-nowrap mt-0.5">
                      RM {item.price.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-taupe text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-taupe text-lg mb-4">No dishes match your filters.</p>
            <button
              onClick={() => { setActiveFilters([]); setActive('All'); }}
              className="text-gold font-medium hover:underline text-sm"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
