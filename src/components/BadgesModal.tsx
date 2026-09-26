import React from 'react';
import { Badge } from '../types';
import { sound } from '../utils/audio';
import { X, Award, CheckCircle2, Lock, Sparkles } from 'lucide-react';

interface BadgesModalProps {
  isOpen: boolean;
  onClose: () => void;
  badges: Badge[];
}

export const BadgesModal: React.FC<BadgesModalProps> = ({
  isOpen,
  onClose,
  badges,
}) => {
  if (!isOpen) return null;

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl border-4 border-amber-300 shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={() => {
            sound.playPop();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 mx-auto flex items-center justify-center text-3xl shadow-xs">
            🏆
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-fredoka">
            Ruang Koleksi Lencana Pahlawan Gigi
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Kumpulkan seluruh 6 lencana kehormatan dengan menyelesaikan aktivitas belajar dan tantangan seru di Toothie!
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-900 text-xs font-bold rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>{unlockedCount} dari {badges.length} Terkumpul</span>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`p-4 rounded-2xl border-2 transition-all flex items-start gap-3.5 ${
                badge.unlocked
                  ? 'border-amber-400 bg-amber-50/70 shadow-xs'
                  : 'border-slate-200 bg-slate-50/60 opacity-60'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 shadow-xs ${
                  badge.unlocked ? 'bg-white' : 'bg-slate-200 text-slate-400'
                }`}
              >
                {badge.unlocked ? badge.icon : '🔒'}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-sm text-slate-900 font-fredoka">
                    {badge.name}
                  </h4>
                  {badge.unlocked ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </div>

                <p className="text-xs text-slate-600 leading-tight">
                  {badge.description}
                </p>

                <p className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                  {badge.unlocked ? (
                    badge.unlockedAt ? `Terbuka: ${badge.unlockedAt}` : 'Sudah Diraih! ✨'
                  ) : (
                    'Belum Terbuka'
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer Note */}
        <div className="text-center pt-2 border-t border-slate-100">
          <button
            onClick={() => {
              sound.playPop();
              onClose();
            }}
            className="btn-3d-cyan text-white px-6 py-2.5 rounded-xl font-bold text-sm cursor-pointer"
          >
            Lanjut Petualangan! 🚀
          </button>
        </div>
      </div>
    </div>
  );
};
