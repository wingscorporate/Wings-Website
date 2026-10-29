import React, { useEffect, useState } from 'react';
import {
  BarChart3,
  ShoppingBag,
  Activity,
  ArrowRight,
  Maximize2,
  X,
  ShieldCheck,
  Wallet,
  MousePointerClick,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Image as ImageIcon
} from 'lucide-react';
import { AD_ACCOUNT_SLIDES, SHOPIFY_SLIDES, ShotSlide } from '../images';

interface PerformanceProofSectionProps {
  onOpenContact: () => void;
}

const AUTOPLAY_MS = 5000;

/** A single slide: a real screenshot, or a placeholder telling you which file to add */
const Slide: React.FC<{
  slide: ShotSlide;
  kind: 'ad' | 'shopify';
  index: number;
  total: number;
  onExpand: () => void;
}> = ({ slide, kind, index, total, onExpand }) => {
  const isShopify = kind === 'shopify';

  return (
    <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#070C1D] h-[240px] sm:h-[320px] lg:h-[400px] group">
      {slide.src ? (
        <img
          src={slide.src}
          alt={`${isShopify ? 'Shopify' : 'Ads Manager'} screenshot ${index + 1} of ${total}`}
          loading="lazy"
          onClick={onExpand}
          className="w-full h-full object-contain object-top bg-[#050816] cursor-zoom-in"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center gap-3 px-6 text-center bg-[radial-gradient(circle_at_50%_30%,rgba(79,124,255,0.14),transparent_60%)]">
          <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[#5B8CFF]">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="text-sm font-semibold text-white">
              {isShopify ? 'Shopify' : 'Ads Manager'} screenshot {index + 1}
            </div>
            <div className="text-[11px] text-[#AAB2C8]">
              Add your image as{' '}
              <code className="px-1.5 py-0.5 rounded bg-white/10 text-[#8FB2FF] font-mono">
                src/images/{isShopify ? 'shopify ss' : 'ad account ss'}/{slide.fileName}
              </code>
            </div>
            <div className="text-[10px] text-[#AAB2C8]/70">
              {isShopify ? 'shopify1.jpg → shopify20.jpg' : 'ads1.jpg → ads20.jpg'}
            </div>
          </div>
        </div>
      )}

      {/* Overlay controls */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-3 pointer-events-none">
        <span
          className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest backdrop-blur ${
            isShopify
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/30'
              : 'bg-[#4F7CFF]/25 text-[#A9C2FF] border border-[#4F7CFF]/40'
          }`}
        >
          {isShopify ? 'Shopify Backend' : 'Ad Account'}
        </span>

        <div className="flex items-center gap-2 pointer-events-auto">
          <span className="px-2 py-0.5 rounded-md bg-black/55 backdrop-blur text-[9.5px] font-mono text-white/85 border border-white/10">
            {index + 1} / {total}
          </span>
          {slide.src && (
            <button
              onClick={onExpand}
              className="p-1.5 rounded-md bg-black/55 backdrop-blur border border-white/15 text-[#AAB2C8] hover:text-white hover:bg-[#4F7CFF] transition-all cursor-pointer"
              aria-label="Expand screenshot"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export const PerformanceProofSection: React.FC<PerformanceProofSectionProps> = ({ onOpenContact }) => {
  const [activeTab, setActiveTab] = useState<'ad-manager' | 'shopify'>('ad-manager');
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState(false);

  const slides: ShotSlide[] = (activeTab === 'shopify' ? SHOPIFY_SLIDES : AD_ACCOUNT_SLIDES).filter((s) => s.src);
  const total = slides.length;
  const uploadedCount = total;

  // Reset to the first slide whenever the tab changes
  useEffect(() => {
    setIndex(0);
    setLightbox(false);
  }, [activeTab]);

  // Auto-advance every 5 seconds (only when there is more than one slide)
  useEffect(() => {
    if (paused || lightbox || total <= 1) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, lightbox, total]);

  // Keyboard control inside the lightbox
  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(false);
      if (total === 0) return;
      if (e.key === 'ArrowRight') setIndex((p) => (p + 1) % total);
      if (e.key === 'ArrowLeft') setIndex((p) => (p - 1 + total) % total);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, total]);

  const go = (delta: number) => {
    if (total === 0) return;
    setIndex((p) => (p + delta + total) % total);
  };

  return (
    <section id="performance-proof" className="py-16 sm:py-24 bg-[#050816] relative overflow-hidden border-t border-white/10 select-none">
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[400px] bg-[#4F7CFF]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#8B5CF6]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8 sm:space-y-10">

        {/* Header */}
        <div className="text-center space-y-2.5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#4F7CFF]/10 text-[#5B8CFF] text-[10px] font-bold tracking-widest uppercase border border-[#4F7CFF]/20">
            <BarChart3 className="w-3 h-3" />
            <span>REAL ACCOUNT SCREENSHOTS</span>
          </div>

          <h2 className="font-display font-black text-xl sm:text-3xl lg:text-4xl text-white tracking-tight">
            Ads Manager & Shopify. Same Numbers.
          </h2>

          <p className="text-[#AAB2C8] text-xs sm:text-sm leading-relaxed">
            Backend screenshots straight out of live Ad Accounts and Shopify stores — every rupee of spend matched to every rupee of store
            revenue. Five slides per tab, rotating every 5 seconds.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex items-center justify-center">
          <div className="inline-flex p-1 rounded-full bg-white/5 border border-white/10">
            <button
              onClick={() => setActiveTab('ad-manager')}
              className={`px-4 sm:px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'ad-manager' ? 'bg-[#4F7CFF] text-white shadow-md shadow-blue-600/30' : 'text-[#AAB2C8] hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              Ad Account ({AD_ACCOUNT_SLIDES.filter((s) => s.src).length})
            </button>
            <button
              onClick={() => setActiveTab('shopify')}
              className={`px-4 sm:px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                activeTab === 'shopify' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30' : 'text-[#AAB2C8] hover:text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              Shopify ({SHOPIFY_SLIDES.filter((s) => s.src).length})
            </button>
          </div>
        </div>

        {/* Slider */}
        <div
          className="p-3 sm:p-4 rounded-3xl bg-[#0A1024] border border-white/10 shadow-2xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {total === 0 ? (
            <div className="py-14 px-6 text-center space-y-2">
              <div className="w-10 h-10 mx-auto rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#5B8CFF]">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div className="text-sm font-semibold text-white">
                Add your {activeTab === 'shopify' ? 'Shopify' : 'Ad Account'} screenshots
              </div>
              <div className="text-[11px] text-[#AAB2C8]">
                Drop 5 images into{' '}
                <code className="px-1.5 py-0.5 rounded bg-white/10 text-[#8FB2FF] font-mono">
                  src/images/{activeTab === 'shopify' ? 'shopify ss' : 'ad account ss'}/
                </code>{' '}
                named{' '}
                <code className="font-mono text-[#8FB2FF]">
                  {activeTab === 'shopify' ? 'shopify1.jpg … shopify5.jpg' : 'ads1.jpg … ads5.jpg'}
                </code>
              </div>
            </div>
          ) : (
            <>
          <Slide
            slide={slides[Math.min(index, total - 1)]}
            kind={activeTab === 'shopify' ? 'shopify' : 'ad'}
            index={index}
            total={total}
            onExpand={() => setLightbox(true)}
          />

          {/* Controls */}
          <div className="flex items-center justify-between gap-3 pt-3 px-1">
            <button
              onClick={() => go(-1)}
              className="p-2 rounded-full bg-white/5 border border-white/10 text-[#AAB2C8] hover:text-white hover:border-[#4F7CFF]/50 transition-all cursor-pointer shrink-0"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-1.5 flex-wrap flex-1">
              {slides.map((s, i) => (
                <button
                  key={`${s.fileName}-${i}`}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to screenshot ${i + 1}${s.src ? '' : ' (not uploaded yet)'}`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    i === index
                      ? 'w-6 bg-[#4F7CFF]'
                      : s.src
                      ? 'w-1.5 bg-white/35 hover:bg-white/60'
                      : 'w-1.5 bg-white/15 hover:bg-white/30'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => setPaused((p) => !p)}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-[#AAB2C8] hover:text-white hover:border-[#4F7CFF]/50 transition-all cursor-pointer"
                aria-label={paused ? 'Play slideshow' : 'Pause slideshow'}
              >
                {paused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
              <button
                onClick={() => go(1)}
                className="p-2 rounded-full bg-white/5 border border-white/10 text-[#AAB2C8] hover:text-white hover:border-[#4F7CFF]/50 transition-all cursor-pointer"
                aria-label="Next screenshot"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* 5-second progress bar */}
          <div className="mt-3 h-0.5 w-full rounded-full bg-white/5 overflow-hidden">
            <div
              key={`${activeTab}-${index}-${paused}`}
              className="h-full bg-gradient-to-r from-[#4F7CFF] to-[#8B5CF6]"
              style={{ animation: paused ? 'none' : `wingsSlideProgress ${AUTOPLAY_MS}ms linear forwards` }}
            />
          </div>
            </>
          )}
        </div>

        {/* Status + CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-2xl bg-[#0A1024] border border-white/10">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-[11px] text-[#AAB2C8]">
            <span className="flex items-center gap-1.5">
              <Wallet className="w-3.5 h-3.5 text-[#5B8CFF]" /> ₹4Cr+ managed ad spend
            </span>
            <span className="flex items-center gap-1.5">
              <MousePointerClick className="w-3.5 h-3.5 text-[#5B8CFF]" /> Meta, Google & Shopify unified
            </span>
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Client-confirmed figures
            </span>
            <span className="text-[#5B8CFF]/80 font-mono">
              {uploadedCount}/{total} images loaded
            </span>
          </div>

          <button
            onClick={onOpenContact}
            className="px-6 py-3 rounded-full bg-[#4F7CFF] hover:bg-[#5B8CFF] text-white font-display font-bold text-[11px] uppercase tracking-wider shadow-lg shadow-blue-600/30 transition-all flex items-center gap-2 cursor-pointer shrink-0"
          >
            <span>Get A Live Account Audit</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <p className="text-center text-[10.5px] text-[#AAB2C8]/80 italic">
          Screenshots are of real client accounts. Metrics vary by product, market, offer and budget.
        </p>
      </div>

      {/* Lightbox */}
      {lightbox && slides[index]?.src && (
        <div
          className="fixed inset-0 z-[70] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            onClick={() => setLightbox(false)}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close screenshot"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            className="absolute left-3 sm:left-6 p-2.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Previous screenshot"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={slides[index].src as string}
              alt={`Screenshot ${index + 1}`}
              className="w-full max-h-[84vh] object-contain rounded-xl"
            />
            <div className="text-center text-[11px] font-mono text-[#AAB2C8] pt-3">
              {index + 1} / {total}
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            className="absolute right-3 sm:right-6 p-2.5 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Next screenshot"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </section>
  );
};
