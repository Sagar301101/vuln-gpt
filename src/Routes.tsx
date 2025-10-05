import { lazy } from "react";

import Footer from "./components/common/Footer";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import WebsiteScan from "./pages/WebsiteScan";

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
              <LandingPage />{" "}
            </ModalWrapper>
          }
        />
        <Route path="/scan" element={<WebsiteScan />} />
      </Routes>
      <Footer />
    </MainLayout>
  );
}

export default AllRoutes;
