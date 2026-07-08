import { Box, Button, Flex, Grid, Heading, Stack, Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import { ArrowRight, Check, Code2 } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/layout/Reveal";
import { SectionHeading, IconTile } from "@/components/ui/primitives";
import { ICONS } from "@/components/ui/iconMap";
import { CAPABILITIES } from "@/data/site";
import { SERVICES, SERVICE_ORDER } from "@/data/services";
import { gradients } from "@/theme";

/** Full-spectrum capability grid (formerly its own "What We Provide" section). */
function CapabilitiesGrid() {
  return (
    <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "repeat(4,1fr)" }} gap="20px" mb={{ base: "56px", md: "72px" }}>
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
              transition="all .25s ease"
              _hover={{ transform: "translateY(-6px) scale(1.02)", borderColor: accentBorder, boxShadow: "0 20px 44px rgba(0,0,0,0.35)" }}
            >
              <Box mb="20px">
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

  const subs = SERVICES[tab].subs;
  const activeSub = useMemo(() => subs.find((s) => s.id === sub) ?? subs[0], [subs, sub]);

  const selectTab = (id: string) => {
    setTab(id);
    setSub(SERVICES[id].subs[0].id);
  };

  return (
    <>
      <Flex justify="center" gap="14px" flexWrap="wrap" mb="32px">
        {SERVICE_ORDER.map((id) => {
          const active = tab === id;
          return (
            <Button
              key={id}
              onClick={() => selectTab(id)}
              h="46px"
              px="24px"
              borderRadius="pill"
              fontWeight={600}
              fontSize="15px"
              color="white"
              border="1px solid"
              borderColor={active ? "transparent" : "wa.18"}
              sx={{ background: active ? gradients.brand : "transparent" }}
              _hover={{ borderColor: active ? "transparent" : "wa.12", bg: active ? undefined : "wa.4" }}
            >
              {SERVICES[id].label}
            </Button>
          );
        })}
      </Flex>

      <Grid
        bg="surfaceAlt"
        border="1px solid"
        borderColor="wa.8"
        borderRadius="20px"
        p="14px"
        templateColumns={{ base: "1fr", md: "1fr 1fr" }}
        gap={{ base: "8px", md: "24px" }}
      >
        <Stack spacing="10px" p="14px">
          {subs.map((s) => {
            const active = sub === s.id;
            return (
              <Button
                key={s.id}
                onClick={() => setSub(s.id)}
                justifyContent="flex-start"
                gap="14px"
                h="auto"
                py="16px"
                px="18px"
                borderRadius="12px"
                color="white"
                fontWeight={600}
                fontSize="15px"
                border="1px solid"
                borderColor={active ? "rgba(123,108,246,0.5)" : "transparent"}
                bg={active ? "rgba(123,108,246,0.1)" : "wa.3"}
                _hover={{ bg: active ? "rgba(123,108,246,0.14)" : "wa.5" }}
              >
                <Flex w="26px" h="26px" borderRadius="7px" align="center" justify="center" flexShrink={0} style={{ background: gradients.iconTile }}>
                  <Check size={15} color="white" strokeWidth={2.6} />
                </Flex>
                {s.label}
              </Button>
            );
          })}
        </Stack>

        <Box p={{ base: "18px", md: "22px" }} px={{ md: "24px" }} borderLeft={{ md: "1px solid" }} borderColor={{ md: "wa.7" }}>
          <Text fontSize="12px" letterSpacing="1.5px" color="wa.40" mb="18px">
            INCLUDED CHECKS
          </Text>
          <Stack spacing="16px">
            {activeSub.checks.map((c) => (
              <Flex key={c} align="center" gap="14px">
                <Flex w="30px" h="30px" borderRadius="50%" bg="rgba(47,191,112,0.12)" align="center" justify="center" flexShrink={0}>
                  <Check size={16} color="#2FBF70" strokeWidth={2.4} />
                </Flex>
                <Text fontSize="15.5px" color="wa.85">
                  {c}
                </Text>
              </Flex>
            ))}
          </Stack>
        </Box>
      </Grid>
    </>
  );
}

const secondaryLines = [
  {
    title: "DevOps Services",
    accent: "violet" as const,
    icon: ArrowRight,
    blurb:
      "Ship faster without trading away security. We build hardened pipelines that bake checks into every deploy.",
    items: [
      "CI/CD pipeline design & automation",
      "Infrastructure as Code (Terraform / Pulumi)",
      "Container & Kubernetes hardening",
      "Observability, alerting & DevSecOps",
    ],
  },
  {
    title: "Development Services",
    accent: "green" as const,
    icon: Code2,
    blurb:
      "Secure-by-design engineering. From UI/UX to production, we build products that are resilient from day one.",
    items: [
      "Web & mobile application development",
      "Secure API & backend architecture",
      "UI/UX design & product engineering",
      "Code review & secure SDLC",
    ],
  },
];

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

      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap="22px" mt="24px">
        {secondaryLines.map((line) => {
          const iconColor = line.accent === "green" ? "#2FBF70" : "#9D8CFF";
          const Icon = line.icon;
          return (
            <Reveal key={line.title}>
              <Box
                h="100%"
                bg="surface"
                border="1px solid"
                borderColor="wa.8"
                borderRadius="20px"
                p="32px"
                transition="all .25s ease"
                _hover={{
                  transform: "translateY(-6px) scale(1.02)",
                  borderColor: line.accent === "green" ? "rgba(47,191,112,0.4)" : "rgba(123,108,246,0.4)",
                  boxShadow: "0 20px 44px rgba(0,0,0,0.35)",
                }}
              >
                <Box mb="18px">
                  <IconTile accent={line.accent}>
                    <Icon size={24} color={iconColor} />
                  </IconTile>
                </Box>
                <Heading as="h3" fontWeight={800} fontSize="23px" mb="8px">
                  {line.title}
                </Heading>
                <Text fontSize="14.5px" color="wa.55" lineHeight="1.6" mb="18px">
                  {line.blurb}
                </Text>
                <Stack spacing="12px">
                  {line.items.map((it) => (
                    <Flex key={it} align="center" gap="11px" fontSize="14.5px" color="wa.82">
                      <Check size={16} color={iconColor} strokeWidth={2.4} style={{ flexShrink: 0 }} />
                      {it}
                    </Flex>
                  ))}
                </Stack>
              </Box>
            </Reveal>
          );
        })}
      </Grid>
    </Section>
  );
}
