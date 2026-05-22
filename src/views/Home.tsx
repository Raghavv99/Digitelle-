import { Page } from "../App";
import { motion, useScroll, useTransform } from "motion/react";
import { Hero } from "../components/home/Hero";
import { Trust } from "../components/home/Trust";
import { EcosystemFlow } from "../components/home/EcosystemFlow";
import { Features } from "../components/home/Features";
import { JourneyTimeline } from "../components/home/JourneyTimeline";
import { LiveDashboardPreview } from "../components/home/LiveDashboardPreview";
import { Pricing } from "./Pricing";
import { ApiSection } from "../components/home/ApiSection";
import { MarketplacePreview } from "../components/home/MarketplacePreview";
import { Testimonials } from "../components/home/Testimonials";
import { Faq } from "../components/home/Faq";
import { Cta } from "../components/home/Cta";

interface HomeProps {
  navigate: (page: Page) => void;
  openAuth: (view?: "login" | "signup") => void;
}

export function Home({ navigate, openAuth }: HomeProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="flex flex-col relative w-full pt-10">
      {/* Scroll Progress */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-digitelle-purple via-digitelle-cyan to-digitelle-purple z-[100] origin-left"
        style={{ scaleX }}
      />
      
      <Hero openAuth={openAuth} navigate={navigate} />
      <Trust />
      <EcosystemFlow />
      <Features />
      <JourneyTimeline />
      <Pricing />
      <LiveDashboardPreview navigate={navigate} openAuth={openAuth} />
      <ApiSection />
      <MarketplacePreview navigate={navigate} />
      <Testimonials />
      <Faq />
      <Cta openAuth={openAuth} />
    </div>
  );
}
