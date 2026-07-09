import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";
import { Link as RouterLink } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { AnimatedGradientBg } from "@/components/layout/AnimatedGradientBg";
import { GradientText } from "@/components/common/primitives";
import { ROUTES } from "@/constant/routes.constant";

type LegalPageProps = {
  title: string;
  updated: string;
  children: ReactNode;
};

/** Shared shell for long-form legal content (Privacy Policy, Terms & Conditions). */
export function LegalPage({ title, updated, children }: LegalPageProps) {
  return (
    <>
      <Box as="section" position="relative" overflow="hidden">
        <AnimatedGradientBg />
        <Section position="relative" zIndex={1} py={{ base: "48px", md: "72px" }} pb={{ base: "24px", md: "36px" }}>
          <Flex align="center" gap="6px" fontSize="13px" color="wa.45" mb="20px" justify="center">
            <Link as={RouterLink} to={ROUTES.HOME} _hover={{ color: "white" }}>
              Home
            </Link>
            <ChevronRight size={13} />
            <Text color="wa.70">{title}</Text>
          </Flex>

          <Box textAlign="center" maxW="760px" mx="auto">
            <Heading as="h1" fontWeight={800} fontSize={{ base: "34px", md: "50px" }} lineHeight="1.05" letterSpacing="-0.5px">
              <GradientText>{title}</GradientText>
            </Heading>
            <Text fontSize="14px" color="wa.45" mt="18px">
              Last updated: {updated}
            </Text>
          </Box>
        </Section>
      </Box>

      <Section pt={{ base: "8px", md: "16px" }} pb={{ base: "80px", md: "120px" }}>
        <Box maxW="780px" mx="auto" color="wa.65" fontSize="15px" lineHeight="1.75">
          {children}
        </Box>
      </Section>
    </>
  );
}

export function LegalH2({ children }: { children: ReactNode }) {
  return (
    <Heading as="h2" fontSize="22px" fontWeight={700} color="white" mt="40px" mb="14px" _first={{ mt: 0 }}>
      {children}
    </Heading>
  );
}

export function LegalP({ children }: { children: ReactNode }) {
  return (
    <Text mb="16px" color="wa.60">
      {children}
    </Text>
  );
}

export function LegalUl({ children }: { children: ReactNode }) {
  return (
    <Box as="ul" mb="16px" pl="22px" sx={{ listStyleType: "disc" }}>
      {children}
    </Box>
  );
}

export function LegalLi({ children }: { children: ReactNode }) {
  return (
    <Box as="li" mb="8px" color="wa.60">
      {children}
    </Box>
  );
}
