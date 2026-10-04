export type MetalType = 'yellow' | 'rose' | 'platinum';

export interface PriceBreakdownItem {
  label: string;
  detail: string;
  amount: number;
}

export interface GemCertificate {
  number: string;
  laboratory: string;
  shape: string;
  weight: string;
  color: string;
  clarity: string;
  cut: string;
  fluorescence: string;
  pdfUrl?: string;
}

export interface ProductImageAngle {
  id: string;
  label: string;
  url: string;
  description: string;
}

export interface JewelleryProduct {
  id: string;
  name: string;
  atelier: string;
  category: 'rings' | 'necklaces' | 'earrings' | 'bangles' | 'mangalsutra' | 'mens';
  categoryLabel: string;
  curatedPrice: number;
  originalPrice: number;
  rating: number;
  reviewsCount: number;
  goldPurity: string;
  goldWeightGrams: number;
  diamondCarats: number;
  diamondSpecs: string;
  images: {
    main: string;
    angles: ProductImageAngle[];
    tryOnOverlay: string;
  };
  metals: {
    type: MetalType;
    name: string;
    surcharge: number;
    colorHex: string;
  }[];
  sizes: number[];
  popularSize: number;
  description: string;
  hallmark: string;
  certificate: GemCertificate;
  priceBreakup: {
    goldSpotRate: number;
    goldAmount: number;
    diamondAmount: number;
    makingChargesPercent: number;
    makingChargesAmount: number;
    gstPercent: number;
    gstAmount: number;
  };
  inStock: boolean;
  dispatchDays: number;
  tags: string[];
}

export interface CartItem {
  product: JewelleryProduct;
  selectedMetal: MetalType;
  selectedSize: number;
  engravingText: string;
  quantity: number;
}

export interface BullionRates {
  gold24k: number;
  gold24kChange: number;
  gold22k: number;
  gold22kChange: number;
  silver925: number;
  silver925Change: number;
  lastUpdated: string;
}

export interface BoutiqueAppointment {
  id: string;
  city: string;
  boutiqueName: string;
  date: string;
  timeSlot: string;
  guestCount: number;
  preferredJewels: string;
}
