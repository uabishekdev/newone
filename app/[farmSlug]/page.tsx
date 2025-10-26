'use client';

import { FarmProvider } from '@/lib/contexts/FarmContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionRegistry } from '@/components/sections/registry';
import { FarmConfig } from '@/lib/types/farm';
import { useEffect, useState } from 'react';

export default function FarmPage({ params }: { params: { farmSlug: string } }) {
  const [farmConfig, setFarmConfig] = useState<FarmConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFarmConfig = async () => {
      try {
        const response = await fetch(`/api/farms/${params.farmSlug}`);
        if (!response.ok) {
          throw new Error('Farm not found');
        }
        const data = await response.json();
        setFarmConfig(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load farm');
      } finally {
        setLoading(false);
      }
    };

    loadFarmConfig();
  }, [params.farmSlug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-orange-500 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-700">Loading farm...</p>
        </div>
      </div>
    );
  }

  if (error || !farmConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Farm Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The requested farm does not exist.'}</p>
          <a href="/" className="text-orange-600 hover:underline font-semibold">
            Return to Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <FarmProvider config={farmConfig}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          {farmConfig.sections.map((section, index) => {
            const SectionComponent = SectionRegistry[section.type as keyof typeof SectionRegistry];
            if (!SectionComponent) {
              console.warn(`Section type "${section.type}" not found in registry`);
              return null;
            }
            return (
              <SectionComponent
                key={`${section.type}-${index}`}
                variant={section.variant as any}
                data={section.data}
              />
            );
          })}
        </main>
        <Footer />
      </div>
    </FarmProvider>
  );
}
