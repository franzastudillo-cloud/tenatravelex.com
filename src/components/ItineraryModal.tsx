import React, { useEffect } from 'react';
import { MultiDayPackage } from '../data/toursData';
import { X, Calendar, Clock, Check, MessageSquare, ArrowRight, Compass } from 'lucide-react';

interface ItineraryModalProps {
  packageData: MultiDayPackage | null;
  isOpen: boolean;
  onClose: () => void;
  currentLang: 'es' | 'en';
  onBook: (pkg: MultiDayPackage) => void;
}

export const ItineraryModal: React.FC<ItineraryModalProps> = ({
  packageData,
  isOpen,
  onClose,
  currentLang,
  onBook,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !packageData) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative bg-carbon-900 border-2 border-flame-500/70 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-carbon-800 text-ivory-400 hover:text-white hover:bg-carbon-700 transition cursor-pointer"
          aria-label="Cerrar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pr-10">
          <span className="text-xs font-black uppercase text-flame-400 font-display tracking-widest block mb-1">
            {currentLang === 'es' ? packageData.badge : packageData.badgeEn}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-ivory-100 uppercase font-display leading-tight">
            {currentLang === 'es' ? packageData.title : packageData.titleEn}
          </h3>
          <div className="flex items-center space-x-4 mt-2 text-xs text-ivory-300">
            <span className="flex items-center space-x-1 text-emerald-400 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>{currentLang === 'es' ? packageData.duration : packageData.durationEn}</span>
            </span>
            <span>·</span>
            <span className="text-ivory-400">
              {currentLang === 'es' ? `Dificultad: ${packageData.difficulty}` : `Difficulty: ${packageData.difficultyEn}`}
            </span>
          </div>
        </div>

        {/* Day-by-day Itinerary */}
        <div className="my-6 space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-ivory-400 border-b border-jungle-800 pb-2">
            {currentLang === 'es' ? 'Cronograma Detallado Día por Día' : 'Day-by-Day Detailed Schedule'}
          </h4>

          {packageData.itinerary.map((day, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-carbon-850 border border-jungle-800 hover:border-jungle-700 transition"
            >
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 font-black text-xs font-display uppercase">
                  {day.day}
                </span>
                <h5 className="text-base font-bold text-ivory-100 font-display">
                  {day.title}
                </h5>
              </div>
              <p className="text-xs sm:text-sm text-ivory-300 mt-2.5 leading-relaxed">
                {day.desc}
              </p>
              
              {/* Key Activities */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {day.activities.map((act, aIdx) => (
                  <span
                    key={aIdx}
                    className="text-[11px] bg-carbon-900 border border-jungle-700/60 text-ivory-300 px-2.5 py-1 rounded-md"
                  >
                    • {act}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Inclusions summary */}
        <div className="p-4 rounded-2xl bg-carbon-950 border border-jungle-800/80 mb-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-flame-400 mb-2">
            {currentLang === 'es' ? 'Incluido en la tarifa:' : 'Included in the rate:'}
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-ivory-300">
            {(currentLang === 'es' ? packageData.includes : packageData.includesEn).map((inc, i) => (
              <li key={i} className="flex items-start space-x-2">
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{inc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Action */}
        <div className="pt-4 border-t border-jungle-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="text-xs text-ivory-400 block uppercase">
              {currentLang === 'es' ? 'Tarifa por Persona' : 'Rate Per Person'}
            </span>
            <span className="text-2xl font-black text-ivory-100 font-display">
              ${packageData.priceFrom} <span className="text-xs font-normal text-ivory-400">USD</span>
            </span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-3 rounded-xl border border-jungle-700 bg-carbon-800 text-ivory-200 font-bold text-xs uppercase tracking-wider font-display hover:bg-carbon-700 transition cursor-pointer"
            >
              {currentLang === 'es' ? 'Cerrar' : 'Close'}
            </button>
            <button
              onClick={() => {
                onClose();
                onBook(packageData);
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-flame-600 to-flame-500 hover:from-flame-500 hover:to-flame-400 text-white font-extrabold text-xs uppercase tracking-wider font-display shadow-lg shadow-flame-600/30 transition flex items-center justify-center space-x-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{currentLang === 'es' ? 'Cotizar / Reservar' : 'Quote / Reserve'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
