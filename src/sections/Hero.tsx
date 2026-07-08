import { Box, Button, Flex, Heading, HStack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { AnimatedGradientBg } from "@/components/layout/AnimatedGradientBg";
import { ScanBackdrop } from "@/components/layout/ScanBackdrop";
import { GradientText } from "@/components/ui/primitives";
import { useDemoModal } from "@/hooks/useDemoModal";
import { gradients, layout } from "@/theme";

const MotionBox = motion(Box);

const trust = ["OWASP-aligned", "Certified pentesters", "Actionable reports"];

export function Hero() {
  const { openDemoModal } = useDemoModal();

  return (
    <Box as="section" id="top" position="relative" overflow="hidden" px={layout.px} py={{ base: "72px", md: "120px" }}>
      <AnimatedGradientBg />
      <ScanBackdrop />

      <MotionBox
        position="relative"
        zIndex={1}
        maxW="820px"
        mx="auto"
        textAlign="center"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Flex
          display="inline-flex"
          align="center"
          gap="9px"
          pl="11px"
          pr="14px"
          py="7px"
          borderRadius="pill"
          border="1px solid"
          borderColor="rgba(47,191,112,0.35)"
          bg="rgba(47,191,112,0.08)"
          mb="26px"
        >
          <Box w="7px" h="7px" borderRadius="50%" bg="brand.green" boxShadow="0 0 0 4px rgba(47,191,112,0.18)" />
          <Text fontSize="12.5px" letterSpacing="1px" color="brand.mint" fontWeight={500}>
            AI-POWERED · VULNERABILITY ASSESSMENT EXPERTS
          </Text>
        </Flex>

        <Heading
          as="h1"
          fontWeight={800}
          fontSize={{ base: "40px", md: "64px" }}
          lineHeight="1.04"
          letterSpacing="-0.5px"
          mb="22px"
        >
          Professional <GradientText>Security</GradientText>
          <br />
          With Reliable Service
        </Heading>

        <Text fontSize={{ base: "16px", md: "18px" }} lineHeight="1.6" color="wa.60" maxW="800px" mx="auto" mb="34px">
          Your trusted partner across{" "}
          <Box as="strong" color="white" fontWeight={500}>
            Security, DevOps &amp; Development
          </Box>
          . We pentest, harden, ship and monitor your digital assets — robust protection across web,
          mobile, API and cloud.
        </Text>

        <Flex align="center" justify="center" gap="16px" flexWrap="wrap">
          <Button
            onClick={() => openDemoModal()}
            variant="brand"
            h="54px"
            px="28px"
            fontSize="15px"
            rightIcon={<ArrowRight size={17} />}
            sx={{ background: gradients.brand }}
          >
            Schedule a free demo call
          </Button>
          <Button as={RouterLink} to="/dashboard" variant="outlineSubtle" h="54px" px="24px" fontSize="15px">
            Go to Dashboard
          </Button>
        </Flex>

        <HStack spacing={{ base: "16px", md: "26px" }} mt="34px" color="wa.45" fontSize="13px" flexWrap="wrap" justify="center">
          {trust.map((t) => (
            <Flex key={t} align="center" gap="7px">
              <CheckCircle2 size={15} color="#2FBF70" />
              {t}
            </Flex>
          ))}
        </HStack>
      </MotionBox>
    </Box>
  );
}
