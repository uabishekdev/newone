'use client';

import { FarmProvider } from '@/lib/contexts/FarmContext';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionRegistry, SectionType } from '@/components/sections/registry'; 
import { FarmConfig, SectionConfig } from '@/lib/types/farm'; 
import { useEffect, useState } from 'react';

interface GenericSectionProps {
  variant?: string; 
  data?: any;
}

export default function FarmPage({ params }: { params: { farmSlug: string } }) {
  const [farmConfig, setFarmConfig] = useState<FarmConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFarmConfig = async () => {
      setLoading(true); 
      setError(null); 
      try {
        const response = await fetch(`/api/farms/${params.farmSlug}`);
        if (!response.ok) {
           if (response.status === 404) {
             throw new Error('Farm configuration not found.');
           }
           throw new Error(`Failed to fetch farm data: ${response.statusText}`);
        }
        const data: FarmConfig = await response.json(); 
        setFarmConfig(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred while loading farm data.');
        setFarmConfig(null); 
      } finally {
        setLoading(false);
      }
    };

    if (params.farmSlug) {
        loadFarmConfig();
    } else {
        setError("No farm specified.");
        setLoading(false);
    }
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
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Error Loading Farm</h1>
          <p className="text-gray-600 mb-8">{error || 'The requested farm configuration could not be loaded.'}</p>
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
          {farmConfig.sections.map((section: SectionConfig, index: number) => { 
            const sectionType = section.type as SectionType;
            if (!(sectionType in SectionRegistry)) {
                 console.warn(`Section type "${section.type}" not found in registry`);
                 return <div key={`${section.type}-${index}`} className="container mx-auto my-4 p-4 border border-red-500 bg-red-100 text-red-700">Warning: Section type "{section.type}" not found.</div>;
            }

            const SectionComponent = SectionRegistry[sectionType];

            const TypedSectionComponent = SectionComponent as React.FC<GenericSectionProps>;

            return (
              <TypedSectionComponent
                key={`${section.type}-${index}`}
                variant={section.variant} 
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