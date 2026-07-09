import { Box } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { AmbientBg } from "@/components/layout/AmbientBg";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { PromoBanner } from "@/components/layout/PromoBanner";
import { DemoModalProvider } from "@/context/DemoModalContext";
import { DemoModal } from "@/components/layout/DemoModal";

/** Scrolls to top on route change, or to the hash target if present. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Wait a tick for the target section to render before scrolling.
      const id = hash.replace("#", "");
      requestAnimationFrame(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [pathname, hash]);
  return null;
}

/**
 * Measures the live height of the sticky promo-banner + nav header and
 * publishes it as a CSS var, so anchor-scroll offsets (scroll-margin-top /
 * scroll-padding-top) always clear it exactly instead of relying on a
 * guessed static value that drifts when the banner's content changes.
 */
function useStickyHeaderHeightVar(ref: RefObject<HTMLDivElement>) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const setVar = () => {
      document.documentElement.style.setProperty("--sticky-header-h", `${el.offsetHeight}px`);
    };
    setVar();
    const observer = new ResizeObserver(setVar);
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref]);
}

/** Marketing shell: ambient bg + sticky promo banner/nav + routed page + footer. */
export function RootLayout() {
  const stickyHeaderRef = useRef<HTMLDivElement>(null);
  useStickyHeaderHeightVar(stickyHeaderRef);

  return (
    <DemoModalProvider>
      <Box position="relative" minH="100vh">
        <AmbientBg />
        <ScrollManager />
        <Box ref={stickyHeaderRef} position="sticky" top={0} zIndex={50}>
          <PromoBanner />
          <Nav />
        </Box>
        <Box as="main" position="relative" zIndex={1}>
          <Outlet />
        </Box>
        <Box position="relative" zIndex={1}>
          <Footer />
        </Box>
        <DemoModal />
      </Box>
    </DemoModalProvider>
  );
}
