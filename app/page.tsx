import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/hero/HeroSection';
import CowSanctuarySection from '@/components/sections/CowSanctuarySection';
import TestimonialSection from '@/components/sections/TestimonialSection';
import RedBannerSection from '@/components/sections/RedBannerSection';
import ProductsSection from '@/components/sections/ProductsSection';
import TaglineBannerSection from '@/components/sections/TaglineBannerSection';
import StorySection from '@/components/sections/StorySection';
import { FarmProvider } from '@/lib/contexts/FarmContext';

const defaultConfig = {
  farmSlug: 'homepage',
  name: 'Dairy Saathi',
  tagline: 'Pure • Ethical • Local',
  domain: '',
  layout: "full-width" as const,
  sections: [],
  theme: {
    colors: {
      primary: '#D2691E',
      secondary: '#228B22',
      cream: '#FFFDD0',
      brown: '#8B4513',
      accent: '#FF9800',
    },
    fontFamily: 'Inter, sans-serif',
    fontDisplay: 'Montserrat, sans-serif',
    borderRadius: '0.75rem',
  },
  contact: {
    email: '',
    phone: '',
  },
  social: {},
};

export default function Home() {
  return (
    <FarmProvider config={defaultConfig}>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-green-50 to-orange-100">
        <Header />
        <main className="flex-1 w-full">
          <HeroSection />
          <TaglineBannerSection />
          <ProductsSection />
          <RedBannerSection />
          <CowSanctuarySection />
          <TestimonialSection />
          <StorySection />
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center py-12">
            <a href="/social" className="bg-orange-600 text-white font-semibold px-8 py-4 rounded-lg shadow hover:bg-orange-700 transition text-lg">Social Media Posting</a>
            <a href="/distributor" className="bg-green-700 text-white font-semibold px-8 py-4 rounded-lg shadow hover:bg-green-800 transition text-lg">Distributor Portal</a>
            <a href="/locator" className="bg-black text-white font-semibold px-8 py-4 rounded-lg shadow hover:bg-gray-800 transition text-lg">Store Locator</a>
          </div>
        </main>
        <Footer />
      </div>
    </FarmProvider>
  );
}
