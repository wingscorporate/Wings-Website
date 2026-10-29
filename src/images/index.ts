/**
 * Image folders
 * -------------
 * Put your real photos in these folders inside `src/images`:
 *
 *   src/images/ad account ss/ads1.jpg … ads5.jpg          (5 max — Ads Manager screenshots)
 *   src/images/shopify ss/shopify1.jpg … shopify5.jpg     (5 max — Shopify backend screenshots)
 *   src/images/team photos/*                               (all supported image files)
 *   src/images/inbox ss/*                                  (all supported image files)
 *
 * Supported extensions: .jpg .jpeg .png .webp .avif
 *
 * Inbox screenshots are discovered automatically and sorted by filename.
 * Ads, Shopify, and team photo groups use numbered slots; missing numbers are
 * skipped so you can add those photos over time without touching any code.
 */

// NOTE: import.meta.glob() requires a LITERAL string pattern — it cannot take a
// variable or template literal, so each folder is declared explicitly here.
const AD_ACCOUNT_GLOB = import.meta.glob<string>('./ad account ss/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
  query: '?url'
});

const SHOPIFY_GLOB = import.meta.glob<string>('./shopify ss/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
  query: '?url'
});

const TEAM_GLOB = import.meta.glob<string>('./team photos/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
  query: '?url'
});

const INBOX_GLOB = import.meta.glob<string>('./inbox ss/*.{jpg,jpeg,png,webp,avif}', {
  eager: true,
  import: 'default',
  query: '?url'
});

/** Sort by the numeric part of the filename: ads1 < ads2 < ads10 */
const sortByNumber = (entries: [string, string][]): [string, string][] =>
  [...entries].sort((a, b) => {
    const numA = parseInt(a[0].match(/(\d+)(?!.*\d)/)?.[1] || '0', 10);
    const numB = parseInt(b[0].match(/(\d+)(?!.*\d)/)?.[1] || '0', 10);
    return numA - numB;
  });

export const MAX_SCREENSHOT_SLIDES = 5;

export type ShotSlide = {
  /** 1-based index, matches the filename number (ads1 -> 1) */
  index: number;
  fileName: string;
  src: string | null;
};

export type TeamPhoto = {
  index: number;
  fileName: string;
  src: string | null;
};

/** Build a fixed-length slot list for a filename prefix (ads / shopify / inbox) */
const buildSlots = (entries: [string, string][], prefix: string, max: number): ShotSlide[] => {
  const sorted = sortByNumber(entries);
  return Array.from({ length: max }, (_, i) => {
    const index = i + 1;
    const match = sorted.find(([path]) => parseInt(path.match(/(\d+)(?!.*\d)/)?.[1] || '0', 10) === index);
    return {
      index,
      fileName: `${prefix}${index}.jpg`,
      src: match ? match[1] : null
    };
  });
};

const entriesOf = (glob: Record<string, string> | undefined) => (glob ? Object.entries(glob) : []);

// ---- Ads Manager (Ad Account) screenshots: ads1..ads5 ----------------------
export const AD_ACCOUNT_SLIDES: ShotSlide[] = buildSlots(
  entriesOf(AD_ACCOUNT_GLOB),
  'ads',
  MAX_SCREENSHOT_SLIDES
);

// ---- Shopify screenshots: shopify1..shopify5 -------------------------------
export const SHOPIFY_SLIDES: ShotSlide[] = buildSlots(
  entriesOf(SHOPIFY_GLOB),
  'shopify',
  MAX_SCREENSHOT_SLIDES
);

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
