import React, { useState } from 'react';
import { FAQ_LIST } from '../data/dentalData';
import { sound } from '../utils/audio';
import { ToothieMascot } from './ToothieMascot';
import { Sparkles, ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    sound.playPop();
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> Tanya Jawab Anak
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-fredoka">
            Tanya Toothie (FAQ) ❓🦷
          </h1>
          <p className="text-sm sm:text-base text-sky-100 max-w-xl">
            Punya pertanyaan seputar gigi yang bikin kamu penasaran? Yuk temukan jawaban seru dan mudah dipahami di sini!
          </p>
        </div>

        <ToothieMascot
          expression="thinking"
          message="Klik pertanyaan di bawah ini untuk melihat jawabannya ya!"
          size="md"
        />
      </div>

      {/* Accordion List */}
      <div className="bg-white rounded-3xl border-2 border-sky-100 p-6 sm:p-8 shadow-sm space-y-3">
        {FAQ_LIST.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? 'border-cyan-400 bg-sky-50/50 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-sky-300'
              }`}
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 text-lg flex items-center justify-center shrink-0">
                    🦷
                  </span>
                  <div>
                    <span className="text-[11px] font-bold text-cyan-700 uppercase tracking-wide">
                      {faq.category}
                    </span>
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 font-fredoka">
                      {faq.question}
                    </h3>
                  </div>
                </div>

                <div
                  className={`w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 transition-transform ${
                    isOpen ? 'rotate-180 bg-cyan-500 text-white' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 border-t border-sky-100 text-slate-700 text-sm sm:text-base leading-relaxed pl-16">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
