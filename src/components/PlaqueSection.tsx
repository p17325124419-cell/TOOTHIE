import React, { useState } from 'react';
import { sound } from '../utils/audio';
import { ToothieMascot } from './ToothieMascot';
import { Sparkles, ShieldAlert, ArrowRight, RotateCcw, CheckCircle2 } from 'lucide-react';

const PLAQUE_MONSTER_IMG = '/src/assets/images/cute_plaque_monsters_1790412312574.jpg';

interface PlaqueSectionProps {
  onUnlockBadge: (badgeId: string) => void;
  onMarkComplete: (sectionId: string) => void;
}

export const PlaqueSection: React.FC<PlaqueSectionProps> = ({
  onUnlockBadge,
  onMarkComplete,
}) => {
  const [activeStep, setActiveStep] = useState(0);

  // Mini scrubbing activity spots (5 plaque spots)
  const [plaqueSpots, setPlaqueSpots] = useState([
    { id: 1, x: 28, y: 38, cleaned: false, label: 'Sisa Donat' },
    { id: 2, x: 55, y: 32, cleaned: false, label: 'Gula Boba' },
    { id: 3, x: 38, y: 55, cleaned: false, label: 'Plak Lengket' },
    { id: 4, x: 68, y: 52, cleaned: false, label: 'Kuman Asam' },
    { id: 5, x: 48, y: 72, cleaned: false, label: 'Sisa Permen' },
  ]);

  const cleanedCount = plaqueSpots.filter((s) => s.cleaned).length;
  const isAllCleaned = cleanedCount === plaqueSpots.length;

  const handleCleanSpot = (id: number) => {
    sound.playScrub();
    const updated = plaqueSpots.map((spot) =>
      spot.id === id ? { ...spot, cleaned: true } : spot
    );
    setPlaqueSpots(updated);

    const nowCleaned = updated.filter((s) => s.cleaned).length;
    if (nowCleaned === updated.length) {
      sound.playSparkle();
      onUnlockBadge('musuh_plak');
      onMarkComplete('plaque');
    }
  };

  const handleResetScrub = () => {
    sound.playPop();
    setPlaqueSpots(
      plaqueSpots.map((s) => ({ ...s, cleaned: false }))
    );
  };

  const progressionStages = [
    {
      stage: 1,
      title: 'Gigi Bersih & Mengkilap',
      tag: 'Kondisi Ideal ✨',
      desc: 'Setelah disikat bersih, permukaan gigi terasa licin dan terlindungi lapisan saliva alami.',
      badgeColor: 'bg-emerald-100 text-emerald-800',
      icon: '✨',
    },
    {
      stage: 2,
      title: 'Sisa Makanan Menempel',
      tag: '1-4 Jam Setelah Makan ⏳',
      desc: 'Sisa karbohidrat, gula, dan remah makanan mulai menempel di lekukan serta sela-sela gigi.',
      badgeColor: 'bg-sky-100 text-sky-800',
      icon: '🍞',
    },
    {
      stage: 3,
      title: 'Terbentuk Plak Lengket',
      tag: '12-24 Jam Tanpa Sikat ⚠️',
      desc: 'Bakteri berkembang biak dan membentuk lapisan lengket bernama Plak. Bakteri ini mulai memproduksi zat asam.',
      badgeColor: 'bg-amber-100 text-amber-800',
      icon: '🦠',
    },
    {
      stage: 4,
      title: 'Mengeras Jadi Karang Gigi',
      tag: 'Beberapa Hari / Minggu 🛑',
      desc: 'Plak yang tidak disikat menyerap kalsium dari liur dan mengeras menjadi karang gigi (tartar). Karang ini hanya bisa dibersihkan oleh dokter gigi!',
      badgeColor: 'bg-rose-100 text-rose-800',
      icon: '🪨',
    },
  ];

  return (
    <div className="space-y-10 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-sky-600 rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> Bab 4: Rahasia Kuman Plak
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-fredoka">
            Plak & Karang Gigi 🦠🪨
          </h1>
          <p className="text-sm sm:text-base text-purple-100 max-w-xl">
            Yuk berkenalan dengan Kuman Plaky! Plak itu seperti selimut lengket berisi jutaan kuman tak terlihat. Jangan biarkan dia mengeras jadi batu karang gigi ya!
          </p>
        </div>

        <ToothieMascot
          expression="superhero"
          message="Gunakan sikat gigimu untuk menggosok habis kuman plak sebelum dia jadi karang gigi keras!"
          size="md"
        />
      </div>

      {/* Visual Progression: 4 Stages */}
      <div className="bg-white rounded-3xl border-2 border-sky-100 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-2xl font-bold text-slate-900 font-fredoka">
              Perjalanan Terbentuknya Karang Gigi 📈
            </h3>
            <p className="text-sm text-slate-500">
              Lihat perubahan dari gigi bersih hingga menjadi karang gigi jika malas sikat gigi!
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-purple-100 text-purple-800 rounded-full">
            Klik Tiap Tahap
          </span>
        </div>

        {/* 4 Stage Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {progressionStages.map((stg, idx) => {
            const isActive = activeStep === idx;
            return (
              <button
                key={stg.stage}
                onClick={() => {
                  sound.playPop();
                  setActiveStep(idx);
                }}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                  isActive
                    ? 'border-purple-500 bg-purple-50/70 shadow-md -translate-y-1'
                    : 'border-slate-200 bg-white hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">{stg.icon}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${stg.badgeColor}`}>
                    Tahap {stg.stage}
                  </span>
                </div>
                <h4 className="font-bold text-sm sm:text-base text-slate-900 font-fredoka">
                  {stg.title}
                </h4>
                <p className="text-xs text-purple-700 font-semibold mt-1">
                  {stg.tag}
                </p>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  {stg.desc}
                </p>
              </button>
            );
          })}
        </div>

        {/* Highlight Quote Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-start gap-3">
            <span className="text-2xl">🧼</span>
            <div>
              <h5 className="font-bold text-xs uppercase text-sky-900">
                Pesan Utama #1
              </h5>
              <p className="text-xs sm:text-sm text-sky-800 font-medium mt-0.5">
                <strong>Plak</strong> adalah lapisan lengket berisi bakteri yang masih bisa dibersihkan sendiri dengan sikat gigi teratur.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3">
            <span className="text-2xl">👨‍⚕️</span>
            <div>
              <h5 className="font-bold text-xs uppercase text-rose-900">
                Pesan Utama #2
              </h5>
              <p className="text-xs sm:text-sm text-rose-800 font-medium mt-0.5">
                <strong>Karang gigi</strong> sudah mengeras seperti batu karang dan <em>hanya</em> bisa dibersihkan oleh dokter gigi dengan alat scaling yang aman.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Activity: Gosok Plak Virtual */}
      <div className="bg-gradient-to-br from-white via-purple-50 to-indigo-50 rounded-3xl border-2 border-purple-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-800 text-xs font-bold rounded-full mb-1">
              <ShieldAlert className="w-3.5 h-3.5" /> Aktivitas Bersihkan Gigi
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-fredoka">
              Aktivitas Interaktif: Gosok Bersih Plak Kuman! 🪥
            </h3>
            <p className="text-sm text-slate-600">
              Ayo klik atau gosok bercak plak kuning di permukaan gigi sampai giginya bersih mengkilap!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetScrub}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Kembalikan Plak</span>
            </button>
            <span className="text-xs font-bold px-3 py-1 bg-purple-200 text-purple-900 rounded-lg">
              {cleanedCount} / {plaqueSpots.length} Bersih
            </span>
          </div>
        </div>

        {/* 2-Column: Left Cartoon Germs, Right Interactive Scrubbing Tooth */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: 3D Cute Germs Character */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-purple-200 bg-purple-100 p-2 shadow-inner">
              <img
                src={PLAQUE_MONSTER_IMG}
                alt="Karakter kuman plak 3D lucu"
                className="w-full h-auto rounded-2xl object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-sm text-center">
                <p className="font-bold text-xs uppercase text-purple-800 tracking-wider">
                  Kuman Plaky & Geng Asam
                </p>
                <p className="text-xs text-slate-600">
                  "Kami lucu kan? Tapi kalau kamu rajin sikat gigi, kami tidak bisa bikin lubang!"
                </p>
              </div>
            </div>
          </div>

          {/* Right: Interactive Tooth Scrub Canvas */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-3xl bg-gradient-to-b from-sky-100 via-white to-sky-50 border-4 border-sky-200 shadow-md p-6 flex flex-col items-center justify-center overflow-hidden">
              {/* Big Stylized 3D Tooth Base */}
              <div
                className={`relative w-48 h-56 rounded-t-3xl rounded-b-2xl transition-all duration-500 shadow-lg flex flex-col items-center justify-center border-4 border-white ${
                  isAllCleaned
                    ? 'bg-gradient-to-b from-white via-sky-50 to-cyan-100 ring-8 ring-cyan-200/60 scale-103'
                    : 'bg-gradient-to-b from-amber-50/90 via-yellow-100/80 to-amber-100/90'
                }`}
              >
                {/* Tooth Cute Face */}
                <div className="flex flex-col items-center space-y-2 select-none pointer-events-none">
                  <div className="flex items-center gap-8">
                    {/* Left Eye */}
                    <div className="w-5 h-5 rounded-full bg-slate-800 relative">
                      <span className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                    {/* Right Eye */}
                    <div className="w-5 h-5 rounded-full bg-slate-800 relative">
                      <span className="absolute top-1 left-1 w-1.5 h-1.5 bg-white rounded-full" />
                    </div>
                  </div>
                  {/* Rosy Cheeks */}
                  <div className="flex items-center gap-12">
                    <span className="w-4 h-2 rounded-full bg-rose-300 opacity-60" />
                    <span className="w-4 h-2 rounded-full bg-rose-300 opacity-60" />
                  </div>
                  {/* Mouth Expression */}
                  <div
                    className={`w-8 h-4 rounded-b-full bg-rose-500 border-2 border-slate-800 transition-all ${
                      isAllCleaned ? 'scale-125' : 'scale-90 rotate-180'
                    }`}
                  />
                </div>

                {/* Plaque Spots overlaid on the tooth */}
                {plaqueSpots.map((spot) => (
                  <button
                    key={spot.id}
                    onClick={() => handleCleanSpot(spot.id)}
                    style={{
                      top: `${spot.y}%`,
                      left: `${spot.x}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 px-2.5 py-1.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
                      spot.cleaned
                        ? 'opacity-0 scale-50 pointer-events-none'
                        : 'bg-amber-400 hover:bg-amber-300 text-amber-950 shadow-md animate-pulse border border-amber-600'
                    }`}
                  >
                    <span>🧽 {spot.label}</span>
                  </button>
                ))}

                {/* Sparkles when fully cleaned */}
                {isAllCleaned && (
                  <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <span className="text-4xl animate-bounce">✨</span>
                  </div>
                )}
              </div>

              {/* Status prompt */}
              <div className="mt-4 text-center">
                {isAllCleaned ? (
                  <div className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-4 py-2 rounded-2xl font-bold text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Hore! Giginya kinclong bersih! Lencana Musuh Plak Terbuka!</span>
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 font-medium">
                    👉 Klik tulisan kuning di atas gigi untuk menggosok plak sampai bersih!
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
