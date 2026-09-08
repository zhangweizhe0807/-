import React, { useState } from 'react';
import { X, Sparkles, Send, Copy, Check, MessageCircle, Mail, UserCheck } from 'lucide-react';

interface JoinTeamModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinTeamModal: React.FC<JoinTeamModalProps> = ({ isOpen, onClose }) => {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [interest, setInterest] = useState('空間與生活營運');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const copyToClipboard = (type: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim()) return;

    try {
      const existing = JSON.parse(localStorage.getItem('ntubp_join_team_requests') || '[]');
      existing.push({
        name,
        contact,
        interest,
        note,
        timestamp: new Date().toLocaleString(),
      });
      localStorage.setItem('ntubp_join_team_requests', JSON.stringify(existing));
    } catch {
      // ignore
    }

    setFormSent(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#fcfbf9] rounded-2xl border border-stone-200 w-full max-w-lg overflow-hidden shadow-2xl relative animate-in zoom-in-95">
        {/* Modal Header */}
        <div className="p-6 bg-stone-900 text-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-md bg-amber-600 text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base font-serif-tc">
                成為團隊的一份子｜私訊筱祺或李誡
              </h3>
              <p className="text-xs text-stone-300">
                一起努力＆玩樂，陪伴第40屆城鄉所的每一步
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-stone-400 hover:text-white rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[80vh] overflow-y-auto space-y-6 text-xs sm:text-sm">
          {/* Candidates Quote */}
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/70 text-amber-900 font-serif-tc text-xs leading-relaxed">
            「若我們當選，也歡迎接下來一年有意願一起努力＆玩樂的夥伴可以私訊我或李誡，成為團隊的一份子。無論是活動策劃、空間改造、權益發聲，或是單純想一起吃宵夜討論文本，都非常歡迎！」
          </div>

          {/* Quick Direct Contact Cards */}
          <div className="space-y-2">
            <div className="text-xs font-bold text-stone-700 uppercase tracking-wider">
              直接私訊候選人
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="p-3 bg-white rounded-xl border border-stone-200 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-stone-900 font-serif-tc">麻筱祺（會長）</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">台大城鄉所碩一</div>
                </div>
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-stone-100">
                  <span className="font-mono text-[11px] text-stone-600">筱祺 Facebook / IG</span>
                  <button
                    onClick={() => copyToClipboard('xiaoxi', '麻筱祺 (NTUBP M1)')}
                    className="flex items-center gap-1 text-[11px] text-amber-800 hover:text-amber-950 font-medium"
                  >
                    {copiedType === 'xiaoxi' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedType === 'xiaoxi' ? '已複製' : '複製稱謂'}</span>
                  </button>
                </div>
              </div>

              <div className="p-3 bg-white rounded-xl border border-stone-200 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-bold text-stone-900 font-serif-tc">李誡（副會長）</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">台大城鄉所碩一</div>
                </div>
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-stone-100">
                  <span className="font-mono text-[11px] text-stone-600">李誡 Facebook / IG</span>
                  <button
                    onClick={() => copyToClipboard('lijie', '李誡 (NTUBP M1)')}
                    className="flex items-center gap-1 text-[11px] text-amber-800 hover:text-amber-950 font-medium"
                  >
                    {copiedType === 'lijie' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedType === 'lijie' ? '已複製' : '複製稱謂'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Sign Up Form */}
          <div className="pt-2 border-t border-stone-200">
            <div className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
              或者留下你的意願，讓我們主動聯繫你！
            </div>

            {formSent ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-bold">收到了！謝謝你願意加入城鄉所大家庭！</p>
                  <p className="text-[11px] text-emerald-700 mt-0.5">筱祺和李誡會盡快透過你留下的聯絡方式和你碰面聊聊！</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="你的姓名 / 暱稱"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs text-stone-900"
                  />
                </div>

                <div>
                  <input
                    type="text"
                    required
                    placeholder="聯絡方式（Email / LINE ID / IG）"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs text-stone-900"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 text-[11px] font-medium mb-1">感興趣的方向</label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs text-stone-900"
                  >
                    <option value="空間與公館樓生活營運">空間與公館樓生活營運</option>
                    <option value="社群小聚與讀書會企劃">社群小聚與讀書會企劃</option>
                    <option value="學生權益倡議與校務發聲">學生權益倡議與校務發聲</option>
                    <option value="新生迎新與生活指引手冊">新生迎新與生活指引手冊</option>
                    <option value="一起玩樂＆吃宵夜聊聊天">一起努力＆玩樂＆吃宵夜聊聊天！</option>
                  </select>
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="有想特別跟筱祺或李誡說的話嗎？（選填）"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-white border border-stone-300 text-xs text-stone-900 resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-lg bg-amber-800 hover:bg-amber-900 text-white font-medium text-xs shadow-xs transition-colors"
                >
                  送出加入意向
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
