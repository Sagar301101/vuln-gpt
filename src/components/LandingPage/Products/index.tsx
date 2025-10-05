import {
  Box,
  Grid,
  Heading,
  useColorModeValue,
  Text,
  Flex,
} from "@chakra-ui/react";
import { TbWorldCheck } from "react-icons/tb";
import { SiSecurityscorecard } from "react-icons/si";
import { PRIMARYCOLOR, PRIMARYDESCRIPTIONCOLOR } from "../../../utils/color";

import ProductImageBg from "../../../assets/product/product.jpg";

const Products = () => {
  const tealColor = useColorModeValue(PRIMARYCOLOR, PRIMARYCOLOR);
  const grayColor = useColorModeValue(
    PRIMARYDESCRIPTIONCOLOR,
    PRIMARYDESCRIPTIONCOLOR
  );
  return (
    <Grid
      templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
      id="products"
    >
      <Flex
        p={{ base: 4, sm: 6, md: 10, lg: 20 }}
        flexDirection={"column"}
        alignItems={"start"}
        gap={10}
      >
        <Text color={tealColor}>Welcome To Vulnshield </Text>
        <Heading size={"lg"}>
          Our product, developed by our expert hackers, is fully powered by AI
          for unparalleled security.
        </Heading>
        <Text color={grayColor}>
          Harness the power of advanced AI technology to address and resolve all
          your security concerns efficiently and effectively.
        </Text>
        <Flex gap={4} flexDirection={{ base: "column", sm: "row" }}>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={4}
            boxShadow={{ base: "rgba(0, 0, 0, 0.94) 0px 3px 8px", sm: "none" }}
            p={{ base: 4, sm: 0 }}
          >
            <SiSecurityscorecard
              color={PRIMARYCOLOR}
              style={{
                height: "40px",
                width: "40px",
              }}
            />
            <Heading size={"lg"}>Vulns-gpt</Heading>
            <Text color={grayColor}>
              AI model providing unrestricted search and analysis related to
              hacking, cybersecurity ideas, techniques, and more.
            </Text>
          </Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            gap={4}
            boxShadow={{ base: "rgba(0, 0, 0, 0.94) 0px 3px 8px", sm: "none" }}
            p={{ base: 4, sm: 0 }}
          >
            <TbWorldCheck
              color={PRIMARYCOLOR}
              style={{
                height: "40px",
                width: "40px",
              }}
            />
            <Heading size={"lg"}>Vulns-Engine</Heading>
            <Text color={grayColor}>
              AI-powered engine for automated vulnerability assessments,
              advanced risk analysis, and customizable reports.
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Box
        position={"relative"}
        bgImage={ProductImageBg}
        backgroundSize={"cover"}
        borderRadius={"lg"}
        minHeight={"300px"}
      >
        {/* <Card
          bg={backgroundColor}
          display={"flex"}
          flexDirection={"column"}
          gap={4}
          w={{ base: "100%", sm: "75%", md: "50%" }}
          p={6}
          position={"absolute"}
          bottom={0}
          right={0}
        >
          <Heading size={"lg"}>We Are Open For Opportunities!</Heading>
          <Text color={grayColor}>
            "We're your one-stop solution for web app pentesting, Android
            security, API hacking, cloud pentesting, AWS cost optimization, and
            QA needs."
          </Text>
          <Link
            display={"flex"}
            alignItems={"center"}
            gap={2}
            color={tealColor}
          >
            view cases{" "}
            <GoArrowRight
              style={{
                marginTop: "4px",
              }}
            />
          </Link>
        </Card> */}
      </Box>
    </Grid>
  );
};
export default Products;
