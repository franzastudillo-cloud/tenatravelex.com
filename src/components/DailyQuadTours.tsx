import React, { useState } from 'react';
import { useCatalog } from '../context/CatalogContext';
import { DailyQuadTour } from '../data/toursData';
import {
  Check,
  Clock,
  Zap,
  Gauge,
  Map,
  ArrowRight,
  Shield,
  Sparkles,
  Lock,
  Edit2,
  Plus,
  Database,
  Trash2,
} from 'lucide-react';

interface DailyQuadToursProps {
  currentLang: 'es' | 'en';
  onBookTour: (tour: DailyQuadTour, isDouble: boolean) => void;
  onOpenAdminLogin: () => void;
  onOpenAdminManager: (tab?: 'multiday' | 'atv' | 'cloudflare', editId?: string) => void;
}

export const DailyQuadTours: React.FC<DailyQuadToursProps> = ({
  currentLang,
  onBookTour,
  onOpenAdminLogin,
  onOpenAdminManager,
}) => {
  const { tours, isAdmin, deleteTour } = useCatalog();
  const [activeCategory, setActiveCategory] = useState<'all' | 'popular' | 'extrema' | 'scenic'>('all');

  const filteredTours = tours.filter(
    (tour) => activeCategory === 'all' || tour.category === activeCategory
  );

  return (
    <section className="py-24 bg-carbon-900 border-t border-jungle-800 scroll-mt-24" id="tours-diarios">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Admin Controls */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-flame-400 uppercase tracking-widest font-display mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>
              {currentLang === 'es'
                ? 'FLOTA PROPIA 100% AUTOMÁTICA · ALTO RENDIMIENTO'
                : '100% AUTOMATIC QUAD FLEET · HIGH PERFORMANCE'}
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-ivory-100 uppercase tracking-tight font-display">
            {currentLang === 'es'
              ? 'Tours Diarios & Circuitos en Cuadrón (1 Día)'
              : 'Daily ATV Quad Tours (1 Day / Hours)'}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-ivory-400">
            {currentLang === 'es'
              ? 'Si ya tienes hospedaje en Tena o estás de paso por Napo, elige una de nuestras rutas diarias con equipo homologado FOX, guía nativo y pista de inducción previa.'
              : 'Staying in Tena or traveling through Napo? Choose from our daily quad routes with certified safety gear, native guides, and practice induction track.'}
          </p>

          {/* Admin Control Bar for ATV Section (Solo visible cuando la sesión está iniciada) */}
          {isAdmin && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-carbon-950 border border-emerald-500/60 shadow-xl">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 text-xs font-bold font-display uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Admin Activo</span>
                </span>
                <button
                  onClick={() => onOpenAdminManager('atv')}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-flame-600 hover:bg-flame-500 text-white text-xs font-bold font-display uppercase tracking-wider transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{currentLang === 'es' ? 'Nuevo Circuito 4x4' : 'New 4x4 Circuit'}</span>
                </button>
                <button
                  onClick={() => onOpenAdminManager('cloudflare')}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-carbon-800 hover:bg-carbon-700 text-ivory-200 border border-jungle-700 text-xs font-bold font-display uppercase tracking-wider transition cursor-pointer"
                  title="Configurar y ver SQL de Cloudflare D1"
                >
                  <Database className="w-3.5 h-3.5 text-flame-400" />
                  <span>Cloudflare D1</span>
                </button>
              </div>
            </div>
          )}

          {/* Interactive Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider font-display transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-flame-600 text-white shadow-lg shadow-flame-600/30'
                  : 'bg-carbon-800 border border-jungle-700 text-ivory-300 hover:text-white'
              }`}
            >
              {currentLang === 'es' ? `Todos los Circuitos (${tours.length})` : `All Circuits (${tours.length})`}
            </button>
            <button
              onClick={() => setActiveCategory('popular')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider font-display transition-all cursor-pointer ${
                activeCategory === 'popular'
                  ? 'bg-flame-600 text-white shadow-lg shadow-flame-600/30'
                  : 'bg-carbon-800 border border-jungle-700 text-ivory-300 hover:text-white'
              }`}
            >
              {currentLang === 'es' ? 'Cascadas & Baño Natural' : 'Waterfalls & Natural Pool'}
            </button>
            <button
              onClick={() => setActiveCategory('extrema')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider font-display transition-all cursor-pointer ${
                activeCategory === 'extrema'
                  ? 'bg-flame-600 text-white shadow-lg shadow-flame-600/30'
                  : 'bg-carbon-800 border border-jungle-700 text-ivory-300 hover:text-white'
              }`}
            >
              {currentLang === 'es' ? 'Barro 4x4 Extremo' : 'Extreme 4x4 Mud'}
            </button>
            <button
              onClick={() => setActiveCategory('scenic')}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider font-display transition-all cursor-pointer ${
                activeCategory === 'scenic'
                  ? 'bg-flame-600 text-white shadow-lg shadow-flame-600/30'
                  : 'bg-carbon-800 border border-jungle-700 text-ivory-300 hover:text-white'
              }`}
            >
              {currentLang === 'es' ? 'Miradores & Ocaso' : 'Lookouts & Sunset'}
            </button>
          </div>
        </div>

        {/* Tour Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {filteredTours.map((tour) => {
            const isMud = tour.category === 'extrema';
            return (
              <article
                key={tour.id}
                className={`bg-carbon-950 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-2xl relative ${
                  isMud
                    ? 'border-2 border-flame-500/80 shadow-flame-600/15'
                    : 'border border-jungle-700/80 hover:border-flame-500/70'
                }`}
              >
                {/* Header Image Plate */}
                <div>
                  <div className="relative h-64 overflow-hidden">
                    <img
                      alt={tour.title}
                      className="w-full h-full object-cover transition duration-500 hover:scale-105"
                      src={tour.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-transparent to-black/30" />

                    {/* Badge */}
                    <span
                      className={`absolute top-4 left-4 text-[11px] font-black uppercase px-3 py-1.5 rounded-lg shadow-md font-display ${
                        isMud
                          ? 'bg-emerald-500 text-carbon-950'
                          : tour.category === 'scenic'
                          ? 'bg-amber-500 text-carbon-950'
                          : 'bg-flame-500 text-white'
                      }`}
                    >
                      {currentLang === 'es' ? tour.badge : tour.badgeEn}
                    </span>

                    {/* Duration */}
                    <span className="absolute bottom-4 right-4 bg-carbon-900/90 backdrop-blur-md text-ivory-200 text-xs font-semibold px-3 py-1 rounded-lg border border-jungle-800 flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-flame-400" />
                      <span>{currentLang === 'es' ? tour.duration : tour.durationEn}</span>
                    </span>

                    {/* Admin Floating Edit Button */}
                    {isAdmin && (
                      <div className="absolute top-4 right-4 flex items-center space-x-1.5 z-20">
                        <button
                          onClick={() => onOpenAdminManager('atv', tour.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-carbon-900/95 hover:bg-carbon-800 text-amber-300 hover:text-amber-200 border border-amber-500/60 text-xs font-bold font-display uppercase tracking-wider flex items-center space-x-1 shadow-xl cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Editar</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`¿Eliminar circuito "${tour.title}" del catálogo?`)) {
                              deleteTour(tour.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-red-950/90 hover:bg-red-900 text-red-300 border border-red-700 shadow-xl cursor-pointer"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 mb-2">
                      <span className="text-flame-400 font-display uppercase tracking-wider font-bold">
                        {tour.circuitNum}
                      </span>
                    </div>

                    <h3 className="text-2xl font-black text-ivory-100 uppercase tracking-tight font-display">
                      {currentLang === 'es' ? tour.title : tour.titleEn}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-ivory-400 leading-relaxed">
                      {currentLang === 'es' ? tour.desc : tour.descEn}
                    </p>

                    {/* Technical Specs Matrix */}
                    <div className="grid grid-cols-3 gap-1.5 py-3 my-4 bg-carbon-850 p-2.5 rounded-xl text-center border border-jungle-800/80">
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-ivory-400">
                          {currentLang === 'es' ? 'Distancia' : 'Distance'}
                        </span>
                        <span className="font-display font-black text-base text-ivory-100">
                          {tour.specs.distance}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-ivory-400">
                          {currentLang === 'es' ? 'Ríos / Vados' : 'River Fords'}
                        </span>
                        <span className="font-display font-black text-base text-emerald-400">
                          {tour.specs.waterCrossings}
                        </span>
                      </div>
                      <div>
                        <span className="block text-[10px] uppercase font-bold text-ivory-400">
                          {currentLang === 'es' ? 'Terreno' : 'Terrain'}
                        </span>
                        <span className="font-display font-black text-xs text-flame-400 truncate">
                          {tour.specs.terrain}
                        </span>
                      </div>
                    </div>

                    {/* Inclusions checklist */}
                    <ul className="space-y-2 text-xs text-ivory-300">
                      {(currentLang === 'es' ? tour.includes : tour.includesEn).map((inc, i) => (
                        <li key={i} className="flex items-center space-x-2">
                          <Check className="w-3.5 h-3.5 text-flame-500 shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Pricing & Dual Action */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-jungle-800 mb-4">
                    <div className="flex items-baseline justify-between mb-3">
                      <div>
                        <span className="text-[11px] text-ivory-400 block uppercase">
                          {currentLang === 'es' ? 'Piloto Individual' : 'Single Rider'}
                        </span>
                        <span className="text-2xl font-black text-ivory-100 font-display">
                          ${tour.singlePrice} <span className="text-xs font-normal">USD</span>
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-[11px] text-ivory-400 block uppercase">
                          {currentLang === 'es' ? 'Biplaza (2 Pasajeros)' : 'Two-Seater (2 Pax)'}
                        </span>
                        <span className="text-2xl font-black text-flame-400 font-display">
                          ${tour.doublePrice} <span className="text-xs font-normal">USD</span>
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => onBookTour(tour, false)}
                        className="w-full py-2.5 px-2 rounded-xl border border-jungle-700 bg-carbon-800 hover:bg-carbon-700 text-ivory-200 font-bold text-[11px] uppercase tracking-wider transition text-center font-display cursor-pointer"
                      >
                        {currentLang === 'es' ? '1 Piloto ($' + tour.singlePrice + ')' : 'Solo ($' + tour.singlePrice + ')'}
                      </button>
                      <button
                        onClick={() => onBookTour(tour, true)}
                        className="w-full py-2.5 px-2 rounded-xl bg-flame-600 hover:bg-flame-500 text-white font-bold text-[11px] uppercase tracking-wider transition shadow-lg shadow-flame-600/25 text-center font-display flex items-center justify-center space-x-1 cursor-pointer"
                      >
                        <span>{currentLang === 'es' ? 'Doble ($' + tour.doublePrice + ')' : 'Double ($' + tour.doublePrice + ')'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>

              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
};
