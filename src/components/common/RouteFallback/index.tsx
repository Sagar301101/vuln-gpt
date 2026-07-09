import { Flex, Spinner } from "@chakra-ui/react";

/** Lightweight fallback shown while a lazily-loaded route chunk loads. */
export function RouteFallback() {
  return (
    <Flex minH="60vh" align="center" justify="center">
      <Spinner size="lg" thickness="3px" speed="0.7s" color="brand.green" emptyColor="wa.8" />
    </Flex>
  );
}
