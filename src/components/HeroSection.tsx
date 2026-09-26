import React, { useState } from 'react';
import { NavSection } from '../types';
import { sound } from '../utils/audio';
import { ToothieMascot } from './ToothieMascot';
import { Sparkles, ArrowRight, Play, CheckCircle2, Star, ShieldCheck, Heart } from 'lucide-react';

interface HeroSectionProps {
  onNavigate: (section: NavSection) => void;
  completedSections: Set<string>;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  completedSections,
}) => {
  // Simple daily brushing streak state stored in localStorage
  const [morningBrushed, setMorningBrushed] = useState(() => {
    return localStorage.getItem('toothie_brush_morning') === 'true';
  });
  const [nightBrushed, setNightBrushed] = useState(() => {
    return localStorage.getItem('toothie_brush_night') === 'true';
  });

  const toggleMorning = () => {
    sound.playPop();
    const next = !morningBrushed;
    setMorningBrushed(next);
    localStorage.setItem('toothie_brush_morning', String(next));
    if (next) sound.playCorrect();
  };

  const toggleNight = () => {
    sound.playPop();
    const next = !nightBrushed;
    setNightBrushed(next);
    localStorage.setItem('toothie_brush_night', String(next));
    if (next) sound.playCorrect();
  };

  const menuCards: {
    id: NavSection;
    title: string;
    desc: string;
    icon: string;
    color: string;
    badgeText: string;
  }[] = [
    {
      id: 'anatomy',
      title: 'Kenali Gigi',
      desc: 'Pelajari 4 jenis gigi ajaib dan lapisan email pelindung.',
      icon: '🦷',
      color: 'from-sky-400 to-blue-500',
      badgeText: 'Anatomi 3D',
    },
    {
      id: 'brushing',
      title: 'Cara Menyikat Gigi',
      desc: '7 langkah mudah dan simulasi sikat gigi 2 menit seru!',
      icon: '🪥',
      color: 'from-cyan-400 to-teal-500',
      badgeText: 'Simulasi Timer',
    },
    {
      id: 'food',
      title: 'Makanan & Minuman',
      desc: 'Yuk bedakan makanan sahabat gigi dan yang perlu dibatasi.',
      icon: '🍭',
      color: 'from-amber-400 to-orange-500',
      badgeText: 'Pilih & Sortir',
    },
    {
      id: 'plaque',
      title: 'Plak & Karang Gigi',
      desc: 'Kenali si kuman nakal dan gosok plak sampai kinclong.',
      icon: '🦠',
      color: 'from-purple-400 to-indigo-500',
      badgeText: 'Gosok Plak',
    },
    {
      id: 'cavity',
      title: 'Gigi Berlubang',
      desc: 'Mengapa gigi bisa bolong? Yuk lindungi dengan 4 perisai!',
      icon: '🛡️',
      color: 'from-rose-400 to-pink-500',
      badgeText: 'Cegah Karies',
    },
    {
      id: 'games',
      title: 'Quiz & Games',
      desc: 'Basmi kuman gigi dan kumpulkan bintang pahlawan gigi!',
      icon: '🎮',
      color: 'from-emerald-400 to-green-600',
      badgeText: 'Mini Game & Kuis',
    },
  ];

  const journeySteps: { id: NavSection; label: string; icon: string }[] = [
    { id: 'anatomy', label: '1. Anatomi', icon: '🦷' },
    { id: 'brushing', label: '2. Sikat Gigi', icon: '🪥' },
    { id: 'food', label: '3. Makanan', icon: '🍎' },
    { id: 'plaque', label: '4. Plak Kuman', icon: '🦠' },
    { id: 'cavity', label: '5. Gigi Bolong', icon: '🛡️' },
    { id: 'games', label: '6. Main Game', icon: '🎮' },
    { id: 'posttest', label: '7. Sertifikat', icon: '👑' },
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Banner Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-100 via-white to-cyan-50 border-2 border-sky-100 p-6 sm:p-10 lg:p-12 shadow-sm">
        {/* Floating Bubble/Sparkle Ornaments */}
        <div className="absolute top-6 left-8 text-2xl animate-float opacity-60 pointer-events-none">
          🫧
        </div>
        <div className="absolute top-1/3 right-12 text-3xl animate-float-delayed opacity-50 pointer-events-none">
          ✨
        </div>
        <div className="absolute bottom-6 left-1/3 text-2xl animate-float opacity-60 pointer-events-none">
          🫧
        </div>
        <div className="absolute bottom-10 right-1/4 text-2xl animate-sparkle opacity-40 pointer-events-none">
          ⭐
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Text Zone */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-100/80 border border-cyan-200 text-cyan-800 text-xs sm:text-sm font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-cyan-600 animate-spin" />
              <span>Petualangan Edukasi Gigi Sehat</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-fredoka leading-tight">
              Yuk, Kenali <span className="text-cyan-600">Gigi Sehat!</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Belajar menjaga kesehatan gigi jadi lebih seru dan menyenangkan!
              Bersama <strong className="text-cyan-700">Toothie</strong> si gigi pahlawan, ayo jelajahi dunia gigi, kalahkan kuman plak, dan raih senyum cemerlang!
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => {
                  sound.playPop();
                  onNavigate('anatomy');
                }}
                className="btn-3d-cyan text-white px-7 py-3.5 rounded-2xl font-bold text-base flex items-center gap-2 cursor-pointer shadow-md"
              >
                <span>Mulai Belajar</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={() => {
                  sound.playPop();
                  onNavigate('games');
                }}
                className="btn-3d-amber text-slate-900 px-6 py-3.5 rounded-2xl font-bold text-base flex items-center gap-2 cursor-pointer shadow-md"
              >
                <Play className="w-5 h-5 fill-slate-900" />
                <span>Main & Belajar</span>
              </button>
            </div>

            {/* Micro Tagline */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-3 text-xs sm:text-sm text-slate-500 font-medium">
              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                <CheckCircle2 className="w-4 h-4" /> 100% Ramah Anak
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-sky-600 font-semibold">
                <Star className="w-4 h-4" /> Animasi 3D & Audio Interaktif
              </span>
            </div>
          </div>

          {/* Right Mascot Zone */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative">
              <ToothieMascot
                expression="superhero"
                message="Halo teman pintar! Yuk bantu aku menjaga gigi tetap putih, kuat, dan bebas kuman!"
                size="lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Visual Learning Journey Roadmap */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-sky-100 shadow-xs">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 font-fredoka flex items-center gap-2">
              <span>🗺️ Peta Petualangan Gigi Sehat</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Kunjungi setiap pos petualangan untuk membuka lencana pahlawan!
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-sky-50 text-sky-700 rounded-lg border border-sky-100">
            {completedSections.size} dari {journeySteps.length} Selesai
          </span>
        </div>

        {/* Roadmap Steps */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {journeySteps.map((step) => {
            const isDone = completedSections.has(step.id);
            return (
              <button
                key={step.id}
                onClick={() => {
                  sound.playPop();
                  onNavigate(step.id);
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all text-center group cursor-pointer ${
                  isDone
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-900 shadow-xs'
                    : 'bg-slate-50 hover:bg-sky-50 border-slate-200 hover:border-sky-300 text-slate-700'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-2 transition-transform group-hover:scale-110 shadow-xs ${
                    isDone ? 'bg-emerald-200' : 'bg-white'
                  }`}
                >
                  {step.icon}
                </div>
                <span className="text-xs font-bold leading-tight line-clamp-1">
                  {step.label}
                </span>
                <span className="text-[10px] mt-1 font-medium">
                  {isDone ? (
                    <span className="text-emerald-600 flex items-center gap-0.5">
                      <CheckCircle2 className="w-3 h-3" /> Selesai
                    </span>
                  ) : (
                    <span className="text-slate-400">Klik Belajar</span>
                  )}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 3D Menu Cards Grid */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-fredoka">
            Pilihan Menu Pembelajaran
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Klik salah satu kartu di bawah untuk memulai materi favoritmu!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuCards.map((card) => (
            <div
              key={card.id}
              onClick={() => {
                sound.playPop();
                onNavigate(card.id);
              }}
              className="card-soft-3d rounded-3xl p-6 hover:-translate-y-1.5 transition-all duration-200 cursor-pointer group relative overflow-hidden flex flex-col justify-between"
            >
              {/* Header inside card */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-50 to-cyan-100 flex items-center justify-center text-3xl shadow-xs group-hover:rotate-6 transition-transform">
                    {card.icon}
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-sky-100/70 text-cyan-800">
                    {card.badgeText}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-fredoka group-hover:text-cyan-600 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  {card.desc}
                </p>
              </div>

              {/* Bottom Card Affordance */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-cyan-600">
                <span>Pelajari Sekarang</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Daily Brushing Tracker & Habits Banner */}
      <section className="bg-gradient-to-r from-teal-500 via-cyan-600 to-sky-600 text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold bg-white/20 backdrop-blur-xs px-3 py-1 rounded-full">
              <ShieldCheck className="w-4 h-4" /> Kebiasaan Baik Hari Ini
            </div>
            <h3 className="text-2xl font-bold font-fredoka">
              Sudahkah Kamu Sikat Gigi Hari Ini? 🪥
            </h3>
            <p className="text-sm text-cyan-100 leading-relaxed">
              Ingat rumus 2x sehari: <strong>Setelah Sarapan</strong> pagi agar gigimu bersih saat sekolah, dan <strong>Sebelum Tidur</strong> malam agar kuman tidak pesta!
            </p>
          </div>

          <div className="md:col-span-5 flex flex-col sm:flex-row gap-3 justify-end">
            <button
              onClick={toggleMorning}
              className={`p-3.5 rounded-2xl flex items-center gap-3 transition-all cursor-pointer font-bold text-sm ${
                morningBrushed
                  ? 'bg-emerald-400 text-emerald-950 shadow-md scale-102'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <span className="text-xl">☀️</span>
              <div className="text-left">
                <p className="text-xs uppercase opacity-80">Pagi Hari</p>
                <p>{morningBrushed ? 'Sudah Sikat! ✨' : 'Belum Sikat'}</p>
              </div>
            </button>

            <button
              onClick={toggleNight}
              className={`p-3.5 rounded-2xl flex items-center gap-3 transition-all cursor-pointer font-bold text-sm ${
                nightBrushed
                  ? 'bg-emerald-400 text-emerald-950 shadow-md scale-102'
                  : 'bg-white/20 hover:bg-white/30 text-white'
              }`}
            >
              <span className="text-xl">🌙</span>
              <div className="text-left">
                <p className="text-xs uppercase opacity-80">Malam Hari</p>
                <p>{nightBrushed ? 'Sudah Sikat! ✨' : 'Belum Sikat'}</p>
              </div>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
