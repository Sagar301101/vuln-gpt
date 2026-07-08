import { Box, Flex, Heading, Text, type BoxProps } from "@chakra-ui/react";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { gradients } from "@/theme";

/** Small uppercase mint eyebrow/label above headings. */
export function Eyebrow({ children, ...rest }: BoxProps) {
  return (
    <Text
      fontSize="13px"
      letterSpacing="2px"
      color="brand.mint"
      textTransform="uppercase"
      {...rest}
    >
      {children}
    </Text>
  );
}

/** Centered eyebrow + H2 block used at the top of most sections. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  maxW,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "center" | "start";
  maxW?: string;
}) {
  const isCenter = align === "center";
  return (
    <Box textAlign={isCenter ? "center" : "left"}>
      {eyebrow && <Eyebrow mb="14px">{eyebrow}</Eyebrow>}
      <Heading
        as="h2"
        fontSize={{ base: "30px", md: "46px" }}
        lineHeight="1.08"
        m={0}
      >
        {title}
      </Heading>
      {subtitle && (
        <Text
          fontSize={{ base: "15px", md: "17px" }}
          color="wa.55"
          mt="14px"
          maxW={maxW ?? (isCenter ? "620px" : undefined)}
          mx={isCenter ? "auto" : undefined}
        >
          {subtitle}
        </Text>
      )}
    </Box>
  );
}

/** Text with the signature brand gradient clipped to the glyphs. */
export function GradientText({
  children,
  gradient = gradients.brandText,
  ...rest
}: BoxProps & { gradient?: string }) {
  return (
    <Box
      as="span"
      bgGradient={undefined}
      style={{
        background: gradient,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
      }}
      {...rest}
    >
      {children}
    </Box>
  );
}

/** Rounded feature tag chip. */
export function Chip({ children }: { children: ReactNode }) {
  return (
    <Text
      as="span"
      fontSize="11.5px"
      color="wa.60"
      px="10px"
      py="5px"
      borderRadius="8px"
      bg="wa.4"
      border="1px solid"
      borderColor="wa.7"
    >
      {children}
    </Text>
  );
}

/** Check-marked list row. */
export function CheckRow({
  children,
  color = "#2FBF70",
  muted = false,
}: {
  children: ReactNode;
  color?: string;
  muted?: boolean;
}) {
  return (
    <Flex gap="11px" fontSize="14px" color={muted ? "wa.45" : "wa.82"} lineHeight="1.5">
      <Check
        size={17}
        color={muted ? "rgba(255,255,255,0.3)" : color}
        style={{ flexShrink: 0, marginTop: 1 }}
      />
      <Box>{children}</Box>
    </Flex>
  );
}

/** Tinted rounded icon tile (used across capability/feature cards). */
export function IconTile({
  children,
  accent = "green",
  size = "52px",
  gradient,
}: {
  children: ReactNode;
  accent?: "green" | "violet";
  size?: string;
  gradient?: boolean;
}) {
  const bg = gradient
    ? gradients.iconTile
    : accent === "green"
      ? "rgba(47,191,112,0.12)"
      : "rgba(123,108,246,0.12)";
  return (
    <Flex
      w={size}
      h={size}
      borderRadius="13px"
      align="center"
      justify="center"
      flexShrink={0}
      style={{ background: bg }}
    >
      {children}
    </Flex>
  );
}
