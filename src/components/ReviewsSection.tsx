import React from 'react';
import { REVIEWS } from '../data/toursData';
import { Star, ShieldCheck } from 'lucide-react';

interface ReviewsSectionProps {
  currentLang: 'es' | 'en';
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ currentLang }) => {
  return (
    <section className="py-24 bg-carbon-950 border-t border-jungle-800 scroll-mt-24" id="testimonios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Rating Badge */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-black tracking-widest text-flame-500 uppercase font-display">
              {currentLang === 'es' ? 'EXPERIENCIAS REALES VERIFICADAS' : 'VERIFIED EXPLORER REVIEWS'}
            </span>
            <h2 className="mt-2 text-3xl sm:text-5xl font-black text-ivory-100 uppercase tracking-tight font-display">
              {currentLang === 'es'
                ? 'Lo que dicen nuestros exploradores'
                : 'What Our Pilots & Explorers Say'}
            </h2>
            <p className="mt-3 text-base text-ivory-400">
              {currentLang === 'es'
                ? 'Más de 500 viajeros nacionales e internacionales han confiado sus vacaciones en Tena Travel.'
                : 'Over 500 national and international travelers have trusted their adventures to Tena Travel.'}
            </p>
          </div>

          <a
            href="https://maps.app.goo.gl/kSC953MkUjyeuYeS9"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-carbon-900 border border-jungle-800 hover:border-amber-400/80 p-4 rounded-2xl flex items-center space-x-4 shadow-xl shrink-0 group transition-all cursor-pointer hover:-translate-y-0.5"
            title="Ver todas las reseñas en Google Maps (Abre nueva pestaña)"
          >
            <div className="text-3xl font-black text-amber-400 font-display leading-none group-hover:scale-105 transition-transform">
              5.0
            </div>
            <div>
              <div className="text-amber-400 text-sm tracking-widest">★★★★★</div>
              <span className="text-xs text-ivory-200 group-hover:text-amber-300 font-bold uppercase font-display flex items-center space-x-1 mt-0.5">
                <span>95+ Google Reviews</span>
                <span className="text-emerald-400 text-sm">↗</span>
              </span>
            </div>
          </a>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-7 rounded-3xl bg-carbon-900 border border-jungle-800 flex flex-col justify-between shadow-xl hover:border-flame-500/50 transition-all duration-300"
            >
              <div>
                <div className="flex text-amber-400 text-sm mb-4">
                  {'★'.repeat(rev.rating)}
                </div>
                <p className="text-sm text-ivory-300 leading-relaxed italic">
                  "{currentLang === 'es' ? rev.comment : rev.commentEn}"
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-jungle-800/80 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-carbon-800 border border-jungle-700 text-flame-400 font-display font-black text-xs flex items-center justify-center">
                    {rev.initials}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-ivory-100 font-display">{rev.author}</h4>
                    <span className="text-xs text-ivory-400 block">{rev.location}</span>
                  </div>
                </div>
                <span className="text-[11px] text-flame-400 font-semibold font-display uppercase tracking-wider text-right">
                  {currentLang === 'es' ? rev.tour : rev.tourEn}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Google Maps Link CTA */}
        <div className="mt-12 text-center">
          <a
            href="https://maps.app.goo.gl/kSC953MkUjyeuYeS9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-6 py-3.5 rounded-2xl bg-carbon-900 hover:bg-carbon-850 border border-jungle-700 hover:border-amber-400 text-ivory-200 text-xs sm:text-sm font-bold uppercase tracking-wider font-display transition-all shadow-xl hover:scale-[1.02] cursor-pointer"
          >
            <span className="text-amber-400 font-bold">★★★★★</span>
            <span>
              {currentLang === 'es'
                ? 'Ver todas las reseñas y opiniones de viajeros en Google Maps'
                : 'Read all traveler reviews and ratings on Google Maps'}
            </span>
            <span className="text-emerald-400 font-bold ml-1">↗</span>
          </a>
        </div>

      </div>
    </section>
  );
};
