import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Footer from "./components/common/Footer";
import LandingPage from "./pages/LandingPage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsAndCondition from "./pages/TermAndCondition";

const Navbar = lazy(() => import("./components/common/Navbar"));
const MainLayout = lazy(() => import("./components/common/Layout/MainLayout"));
const ModalWrapper = lazy(() => import("./wrapper/ModalWrapper"));

function AllRoutes() {
  return (
      <MainLayout>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <ModalWrapper>
                <LandingPage />
              </ModalWrapper>
            }
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-condition" element={<TermsAndCondition />} />
        </Routes>
        <Footer />
      </MainLayout>
  );
}

export default AllRoutes;
