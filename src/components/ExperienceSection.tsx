import React from 'react';
import { CANDIDATES } from '../data/candidateData';
import { Award, GraduationCap, Briefcase, Users, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="py-16 md:py-24 bg-[#faf8f5] border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-amber-800 uppercase mb-2">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>經歷背景與實踐軌跡</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif-tc text-stone-900">
            這些經歷不一定完全適合城鄉所，但供大家參酌
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2 font-serif-tc">
            正如筱祺所言，帶著過往在學生自治、制度倡議與人文社會學系系學會的點滴積累，以及李誡對城鄉所批判動能與田野實踐的深刻反思，我們希望能為所學會注入既務實又充滿活力的能量。
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {CANDIDATES.map((candidate) => (
            <div
              key={candidate.id}
              className="bg-white rounded-2xl border border-stone-200/90 p-6 sm:p-8 shadow-xs flex flex-col justify-between"
            >
              <div>
                {/* Candidate header badge */}
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-stone-100">
                  <img
                    src={candidate.avatarUrl}
                    alt={candidate.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-full object-cover border border-stone-200"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded bg-stone-900 text-stone-100 font-bold">
                        {candidate.role}
                      </span>
                      <span className="text-xs text-stone-500">{candidate.grade}</span>
                    </div>
                    <h3 className="text-xl font-bold font-serif-tc text-stone-900 mt-0.5">
                      {candidate.name} 的經歷紀要
                    </h3>
                  </div>
                </div>

                {/* Experience Items */}
                <div className="space-y-4">
                  {candidate.experiences.map((exp, expIdx) => (
                    <div
                      key={expIdx}
                      className="p-4 rounded-xl bg-stone-50/70 border border-stone-200/60 hover:border-stone-300 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="text-sm font-bold text-stone-900 font-serif-tc flex items-center gap-1.5">
                          <Award className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                          <span>{exp.title}</span>
                        </h4>
                      </div>
                      <div className="text-xs font-medium text-stone-500 mb-2">
                        {exp.organization}
                      </div>
                      {exp.description && (
                        <p className="text-xs text-stone-600 leading-relaxed font-sans">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

                {/* Traits tags */}
                <div className="mt-6 pt-4 border-t border-stone-100">
                  <div className="text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                    夥伴視角中的個人特質
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {candidate.personalTraits.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md bg-stone-100 text-stone-700 text-xs font-medium"
                      >
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Special Note Box */}
              <div className="mt-6 p-3.5 rounded-lg bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 font-serif-tc">
                {candidate.id === 'xiaoxi' ? (
                  <p>
                    💡 <strong>筱祺的話：</strong>「大學曾任陽明交大學生會交通分會會長、福利部長及各校級學代，在系上曾任人社系學會副會長和學術部員，這份經驗讓我不畏懼繁複的制度法規，能實打實為大家解決問題。」
                  </p>
                ) : (
                  <p>
                    💡 <strong>李誡的話：</strong>「這一年參加過運動也將見證公館樓的畢業典禮，正因為學著批判與反思，所以掌握自由與活潑。我想搭建更多管道，讓同學的新奇想法能被組織並落地！」
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
