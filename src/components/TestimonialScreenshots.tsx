import React, { useEffect, useRef, useState } from 'react';
import {
  MessageSquareQuote,
  Image as ImageIcon,
  BadgeCheck,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play
} from 'lucide-react';
import { INBOX_SLIDES, ShotSlide } from '../images';
import { ImageLightbox } from './ImageLightbox';

const AUTOPLAY_INTERVAL_MS = 10000;

const InboxSlideButton: React.FC<{
  slide: ShotSlide & { src: string };
  isActive: boolean;
  onOpen: (event: React.MouseEvent<HTMLButtonElement>) => void;
}> = ({ slide, isActive, onOpen }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`Open preview of inbox screenshot ${slide.index}: ${slide.fileName}`}
      aria-haspopup="dialog"
      data-active-slide={isActive}
      className="group relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FB2FF]"
    >
      {!hasError ? (
        <img
          src={slide.src}
          alt={`Inbox screenshot ${slide.index}`}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false);
            setHasError(true);
          }}
          className="max-h-full max-w-full object-contain"
        />
      ) : (
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center text-[11px] text-[#AAB2C8]">
          <ImageIcon className="h-5 w-5" aria-hidden="true" />
          Image unavailable
        </span>
      )}
      {isLoading && !hasError && (
        <span className="absolute inset-0 animate-pulse bg-[#0A1024]" aria-label="Loading screenshot" />
      )}
      {!hasError && (
        <span className="absolute right-2 top-2 rounded-md border border-white/20 bg-black/65 p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
          <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
      )}
    </button>
  );
};

export const InboxScreenshotsSlider: React.FC = () => {
  const slides = INBOX_SLIDES.filter((slide): slide is ShotSlide & { src: string } => Boolean(slide.src));
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setAutoplayEnabled(!preference.matches);
    sync();
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    if (!autoplayEnabled || isPaused || isLightboxOpen || slides.length <= 1) return;
    const interval = window.setInterval(() => {
      setActiveIndex((index) => (index + 1) % slides.length);
    }, AUTOPLAY_INTERVAL_MS);
    return () => window.clearInterval(interval);
  }, [autoplayEnabled, isPaused, isLightboxOpen, slides.length]);

  const moveSlide = (direction: number) => {
    setActiveIndex((index) => (index + direction + slides.length) % slides.length);
  };

  return (
    <div className="space-y-6 rounded-3xl border border-[#5B8CFF]/20 bg-gradient-to-br from-[#101B38] via-[#0A1024] to-[#080D1E] p-4 sm:p-7 lg:p-8">
      {/* Header */}
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-[#5B8CFF]">
            <MessageSquareQuote className="w-3 h-3" />
            <span>INBOX SCREENSHOTS</span>
          </div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-white mt-3 tracking-tight">
            Real messages from real clients.
          </h3>
          <p className="mt-2 max-w-lg text-xs leading-relaxed text-[#AAB2C8] sm:text-sm">
            The conversations behind our client relationships. Select a screenshot to read the full exchange.
          </p>
        </div>
        <span className="hidden sm:flex items-center gap-1 text-[10px] text-emerald-400 font-semibold">
          <BadgeCheck className="w-3.5 h-3.5" /> Client shared
        </span>
      </div>

      {slides.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#0A1024] p-8 text-center space-y-2">
          <div className="w-10 h-10 mx-auto rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#5B8CFF]">
            <ImageIcon className="w-5 h-5" />
          </div>
          <div className="text-sm font-semibold text-white">Add your client screenshots</div>
          <div className="text-[11px] text-[#AAB2C8]">
            Add screenshots to{' '}
            <code className="px-1.5 py-0.5 rounded bg-white/10 text-[#8FB2FF] font-mono">
              src/images/inbox ss/
            </code>. Supported image files are discovered automatically.
          </div>
        </div>
      ) : (
        <div
          ref={carouselRef}
          tabIndex={0}
          role="region"
          aria-roledescription="carousel"
          aria-label="Inbox client screenshots"
          className="space-y-3 outline-none"
          onKeyDown={(event) => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
              event.preventDefault();
              moveSlide(event.key === 'ArrowLeft' ? -1 : 1);
            }
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsPaused(false);
          }}
        >
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(ellipse_at_top,_#19284A_0%,_#070C1D_70%)] p-3 sm:p-5">
            <div className="flex h-[340px] items-center justify-center px-10 sm:h-[440px] sm:px-14 lg:h-[520px]">
              {activeSlide && (
                <InboxSlideButton
                  key={activeSlide.fileName}
                  slide={activeSlide}
                  isActive
                  onOpen={(event) => {
                    triggerRef.current = event.currentTarget;
                    setIsLightboxOpen(true);
                  }}
                />
              )}
            </div>

            {slides.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => moveSlide(-1)}
                  className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white transition-colors hover:bg-[#4F7CFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FB2FF] sm:left-4"
                  aria-label="Previous inbox screenshot"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => moveSlide(1)}
                  className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white transition-colors hover:bg-[#4F7CFF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FB2FF] sm:right-4"
                  aria-label="Next inbox screenshot"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </>
            )}
          </div>
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-[#AAB2C8]" aria-live={autoplayEnabled ? 'off' : 'polite'} aria-atomic="true">
              <span className="font-semibold text-white">{String(activeIndex + 1).padStart(2, '0')}</span>
              <span className="mx-2 text-white/30">/</span>{String(slides.length).padStart(2, '0')}
              <span className="ml-3 hidden sm:inline">Click image to expand</span>
            </p>
            {slides.length > 1 && (
              <button type="button" onClick={() => setAutoplayEnabled((enabled) => !enabled)}
                aria-label={autoplayEnabled ? 'Pause automatic slideshow' : 'Play automatic slideshow'}
                className="flex min-h-11 items-center gap-2 rounded-lg px-3 text-xs text-[#AAB2C8] hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FB2FF]">
                {autoplayEnabled ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {autoplayEnabled ? 'Pause slideshow' : 'Play slideshow'}
              </button>
            )}
          </div>
          {slides.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 pt-1 sm:gap-3" aria-label="Choose an inbox screenshot">
              {slides.map((slide, index) => (
                <button key={slide.fileName} type="button"
                  aria-label={`Show inbox screenshot ${index + 1}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                  onClick={() => setActiveIndex(index)}
                  className={`relative h-20 w-16 shrink-0 overflow-hidden rounded-xl border-2 p-1 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FB2FF] sm:h-24 sm:w-20 ${index === activeIndex ? 'border-[#5B8CFF] bg-[#5B8CFF]/15' : 'border-white/10 bg-[#070C1D] hover:border-white/40'}`}>
                  <img src={slide.src} alt="" loading="lazy" decoding="async" className="h-full w-full rounded-md object-cover object-top" />
                  <span className="absolute bottom-1 right-1 rounded bg-[#070C1D]/90 px-1.5 py-0.5 text-[10px] font-semibold text-white">{index + 1}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {isLightboxOpen && activeSlide && (
        <ImageLightbox
          src={activeSlide.src}
          alt={`Inbox screenshot ${activeSlide.index}`}
          caption={`Client conversation ${activeIndex + 1} of ${slides.length}`}
          onClose={() => setIsLightboxOpen(false)}
          onPrevious={() => moveSlide(-1)}
          onNext={() => moveSlide(1)}
          returnFocusRef={triggerRef}
          fallbackFocusRef={carouselRef}
        />
      )}
    </div>
  );
};
