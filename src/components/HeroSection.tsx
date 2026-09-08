import React from 'react';
import { ELECTION_INFO, CANDIDATES } from '../data/candidateData';
import { ArrowDown, MessageCircle, FileText, CheckCircle2, MapPin, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onOpenJoinModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenJoinModal }) => {
  return (
    <section id="hero" className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-stone-200/80">
      {/* Background Architectural Grid Accent */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(#1c1917 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Top Tagline / Category */}
        <div className="flex flex-wrap items-center gap-2.5 mb-6 text-xs sm:text-sm font-medium text-stone-600">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-stone-900 text-stone-100 font-mono">
            #{ELECTION_INFO.session}城鄉所學會正副會長候選
          </span>
          <span className="hidden sm:inline text-stone-300">•</span>
          <span className="flex items-center gap-1 text-stone-700">
            <MapPin className="w-3.5 h-3.5 text-stone-500" />
            {ELECTION_INFO.institute}
          </span>
        </div>

        {/* Hero Title and Subtitle */}
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-stone-900 font-serif-tc tracking-tight leading-[1.18] mb-6">
            以對話支持社群，<br className="hidden sm:block" />
            以制度經營自由而活潑的學習空間。
          </h1>

          <p className="text-lg sm:text-xl text-stone-700 font-serif-tc leading-relaxed mb-8 max-w-3xl">
            「在城鄉所的第一年裡，經歷了最密切的合作和摩擦，因而學習著溝通藝術與自我管理；
            因為學著批判，所以掌握自由；因為練習反思，所以懂得活潑。」
          </p>
        </div>

        {/* Voting Schedule Alert Banner */}
        <div className="mb-8 p-4 sm:p-5 rounded-xl bg-amber-500/10 border-2 border-amber-600/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3">
            <div className="p-2 rounded-lg bg-amber-600 text-white shrink-0 mt-0.5 sm:mt-0 font-bold font-mono text-sm">
              投票
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-stone-900 font-serif-tc text-base sm:text-lg">
                  5/27（三）10:00 - 17:00
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-700 text-white text-xs font-mono font-semibold">
                  MyNTU 線上投票
                </span>
              </div>
              <p className="text-xs text-stone-600 mt-0.5 font-sans">
                國立臺灣大學學生會／所學會正副會長選舉投票日，請城鄉所同學踴躍登入投票！
              </p>
            </div>
          </div>

          <a
            href="https://my.ntu.edu.tw/"
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 px-4 py-2 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <span>前往 MyNTU 投票</span>
            <span>↗</span>
          </a>
        </div>

        {/* Candidacy Quote / Letter callout */}
        <div className="bg-stone-50/90 border-l-4 border-amber-700/80 p-5 sm:p-6 rounded-r-xl border-t border-r border-b border-stone-200/80 mb-10 max-w-3xl">
          <div className="flex items-start gap-3">
            <span className="text-2xl select-none">🗣️</span>
            <div>
              <p className="text-sm sm:text-base text-stone-800 leading-relaxed font-sans mb-3">
                {ELECTION_INFO.introductionText}
              </p>
              <div className="text-xs text-stone-500 font-mono flex items-center gap-2">
                <span>— 麻筱祺 & 李誡（碩一） 候選人敬上</span>
              </div>
            </div>
          </div>
        </div>

        {/* Candidate Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {CANDIDATES.map((c) => (
            <div
              key={c.id}
              id={`hero-card-${c.id}`}
              className="bg-white rounded-xl border border-stone-200/90 p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-100/40 to-transparent rounded-bl-full pointer-events-none" />
              
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-stone-900 text-stone-100">
                      {c.role}
                    </span>
                    <span className="text-xs font-medium text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                      {c.grade}
                    </span>
                  </div>
                  <span className="text-xs text-amber-800 font-mono tracking-wider font-semibold">
                    #40TH CANDIDATE
                  </span>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={c.avatarUrl}
                    alt={c.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-full object-cover border-2 border-stone-200 shadow-xs group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <h2 className="text-2xl font-bold text-stone-900 font-serif-tc">
                      {c.name}
                    </h2>
                    <p className="text-xs text-stone-600 mt-0.5 font-medium">
                      {c.id === 'xiaoxi' ? '曾任交大學生會長、福利部長、各校級學代' : '空間運動參與、公館樓變遷見證、反思實踐'}
                    </p>
                  </div>
                </div>

                <div className="bg-stone-50 rounded-lg p-3.5 border border-stone-200/60 mb-4">
                  <p className="text-xs sm:text-sm font-serif-tc text-stone-800 italic leading-snug">
                    "{c.coreQuote}"
                  </p>
                </div>

                <ul className="space-y-1.5 text-xs text-stone-600">
                  {c.keyPoints.slice(0, 3).map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-stone-100 flex items-center justify-between text-xs font-medium text-stone-500">
                <a
                  href={`#statement-${c.id}`}
                  className="text-amber-900 hover:text-amber-700 font-semibold flex items-center gap-1 hover:underline"
                >
                  閱讀完整自白與經驗 →
                </a>
                <div className="flex gap-1">
                  {c.personalTraits.slice(0, 2).map((trait) => (
                    <span key={trait} className="bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded text-[11px]">
                      #{trait}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4">
          <a
            href="#statements"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-50 text-sm font-medium transition-all shadow-xs"
          >
            <FileText className="w-4 h-4 text-amber-300" />
            <span>閱讀兩段自白全文</span>
          </a>

          <a
            href="#visions"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm font-medium transition-colors border border-stone-300/80"
          >
            <ArrowDown className="w-4 h-4 text-stone-600" />
            <span>探索四張圖與四大願景</span>
          </a>

          <button
            onClick={onOpenJoinModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-900 text-sm font-medium transition-colors border border-amber-300"
          >
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>成為團隊夥伴 / 私訊交流</span>
          </button>
        </div>
      </div>
    </section>
  );
};
