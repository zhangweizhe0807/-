import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { CandidateStatementSection } from './components/CandidateStatementSection';
import { FourVisionsSection } from './components/FourVisionsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { MessageBoardSection } from './components/MessageBoardSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { JoinTeamModal } from './components/JoinTeamModal';
import { ImageInspectModal } from './components/ImageInspectModal';
import { VisionPillar } from './types';
import { Sparkles, MessageCircle } from 'lucide-react';

export default function App() {
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [inspectPillar, setInspectPillar] = useState<VisionPillar | null>(null);

  return (
    <div className="min-h-screen bg-[#fcfbf9] text-stone-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900">
      {/* Navigation Bar */}
      <Navbar onOpenJoinModal={() => setIsJoinModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Hero Cover & Summary */}
        <HeroSection onOpenJoinModal={() => setIsJoinModalOpen(true)} />

        {/* The Two Long Statements (兩段不短的話) */}
        <CandidateStatementSection />

        {/* Four Visual Stories & Vision Pillars (四張圖與願景) */}
        <FourVisionsSection onInspectImage={(pillar) => setInspectPillar(pillar)} />

        {/* Credentials & Experiences (經歷與參酌) */}
        <ExperienceSection />

        {/* Message & Endorsement Wall (支持與留言牆) */}
        <MessageBoardSection onOpenJoinModal={() => setIsJoinModalOpen(true)} />

        {/* FAQs */}
        <FAQSection />
      </main>

      {/* Floating Action Button for Quick Message / Join */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-2">
        <button
          onClick={() => setIsJoinModalOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-stone-900 text-stone-100 hover:bg-stone-800 shadow-lg hover:shadow-xl transition-all active:scale-95 text-xs font-semibold"
        >
          <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
          <span className="hidden sm:inline">加入團隊 / 私訊我們</span>
          <span className="sm:hidden">加入團隊</span>
        </button>
      </div>

      {/* Modals */}
      <JoinTeamModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />

      <ImageInspectModal
        pillar={inspectPillar}
        onClose={() => setInspectPillar(null)}
      />

      {/* Footer */}
      <Footer onOpenJoinModal={() => setIsJoinModalOpen(true)} />
    </div>
  );
}
