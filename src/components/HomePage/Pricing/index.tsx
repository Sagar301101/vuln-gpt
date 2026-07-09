import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronDown, Shield, Sparkles } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/layout/Reveal";
import { CheckRow } from "@/components/common/primitives";
import { useDemoModal } from "@/context/DemoModalContext";
import {
  PLANS,
  PRICES,
  priceNote,
  recommendPlan,
  COMPANY_TYPE_OPTIONS,
  SECURITY_FOCUS_OPTIONS,
  CADENCE_OPTIONS,
  type Billing,
  type Currency,
  type Plan,
  type PlanKey,
  type CompanyType,
  type SecurityFocus,
  type Cadence,
} from "@/constant/pricing.constant";
import { gradients } from "@/theme";

const MotionBox = motion(Box);
const MotionButton = motion(Button);

function Segmented<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <Flex bg="surface" border="1px solid" borderColor="wa.10" borderRadius="pill" p="5px">
      {options.map((o) => {
        const active = value === o.value;
        return (
          <Button
            key={o.value}
            onClick={() => onChange(o.value)}
            h="38px"
            px="18px"
            borderRadius="pill"
            border="none"
            fontWeight={600}
            fontSize="13.5px"
            color={active ? "white" : "wa.55"}
            sx={{ background: active ? gradients.brand : "transparent" }}
            _hover={{ color: active ? "white" : "wa.82", bg: active ? undefined : "transparent" }}
          >
            {o.label}
          </Button>
        );
      })}
    </Flex>
  );
}

/** Animated dropdown (Chakra Menu — built-in scale/fade open transition). */
function Dropdown<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T | "";
  onChange: (v: T) => void;
  options: { key: T; label: string }[];
}) {
  const selected = options.find((o) => o.key === value);
  return (
    <Box>
      <Text fontSize="12px" color="wa.50" mb="8px" letterSpacing="0.5px">
        {label}
      </Text>
      <Menu matchWidth gutter={8}>
        {({ isOpen }) => (
          <>
            <MenuButton
              as={Button}
              w="100%"
              h="48px"
              px="16px"
              fontWeight={500}
              fontSize="13.5px"
              bg="inputBg"
              border="1px solid"
              borderColor={isOpen ? "brand.violet" : selected ? "rgba(123,108,246,0.4)" : "wa.12"}
              color={selected ? "white" : "wa.40"}
              borderRadius="12px"
              transition="all .18s ease"
              boxShadow={isOpen ? "0 0 0 3px rgba(123,108,246,0.18)" : "none"}
              _hover={{ borderColor: "wa.24", bg: "wa.4" }}
              _active={{ bg: "wa.5" }}
            >
              <Flex align="center" justify="space-between" w="100%">
                <Text as="span" flex="1" minW={0} isTruncated textAlign="left">
                  {selected ? selected.label : "Select…"}
                </Text>
                <Box
                  as={ChevronDown}
                  size={16}
                  flexShrink={0}
                  ml="8px"
                  transition="transform .2s ease"
                  transform={isOpen ? "rotate(180deg)" : "rotate(0deg)"}
                />
              </Flex>
            </MenuButton>
            <Portal>
              <MenuList
                bg="surfaceAlt"
                borderColor="wa.10"
                borderRadius="12px"
                p="6px"
                minW="220px"
                maxH="240px"
                overflowY="auto"
                zIndex={1400}
              >
                {options.map((o) => {
                  const isSelected = value === o.key;
                  return (
                    <MenuItem
                      key={o.key}
                      onClick={() => onChange(o.key)}
                      bg="transparent"
                      borderRadius="8px"
                      fontSize="13.5px"
                      color={isSelected ? "white" : "wa.70"}
                      fontWeight={isSelected ? 600 : 400}
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      gap="10px"
                      _hover={{ bg: "rgba(123,108,246,0.16)" }}
                      _focus={{ bg: "rgba(123,108,246,0.16)" }}
                    >
                      {o.label}
                      {isSelected && <Check size={15} color="#9D8CFF" style={{ flexShrink: 0 }} />}
                    </MenuItem>
                  );
                })}
              </MenuList>
            </Portal>
          </>
        )}
      </Menu>
    </Box>
  );
}

type RecommenderStatus = "idle" | "thinking" | "done";

/** Card with 3 dropdowns + an "AI" button that recommends (and highlights) a plan. */
function PlanRecommenderCard({ onRecommend }: { onRecommend: (plan: PlanKey) => void }) {
  const [companyType, setCompanyType] = useState<CompanyType | "">("");
  const [securityFocus, setSecurityFocus] = useState<SecurityFocus | "">("");
  const [cadence, setCadence] = useState<Cadence | "">("");
  const [status, setStatus] = useState<RecommenderStatus>("idle");

  const canSubmit = companyType !== "" && securityFocus !== "" && cadence !== "";

  const handleClick = async () => {
    if (!companyType || !securityFocus || !cadence || status === "thinking") return;
    setStatus("thinking");
    await new Promise((resolve) => window.setTimeout(resolve, 1700));
    onRecommend(recommendPlan({ companyType, securityFocus, cadence }));
    setStatus("done");
    window.setTimeout(() => setStatus("idle"), 2600);
  };

  return (
    <Box
      position="relative"
      overflow="hidden"
      bg="surface"
      border="1px solid"
      borderColor="wa.10"
      borderRadius="24px"
      p={{ base: "24px", md: "32px" }}
      mb="40px"
    >
      <Box
        position="absolute"
        top="-90px"
        right="-70px"
        w="260px"
        h="260px"
        borderRadius="50%"
        opacity={0.16}
        filter="blur(50px)"
        pointerEvents="none"
        style={{ background: gradients.brand }}
      />

      <Flex align="center" gap="9px" justify="center" mb="22px" position="relative">
        <Sparkles size={17} color="#9D8CFF" />
        <Text fontSize="15.5px" fontWeight={700} color="white">
          Not sure which plan fits? Let AI recommend one.
        </Text>
      </Flex>

      <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap="16px" mb="26px" position="relative">
        <Dropdown label="Company type" value={companyType} onChange={setCompanyType} options={COMPANY_TYPE_OPTIONS} />
        <Dropdown label="Type of security" value={securityFocus} onChange={setSecurityFocus} options={SECURITY_FOCUS_OPTIONS} />
        <Dropdown label="Testing cadence" value={cadence} onChange={setCadence} options={CADENCE_OPTIONS} />
      </Grid>

      <Flex justify="center" position="relative">
        <MotionButton
          onClick={handleClick}
          isDisabled={!canSubmit || status === "thinking"}
          h="52px"
          px="30px"
          borderRadius="pill"
          fontWeight={700}
          fontSize="14.5px"
          color="white"
          position="relative"
          overflow="hidden"
          sx={{ background: gradients.brand }}
          _hover={{ filter: status === "idle" ? "brightness(1.06)" : undefined }}
          whileTap={{ scale: 0.97 }}
        >
          {status === "thinking" && (
            <MotionBox
              position="absolute"
              inset={0}
              background="linear-gradient(100deg,transparent,rgba(255,255,255,0.4),transparent)"
              animate={{ x: ["-120%", "120%"] }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          )}
          <Flex align="center" gap="9px" position="relative">
            <MotionBox
              display="flex"
              animate={status === "thinking" ? { rotate: 360 } : { rotate: 0 }}
              transition={
                status === "thinking"
                  ? { duration: 1.1, repeat: Infinity, ease: "linear" }
                  : { duration: 0.3 }
              }
            >
              {status === "done" ? <Check size={17} /> : <Sparkles size={17} />}
            </MotionBox>
            {status === "thinking"
              ? "Analyzing your needs…"
              : status === "done"
                ? "Plan recommended!"
                : "Get suitable plan with AI"}
          </Flex>
        </MotionButton>
      </Flex>
    </Box>
  );
}

function PlanCard({
  plan,
  price,
  period,
  recommended,
  onSelect,
}: {
  plan: Plan;
  price: string;
  period: string;
  recommended: boolean;
  onSelect: () => void;
}) {
  const { openDemoModal } = useDemoModal();
  return (
    <Box
      role="button"
      tabIndex={0}
      aria-pressed={recommended}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSelect();
        }
      }}
      textAlign="left"
      position="relative"
      h="100%"
      borderRadius="22px"
      p="34px"
      border="1px solid"
      borderColor={recommended ? "rgba(123,108,246,0.45)" : "wa.8"}
      bg={recommended ? "linear-gradient(180deg,rgba(47,191,112,0.08),rgba(123,108,246,0.08)),#121216" : "surface"}
      boxShadow={recommended ? "0 24px 60px rgba(123,108,246,0.18)" : undefined}
      cursor="pointer"
      transition="all .3s ease"
      _hover={{ transform: "translateY(-4px) scale(1.02)" }}
      _focusVisible={{ outline: "2px solid", outlineColor: "brand.violet", outlineOffset: "2px" }}
    >
      {recommended && (
        <Box
          position="absolute"
          top="-13px"
          left="50%"
          transform="translateX(-50%)"
          fontSize="11px"
          letterSpacing="1px"
          fontWeight={700}
          px="16px"
          py="6px"
          borderRadius="pill"
          whiteSpace="nowrap"
          sx={{ background: gradients.brand }}
        >
          RECOMMENDED
        </Box>
      )}
      <Flex w="54px" h="54px" borderRadius="14px" align="center" justify="center" mb="18px" bg={plan.iconBg}>
        <Shield size={26} color={plan.iconColor} />
      </Flex>
      <Heading as="h3" fontWeight={700} fontSize="22px" mb="4px">
        {plan.name}
      </Heading>
      <Text fontSize="13.5px" color="wa.45" mb="22px">
        {plan.tagline}
      </Text>
      <Flex align="baseline" gap="4px" mb="22px">
        <Text fontFamily="heading" fontWeight={800} fontSize="40px">
          {price}
        </Text>
        <Text color="wa.45" fontSize="15px">
          {period}
        </Text>
      </Flex>
      <Box h="1px" bg="wa.8" mb="22px" />
      <Stack spacing="14px" mb="28px">
        {plan.features.map((f) => (
          <CheckRow key={f.label} muted={f.muted}>
            {f.label}
          </CheckRow>
        ))}
      </Stack>
      <Button
        onClick={(e) => {
          e.stopPropagation();
          openDemoModal({ product: `${plan.name} plan` });
        }}
        w="100%"
        h="48px"
        borderRadius="12px"
        fontWeight={recommended ? 700 : 600}
        fontSize="14px"
        color="white"
        border={recommended ? "none" : "1px solid"}
        borderColor="wa.18"
        sx={{ background: recommended ? gradients.brand : "transparent" }}
        _hover={{ filter: recommended ? "brightness(1.06)" : undefined, bg: recommended ? undefined : "wa.5" }}
      >
        Get started
      </Button>
    </Box>
  );
}

/** The toggles + AI recommender card + 3 plan cards + note. Reused by the section and the Pricing page. */
export function PricingPlans() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [currency, setCurrency] = useState<Currency>("INR");
  const [aiPick, setAiPick] = useState<PlanKey | null>(null);
  const [manualPick, setManualPick] = useState<PlanKey | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const defaultPlan = useMemo(() => PLANS.find((p) => p.featured)?.key ?? PLANS[0].key, []);
  const recommendedKey = manualPick ?? aiPick ?? defaultPlan;

  const prices = PRICES[currency][billing];
  const period = billing === "monthly" ? "/mo" : "/yr";

  return (
    <>
      <Flex align={{ base: "flex-start", md: "flex-end" }} justify="space-between" flexWrap="wrap" gap="24px" mb="36px">
        <Box>
          <Heading as="h2" fontSize={{ base: "30px", md: "46px" }} m={0}>
            Plans that scale with you
          </Heading>
        </Box>
        <Flex align="center" gap="14px" flexWrap="wrap">
          <Segmented
            value={billing}
            onChange={setBilling}
            options={[
              { value: "monthly", label: "Monthly" },
              { value: "yearly", label: "Yearly" },
            ]}
          />
          <Segmented
            value={currency}
            onChange={setCurrency}
            options={[
              { value: "INR", label: "₹ INR" },
              { value: "USD", label: "$ USD" },
            ]}
          />
        </Flex>
      </Flex>

      <PlanRecommenderCard
        onRecommend={(plan) => {
          setAiPick(plan);
          setManualPick(null);

          // If the plan cards aren't comfortably in view, scroll to them so
          // the highlighted recommendation is actually visible.
          const el = gridRef.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            const fullyVisible = rect.top >= 80 && rect.bottom <= window.innerHeight;
            if (!fullyVisible) {
              el.scrollIntoView({ behavior: "smooth", block: "center" });
            }
          }
        }}
      />

      <Grid ref={gridRef} templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap="22px" alignItems="stretch">
        {PLANS.map((plan) => (
          <PlanCard
            key={plan.key}
            plan={plan}
            price={prices[plan.key]}
            period={period}
            recommended={recommendedKey === plan.key}
            onSelect={() => setManualPick(plan.key)}
          />
        ))}
      </Grid>

      <Text textAlign="center" mt="24px" fontSize="13px" color="wa.40">
        {priceNote(billing)}
      </Text>
    </>
  );
}

export function Pricing() {
  return (
    <Section id="pricing">
      <Reveal>
        <PricingPlans />
      </Reveal>
    </Section>
  );
}
