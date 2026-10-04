import React from 'react';
import { JewelleryProduct } from '../../types/jewelry';

interface WishlistModalProps {
  wishlistProducts: JewelleryProduct[];
  onRemoveFromWishlist: (id: string) => void;
  onSelectProduct: (product: JewelleryProduct) => void;
  onClose: () => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  wishlistProducts,
  onRemoveFromWishlist,
  onSelectProduct,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-surface-dim/95 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto">
      <div className="pt-safe px-4 pb-3 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest/80 backdrop-blur-md max-w-md mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">favorite</span>
          <div>
            <h2 className="font-serif text-base font-semibold text-on-surface">
              Curated Wishlist
            </h2>
            <span className="text-[10px] text-secondary">
              {wishlistProducts.length} Saved {wishlistProducts.length === 1 ? 'Heirloom' : 'Heirlooms'}
            </span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:text-primary transition-colors border border-outline-variant/30"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      <div className="flex-1 max-w-md mx-auto w-full p-4 space-y-3">
        {wishlistProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 gap-3">
            <span className="material-symbols-outlined text-[48px] text-outline">
              favorite_border
            </span>
            <p className="text-sm font-serif text-on-surface">Your Wishlist is Empty</p>
            <p className="text-xs text-on-surface-variant max-w-xs">
              Save your favorite solitaires, polki chokers, and chandelier drops to review with your master gemologist.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-5 py-2 rounded-xl bg-primary text-on-primary text-xs uppercase font-bold tracking-wider active:scale-95"
            >
              Browse Heirlooms
            </button>
          </div>
        ) : (
          wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="p-3.5 rounded-2xl bg-surface-container flex gap-3 border border-outline-variant/30 items-center justify-between"
            >
              <div
                onClick={() => {
                  onSelectProduct(product);
                  onClose();
                }}
                className="flex items-center gap-3 cursor-pointer min-w-0 flex-1"
              >
                <img
                  src={product.images.main}
                  alt={product.name}
                  className="w-16 h-16 rounded-xl object-cover bg-surface-container-lowest shrink-0"
                />
                <div className="min-w-0">
                  <span className="text-[9px] uppercase tracking-wider text-secondary font-bold block truncate">
                    {product.categoryLabel}
                  </span>
                  <h4 className="font-serif text-xs font-semibold text-on-surface truncate">
                    {product.name}
                  </h4>
                  <span className="text-xs font-bold text-primary block mt-0.5">
                    ₹{product.curatedPrice.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-primary text-on-primary text-[10px] uppercase font-bold tracking-wider active:scale-95 shadow-sm"
                >
                  View
                </button>
                <button
                  onClick={() => onRemoveFromWishlist(product.id)}
                  className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface-variant hover:text-error flex items-center justify-center text-xs"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="pb-safe" />
    </div>
  );
};
