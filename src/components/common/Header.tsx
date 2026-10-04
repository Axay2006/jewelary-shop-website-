import React from 'react';
import { LOGO_URL, PROFILE_AVATAR_URL } from '../../data/jewelryData';

interface HeaderProps {
  currentView: 'home' | 'details' | 'shop' | 'stylist' | 'try-on' | 'account';
  gold24kRate: number;
  gold24kChange: number;
  wishlistCount: number;
  cartCount: number;
  onBack?: () => void;
  onOpenSearch?: () => void;
  onOpenWishlist?: () => void;
  onOpenCart?: () => void;
  onOpenProfile?: () => void;
  onShare?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  gold24kRate,
  gold24kChange,
  wishlistCount,
  cartCount,
  onBack,
  onOpenSearch,
  onOpenWishlist,
  onOpenCart,
  onOpenProfile,
  onShare,
}) => {
  const isDetailsView = currentView === 'details';

  return (
    <header className="fixed top-0 w-full z-40 pt-safe bg-surface-container-lowest/85 backdrop-blur-xl border-b border-primary/10 shadow-[0_4px_24px_rgba(0,0,0,0.45)]">
      <div className="h-16 px-4 flex items-center justify-between gap-2 max-w-7xl mx-auto">
        {/* Left Section */}
        <div className="flex items-center gap-2 min-w-0">
          {isDetailsView ? (
            <>
              <button
                onClick={onBack}
                aria-label="Back"
                className="w-10 h-10 flex items-center justify-center text-on-surface hover:text-primary transition-colors active:scale-95"
              >
                <span className="material-symbols-outlined text-[22px]">arrow_back_ios_new</span>
              </button>
              <img
                src={LOGO_URL}
                alt="Aura Luxe Fine Jewellery Logo"
                className="h-7 w-auto object-contain shrink-0"
              />
              <h1 className="font-serif text-lg md:text-xl font-semibold text-on-surface tracking-tight truncate ml-1">
                Jewellery Details
              </h1>
            </>
          ) : (
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={LOGO_URL}
                alt="Aura Luxe Fine Jewellery Logo"
                className="h-8 w-auto object-contain shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="font-serif text-lg font-semibold text-primary tracking-tight truncate leading-tight">
                  Aura Luxe
                </span>
                <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-widest leading-none mt-0.5">
                  {currentView === 'home'
                    ? 'Home'
                    : currentView === 'shop'
                    ? 'Bespoke Atelier'
                    : currentView === 'stylist'
                    ? 'Private AI Salon'
                    : currentView === 'try-on'
                    ? 'AR Studio'
                    : 'Vault Dossier'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1">
          {!isDetailsView && (
            <div className="hidden sm:flex items-center gap-1 bg-surface-container-high px-2.5 py-1 rounded-full text-secondary text-xs border border-primary/20">
              <span className="material-symbols-outlined text-[14px]">monetization_on</span>
              <span className="font-semibold whitespace-nowrap">24K: ₹{gold24kRate.toLocaleString()}/g</span>
              <span className="text-[10px] text-primary">
                {gold24kChange >= 0 ? `▲ +${gold24kChange}%` : `▼ ${gold24kChange}%`}
              </span>
            </div>
          )}

          {isDetailsView ? (
            <button
              onClick={onShare}
              aria-label="Share Piece"
              className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
            </button>
          ) : (
            <>
              <button
                onClick={onOpenSearch}
                aria-label="Search Catalogue"
                className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors active:scale-95"
              >
                <span className="material-symbols-outlined text-[22px]">search</span>
              </button>

              <button
                onClick={onOpenWishlist}
                aria-label="Wishlist"
                className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors relative active:scale-95"
              >
                <span className="material-symbols-outlined text-[22px]">favorite</span>
                {wishlistCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary text-on-primary text-[9px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
            </>
          )}

          {/* Cart / Bag Icon */}
          <button
            onClick={onOpenCart}
            aria-label="Private Vault Bag"
            className="w-10 h-10 flex items-center justify-center text-on-surface-variant hover:text-primary transition-colors relative active:scale-95"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            {cartCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary-container text-on-primary text-[9px] font-bold flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile Avatar */}
          <button
            onClick={onOpenProfile}
            aria-label="Collector Profile"
            className="flex items-center ml-1 focus:outline-none active:scale-95 transition-transform"
          >
            <img
              src={PROFILE_AVATAR_URL}
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-primary/60 hover:ring-primary shadow-sm"
            />
          </button>
        </div>
      </div>
    </header>
  );
};
