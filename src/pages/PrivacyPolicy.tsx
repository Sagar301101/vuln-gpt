import {
  Box,
  Grid,
  Heading,
  Text,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import ContentLayout from "../components/common/Layout/ContentLayout";

const PrivacyPolicy = () => {
  const policy = [
    {
      heading: "Introduction",
      description: `Vulnshileds Consulting Private Limited ("we," "our," or "us") is
              committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, disclose, and safeguard your information when
              you visit our website. Please read this Privacy Policy carefully.
              If you do not agree with the terms of this Privacy Policy, please
              do not access the site.`,
      subHeadings: [],
    },
    {
      heading: "Information We Collect",
      description: `We may collect information about you in a variety of ways. The
              information we may collect on the Site includes:`,
      subHeadings: [
        {
          heading: "Personal Data",
          description: `Personally identifiable
              information, such as your name, shipping address, email address,
              and telephone number, and demographic information, such as your
              age, gender, hometown, and interests, that you voluntarily give to
              us when you register with the Site or when you choose to
              participate in various activities related to the Site, such as
              online chat and message boards.`,
        },
        {
          heading: "Derivative Data",
          description: `Information our servers
              automatically collect when you access the Site, such as your IP
              address, your browser type, your operating system, your access
              times, and the pages you have viewed directly before and after
              accessing the Site.`,
        },
        {
          heading: "Financial Data",
          description: `Financial information, such as
              data related to your payment method (e.g., valid credit card
              number, card brand, expiration date) that we may collect when you
              purchase, order, return, exchange, or request information about
              our services from the Site.`,
        },
      ],
    },
    {
      heading: "Use of Your Information",
      description: ` We may use information collected about you via the Site to`,
      subHeadings: [],
      options: [
        `Compile anonymous statistical data and analysis for use
              internally or with third parties.`,
        `Deliver targeted advertising, coupons, newsletters, and other
              information regarding promotions and the Site to you.`,
        `Increase the efficiency and operation of the Site.`,
        `Monitor and analyze usage and trends to improve your experience
              with the Site.`,
        `Notify you of updates to the Site.`,
        `Offer new products, services, and/or recommendations to you.`,
        `Perform other business activities as needed.`,
      ],
    },
    {
      heading: "Disclosure of Your Information",
      description: `We may share information we have collected about you in certain
              situations. Your information may be disclosed as follows:`,
      subHeadings: [
        {
          heading: "By Law or to Protect Rights",
          description: `If we believe the
              release of information about you is necessary to respond to legal
              process, to investigate or remedy potential violations of our
              policies, or to protect the rights, property, and safety of
              others, we may share your information as permitted or required by
              any applicable law, rule, or regulation.`,
        },
        {
          heading: "Third-Party Service Providers",
          description: `We may share your
              information with third parties that perform services for us or on
              our behalf, including payment processing, data analysis, email
              delivery, hosting services, customer service, and marketing
              assistance.`,
        },
        {
          heading: "Business Transfers",
          description: `We may share or transfer your
              information in connection with, or during negotiations of, any
              merger, sale of company assets, financing, or acquisition of all
              or a portion of our business to another company.`,
        },
      ],
    },
    {
      heading: "Security of Your Information",
      description: `We use administrative, technical, and physical security measures
              to help protect your personal information. While we have taken
              reasonable steps to secure the personal information you provide to
              us, please be aware that no security measures are perfect or
              impenetrable, and no method of data transmission can be guaranteed
              against any interception or other type of misuse.`,
      subHeadings: [],
    },
    {
      heading: "Policy for Children",
      description: `We do not knowingly solicit information from or market to children
              under the age of 13. If we learn that we have collected
              information from a child under age 13 without verification of
              parental consent, we will delete that information as quickly as
              possible. If you become aware of any data we have collected from
              children under age 13, please contact us.`,
      subHeadings: [],
    },
    {
      heading: "Changes to This Privacy Policy",
      description: `We may update this Privacy Policy from time to time in order to
              reflect changes to our practices or for other operational, legal,
              or regulatory reasons.`,
      subHeadings: [],
    },
  ];
  return (
    <>
      <ContentLayout>
        <Box mx={"auto"} maxW={"xl"} my={10}>
          <Heading as="h1" size="xl" mb={6}>
            Privacy Policy
          </Heading>

          <Box mb={8}>
            {policy?.map((each, index) => (
              <Box mb={8} key={index}>
                <Text size="xl" mb={4} fontWeight={"bold"}>
                  {index + 1}. {each?.heading}
                </Text>
                <Text mb={4} fontSize={"sm"} color={"gray.300"}>
                  {each?.description}
                </Text>
                {each?.subHeadings?.map(
                  (eS: { heading: string; description: string }, index) => (
                    <Grid
                      key={index}
                      gridTemplateColumns={"3fr 7fr"}
                      fontSize={"sm"}
                    >
                      <Text size={"sm"} w={"full"} fontWeight={"bold"}>
                        {eS?.heading}:
                      </Text>
                      <Text color={"gray.300"}>{eS?.description}</Text>
                    </Grid>
                  )
                )}
                <UnorderedList>
                  {each?.options?.map((item: string, index: number) => (
                    <ListItem key={index} fontSize={"sm"} color={"gray.300"}>{item}</ListItem>
                  ))}
                </UnorderedList>
              </Box>
            ))}
          </Box>
        </Box>
      </ContentLayout>
    </>
  );
};

export default PrivacyPolicy;
