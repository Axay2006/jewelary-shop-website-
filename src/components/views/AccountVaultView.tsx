import React from 'react';
import { PROFILE_AVATAR_URL } from '../../data/jewelryData';
import { usePWAInstall } from '../../hooks/usePWAInstall';

interface AccountVaultViewProps {
  wishlistCount: number;
  onOpenWishlist: () => void;
  onOpenStoreModal: () => void;
  onBookAtelier: () => void;
}

export const AccountVaultView: React.FC<AccountVaultViewProps> = ({
  wishlistCount,
  onOpenWishlist,
  onOpenStoreModal,
  onBookAtelier,
}) => {
  const { isInstallable, isInstalled, install } = usePWAInstall();

  return (
    <div className="flex flex-col w-full pb-24 px-4 max-w-md mx-auto space-y-4">
      {/* Profile Header */}
      <div className="p-4 rounded-2xl bg-surface-container-low border border-primary/20 shadow-xl flex items-center gap-3.5">
        <div className="relative">
          <img
            src={PROFILE_AVATAR_URL}
            alt="Patron Profile"
            className="w-16 h-16 rounded-full object-cover ring-2 ring-primary shadow-lg"
          />
          <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-[10px] font-bold shadow-md">
            ✓
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h2 className="font-serif text-base font-bold text-on-surface truncate">
              Maharani Gayatri V.
            </h2>
            <span className="px-1.5 py-0.2 rounded bg-secondary-container text-secondary text-[8px] font-bold uppercase tracking-wider">
              Patron VIP
            </span>
          </div>
          <span className="text-[11px] text-on-surface-variant block mt-0.5">
            Aura Vault ID: #AL-98421-DEL
          </span>
          <span className="text-[10px] text-secondary font-medium">
            Place Vendôme &amp; Mayfair Salon Access Granted
          </span>
        </div>
      </div>

      {/* Vault Status & Assets */}
      <div className="grid grid-cols-2 gap-2.5">
        <div className="p-3.5 rounded-xl bg-surface-container flex flex-col justify-between border border-outline-variant/30">
          <span className="text-[10px] text-on-surface-variant uppercase font-bold">
            Escrow Vault Value
          </span>
          <div className="mt-2">
            <span className="font-serif text-xl font-bold text-primary block">
              ₹4,28,000
            </span>
            <span className="text-[10px] text-secondary">2 Certified Pieces</span>
          </div>
        </div>

        <div
          onClick={onOpenWishlist}
          className="p-3.5 rounded-xl bg-surface-container flex flex-col justify-between border border-outline-variant/30 cursor-pointer hover:border-primary/40 transition-colors"
        >
          <span className="text-[10px] text-on-surface-variant uppercase font-bold">
            Private Wishlist
          </span>
          <div className="mt-2">
            <span className="font-serif text-xl font-bold text-on-surface block">
              {wishlistCount} Pieces
            </span>
            <span className="text-[10px] text-primary underline">View Wishlist →</span>
          </div>
        </div>
      </div>

      {/* App Store & Play Store Packaging Section */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-surface-container-high to-surface-container border border-primary/30 shadow-xl space-y-2.5">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">publish</span>
          <div>
            <h3 className="font-serif text-sm font-bold text-on-surface">
              App Store &amp; Play Store Deployment
            </h3>
            <span className="text-[10px] text-secondary">
              Publishing manifests, Capacitor commands &amp; TWA
            </span>
          </div>
        </div>

        <p className="text-xs text-on-surface-variant leading-relaxed">
          This mobile app is pre-configured with a Web App Manifest, Service Worker, and 512px icons. You can directly package it for Google Play Store and Apple App Store.
        </p>

        <div className="flex gap-2 pt-1">
          <button
            onClick={onOpenStoreModal}
            className="flex-1 py-2 bg-primary text-on-primary text-xs uppercase font-bold tracking-wider rounded-lg active:scale-95 transition-transform shadow-md flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">store</span>
            <span>Store Guide</span>
          </button>

          {isInstallable && !isInstalled && (
            <button
              onClick={install}
              className="px-3 py-2 bg-surface-container-highest text-secondary text-xs uppercase font-semibold rounded-lg active:scale-95 border border-secondary/30"
            >
              Install PWA
            </button>
          )}
        </div>
      </div>

      {/* Concierge Services & Appointments */}
      <div className="p-4 rounded-2xl bg-surface-container space-y-3 border border-outline-variant/30 text-xs">
        <h3 className="font-serif text-sm font-semibold text-on-surface">
          Concierge &amp; Bespoke Services
        </h3>

        <div className="space-y-2">
          <button
            onClick={onBookAtelier}
            className="w-full p-2.5 rounded-xl bg-surface-container-high flex items-center justify-between text-left hover:bg-surface-container-highest transition-colors border border-outline-variant/20"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-secondary text-[18px]">calendar_today</span>
              <div>
                <span className="font-semibold text-on-surface block">Book Private Boutique Visit</span>
                <span className="text-[10px] text-on-surface-variant">Mayfair, Place Vendôme or Mumbai</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[16px] text-on-surface-variant">chevron_right</span>
          </button>

          <div className="p-2.5 rounded-xl bg-surface-container-high flex items-center justify-between text-left border border-outline-variant/20">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-primary text-[18px]">security</span>
              <div>
                <span className="font-semibold text-on-surface block">Brink&apos;s Armored Delivery</span>
                <span className="text-[10px] text-on-surface-variant">GPS insured biometric transit enabled</span>
              </div>
            </div>
            <span className="text-[10px] text-secondary font-bold">Active</span>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-container-high flex items-center justify-between text-left border border-outline-variant/20">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-secondary text-[18px]">workspace_premium</span>
              <div>
                <span className="font-semibold text-on-surface block">BIS &amp; IGI Gemological Dossier</span>
                <span className="text-[10px] text-on-surface-variant">Encrypted digital certificate passports</span>
              </div>
            </div>
            <span className="text-[10px] text-primary font-bold">Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};
