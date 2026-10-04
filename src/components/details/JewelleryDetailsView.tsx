import React, { useState } from 'react';
import { JewelleryProduct, MetalType } from '../../types/jewelry';

interface JewelleryDetailsViewProps {
  product: JewelleryProduct;
  onOpenAR: (product: JewelleryProduct) => void;
  onOpenCertificate: (product: JewelleryProduct) => void;
  onOpenAIStylist: (product: JewelleryProduct) => void;
  onAddToBag: (product: JewelleryProduct, metal: MetalType, size: number, engraving: string) => void;
  onInstantReserve: (product: JewelleryProduct, metal: MetalType, size: number, engraving: string) => void;
}

export const JewelleryDetailsView: React.FC<JewelleryDetailsViewProps> = ({
  product,
  onOpenAR,
  onOpenCertificate,
  onOpenAIStylist,
  onAddToBag,
  onInstantReserve,
}) => {
  // State for active image
  const [activeAngleIdx, setActiveAngleIdx] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isPriceBreakdownOpen, setIsPriceBreakdownOpen] = useState(false);
  const [selectedMetal, setSelectedMetal] = useState<MetalType>('yellow');
  const [selectedSize, setSelectedSize] = useState<number>(product.popularSize || 14);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [engravingText, setEngravingText] = useState('');
  const [pincode, setPincode] = useState('');
  const [pincodeChecked, setPincodeChecked] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  const angles = product.images.angles && product.images.angles.length > 0
    ? product.images.angles
    : [{ id: 'main', label: 'Main View', url: product.images.main, description: product.name }];

  const currentImageUrl = angles[activeAngleIdx] ? angles[activeAngleIdx].url : product.images.main;

  const activeMetalObj = product.metals.find((m) => m.type === selectedMetal) || product.metals[0];
  const totalPrice = product.curatedPrice + (activeMetalObj?.surcharge || 0);

  const handlePincodeCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.trim().length >= 5) {
      setPincodeChecked(true);
    }
  };

  const handleAdd = () => {
    onAddToBag(product, selectedMetal, selectedSize, engravingText);
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 2200);
  };

  return (
    <div className="flex flex-col w-full pb-36 relative">
      {/* Added Toast Notification */}
      {addedToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-primary text-on-primary px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-2xl flex items-center gap-2 animate-bounce">
          <span className="material-symbols-outlined text-[16px]">check_circle</span>
          <span>Added to Private Vault Bag!</span>
        </div>
      )}

      {/* Top Gallery & AR Stage */}
      <section className="relative w-full bg-surface-container-lowest px-4 pt-4 pb-6 flex flex-col items-center border-b border-outline-variant/20">
        {/* Ambient Luminous Glow behind the Gem */}
        <div className="absolute inset-0 bg-radial from-primary/10 via-transparent to-transparent opacity-60 pointer-events-none" />

        {/* Main Showcase Visual */}
        <div className="relative w-full aspect-square max-w-[340px] rounded-2xl overflow-hidden bg-surface-container-low flex items-center justify-center shadow-2xl border border-primary/20">
          <img
            src={currentImageUrl}
            alt={product.name}
            id="main-product-view"
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isZoomed ? 'scale-150 cursor-zoom-out' : 'hover:scale-105 cursor-zoom-in'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          />

          {/* 360° Drag & Rotate Indicator Badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-highest/85 backdrop-blur-md shadow-md border border-primary/20">
            <span className="material-symbols-outlined text-[14px] text-primary animate-spin" style={{ animationDuration: '6s' }}>
              360
            </span>
            <span className="text-[9px] font-bold text-on-surface uppercase tracking-widest">
              360° View
            </span>
          </div>

          {/* High-Res Zoom Toggle */}
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            aria-label="Toggle Magnifier"
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-highest/85 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary transition-colors shadow-md border border-primary/20 active:scale-95"
          >
            <span className="material-symbols-outlined text-[16px]">
              {isZoomed ? 'zoom_out' : 'zoom_in'}
            </span>
          </button>

          {/* Sparkle Touch Highlight */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-dim/80 backdrop-blur-sm border border-secondary/30">
            <span className="material-symbols-outlined text-[13px] text-secondary">auto_awesome</span>
            <span className="text-[9px] font-bold text-secondary tracking-wider">Flawless Lustre</span>
          </div>
        </div>

        {/* Multi-Angle Thumbnails */}
        {angles.length > 1 && (
          <div className="w-full max-w-[340px] flex items-center justify-between gap-2 mt-4">
            {angles.map((angle, idx) => {
              const isSelected = activeAngleIdx === idx;
              return (
                <button
                  key={angle.id}
                  onClick={() => setActiveAngleIdx(idx)}
                  className={`angle-thumb flex-1 aspect-square rounded-xl bg-surface-container overflow-hidden p-1 shadow-sm transition-all ${
                    isSelected
                      ? 'scale-105 ring-2 ring-primary opacity-100'
                      : 'opacity-60 hover:opacity-100 ring-1 ring-outline-variant/30'
                  }`}
                >
                  <img
                    src={angle.url}
                    alt={angle.label}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </button>
              );
            })}
          </div>
        )}

        {/* Interactive 3D Virtual Hand Try-On Banner */}
        <div className="w-full max-w-[340px] mt-4">
          <button
            onClick={() => onOpenAR(product)}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-high shadow-xl flex items-center justify-between active:scale-[0.98] transition-transform border border-primary/30 group"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary/30 transition-colors border border-primary/30">
                <span className="material-symbols-outlined text-[20px]">view_in_ar</span>
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-semibold text-on-surface">3D Virtual Hand Try-On</span>
                  <span className="px-1.5 py-0.5 rounded bg-primary-container text-on-primary text-[8px] uppercase font-bold tracking-wider">
                    AR LIVE
                  </span>
                </div>
                <span className="text-[11px] text-on-surface-variant font-normal">
                  Real-scale fit via your phone camera
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-primary text-[20px] group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </button>
        </div>
      </section>

      {/* Product Title & Live Pricing Breakdown */}
      <section className="w-full px-4 pt-5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-secondary tracking-widest uppercase">
            {product.atelier}
          </span>
          <div className="flex items-center gap-1 text-on-surface-variant text-xs">
            <span className="material-symbols-outlined text-[15px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              star
            </span>
            <span className="text-on-surface font-semibold">{product.rating}</span>
            <span>({product.reviewsCount} Bespoke Reviews)</span>
          </div>
        </div>

        <h2 className="font-serif text-xl sm:text-2xl font-semibold text-on-surface leading-snug">
          {product.name}
        </h2>

        {/* Price Header & Breakdown Accordion Toggle */}
        <div className="mt-1 rounded-2xl bg-surface-container-low p-4 shadow-lg flex flex-col gap-2 border border-primary/15">
          <div className="flex items-baseline justify-between">
            <div className="flex flex-col">
              <span className="text-[9px] font-bold text-on-surface-variant uppercase tracking-wider">
                Curated Fair Price
              </span>
              <div className="flex items-baseline gap-2">
                <span className="font-serif text-2xl font-bold text-primary">
                  ₹{totalPrice.toLocaleString()}
                </span>
                <span className="text-sm text-on-surface-variant line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsPriceBreakdownOpen(!isPriceBreakdownOpen)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container-high text-secondary hover:text-primary transition-colors text-xs font-semibold uppercase tracking-wider border border-secondary/20 active:scale-95"
            >
              <span>Price Breakup</span>
              <span className={`material-symbols-outlined text-[16px] transition-transform duration-300 ${isPriceBreakdownOpen ? 'rotate-180' : ''}`}>
                expand_more
              </span>
            </button>
          </div>

          {/* Expandable Breakdown Content */}
          {isPriceBreakdownOpen && (
            <div className="flex flex-col gap-1.5 pt-2 border-t border-outline-variant/30 text-xs">
              <div className="p-2.5 rounded-lg bg-surface-container flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-on-surface font-medium">{product.goldPurity} Component</span>
                  <span className="text-[10px] text-on-surface-variant">
                    {product.goldWeightGrams} gms @ ₹{product.priceBreakup.goldSpotRate.toLocaleString()}/g daily spot
                  </span>
                </div>
                <span className="text-sm font-semibold text-on-surface">
                  ₹{product.priceBreakup.goldAmount.toLocaleString()}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-on-surface font-medium">Solitaire Solis Diamond</span>
                  <span className="text-[10px] text-on-surface-variant">{product.diamondSpecs}</span>
                </div>
                <span className="text-sm font-semibold text-on-surface">
                  ₹{product.priceBreakup.diamondAmount.toLocaleString()}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-on-surface font-medium">Haute Making &amp; Master Setting</span>
                  <span className="text-[10px] text-primary">
                    {product.priceBreakup.makingChargesPercent}% (Festival Waiver Applied)
                  </span>
                </div>
                <span className="text-sm font-semibold text-on-surface">
                  ₹{product.priceBreakup.makingChargesAmount.toLocaleString()}
                </span>
              </div>

              <div className="p-2.5 rounded-lg bg-surface-container flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-on-surface font-medium">Statutory GST</span>
                  <span className="text-[10px] text-on-surface-variant">
                    Central &amp; State ({product.priceBreakup.gstPercent}%)
                  </span>
                </div>
                <span className="text-sm font-semibold text-on-surface">
                  ₹{product.priceBreakup.gstAmount.toLocaleString()}
                </span>
              </div>

              {/* Transparency Seal */}
              <div className="mt-1 flex items-center gap-2 p-2.5 rounded-lg bg-surface-container-highest/60 text-secondary border border-secondary/20">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span className="text-[11px] leading-tight">
                  Total Transparency Guarantee — Zero hidden markups or assay fees.
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Purity & Gemological Certifications */}
      <section className="w-full px-4 pt-5">
        <div className="grid grid-cols-2 gap-2.5">
          {/* BIS Hallmark Badge */}
          <div className="p-3 rounded-2xl bg-surface-container-low flex flex-col justify-between shadow-md border border-outline-variant/30">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-surface-container-high flex items-center justify-center text-secondary border border-secondary/30">
                <span className="material-symbols-outlined text-[16px]">workspace_premium</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-secondary">
                Govt. Verified
              </span>
            </div>
            <div className="mt-2.5">
              <h3 className="text-xs sm:text-sm font-bold text-on-surface font-serif">BIS Hallmark 750</h3>
              <p className="text-[10px] text-on-surface-variant mt-0.5 leading-tight">
                Guaranteed 18K purity gold with official assay emblem
              </p>
            </div>
          </div>

          {/* IGI Certificate Badge */}
          <div className="p-3 rounded-2xl bg-surface-container-low flex flex-col justify-between shadow-md border border-primary/20">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-surface-container-high flex items-center justify-center text-primary border border-primary/30">
                <span className="material-symbols-outlined text-[16px]">diamond</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-wider text-primary">
                IGI Certified
              </span>
            </div>
            <div className="mt-2.5">
              <h3 className="text-xs sm:text-sm font-bold text-on-surface font-serif">#{product.certificate.number}</h3>
              <button
                onClick={() => onOpenCertificate(product)}
                className="text-[11px] text-secondary underline hover:text-primary transition-colors text-left mt-0.5 block font-medium"
              >
                View Certificate PDF
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bespoke Customization */}
      <section className="w-full px-4 pt-5 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="font-serif text-lg font-semibold text-on-surface">
            Bespoke Customization
          </span>
          <span className="text-xs text-secondary font-medium">Handcrafted on Order</span>
        </div>

        {/* Metal Choice */}
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center text-xs">
            <label className="font-semibold text-on-surface">Precious Metal</label>
            <span className="text-secondary font-medium">{activeMetalObj?.name}</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {product.metals.map((metal) => {
              const isSelected = selectedMetal === metal.type;
              return (
                <button
                  key={metal.type}
                  onClick={() => setSelectedMetal(metal.type)}
                  className={`metal-btn py-2.5 px-3 rounded-xl flex flex-col items-center gap-1.5 shadow-sm transition-all border ${
                    isSelected
                      ? 'bg-surface-container-high border-primary ring-1 ring-primary'
                      : 'bg-surface-container-low border-outline-variant/30 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div
                    className="w-5 h-5 rounded-full shadow-inner border border-black/30"
                    style={{ backgroundColor: metal.colorHex }}
                  />
                  <span className="text-xs text-on-surface text-center font-medium">
                    {metal.type === 'yellow' ? '18K Yellow' : metal.type === 'rose' ? '18K Rose' : 'Platinum'}
                  </span>
                  <span className="text-[10px] text-on-surface-variant font-semibold">
                    {metal.surcharge === 0 ? 'Included' : `+₹${metal.surcharge.toLocaleString()}`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ring Size Selector */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs">
            <label className="font-semibold text-on-surface">Select Ring Size (India / HK)</label>
            <button
              onClick={() => setShowSizeGuide(!showSizeGuide)}
              className="flex items-center gap-1 text-secondary hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[15px]">straighten</span>
              <span className="underline font-medium">Find My Ring Size</span>
            </button>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {product.sizes.map((size) => {
              const isSelected = selectedSize === size;
              const isPopular = size === product.popularSize;
              return (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`size-btn py-2.5 rounded-xl font-semibold text-sm shadow-sm transition-all relative border ${
                    isSelected
                      ? 'bg-surface-container-high text-primary font-bold border-primary ring-1 ring-primary'
                      : 'bg-surface-container-low text-on-surface border-outline-variant/30 hover:bg-surface-container'
                  }`}
                >
                  {size}
                  {isPopular && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded-full bg-secondary-container text-secondary text-[8px] font-bold tracking-tight whitespace-nowrap border border-secondary/30">
                      Popular
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Size Guide Box */}
          {showSizeGuide && (
            <div className="p-3 rounded-xl bg-surface-container mt-1 flex flex-col gap-1.5 border border-primary/20 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-serif font-semibold text-secondary">Aura Precision Ring Sizer</span>
                <button
                  onClick={() => setShowSizeGuide(false)}
                  className="text-on-surface-variant hover:text-on-surface text-sm"
                >
                  ✕
                </button>
              </div>
              <p className="text-on-surface-variant leading-relaxed">
                Place an existing ring over your screen or measure finger circumference using a strip of paper. Free ring sizer kit shipped with every initial reservation.
              </p>
            </div>
          )}
        </div>

        {/* Free Custom Laser Engraving */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between text-xs">
            <label htmlFor="engraving-input" className="font-semibold text-on-surface flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[17px] text-secondary">edit_note</span>
              Complimentary Laser Engraving
            </label>
            <span className="text-[10px] text-on-surface-variant font-mono">
              {engravingText.length}/20
            </span>
          </div>

          <div className="relative w-full">
            <input
              id="engraving-input"
              type="text"
              maxLength={20}
              value={engravingText}
              onChange={(e) => setEngravingText(e.target.value)}
              placeholder="e.g. Forever & Always"
              className="w-full bg-surface-container-low text-on-surface px-3.5 py-2.5 rounded-xl text-xs placeholder:text-on-surface-variant/50 focus:outline-none focus:bg-surface-container border border-outline-variant/30 focus:border-primary/50 transition-colors"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">
              <span className="material-symbols-outlined text-[18px]">brush</span>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery & Pincode Checker */}
      <section className="w-full px-4 pt-5">
        <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col gap-2 shadow-md border border-outline-variant/30">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">local_shipping</span>
            <h3 className="text-xs sm:text-sm font-semibold text-on-surface font-serif">
              Concierge Insured Delivery
            </h3>
          </div>

          <form onSubmit={handlePincodeCheck} className="flex gap-2 mt-1">
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              placeholder="Enter Delivery Pincode"
              className="flex-1 bg-surface-container text-on-surface px-3 py-2 rounded-lg text-xs placeholder:text-on-surface-variant/50 focus:outline-none border border-outline-variant/30 focus:border-primary/50"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-surface-container-high text-secondary hover:text-primary text-[10px] uppercase font-bold tracking-wider transition-colors border border-secondary/20 active:scale-95"
            >
              Check
            </button>
          </form>

          {/* Result State */}
          <div className="flex items-start gap-2 pt-1.5 text-on-surface">
            <span className="material-symbols-outlined text-secondary text-[18px] mt-0.5 shrink-0">
              verified_user
            </span>
            <div className="flex flex-col text-xs">
              <span className="font-semibold text-on-surface">
                {pincodeChecked
                  ? `Available for Pincode ${pincode}: Dispatches in 24 Hrs`
                  : 'Expected Delivery: 3 Business Days'}
              </span>
              <span className="text-[11px] text-on-surface-variant leading-relaxed">
                Armored courier transit insured by Brink&apos;s Global. Tamper-evident velvet vault box included.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/90 backdrop-blur-2xl px-4 py-2.5 pb-safe border-t border-primary/20 shadow-[0_-4px_24px_rgba(0,0,0,0.6)]">
        <div className="max-w-md mx-auto flex items-center gap-2">
          {/* AI Stylist Consultation Capsule */}
          <button
            onClick={() => onOpenAIStylist(product)}
            className="flex flex-col items-center justify-center px-3 py-2 rounded-xl bg-surface-container text-on-surface hover:text-secondary active:scale-95 transition-transform border border-primary/20 shrink-0"
          >
            <span className="material-symbols-outlined text-[20px] text-secondary">psychology</span>
            <span className="text-[9px] tracking-wider uppercase font-bold whitespace-nowrap mt-0.5">
              AI Stylist
            </span>
          </button>

          {/* Sovereign Buy / Reserve CTA */}
          <div className="flex-1 flex gap-2">
            <button
              onClick={handleAdd}
              className="flex-1 py-3 px-2 rounded-xl bg-surface-container-high text-on-surface text-[11px] uppercase font-bold tracking-wider flex items-center justify-center gap-1 active:scale-95 transition-transform border border-outline-variant/30 hover:bg-surface-container-highest"
            >
              <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
              <span>Add to Bag</span>
            </button>

            <button
              onClick={() => onInstantReserve(product, selectedMetal, selectedSize, engravingText)}
              className="flex-[1.4] py-2.5 px-2 rounded-xl bg-primary-container text-on-primary text-[11px] uppercase font-bold tracking-wider flex flex-col items-center justify-center shadow-lg active:scale-95 transition-transform hover:bg-primary"
            >
              <span>Reserve Now</span>
              <span className="text-[9px] font-normal opacity-90 lowercase">
                0% EMI ₹{(Math.round(totalPrice / 12)).toLocaleString()}/mo
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
