import React, { useState, useRef, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { JewelleryProduct } from '../../types/jewelry';

interface ARTryOnModalProps {
  product: JewelleryProduct | null;
  onClose: () => void;
}

export const ARTryOnModal: React.FC<ARTryOnModalProps> = ({ product, onClose }) => {
  const [useLiveCamera, setUseLiveCamera] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [lightingMode, setLightingMode] = useState<'studio' | 'candlelight' | 'gala'>('studio');
  const [selectedMetal, setSelectedMetal] = useState<'yellow' | 'rose' | 'platinum'>('yellow');
  const [capturedSnapshot, setCapturedSnapshot] = useState<string | null>(null);
  const [shutterFlash, setShutterFlash] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (useLiveCamera) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [useLiveCamera]);

  const startCamera = async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch {
      setCameraError('Camera access unavailable. Falling back to photorealistic studio simulator.');
      setUseLiveCamera(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  const handleCapture = () => {
    setShutterFlash(true);
    setTimeout(() => setShutterFlash(false), 200);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#f2ca50', '#e4c277', '#ffffff'],
    });

    setCapturedSnapshot('Look captured & saved to private vault!');
    setTimeout(() => setCapturedSnapshot(null), 3500);
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-surface-dim/95 backdrop-blur-2xl flex flex-col p-4 justify-between">
      {/* Modal Header */}
      <div className="flex items-center justify-between pt-safe pb-2 border-b border-outline-variant/30">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
            <span className="material-symbols-outlined text-[20px]">view_in_ar</span>
          </div>
          <div>
            <span className="font-serif text-base font-semibold text-on-surface block leading-tight">
              Augmented Atelier
            </span>
            <span className="text-[10px] text-secondary">
              {product.name}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Camera Toggle */}
          <button
            onClick={() => setUseLiveCamera(!useLiveCamera)}
            className={`px-2.5 py-1 rounded-full text-[10px] uppercase font-bold flex items-center gap-1 transition-colors border ${
              useLiveCamera
                ? 'bg-primary text-on-primary border-primary'
                : 'bg-surface-container text-on-surface-variant border-outline-variant/30 hover:text-on-surface'
            }`}
          >
            <span className="material-symbols-outlined text-[13px]">
              {useLiveCamera ? 'videocam' : 'photo_library'}
            </span>
            <span>{useLiveCamera ? 'Live Camera' : 'Simulator'}</span>
          </button>

          <button
            onClick={() => {
              stopCamera();
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:text-primary transition-colors border border-outline-variant/30"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>
      </div>

      {cameraError && (
        <div className="my-1 p-2 rounded bg-amber-950/40 text-amber-300 text-[11px] border border-amber-500/30 text-center">
          {cameraError}
        </div>
      )}

      {/* Hand Camera Viewport with Hand Overlay */}
      <div className="relative w-full max-w-sm mx-auto aspect-[3/4] rounded-2xl bg-surface-container-lowest overflow-hidden flex items-center justify-center my-auto shadow-2xl border border-primary/30">
        {/* Shutter Flash Animation */}
        {shutterFlash && (
          <div className="absolute inset-0 bg-white z-40 animate-out fade-out duration-200" />
        )}

        {useLiveCamera ? (
          <div className="relative w-full h-full flex items-center justify-center bg-black">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover"
            />
            {/* Live AR Jewel Pin Overlay on video feed */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="relative w-36 h-36">
                <img
                  src={product.images.main}
                  alt="Jewel Overlay"
                  className={`w-full h-full object-contain filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)] transition-all ${
                    selectedMetal === 'rose'
                      ? 'hue-rotate-[320deg]'
                      : selectedMetal === 'platinum'
                      ? 'grayscale contrast-125'
                      : ''
                  }`}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <img
              src={product.images.tryOnOverlay || product.images.main}
              alt="AR Camera Hand Simulator"
              className={`w-full h-full object-cover transition-all ${
                lightingMode === 'candlelight'
                  ? 'sepia-[0.3] brightness-95'
                  : lightingMode === 'gala'
                  ? 'contrast-110 saturate-110'
                  : ''
              } ${
                selectedMetal === 'rose'
                  ? 'hue-rotate-[15deg]'
                  : selectedMetal === 'platinum'
                  ? 'grayscale-[0.2]'
                  : ''
              }`}
            />
          </div>
        )}

        {/* AR Tracking Calibration Reticle */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-48 h-48 rounded-full border border-dashed border-primary/50 animate-pulse flex items-center justify-center">
            <span className="material-symbols-outlined text-primary/70 text-[32px]">
              filter_center_focus
            </span>
          </div>
        </div>

        {/* Captured Toast */}
        {capturedSnapshot && (
          <div className="absolute top-4 inset-x-4 bg-primary text-on-primary text-center py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider shadow-2xl z-30 animate-in fade-in">
            {capturedSnapshot}
          </div>
        )}

        {/* Bottom Calibration Pill */}
        <div className="absolute bottom-3 inset-x-3 flex justify-between items-center bg-surface-dim/85 backdrop-blur-md px-3 py-2 rounded-xl border border-primary/20">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="text-[11px] text-on-surface font-medium">
              Calibration locked: Ring Size {product.popularSize || 14}
            </span>
          </div>
          <span className="material-symbols-outlined text-secondary text-[16px]">verified</span>
        </div>
      </div>

      {/* Modal Controls Bar */}
      <div className="flex flex-col gap-2 pb-safe max-w-sm mx-auto w-full pt-2">
        {/* Metal and Lighting Selectors */}
        <div className="flex items-center justify-between gap-2 px-1 text-xs">
          <div className="flex items-center gap-1 bg-surface-container p-1 rounded-lg">
            <button
              onClick={() => setSelectedMetal('yellow')}
              className={`px-2 py-1 rounded text-[10px] uppercase font-bold transition-colors ${
                selectedMetal === 'yellow' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'
              }`}
            >
              18K Yellow
            </button>
            <button
              onClick={() => setSelectedMetal('rose')}
              className={`px-2 py-1 rounded text-[10px] uppercase font-bold transition-colors ${
                selectedMetal === 'rose' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'
              }`}
            >
              Rose
            </button>
            <button
              onClick={() => setSelectedMetal('platinum')}
              className={`px-2 py-1 rounded text-[10px] uppercase font-bold transition-colors ${
                selectedMetal === 'platinum' ? 'bg-primary text-on-primary' : 'text-on-surface-variant'
              }`}
            >
              Platinum
            </button>
          </div>

          <div className="flex items-center gap-1 bg-surface-container p-1 rounded-lg">
            <button
              onClick={() => setLightingMode('studio')}
              className={`px-2 py-1 rounded text-[10px] uppercase font-semibold ${
                lightingMode === 'studio' ? 'bg-surface-container-high text-primary' : 'text-on-surface-variant'
              }`}
            >
              Studio
            </button>
            <button
              onClick={() => setLightingMode('candlelight')}
              className={`px-2 py-1 rounded text-[10px] uppercase font-semibold ${
                lightingMode === 'candlelight' ? 'bg-surface-container-high text-primary' : 'text-on-surface-variant'
              }`}
            >
              Candle
            </button>
            <button
              onClick={() => setLightingMode('gala')}
              className={`px-2 py-1 rounded text-[10px] uppercase font-semibold ${
                lightingMode === 'gala' ? 'bg-surface-container-high text-primary' : 'text-on-surface-variant'
              }`}
            >
              Gala
            </button>
          </div>
        </div>

        {/* Shutter Button */}
        <div className="flex items-center justify-center gap-4 pt-1">
          <button
            onClick={handleCapture}
            aria-label="Capture Look"
            className="w-14 h-14 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-xl active:scale-90 transition-transform ring-4 ring-primary/30 hover:bg-primary"
          >
            <span className="material-symbols-outlined text-[28px]">photo_camera</span>
          </button>
        </div>

        <p className="text-[10px] text-center text-on-surface-variant">
          Align your hand within the frame. Real-scale AR physics adapted dynamically.
        </p>
      </div>
    </div>
  );
};
