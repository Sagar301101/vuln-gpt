import { Box, Button, Flex, Grid, Heading, Link, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import type { ReactNode } from "react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/layout/Reveal";
import { AnimatedGradientBg } from "@/components/layout/AnimatedGradientBg";
import { SectionHeading, Chip, GradientText } from "@/components/ui/primitives";
import { PRODUCTS, type Product } from "@/data/products";
import { useDemoModal } from "@/hooks/useDemoModal";

const MotionBox = motion(Box);

/* --- Per-product demo panels (illustrative visuals from the design) --- */

function HackToolsDemo() {
  return (
    <Box bg="codeBg" border="1px solid" borderColor="wa.7" borderRadius="14px" overflow="hidden" minH="158px" mb="18px">
      <Flex gap="2px" px="10px" pt="9px" borderBottom="1px solid" borderColor="wa.7" fontFamily="mono" fontSize="11px">
        <Text px="9px" py="6px" color="wa.40">Elements</Text>
        <Text px="9px" py="6px" color="wa.40">Network</Text>
        <Text px="9px" py="6px" color="#2FBF70" borderBottom="2px solid #2FBF70">HackTools++</Text>
      </Flex>
      <Box px="14px" py="13px" fontFamily="mono" fontSize="11.5px" lineHeight="1.7">
        <Text color="#9D8CFF">▸ Repeater <Box as="span" color="wa.40">POST /api/login → 200</Box></Text>
        <Text color="#FFA85C">▸ Intruder <Box as="span" color="wa.40">payload set · 318 reqs</Box></Text>
        <Text color="#2FBF70">▸ Scanner <Box as="span" color="wa.40">JWT · CORS · cookies ✓</Box></Text>
      </Box>
    </Box>
  );
}

function SecretScannerDemo() {
  return (
    <Box bg="codeBg" border="1px solid" borderColor="wa.7" borderRadius="14px" p="14px" fontFamily="mono" fontSize="11.5px" lineHeight="1.75" minH="158px" mb="18px">
      <Text color="wa.45">// app.bundle.js · runtime</Text>
      <Text color="wa.70">const cfg = await loadConfig();</Text>
      <Box bg="rgba(255,92,92,0.12)" borderLeft="2px solid #FF5C5C" px="8px" py="3px" my="4px" borderRadius="4px">
        cfg.apiKey = <Box as="span" color="#FFD66B">"sk_live_9f2c…a71"</Box>
      </Box>
      <Flex color="#FF6B6B" align="center" gap="6px" mt="5px">
        ⚠ SECRET EXPOSED <Box as="span" color="wa.45">· Stripe key · runtime</Box>
      </Flex>
    </Box>
  );
}

function JanPlusDemo() {
  return (
    <Box bg="codeBg" border="1px solid" borderColor="wa.7" borderRadius="14px" p="14px" minH="158px" mb="18px">
      <Flex align="center" justify="space-between" mb="10px">
        <Text fontSize="10px" letterSpacing="0.5px" color="#FF6B6B" border="1px solid rgba(255,92,92,0.3)" borderRadius="6px" px="7px" py="3px">
          CRITICAL
        </Text>
        <Text fontSize="11px" color="wa.40" fontFamily="mono">00:60s</Text>
      </Flex>
      <Text fontSize="12.5px" color="wa.78" lineHeight="1.5">
        Hostile narrative detected · velocity ↑12/h
      </Text>
      <Flex align="center" gap="7px" mt="9px" color="#2FBF70" fontSize="11.5px">
        <Check size={14} /> Counter-draft ready in local language
      </Flex>
    </Box>
  );
}

const DEMOS: Record<string, ReactNode> = {
  hacktools: <HackToolsDemo />,
  "runtime-secret-scanner": <SecretScannerDemo />,
  janplus: <JanPlusDemo />,
};

function ProductCard({ product }: { product: Product }) {
  const { openDemoModal } = useDemoModal();
  const isGreen = product.accent === "green";
  const glowStrong = isGreen ? "rgba(47,191,112,0.5)" : "rgba(123,108,246,0.5)";
  const glowSoft = isGreen ? "rgba(47,191,112,0.22)" : "rgba(123,108,246,0.22)";
  const hoverBorder = isGreen ? "rgba(47,191,112,0.45)" : "rgba(123,108,246,0.45)";
  return (
    <Flex
      direction="column"
      position="relative"
      overflow="hidden"
      h="100%"
      bg="surface"
      border="1px solid"
      borderColor="wa.8"
      borderRadius="22px"
      p="30px"
      transition="all .25s ease"
      _hover={{
        transform: "translateY(-6px) scale(1.02)",
        borderColor: hoverBorder,
        boxShadow: `0 28px 70px ${glowSoft}`,
      }}
    >
      {/* top accent bar */}
      <Box position="absolute" top={0} left={0} right={0} h="3px" style={{ background: product.iconGradient }} />
      {/* corner glow */}
      <Box
        position="absolute"
        top="-60px"
        right="-60px"
        w="180px"
        h="180px"
        borderRadius="50%"
        opacity={0.16}
        filter="blur(30px)"
        pointerEvents="none"
        style={{ background: product.iconGradient }}
      />

      <Flex position="relative" align="center" justify="space-between" gap="10px" minH="56px" mb="18px">
        <Flex align="center" gap="12px">
          <Box position="relative" flexShrink={0}>
            <MotionBox
              position="absolute"
              inset="-6px"
              borderRadius="16px"
              opacity={0.6}
              style={{ background: product.iconGradient }}
              animate={{ opacity: [0.25, 0.55, 0.25] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <Flex
              position="relative"
              w="46px"
              h="46px"
              borderRadius="12px"
              align="center"
              justify="center"
              fontFamily="heading"
              fontWeight={800}
              fontSize="17px"
              color="white"
              boxShadow={`0 10px 26px ${glowStrong}`}
              style={{ background: product.iconGradient }}
            >
              {product.icon}
            </Flex>
          </Box>
          <Box>
            <Heading as="h3" fontWeight={800} fontSize="21px" m={0}>
              {product.name}
            </Heading>
            <Text fontSize="12px" color="wa.45">{product.subtitle}</Text>
          </Box>
        </Flex>
        <Flex
          align="center"
          gap="6px"
          fontSize="10px"
          letterSpacing="1px"
          color={product.pill.color}
          border="1px solid"
          borderColor={product.pill.border}
          borderRadius="pill"
          px="9px"
          py="5px"
          whiteSpace="nowrap"
        >
          <MotionBox
            w="5px"
            h="5px"
            borderRadius="50%"
            bg={product.pill.color}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
          {product.pill.label}
        </Flex>
      </Flex>

      <Text position="relative" fontSize="14px" lineHeight="1.6" color="wa.60" mb="18px" minH={{ md: "88px" }}>
        {product.description}
      </Text>

      <Box position="relative">{DEMOS[product.id]}</Box>

      <Flex position="relative" flexWrap="wrap" gap="7px" mb="24px">
        {product.features.map((f) => (
          <Chip key={f}>{f}</Chip>
        ))}
      </Flex>

      <Flex position="relative" mt="auto" gap="10px" flexWrap="wrap">
        <Button
          as={Link}
          href={product.viewHref}
          isExternal
          flex="1"
          minW="140px"
          h="44px"
          borderRadius="12px"
          fontSize="13.5px"
          fontWeight={700}
          color={product.ctaColor}
          border="1px solid"
          borderColor={hoverBorder}
          bg="transparent"
          rightIcon={<ArrowUpRight size={15} />}
          _hover={{ bg: "wa.5", textDecoration: "none" }}
        >
          View Product
        </Button>
        <Button
          onClick={() => openDemoModal({ product: product.name })}
          flex="1"
          minW="140px"
          h="44px"
          variant="outlineSubtle"
          fontSize="13.5px"
        >
          Book Demo
        </Button>
      </Flex>
    </Flex>
  );
}

export function Products() {
  return (
    <Section id="products" position="relative" overflow="hidden">
      <AnimatedGradientBg opacity={0.15} />
      <Box position="relative" zIndex={1}>
        <Reveal>
          <SectionHeading
            title={
              <>
                Built by expert hackers,
                <br />
                powered by <GradientText>AI</GradientText>
              </>
            }
            subtitle="Three products built by our team — from a browser-native testing suite to AI secret scanning and real-time intelligence."
          />
        </Reveal>
        <Grid templateColumns={{ base: "1fr", md: "repeat(3,1fr)" }} gap="22px" mt="48px">
          {PRODUCTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </Grid>
      </Box>
    </Section>
  );
}
