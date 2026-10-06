import React from 'react';
import { BASE_CAMP_INFO } from '../data/toursData';
import { MapPin, Clock, Phone, Navigation, Car, Shield } from 'lucide-react';

interface BaseOperationsMapProps {
  currentLang: 'es' | 'en';
}

export const BaseOperationsMap: React.FC<BaseOperationsMapProps> = ({ currentLang }) => {
  return (
    <section className="py-24 bg-carbon-900 border-t border-jungle-800" id="base-camp">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: HQ Info & Operations */}
          <div className="lg:col-span-5 bg-carbon-950 p-8 sm:p-10 rounded-3xl border border-jungle-800 flex flex-col justify-between shadow-2xl space-y-8">
            <div>
              <div className="inline-flex items-center space-x-2 text-flame-400 font-bold text-xs uppercase tracking-wider mb-2 font-display">
                <MapPin className="w-4 h-4" />
                <span>
                  {currentLang === 'es' ? 'BASE DE OPERACIONES EN TENA' : 'OPERATIONS HQ IN TENA'}
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black uppercase text-ivory-100 font-display leading-tight">
                {currentLang === 'es' ? 'Prepara tu llegada a la selva' : 'Prepare Your Jungle Arrival'}
              </h3>
              <p className="text-sm text-ivory-400 mt-3 leading-relaxed">
                {currentLang === 'es'
                  ? 'Instalaciones privadas con estacionamiento seguro para vehículos particulares, vestidores, duchas con agua caliente, cafetería de especialidad y lockers con llave.'
                  : 'Private facility with free secure parking for personal vehicles, changing rooms, hot showers, specialty coffee bar, and lockable gear storage.'}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-carbon-900 border border-jungle-800/80">
                <MapPin className="w-5 h-5 text-flame-500 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase text-ivory-100 font-display block">
                    {currentLang === 'es' ? 'Dirección Principal' : 'Main Headquarters'}
                  </span>
                  <span className="text-xs text-ivory-400">
                    Calle Serafín Gutiérrez y Rafaela Segala
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-carbon-900 border border-jungle-800/80">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase text-ivory-100 font-display block">
                    {currentLang === 'es' ? 'Horarios de Briefing' : 'Briefing Schedules'}
                  </span>
                  <span className="text-xs text-ivory-400">
                    {currentLang === 'es'
                      ? 'Turno Matutino: 08:30 AM · Turno Vespertino: 14:00 PM'
                      : 'Morning Run: 08:30 AM · Afternoon Run: 14:00 PM'}
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-carbon-900 border border-jungle-800/80">
                <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase text-ivory-100 font-display block">
                    {currentLang === 'es' ? 'Atención Rápida WhatsApp' : 'Quick WhatsApp Support'}
                  </span>
                  <span className="text-xs text-ivory-400 font-semibold text-emerald-300">
                    {BASE_CAMP_INFO.phone} (24/7 Español & English)
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={`https://wa.me/593990367565?text=${encodeURIComponent(
                  currentLang === 'es'
                    ? 'Hola Tena Travel! Deseo coordinar mi llegada a la base de operaciones en Tena.'
                    : 'Hello Tena Travel! I would like to coordinate arrival at your base camp in Tena.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-flame-600 to-flame-500 hover:from-flame-500 hover:to-flame-400 text-white font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-xl shadow-lg shadow-flame-600/30 transition font-display"
              >
                <Navigation className="w-4 h-4" />
                <span>
                  {currentLang === 'es' ? 'Abrir Ubicación & Chat Directo' : 'Open Location & Direct Chat'}
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Visual Map Plate */}
          <div className="lg:col-span-7 bg-carbon-950 rounded-3xl overflow-hidden border border-jungle-800 shadow-2xl relative min-h-[380px] flex flex-col justify-end">
            <img
              alt="Mapa de ubicación base Tena Travel Napo"
              className="absolute inset-0 w-full h-full object-cover"
              src={BASE_CAMP_INFO.mapImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-carbon-950 via-carbon-950/40 to-transparent" />

            {/* Overlay Pin HUD */}
            <div className="relative z-10 m-6 p-5 rounded-2xl bg-carbon-900/95 border border-jungle-800/90 backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-flame-500/10 border border-flame-500/30 flex items-center justify-center text-flame-400 shrink-0">
                  <Navigation className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold text-ivory-100 uppercase font-display block">
                    {currentLang === 'es' ? 'Punto de Encuentro Oficial' : 'Official Meeting Hub'}
                  </span>
                  <p className="text-xs text-ivory-400">
                    Tena Quad Hub · Coordenadas GPS provistas tras confirmar reserva
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <span className="px-3 py-1 rounded-lg bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-[11px] font-bold uppercase font-display flex items-center space-x-1">
                  <Car className="w-3.5 h-3.5 mr-1" />
                  <span>{currentLang === 'es' ? 'Parking Gratis' : 'Free Parking'}</span>
                </span>
                <a
                  href={BASE_CAMP_INFO.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 rounded-lg bg-carbon-800 hover:bg-carbon-700 text-ivory-200 text-[11px] font-bold uppercase font-display border border-jungle-700 transition"
                >
                  Google Maps ↗
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
