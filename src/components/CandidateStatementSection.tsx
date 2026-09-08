import React, { useState } from 'react';
import { CANDIDATES } from '../data/candidateData';
import { Copy, Check, Quote, BookOpen, Heart, Volume2, ShieldCheck, Compass } from 'lucide-react';

export const CandidateStatementSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'both' | 'xiaoxi' | 'lijie'>('both');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section id="statements" className="py-16 md:py-24 bg-[#faf8f5] border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-amber-800 uppercase mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>兩段不短的話・候選自白與思索</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif-tc text-stone-900">
              誠懇面對彼此，說出真正的想法
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2 font-serif-tc max-w-2xl">
              這是我們在發出選舉公報後，寫給全所同學的真實獨白：關於過去一年的碰撞與收穫，以及對接下來城鄉所日子的承諾。
            </p>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-stone-200/70 p-1 rounded-lg self-start md:self-auto text-xs font-medium text-stone-700">
            <button
              onClick={() => setActiveTab('both')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'both'
                  ? 'bg-white text-stone-950 font-semibold shadow-xs'
                  : 'hover:text-stone-950'
              }`}
            >
              雙人並排閱覽
            </button>
            <button
              onClick={() => setActiveTab('xiaoxi')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'xiaoxi'
                  ? 'bg-white text-stone-950 font-semibold shadow-xs'
                  : 'hover:text-stone-950'
              }`}
            >
              麻筱祺（會長）
            </button>
            <button
              onClick={() => setActiveTab('lijie')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                activeTab === 'lijie'
                  ? 'bg-white text-stone-950 font-semibold shadow-xs'
                  : 'hover:text-stone-950'
              }`}
            >
              李誡（副會長）
            </button>
          </div>
        </div>

        {/* Statements Display */}
        <div className={`grid gap-8 ${activeTab === 'both' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-3xl mx-auto'}`}>
          {CANDIDATES.filter((c) => activeTab === 'both' || activeTab === c.id).map((candidate) => (
            <article
              key={candidate.id}
              id={`statement-${candidate.id}`}
              className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 shadow-xs flex flex-col justify-between relative"
            >
              <div>
                {/* Header info */}
                <div className="flex items-start justify-between gap-4 mb-6 pb-4 border-b border-stone-100">
                  <div className="flex items-center gap-3">
                    <img
                      src={candidate.avatarUrl}
                      alt={candidate.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-full object-cover border border-stone-300 shadow-xs"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 rounded bg-amber-100 text-amber-900 font-semibold">
                          {candidate.role}
                        </span>
                        <span className="text-xs text-stone-500 font-medium">
                          {candidate.grade}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-serif-tc text-stone-900 mt-1">
                        {candidate.name}
                      </h3>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopy(candidate.id, candidate.fullStatement)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-stone-600 hover:text-stone-950 hover:bg-stone-100 border border-stone-200 transition-colors"
                    title="複製候選人全文"
                  >
                    {copiedId === candidate.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">已複製</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>複製全文</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Core Philosophy Callout */}
                <div className="mb-6 p-4 rounded-xl bg-[#f7f5f0] border-l-4 border-stone-800">
                  <div className="flex items-start gap-2.5">
                    <Quote className="w-4 h-4 text-stone-400 shrink-0 mt-1" />
                    <p className="text-sm font-serif-tc font-semibold text-stone-900 leading-relaxed">
                      {candidate.coreQuote}
                    </p>
                  </div>
                </div>

                {/* Full Original Text verbatim */}
                <div className="prose prose-stone max-w-none text-stone-800 text-sm sm:text-base leading-relaxed space-y-4 font-serif-tc">
                  <div className="flex items-center gap-1.5 font-sans font-bold text-xs uppercase tracking-wider text-amber-800">
                    <span>🗣️ 候選宣言正文全文</span>
                  </div>

                  {candidate.fullStatement.split('\n\n').map((paragraph, pIdx) => (
                    <p key={pIdx} className="whitespace-pre-line">
                      {/* Highlight special lines */}
                      {paragraph.includes('因為學著批判，所以掌握自由') ? (
                        <span className="bg-amber-100/70 px-1 py-0.5 rounded font-bold text-stone-950">
                          {paragraph}
                        </span>
                      ) : paragraph.includes('若同學遇到問題，我一定盡自己所能探詢解決問題的方法，至少說出口') ? (
                        <span className="bg-stone-100 px-1 py-0.5 rounded font-bold text-stone-950">
                          {paragraph}
                        </span>
                      ) : (
                        paragraph
                      )}
                    </p>
                  ))}
                </div>

                {/* Key Takeaways */}
                <div className="mt-8 pt-6 border-t border-stone-100">
                  <h4 className="text-xs font-bold font-sans uppercase tracking-wider text-stone-500 mb-3">
                    核心承諾與亮點提要
                  </h4>
                  <div className="grid grid-cols-1 gap-2">
                    {candidate.keyPoints.map((pt, idx) => (
                      <div
                        key={idx}
                        className="text-xs text-stone-700 bg-stone-50 p-2.5 rounded-lg border border-stone-100 flex items-start gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-700 shrink-0 mt-1.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Footer quote note */}
              <div className="mt-8 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 font-mono">
                <span>台大城鄉所第40屆正副會長選舉公報</span>
                <span>{candidate.id === 'xiaoxi' ? '會長候選人 麻筱祺' : '副會長候選人 李誡'}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
