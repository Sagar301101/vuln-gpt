import { Box, Flex, Link, Text } from "@chakra-ui/react";
import {
  BiLogoFacebookCircle,
  BiLogoInstagramAlt,
} from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";

import { PRIMARYCOLOR, PRIMARYDESCRIPTIONCOLOR } from "../../../utils/color";
import ContentLayout from "../Layout/ContentLayout";
import Logo from "../../../assets/logo.png";

import { LuPhoneCall } from "react-icons/lu";
import { MdOutlineMailOutline } from "react-icons/md";


const Footer = () => {
  const connectedLinks = [
    {
      id: 1,
      link: "https://www.facebook.com/profile.php?id=61560640806999&mibextid=ZbWKwL",
      icon: <BiLogoFacebookCircle />,
    },
    {
      id: 2,
      link: "https://www.instagram.com/vulnshields",
      icon: <BiLogoInstagramAlt />,
    },
    // {
    //   id: 3,
    //   link: "#",
    //   icon: <RiTwitterXLine />,
    // },
    {
      id: 4,
      link: "https://www.linkedin.com/company/vulnshields/",
      icon: <FaLinkedin />,
    },
  ];
  return (
    <ContentLayout>
      <Box
        w={"full"}
        display={"flex"}
        flexDirection={"column"}
        alignItems={"start"}
        gap={6}
        py={10}
        fontWeight={600}
        id="contact"
      >
        <Flex
          w={"full"}
          justifyContent={{ base: "center", md: "space-between" }}
          alignItems={"center"}
          flexWrap={"wrap"}
          gap={6}
        >
          <Link href="#home">
            <img src={Logo} alt="" width={"150px"} />
          </Link>

          <Box>
            <Flex alignItems={"center"} gap={4} flexWrap={"wrap"}>
              {connectedLinks?.map((eachLink) => (
                <Link
                  key={eachLink.id}
                  href={eachLink.link}
                  bg={PRIMARYCOLOR}
                  borderRadius={"lg"}
                  p={2}
                  _hover={{
                    transform: "scale(1.2)",
                  }}
                  isExternal
                >
                  {eachLink.icon}
                </Link>
              ))}
            </Flex>
            <Flex my={2} alignItems={"center"} columnGap={2}>
              <LuPhoneCall color="#0EC9AC" fontSize={"xl"}/>
              <Text>+91 9304940283</Text>
            </Flex>
            <Flex my={2} alignItems={"center"} columnGap={2} >
              <MdOutlineMailOutline color="#0EC9AC" fontSize={"xl"}/>
              <Text>sales@vulnshields.com</Text>
            </Flex>
           
          </Box>
        </Flex>
        <Box h={"1px"} w={"full"} bg={PRIMARYDESCRIPTIONCOLOR}></Box>
        <Flex
          w={"full"}
          justifyContent={{ base: "center", md: "space-between" }}
          alignItems={"center"}
          flexWrap={"wrap"}
        >
          <Flex alignItems={"center"} gap={4} flexWrap={"wrap"}>
            <Link href="#">Privacy & Policy</Link>
            <Link href="#">Terms Condition</Link>
          </Flex>
          <Text>Copyright &copy; 2023. All rights reserved</Text>
        </Flex>
      </Box>
    </ContentLayout>
  );
};
export default Footer;
