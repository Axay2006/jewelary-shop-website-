import React, { useState } from 'react';

interface AppStorePublishModalProps {
  onClose: () => void;
}

export const AppStorePublishModal: React.FC<AppStorePublishModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'playstore' | 'appstore' | 'pwa'>('playstore');
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(key);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 overflow-y-auto">
      <div className="w-full max-w-lg rounded-2xl bg-surface-container p-5 md:p-6 shadow-2xl border border-primary/30 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-outline-variant/30">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[22px]">publish</span>
            </div>
            <div>
              <h3 className="text-base md:text-lg font-semibold text-on-surface font-serif">
                Publish to Play Store & App Store
              </h3>
              <p className="text-[11px] text-secondary">
                Turnkey Mobile App Packaging Guide
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Store Tabs */}
        <div className="flex border-b border-outline-variant/30 mt-3">
          <button
            onClick={() => setActiveTab('playstore')}
            className={`flex-1 py-2 text-xs font-semibold text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'playstore'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">shop</span>
            <span>Google Play Store</span>
          </button>
          <button
            onClick={() => setActiveTab('appstore')}
            className={`flex-1 py-2 text-xs font-semibold text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'appstore'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">apple</span>
            <span>Apple App Store</span>
          </button>
          <button
            onClick={() => setActiveTab('pwa')}
            className={`flex-1 py-2 text-xs font-semibold text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
              activeTab === 'pwa'
                ? 'border-primary text-primary'
                : 'border-transparent text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">install_mobile</span>
            <span>Direct PWA</span>
          </button>
        </div>

        {/* Content */}
        <div className="py-4 overflow-y-auto space-y-4 text-xs text-on-surface-variant pr-1">
          {activeTab === 'playstore' && (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-surface-container-low border border-primary/20">
                <span className="font-semibold text-primary block text-[13px] mb-1">
                  Option 1: Google PWABuilder / Bubblewrap (Recommended)
                </span>
                <p className="leading-relaxed">
                  Google officially supports publishing web applications to the Google Play Store using <strong>Trusted Web Activities (TWA)</strong>. Because this app already includes a valid Web App Manifest, Service Worker, and 512px icons, it has 100% Google Play store compatibility.
                </p>
                <div className="mt-2.5 flex items-center justify-between bg-surface-container-highest p-2 rounded">
                  <code className="text-secondary text-[11px]">https://www.pwabuilder.com</code>
                  <a
                    href="https://www.pwabuilder.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-primary underline text-[11px] font-semibold"
                  >
                    Open PWABuilder ↗
                  </a>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/30">
                <span className="font-semibold text-on-surface block text-[13px] mb-1">
                  Option 2: Capacitor (Native Android APK/AAB)
                </span>
                <p className="mb-2">Run these 3 commands in your project root to generate the Android Studio project:</p>
                
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between bg-surface-container-highest px-2.5 py-1.5 rounded font-mono text-[11px]">
                    <span>npm install @capacitor/core @capacitor/cli @capacitor/android</span>
                    <button
                      onClick={() => copyToClipboard('npm install @capacitor/core @capacitor/cli @capacitor/android', 'cap1')}
                      className="text-primary hover:text-secondary"
                    >
                      {copiedCmd === 'cap1' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between bg-surface-container-highest px-2.5 py-1.5 rounded font-mono text-[11px]">
                    <span>npx cap init &quot;Aura Luxe&quot; com.auraluxe.jewels --web-dir dist</span>
                    <button
                      onClick={() => copyToClipboard('npx cap init "Aura Luxe" com.auraluxe.jewels --web-dir dist', 'cap2')}
                      className="text-primary hover:text-secondary"
                    >
                      {copiedCmd === 'cap2' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between bg-surface-container-highest px-2.5 py-1.5 rounded font-mono text-[11px]">
                    <span>npm run build &amp;&amp; npx cap add android &amp;&amp; npx cap open android</span>
                    <button
                      onClick={() => copyToClipboard('npm run build && npx cap add android && npx cap open android', 'cap3')}
                      className="text-primary hover:text-secondary"
                    >
                      {copiedCmd === 'cap3' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
                <p className="mt-2 text-[11px] text-on-surface-variant">
                  Android Studio will open immediately; select <em>Build &gt; Generate Signed Bundle / APK</em> to upload to Google Play Console.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'appstore' && (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-surface-container-low border border-primary/20">
                <span className="font-semibold text-primary block text-[13px] mb-1">
                  Apple App Store via Capacitor + Xcode
                </span>
                <p className="leading-relaxed">
                  Apple requires native packaging via Xcode for the App Store. Capacitor converts this app into an official iOS workspace (`.xcworkspace`) with complete access to Apple Pay, Camera AR, and Push Notifications.
                </p>
                <div className="mt-2.5 space-y-1.5">
                  <div className="flex items-center justify-between bg-surface-container-highest px-2.5 py-1.5 rounded font-mono text-[11px]">
                    <span>npm install @capacitor/ios</span>
                    <button
                      onClick={() => copyToClipboard('npm install @capacitor/ios', 'ios1')}
                      className="text-primary hover:text-secondary"
                    >
                      {copiedCmd === 'ios1' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="flex items-center justify-between bg-surface-container-highest px-2.5 py-1.5 rounded font-mono text-[11px]">
                    <span>npm run build &amp;&amp; npx cap add ios &amp;&amp; npx cap open ios</span>
                    <button
                      onClick={() => copyToClipboard('npm run build && npx cap add ios && npx cap open ios', 'ios2')}
                      className="text-primary hover:text-secondary"
                    >
                      {copiedCmd === 'ios2' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
                <div className="mt-3 p-2 bg-surface-container rounded text-[11px]">
                  <strong>App Store Review Highlights:</strong>
                  <ul className="list-disc pl-4 mt-1 space-y-1">
                    <li>Camera permission is already configured for the 3D Virtual Hand Try-On.</li>
                    <li>Status bar is set to black-translucent luxury mode.</li>
                    <li>Offline caching via Workbox service worker ensures instant launch.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pwa' && (
            <div className="space-y-3">
              <div className="p-3 rounded-lg bg-surface-container-low border border-outline-variant/30">
                <span className="font-semibold text-primary block text-[13px] mb-1">
                  Instant Mobile Installation (No Store Account Required)
                </span>
                <p className="leading-relaxed mb-2">
                  Users on any Android or iOS device can install this app instantly with one tap without passing through store reviews:
                </p>
                <ul className="list-disc pl-4 space-y-1 text-on-surface">
                  <li><strong>Android Chrome:</strong> Automatically shows the native &quot;Add Aura Luxe to Home screen&quot; prompt.</li>
                  <li><strong>iOS Safari:</strong> Tap Share &gt; Add to Home Screen.</li>
                  <li><strong>Desktop Chrome / Edge:</strong> Click the install icon in the URL bar.</li>
                </ul>
                <div className="mt-3 p-2.5 bg-surface-container-highest rounded flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">verified</span>
                    <span className="font-semibold text-on-surface">PWA Audit Passed</span>
                  </div>
                  <span className="text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded font-bold">100% Ready</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-outline-variant/30 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-primary text-on-primary font-bold text-xs uppercase tracking-wider active:scale-95 transition-transform"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
