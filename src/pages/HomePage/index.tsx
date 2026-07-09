import { Hero } from "@/components/HomePage/Hero";
import { Products } from "@/components/HomePage/Products";
import { Resources } from "@/components/HomePage/Resources";
import { About } from "@/components/HomePage/About";
import { Services } from "@/components/HomePage/Services";
import { Process } from "@/components/HomePage/Process";
import { Pricing } from "@/components/HomePage/Pricing";
import { Faq } from "@/components/HomePage/Faq";
import { TrustStats } from "@/components/HomePage/TrustStats";
import { CtaBand } from "@/components/HomePage/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Products />
      <Resources />
      <About />
      <Services />
      <Process />
      <Pricing />
      <Faq />
      <TrustStats />
      <CtaBand />
    </>
  );
}
