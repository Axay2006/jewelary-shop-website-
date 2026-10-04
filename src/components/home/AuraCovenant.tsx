import React from 'react';

interface AuraCovenantProps {
  onBookAtelier: () => void;
}

export const AuraCovenant: React.FC<AuraCovenantProps> = ({ onBookAtelier }) => {
  const pillars = [
    {
      icon: 'verified_user',
      title: '100% Certified',
      description: 'IGI, GIA & BIS Hallmarked guarantee',
    },
    {
      icon: 'published_with_changes',
      title: 'Lifetime Exchange',
      description: 'Transparent buyback values on demand',
    },
    {
      icon: 'local_shipping',
      title: 'Insured Transit',
      description: 'Armoured, discreet doorstep drop-off',
    },
    {
      icon: 'history',
      title: '30-Day Returns',
      description: 'Hassle-free salon return policy',
    },
  ];

  return (
    <section className="px-4 py-3 w-full">
      <div className="bg-surface-container-low rounded-2xl p-4 shadow-xl border border-primary/15">
        <div className="text-center mb-4">
          <span className="text-[10px] font-bold uppercase tracking-widest text-secondary block">
            The Aura Covenant
          </span>
          <h4 className="font-serif text-lg font-semibold text-on-surface">
            Uncompromising Integrity
          </h4>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-surface-container p-3 rounded-xl flex flex-col items-center text-center gap-1.5 border border-outline-variant/25 transition-transform hover:-translate-y-0.5"
            >
              <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary shadow-sm border border-primary/20">
                <span className="material-symbols-outlined text-[18px]">{pillar.icon}</span>
              </div>
              <span className="text-xs text-on-surface font-semibold mt-1">
                {pillar.title}
              </span>
              <span className="text-[11px] text-on-surface-variant leading-tight">
                {pillar.description}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Private Atelier Card */}
      <div className="mt-3 p-4 rounded-2xl bg-surface-container-lowest flex items-center justify-between shadow-xl border border-primary/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
            <span className="material-symbols-outlined text-[20px]">diamond</span>
          </div>
          <div>
            <span className="text-[9px] font-bold uppercase tracking-widest text-primary block leading-none">
              Private Atelier
            </span>
            <span className="font-serif text-sm font-semibold text-on-surface leading-tight">
              Custom Heirlooms
            </span>
          </div>
        </div>
        <button
          onClick={onBookAtelier}
          className="bg-surface-container-high text-secondary hover:text-primary px-3.5 py-2 rounded-lg text-xs uppercase tracking-wider font-semibold active:scale-95 transition-all border border-secondary/30"
        >
          Book Atelier
        </button>
      </div>
    </section>
  );
};
