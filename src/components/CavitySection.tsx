import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { ToothieMascot } from './ToothieMascot';
import { Sparkles, Shield, AlertCircle, CheckCircle2, ChevronRight } from 'lucide-react';

interface CavitySectionProps {
  onMarkComplete: (sectionId: string) => void;
}

export const CavitySection: React.FC<CavitySectionProps> = ({
  onMarkComplete,
}) => {
  const [selectedStage, setSelectedStage] = useState(0);

  const cavityStages = [
    {
      id: 0,
      title: 'Gigi Sehat & Kokoh',
      tag: 'Kondisi Sempurna 🛡️',
      color: 'border-emerald-300 bg-emerald-50',
      textColor: 'text-emerald-800',
      desc: 'Lapisan email putih, kuat, dan bersih. Tidak ada noda hitam, tidak ada rasa linu saat minum dingin.',
      icon: '😁',
    },
    {
      id: 1,
      title: 'Serangan Asam Kuman',
      tag: 'Bercak Putih / Cokelat ⚠️',
      color: 'border-amber-300 bg-amber-50',
      textColor: 'text-amber-800',
      desc: 'Sisa gula diubah bakteri menjadi asam. Asam ini mulai melarutkan mineral email sehingga muncul bercak keputihan atau kecokelatan.',
      icon: '😐',
    },
    {
      id: 2,
      title: 'Email Berlubang Kecil',
      tag: 'Mulai Terbentuk Lubang 🕳️',
      color: 'border-orange-300 bg-orange-50',
      textColor: 'text-orange-800',
      desc: 'Email mulai tembus berlubang kecil. Makanan sering tersangkut di celah ini, tapi anak mungkin belum merasa sakit.',
      icon: '😟',
    },
    {
      id: 3,
      title: 'Lubang Dalam Sampai Saraf',
      tag: 'Sakit & Nyut-nyutan 💥',
      color: 'border-rose-300 bg-rose-50',
      textColor: 'text-rose-800',
      desc: 'Lubang mencapai lapisan dentin dan pulpa (saraf gigi). Bakteri membuat saraf radang dan timbul rasa sakit berdenyut.',
      icon: '😭',
    },
  ];

  const shields = [
    {
      icon: '🪥',
      title: 'Perisai 1: Sikat Gigi 2x Sehari',
      desc: 'Pagi setelah sarapan dan malam sebelum tidur malam selama minimal 2 menit.',
    },
    {
      icon: '🛡️',
      title: 'Perisai 2: Pasta Gigi Fluoride',
      desc: 'Fluoride adalah mineral ajaib yang mengikat email gigi agar kebal terhadap serangan asam.',
    },
    {
      icon: '🍎',
      title: 'Perisai 3: Kurangi Makanan Manis',
      desc: 'Ganti permen dan boba dengan buah segar, air putih, atau susu berkalsium.',
    },
    {
      icon: '👨‍⚕️',
      title: 'Perisai 4: Periksa Tiap 6 Bulan',
      desc: 'Kunjungi dokter gigi secara rutin agar lubang kecil bisa segera ditambal sebelum sakit.',
    },
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> Bab 5: Cegah Karies Gigi
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-fredoka">
            Gigi Berlubang (Karies Gigi) 🛡️🦷
          </h1>
          <p className="text-sm sm:text-base text-rose-100 max-w-xl">
            Kenapa gigi yang tadinya keras bisa berlubang? Yuk pelajari rumusnya dan pasang 4 Perisai Superhero pelindung gigimu!
          </p>
        </div>

        <ToothieMascot
          expression="superhero"
          message="Gigi berlubang bisa dicegah dengan mudah! Jangan biarkan kuman asam melubangi email gigimu!"
          size="md"
        />
      </div>

      {/* The Scientific Kid Formula: Sugar + Plaque = Acid! */}
      <div className="bg-white rounded-3xl border-2 border-sky-100 p-6 sm:p-8 shadow-sm space-y-6">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-fredoka text-center">
          🔬 Rumus Rahasia Terjadinya Gigi Berlubang
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 py-4">
          {/* Element 1 */}
          <div className="flex flex-col items-center p-4 rounded-2xl bg-amber-50 border border-amber-200 text-center w-36 shadow-xs">
            <span className="text-4xl mb-1">🍭</span>
            <p className="text-xs font-bold uppercase text-amber-900">Sisa Gula</p>
            <p className="text-[11px] text-amber-700">Permen, soda, kue</p>
          </div>

          <span className="text-3xl font-extrabold text-slate-400 font-fredoka">+</span>

          {/* Element 2 */}
          <div className="flex flex-col items-center p-4 rounded-2xl bg-purple-50 border border-purple-200 text-center w-36 shadow-xs">
            <span className="text-4xl mb-1">🦠</span>
            <p className="text-xs font-bold uppercase text-purple-900">Kuman Plak</p>
            <p className="text-[11px] text-purple-700">Bakteri di mulut</p>
          </div>

          <span className="text-3xl font-extrabold text-slate-400 font-fredoka">=</span>

          {/* Element 3 */}
          <div className="flex flex-col items-center p-4 rounded-2xl bg-rose-50 border border-rose-200 text-center w-36 shadow-xs">
            <span className="text-4xl mb-1">🧪</span>
            <p className="text-xs font-bold uppercase text-rose-900">Zat Asam!</p>
            <p className="text-[11px] text-rose-700">Melarutkan email</p>
          </div>

          <span className="text-3xl font-extrabold text-slate-400 font-fredoka">➔</span>

          {/* Result */}
          <div className="flex flex-col items-center p-4 rounded-2xl bg-red-100 border-2 border-red-300 text-center w-40 shadow-sm animate-wiggle">
            <span className="text-4xl mb-1">🕳️</span>
            <p className="text-xs font-extrabold uppercase text-red-950">Gigi Berlubang</p>
            <p className="text-[11px] text-red-800">Karies gigi</p>
          </div>
        </div>

        <p className="text-center text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
          "Kalau gigi sering terkena makanan manis serta tidak disikat dengan baik, kuman akan terus menghasilkan asam yang perlahan mengikis email gigi kita!"
        </p>
      </div>

      {/* 4 Stages of Cavity Breakdown */}
      <div className="bg-white rounded-3xl border-2 border-sky-100 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 font-fredoka">
            Tahapan Kerusakan Gigi 📉
          </h3>
          <p className="text-sm text-slate-500">
            Klik tahapan di bawah untuk melihat bagaimana lubang berkembang dari luar ke dalam:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cavityStages.map((stage) => {
            const isSelected = stage.id === selectedStage;
            return (
              <button
                key={stage.id}
                onClick={() => {
                  sound.playPop();
                  setSelectedStage(stage.id);
                  onMarkComplete('cavity');
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                  isSelected
                    ? `${stage.color} shadow-md -translate-y-1`
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{stage.icon}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${stage.textColor} bg-white/70`}>
                    Tahap {stage.id + 1}
                  </span>
                </div>
                <h4 className="font-bold text-sm sm:text-base text-slate-900 font-fredoka">
                  {stage.title}
                </h4>
                <p className={`text-xs font-semibold mt-1 ${stage.textColor}`}>
                  {stage.tag}
                </p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {stage.desc}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4 Superhero Shields to Protect Teeth */}
      <div className="bg-gradient-to-br from-white via-sky-50 to-emerald-50 rounded-3xl border-2 border-emerald-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full mb-1">
            <Shield className="w-3.5 h-3.5" /> Benteng Pertahanan
          </div>
          <h3 className="text-2xl font-bold text-slate-900 font-fredoka">
            4 Perisai Superhero Pencegah Gigi Berlubang 🛡️
          </h3>
          <p className="text-sm text-slate-600">
            Lakukan 4 kebiasaan juara ini setiap hari agar gigimu bebas dari rasa sakit!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {shields.map((sh, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-5 border border-emerald-100 shadow-xs space-y-2 hover:-translate-y-1 transition-transform"
            >
              <span className="text-3xl block mb-2">{sh.icon}</span>
              <h4 className="font-bold text-sm text-slate-900 font-fredoka">
                {sh.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {sh.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
