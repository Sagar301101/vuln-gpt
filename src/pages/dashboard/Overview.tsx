import { Box, chakra, Flex, Grid, Link, SimpleGrid, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  AlertOctagon,
  ArrowUpRight,
  Bug,
  Clock,
  Radar,
} from "lucide-react";
import { Reveal } from "@/components/layout/Reveal";
import {
  DashCard,
  KpiCard,
  PanelHeading,
  SeverityChips,
  StatusPill,
  type SeverityCounts,
} from "@/components/dashboard/primitives";
import { PageHeader } from "@/components/dashboard/PageHeader";

/* --------------------------------- data ---------------------------------- */

interface RecentScan {
  target: string;
  type: string;
  status: string;
  counts: SeverityCounts;
  when: string;
}

const RECENT_SCANS: RecentScan[] = [
  {
    target: "api.vulnshields.net",
    type: "API",
    status: "Completed",
    counts: { critical: 1, high: 3, medium: 6, low: 4 },
    when: "12 min ago",
  },
  {
    target: "app.acmecorp.io",
    type: "Web",
    status: "Running",
    counts: { critical: 0, high: 2, medium: 5, low: 9 },
    when: "just now",
  },
  {
    target: "store.northwind.com",
    type: "Web",
    status: "Completed",
    counts: { critical: 3, high: 5, medium: 8, low: 2 },
    when: "1 hr ago",
  },
  {
    target: "gateway.fintechly.dev",
    type: "Cloud",
    status: "Failed",
    counts: { critical: 0, high: 0, medium: 0, low: 0 },
    when: "3 hrs ago",
  },
  {
    target: "m.paylink.app",
    type: "Mobile",
    status: "Completed",
    counts: { critical: 0, high: 1, medium: 4, low: 7 },
    when: "Yesterday",
  },
];

interface TopFinding {
  title: string;
  target: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  cvss: string;
}

const TOP_FINDINGS: TopFinding[] = [
  {
    title: "SQL injection in /orders endpoint",
    target: "store.northwind.com",
    severity: "Critical",
    cvss: "9.8",
  },
  {
    title: "Exposed AWS credentials in JS bundle",
    target: "app.acmecorp.io",
    severity: "Critical",
    cvss: "9.1",
  },
  {
    title: "Broken access control on admin API",
    target: "api.vulnshields.net",
    severity: "High",
    cvss: "8.2",
  },
  {
    title: "Outdated TLS 1.0 still enabled",
    target: "gateway.fintechly.dev",
    severity: "High",
    cvss: "7.4",
  },
  {
    title: "Missing security headers (CSP, HSTS)",
    target: "m.paylink.app",
    severity: "Medium",
    cvss: "5.9",
  },
];

// severity-over-time (last 12 periods) — two series
const TREND_TOTAL = [42, 48, 39, 55, 61, 52, 68, 60, 74, 66, 81, 72];
const TREND_CRIT = [4, 6, 3, 7, 9, 5, 8, 6, 11, 8, 12, 9];
const TREND_LABELS = ["", "", "", "", "", "", "", "", "", "", "", "Now"];

const SEV_DIST: { label: string; value: number; color: string }[] = [
  { label: "Critical", value: 12, color: "#FF5C5C" },
  { label: "High", value: 34, color: "#EC7272" },
  { label: "Medium", value: 78, color: "#FFA85C" },
  { label: "Low", value: 63, color: "#FFD66B" },
];

/* --------------------------- inline area chart --------------------------- */

function buildPath(
  data: number[],
  w: number,
  h: number,
  max: number,
  pad: number,
): { line: string; area: string; points: { x: number; y: number }[] } {
  const innerW = w - pad * 2;
  const innerH = h - pad * 2;
  const step = innerW / (data.length - 1);
  const points = data.map((v, i) => ({
    x: pad + i * step,
    y: pad + innerH - (v / max) * innerH,
  }));
  const line = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${points[points.length - 1].x.toFixed(1)},${(
    h - pad
  ).toFixed(1)} L${pad},${(h - pad).toFixed(1)} Z`;
  return { line, area, points };
}

function TrendChart() {
  const W = 640;
  const H = 220;
  const PAD = 16;
  const max = Math.max(...TREND_TOTAL) * 1.15;
  const total = buildPath(TREND_TOTAL, W, H, max, PAD);
  const crit = buildPath(TREND_CRIT, W, H, max, PAD);
  const gridLines = [0.25, 0.5, 0.75, 1];

  return (
    <Box>
      <chakra.svg
        viewBox={`0 0 ${W} ${H}`}
        w="100%"
        h="auto"
        preserveAspectRatio="none"
        display="block"
      >
        <defs>
          <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7B6CF6" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#7B6CF6" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="trendLine" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2FBF70" />
            <stop offset="100%" stopColor="#7B6CF6" />
          </linearGradient>
        </defs>

        {gridLines.map((g) => {
          const y = PAD + (H - PAD * 2) * (1 - g);
          return (
            <line
              key={g}
              x1={PAD}
              y1={y}
              x2={W - PAD}
              y2={y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="1"
            />
          );
        })}

        <path d={total.area} fill="url(#trendFill)" />
        <path
          d={total.line}
          fill="none"
          stroke="url(#trendLine)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <path
          d={crit.line}
          fill="none"
          stroke="#FF6B6B"
          strokeWidth="2"
          strokeDasharray="4 4"
          strokeLinecap="round"
        />

        {total.points.map((p, i) =>
          i === total.points.length - 1 ? (
            <circle key={i} cx={p.x} cy={p.y} r="4" fill="#18E0A0" />
          ) : null,
        )}
      </chakra.svg>

      <Flex justify="space-between" mt="8px" px="2px">
        {TREND_LABELS.map((l, i) => (
          <Text key={i} fontSize="10.5px" color="wa.32">
            {l}
          </Text>
        ))}
      </Flex>

      <Flex gap="20px" mt="14px">
        <Flex align="center" gap="7px">
          <Box w="16px" h="3px" borderRadius="pill" bg="#7B6CF6" />
          <Text fontSize="12px" color="wa.55">
            Total findings
          </Text>
        </Flex>
        <Flex align="center" gap="7px">
          <Box
            w="16px"
            h="0"
            borderTop="2px dashed"
            borderColor="#FF6B6B"
          />
          <Text fontSize="12px" color="wa.55">
            Critical
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
}

/* ----------------------------- donut chart ------------------------------- */

function DonutChart() {
  const size = 176;
  const stroke = 22;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const total = SEV_DIST.reduce((a, b) => a + b.value, 0);
  let offset = 0;

  return (
    <Flex align="center" gap="24px" wrap="wrap" justify="center">
      <Box position="relative" w={`${size}px`} h={`${size}px`}>
        <chakra.svg viewBox={`0 0 ${size} ${size}`} w="100%" h="100%">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={stroke}
          />
          {SEV_DIST.map((s) => {
            const len = (s.value / total) * c;
            const dash = `${len} ${c - len}`;
            const el = (
              <circle
                key={s.label}
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth={stroke}
                strokeDasharray={dash}
                strokeDashoffset={-offset}
                strokeLinecap="butt"
                transform={`rotate(-90 ${size / 2} ${size / 2})`}
              />
            );
            offset += len;
            return el;
          })}
        </chakra.svg>
        <Flex
          position="absolute"
          inset={0}
          direction="column"
          align="center"
          justify="center"
        >
          <Text
            fontFamily="heading"
            fontWeight={800}
            fontSize="30px"
            lineHeight="1"
          >
            {total}
          </Text>
          <Text fontSize="12px" color="wa.50" mt="4px">
            open issues
          </Text>
        </Flex>
      </Box>

      <Flex direction="column" gap="12px" flex="1" minW="150px">
        {SEV_DIST.map((s) => (
          <Flex key={s.label} align="center" gap="10px">
            <Box w="10px" h="10px" borderRadius="3px" bg={s.color} />
            <Text fontSize="13px" color="wa.72" flex="1">
              {s.label}
            </Text>
            <Text fontSize="13px" fontWeight={700} color="wa.85">
              {s.value}
            </Text>
            <Text fontSize="12px" color="wa.40" w="40px" textAlign="right">
              {Math.round((s.value / total) * 100)}%
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}

/* --------------------------------- page ---------------------------------- */

const SEV_TONE: Record<TopFinding["severity"], "red" | "orange" | "yellow"> = {
  Critical: "red",
  High: "orange",
  Medium: "yellow",
  Low: "yellow",
};

export default function Overview() {
  return (
    <Box>
      <PageHeader
        title="Overview"
        subtitle="Security posture across all projects, updated in real time."
      />

      <Reveal>
        <SimpleGrid columns={{ base: 1, sm: 2, xl: 4 }} spacing="16px" mb="16px">
          <KpiCard
            label="Total scans"
            value="1,284"
            icon={Radar}
            accent="green"
            delta="12.4%"
            deltaPositive
          />
          <KpiCard
            label="Open vulnerabilities"
            value="187"
            icon={Bug}
            accent="violet"
            delta="6.1%"
            deltaPositive={false}
            deltaGood
          />
          <KpiCard
            label="Critical issues"
            value="12"
            icon={AlertOctagon}
            accent="red"
            delta="3"
            deltaPositive
            deltaGood={false}
          />
          <KpiCard
            label="Avg. fix time"
            value="2.4d"
            icon={Clock}
            accent="blue"
            delta="0.6d"
            deltaPositive={false}
            deltaGood
          />
        </SimpleGrid>
      </Reveal>

      <Grid
        templateColumns={{ base: "1fr", lg: "1.6fr 1fr" }}
        gap="16px"
        mb="16px"
      >
        <Reveal>
          <DashCard h="100%">
            <PanelHeading
              title="Findings over time"
              subtitle="Last 12 weeks"
            />
            <TrendChart />
          </DashCard>
        </Reveal>
        <Reveal delay={0.05}>
          <DashCard h="100%">
            <PanelHeading title="By severity" subtitle="Current open" />
            <Flex align="center" justify="center" h="calc(100% - 46px)">
              <DonutChart />
            </Flex>
          </DashCard>
        </Reveal>
      </Grid>

      <Grid templateColumns={{ base: "1fr", lg: "1.6fr 1fr" }} gap="16px">
        <Reveal>
          <DashCard>
            <PanelHeading
              title="Recent scans"
              right={
                <Link
                  as={RouterLink}
                  to="/dashboard/scans"
                  fontSize="13px"
                  color="brand.violetText"
                  fontWeight={600}
                  _hover={{ color: "white" }}
                >
                  View all
                </Link>
              }
            />
            <Flex direction="column">
              {RECENT_SCANS.map((s, i) => (
                <Flex
                  key={s.target}
                  align="center"
                  gap="12px"
                  py="12px"
                  borderTop={i === 0 ? "none" : "1px solid"}
                  borderColor="wa.4"
                >
                  <Box minW={0} flex="1">
                    <Text fontSize="14px" fontWeight={600} isTruncated>
                      {s.target}
                    </Text>
                    <Text fontSize="12px" color="wa.45" mt="2px">
                      {s.type} · {s.when}
                    </Text>
                  </Box>
                  <Box display={{ base: "none", md: "block" }}>
                    <SeverityChips counts={s.counts} />
                  </Box>
                  <StatusPill
                    label={s.status}
                    dot={s.status === "Running"}
                    pulse={s.status === "Running"}
                  />
                </Flex>
              ))}
            </Flex>
          </DashCard>
        </Reveal>

        <Reveal delay={0.05}>
          <DashCard>
            <PanelHeading title="Top findings" subtitle="Highest risk first" />
            <Flex direction="column" gap="12px">
              {TOP_FINDINGS.map((f) => (
                <Flex
                  key={f.title}
                  gap="12px"
                  p="12px"
                  borderRadius="12px"
                  border="1px solid"
                  borderColor="wa.7"
                  bg="wa.3"
                  transition="border-color .15s ease"
                  _hover={{ borderColor: "wa.12" }}
                >
                  <AlertOctagon
                    size={18}
                    color={
                      f.severity === "Critical"
                        ? "#FF6B6B"
                        : f.severity === "High"
                          ? "#FFA85C"
                          : "#FFD66B"
                    }
                    style={{ flexShrink: 0, marginTop: 2 }}
                  />
                  <Box minW={0} flex="1">
                    <Text fontSize="13.5px" fontWeight={600} lineHeight="1.35">
                      {f.title}
                    </Text>
                    <Flex align="center" gap="8px" mt="6px">
                      <StatusPill
                        label={f.severity}
                        tone={SEV_TONE[f.severity]}
                        px="8px"
                        py="2px"
                        fontSize="11px"
                      />
                      <Text fontSize="11.5px" color="wa.40">
                        CVSS {f.cvss} · {f.target}
                      </Text>
                    </Flex>
                  </Box>
                  <ArrowUpRight size={16} color="rgba(255,255,255,0.3)" />
                </Flex>
              ))}
            </Flex>
          </DashCard>
        </Reveal>
      </Grid>
    </Box>
  );
}
