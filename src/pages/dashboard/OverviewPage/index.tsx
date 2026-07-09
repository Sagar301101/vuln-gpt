import { Box, Flex, Grid, Link, SimpleGrid, Text } from "@chakra-ui/react";
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
import { TrendChart } from "@/components/dashboard/TrendChart";
import { DonutChart } from "@/components/dashboard/DonutChart";
import { ROUTES } from "@/constant/routes.constant";

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

const SEV_TONE: Record<TopFinding["severity"], "red" | "orange" | "yellow"> = {
  Critical: "red",
  High: "orange",
  Medium: "yellow",
  Low: "yellow",
};

export default function OverviewPage() {
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
                  to={ROUTES.DASHBOARD.SCANS}
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
