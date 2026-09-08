import React from 'react';
import { VisionPillar } from '../types';
import { X, Quote, MapPin } from 'lucide-react';

interface ImageInspectModalProps {
  pillar: VisionPillar | null;
  onClose: () => void;
}

export const ImageInspectModal: React.FC<ImageInspectModalProps> = ({ pillar, onClose }) => {
  if (!pillar) return null;

  const currentImg = pillar.customImageUrl || pillar.defaultImageUrl;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-xs animate-in fade-in">
      <div className="bg-stone-900 border border-stone-800 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl relative text-stone-100 flex flex-col">
        {/* Header */}
        <div className="p-4 bg-stone-950/90 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs px-2 py-0.5 rounded bg-amber-500 text-stone-950 font-bold">
              {pillar.policyNumber || `圖 ${pillar.numberText}`}
            </span>
            <span className="font-bold text-sm sm:text-base font-serif-tc text-stone-100">
              {pillar.title}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Large Image Container */}
        <div className="relative bg-black flex items-center justify-center max-h-[55vh] sm:max-h-[60vh] overflow-hidden">
          <img
            src={currentImg}
            alt={pillar.title}
            referrerPolicy="no-referrer"
            className="max-h-[55vh] sm:max-h-[60vh] w-auto object-contain"
          />
        </div>

        {/* Details & Quote */}
        <div className="p-5 sm:p-6 bg-stone-900 border-t border-stone-800 space-y-3">
          {pillar.officialFlyerQuote && (
            <div className="p-3 bg-amber-950/40 border-l-2 border-amber-500 rounded-r-md text-xs sm:text-sm text-amber-200 font-sans leading-relaxed whitespace-pre-line">
              <span className="font-bold text-amber-400 block text-[11px] uppercase tracking-wider mb-1">
                📌 候選人文宣核心字句
              </span>
              {pillar.officialFlyerQuote}
            </div>
          )}

          {pillar.flyerPhotoDescription && (
            <div className="text-xs text-stone-400 font-sans">
              <strong className="text-stone-300">畫面焦點：</strong>{pillar.flyerPhotoDescription}
            </div>
          )}

          <p className="text-xs sm:text-sm text-stone-300 font-serif-tc leading-relaxed">
            {pillar.summary}
          </p>

          {pillar.flyerTags && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {pillar.flyerTags.map((tag) => (
                <span key={tag} className="text-[11px] px-2 py-0.5 rounded bg-stone-800 text-stone-300 border border-stone-700">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="p-3 bg-stone-800/80 rounded-xl border-l-2 border-amber-500 text-xs font-serif-tc text-amber-200 italic">
            {pillar.keyQuote}
          </div>
        </div>
      </div>
    </div>
  );
};
