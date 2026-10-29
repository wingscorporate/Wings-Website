import React, { useRef, useState } from 'react';
import { Camera, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { TEAM_PHOTOS, TeamPhoto } from '../images';
import { ImageLightbox } from './ImageLightbox';


export const TeamGallerySection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const galleryRef = useRef<HTMLElement | null>(null);
  const photos = TEAM_PHOTOS.filter((photo): photo is TeamPhoto & { src: string } => Boolean(photo.src));
  const activePhoto = photos[activeIndex];

  const movePhoto = (direction: number) => {
    setActiveIndex((index) => (index + direction + photos.length) % photos.length);
  };

  return (
    <section id="team-gallery" ref={galleryRef} tabIndex={-1} className="border-t border-white/10 bg-[#050816] py-16 outline-none sm:py-24">
      <div className="mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8">
        <header className="mx-auto max-w-2xl space-y-3 text-center">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#8FB2FF]">
            <Camera className="h-3.5 w-3.5" aria-hidden="true" />
            <span>OUR TEAM — GALLERY</span>
          </div>
          <h2 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
            The People Behind The Numbers.
          </h2>
          <p className="text-sm leading-relaxed text-[#AAB2C8]">
            A compact, senior team of media buyers, creative strategists and e-commerce engineers — no layers, no account-manager telephone game.
          </p>
        </header>

        {activePhoto && (
          <div className="mx-auto w-full max-w-5xl space-y-4">
            <button
              type="button"
              onClick={(event) => {
                returnFocusRef.current = event.currentTarget;
                setIsLightboxOpen(true);
              }}
              aria-label={`Open team photo ${activeIndex + 1}`}
              aria-haspopup="dialog"
              className="group relative flex h-[240px] w-full items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#0A1024] text-left transition-colors hover:border-[#8FB2FF]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FB2FF] sm:h-[380px] lg:h-[500px]"
            >
              <img
                src={activePhoto.src}
                alt={`WINGS team photo ${activePhoto.index}`}
                loading="eager"
                className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-[1.01]"
              />
              <span className="absolute right-3 top-3 rounded-md border border-white/20 bg-black/65 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                <Maximize2 className="h-4 w-4" aria-hidden="true" />
              </span>
            </button>
            {photos.length > 1 && (
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => movePhoto(-1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-[#8FB2FF]/60 hover:bg-[#4F7CFF]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FB2FF]"
                  aria-label="Previous team photo"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <div className="flex items-center justify-center gap-2" aria-label="Choose team photo">
                  {photos.map((photo, index) => (
                    <button
                      key={photo.fileName}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      aria-label={`Show team photo ${index + 1}`}
                      aria-pressed={index === activeIndex}
                      className={`h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FB2FF] ${index === activeIndex ? 'w-6 bg-[#8FB2FF]' : 'w-2 bg-white/35 hover:bg-white/65'}`}
                    />
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => movePhoto(1)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition-colors hover:border-[#8FB2FF]/60 hover:bg-[#4F7CFF]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FB2FF]"
                  aria-label="Next team photo"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            )}
            <p className="text-center text-xs text-[#AAB2C8]" aria-live="polite">
              Photo {activeIndex + 1} of {photos.length}
            </p>
          </div>
        )}
      </div>

      {activePhoto && isLightboxOpen && (
        <ImageLightbox
          src={activePhoto.src}
          alt={`WINGS team photo ${activePhoto.index}`}
          caption={`Photo ${activePhoto.index} of ${photos.length}`}
          onClose={() => setIsLightboxOpen(false)}
          onPrevious={() => movePhoto(-1)}
          onNext={() => movePhoto(1)}
          returnFocusRef={returnFocusRef}
          fallbackFocusRef={galleryRef}
        />
      )}
    </section>
  );
};
