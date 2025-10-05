import { Card, CardBody, CardHeader, Text, Grid, Heading, useColorModeValue, Flex } from "@chakra-ui/react";
import { TfiServer } from "react-icons/tfi";
import { FiMail,FiCheckCircle } from "react-icons/fi";
import { AiOutlineAndroid } from "react-icons/ai";
import { LuCircleDollarSign } from "react-icons/lu";
import { IoGlobeSharp } from "react-icons/io5";





import { PRIMARYDESCRIPTIONCOLOR, PRIMARYCOLOR, PRIMARYHEADLINECOLOR } from "../../../utils/color";
import ContentLayout from "../../common/Layout/ContentLayout";

const ServiceData = [
  {
    id: 1,
    label: "Web Application Pentesting",
    icon: <IoGlobeSharp style={{ fontSize: "50px", color: "#0EC9AC" }} />,
    details: "Web Application Pentesting identifies and fixes vulnerabilities, ensuring compliance, security, and customer trust with expert testing and detailed reporting.",
  },
  {
    id: 2,
    label: "Andriod Application Pentesting",
    icon: <AiOutlineAndroid style={{ fontSize: "50px", color: "#0EC9AC" }} />,
    details: "Android Application Pentesting identifies and fixes vulnerabilities, ensuring compliance, security, and user trust with expert testing and detailed reporting.",
  },
  {
    id: 3,
    label: "Cloud Cost Optimistion upto 30%",
    icon: <LuCircleDollarSign style={{ fontSize: "50px", color: "#0EC9AC" }} />,
    details: "Cloud Cost Optimization minimizes expenses by up to 30%, ensuring efficient resource allocation and maximizing ROI through expert analysis and tailored solutions.",
  },
  {
    id: 4,
    label: "Cloud Pentesting",
    icon: <TfiServer style={{ fontSize: "50px", color: "#0EC9AC" }} />,
    details: "Cloud Pentesting identifies and mitigates vulnerabilities, ensuring security and compliance in cloud environments through expert testing and comprehensive reporting.",
  },
  {
    id: 5,
    label: "Your Ultimate Application Solution",
    icon: <FiMail style={{ fontSize: "50px", color: "#0EC9AC" }} />,
    details: "UI/UX + Development + Deployment + QA + Security = The Complete Package",
  },
  {
    id: 6,
    label: "QA",
    icon: <FiCheckCircle style={{ fontSize: "50px", color: "#0EC9AC" }} />,
    details: "QA provides comprehensive testing, ensuring product quality and reliability through meticulous analysis and rigorous methodologies.",
  },
];

const Services = () => {
  const bgColor = useColorModeValue("#011936", "#011936");
  return (
    <ContentLayout>
      <Flex direction={"column"} gap={4} py={10} id="services">
        <Heading size={"md"} color={useColorModeValue(PRIMARYCOLOR, PRIMARYCOLOR)} textAlign={"center"}>
          Our Services
        </Heading>
        <Heading size={"xl"} color={useColorModeValue(PRIMARYHEADLINECOLOR, PRIMARYHEADLINECOLOR)} textAlign={"center"}>
        </Heading>
        <Grid templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
          {ServiceData?.map((eachData) => (
            <Card key={eachData.id} bg={bgColor} p={1} boxShadow={"rgba(0, 0, 0, 0.34) 0px 3px 8px"}>
              <CardHeader
                alignSelf={"left"}
                _hover={{
                  transform: "translateY(-4px)",
                }}
              >
                {eachData.icon}
              </CardHeader>
              <CardBody>
                <Heading textAlign={"left"} size={"md"}>
                  {eachData.label}
                </Heading>
                <Text
                  textAlign={"left"}
                  mt={2}
                  color={useColorModeValue(PRIMARYDESCRIPTIONCOLOR, PRIMARYDESCRIPTIONCOLOR)}
                >
                  {eachData.details}
                </Text>
              </CardBody>
            </Card>
          ))}
        </Grid>
      </Flex>
    </ContentLayout>
  );
};
export default Services;
