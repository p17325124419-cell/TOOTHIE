import React from 'react';
import { REFERENCES_LIST } from '../data/dentalData';
import { Sparkles, Target, Users, BookOpen, ExternalLink, Heart, Award } from 'lucide-react';

export const AboutAndReferencesSection: React.FC = () => {
  return (
    <div className="space-y-10 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-500 via-cyan-600 to-sky-600 rounded-3xl p-6 sm:p-8 text-white shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" /> Informasi Media & Referensi
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-fredoka">
            Tentang Media Toothie & Daftar Pustaka 📚
          </h1>
          <p className="text-sm sm:text-base text-cyan-50 max-w-xl">
            Aplikasi media pembelajaran interaktif kesehatan gigi dan mulut berbasis web yang dirancang khusus untuk anak usia 6-12 tahun.
          </p>
        </div>

        <div className="w-20 h-20 rounded-3xl bg-white/10 backdrop-blur-xs flex items-center justify-center text-4xl shadow-inner border border-white/20">
          🦷
        </div>
      </div>

      {/* Grid: Tujuan, Sasaran, Manfaat */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-soft-3d rounded-3xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-cyan-100 text-cyan-800 flex items-center justify-center text-2xl shadow-xs">
            <Target className="w-6 h-6 text-cyan-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-fredoka">
            Tujuan Media
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Meningkatkan literasi, pengetahuan, dan kemandirian anak dalam memelihara kesehatan gigi dan mulut melalui visual animasi 3D, simulasi timer sikat gigi, dan kuis edukasi yang ramah serta menyenangkan.
          </p>
        </div>

        <div className="card-soft-3d rounded-3xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-2xl shadow-xs">
            <Users className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-fredoka">
            Sasaran Pengguna
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Utama: Anak-anak usia 6 hingga 12 tahun (sekolah dasar). Pendamping: Orang tua dan bapak/ibu guru sebagai fasilitator pembiasaan sikat gigi 2 kali sehari di rumah dan di sekolah.
          </p>
        </div>

        <div className="card-soft-3d rounded-3xl p-6 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-2xl shadow-xs">
            <Award className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-lg font-bold text-slate-900 font-fredoka">
            Manfaat Edukatif
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Menghilangkan rasa takut anak terhadap pemeriksaan gigi, membiasakan teknik menyikat gigi yang tepat selama 2 menit penuh, serta menanamkan pola konsumsi makanan bergizi sahabat gigi.
          </p>
        </div>
      </div>

      {/* Panduan Pendamping Orang Tua & Guru */}
      <div className="bg-white rounded-3xl border-2 border-sky-100 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center text-rose-600">
            <Heart className="w-5 h-5 fill-rose-500" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-fredoka">
              Panduan Praktis untuk Orang Tua & Guru
            </h3>
            <p className="text-xs text-slate-500">
              Tips mendampingi anak belajar menggunakan Toothie
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700 leading-relaxed pt-2">
          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 space-y-1">
            <p className="font-bold text-cyan-900">1. Praktikkan Bersama di Kamar Mandi</p>
            <p>
              Buka menu <strong>"Cara Sikat"</strong> dan aktifkan simulasi 2 menit di ponsel sambil mendampingi anak menyikat gigi pada pagi hari setelah sarapan dan malam hari sebelum tidur.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-sky-50 border border-sky-100 space-y-1">
            <p className="font-bold text-cyan-900">2. Berikan Pujian Tanpa Membandingkan</p>
            <p>
              Gunakan sistem lencana pahlawan pada aplikasi sebagai bentuk reward apresiasi positif atas usaha anak menjaga kebersihan giginya.
            </p>
          </div>
        </div>
      </div>

      {/* Daftar Pustaka Ilmiah */}
      <div className="bg-white rounded-3xl border-2 border-sky-100 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-purple-700">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900 font-fredoka">
              Daftar Pustaka & Rujukan Medis
            </h3>
            <p className="text-xs text-slate-500">
              Materi disusun berdasarkan pedoman kesehatan gigi resmi nasional dan internasional:
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {REFERENCES_LIST.map((ref, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl border border-slate-200 hover:border-cyan-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/50"
            >
              <div className="space-y-0.5">
                <h4 className="font-bold text-sm text-slate-900">
                  {ref.title}
                </h4>
                <p className="text-xs text-slate-600">
                  {ref.source} · Tahun {ref.year}
                </p>
              </div>

              <a
                href={ref.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-cyan-700 hover:text-cyan-800 shrink-0 self-start sm:self-auto"
              >
                <span>Buka Sumber</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
