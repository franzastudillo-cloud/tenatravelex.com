import React, { useState, useRef } from 'react';
import {
  ArrowRight,
  Calendar,
  Compass,
  Users,
  Sparkles,
  Shield,
  Clock,
  Star,
  Flame,
  Play,
  Pause,
  Video,
  Eye,
  Maximize2,
} from 'lucide-react';

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
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoMode, setVideoMode] = useState<'drone' | 'scenic'>('drone');
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const isAtv = activeView === 'atv';

  // Authentic Tena Landscape and Confluence Image
  const TENA_MUSEUM_CONFLUENCE_IMG =
    'https://upload.wikimedia.org/wikipedia/commons/b/b7/Malec%C3%B3n_y_Puente_Atirantado_de_Tena.JPG';

  // High-clarity aerial drone video stream
  const DRONE_RIVER_VIDEO =
    'https://upload.wikimedia.org/wikipedia/commons/8/84/Beaverhead-River-Drone-Shot.webm';

  return (
    <section
      className="relative min-h-[90vh] pt-14 pb-20 flex items-center justify-center overflow-hidden"
      id="inicio"
    >
      {/* Background Media Plate - Ultra Clear, Vibrant Daylight Video with High Clarity */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* HTML5 Video Layer with Direct Drone Stream */}
        <div className="w-full h-full relative">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            poster={TENA_MUSEUM_CONFLUENCE_IMG}
            className="w-full h-full object-cover scale-105 filter brightness-115 contrast-105 saturate-110 transition-all duration-700"
          >
            <source src="/tena_rio_portada.mp4" type="video/mp4" />
            <source src="tena_rio_portada.mp4" type="video/mp4" />
            <source src={DRONE_RIVER_VIDEO} type="video/webm" />
            <img
              alt="Dron de la Confluencia de Ríos Tena y Pano con Puente Atirantado La Isla"
              className="w-full h-full object-cover scale-105 filter brightness-115 contrast-105 saturate-110 animate-kenburns"
              src={TENA_MUSEUM_CONFLUENCE_IMG}
            />
          </video>
        </div>

        {/* Ultra-Clear Daylighting: Only subtle top & bottom vignettes, leaving 100% clear luminous video in the center */}
        <div className="absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-carbon-950/80 via-carbon-950/25 to-transparent pointer-events-none z-[1]" />
        <div className="absolute bottom-0 inset-x-0 h-36 bg-gradient-to-t from-carbon-950 via-carbon-950/30 to-transparent pointer-events-none z-[1]" />

        {/* Ambient Subtle Golden Sunbeam */}
        <div className="absolute top-10 right-1/4 w-[400px] h-[250px] rounded-full bg-amber-400/10 blur-[100px] pointer-events-none z-[1]" />
      </div>

      {/* Floating Video Control HUD - Claridad & Vista del Dron */}
      <div className="absolute top-20 right-4 sm:right-8 z-20 flex items-center space-x-2">
        <div className="bg-carbon-900/90 backdrop-blur-md border border-jungle-700/80 px-3 py-1.5 rounded-xl shadow-2xl flex items-center space-x-2 text-[11px] text-ivory-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-bold uppercase font-display text-emerald-300">
            Dron 4K: Confluencia Ríos Tena & Pano
          </span>
          <button
            onClick={togglePlay}
            className="p-1 rounded-lg bg-carbon-800 hover:bg-carbon-700 text-ivory-300 hover:text-white transition cursor-pointer"
            title={isPlaying ? 'Pausar video' : 'Reproducir video'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Target Selected Element: Hero Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Live Status Pill with Radar Motion */}
        <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full border border-emerald-500/60 bg-carbon-950/85 backdrop-blur-md mb-6 shadow-2xl hover:border-flame-500/60 transition-all duration-300">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_8px_#34d399]"></span>
          </span>
          <span className="text-xs sm:text-sm font-bold tracking-wider text-emerald-300 uppercase font-display drop-shadow">
            {isAtv
              ? currentLang === 'es'
                ? 'SÓLO 3 CUADRONES DISPONIBLES HOY (14:30) · TENA, NAPO'
                : 'ONLY 3 QUADS REMAINING FOR TODAY’S 14:30 RUN · TENA, NAPO'
              : currentLang === 'es'
              ? 'Salidas Diarias Confirmadas · Guías Locales Certificados Mintur · Tena, Napo'
              : 'Daily Guaranteed Departures · Certified Local Guides Mintur · Tena, Napo'}
          </span>
          <span className="hidden sm:inline-flex items-center space-x-1 text-[10px] text-flame-400 font-bold uppercase tracking-wider bg-flame-950/80 px-2 py-0.5 rounded border border-flame-800/60">
            <span className="w-1.5 h-1.5 rounded-full bg-flame-400 animate-pulse"></span>
            <span>{currentLang === 'es' ? 'Cámara En Vivo' : 'Live Camera'}</span>
          </span>
        </div>

        {/* Main Headline with Animated Shimmering Fire Gradient & Crisp Shadow for High Legibility */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white uppercase leading-[0.96] max-w-5xl font-display drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)]">
          {isAtv ? (
            <>
              <span>
                {currentLang === 'es'
                  ? 'SIENTE LA AMAZONÍA SOBRE'
                  : 'FEEL THE AMAZON ON'}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-flame-400 via-flame-500 to-amber-400 animate-gradient-text drop-shadow-[0_4px_24px_rgba(255,96,54,0.45)]">
                {currentLang === 'es' ? 'CUATRO RUEDAS EN CUADRONES' : 'FOUR WHEELS ON QUADS'}
              </span>
            </>
          ) : (
            <>
              <span>
                {currentLang === 'es'
                  ? 'EXPEDICIONES Y PAQUETES TURÍSTICOS EN LA'
                  : 'EXPEDITIONS & MULTI-DAY PACKAGES IN'}
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-flame-400 via-flame-500 to-amber-400 animate-gradient-text drop-shadow-[0_4px_24px_rgba(255,96,54,0.45)]">
                {currentLang === 'es' ? 'AMAZONÍA DE NAPO' : 'TENA, NAPO ECUADOR'}
              </span>
            </>
          )}
        </h1>

        {/* Subtitle with subtle glass backing for effortless reading on the clear video */}
        <p className="mt-6 text-base sm:text-xl text-ivory-100 max-w-3xl font-medium leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] bg-black/35 backdrop-blur-sm px-5 py-2.5 rounded-2xl border border-white/10">
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
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-flame-600 to-flame-500 hover:from-flame-500 hover:to-flame-400 text-white font-extrabold text-sm tracking-wider uppercase shadow-xl shadow-flame-600/40 hover:shadow-flame-500/60 hover:scale-[1.02] active:scale-[0.98] transition-all text-center font-display cursor-pointer"
          >
            🌿 {currentLang === 'es' ? 'Explorar Paquetes Multidía' : 'Explore Multi-Day Packages'}
          </button>

          <button
            onClick={() => {
              onSelectView('atv');
              document.getElementById('tours-diarios')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-carbon-900/90 hover:bg-carbon-800 text-ivory-100 border border-jungle-600 hover:border-flame-500 font-bold text-sm tracking-wider uppercase backdrop-blur-md hover:scale-[1.02] active:scale-[0.98] transition-all text-center font-display cursor-pointer shadow-xl"
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
            <a
              href="https://wa.me/593990367565?text=Hola%20Tena%20Travel!%20Quiero%20consultar%20disponibilidad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-emerald-400 hover:text-emerald-300 font-semibold flex items-center space-x-1"
            >
              <span>WhatsApp Business: +593 99 036 7565</span>
              <span className="text-xs">↗</span>
            </a>
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
            <div className="bg-carbon-850 p-3 rounded-xl border border-jungle-800 focus-within:border-flame-500 transition">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-ivory-400 mb-1 flex items-center space-x-1">
                <Calendar className="w-3 h-3 inline text-flame-500" />
                <span>{currentLang === 'es' ? 'Fecha o Mes Estimado' : 'Estimated Date / Month'}</span>
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full bg-transparent border-0 p-0 text-xs sm:text-sm font-semibold text-ivory-100 focus:ring-0 cursor-pointer"
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
