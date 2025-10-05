
import {
  Flex,
  Heading,
  useColorModeValue,
  Text,

} from "@chakra-ui/react";
import { PRIMARYDESCRIPTIONCOLOR } from "../../../utils/color";
import ContentLayout from "../../common/Layout/ContentLayout";
import SubscribeNewsForm from "../../common/SubscribeNewsForm";

const NewsLetter = () => {

  const backgroundColor = useColorModeValue("#011936", "#011936");
  const grayTextcolor = useColorModeValue(
    PRIMARYDESCRIPTIONCOLOR,
    PRIMARYDESCRIPTIONCOLOR
  );



  return (
    <ContentLayout>
      <Flex
        bg={backgroundColor}
        w={"full"}
        py={20}
        flexDirection={"column"}
        gap={6}
        alignItems={"center"}
        my={4}
      >
        <Heading size={"lg"}>Subscribe Our Newsletter</Heading>
        <Text
          w={{ base: "90%", md: "60%" }}
          textAlign={"center"}
          color={grayTextcolor}
        >
          Stay informed and protected! Subscribe to our newsletter for the
          latest updates and insights on vulnerability services, empowering you
          to safeguard your digital assets.
        </Text>
        <SubscribeNewsForm />
      </Flex>
    </ContentLayout>
  );
};

export default NewsLetter;
