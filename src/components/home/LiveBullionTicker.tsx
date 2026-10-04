import React, { useState } from 'react';
import { BullionRates } from '../../types/jewelry';

interface LiveBullionTickerProps {
  rates: BullionRates;
  onRefresh?: () => void;
}

export const LiveBullionTicker: React.FC<LiveBullionTickerProps> = ({ rates, onRefresh }) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    if (onRefresh) onRefresh();
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <section className="px-4 pt-2 pb-2 w-full">
      <div className="bg-surface-container-low rounded-xl p-3 flex flex-col gap-2 shadow-md border border-primary/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-secondary">
              Live Bullion Benchmark
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 bg-surface-container-highest px-2 py-0.5 rounded-full text-on-surface-variant">
              <span className="material-symbols-outlined text-[13px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <span className="text-[9px] uppercase tracking-widest text-primary font-bold">
                BIS Hallmark Guaranteed
              </span>
            </div>
            <button
              onClick={handleRefresh}
              aria-label="Refresh rates"
              className="text-on-surface-variant hover:text-primary transition-colors p-0.5"
            >
              <span className={`material-symbols-outlined text-[14px] ${isRefreshing ? 'animate-spin' : ''}`}>
                refresh
              </span>
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between overflow-x-auto gap-2 pt-0.5 pb-0.5 no-scrollbar">
          {/* 24K Gold */}
          <div className="flex items-baseline gap-1.5 whitespace-nowrap bg-surface-container px-2.5 py-1.5 rounded-lg flex-1 border border-outline-variant/30">
            <span className="text-[10px] text-on-surface-variant font-bold uppercase">24K Gold</span>
            <span className="text-[13px] font-bold text-primary">
              ₹{rates.gold24k.toLocaleString()}
              <span className="text-[9px] text-on-surface-variant font-normal">/g</span>
            </span>
            <span className="text-[9px] text-primary font-semibold ml-auto">
              ▲ +{rates.gold24kChange}%
            </span>
          </div>

          {/* 22K Gold */}
          <div className="flex items-baseline gap-1.5 whitespace-nowrap bg-surface-container px-2.5 py-1.5 rounded-lg flex-1 border border-outline-variant/30">
            <span className="text-[10px] text-on-surface-variant font-bold uppercase">22K Gold</span>
            <span className="text-[13px] font-bold text-on-surface">
              ₹{rates.gold22k.toLocaleString()}
              <span className="text-[9px] text-on-surface-variant font-normal">/g</span>
            </span>
            <span className="text-[9px] text-secondary font-semibold ml-auto">
              ▲ +{rates.gold22kChange}%
            </span>
          </div>

          {/* 925 Silver */}
          <div className="flex items-baseline gap-1.5 whitespace-nowrap bg-surface-container px-2.5 py-1.5 rounded-lg flex-1 border border-outline-variant/30">
            <span className="text-[10px] text-on-surface-variant font-bold uppercase">925 Silver</span>
            <span className="text-[13px] font-bold text-secondary">
              ₹{rates.silver925.toLocaleString()}
              <span className="text-[9px] text-on-surface-variant font-normal">/g</span>
            </span>
            <span className="text-[9px] text-on-surface-variant font-semibold ml-auto">
              {rates.silver925Change >= 0 ? `▲ +${rates.silver925Change}%` : `▼ ${rates.silver925Change}%`}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
