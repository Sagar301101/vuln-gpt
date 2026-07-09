import { Box } from "@chakra-ui/react";

/**
 * Fixed, non-interactive ambient background: dot grid + two blurred glow blobs.
 * Sits behind all content (z-index 0).
 */
export function AmbientBg() {
  return (
    <>
      <Box
        position="fixed"
        inset={0}
        zIndex={0}
        pointerEvents="none"
        opacity={0.5}
        backgroundImage="radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1px)"
        backgroundSize="46px 46px"
      />
      <Box
        position="fixed"
        top="-220px"
        left="-160px"
        w="680px"
        h="680px"
        maxW="90vw"
        zIndex={0}
        pointerEvents="none"
        filter="blur(20px)"
        background="radial-gradient(circle, rgba(47,191,112,0.20), transparent 62%)"
      />
      <Box
        position="fixed"
        top="340px"
        right="-220px"
        w="720px"
        h="720px"
        maxW="90vw"
        zIndex={0}
        pointerEvents="none"
        filter="blur(20px)"
        background="radial-gradient(circle, rgba(123,108,246,0.20), transparent 62%)"
      />
    </>
  );
}
