import React, { useState } from 'react';
import { TOOTH_TYPES, TOOTH_ANATOMY } from '../data/dentalData';
import { sound } from '../utils/audio';
import { ToothieMascot } from './ToothieMascot';
import { Info, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';

const ANATOMY_IMG = '/src/assets/images/toothie_anatomy_cross_1790412284929.jpg';

interface AnatomySectionProps {
  onUnlockBadge: (badgeId: string) => void;
  onMarkComplete: (sectionId: string) => void;
}

export const AnatomySection: React.FC<AnatomySectionProps> = ({
  onUnlockBadge,
  onMarkComplete,
}) => {
  const [activeTab, setActiveTab] = useState<'types' | 'layers' | 'functions'>('types');
  const [selectedTypeId, setSelectedTypeId] = useState<string>('seri');
  const [selectedLayerId, setSelectedLayerId] = useState<string>('enamel');
  const [exploredParts, setExploredParts] = useState<Set<string>>(new Set(['seri', 'enamel']));

  const handleSelectType = (id: string) => {
    sound.playPop();
    setSelectedTypeId(id);
    const updated = new Set(exploredParts).add(id);
    setExploredParts(updated);
    checkDetectiveBadge(updated);
  };

  const handleSelectLayer = (id: string) => {
    sound.playPop();
    setSelectedLayerId(id);
    const updated = new Set(exploredParts).add(id);
    setExploredParts(updated);
    checkDetectiveBadge(updated);
  };

  const checkDetectiveBadge = (explored: Set<string>) => {
    // If explored at least 3 types and 3 layers, unlock Detektif Gigi!
    const typeCount = TOOTH_TYPES.filter((t) => explored.has(t.id)).length;
    const layerCount = TOOTH_ANATOMY.filter((l) => explored.has(l.id)).length;
    if (typeCount >= 3 && layerCount >= 3) {
      onUnlockBadge('detektif_gigi');
      onMarkComplete('anatomy');
    }
  };

  const currentType = TOOTH_TYPES.find((t) => t.id === selectedTypeId) || TOOTH_TYPES[0];
  const currentLayer = TOOTH_ANATOMY.find((l) => l.id === selectedLayerId) || TOOTH_ANATOMY[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-sky-400 via-cyan-500 to-teal-500 rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> Bab 1: Kenali Gigimu
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-fredoka">
            Anatomi & Jenis-Jenis Gigi 🦷
          </h1>
          <p className="text-sm sm:text-base text-cyan-50 max-w-xl">
            Gigi bukan sekadar benda putih di mulut, lho! Setiap gigi punya tugas superhero masing-masing. Yuk kita selidiki!
          </p>
        </div>

        <ToothieMascot
          expression="thinking"
          message="Ayo klik setiap jenis gigi dan bagian lapisan di bawah ini ya!"
          size="md"
        />
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center justify-center p-1.5 bg-slate-100 rounded-2xl max-w-md mx-auto shadow-inner">
        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('types');
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'types'
              ? 'bg-white text-cyan-800 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          ✂️ 4 Jenis Gigi
        </button>
        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('layers');
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'layers'
              ? 'bg-white text-cyan-800 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          🧱 5 Lapisan Gigi
        </button>
        <button
          onClick={() => {
            sound.playPop();
            setActiveTab('functions');
          }}
          className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'functions'
              ? 'bg-white text-cyan-800 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          🌟 Fungsi Utama
        </button>
      </div>

      {/* Tab 1: 4 Jenis Gigi */}
      {activeTab === 'types' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {TOOTH_TYPES.map((type) => {
              const isSelected = type.id === selectedTypeId;
              const hasExplored = exploredParts.has(type.id);
              return (
                <button
                  key={type.id}
                  onClick={() => handleSelectType(type.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-cyan-50 border-cyan-500 shadow-md -translate-y-1'
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl">
                      {type.id === 'seri' ? '✂️' : type.id === 'taring' ? '🥩' : type.id === 'premolar' ? '🥜' : '🥣'}
                    </span>
                    {hasExplored && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    )}
                  </div>
                  <h3 className="font-bold text-sm sm:text-base text-slate-900 font-fredoka">
                    {type.name.split(' (')[0]}
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                    {type.nickname}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Detailed Card for Selected Tooth Type */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sky-100 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-sky-50 to-cyan-50 rounded-2xl border border-sky-100">
              <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center text-5xl mb-4 animate-float">
                {currentType.id === 'seri' ? '✂️' : currentType.id === 'taring' ? '🥩' : currentType.id === 'premolar' ? '🥜' : '🥣'}
              </div>
              <h3 className="text-xl font-extrabold text-slate-900 font-fredoka text-center">
                {currentType.name}
              </h3>
              <span className="mt-1 text-xs font-semibold px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full">
                {currentType.nickname}
              </span>
              <p className="text-xs text-slate-600 mt-3 text-center">
                Jumlah di mulut: <strong>{currentType.count}</strong>
              </p>
            </div>

            <div className="md:col-span-7 space-y-4">
              <div>
                <h4 className="text-xs uppercase tracking-wider text-cyan-800 font-bold">
                  Bentuk Gigi
                </h4>
                <p className="text-slate-700 font-medium text-sm sm:text-base mt-1">
                  {currentType.shape}
                </p>
              </div>

              <div>
                <h4 className="text-xs uppercase tracking-wider text-cyan-800 font-bold">
                  Tugas / Fungsinya
                </h4>
                <p className="text-slate-700 font-medium text-sm sm:text-base mt-1">
                  {currentType.function}
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3">
                <span className="text-xl">💡</span>
                <div>
                  <h5 className="text-xs font-bold text-amber-900 uppercase">
                    Tahukah Kamu?
                  </h5>
                  <p className="text-xs sm:text-sm text-amber-800 mt-0.5">
                    {currentType.funFact}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 5 Lapisan Gigi */}
      {activeTab === 'layers' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual 3D Anatomy Model Illustration */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-sky-100 shadow-md bg-white p-2">
                <img
                  src={ANATOMY_IMG}
                  alt="3D Lapisan Gigi Cross-section"
                  className="w-full h-auto rounded-2xl object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-xs text-xs font-bold text-cyan-800 border border-sky-100">
                  🔬 Model Irisan Gigi 3D
                </div>
              </div>
            </div>

            {/* Layer Selection Buttons and Detail */}
            <div className="lg:col-span-6 space-y-3">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Pilih Lapisan untuk Membuka Rahasianya:
              </p>

              <div className="space-y-2">
                {TOOTH_ANATOMY.map((layer) => {
                  const isSelected = layer.id === selectedLayerId;
                  const hasExplored = exploredParts.has(layer.id);
                  return (
                    <button
                      key={layer.id}
                      onClick={() => handleSelectLayer(layer.id)}
                      className={`w-full p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? 'bg-cyan-50 border-cyan-400 shadow-sm scale-101'
                          : 'bg-white hover:bg-slate-50 border-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="w-4 h-4 rounded-full shadow-xs shrink-0"
                          style={{ backgroundColor: layer.color }}
                        />
                        <div>
                          <p className="font-bold text-sm text-slate-900 font-fredoka">
                            {layer.name}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {layer.role}
                          </p>
                        </div>
                      </div>

                      {hasExplored ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      ) : (
                        <ChevronRight className="w-5 h-5 text-slate-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active Layer Detail Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sky-100 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <span
                className="w-3.5 h-3.5 rounded-full"
                style={{ backgroundColor: currentLayer.color }}
              />
              <h3 className="text-xl font-bold text-slate-900 font-fredoka">
                {currentLayer.name} — <span className="text-cyan-700">{currentLayer.role}</span>
              </h3>
            </div>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              {currentLayer.description}
            </p>
            <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 flex items-start gap-3 mt-3">
              <Info className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <p className="text-xs sm:text-sm text-sky-900">
                <strong>Catatan Penting:</strong> {currentLayer.secret}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Fungsi Utama Gigi */}
      {activeTab === 'functions' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card-soft-3d rounded-3xl p-6 space-y-3 text-center">
            <div className="w-16 h-16 rounded-2xl bg-sky-100 text-3xl mx-auto flex items-center justify-center animate-float">
              🍎
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-fredoka">
              1. Mengunyah Makanan
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Gigi menghancurkan buah, nasi, dan sayur agar perut kita mudah mencerna nutrisi sehingga tubuh tumbuh sehat, tinggi, dan bertenaga!
            </p>
          </div>

          <div className="card-soft-3d rounded-3xl p-6 space-y-3 text-center">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 text-3xl mx-auto flex items-center justify-center animate-float-delayed">
              🗣️
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-fredoka">
              2. Berbicara Jelas
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Lidah dan bibir kita menekan gigi saat melafalkan huruf seperti <strong>S, T, D,</strong> dan <strong>F</strong>. Tanpa gigi, suara kita akan cadel!
            </p>
          </div>

          <div className="card-soft-3d rounded-3xl p-6 space-y-3 text-center">
            <div className="w-16 h-16 rounded-2xl bg-rose-100 text-3xl mx-auto flex items-center justify-center animate-float">
              😊
            </div>
            <h3 className="text-lg font-bold text-slate-900 font-fredoka">
              3. Senyuman Percaya Diri
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Gigi yang putih dan bersih membuat wajah kita tampak ceria, ramah, dan membuat teman-teman senang tersenyum bersama kita!
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
