import type { BlogContentBlock } from "./types";

export const content: BlogContentBlock[] = [
  { type: "p", text: "Software delivery has changed dramatically over the past decade." },
  {
    type: "p",
    text: "Engineering teams that once shipped software every few months now deploy code dozens—or even hundreds—of times each day. Continuous Integration and Continuous Delivery (CI/CD) have become standard practices, enabling faster releases, shorter feedback loops, and more responsive product development.",
  },
  {
    type: "p",
    text: "This speed has transformed how organizations build software, but it has also reshaped the security landscape.",
  },
  {
    type: "p",
    text: "Every pull request introduces new code, dependencies, infrastructure changes, and configuration updates. Each of these changes has the potential to introduce vulnerabilities, whether through insecure coding practices, outdated third-party libraries, exposed secrets, or misconfigured cloud resources.",
  },
  {
    type: "p",
    text: "In many organizations, however, security reviews still occur near the end of the release process. Development teams write the code, QA teams validate functionality, and only then does security begin its assessment. By that point, critical issues often require significant rework, delaying releases and increasing remediation costs.",
  },
  { type: "p", text: "This traditional approach is becoming increasingly difficult to sustain." },
  {
    type: "p",
    text: "Modern engineering teams need security to evolve at the same pace as software delivery. Rather than acting as a final approval gate, security must become an integral part of the development lifecycle from the moment code is written.",
  },
  { type: "p", text: "This philosophy is commonly known as Shift Left Security." },
  {
    type: "p",
    text: "By integrating automated security checks directly into development workflows, organizations can identify vulnerabilities earlier, provide developers with immediate feedback, and reduce the risk of security issues reaching production—all without slowing innovation.",
  },
  {
    type: "p",
    text: "In this article, we'll explore what shifting security left actually means, why it matters, how to implement it effectively within a CI/CD pipeline, and the practical steps engineering teams can take to strengthen software security while maintaining delivery speed.",
  },
  { type: "h", text: "What Does “Shift Left Security” Really Mean?" },
  {
    type: "p",
    text: "The term Shift Left is often used in DevSecOps discussions, but it is sometimes misunderstood.",
  },
  {
    type: "p",
    text: "At its core, shifting security left means introducing security activities earlier in the Software Development Lifecycle (SDLC). Instead of waiting until a feature is complete—or worse, until just before deployment—security validation becomes part of everyday development.",
  },
  { type: "p", text: "Imagine the software lifecycle as a timeline:" },
  { type: "code", text: "Requirements → Design → Development → Build → Test → Deploy → Monitor" },
  {
    type: "p",
    text: "In a traditional model, security testing often begins during the testing or deployment phases. By then, vulnerabilities may already be deeply embedded in the application, making them more complex and costly to fix.",
  },
  { type: "p", text: "A Shift Left approach moves many of those security activities closer to development:" },
  {
    type: "code",
    text: "Requirements\n↓\nThreat Modeling\n\nDesign\n↓\nArchitecture Review\n\nDevelopment\n↓\nSecure Coding\nSecret Detection\nStatic Code Analysis\n\nPull Request\n↓\nSecurity Validation\n\nCI Pipeline\n↓\nDependency Scanning\nContainer Scanning\nInfrastructure as Code Validation\n\nDeployment\n↓\nDynamic Testing\nRuntime Monitoring\n\nProduction\n↓\nContinuous Security Monitoring",
  },
  {
    type: "p",
    text: "The goal is not to eliminate security testing later in the lifecycle. Runtime monitoring, penetration testing, and production security controls remain essential. Instead, Shift Left focuses on identifying issues at the earliest practical stage, where remediation is faster, less disruptive, and significantly more cost-effective.",
  },
  { type: "h", text: "Why Traditional Security Models No Longer Work" },
  {
    type: "p",
    text: "Historically, software releases followed longer development cycles. Security teams had time to conduct manual reviews, perform penetration tests, and approve releases before deployment.",
  },
  { type: "p", text: "Today's development practices are very different." },
  { type: "p", text: "Modern teams often:" },
  {
    type: "ul",
    items: [
      "Merge dozens of pull requests each day.",
      "Deploy multiple times daily.",
      "Manage hundreds of third-party dependencies.",
      "Build cloud-native applications using containers and Kubernetes.",
      "Define infrastructure through code.",
      "Rely heavily on automation throughout the delivery pipeline.",
    ],
  },
  { type: "p", text: "Under these conditions, manual security reviews alone cannot keep pace." },
  {
    type: "p",
    text: "Even highly skilled security engineers cannot manually inspect every code change, dependency update, or infrastructure modification without creating delivery bottlenecks.",
  },
  {
    type: "p",
    text: "The result is a familiar tension between development and security teams.",
  },
  {
    type: "p",
    text: "Developers are measured on delivery speed and product value. Security teams are responsible for reducing risk. Without integrated workflows, these priorities can appear to conflict, leading to delayed releases or security controls being bypassed.",
  },
  {
    type: "p",
    text: "DevSecOps addresses this challenge by embedding security directly into automated engineering processes.",
  },
  {
    type: "p",
    text: "Rather than asking developers to stop and wait for security reviews, the pipeline itself becomes an active participant in maintaining software security.",
  },
  {
    type: "p",
    text: "Every commit, pull request, and deployment provides an opportunity to automatically verify that security expectations continue to be met.",
  },
  { type: "h", text: "The Cost of Finding Vulnerabilities Late" },
  { type: "p", text: "One of the strongest arguments for shifting security left is the cost of remediation." },
  { type: "p", text: "Consider a simple example." },
  { type: "p", text: "A developer accidentally commits a cloud access key to a feature branch." },
  { type: "p", text: "If the secret is detected immediately during the pull request:" },
  {
    type: "ul",
    items: [
      "The commit can be corrected before merging.",
      "The credential can be rotated.",
      "No production systems are affected.",
      "Development continues with minimal disruption.",
    ],
  },
  { type: "p", text: "Now consider the same issue discovered several weeks after deployment." },
  { type: "p", text: "The organization may need to:" },
  {
    type: "ul",
    items: [
      "Rotate production credentials.",
      "Audit cloud activity.",
      "Investigate potential unauthorized access.",
      "Notify stakeholders.",
      "Perform incident response activities.",
      "Delay planned releases while the issue is resolved.",
    ],
  },
  {
    type: "p",
    text: "The technical fix may still be straightforward, but the operational impact is significantly greater.",
  },
  {
    type: "p",
    text: "The same principle applies to vulnerable dependencies, insecure infrastructure configurations, and application-level flaws. Detecting these issues early reduces remediation effort, minimizes business disruption, and allows teams to address security concerns before they become incidents.",
  },
  {
    type: "p",
    text: "Shifting security left is therefore not only a security improvement—it is also an engineering efficiency practice that helps teams maintain delivery velocity while reducing long-term operational costs.",
  },
];
