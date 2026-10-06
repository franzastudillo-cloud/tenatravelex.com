import React, { useState } from 'react';
import { FAQS } from '../data/toursData';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FaqSectionProps {
  currentLang: 'es' | 'en';
}

export const FaqSection: React.FC<FaqSectionProps> = ({ currentLang }) => {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="py-24 bg-carbon-950 border-t border-jungle-800" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs font-black tracking-widest text-flame-500 uppercase font-display flex items-center justify-center space-x-1.5">
            <HelpCircle className="w-3.5 h-3.5 text-flame-500" />
            <span>{currentLang === 'es' ? 'PREGUNTAS FRECUENTES' : 'FREQUENTLY ASKED QUESTIONS'}</span>
          </span>
          <h2 className="mt-2 text-3xl sm:text-5xl font-black text-ivory-100 uppercase tracking-tight font-display">
            {currentLang === 'es'
              ? 'Resolvemos tus dudas sobre Paquetes y Tours'
              : 'Answers Before Starting Your Expedition'}
          </h2>
          <p className="mt-3 text-base text-ivory-400">
            {currentLang === 'es'
              ? 'Todo lo que necesitas saber antes de encender el motor o internarte en la selva de Napo.'
              : 'Everything you need to know before revving the throttle or exploring the Napo rainforest.'}
          </p>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-carbon-900 rounded-2xl border border-jungle-800 overflow-hidden transition-all duration-200"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-carbon-850/60 transition cursor-pointer"
                >
                  <span className="font-bold text-base sm:text-lg text-ivory-100 font-display">
                    {currentLang === 'es' ? faq.question : faq.questionEn}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-flame-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? '-rotate-180' : 'rotate-0'
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-xs sm:text-sm text-ivory-300 leading-relaxed border-t border-jungle-800/60 pt-4 bg-carbon-950/40">
                    {currentLang === 'es' ? faq.answer : faq.answerEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
