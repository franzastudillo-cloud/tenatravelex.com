import React from 'react';
import { ShieldCheck, MapPin, Phone, Mail, ArrowUpRight, Lock } from 'lucide-react';
import { BASE_CAMP_INFO } from '../data/toursData';
import { useCatalog } from '../context/CatalogContext';

interface FooterProps {
  currentLang: 'es' | 'en';
  onSelectView: (view: 'multiday' | 'atv') => void;
  onOpenBooking: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onSelectView,
  onOpenBooking,
  onOpenAdmin,
}) => {
  const { isAdmin } = useCatalog();
  return (
    <footer className="bg-carbon-950 border-t border-jungle-800 text-ivory-400 pt-16 pb-12" id="contacto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-flame-500/80 bg-carbon-900 shadow">
                <img
                  alt="Tena Travel Logo"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCCFcPyYROWHW1r-weFykqydQfvkej7w59yUzJbf_ARZbOjf89nkDRn5awqcPY2wK8jTove4khKzfh_WGK0f2M1RKa0a-a4BN_JEVjffBA-tQqssV-_HDExEUO8Q1t9lRhPSA3v9tW23EQUdHiXIqOuCUxozcdqkTeq2Xza_J8AKUrgQNx_ES-zwXiv-htC_KaPylfR5pWcgRmhbJSbV5CqJypBy8HgoE-2HFQWEkY-ivV6Wo7KBAB2Lbj7K3eDzZf1Zg"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black tracking-wider text-ivory-100 uppercase font-display">
                  TENA TRAVEL
                </span>
                <span className="text-[10px] tracking-widest font-semibold text-flame-500 uppercase">
                  EXPEDITIONS · ECUADOR
                </span>
              </div>
            </div>

            <p className="text-xs text-ivory-400 leading-relaxed">
              {currentLang === 'es'
                ? 'Operadora receptiva de turismo y expediciones 4x4 en Tena, Napo. Paquetes turísticos multidía, ecoturismo y circuitos todoterreno autorizados.'
                : 'Premier inbound tour operator and 4x4 quad expeditions in Tena, Napo. All-inclusive multi-day packages, eco-tours, and authorized off-road circuits.'}
            </p>

            <div className="text-xs text-emerald-400 font-semibold flex items-center space-x-1.5 pt-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>
                {currentLang === 'es'
                  ? 'Registro de Turismo Napo Aprobado MINTUR'
                  : 'Approved Napo MINTUR Tourism Registry'}
              </span>
            </div>

            <a
              href="https://maps.app.goo.gl/kSC953MkUjyeuYeS9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-amber-400 font-semibold flex items-center space-x-1.5 pt-1 hover:text-amber-300 transition-colors group"
              title="Ver reseñas en Google Maps"
            >
              <span>★★★★★</span>
              <span className="text-ivory-300 group-hover:text-amber-300">
                {currentLang === 'es' ? '5.0 en Google Maps (95+ reseñas)' : '5.0 on Google Maps (95+ reviews)'}
              </span>
              <span className="text-emerald-400 text-[10px] font-bold">↗</span>
            </a>
          </div>

          {/* Col 2: Multi-Day Packages */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-ivory-100 mb-4 font-display">
              {currentLang === 'es' ? 'Paquetes Multidía' : 'Multi-Day Packages'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onSelectView('multiday');
                    document.getElementById('paquetes')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-flame-400 transition text-left cursor-pointer"
                >
                  Amazonía Mágica (3D / 2N)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectView('multiday');
                    document.getElementById('paquetes')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-flame-400 transition text-left cursor-pointer"
                >
                  Extreme Jungle & Rafting (2D / 1N)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectView('multiday');
                    document.getElementById('paquetes')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-flame-400 transition text-left cursor-pointer"
                >
                  Expedición Profunda Napo (4D / 3N)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBooking}
                  className="hover:text-flame-400 transition text-left text-flame-400 font-semibold cursor-pointer"
                >
                  {currentLang === 'es' ? '✦ Cotizador Personalizado Grupos' : '✦ Custom Group Quoter'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Daily Quad Tours */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-ivory-100 mb-4 font-display">
              {currentLang === 'es' ? 'Tours en Cuadrón (1 Día)' : 'ATV Quad Tours (1 Day)'}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => {
                    onSelectView('atv');
                    document.getElementById('tours-diarios')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-flame-400 transition text-left cursor-pointer"
                >
                  Cascada Escondida (3h - $55 / $80)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectView('atv');
                    document.getElementById('tours-diarios')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-flame-400 transition text-left cursor-pointer"
                >
                  Selva Virgen 4x4 (4h - $70 / $100)
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onSelectView('atv');
                    document.getElementById('tours-diarios')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-flame-400 transition text-left cursor-pointer"
                >
                  Mirador Amazónico Ocaso (2.5h - $45 / $65)
                </button>
              </li>
              <li>
                <a
                  href="#como-funciona"
                  className="hover:text-flame-400 transition text-emerald-400 font-semibold"
                >
                  {currentLang === 'es' ? 'Pista de Inducción Gratuita' : 'Free Practice Induction Track'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Operations & Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-ivory-100 mb-4 font-display">
              {currentLang === 'es' ? 'Ubicación & Contacto' : 'Location & Contact'}
            </h4>
            <p className="text-xs text-ivory-300 leading-relaxed mb-3">
              {BASE_CAMP_INFO.address}
              <br />
              {BASE_CAMP_INFO.city}
              <br />
              <strong className="text-ivory-100">Atención:</strong> {BASE_CAMP_INFO.hours}
            </p>
            <a
              className="text-sm font-black text-flame-400 hover:text-flame-300 transition block mb-1 font-display"
              href="https://wa.me/593961893686"
              target="_blank"
              rel="noopener noreferrer"
            >
              WhatsApp: +593 96 189 3686
            </a>
            <span className="text-xs text-ivory-400 block mb-3">{BASE_CAMP_INFO.email}</span>
            <a
              className="inline-flex items-center space-x-1.5 text-xs text-emerald-400 hover:underline"
              href={BASE_CAMP_INFO.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>📍 {currentLang === 'es' ? 'Ver Ubicación en Google Maps' : 'View on Google Maps'}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Bottom copyright line & Discreet Admin Access */}
        <div className="pt-8 border-t border-jungle-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-ivory-500 gap-3">
          <p>
            © 2025 Tena Travel Expeditions Cía. Ltda. Todos los derechos reservados. Tena, Napo, Ecuador.
          </p>
          <div className="flex items-center space-x-4 opacity-40 hover:opacity-100 transition-opacity">
            <span className="inline-flex items-center space-x-1.5 text-emerald-500/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Cloudflare D1 En Red</span>
            </span>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hover:text-ivory-200 transition flex items-center space-x-1 cursor-pointer"
                title="Acceso Administrador de Catálogo & Cloudflare D1"
              >
                <Lock className="w-3 h-3 text-flame-400/80" />
                <span>{isAdmin ? 'Panel Admin (Activo)' : 'Modo Administrador'}</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </footer>
  );
};
