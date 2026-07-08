import React, { useRef } from "react";
import Slider, { Settings } from "react-slick";
import ContentLayout from "../../common/Layout/ContentLayout";
import {
  Avatar,
  Box,
  Button,
  Flex,
  Grid,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { colors } from "../../../config/color";

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Reviews: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: "Sharad",
      company: "Stencii",
      description:
        "Partnering with VulnShields has been a game-changer for Stencii. Their in-depth vulnerability assessments and clear, actionable reports have significantly bolstered our web application security. The intuitive platform and responsive support team make it easy for us to stay ahead of potential threats. VulnShields has proven to be an essential asset in safeguarding our digital assets",
    },
    {
      id: 2,
      name: "Rajesh",
      company: "EHS",
      description:
        "Working with VulnShields has been incredibly valuable for EHS. Their thorough security assessments and user-friendly platform have given us the confidence to focus on growing our startup while they handle our web application security. The detailed insights and prompt support from their team have been instrumental in keeping our applications secure and resilient",
    },
    {
      id: 3,
      name: "Shera",
      company: "CodeNext",
      description:
        "I’ve found VulnShields to be an invaluable partner in our security strategy. Their robust vulnerability assessments and straightforward, actionable reports have greatly enhanced our web application security. The platform’s ease of use and the team’s exceptional support have allowed us to stay focused on innovation while ensuring our applications are well-protected."
    },
  ];
  const sliderRef = useRef<Slider | null>(null);

  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    responsive: [
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1040,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
  };

  return (
    <ContentLayout>
      <Text
        textAlign={"center"}
        fontWeight={700}
        fontSize={{ base: "34px", sm: "38px", md: "45px", lg: "48px" }}
        my={10}
      >
        Success stories
      </Text>
      <Slider ref={sliderRef} {...settings}>
        {reviews?.map((review) => (
          <Grid
            w={"full"}
            p={{
              base: "28px",
              sm:"48px"
            }}
            gap={4}
            bg={useColorModeValue(
              colors?.light?.reviews?.cardBackground,
              colors?.dark?.reviews?.cardBackground
            )}
            color={useColorModeValue(
              colors?.light?.globalColor,
              colors?.dark?.globalColor
            )}
            rounded={"20px"}
            templateColumns={"repeat(2,1fr)"}
            key={review?.id}
          >
            <Text mb={4} wordBreak={"break-all"}>
             {review?.description}
            </Text>
            <Flex columnGap={4}>
              <Avatar name="" src="" bg={"gray.300"} />
              <Box>
                <Text>{review?.name}</Text>
                <Text>{review?.company}</Text>
              </Box>
            </Flex>
          </Grid>
        ))}
      </Slider>
      <Flex justifyContent={"flex-end"} px={4} py={2} columnGap={2}>
        <Button
          onClick={previous}
          p={0.5}
          bgImage={useColorModeValue(
            colors?.light?.bgImage,
            colors?.dark.bgImage
          )}
        >
          <Flex
            justify={"center"}
            align={"center"}
            w={"full"}
            h={"full"}
            bg={useColorModeValue(
              colors?.light?.reviews?.cardBackground,
              colors?.dark?.reviews?.cardBackground
            )}
            rounded={"md"}
          >
            <MdKeyboardArrowLeft
              fontSize={"20px"}
              style={{
                color: useColorModeValue(
                  colors.light.landgingView.animatedText,
                  colors.dark.landgingView.animatedText
                ),
              }}
            />
          </Flex>
        </Button>
        <Button
          onClick={next}
          p={0.5}
          bgImage={useColorModeValue(
            colors?.light?.bgImage,
            colors?.dark.bgImage
          )}
        >
          <Flex
            justify={"center"}
            align={"center"}
            w={"full"}
            h={"full"}
            bg={useColorModeValue(
              colors?.light?.reviews?.cardBackground,
              colors?.dark?.reviews?.cardBackground
            )}
            rounded={"md"}
          >
            <MdKeyboardArrowRight
              fontSize={"20px"}
              style={{
                color: useColorModeValue(
                  colors.light.landgingView.animatedText,
                  colors.dark.landgingView.animatedText
                ),
              }}
            />
          </Flex>
        </Button>
      </Flex>
    </ContentLayout>
  );
};

export default Reviews;
