import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "@/wrapper/RootLayout";
import { RouteFallback } from "@/components/common/RouteFallback";
import { ROUTES } from "@/constant/routes.constant";

// Home loads eagerly (it's the primary landing experience); everything else is
// code-split so the initial bundle stays lean.
import HomePage from "@/pages/HomePage";

const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const PrivacyPolicyPage = lazy(() => import("@/pages/PrivacyPolicyPage"));
const TermsConditionsPage = lazy(() => import("@/pages/TermsConditionsPage"));
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage"));

// Dashboard (authenticated area) — separate layout, all lazily loaded.
const DashboardLayout = lazy(() => import("@/wrapper/DashboardLayout"));
const OverviewPage = lazy(() => import("@/pages/dashboard/OverviewPage"));
const ProjectsPage = lazy(() => import("@/pages/dashboard/ProjectsPage"));
const ScansPage = lazy(() => import("@/pages/dashboard/ScansPage"));
const ApiKeysPage = lazy(() => import("@/pages/dashboard/ApiKeysPage"));
const TeamPage = lazy(() => import("@/pages/dashboard/TeamPage"));
const SettingsPage = lazy(() => import("@/pages/dashboard/SettingsPage"));
const BillingPage = lazy(() => import("@/pages/dashboard/BillingPage"));

const lazyRoute = (node: ReactNode) => <Suspense fallback={<RouteFallback />}>{node}</Suspense>;

export const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: ROUTES.BLOG, element: lazyRoute(<BlogPage />) },
      { path: ROUTES.BLOG_POST, element: lazyRoute(<BlogPostPage />) },
      { path: ROUTES.PRIVACY_POLICY, element: lazyRoute(<PrivacyPolicyPage />) },
      { path: ROUTES.TERMS_CONDITIONS, element: lazyRoute(<TermsConditionsPage />) },
      { path: ROUTES.NOT_FOUND, element: lazyRoute(<NotFoundPage />) },
    ],
  },
  {
    path: ROUTES.DASHBOARD.ROOT,
    element: lazyRoute(<DashboardLayout />),
    children: [
      { index: true, element: lazyRoute(<OverviewPage />) },
      { path: ROUTES.DASHBOARD.PROJECTS, element: lazyRoute(<ProjectsPage />) },
      { path: ROUTES.DASHBOARD.SCANS, element: lazyRoute(<ScansPage />) },
      { path: ROUTES.DASHBOARD.API_KEYS, element: lazyRoute(<ApiKeysPage />) },
      { path: ROUTES.DASHBOARD.TEAM, element: lazyRoute(<TeamPage />) },
      { path: ROUTES.DASHBOARD.SETTINGS, element: lazyRoute(<SettingsPage />) },
      { path: ROUTES.DASHBOARD.BILLING, element: lazyRoute(<BillingPage />) },
    ],
  },
]);
