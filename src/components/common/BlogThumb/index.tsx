import { Box } from "@chakra-ui/react";

/** Dot-grid gradient thumbnail used for blog cards (no raster images in design). */
export function BlogThumb({ gradient, h = "170px" }: { gradient: string; h?: string }) {
  return (
    <Box h={h} position="relative" style={{ background: gradient }}>
      <Box
        position="absolute"
        inset={0}
        backgroundImage="radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)"
        backgroundSize="18px 18px"
      />
    </Box>
  );
}
