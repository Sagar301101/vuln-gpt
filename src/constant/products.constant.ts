// Products data (ported from the Products section). Each card links to an external site.
export type Product = {
  id: string;
  name: string;
  subtitle: string;
  /** External URL for the primary "View Product" action. */
  viewHref: string;
  icon: string; // short mark shown in the gradient tile
  iconGradient: string;
  pill: { label: string; color: string; border: string };
  description: string;
  accent: "green" | "violet";
  ctaLabel: string;
  ctaColor: string;
  features: string[];
};

export const PRODUCTS: Product[] = [
  {
    id: "hacktools",
    name: "HackTools++",
    subtitle: "Browser-native testing suite",
    viewHref: "https://hacktool.vulnshields.net/",
    icon: "H+",
    iconGradient: "linear-gradient(135deg,#2FBF70,#7B6CF6)",
    pill: { label: "LIVE", color: "#9CE1B6", border: "rgba(47,191,112,0.35)" },
    description:
      "A security testing suite built right inside Chrome DevTools. No proxy, no certificates, no traffic redirection — install, inspect, start testing.",
    accent: "green",
    ctaLabel: "Open HackTools++",
    ctaColor: "#67D093",
    features: [
      "Repeater",
      "Intruder",
      "Client-side scanner",
      "Live CVE intel",
      "AI risk hints",
    ],
  },
  {
    id: "runtime-secret-scanner",
    name: "Runtime Secret Scanner",
    subtitle: "AI secret detection",
    viewHref: "https://ai.vulnshields.net/",
    icon: "RS",
    iconGradient: "linear-gradient(135deg,#7B6CF6,#2FBF70)",
    pill: { label: "AI", color: "#9D8CFF", border: "rgba(123,108,246,0.4)" },
    description:
      "Finds secrets inside JavaScript — static and at runtime. Our AI engine watches real execution to catch API keys, tokens and credentials before attackers do.",
    accent: "violet",
    ctaLabel: "Scan your app",
    ctaColor: "#9D8CFF",
    features: [
      "Static + runtime JS",
      "API keys & tokens",
      "Credentials",
      "Pre-leak alerts",
    ],
  },
  {
    id: "janplus",
    name: "JanPlus",
    subtitle: "Real-time intelligence",
    viewHref: "https://janplus.vulnshields.net/",
    icon: "J+",
    iconGradient: "linear-gradient(135deg,#2FBF70,#5B8FE6,#7B6CF6)",
    pill: { label: "WAR ROOM", color: "#9CE1B6", border: "rgba(47,191,112,0.35)" },
    description:
      "Listen → Understand → Decide → Act. A real-time war-room that detects hostile narratives in 60 seconds and drafts an audit-clean response before the cycle moves.",
    accent: "green",
    ctaLabel: "See JanPlus",
    ctaColor: "#67D093",
    features: ["60s detection", "22+ languages", "Audit-clean", "Human approval"],
  },
];
