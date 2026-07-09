import { Box, type BoxProps } from "@chakra-ui/react";
import { layout } from "@/theme";

type SectionProps = BoxProps & {
  /** anchor id for nav scroll targets */
  id?: string;
  /** inner max width override */
  innerMaxW?: string;
};

/**
 * Consistent section shell: full-bleed outer with vertical padding + a centered
 * 1240px inner container with horizontal gutters. Every page section uses it.
 */
export function Section({
  id,
  children,
  innerMaxW = layout.maxW,
  py,
  ...rest
}: SectionProps) {
  return (
    <Box
      as="section"
      id={id}
      position="relative"
      px={layout.px}
      py={py ?? layout.sectionY}
      scrollMarginTop="92px"
      {...rest}
    >
      <Box maxW={innerMaxW} mx="auto">
        {children}
      </Box>
    </Box>
  );
}
