import { Box, Flex, Image, Link, useColorModeValue } from "@chakra-ui/react";

import Logo from "../../../assets/logo.png";
import {FreeDemoButton} from "../MyButton";
import { colors } from "../../../config/color";
import ContentLayout from "../Layout/ContentLayout";



export default function Nav() {
  return (
    <Box bg={useColorModeValue(colors.light.navbar.background,colors.dark.navbar.background)} py={4} position={"sticky"} top={0} zIndex={10}>
     <ContentLayout>
     <Flex alignItems={"center"} w={"full"} justify={"space-between"}>
        <Link href="/">
          <Image src={Logo} alt="" w={{
            base:"100px",
            md:"125px",
            lg:"150px"
          }} />
        </Link>
        <FreeDemoButton label="Schedule a free demo call"/>
      </Flex>
     </ContentLayout>
    
    </Box>
  );
}
