import {
  Text,
  Grid,
  useColorModeValue,
  Flex,
  Button,
  Image,
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";

import { FaCheck } from "react-icons/fa";

import ContentLayout from "../../common/Layout/ContentLayout";
import { useState } from "react";
import { colors } from "../../../config/color";
import CheckIcon from "../../../assets/services/check-icon.svg";
import { ServiceData } from "../../../config/service.config";

const Services = () => {
  const [activeServiceOption, setActiveServiceOption] = useState(1);
  const [activeService, setActiveService] = useState(1);

  return (
    <ContentLayout>
      <Text
        fontSize={{ base: "36px", md: "48px" }}
        fontWeight={{ base: 700, lg: 600 }}
        textAlign={"center"}
        mb={10}
      >
        Our Services
      </Text>
      <Flex
        align={"center"}
        gap={2}
        columnGap={2}
        justify={"center"}
        mb={10}
        flexWrap={"wrap"}
        display={{ base: "none", md: "flex" }}
      >
        {ServiceData?.map((data) => (
          <Flex
            key={data?.id}
            bgImage={useColorModeValue(
              colors?.light?.bgImage,
              colors.dark.bgImage
            )}
            rounded={"full"}
            p={"1px"}
          >
            <Button
              bg={
                activeService !== data?.id
                  ? useColorModeValue(
                      colors?.light.services?.serviceBg,
                      colors?.dark.services?.serviceBg
                    )
                  : ""
              }
              rounded={"full"}
              onClick={() => setActiveService(data?.id)}
            >
              {data?.label}
            </Button>
          </Flex>
        ))}
      </Flex>
      <Grid
        mx={{ base: 0, lg: 12 }}
        bgImage={useColorModeValue(
          colors?.light?.services?.bgImage,
          colors?.dark?.services?.bgImage
        )}
        display={{ base: "none", md: "grid" }}
        p={4}
        rounded={"lg"}
        templateColumns={{ base: "1fr", lg: "repeat(2, 1fr)" }}
        columnGap={8}
      >
        <Flex flexDir={"column"} rowGap={4}>
          {ServiceData[activeService - 1]?.options?.map((eO) => (
            <Button
              key={eO?.id}
              display={"flex"}
              justifyContent={"start"}
              alignItems={"center"}
              size={"lg"}
              px={4}
              columnGap={4}
              bg={
                eO?.id === activeServiceOption
                  ? useColorModeValue(
                      colors?.light?.services?.activeOptionBg,
                      colors?.dark?.services?.activeOptionBg
                    )
                  : useColorModeValue(
                      colors?.light?.services?.nonActiveOptionBg,
                      colors?.dark?.services?.nonActiveOptionBg
                    )
              }
              border={
                eO?.id === activeServiceOption
                  ? `1px solid ${useColorModeValue(
                      colors?.light?.services?.activeOptionColor,
                      colors?.dark?.services?.activeOptionColor
                    )}`
                  : ""
              }
              onClick={() => setActiveServiceOption(eO?.id)}
            >
              <Image src={CheckIcon} alt="Checkbox" />
              <Text fontSize={"16px"} noOfLines={1}>
                {eO?.label}
              </Text>
            </Button>
          ))}
        </Flex>
        <Flex flexDir={"column"} rowGap={4}>
          {ServiceData[activeService - 1]?.options[
            activeServiceOption - 1
          ]?.options?.map((e) => (
            <Grid
              templateColumns={"1fr 11fr"}
              alignItems={"start"}
              key={e?.id}
              columnGap={2}
            >
              <Box
                p={2}
                bg={useColorModeValue(
                  colors?.light?.services?.nonActiveOptionBg,
                  colors?.dark?.services?.nonActiveOptionBg
                )}
                rounded={"xl"}
                w={8}
              >
                <FaCheck />
              </Box>
              <Text
                fontWeight={"medium"}
                fontSize={"16px"}
                lineHeight={"28px"}
                textTransform={"capitalize"}
              >
                {e?.label}
              </Text>
            </Grid>
          ))}
        </Flex>
      </Grid>
      <Box
        bgImage={"linear-gradient(147.14deg, #73DFE7 6.95%, #0063F7 93.05%)"}
        p={"1px"}
        rounded={"xl"}
        display={{ base: "block", md: "none" }}
      >
        <Box bg={"#14141B"} rounded={"xl"} h={"full"} p={4}>
          <Flex
            align={"center"}
            w={"full"}
            columnGap={2}
            justify={"start"}
            mb={10}
            overflow={"auto"}
            sx={{
              scrollbarWidth: 'none', // For Firefox
              '&::-webkit-scrollbar': {
                display: 'none', // For Chrome, Safari, and Opera
              },
            }}
          >
            {ServiceData?.map((data) => (
              <Flex
                key={data?.id}
                bgImage={useColorModeValue(
                  colors?.light?.bgImage,
                  colors.dark.bgImage
                )}
                rounded={"full"}
                p={"1px"}
              >
                <Button
                  bg={
                    activeService !== data?.id
                      ? useColorModeValue(
                          colors?.light.services?.serviceBg,
                          colors?.dark.services?.serviceBg
                        )
                      : ""
                  }
                  rounded={"full"}
                  onClick={() => setActiveService(data?.id)}
                >
                  {data?.label}
                </Button>
              </Flex>
            ))}
          </Flex>
          <Accordion defaultIndex={[0]} allowMultiple>
            {ServiceData[activeService - 1]?.options?.map((eO, i) => (
              <AccordionItem
                my={4}
                border={"none"}
                rounded={"lg"}
                key={eO?.id}
                bg={useColorModeValue(
                  colors?.light?.services?.nonActiveOptionBg,
                  colors?.dark?.services?.nonActiveOptionBg
                )}
              >
                <h2>
                  <AccordionButton>
                    <Box
                      as="span"
                      flex="1"
                      textAlign="left"
                      alignItems={"center"}
                      display={"flex"}
                      columnGap={2}
                    >
                      <Image src={CheckIcon} alt="Checkbox" />
                      {eO?.label}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <Flex flexDir={"column"} rowGap={4}>
                    {ServiceData[activeService - 1]?.options[i]?.options?.map(
                      (e) => (
                        <Grid
                          templateColumns={"1fr 11fr"}
                          alignItems={"start"}
                          key={e?.id}
                          columnGap={2}
                        >
                          <Box
                            p={2}
                            bg={useColorModeValue(
                              colors?.light?.services?.nonActiveOptionBg,
                              colors?.dark?.services?.nonActiveOptionBg
                            )}
                            rounded={"xl"}
                            w={8}
                          >
                            <FaCheck />
                          </Box>
                          <Text
                            fontWeight={"medium"}
                            fontSize={"16px"}
                            lineHeight={"28px"}
                          >
                            {e?.label}
                          </Text>
                        </Grid>
                      )
                    )}
                  </Flex>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
        </Box>
      </Box>
    </ContentLayout>
  );
};

export default Services;
