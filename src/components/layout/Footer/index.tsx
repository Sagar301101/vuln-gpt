import { Box, Flex, Grid, Link, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { layout } from "@/theme";
import { ROUTES } from "@/constant/routes.constant";

const columns: { title: string; links: { label: string; to: string; external?: boolean }[] }[] = [
  {
    title: "Products",
    links: [
      { label: "HackTools++", to: "https://hacktool.vulnshields.net/", external: true },
      { label: "Runtime Secret Scanner", to: "https://ai.vulnshields.net/", external: true },
      { label: "JanPlus", to: "https://janplus.vulnshields.net/", external: true },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Security", to: "/#services" },
      { label: "DevOps", to: "/#services" },
      { label: "Development", to: "/#services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/#about" },
      { label: "Blog", to: ROUTES.BLOG },
    ],
  },
];

const socials = [
  { label: "LinkedIn", icon: Linkedin, to: "https://www.linkedin.com/company/vulnshields/" },
  { label: "Facebook", icon: Facebook, to: "#" },
  { label: "Instagram", icon: Instagram, to: "#" },
];

function BrandBlock() {
  return (
    <Box>
      <Box mb="16px">
        <Logo />
      </Box>
      <Text fontSize="14px" color="wa.50" lineHeight="1.6" maxW="300px" mb="20px">
        Professional security with reliable service. Security, DevOps and Development under one
        roof.
      </Text>
      <Flex gap="12px">
        {socials.map(({ label, icon: Icon, to }) => (
          <Link
            key={label}
            href={to}
            isExternal={to !== "#"}
            aria-label={label}
            w="38px"
            h="38px"
            borderRadius="10px"
            border="1px solid"
            borderColor="wa.12"
            display="grid"
            placeItems="center"
            color="wa.70"
            _hover={{ color: "white", borderColor: "wa.18" }}
          >
            <Icon size={17} />
          </Link>
        ))}
      </Flex>
    </Box>
  );
}

function LinkColumn({ col }: { col: (typeof columns)[number] }) {
  return (
    <Box>
      <Text
        fontSize="13px"
        letterSpacing="1px"
        color="wa.40"
        mb="16px"
        textTransform="uppercase"
      >
        {col.title}
      </Text>
      <Stack spacing="11px">
        {col.links.map((l) =>
          l.external ? (
            <Link
              key={l.label}
              href={l.to}
              isExternal
              fontSize="14px"
              color="wa.65"
              _hover={{ color: "white" }}
            >
              {l.label}
            </Link>
          ) : (
            <Link
              key={l.label}
              as={RouterLink}
              to={l.to}
              fontSize="14px"
              color="wa.65"
              _hover={{ color: "white" }}
            >
              {l.label}
            </Link>
          ),
        )}
      </Stack>
    </Box>
  );
}

export function Footer() {
  return (
    <Box as="footer" borderTop="1px solid" borderColor="wa.7" pt="56px" pb="36px" px={layout.px}>
      {/* mobile/tablet: brand block full width, link columns as a compact 2-up grid below */}
      <Box display={{ base: "block", lg: "none" }} maxW={layout.maxW} mx="auto">
        <Box mb="36px">
          <BrandBlock />
        </Box>
        <Grid templateColumns="1fr 1fr" columnGap="24px" rowGap="32px">
          {columns.map((col) => (
            <LinkColumn key={col.title} col={col} />
          ))}
        </Grid>
      </Box>

      {/* desktop: single 4-column row */}
      <Grid
        display={{ base: "none", lg: "grid" }}
        maxW={layout.maxW}
        mx="auto"
        templateColumns="1.4fr 1fr 1fr 1fr"
        gap="40px"
      >
        <BrandBlock />
        {columns.map((col) => (
          <LinkColumn key={col.title} col={col} />
        ))}
      </Grid>

      <Flex
        maxW={layout.maxW}
        mx="auto"
        mt="40px"
        pt="24px"
        borderTop="1px solid"
        borderColor="wa.7"
        justify="space-between"
        align="center"
        flexWrap="wrap"
        gap="16px"
      >
        <Text fontSize="13px" color="wa.40">
          Copyright © 2024 VulnShields. All rights reserved.
        </Text>
        <Flex gap="26px">
          <Link as={RouterLink} to={ROUTES.PRIVACY_POLICY} fontSize="13px" color="wa.40" _hover={{ color: "white" }}>
            Privacy &amp; Policy
          </Link>
          <Link as={RouterLink} to={ROUTES.TERMS_CONDITIONS} fontSize="13px" color="wa.40" _hover={{ color: "white" }}>
            Terms &amp; Conditions
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
