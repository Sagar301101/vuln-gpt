import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

/**
 * Tracks whether the hero section (#top) is currently intersecting the
 * viewport. Unlike useInView this re-evaluates both ways, since the nav CTA
 * needs to re-hide if the user scrolls back up into the hero. Routes with no
 * hero (e.g. Blog) resolve to `false` (button shown).
 */
export function useHeroVisible() {
  const { pathname } = useLocation();
  const [heroVisible, setHeroVisible] = useState(pathname === "/");

  useEffect(() => {
    const el = document.getElementById("top");
    if (!el) {
      setHeroVisible(false);
      return;
    }
    const obs = new IntersectionObserver(([entry]) => setHeroVisible(entry.isIntersecting), {
      rootMargin: "-72px 0px 0px 0px",
      threshold: 0,
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [pathname]);

  return heroVisible;
}
