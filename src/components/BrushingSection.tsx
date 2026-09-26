import React, { useState, useEffect } from 'react';
import { BRUSHING_STEPS } from '../data/dentalData';
import { sound } from '../utils/audio';
import { ToothieMascot } from './ToothieMascot';
import { Play, Pause, RotateCcw, ArrowLeft, ArrowRight, CheckCircle2, Clock, Sparkles } from 'lucide-react';

const BRUSHING_IMG = '/src/assets/images/toothie_brushing_fun_1790412299398.jpg';

interface BrushingSectionProps {
  onUnlockBadge: (badgeId: string) => void;
  onMarkComplete: (sectionId: string) => void;
}

export const BrushingSection: React.FC<BrushingSectionProps> = ({
  onUnlockBadge,
  onMarkComplete,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  // 2-Minute Brushing Timer State (120 seconds)
  // For easy testing and kids delight, allow full 120s or speed demo (30s)
  const [timerSeconds, setTimerSeconds] = useState(120);
  const [isRunning, setIsRunning] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            sound.playSparkle();
            onUnlockBadge('jago_sikat');
            onMarkComplete('brushing');
            return 0;
          }
          if (prev % 5 === 0) {
            sound.playScrub();
          }
          return prev - 1;
        });
      }, isDemoMode ? 250 : 1000); // 4x speed in demo mode for quick preview
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timerSeconds, isDemoMode, onUnlockBadge, onMarkComplete]);

  const handleNextStep = () => {
    sound.playPop();
    if (currentStep < BRUSHING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    sound.playPop();
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleTimer = () => {
    sound.playPop();
    if (timerSeconds === 0) {
      setTimerSeconds(120);
    }
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    sound.playPop();
    setIsRunning(false);
    setTimerSeconds(120);
  };

  // Determine current quadrant for 120s (4 zones x 30s)
  const getQuadrantInfo = () => {
    const elapsed = 120 - timerSeconds;
    if (elapsed < 30) {
      return {
        zone: 'Kanan Atas & Luar',
        instruction: 'Sikat melingkar gigi atas bagian kanan!',
        icon: '↗️',
      };
    } else if (elapsed < 60) {
      return {
        zone: 'Kiri Atas & Luar',
        instruction: 'Pindah ke gigi atas bagian kiri!',
        icon: '↖️',
      };
    } else if (elapsed < 90) {
      return {
        zone: 'Gigi Bawah (Luar & Dalam)',
        instruction: 'Sikat bagian bawah dan cungkil lembut dari gusi ke atas!',
        icon: '⬇️',
      };
    } else {
      return {
        zone: 'Permukaan Kunyah & Lidah',
        instruction: 'Maju mundur di geraham lalu sapu lidah perlahan!',
        icon: '👅',
      };
    }
  };

  const step = BRUSHING_STEPS[currentStep];
  const quadrant = getQuadrantInfo();
  const progressPercent = Math.round(((120 - timerSeconds) / 120) * 100);

  return (
    <div className="space-y-10 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-500 via-teal-500 to-sky-600 rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> Bab 2: Kunci Gigi Bersih
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-fredoka">
            Cara Menyikat Gigi yang Benar 🪥
          </h1>
          <p className="text-sm sm:text-base text-cyan-50 max-w-xl">
            Sikat gigi bukan asal gosok cepat-cepat lho! Ikuti 7 langkah ajaib ini agar seluruh kuman kabur terbawa busa pasta gigi.
          </p>
        </div>

        <ToothieMascot
          expression="brushing"
          message="Sikat gigi 2 kali sehari: pagi setelah sarapan & malam sebelum tidur ya!"
          size="md"
        />
      </div>

      {/* Main Step-by-Step Card Carousel */}
      <div className="bg-white rounded-3xl border-2 border-sky-100 shadow-sm p-6 sm:p-8 space-y-6">
        {/* Step Indicators Bar */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
          {BRUSHING_STEPS.map((s, idx) => (
            <button
              key={s.step}
              onClick={() => {
                sound.playPop();
                setCurrentStep(idx);
              }}
              className={`flex items-center gap-1.5 py-1.5 px-3 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                idx === currentStep
                  ? 'bg-cyan-600 text-white shadow-xs scale-105'
                  : idx < currentStep
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              <span>{s.icon}</span>
              <span>Langkah {s.step}</span>
            </button>
          ))}
        </div>

        {/* Step Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
          {/* Left: 3D Illustration */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-2 border-sky-100 bg-sky-50 p-2 shadow-inner">
              <img
                src={BRUSHING_IMG}
                alt="Toothie menggosok gigi dengan busa berlimpah"
                className="w-full h-auto rounded-2xl object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm p-3 rounded-2xl shadow-sm border border-sky-100 flex items-center gap-3">
                <span className="text-3xl">{step.icon}</span>
                <div>
                  <p className="text-xs uppercase tracking-wider font-bold text-cyan-800">
                    Langkah {step.step} dari {BRUSHING_STEPS.length}
                  </p>
                  <p className="font-bold text-sm text-slate-800 font-fredoka">
                    {step.title}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Step Explanation & Tips */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 text-xs font-bold mb-2">
                {step.shortDesc}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-fredoka">
                {step.title}
              </h3>
              <p className="text-slate-700 text-base sm:text-lg mt-3 leading-relaxed">
                {step.detail}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm font-medium">
              {step.tip}
            </div>

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 0}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                  currentStep === 0
                    ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              <button
                onClick={handleNextStep}
                disabled={currentStep === BRUSHING_STEPS.length - 1}
                className={`btn-3d-cyan text-white flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-sm cursor-pointer ${
                  currentStep === BRUSHING_STEPS.length - 1 ? 'opacity-50 pointer-events-none' : ''
                }`}
              >
                <span>Berikutnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive 2-Minute Brushing Simulator */}
      <div className="bg-gradient-to-br from-white via-sky-50 to-cyan-50 rounded-3xl border-2 border-cyan-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-cyan-100 text-cyan-800 text-xs font-bold rounded-full mb-1">
              <Clock className="w-3.5 h-3.5" /> Latihan Interaktif
            </div>
            <h3 className="text-2xl font-bold text-slate-900 font-fredoka">
              Simulasi Sikat Gigi 2 Menit (120 Detik) ⏱️
            </h3>
            <p className="text-sm text-slate-600">
              Nyalakan timer saat kamu sikat gigi betulan di kamar mandi untuk membuka Lencana <strong>"Jago Sikat Gigi"</strong>!
            </p>
          </div>

          {/* Demo fast-forward toggle for evaluation */}
          <button
            onClick={() => setIsDemoMode(!isDemoMode)}
            className="text-xs px-3 py-1 bg-white border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 cursor-pointer"
          >
            {isDemoMode ? '⚡ Mode Cepat Aktif' : '⏳ Mode Normal'}
          </button>
        </div>

        {/* Timer Box & Quadrant Guide */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left: Big Circular Timer Display */}
          <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-white rounded-3xl shadow-xs border border-sky-100">
            <div className="relative w-40 h-40 flex items-center justify-center">
              {/* SVG Ring Progress */}
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="68"
                  className="stroke-slate-100"
                  strokeWidth="10"
                  fill="transparent"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="68"
                  className="stroke-cyan-500 transition-all duration-300"
                  strokeWidth="10"
                  strokeDasharray="427"
                  strokeDashoffset={427 - (427 * progressPercent) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-slate-900 font-fredoka tabular-nums">
                  {Math.floor(timerSeconds / 60)}:
                  {String(timerSeconds % 60).padStart(2, '0')}
                </span>
                <span className="text-xs font-semibold text-cyan-700 mt-0.5">
                  {timerSeconds === 0 ? 'Selesai! 🎉' : `${progressPercent}%`}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={toggleTimer}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer shadow-xs ${
                  isRunning
                    ? 'btn-3d-amber text-slate-950'
                    : 'btn-3d-cyan text-white'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4" /> <span>Jeda</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />{' '}
                    <span>{timerSeconds === 0 ? 'Ulangi' : 'Mulai Sikat'}</span>
                  </>
                )}
              </button>

              <button
                onClick={resetTimer}
                title="Reset Timer"
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Real-time Quadrant Prompt */}
          <div className="md:col-span-7 bg-white rounded-3xl p-6 border border-sky-100 shadow-xs space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-12 h-12 rounded-2xl bg-cyan-100 text-2xl flex items-center justify-center shadow-xs">
                {quadrant.icon}
              </span>
              <div>
                <p className="text-xs uppercase font-bold text-cyan-800">
                  Zona yang Disikat Saat Ini:
                </p>
                <h4 className="text-xl font-extrabold text-slate-900 font-fredoka">
                  {quadrant.zone}
                </h4>
              </div>
            </div>

            <p className="text-base text-slate-700 font-medium bg-sky-50/70 p-4 rounded-2xl border border-sky-100">
              📢 <strong>Panduan Toothie:</strong> {quadrant.instruction}
            </p>

            <div className="grid grid-cols-4 gap-2 pt-2">
              <div
                className={`p-2 rounded-xl text-center text-xs font-bold border transition-colors ${
                  120 - timerSeconds < 30 ? 'bg-cyan-500 text-white border-cyan-600' : 'bg-slate-50 text-slate-500'
                }`}
              >
                1. Kanan Atas
              </div>
              <div
                className={`p-2 rounded-xl text-center text-xs font-bold border transition-colors ${
                  120 - timerSeconds >= 30 && 120 - timerSeconds < 60
                    ? 'bg-cyan-500 text-white border-cyan-600'
                    : 'bg-slate-50 text-slate-500'
                }`}
              >
                2. Kiri Atas
              </div>
              <div
                className={`p-2 rounded-xl text-center text-xs font-bold border transition-colors ${
                  120 - timerSeconds >= 60 && 120 - timerSeconds < 90
                    ? 'bg-cyan-500 text-white border-cyan-600'
                    : 'bg-slate-50 text-slate-500'
                }`}
              >
                3. Gigi Bawah
              </div>
              <div
                className={`p-2 rounded-xl text-center text-xs font-bold border transition-colors ${
                  120 - timerSeconds >= 90 ? 'bg-cyan-500 text-white border-cyan-600' : 'bg-slate-50 text-slate-500'
                }`}
              >
                4. Kunyah & Lidah
              </div>
            </div>

            {timerSeconds === 0 && (
              <div className="p-3 bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-900 font-bold text-sm flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Hebat! Kamu berhasil menyelesaikan sikat gigi 2 menit penuh! Lencana Jago Sikat Gigi terbuka!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
