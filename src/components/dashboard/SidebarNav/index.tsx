import { Box, Flex, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {
  CreditCard,
  KeyRound,
  LayoutDashboard,
  type LucideIcon,
  Radar,
  Settings,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { gradients } from "@/theme";
import { ROUTES } from "@/constant/routes.constant";

interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Overview", to: ROUTES.DASHBOARD.ROOT, icon: LayoutDashboard, end: true },
  { label: "Projects", to: ROUTES.DASHBOARD.PROJECTS, icon: ShieldCheck },
  { label: "Scan History", to: ROUTES.DASHBOARD.SCANS, icon: Radar },
  { label: "API Keys", to: ROUTES.DASHBOARD.API_KEYS, icon: KeyRound },
  { label: "Team", to: ROUTES.DASHBOARD.TEAM, icon: Users },
  { label: "Settings", to: ROUTES.DASHBOARD.SETTINGS, icon: Settings },
  { label: "Billing", to: ROUTES.DASHBOARD.BILLING, icon: CreditCard },
];

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Flex direction="column" h="100%">
      <Flex align="center" h="72px" px="22px" flexShrink={0}>
        <Logo />
      </Flex>

      <Box
        as="nav"
        flex="1"
        overflowY="auto"
        px="14px"
        py="10px"
        css={{
          "&::-webkit-scrollbar": { width: "8px" },
          "&::-webkit-scrollbar-thumb": {
            background: "rgba(255,255,255,0.1)",
            borderRadius: "999px",
          },
        }}
      >
        <Text
          fontSize="11px"
          letterSpacing="1.4px"
          textTransform="uppercase"
          color="wa.32"
          px="12px"
          mb="8px"
        >
          Workspace
        </Text>
        <Flex direction="column" gap="3px">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              style={{ textDecoration: "none" }}
            >
              {({ isActive }) => (
                <Flex
                  align="center"
                  gap="12px"
                  px="12px"
                  py="10px"
                  borderRadius="11px"
                  border="1px solid"
                  borderColor={isActive ? "rgba(123,108,246,0.5)" : "transparent"}
                  bg={isActive ? "rgba(123,108,246,0.1)" : "transparent"}
                  color={isActive ? "white" : "wa.60"}
                  fontSize="14px"
                  fontWeight={isActive ? 600 : 500}
                  transition="all .15s ease"
                  _hover={{
                    bg: isActive ? "rgba(123,108,246,0.14)" : "wa.4",
                    color: "white",
                  }}
                >
                  <Box
                    as={item.icon}
                    size={18}
                    strokeWidth={2}
                    color={isActive ? "#9D8CFF" : "currentColor"}
                  />
                  {item.label}
                </Flex>
              )}
            </NavLink>
          ))}
        </Flex>
      </Box>

      {/* upgrade / status card */}
      <Box p="14px" flexShrink={0}>
        <Box
          borderRadius="16px"
          p="16px"
          border="1px solid"
          borderColor="rgba(123,108,246,0.3)"
          bg="rgba(123,108,246,0.07)"
        >
          <Flex align="center" gap="8px" mb="6px">
            <ShieldCheck size={16} color="#18E0A0" />
            <Text fontSize="13px" fontWeight={700}>
              Golden plan
            </Text>
          </Flex>
          <Text fontSize="12px" color="wa.50" lineHeight="1.5" mb="12px">
            842 / 1,000 scans used this cycle.
          </Text>
          <Box h="6px" borderRadius="pill" bg="wa.8" overflow="hidden">
            <Box
              h="100%"
              w="84%"
              borderRadius="pill"
              sx={{ background: gradients.brand }}
            />
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}
