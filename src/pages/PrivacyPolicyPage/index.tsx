import { LegalH2, LegalLi, LegalP, LegalPage, LegalUl } from "@/components/layout/LegalPage";
import { Link } from "@chakra-ui/react";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="June 28, 2024">
      <LegalP>
        VulnShields ("VulnShields", "we", "us", "our") provides AI-assisted vulnerability
        assessment, penetration testing, DevOps and development services, along with a dashboard
        for managing projects, scans, API keys, team access and billing (the "Services"). This
        Privacy Policy explains what data we collect, why we collect it, and how it's handled when
        you use our website or Services.
      </LegalP>

      <LegalH2>1. Information we collect</LegalH2>
      <LegalP>We collect information in three ways:</LegalP>
      <LegalUl>
        <LegalLi>
          <strong>Account &amp; billing data</strong> — name, work email, company name, and payment
          details when you create an account, subscribe to a plan, or contact sales.
        </LegalLi>
        <LegalLi>
          <strong>Scan &amp; project data</strong> — target assets you submit for testing (domains,
          IPs, repositories, API specs), scan configurations, and the findings, reports and logs our
          scanners and engineers generate from them.
        </LegalLi>
        <LegalLi>
          <strong>Usage data</strong> — device, browser, IP address, pages visited, and interactions
          with the site and dashboard, collected automatically via cookies and similar technologies.
        </LegalLi>
      </LegalUl>

      <LegalH2>2. How we use your information</LegalH2>
      <LegalUl>
        <LegalLi>To deliver, run and report on security assessments, scans and engagements.</LegalLi>
        <LegalLi>To operate your account, dashboard, API keys and team access controls.</LegalLi>
        <LegalLi>To process payments and manage subscriptions.</LegalLi>
        <LegalLi>To send service notices, scan results, and — where you've opted in — product updates.</LegalLi>
        <LegalLi>To monitor, secure and improve our Services, including detecting abuse.</LegalLi>
      </LegalUl>

      <LegalH2>3. Handling of scan and assessment data</LegalH2>
      <LegalP>
        Target and vulnerability data you submit is treated as confidential. It is used solely to
        perform the engagement or scan you requested, is accessible only to the engineers and
        systems needed to deliver it, and is never sold or used to train third-party models without
        your written consent. Reports and findings are retained only as long as needed to support
        your account, remediation and audit history, or as required by law.
      </LegalP>

      <LegalH2>4. Sharing of information</LegalH2>
      <LegalP>We do not sell your personal data. We share information only with:</LegalP>
      <LegalUl>
        <LegalLi>Infrastructure, hosting and payment-processing providers bound by confidentiality obligations.</LegalLi>
        <LegalLi>Team members you invite into your organization's workspace.</LegalLi>
        <LegalLi>Authorities, when required by law or to protect the rights and safety of VulnShields or others.</LegalLi>
      </LegalUl>

      <LegalH2>5. Data security</LegalH2>
      <LegalP>
        We apply encryption in transit and at rest, role-based access controls, API key scoping,
        and regular internal security reviews to protect data on our own platform — the same
        standards we hold our clients to.
      </LegalP>

      <LegalH2>6. Cookies</LegalH2>
      <LegalP>
        We use essential cookies to keep you signed in and to remember dashboard preferences, and
        limited analytics cookies to understand product usage. You can control cookies through your
        browser settings.
      </LegalP>

      <LegalH2>7. Data retention</LegalH2>
      <LegalP>
        We retain account and billing data for as long as your account is active, and scan/report
        data for the period agreed in your engagement or plan. You may request earlier deletion
        subject to any legal or contractual retention requirements.
      </LegalP>

      <LegalH2>8. Your rights</LegalH2>
      <LegalP>
        Depending on your location, you may have the right to access, correct, export or delete your
        personal data, and to withdraw consent to marketing communications. To exercise these
        rights, contact us using the details below.
      </LegalP>

      <LegalH2>9. Changes to this policy</LegalH2>
      <LegalP>
        We may update this Privacy Policy from time to time. Material changes will be posted on this
        page with an updated "Last updated" date.
      </LegalP>

      <LegalH2>10. Contact us</LegalH2>
      <LegalP>
        Questions about this Privacy Policy or your data can be sent to{" "}
        <Link href="mailto:support@vulnshields.net" color="brand.green">
          support@vulnshields.net
        </Link>
        .
      </LegalP>
    </LegalPage>
  );
}
