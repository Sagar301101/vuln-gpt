import {
  Box,
  Card,
  Divider,
  Flex,
  Text,
  Grid,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import ContentLayout from "../../common/Layout/ContentLayout";
import { BsCheck } from "react-icons/bs";
import { ContacUs } from "../../common/MyButton";
import Gold from "../../../assets/pricing/gold.png";
import Premium from "../../../assets/pricing/premium.png";
import Silver from "../../../assets/pricing/silver.png";
import { colors } from "../../../config/color";
import { FaRupeeSign } from "react-icons/fa";
import TabSliderComponent from "./TabSlider";

const Pricing: React.FC = () => {
  const pricing = [
    {
      id: 1,
      title: "Silver Package",
      features: [
        {
          label:
            "Annual Vulnerability Assessment and Penetration Testing (VAPT) Conducted by Security Experts",
          available: true,
        },
        {
          label: "Standardized Testing Coverage",
          available: true,
        },
        {
          label: "Basic Business-Logic Testing",
          available: false,
        },
        {
          label: "Penetration Test Certificate",
          available: false,
        },
        {
          label: "Support and Guidance",
          available: false,
        },
      ],
      monthlyPrice: "30k",
      yearlyPrice: "3L",
      icon: Silver,
    },
    {
      id: 2,
      title: "Golden Package",
      features: [
        {
          label:
            "Quarterly Vulnerability Assessment and Penetration Testing (VAPT)",
          available: true,
        },
        {
          label: "Advanced Testing Coverage",
          available: true,
        },
        {
          label: "In-Depth Business-Logic Testing",
          available: true,
        },
        {
          label: "Real-Time Security Alerts",
          available: false,
        },
        {
          label: "Dedicated Expert Support",
          available: false,
        },
      ],
      monthlyPrice: "50k",
      yearlyPrice: "5L",
      icon: Gold,
    },
    {
      id: 3,
      title: "Premium Package",
      features: [
        {
          label:
            "Continuous Vulnerability Assessment and Penetration Testing (VAPT)",
          available: true,
        },
        {
          label: "Extensive Business-Logic and Code Review",
          available: true,
        },
        {
          label: "24/7 Real-Time Security Alerts and Monitoring",
          available: true,
        },
        {
          label: "Dedicated Elite Support Team",
          available: true,
        },
        {
          label: "Executive Reporting and Compliance Support",
          available: true,
        },
      ],
      monthlyPrice: "1L",
      yearlyPrice: "10.0L",
      icon: Premium,
    },
  ];

  const [currentActiveTab, setCurrentActiveTab] = useState(0);

  return (
    <ContentLayout>
      <Grid
        w={"full"}
        mt={"60px"}
        gridTemplateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        alignItems={"center"}
        px={{
          base: 4,
          sm: 6,
          lg: 12,
          "2xl": 24,
        }}
        justifyContent={"center"}
      >
        <Box visibility={"hidden"}></Box>
        <Text
          fontSize={{
            base: "28px",
            md: "36px",
            lg: "48px",
          }}
          fontWeight={{
            base: 700,
            lg: 600,
          }}
          textAlign={"center"}
        >
          Pricing
        </Text>
        <TabSliderComponent
          tabs={[{ label: "Monthly" }, { label: "Yearly" }]}
          currentActiveTab={currentActiveTab}
          onTabChange={(value: number) => setCurrentActiveTab(value)}
        />
      </Grid>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          xl: "repeat(3, 1fr)",
        }}
        py={16}
        px={{
          base: 0,
          sm: 8,
          lg: 12,
          "2xl": 24,
        }}
        gap={{
          base: 10,
          sm: 12,
          lg: 8,
        }}
        justifyContent={"center"}
        alignItems={"center"}
      >
        {pricing?.map((packages) => (
          <Card
            w={"full"}
            h={"full"}
            key={packages?.id}
            p={{
              base: 4,
              sm: 6,
              lg: 8,
            }}
            pt={16}
            bg={useColorModeValue(
              colors?.light?.pricing?.cardBg,
              colors?.dark?.pricing?.cardBg
            )}
            display={"grid"}
            flexDirection={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            rowGap={8}
            position={"relative"}
            boxShadow={"lg"}
            rounded={"3xl"}
          >
            <Flex
              position={"absolute"}
              top={-9}
              w={"full"}
              justifyContent={"center"}
            >
              <Flex
                width={"60px"}
                height={"60px"}
                bg={useColorModeValue(
                  colors?.light?.pricing?.logoBg,
                  colors?.dark?.pricing?.logoBg
                )}
                justify={"center"}
                align={"center"}
                borderRadius={"full"}
              >
                <Image src={packages?.icon} height={"30px"} />
              </Flex>
            </Flex>

            <Text fontSize={"18px"} textAlign={"center"}>
              {packages?.title}
            </Text>
            <Divider />
            <Flex direction={"column"} w={"full"} rowGap={4}>
              {packages?.features?.map((feat, index) => (
                <Flex key={index} align={"start"} columnGap={4}>
                  <Box
                    p={2}
                    bg={useColorModeValue(
                      colors?.light?.pricing?.checkBoxBg,
                      colors?.dark?.pricing?.checkBoxBg
                    )}
                    rounded={"lg"}
                  >
                    <BsCheck
                      color={
                        feat?.available
                          ? useColorModeValue(
                              colors?.light?.globalColor,
                              colors?.dark?.globalColor
                            )
                          : useColorModeValue(
                              colors?.light?.pricing?.featureNAColor,
                              colors?.dark?.pricing?.featureNAColor
                            )
                      }
                    />
                  </Box>
                  <Text
                    color={
                      feat?.available
                        ? useColorModeValue(
                            colors?.light?.globalColor,
                            colors?.dark?.globalColor
                          )
                        : useColorModeValue(
                            colors?.light?.pricing?.featureNAColor,
                            colors?.dark?.pricing?.featureNAColor
                          )
                    }
                  >
                    {feat?.label}
                  </Text>
                </Flex>
              ))}
            </Flex>
            <Divider />
            <Flex
              w={"full"}
              justify={"space-between"}
              align={"center"}
              alignSelf={"baseline"}
            >
              <Flex align={"center"}>
                <FaRupeeSign fontSize={"32px"} fontWeight={600} />
                <Text fontSize={"32px"} fontWeight={600}>
                  {currentActiveTab === 0
                    ? packages?.monthlyPrice
                    : packages?.yearlyPrice}
                </Text>
                <span
                  style={{
                    marginTop: "10px",
                  }}
                >
                  {currentActiveTab === 0 ? "/mo" : "/yr"}
                </span>
              </Flex>
              <ContacUs label="contact us" />
            </Flex>
          </Card>
        ))}
      </Grid>
    </ContentLayout>
  );
};

export default Pricing;
