import React, { useState } from 'react';
import { JewelleryProduct } from '../../types/jewelry';

interface CertificateModalProps {
  product: JewelleryProduct | null;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({ product, onClose }) => {
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!product) return null;

  const cert = product.certificate;

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-surface-dim/90 backdrop-blur-xl flex flex-col p-4 justify-between overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pt-safe pb-2 border-b border-outline-variant/30 max-w-md mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">verified</span>
          <span className="font-serif text-base font-semibold text-on-surface">
            Official Gemological Dossier
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:text-primary transition-colors border border-outline-variant/30"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      {/* Dossier Card */}
      <div className="w-full max-w-md mx-auto my-auto bg-surface-container rounded-2xl p-5 flex flex-col justify-between shadow-2xl border border-primary/30">
        <div className="flex items-start justify-between pb-4 border-b border-outline-variant/30">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
              {cert.laboratory}
            </span>
            <span className="font-serif text-xl font-bold text-on-surface mt-0.5">
              Gemological Dossier
            </span>
            <span className="text-xs text-secondary font-mono mt-0.5">
              Report #{cert.number}
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary border border-primary/30 shrink-0">
            <span className="material-symbols-outlined text-[28px]">shield</span>
          </div>
        </div>

        {/* Gemological Parameters */}
        <div className="grid grid-cols-2 gap-2.5 my-4 text-xs text-on-surface">
          <div className="p-2.5 rounded-xl bg-surface-container-high border border-outline-variant/20">
            <span className="text-[9px] uppercase tracking-wider text-on-surface-variant block font-bold">
              Shape &amp; Cut
            </span>
            <span className="font-semibold text-on-surface text-[13px]">{cert.shape}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-container-high border border-outline-variant/20">
            <span className="text-[9px] uppercase tracking-wider text-on-surface-variant block font-bold">
              Carat Weight
            </span>
            <span className="font-semibold text-primary text-[13px]">{cert.weight}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-container-high border border-outline-variant/20">
            <span className="text-[9px] uppercase tracking-wider text-on-surface-variant block font-bold">
              Color Grade
            </span>
            <span className="font-semibold text-on-surface text-[13px]">{cert.color}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-container-high border border-outline-variant/20">
            <span className="text-[9px] uppercase tracking-wider text-on-surface-variant block font-bold">
              Clarity Grade
            </span>
            <span className="font-semibold text-on-surface text-[13px]">{cert.clarity}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-container-high border border-outline-variant/20">
            <span className="text-[9px] uppercase tracking-wider text-on-surface-variant block font-bold">
              Cut &amp; Proportions
            </span>
            <span className="font-semibold text-on-surface text-[13px]">{cert.cut}</span>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-container-high border border-outline-variant/20">
            <span className="text-[9px] uppercase tracking-wider text-on-surface-variant block font-bold">
              Fluorescence
            </span>
            <span className="font-semibold text-on-surface text-[13px]">{cert.fluorescence}</span>
          </div>
        </div>

        {/* Security Seals */}
        <div className="p-2.5 rounded-xl bg-surface-container-lowest/80 flex items-center justify-between text-[11px] text-secondary border border-secondary/20">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px]">qr_code_2</span>
            <span>Micro-Laser Pavilion Inscribed &amp; Blockchain Anchored</span>
          </div>
          <span className="material-symbols-outlined text-[16px] text-primary">lock</span>
        </div>

        {/* Download Action */}
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="mt-4 w-full py-3 rounded-xl bg-surface-container-highest hover:bg-surface-container text-on-surface text-xs uppercase tracking-wider font-bold active:scale-95 transition-all flex items-center justify-center gap-2 border border-primary/20 shadow-md"
        >
          {downloading ? (
            <>
              <span className="material-symbols-outlined text-[16px] animate-spin">progress_activity</span>
              <span>Decrypting Vault Dossier...</span>
            </>
          ) : downloadSuccess ? (
            <>
              <span className="material-symbols-outlined text-[16px] text-primary">task_alt</span>
              <span className="text-primary">Dossier Saved (PDF)</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-[16px] text-secondary">download</span>
              <span>Download Encrypted PDF</span>
            </>
          )}
        </button>
      </div>

      <div className="pb-safe" />
    </div>
  );
};
