import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Bell,
  CreditCard,
  KeyRound,
  LayoutDashboard,
  type LucideIcon,
  Menu,
  Plus,
  Radar,
  Search,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { GradientAvatar } from "@/components/dashboard/primitives";
import { gradients } from "@/theme";

const SIDEBAR_W = "260px";

interface NavItem {
  label: string;
  to: string;
  icon: LucideIcon;
  end?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Overview", to: "/dashboard", icon: LayoutDashboard, end: true },
  { label: "Projects", to: "/dashboard/projects", icon: ShieldCheck },
  { label: "Scan History", to: "/dashboard/scans", icon: Radar },
  { label: "API Keys", to: "/dashboard/api-keys", icon: KeyRound },
  { label: "Team", to: "/dashboard/team", icon: Users },
  { label: "Settings", to: "/dashboard/settings", icon: Settings },
  { label: "Billing", to: "/dashboard/billing", icon: CreditCard },
];

/* -------------------------------------------------------------------------- */
/*  Sidebar                                                                     */
/* -------------------------------------------------------------------------- */

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
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

/* -------------------------------------------------------------------------- */
/*  Top bar                                                                     */
/* -------------------------------------------------------------------------- */

function TopBar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
  return (
    <Flex
      as="header"
      position="sticky"
      top={0}
      zIndex={20}
      h="72px"
      align="center"
      gap="14px"
      px={{ base: "16px", md: "28px" }}
      bg="rgba(8,8,11,0.78)"
      backdropFilter="blur(14px)"
      borderBottom="1px solid"
      borderColor="wa.7"
    >
      <IconButton
        aria-label="Open navigation"
        icon={<Menu size={22} />}
        variant="ghost"
        color="white"
        display={{ base: "inline-flex", lg: "none" }}
        onClick={onOpenSidebar}
        _hover={{ bg: "wa.5" }}
      />

      <InputGroup maxW="380px" display={{ base: "none", md: "flex" }}>
        <InputLeftElement pointerEvents="none" h="42px">
          <Search size={17} color="rgba(255,255,255,0.4)" />
        </InputLeftElement>
        <Input
          placeholder="Search targets, scans, findings…"
          h="42px"
          bg="inputBg"
          border="1px solid"
          borderColor="wa.8"
          borderRadius="11px"
          fontSize="14px"
          _placeholder={{ color: "wa.40" }}
          _hover={{ borderColor: "wa.12" }}
          _focus={{
            borderColor: "rgba(123,108,246,0.6)",
            boxShadow: "0 0 0 1px rgba(123,108,246,0.4)",
          }}
        />
      </InputGroup>

      <Flex align="center" gap={{ base: "8px", md: "12px" }} ml="auto">
        <Button
          leftIcon={<Plus size={16} />}
          h="42px"
          px="18px"
          fontSize="13.5px"
          fontWeight={700}
          color="white"
          borderRadius="pill"
          sx={{ background: gradients.brand }}
          boxShadow="0 10px 26px rgba(123,108,246,0.32)"
          _hover={{ filter: "brightness(1.06)" }}
          _active={{ filter: "brightness(0.96)" }}
        >
          <Text as="span" display={{ base: "none", sm: "inline" }}>
            New scan
          </Text>
          <Text as="span" display={{ base: "inline", sm: "none" }}>
            Scan
          </Text>
        </Button>

        <IconButton
          aria-label="Notifications"
          icon={
            <Box position="relative">
              <Bell size={19} />
              <Box
                position="absolute"
                top="-1px"
                right="-1px"
                w="7px"
                h="7px"
                borderRadius="pill"
                bg="severity.criticalText"
                border="1.5px solid"
                borderColor="bg"
              />
            </Box>
          }
          variant="ghost"
          color="wa.72"
          borderRadius="11px"
          _hover={{ bg: "wa.5", color: "white" }}
        />

        <Flex align="center" gap="10px" pl={{ base: 0, md: "4px" }}>
          <GradientAvatar initials="SK" size="38px" />
          <Box display={{ base: "none", lg: "block" }} lineHeight="1.2">
            <Text fontSize="13.5px" fontWeight={600}>
              John K.
            </Text>
            <Text fontSize="11.5px" color="wa.45">
              Owner
            </Text>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}

/* -------------------------------------------------------------------------- */
/*  Layout                                                                      */
/* -------------------------------------------------------------------------- */

export function DashboardLayout() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex minH="100vh" bg="bg">
      {/* fixed sidebar (lg+) */}
      <Box
        as="aside"
        display={{ base: "none", lg: "block" }}
        position="fixed"
        top={0}
        left={0}
        w={SIDEBAR_W}
        h="100vh"
        bg="surfaceAlt"
        borderRight="1px solid"
        borderColor="wa.7"
        zIndex={30}
      >
        <SidebarNav />
      </Box>

      {/* mobile drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} size="xs">
        <DrawerOverlay backdropFilter="blur(6px)" />
        <DrawerContent bg="surfaceAlt" maxW={SIDEBAR_W}>
          <Flex
            justify="flex-end"
            position="absolute"
            top="18px"
            right="14px"
            zIndex={2}
          >
            <IconButton
              aria-label="Close navigation"
              icon={<X size={20} />}
              variant="ghost"
              color="white"
              size="sm"
              onClick={onClose}
              _hover={{ bg: "wa.5" }}
            />
          </Flex>
          <SidebarNav onNavigate={onClose} />
        </DrawerContent>
      </Drawer>

      {/* main column */}
      <Flex
        direction="column"
        flex="1"
        minW={0}
        ml={{ base: 0, lg: SIDEBAR_W }}
      >
        <TopBar onOpenSidebar={onOpen} />
        <Box as="main" flex="1">
          <Box
            maxW="1280px"
            mx="auto"
            w="100%"
            p={{ base: "20px", md: "32px" }}
          >
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default DashboardLayout;
