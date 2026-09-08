import React, { useState, useEffect, useRef } from 'react';
import { VISION_PILLARS } from '../data/candidateData';
import { VisionPillar } from '../types';
import { Eye, Upload, RotateCcw, Check, Sparkles, Image as ImageIcon, PlusCircle, AlertCircle } from 'lucide-react';

interface FourVisionsSectionProps {
  onInspectImage: (pillar: VisionPillar) => void;
}

export const FourVisionsSection: React.FC<FourVisionsSectionProps> = ({ onInspectImage }) => {
  const [pillars, setPillars] = useState<VisionPillar[]>(VISION_PILLARS);
  const [editingPillarId, setEditingPillarId] = useState<number | null>(null);
  const [customUrlInput, setCustomUrlInput] = useState('');
  const [displayMode, setDisplayMode] = useState<'detailed' | 'flyer'>('flyer');
  const [dragOverPillarId, setDragOverPillarId] = useState<number | null>(null);
  const batchFileInputRef = useRef<HTMLInputElement>(null);

  // Load any saved custom photos from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('ntubp_custom_vision_images');
      if (saved) {
        const customMap: Record<number, string> = JSON.parse(saved);
        setPillars((prev) =>
          prev.map((p) => (customMap[p.id] ? { ...p, customImageUrl: customMap[p.id] } : p))
        );
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSaveCustomImage = (pillarId: number, url: string) => {
    if (!url.trim()) return;
    const updated = pillars.map((p) => (p.id === pillarId ? { ...p, customImageUrl: url } : p));
    setPillars(updated);

    try {
      const customMap: Record<number, string> = {};
      updated.forEach((p) => {
        if (p.customImageUrl) customMap[p.id] = p.customImageUrl;
      });
      localStorage.setItem('ntubp_custom_vision_images', JSON.stringify(customMap));
    } catch {
      // ignore
    }

    setEditingPillarId(null);
    setCustomUrlInput('');
  };

  const handleResetImage = (pillarId: number) => {
    const updated = pillars.map((p) => (p.id === pillarId ? { ...p, customImageUrl: undefined } : p));
    setPillars(updated);

    try {
      const customMap: Record<number, string> = {};
      updated.forEach((p) => {
        if (p.customImageUrl) customMap[p.id] = p.customImageUrl;
      });
      localStorage.setItem('ntubp_custom_vision_images', JSON.stringify(customMap));
    } catch {
      // ignore
    }
  };

  const handleResetAllImages = () => {
    const updated = pillars.map((p) => ({ ...p, customImageUrl: undefined }));
    setPillars(updated);
    try {
      localStorage.removeItem('ntubp_custom_vision_images');
    } catch {
      // ignore
    }
  };

  const handleFileUpload = (pillarId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        handleSaveCustomImage(pillarId, reader.result);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleFileDrop = (pillarId: number, e: React.DragEvent) => {
    e.preventDefault();
    setDragOverPillarId(null);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        handleSaveCustomImage(pillarId, reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  // Batch upload: user selects multiple images at once
  const handleBatchUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] = e.target.files ? Array.from(e.target.files) : [];
    if (files.length === 0) return;

    const fileMap: Record<number, string> = {};
    let loadedCount = 0;

    files.slice(0, 4).forEach((file, index) => {
      const pillarId = pillars[index]?.id;
      if (!pillarId) return;

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          fileMap[pillarId] = reader.result;
          loadedCount++;

          if (loadedCount === Math.min(files.length, 4)) {
            setPillars((prev) =>
              prev.map((p) => (fileMap[p.id] ? { ...p, customImageUrl: fileMap[p.id] } : p))
            );

            try {
              const currentSaved = localStorage.getItem('ntubp_custom_vision_images');
              const currentMap = currentSaved ? JSON.parse(currentSaved) : {};
              const merged = { ...currentMap, ...fileMap };
              localStorage.setItem('ntubp_custom_vision_images', JSON.stringify(merged));
            } catch {
              // ignore
            }
          }
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const customImagesCount = pillars.filter((p) => p.customImageUrl).length;

  return (
    <section id="visions" className="py-16 md:py-24 bg-[#fcfbf9] border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-stone-200 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-amber-800 uppercase mb-2">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>核心政見與文宣四圖</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif-tc text-stone-900">
              四張圖，訴說接下來一年我們想做的事
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2 font-serif-tc leading-relaxed">
              以所學會的位置和資源，我們不作空泛承諾。這四張圖記錄了我們對社群、學習空間、意見管道與日常陪伴的真實規劃。
            </p>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center bg-stone-200/80 p-1 rounded-lg self-start md:self-auto text-xs font-medium text-stone-700">
            <button
              onClick={() => setDisplayMode('flyer')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                displayMode === 'flyer'
                  ? 'bg-amber-700 text-white font-semibold shadow-xs'
                  : 'hover:text-stone-950'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>文宣拼貼視覺</span>
            </button>
            <button
              onClick={() => setDisplayMode('detailed')}
              className={`px-3 py-1.5 rounded-md transition-all flex items-center gap-1.5 ${
                displayMode === 'detailed'
                  ? 'bg-white text-stone-950 font-semibold shadow-xs'
                  : 'hover:text-stone-950'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>政見詳細條目</span>
            </button>
          </div>
        </div>

        {/* Quick Batch Upload Bar */}
        <div className="mb-8 p-4 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-xs">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-stone-900 font-serif-tc">
                  直接換上您的文宣照片
                </span>
                {customImagesCount > 0 && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold border border-emerald-200">
                    已套用 {customImagesCount}/4 張自訂照
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-600 mt-0.5">
                可點擊下方按鈕一次選取多張圖檔，或直接將照片拖曳至對應卡片上替換。
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <input
              type="file"
              ref={batchFileInputRef}
              accept="image/*"
              multiple
              onChange={handleBatchUpload}
              className="hidden"
            />
            <button
              onClick={() => batchFileInputRef.current?.click()}
              className="flex-1 sm:flex-none px-4 py-2 bg-amber-700 hover:bg-amber-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>點此批次選取照片</span>
            </button>

            {customImagesCount > 0 && (
              <button
                onClick={handleResetAllImages}
                className="px-3 py-2 bg-stone-200 hover:bg-stone-300 text-stone-700 rounded-xl text-xs font-medium transition-colors flex items-center gap-1"
                title="還原所有圖片至預設版"
              >
                <RotateCcw className="w-3 h-3" />
                <span>還原全部</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar) => {
            const currentImg = pillar.customImageUrl || pillar.defaultImageUrl;
            const isDragging = dragOverPillarId === pillar.id;

            if (displayMode === 'flyer') {
              return (
                <div
                  key={pillar.id}
                  id={`vision-flyer-${pillar.id}`}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOverPillarId(pillar.id);
                  }}
                  onDragLeave={() => setDragOverPillarId(null)}
                  onDrop={(e) => handleFileDrop(pillar.id, e)}
                  className={`bg-[#f5f2eb] rounded-2xl border-2 transition-all flex flex-col justify-between relative overflow-hidden group p-5 sm:p-6 shadow-sm hover:shadow-md ${
                    isDragging
                      ? 'border-amber-500 ring-4 ring-amber-500/20 bg-amber-50/50'
                      : 'border-stone-300'
                  }`}
                >
                  {/* Decorative tape at top-center */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-amber-200/80 -rotate-1 border border-amber-300/60 shadow-xs pointer-events-none z-20 backdrop-blur-xs flex items-center justify-center">
                    <span className="text-[10px] font-mono font-bold text-amber-900 tracking-wider">
                      {pillar.policyNumber || `圖 ${pillar.numberText}`}
                    </span>
                  </div>

                  {/* Drop Overlay */}
                  {isDragging && (
                    <div className="absolute inset-0 bg-amber-900/40 backdrop-blur-xs z-30 flex flex-col items-center justify-center text-white p-4 animate-in fade-in">
                      <Upload className="w-10 h-10 mb-2 animate-bounce" />
                      <span className="font-bold text-base">放開即可套用為此張卡片文宣照！</span>
                    </div>
                  )}

                  <div>
                    {/* Visual Flyer Header Bar */}
                    <div className="flex items-center justify-between mt-2 mb-4">
                      <div className="flex items-center gap-2">
                        {pillar.id === 1 && (
                          <span className="px-2.5 py-1 rounded bg-amber-600 text-white font-bold text-xs tracking-wider shadow-xs">
                            5/27 線上投票
                          </span>
                        )}
                        {pillar.id === 2 && (
                          <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center font-black text-xl shadow-md border-2 border-white -rotate-6">
                            2
                          </div>
                        )}
                        {pillar.id === 3 && (
                          <div className="flex items-center gap-1">
                            <div className="w-9 h-9 rounded-full bg-teal-700 text-white flex items-center justify-center font-black text-lg shadow-md border-2 border-white -rotate-6">
                              3
                            </div>
                            <div className="w-9 h-9 rounded-full bg-amber-700 text-white flex items-center justify-center font-black text-lg shadow-md border-2 border-white rotate-6">
                              5
                            </div>
                          </div>
                        )}
                        {pillar.id === 4 && (
                          <div className="w-10 h-10 rounded-lg bg-sky-700 text-white flex items-center justify-center font-black text-xl shadow-md border-2 border-white rotate-3">
                            4
                          </div>
                        )}
                        <span className="text-xs font-mono font-bold text-stone-600">
                          {pillar.caption}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => onInspectImage(pillar)}
                          className="p-1.5 rounded-md bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs transition-colors"
                          title="放大檢視"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        
                        {/* Direct File Picker Label Button */}
                        <label
                          className="p-1.5 rounded-md bg-amber-200 hover:bg-amber-300 text-amber-900 text-xs transition-colors cursor-pointer flex items-center gap-1"
                          title="點此選擇電腦照片替換"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span className="text-[10px] font-bold">換照片</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleFileUpload(pillar.id, e)}
                            className="hidden"
                          />
                        </label>

                        {pillar.customImageUrl && (
                          <button
                            onClick={() => handleResetImage(pillar.id)}
                            className="p-1.5 rounded-md bg-stone-200 hover:bg-red-200 text-stone-600 hover:text-red-700 text-xs transition-colors"
                            title="還原為預設文宣圖"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Headline Banner */}
                    <div className="mb-4">
                      <h3 className="text-xl sm:text-2xl font-black font-serif-tc text-stone-900 leading-tight">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-stone-700 mt-1 font-medium font-serif-tc">
                        {pillar.subTitle}
                      </p>
                    </div>

                    {/* Image Snapshot Container */}
                    <div className="relative rounded-xl overflow-hidden border-2 border-stone-800/20 mb-4 bg-stone-100 shadow-inner">
                      <img
                        src={currentImg}
                        alt={pillar.title}
                        referrerPolicy="no-referrer"
                        className="w-full aspect-16/10 object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                      {pillar.customImageUrl ? (
                        <div className="absolute top-2 right-2 bg-emerald-800/90 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-xs">
                          <Check className="w-3 h-3" />
                          <span>已套用自訂照片</span>
                        </div>
                      ) : (
                        pillar.flyerPhotoDescription && (
                          <div className="absolute bottom-0 inset-x-0 bg-stone-950/80 backdrop-blur-xs text-white p-2 text-[11px] leading-snug flex items-center gap-1.5">
                            <span className="text-amber-400 shrink-0 font-mono">📷 實景捕捉:</span>
                            <span className="truncate">{pillar.flyerPhotoDescription}</span>
                          </div>
                        )
                      )}
                    </div>

                    {/* Official Flyer Quote Note */}
                    {pillar.officialFlyerQuote && (
                      <div className="bg-white/90 border border-stone-300 rounded-xl p-3.5 shadow-xs mb-4">
                        <div className="text-[11px] font-mono font-bold text-amber-900 uppercase mb-1 flex items-center gap-1">
                          <span>📌 文宣原文核心條目</span>
                        </div>
                        <div className="text-xs sm:text-sm text-stone-900 font-sans font-medium whitespace-pre-line leading-relaxed">
                          {pillar.officialFlyerQuote}
                        </div>
                      </div>
                    )}

                    {/* Tags */}
                    {pillar.flyerTags && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {pillar.flyerTags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-stone-200/80 text-stone-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Footer quote */}
                  <div className="pt-3 border-t border-stone-300/80 text-xs font-serif-tc text-stone-700 italic flex items-center justify-between">
                    <span>{pillar.keyQuote}</span>
                  </div>
                </div>
              );
            }

            return (
              <div
                key={pillar.id}
                id={`vision-card-${pillar.id}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverPillarId(pillar.id);
                }}
                onDragLeave={() => setDragOverPillarId(null)}
                onDrop={(e) => handleFileDrop(pillar.id, e)}
                className={`bg-white rounded-2xl border transition-all flex flex-col justify-between group overflow-hidden shadow-xs hover:shadow-md ${
                  isDragging
                    ? 'border-amber-500 ring-4 ring-amber-500/20 bg-amber-50/30'
                    : 'border-stone-200/90'
                }`}
              >
                <div>
                  {/* Visual Image Container */}
                  <div className="relative aspect-16/10 overflow-hidden bg-stone-100">
                    <img
                      src={currentImg}
                      alt={pillar.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    />

                    {/* Overlay badge with number */}
                    <div className="absolute top-3 left-3 bg-stone-900/85 backdrop-blur-xs text-stone-100 text-xs font-mono font-bold px-2.5 py-1 rounded-sm flex items-center gap-1.5">
                      <span>{pillar.policyNumber || `圖 ${pillar.numberText}`}</span>
                    </div>

                    {pillar.customImageUrl && (
                      <div className="absolute top-3 right-3 bg-emerald-800/90 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 shadow-xs">
                        <Check className="w-3 h-3" />
                        <span>已套用自訂照</span>
                      </div>
                    )}

                    {/* Action buttons overlay */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-95">
                      <button
                        onClick={() => onInspectImage(pillar)}
                        className="p-2 rounded-lg bg-stone-900/80 hover:bg-stone-900 text-white text-xs backdrop-blur-xs transition-colors flex items-center gap-1"
                        title="放大檢視大圖"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span className="text-[11px]">全螢幕</span>
                      </button>

                      <label
                        className="p-2 rounded-lg bg-amber-700 hover:bg-amber-800 text-white text-xs backdrop-blur-xs transition-colors flex items-center gap-1 cursor-pointer"
                        title="選擇電腦照片更換"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span className="text-[11px]">換照片</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(pillar.id, e)}
                          className="hidden"
                        />
                      </label>

                      {pillar.customImageUrl && (
                        <button
                          onClick={() => handleResetImage(pillar.id)}
                          className="p-2 rounded-lg bg-stone-800/80 hover:bg-red-800 text-white text-xs backdrop-blur-xs transition-colors"
                          title="還原預設圖"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-amber-800 text-amber-50">
                          {pillar.policyNumber || `圖 ${pillar.numberText}`}
                        </span>
                        <span className="text-xs text-stone-500 font-sans">
                          {pillar.caption}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-stone-400">
                        VISION #{pillar.numberText}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-serif-tc text-stone-900 mb-1">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-serif-tc text-stone-600 font-medium mb-3">
                      {pillar.subTitle}
                    </p>

                    {/* Official Flyer Quote Banner */}
                    {pillar.officialFlyerQuote && (
                      <div className="mb-4 p-3.5 bg-amber-500/10 border-l-3 border-amber-600 rounded-r-lg">
                        <div className="text-[11px] font-mono font-bold text-amber-900 uppercase mb-1 flex items-center gap-1">
                          <span>📌 文宣原文核心方針</span>
                        </div>
                        <p className="text-xs sm:text-sm font-medium text-stone-900 leading-relaxed font-sans whitespace-pre-line">
                          {pillar.officialFlyerQuote}
                        </p>
                      </div>
                    )}

                    {/* Snapshot scene note */}
                    {pillar.flyerPhotoDescription && (
                      <div className="mb-4 p-2.5 bg-stone-100/80 rounded-lg text-xs text-stone-600 flex items-start gap-2">
                        <span className="shrink-0 text-stone-400">📷</span>
                        <span className="text-[11px] leading-relaxed">
                          <strong className="text-stone-700">文宣畫面：</strong>{pillar.flyerPhotoDescription}
                        </span>
                      </div>
                    )}

                    <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed mb-4">
                      {pillar.summary}
                    </p>

                    {/* Concrete Action Points */}
                    <div className="space-y-2 mb-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                        具體推動項目
                      </h4>
                      {pillar.actionDetails.map((action, aIdx) => (
                        <div
                          key={aIdx}
                          className="bg-stone-50 rounded-lg p-2.5 border border-stone-100 text-xs text-stone-800 leading-relaxed font-sans"
                        >
                          {action}
                        </div>
                      ))}
                    </div>

                    {/* Flyer Tags */}
                    {pillar.flyerTags && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {pillar.flyerTags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-stone-100 text-stone-700 border border-stone-200"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Direct Quote Card */}
                    <div className="p-3 bg-stone-100/70 rounded-lg border-l-2 border-stone-700 text-xs font-serif-tc text-stone-700 italic">
                      {pillar.keyQuote}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
