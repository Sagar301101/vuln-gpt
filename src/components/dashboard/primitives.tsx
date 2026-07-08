import {
  Box,
  Flex,
  Text,
  type BoxProps,
  type FlexProps,
} from "@chakra-ui/react";
import type { ReactNode } from "react";
import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { gradients } from "@/theme";

/* -------------------------------------------------------------------------- */
/*  Card                                                                        */
/* -------------------------------------------------------------------------- */

/** The standard dashboard card surface (matches the marketing card pattern). */
export function DashCard({ children, ...rest }: BoxProps) {
  return (
    <Box
      bg="surface"
      border="1px solid"
      borderColor="wa.8"
      borderRadius="20px"
      p={{ base: "18px", md: "22px" }}
      {...rest}
    >
      {children}
    </Box>
  );
}

/* -------------------------------------------------------------------------- */
/*  Status pill                                                                 */
/* -------------------------------------------------------------------------- */

export type PillTone =
  | "green"
  | "blue"
  | "violet"
  | "muted"
  | "red"
  | "orange"
  | "yellow";

const PILL_TONES: Record<PillTone, { bg: string; color: string; border: string }> =
  {
    green: {
      bg: "rgba(47,191,112,0.12)",
      color: "brand.greenText",
      border: "rgba(47,191,112,0.4)",
    },
    blue: {
      bg: "rgba(91,143,230,0.14)",
      color: "brand.blue",
      border: "rgba(91,143,230,0.42)",
    },
    violet: {
      bg: "rgba(123,108,246,0.14)",
      color: "brand.violetText",
      border: "rgba(123,108,246,0.45)",
    },
    muted: {
      bg: "wa.5",
      color: "wa.55",
      border: "rgba(255,255,255,0.14)",
    },
    red: {
      bg: "rgba(255,92,92,0.13)",
      color: "severity.criticalText",
      border: "rgba(255,92,92,0.42)",
    },
    orange: {
      bg: "rgba(255,168,92,0.13)",
      color: "severity.medium",
      border: "rgba(255,168,92,0.42)",
    },
    yellow: {
      bg: "rgba(255,214,107,0.13)",
      color: "severity.low",
      border: "rgba(255,214,107,0.42)",
    },
  };

/** Maps common status strings to a tone so callers can just pass a label. */
export function statusTone(status: string): PillTone {
  const s = status.toLowerCase();
  if (["completed", "active", "paid", "enabled", "online"].includes(s)) return "green";
  if (["running", "in progress", "processing"].includes(s)) return "blue";
  if (["queued", "pending", "invited", "draft"].includes(s)) return "muted";
  if (["failed", "revoked", "error", "overdue"].includes(s)) return "red";
  if (["critical"].includes(s)) return "red";
  if (["high", "warning"].includes(s)) return "orange";
  if (["medium", "low"].includes(s)) return "yellow";
  return "muted";
}

export function StatusPill({
  label,
  tone,
  dot = false,
  pulse = false,
  ...rest
}: {
  label: string;
  tone?: PillTone;
  dot?: boolean;
  pulse?: boolean;
} & FlexProps) {
  const t = PILL_TONES[tone ?? statusTone(label)];
  return (
    <Flex
      as="span"
      display="inline-flex"
      align="center"
      gap="6px"
      px="10px"
      py="4px"
      borderRadius="pill"
      bg={t.bg}
      color={t.color}
      border="1px solid"
      borderColor={t.border}
      fontSize="12px"
      fontWeight={600}
      lineHeight="1.4"
      whiteSpace="nowrap"
      {...rest}
    >
      {dot && (
        <Box
          w="6px"
          h="6px"
          borderRadius="pill"
          bg="currentColor"
          sx={
            pulse
              ? {
                  animation: "vsPulse 1.4s ease-in-out infinite",
                  "@keyframes vsPulse": {
                    "0%,100%": { opacity: 1 },
                    "50%": { opacity: 0.25 },
                  },
                }
              : undefined
          }
        />
      )}
      {label}
    </Flex>
  );
}

/* -------------------------------------------------------------------------- */
/*  KPI card                                                                    */
/* -------------------------------------------------------------------------- */

export function KpiCard({
  label,
  value,
  icon: Icon,
  accent = "green",
  delta,
  deltaPositive = true,
  deltaGood,
}: {
  label: string;
  value: string;
  icon: LucideIcon;
  accent?: "green" | "violet" | "blue" | "red";
  delta?: string;
  /** direction of the arrow */
  deltaPositive?: boolean;
  /** whether the delta is a good thing (overrides color); defaults to deltaPositive */
  deltaGood?: boolean;
}) {
  const accentColor =
    accent === "green"
      ? "#18E0A0"
      : accent === "violet"
        ? "#9D8CFF"
        : accent === "blue"
          ? "#5B8FE6"
          : "#FF6B6B";
  const accentBg =
    accent === "green"
      ? "rgba(47,191,112,0.12)"
      : accent === "violet"
        ? "rgba(123,108,246,0.12)"
        : accent === "blue"
          ? "rgba(91,143,230,0.12)"
          : "rgba(255,92,92,0.12)";
  const good = deltaGood ?? deltaPositive;

  return (
    <DashCard
      p={{ base: "18px", md: "20px" }}
      transition="all .2s ease"
      _hover={{ borderColor: "wa.18", transform: "translateY(-2px) scale(1.02)" }}
    >
      <Flex justify="space-between" align="flex-start" mb="18px">
        <Flex
          w="44px"
          h="44px"
          borderRadius="12px"
          align="center"
          justify="center"
          bg={accentBg}
          color={accentColor}
        >
          <Icon size={22} strokeWidth={2} />
        </Flex>
        {delta && (
          <Flex
            align="center"
            gap="3px"
            fontSize="12.5px"
            fontWeight={700}
            color={good ? "brand.greenText" : "severity.criticalText"}
          >
            <Box as={deltaPositive ? ArrowUpRight : ArrowDownRight} size={14} />
            {delta}
          </Flex>
        )}
      </Flex>
      <Text
        fontFamily="heading"
        fontWeight={800}
        fontSize={{ base: "28px", md: "32px" }}
        lineHeight="1"
        letterSpacing="-0.5px"
      >
        {value}
      </Text>
      <Text fontSize="13px" color="wa.55" mt="8px">
        {label}
      </Text>
    </DashCard>
  );
}

/* -------------------------------------------------------------------------- */
/*  Severity breakdown bar                                                      */
/* -------------------------------------------------------------------------- */

export interface SeverityCounts {
  critical: number;
  high: number;
  medium: number;
  low: number;
}

const SEV_COLORS: Record<keyof SeverityCounts, string> = {
  critical: "#FF5C5C",
  high: "#EC7272",
  medium: "#FFA85C",
  low: "#FFD66B",
};

/** Thin stacked proportional bar for a severity breakdown. */
export function SeverityBar({
  counts,
  height = "6px",
}: {
  counts: SeverityCounts;
  height?: string;
}) {
  const total =
    counts.critical + counts.high + counts.medium + counts.low || 1;
  const order: (keyof SeverityCounts)[] = ["critical", "high", "medium", "low"];
  return (
    <Flex
      h={height}
      w="100%"
      borderRadius="pill"
      overflow="hidden"
      bg="wa.7"
      gap="2px"
    >
      {order.map((k) =>
        counts[k] > 0 ? (
          <Box
            key={k}
            h="100%"
            w={`${(counts[k] / total) * 100}%`}
            bg={SEV_COLORS[k]}
          />
        ) : null,
      )}
    </Flex>
  );
}

/** Inline severity count chips: C·H·M·L with tinted dots. */
export function SeverityChips({ counts }: { counts: SeverityCounts }) {
  const items: { key: keyof SeverityCounts; label: string }[] = [
    { key: "critical", label: "C" },
    { key: "high", label: "H" },
    { key: "medium", label: "M" },
    { key: "low", label: "L" },
  ];
  return (
    <Flex gap="10px" align="center">
      {items.map(({ key, label }) => (
        <Flex key={key} align="center" gap="5px" fontSize="12.5px" color="wa.60">
          <Box
            w="7px"
            h="7px"
            borderRadius="pill"
            bg={SEV_COLORS[key]}
            opacity={counts[key] === 0 ? 0.3 : 1}
          />
          <Text as="span" color={counts[key] === 0 ? "wa.32" : "wa.72"}>
            {counts[key]}
            <Text as="span" color="wa.32" ml="1px">
              {label}
            </Text>
          </Text>
        </Flex>
      ))}
    </Flex>
  );
}

/* -------------------------------------------------------------------------- */
/*  Gradient avatar                                                             */
/* -------------------------------------------------------------------------- */

export function GradientAvatar({
  initials,
  size = "36px",
  fontSize = "13px",
}: {
  initials: string;
  size?: string;
  fontSize?: string;
}) {
  return (
    <Flex
      w={size}
      h={size}
      borderRadius="pill"
      align="center"
      justify="center"
      flexShrink={0}
      fontFamily="heading"
      fontWeight={800}
      fontSize={fontSize}
      color="white"
      letterSpacing="0.5px"
      sx={{ background: gradients.iconTile }}
    >
      {initials}
    </Flex>
  );
}

/* -------------------------------------------------------------------------- */
/*  Section header inside cards / pages                                         */
/* -------------------------------------------------------------------------- */

export function PanelHeading({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
}) {
  return (
    <Flex justify="space-between" align="flex-start" gap="16px" mb="18px">
      <Box>
        <Text
          fontFamily="heading"
          fontWeight={800}
          fontSize="17px"
          letterSpacing="-0.3px"
        >
          {title}
        </Text>
        {subtitle && (
          <Text fontSize="13px" color="wa.50" mt="4px">
            {subtitle}
          </Text>
        )}
      </Box>
      {right}
    </Flex>
  );
}
