import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FarmProvider } from '@/lib/contexts/FarmContext';

const defaultConfig = {
  farmSlug: 'social',
  name: 'Dairy Saathi',
  tagline: 'Pure • Ethical • Local',
  domain: '',
  layout: 'full-width' as const,
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

export default function SocialPage() {
  return (
    <FarmProvider config={defaultConfig}>
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-green-50 to-orange-100">
        <Header />
        <main className="flex-1 w-full flex flex-col items-center justify-center">
          <h1 className="text-5xl font-extrabold mb-6 text-orange-700">Social Media Posting</h1>
          <p className="text-lg text-gray-700 mb-8 max-w-xl text-center">Share your farm updates, photos, and connect with your community. Coming soon!</p>
        </main>
        <Footer />
      </div>
    </FarmProvider>
  );
}
