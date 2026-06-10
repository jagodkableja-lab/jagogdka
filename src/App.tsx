/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
// @ts-ignore
import profileImg from './assets/images/profile.jpg';
// @ts-ignore
import backgroundImg from './assets/images/tlo.jpg';
import { 
  Sparkles, 
  Send, 
  MessageSquare, 
  Globe, 
  ArrowUpRight,
  X,
  ExternalLink
} from 'lucide-react';

export default function App() {
  const [lang, setLang] = useState<'PL' | 'EN'>('PL');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);
  const [imgError, setImgError] = useState(false);
  const [bgImgError, setBgImgError] = useState(false);
  const [showIosSafariModal, setShowIosSafariModal] = useState(false);
  const [isIosInApp, setIsIosInApp] = useState(false);
  const [pendingUrl, setPendingUrl] = useState('');

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isInstagram = /Instagram|FBAN|FBAV/i.test(userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent);
    if (isInstagram && isIOS) {
      setIsIosInApp(true);
    }
  }, []);

  const triggerToast = (message: string, type: 'success' | 'info' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleLinkClick = (name: string) => {
    triggerToast(lang === 'PL' ? `Przekierowanie do: ${name}` : `Redirecting to: ${name}`, 'info');
  };

  const goToLink = (e: React.MouseEvent<HTMLAnchorElement>, url: string, deepLink?: string) => {
    e.preventDefault();
    
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    const isInstagram = /Instagram|FBAN|FBAV/i.test(userAgent);
    const isAndroid = /Android/i.test(userAgent);
    const isIOS = /iPhone|iPad|iPod/i.test(userAgent);

    // Break out of Instagram in-app browser on Android
    if (isInstagram && isAndroid) {
      const rawUrl = url.replace(/^https?:\/\//, '');
      const intentUrl = `intent://${rawUrl}#Intent;scheme=https;end;`;
      window.location.href = intentUrl;
      return;
    }

    // Force Safari escape modal on iOS Instagram webview
    if (isInstagram && isIOS) {
      setPendingUrl(url);
      setShowIosSafariModal(true);
      return;
    }

    // Attempt to open deep link inside native app directly if deep link is supported
    if (deepLink) {
      const start = Date.now();
      window.location.href = deepLink;
      
      // Fallback to standard URL if system doesn't handle the deep link within 1 second
      setTimeout(() => {
        if (Date.now() - start < 1200) {
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      }, 1000);
      return;
    }

    // Default target blank redirection
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="jb-viewport-container" className="min-h-screen w-full relative m-0 p-0 flex flex-col items-center justify-center overflow-x-hidden bg-[#0f070a] text-white font-sans antialiased selection:bg-[#ff4b8b]/30">
      
      {/* iOS Instagram top breakout guide banner */}
      {isIosInApp && (
        <div className="w-full bg-[#ff4b8b] text-white py-2.5 px-4 text-xs font-bold shrink-0 flex items-center justify-center gap-2 z-40 text-center shadow-[0_4px_12px_rgba(255,75,139,0.25)] sticky top-0 backdrop-blur-md bg-opacity-95">
          <Sparkles size={14} className="text-white shrink-0 animate-pulse" />
          <span>
            {lang === 'PL' 
              ? '👉 Przeglądasz w Instagramie? Kliknij ⋯ w prawym górnym rogu i "Otwórz w Safari"!' 
              : '👉 Browsing in Instagram? Tap ⋯ in top right and select "Open in Safari"!'}
          </span>
        </div>
      )}

      {/* Background image container with smooth luxury blur */}
      <div 
        id="bg-image-backdrop" 
        className="absolute inset-0 z-0 h-full w-full overflow-hidden pointer-events-none select-none transition-all duration-700"
      >
        {!bgImgError ? (
          <img 
            src={backgroundImg} 
            alt="Jagódka Bleja Premium Blurred Background" 
            className="w-full h-full object-cover opacity-100 filter blur-[5px] scale-105 select-none"
            referrerPolicy="no-referrer"
            onError={() => setBgImgError(true)}
          />
        ) : null}
      </div>

      {/* Decorative Blur Background Circles - Geometric Balance theme signature */}
      <div 
        id="bg-decor-1" 
        className="absolute top-0 right-0 w-[550px] h-[550px] -mr-48 -mt-24 rounded-full pointer-events-none filter blur-[95px] opacity-45 mix-blend-screen transition-all duration-1000"
        style={{
          background: 'radial-gradient(circle, #4a152e 0%, rgba(0,0,0,0) 70%)'
        }}
      />
      <div 
        id="bg-decor-2" 
        className="absolute bottom-0 left-0 w-[550px] h-[550px] -ml-48 -mb-24 rounded-full pointer-events-none filter blur-[95px] opacity-50 mix-blend-screen transition-all duration-1000"
        style={{
          background: 'radial-gradient(circle, #1e1b4b 0%, rgba(0,0,0,0) 70%)'
        }}
      />

      {/* Floating Design Sparkle Elements */}
      <div className="absolute top-[18%] left-[22%] w-1.5 h-1.5 bg-[#ff4b8b] rounded-full animate-pulse opacity-50 pointer-events-none" />
      <div className="absolute bottom-[28%] right-[22%] w-2 h-2 bg-[#7d3cff] rounded-full animate-bounce opacity-40 pointer-events-none" style={{ animationDuration: '6s' }} />

      {/* Top Right Header Language Trigger */}
      <div className="absolute top-6 right-6 flex items-center z-30">
        <button 
          onClick={() => setLang(l => l === 'PL' ? 'EN' : 'PL')} 
          className="flex items-center gap-1.5 p-2 px-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-semibold backdrop-blur-md cursor-pointer"
        >
          <Globe size={14} className="opacity-70" />
          <span>{lang}</span>
        </button>
      </div>

      {/* Content wrapper centered perfectly in viewport */}
      <main id="main-content-layer" className="relative z-10 w-full max-w-[420px] px-6 py-12 flex flex-col items-center justify-center text-center">
        
        {/* Profile photo container with status indicator */}
        <div id="profile-pic-container" className="relative mb-6 group select-none">
          {/* Pulsing glow ring behind initials avatar */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#ff4b8b] to-[#7d3cff] rounded-full blur-xl opacity-35 group-hover:opacity-60 transition-opacity duration-500 scale-105" />
          
          {/* Elegant Circular Avatar with solid white border as requested */}
          <div 
            id="profile-picture" 
            className="relative w-[160px] h-[160px] rounded-full bg-white border-[4px] border-white shadow-[0_20px_45px_rgba(0,0,0,0.6)] flex items-center justify-center font-bold text-6xl tracking-tighter select-none text-white overflow-hidden"
          >
            {!imgError ? (
              <img 
                src={profileImg} 
                alt="Jagódka Bleja Profile"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 rounded-full"
                referrerPolicy="no-referrer"
              />
            ) : (
              <span>JB</span>
            )}
          </div>
          
          {/* Active Status Badge (Without black border as requested) */}
          <div 
            id="status-active" 
            className="absolute bottom-2 right-2 bg-[#10b981] px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wide flex items-center gap-1.5 shadow-[0_4px_12px_rgba(16,185,129,0.4)] select-none text-white"
          >
            <span className="w-2 h-2 bg-white rounded-full animate-ping absolute" />
            <span className="relative w-2 h-2 bg-white rounded-full" />
            {lang === 'PL' ? 'Aktywna teraz' : 'Active now'}
          </div>
        </div>

        {/* Brand Information */}
        <h1 id="name-title" className="text-4xl md:text-5xl font-black tracking-tight text-white mb-8 drop-shadow-[0_8px_16px_rgba(0,0,0,0.4)] select-text selection:bg-[#ff4b8b] selection:text-white">
          Jagódka Bleja
        </h1>
        {/* Links Stack */}
        <section id="button-stack" className="w-full flex flex-col gap-4">
          
          {/* 1. Telegram Channel Button (First! Pulsing and highly outstanding) */}
          <a 
            id="btn-telegram-channel"
            href="https://t.me/jagodka_bleja" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => goToLink(e, 'https://t.me/jagodka_bleja', 'tg://resolve?domain=jagodka_bleja')}
            className="w-full p-4.5 rounded-[18px] bg-black/30 backdrop-blur-md border border-[#7d3cff]/40 text-white animate-soft-pulse hover:bg-black/45 transition-all duration-300 flex items-center justify-between group cursor-pointer"
          >
            <div className="flex items-center gap-3 pl-3">
              <MessageSquare size={18} className="text-[#7d3cff]" />
              <span className="font-bold">{lang === 'PL' ? 'Ciekawsze fotki 😏🔥' : 'More interesting photos 😏🔥'}</span>
            </div>
            <div className="flex items-center gap-1.5 pr-3">
              <span className="text-[9px] uppercase font-bold bg-[#7d3cff]/20 text-[#c8aeff] px-1.5 py-0.5 rounded tracking-wide">HOT</span>
              <ArrowUpRight size={16} className="opacity-70 group-hover:opacity-100 transition-opacity" />
            </div>
          </a>

          {/* 2. Telegram DM Link (Middle) */}
          <a 
            id="btn-telegram-dm"
            href="https://t.me/jagodkableja" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => goToLink(e, 'https://t.me/jagodkableja', 'tg://resolve?domain=jagodkableja')}
            className="w-full p-4.5 rounded-[18px] bg-black/30 backdrop-blur-md border border-white/10 hover:bg-black/45 hover:border-white/20 hover:text-white hover:shadow-[0_8px_20px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-between group text-white cursor-pointer"
          >
            <div className="flex items-center gap-3 pl-3">
              <Send size={18} className="text-[#ff4b8b]" />
              <span className="font-semibold">{lang === 'PL' ? 'Napisz do mnie! 💬💋' : 'Write to me! 💬💋'}</span>
            </div>
            <ArrowUpRight size={16} className="opacity-40 group-hover:opacity-100 transition-opacity pr-3" />
          </a>

          {/* 3. Primary Premium Action (Fanvue - LAST button) */}
          <a 
            id="btn-fanvue"
            href="https://www.fanvue.com/jagodkableja" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => goToLink(e, 'https://www.fanvue.com/jagodkableja')}
            className="w-full p-4.5 rounded-[18px] bg-black/30 backdrop-blur-md border border-[#ff4b8b]/30 text-white font-bold text-base transition-all duration-300 transform hover:-translate-y-1 hover:bg-black/45 hover:shadow-[0_12px_24px_rgba(255,75,139,0.25)] hover:border-[#ff4b8b]/50 flex items-center justify-between group overflow-hidden relative cursor-pointer"
          >
            {/* Sparkle background glow flow on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ff4b8b]/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            
            <div className="flex items-center gap-3 relative z-10 pl-3">
              <Sparkles size={18} className="text-[#ff4b8b] animate-spin" style={{ animationDuration: '8s' }} />
              <span>{lang === 'PL' ? 'Dla bardzo odważnych 🔞' : 'For the very brave 🔞'}</span>
            </div>
            
            <div className="flex items-center gap-2 relative z-10 pr-3">
              <span className="text-[10px] uppercase font-black bg-[#ff4b8b]/10 text-[#ff4b8b] px-2 py-0.5 rounded-md tracking-wider">PREMIUM</span>
              <ArrowUpRight size={16} className="opacity-65 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </a>

        </section>

        {/* Elegant horizontal divider for social links */}
        <div className="w-full flex items-center justify-center gap-4 mt-10 mb-7 opacity-30 select-none">
          <span className="flex-1 h-px bg-white/30" />
          <span className="text-[9px] font-bold tracking-widest uppercase text-white/50">Social Media</span>
          <span className="flex-1 h-px bg-white/30" />
        </div>

        {/* Social Media Link Pill-Badges (Instagram, TikTok, Threads) */}
        <div id="socials-container" className="flex items-center justify-center gap-5 select-none">
          <a 
            href="https://www.instagram.com/jagodka_bleja/" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => goToLink(e, 'https://www.instagram.com/jagodka_bleja/', 'instagram://user?username=jagodka_bleja')}
            className="px-4 py-2 rounded-full text-xs font-bold tracking-wide text-white/60 bg-white/5 border border-white/10 hover:bg-[#ff4b8b]/15 hover:border-[#ff4b8b]/30 hover:text-white transition-all duration-300 cursor-pointer"
          >
            Instagram
          </a>
          <a 
            href="https://www.tiktok.com/@jagodkableja" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => goToLink(e, 'https://www.tiktok.com/@jagodkableja', 'tiktok://user?username=jagodkableja')}
            className="px-4 py-2 rounded-full text-xs font-bold tracking-wide text-white/60 bg-white/5 border border-white/10 hover:bg-[#ff4b8b]/15 hover:border-[#ff4b8b]/30 hover:text-white transition-all duration-300 cursor-pointer"
          >
            TikTok
          </a>
          <a 
            href="https://www.threads.net/@jagodkableja" 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={(e) => goToLink(e, 'https://www.threads.net/@jagodkableja', 'barcelona://user?username=jagodkableja')}
            className="px-4 py-2 rounded-full text-xs font-bold tracking-wide text-white/60 bg-white/5 border border-white/10 hover:bg-[#ff4b8b]/15 hover:border-[#ff4b8b]/30 hover:text-white transition-all duration-300 cursor-pointer"
          >
            Threads
          </a>
        </div>

        {/* Footer info note */}
        <footer id="footer-landing" className="mt-14 select-none">
          <div className="text-[10px] uppercase tracking-[0.25em] text-white/40 font-bold mb-2">
            {lang === 'PL' ? 'Oficjalna Strona' : 'Official Page'}
          </div>
          <p className="text-[9px] text-white/25">Jagódka Bleja &copy; 2026. All rights reserved.</p>
        </footer>
      </main>

      {/* TOAST NOTIFICATION POPUP */}
      {toast && (
        <div 
          id="global-toast-element"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3.5 rounded-full border bg-white text-[#0f070a] shadow-xl text-xs font-bold leading-none animate-slide-up select-none max-w-[90%] text-center"
        >
          <div className="w-4 h-4 rounded-full bg-[#ff4b8b] flex items-center justify-center animate-pulse">
            <Sparkles size={10} className="text-white" />
          </div>
          <span>{toast.message}</span>
        </div>
      )}

      {/* iOS SAFARI BREAKOUT INSTRUCTION MODAL */}
      {showIosSafariModal && (
        <div id="ios-safari-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-[360px] bg-[#160b11] border border-[#ff4b8b]/30 rounded-3xl p-6 shadow-2xl text-white text-center flex flex-col items-center">
            
            {/* Close button */}
            <button 
              onClick={() => setShowIosSafariModal(false)}
              className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-1.5 rounded-full hover:bg-white/5 cursor-pointer"
            >
              <X size={18} />
            </button>

            {/* Glowing Icon */}
            <div className="w-12 h-12 bg-gradient-to-tr from-[#ff4b8b] to-[#7d3cff] rounded-full flex items-center justify-center mb-4 shadow-[0_8px_20px_rgba(255,75,139,0.3)]">
              <ExternalLink size={20} className="text-white animate-pulse" />
            </div>

            <h3 className="text-lg font-black tracking-tight mb-2 text-white">
              {lang === 'PL' ? 'Otwórz w Safari 📲' : 'Open in Safari 📲'}
            </h3>
            
            <p className="text-xs text-white/70 mb-5 leading-relaxed">
              {lang === 'PL' 
                ? 'Instagram blokuje zewnętrzne linki. Otwórz tę stronę w normalnej przeglądarce, aby bez problemów pisać i oglądać fotki!' 
                : 'Instagram limits in-app browser features. Open this page in Safari for full access to content, chats, and photos!'}
            </p>

            {/* Step-by-step guidance */}
            <div className="w-full bg-white/5 border border-white/5 rounded-2xl p-4.5 text-left mb-6 text-xs flex flex-col gap-3">
              <div className="flex items-start gap-2.5">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#ff4b8b] text-white text-[10px] font-black shrink-0 mt-0.5">1</span>
                <span className="text-white/95 leading-normal">
                  {lang === 'PL' 
                    ? 'Kliknij ikonę trzech kropek (⋯) w prawym górnym rogu ekranu.' 
                    : 'Tap the three dots (⋯) in the top right corner of the screen.'}
                </span>
              </div>
              <div className="flex items-start gap-2.5">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#7d3cff] text-white text-[10px] font-black shrink-0 mt-0.5">2</span>
                <span className="text-white/95 leading-normal">
                  {lang === 'PL' 
                    ? 'Wybierz opcję "Otwórz w przeglądarce Safari" (lub "Otwórz w systemowej przeglądarce").' 
                    : 'Select "Open in Safari" or "Open in System Browser".'}
                </span>
              </div>
            </div>

            {/* Force bypass button */}
            <button 
              onClick={() => {
                setShowIosSafariModal(false);
                window.open(pendingUrl, '_blank', 'noopener,noreferrer');
              }}
              className="w-full py-3 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-xs font-semibold text-white/80 cursor-pointer"
            >
              {lang === 'PL' ? 'Kontynuuj w Instagramie mimo to' : 'Continue inside Instagram anyway'}
            </button>
            
          </div>
        </div>
      )}

    </div>
  );
}
