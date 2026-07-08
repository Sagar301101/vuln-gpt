import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { Home } from "lucide-react";
import { Section } from "@/components/layout/Section";
import { GradientText } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <Section py={{ base: "100px", md: "140px" }}>
      <Box textAlign="center">
        <Heading fontFamily="heading" fontWeight={800} fontSize={{ base: "80px", md: "120px" }} lineHeight="1">
          <GradientText>404</GradientText>
        </Heading>
        <Heading as="h1" fontSize={{ base: "24px", md: "30px" }} mt="12px" mb="12px">
          Page not found
        </Heading>
        <Text color="wa.55" maxW="420px" mx="auto" mb="28px">
          The page you're looking for doesn't exist or has moved. Let's get you back to safety.
        </Text>
        <Button as={RouterLink} to="/" variant="brand" h="50px" px="26px" leftIcon={<Home size={17} />}>
          Back home
        </Button>
      </Box>
    </Section>
  );
}
