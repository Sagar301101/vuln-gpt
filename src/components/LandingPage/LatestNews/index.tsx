import {
  Flex,
  Heading,
  useColorModeValue,
  Image,
  Link,
  Text,
  Card,
} from "@chakra-ui/react";
import { GoArrowRight } from "react-icons/go";
import {
  PRIMARYCOLOR,
  PRIMARYDESCRIPTIONCOLOR,
} from "../../../utils/color";
import ContentLayout from "../../common/Layout/ContentLayout";

// images
import EC2ipv6 from "../../../assets/latest-news/ec2-ipv6.jpeg";
import CyberAttack from "../../../assets/latest-news/cyber-attack.jpeg";

const Latestnews = () => {
  const grayTextcolor = useColorModeValue(
    PRIMARYDESCRIPTIONCOLOR,
    PRIMARYDESCRIPTIONCOLOR
  );
  const tealColor = useColorModeValue(PRIMARYCOLOR, PRIMARYCOLOR);
  const NewsData = [
    {
      id: 1,
      image: EC2ipv6,
      type: "Cloud Security",
      headline: "How to launch EC2 Instance on ipv6",
      description:
        "Launching an EC2 instance with IPv6 involves a few steps, both in the AWS Management Console and through AWS CLI or SDKs",
      url: "https://medium.com/@kumarsachin1642001/how-to-launch-ec2-instance-on-ipv6-27235a99b3ba",
    },
    {
      id: 2,
      image: CyberAttack,
      type: "Cloud Security",
      headline: "Types of Cyber Attacks on Each OSI Layer",
      description:
        "The OSI (Open Systems Interconnection) model is a conceptual framework used to understand and implement network protocols in seven layers. Each layer has specific functions and vulnerabilities, and different types of cyber attacks can target these layers",
      url: "https://medium.com/@kumarsachin1642001/types-of-cyber-attacks-on-each-osi-layer-56e746dfa3b8",
    },
  ];
  return (
    <ContentLayout>
      <Flex direction={"column"} gap={4} py={10} id="news">
        <Heading
          size={"md"}
          color={useColorModeValue(PRIMARYCOLOR, PRIMARYCOLOR)}
          textAlign={"center"}
        >
          Our Blogs
        </Heading>

        {NewsData?.map((eachNews) => (
          <Card
            key={eachNews?.id}
            display={"grid"}
            flexDirection={"row"}
            gridTemplateColumns={{
              base: "2fr 4fr",
              md: "1fr 4fr",
            }}
            variant="outline"
            p={2}
            bg={"none"}
            columnGap={8}
          >
            <Flex direction={"column"} align={"center"} columnGap={4} justify={"center"}>
              <Image
                src={eachNews.image}
                alt={eachNews.headline}
                borderRadius={"lg"}
                width={"100%"}
              />
            </Flex>
            <Flex
              direction={"column"}
              align={"left"}
              justifyContent={"space-between"}
              py={2}
            >
              <Text color={grayTextcolor}>{eachNews.type}</Text>
              <Heading size={"md"} noOfLines={1}>
                {eachNews.headline}
              </Heading>

              <Text color={grayTextcolor} noOfLines={1}>
                {eachNews.description}
              </Text>
              <Link
                isExternal
                href={eachNews?.url}
                display={"flex"}
                alignItems={"center"}
                gap={2}
                color={tealColor}
              >
                Read More{" "}
                <GoArrowRight
                  style={{
                    marginTop: "4px",
                  }}
                />
              </Link>
            </Flex>
          </Card>
        ))}
      </Flex>
    </ContentLayout>
  );
};
export default Latestnews;
