import { useEffect, useRef, useState } from "react";

/**
 * Animates an integer from 0 → target using requestAnimationFrame with an
 * ease-out-cubic curve. Starts when `active` becomes true (pair with an
 * IntersectionObserver so counters run when scrolled into view).
 */
export function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  const raf = useRef<number>();

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const tick = (now: number) => {
      if (start === null) start = now;
      const p = Math.min(1, (now - start) / duration);
      const e = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * e));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, active, duration]);

  return value;
}
