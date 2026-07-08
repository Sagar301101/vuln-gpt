import {
  Box,
  Container,
  Heading,
  Flex,
  Image,
  Text,
  Grid,
  GridItem,
} from "@chakra-ui/react";

const Testimonials = () => {
  return (
    <>
      <Box bg="#161616" py={12} fontFamily="Overpass">
        <Container maxW="container.xl">
          <Heading as="h3" textAlign="center" color="white" mb={8}>
            CUSTOMER TESTIMONIALS
          </Heading>
          <Grid
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            gap={8}
            justifyContent="center"
          >
            <GridItem>
              <Flex direction="column" align="center" h="100%">
                <Image
                  src="https://cdn.convertcart.com/uploads/60623acb.png"
                  alt="GetFPV"
                  boxSize="150px"
                  mb={4}
                />
                <Heading as="h4" size="md" color="white" mb={4}>
                  GetFPV
                </Heading>
                <Text color="white" mb={4} textAlign="center">
                  "Their A/B testing, reporting and user interface are all
                  excellent and allow us to have high confidence in their
                  business impact."
                </Text>
                <Box mt="auto" textAlign="center">
                  <Text color="white" mb={0}>
                    Jeff Bloch
                  </Text>
                  <Text color="white">(SVP Sales and Marketing)</Text>
                </Box>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex direction="column" align="center" h="100%">
                <Image
                  src="https://cdn.convertcart.com/uploads/4a49b368.png"
                  alt="AbsorbYourHealth"
                  boxSize="150px"
                  mb={4}
                />
                <Heading as="h4" size="md" color="white" mb={4}>
                  AbsorbYourHealth
                </Heading>
                <Text color="white" mb={4} textAlign="center">
                  "They've improved my conversion rate by upwards of 60% in a
                  few months, resulting in tens of thousands of extra dollars a
                  month of revenue for us."
                </Text>
                <Box mt="auto" textAlign="center">
                  <Text color="white" mb={0}>
                    Joshua Fulton
                  </Text>
                  <Text color="white">(Owner and CEO)</Text>
                </Box>
              </Flex>
            </GridItem>
            <GridItem>
              <Flex direction="column" align="center" h="100%">
                <Image
                  src="https://cdn.convertcart.com/uploads/c83c76b1.png"
                  alt="Theinsolestore"
                  boxSize="150px"
                  mb={4}
                />
                <Heading as="h4" size="md" color="white" mb={4}>
                  Theinsolestore
                </Heading>
                <Text color="white" mb={4} textAlign="center">
                  "The team at Convertcart consistently provides thoughtful,
                  relevant insights into site performance and user behavior."
                </Text>
                <Box mt="auto" textAlign="center">
                  <Text color="white" mb={0}>
                    Austin Reid R
                  </Text>
                  <Text color="white">(eCommerce Director)</Text>
                </Box>
              </Flex>
            </GridItem>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default Testimonials;
