import React, { useState } from 'react';
import { POST_TEST_QUESTIONS } from '../data/dentalData';
import { sound } from '../utils/audio';
import { ToothieMascot } from './ToothieMascot';
import confetti from 'canvas-confetti';
import { Award, Sparkles, CheckCircle2, RotateCcw, ArrowRight, Printer, Star } from 'lucide-react';

interface PostTestSectionProps {
  onUnlockBadge: (badgeId: string) => void;
  onMarkComplete: (sectionId: string) => void;
}

export const PostTestSection: React.FC<PostTestSectionProps> = ({
  onUnlockBadge,
  onMarkComplete,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(POST_TEST_QUESTIONS.length).fill(null)
  );
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [studentName, setStudentName] = useState(() => {
    return localStorage.getItem('toothie_student_name') || '';
  });

  const handleSelectOption = (qIdx: number, optionIdx: number) => {
    sound.playPop();
    const updated = [...selectedAnswers];
    updated[qIdx] = optionIdx;
    setSelectedAnswers(updated);
  };

  const handleNext = () => {
    sound.playPop();
    if (currentIdx < POST_TEST_QUESTIONS.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const handlePrev = () => {
    sound.playPop();
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  const handleSubmit = () => {
    sound.playFanfare();
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    setIsSubmitted(true);
    onUnlockBadge('ahli_gigi_sehat');
    onMarkComplete('posttest');
  };

  const handleReset = () => {
    sound.playPop();
    setSelectedAnswers(new Array(POST_TEST_QUESTIONS.length).fill(null));
    setCurrentIdx(0);
    setIsSubmitted(false);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setStudentName(name);
    localStorage.setItem('toothie_student_name', name);
  };

  // Calculate score
  let correctCount = 0;
  POST_TEST_QUESTIONS.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctAnswer) {
      correctCount += 1;
    }
  });

  const finalScore = Math.round((correctCount / POST_TEST_QUESTIONS.length) * 100);
  const allAnswered = selectedAnswers.every((ans) => ans !== null);

  const currentQ = POST_TEST_QUESTIONS[currentIdx];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-cyan-600 via-sky-600 to-indigo-600 rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> Uji Pengetahuan Akhir
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-fredoka">
            Post Test: Seberapa Jago Gigimu? 🎓🦷
          </h1>
          <p className="text-sm sm:text-base text-cyan-50 max-w-xl">
            Yuk buktikan seberapa banyak yang sudah kamu pelajari tentang menjaga kesehatan gigi dan raih Sertifikat Pahlawan Gigi Toothie!
          </p>
        </div>

        <ToothieMascot
          expression={isSubmitted ? 'proud' : 'superhero'}
          message={
            isSubmitted
              ? 'Selamat! Kamu resmi menjadi Ahli Gigi Sehat!'
              : 'Jawab dengan tenang dan santai ya, teman pintar!'
          }
          size="md"
        />
      </div>

      {!isSubmitted ? (
        <div className="bg-white rounded-3xl border-2 border-sky-100 p-6 sm:p-8 shadow-sm space-y-6">
          {/* Progress Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full">
                Soal {currentIdx + 1} dari {POST_TEST_QUESTIONS.length}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                Pilihan Ganda
              </span>
            </div>

            <span className="text-xs font-bold text-slate-500">
              Terjawab: {selectedAnswers.filter((a) => a !== null).length} / {POST_TEST_QUESTIONS.length}
            </span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
              className="h-full bg-cyan-500 transition-all duration-300 rounded-full"
              style={{
                width: `${((currentIdx + 1) / POST_TEST_QUESTIONS.length) * 100}%`,
              }}
            />
          </div>

          {/* Question Text */}
          <div className="py-2">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-fredoka leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentIdx] === optIdx;
              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(currentIdx, optIdx)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center gap-3 ${
                    isSelected
                      ? 'border-cyan-500 bg-cyan-50 text-cyan-950 font-bold shadow-xs'
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                      isSelected ? 'bg-cyan-500 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="text-sm sm:text-base font-medium">
                    {opt}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Stepper Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-slate-100">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                currentIdx === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-100 text-slate-400'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              Sebelumnya
            </button>

            {currentIdx < POST_TEST_QUESTIONS.length - 1 ? (
              <button
                onClick={handleNext}
                className="btn-3d-cyan text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer"
              >
                <span>Berikutnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!allAnswered}
                className={`btn-3d-emerald text-white px-7 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer ${
                  !allAnswered ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Kumpulkan & Lihat Hasil</span>
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Results & Certificate of Completion */
        <div className="space-y-8">
          <div className="bg-white rounded-3xl border-2 border-sky-100 p-6 sm:p-8 shadow-sm text-center space-y-4">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-4xl mx-auto flex items-center justify-center animate-bounce">
              👑
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-fredoka">
              Hebat! Kamu Sudah Belajar Banyak Tentang Kesehatan Gigi!
            </h3>
            <p className="text-slate-600 max-w-lg mx-auto text-sm sm:text-base">
              Kamu telah menjawab <strong>{correctCount}</strong> dari {POST_TEST_QUESTIONS.length} pertanyaan dengan benar (Nilai: {finalScore}/100).
            </p>

            {/* Custom Student Name Input for Certificate */}
            <div className="max-w-md mx-auto bg-sky-50 border border-sky-200 rounded-2xl p-4 text-left space-y-2">
              <label htmlFor="student-name" className="block text-xs font-bold text-cyan-900 uppercase">
                Tulis Nama Lengkapmu untuk Sertifikat:
              </label>
              <input
                id="student-name"
                type="text"
                placeholder="Contoh: Budi Santoso"
                value={studentName}
                onChange={handleNameChange}
                className="w-full px-4 py-2 rounded-xl bg-white border border-sky-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 font-bold text-slate-800"
              />
            </div>
          </div>

          {/* Printable Visual Certificate */}
          <div
            id="printable-certificate"
            className="relative bg-gradient-to-br from-amber-50 via-white to-sky-50 rounded-3xl border-8 border-amber-300 p-8 sm:p-12 shadow-md text-center space-y-6 max-w-3xl mx-auto overflow-hidden"
          >
            {/* Watermark Ornaments */}
            <div className="absolute top-4 left-4 text-4xl opacity-20 pointer-events-none">
              🦷
            </div>
            <div className="absolute bottom-4 right-4 text-4xl opacity-20 pointer-events-none">
              ✨
            </div>

            <div className="space-y-1">
              <p className="text-xs uppercase tracking-widest text-amber-800 font-extrabold font-mono">
                SERTIFIKAT KELULUSAN RESMI TOOTHIE
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-fredoka">
                Pahlawan Gigi Sehat Cilik
              </h2>
            </div>

            <p className="text-sm text-slate-500">
              Dengan bangga diberikan kepada:
            </p>

            <div className="border-b-2 border-dashed border-amber-400 pb-2 max-w-md mx-auto">
              <span className="text-2xl sm:text-3xl font-extrabold text-cyan-800 font-fredoka">
                {studentName.trim() || 'Sahabat Cilik Toothie'}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              Telah menyelesaikan seluruh rangkaian petualangan edukasi interaktif kesehatan gigi dan mulut, menguasai teknik menyikat gigi 2 menit, membasmi plak kuman, dan siap merawat senyum sehat setiap hari!
            </p>

            <div className="flex items-center justify-between max-w-md mx-auto pt-6 border-t border-amber-200 text-xs text-slate-500">
              <div className="text-center">
                <span className="text-2xl block mb-1">🦷</span>
                <p className="font-bold text-slate-800">Toothie</p>
                <p>Mascot Pahlawan Gigi</p>
              </div>

              <div className="w-16 h-16 rounded-full bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center text-amber-800 font-extrabold text-xs shadow-inner">
                RESMI
              </div>

              <div className="text-center">
                <span className="text-2xl block mb-1">⭐</span>
                <p className="font-bold text-slate-800">Nilai: {finalScore}</p>
                <p>Status: Lulus Juara</p>
              </div>
            </div>
          </div>

          {/* Action to Print or Retake */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => window.print()}
              className="btn-3d-cyan text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak / Simpan Sertifikat</span>
            </button>

            <button
              onClick={handleReset}
              className="btn-3d-white text-slate-700 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer border border-slate-200"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Ulangi Post Test</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
