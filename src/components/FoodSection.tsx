import React, { useState } from 'react';
import { FOOD_ITEMS } from '../data/dentalData';
import { FoodItem } from '../types';
import { sound } from '../utils/audio';
import { ToothieMascot } from './ToothieMascot';
import { CheckCircle2, Sparkles, Heart, AlertTriangle, RotateCcw } from 'lucide-react';

interface FoodSectionProps {
  onUnlockBadge: (badgeId: string) => void;
  onMarkComplete: (sectionId: string) => void;
}

export const FoodSection: React.FC<FoodSectionProps> = ({
  onUnlockBadge,
  onMarkComplete,
}) => {
  const [sortedItems, setSortedItems] = useState<{
    healthy: FoodItem[];
    caution: FoodItem[];
  }>({
    healthy: [],
    caution: [],
  });

  const [activeMessage, setActiveMessage] = useState<string>(
    'Yuk kelompokkan makanan di bawah ini! Pilih mana yang bikin Gigi Bahagia atau Gigi Waspada!'
  );
  const [activeExpression, setActiveExpression] = useState<'happy' | 'thinking' | 'excited'>('thinking');
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);

  const remainingItems = FOOD_ITEMS.filter(
    (item) =>
      !sortedItems.healthy.some((h) => h.id === item.id) &&
      !sortedItems.caution.some((c) => c.id === item.id)
  );

  const handleSortItem = (item: FoodItem, targetCategory: 'healthy' | 'caution') => {
    sound.playPop();

    if (item.category === targetCategory) {
      sound.playCorrect();
      const updated = {
        ...sortedItems,
        [targetCategory]: [...sortedItems[targetCategory], item],
      };
      setSortedItems(updated);
      setSelectedFood(null);

      if (targetCategory === 'healthy') {
        setActiveExpression('excited');
        setActiveMessage(`Hebat! ${item.name} adalah sahabat gigi! ${item.why}`);
      } else {
        setActiveExpression('happy');
        setActiveMessage(`Tepat! ${item.name} memang manis dan perlu dibatasi! ${item.why}`);
      }

      // Check if all sorted
      const totalSorted = updated.healthy.length + updated.caution.length;
      if (totalSorted === FOOD_ITEMS.length) {
        sound.playSparkle();
        setActiveMessage('Luar biasa! Kamu berhasil memilah semua makanan sahabat gigi! Lencana Pahlawan Nutrisi terbuka!');
        onUnlockBadge('pahlawan_makanan');
        onMarkComplete('food');
      }
    } else {
      sound.playEncourage();
      setActiveExpression('thinking');
      if (item.category === 'healthy') {
        setActiveMessage(`Hmm, ${item.name} itu sebenarnya sangat menyehatkan bagi gigi, lho! Coba masukkan ke Gigi Bahagia ya.`);
      } else {
        setActiveMessage(`Ups, ${item.name} mengandung gula atau asam tinggi. Sebaiknya masuk ke Gigi Waspada agar gigi terlindungi.`);
      }
    }
  };

  const handleReset = () => {
    sound.playPop();
    setSortedItems({ healthy: [], caution: [] });
    setSelectedFood(null);
    setActiveMessage('Yuk kita mulai sortir makanan lagi! Kamu pasti bisa!');
    setActiveExpression('thinking');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> Bab 3: Nutrisi & Makanan
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-fredoka">
            Makanan & Minuman untuk Gigimu 🍎🍭
          </h1>
          <p className="text-sm sm:text-base text-amber-50 max-w-xl">
            Apa yang kita makan sangat memengaruhi kekuatan gigi kita! Ada makanan yang membuat gigi tersenyum, ada pula yang membuat gigi sedih karena asam kuman.
          </p>
        </div>

        <ToothieMascot
          expression={activeExpression}
          message={activeMessage}
          size="md"
        />
      </div>

      {/* Sorter Sandbox Container */}
      <div className="bg-white rounded-3xl border-2 border-sky-100 p-6 sm:p-8 shadow-sm space-y-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 font-fredoka flex items-center gap-2">
              <span>🎮 Game Sortir: Sahabat Gigi vs Waspada Gula</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Pilih makanan di bawah lalu klik kotak yang sesuai!
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Game</span>
            </button>
            <span className="text-xs font-bold px-3 py-1 bg-sky-50 text-sky-800 rounded-lg border border-sky-100">
              Tersisa: {remainingItems.length}
            </span>
          </div>
        </div>

        {/* 2 Target Baskets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Healthy Basket: Gigi Bahagia */}
          <div className="rounded-3xl border-2 border-emerald-300 bg-emerald-50/60 p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-10 h-10 rounded-xl bg-emerald-200 flex items-center justify-center text-xl shadow-xs">
                  😄
                </span>
                <div>
                  <h4 className="font-extrabold text-base text-emerald-900 font-fredoka flex items-center gap-1">
                    Gigi Bahagia <Heart className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                  </h4>
                  <p className="text-xs text-emerald-700">
                    Pilih makanan yang membantu tubuh tetap sehat!
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold px-2 py-0.5 bg-emerald-200 text-emerald-900 rounded-md">
                {sortedItems.healthy.length} item
              </span>
            </div>

            {/* Drop / Click Target */}
            {selectedFood && (
              <button
                onClick={() => handleSortItem(selectedFood, 'healthy')}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs transition-transform transform active:scale-95 cursor-pointer animate-pulse"
              >
                + Masukkan "{selectedFood.name}" ke Gigi Bahagia
              </button>
            )}

            <div className="min-h-28 bg-white/80 rounded-2xl p-3 border border-emerald-100 flex flex-wrap gap-2 items-center">
              {sortedItems.healthy.length === 0 ? (
                <p className="text-xs text-emerald-600/70 italic text-center w-full">
                  Belum ada makanan. Pilih buah, sayur, air, atau susu di bawah!
                </p>
              ) : (
                sortedItems.healthy.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-900 rounded-xl text-xs font-bold border border-emerald-200 shadow-xs"
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Caution Basket: Gigi Waspada */}
          <div className="rounded-3xl border-2 border-amber-300 bg-amber-50/60 p-5 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-10 h-10 rounded-xl bg-amber-200 flex items-center justify-center text-xl shadow-xs">
                  🧐
                </span>
                <div>
                  <h4 className="font-extrabold text-base text-amber-900 font-fredoka flex items-center gap-1">
                    Gigi Waspada <AlertTriangle className="w-4 h-4 text-amber-600" />
                  </h4>
                  <p className="text-xs text-amber-700">
                    Batasi makanan & minuman manis lengket!
                  </p>
                </div>
              </div>

              <span className="text-xs font-bold px-2 py-0.5 bg-amber-200 text-amber-900 rounded-md">
                {sortedItems.caution.length} item
              </span>
            </div>

            {/* Drop / Click Target */}
            {selectedFood && (
              <button
                onClick={() => handleSortItem(selectedFood, 'caution')}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-xs transition-transform transform active:scale-95 cursor-pointer animate-pulse"
              >
                + Masukkan "{selectedFood.name}" ke Gigi Waspada
              </button>
            )}

            <div className="min-h-28 bg-white/80 rounded-2xl p-3 border border-amber-100 flex flex-wrap gap-2 items-center">
              {sortedItems.caution.length === 0 ? (
                <p className="text-xs text-amber-600/70 italic text-center w-full">
                  Belum ada makanan. Pilih permen, soda, atau boba di bawah!
                </p>
              ) : (
                sortedItems.caution.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-900 rounded-xl text-xs font-bold border border-amber-200 shadow-xs"
                  >
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Available Food Cards Tray */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
            {remainingItems.length > 0
              ? '1. Klik Salah Satu Makanan di Bawah:'
              : '🎉 Semua makanan sudah berhasil disortir dengan hebat!'}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {remainingItems.map((item) => {
              const isSelected = selectedFood?.id === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playPop();
                    setSelectedFood(item);
                  }}
                  className={`p-3.5 rounded-2xl border-2 text-center transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-cyan-50 border-cyan-500 shadow-md scale-103'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <span className="text-3xl block mb-1">{item.icon}</span>
                  <p className="text-xs font-bold text-slate-900 font-fredoka line-clamp-1">
                    {item.name}
                  </p>
                  <span className="text-[10px] text-slate-400 mt-1 block">
                    {isSelected ? '👉 Klik Kotak Tujuan' : 'Klik Pilih'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Educational Summary Cards */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 space-y-1">
            <h5 className="font-bold text-sm text-sky-900 font-fredoka flex items-center gap-1.5">
              <span>🥛 Kenapa Kalsium dan Air Putih Sangat Baik?</span>
            </h5>
            <p className="text-xs text-sky-800 leading-relaxed">
              Kalsium dari susu dan keju menambal mineral email gigi yang terkikis, sedangkan air putih mencuci bersih sisa makanan tanpa menghasilkan asam sama sekali!
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-100 space-y-1">
            <h5 className="font-bold text-sm text-rose-900 font-fredoka flex items-center gap-1.5">
              <span>🍬 Bolehkan Makan Permen Sekali-Kali?</span>
            </h5>
            <p className="text-xs text-rose-800 leading-relaxed">
              Boleh dinikmati sesekali, asalkan tidak setiap hari! Dan setelah makan yang manis, segera berkumur dengan air putih atau menyikat gigimu ya!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
