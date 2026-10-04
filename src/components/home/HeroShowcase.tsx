import React from 'react';
import { HERO_BANNER_IMG } from '../../data/jewelryData';

interface HeroShowcaseProps {
  onExplore: () => void;
  onBookVisit: () => void;
}

export const HeroShowcase: React.FC<HeroShowcaseProps> = ({ onExplore, onBookVisit }) => {
  return (
    <section className="px-4 py-2 w-full">
      <div className="relative w-full rounded-2xl overflow-hidden bg-surface-container-lowest shadow-xl flex flex-col justify-end min-h-[390px] border border-primary/20">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
          style={{ backgroundImage: `url('${HERO_BANNER_IMG}')` }}
        />
        {/* Luxury Vignette & Dark Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-surface-container-lowest/65 to-transparent" />
        <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/60 pointer-events-none" />

        {/* Content Overlay */}
        <div className="relative z-10 p-5 flex flex-col gap-2">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-primary text-[15px]">auto_awesome</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">
              Haute Joaillerie 2025
            </span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl text-primary font-semibold tracking-tight leading-tight">
            The Celestial Solitaire Collection
          </h2>

          <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed max-w-xl">
            Handcrafted in 18K Yellow &amp; Rose Gold with Rare IGI Certified Diamonds, engineered for timeless magnificence.
          </p>

          <div className="flex flex-col sm:flex-row gap-2 pt-2">
            <button
              onClick={onExplore}
              className="w-full sm:w-auto px-4 py-2.5 bg-primary text-on-primary text-xs uppercase tracking-wider rounded-lg font-bold transition-all shadow-lg flex items-center justify-center gap-1.5 active:scale-95 hover:bg-primary-fixed"
            >
              <span>Explore Collection</span>
              <span className="material-symbols-outlined text-[16px]">north_east</span>
            </button>

            <button
              onClick={onBookVisit}
              className="w-full sm:w-auto px-4 py-2.5 bg-surface-container-high/90 backdrop-blur-md text-on-surface text-xs uppercase tracking-wider rounded-lg font-semibold transition-all border border-outline-variant/40 flex items-center justify-center gap-1.5 active:scale-95 hover:bg-surface-container-highest"
            >
              <span className="material-symbols-outlined text-[16px] text-secondary">calendar_today</span>
              <span>Book Boutique Visit</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
