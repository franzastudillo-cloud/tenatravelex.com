import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Calendar, Compass, Users, Sparkles, Shield, Clock, Star, Flame } from 'lucide-react';

interface HeroSectionProps {
  currentLang: 'es' | 'en';
  activeView: 'multiday' | 'atv';
  onSelectView: (view: 'multiday' | 'atv') => void;
  onOpenBookingWithParams: (type: string, pax: string, date: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentLang,
  activeView,
  onSelectView,
  onOpenBookingWithParams,
}) => {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDate, setSelectedDate] = useState('2025-04-15');
  const [selectedPax, setSelectedPax] = useState('2');
  const dateInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((err) => {
        console.warn('Video autoplay:', err);
      });
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedType === 'multiday') {
      onSelectView('multiday');
      const el = document.getElementById('paquetes');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else if (selectedType === 'daily') {
      onSelectView('atv');
      const el = document.getElementById('tours-diarios');
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      onOpenBookingWithParams(selectedType, selectedPax, selectedDate);
    }
  };

  const isAtv = activeView === 'atv';

  return (
    <section className="relative min-h-[88vh] pt-14 pb-20 flex items-center justify-center overflow-hidden" id="inicio">
      {/* Background Media Plate with Animated Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Layer 1: Animated Drone Video Backdrop - Bright and Crisp */}
        <div className="w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=80"
            className="w-full h-full object-cover brightness-105 contrast-105 saturate-110 transition-all duration-700"
          >
            <source
              src="/videos/hero.webm"
              type="video/webm"
            />
            <source
              src="https://upload.wikimedia.org/wikipedia/commons/8/84/Beaverhead-River-Drone-Shot.webm"
              type="video/webm"
            />
          </video>
        </div>

        {/* Ambient Moving Rainforest Mist & Floating Particles (Subtle) */}
        <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none opacity-30">
          <div className="absolute top-1/4 left-1/5 w-72 h-72 rounded-full bg-emerald-500/10 blur-[90px] animate-particle-1" />
          <div className="absolute top-1/2 right-1/4 w-80 h-80 rounded-full bg-flame-500/15 blur-[110px] animate-particle-2" />
          <div className="absolute bottom-1/4 left-1/3 w-64 h-64 rounded-full bg-amber-400/10 blur-[85px] animate-particle-3" />
        </div>

        {/* Soft lighting scrim so the river & rainforest are 100% visible, bright & clear */}
        <div className="absolute inset-0 z-[2] bg-gradient-to-t from-[#070807] via-black/20 to-[#070807]/50 pointer-events-none" />
      </div>

      {/* Target Selected Element: Hero Content Container with Live Motion */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Live Status Pill with Radar Motion */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-emerald-500/50 bg-carbon-900/90 backdrop-blur-md mb-6 shadow-2xl hover:border-flame-500/60 transition-all duration-300">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
          </span>
          <span className="text-xs sm:text-sm font-bold tracking-wider text-emerald-300 uppercase font-display">
            {isAtv
              ? currentLang === 'es'
                ? 'SÓLO 3 CUATRIMOTOS DISPONIBLES HOY (14:30) · TENA, NAPO'
                : 'ONLY 3 ATVS REMAINING FOR TODAY’S 14:30 RUN · TENA, NAPO'
              : currentLang === 'es'
              ? 'Salidas Diarias Confirmadas · Guías Locales Certificados Mintur · Tena, Napo'
              : 'Daily Guaranteed Departures · Certified Local Guides Mintur · Tena, Napo'}
          </span>
          <span className="hidden sm:inline-flex items-center space-x-1 text-[10px] text-flame-400 font-bold uppercase tracking-wider bg-flame-950/60 px-2 py-0.5 rounded border border-flame-800/40">
            <span className="w-1.5 h-1.5 rounded-full bg-flame-400 animate-pulse"></span>
            <span>{currentLang === 'es' ? 'Cámara En Vivo' : 'Live Camera'}</span>
          </span>
        </div>

        {/* Main Headline with Animated Shimmering Fire Gradient */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-ivory-100 uppercase leading-[0.96] max-w-5xl font-display drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
          {isAtv ? (
            <>
              <span>
                {currentLang === 'es'
                  ? 'SIENTE LA AMAZONÍA SOBRE'
                  : 'FEEL THE AMAZON ON'}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-flame-400 via-flame-500 to-amber-500 animate-gradient-text drop-shadow-[0_4px_24px_rgba(255,96,54,0.35)]">
                {currentLang === 'es' ? 'CUATRO RUEDAS' : 'FOUR WHEELS'}
              </span>
            </>
          ) : (
            <>
              <span>
                {currentLang === 'es'
                  ? 'EXPEDICIONES Y PAQUETES TURÍSTICOS EN LA'
                  : 'EXPEDITIONS & MULTI-DAY PACKAGES IN'}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-flame-400 via-flame-500 to-amber-500 animate-gradient-text drop-shadow-[0_4px_24px_rgba(255,96,54,0.35)]">
                {currentLang === 'es' ? 'AMAZONÍA DE NAPO' : 'TENA, NAPO ECUADOR'}
              </span>
            </>
          )}
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-ivory-200 max-w-3xl font-medium leading-relaxed drop-shadow-[0_2px_14px_rgba(0,0,0,0.95)]">
          {isAtv
            ? currentLang === 'es'
              ? 'Expediciones todoterreno guiadas hacia cascadas ocultas, lagunas esmeralda y cruces de ríos en Tena, Napo. Máquinas automáticas CAN-AM y Honda con guías certificados y senderos de selva virgen.'
              : 'Guided off-road quad expeditions through hidden waterfalls, emerald river basins, and primary rainforest trails in Tena, Napo. Automatic CAN-AM & Honda fleet with wilderness-certified local pilots.'
            : currentLang === 'es'
            ? 'Descubre paquetes todo incluido de 2, 3 y 4 días (selva profunda, cascadas sagradas, cavernas de Jumandy y cuadrones) y tours diarios de adrenalina pura con guías nativos.'
            : 'Discover all-inclusive 2, 3, and 4-day packages (deep rainforest, sacred waterfalls, Jumandy caves & quads) and pure adrenaline day tours with local native guides.'}
        </p>

        {/* Primary Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            onClick={() => {
              onSelectView('multiday');
              document.getElementById('paquetes')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-flame-600 to-flame-500 hover:from-flame-500 hover:to-flame-400 text-white font-extrabold text-sm tracking-wider uppercase shadow-xl shadow-flame-600/35 hover:shadow-flame-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all text-center font-display cursor-pointer"
          >
            🌿 {currentLang === 'es' ? 'Explorar Paquetes Multidía' : 'Explore Multi-Day Packages'}
          </button>

          <button
            onClick={() => {
              onSelectView('atv');
              document.getElementById('tours-diarios')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-carbon-900/90 hover:bg-carbon-800 text-ivory-200 border border-jungle-700 hover:border-flame-500/60 font-bold text-sm tracking-wider uppercase backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all text-center font-display cursor-pointer"
          >
            🔥 {currentLang === 'es' ? 'Ver Tours en Cuadrón (1 Día)' : 'View ATV Quad Tours (1 Day)'}
          </button>
        </div>

        {/* Real-time Search & Quoter Box */}
        <div className="w-full max-w-5xl mt-12 p-4 sm:p-5 rounded-2xl bg-carbon-900/95 border border-jungle-700/80 shadow-2xl backdrop-blur-xl text-left hover:border-flame-500/40 transition-colors">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-jungle-800/80 px-1">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-flame-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-ivory-200 font-display">
                {currentLang === 'es'
                  ? 'Buscador y Cotizador de Experiencias en Tiempo Real'
                  : 'Real-Time Expedition Finder & Instant Quoter'}
              </span>
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold hidden sm:inline flex items-center space-x-1">
              <Sparkles className="w-3 h-3 inline" />
              <span>{currentLang === 'es' ? 'Salidas Diarias Confirmadas' : 'Daily Guaranteed Departures'}</span>
            </span>
          </div>

          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Field 1: Type */}
            <div className="bg-carbon-850 p-3 rounded-xl border border-jungle-800 focus-within:border-flame-500 transition">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-flame-400 mb-1 flex items-center space-x-1">
                <Compass className="w-3 h-3 inline" />
                <span>{currentLang === 'es' ? 'Tipo de Expedición' : 'Expedition Type'}</span>
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full bg-transparent border-0 p-0 text-xs sm:text-sm font-semibold text-ivory-100 focus:ring-0 cursor-pointer"
              >
                <option className="bg-carbon-900 text-ivory-200" value="all">
                  {currentLang === 'es' ? 'Todos los Paquetes y Tours' : 'All Packages & Tours'}
                </option>
                <option className="bg-carbon-900 text-ivory-200" value="multiday">
                  {currentLang === 'es' ? 'Paquetes Multidía (2-4 Días)' : 'Multi-Day Packages (2-4 Days)'}
                </option>
                <option className="bg-carbon-900 text-ivory-200" value="daily">
                  {currentLang === 'es' ? 'Tours en Cuadrón (1 Día / Horas)' : 'ATV Quad Tours (1 Day / Hours)'}
                </option>
              </select>
            </div>

            {/* Field 2: Date */}
            <div
              onClick={() => {
                try {
                  dateInputRef.current?.showPicker();
                } catch {
                  dateInputRef.current?.focus();
                }
              }}
              className="bg-carbon-850 p-3 rounded-xl border border-jungle-800 focus-within:border-flame-500 hover:border-flame-500/70 transition cursor-pointer group"
            >
              <label className="block text-[10px] font-bold uppercase tracking-wider text-ivory-400 mb-1 flex items-center space-x-1 cursor-pointer">
                <Calendar className="w-3 h-3 inline text-flame-500 group-hover:scale-110 transition-transform" />
                <span>{currentLang === 'es' ? 'Fecha o Mes Estimado' : 'Estimated Date / Month'}</span>
              </label>
              <input
                ref={dateInputRef}
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                onClick={(e) => {
                  try {
                    (e.target as HTMLInputElement).showPicker();
                  } catch {}
                }}
                className="w-full bg-transparent border-0 p-0 text-xs sm:text-sm font-semibold text-ivory-100 focus:ring-0 cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-80 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 transition-all"
                style={{ colorScheme: 'dark' }}
              />
            </div>

            {/* Field 3: Passengers */}
            <div className="bg-carbon-850 p-3 rounded-xl border border-jungle-800 focus-within:border-flame-500 transition">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-ivory-400 mb-1 flex items-center space-x-1">
                <Users className="w-3 h-3 inline text-flame-500" />
                <span>{currentLang === 'es' ? 'Viajeros / Pasajeros' : 'Travelers / Passengers'}</span>
              </label>
              <select
                value={selectedPax}
                onChange={(e) => setSelectedPax(e.target.value)}
                className="w-full bg-transparent border-0 p-0 text-xs sm:text-sm font-semibold text-ivory-100 focus:ring-0 cursor-pointer"
              >
                <option className="bg-carbon-900 text-ivory-200" value="1">
                  {currentLang === 'es' ? '1 Persona (Individual)' : '1 Rider (Solo)'}
                </option>
                <option className="bg-carbon-900 text-ivory-200" value="2">
                  {currentLang === 'es' ? '2 Personas (Pareja / Amigos)' : '2 Riders (Couple / Friends)'}
                </option>
                <option className="bg-carbon-900 text-ivory-200" value="3-5">
                  {currentLang === 'es' ? '3 - 5 Personas (Familia / Grupo)' : '3 - 5 Riders (Family / Group)'}
                </option>
                <option className="bg-carbon-900 text-ivory-200" value="6+">
                  {currentLang === 'es' ? '6+ Personas (Grupo Privado)' : '6+ Riders (Private Caravan)'}
                </option>
              </select>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="h-full min-h-[50px] flex items-center justify-center space-x-2 bg-gradient-to-r from-flame-600 to-flame-500 hover:from-flame-500 hover:to-flame-400 text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider rounded-xl px-4 transition shadow-lg shadow-flame-600/30 hover:shadow-flame-500/40 hover:scale-[1.02] active:scale-[0.98] font-display cursor-pointer"
            >
              <span>{currentLang === 'es' ? 'Explorar Tours y Paquetes' : 'Search Tours & Packages'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};
