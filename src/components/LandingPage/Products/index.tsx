import {
  Box,
  Grid,
  useColorModeValue,
  Text,
  Flex,
  Image,
} from "@chakra-ui/react";

import FingerPrint from "../../../assets/icons/Fingerprint.svg";
import { FaCheck } from "react-icons/fa";
import { colors } from "../../../config/color";
import ContentLayout from "../../common/Layout/ContentLayout";

const products = [
  {
    id: 1,
    title: "Vulns-gpt",
    description:
      "AI model providing unrestricted search and analysis related to hacking, cybersecurity ideas, techniques, and more.",
  },
  {
    id: 2,
    title: "Vulns-Engine",
    description:
      "AI-powered engine for automated vulnerability assessments, advanced risk analysis, and customizable reports.",
  },
];

const Products = () => {
  return (
    <>
      <Flex
        position={"relative"}
        pb={20}
        px={{
          base: 4,
          sm: 6,
          md: 10,
          lg: 20,
        }}
      >
        <Image
          src={FingerPrint}
          width={"370px"}
          position={"absolute"}
          right={0}
        />
        <Flex
          justify={"center"}
          w={"full"}
          py={8}
          direction={"column"}
          rowGap={12}
        >
          <Text
            fontWeight={"semibold"}
            textAlign={"center"}
            fontSize={{
              base: "36px",
              md: "48px",
            }}
          >
            What Do We Provide
          </Text>
          <Flex w={"full"} justify={"center"}>
            <Grid
              justifyContent={"center"}
              gap={2}
              templateColumns={{
                base: "repeat(1,1fr)",
                lg: "repeat(2,1fr)",
              }}
              rowGap={{
                base:8,
                md:4
              }}
            >
              <Grid columnGap={{
                base:4,
              }} templateColumns={"1fr 5fr"}>
                <Flex
                  justify={"center"}
                  align={"center"}
                  h={8}
                  w={8}
                  bg={"#68BB66"}
                  rounded={"lg"}
                >
                  <FaCheck />
                </Flex>
                <Text
                  fontWeight={"medium"}
                  fontSize={{
                    base:"20px",
                    md:"24px"
                  }}
                  
                  lineHeight={"28px"}
                  ml={-6}
                >
                  Web Application Pentesting
                </Text>
              </Grid>
              <Grid columnGap={{
                base:4,
              }} templateColumns={"1fr 5fr"}>
                <Flex
                  justify={"center"}
                  align={"center"}
                  h={8}
                  w={8}
                  bg={"#68BB66"}
                  rounded={"lg"}
                >
                  <FaCheck />
                </Flex>
                <Text
                  fontWeight={"medium"}
                  fontSize={{
                    base:"20px",
                    md:"24px"
                  }}
                  lineHeight={"28px"}
                  ml={-6}
                >
                  Cloud Security
                </Text>
              </Grid>
              <Grid columnGap={{
                base:4,
              }} templateColumns={"1fr 5fr"}>
                <Flex
                  justify={"center"}
                  align={"center"}
                  h={8}
                  w={8}
                  bg={"#68BB66"}
                  rounded={"lg"}
                >
                  <FaCheck />
                </Flex>
                <Text
                  fontWeight={"medium"}
                  fontSize={{
                    base:"20px",
                    md:"24px"
                  }}
                  lineHeight={"28px"}
                  ml={-6}
                >
                  Andriod/IOS Pentesting
                </Text>
              </Grid>

              <Grid templateColumns={"1fr 5fr"} columnGap={4}>
                <Flex
                  justify={"center"}
                  align={"center"}
                  h={8}
                  w={8}
                  bg={"#68BB66"}
                  rounded={"lg"}
                >
                  <FaCheck />
                </Flex>
                <Text
                  fontWeight={"medium"}
                  fontSize={{
                    base:"20px",
                    md:"24px"
                  }}
                  lineHeight={"28px"}
                  ml={-6}
                >
                  Network Pentesting
                  </Text>
              </Grid>
            </Grid>
          </Flex>
        </Flex>
      </Flex>
      <Box w={"full"} overflow={"hidden"}>
        <Box
          borderRadius={"50% 50% 0 0/100% 100% 0 0"}
          h={60}
          w={"full"}
          bg={useColorModeValue(colors.light.globalBg, colors.dark.globalBg)}
          transform={"scaleX(1.5)"}
        ></Box>
      </Box>
      <ContentLayout
        style={{
          zIndex: 2,
        }}
      >
        <Text
          fontWeight={600}
          fontSize={{
            base: "24px",
            sm: "32px",
            md: "40px",
            lg: "48px",
          }}
          textAlign={"center"}
          mt={-20}
        >
          Our product, developed by our{" "}
          <span
            style={{
              display: "inline-block",
              backgroundImage: useColorModeValue(
                colors.light.landgingView.animatedText,
                colors.dark.landgingView.animatedText
              ),
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            expert hackers
          </span>{" "}
          , is fully powered by AI for unparalleled security.
        </Text>
        <Flex
          w={"full"}
          justify={"center"}
          align={"center"}
          wrap={"wrap"}
          gap={8}
          py={16}
        >
          {products?.map((product) => (
            <Grid
              key={product?.id}
              p={8}
              pb={16}
              maxW={"md"}
              bg={useColorModeValue(
                colors.light.products.cardBackground,
                colors.dark.products.cardBackground
              )}
              rounded={"2xl"}
              rowGap={2}
              justifyContent={"center"}
              alignItems={"center"}
              templateRows={"repeat(2,1fr)"}
              h={"full"}
            >
              <Text
                fontSize={{ base: "20px", sm: "24px", md: "32px", lg: "40px" }}
                fontWeight={600}
                textAlign={"center"}
              >
                {product?.title}
              </Text>
              <Text
                textAlign={"center"}
                fontSize={{ base: "16px", md: "20px" }}
                fontWeight={400}
              >
                {product?.description}
              </Text>
            </Grid>
          ))}
        </Flex>
      </ContentLayout>
    </>
  );
};
export default Products;
