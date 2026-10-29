import { useEffect, useState, type RefObject } from 'react';

/** Stop autoplay in hidden tabs, offscreen, during boot, and for reduced motion. */
export function useViewportActivity(ref: RefObject<HTMLElement | null>) {
  const [active, setActive] = useState(false);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = !('IntersectionObserver' in window);
    const update = () => setActive(visible && !document.hidden && !reduced.matches && !document.documentElement.classList.contains('app-loading'));
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; update(); }) : null;
    observer?.observe(element);
    document.addEventListener('visibilitychange', update);
    window.addEventListener('wings:revealed', update);
    reduced.addEventListener('change', update);
    update();
    return () => {
      observer?.disconnect();
      document.removeEventListener('visibilitychange', update);
      window.removeEventListener('wings:revealed', update);
      reduced.removeEventListener('change', update);
    };
  }, [ref]);
  return active;
}
