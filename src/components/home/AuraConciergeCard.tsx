import React, { useState } from 'react';

interface AuraConciergeCardProps {
  onAskConcierge: (query: string) => void;
}

export const AuraConciergeCard: React.FC<AuraConciergeCardProps> = ({ onAskConcierge }) => {
  const [inputQuery, setInputQuery] = useState('');
  const [isCurating, setIsCurating] = useState(false);

  const chips = [
    {
      label: 'Emerald Choker < ₹1.5L',
      icon: 'flare',
      query: 'Find an emerald choker under ₹1,50,000 for a sangeet soirée',
    },
    {
      label: '18K Solitaires',
      icon: 'diamond',
      query: 'Show solitaire engagement rings in 18K gold with IGI certified diamonds',
    },
    {
      label: 'Daily Diamond Studs',
      icon: 'work',
      query: 'Recommend lightweight everyday diamond earrings for daily office wear',
    },
  ];

  const handleChipClick = (query: string) => {
    setInputQuery(query);
  };

  const handleAsk = () => {
    if (!inputQuery.trim()) return;
    setIsCurating(true);
    setTimeout(() => {
      setIsCurating(false);
      onAskConcierge(inputQuery);
      setInputQuery('');
    }, 600);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAsk();
    }
  };

  return (
    <section className="px-4 py-2 w-full">
      <div className="relative w-full bg-surface-container-low rounded-2xl p-4 shadow-xl overflow-hidden border border-primary/20">
        {/* Glow ambient halo */}
        <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-primary/15 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center shadow-md border border-primary/30">
                <span className="material-symbols-outlined text-primary text-[18px]">auto_awesome</span>
              </div>
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-primary block leading-none">
                  Private Salon AI
                </span>
                <span className="font-serif text-base font-semibold text-on-surface leading-tight">
                  Aura Concierge
                </span>
              </div>
            </div>
            <span className="bg-surface-container-highest text-[10px] font-semibold text-secondary px-2.5 py-0.5 rounded-full border border-primary/20">
              Always Discerning
            </span>
          </div>

          <p className="text-xs text-on-surface-variant italic leading-relaxed">
            &quot;Need help choosing? Try asking for an emerald choker under ₹1,50,000 for a sangeet soirée.&quot;
          </p>

          {/* Prompt chips */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
            {chips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleChipClick(chip.query)}
                className="whitespace-nowrap bg-surface-container-high hover:bg-surface-container-highest text-on-surface px-2.5 py-1.5 rounded-lg text-[11px] font-medium transition-colors flex items-center gap-1.5 border border-outline-variant/30 active:scale-95"
              >
                <span className="material-symbols-outlined text-[13px] text-secondary">{chip.icon}</span>
                <span>{chip.label}</span>
              </button>
            ))}
          </div>

          {/* Action Input Bar */}
          <div className="mt-1 flex items-center gap-2 bg-surface-container rounded-xl p-1.5 border border-outline-variant/30 focus-within:border-primary/50 transition-colors">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Speak or describe your desired jewel..."
              className="w-full bg-transparent px-2.5 py-1 text-on-surface placeholder:text-on-surface-variant text-xs focus:outline-none"
            />
            <button
              onClick={handleAsk}
              disabled={isCurating}
              className="bg-primary text-on-primary px-3.5 py-2 rounded-lg text-[10px] uppercase tracking-wider font-bold whitespace-nowrap active:scale-95 transition-all shadow-md flex items-center gap-1 hover:bg-primary-fixed disabled:opacity-50"
            >
              {isCurating ? (
                <>
                  <span className="material-symbols-outlined text-[13px] animate-spin">progress_activity</span>
                  <span>Curating...</span>
                </>
              ) : (
                <>
                  <span>Ask Aura</span>
                  <span className="material-symbols-outlined text-[13px]">send</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
