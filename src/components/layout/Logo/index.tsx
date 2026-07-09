import { Box, Flex, Image } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import logoSrc from "@/assets/logo.png";
import { ROUTES } from "@/constant/routes.constant";

export function Logo() {
  return (
    <Flex as={RouterLink} to={ROUTES.HOME} align="center" textDecoration="none">
      <Box lineHeight="1">
        <Image src={logoSrc} alt="VulnShields" h="50px" w="auto" />
      </Box>
    </Flex>
  );
}
