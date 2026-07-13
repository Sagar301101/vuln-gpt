// Misc site data: stat counters, capabilities, process, case studies, blog, nav.

export type StatTarget = {
  key: string;
  target: number;
  label: string;
  // formats the animated integer into the displayed string
  format: (n: number) => string;
};

const fmt = (n: number) => n.toLocaleString("en-US");

export const STAT_TARGETS: StatTarget[] = [
  { key: "clients", target: 260, label: "Startups & teams secured", format: (n) => fmt(n) + "+" },
  { key: "vulns", target: 12400, label: "Vulnerabilities surfaced", format: (n) => fmt(n) + "+" },
  {
    key: "scans",
    target: 1850000,
    label: "Automated scans run",
    format: (n) => (n / 1000000).toFixed(2) + "M+",
  },
  { key: "uptime", target: 999, label: "Platform uptime", format: (n) => (n / 10).toFixed(1) + "%" },
];

export const TRUSTED_BY = [
  "Stencii",
  "EHS",
  "CodeNext",
  "Northwind",
  "Lumen",
  "Vertex",
  "Quantia",
];

export type Capability = {
  title: string;
  description: string;
  accent: "green" | "violet";
  icon: string; // lucide icon name key handled in the component
};

export const CAPABILITIES: Capability[] = [
  {
    title: "Web App Pentesting",
    description:
      "OWASP Top 10, business-logic and auth testing across your entire web surface.",
    accent: "green",
    icon: "monitor",
  },
  {
    title: "Android / iOS Pentesting",
    description:
      "Static & dynamic analysis, runtime tampering and secure-storage review.",
    accent: "violet",
    icon: "smartphone",
  },
  {
    title: "Cloud Security",
    description: "IAM, config and container audits for AWS, GCP and Azure environments.",
    accent: "green",
    icon: "cloud",
  },
  {
    title: "Network Pentesting",
    description:
      "Internal & external network testing, segmentation and exposure analysis.",
    accent: "violet",
    icon: "network",
  },
];

export type ProcessStep = {
  num: string;
  title: string;
  description: string;
  border: string;
  color: string;
};

export const PROCESS: ProcessStep[] = [
  { num: "01", title: "Scope", description: "Define assets, goals and rules of engagement.", border: "#2FBF70", color: "#2FBF70" },
  { num: "02", title: "Recon", description: "Map the attack surface with OSINT & enumeration.", border: "#4FA89E", color: "#67D0B0" },
  { num: "03", title: "Exploit", description: "Test & safely validate real vulnerabilities.", border: "#6E8AD0", color: "#8FA8F0" },
  { num: "04", title: "Report", description: "Clear, prioritized, actionable remediation.", border: "#7B6CF6", color: "#9D8CFF" },
  { num: "05", title: "Retest", description: "Verify fixes and certify your security posture.", border: "#9D8CFF", color: "#B6A9FF" },
];

export type BlogPost = {
  slug: string;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  gradient: string;
  date: string;
  readMins: number;
  /** Optional card thumbnail (e.g. "/images/blogs/thumbnail/..."); falls back to the gradient thumb when absent. */
  thumbnail?: string;
  /** Optional hero banner shown on the post page (e.g. "/images/blogs/banner/..."); falls back to `thumbnail`, then the gradient. */
  banner?: string;
  author?: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "owasp-top-10-2026",
    category: "GUIDE",
    categoryColor: "#9CE1B6",
    title: "OWASP Top 10 in 2026: what changed",
    excerpt: "OWASP A02:2025 Security Misconfiguration explained — XXE, exposed actuators, open buckets, bad headers — with vulnerable code, fixes, detection and bounty tips.",
    gradient: "linear-gradient(135deg,rgba(47,191,112,0.25),rgba(123,108,246,0.25))",
    date: "Jun 24, 2026",
    readMins: 20,
    thumbnail: "/images/blogs/thumbnail/owasp-top-10-2026.png",
    banner: "/images/blogs/banner/owasp-top-10-2026.png",
  },
  {
    slug: "shifting-security-left-cicd",
    category: "DEVSECOPS",
    categoryColor: "#9D8CFF",
    title: "Shifting Security Left in Your CI/CD Pipeline: A Practical DevSecOps Guide",
    excerpt: "Learn how to integrate security into every stage of your CI/CD pipeline using DevSecOps best practices.",
    gradient: "linear-gradient(135deg,rgba(123,108,246,0.25),rgba(47,191,112,0.2))",
    date: "Jul 13, 2026",
    readMins: 12,
    thumbnail: "/images/blogs/thumbnail/shift-left-security.png",
    banner: "/images/blogs/banner/shift-left-security.png",
    author: "VulnShields Research Team",
  },
  {
    slug: "ai-in-offensive-testing",
    category: "AI SECURITY",
    categoryColor: "#9CE1B6",
    title: "How we use AI in offensive testing",
    excerpt:
      "Inside HackTools++ and Runtime Secret Scanner — augmenting, not replacing, our red team.",
    gradient: "linear-gradient(135deg,rgba(47,191,112,0.2),rgba(123,108,246,0.3))",
    date: "May 28, 2026",
    readMins: 9,
  },
  {
    slug: "jwt-pitfalls",
    category: "GUIDE",
    categoryColor: "#9CE1B6",
    title: "5 JWT pitfalls we still find in 2026",
    excerpt: "alg=none, weak secrets, missing expiry — the token bugs that never seem to die.",
    gradient: "linear-gradient(135deg,rgba(47,191,112,0.22),rgba(91,143,230,0.22))",
    date: "May 12, 2026",
    readMins: 7,
  },
  {
    slug: "cloud-iam-least-privilege",
    category: "CLOUD",
    categoryColor: "#9D8CFF",
    title: "Least privilege that teams actually keep",
    excerpt: "A pragmatic path to tightening AWS/GCP IAM without grinding delivery to a halt.",
    gradient: "linear-gradient(135deg,rgba(123,108,246,0.28),rgba(47,191,112,0.18))",
    date: "Apr 30, 2026",
    readMins: 10,
  },
  {
    slug: "race-conditions-payments",
    category: "AI SECURITY",
    categoryColor: "#9CE1B6",
    title: "Race conditions in payment flows",
    excerpt: "How concurrent requests turn a checkout into a discount machine — and how to test it.",
    gradient: "linear-gradient(135deg,rgba(47,191,112,0.2),rgba(123,108,246,0.28))",
    date: "Apr 18, 2026",
    readMins: 8,
  },
];

// Primary marketing nav. All anchors resolve on the home page except Blog.
export type NavLink = { label: string; to: string };

export const NAV_LINKS: NavLink[] = [
  { label: "Products", to: "/#products" },
  { label: "Services", to: "/#services" },
  { label: "Pricing", to: "/#pricing" },
  { label: "Resources", to: "/#resources" },
  { label: "Company", to: "/#about" },
];
