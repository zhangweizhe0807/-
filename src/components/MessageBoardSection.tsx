import React, { useState, useEffect } from 'react';
import { EndorsementMessage } from '../types';
import { INITIAL_MESSAGES } from '../data/candidateData';
import { MessageSquare, Heart, Send, Sparkles, Filter, CheckCircle2 } from 'lucide-react';

interface MessageBoardSectionProps {
  onOpenJoinModal: () => void;
}

export const MessageBoardSection: React.FC<MessageBoardSectionProps> = ({ onOpenJoinModal }) => {
  const [messages, setMessages] = useState<EndorsementMessage[]>(INITIAL_MESSAGES);
  const [selectedTag, setSelectedTag] = useState<string>('全部');
  const [authorInput, setAuthorInput] = useState('');
  const [identityInput, setIdentityInput] = useState('碩一同學');
  const [contentInput, setContentInput] = useState('');
  const [tagInput, setTagInput] = useState<EndorsementMessage['tag']>('支持');
  const [submittedToast, setSubmittedToast] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('ntubp_election_messages');
      if (saved) {
        setMessages(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const saveMessages = (newMsgs: EndorsementMessage[]) => {
    setMessages(newMsgs);
    try {
      localStorage.setItem('ntubp_election_messages', JSON.stringify(newMsgs));
    } catch {
      // ignore
    }
  };

  const handleAddMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contentInput.trim()) return;

    const newMsg: EndorsementMessage = {
      id: `msg-${Date.now()}`,
      author: authorInput.trim() || '匿名稱謂城鄉人',
      identity: identityInput || '城鄉所同學',
      content: contentInput.trim(),
      timestamp: '剛剛',
      tag: tagInput,
      likes: 1,
    };

    const updated = [newMsg, ...messages];
    saveMessages(updated);

    setContentInput('');
    setSubmittedToast(true);
    setTimeout(() => setSubmittedToast(false), 3000);
  };

  const handleLike = (id: string) => {
    const updated = messages.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m));
    saveMessages(updated);
  };

  const tagsList = ['全部', '支持', '空間建議', '有意加入', '學術與活動', '溫馨鼓勵'];

  const filteredMessages = selectedTag === '全部'
    ? messages
    : messages.filter((m) => m.tag === selectedTag);

  return (
    <section id="messages" className="py-16 md:py-24 bg-[#fcfbf9] border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-6 border-b border-stone-200 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-amber-800 uppercase mb-2">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>回饋、支持與團隊加入</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif-tc text-stone-900">
              給筱祺與李誡的留言牆
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2 font-serif-tc">
              「希望大家看完後不吝給予我們回饋和支持！若我們當選，也歡迎接下來一年有意願一起努力＆玩樂的夥伴私訊我們。」
            </p>
          </div>

          <button
            onClick={onOpenJoinModal}
            className="self-start md:self-auto flex items-center gap-1.5 px-4 py-2 rounded-lg bg-stone-900 text-stone-50 hover:bg-stone-800 text-xs font-medium transition-all shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>私訊加入團隊管道</span>
          </button>
        </div>

        {/* Message Input Form & Tag Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Left: Input Form */}
          <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-stone-200/90 shadow-xs">
            <h3 className="text-base font-bold text-stone-900 font-serif-tc mb-3 flex items-center gap-2">
              <Send className="w-4 h-4 text-amber-800" />
              <span>留下你的回饋、提問或打氣</span>
            </h3>

            {submittedToast && (
              <div className="mb-4 p-3 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>感謝你的留言！筱祺與李誡都會親自閱讀每一則回饋！</span>
              </div>
            )}

            <form onSubmit={handleAddMessage} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 font-medium mb-1">你的暱稱 / 名字</label>
                  <input
                    type="text"
                    placeholder="例：阿寶、碩一小敏"
                    value={authorInput}
                    onChange={(e) => setAuthorInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-stone-800 focus:outline-hidden focus:border-amber-700"
                  />
                </div>
                <div>
                  <label className="block text-stone-600 font-medium mb-1">身份背景</label>
                  <select
                    value={identityInput}
                    onChange={(e) => setIdentityInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-stone-50 border border-stone-300 text-stone-800 focus:outline-hidden focus:border-amber-700"
                  >
                    <option value="碩一同學">碩一同學</option>
                    <option value="碩二同學">碩二學長姐</option>
                    <option value="博班學長姐">博班學長姐</option>
                    <option value="準碩一新生">準碩一新生</option>
                    <option value="城鄉所友">城鄉所友</option>
                    <option value="友好夥伴">跨所/校外夥伴</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">留言性質</label>
                <div className="flex flex-wrap gap-1.5">
                  {(['支持', '空間建議', '有意加入', '學術與活動', '溫馨鼓勵'] as EndorsementMessage['tag'][]).map(
                    (tag) => (
                      <button
                        type="button"
                        key={tag}
                        onClick={() => setTagInput(tag)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors ${
                          tagInput === tag
                            ? 'bg-stone-900 text-white font-bold'
                            : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                        }`}
                      >
                        #{tag}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">你想說的話或建議</label>
                <textarea
                  rows={4}
                  required
                  placeholder="寫下對筱祺、李誡的鼓勵，或者對公館樓空間、課程合作、社群活動的想法..."
                  value={contentInput}
                  onChange={(e) => setContentInput(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-stone-50 border border-stone-300 text-stone-800 text-xs focus:outline-hidden focus:border-amber-700 resize-none font-sans"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-50 font-medium text-xs shadow-xs transition-colors flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-amber-300" />
                <span>送出留言與支持</span>
              </button>
            </form>
          </div>

          {/* Right: Message Stream */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            {/* Tag Filters */}
            <div className="flex items-center gap-1.5 flex-wrap mb-4 pb-2 border-b border-stone-200/80">
              <span className="text-xs text-stone-500 font-mono mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" />
                篩選：
              </span>
              {tagsList.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    selectedTag === tag
                      ? 'bg-amber-900 text-white font-semibold'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* List */}
            <div className="space-y-3.5 max-h-[440px] overflow-y-auto pr-1">
              {filteredMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-4 rounded-xl bg-white border border-stone-200/80 shadow-2xs hover:border-stone-300 transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-900 font-serif-tc">
                        {msg.author}
                      </span>
                      <span className="text-[11px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded">
                        {msg.identity}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200/50">
                        #{msg.tag}
                      </span>
                      <span className="text-[10px] text-stone-400 font-mono">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 font-serif-tc leading-relaxed mb-3">
                    {msg.content}
                  </p>

                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => handleLike(msg.id)}
                      className="flex items-center gap-1 text-xs text-stone-500 hover:text-red-600 transition-colors p-1"
                      title="覺得這則留言很棒"
                    >
                      <Heart className="w-3.5 h-3.5 text-red-500 fill-red-100" />
                      <span className="font-mono text-[11px]">{msg.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
