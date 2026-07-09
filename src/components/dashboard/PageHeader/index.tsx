import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import type { ReactNode } from "react";

/** Standard page title block with an optional action area on the right. */
export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <Flex
      justify="space-between"
      align={{ base: "stretch", md: "flex-end" }}
      direction={{ base: "column", md: "row" }}
      gap="16px"
      mb="26px"
    >
      <Box>
        <Heading
          as="h1"
          fontSize={{ base: "26px", md: "32px" }}
          letterSpacing="-0.6px"
          m={0}
        >
          {title}
        </Heading>
        {subtitle && (
          <Text fontSize={{ base: "14px", md: "15px" }} color="wa.55" mt="8px">
            {subtitle}
          </Text>
        )}
      </Box>
      {actions && (
        <Flex gap="10px" align="center" flexShrink={0}>
          {actions}
        </Flex>
      )}
    </Flex>
  );
}
