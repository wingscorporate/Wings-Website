import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Image as ImageIcon, X } from 'lucide-react';

type ImageLightboxProps = {
  src: string;
  alt: string;
  caption: string;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  returnFocusRef: React.MutableRefObject<HTMLElement | null>;
  fallbackFocusRef?: React.MutableRefObject<HTMLElement | null>;
};

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  src,
  alt,
  caption,
  onClose,
  onPrevious,
  onNext,
  returnFocusRef,
  fallbackFocusRef
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const actionsRef = useRef({ onClose, onPrevious, onNext });
  const [hasError, setHasError] = useState(false);
  actionsRef.current = { onClose, onPrevious, onNext };

  useEffect(() => {
    setHasError(false);
  }, [src]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        actionsRef.current.onClose();
      } else if (event.key === 'ArrowLeft' && actionsRef.current.onPrevious) {
        event.preventDefault();
        actionsRef.current.onPrevious();
      } else if (event.key === 'ArrowRight' && actionsRef.current.onNext) {
        event.preventDefault();
        actionsRef.current.onNext();
      } else if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled])');
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      if (returnFocusRef.current?.isConnected) {
        returnFocusRef.current.focus();
      } else {
        fallbackFocusRef?.current?.focus();
      }
    };
  }, [fallbackFocusRef, returnFocusRef]);

  return createPortal(
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-3 backdrop-blur-xl sm:p-6"
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        onClick={onClose}
        className="absolute right-3 top-3 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-[#0A1024] text-white shadow-lg transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FB2FF] sm:right-5 sm:top-5"
        aria-label="Close image preview"
      >
        <X className="h-6 w-6" aria-hidden="true" />
      </button>

      {onPrevious && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onPrevious();
          }}
          className="absolute left-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FB2FF] sm:left-5"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
      )}

      <div className="flex h-full w-full items-center justify-center px-10 py-14 sm:px-16">
        <figure className="relative flex max-h-full max-w-full flex-col items-center justify-center">
          {hasError ? (
            <div className="flex h-48 w-64 flex-col items-center justify-center gap-3 rounded-xl border border-white/15 bg-[#0A1024] text-sm text-[#AAB2C8]">
              <ImageIcon className="h-8 w-8" aria-hidden="true" />
              This image could not be loaded.
            </div>
          ) : (
            <img
              src={src}
              alt={alt}
              onClick={(event) => event.stopPropagation()}
              onError={() => setHasError(true)}
              className="max-h-[calc(100dvh-8rem)] max-w-[calc(100vw-5rem)] rounded-lg object-contain sm:max-h-[calc(100dvh-7rem)] sm:max-w-[calc(100vw-9rem)]"
            />
          )}
          <figcaption className="pt-3 text-center text-[11px] font-mono text-[#AAB2C8]">
            {caption}
          </figcaption>
        </figure>
      </div>

      {onNext && (
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onNext();
          }}
          className="absolute right-2 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/65 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8FB2FF] sm:right-5"
          aria-label="Next image"
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </div>,
    document.body
  );
};