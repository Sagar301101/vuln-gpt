import { Box, Heading, Text } from "@chakra-ui/react";
import ContentLayout from "../components/common/Layout/ContentLayout";

const TermsAndConditions = () => {
  const termsAndConditions = [
    {
      heading: "Acceptance of Terms",
      description: `By accessing or using the services provided by Vulnshileds Consulting
          Private Limited ("we," "our," or "us"), you agree to comply with and
          be bound by these terms and conditions. If you do not agree to these
          terms, you should not use our services.`,
    },
    {
      heading: "Use of the Service",
      description: `You agree to use our services only for lawful purposes and in a way
          that does not infringe the rights of others or restrict or inhibit
          their use and enjoyment of our services. Prohibited behavior includes
          harassing or causing distress or inconvenience to any other user,
          transmitting obscene or offensive content, or disrupting the normal
          flow of dialogue within our services.`,
    },
    {
      heading: "Intellectual Property",
      description: ` All content, trademarks, logos, and other intellectual property
          displayed on our site are the property of Vulnshileds Consulting
          Private Limited or our licensors. You are not permitted to use these
          without our prior written consent.`,
    },
    {
      heading: "Limitation of Liability",
      description: `Vulnshileds Consulting Private Limited will not be liable for any
          indirect, incidental, special, or consequential damages, including but
          not limited to loss of revenue or anticipated profits, loss of
          goodwill, loss of data, or loss of sales or revenue, arising out of or
          in connection with your use of the services.`,
    },
    {
      heading: "Changes to These Terms",
      description: `We reserve the right to modify or replace these terms at any time. It
          is your responsibility to review these terms periodically. Your
          continued use of the services following the posting of any changes
          constitutes acceptance of those changes..`,
    },
    {
      heading: "Contact Information",
      description: `If you have any questions about these Terms & Conditions, please
          contact us at admin@vulnshileds.net.`,
    },
  ];
  return (
    <>
      <ContentLayout>
        <Box mx={"auto"} maxW={"xl"} my={10}>
          <Heading as="h1" size="xl" mb={6}>
            Terms & Conditions
          </Heading>

          <Box mb={8}>
            {termsAndConditions?.map(
              (each: { heading: string; description: string }, index) => (
                <Box mb={8} key={index}>
                  <Text size="lg" mb={4} fontWeight={"bold"}>
                    {index + 1}. {each?.heading}
                  </Text>
                  <Text mb={4} fontSize={"sm"} color={"gray.300"}>
                    {each.description}
                  </Text>
                </Box>
              )
            )}
          </Box>
        </Box>
      </ContentLayout>
    </>
  );
};

export default TermsAndConditions;
