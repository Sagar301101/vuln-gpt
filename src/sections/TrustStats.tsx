import { Box, Grid, Text } from "@chakra-ui/react";
import { Section } from "@/components/layout/Section";
import { GradientText } from "@/components/ui/primitives";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";
import { STAT_TARGETS, TRUSTED_BY, type StatTarget } from "@/data/site";
import { gradients } from "@/theme";

function StatCard({ stat, active }: { stat: StatTarget; active: boolean }) {
  const value = useCountUp(stat.target, active);
  return (
    <Box bg="surface" border="1px solid" borderColor="wa.8" borderRadius="16px" px="24px" py="28px" textAlign="center">
      <Text fontFamily="heading" fontWeight={800} fontSize={{ base: "32px", md: "40px" }} lineHeight="1">
        <GradientText gradient={gradients.brandTextAlt}>{stat.format(value)}</GradientText>
      </Text>
      <Text mt="10px" fontSize="13.5px" color="wa.50">
        {stat.label}
      </Text>
    </Box>
  );
}

export function TrustStats() {
  const { ref, inView } = useInView();
  const marquee = [...TRUSTED_BY, ...TRUSTED_BY];

  return (
    <Section py={{ base: "24px", md: "24px" }} pb={{ base: "56px", md: "80px" }}>
      <Box ref={ref}>
        <Text textAlign="center" fontSize="12px" letterSpacing="2px" color="wa.40" mb="28px">
          TRUSTED BY SECURITY-CONSCIOUS TEAMS
        </Text>

        <Box
          position="relative"
          overflow="hidden"
          sx={{
            maskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)",
            WebkitMaskImage: "linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent)",
          }}
        >
          <Box
            display="flex"
            gap="64px"
            w="max-content"
            alignItems="center"
            opacity={0.65}
            sx={{ animation: "marquee 26s linear infinite" }}
          >
            {marquee.map((name, i) => (
              <Text key={i} fontFamily="heading" fontWeight={800} fontSize="22px" color="wa.70" whiteSpace="nowrap">
                {name}
              </Text>
            ))}
          </Box>
        </Box>

        <Grid templateColumns={{ base: "1fr 1fr", md: "repeat(4,1fr)" }} gap="18px" mt="48px">
          {STAT_TARGETS.map((s) => (
            <StatCard key={s.key} stat={s} active={inView} />
          ))}
        </Grid>
      </Box>
    </Section>
  );
}
