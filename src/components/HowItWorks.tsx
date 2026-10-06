import React from 'react';
import { MessageSquare, Shield, CheckCircle, Navigation } from 'lucide-react';

interface HowItWorksProps {
  currentLang: 'es' | 'en';
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ currentLang }) => {
  const steps = [
    {
      num: '01',
      title: currentLang === 'es' ? '1. Elige tu paquete o tour' : '1. Choose your tour or package',
      desc:
        currentLang === 'es'
          ? 'Escoge entre 2, 3 o 4 días, o una ruta de medio día en cuadrón con rafting y ecocabañas. Te confirmamos itinerario y cupos en minutos.'
          : 'Pick 2, 3, or 4 days, or a half-day quad tour with rafting and eco-lodges. We confirm itinerary and seats in minutes.'
    },
    {
      num: '02',
      title: currentLang === 'es' ? '2. Reserva con anticipo seguro' : '2. Secure easy deposit booking',
      desc:
        currentLang === 'es'
          ? 'Asegura tus fechas con un anticipo cómodo mediante transferencia bancaria ecuatoriana (Pichincha, Guayaquil, Deuna) o tarjeta de crédito internacional.'
          : 'Lock in your dates with a modest deposit via Ecuadorian bank transfer (Pichincha, Guayaquil, Deuna) or secure credit card link.'
    },
    {
      num: '03',
      title: currentLang === 'es' ? '3. Pista de prueba & check-in' : '3. Induction track & check-in',
      desc:
        currentLang === 'es'
          ? 'Llegada a nuestra base en Tena. Te entregamos cascos homologados DOT higienizados, gafas anti-barro y realizamos 15 min de práctica en pista cerrada.'
          : 'Arrive at our Tena base camp. We outfit you with sanitized DOT helmets, goggles, and conduct a 15-min practice lap on a closed induction track.'
    },
    {
      num: '04',
      title: currentLang === 'es' ? '4. Expedición pura & regreso feliz' : '4. Pure expedition & memories',
      desc:
        currentLang === 'es'
          ? 'Salida en caravana con guía nativo certificado y barredora técnica. Cruces de agua, cascadas secretas, fotografía profesional y comida típica.'
          : 'Depart in convoy with certified native guides and sweep mechanic. River crossings, secret waterfalls, pro photos, and delicious typical meals.'
    }
  ];

  return (
    <section className="py-24 bg-carbon-950 border-t border-jungle-800 scroll-mt-24" id="como-funciona">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-black tracking-widest text-flame-500 uppercase font-display">
            {currentLang === 'es' ? 'LOGÍSTICA SENCILLA Y SIN SORPRESAS' : 'SIMPLE, SAFE & SEAMLESS LOGISTICS'}
          </span>
          <h2 className="mt-2 text-3xl sm:text-5xl font-black text-ivory-100 uppercase tracking-tight font-display">
            {currentLang === 'es'
              ? '¿Cómo funcionan nuestras expediciones?'
              : 'How Do Our Expeditions Work?'}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-ivory-400">
            {currentLang === 'es'
              ? 'Desde tu primer mensaje hasta tu regreso a casa, gestionamos cada detalle para que solo te concentres en disfrutar la Amazonía.'
              : 'From your first WhatsApp message to your journey home, we handle every detail so you can focus entirely on enjoying the Amazon.'}
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="bg-carbon-900 p-7 rounded-3xl border border-jungle-800 hover:border-flame-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black font-display mb-6 border ${
                    idx === 0
                      ? 'bg-flame-500/10 border-flame-500/30 text-flame-400'
                      : idx === 1
                      ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                      : idx === 2
                      ? 'bg-sky-500/10 border-sky-500/30 text-sky-400'
                      : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  }`}
                >
                  {step.num}
                </div>
                <h3 className="text-xl font-bold text-ivory-100 mb-2 font-display">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-ivory-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
