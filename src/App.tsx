/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { NavSection, Badge } from './types';
import { INITIAL_BADGES } from './data/dentalData';
import { sound } from './utils/audio';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AnatomySection } from './components/AnatomySection';
import { BrushingSection } from './components/BrushingSection';
import { FoodSection } from './components/FoodSection';
import { PlaqueSection } from './components/PlaqueSection';
import { CavitySection } from './components/CavitySection';
import { GamesAndQuizSection } from './components/GamesAndQuizSection';
import { PostTestSection } from './components/PostTestSection';
import { FaqSection } from './components/FaqSection';
import { AboutAndReferencesSection } from './components/AboutAndReferencesSection';
import { BadgesModal } from './components/BadgesModal';
import { Footer } from './components/Footer';
import confetti from 'canvas-confetti';
import { Sparkles, Award } from 'lucide-react';

export default function App() {
  const [currentSection, setCurrentSection] = useState<NavSection>('home');
  const [badgesModalOpen, setBadgesModalOpen] = useState(false);
  const [newlyUnlockedBadge, setNewlyUnlockedBadge] = useState<Badge | null>(null);

  // Persistent Badges
  const [badges, setBadges] = useState<Badge[]>(() => {
    try {
      const saved = localStorage.getItem('toothie_badges');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // fallback
    }
    return INITIAL_BADGES;
  });

  // Persistent Completed Sections for Progress Journey
  const [completedSections, setCompletedSections] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('toothie_completed_sections');
      if (saved) {
        return new Set(JSON.parse(saved));
      }
    } catch {
      // fallback
    }
    return new Set<string>();
  });

  // Save badges whenever changed
  useEffect(() => {
    localStorage.setItem('toothie_badges', JSON.stringify(badges));
  }, [badges]);

  // Save completed sections whenever changed
  useEffect(() => {
    localStorage.setItem(
      'toothie_completed_sections',
      JSON.stringify(Array.from(completedSections))
    );
  }, [completedSections]);

  const handleNavigate = (section: NavSection) => {
    setCurrentSection(section);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMarkComplete = (sectionId: string) => {
    setCompletedSections((prev) => {
      const next = new Set(prev).add(sectionId);
      return next;
    });
  };

  const handleUnlockBadge = (badgeId: string) => {
    setBadges((prevBadges) => {
      const target = prevBadges.find((b) => b.id === badgeId);
      if (!target || target.unlocked) {
        return prevBadges;
      }

      const dateStr = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });

      const updated = prevBadges.map((b) =>
        b.id === badgeId ? { ...b, unlocked: true, unlockedAt: dateStr } : b
      );

      const unlockedItem = updated.find((b) => b.id === badgeId);
      if (unlockedItem) {
        setNewlyUnlockedBadge(unlockedItem);
        sound.playSparkle();
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.3 },
        });

        // Hide notification toast after 5s
        setTimeout(() => {
          setNewlyUnlockedBadge(null);
        }, 5000);
      }

      return updated;
    });
  };

  // Calculate learning journey overall progress percentage
  const totalJourneySteps = 7;
  const progressPercent = Math.min(
    100,
    Math.round((completedSections.size / totalJourneySteps) * 100)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F9FF] text-[#1E3A5F]">
      {/* Top Navbar */}
      <Navbar
        currentSection={currentSection}
        onNavigate={handleNavigate}
        badges={badges}
        onOpenBadges={() => setBadgesModalOpen(true)}
        progressPercent={progressPercent}
      />

      {/* Fresh Badge Celebration Toast */}
      {newlyUnlockedBadge && (
        <div className="fixed top-20 right-4 z-50 animate-bounce">
          <div className="bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 p-4 rounded-2xl shadow-xl border-2 border-white flex items-center gap-3">
            <span className="text-3xl">{newlyUnlockedBadge.icon}</span>
            <div>
              <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-amber-950">
                <Sparkles className="w-3.5 h-3.5" /> Lencana Baru Terbuka!
              </div>
              <p className="font-extrabold text-sm sm:text-base font-fredoka">
                {newlyUnlockedBadge.name}
              </p>
            </div>
            <button
              onClick={() => {
                sound.playPop();
                setBadgesModalOpen(true);
                setNewlyUnlockedBadge(null);
              }}
              className="ml-2 px-3 py-1 bg-white/90 hover:bg-white text-xs font-bold text-slate-900 rounded-xl cursor-pointer"
            >
              Lihat
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {currentSection === 'home' && (
          <HeroSection
            onNavigate={handleNavigate}
            completedSections={completedSections}
          />
        )}

        {currentSection === 'anatomy' && (
          <AnatomySection
            onUnlockBadge={handleUnlockBadge}
            onMarkComplete={handleMarkComplete}
          />
        )}

        {currentSection === 'brushing' && (
          <BrushingSection
            onUnlockBadge={handleUnlockBadge}
            onMarkComplete={handleMarkComplete}
          />
        )}

        {currentSection === 'food' && (
          <FoodSection
            onUnlockBadge={handleUnlockBadge}
            onMarkComplete={handleMarkComplete}
          />
        )}

        {currentSection === 'plaque' && (
          <PlaqueSection
            onUnlockBadge={handleUnlockBadge}
            onMarkComplete={handleMarkComplete}
          />
        )}

        {currentSection === 'cavity' && (
          <CavitySection onMarkComplete={handleMarkComplete} />
        )}

        {currentSection === 'games' && (
          <GamesAndQuizSection
            onUnlockBadge={handleUnlockBadge}
            onMarkComplete={handleMarkComplete}
          />
        )}

        {currentSection === 'posttest' && (
          <PostTestSection
            onUnlockBadge={handleUnlockBadge}
            onMarkComplete={handleMarkComplete}
          />
        )}

        {currentSection === 'faq' && <FaqSection />}

        {currentSection === 'about' && <AboutAndReferencesSection />}
      </main>

      {/* Badges Trophy Room Modal */}
      <BadgesModal
        isOpen={badgesModalOpen}
        onClose={() => setBadgesModalOpen(false)}
        badges={badges}
      />

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
