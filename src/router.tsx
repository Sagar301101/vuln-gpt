import { lazy, Suspense, type ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "@/components/layout/RootLayout";
import { RouteFallback } from "@/components/ui/RouteFallback";

// Home loads eagerly (it's the primary landing experience); everything else is
// code-split so the initial bundle stays lean.
import Home from "@/pages/Home";

const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogPostPage = lazy(() => import("@/pages/BlogPostPage"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("@/pages/TermsConditions"));
const NotFound = lazy(() => import("@/pages/NotFound"));

// Dashboard (authenticated area) — separate layout, all lazily loaded.
const DashboardLayout = lazy(() => import("@/pages/dashboard/DashboardLayout"));
const Overview = lazy(() => import("@/pages/dashboard/Overview"));
const Projects = lazy(() => import("@/pages/dashboard/Projects"));
const Scans = lazy(() => import("@/pages/dashboard/Scans"));
const ApiKeys = lazy(() => import("@/pages/dashboard/ApiKeys"));
const Team = lazy(() => import("@/pages/dashboard/Team"));
const Settings = lazy(() => import("@/pages/dashboard/Settings"));
const Billing = lazy(() => import("@/pages/dashboard/Billing"));

const lazyRoute = (node: ReactNode) => <Suspense fallback={<RouteFallback />}>{node}</Suspense>;

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "blog", element: lazyRoute(<BlogPage />) },
      { path: "blog/:slug", element: lazyRoute(<BlogPostPage />) },
      { path: "privacy-policy", element: lazyRoute(<PrivacyPolicy />) },
      { path: "terms-conditions", element: lazyRoute(<TermsConditions />) },
      { path: "*", element: lazyRoute(<NotFound />) },
    ],
  },
  {
    path: "/dashboard",
    element: lazyRoute(<DashboardLayout />),
    children: [
      { index: true, element: lazyRoute(<Overview />) },
      { path: "projects", element: lazyRoute(<Projects />) },
      { path: "scans", element: lazyRoute(<Scans />) },
      { path: "api-keys", element: lazyRoute(<ApiKeys />) },
      { path: "team", element: lazyRoute(<Team />) },
      { path: "settings", element: lazyRoute(<Settings />) },
      { path: "billing", element: lazyRoute(<Billing />) },
    ],
  },
]);
