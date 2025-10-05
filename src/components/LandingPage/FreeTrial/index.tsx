import { Box, Flex, Heading, useColorModeValue, Text } from "@chakra-ui/react";
import FreeTrialForm from "../../common/FreeTrialForm";
import FreeTrialBg from "../../../assets/free-trial/free-trial-bg.jpeg";

const FreeTrial = () => {
  const backgroundColor = useColorModeValue("#00142C", "#00142C");
  return (
    <Box bgImage={FreeTrialBg} bgAttachment={"fixed"}>
      <Flex
        bg={backgroundColor}
        opacity={0.7}
        flexDirection={"column"}
        py={20}
        gap={6}
        alignItems={"center"}
      >
        <Heading size={"lg"} textAlign={"center"}>
          Still confused about our pentesting service? Allow us to secure your
          assets.
        </Heading>
        <Text
          w={{ base: "100%", md: "50%" }}
          textAlign={"center"}
          p={{ base: 4, sm: 6, md: 0 }}
        >
          Still unsure about our pentesting service? Let us help you secure your
          assets. Our expert team will identify vulnerabilities and provide
          robust protection for your digital environment, ensuring peace of mind
          and compliance with industry standards.
        </Text>
        <FreeTrialForm label="Get Free Trail Pentesting Service" />
      </Flex>
    </Box>
  );
};
export default FreeTrial;
