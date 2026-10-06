import React, { useState, useEffect, useRef } from 'react';
import { useCatalog } from '../context/CatalogContext';
import { MultiDayPackage, DailyQuadTour } from '../data/toursData';
import { X, Calendar, Users, MessageSquare, Check, Sparkles, Copy, CheckCheck, Clock } from 'lucide-react';

interface BookingQuoterModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang: 'es' | 'en';
  initialPackage?: MultiDayPackage | null;
  initialTour?: DailyQuadTour | null;
  initialIsDouble?: boolean;
}

export const BookingQuoterModal: React.FC<BookingQuoterModalProps> = ({
  isOpen,
  onClose,
  currentLang,
  initialPackage,
  initialTour,
  initialIsDouble = false,
}) => {
  const { packages, tours } = useCatalog();
  const [selectedCategory, setSelectedCategory] = useState<'package' | 'tour'>('package');
  const [selectedItemKey, setSelectedItemKey] = useState<string>('magica');
  const [isDoubleRider, setIsDoubleRider] = useState<boolean>(initialIsDouble);
  const [date, setDate] = useState<string>('2025-04-15');
  const dateInputRef = useRef<HTMLInputElement>(null);
  const [timeShift, setTimeShift] = useState<string>('09:00 AM');
  const [paxCount, setPaxCount] = useState<number>(2);
  const [includeGoPro, setIncludeGoPro] = useState<boolean>(true);
  const [includeLodgeUpgrade, setIncludeLodgeUpgrade] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (initialPackage) {
      setSelectedCategory('package');
      setSelectedItemKey(initialPackage.id);
    } else if (initialTour) {
      setSelectedCategory('tour');
      setSelectedItemKey(initialTour.id);
      setIsDoubleRider(initialIsDouble);
    }
  }, [initialPackage, initialTour, initialIsDouble]);

  if (!isOpen) return null;

  // Compute pricing
  let basePrice = 0;
  let title = '';

  if (selectedCategory === 'package') {
    const pkg = packages.find((p) => p.id === selectedItemKey) || packages[0];
    title = currentLang === 'es' ? pkg?.title || '' : pkg?.titleEn || '';
    basePrice = pkg?.priceFrom || 0;
  } else {
    const tour = tours.find((t) => t.id === selectedItemKey) || tours[0];
    title = currentLang === 'es' ? tour?.title || '' : tour?.titleEn || '';
    basePrice = isDoubleRider ? tour?.doublePrice || 0 : tour?.singlePrice || 0;
  }

  // Group discount for 4+ pax on packages
  let subtotal = 0;
  if (selectedCategory === 'package') {
    subtotal = basePrice * paxCount;
    if (paxCount >= 4) {
      subtotal = subtotal * 0.85; // 15% discount
    }
    if (includeLodgeUpgrade) {
      subtotal += 25 * paxCount;
    }
  } else {
    // Quad tour
    subtotal = basePrice * (isDoubleRider ? Math.ceil(paxCount / 2) : paxCount);
  }

  if (includeGoPro && selectedCategory === 'tour') {
    subtotal += 15;
  }

  const generatedWhatsAppMessage = () => {
    const langPrefix =
      currentLang === 'es'
        ? `*COTIZACIÓN TENA TRAVEL EXPEDITIONS*\n`
        : `*TENA TRAVEL EXPEDITIONS RESERVATION*\n`;

    const details =
      currentLang === 'es'
        ? `• Experiencia: ${title} (${selectedCategory === 'package' ? 'Paquete Multidía' : 'Tour Cuadrón 1 Día'})\n` +
          `• Modalidad: ${
            selectedCategory === 'package'
              ? 'Todo Incluido'
              : isDoubleRider
              ? 'Cuadrón Biplaza (2 pax)'
              : 'Cuadrón Individual'
          }\n` +
          `• Personas / Viajeros: ${paxCount}\n` +
          `• Fecha requerida: ${date}\n` +
          `• Horario deseado: ${timeShift}\n` +
          (includeGoPro && selectedCategory === 'tour' ? `• Extra: Fotos GoPro profesionales\n` : '') +
          (includeLodgeUpgrade && selectedCategory === 'package'
            ? `• Extra: Cabaña Suite con balcón al río\n`
            : '') +
          `• Total Estimado: $${subtotal.toFixed(0)} USD\n\n` +
          `Hola! ¿Tienen cupos disponibles para esta fecha? Deseo asegurar mi reserva.`
        : `• Experience: ${title} (${selectedCategory === 'package' ? 'Multi-Day Package' : 'ATV Quad Day Tour'})\n` +
          `• Setup: ${
            selectedCategory === 'package'
              ? 'All-Inclusive'
              : isDoubleRider
              ? 'Double Quad (2 pax)'
              : 'Single Quad'
          }\n` +
          `• Travelers / Riders: ${paxCount}\n` +
          `• Requested Date: ${date}\n` +
          `• Time shift: ${timeShift}\n` +
          (includeGoPro && selectedCategory === 'tour' ? `• Extra: Pro GoPro action photo session\n` : '') +
          (includeLodgeUpgrade && selectedCategory === 'package'
            ? `• Extra: Suite Cabin river view upgrade\n`
            : '') +
          `• Estimated Total: $${subtotal.toFixed(0)} USD\n\n` +
          `Hello! Do you have spots available for this date? I would like to lock in my booking.`;

    return encodeURIComponent(langPrefix + details);
  };

  const handleCopySummary = () => {
    const text = decodeURIComponent(generatedWhatsAppMessage());
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div className="relative bg-carbon-900 border-2 border-flame-500/80 rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto p-6 sm:p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-carbon-800 text-ivory-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="pr-10 mb-6">
          <div className="inline-flex items-center space-x-2 text-xs font-bold text-flame-400 uppercase tracking-widest font-display mb-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>{currentLang === 'es' ? 'COTIZADOR Y RESERVA DIRECTA' : 'INSTANT QUOTER & BOOKING'}</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-ivory-100 uppercase font-display leading-tight">
            {currentLang === 'es' ? 'Personaliza tu Expedición' : 'Customize Your Expedition'}
          </h3>
          <p className="text-xs text-ivory-400 mt-1">
            {currentLang === 'es'
              ? 'Calcula tu presupuesto en segundos y genera el enlace directo con un asesor.'
              : 'Calculate your exact budget and generate an instant reservation WhatsApp link.'}
          </p>
        </div>

        {/* Category Switcher */}
        <div className="grid grid-cols-2 gap-2 p-1 bg-carbon-850 rounded-2xl border border-jungle-800 mb-5">
          <button
            onClick={() => {
              setSelectedCategory('package');
              setSelectedItemKey('magica');
            }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider font-display transition cursor-pointer ${
              selectedCategory === 'package'
                ? 'bg-flame-600 text-white shadow-md'
                : 'text-ivory-300 hover:text-white'
            }`}
          >
            🌿 {currentLang === 'es' ? 'Paquete Multidía' : 'Multi-Day Package'}
          </button>
          <button
            onClick={() => {
              setSelectedCategory('tour');
              setSelectedItemKey('cascada-escondida');
            }}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider font-display transition cursor-pointer ${
              selectedCategory === 'tour'
                ? 'bg-flame-600 text-white shadow-md'
                : 'text-ivory-300 hover:text-white'
            }`}
          >
            ⚡ {currentLang === 'es' ? 'Tour Cuadrón (1 Día)' : 'ATV Quad Tour (1 Day)'}
          </button>
        </div>

        {/* Item Selection Dropdown */}
        <div className="space-y-4">
          <div className="bg-carbon-850 p-3.5 rounded-2xl border border-jungle-800">
            <label className="block text-[10px] font-bold uppercase text-flame-400 tracking-wider mb-1">
              {currentLang === 'es' ? 'Selecciona la Ruta / Experiencia' : 'Select Experience / Route'}
            </label>
            <select
              value={selectedItemKey}
              onChange={(e) => setSelectedItemKey(e.target.value)}
              className="w-full bg-carbon-900 border border-jungle-700 rounded-xl p-2.5 text-xs sm:text-sm font-semibold text-ivory-100 focus:outline-none focus:border-flame-500 cursor-pointer"
            >
              {selectedCategory === 'package'
                ? packages.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.duration}) - Desde ${p.priceFrom} USD
                    </option>
                  ))
                : tours.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title} ({t.duration}) - ${t.singlePrice} / ${t.doublePrice} USD
                    </option>
                  ))}
            </select>
          </div>

          {/* If Quad Tour: Select Single or Double */}
          {selectedCategory === 'tour' && (
            <div className="bg-carbon-850 p-3.5 rounded-2xl border border-jungle-800">
              <label className="block text-[10px] font-bold uppercase text-ivory-400 tracking-wider mb-2">
                {currentLang === 'es' ? 'Modalidad de Cuadrón' : 'Quad Riding Setup'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsDoubleRider(false)}
                  className={`p-2.5 rounded-xl border text-xs font-bold font-display uppercase tracking-wider transition cursor-pointer ${
                    !isDoubleRider
                      ? 'border-flame-500 bg-flame-600/20 text-flame-300'
                      : 'border-jungle-800 bg-carbon-900 text-ivory-400'
                  }`}
                >
                  {currentLang === 'es' ? '1 Piloto Individual' : 'Single Rider'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsDoubleRider(true)}
                  className={`p-2.5 rounded-xl border text-xs font-bold font-display uppercase tracking-wider transition cursor-pointer ${
                    isDoubleRider
                      ? 'border-flame-500 bg-flame-600/20 text-flame-300'
                      : 'border-jungle-800 bg-carbon-900 text-ivory-400'
                  }`}
                >
                  {currentLang === 'es' ? 'Biplaza (2 Pasajeros)' : 'Two-Seater (2 Pax)'}
                </button>
              </div>
            </div>
          )}

          {/* Date & Shift */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div 
              onClick={() => {
                try {
                  dateInputRef.current?.showPicker();
                } catch {
                  dateInputRef.current?.focus();
                }
              }}
              className="bg-carbon-850 p-3.5 rounded-2xl border border-jungle-800 hover:border-flame-500/70 transition cursor-pointer group"
            >
              <label className="block text-[10px] font-bold uppercase text-ivory-400 tracking-wider mb-1 flex items-center space-x-1 cursor-pointer">
                <Calendar className="w-3 h-3 text-flame-400 group-hover:scale-110 transition-transform" />
                <span>{currentLang === 'es' ? 'Fecha de Salida' : 'Departure Date'}</span>
              </label>
              <input
                ref={dateInputRef}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                onClick={(e) => {
                  try {
                    (e.target as HTMLInputElement).showPicker();
                  } catch {}
                }}
                className="w-full bg-carbon-900 border border-jungle-700 rounded-xl p-2 text-xs sm:text-sm font-semibold text-ivory-100 focus:outline-none focus:border-flame-500 cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-80 hover:[&::-webkit-calendar-picker-indicator]:opacity-100 transition-all"
                style={{ colorScheme: 'dark' }}
              />
            </div>

            <div className="bg-carbon-850 p-3.5 rounded-2xl border border-jungle-800">
              <label className="block text-[10px] font-bold uppercase text-ivory-400 tracking-wider mb-1 flex items-center space-x-1">
                <Clock className="w-3 h-3 text-emerald-400" />
                <span>{currentLang === 'es' ? 'Turno Horario' : 'Time Shift'}</span>
              </label>
              <select
                value={timeShift}
                onChange={(e) => setTimeShift(e.target.value)}
                className="w-full bg-carbon-900 border border-jungle-700 rounded-xl p-2 text-xs sm:text-sm font-semibold text-ivory-100 focus:outline-none focus:border-flame-500 cursor-pointer"
              >
                <option value="09:00 AM">09:00 AM (Turno Mañana)</option>
                <option value="14:00 PM">14:00 PM (Turno Tarde / Ocaso)</option>
                <option value="Personalizado">Horario a coordinar</option>
              </select>
            </div>
          </div>

          {/* Riders / Pax Count */}
          <div className="bg-carbon-850 p-3.5 rounded-2xl border border-jungle-800">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-[10px] font-bold uppercase text-ivory-400 tracking-wider flex items-center space-x-1">
                <Users className="w-3 h-3 text-amber-400" />
                <span>{currentLang === 'es' ? 'Número de Viajeros' : 'Number of Travelers'}</span>
              </label>
              {paxCount >= 4 && selectedCategory === 'package' && (
                <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/50">
                  {currentLang === 'es' ? '✓ Descuento 15% aplicado' : '✓ 15% Group discount applied'}
                </span>
              )}
            </div>
            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setPaxCount(Math.max(1, paxCount - 1))}
                className="w-10 h-10 rounded-xl bg-carbon-800 text-ivory-200 font-bold text-lg hover:bg-carbon-700 transition flex items-center justify-center cursor-pointer"
              >
                -
              </button>
              <span className="flex-1 text-center font-display font-black text-xl text-ivory-100">
                {paxCount} {paxCount === 1 ? 'persona' : 'personas'}
              </span>
              <button
                type="button"
                onClick={() => setPaxCount(paxCount + 1)}
                className="w-10 h-10 rounded-xl bg-carbon-800 text-ivory-200 font-bold text-lg hover:bg-carbon-700 transition flex items-center justify-center cursor-pointer"
              >
                +
              </button>
            </div>
          </div>

          {/* Optional Extras checkboxes */}
          <div className="space-y-2 pt-1">
            {selectedCategory === 'tour' && (
              <label className="flex items-center space-x-2.5 text-xs text-ivory-300 p-2.5 rounded-xl bg-carbon-950 border border-jungle-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeGoPro}
                  onChange={(e) => setIncludeGoPro(e.target.checked)}
                  className="rounded bg-carbon-900 border-jungle-700 text-flame-500 focus:ring-0 cursor-pointer"
                />
                <span>
                  {currentLang === 'es'
                    ? 'Añadir sesión de fotos GoPro & video 4K (+ $15 USD)'
                    : 'Add pro GoPro 4K photos & video session (+ $15 USD)'}
                </span>
              </label>
            )}

            {selectedCategory === 'package' && (
              <label className="flex items-center space-x-2.5 text-xs text-ivory-300 p-2.5 rounded-xl bg-carbon-950 border border-jungle-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeLodgeUpgrade}
                  onChange={(e) => setIncludeLodgeUpgrade(e.target.checked)}
                  className="rounded bg-carbon-900 border-jungle-700 text-flame-500 focus:ring-0 cursor-pointer"
                />
                <span>
                  {currentLang === 'es'
                    ? 'Upgrade Cabaña Suite Ribereña con balcón privado (+ $25/pax)'
                    : 'Upgrade to Riverside Suite Cabin with private balcony (+ $25/pax)'}
                </span>
              </label>
            )}
          </div>
        </div>

        {/* Live Calculation Box */}
        <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-carbon-850 to-carbon-900 border border-flame-500/50 flex items-center justify-between">
          <div>
            <span className="text-[11px] uppercase font-bold text-ivory-400 block font-display">
              {currentLang === 'es' ? 'Presupuesto Total Estimado' : 'Estimated Total Budget'}
            </span>
            <div className="flex items-baseline space-x-1.5">
              <span className="text-3xl font-black text-ivory-100 font-display">
                ${subtotal.toFixed(0)}
              </span>
              <span className="text-xs font-normal text-emerald-400">USD neto</span>
            </div>
            <span className="text-[10px] text-ivory-400 block mt-0.5">
              {currentLang === 'es' ? 'Anticipo para reservar: 20-30%' : 'Required deposit: 20-30%'}
            </span>
          </div>

          <button
            onClick={handleCopySummary}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-xl bg-carbon-800 hover:bg-carbon-700 text-ivory-300 text-xs font-bold font-display border border-jungle-700 transition cursor-pointer"
            title="Copiar cotización"
          >
            {copied ? <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? (currentLang === 'es' ? 'Copiado!' : 'Copied!') : (currentLang === 'es' ? 'Copiar' : 'Copy')}</span>
          </button>
        </div>

        {/* WhatsApp Reservation Action Button */}
        <div className="mt-6">
          <a
            href={`https://wa.me/593961893686?text=${generatedWhatsAppMessage()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center space-x-2 py-4 px-6 rounded-xl text-white font-black text-sm uppercase tracking-wider bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 shadow-xl shadow-emerald-600/30 transition font-display"
          >
            <MessageSquare className="w-5 h-5" />
            <span>
              {currentLang === 'es'
                ? 'Enviar Reserva Directa por WhatsApp'
                : 'Send Direct Booking on WhatsApp'}
            </span>
          </a>
        </div>

      </div>
    </div>
  );
};
