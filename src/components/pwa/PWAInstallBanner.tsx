import React, { useState } from 'react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { AppStorePublishModal } from '../modals/AppStorePublishModal';

interface PWAInstallBannerProps {
  onOpenStoreModal?: () => void;
}

export const PWAInstallBanner: React.FC<PWAInstallBannerProps> = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const [showStoreGuide, setShowStoreGuide] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <>
      <div className="w-full bg-gradient-to-r from-surface-container-high via-surface-container to-surface-container-high border-b border-primary/20 px-4 py-2.5 flex items-center justify-between text-xs text-on-surface shadow-sm">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary shrink-0">
            <span className="material-symbols-outlined text-[16px]">install_mobile</span>
          </div>
          <div className="flex flex-col truncate">
            <span className="font-semibold text-primary truncate">Play Store & App Store Ready</span>
            <span className="text-[10px] text-on-surface-variant truncate">
              {isInstalled ? 'Running in Standalone App Mode' : 'PWA Manifest & Mobile Shell configured'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!isInstalled && isInstallable && (
            <button
              onClick={install}
              className="bg-primary text-on-primary font-bold px-3 py-1 rounded text-[11px] uppercase tracking-wider active:scale-95 transition-transform"
            >
              Install
            </button>
          )}

          {!isInstalled && isIOS && (
            <button
              onClick={() => setShowIOSGuide(true)}
              className="bg-primary/20 text-primary border border-primary/40 px-2.5 py-1 rounded text-[10px] uppercase font-semibold active:scale-95 transition-transform"
            >
              iOS Install
            </button>
          )}

          <button
            onClick={() => setShowStoreGuide(true)}
            className="bg-surface-container-highest hover:bg-surface-container text-secondary px-2.5 py-1 rounded text-[10px] uppercase font-semibold flex items-center gap-1 active:scale-95 transition-all"
            title="App Store & Play Store Packaging Instructions"
          >
            <span className="material-symbols-outlined text-[12px]">store</span>
            <span>Store Guide</span>
          </button>

          <button
            onClick={() => setDismissed(true)}
            className="text-on-surface-variant hover:text-on-surface p-1 text-[14px]"
            aria-label="Dismiss banner"
          >
            ✕
          </button>
        </div>
      </div>

      {/* iOS Installation Guide Modal */}
      {showIOSGuide && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-sm rounded-xl bg-surface-container p-6 shadow-2xl border border-primary/30">
            <div className="flex items-center justify-between pb-3 border-b border-outline-variant/30">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[24px]">apple</span>
                <h3 className="text-base font-semibold text-on-surface font-serif">Install on iPhone / iPad</h3>
              </div>
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 space-y-3 text-xs text-on-surface-variant">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-[10px] shrink-0">1</span>
                <span>Open this link in <strong>Safari</strong> on your Apple device.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-[10px] shrink-0">2</span>
                <span>Tap the <strong>Share</strong> button (box with upward arrow) in the bottom toolbar.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-[10px] shrink-0">3</span>
                <span>Scroll down and select <strong>&quot;Add to Home Screen&quot;</strong>.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-[10px] shrink-0">4</span>
                <span>The Aura Luxe icon will appear on your iOS home screen as a standalone native app!</span>
              </div>
            </div>
            <button
              onClick={() => setShowIOSGuide(false)}
              className="mt-5 w-full rounded-lg bg-primary py-2 text-xs font-bold uppercase tracking-wider text-on-primary active:scale-95 transition-transform"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* Store Publishing Guide Modal */}
      {showStoreGuide && (
        <AppStorePublishModal onClose={() => setShowStoreGuide(false)} />
      )}
    </>
  );
};
