import { Box, Flex, IconButton } from "@chakra-ui/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { colors } from "@/theme";

type CarouselProps = {
  /** One card per slide — pass an array of elements. */
  children: ReactNode[];
  /** Slide width (controls how much of the next card peeks in). */
  itemMinW?: string;
  gap?: string;
};

/** Scroll-snap carousel with prev/next controls pinned bottom-right. Pass cards as children to reuse across sections. */
export function Carousel({ children, itemMinW = "82%", gap = "16px" }: CarouselProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);

  const scrollByAmount = (dir: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const item = el.firstElementChild as HTMLElement | null;
    const amount = (item?.offsetWidth ?? el.clientWidth) + parseInt(gap, 10);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <Box position="relative">
      <Flex
        ref={scrollerRef}
        overflowX="auto"
        overflowY="hidden"
        alignItems="stretch"
        gap={gap}
        pb="4px"
        scrollSnapType="x mandatory"
        css={{
          "&::-webkit-scrollbar": { display: "none" },
          scrollbarWidth: "none",
        }}
      >
        {children.map((child, i) => (
          <Flex key={i} flex={`0 0 ${itemMinW}`} scrollSnapAlign="start">
            {child}
          </Flex>
        ))}
      </Flex>

      <Flex justify="flex-end" gap="10px" mt="18px">
        <IconButton
          aria-label="Previous"
          icon={<ChevronLeft size={18} />}
          onClick={() => scrollByAmount(-1)}
          borderRadius="pill"
          size="sm"
          bg="transparent"
          color={colors.brand.violetText}
          border="1.5px solid"
          borderColor="rgba(123,108,246,0.45)"
          _hover={{ bg: "wa.5", borderColor: "rgba(123,108,246,0.7)" }}
          _active={{ bg: "wa.7" }}
        />
        <IconButton
          aria-label="Next"
          icon={<ChevronRight size={18} />}
          onClick={() => scrollByAmount(1)}
          borderRadius="pill"
          size="sm"
          bg="transparent"
          color={colors.brand.violetText}
          border="1.5px solid"
          borderColor="rgba(123,108,246,0.45)"
          _hover={{ bg: "wa.5", borderColor: "rgba(123,108,246,0.7)" }}
          _active={{ bg: "wa.7" }}
        />
      </Flex>
    </Box>
  );
}
