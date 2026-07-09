import { LegalH2, LegalLi, LegalP, LegalPage, LegalUl } from "@/components/layout/LegalPage";
import { Link } from "@chakra-ui/react";

export default function TermsConditionsPage() {
  return (
    <LegalPage title="Terms & Conditions" updated="June 28, 2024">
      <LegalP>
        These Terms &amp; Conditions ("Terms") govern your access to and use of VulnShields'
        website, dashboard, APIs, and security services — including vulnerability assessments,
        penetration testing, DevOps and development engagements (together, the "Services"). By
        creating an account or using the Services, you agree to these Terms.
      </LegalP>

      <LegalH2>1. Authorization to test</LegalH2>
      <LegalP>
        You confirm that you own, or have written authorization from the owner of, every asset
        (domain, application, network, repository or API) you submit for scanning or testing.
        VulnShields performs assessments only against assets you have designated and authorized, and
        is not responsible for testing carried out against assets submitted without proper
        authorization.
      </LegalP>

      <LegalH2>2. Accounts</LegalH2>
      <LegalUl>
        <LegalLi>You're responsible for the accuracy of your account information and the security of your credentials and API keys.</LegalLi>
        <LegalLi>You're responsible for all activity carried out by team members you invite into your workspace.</LegalLi>
        <LegalLi>You must notify us promptly of any unauthorized use of your account.</LegalLi>
      </LegalUl>

      <LegalH2>3. Plans, billing and cancellation</LegalH2>
      <LegalUl>
        <LegalLi>Subscription plans are billed in advance on a recurring basis until cancelled.</LegalLi>
        <LegalLi>Engagement-based services are billed per the scope agreed in your order or statement of work.</LegalLi>
        <LegalLi>You may cancel a subscription at any time; access continues until the end of the current billing period. Fees already paid are non-refundable except where required by law.</LegalLi>
      </LegalUl>

      <LegalH2>4. Use of the Services</LegalH2>
      <LegalP>You agree not to:</LegalP>
      <LegalUl>
        <LegalLi>Use the Services to scan, test or attack assets you do not own or have authorization to test.</LegalLi>
        <LegalLi>Use findings, reports or the platform to harm, exploit or disrupt any third party or system.</LegalLi>
        <LegalLi>Reverse-engineer, resell or misuse VulnShields' scanning engines, dashboard or APIs outside the scope of your plan.</LegalLi>
        <LegalLi>Circumvent rate limits, access controls or API key scoping.</LegalLi>
      </LegalUl>

      <LegalH2>5. Reports and findings</LegalH2>
      <LegalP>
        Reports, findings and recommendations are provided based on the scope, access and time
        agreed for each engagement or scan. They reflect the security posture of the tested assets
        at the time of testing and do not guarantee the absence of all vulnerabilities. You remain
        responsible for reviewing, prioritizing and remediating reported issues.
      </LegalP>

      <LegalH2>6. Intellectual property</LegalH2>
      <LegalP>
        VulnShields retains all rights to its platform, scanning technology, methodologies and
        branding. You retain all rights to your own systems, code and data. Reports we deliver for
        your engagement are yours to use internally and with auditors or regulators as needed.
      </LegalP>

      <LegalH2>7. Disclaimer and limitation of liability</LegalH2>
      <LegalP>
        The Services are provided "as is." To the maximum extent permitted by law, VulnShields is
        not liable for indirect, incidental or consequential damages, and our total liability for
        any claim arising from the Services is limited to the fees you paid us in the 12 months
        preceding the claim.
      </LegalP>

      <LegalH2>8. Suspension and termination</LegalH2>
      <LegalP>
        We may suspend or terminate access to the Services if you breach these Terms, misuse the
        platform, or use it to test assets without proper authorization.
      </LegalP>

      <LegalH2>9. Changes to these Terms</LegalH2>
      <LegalP>
        We may update these Terms from time to time. Continued use of the Services after changes are
        posted constitutes acceptance of the updated Terms.
      </LegalP>

      <LegalH2>10. Contact us</LegalH2>
      <LegalP>
        Questions about these Terms can be sent to{" "}
        <Link href="mailto:support@vulnshields.net" color="brand.green">
          support@vulnshields.net
        </Link>
        .
      </LegalP>
    </LegalPage>
  );
}
