import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { CartItem } from '../../types/jewelry';

interface BagModalProps {
  items: CartItem[];
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
  onClose: () => void;
}

export const BagModal: React.FC<BagModalProps> = ({
  items,
  onRemoveItem,
  onClearCart,
  onClose,
}) => {
  const [isOrdered, setIsOrdered] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'full' | 'emi'>('full');

  const subtotal = items.reduce((acc, curr) => {
    const metalSurcharge =
      curr.product.metals.find((m) => m.type === curr.selectedMetal)?.surcharge || 0;
    return acc + (curr.product.curatedPrice + metalSurcharge) * curr.quantity;
  }, 0);

  const gst = Math.round(subtotal * 0.03);
  const grandTotal = subtotal + gst;
  const emiPerMonth = Math.round(grandTotal / 12);

  const handleCheckout = () => {
    setIsOrdered(true);
    confetti({
      particleCount: 75,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#f2ca50', '#e4c277', '#ffffff'],
    });
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 bg-surface-dim/95 backdrop-blur-2xl flex flex-col justify-between overflow-y-auto">
      {/* Header */}
      <div className="pt-safe px-4 pb-3 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest/80 backdrop-blur-md max-w-md mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">shopping_bag</span>
          <div>
            <h2 className="font-serif text-base font-semibold text-on-surface">
              Private Vault Reservation
            </h2>
            <span className="text-[10px] text-secondary">
              {items.length} {items.length === 1 ? 'Piece' : 'Pieces'} under Escrow Lock
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

      <div className="flex-1 max-w-md mx-auto w-full p-4 space-y-4">
        {isOrdered ? (
          <div className="flex flex-col items-center text-center py-12 gap-3 bg-surface-container rounded-2xl p-6 border border-primary/30">
            <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center border border-primary/40 shadow-xl">
              <span className="material-symbols-outlined text-[36px]">verified</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-on-surface">
              Vault Reservation Confirmed
            </h3>
            <p className="text-xs text-on-surface-variant max-w-xs leading-relaxed">
              Order #AL-2026-V8921 has been placed into insured transit. An armored Brink&apos;s courier with biometric verification has been dispatched.
            </p>
            <div className="w-full p-3 rounded-xl bg-surface-container-high border border-primary/20 text-xs text-secondary mt-2">
              Tamper-evident velvet vault box and official IGI physical dossier included with signature handover.
            </div>
            <button
              onClick={onClose}
              className="mt-4 w-full py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs uppercase tracking-wider active:scale-95"
            >
              Return to Boutique
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center py-20 gap-3">
            <span className="material-symbols-outlined text-[48px] text-outline">
              shopping_bag
            </span>
            <p className="text-sm font-serif text-on-surface">Your Vault Bag is Empty</p>
            <p className="text-xs text-on-surface-variant max-w-xs">
              Explore our Haute Joaillerie collections to curate bespoke solitaires and rare certified heirlooms.
            </p>
            <button
              onClick={onClose}
              className="mt-2 px-5 py-2 rounded-xl bg-primary text-on-primary text-xs uppercase font-bold tracking-wider active:scale-95"
            >
              Explore Catalogue
            </button>
          </div>
        ) : (
          <>
            {/* Items List */}
            <div className="space-y-3">
              {items.map((item, idx) => {
                const metalObj = item.product.metals.find((m) => m.type === item.selectedMetal);
                const itemPrice = item.product.curatedPrice + (metalObj?.surcharge || 0);

                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-surface-container flex gap-3 border border-outline-variant/30 relative"
                  >
                    <img
                      src={item.product.images.main}
                      alt={item.product.name}
                      className="w-20 h-20 rounded-xl object-cover bg-surface-container-lowest shrink-0"
                    />

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif text-xs font-semibold text-on-surface truncate pr-2">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="text-on-surface-variant hover:text-error text-xs"
                            title="Remove piece"
                          >
                            ✕
                          </button>
                        </div>

                        <div className="text-[11px] text-on-surface-variant space-y-0.5 mt-1">
                          <div>Metal: <span className="text-secondary font-medium">{metalObj?.name}</span></div>
                          <div>Size: <span className="text-on-surface font-semibold">{item.selectedSize}</span></div>
                          {item.engravingText && (
                            <div className="italic text-primary">
                              Engraving: &ldquo;{item.engravingText}&rdquo;
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between items-baseline mt-2">
                        <span className="text-[10px] text-on-surface-variant">
                          Qty: {item.quantity}
                        </span>
                        <span className="font-serif text-sm font-bold text-primary">
                          ₹{(itemPrice * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Payment Options (Full vs 0% EMI) */}
            <div className="p-3 rounded-2xl bg-surface-container-low border border-primary/20 space-y-2">
              <span className="text-xs font-semibold text-on-surface block">Settlement Choice</span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setSelectedPlan('full')}
                  className={`p-2.5 rounded-xl border text-left transition-colors ${
                    selectedPlan === 'full'
                      ? 'border-primary bg-surface-container-high text-primary ring-1 ring-primary'
                      : 'border-outline-variant/30 bg-surface-container text-on-surface'
                  }`}
                >
                  <span className="font-bold block">Direct Payment</span>
                  <span className="text-[10px] text-on-surface-variant">Instant Wire / Card / UPI</span>
                </button>
                <button
                  onClick={() => setSelectedPlan('emi')}
                  className={`p-2.5 rounded-xl border text-left transition-colors ${
                    selectedPlan === 'emi'
                      ? 'border-primary bg-surface-container-high text-primary ring-1 ring-primary'
                      : 'border-outline-variant/30 bg-surface-container text-on-surface'
                  }`}
                >
                  <span className="font-bold block">0% EMI Plan</span>
                  <span className="text-[10px] text-secondary">₹{emiPerMonth.toLocaleString()}/mo for 12 mos</span>
                </button>
              </div>
            </div>

            {/* Bill Summary */}
            <div className="p-3.5 rounded-2xl bg-surface-container space-y-2 text-xs border border-outline-variant/20">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal ({items.length} items)</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Statutory GST (3%)</span>
                <span>₹{gst.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Armored Courier &amp; Vault Insurance</span>
                <span className="text-secondary uppercase text-[10px] font-bold">Complimentary</span>
              </div>
              <div className="pt-2 border-t border-outline-variant/30 flex justify-between font-serif text-base font-bold text-on-surface">
                <span>Total Amount</span>
                <span className="text-primary">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Security Guarantee */}
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-container-high text-secondary text-[11px] border border-secondary/20">
              <span className="material-symbols-outlined text-[16px]">verified</span>
              <span>Brink&apos;s Armed Escrow Guarantee with 100% Transit Coverage.</span>
            </div>
          </>
        )}
      </div>

      {/* Bottom CTA */}
      {!isOrdered && items.length > 0 && (
        <div className="p-4 pb-safe border-t border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-md max-w-md mx-auto w-full">
          <button
            onClick={handleCheckout}
            className="w-full py-3.5 rounded-xl bg-primary text-on-primary text-xs uppercase font-bold tracking-wider active:scale-95 transition-all shadow-xl hover:bg-primary-fixed flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">lock</span>
            <span>
              {selectedPlan === 'emi'
                ? `Reserve with EMI (₹${emiPerMonth.toLocaleString()}/mo)`
                : `Complete Reservation (₹${grandTotal.toLocaleString()})`}
            </span>
          </button>
        </div>
      )}
    </div>
  );
};
