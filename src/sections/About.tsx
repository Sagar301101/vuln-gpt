import { Box, Grid, Heading, Text } from "@chakra-ui/react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/layout/Reveal";
import { GradientText } from "@/components/ui/primitives";
import { gradients } from "@/theme";

const inlineStats = [
  { value: "10+", label: "certified pentesters" },
  { value: "6", label: "disciplines under one roof" },
  { value: "24/7", label: "monitoring & support" },
];

export function About() {
  return (
    <Section id="about">
      <Reveal>
        <Box maxW="720px" mx="auto" textAlign="center">
          <Heading as="h2" fontWeight={800} fontSize={{ base: "30px", md: "42px" }} lineHeight="1.1" mb="20px">
            A team of expert hackers on your side
          </Heading>
          <Text fontSize="16px" lineHeight="1.65" color="wa.60" mb="18px">
            We're a security-first studio that also designs, builds and ships. That means we don't
            just find problems — we help you fix them, and we engineer products that are resilient
            from the first commit.
          </Text>
          <Text fontSize="16px" lineHeight="1.65" color="wa.60" mb="32px">
            UI/UX + Development + Deployment + QA + Security = the complete package.
          </Text>
          <Grid templateColumns={{ base: "1fr", sm: "repeat(3,1fr)" }} gap="16px">
            {inlineStats.map((s) => (
              <Box
                key={s.label}
                bg="surface"
                border="1px solid"
                borderColor="wa.8"
                borderRadius="16px"
                py="24px"
                px="18px"
                transition="all .25s ease"
                _hover={{ transform: "translateY(-4px) scale(1.02)", borderColor: "rgba(123,108,246,0.35)" }}
              >
                <Text fontFamily="heading" fontWeight={800} fontSize="30px">
                  <GradientText gradient={gradients.brandTextAlt}>{s.value}</GradientText>
                </Text>
                <Text fontSize="13px" color="wa.50" mt="4px">
                  {s.label}
                </Text>
              </Box>
            ))}
          </Grid>
        </Box>
      </Reveal>
    </Section>
  );
}
