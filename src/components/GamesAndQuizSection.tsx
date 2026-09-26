import React, { useState, useEffect } from 'react';
import { QUIZ_QUESTIONS } from '../data/dentalData';
import { sound } from '../utils/audio';
import { ToothieMascot } from './ToothieMascot';
import confetti from 'canvas-confetti';
import { Sparkles, Trophy, Star, RotateCcw, CheckCircle2, Gamepad2, ArrowRight } from 'lucide-react';

interface GamesAndQuizSectionProps {
  onUnlockBadge: (badgeId: string) => void;
  onMarkComplete: (sectionId: string) => void;
}

export const GamesAndQuizSection: React.FC<GamesAndQuizSectionProps> = ({
  onUnlockBadge,
  onMarkComplete,
}) => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'minigame'>('quiz');

  // Quiz State
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('Pilih salah satu jawaban yang menurutmu paling tepat ya!');
  const [feedbackExpression, setFeedbackExpression] = useState<'thinking' | 'happy' | 'excited' | 'proud'>('thinking');

  // Mini-Game State
  const [gameActive, setGameActive] = useState(false);
  const [gameTimeLeft, setGameTimeLeft] = useState(25);
  const [gameScore, setGameScore] = useState(0);
  const [germs, setGerms] = useState<{ id: number; x: number; y: number; icon: string }[]>([]);

  // Mini-Game Timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (gameActive && gameTimeLeft > 0) {
      interval = setInterval(() => {
        setGameTimeLeft((prev) => {
          if (prev <= 1) {
            setGameActive(false);
            sound.playSparkle();
            confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
            onUnlockBadge('musuh_plak');
            onMarkComplete('games');
            return 0;
          }
          return prev - 1;
        });

        // Spawn random cute germs
        if (Math.random() > 0.3) {
          const germIcons = ['👾', '🦠', '🍬', '🍭', '🧁'];
          const newGerm = {
            id: Date.now() + Math.random(),
            x: Math.floor(Math.random() * 80) + 10,
            y: Math.floor(Math.random() * 70) + 15,
            icon: germIcons[Math.floor(Math.random() * germIcons.length)],
          };
          setGerms((current) => [...current.slice(-5), newGerm]);
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [gameActive, gameTimeLeft, onUnlockBadge, onMarkComplete]);

  // Quiz Logic
  const currentQ = QUIZ_QUESTIONS[currentQuestionIdx];

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    sound.playPop();
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctAnswer;
    if (isCorrect) {
      sound.playCorrect();
      setScore((prev) => prev + 10);
      setStars((prev) => prev + 1);
      setFeedbackExpression('excited');
      setFeedbackMessage('Hebat! Jawaban kamu benar! 🎉 ' + currentQ.explanation);
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
    } else {
      sound.playEncourage();
      setFeedbackExpression('thinking');
      setFeedbackMessage('Bagus sudah mencoba! Jawaban yang tepat: ' + currentQ.options[currentQ.correctAnswer] + '. ' + currentQ.explanation);
    }
  };

  const handleNextQuestion = () => {
    sound.playPop();
    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIdx(currentQuestionIdx + 1);
      setSelectedOption(null);
      setIsAnswered(false);
      setFeedbackExpression('thinking');
      setFeedbackMessage('Ayo lanjut ke pertanyaan seru berikutnya!');
    } else {
      setQuizFinished(true);
      sound.playFanfare();
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      onUnlockBadge('bintang_kuis');
      onMarkComplete('games');
    }
  };

  const handleResetQuiz = () => {
    sound.playPop();
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setStars(0);
    setQuizFinished(false);
    setFeedbackExpression('thinking');
    setFeedbackMessage('Yuk coba lagi kuisnya!');
  };

  // Mini-Game Actions
  const startGame = () => {
    sound.playPop();
    setGameActive(true);
    setGameTimeLeft(25);
    setGameScore(0);
    setGerms([]);
  };

  const hitGerm = (id: number) => {
    sound.playScrub();
    setGameScore((prev) => prev + 1);
    setGerms((current) => current.filter((g) => g.id !== id));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> Bab 6: Uji Pengetahuan & Main Seru
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-fredoka">
            Quiz & Games Pahlawan Gigi 🎮⭐
          </h1>
          <p className="text-sm sm:text-base text-emerald-50 max-w-xl">
            Asah pengetahuan gigimu lewat kuis bertabur bintang atau tangkap kuman plak di mini-game seru!
          </p>
        </div>

        <ToothieMascot
          expression={feedbackExpression}
          message={feedbackMessage}
          size="md"
        />
      </div>

      {/* Tabs: Quiz vs Mini-Game */}
      <div className="flex items-center justify-center p-1.5 bg-slate-100 rounded-2xl max-w-sm mx-auto shadow-inner">
        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('quiz');
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'quiz'
              ? 'bg-white text-emerald-800 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          ⭐ Kuis Anak Pintar
        </button>
        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('minigame');
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'minigame'
              ? 'bg-white text-emerald-800 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          👾 Mini-Game Basmi Kuman
        </button>
      </div>

      {/* TAB 1: QUIZ */}
      {activeTab === 'quiz' && (
        <div className="bg-white rounded-3xl border-2 border-sky-100 p-6 sm:p-8 shadow-sm space-y-6">
          {!quizFinished ? (
            <>
              {/* Quiz Header Info */}
              <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                    Pertanyaan {currentQuestionIdx + 1} dari {QUIZ_QUESTIONS.length}
                  </span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-sm">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{stars} Bintang</span>
                  </div>
                </div>

                <div className="text-xs font-bold text-slate-500">
                  Skor: <span className="text-cyan-700 text-sm">{score}</span> Poin
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-emerald-400 to-cyan-500 transition-all duration-300 rounded-full"
                  style={{
                    width: `${((currentQuestionIdx + 1) / QUIZ_QUESTIONS.length) * 100}%`,
                  }}
                />
              </div>

              {/* Question Text */}
              <div className="py-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-fredoka leading-snug">
                  {currentQ.question}
                </h3>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {currentQ.options.map((opt, idx) => {
                  const isSelected = selectedOption === idx;
                  const isCorrect = idx === currentQ.correctAnswer;

                  let cardStyle = 'border-slate-200 bg-white hover:bg-sky-50 text-slate-700';
                  if (isAnswered) {
                    if (isCorrect) {
                      cardStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold shadow-xs';
                    } else if (isSelected) {
                      cardStyle = 'border-amber-300 bg-amber-50 text-amber-900';
                    } else {
                      cardStyle = 'border-slate-100 bg-slate-50 text-slate-400';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleSelectOption(idx)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${cardStyle}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-xs shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-sm sm:text-base font-medium">
                          {opt}
                        </span>
                      </div>

                      {isAnswered && isCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Next Question Control */}
              {isAnswered && (
                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={handleNextQuestion}
                    className="btn-3d-cyan text-white px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span>
                      {currentQuestionIdx < QUIZ_QUESTIONS.length - 1
                        ? 'Lanjut Pertanyaan Berikutnya'
                        : 'Lihat Hasil Akhir 🎉'}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            /* Quiz Completed Screen */
            <div className="text-center py-8 space-y-6">
              <div className="w-24 h-24 rounded-full bg-emerald-100 text-5xl mx-auto flex items-center justify-center animate-bounce">
                🏆
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-extrabold text-slate-900 font-fredoka">
                  Hebat! Kamu Bintang Kuis Gigi! ⭐
                </h3>
                <p className="text-slate-600 max-w-md mx-auto text-sm sm:text-base">
                  Kamu berhasil menjawab seluruh kuis dengan sangat cerdas! Terus jaga kesehatan gigimu ya!
                </p>
              </div>

              <div className="inline-flex items-center gap-6 px-6 py-3 bg-sky-50 border border-sky-200 rounded-2xl">
                <div>
                  <p className="text-xs uppercase font-bold text-slate-400">Total Skor</p>
                  <p className="text-2xl font-extrabold text-cyan-800 font-fredoka">{score} Poin</p>
                </div>
                <div className="w-px h-8 bg-slate-200" />
                <div>
                  <p className="text-xs uppercase font-bold text-slate-400">Bintang Didapat</p>
                  <p className="text-2xl font-extrabold text-amber-500 font-fredoka flex items-center gap-1 justify-center">
                    <Star className="w-5 h-5 fill-amber-400" /> {stars}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={handleResetQuiz}
                  className="btn-3d-white text-slate-700 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 cursor-pointer border border-slate-200"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Main Kuis Lagi</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MINI-GAME BASMI KUMAN */}
      {activeTab === 'minigame' && (
        <div className="bg-white rounded-3xl border-2 border-emerald-100 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-fredoka flex items-center gap-2">
                <Gamepad2 className="w-6 h-6 text-emerald-600" />
                <span>Mini-Game: Pahlawan Pembasmi Kuman Plak!</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Klik kuman nakal yang muncul di layar secepat mungkin sebelum waktu habis!
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-center px-3 py-1 bg-amber-50 border border-amber-200 rounded-xl">
                <p className="text-[10px] uppercase font-bold text-amber-700">Waktu</p>
                <p className="text-lg font-extrabold text-amber-900 font-mono tabular-nums">{gameTimeLeft}s</p>
              </div>
              <div className="text-center px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-xl">
                <p className="text-[10px] uppercase font-bold text-emerald-700">Kuman Dibasmi</p>
                <p className="text-lg font-extrabold text-emerald-900 font-mono tabular-nums">{gameScore}</p>
              </div>
            </div>
          </div>

          {/* Game Arena Canvas */}
          <div className="relative w-full h-80 sm:h-96 rounded-3xl bg-gradient-to-b from-sky-50 via-cyan-50 to-teal-50 border-4 border-cyan-200 shadow-inner overflow-hidden select-none">
            {!gameActive ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-4 bg-white/70 backdrop-blur-xs">
                <span className="text-6xl animate-bounce">🪥</span>
                <div>
                  <h4 className="text-2xl font-extrabold text-slate-900 font-fredoka">
                    Siap Membasmi Kuman Gigi?
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto mt-1">
                    Gunakan sikat gigi saktimu dan klik setiap kuman yang muncul di layar dalam 25 detik!
                  </p>
                </div>
                <button
                  onClick={startGame}
                  className="btn-3d-cyan text-white px-8 py-3 rounded-2xl font-bold text-base shadow-md cursor-pointer"
                >
                  🚀 Mulai Game Sekarang!
                </button>
              </div>
            ) : (
              <>
                {/* Visual Tooth Target in Center */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30 pointer-events-none text-9xl">
                  🦷
                </div>

                {/* Floating Germs */}
                {germs.map((g) => (
                  <button
                    key={g.id}
                    onClick={() => hitGerm(g.id)}
                    style={{
                      left: `${g.x}%`,
                      top: `${g.y}%`,
                    }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/90 border-2 border-purple-300 shadow-md flex items-center justify-center text-3xl cursor-pointer hover:scale-125 transition-transform transform active:scale-90 animate-wiggle"
                  >
                    <span>{g.icon}</span>
                  </button>
                ))}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
