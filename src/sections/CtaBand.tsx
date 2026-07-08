import { Box, Button, chakra, Heading, Text } from "@chakra-ui/react";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/layout/Reveal";
import { useDemoModal } from "@/hooks/useDemoModal";
import { gradients } from "@/theme";

export function CtaBand() {
  const { openDemoModal } = useDemoModal();
  return (
    <Section id="cta" py={{ base: "40px", md: "40px" }} pb={{ base: "64px", md: "96px" }}>
      <Reveal>
        <Box position="relative" borderRadius="28px" overflow="hidden" p={{ base: "40px", md: "64px" }} px={{ base: "28px", md: "60px" }} sx={{ background: gradients.cta }}>
          {/* concentric-circles motif */}
          <chakra.svg
            viewBox="0 0 200 200"
            position="absolute"
            right="40px"
            top="50%"
            transform="translateY(-50%)"
            w="340px"
            h="340px"
            opacity={0.22}
            fill="none"
            stroke="#000"
            strokeWidth="1.4"
            display={{ base: "none", md: "block" }}
          >
            {[14, 30, 46, 62, 78, 94].map((r) => (
              <circle key={r} cx="100" cy="100" r={r} />
            ))}
          </chakra.svg>

          <Box position="relative" maxW="560px">
            <Text fontSize="16px" color="rgba(255,255,255,0.85)" mb="14px">
              Want to know more about us?
            </Text>
            <Heading as="h2" fontWeight={800} fontSize={{ base: "32px", md: "48px" }} lineHeight="1.05" color="white" mb="30px">
              Feel free to schedule your free demo
            </Heading>
            <Button
              onClick={() => openDemoModal()}
              h="56px"
              px="30px"
              borderRadius="14px"
              bg="#0A0A0E"
              color="white"
              fontWeight={700}
              fontSize="15px"
              letterSpacing="0.5px"
              rightIcon={<ArrowRight size={17} />}
              _hover={{ bg: "#16161C" }}
            >
              Schedule a free demo call
            </Button>
          </Box>
        </Box>
      </Reveal>
    </Section>
  );
}
