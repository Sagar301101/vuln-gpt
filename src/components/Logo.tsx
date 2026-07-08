import { Box, Flex, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import logoSrc from "@/assets/logo.png";

export function Logo() {
  return (
    <Flex as={RouterLink} to="/" align="center" textDecoration="none">
      <Box lineHeight="1">
        <Image src={logoSrc} alt="VulnShields" h="50px" w="auto" />
      </Box>
    </Flex>
  );
}
