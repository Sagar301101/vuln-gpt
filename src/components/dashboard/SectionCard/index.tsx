import { Box, Flex, Text } from "@chakra-ui/react";
import type { ComponentType, ReactNode } from "react";
import { DashCard } from "@/components/dashboard/primitives";

export function SectionCard({
  icon: Icon,
  title,
  subtitle,
  children,
}: {
  icon: ComponentType<{ size?: number | string }>;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <DashCard>
      <Flex gap="12px" align="center" mb="20px">
        <Flex
          w="40px"
          h="40px"
          borderRadius="11px"
          align="center"
          justify="center"
          bg="rgba(123,108,246,0.12)"
          color="#9D8CFF"
          flexShrink={0}
        >
          <Icon size={19} />
        </Flex>
        <Box>
          <Text fontFamily="heading" fontWeight={800} fontSize="16px">
            {title}
          </Text>
          <Text fontSize="12.5px" color="wa.50">
            {subtitle}
          </Text>
        </Box>
      </Flex>
      {children}
    </DashCard>
  );
}
