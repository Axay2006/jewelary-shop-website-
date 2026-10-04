import React, { useState } from 'react';
import { JewelleryProduct } from '../../types/jewelry';
import { PRODUCTS } from '../../data/jewelryData';

interface AIStylistModalProps {
  initialProduct?: JewelleryProduct | null;
  initialQuery?: string;
  onClose: () => void;
  onSelectProduct: (product: JewelleryProduct) => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  recommendedProduct?: JewelleryProduct;
  timestamp: string;
}

export const AIStylistModal: React.FC<AIStylistModalProps> = ({
  initialProduct,
  initialQuery,
  onClose,
  onSelectProduct,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const list: ChatMessage[] = [
      {
        id: '1',
        sender: 'ai',
        text: initialProduct
          ? `Welcome to your Private Salon consultation. I am observing ${initialProduct.name}. How may I tailor your precious metal, carat weight, or evening attire pairings?`
          : 'Welcome to the Aura Private Salon AI. I curate bespoke jewels calibrated to your personal aesthetic, astrological gemstone affinities, and milestone occasions.',
        recommendedProduct: initialProduct || PRODUCTS[0],
        timestamp: 'Just now',
      },
    ];

    if (initialQuery) {
      list.push({
        id: '2',
        sender: 'user',
        text: initialQuery,
        timestamp: 'Just now',
      });
      list.push({
        id: '3',
        sender: 'ai',
        text: `For your request: "${initialQuery}", I have curated an exemplary selection matching your bespoke parameters with certified provenance and BIS hallmarking.`,
        recommendedProduct: PRODUCTS[0],
        timestamp: 'Just now',
      });
    }

    return list;
  });

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickPrompts = [
    'Recommend matching earrings for the Astral Ring',
    'Astrological gemstone for Taurus / Venus',
    'Choker under ₹2,00,000 for wedding',
    'Everyday diamond band for stacking',
  ];

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      let matchedProduct = PRODUCTS[0];
      let aiResponse = '';

      const lower = text.toLowerCase();
      if (lower.includes('earring') || lower.includes('drop')) {
        matchedProduct = PRODUCTS.find((p) => p.category === 'earrings') || PRODUCTS[3];
        aiResponse =
          'I recommend the Elysian Diamond Drop Earrings. Their dual pear and round cut diamonds create magnificent light cadence that complements radiant solitaires effortlessly.';
      } else if (lower.includes('choker') || lower.includes('necklace') || lower.includes('emerald') || lower.includes('polki')) {
        matchedProduct = PRODUCTS.find((p) => p.category === 'necklaces') || PRODUCTS[2];
        aiResponse =
          'The Royal Mughal Heritage Polki Choker with natural Zambian emerald teardrops is an peerless heirloom centerpiece, hallmarked in 22K pure gold.';
      } else if (lower.includes('rose') || lower.includes('bloom') || lower.includes('radiant')) {
        matchedProduct = PRODUCTS[1];
        aiResponse =
          'The Eternal Bloom Solitaire in 18K Rose Gold features a rare radiant-cut diamond that casts soft blush-pink warmth ideal for romantic milestones.';
      } else {
        matchedProduct = PRODUCTS[0];
        aiResponse =
          'The Astral Diamond Solitaire Crown Ring in 18K Yellow Gold remains our highest-rated benchmark piece, featuring an IGI-certified Hearts & Arrows diamond with exceptional brilliance.';
      }

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: aiResponse,
        recommendedProduct: matchedProduct,
        timestamp: 'Just now',
      };

      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-surface-dim/95 backdrop-blur-2xl flex flex-col justify-between">
      {/* Header */}
      <div className="pt-safe px-4 pb-3 border-b border-outline-variant/30 flex items-center justify-between bg-surface-container-lowest/80 backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary ring-1 ring-primary/40">
            <span className="material-symbols-outlined text-[20px]">psychology</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif text-base font-semibold text-on-surface">
                Aura AI Stylist
              </span>
              <span className="px-1.5 py-0.2 rounded bg-primary text-on-primary text-[8px] font-bold uppercase tracking-wider">
                Salon AI
              </span>
            </div>
            <span className="text-[10px] text-secondary">
              Personalised Gemological &amp; Haute Styling Consultation
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

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-w-md mx-auto w-full no-scrollbar">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-primary text-on-primary font-medium rounded-br-none shadow-md'
                  : 'bg-surface-container-high text-on-surface rounded-bl-none border border-primary/20 shadow-md'
              }`}
            >
              <p>{msg.text}</p>
            </div>

            {/* Recommended Product Capsule */}
            {msg.recommendedProduct && msg.sender === 'ai' && (
              <div
                onClick={() => {
                  onSelectProduct(msg.recommendedProduct!);
                  onClose();
                }}
                className="mt-2 max-w-[85%] bg-surface-container-low rounded-xl p-2.5 flex items-center gap-3 border border-primary/30 cursor-pointer hover:border-primary transition-colors group shadow-lg"
              >
                <img
                  src={msg.recommendedProduct.images.main}
                  alt={msg.recommendedProduct.name}
                  className="w-12 h-12 rounded-lg object-cover bg-surface-container-lowest shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[9px] uppercase tracking-wider text-secondary font-bold block truncate">
                    {msg.recommendedProduct.categoryLabel}
                  </span>
                  <span className="text-xs font-semibold text-on-surface block truncate group-hover:text-primary transition-colors">
                    {msg.recommendedProduct.name}
                  </span>
                  <span className="text-xs font-bold text-primary block mt-0.5">
                    ₹{msg.recommendedProduct.curatedPrice.toLocaleString()}
                  </span>
                </div>
                <span className="material-symbols-outlined text-primary text-[18px] group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            )}

            <span className="text-[9px] text-on-surface-variant/60 mt-1 px-1">
              {msg.timestamp}
            </span>
          </div>
        ))}

        {isTyping && (
          <div className="flex items-center gap-1.5 p-3 rounded-2xl bg-surface-container-high max-w-[120px] border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-150" />
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce delay-300" />
            <span className="text-[10px] text-on-surface-variant ml-1 font-medium">Curating...</span>
          </div>
        )}
      </div>

      {/* Input & Quick Chips */}
      <div className="p-4 pb-safe border-t border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-md max-w-md mx-auto w-full">
        {/* Quick Suggestion Chips */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2.5">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(prompt)}
              className="whitespace-nowrap px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high text-[11px] border border-outline-variant/30 transition-colors active:scale-95"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 bg-surface-container rounded-2xl p-1.5 border border-primary/30 focus-within:border-primary transition-colors">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend(inputVal)}
            placeholder="Ask anything on diamonds, gold spot or styling..."
            className="flex-1 bg-transparent px-3 py-1.5 text-xs text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none"
          />
          <button
            onClick={() => handleSend(inputVal)}
            disabled={!inputVal.trim()}
            className="w-9 h-9 rounded-xl bg-primary text-on-primary flex items-center justify-center disabled:opacity-40 transition-opacity active:scale-95 shadow-md"
          >
            <span className="material-symbols-outlined text-[16px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
