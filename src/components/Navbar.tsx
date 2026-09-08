import React, { useState, useEffect } from 'react';
import { Menu, X, Users, Compass, BookOpen, MessageSquare, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenJoinModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenJoinModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: '候選宣言', href: '#statements' },
    { label: '四張圖與願景', href: '#visions' },
    { label: '候選人經歷', href: '#experience' },
    { label: '支持留言', href: '#messages' },
    { label: '常見問題', href: '#faqs' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#fcfbf9]/95 backdrop-blur-md border-b border-stone-200/80 shadow-xs py-3'
          : 'bg-[#fcfbf9]/80 backdrop-blur-xs py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        {/* Brand / Election Badge */}
        <a href="#" className="flex items-center gap-3 group text-left">
          <div className="w-10 h-10 rounded-lg bg-stone-900 text-stone-100 flex items-center justify-center font-serif-tc font-bold text-lg shadow-xs group-hover:bg-amber-900 transition-colors">
            40
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium tracking-wider text-amber-800 uppercase bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-sm">
                城鄉所學會正副會長候選
              </span>
            </div>
            <h1 className="text-sm sm:text-base font-bold text-stone-900 font-serif-tc tracking-tight">
              麻筱祺 <span className="text-stone-400 font-sans font-light">×</span> 李誡
            </h1>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-stone-600">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-stone-950 transition-colors hover:underline underline-offset-4 decoration-amber-600/60"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://my.ntu.edu.tw/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-amber-600/10 hover:bg-amber-600/20 text-amber-900 border border-amber-600/30 text-xs font-bold transition-all"
          >
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
            <span>5/27 MyNTU 線上投票</span>
            <span>↗</span>
          </a>

          <button
            id="nav-join-team-btn"
            onClick={onOpenJoinModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-md bg-stone-900 hover:bg-stone-800 text-stone-50 text-sm font-medium transition-all shadow-xs active:scale-98"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>加入團隊 / 私訊我們</span>
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-stone-700 hover:text-stone-950 hover:bg-stone-100 rounded-md transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-stone-200 bg-[#fcfbf9] px-4 pt-2 pb-6 shadow-lg animate-in slide-in-from-top-2">
          <div className="flex flex-col gap-3 pt-2 text-base font-medium text-stone-700">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-stone-100 hover:text-stone-950 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-stone-200">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenJoinModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-md bg-stone-900 text-stone-50 text-sm font-medium shadow-xs"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>加入團隊 / 私訊聊聊</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
