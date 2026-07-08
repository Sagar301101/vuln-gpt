import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { ExternalLink, Globe, Plus, Search } from "lucide-react";
import { Reveal } from "@/components/layout/Reveal";
import { PageHeader } from "@/components/dashboard/PageHeader";
import {
  DashCard,
  SeverityBar,
  SeverityChips,
  StatusPill,
  type SeverityCounts,
} from "@/components/dashboard/primitives";
import { gradients } from "@/theme";

interface Project {
  name: string;
  url: string;
  type: string;
  status: "Active" | "Paused" | "Completed";
  lastScan: string;
  counts: SeverityCounts;
}

const PROJECTS: Project[] = [
  {
    name: "VulnShields API",
    url: "api.vulnshields.net",
    type: "API",
    status: "Active",
    lastScan: "12 min ago",
    counts: { critical: 1, high: 3, medium: 6, low: 4 },
  },
  {
    name: "Acme Corp Portal",
    url: "app.acmecorp.io",
    type: "Web",
    status: "Active",
    lastScan: "just now",
    counts: { critical: 0, high: 2, medium: 5, low: 9 },
  },
  {
    name: "Northwind Store",
    url: "store.northwind.com",
    type: "Web",
    status: "Active",
    lastScan: "1 hr ago",
    counts: { critical: 3, high: 5, medium: 8, low: 2 },
  },
  {
    name: "Fintechly Gateway",
    url: "gateway.fintechly.dev",
    type: "Cloud",
    status: "Paused",
    lastScan: "3 hrs ago",
    counts: { critical: 0, high: 0, medium: 2, low: 3 },
  },
  {
    name: "PayLink Mobile",
    url: "m.paylink.app",
    type: "Mobile",
    status: "Active",
    lastScan: "Yesterday",
    counts: { critical: 0, high: 1, medium: 4, low: 7 },
  },
  {
    name: "Helios Marketing Site",
    url: "helios.studio",
    type: "Web",
    status: "Completed",
    lastScan: "3 days ago",
    counts: { critical: 0, high: 0, medium: 0, low: 1 },
  },
];

const STATUS_TONE: Record<Project["status"], "green" | "muted" | "blue"> = {
  Active: "green",
  Paused: "muted",
  Completed: "blue",
};

export default function Projects() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return PROJECTS.filter((p) => {
      const matchesQuery =
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.url.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter === "all" || p.status.toLowerCase() === filter;
      return matchesQuery && matchesFilter;
    });
  }, [query, filter]);

  const inputSx = {
    bg: "inputBg",
    border: "1px solid",
    borderColor: "wa.12",
    borderRadius: "11px",
    fontSize: "14px",
    _placeholder: { color: "wa.40" },
    _hover: { borderColor: "wa.18" },
    _focus: {
      borderColor: "rgba(123,108,246,0.6)",
      boxShadow: "0 0 0 1px rgba(123,108,246,0.4)",
    },
  };

  return (
    <Box>
      <PageHeader
        title="Projects"
        subtitle="Monitor security posture per application and environment."
        actions={
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
            New project
          </Button>
        }
      />

      <Flex gap="12px" mb="20px" direction={{ base: "column", sm: "row" }}>
        <InputGroup maxW={{ sm: "340px" }}>
          <InputLeftElement pointerEvents="none" h="42px">
            <Search size={17} color="rgba(255,255,255,0.4)" />
          </InputLeftElement>
          <Input
            h="42px"
            placeholder="Search projects…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            sx={inputSx}
          />
        </InputGroup>
        <Select
          h="42px"
          maxW={{ sm: "180px" }}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={inputSx}
        >
          <option value="all">All statuses</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
        </Select>
      </Flex>

      {filtered.length === 0 ? (
        <DashCard textAlign="center" py="60px">
          <Text color="wa.55">No projects match your filters.</Text>
        </DashCard>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing="16px">
          {filtered.map((p, i) => {
            const open =
              p.counts.critical + p.counts.high + p.counts.medium + p.counts.low;
            return (
              <Reveal key={p.url} delay={Math.min(i * 0.04, 0.2)}>
                <DashCard
                  h="100%"
                  transition="all .2s ease"
                  _hover={{
                    borderColor: "wa.18",
                    transform: "translateY(-3px) scale(1.02)",
                  }}
                >
                  <Flex justify="space-between" align="flex-start" mb="14px">
                    <Flex gap="12px" minW={0}>
                      <Flex
                        w="42px"
                        h="42px"
                        borderRadius="12px"
                        align="center"
                        justify="center"
                        bg="rgba(123,108,246,0.12)"
                        color="#9D8CFF"
                        flexShrink={0}
                      >
                        <Globe size={20} />
                      </Flex>
                      <Box minW={0}>
                        <Text fontSize="15px" fontWeight={700} isTruncated>
                          {p.name}
                        </Text>
                        <Flex align="center" gap="5px" color="wa.45" mt="2px">
                          <Text fontSize="12.5px" isTruncated>
                            {p.url}
                          </Text>
                          <ExternalLink size={12} style={{ flexShrink: 0 }} />
                        </Flex>
                      </Box>
                    </Flex>
                    <StatusPill label={p.status} tone={STATUS_TONE[p.status]} />
                  </Flex>

                  <Flex justify="space-between" align="baseline" mb="8px">
                    <Text fontSize="12.5px" color="wa.50">
                      Open issues
                    </Text>
                    <Text fontFamily="heading" fontWeight={800} fontSize="20px">
                      {open}
                    </Text>
                  </Flex>
                  <SeverityBar counts={p.counts} />
                  <Flex justify="space-between" align="center" mt="14px">
                    <SeverityChips counts={p.counts} />
                  </Flex>

                  <Flex
                    justify="space-between"
                    align="center"
                    mt="16px"
                    pt="14px"
                    borderTop="1px solid"
                    borderColor="wa.5"
                  >
                    <Text fontSize="12px" color="wa.45">
                      Last scan · {p.lastScan}
                    </Text>
                    <Text fontSize="12px" color="wa.45">
                      {p.type}
                    </Text>
                  </Flex>
                </DashCard>
              </Reveal>
            );
          })}
        </SimpleGrid>
      )}
    </Box>
  );
}
