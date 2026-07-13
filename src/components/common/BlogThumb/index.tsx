import { Box, Image } from "@chakra-ui/react";

/** Blog card thumbnail: renders a featured image when provided, otherwise a dot-grid gradient placeholder. */
export function BlogThumb({ gradient, image, alt, h = "170px" }: { gradient: string; image?: string; alt?: string; h?: string }) {
  return (
    <Box h={h} position="relative" style={{ background: gradient }} overflow="hidden">
      {image ? (
        <Image src={image} alt={alt ?? ""} w="100%" h="100%" objectFit="cover" />
      ) : (
        <Box
          position="absolute"
          inset={0}
          backgroundImage="radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)"
          backgroundSize="18px 18px"
        />
      )}
    </Box>
  );
}
