import { Box, Flex, Grid, Link, Stack, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Logo } from "@/components/Logo";
import { layout } from "@/theme";

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
      { label: "Blog", to: "/blog" },
    ],
  },
];

const socials = [
  { label: "LinkedIn", icon: Linkedin, to: "https://www.linkedin.com/company/vulnshields/" },
  { label: "Facebook", icon: Facebook, to: "#" },
  { label: "Instagram", icon: Instagram, to: "#" },
];

export function Footer() {
  return (
    <Box as="footer" borderTop="1px solid" borderColor="wa.7" pt="56px" pb="36px" px={layout.px}>
      <Grid
        maxW={layout.maxW}
        mx="auto"
        templateColumns={{ base: "1fr", sm: "1fr 1fr", lg: "1.4fr 1fr 1fr 1fr" }}
        gap="40px"
      >
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

        {columns.map((col) => (
          <Box key={col.title}>
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
          <Link as={RouterLink} to="/privacy-policy" fontSize="13px" color="wa.40" _hover={{ color: "white" }}>
            Privacy &amp; Policy
          </Link>
          <Link as={RouterLink} to="/terms-conditions" fontSize="13px" color="wa.40" _hover={{ color: "white" }}>
            Terms &amp; Conditions
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}
