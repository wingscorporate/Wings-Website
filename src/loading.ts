/** Resolve only resources needed by the initial viewport, never entire galleries. */
export async function prepareInitialView(signal: AbortSignal) {
  const images = Array.from(document.querySelectorAll<HTMLImageElement>('#root img'))
    .filter((image) => image.getBoundingClientRect().top < window.innerHeight);
  const tasks: Promise<unknown>[] = images.map(async (image) => {
    image.loading = 'eager';
    image.fetchPriority = 'high';
    try { await image.decode(); } catch { /* A failed image must not block entry. */ }
  });
  if (document.fonts) {
    tasks.push(document.fonts.load('500 16px "Plus Jakarta Sans"'));
    tasks.push(document.fonts.load('700 32px "Space Grotesk"'));
  }
  const progress = document.getElementById('boot-progress') as HTMLProgressElement | null;
  let completed = 0;
  if (progress) { progress.max = tasks.length + 1; progress.value = 0; }
  const advance = () => { if (!signal.aborted && progress) progress.value = ++completed; };
  await Promise.allSettled(tasks.map((task) => task.finally(advance)));
  if (signal.aborted) return;
  // Two frames allow React's committed layout and the critical styles to paint.
  await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  if (signal.aborted) return;
  advance();
  performance.mark('wings-critical-ready');
  window.dispatchEvent(new Event('wings:ready'));
}
