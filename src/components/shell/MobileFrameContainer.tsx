import React, { useState, useEffect } from 'react';

interface MobileFrameContainerProps {
  children: React.ReactNode;
  onOpenStoreModal: () => void;
}

export const MobileFrameContainer: React.FC<MobileFrameContainerProps> = ({
  children,
  onOpenStoreModal,
}) => {
  // Check if we are on a real mobile screen (< 768px)
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const [enableDeviceFrame, setEnableDeviceFrame] = useState(true);
  const [currentTime, setCurrentTime] = useState('9:41');

  useEffect(() => {
    const checkScreen = () => {
      const isMobile = window.innerWidth < 768;
      setIsMobileScreen(isMobile);
    };

    checkScreen();
    window.addEventListener('resize', checkScreen);

    // Update digital clock in status bar
    const updateClock = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const mins = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${mins}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 30000);

    return () => {
      window.removeEventListener('resize', checkScreen);
      clearInterval(interval);
    };
  }, []);

  // If on actual mobile device or user toggled frame off, render full width
  if (isMobileScreen || !enableDeviceFrame) {
    return (
      <div className="min-h-screen bg-surface text-on-surface flex flex-col relative w-full">
        {/* Quick Floating Desktop Switcher Bar if on desktop and frame is off */}
        {!isMobileScreen && (
          <div className="fixed top-2 right-4 z-50 bg-surface-container-high/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-primary/30 flex items-center gap-2 shadow-2xl text-xs">
            <span className="text-secondary font-medium">Desktop Preview</span>
            <button
              onClick={() => setEnableDeviceFrame(true)}
              className="px-2.5 py-0.5 rounded bg-primary text-on-primary font-bold text-[10px] uppercase tracking-wider"
            >
              Switch to Smartphone Frame
            </button>
            <button
              onClick={onOpenStoreModal}
              className="text-primary hover:underline text-[11px] font-semibold"
            >
              Publishing Guide
            </button>
          </div>
        )}
        {children}
      </div>
    );
  }

  // Desktop Luxury Smartphone Simulator
  return (
    <div className="min-h-screen bg-[#09090a] flex flex-col items-center justify-center p-4 lg:p-6 relative select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial from-primary/5 via-transparent to-transparent pointer-events-none" />

      {/* Top Simulator Controls Bar */}
      <div className="w-full max-w-md flex items-center justify-between mb-3 text-xs text-on-surface-variant px-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-semibold text-primary">Aura Luxe Mobile Simulator</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setEnableDeviceFrame(false)}
            className="hover:text-primary transition-colors text-[11px] underline"
          >
            Full Width
          </button>
          <button
            onClick={onOpenStoreModal}
            className="bg-primary/20 text-primary hover:bg-primary/30 border border-primary/40 px-2.5 py-1 rounded text-[10px] uppercase font-bold transition-all"
          >
            Publish to Stores
          </button>
        </div>
      </div>

      {/* Smartphone Chassis Frame */}
      <div className="relative w-full max-w-[400px] h-[860px] rounded-[52px] bg-[#1a1a1c] p-[10px] shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_0_2px_rgba(242,202,80,0.25)] flex flex-col overflow-hidden">
        {/* Outer Titanium Bezel Accent Line */}
        <div className="absolute inset-0 rounded-[52px] border-[2px] border-[#2d2a24] pointer-events-none" />

        {/* Volume & Power Button Silhouettes on Frame */}
        <div className="absolute -left-[14px] top-28 w-[4px] h-12 bg-[#2d2a24] rounded-l" />
        <div className="absolute -left-[14px] top-44 w-[4px] h-12 bg-[#2d2a24] rounded-l" />
        <div className="absolute -right-[14px] top-36 w-[4px] h-16 bg-[#2d2a24] rounded-r" />

        {/* Inner Screen Container */}
        <div className="relative w-full h-full rounded-[42px] bg-surface overflow-hidden flex flex-col shadow-inner">
          {/* Hardware Notch / Dynamic Island */}
          <div className="absolute top-2 inset-x-0 z-50 flex items-center justify-between px-6 pointer-events-none text-xs text-on-surface font-semibold">
            {/* Clock */}
            <span className="text-[12px] font-sans tracking-tight">{currentTime}</span>

            {/* Dynamic Island Pill */}
            <div className="w-24 h-5 rounded-full bg-black flex items-center justify-end px-2 gap-1.5 shadow-md">
              <div className="w-2.5 h-2.5 rounded-full bg-[#1c1b1c] border border-neutral-700" />
            </div>

            {/* Status Icons */}
            <div className="flex items-center gap-1.5 text-[12px]">
              <span className="material-symbols-outlined text-[14px]">signal_cellular_alt</span>
              <span className="material-symbols-outlined text-[14px]">wifi</span>
              <span className="material-symbols-outlined text-[15px]">battery_full</span>
            </div>
          </div>

          {/* Actual Application Content */}
          <div className="relative w-full h-full overflow-y-auto no-scrollbar pt-6 flex flex-col">
            {children}
          </div>

          {/* iOS / Android Home Indicator Bar */}
          <div className="absolute bottom-1.5 inset-x-0 flex justify-center pointer-events-none z-50">
            <div className="w-32 h-1 rounded-full bg-neutral-400/40" />
          </div>
        </div>
      </div>

      {/* Simulator Footer Hint */}
      <div className="mt-3 text-[11px] text-on-surface-variant text-center flex items-center gap-1.5">
        <span className="material-symbols-outlined text-secondary text-[14px]">phone_iphone</span>
        <span>Interactive Touch &amp; Scroll enabled. Resize screen or toggle &quot;Full Width&quot; anytime.</span>
      </div>
    </div>
  );
};
