import { Box } from "@chakra-ui/react";
import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
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

/** Marketing shell: ambient bg + sticky promo banner/nav + routed page + footer. */
export function RootLayout() {
  return (
    <DemoModalProvider>
      <Box position="relative" minH="100vh">
        <AmbientBg />
        <ScrollManager />
        <Box position="sticky" top={0} zIndex={50}>
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
