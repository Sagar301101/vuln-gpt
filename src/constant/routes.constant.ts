/** Centralized route paths — import ROUTES instead of hardcoding path strings. */
export const ROUTES = {
  HOME: "/",
  BLOG: "/blog",
  BLOG_POST: "/blog/:slug",
  blogPost: (slug: string) => `/blog/${slug}`,
  PRIVACY_POLICY: "/privacy-policy",
  TERMS_CONDITIONS: "/terms-conditions",
  NOT_FOUND: "*",
  DASHBOARD: {
    ROOT: "/dashboard",
    PROJECTS: "/dashboard/projects",
    SCANS: "/dashboard/scans",
    API_KEYS: "/dashboard/api-keys",
    TEAM: "/dashboard/team",
    SETTINGS: "/dashboard/settings",
    BILLING: "/dashboard/billing",
  },
} as const;
