import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import ContentLayout from "../../common/Layout/ContentLayout";
import { colors } from "../../../config/color";
import UrlScanner from "./UrlScanner";

const LandingView = () => {
  return (
    <>
      <ContentLayout>
        <Flex
          justify={"center"}
          align={"center"}
          direction={"column"}
          rowGap={16}
          pt={32}
          top={2}
        >
          <Flex
            justify={"center"}
            align={"center"}
            direction={"column"}
            maxW={"2xl"}
          >
            <Text
              fontSize={{
                xl: "56px",
                base: "36px",
              }}
              fontWeight={"bold"}
              wordBreak={"break-word"}
              textAlign={"center"}
            >
              Professional{" "}
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
                Security
              </span>
              With Reliable Service
            </Text>

            <Text
              textAlign={"center"}
              fontSize={{
                base: "16px",
                lg: "18px",
              }}
              color={useColorModeValue(
                colors.light.landgingView.description,
                colors.dark.landgingView.description
              )}
            >
              Your trusted partner in web, Android, API, and cloud security. We
              provide comprehensive services to safeguard your digital assets,
              ensuring robust protection across all platforms.
            </Text>
          </Flex>
          <UrlScanner />
        </Flex>
      </ContentLayout>
      <Box w={"full"} overflow={"hidden"} mt={0}>
      <Box
        borderRadius={"0 0 50% 50%/0 0 100% 100%"}
        h={60}
        w={"full"}
        bg={useColorModeValue(colors.light.globalBg, colors.dark.globalBg)}
        transform={"scaleX(1.5)"}
      ></Box>
      </Box>
    </>
  );
};
export default LandingView;
