import React from 'react';

// Image generated via tool
const TOOTHIE_HERO_IMG = '/src/assets/images/toothie_hero_mascot_1790412271584.jpg';

interface ToothieMascotProps {
  expression?: 'happy' | 'superhero' | 'thinking' | 'brushing' | 'excited' | 'proud';
  message?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ToothieMascot: React.FC<ToothieMascotProps> = ({
  expression = 'happy',
  message,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28 md:w-36 md:h-36',
    lg: 'w-44 h-44 md:w-56 md:h-56',
  };

  const getEmojiBadge = () => {
    switch (expression) {
      case 'superhero':
        return '🦸‍♂️';
      case 'brushing':
        return '🪥';
      case 'thinking':
        return '💡';
      case 'excited':
        return '✨';
      case 'proud':
        return '🏆';
      default:
        return '🦷';
    }
  };

  return (
    <div className={`relative flex items-center gap-3 ${className}`}>
      {/* 3D Mascot Avatar Container */}
      <div className="relative group shrink-0">
        {/* Glow backdrop */}
        <div className="absolute -inset-2 bg-gradient-to-r from-cyan-300 via-sky-200 to-teal-300 rounded-full blur-md opacity-60 group-hover:opacity-90 transition-opacity animate-pulse" />
        
        {/* Mascot frame */}
        <div
          className={`${sizeClasses[size]} relative rounded-3xl overflow-hidden p-1 bg-gradient-to-b from-white via-sky-50 to-cyan-100 shadow-lg border-2 border-white`}
          style={{
            boxShadow: '0 10px 25px -5px rgba(6, 182, 212, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.8)',
          }}
        >
          <img
            src={TOOTHIE_HERO_IMG}
            alt="Toothie si Gigi Pahlawan Sehat"
            className="w-full h-full object-cover rounded-2xl animate-float"
            referrerPolicy="no-referrer"
          />

          {/* Superhero badge mini emoji */}
          <span className="absolute bottom-1 right-1 bg-white/95 backdrop-blur-sm rounded-full w-7 h-7 flex items-center justify-center text-sm shadow-md border border-cyan-100">
            {getEmojiBadge()}
          </span>
        </div>
      </div>

      {/* Mascot Speech Bubble if message provided */}
      {message && (
        <div className="relative bg-white/95 backdrop-blur-md rounded-2xl px-4 py-3 shadow-md border-2 border-sky-100 text-[#1E3A5F] max-w-xs md:max-w-sm text-sm md:text-base leading-relaxed animate-wiggle">
          {/* Bubble Pointer triangle */}
          <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-r-8 border-r-white border-b-8 border-b-transparent" />
          <p className="font-semibold text-cyan-800 text-xs uppercase tracking-wider mb-0.5">
            Toothie Berkata:
          </p>
          <p className="text-slate-700 font-medium">{message}</p>
        </div>
      )}
    </div>
  );
};
