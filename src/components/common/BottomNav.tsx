import React from 'react';

export type NavTab = 'home' | 'shop' | 'stylist' | 'try-on' | 'account';

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onSelectTab }) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pb-safe bg-surface-container-lowest/90 backdrop-blur-2xl border-t border-primary/15 shadow-[0_-8px_32px_rgba(0,0,0,0.6)]">
      <div className="flex justify-around items-center h-16 px-2 max-w-md mx-auto">
        {/* Home */}
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center justify-center w-14 h-14 transition-colors group ${
            currentTab === 'home' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <div className="relative flex flex-col items-center">
            <span className="material-symbols-outlined text-[22px]">diamond</span>
            <span
              className={`absolute -bottom-1.5 w-1 h-1 rounded-full bg-primary transition-opacity ${
                currentTab === 'home' ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
          <span className="text-[10px] font-semibold mt-1 uppercase tracking-wider">Home</span>
        </button>

        {/* Shop */}
        <button
          onClick={() => onSelectTab('shop')}
          className={`flex flex-col items-center justify-center w-14 h-14 transition-colors group ${
            currentTab === 'shop' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <div className="relative flex flex-col items-center">
            <span className="material-symbols-outlined text-[22px]">grid_view</span>
            <span
              className={`absolute -bottom-1.5 w-1 h-1 rounded-full bg-primary transition-opacity ${
                currentTab === 'shop' ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
          <span className="text-[10px] font-semibold mt-1 uppercase tracking-wider">Shop</span>
        </button>

        {/* Stylist (Elevated AI Capsule) */}
        <button
          onClick={() => onSelectTab('stylist')}
          className="flex flex-col items-center justify-center w-14 h-14 text-on-surface-variant transition-colors group relative"
        >
          <div className="relative flex flex-col items-center">
            <div
              className={`relative flex items-center justify-center w-9 h-9 rounded-full transition-transform active:scale-90 ${
                currentTab === 'stylist'
                  ? 'bg-primary-container text-on-primary ring-2 ring-primary shadow-[0_0_16px_rgba(242,202,80,0.5)]'
                  : 'bg-surface-container-high text-primary ring-1 ring-primary/40 shadow-[0_0_12px_rgba(212,175,55,0.25)]'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
              <span className="absolute -top-1 -right-1 px-1 bg-primary text-on-primary text-[8px] font-bold rounded-full leading-tight shadow-sm">
                AI
              </span>
            </div>
            <span
              className={`absolute -bottom-1.5 w-1 h-1 rounded-full bg-primary transition-opacity ${
                currentTab === 'stylist' ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
          <span
            className={`text-[10px] font-semibold mt-0.5 uppercase tracking-wider ${
              currentTab === 'stylist' ? 'text-primary' : 'text-secondary'
            }`}
          >
            Stylist
          </span>
        </button>

        {/* Try-On */}
        <button
          onClick={() => onSelectTab('try-on')}
          className={`flex flex-col items-center justify-center w-14 h-14 transition-colors group ${
            currentTab === 'try-on' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <div className="relative flex flex-col items-center">
            <span className="material-symbols-outlined text-[22px]">view_in_ar</span>
            <span
              className={`absolute -bottom-1.5 w-1 h-1 rounded-full bg-primary transition-opacity ${
                currentTab === 'try-on' ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
          <span className="text-[10px] font-semibold mt-1 uppercase tracking-wider">Try-On</span>
        </button>

        {/* Account / Vault */}
        <button
          onClick={() => onSelectTab('account')}
          className={`flex flex-col items-center justify-center w-14 h-14 transition-colors group ${
            currentTab === 'account' ? 'text-primary' : 'text-on-surface-variant hover:text-on-surface'
          }`}
        >
          <div className="relative flex flex-col items-center">
            <span className="material-symbols-outlined text-[22px]">shield_lock</span>
            <span
              className={`absolute -bottom-1.5 w-1 h-1 rounded-full bg-primary transition-opacity ${
                currentTab === 'account' ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </div>
          <span className="text-[10px] font-semibold mt-1 uppercase tracking-wider">Vault</span>
        </button>
      </div>
    </nav>
  );
};
