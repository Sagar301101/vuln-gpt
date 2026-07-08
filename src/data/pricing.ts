// Pricing matrix (ported from PRICES) + plan metadata.
export type Currency = "INR" | "USD";
export type Billing = "monthly" | "yearly";
export type PlanKey = "silver" | "golden" | "premium";

export const PRICES: Record<Currency, Record<Billing, Record<PlanKey, string>>> = {
  INR: {
    monthly: { silver: "₹30k", golden: "₹50k", premium: "₹1L" },
    yearly: { silver: "₹3L", golden: "₹5L", premium: "₹10L" },
  },
  USD: {
    monthly: { silver: "$399", golden: "$699", premium: "$1,299" },
    yearly: { silver: "$3,990", golden: "$6,990", premium: "$12,990" },
  },
};

export type Plan = {
  key: PlanKey;
  name: string;
  tagline: string;
  iconColor: string;
  iconBg: string;
  featured?: boolean;
  features: { label: string; muted?: boolean }[];
};

export const PLANS: Plan[] = [
  {
    key: "silver",
    name: "Silver",
    tagline: "For startups starting their security journey.",
    iconColor: "#B8B8C0",
    iconBg: "rgba(255,255,255,0.05)",
    features: [
      { label: "Annual VAPT by security experts" },
      { label: "Standardized testing coverage" },
      { label: "Basic business-logic testing", muted: true },
      { label: "Penetration test certificate", muted: true },
    ],
  },
  {
    key: "golden",
    name: "Golden",
    tagline: "For growing teams that need depth & cadence.",
    iconColor: "#FFA85C",
    iconBg: "rgba(255,168,92,0.12)",
    featured: true,
    features: [
      { label: "Quarterly VAPT engagements" },
      { label: "Advanced testing coverage" },
      { label: "In-depth business-logic testing" },
      { label: "Real-time security alerts" },
      { label: "Dedicated expert support" },
    ],
  },
  {
    key: "premium",
    name: "Premium",
    tagline: "Continuous security for scaling companies.",
    iconColor: "#9D8CFF",
    iconBg: "rgba(123,108,246,0.12)",
    features: [
      { label: "Continuous VAPT & monitoring" },
      { label: "Extensive business-logic & code review" },
      { label: "24/7 real-time alerts & monitoring" },
      { label: "Dedicated elite support team" },
      { label: "Executive reporting & compliance" },
    ],
  },
];

export const priceNote = (billing: Billing) =>
  billing === "yearly"
    ? "Billed annually — 2 months free vs monthly."
    : "Switch to yearly billing and get 2 months free.";

/* -------------------------------------------------------------------------- */
/*  AI plan recommender — company type + security focus + testing cadence     */
/* -------------------------------------------------------------------------- */

export type CompanyType = "startup" | "smallBusiness" | "growing" | "enterprise";
export type SecurityFocus = "web" | "cloud" | "mobile" | "network" | "compliance";
export type Cadence = "oneTime" | "quarterly" | "continuous";

export const COMPANY_TYPE_OPTIONS: { key: CompanyType; label: string }[] = [
  { key: "startup", label: "Startup (pre-seed–seed)" },
  { key: "smallBusiness", label: "Small business" },
  { key: "growing", label: "Growing company" },
  { key: "enterprise", label: "Enterprise" },
];

export const SECURITY_FOCUS_OPTIONS: { key: SecurityFocus; label: string }[] = [
  { key: "web", label: "Web application" },
  { key: "cloud", label: "Cloud infrastructure" },
  { key: "mobile", label: "Mobile apps" },
  { key: "network", label: "Network & internal systems" },
  { key: "compliance", label: "Compliance & audit readiness" },
];

export const CADENCE_OPTIONS: { key: Cadence; label: string }[] = [
  { key: "oneTime", label: "One-time / annual check" },
  { key: "quarterly", label: "Quarterly engagements" },
  { key: "continuous", label: "Continuous monitoring" },
];

export type RecommenderInput = {
  companyType: CompanyType;
  securityFocus: SecurityFocus;
  cadence: Cadence;
};

const companyTypeScore: Record<CompanyType, Partial<Record<PlanKey, number>>> = {
  startup: { silver: 2 },
  smallBusiness: { silver: 1, golden: 1 },
  growing: { golden: 2 },
  enterprise: { premium: 2 },
};

const securityFocusScore: Record<SecurityFocus, Partial<Record<PlanKey, number>>> = {
  web: { silver: 1 },
  cloud: { golden: 1 },
  mobile: { golden: 1 },
  network: { golden: 1, premium: 1 },
  compliance: { premium: 2 },
};

const cadenceScore: Record<Cadence, Partial<Record<PlanKey, number>>> = {
  oneTime: { silver: 2 },
  quarterly: { golden: 2 },
  continuous: { premium: 2 },
};

/** Scores all 3 plans against the answers and returns the best match. */
export function recommendPlan({ companyType, securityFocus, cadence }: RecommenderInput): PlanKey {
  const totals: Record<PlanKey, number> = { silver: 0, golden: 0, premium: 0 };
  for (const scores of [companyTypeScore[companyType], securityFocusScore[securityFocus], cadenceScore[cadence]]) {
    for (const key of Object.keys(scores) as PlanKey[]) {
      totals[key] += scores[key] ?? 0;
    }
  }
  return (Object.keys(totals) as PlanKey[]).reduce((best, key) => (totals[key] > totals[best] ? key : best), "silver");
}
