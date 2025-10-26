'use client';

import React, { createContext, useContext } from 'react';
import { FarmConfig } from '@/lib/types/farm';

interface FarmContextType {
  config: FarmConfig;
}

const FarmContext = createContext<FarmContextType | null>(null);

export function FarmProvider({ config, children }: { config: FarmConfig; children: React.ReactNode }) {
  return (
    <FarmContext.Provider value={{ config }}>
      {children}
    </FarmContext.Provider>
  );
}

export function useFarm() {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarm must be used within FarmProvider');
  }
  return context;
}
