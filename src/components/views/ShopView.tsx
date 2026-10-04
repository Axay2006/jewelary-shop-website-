import React, { useState, useMemo } from 'react';
import { JewelleryProduct } from '../../types/jewelry';
import { CATEGORIES } from '../../data/jewelryData';

interface ShopViewProps {
  products: JewelleryProduct[];
  selectedCategory: string | null;
  onSelectCategory: (catId: string | null) => void;
  onSelectProduct: (product: JewelleryProduct) => void;
  onInstantTryOn: (product: JewelleryProduct) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
}

export const ShopView: React.FC<ShopViewProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onSelectProduct,
  onInstantTryOn,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [metalFilter, setMetalFilter] = useState<'all' | 'yellow' | 'rose' | 'platinum'>('all');
  const [priceSort, setPriceSort] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory && p.category !== selectedCategory) {
        return false;
      }
      // Metal filter
      if (metalFilter !== 'all') {
        const hasMetal = p.metals.some((m) => m.type === metalFilter);
        if (!hasMetal) return false;
      }
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(q);
        const matchesDesc = p.description.toLowerCase().includes(q);
        const matchesSpecs = p.diamondSpecs.toLowerCase().includes(q);
        if (!matchesName && !matchesDesc && !matchesSpecs) return false;
      }
      return true;
    }).sort((a, b) => {
      if (priceSort === 'price-asc') return a.curatedPrice - b.curatedPrice;
      if (priceSort === 'price-desc') return b.curatedPrice - a.curatedPrice;
      return 0;
    });
  }, [products, selectedCategory, metalFilter, searchQuery, priceSort]);

  return (
    <div className="flex flex-col w-full pb-24 px-4 max-w-7xl mx-auto">
      {/* Title & Search */}
      <div className="pt-2 pb-3">
        <span className="text-[10px] font-bold text-secondary uppercase tracking-widest block">
          Haute Joaillerie Atelier
        </span>
        <h2 className="font-serif text-2xl font-bold text-on-surface">
          Curated Vault Catalogue
        </h2>

        {/* Search Bar */}
        <div className="mt-3 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by solitaire, polki, cut, or carat..."
            className="w-full bg-surface-container text-on-surface pl-10 pr-4 py-2.5 rounded-xl text-xs placeholder:text-on-surface-variant/50 focus:outline-none border border-outline-variant/30 focus:border-primary/50 transition-colors"
          />
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px]">
            search
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface text-xs"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
        <button
          onClick={() => onSelectCategory(null)}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border ${
            selectedCategory === null
              ? 'bg-primary text-on-primary border-primary'
              : 'bg-surface-container text-on-surface-variant border-outline-variant/30 hover:text-on-surface'
          }`}
        >
          All Jewels ({products.length})
        </button>

        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors border ${
                isSelected
                  ? 'bg-primary text-on-primary border-primary'
                  : 'bg-surface-container text-on-surface-variant border-outline-variant/30 hover:text-on-surface'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Filters & Sorters */}
      <div className="flex items-center justify-between gap-2 py-2 border-b border-outline-variant/20 text-xs">
        {/* Metal Filter */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-on-surface-variant uppercase font-bold">Metal:</span>
          <select
            value={metalFilter}
            onChange={(e) => setMetalFilter(e.target.value as any)}
            className="bg-surface-container text-on-surface text-xs px-2 py-1 rounded-lg border border-outline-variant/30 focus:outline-none"
          >
            <option value="all">All Metals</option>
            <option value="yellow">Yellow Gold</option>
            <option value="rose">Rose Gold</option>
            <option value="platinum">Platinum</option>
          </select>
        </div>

        {/* Price Sort */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-on-surface-variant uppercase font-bold">Sort:</span>
          <select
            value={priceSort}
            onChange={(e) => setPriceSort(e.target.value as any)}
            className="bg-surface-container text-on-surface text-xs px-2 py-1 rounded-lg border border-outline-variant/30 focus:outline-none"
          >
            <option value="featured">Featured Curations</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Results Count */}
      <div className="py-2.5 text-xs text-on-surface-variant flex justify-between items-center">
        <span>Showing {filteredProducts.length} verified pieces</span>
        <span className="text-secondary font-medium text-[11px]">100% Certified &amp; Insured</span>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
        {filteredProducts.map((product) => {
          const isWishlisted = wishlistIds.includes(product.id);
          const hasAR = Boolean(product.images.tryOnOverlay);

          return (
            <div
              key={product.id}
              className="bg-surface-container-low rounded-2xl overflow-hidden shadow-lg border border-primary/15 flex flex-col group hover:border-primary/40 transition-all"
            >
              <div
                onClick={() => onSelectProduct(product)}
                className="relative w-full h-56 bg-surface-container-lowest cursor-pointer overflow-hidden"
              >
                <img
                  src={product.images.main}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1 z-10">
                  {hasAR && (
                    <span className="bg-surface-container-highest/90 backdrop-blur-md text-primary px-2 py-0.5 rounded-full text-[8px] uppercase tracking-wider font-bold flex items-center gap-1 border border-primary/20">
                      <span className="material-symbols-outlined text-[11px]">view_in_ar</span>
                      AR Try-On
                    </span>
                  )}
                  <span className="bg-surface-container-highest/90 backdrop-blur-md text-secondary px-2 py-0.5 rounded-full text-[8px] uppercase tracking-wider font-semibold border border-secondary/20">
                    {product.hallmark.split(' ')[0]} {product.hallmark.split(' ')[1]}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(product.id);
                  }}
                  className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all z-10 ${
                    isWishlisted
                      ? 'bg-primary text-on-primary shadow-lg scale-110'
                      : 'bg-surface-container-highest/75 text-on-surface-variant hover:text-primary'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[17px]"
                    style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
              </div>

              <div className="p-3.5 flex flex-col justify-between flex-1 gap-2">
                <div onClick={() => onSelectProduct(product)} className="cursor-pointer">
                  <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest block">
                    {product.categoryLabel}
                  </span>
                  <h4 className="font-serif text-sm font-semibold text-on-surface leading-tight mt-0.5 line-clamp-1 group-hover:text-primary transition-colors">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-on-surface-variant mt-1">
                    <span>{product.goldPurity}</span>
                    <span>•</span>
                    <span>{product.diamondCarats} ct</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-outline-variant/20 flex items-center justify-between">
                  <div>
                    <span className="font-serif text-base font-bold text-primary block leading-none">
                      ₹{product.curatedPrice.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-on-surface-variant">0% EMI Available</span>
                  </div>

                  <div className="flex gap-1.5">
                    {hasAR && (
                      <button
                        onClick={() => onInstantTryOn(product)}
                        className="p-2 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high border border-primary/20 active:scale-95"
                        title="Virtual Try-On"
                      >
                        <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
                      </button>
                    )}
                    <button
                      onClick={() => onSelectProduct(product)}
                      className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-xs font-bold uppercase tracking-wider active:scale-95 transition-transform"
                    >
                      View
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
