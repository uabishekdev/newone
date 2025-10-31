import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/hero/HeroSection";
import CowSanctuarySection from "@/components/sections/CowSanctuarySection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import ProductsSection from "@/components/sections/ProductsSection";
import { FarmProvider } from "@/lib/contexts/FarmContext";
import { FarmConfig } from "@/lib/types/farm";

import farmConfigData from "@/app/farms/farmer-joe/config.json";
import StorySection from "@/components/sections/StorySection";

const farmConfig = farmConfigData as FarmConfig;

export default function Home() {
  return (
    <FarmProvider config={farmConfig}>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-green-50 to-orange-100">
        <Header />
        <main className="flex-1 w-full">
          <HeroSection />
          <ProductsSection />
          <StorySection />
          <CowSanctuarySection />
          <TestimonialSection />
        </main>
        <Footer />
      </div>
    </FarmProvider>
  );
}
