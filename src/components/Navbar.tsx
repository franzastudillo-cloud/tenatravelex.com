import React, { useState } from 'react';
import { MessageSquare, Globe, Menu, X, Sparkles, MapPin, Phone } from 'lucide-react';

interface NavbarProps {
  currentLang: 'es' | 'en';
  onToggleLang: () => void;
  activeView: 'multiday' | 'atv';
  onSelectView: (view: 'multiday' | 'atv') => void;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentLang,
  onToggleLang,
  activeView,
  onSelectView,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Top Announcement Bar */}
      <aside className="bg-carbon-900 border-b border-jungle-800 text-[11px] py-1.5 px-4 text-ivory-400">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="inline-flex items-center text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse mr-1.5" />
              <span>
                {currentLang === 'es'
                  ? 'D1 Cloudflare Synced · Temporada 2025'
                  : 'D1 Cloudflare Synced · 2025 Season'}
              </span>
            </span>
            <span className="hidden md:inline text-carbon-700">|</span>
            <span className="hidden md:inline text-ivory-400">
              {currentLang === 'es'
                ? 'Operador Oficial en Tena, Napo, Amazonía Ecuatoriana'
                : 'Official Operator in Tena, Napo, Ecuadorian Amazon'}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://maps.app.goo.gl/kSC953MkUjyeuYeS9"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-400 font-bold flex items-center space-x-1 hover:text-amber-300 transition-colors group cursor-pointer"
              title="Ver 95+ reseñas en Google Maps"
            >
              <span>★★★★★</span>
              <span className="text-ivory-100 group-hover:text-amber-300 font-semibold text-[11px] underline decoration-amber-400/40 underline-offset-2">
                5.0 (95+ reviews)
              </span>
            </a>
            <a
              href="https://wa.me/593990367565?text=Hola%20Tena%20Travel!%20Quiero%20consultar%20disponibilidad"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-flame-400 transition hidden sm:inline-flex items-center space-x-1 font-semibold text-ivory-300"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              <span>+593 99 036 7565</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 bg-carbon-950/95 backdrop-blur-md border-b border-jungle-800">
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo */}
          <a
            href="#inicio"
            className="flex items-center space-x-2 sm:space-x-3 group min-w-0 shrink"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-flame-500/80 shadow-lg shadow-flame-600/20 bg-carbon-900 shrink-0">
              <img
                alt="Tena Travel Logo"
                className="w-full h-full object-cover group-hover:scale-105 transition"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCuqxSL2_XP938CqxyUbjX2tUTcU_WYAD-G_sKSoEYhdnOUdbdkxWZdNkSGAILiERaYw0Xxg0pex4T24E3PMrcOIZw42hcxXCPjAJ4Q4rX0c9H-dgm5EMjxojgp2zPRXC5hCvJuSrCkRvybUtoK4_XdOGdhpU-ItS-c96ad5wHpFLVHZFV8eYibZXreQvksZlg6DTlByOOflnqdXcPqRPj_JlwbH8tRcayrH7OdoxTMB98A1NLI2_yc7P8nuXlXrYJ7A"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-base sm:text-xl font-black tracking-wider text-ivory-100 uppercase font-display leading-none whitespace-nowrap">
                TENA TRAVEL
              </span>
              <span className="text-[9px] sm:text-[10px] tracking-widest font-semibold text-flame-500 uppercase mt-0.5 hidden xs:block truncate">
                EXPEDITIONS · ECUADOR
              </span>
            </div>
          </a>

          {/* Center: View Switcher (Both Screens easily accessible) */}
          <div className="hidden lg:flex items-center p-1 rounded-xl bg-carbon-900 border border-jungle-800 shrink-0">
            <button
              onClick={() => onSelectView('multiday')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider font-display transition-all cursor-pointer ${
                activeView === 'multiday'
                  ? 'bg-gradient-to-r from-flame-600 to-flame-500 text-white shadow-md'
                  : 'text-ivory-300 hover:text-white'
              }`}
            >
              🌿 {currentLang === 'es' ? 'Paquetes Multidía' : 'Multi-Day Packages'}
            </button>
            <button
              onClick={() => onSelectView('atv')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider font-display transition-all cursor-pointer ${
                activeView === 'atv'
                  ? 'bg-gradient-to-r from-flame-600 to-flame-500 text-white shadow-md'
                  : 'text-ivory-300 hover:text-white'
              }`}
            >
              ⚡ {currentLang === 'es' ? 'Tours Cuadrones (1 Día)' : 'ATV Quad Tours (1 Day)'}
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-6 text-xs font-bold uppercase tracking-wider text-ivory-300 font-display shrink-0">
            <a className="hover:text-flame-400 transition" href="#como-funciona">
              {currentLang === 'es' ? '¿Cómo Funciona?' : 'How It Works'}
            </a>
            <a className="hover:text-flame-400 transition" href="#ventajas">
              {currentLang === 'es' ? 'Ventajas' : 'Advantages'}
            </a>
            <a className="hover:text-flame-400 transition" href="#testimonios">
              {currentLang === 'es' ? 'Opiniones' : 'Reviews'}
            </a>
            <a className="hover:text-flame-400 transition" href="#base-camp">
              {currentLang === 'es' ? 'Base & Mapa' : 'Base & Map'}
            </a>
            <a className="hover:text-flame-400 transition" href="#faq">
              {currentLang === 'es' ? 'Preguntas' : 'FAQ'}
            </a>
          </nav>

          {/* Right Action Cluster - Responsive & Non-overflowing */}
          <div className="flex items-center space-x-1.5 sm:space-x-2.5 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={onToggleLang}
              className="px-2 sm:px-2.5 py-1.5 text-[11px] sm:text-xs font-extrabold rounded-lg border border-jungle-700 bg-carbon-900 text-ivory-200 hover:border-flame-500 transition flex items-center space-x-1 shrink-0 cursor-pointer"
              title="Cambiar idioma / Change language"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className={currentLang === 'es' ? 'text-flame-400' : 'text-ivory-400'}>ES</span>
              <span className="text-carbon-700">|</span>
              <span className={currentLang === 'en' ? 'text-flame-400' : 'text-ivory-400'}>EN</span>
            </button>

            {/* Quick Instant Quoter / Reservation Button */}
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center space-x-1.5 px-2.5 sm:px-4 py-1.5 sm:py-2.5 rounded-xl text-[11px] sm:text-xs font-bold uppercase tracking-wider text-white bg-gradient-to-r from-flame-600 to-flame-500 hover:from-flame-500 hover:to-flame-400 shadow-lg shadow-flame-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all font-display cursor-pointer shrink-0 whitespace-nowrap"
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span>
                {currentLang === 'es' ? (
                  <>
                    <span className="hidden sm:inline">Cotizar / </span>Reservar
                  </>
                ) : (
                  <>
                    <span className="hidden sm:inline">Quote / </span>Reserve
                  </>
                )}
              </span>
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-lg bg-carbon-900 border border-jungle-800 text-ivory-200 lg:hidden hover:border-flame-500 transition shrink-0 cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-carbon-900/98 border-b border-jungle-800 p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-jungle-800">
              <button
                onClick={() => {
                  onSelectView('multiday');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold uppercase font-display text-center ${
                  activeView === 'multiday'
                    ? 'bg-flame-600 text-white'
                    : 'bg-carbon-800 text-ivory-300'
                }`}
              >
                🌿 {currentLang === 'es' ? 'Paquetes Multidía' : 'Multi-Day'}
              </button>
              <button
                onClick={() => {
                  onSelectView('atv');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded-lg text-xs font-bold uppercase font-display text-center ${
                  activeView === 'atv'
                    ? 'bg-flame-600 text-white'
                    : 'bg-carbon-800 text-ivory-300'
                }`}
              >
                ⚡ {currentLang === 'es' ? 'Tours Cuadrones' : 'ATV Quads'}
              </button>
            </div>

            <nav className="flex flex-col space-y-2 text-xs font-bold uppercase text-ivory-300 font-display">
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded hover:bg-carbon-800 hover:text-flame-400"
                href="#como-funciona"
              >
                {currentLang === 'es' ? '¿Cómo Funciona?' : 'How It Works'}
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded hover:bg-carbon-800 hover:text-flame-400"
                href="#ventajas"
              >
                {currentLang === 'es' ? 'Ventajas & Flota' : 'Advantages & Fleet'}
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded hover:bg-carbon-800 hover:text-flame-400"
                href="#testimonios"
              >
                {currentLang === 'es' ? 'Opiniones de Exploradores' : 'Reviews'}
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded hover:bg-carbon-800 hover:text-flame-400"
                href="#base-camp"
              >
                {currentLang === 'es' ? 'Base de Operaciones & Ubicación' : 'Base Camp & Location'}
              </a>
              <a
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded hover:bg-carbon-800 hover:text-flame-400"
                href="#faq"
              >
                {currentLang === 'es' ? 'Preguntas Frecuentes' : 'FAQ'}
              </a>
            </nav>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-flame-600 to-flame-500 text-white font-black text-xs uppercase tracking-wider font-display flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>
                  {currentLang === 'es' ? 'Cotizador en Vivo WhatsApp' : 'Live WhatsApp Quoter'}
                </span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
