import React from 'react';
import { useCatalog } from '../context/CatalogContext';
import { MultiDayPackage } from '../data/toursData';
import {
  Check,
  Clock,
  Sparkles,
  ArrowRight,
  MessageSquare,
  Compass,
  ShieldCheck,
  Lock,
  Edit2,
  Plus,
  Database,
  Trash2,
} from 'lucide-react';

interface MultiDayPackagesProps {
  currentLang: 'es' | 'en';
  onOpenItinerary: (pkg: MultiDayPackage) => void;
  onOpenBooking: (pkg: MultiDayPackage) => void;
  onOpenAdminLogin: () => void;
  onOpenAdminManager: (tab?: 'multiday' | 'atv' | 'cloudflare', editId?: string) => void;
}

export const MultiDayPackages: React.FC<MultiDayPackagesProps> = ({
  currentLang,
  onOpenItinerary,
  onOpenBooking,
  onOpenAdminLogin,
  onOpenAdminManager,
}) => {
  const { packages, isAdmin, deletePackage } = useCatalog();

  return (
    <section className="py-24 bg-carbon-950 relative scroll-mt-24" id="paquetes">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Administrator Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-black tracking-widest text-flame-500 uppercase font-display flex items-center space-x-1.5">
              <Compass className="w-3.5 h-3.5 inline text-flame-500" />
              <span>
                {currentLang === 'es' ? 'Experiencias Completas en Napo' : 'Complete Rainforest Experiences'}
              </span>
            </span>
            <h2 className="mt-2 text-3xl sm:text-5xl lg:text-6xl font-black text-ivory-100 uppercase tracking-tight font-display">
              {currentLang === 'es'
                ? 'Paquetes Multidía Todo Incluido'
                : 'All-Inclusive Multi-Day Packages'}
            </h2>
            <p className="mt-3 text-base sm:text-lg text-ivory-400 max-w-2xl">
              {currentLang === 'es'
                ? 'Diseñados para quienes desean desconectarse y vivir la Amazonía sin preocuparse por traslados, hospedaje, alimentación ni guianzas.'
                : 'Designed for travelers who want to disconnect and enjoy the Amazon without worrying about transfers, lodging, meals, or local logistics.'}
            </p>
          </div>

          {/* Admin Control Cluster */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5">
            {!isAdmin ? (
              <button
                onClick={onOpenAdminLogin}
                className="inline-flex items-center space-x-2 text-xs font-bold uppercase tracking-wider px-3.5 py-2 rounded-xl bg-carbon-900 hover:bg-carbon-850 border border-jungle-700 hover:border-flame-500 text-ivory-300 hover:text-flame-400 transition font-display shadow-lg cursor-pointer"
                title="Acceder con contraseña para modificar precios y catálogo"
              >
                <Lock className="w-3.5 h-3.5 text-flame-500" />
                <span>{currentLang === 'es' ? 'Modo Administrador' : 'Admin Panel'}</span>
              </button>
            ) : (
              <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-carbon-900 border border-emerald-500/60 shadow-xl">
                <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 text-xs font-bold font-display uppercase">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Admin Activo</span>
                </span>
                <button
                  onClick={() => onOpenAdminManager('multiday')}
                  className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-flame-600 hover:bg-flame-500 text-white text-xs font-bold font-display uppercase tracking-wider transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{currentLang === 'es' ? 'Nuevo Paquete' : 'New Package'}</span>
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
            )}

            <div className="inline-flex items-center space-x-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-carbon-900 border border-jungle-800 text-ivory-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {currentLang === 'es'
                  ? 'Cloudflare D1 En Red'
                  : 'Live Cloudflare D1 Sync'}
              </span>
            </div>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {packages.map((pkg, idx) => {
            const isFeatured = idx === 0;
            return (
              <article
                key={pkg.id}
                className={`bg-carbon-900 rounded-3xl overflow-hidden flex flex-col justify-between shadow-2xl relative group transform hover:-translate-y-1.5 transition-all duration-300 ${
                  isFeatured
                    ? 'border-2 border-flame-500/90 shadow-flame-600/10'
                    : 'border border-jungle-700/80 hover:border-flame-500/60'
                }`}
              >
                <div>
                  {/* Image Plate */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      src={pkg.image}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-carbon-900 via-transparent to-black/35" />
                    
                    {/* Badge */}
                    <span
                      className={`absolute top-4 left-4 text-[11px] font-black uppercase px-3 py-1.5 rounded-lg shadow-xl tracking-wider font-display ${
                        isFeatured
                          ? 'bg-flame-600 text-white'
                          : idx === 1
                          ? 'bg-amber-500 text-carbon-950'
                          : 'bg-emerald-500 text-carbon-950'
                      }`}
                    >
                      {currentLang === 'es' ? pkg.badge : pkg.badgeEn}
                    </span>

                    {/* Duration */}
                    <span className="absolute bottom-4 right-4 bg-carbon-950/90 backdrop-blur-md text-ivory-200 text-xs font-bold px-3 py-1.5 rounded-lg border border-jungle-700 flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-flame-400" />
                      <span>{currentLang === 'es' ? pkg.duration : pkg.durationEn}</span>
                    </span>

                    {/* Admin Floating Edit Button */}
                    {isAdmin && (
                      <div className="absolute top-4 right-4 flex items-center space-x-1.5 z-20">
                        <button
                          onClick={() => onOpenAdminManager('multiday', pkg.id)}
                          className="px-2.5 py-1.5 rounded-lg bg-carbon-900/95 hover:bg-carbon-800 text-amber-300 hover:text-amber-200 border border-amber-500/60 text-xs font-bold font-display uppercase tracking-wider flex items-center space-x-1 shadow-xl cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Editar</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`¿Eliminar paquete "${pkg.title}" del catálogo?`)) {
                              deletePackage(pkg.id);
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
                  <div className="p-6 sm:p-7">
                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="text-emerald-400 font-semibold uppercase tracking-wider">
                        {currentLang === 'es' ? `Dificultad: ${pkg.difficulty}` : `Difficulty: ${pkg.difficultyEn}`}
                      </span>
                      <span className="text-ivory-400 font-medium">
                        {currentLang === 'es' ? pkg.departure : pkg.departureEn}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-ivory-100 uppercase tracking-tight font-display">
                      {currentLang === 'es' ? pkg.title : pkg.titleEn}
                    </h3>
                    <p className="mt-2.5 text-sm text-ivory-300 leading-relaxed">
                      {currentLang === 'es' ? pkg.desc : pkg.descEn}
                    </p>

                    {/* Inclusions */}
                    <div className="mt-6 pt-5 border-t border-jungle-800">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-flame-400 mb-3 flex items-center space-x-1">
                        <ShieldCheck className="w-3.5 h-3.5 text-flame-400" />
                        <span>{currentLang === 'es' ? 'Lo que incluye:' : "What's Included:"}</span>
                      </h4>
                      <ul className="space-y-2.5 text-xs text-ivory-300">
                        {(currentLang === 'es' ? pkg.includes : pkg.includesEn).map((inc, i) => (
                          <li key={i} className="flex items-start space-x-2.5">
                            <span className="text-emerald-400 font-bold mt-0.5">✓</span>
                            <span>{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer Pricing & Actions */}
                <div className="p-6 sm:p-7 pt-0">
                  <div className="p-4 rounded-2xl bg-carbon-850 border border-jungle-800 flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-[11px] text-ivory-400 block uppercase">
                        {currentLang === 'es' ? 'Desde' : 'From'}
                      </span>
                      <span className="text-3xl font-black text-ivory-100 font-display leading-none">
                        ${pkg.priceFrom}{' '}
                        <span className="text-xs font-normal text-ivory-400">USD/pax</span>
                      </span>
                    </div>
                    {pkg.discountBadge ? (
                      <span className="text-[11px] text-emerald-400 font-medium bg-emerald-950/60 px-2.5 py-1 rounded border border-emerald-800/50">
                        {currentLang === 'es' ? pkg.discountBadge : pkg.discountBadgeEn}
                      </span>
                    ) : (
                      <span className="text-[11px] text-amber-400 font-medium bg-amber-950/60 px-2.5 py-1 rounded border border-amber-800/50">
                        {currentLang === 'es' ? pkg.categoryBadge : pkg.categoryBadgeEn}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onOpenItinerary(pkg)}
                      className="w-full py-3 px-3 rounded-xl border border-jungle-700 bg-carbon-800 hover:bg-carbon-700 text-ivory-200 font-bold text-xs uppercase tracking-wider transition text-center font-display cursor-pointer"
                    >
                      {currentLang === 'es' ? 'Ver Itinerario' : 'View Itinerary'}
                    </button>
                    <button
                      onClick={() => onOpenBooking(pkg)}
                      className="w-full py-3 px-3 rounded-xl bg-flame-600 hover:bg-flame-500 text-white font-bold text-xs uppercase tracking-wider transition shadow-lg shadow-flame-600/30 text-center font-display flex items-center justify-center space-x-1 cursor-pointer"
                    >
                      <span>{currentLang === 'es' ? 'Reservar WA' : 'Book WA'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Custom Tailored Package Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-jungle-900 via-carbon-900 to-carbon-850 border border-flame-500/40 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-flame-500/10 border border-flame-500/30 flex items-center justify-center text-flame-400 text-2xl shrink-0">
              🗺️
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-ivory-100 font-display">
                {currentLang === 'es'
                  ? '¿Deseas armar un paquete a la medida para tu familia o grupo corporativo?'
                  : 'Looking for a custom private tour for family or corporate group?'}
              </h3>
              <p className="text-xs sm:text-sm text-ivory-400 mt-1">
                {currentLang === 'es'
                  ? 'Ajustamos días, deportes extremos (canyoning, espeleología, kayak) y categoría de hospedaje en Tena con tarifas de operador directo.'
                  : 'We tailor days, extreme activities (canyoning, caving, kayak) and lodging category in Tena at direct local operator rates.'}
              </p>
            </div>
          </div>
          <a
            className="shrink-0 px-6 py-3.5 rounded-xl bg-flame-600 hover:bg-flame-500 text-white font-bold text-xs uppercase tracking-wider transition font-display flex items-center space-x-2"
            href="https://wa.me/593961893686?text=Hola%20Tena%20Travel!%20Quiero%20cotizar%20un%20paquete%20personalizado%20a%20la%20medida."
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{currentLang === 'es' ? 'Personalizar con Asesor' : 'Customize with Agent'}</span>
          </a>
        </div>

      </div>
    </section>
  );
};
