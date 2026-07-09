// VulnShields — Chakra UI theme
// Encodes the design-handoff tokens (colors, gradients, radii, fonts).
import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

// Brand + severity palette (see design handoff "Design Tokens")
export const colors = {
  bg: "#08080B",
  surface: "#121216",
  surfaceAlt: "#101015",
  panel: "#0D0D12",
  codeBg: "#0A0A0E",
  codeBgDeep: "#070709",
  inputBg: "#16161C",
  brand: {
    green: "#2FBF70",
    greenBright: "#18E0A0", // logo icon
    violet: "#7B6CF6",
    blue: "#5B8FE6",
    mint: "#9CE1B6",
    greenText: "#67D093",
    violetText: "#9D8CFF",
  },
  severity: {
    critical: "#FF5C5C",
    criticalText: "#FF6B6B",
    critSoft: "#FF8E8E",
    high: "#EC7272",
    medium: "#FFA85C",
    low: "#FFD66B",
    ok: "#7BE0A8",
  },
  // white-alpha steps used throughout the design
  wa: {
    85: "rgba(255,255,255,0.85)",
    82: "rgba(255,255,255,0.82)",
    78: "rgba(255,255,255,0.78)",
    72: "rgba(255,255,255,0.72)",
    70: "rgba(255,255,255,0.70)",
    60: "rgba(255,255,255,0.60)",
    55: "rgba(255,255,255,0.55)",
    50: "rgba(255,255,255,0.50)",
    45: "rgba(255,255,255,0.45)",
    40: "rgba(255,255,255,0.40)",
    32: "rgba(255,255,255,0.32)",
    18: "rgba(255,255,255,0.18)",
    12: "rgba(255,255,255,0.12)",
    10: "rgba(255,255,255,0.10)",
    8: "rgba(255,255,255,0.08)",
    7: "rgba(255,255,255,0.07)",
    5: "rgba(255,255,255,0.05)",
    4: "rgba(255,255,255,0.04)",
    3: "rgba(255,255,255,0.03)",
  },
};

// Signature gradients
export const gradients = {
  brand: "linear-gradient(90deg, #2FBF70, #7B6CF6)",
  brandText: "linear-gradient(100deg, #2FBF70, #5B8FE6 55%, #7B6CF6)",
  brandTextAlt: "linear-gradient(120deg, #2FBF70, #7B6CF6)",
  cta: "linear-gradient(110deg, #2FBF70, #5B8FE6 50%, #7B6CF6)",
  iconTile: "linear-gradient(135deg, #2FBF70, #7B6CF6)",
};

export const radii = {
  input: "12px",
  card: "20px",
  cardLg: "22px",
  pill: "999px",
  cta: "28px",
};

// Layout constants reused across the site.
export const layout = {
  maxW: "1240px",
  px: { base: "20px", md: "32px" },
  sectionY: { base: "56px", md: "80px" },
};

const theme = extendTheme({
  config,
  colors,
  fonts: {
    heading: `Nexa, system-ui, sans-serif`,
    body: `Roboto, system-ui, sans-serif`,
    mono: `ui-monospace, SFMono-Regular, Menlo, monospace`,
  },
  fontWeights: { normal: 400, medium: 500, bold: 700, extrabold: 800 },
  radii,
  styles: {
    global: {
      html: {
        scrollBehavior: "smooth",
        scrollPaddingTop: "var(--sticky-header-h, 92px)",
        overflowX: "hidden",
      },
      body: {
        bg: colors.bg,
        color: "white",
        WebkitFontSmoothing: "antialiased",
        overflowX: "hidden",
        maxWidth: "100vw",
      },
      "::selection": { background: "rgba(123,108,246,0.4)" },
      // Custom scrollbar to match the dark theme.
      "::-webkit-scrollbar": { width: "10px", height: "10px" },
      "::-webkit-scrollbar-track": { background: colors.bg },
      "::-webkit-scrollbar-thumb": {
        background: "rgba(255,255,255,0.12)",
        borderRadius: "999px",
      },
    },
  },
  components: {
    Button: {
      baseStyle: { fontFamily: "body", borderRadius: "pill" },
      variants: {
        brand: {
          bgGradient: gradients.brand,
          color: "white",
          fontWeight: 700,
          boxShadow: "0 12px 32px rgba(123,108,246,0.35)",
          _hover: { filter: "brightness(1.06)", _disabled: { filter: "none" } },
          _active: { filter: "brightness(0.96)" },
        },
        outlineSubtle: {
          border: "1px solid",
          borderColor: "wa.18",
          color: "white",
          bg: "transparent",
          fontWeight: 600,
          _hover: { bg: "wa.5", borderColor: "wa.12" },
        },
      },
    },
    Heading: {
      baseStyle: { fontFamily: "heading", fontWeight: 800, letterSpacing: "-0.5px" },
    },
    Link: {
      baseStyle: { _hover: { textDecoration: "none" } },
    },
  },
});

export default theme;
