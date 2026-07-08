import { lazy } from "react";
import FreeDemo from "../components/LandingPage/FreeDemo";
import Reviews from "../components/LandingPage/Reviews";
import Pricing from "../components/LandingPage/Pricing";
const NewsLetters = lazy(() => import("../components/LandingPage/NewsLetters"));

const LandingView = lazy(() => import("../components/LandingPage/LandingView"));
const Services = lazy(() => import("../components/LandingPage/Services"));
const Products = lazy(() => import("../components/LandingPage/Products"));

const LandingPage = () => {
  return (
    <>
      <LandingView />
      <Products />

      <Services />
      <Pricing />
      <Reviews />
      <NewsLetters />
      <FreeDemo />
    </>
  );
};
export default LandingPage;
