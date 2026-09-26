import React from 'react';
import { NavSection } from '../types';
import { sound } from '../utils/audio';
import { Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (section: NavSection) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="mt-16 bg-white border-t border-sky-100 pt-12 pb-24 lg:pb-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Tagline Card */}
        <div className="bg-gradient-to-r from-sky-400 via-cyan-500 to-teal-500 rounded-3xl p-6 sm:p-8 text-white text-center space-y-3 shadow-sm">
          <span className="text-4xl animate-bounce inline-block">🦷✨</span>
          <h3 className="text-2xl sm:text-3xl font-extrabold font-fredoka">
            Yuk, Rawat Gigimu Setiap Hari!
          </h3>
          <p className="text-xs sm:text-sm text-cyan-50 max-w-md mx-auto">
            "Senyuman cerah berawal dari gigi yang sehat, bersih, dan bebas kuman. Jangan lupa sikat gigi sebelum tidur malam ya!"
          </p>
        </div>

        {/* Footer Navigation Links */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 text-xs sm:text-sm">
          <div>
            <h4 className="font-bold text-slate-900 font-fredoka uppercase tracking-wider text-xs mb-3 text-cyan-800">
              Eksplorasi Materi
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    sound.playPop();
                    onNavigate('anatomy');
                  }}
                  className="hover:text-cyan-600 transition-colors cursor-pointer"
                >
                  🦷 Kenali Gigi & Anatomi
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sound.playPop();
                    onNavigate('brushing');
                  }}
                  className="hover:text-cyan-600 transition-colors cursor-pointer"
                >
                  🪥 Cara Menyikat Gigi 2 Menit
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sound.playPop();
                    onNavigate('food');
                  }}
                  className="hover:text-cyan-600 transition-colors cursor-pointer"
                >
                  🍎 Makanan Sahabat Gigi
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 font-fredoka uppercase tracking-wider text-xs mb-3 text-cyan-800">
              Kesehatan Gigi
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    sound.playPop();
                    onNavigate('plaque');
                  }}
                  className="hover:text-cyan-600 transition-colors cursor-pointer"
                >
                  🦠 Plak & Karang Gigi
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sound.playPop();
                    onNavigate('cavity');
                  }}
                  className="hover:text-cyan-600 transition-colors cursor-pointer"
                >
                  🛡️ Pencegahan Gigi Berlubang
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sound.playPop();
                    onNavigate('faq');
                  }}
                  className="hover:text-cyan-600 transition-colors cursor-pointer"
                >
                  ❓ Tanya Toothie (FAQ)
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 font-fredoka uppercase tracking-wider text-xs mb-3 text-cyan-800">
              Tantangan & Evaluasi
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    sound.playPop();
                    onNavigate('games');
                  }}
                  className="hover:text-cyan-600 transition-colors cursor-pointer"
                >
                  🎮 Mini-Game Basmi Kuman
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sound.playPop();
                    onNavigate('games');
                  }}
                  className="hover:text-cyan-600 transition-colors cursor-pointer"
                >
                  ⭐ Kuis Anak Pintar
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sound.playPop();
                    onNavigate('posttest');
                  }}
                  className="hover:text-cyan-600 transition-colors cursor-pointer"
                >
                  👑 Post Test & Sertifikat
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-slate-900 font-fredoka uppercase tracking-wider text-xs mb-3 text-cyan-800">
              Tentang Aplikasi
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => {
                    sound.playPop();
                    onNavigate('about');
                  }}
                  className="hover:text-cyan-600 transition-colors cursor-pointer"
                >
                  📖 Tujuan & Manfaat Media
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    sound.playPop();
                    onNavigate('about');
                  }}
                  className="hover:text-cyan-600 transition-colors cursor-pointer"
                >
                  📚 Referensi Ilmiah
                </button>
              </li>
              <li>
                <span className="text-slate-400 block pt-1">
                  Target: Anak Usia 6–12 Tahun
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p className="flex items-center gap-1 font-medium">
            <span>Toothie © 2026 — Media Edukasi Kesehatan Gigi dan Mulut Anak</span>
          </p>
          <p className="flex items-center gap-1">
            <span>Dibuat dengan</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>untuk Senyum Sehat Anak Indonesia</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
