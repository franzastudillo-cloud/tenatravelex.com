import React from 'react';

interface TrustBarProps {
  currentLang: 'es' | 'en';
}

export const TrustBar: React.FC<TrustBarProps> = ({ currentLang }) => {
  return (
    <section className="border-y border-jungle-800 bg-carbon-900 py-6 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-jungle-800/60">
          
          {/* Trust 1 - Google Maps Reviews Link */}
          <a
            href="https://maps.app.goo.gl/kSC953MkUjyeuYeS9"
            target="_blank"
            rel="noopener noreferrer"
            className="pt-3 md:pt-0 flex flex-col items-center justify-center group hover:opacity-90 transition-all cursor-pointer"
            title="Ver reseñas en Google Maps (Abre nueva pestaña)"
          >
            <div className="flex items-center space-x-1 text-amber-400 text-sm mb-1 group-hover:scale-105 transition-transform">
              <span>★★★★★</span>
              <span className="text-ivory-100 font-bold ml-1">5.0 / 5.0</span>
            </div>
            <p className="text-xs text-ivory-400 group-hover:text-amber-300 transition-colors flex items-center space-x-1 underline decoration-jungle-700 group-hover:decoration-amber-400">
              <span>{currentLang === 'es' ? '95+ Reseñas Verificadas Google' : '95+ Verified Google Reviews'}</span>
              <span className="text-[10px] text-emerald-400 font-bold">↗</span>
            </p>
          </a>

          {/* Trust 2 */}
          <div className="pt-3 md:pt-0 flex flex-col items-center justify-center">
            <span className="text-sm font-bold text-ivory-100 uppercase tracking-wide font-display">
              {currentLang === 'es' ? 'Operador Turístico Certificado' : 'Certified Tour Operator'}
            </span>
            <p className="text-xs text-ivory-400">
              {currentLang === 'es' ? 'Registro Mintur Napo Aprobado' : 'Approved Mintur Napo Registry'}
            </p>
          </div>

          {/* Trust 3 */}
          <div className="pt-3 md:pt-0 flex flex-col items-center justify-center">
            <span className="text-sm font-bold text-ivory-100 uppercase tracking-wide font-display">
              {currentLang === 'es' ? 'Flota 100% Automática' : '100% Automatic Quad Fleet'}
            </span>
            <p className="text-xs text-ivory-400">
              {currentLang === 'es' ? 'Fácil acelerador, sin embrague, segura' : 'Easy thumb throttle, no clutch, ultra safe'}
            </p>
          </div>

          {/* Trust 4 */}
          <div className="pt-3 md:pt-0 flex flex-col items-center justify-center">
            <span className="text-sm font-bold text-ivory-100 uppercase tracking-wide font-display">
              {currentLang === 'es' ? 'Guías Nativos Bilingües' : 'Bilingual Native Guides'}
            </span>
            <p className="text-xs text-ivory-400">
              {currentLang === 'es' ? 'Certificación WFR primeros auxilios' : 'WFR wilderness first aid certified'}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
