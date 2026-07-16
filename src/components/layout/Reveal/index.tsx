import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Fade/slide-up on scroll into view. Uses framer-motion's whileInView so it
 * fires once and respects reduced-motion via the CSS override.
 */
export function Reveal({
  children,
  delay = 0,
  y = 30,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      // minWidth 0 overrides the browser's grid/flex-item default of "auto" — without it, a wide
      // un-shrinkable child (e.g. a large image) forces the whole track past the viewport.
      style={{ minWidth: 0 }}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
