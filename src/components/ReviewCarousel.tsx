import { useEffect, useRef } from 'react';
import reviews from '../data/reviews.json';
import site from '../data/site.json';

const allReviews = [...reviews, ...reviews, ...reviews]; // Triple for seamless loop

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  return (
    <div className="flex-shrink-0 w-[340px] md:w-[400px] p-8 rounded-2xl bg-cream/5 border border-cream/8 backdrop-blur-sm mx-3 select-none">
      <div className="flex items-center gap-1 mb-5">
        {[...Array(review.rating)].map((_, i) => (
          <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-gold">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
          </svg>
        ))}
      </div>

      <p className="text-cream/75 text-[15px] leading-[1.75] mb-8">
        "{review.text}"
      </p>

      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gold/15 flex items-center justify-center text-gold font-semibold text-sm">
          {review.name.charAt(0)}
        </div>
        <div>
          <p className="text-cream font-medium text-sm">{review.name}</p>
          <p className="text-cream/30 text-xs">{review.date}</p>
        </div>
      </div>
    </div>
  );
}

export default function ReviewCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animationId: number;
    let position = 0;
    const speed = 0.4; // pixels per frame

    const animate = () => {
      position += speed;
      // When we've scrolled past one set of reviews, reset
      const firstSetWidth = track.scrollWidth / 3;
      if (position >= firstSetWidth) {
        position = 0;
      }
      track.style.transform = `translateX(-${position}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <section className="py-24 md:py-32 lg:py-40 bg-charcoal text-cream relative overflow-hidden">
      {/* Ambient blur orbs */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gold/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-1.5 mb-8">
            {[...Array(5)].map((_, i) => (
              <svg key={i} viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gold">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-cream leading-[1.05] tracking-tight mb-5" style={{ fontVariationSettings: '"opsz" 60' }}>
            {site.rating} <span className="text-gold">/</span> 5
          </h2>
          <p className="text-cream/40 text-sm tracking-wide">
            From {site.reviewCount.toLocaleString()}+ diners on Google Reviews
          </p>
        </div>
      </div>

      {/* Infinite marquee */}
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-charcoal to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-charcoal to-transparent z-10 pointer-events-none" />

        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ width: 'max-content' }}
        >
          {allReviews.map((review, i) => (
            <ReviewCard key={`${review.name}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
