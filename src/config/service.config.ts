export const ServiceData = [
    {
      id: 1,
      label: "Web Application Pentesting",
      options: [
        {
          id: 1,
          label: "Recon",
          options: [
            {
              id: 1,
              label: "shodan",
            },
            {
              id: 2,
              label: "ip-test",
            },
            {
              id: 3,
              label: "dns",
            },
            {
              id: 4,
              label: "internet-search-engine-discovery",
            },
  
            {
              id: 5,
              label: "subdomain-enumeration",
            },
            {
              id: 6,
              label: "dns-bruteforce",
            },
          ],
        },
        {
          id: 2,
          label: "OSINT",
          options: [
            {
              id: 1,
              label: "EMAIL",
            },
            {
              id: 2,
              label: "Scraping Dark Websites",
            },
            {
              id: 3,
              label: "Analyze suspicious files and URLs to detect types of malware",
            },
            {
              id: 4,
              label: "LEAKED PASSWORD",
            },
            {
              id: 5,
              label: "Information Gathering",
            },
            {
              id: 6,
              label: "siteindices",
            },
            {
              id: 7,
              label: "TLS/SSL encryption",
            },
            {
              id: 8,
              label: "Threat intelligence and mapping your attack surface",
            },
            {
              id: 9,
              label: "digital fingerprints",
            },
          ],
        },
        {
          id: 3,
          label: "Fuzzing",
          options: [
            {
              id: 1,
              label: "Directory Fuzzing",
            },
            {
              id: 2,
              label: "Screenshot Gathering",
            },
            {
              id: 3,
              label: "Endpoint",
            },
            {
              id: 4,
              label: "Dorking",
            },
          ],
        },
        {
          id: 4,
          label: "OWASP TOP 10",
          options: [
            {
              id: 1,
              label: "Broken Access Control",
            },
            {
              id: 2,
              label: "Cryptographic Failures",
            },
            {
              id: 3,
              label: "Injection",
            },
            {
              id: 4,
              label: "Insecure Design",
            },
            {
              id: 5,
              label: "Security Misconfiguration",
            },
            {
              id: 6,
              label: "Vulnerable and Outdated Components",
            },
            {
              id: 7,
              label: "Identification and Authentication Failures ",
            },
            {
              id: 8,
              label: "Software and Data Integrity Failures",
            },
            {
              id: 9,
              label: "Security Logging and Monitoring Failures",
            },
            {
              id: 10,
              label: "Server-Side Request Forgery",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      label: "Cloud Pentesting",
      options: [
        {
          id: 1,
          label: "IAM config review",
          options: [
            {
              id: 1,
              label: "User and Group Permissions",
            },
            {
              id: 2,
              label: "Roles and Policies",
            },
            {
              id: 3,
              label: "Access Keys",
            },
            {
              id: 4,
              label: "Multi-Factor Authentication (MFA)",
            },
            {
              id: 5,
              label: "Permission Boundaries",
            },
            {
              id: 6,
              label: "Service Control Policies (SCPs)",
            },
            {
              id: 7,
              label: "IAM Roles for Service Access",
            },
            {
              id: 8,
              label: "Policy Evaluation",
            },
          ],
        },
        {
          id: 2,
          label: "Network",
          options: [
            {
              id: 1,
              label: "VPC Configuration (AWS) or Virtual Network (Azure/GCP)",
            },
            {
              id: 2,
              label: "Firewall Rules",
            },
            {
              id: 3,
              label: "Public/Private IP Allocation",
            },
            {
              id: 4,
              label: "Load Balancers",
            },
            {
              id: 5,
              label: "VPN and Direct Connect",
            },
          ],
        },
        {
          id: 3,
          label: "logging",
          options: [
            {
              id: 1,
              label: "Log Collection",
            },
            {
              id: 2,
              label: "Log Storage",
            },
            {
              id: 3,
              label: "Log Analysis",
            },
            {
              id: 4,
              label: "Alerting",
            },
            {
              id: 5,
              label: "Compliance and Auditing",
            },
          ],
        },
        {
          id: 4,
          label: "AWS organizations review",
          options: [
            {
              id: 1,
              label: "Organizational Structure",
            },
            {
              id: 2,
              label: "Service Control Policies",
            },
            {
              id: 3,
              label: "Account Management",
            },
            {
              id: 4,
              label: "Billing and Cost Management",
            },
            {
              id: 5,
              label: "Security and Compliance",
            },
            {
              id: 6,
              label: "Resource Sharing",
            },
            {
              id: 7,
              label: "Delegated Administrators",
            },
            {
              id: 8,
              label: "Multi-Account Strategy",
            },
            {
              id: 9,
              label: "Root Account Security",
            },
            {
              id: 10,
              label: "Audit and Review"
            },
          ],
        },
        {
          id: 5,
          label: "AWS security groups review",
          options: [
            {
              id: 1,
              label: "General Configuration",
            },
            {
              id: 2,
              label: "Rule Review",
            },
            {
              id: 3,
              label: "Security Group Associations",
            },
            {
              id: 5,
              label: "Security Group Limits",
            },
            {
              id: 6,
              label: "Auditing and Monitoring",
            },
            {
              id: 7,
              label: "Compliance and Best Practices",
            },
            {
              id: 8,
              label: "Inter-Security Group Communication",
            },
            {
              id: 9,
              label: "Periodic Review",
            },
          ],
        },
        {
          id: 6,
          label: "AWS services review",
          options: [
            {
              id: 1,
              label: "Compute",
            },
            {
              id: 2,
              label: "Databse",
            },
            {
              id: 3,
              label: "Network",
            },
            {
              id: 4,
              label: "Stroage",
            },
          ],
        },
      ],
    },
    {
      id: 3,
      label: "Mobile Application Pentesting",
      options: [
        {
          id: 1,
          label: "Reconnaissance and Information Gathering",
          options: [
            {
              id: 1,
              label: "Identify the App’s Components",
            },
            {
              id: 2,
              label: "Network Traffic Analysis",
            },
            {
              id: 3,
              label: "Application Analysis",
            },
            {
              id: 4,
              label: "Gather Metadata",
            },
          ],
        },
        {
          id: 2,
          label: "Static Analysis",
          options: [
            {
              id: 1,
              label: "Code Review",
            },
            {
              id: 2,
              label: "Binary Analysis",
            },
            {
              id: 3,
              label: "Dependency Analysis",
            },
            {
              id: 4,
              label: "Cloud Security",
            },
          ],
        },
        {
          id: 3,
          label: "Dynamic Analysis",
          options: [
            {
              id: 1,
              label: "Functionality Testing",
            },
            {
              id: 2,
              label: "Session Management",
            },
            {
              id: 3,
              label: "API Testing",
            },
            {
              id: 4,
              label: "Cloud Security",
            },
          ],
        },
        {
          id: 4,
          label: "Network Security",
          options: [
            {
              id: 1,
              label: "Traffic Encryption",
            },
            {
              id: 2,
              label: "Data Leakage",
            },
            {
              id: 3,
              label: " Data Storage and Handling",
              options: [
                {
                  id: 1,
                  label: "Local Storage",
                },
                {
                  id: 2,
                  label: "Data Persistence",
                },
              ],
            },
            {
              id: 4,
              label: "Security Controls and Protections",
              options: [
                {
                  id: 1,
                  label: "Code Obfuscation",
                },
                {
                  id: 2,
                  label: "Root/Jailbreak Detection",
                },
                {
                  id: 3,
                  label: "Integrity Checks",
                },
              ],
            },
            {
              id: 5,
              label: "Social Engineering",
              options: [
                {
                  id: 1,
                  label: "Phishing Vulnerabilities",
                },
                
              ],
            },
            {
              id: 6,
              label: "Authentication and Authorization",
              options: [
                {
                  id: 1,
                  label: "Authentication Mechanism",
                },
                {
                  id: 2,
                  label: "Authorization Checks",
                },
                {
                  id: 3,
                  label: "Compliance and Best Practices",
                },
          ],
        }
      ],
    },
      ]
    }
      ]