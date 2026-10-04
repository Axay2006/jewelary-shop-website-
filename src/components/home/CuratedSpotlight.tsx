import React from 'react';
import { JewelleryProduct } from '../../types/jewelry';

interface CuratedSpotlightProps {
  products: JewelleryProduct[];
  onSelectProduct: (product: JewelleryProduct) => void;
  onInstantTryOn: (product: JewelleryProduct) => void;
  onQuickReserve: (product: JewelleryProduct) => void;
  onToggleWishlist: (productId: string) => void;
  wishlistIds: string[];
}

export const CuratedSpotlight: React.FC<CuratedSpotlightProps> = ({
  products,
  onSelectProduct,
  onInstantTryOn,
  onQuickReserve,
  onToggleWishlist,
  wishlistIds,
}) => {
  return (
    <section className="py-3 w-full">
      <div className="px-4 flex items-end justify-between mb-3">
        <div>
          <span className="text-[10px] font-bold text-secondary uppercase tracking-widest block">
            Signature Vault
          </span>
          <h3 className="font-serif text-xl font-semibold text-on-surface">
            Curated Spotlight
          </h3>
        </div>
        <span className="text-[10px] font-semibold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full border border-primary/20">
          {products.length} Vault Exclusives
        </span>
      </div>

      <div className="px-4 flex flex-col gap-4">
        {products.map((product) => {
          const isWishlisted = wishlistIds.includes(product.id);
          const hasAR = Boolean(product.images.tryOnOverlay);

          return (
            <div
              key={product.id}
              className="bg-surface-container-low rounded-2xl overflow-hidden shadow-xl flex flex-col border border-primary/15 transition-all hover:border-primary/40 group"
            >
              {/* Product Visual */}
              <div
                onClick={() => onSelectProduct(product)}
                className="relative w-full h-60 bg-surface-container-lowest cursor-pointer overflow-hidden"
              >
                <img
                  src={product.images.main}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Ambient glow in image background */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low/80 via-transparent to-transparent pointer-events-none" />

                {/* Badges on Top Left */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                  {hasAR && (
                    <span className="bg-surface-container-highest/90 backdrop-blur-md text-primary px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-bold flex items-center gap-1 border border-primary/20 shadow-sm">
                      <span className="material-symbols-outlined text-[13px]">view_in_ar</span>
                      AR Virtual Try-On
                    </span>
                  )}
                  {product.tags.length > 0 && (
                    <span className="bg-secondary-container/90 backdrop-blur-md text-secondary-fixed px-2.5 py-1 rounded-full text-[9px] uppercase tracking-wider font-semibold border border-secondary/30 shadow-sm">
                      {product.tags[0]}
                    </span>
                  )}
                </div>

                {/* Wishlist Button on Top Right */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleWishlist(product.id);
                  }}
                  aria-label="Add to wishlist"
                  className={`absolute top-3 right-3 w-8 h-8 rounded-full backdrop-blur-md flex items-center justify-center transition-all z-10 ${
                    isWishlisted
                      ? 'bg-primary text-on-primary shadow-lg scale-110'
                      : 'bg-surface-container-highest/75 text-on-surface-variant hover:text-primary hover:bg-surface-container-highest'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: isWishlisted ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    favorite
                  </span>
                </button>
              </div>

              {/* Product Info & Action CTAs */}
              <div className="p-3.5 flex flex-col gap-2">
                <div
                  onClick={() => onSelectProduct(product)}
                  className="flex justify-between items-start cursor-pointer"
                >
                  <div className="pr-2">
                    <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest block">
                      {product.categoryLabel}
                    </span>
                    <h4 className="font-serif text-base font-semibold text-on-surface leading-tight mt-0.5 group-hover:text-primary transition-colors">
                      {product.name}
                    </h4>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-serif text-lg font-bold text-primary block leading-none">
                      ₹{product.curatedPrice.toLocaleString()}
                    </span>
                    <span className="text-[9px] text-on-surface-variant">Incl. all taxes</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-on-surface-variant text-xs pt-0.5">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {product.goldPurity}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {product.diamondSpecs}
                  </span>
                </div>

                {/* Actions Grid */}
                <div className="grid grid-cols-2 gap-2 pt-1.5">
                  <button
                    onClick={() => {
                      if (hasAR) {
                        onInstantTryOn(product);
                      } else {
                        onSelectProduct(product);
                      }
                    }}
                    className="w-full py-2.5 bg-surface-container-high text-on-surface text-xs uppercase tracking-wider rounded-lg font-semibold flex items-center justify-center gap-1.5 active:scale-95 transition-all border border-outline-variant/30 hover:bg-surface-container-highest"
                  >
                    <span className="material-symbols-outlined text-[16px] text-primary">
                      {hasAR ? 'view_in_ar' : 'visibility'}
                    </span>
                    <span>{hasAR ? 'Instant Try-On' : 'Details'}</span>
                  </button>

                  <button
                    onClick={() => onQuickReserve(product)}
                    className="w-full py-2.5 bg-primary text-on-primary text-xs uppercase tracking-wider rounded-lg font-bold flex items-center justify-center gap-1.5 active:scale-95 transition-all shadow-md hover:bg-primary-fixed"
                  >
                    <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                    <span>Reserve Piece</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
