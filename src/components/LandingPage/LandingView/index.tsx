import { Box, Flex, Heading, Image } from "@chakra-ui/react";
import { TypeAnimation } from "react-type-animation";
import ContentLayout from "../../common/Layout/ContentLayout";

import RightSideImage from "../../../assets/landing/side-image.png"
import FreeTrialForm from "../../common/FreeTrialForm";

const LandingView = () => {
  return (
    <ContentLayout >
      <Flex
        justifyContent={"space-between"}
        alignItems={"center"}
        paddingY={20}
        flexDirection={{ base: "column-reverse", md: "row" }}
        gap={10}
        id="home"
      >
        <Box>
          <Flex gap={4} wordBreak={"break-all"}>
            <Heading size={{ base: "md", md: "lg", lg: "xl", xl: "2xl" }}> Profession</Heading>
            <Heading size={{ base: "md", md: "lg", lg: "xl", xl: "2xl" }} color={"#0EC9AC"}>
              <TypeAnimation
                sequence={["Company", 2000, "Security", 2000, "Protection", 2000]}
                wrapper="span"
                speed={10}
                style={{ display: "inline-block" }}
                repeat={Infinity}
              />
            </Heading>
          </Flex>

          <Heading size={{ base: "md", md: "lg", lg: "xl", xl: "2xl" }} lineHeight={1.5}>
            With Reliable Service
          </Heading>
          <p style={{ color: "#828FA0" }}>
          Your trusted partner in web, Android, API, and cloud security. We provide comprehensive services to safeguard your digital assets, ensuring robust protection across all platforms.{" "}
          </p>
          <Flex mt={4}>
          <FreeTrialForm label="Contact us" isIcon={false} />
          </Flex>
        </Box>
        <Flex justifyContent={"center"} alignItems={"center"}>
          <Image
            src={RightSideImage}
            alt="security"
            width={{ base: "60%", sm: "80%", md: "100%" }}
          />
        </Flex>
      </Flex>
    </ContentLayout>
  );
};
export default LandingView;
