import React, { useState } from 'react';
import { FAQS } from '../data/candidateData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faqs" className="py-16 md:py-24 bg-[#faf8f5] border-b border-stone-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-amber-800 uppercase mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>選舉常見提問與理念釐清</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-serif-tc text-stone-900">
            你可能想知道的事（Q&A）
          </h2>
          <p className="text-sm text-stone-600 mt-2 font-serif-tc">
            關於搭擋默契、非典型社交特質、公館樓空間因應與團隊招募的真誠解答。
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-stone-200/90 overflow-hidden shadow-2xs transition-colors"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-stone-50/80 transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-stone-900 font-serif-tc">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-amber-800' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 border-t border-stone-100 text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
