import { Box, Collapse, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { Reveal } from "@/components/layout/Reveal";
import { SectionHeading } from "@/components/common/primitives";
import { FAQS } from "@/constant/faqs.constant";

export function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <Section innerMaxW="860px">
      <Reveal>
        <Box mb="48px">
          <SectionHeading title="Frequently Asked Questions" />
        </Box>
      </Reveal>

      <Flex direction="column" gap="14px">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <Box
              key={f.q}
              bg="surface"
              border="1px solid"
              borderColor={isOpen ? "rgba(123,108,246,0.35)" : "wa.8"}
              borderRadius="16px"
              overflow="hidden"
              transition="border-color .25s ease"
            >
              <Flex
                as="button"
                w="100%"
                align="center"
                justify="space-between"
                gap="16px"
                px="26px"
                py="24px"
                textAlign="left"
                fontSize={{ base: "15px", md: "16.5px" }}
                fontWeight={600}
                color="white"
                cursor="pointer"
                onClick={() => setOpen(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                transition="background .2s ease"
                _hover={{ bg: "wa.3" }}
              >
                {f.q}
                <ChevronDown
                  size={20}
                  color="#9D8CFF"
                  style={{
                    flexShrink: 0,
                    transition: "transform .3s cubic-bezier(0.22,1,0.36,1)",
                    transform: isOpen ? "rotate(180deg)" : "none",
                  }}
                />
              </Flex>
              <Collapse in={isOpen} animateOpacity>
                <Text px="26px" pb="24px" m={0} fontSize="14.5px" lineHeight="1.7" color="wa.60">
                  {f.a}
                </Text>
              </Collapse>
            </Box>
          );
        })}
      </Flex>
    </Section>
  );
}
