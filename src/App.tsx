import React, { useState } from 'react';
import { PRODUCTS, INITIAL_BULLION_RATES } from './data/jewelryData';
import { JewelleryProduct, MetalType, CartItem, BullionRates } from './types/jewelry';
import { Header } from './components/common/Header';
import { BottomNav, NavTab } from './components/common/BottomNav';
import { PWAInstallBanner } from './components/pwa/PWAInstallBanner';
import { LiveBullionTicker } from './components/home/LiveBullionTicker';
import { HeroShowcase } from './components/home/HeroShowcase';
import { CategorySlider } from './components/home/CategorySlider';
import { AuraConciergeCard } from './components/home/AuraConciergeCard';
import { CuratedSpotlight } from './components/home/CuratedSpotlight';
import { AuraCovenant } from './components/home/AuraCovenant';
import { JewelleryDetailsView } from './components/details/JewelleryDetailsView';
import { ShopView } from './components/views/ShopView';
import { AccountVaultView } from './components/views/AccountVaultView';
import { ARTryOnModal } from './components/modals/ARTryOnModal';
import { CertificateModal } from './components/modals/CertificateModal';
import { AIStylistModal } from './components/modals/AIStylistModal';
import { BoutiqueBookingModal } from './components/modals/BoutiqueBookingModal';
import { BagModal } from './components/modals/BagModal';
import { WishlistModal } from './components/modals/WishlistModal';
import { AppStorePublishModal } from './components/modals/AppStorePublishModal';
import { MobileFrameContainer } from './components/shell/MobileFrameContainer';
import { useOnlineStatus } from './hooks/useOnlineStatus';

export default function App() {
  const isOnline = useOnlineStatus();

  // Navigation state
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const [selectedProduct, setSelectedProduct] = useState<JewelleryProduct | null>(null);

  // Bullion rates
  const [bullionRates, setBullionRates] = useState<BullionRates>(INITIAL_BULLION_RATES);

  // Cart & Wishlist
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['astral-solitaire-crown']);

  // Modals state
  const [arProduct, setArProduct] = useState<JewelleryProduct | null>(null);
  const [certProduct, setCertProduct] = useState<JewelleryProduct | null>(null);
  const [showAIStylist, setShowAIStylist] = useState(false);
  const [aiStylistProduct, setAiStylistProduct] = useState<JewelleryProduct | null>(null);
  const [aiStylistQuery, setAiStylistQuery] = useState<string>('');
  const [showBoutiqueBooking, setShowBoutiqueBooking] = useState(false);
  const [showBagModal, setShowBagModal] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [showStoreModal, setShowStoreModal] = useState(false);

  // Shop category filter state
  const [shopCategory, setShopCategory] = useState<string | null>(null);

  // Toggle wishlist
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Add to Bag
  const handleAddToBag = (
    product: JewelleryProduct,
    metal: MetalType,
    size: number,
    engraving: string
  ) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedMetal === metal &&
          item.selectedSize === size
      );
      if (existingIdx > -1) {
        const copy = [...prev];
        copy[existingIdx].quantity += 1;
        return copy;
      }
      return [
        ...prev,
        {
          product,
          selectedMetal: metal,
          selectedSize: size,
          engravingText: engraving,
          quantity: 1,
        },
      ];
    });
  };

  // Instant Reserve (adds and opens bag modal immediately)
  const handleInstantReserve = (
    product: JewelleryProduct,
    metal: MetalType,
    size: number,
    engraving: string
  ) => {
    handleAddToBag(product, metal, size, engraving);
    setShowBagModal(true);
  };

  // Quick reserve from cards
  const handleQuickReserve = (product: JewelleryProduct) => {
    handleAddToBag(
      product,
      product.metals[0].type,
      product.popularSize || 14,
      ''
    );
    setShowBagModal(true);
  };

  // Refresh bullion rates with micro-fluctuations
  const handleRefreshBullion = () => {
    setBullionRates((prev) => {
      const delta = (Math.random() - 0.48) * 15;
      const newGold = Math.round(prev.gold24k + delta);
      return {
        ...prev,
        gold24k: newGold,
        gold22k: Math.round(newGold * 0.916),
        gold24kChange: +(prev.gold24kChange + (delta > 0 ? 0.05 : -0.05)).toFixed(2),
      };
    });
  };

  // Navigation handlers
  const handleSelectProduct = (product: JewelleryProduct) => {
    setSelectedProduct(product);
  };

  const handleBackFromDetails = () => {
    setSelectedProduct(null);
  };

  const handleCategorySelectFromHome = (catId: string) => {
    setShopCategory(catId);
    setSelectedProduct(null);
    setActiveTab('shop');
  };

  const handleAskConcierge = (query: string) => {
    setAiStylistQuery(query);
    setAiStylistProduct(PRODUCTS[0]);
    setShowAIStylist(true);
  };

  const currentView = selectedProduct ? 'details' : activeTab;
  const wishlistedProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));

  return (
    <MobileFrameContainer onOpenStoreModal={() => setShowStoreModal(true)}>
      {/* Offline Toast */}
      {!isOnline && (
        <div className="fixed top-16 inset-x-0 z-50 bg-amber-600 text-white text-center py-1 text-xs font-semibold shadow-md">
          Offline Mode — Using Cached Haute Joaillerie Dossiers
        </div>
      )}

      {/* PWA Install & Store Readiness Banner */}
      <PWAInstallBanner onOpenStoreModal={() => setShowStoreModal(true)} />

      {/* Universal Luxury Header */}
      <Header
        currentView={currentView}
        gold24kRate={bullionRates.gold24k}
        gold24kChange={bullionRates.gold24kChange}
        wishlistCount={wishlistIds.length}
        cartCount={cartItems.reduce((acc, curr) => acc + curr.quantity, 0)}
        onBack={handleBackFromDetails}
        onOpenSearch={() => {
          setSelectedProduct(null);
          setActiveTab('shop');
        }}
        onOpenWishlist={() => setShowWishlistModal(true)}
        onOpenCart={() => setShowBagModal(true)}
        onOpenProfile={() => {
          setSelectedProduct(null);
          setActiveTab('account');
        }}
        onShare={() => {
          if (navigator.share) {
            navigator.share({
              title: selectedProduct?.name || 'Aura Luxe Fine Jewellery',
              url: window.location.href,
            }).catch(() => {});
          } else {
            navigator.clipboard.writeText(window.location.href);
            alert('Vault Link copied to clipboard!');
          }
        }}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-16 bg-surface">
        {selectedProduct ? (
          /* Jewellery Details Screen */
          <JewelleryDetailsView
            product={selectedProduct}
            onOpenAR={(p) => setArProduct(p)}
            onOpenCertificate={(p) => setCertProduct(p)}
            onOpenAIStylist={(p) => {
              setAiStylistProduct(p);
              setAiStylistQuery(`Tell me about styling ${p.name}`);
              setShowAIStylist(true);
            }}
            onAddToBag={handleAddToBag}
            onInstantReserve={handleInstantReserve}
          />
        ) : activeTab === 'home' ? (
          /* Home Screen */
          <div className="flex flex-col w-full pb-20">
            {/* Live Bullion Benchmark */}
            <LiveBullionTicker
              rates={bullionRates}
              onRefresh={handleRefreshBullion}
            />

            {/* Hero Collection Banner */}
            <HeroShowcase
              onExplore={() => {
                setSelectedProduct(PRODUCTS[0]);
              }}
              onBookVisit={() => setShowBoutiqueBooking(true)}
            />

            {/* Explore by Ornament */}
            <CategorySlider
              selectedCategory={shopCategory}
              onSelectCategory={handleCategorySelectFromHome}
              onViewAll={() => setActiveTab('shop')}
            />

            {/* Private Salon AI Card */}
            <AuraConciergeCard onAskConcierge={handleAskConcierge} />

            {/* Curated Spotlight */}
            <CuratedSpotlight
              products={PRODUCTS}
              onSelectProduct={handleSelectProduct}
              onInstantTryOn={(p) => setArProduct(p)}
              onQuickReserve={handleQuickReserve}
              onToggleWishlist={handleToggleWishlist}
              wishlistIds={wishlistIds}
            />

            {/* The Aura Covenant */}
            <AuraCovenant onBookAtelier={() => setShowBoutiqueBooking(true)} />
          </div>
        ) : activeTab === 'shop' ? (
          /* Shop / Catalogue Screen */
          <ShopView
            products={PRODUCTS}
            selectedCategory={shopCategory}
            onSelectCategory={setShopCategory}
            onSelectProduct={handleSelectProduct}
            onInstantTryOn={(p) => setArProduct(p)}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        ) : activeTab === 'stylist' ? (
          /* AI Stylist Full Screen View */
          <div className="p-4 max-w-md mx-auto flex flex-col items-center justify-center min-h-[70vh] text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center shadow-xl border border-primary/30">
              <span className="material-symbols-outlined text-[36px]">psychology</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-on-surface">
              Aura AI Salon Consultation
            </h2>
            <p className="text-xs text-on-surface-variant max-w-xs leading-relaxed">
              Experience private haute-joaillerie styling, diamond clarity advisory, and astrological gemstone matchmaking.
            </p>
            <button
              onClick={() => {
                setAiStylistProduct(PRODUCTS[0]);
                setShowAIStylist(true);
              }}
              className="px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs uppercase tracking-wider active:scale-95 shadow-xl hover:bg-primary-fixed"
            >
              Enter AI Private Salon
            </button>
          </div>
        ) : activeTab === 'try-on' ? (
          /* Dedicated AR Try-On Salon Screen */
          <div className="p-4 max-w-md mx-auto flex flex-col items-center justify-center min-h-[70vh] text-center gap-4">
            <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center shadow-xl border border-primary/30">
              <span className="material-symbols-outlined text-[36px]">view_in_ar</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-on-surface">
              Augmented Reality Try-On
            </h2>
            <p className="text-xs text-on-surface-variant max-w-xs leading-relaxed">
              Launch our 3D real-scale hand simulator calibrated to millimeter ring sizes using your mobile camera or high-res studio models.
            </p>
            <button
              onClick={() => setArProduct(PRODUCTS[0])}
              className="px-6 py-3 rounded-xl bg-primary text-on-primary font-bold text-xs uppercase tracking-wider active:scale-95 shadow-xl hover:bg-primary-fixed"
            >
              Launch AR Try-On Studio
            </button>
          </div>
        ) : (
          /* Account / Vault Screen */
          <AccountVaultView
            wishlistCount={wishlistIds.length}
            onOpenWishlist={() => setShowWishlistModal(true)}
            onOpenStoreModal={() => setShowStoreModal(true)}
            onBookAtelier={() => setShowBoutiqueBooking(true)}
          />
        )}
      </main>

      {/* Bottom Navigation (Only visible when NOT viewing specific product details) */}
      {!selectedProduct && (
        <BottomNav
          currentTab={activeTab}
          onSelectTab={(tab) => {
            setSelectedProduct(null);
            setActiveTab(tab);
          }}
        />
      )}

      {/* AR Try-On Modal */}
      {arProduct && (
        <ARTryOnModal
          product={arProduct}
          onClose={() => setArProduct(null)}
        />
      )}

      {/* Certificate Modal */}
      {certProduct && (
        <CertificateModal
          product={certProduct}
          onClose={() => setCertProduct(null)}
        />
      )}

      {/* AI Stylist Modal */}
      {showAIStylist && (
        <AIStylistModal
          initialProduct={aiStylistProduct}
          initialQuery={aiStylistQuery}
          onClose={() => {
            setShowAIStylist(false);
            setAiStylistQuery('');
          }}
          onSelectProduct={handleSelectProduct}
        />
      )}

      {/* Boutique Booking Modal */}
      {showBoutiqueBooking && (
        <BoutiqueBookingModal onClose={() => setShowBoutiqueBooking(false)} />
      )}

      {/* Vault Bag Checkout Modal */}
      {showBagModal && (
        <BagModal
          items={cartItems}
          onRemoveItem={(idx) =>
            setCartItems((prev) => prev.filter((_, i) => i !== idx))
          }
          onClearCart={() => setCartItems([])}
          onClose={() => setShowBagModal(false)}
        />
      )}

      {/* Wishlist Modal */}
      {showWishlistModal && (
        <WishlistModal
          wishlistProducts={wishlistedProducts}
          onRemoveFromWishlist={handleToggleWishlist}
          onSelectProduct={handleSelectProduct}
          onClose={() => setShowWishlistModal(false)}
        />
      )}

      {/* App Store & Play Store Packaging Modal */}
      {showStoreModal && (
        <AppStorePublishModal onClose={() => setShowStoreModal(false)} />
      )}
    </MobileFrameContainer>
  );
}
