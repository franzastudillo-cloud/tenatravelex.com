import React from 'react';
import { Gauge, Compass, ShieldCheck, HeartHandshake, Shield, Sparkles } from 'lucide-react';

interface PillarsSectionProps {
  currentLang: 'es' | 'en';
}

export const PillarsSection: React.FC<PillarsSectionProps> = ({ currentLang }) => {
  const pillars = [
    {
      title: currentLang === 'es' ? 'Flota 100% Automática 4x4' : '100% Automatic 4x4 Fleet',
      tag: 'CAN-AM 570CC • HONDA 420CC',
      desc:
        currentLang === 'es'
          ? 'Solo acelerar y frenar con gatillo suave. Modelos CAN-AM Outlander y Honda con transmisión automática. Apto para cualquier persona sin experiencia previa.'
          : 'Just smooth thumb throttle and braking. CAN-AM Outlander and Honda models with automatic transmission. Ideal for riders with zero previous experience.',
      icon: Gauge,
      color: 'text-flame-400 bg-flame-500/10 border-flame-500/30'
    },
    {
      title: currentLang === 'es' ? 'Senderos & Pozas Secretas' : 'Private Trails & Secret Pools',
      tag: currentLang === 'es' ? '100% TERRITORIO AUTÓCTONO' : '100% INDIGENOUS TERRITORY',
      desc:
        currentLang === 'es'
          ? 'Acceso exclusivo mediante convenios con comunidades Kichwa locales. Rutas libres de turistas masivos con pozas de agua turquesa solo accesibles sobre ruedas.'
          : 'Exclusive access granted via agreements with local Kichwa communities. Mud-free highway bypasses directly into pristine jungle and turquoise lagoons.',
      icon: Compass,
      color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
    },
    {
      title: currentLang === 'es' ? 'Pista de Práctica & Cascos DOT' : 'Practice Track & DOT Helmets',
      tag: currentLang === 'es' ? 'SEGURIDAD PROFESIONAL' : 'PROFESSIONAL SAFETY GEAR',
      desc:
        currentLang === 'es'
          ? 'Circuito de inducción de 15 minutos antes de ingresar a la selva. Equipamiento FOX Racing: cascos integrales certificados, gafas anti-barro y pecheras.'
          : '15-minute induction circuit before entering the wild jungle. FOX Racing gear: certified full-face helmets, anti-mud goggles, and chest protectors.',
      icon: ShieldCheck,
      color: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    },
    {
      title: currentLang === 'es' ? 'Guías Nativos Bilingües WFR' : 'Bilingual Native Guides WFR',
      tag: 'ESPAÑOL & ENGLISH NATIVE',
      desc:
        currentLang === 'es'
          ? 'Líderes de expedición certificados en Primeros Auxilios en Áreas Agrestes (WFR), mecánicos de campo y conocedores profundos de la etnobotánica de Napo.'
          : 'Expedition leaders certified in Wilderness First Responder (WFR), field mechanics, and masters of ancestral Amazonian ethnobotany.',
      icon: HeartHandshake,
      color: 'text-sky-400 bg-sky-500/10 border-sky-500/30'
    }
  ];

  return (
    <section className="py-24 bg-carbon-900 border-t border-jungle-800" id="ventajas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-black tracking-widest text-flame-500 uppercase font-display">
              {currentLang === 'es' ? 'ALTO RENDIMIENTO EN LA JUNGLA' : 'HIGH PERFORMANCE IN THE RAINFOREST'}
            </span>
            <h2 className="mt-2 text-3xl sm:text-5xl font-black text-ivory-100 uppercase tracking-tight font-display">
              {currentLang === 'es'
                ? 'Estándar de Expedición sin Concesiones'
                : 'Uncompromised Expedition Standards'}
            </h2>
          </div>
          <p className="text-base text-ivory-400 max-w-md">
            {currentLang === 'es'
              ? 'Diseñado para principiantes intrépidos y pilotos experimentados. Combinamos tecnología de alta gama con el conocimiento ancestral de nuestros guías nativos.'
              : 'Built for daring beginners and experienced riders alike. Combining high-end off-road tech with ancestral wisdom from our local guides.'}
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-7 rounded-3xl bg-carbon-950 border border-jungle-800 hover:border-flame-500/60 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div
                    className={`w-12 h-12 rounded-2xl border flex items-center justify-center mb-5 ${item.color}`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-ivory-100 font-display">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-ivory-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-jungle-800/80">
                  <span className="text-[10px] font-black uppercase tracking-wider text-flame-400 font-display">
                    {item.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
