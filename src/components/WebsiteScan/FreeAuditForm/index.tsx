import React from "react";
import {
  Box,
  Flex,
  Heading,
  Text,
  FormControl,
  Grid,
  Input,
  Select,
  Image,
  VStack,
  UnorderedList,
  ListItem,
  useColorModeValue,
  Card,
} from "@chakra-ui/react";
import { PRIMARYCOLOR } from "../../../utils/color";
import MyButton from "../../common/MyButton";

const FreeAuditForm: React.FC = () => {
  const auditReports = [
    {
      id: 1,
      type: "Homepage Layout",
      details: "what can be better how",
    },
    {
      id: 2,
      type: "Homepage Layout",
      details: "what can be better how",
    },
    {
      id: 3,
      type: "Homepage Layout",
      details: "what can be better how",
    },
    {
      id: 4,
      type: "Homepage Layout",
      details: "what can be better how",
    },
    {
      id: 5,
      type: "Homepage Layout",
      details: "what can be better how",
    },
    {
      id: 6,
      type: "Homepage Layout",
      details: "what can be better how",
    },
  ];

  const clientsReview = [
    {
      url: "https://cdn.convertcart.com/uploads/4f80eadc.jpg",
      name: "Kingdown",
    },
    {
      url: "https://cdn.convertcart.com/uploads/ea5758fe.jpg",
      name: "Stuhrling",
    },
    {
      url: "https://cdn.convertcart.com/uploads/4f3f1c94.jpg",
      name: "Everlast",
    },
    {
      url: "https://cdn.convertcart.com/uploads/719aa99c.jpg",
      name: "Legrand",
    },
    {
      url: "https://cdn.convertcart.com/uploads/c1b8ea87.jpg",
      name: "USA hockey",
    },
    {
      url: "https://cdn.convertcart.com/uploads/f0e2b7fc.jpg",
      name: "American heart association",
    },
    {
      url: "https://cdn.convertcart.com/uploads/2b40c024.jpg",
      name: "Acme tools",
    },
    {
      url: "https://cdn.convertcart.com/uploads/f4fd81a5.jpg",
      name: "Squaaty potty",
    },
  ];
  const backgroundColor = useColorModeValue("#011936", "#011936");

  return (
    <>
      <Heading
        size={"md"}
        color={useColorModeValue(PRIMARYCOLOR, PRIMARYCOLOR)}
        textAlign={"center"}
        my={4}
      >
        Audit Reports
      </Heading>

      <Grid
        templateColumns={{
          base: "1fr",
          md: "6fr 4fr",
        }}
        columnGap={8}
      >
        <Flex flexDir="column" rowGap={4}>
          <Heading as="h5" size="lg" mb={4}>
            THE{" "}
            <span style={{ backgroundColor: PRIMARYCOLOR, padding: "8px" }}>
              AUDIT REPORT
            </span>{" "}
            WILL CONTAIN:
          </Heading>
          <UnorderedList>
            {auditReports?.map((eR) => (
              <ListItem
                display={"flex"}
                alignItems={"center"}
                columnGap={2}
                key={eR?.id}
                fontSize={"lg"}
                lineHeight={10}
              >
                <Text fontWeight={800} color={PRIMARYCOLOR}>
                  {eR?.type} -{" "}
                </Text>
                <Text>{eR?.details}</Text>
              </ListItem>
            ))}
          </UnorderedList>

          <Box bg="#67696e" boxShadow="lg" rounded="full" p={2}>
            <Flex align="center">
              <Image
                src="https://cdn.convertcart.com/uploads/7bea4640.png"
                alt="Logan Christopher (CEO), Lost Empire Herbs"
                boxSize="100px"
                mr={4}
              />
              <Box>
                <Text fontStyle="italic" color="white">
                  “The report was deep and super insightful. Can’t believe it’s
                  free.”
                </Text>
                <Text fontWeight="bold" color="white">
                  Logan Christopher (CEO), Lost Empire Herbs
                </Text>
              </Box>
            </Flex>
          </Box>

          <Flex w={"full"} flexWrap={"wrap"} gap={4}>
            {clientsReview?.map((eR, index) => (
              <Image src={eR?.url} alt={eR?.name} key={index} w={"80px"} />
            ))}
          </Flex>
        </Flex>
        <Card
          bg={backgroundColor}
          p={4}
          display={"flex"}
          flexDirection={"column"}
          rowGap={4}
        >
          <Text color={PRIMARYCOLOR} fontSize="xl" fontWeight="semibold">
            Just need some more details
          </Text>
          <Text color="gray.400" mb={4}>
            We’ll analyse your Homepage, Category, Product, and Cart page—and
            share what could be causing friction for buyers.
          </Text>
          <form id="custom_form">
            <VStack spacing={4}>
              <FormControl id="companyUrl" isRequired>
                <Input placeholder="https://www.vulnshields.com" size={"lg"} />
              </FormControl>
              <FormControl id="fullName" isRequired>
                <Input placeholder="Full name" size={"lg"} />
              </FormControl>
              <FormControl id="email" isRequired>
                <Input type="email" placeholder="Your work email" size={"lg"} />
              </FormControl>
              <FormControl id="contactNumber" isRequired>
                <Input
                  type="number"
                  placeholder="Your phone number"
                  size={"lg"}
                />
              </FormControl>
              <FormControl id="inputState" isRequired>
                <Select placeholder="Your monthly traffic (Users)" size={"lg"}>
                  <option value="Below 5,000">Below 5,000</option>
                  <option value="5,000 to 15,000">5,000 to 15,000</option>
                  <option value="15,000 - 30,000">15,000 - 30,000</option>
                  <option value="30,000 - 50,000">30,000 - 50,000</option>
                  <option value="50,000 - 100,000">50,000 - 100,000</option>
                  <option value="100,000 - 500,000">100,000 - 500,000</option>
                  <option value="500,000 - 1 Million">
                    500,000 - 1 Million
                  </option>
                  <option value="1 Million - 5 Million">
                    1 Million - 5 Million
                  </option>
                  <option value="More than 5 Million">
                    More than 5 Million
                  </option>
                </Select>
              </FormControl>
              <Text color="gray.500" fontSize="sm">
                We are committed to ensuring that your privacy is protected.
              </Text>
              <MyButton
                label="GET MY REPORT"
                onClick={() => {}}
                style={{ width: "100%" }}
              />
            </VStack>
          </form>
          <Flex pt={4} justifyContent={"center"}>
            <Image
              src="https://cdn.convertcart.com/uploads/1765eb20.svg"
              alt="Convertcart Review"
            />
          </Flex>
        </Card>
      </Grid>
    </>
  );
};

export default FreeAuditForm;
