import { Box, Flex, Image, useColorModeValue, Text } from "@chakra-ui/react";
import ContentLayout from "../../common/Layout/ContentLayout";
import FreeDemoImage from "../../../assets/free-demo/Demo-map.svg";
import { colors } from "../../../config/color";
import {FreeDemoButton} from "../../common/MyButton";

const FreeDemo = () => {

  return (
    <>
      <Box
        display={{
          base: "none",
          xl: "block",
        }}
      >
        <ContentLayout>
          <FreeDemoComponent />
        </ContentLayout>
      </Box>
      <Box
        display={{
          base: "block",
          xl: "none",
        }}
      >
        <FreeDemoComponent />
      </Box>
    </>
  );
};
export default FreeDemo;

const FreeDemoComponent = () => {
  return (
    <Box px={{
      base: 4,
      sm: 6,
      md: 10,
      lg: 20,
    }} py={{
      base:0,
      xl:8
    }}
    >
      <Flex
        w={"full"}
        bgImage={useColorModeValue(
          colors.light.freeDemo.background,
          colors.dark.freeDemo.background
        )}
        py={8}
        rounded={"40px"}
        position={"relative"}
        justify={"flex-end"}
      >
        <Flex
          position={"absolute"}
          w={"full"}
          maxW={{
            base:"80%",
            md:"60%"
          }}
          h={"full"}
          direction={"column"}
          rowGap={4}
          px={{
            base:0,
            md:8,
            xl:24
          }}
          py={4}
          justify={"center"}
          align={"start"}
          left={0}
          top={0}
        >
          <Text fontWeight={"normal"} lineHeight={{
            base:"21px",
            md:"27px",
            lg:"32px"
          }} fontSize={{
            base:"14px",
            sm:"16px",
            md:"18px",
            lg:"20px"
          }} >
            Want to know more about us?
          </Text>
          <Text fontWeight={"semibold"} lineHeight={{
            base:"36px",
            sm:"44px",
            md:"52px",
            lg:"65px"
          }} fontSize={{
            base:"24px",
            sm:"32px",
            md:"40px",
            lg:"48px",
          }}>
            Fell Free to schedule our free demo
          </Text>
          <Box>
            <FreeDemoButton
              label="schedule a free demo call"
              style={{
                backgroundImage:"black"
              }}
              bgColor="black"
            />
          </Box>
        </Flex>
        <Image src={FreeDemoImage} h={{
          base:60,
          md:"full"
        }}/>
      </Flex>
    </Box>
  );
};
