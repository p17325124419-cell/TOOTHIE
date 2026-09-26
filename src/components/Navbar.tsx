import React, { useState, useEffect } from 'react';
import { NavSection, Badge } from '../types';
import { sound } from '../utils/audio';
import { Volume2, VolumeX, Award, Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentSection: NavSection;
  onNavigate: (section: NavSection) => void;
  badges: Badge[];
  onOpenBadges: () => void;
  progressPercent: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentSection,
  onNavigate,
  badges,
  onOpenBadges,
  progressPercent,
}) => {
  const [isMuted, setIsMuted] = useState(sound.getMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMuted(sound.getMuted());
  }, []);

  const handleToggleSound = () => {
    const nextState = sound.toggleMute();
    setIsMuted(nextState);
    if (!nextState) {
      sound.playPop();
    }
  };

  const navItems: { id: NavSection; label: string; icon: string }[] = [
    { id: 'home', label: 'Beranda', icon: '🏠' },
    { id: 'anatomy', label: 'Kenali Gigi', icon: '🦷' },
    { id: 'brushing', label: 'Cara Sikat', icon: '🪥' },
    { id: 'food', label: 'Makanan', icon: '🍎' },
    { id: 'plaque', label: 'Plak & Karang', icon: '🦠' },
    { id: 'games', label: 'Kuis & Game', icon: '🎮' },
    { id: 'faq', label: 'Tanya FAQ', icon: '❓' },
  ];

  const unlockedCount = badges.filter((b) => b.unlocked).length;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-sky-100 shadow-xs transition-all">
        {/* Learning Journey Mini Progress Bar */}
        <div className="w-full bg-sky-100 h-1.5 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-sky-400 to-emerald-400 transition-all duration-500 ease-out"
            style={{ width: `${Math.max(5, progressPercent)}%` }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Zone 1: Single Text Element Wordmark */}
          <button
            onClick={() => {
              sound.playPop();
              onNavigate('home');
            }}
            className="flex items-center gap-2 group text-left focus:outline-none"
          >
            <span className="text-2xl transform group-hover:scale-110 transition-transform inline-block">
              🦷
            </span>
            <span className="text-2xl font-bold tracking-tight text-cyan-900 group-hover:text-cyan-600 transition-colors font-fredoka">
              Toothie
            </span>
          </button>

          {/* Zone 2: Clean Text Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
            {navItems.map((item) => {
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    sound.playPop();
                    onNavigate(item.id);
                  }}
                  className={`relative py-1.5 px-1 transition-colors hover:text-cyan-600 cursor-pointer ${
                    isActive ? 'text-cyan-700 font-bold' : 'text-slate-600'
                  }`}
                >
                  <span className="mr-1.5">{item.icon}</span>
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              title={isMuted ? 'Nyalakan Suara' : 'Matikan Suara'}
              className="p-2 text-slate-600 hover:text-cyan-600 hover:bg-sky-50 rounded-xl transition-all cursor-pointer border border-sky-100 flex items-center justify-center"
              aria-label="Toggle Sound Effects"
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-slate-400" />
              ) : (
                <Volume2 className="w-5 h-5 text-cyan-600 animate-pulse" />
              )}
            </button>

            {/* Badges Modal Trigger */}
            <button
              onClick={() => {
                sound.playPop();
                onOpenBadges();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-bold text-amber-900 bg-amber-100 hover:bg-amber-200 border border-amber-300 rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>Lencana</span>
              <span className="bg-amber-400/80 text-amber-950 px-1.5 py-0.2 rounded-md font-mono text-xs">
                {unlockedCount}/6
              </span>
            </button>

            {/* Post Test Quick Button (Desktop) */}
            <button
              onClick={() => {
                sound.playPop();
                onNavigate('posttest');
              }}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 text-xs sm:text-sm font-bold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              <span>Post Test</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-sky-50 rounded-xl"
              aria-label="Open navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white/98 border-b border-sky-100 px-4 py-3 shadow-lg space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  sound.playPop();
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium ${
                  currentSection === item.id
                    ? 'bg-cyan-50 text-cyan-800 font-bold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => {
                  sound.playPop();
                  onNavigate('posttest');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 text-center text-sm font-bold text-white bg-cyan-600 rounded-xl shadow-xs"
              >
                🎓 Ikuti Post Test Gigi
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Sticky Bottom Navigation for Easy Thumb Reaching */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-sky-200 py-1.5 px-3 flex items-center justify-around shadow-lg">
        {navItems.slice(0, 5).map((item) => {
          const isActive = currentSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                sound.playPop();
                onNavigate(item.id);
              }}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
                isActive ? 'text-cyan-700 font-bold scale-105' : 'text-slate-500'
              }`}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
