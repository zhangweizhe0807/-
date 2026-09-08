import React from 'react';
import { ELECTION_INFO } from '../data/candidateData';
import { Heart, Sparkles, MapPin } from 'lucide-react';

interface FooterProps {
  onOpenJoinModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenJoinModal }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 py-12 border-t border-stone-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-stone-800">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center font-bold text-sm font-serif-tc">
                40
              </span>
              <span className="text-base sm:text-lg font-bold font-serif-tc text-white">
                {ELECTION_INFO.institute}
              </span>
            </div>
            <p className="text-xs text-stone-400 font-serif-tc max-w-xl">
              第40屆城鄉所學生會正副會長候選人：碩一 麻筱祺 × 碩一 李誡。
              <br />
              「因為學著批判，所以掌握自由；因為練習反思，所以懂得活潑。」
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://my.ntu.edu.tw/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-amber-300 border border-stone-700 text-xs font-semibold transition-colors"
            >
              <span>5/27 MyNTU 線上投票</span>
              <span>↗</span>
            </a>

            <button
              onClick={onOpenJoinModal}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors shadow-xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>私訊成為團隊夥伴</span>
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-stone-400" />
            <span>台北市大安區羅斯福路四段1號・台大工學院建築與城鄉研究所</span>
          </div>

          <div className="font-mono text-[11px] text-stone-400">
            © 第40屆城鄉所學會正副會長選舉候選人文宣｜麻筱祺＆李誡
          </div>
        </div>
      </div>
    </footer>
  );
};
