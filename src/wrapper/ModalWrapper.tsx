import  { ReactNode, useEffect } from "react";
import { Rating } from "react-simple-star-rating";
import {
  Box,
  Flex,
  Heading,
  Text,
  Link,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Card,
} from "@chakra-ui/react";
import { PRIMARYCOLOR } from "../utils/color";

const ModalWrapper = ({ children }: { children: ReactNode }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const backgroundColor = useColorModeValue("#011936", "#011936");

  const reviews = [
    {
      id: 1,
      name: "hockey",
      rating: 5,
    },
    {
      id: 2,
      name: "hockey",
      rating: 5,
    },
    {
      id: 3,
      name: "hockey",
      rating: 5,
    },
    {
      id: 4,
      name: "hockey",
      rating: 5,
    },
    {
      id: 5,
      name: "hockey",
      rating: 5,
    },
  ];

  useEffect(() => {
    // onOpen();
  }, []);
  return (
    <>
      {children}
      <Box bg={useColorModeValue("gray.100", "gray.700")}>
        <Modal isOpen={isOpen} onClose={onClose} size={"4xl"}>
          <ModalOverlay />
          <ModalContent bg={backgroundColor}>
            <ModalHeader>
              <ModalCloseButton />
            </ModalHeader>
            <ModalBody position={"relative"}>
              <Flex direction="column" align="start" px={8} rowGap={8}>
                <Heading
                  fontSize={{ base: "4xl", md: "5xl" }}
                  fontWeight="bold"
                >
                  Not happy with your eComm
                  <br /> store's conversion rate?
                </Heading>
                <Link
                  mt="8"
                  colorScheme="orange"
                  size="lg"
                  onClick={onOpen}
                  bg={PRIMARYCOLOR}
                  px={8}
                  py={4}
                  fontWeight={"800"}
                  fontSize={"2xl"}
                  rounded={"lg"}
                  style={{
                    textDecoration:"none"
                  }}
                  href={"/scan"}
                >
                  Scan Your Website (It's Free)
                </Link>
                <Text mt="4" textAlign="left" color="gray.600">
                  Includes: UX audit of your Homepage, Category, Product and
                  Cart Page
                </Text>

                <Box width={"full"}>
                  <Flex width={"full"} justify={"space-between"} columnGap={2}>
                    {reviews?.map((review) => (
                      <Card key={review?.id} width={"full"} p={2}>
                        <Text>{review?.name}</Text>
                        <Rating
                          style={{
                            width: "100%",
                          }}
                          initialValue={4.5}
                          allowFraction={true}
                          readonly={true}
                          size={10}
                          rtl={true}
                        />
                      </Card>
                    ))}
                  </Flex>
                </Box>
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
};

export default ModalWrapper;
