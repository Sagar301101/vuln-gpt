import { Hero } from "@/sections/Hero";
import { Products } from "@/sections/Products";
import { Resources } from "@/sections/Resources";
import { About } from "@/sections/About";
import { Services } from "@/sections/Services";
import { Process } from "@/sections/Process";
import { Pricing } from "@/sections/Pricing";
import { Faq } from "@/sections/Faq";
import { TrustStats } from "@/sections/TrustStats";
import { CtaBand } from "@/sections/CtaBand";

export default function Home() {
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
