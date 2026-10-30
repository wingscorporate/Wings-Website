/**
 * Image folders
 * -------------
 * Put your real photos in these folders inside `src/images`:
 *
 *   src/images/ad account ss/*                             (all supported image files)
 *   src/images/shopify ss/*                                (all supported image files)
 *   src/images/team photos/*                               (all supported image files)
 *   src/images/inbox ss/*                                  (all supported image files)
 *
 * Supported extensions: .jpg .jpeg .png .webp .avif
 *
 * Screenshots are discovered automatically and sorted naturally by filename.
 * Ads and Shopify originals work directly; optimized copies are used when available.
 */

// NOTE: import.meta.glob() requires a LITERAL string pattern — it cannot take a
// variable or template literal, so each folder is declared explicitly here.
const AD_ACCOUNT_GLOB = import.meta.glob<string>('./optimized/ad account ss/*.webp', {
  eager: true,
  import: 'default',
  query: '?url'
});

const SHOPIFY_GLOB = import.meta.glob<string>('./optimized/shopify ss/*.webp', {
  eager: true,
  import: 'default',
  query: '?url'
});

const TEAM_GLOB = import.meta.glob<string>('./optimized/team photos/*.webp', {
  eager: true,
  import: 'default',
  query: '?url'
});

const INBOX_GLOB = import.meta.glob<string>('./optimized/inbox ss/*.webp', {
  eager: true,
  import: 'default',
  query: '?url'
});

export type ShotSlide = {
  /** 1-based position in the sorted screenshot list */
  index: number;
  fileName: string;
  src: string | null;
};

export type TeamPhoto = {
  index: number;
  fileName: string;
  src: string | null;
};

// Originals are discovered directly, so new uploads do not need a build-time
// optimization step or a particular filename. Use an optimized copy when present.
const AD_ACCOUNT_ORIGINALS = import.meta.glob<string>('./ad account ss/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}', {
  eager: true, import: 'default', query: '?url'
});
const SHOPIFY_ORIGINALS = import.meta.glob<string>('./shopify ss/*.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}', {
  eager: true, import: 'default', query: '?url'
});

const entriesOf = (glob: Record<string, string> | undefined) => (glob ? Object.entries(glob).filter(([path]) => !path.endsWith('.small.webp')) : []);

const discoverScreenshots = (originals: Record<string, string>, optimized: Record<string, string>): ShotSlide[] => {
  const entries = entriesOf(originals);
  return (entries.length ? entries : entriesOf(optimized))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }))
    .map(([path, src], position) => ({
      index: position + 1,
      fileName: path.split('/').pop() || 'screenshot',
      src: optimized[path.replace('./', './optimized/') + '.webp'] || src
    }));
};

export const AD_ACCOUNT_SLIDES = discoverScreenshots(AD_ACCOUNT_ORIGINALS, AD_ACCOUNT_GLOB);
export const SHOPIFY_SLIDES = discoverScreenshots(SHOPIFY_ORIGINALS, SHOPIFY_GLOB);

// ---- Inbox / testimonial screenshots: include every supported image --------
export const INBOX_SLIDES: ShotSlide[] = entriesOf(INBOX_GLOB)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true, sensitivity: 'base' }))
  .map(([path, src], position) => ({
    index: position + 1,
    fileName: path.split('/').pop() || `inbox-${position + 1}`,
    src
  }));

// ---- Team photos: include every supported image -----------------------------
export const TEAM_PHOTOS: TeamPhoto[] = entriesOf(TEAM_GLOB)
  .sort(([pathA], [pathB]) => pathA.localeCompare(pathB, undefined, { numeric: true, sensitivity: 'base' }))
  .map(([path, src], position) => ({
    index: position + 1,
    fileName: path.split('/').pop() || `team-photo-${position + 1}`,
    src
  }));

/** Convenience: only the images that are actually present */
export const adAccountImages = AD_ACCOUNT_SLIDES.filter((s) => s.src).map((s) => s.src as string);
export const shopifyImages = SHOPIFY_SLIDES.filter((s) => s.src).map((s) => s.src as string);
export const inboxImages = INBOX_SLIDES.filter((s) => s.src).map((s) => s.src as string);
export const teamImages = TEAM_PHOTOS.filter((p) => p.src).map((p) => p.src as string);

import metadata from './optimized/metadata.json';
const SMALL_IMAGES = import.meta.glob<string>('./optimized/*/*.small.webp', { eager: true, import: 'default', query: '?url' });
const ALL_IMAGES = { ...AD_ACCOUNT_GLOB, ...SHOPIFY_GLOB, ...TEAM_GLOB, ...INBOX_GLOB };

export function responsiveImage(src: string) {
  const entry = Object.entries(ALL_IMAGES).find(([, url]) => url === src);
  if (!entry) return {};
  const [path] = entry;
  const name = path.split('/').pop()!;
  const size = metadata[name as keyof typeof metadata];
  const small = SMALL_IMAGES[path.replace(/\.webp$/, '.small.webp')];
  if (!size) return {};
  return { width: size.width, height: size.height, srcSet: small && size.smallWidth < size.width ? `${small} ${size.smallWidth}w, ${src} ${size.width}w` : undefined, sizes: '(max-width: 640px) 90vw, (max-width: 1024px) 85vw, 1000px' };
}
