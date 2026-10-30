import React, { useState } from 'react';
import { MessageSquareQuote, Image as ImageIcon, BadgeCheck, Pause, Play } from 'lucide-react';
import { INBOX_SLIDES, ShotSlide, responsiveImage } from '../images';

const InboxScreenshot: React.FC<{ slide: ShotSlide & { src: string }; duplicate?: boolean }> = ({ slide, duplicate = false }) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative flex h-[360px] w-[260px] shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-[#070C1D] p-2 shadow-lg sm:h-[460px] sm:w-[330px]">
      {hasError ? (
        <span className="flex flex-col items-center gap-2 text-xs text-[#AAB2C8]">
          <ImageIcon className="h-5 w-5" aria-hidden="true" />Image unavailable
        </span>
      ) : (
        <img
          {...responsiveImage(slide.src)}
          sizes="(max-width: 640px) 260px, 330px"
          src={slide.src}
          alt={duplicate ? '' : `Client inbox conversation ${slide.index}`}
          loading="lazy"
          decoding="async"
          onError={() => setHasError(true)}
          className="h-full w-full rounded-xl object-contain"
        />
      )}
    </div>
  );
};

export const InboxScreenshotsSlider: React.FC = () => {
  const slides = INBOX_SLIDES.filter((slide): slide is ShotSlide & { src: string } => Boolean(slide.src));
  const [isPaused, setIsPaused] = useState(false);
  const isMarquee = slides.length > 1;

  return (
    <div className="min-w-0 space-y-6 overflow-hidden rounded-3xl border border-[#5B8CFF]/20 bg-gradient-to-br from-[#101B38] via-[#0A1024] to-[#080D1E] p-4 sm:p-7 lg:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase text-[#5B8CFF]">
            <MessageSquareQuote className="h-3 w-3" aria-hidden="true" />
            <span>INBOX SCREENSHOTS</span>
          </div>
          <h3 className="mt-3 font-display text-xl font-bold tracking-tight text-white sm:text-2xl">
            Real messages from real clients.
          </h3>
          <p className="mt-2 max-w-lg text-xs leading-relaxed text-[#AAB2C8] sm:text-sm">
            The conversations behind our client relationships.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1 text-[10px] font-semibold text-emerald-400 sm:flex">
            <BadgeCheck className="h-3.5 w-3.5" aria-hidden="true" />Client shared
          </span>
          {isMarquee && (
            <button type="button" onClick={() => setIsPaused((paused) => !paused)}
              aria-label={isPaused ? 'Play inbox auto-scroll' : 'Pause inbox auto-scroll'}
              aria-pressed={isPaused}
              className="inbox-motion-control flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 text-[#AAB2C8] hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FB2FF]">
              {isPaused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
            </button>
          )}
        </div>
      </div>

      {slides.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-[#0A1024] p-8 text-center text-sm text-[#AAB2C8]">
          Client conversations will appear here soon.
        </div>
      ) : (
        <div role="region" aria-label="Client inbox screenshot gallery" tabIndex={0}
          className="inbox-marquee overflow-x-auto rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-[#8FB2FF]"
          data-animated={isMarquee} data-paused={isPaused}>
          <div className="inbox-marquee-track flex w-max" style={{ animationDuration: `${Math.max(30, slides.length * 8)}s` }}>
            <div className="flex shrink-0 gap-4 pr-4" role="list">
              {slides.map((slide) => <div key={slide.fileName} role="listitem"><InboxScreenshot slide={slide} /></div>)}
            </div>
            {isMarquee && (
              <div className="inbox-marquee-copy flex shrink-0 gap-4 pr-4" aria-hidden="true">
                {slides.map((slide) => <InboxScreenshot key={slide.fileName} slide={slide} duplicate />)}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
