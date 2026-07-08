import { Box, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/layout/Reveal";
import { SectionHeading } from "@/components/ui/primitives";
import { PROCESS } from "@/data/site";

export function Process() {
  return (
    <Section>
      <Reveal>
        <Box mb="52px">
          <SectionHeading title="A clear, repeatable engagement" />
        </Box>
      </Reveal>

      <Box position="relative">
        {/* gradient connector line (desktop only) */}
        <Box
          display={{ base: "none", md: "block" }}
          position="absolute"
          top="28px"
          left="8%"
          right="8%"
          h="2px"
          opacity={0.4}
          background="linear-gradient(90deg,#2FBF70,#7B6CF6)"
        />
        <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", md: "repeat(5,1fr)" }} gap="16px" rowGap="36px">
          {PROCESS.map((step, i) => (
            <Reveal key={step.num} delay={i * 0.06}>
              <Box position="relative" textAlign="center">
                <Flex
                  w="56px"
                  h="56px"
                  borderRadius="50%"
                  mx="auto"
                  mb="18px"
                  bg="panel"
                  border="2px solid"
                  borderColor={step.border}
                  align="center"
                  justify="center"
                  fontFamily="heading"
                  fontWeight={800}
                  fontSize="20px"
                  color={step.color}
                >
                  {step.num}
                </Flex>
                <Heading as="h4" fontWeight={700} fontSize="17px" mb="8px">
                  {step.title}
                </Heading>
                <Text fontSize="13px" color="wa.50" lineHeight="1.55">
                  {step.description}
                </Text>
              </Box>
            </Reveal>
          ))}
        </Grid>
      </Box>
    </Section>
  );
}
