import {
  Box,
  Button,
  Collapse,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowRight,
  Check,
  ChevronDown,
  Cloud,
  Code2,
  Database,
  Eye,
  FileCode,
  Globe,
  KeyRound,
  Lock,
  type LucideIcon,
  Search,
  Server,
  ShieldAlert,
  Smartphone,
  SlidersHorizontal,
  Bug,
  Box as BoxIcon,
  UserCog,
  Workflow,
} from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/layout/Reveal";
import { SectionHeading, IconTile } from "@/components/common/primitives";
import { ICONS } from "@/constant/iconMap.constant";
import { CAPABILITIES } from "@/constant/site.constant";
import { SERVICES, SERVICE_ORDER } from "@/constant/services.constant";
import { gradients } from "@/theme";

const MotionFlex = motion(Flex);
const MotionBox = motion(Box);

const TAB_ICONS: Record<string, LucideIcon> = {
  web: Globe,
  cloud: Cloud,
  mobile: Smartphone,
  devops: Server,
  development: Code2,
};

const TAB_SHORT_LABELS: Record<string, string> = {
  web: "Web",
  cloud: "Cloud",
  mobile: "Mobile",
  devops: "DevOps",
  development: "Dev",
};

const SUB_ICONS: Record<string, LucideIcon> = {
  recon: Search,
  osint: Eye,
  fuzzing: Bug,
  owasp: ShieldAlert,
  auth: KeyRound,
  logic: Workflow,
  iam: UserCog,
  config: SlidersHorizontal,
  k8s: BoxIcon,
  storage: Database,
  static: FileCode,
  dynamic: Activity,
  api: Globe,
  crypto: Lock,
};

/** Full-spectrum capability grid (formerly its own "What We Provide" section). */
function CapabilitiesGrid() {
  return (
    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr", lg: "repeat(4,1fr)" }} gap="20px" mb={{ base: "56px", md: "72px" }}>
      {CAPABILITIES.map((c, i) => {
        const Icon = ICONS[c.icon];
        const accentBorder = c.accent === "green" ? "rgba(47,191,112,0.4)" : "rgba(123,108,246,0.4)";
        const iconColor = c.accent === "green" ? "#2FBF70" : "#9D8CFF";
        return (
          <Reveal key={c.title} delay={i * 0.06}>
            <Box
              h="100%"
              bg="surface"
              border="1px solid"
              borderColor="wa.8"
              borderRadius="18px"
              p="30px"
              px="26px"
              textAlign={{ base: "center", md: "left" }}
              transition="all .25s ease"
              sx={{
                "@media (hover: hover) and (pointer: fine)": {
                  "&:hover": {
                    transform: "translateY(-6px) scale(1.02)",
                    borderColor: accentBorder,
                    boxShadow: "0 20px 44px rgba(0,0,0,0.35)",
                  },
                },
              }}
            >
              <Box mb="20px" mx={{ base: "auto", md: 0 }} w="fit-content">
                <IconTile accent={c.accent}>{Icon && <Icon size={26} color={iconColor} />}</IconTile>
              </Box>
              <Heading as="h3" fontWeight={700} fontSize="20px" mb="10px">
                {c.title}
              </Heading>
              <Text fontSize="14px" lineHeight="1.6" color="wa.55">
                {c.description}
              </Text>
            </Box>
          </Reveal>
        );
      })}
    </Grid>
  );
}

function ServiceExplorer() {
  const [tab, setTab] = useState<string>("web");
  const [sub, setSub] = useState<string>("recon");
  // mobile accordion open item — independent of `sub` so it can self-close
  // (collapse to nothing) without forcing the desktop selection to change.
  const [mobileOpenId, setMobileOpenId] = useState<string>("recon");

  const subs = SERVICES[tab].subs;
  const activeSub = useMemo(() => subs.find((s) => s.id === sub) ?? subs[0], [subs, sub]);
  const hasSubNav = subs.length > 1;

  const selectTab = (id: string) => {
    setTab(id);
    setSub(SERVICES[id].subs[0].id);
    setMobileOpenId(SERVICES[id].subs[0].id);
  };

  const toggleMobile = (id: string) => {
    setMobileOpenId(id);
    setSub(id);
  };

  return (
    <>
      {/* category tabs — sliding gradient indicator via framer-motion layoutId.
          Mobile: single non-wrapping scrollable row with short labels so 3 tabs
          never stack full-width; desktop: centered pill row with full labels. */}
      <Box position="relative" mb="32px">
        <Flex
          justify={{ base: "flex-start", lg: "center" }}
          gap="10px"
          overflowX={{ base: "auto", lg: "visible" }}
          overflowY="hidden"
          flexWrap={{ base: "nowrap", lg: "wrap" }}
          px={{ base: "4px", lg: 0 }}
          css={{ "&::-webkit-scrollbar": { display: "none" }, scrollbarWidth: "none" }}
        >
          {SERVICE_ORDER.map((id) => {
            const active = tab === id;
            const TabIcon = TAB_ICONS[id];
            return (
              <Box key={id} position="relative" flexShrink={0}>
                {active && (
                  <MotionBox
                    layoutId="service-tab-bg"
                    position="absolute"
                    inset={0}
                    borderRadius="pill"
                    sx={{ background: gradients.brand }}
                    boxShadow="0 10px 26px rgba(123,108,246,0.32)"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                  />
                )}
                <Button
                  onClick={() => selectTab(id)}
                  position="relative"
                  h={{ base: "42px", lg: "46px" }}
                  px={{ base: "16px", lg: "22px" }}
                  borderRadius="pill"
                  fontWeight={600}
                  fontSize={{ base: "14px", lg: "15px" }}
                  color="white"
                  bg="transparent"
                  border="1px solid"
                  borderColor={active ? "transparent" : "wa.18"}
                  leftIcon={<TabIcon size={16} />}
                  _hover={{ borderColor: active ? "transparent" : "wa.12", bg: active ? "transparent" : "wa.4" }}
                >
                  <Text as="span" display={{ base: "inline", lg: "none" }}>
                    {TAB_SHORT_LABELS[id]}
                  </Text>
                  <Text as="span" display={{ base: "none", lg: "inline" }}>
                    {SERVICES[id].label}
                  </Text>
                </Button>
              </Box>
            );
          })}
        </Flex>
      </Box>

      <Box
        position="relative"
        bg="surfaceAlt"
        border="1px solid"
        borderColor="wa.8"
        borderRadius="22px"
        p={{ base: "14px", md: "18px" }}
        overflow="hidden"
      >
        {/* corner glow, consistent with product/capability cards */}
        <Box
          position="absolute"
          top="-80px"
          right="-80px"
          w="220px"
          h="220px"
          borderRadius="50%"
          opacity={0.12}
          filter="blur(40px)"
          pointerEvents="none"
          style={{ background: gradients.brand }}
        />

        {/* mobile/tablet: each sub-category as its own collapsible panel,
            expanding to reveal its checks inline — more interactive than a
            flat chip row. Self-contained open/close state (no Chakra
            Accordion context) so exactly one is open, and it can self-close. */}
        {hasSubNav && (
          <Box display={{ base: "block", lg: "none" }} position="relative" mb="6px">
            {subs.map((s) => {
              const isOpen = mobileOpenId === s.id;
              const SubIcon = SUB_ICONS[s.id] ?? Check;
              return (
                <Box
                  key={s.id}
                  border="1px solid"
                  borderColor={isOpen ? "rgba(123,108,246,0.4)" : "wa.7"}
                  bg={isOpen ? "rgba(123,108,246,0.07)" : "wa.3"}
                  borderRadius="14px"
                  overflow="hidden"
                  mb="14px"
                  transition="all .2s ease"
                  _last={{ mb: 0 }}
                >
                  <Button
                    onClick={() => toggleMobile(s.id)}
                    variant="unstyled"
                    display="flex"
                    w="100%"
                    py="13px"
                    px="14px"
                    borderRadius={0}
                    _hover={{ bg: isOpen ? "rgba(123,108,246,0.1)" : "wa.5" }}
                  >
                    <Flex
                      w="34px"
                      h="34px"
                      borderRadius="10px"
                      align="center"
                      justify="center"
                      flexShrink={0}
                      mr="12px"
                      color="white"
                      transition="all .2s ease"
                      style={{ background: isOpen ? gradients.iconTile : "rgba(255,255,255,0.06)" }}
                      boxShadow={isOpen ? "0 8px 18px rgba(47,191,112,0.28)" : "none"}
                    >
                      <SubIcon size={16} strokeWidth={2.2} />
                    </Flex>
                    <Box flex="1" textAlign="left">
                      <Text fontSize="14.5px" fontWeight={600} color="white">
                        {s.label}
                      </Text>
                      <Text fontSize="11px" color="wa.40">
                        {s.checks.length} checks
                      </Text>
                    </Box>
                    <Box
                      color="wa.50"
                      transition="transform .2s ease"
                      transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                    >
                      <ChevronDown size={18} />
                    </Box>
                  </Button>
                  <Collapse in={isOpen} animateOpacity>
                    <Flex direction="column" gap="12px" pt="6px" pb="18px" px="14px">
                      {s.checks.map((c) => (
                        <Flex
                          key={c}
                          align="center"
                          gap="10px"
                          bg="wa.4"
                          border="1px solid"
                          borderColor="wa.7"
                          borderRadius="10px"
                          px="14px"
                          py="12px"
                        >
                          <Flex w="22px" h="22px" borderRadius="50%" bg="rgba(47,191,112,0.12)" align="center" justify="center" flexShrink={0}>
                            <Check size={12} color="#2FBF70" strokeWidth={2.6} />
                          </Flex>
                          <Text fontSize="13.5px" color="wa.85">
                            {c}
                          </Text>
                        </Flex>
                      ))}
                    </Flex>
                  </Collapse>
                </Box>
              );
            })}
          </Box>
        )}

        <Grid
          position="relative"
          templateColumns={{ base: "1fr", lg: hasSubNav ? "1fr 1.2fr" : "1fr" }}
          gap={{ base: "8px", lg: "8px" }}
        >
          {/* desktop: vertical stepper list */}
          {hasSubNav && (
          <Stack display={{ base: "none", lg: "flex" }} spacing="8px" p="10px" position="relative">
            {/* connecting line */}
            <Box position="absolute" left="35px" top="34px" bottom="34px" w="2px" bg="wa.7" />
            {subs.map((s) => {
              const active = sub === s.id;
              const SubIcon = SUB_ICONS[s.id] ?? Check;
              return (
                <Button
                  key={s.id}
                  onClick={() => setSub(s.id)}
                  variant="unstyled"
                  display="flex"
                  justifyContent="flex-start"
                  alignItems="center"
                  gap="14px"
                  h="auto"
                  py="12px"
                  px="10px"
                  borderRadius="14px"
                  fontWeight={600}
                  fontSize="15px"
                  color="white"
                  position="relative"
                  bg={active ? "rgba(123,108,246,0.1)" : "transparent"}
                  border="1px solid"
                  borderColor={active ? "rgba(123,108,246,0.4)" : "transparent"}
                  transition="all .2s ease"
                  _hover={{ bg: active ? "rgba(123,108,246,0.14)" : "wa.4" }}
                >
                  <Flex
                    position="relative"
                    w="36px"
                    h="36px"
                    borderRadius="11px"
                    align="center"
                    justify="center"
                    flexShrink={0}
                    color="white"
                    transition="all .2s ease"
                    style={{ background: active ? gradients.iconTile : "rgba(255,255,255,0.06)" }}
                    boxShadow={active ? "0 8px 18px rgba(47,191,112,0.28)" : "none"}
                  >
                    <SubIcon size={17} strokeWidth={2.2} />
                  </Flex>
                  <Box textAlign="left">
                    <Text fontSize="15px" fontWeight={600}>
                      {s.label}
                    </Text>
                    <Text fontSize="11.5px" color="wa.40" fontWeight={500}>
                      {s.checks.length} checks
                    </Text>
                  </Box>
                  {active && (
                    <Box ml="auto" color="brand.violetText">
                      <ArrowRight size={16} />
                    </Box>
                  )}
                </Button>
              );
            })}
          </Stack>
          )}

          {/* checks panel — terminal-style header + animated tag grid.
              On mobile this is only shown for single-sub tabs (DevOps/Development);
              multi-sub tabs show checks inline via the accordion above instead. */}
          <Box
            display={{ base: hasSubNav ? "none" : "block", lg: "block" }}
            p={{ base: "6px", lg: "18px" }}
            px={{ lg: hasSubNav ? "22px" : "6px" }}
            borderLeft={{ lg: hasSubNav ? "1px solid" : "none" }}
            borderColor={{ lg: "wa.7" }}
          >
            <Flex align="center" gap="8px" mb="18px">
              <Flex gap="5px">
                <Box w="8px" h="8px" borderRadius="50%" bg="severity.criticalText" opacity={0.6} />
                <Box w="8px" h="8px" borderRadius="50%" bg="severity.medium" opacity={0.6} />
                <Box w="8px" h="8px" borderRadius="50%" bg="brand.green" opacity={0.6} />
              </Flex>
              <Text fontSize="11.5px" letterSpacing="1.5px" color="wa.40" fontFamily="mono">
                INCLUDED CHECKS
              </Text>
            </Flex>

            <AnimatePresence mode="wait">
              <MotionFlex
                key={activeSub.id}
                wrap="wrap"
                gap="10px"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                {activeSub.checks.map((c, i) => (
                  <MotionFlex
                    key={c}
                    align="center"
                    gap="10px"
                    flex={{ base: "1 1 100%", sm: "1 1 calc(50% - 5px)" }}
                    bg="wa.3"
                    border="1px solid"
                    borderColor="wa.7"
                    borderRadius="12px"
                    px="14px"
                    py="12px"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: i * 0.04 }}
                    _hover={{ borderColor: "rgba(47,191,112,0.35)", bg: "wa.5" }}
                  >
                    <Flex w="26px" h="26px" borderRadius="50%" bg="rgba(47,191,112,0.12)" align="center" justify="center" flexShrink={0}>
                      <Check size={14} color="#2FBF70" strokeWidth={2.6} />
                    </Flex>
                    <Text fontSize="14px" color="wa.85" fontWeight={500}>
                      {c}
                    </Text>
                  </MotionFlex>
                ))}
              </MotionFlex>
            </AnimatePresence>
          </Box>
        </Grid>
      </Box>
    </>
  );
}

export function Services() {
  return (
    <Section id="services">
      <Reveal>
        <Box mb={{ base: "40px", md: "52px" }}>
          <SectionHeading
            title="Everything you need, under one roof"
            subtitle="Full-spectrum offensive security, plus the DevOps and development muscle to actually fix what we find."
          />
        </Box>
      </Reveal>

      <CapabilitiesGrid />

      <Reveal delay={0.05}>
        <ServiceExplorer />
      </Reveal>
    </Section>
  );
}
