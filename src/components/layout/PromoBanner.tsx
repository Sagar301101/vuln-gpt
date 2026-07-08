import { Box, Flex, Link, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import { gradients } from "@/theme";

/** Thin sticky announcement bar — a single line slides fully across on loop, pauses on hover. */
export function PromoBanner() {
  return (
    <Box
      position="relative"
      overflow="hidden"
      py="10px"
      color="white"
      fontSize={{ base: "12.5px", md: "13.5px" }}
      fontWeight={500}
      sx={{
        background: gradients.cta,
        "&:hover .promo-track": { animationPlayState: "paused" },
      }}
    >
      <Flex
        className="promo-track"
        align="center"
        gap="10px"
        w="max-content"
        whiteSpace="nowrap"
        sx={{ animation: "slideAcross 30s linear infinite" }}
      >
        <Link
          href="https://chromewebstore.google.com/detail/hacktools++/efankginpnlgimphkgjaifmmfchekecp"
          isExternal
          display="inline-flex"
          alignItems="center"
          gap="5px"
          fontWeight={700}
          _hover={{ textDecoration: "underline" }}
        >
        <Text as="span">
          Introducing <Box as="strong">HackTool++</Box> — The Ultimate Vulnerability Assessment
          Toolkit.
        </Text>
        
          Learn More <ArrowRight size={14} />
        </Link>
      </Flex>
    </Box>
  );
}
