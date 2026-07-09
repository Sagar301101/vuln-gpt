import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const blobs = [
  {
    w: "560px",
    h: "560px",
    top: "-160px",
    left: "-120px",
    bg: "radial-gradient(circle, rgba(47,191,112,0.55), transparent 62%)",
    animate: { x: [0, 40, -20, 0], y: [0, 30, -10, 0], scale: [1, 1.08, 0.96, 1] },
    duration: 22,
  },
  {
    w: "620px",
    h: "620px",
    top: "-60px",
    right: "-160px",
    bg: "radial-gradient(circle, rgba(123,108,246,0.55), transparent 62%)",
    animate: { x: [0, -30, 20, 0], y: [0, -20, 15, 0], scale: [1, 0.94, 1.06, 1] },
    duration: 26,
  },
  {
    w: "420px",
    h: "420px",
    bottom: "-140px",
    left: "30%",
    bg: "radial-gradient(circle, rgba(91,143,230,0.45), transparent 62%)",
    animate: { x: [0, 25, -25, 0], y: [0, -15, 15, 0] },
    duration: 30,
  },
];

/**
 * Reusable animated blob/gradient background — used behind the hero and the
 * blog listing hero. Fixed opacity band (0.2–0.4) keeps foreground text
 * readable while still feeling alive.
 */
export function AnimatedGradientBg({ opacity = 0.32 }: { opacity?: number }) {
  return (
    <Box position="absolute" inset={0} overflow="hidden" pointerEvents="none" zIndex={0} opacity={opacity}>
      {blobs.map((b, i) => (
        <MotionBox
          key={i}
          position="absolute"
          w={b.w}
          h={b.h}
          top={b.top}
          left={b.left}
          right={b.right}
          bottom={b.bottom}
          filter="blur(30px)"
          background={b.bg}
          animate={b.animate}
          transition={{ duration: b.duration, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      ))}
      <Box
        position="absolute"
        inset={0}
        backgroundImage="radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)"
        backgroundSize="40px 40px"
        sx={{ maskImage: "radial-gradient(ellipse 80% 60% at 50% 40%, #000, transparent)" }}
      />
    </Box>
  );
}
