// Interactive services explorer data — ported verbatim from VulnShields.dc.html (SERVICES)
export type ServiceSub = {
  id: string;
  label: string;
  checks: string[];
};

export type ServiceTab = {
  id: string;
  label: string;
  subs: ServiceSub[];
};

export const SERVICES: Record<string, ServiceTab> = {
  web: {
    id: "web",
    label: "Web Application Pentesting",
    subs: [
      {
        id: "recon",
        label: "Recon",
        checks: [
          "Shodan",
          "IP-Test",
          "DNS",
          "Internet-Search-Engine-Discovery",
          "Subdomain-Enumeration",
          "DNS-Bruteforce",
        ],
      },
      {
        id: "osint",
        label: "OSINT",
        checks: [
          "Email & Credential Leaks",
          "Metadata Harvesting",
          "GitHub / Pastebin Recon",
          "Employee Footprinting",
        ],
      },
      {
        id: "fuzzing",
        label: "Fuzzing",
        checks: [
          "Parameter Fuzzing",
          "Directory & File Bruteforce",
          "Header Injection",
          "Payload Mutation",
        ],
      },
      {
        id: "owasp",
        label: "OWASP Top 10",
        checks: [
          "Injection (SQLi / NoSQLi)",
          "Broken Access Control",
          "XSS (Reflected / Stored / DOM)",
          "SSRF & XXE",
          "Security Misconfiguration",
          "Vulnerable Components",
        ],
      },
      {
        id: "auth",
        label: "Auth & Session",
        checks: [
          "JWT / OAuth Flaws",
          "Session Fixation",
          "MFA Bypass",
          "Password Policy Audit",
        ],
      },
      {
        id: "logic",
        label: "Business Logic",
        checks: [
          "Workflow Abuse",
          "Race Conditions",
          "Price / Quantity Tampering",
          "Privilege Escalation",
        ],
      },
    ],
  },
  cloud: {
    id: "cloud",
    label: "Cloud Pentesting",
    subs: [
      {
        id: "iam",
        label: "IAM Review",
        checks: [
          "Over-Privileged Roles",
          "Public Access Keys",
          "MFA Enforcement",
          "Trust Policy Audit",
        ],
      },
      {
        id: "config",
        label: "Config Audit",
        checks: [
          "CIS Benchmark Scan",
          "Logging & Monitoring Gaps",
          "Network ACL Review",
          "Encryption at Rest",
        ],
      },
      {
        id: "k8s",
        label: "Container / K8s",
        checks: [
          "Image Vulnerability Scan",
          "RBAC Misconfiguration",
          "Exposed Dashboards",
          "Pod Security Policies",
        ],
      },
      {
        id: "storage",
        label: "Storage & Secrets",
        checks: [
          "Public Buckets",
          "Hard-coded Secrets",
          "Backup Exposure",
          "Key Rotation",
        ],
      },
    ],
  },
  mobile: {
    id: "mobile",
    label: "Mobile Application Pentesting",
    subs: [
      {
        id: "static",
        label: "Static Analysis",
        checks: [
          "Reverse Engineering",
          "Hard-coded Keys",
          "Insecure Storage",
          "Code Obfuscation Review",
        ],
      },
      {
        id: "dynamic",
        label: "Dynamic Analysis",
        checks: [
          "Runtime Tampering",
          "SSL Pinning Bypass",
          "Hooking & Instrumentation",
          "Memory Inspection",
        ],
      },
      {
        id: "api",
        label: "API Testing",
        checks: [
          "Broken Object-Level Auth",
          "Rate Limiting",
          "Mass Assignment",
          "Token Handling",
        ],
      },
      {
        id: "crypto",
        label: "Storage & Crypto",
        checks: [
          "Keychain / Keystore Audit",
          "Weak Cipher Detection",
          "Data Leakage",
          "Clipboard / Logs",
        ],
      },
    ],
  },
};

export const SERVICE_ORDER = ["web", "cloud", "mobile"] as const;
