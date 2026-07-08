import {
  Box,
  Button,
  Flex,
  Grid,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { CreditCard, Download, Sparkles } from "lucide-react";
import { Reveal } from "@/components/layout/Reveal";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { DashCard, StatusPill } from "@/components/dashboard/primitives";
import { DataTable, type Column } from "@/components/dashboard/DataTable";
import { gradients } from "@/theme";

interface Invoice {
  id: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending" | "Failed";
}

const INVOICES: Invoice[] = [
  { id: "INV-2026-006", date: "Jun 1, 2026", amount: "$499.00", status: "Paid" },
  { id: "INV-2026-005", date: "May 1, 2026", amount: "$499.00", status: "Paid" },
  { id: "INV-2026-004", date: "Apr 1, 2026", amount: "$499.00", status: "Paid" },
  { id: "INV-2026-003", date: "Mar 1, 2026", amount: "$499.00", status: "Paid" },
  {
    id: "INV-2026-002",
    date: "Feb 1, 2026",
    amount: "$499.00",
    status: "Paid",
  },
];

const USED = 842;
const QUOTA = 1000;

export default function Billing() {
  const pct = Math.round((USED / QUOTA) * 100);

  const columns: Column<Invoice>[] = [
    {
      key: "id",
      header: "Invoice",
      width: "minmax(140px, 1fr)",
      cell: (r) => (
        <Text fontSize="13.5px" fontWeight={600} fontFamily="mono">
          {r.id}
        </Text>
      ),
    },
    {
      key: "date",
      header: "Date",
      width: "130px",
      hideBelow: "sm",
      cell: (r) => (
        <Text fontSize="13px" color="wa.60">
          {r.date}
        </Text>
      ),
    },
    {
      key: "amount",
      header: "Amount",
      width: "110px",
      cell: (r) => (
        <Text fontSize="13.5px" fontWeight={600}>
          {r.amount}
        </Text>
      ),
    },
    {
      key: "status",
      header: "Status",
      width: "110px",
      cell: (r) => (
        <StatusPill
          label={r.status}
          tone={
            r.status === "Paid" ? "green" : r.status === "Pending" ? "muted" : "red"
          }
        />
      ),
    },
    {
      key: "download",
      header: "",
      width: "60px",
      align: "right",
      cell: () => (
        <IconButton
          aria-label="Download invoice"
          icon={<Download size={16} />}
          size="sm"
          variant="ghost"
          color="wa.45"
          _hover={{ bg: "wa.5", color: "white" }}
        />
      ),
    },
  ];

  return (
    <Box>
      <PageHeader
        title="Billing"
        subtitle="Manage your plan, usage, and payment history."
      />

      <Grid
        templateColumns={{ base: "1fr", lg: "1.2fr 1fr" }}
        gap="16px"
        mb="16px"
      >
        {/* current plan */}
        <Reveal>
          <DashCard
            h="100%"
            position="relative"
            overflow="hidden"
            border="1px solid"
            borderColor="rgba(123,108,246,0.3)"
          >
            <Box
              position="absolute"
              top="-40px"
              right="-40px"
              w="180px"
              h="180px"
              borderRadius="pill"
              opacity={0.12}
              sx={{ background: gradients.brand }}
              filter="blur(30px)"
            />
            <Flex justify="space-between" align="flex-start" position="relative">
              <Box>
                <Flex align="center" gap="8px" mb="6px">
                  <Sparkles size={16} color="#18E0A0" />
                  <Text fontSize="12.5px" color="wa.55" letterSpacing="0.5px">
                    CURRENT PLAN
                  </Text>
                </Flex>
                <Text
                  fontFamily="heading"
                  fontWeight={800}
                  fontSize="30px"
                  letterSpacing="-0.5px"
                >
                  Golden
                </Text>
              </Box>
              <StatusPill label="Active" tone="green" dot />
            </Flex>

            <Flex align="baseline" gap="6px" mt="16px" position="relative">
              <Text fontFamily="heading" fontWeight={800} fontSize="34px">
                $499
              </Text>
              <Text fontSize="14px" color="wa.50">
                / month
              </Text>
            </Flex>
            <Text fontSize="13px" color="wa.50" mt="6px" position="relative">
              Renews on August 1, 2026
            </Text>

            <Flex gap="10px" mt="22px" position="relative" wrap="wrap">
              <Button
                h="42px"
                px="20px"
                fontSize="13.5px"
                fontWeight={700}
                color="white"
                borderRadius="pill"
                sx={{ background: gradients.brand }}
                _hover={{ filter: "brightness(1.06)" }}
              >
                Manage plan
              </Button>
              <Button
                variant="outline"
                h="42px"
                px="18px"
                fontSize="13.5px"
                fontWeight={600}
                color="wa.82"
                borderColor="wa.12"
                borderRadius="pill"
                bg="transparent"
                _hover={{ bg: "wa.5", borderColor: "wa.18" }}
              >
                Cancel subscription
              </Button>
            </Flex>
          </DashCard>
        </Reveal>

        {/* usage + payment */}
        <Flex direction="column" gap="16px">
          <Reveal delay={0.05}>
            <DashCard>
              <Flex justify="space-between" align="baseline" mb="12px">
                <Text fontSize="14px" fontWeight={600}>
                  Scan usage
                </Text>
                <Text fontSize="12.5px" color="wa.50">
                  {USED.toLocaleString()} / {QUOTA.toLocaleString()}
                </Text>
              </Flex>
              <Box h="10px" borderRadius="pill" bg="wa.7" overflow="hidden">
                <Box
                  h="100%"
                  w={`${pct}%`}
                  borderRadius="pill"
                  sx={{ background: gradients.brand }}
                />
              </Box>
              <Text fontSize="12px" color="wa.45" mt="10px">
                {pct}% of your monthly quota used · resets Aug 1
              </Text>
            </DashCard>
          </Reveal>

          <Reveal delay={0.1}>
            <DashCard>
              <Text fontSize="14px" fontWeight={600} mb="14px">
                Payment method
              </Text>
              <Flex align="center" gap="14px">
                <Flex
                  w="46px"
                  h="46px"
                  borderRadius="11px"
                  align="center"
                  justify="center"
                  bg="rgba(91,143,230,0.12)"
                  color="#5B8FE6"
                  flexShrink={0}
                >
                  <CreditCard size={22} />
                </Flex>
                <Box flex="1">
                  <Text fontSize="14px" fontWeight={600} fontFamily="mono">
                    •••• •••• •••• 4242
                  </Text>
                  <Text fontSize="12.5px" color="wa.45" mt="2px">
                    Visa · expires 09/28
                  </Text>
                </Box>
                <Button
                  variant="ghost"
                  size="sm"
                  fontSize="13px"
                  color="brand.violetText"
                  fontWeight={600}
                  _hover={{ bg: "wa.5" }}
                >
                  Update
                </Button>
              </Flex>
            </DashCard>
          </Reveal>
        </Flex>
      </Grid>

      <Reveal delay={0.05}>
        <DashCard p={{ base: "8px", md: "10px" }}>
          <Flex px="14px" pt="12px" pb="4px" justify="space-between" align="center">
            <Text fontFamily="heading" fontWeight={800} fontSize="16px">
              Invoices
            </Text>
            <Button
              variant="ghost"
              size="sm"
              fontSize="13px"
              color="wa.55"
              leftIcon={<Download size={14} />}
              _hover={{ bg: "wa.5", color: "white" }}
            >
              Download all
            </Button>
          </Flex>
          <DataTable
            columns={columns}
            rows={INVOICES}
            rowKey={(r) => r.id}
            minWidth="560px"
          />
        </DashCard>
      </Reveal>
    </Box>
  );
}
