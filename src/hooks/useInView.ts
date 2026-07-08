import { useEffect, useRef, useState } from "react";

/**
 * Returns a ref + boolean that flips to true once the element enters the
 * viewport. Once triggered it stays true (fire-once reveal behavior).
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
  rootMargin = "0px 0px -10% 0px",
) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { rootMargin, threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [inView, rootMargin]);

  return { ref, inView };
}
