import React, { useState } from 'react';
import confetti from 'canvas-confetti';

interface BoutiqueBookingModalProps {
  onClose: () => void;
}

export const BoutiqueBookingModal: React.FC<BoutiqueBookingModalProps> = ({ onClose }) => {
  const [salonCity, setSalonCity] = useState('Mumbai - Bandra Kurla Complex');
  const [bookingDate, setBookingDate] = useState('2026-10-12');
  const [timeSlot, setTimeSlot] = useState('03:00 PM (Private Suite)');
  const [guestName, setGuestName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#f2ca50', '#e4c277', '#ffffff'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-surface-dim/90 backdrop-blur-xl flex flex-col p-4 justify-between overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pt-safe pb-2 border-b border-outline-variant/30 max-w-md mx-auto w-full">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[22px]">calendar_month</span>
          <span className="font-serif text-base font-semibold text-on-surface">
            Private Atelier Appointment
          </span>
        </div>
        <button
          onClick={onClose}
          className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:text-primary transition-colors border border-outline-variant/30"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>
      </div>

      <div className="w-full max-w-md mx-auto my-auto bg-surface-container rounded-2xl p-5 shadow-2xl border border-primary/30">
        {isBooked ? (
          <div className="flex flex-col items-center text-center py-6 gap-3">
            <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center border border-primary/40 shadow-xl">
              <span className="material-symbols-outlined text-[36px]">verified</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-on-surface">
              Private Salon Reserved
            </h3>
            <p className="text-xs text-on-surface-variant max-w-xs leading-relaxed">
              Your confidential consultation at <strong>{salonCity}</strong> has been secured for <strong>{bookingDate}</strong> at <strong>{timeSlot}</strong>.
            </p>
            <div className="w-full p-3 rounded-xl bg-surface-container-high border border-primary/20 text-xs text-secondary mt-2">
              Chilled Dom Pérignon champagne &amp; private master gemologist assigned to your party.
            </div>
            <button
              onClick={onClose}
              className="mt-4 w-full py-2.5 rounded-xl bg-primary text-on-primary font-bold text-xs uppercase tracking-wider active:scale-95"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-xs">
            <div>
              <label className="font-semibold text-on-surface block mb-1">Select Flagship Salon</label>
              <select
                value={salonCity}
                onChange={(e) => setSalonCity(e.target.value)}
                className="w-full bg-surface-container-low text-on-surface p-2.5 rounded-xl border border-outline-variant/30 focus:border-primary/50 focus:outline-none"
              >
                <option value="Mumbai - Bandra Kurla Complex">Mumbai — Bandra Kurla Complex Flagship</option>
                <option value="New Delhi - The Chanakya">New Delhi — The Chanakya Diplomatic Enclave</option>
                <option value="London - Mayfair Salon">London — 14 New Bond Street, Mayfair</option>
                <option value="Paris - Place Vendôme">Paris — 8 Place Vendôme Suite</option>
                <option value="Virtual Private Video Salon">Virtual Video Salon — Ultra HD Gem Cam</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="font-semibold text-on-surface block mb-1">Preferred Date</label>
                <input
                  type="date"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-surface-container-low text-on-surface p-2.5 rounded-xl border border-outline-variant/30 focus:border-primary/50 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="font-semibold text-on-surface block mb-1">Time Slot</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full bg-surface-container-low text-on-surface p-2.5 rounded-xl border border-outline-variant/30 focus:border-primary/50 focus:outline-none"
                >
                  <option value="11:30 AM (Morning Salon)">11:30 AM (Morning Salon)</option>
                  <option value="03:00 PM (Private Suite)">03:00 PM (Private Suite)</option>
                  <option value="06:30 PM (Evening Soirée)">06:30 PM (Evening Soirée)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-on-surface block mb-1">Guest Full Name</label>
              <input
                type="text"
                placeholder="e.g. Maharani Gayatri / Lord Sterling"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full bg-surface-container-low text-on-surface p-2.5 rounded-xl border border-outline-variant/30 focus:border-primary/50 focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="font-semibold text-on-surface block mb-1">Direct Contact / Concierge Phone</label>
              <input
                type="tel"
                placeholder="+91 98200 00000"
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full bg-surface-container-low text-on-surface p-2.5 rounded-xl border border-outline-variant/30 focus:border-primary/50 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="mt-3 w-full py-3 rounded-xl bg-primary text-on-primary font-bold text-xs uppercase tracking-wider active:scale-95 transition-all shadow-lg hover:bg-primary-fixed"
            >
              Confirm Appointment
            </button>
          </form>
        )}
      </div>

      <div className="pb-safe" />
    </div>
  );
};
