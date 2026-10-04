import React from 'react';
import { CATEGORIES } from '../../data/jewelryData';

interface CategorySliderProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string) => void;
  onViewAll: () => void;
}

export const CategorySlider: React.FC<CategorySliderProps> = ({
  selectedCategory,
  onSelectCategory,
  onViewAll,
}) => {
  return (
    <section className="py-3 w-full">
      <div className="px-4 flex items-center justify-between mb-2">
        <div>
          <span className="text-[10px] font-bold text-secondary uppercase tracking-widest block">
            Curated Categories
          </span>
          <h3 className="font-serif text-lg font-semibold text-on-surface">
            Explore by Ornament
          </h3>
        </div>
        <button
          onClick={onViewAll}
          className="text-[10px] font-bold text-primary uppercase tracking-wider flex items-center gap-0.5 hover:text-secondary transition-colors"
        >
          View All <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
        </button>
      </div>

      <div className="flex gap-3 overflow-x-auto px-4 no-scrollbar pb-1">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className="flex flex-col items-center gap-1.5 min-w-[76px] group focus:outline-none"
            >
              <div
                className={`w-16 h-16 rounded-full overflow-hidden p-0.5 shadow-md transition-all group-active:scale-95 ${
                  isSelected
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface bg-primary/20'
                    : 'bg-surface-container-high ring-1 ring-primary/20 hover:ring-primary/60'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.label}
                  className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span
                className={`text-xs text-center tracking-tight font-medium ${
                  isSelected ? 'text-primary font-bold' : 'text-on-surface group-hover:text-primary'
                }`}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
};
