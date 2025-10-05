import React from "react";
import { Box, Grid, GridItem, Text, useColorModeValue } from "@chakra-ui/react";

import image0 from "../../../assets/newsLetters/icon-groups.svg";
import ContentLayout from "../../common/Layout/ContentLayout";
import SubscribeNewsForm from "../../common/SubscribeNewsForm";

const OrbitDesign: React.FC = () => {
  const bgColor = useColorModeValue("blackAlpha.900", "blackAlpha.900");
  const iconColor = useColorModeValue("whiteAlpha.900", "gray.100");
  return (
    <ContentLayout>
      <Box overflowX="hidden">
        <Grid
          templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
          gap={2}
          py={5}
          bg={bgColor}
          my={5}
          mx={{ base: 2, sm: 4, md: 8 }}
          textAlign={{ base: "center", lg: "left" }}
        >
          {/* Orbit Image Section */}
          <GridItem display="flex" justifyContent="center" alignItems="center">
            <Box
              position="relative"
              // w="300px"
              // h="300px"
              mb={{ base: 20, lg: 0 }}
            >
              <img src={image0} alt="" />
            </Box>
          </GridItem>

          {/* Text and Button Section */}
          <GridItem
            ml={{ base: 0, lg: 10 }}
            overflow="hidden"
            mt={{ base: 0, lg: 40 }}
          >
            <Text
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="bold"
              color={iconColor}
            >
              We're here to guide and help you at all times
            </Text>
            <Text
              fontSize={{ base: "md", lg: "lg" }}
              color="#9E9E9E"
              mt={4}
              mb={8}
            >
              UI/UX + Development + Deployment + QA + Security <br /> = The
              Complete Package
            </Text>
            <Box pb={{ base: 20, lg: 0 }}>
              {" "}
              {/* Add more padding at the bottom */}
              <SubscribeNewsForm />
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </ContentLayout>
  );
};

export default OrbitDesign;
