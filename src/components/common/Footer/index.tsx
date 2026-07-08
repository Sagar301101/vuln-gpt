import { Box, Flex, Link, Text, useColorModeValue } from "@chakra-ui/react";
import { BiLogoFacebookCircle, BiLogoInstagramAlt } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";

import Logo from "../../../assets/logo.png";
import { colors } from "../../../config/color";

const Footer = () => {
  const connectedLinks = [
    {
      id: 1,
      link: "https://www.facebook.com/profile.php?id=61560640806999&mibextid=ZbWKwL",
      icon: <BiLogoFacebookCircle fontSize={"28px"} />,
    },
    {
      id: 2,
      link: "https://www.instagram.com/vulnshields",
      icon: <BiLogoInstagramAlt fontSize={"28px"} />,
    },
    {
      id: 4,
      link: "https://www.linkedin.com/company/vulnshields/",
      icon: <FaLinkedin fontSize={"28px"} />,
    },
  ];

  return (
    <>
    <Box
      px={{
        base: 4,
        sm: 6,
        md: 10,
        lg: 20,
      }}
      bg={useColorModeValue(
        colors?.light?.footer?.background,
        colors?.dark?.footer?.background
      )}
      pt={8}
      pb={4}
    >
      <Flex w={"full"} alignItems={"center"} gap={6} id="contact">
        <Box w={"full"}>
          <Link href="#home">
            <img src={Logo} alt="Logo" width={"150px"} />
          </Link>
        </Box>

        <Flex alignItems={"center"} gap={4} justify={"center"}>
          {connectedLinks?.map((eachLink) => (
            <Link
              key={eachLink.id}
              href={eachLink.link}
              borderRadius={"lg"}
              _hover={{
                transform: "scale(1.2)",
              }}
              isExternal
              color={useColorModeValue(
                colors?.light.footer.icons,
                colors.dark.footer.icons
              )}
            >
              {eachLink.icon}
            </Link>
          ))}
        </Flex>
      </Flex>
      <Flex align={"center"} mt={2} justify={{
        base:"center",
        md:"space-between"
      }} >
        <Text
          color={useColorModeValue(
            colors?.light?.footer?.copy,
            colors?.dark?.footer?.copy
          )}
          display={{ base: "none", md: "block" }}
        >
          Copyright &copy; 2024. All rights reserved
        </Text>
        <Flex
          justify={{
            base: "center",
            md: "end",
          }}
          gap={4}
        >
          <Link
            href="/privacy-policy"
            color={useColorModeValue(
              colors?.light?.footer?.copy,
              colors?.dark?.footer?.copy
            )}
          >
            Privacy & Policy
          </Link>
          <Link
            href="/terms-and-condition"
            color={useColorModeValue(
              colors?.light?.footer?.copy,
              colors?.dark?.footer?.copy
            )}
          >
            Terms & Condition
          </Link>
        </Flex>
      </Flex>

    
    </Box>
    <Text display={{ base: "block", md: "none" }} textAlign={"center"} bg={"black"} py={2}>
        Copyright &copy; 2024. All rights reserved
      </Text>
    </>
  );
};

export default Footer;
