import {
  Box,
  Grid,
  Heading,
  useColorModeValue,
  Text,
  Flex,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import { MdCheckCircle } from "react-icons/md";
import { PRIMARYCOLOR, PRIMARYDESCRIPTIONCOLOR } from "../../../utils/color";
import AboutImageBg from "../../../assets/about/about.jpeg";

const About = () => {
  const tealColor = useColorModeValue(PRIMARYCOLOR, PRIMARYCOLOR);
  const grayColor = useColorModeValue(
    PRIMARYDESCRIPTIONCOLOR,
    PRIMARYDESCRIPTIONCOLOR
  );
  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
      }}
      pr={{ base: 0, md: 10 }}
      id="about"
    >
      <Box
        bgImage={AboutImageBg}
        backgroundSize={"cover"}
        borderRadius={"lg"}
        minHeight={"300px"}
      ></Box>
      <Flex
        p={{ base: 4, sm: 6, md: 10 }}
        flexDirection={"column"}
        alignItems={"start"}
        gap={6}
      >
        <Text color={tealColor}>Why Choose Us</Text>
        <Heading size={"lg"}>Provide Advanced Security for Web/Andriod/API/Cloud Pentesting with AI Powered product</Heading>
        <Text color={grayColor}>
          Protect your digital assets with our expert pentesting services.
          Identify vulnerabilities, ensure compliance, and guard against
          sophisticated threats across web, Android, API, and cloud
          environments.
        </Text>
        <List spacing={3}>
          <ListItem>
            <ListIcon as={MdCheckCircle} color={PRIMARYCOLOR} />
            <span
              style={{
                color: grayColor,
              }}
            >
              web application pentesting
            </span>
          </ListItem>
          <ListItem>
            <ListIcon as={MdCheckCircle} color={PRIMARYCOLOR} />
            <span
              style={{
                color: grayColor,
              }}
            >
              Andriod/IOS Pentesting
            </span>
          </ListItem>
          <ListItem>
            <ListIcon as={MdCheckCircle} color={PRIMARYCOLOR} />
            <span
              style={{
                color: grayColor,
              }}
            >
              Cloud Security
            </span>
          </ListItem>
          <ListItem>
            <ListIcon as={MdCheckCircle} color={PRIMARYCOLOR} />
            <span
              style={{
                color: grayColor,
              }}
            >
              24/7 Support And Remote Admit
            </span>
          </ListItem>
        </List>
        {/* <Button
          size={"lg"}
          bg={useColorModeValue(PRIMARYCOLOR, PRIMARYCOLOR)}
          textTransform={"uppercase"}
          _hover={{ transform: "translateY(-5px)" }}
        >
          read more
        </Button> */}
      </Flex>
    </Grid>
  );
};
export default About;
