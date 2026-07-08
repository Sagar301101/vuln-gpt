// FAQ accordion data (ported from FAQS)
export type Faq = { q: string; a: string };

export const FAQS: Faq[] = [
  {
    q: "What does a typical engagement look like?",
    a: "We scope your assets and goals, run reconnaissance and testing aligned to OWASP, safely validate findings, deliver a prioritized report, and retest after you remediate — then certify your posture.",
  },
  {
    q: "Do you only do security, or development too?",
    a: "Both. We're security-first, but we also offer DevOps (hardened CI/CD, IaC, Kubernetes) and Development (web, mobile, secure APIs, UI/UX) so you can ship resilient products end to end.",
  },
  {
    q: "How fast can you start?",
    a: "Most engagements kick off within a week, and our automated scanners can surface first findings within 48 hours of access.",
  },
  {
    q: "Will testing disrupt my production systems?",
    a: "No. We agree on rules of engagement up front, test safely, and can work against staging or production with appropriate safeguards and monitoring.",
  },
  {
    q: "What do reports include?",
    a: "Clear severity ratings, reproduction steps, business impact, and concrete remediation guidance — exportable as PDF or SARIF for your developers and auditors.",
  },
  {
    q: "Do you support compliance frameworks?",
    a: "Yes — our Premium plan includes executive reporting and compliance support for frameworks like SOC 2 and ISO 27001.",
  },
];
