import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { Download, Plus } from "lucide-react";
import { Reveal } from "@/components/layout/Reveal";
import { PageHeader } from "@/components/dashboard/PageHeader";
import {
  DashCard,
  SeverityChips,
  StatusPill,
  type SeverityCounts,
} from "@/components/dashboard/primitives";
import { DataTable, type Column } from "@/components/dashboard/DataTable";
import { gradients } from "@/theme";

type ScanStatus = "Completed" | "Running" | "Queued" | "Failed";

interface Scan {
  id: string;
  target: string;
  type: "Web" | "API" | "Cloud" | "Mobile";
  counts: SeverityCounts;
  status: ScanStatus;
  progress?: number;
  duration: string;
  startedAt: string;
}

const SCANS: Scan[] = [
  {
    id: "SCN-4821",
    target: "app.acmecorp.io",
    type: "Web",
    counts: { critical: 0, high: 2, medium: 5, low: 9 },
    status: "Running",
    progress: 62,
    duration: "—",
    startedAt: "Just now",
  },
  {
    id: "SCN-4820",
    target: "api.vulnshields.net",
    type: "API",
    counts: { critical: 1, high: 3, medium: 6, low: 4 },
    status: "Completed",
    duration: "4m 12s",
    startedAt: "12 min ago",
  },
  {
    id: "SCN-4819",
    target: "billing.vulnshields.net",
    type: "API",
    counts: { critical: 0, high: 0, medium: 0, low: 0 },
    status: "Queued",
    duration: "—",
    startedAt: "12 min ago",
  },
  {
    id: "SCN-4818",
    target: "store.northwind.com",
    type: "Web",
    counts: { critical: 3, high: 5, medium: 8, low: 2 },
    status: "Completed",
    duration: "9m 47s",
    startedAt: "1 hr ago",
  },
  {
    id: "SCN-4817",
    target: "gateway.fintechly.dev",
    type: "Cloud",
    counts: { critical: 0, high: 0, medium: 0, low: 0 },
    status: "Failed",
    duration: "0m 38s",
    startedAt: "3 hrs ago",
  },
  {
    id: "SCN-4816",
    target: "m.paylink.app",
    type: "Mobile",
    counts: { critical: 0, high: 1, medium: 4, low: 7 },
    status: "Completed",
    duration: "6m 05s",
    startedAt: "Yesterday",
  },
  {
    id: "SCN-4815",
    target: "helios.studio",
    type: "Web",
    counts: { critical: 0, high: 0, medium: 0, low: 1 },
    status: "Completed",
    duration: "2m 51s",
    startedAt: "Yesterday",
  },
  {
    id: "SCN-4814",
    target: "cdn.northwind.com",
    type: "Cloud",
    counts: { critical: 0, high: 1, medium: 3, low: 5 },
    status: "Completed",
    duration: "5m 22s",
    startedAt: "2 days ago",
  },
  {
    id: "SCN-4813",
    target: "auth.acmecorp.io",
    type: "API",
    counts: { critical: 2, high: 4, medium: 2, low: 1 },
    status: "Completed",
    duration: "7m 33s",
    startedAt: "2 days ago",
  },
  {
    id: "SCN-4812",
    target: "beta.paylink.app",
    type: "Mobile",
    counts: { critical: 0, high: 0, medium: 2, low: 6 },
    status: "Completed",
    duration: "4m 58s",
    startedAt: "3 days ago",
  },
];

const STATUS_TONE: Record<ScanStatus, "green" | "blue" | "muted" | "red"> = {
  Completed: "green",
  Running: "blue",
  Queued: "muted",
  Failed: "red",
};

const FILTERS: { label: string; value: string }[] = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Running", value: "running" },
  { label: "Queued", value: "queued" },
  { label: "Failed", value: "failed" },
];

export default function Scans() {
  const [status, setStatus] = useState("all");

  const rows = useMemo(
    () =>
      status === "all"
        ? SCANS
        : SCANS.filter((s) => s.status.toLowerCase() === status),
    [status],
  );

  const columns: Column<Scan>[] = [
    {
      key: "id",
      header: "Scan",
      width: "minmax(150px, 1fr)",
      cell: (r) => (
        <Box minW={0}>
          <Text fontSize="13px" fontWeight={600} fontFamily="mono">
            {r.id}
          </Text>
          <Text fontSize="12.5px" color="wa.55" isTruncated>
            {r.target}
          </Text>
        </Box>
      ),
    },
    {
      key: "type",
      header: "Type",
      width: "90px",
      hideBelow: "md",
      cell: (r) => (
        <Text
          fontSize="12px"
          fontWeight={600}
          color="wa.60"
          px="9px"
          py="3px"
          borderRadius="8px"
          bg="wa.5"
          border="1px solid"
          borderColor="wa.7"
        >
          {r.type}
        </Text>
      ),
    },
    {
      key: "severity",
      header: "Findings",
      width: "minmax(180px, 1fr)",
      hideBelow: "lg",
      cell: (r) =>
        r.status === "Running" ? (
          <Box w="100%">
            <Flex justify="space-between" mb="5px">
              <Text fontSize="11.5px" color="brand.blue">
                Scanning…
              </Text>
              <Text fontSize="11.5px" color="wa.45">
                {r.progress}%
              </Text>
            </Flex>
            <Box h="5px" borderRadius="pill" bg="wa.7" overflow="hidden">
              <Box
                h="100%"
                w={`${r.progress}%`}
                borderRadius="pill"
                bg="brand.blue"
                sx={{
                  animation: "vsShimmer 1.6s ease-in-out infinite",
                  "@keyframes vsShimmer": {
                    "0%,100%": { opacity: 0.7 },
                    "50%": { opacity: 1 },
                  },
                }}
              />
            </Box>
          </Box>
        ) : r.status === "Queued" || r.status === "Failed" ? (
          <Text fontSize="12.5px" color="wa.32">
            —
          </Text>
        ) : (
          <SeverityChips counts={r.counts} />
        ),
    },
    {
      key: "duration",
      header: "Duration",
      width: "100px",
      hideBelow: "md",
      cell: (r) => (
        <Text fontSize="13px" color="wa.60" fontFamily="mono">
          {r.duration}
        </Text>
      ),
    },
    {
      key: "started",
      header: "Started",
      width: "110px",
      hideBelow: "sm",
      cell: (r) => (
        <Text fontSize="12.5px" color="wa.50">
          {r.startedAt}
        </Text>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "120px",
      align: "right",
      cell: (r) => (
        <StatusPill
          label={r.status}
          tone={STATUS_TONE[r.status]}
          dot={r.status === "Running"}
          pulse={r.status === "Running"}
        />
      ),
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Scan History"
        subtitle="Every scan across your workspace, newest first."
        actions={
          <>
            <Button
              leftIcon={<Download size={15} />}
              variant="outline"
              h="42px"
              px="16px"
              fontSize="13px"
              fontWeight={600}
              color="wa.82"
              borderColor="wa.12"
              borderRadius="pill"
              bg="transparent"
              _hover={{ bg: "wa.5", borderColor: "wa.18" }}
              display={{ base: "none", sm: "inline-flex" }}
            >
              Export
            </Button>
            <Button
              leftIcon={<Plus size={16} />}
              h="42px"
              px="18px"
              fontSize="13.5px"
              fontWeight={700}
              color="white"
              borderRadius="pill"
              sx={{ background: gradients.brand }}
              _hover={{ filter: "brightness(1.06)" }}
            >
              New scan
            </Button>
          </>
        }
      />

      {/* segmented filter */}
      <Flex
        gap="4px"
        mb="18px"
        p="4px"
        bg="surfaceAlt"
        border="1px solid"
        borderColor="wa.7"
        borderRadius="pill"
        w="fit-content"
        maxW="100%"
        overflowX="auto"
      >
        {FILTERS.map((f) => {
          const active = status === f.value;
          return (
            <Box
              key={f.value}
              as="button"
              onClick={() => setStatus(f.value)}
              px="16px"
              py="7px"
              borderRadius="pill"
              fontSize="13px"
              fontWeight={600}
              whiteSpace="nowrap"
              color={active ? "white" : "wa.50"}
              bg={active ? "rgba(123,108,246,0.16)" : "transparent"}
              border="1px solid"
              borderColor={active ? "rgba(123,108,246,0.45)" : "transparent"}
              transition="all .15s ease"
              _hover={{ color: "white" }}
            >
              {f.label}
            </Box>
          );
        })}
      </Flex>

      <Reveal>
        <DashCard p={{ base: "8px", md: "10px" }}>
          <DataTable
            columns={columns}
            rows={rows}
            rowKey={(r) => r.id}
            minWidth="760px"
          />
        </DashCard>
      </Reveal>
    </Box>
  );
}
