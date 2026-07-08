import {
  Flex,
  Heading,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { PRIMARYCOLOR } from "../../../utils/color";

const FreeAuditAnalysis = () => {
  const reports = [
    "Accessibility Analysis.",
    "Qualitative Analysis.",
    "Trust Analysis.",
    "UX Analysis.",
  ];
  const optimizations = [
    "More customers / sales / revenue – without extra traffic or advertising.",
    `Winning edge – it’s the old saying, ‘the winner takes all’.
                  Better conversion rates can have a broad impact on your
                  marketing results, across different channels and campaigns.`,
    ` Increased profits – Even small conversion increases add
                  profit.`,
    `Expensive media becomes affordable – Dominate where your
                  competitors simply can’t afford to be.`,
    `First mover advantage – If you don’t, your competitors will.`,
  ];
  return (
    <>

      <Grid
        templateColumns={{
          base: "1fr",
          md: "4fr 6fr",
        }}
        columnGap={8}
      >
        <GridItem>
          <Heading as="h4" mb={{ base: 2, md: 3, lg: 5 }}>
            WHAT WILL MY REPORT COVER?
          </Heading>
          {reports?.map((eR, index) => (
            <Text
              mb={2}
              key={index}
              color={PRIMARYCOLOR}
              fontSize={"3xl"}
              textTransform={"uppercase"}
            >
              {eR}
            </Text>
          ))}
        </GridItem>
        <GridItem >
          <Heading as="h4" mb={{ base: 2, md: 10,  }}>
            5 REASONS WHY CONVERSION OPTIMIZATION IS IMPORTANT
          </Heading>
          {optimizations?.map((eO,index)=><Flex key={index} alignItems={"start"} columnGap={2} my={6}>
           <Flex justifyContent={"flex-start"} alignItems={"start"}  flexBasis={"column"}>
           <Text bg={PRIMARYCOLOR} px={3} py={1} rounded={"full"} >{index+1}</Text>
           </Flex>
            <Text fontSize={"xl"}>{eO}</Text>
          </Flex>)}
        </GridItem>
      </Grid>
    </>
  );
};

export default FreeAuditAnalysis;
