import { lazy } from "react";
import Latestnews from "../components/LandingPage/LatestNews";
import NewsLetter from "../components/LandingPage/NewsLetter";
import FreeTrial from "../components/LandingPage/FreeTrial";

const LandingView = lazy(() => import("../components/LandingPage/LandingView"));
const Services = lazy(() => import("../components/LandingPage/Services"));
const Products=lazy(()=>import("../components/LandingPage/Products"))
const About = lazy(()=>import("../components/LandingPage/About"))

const LandingPage = () => {
  return (
    <>
      <LandingView />
      <About />
      <Products />
      <Services />
      <FreeTrial />
      <Latestnews />
      <NewsLetter />
    </>
  );
};
export default LandingPage;
