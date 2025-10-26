'use client';

import { Button } from '@/components/ui/button';
import { useFarm } from '@/lib/contexts/FarmContext';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  variant?: 'image-left' | 'image-right' | 'centered';
  data?: any;
  props?: {
    fullHeight?: boolean;
    spacing?: 'compact' | 'comfortable' | 'spacious';
  };
}

export function HeroSection({ variant = 'centered', data, props }: HeroSectionProps) {
  const { config } = useFarm();
  const theme = config.theme;

  const spacing = props?.spacing === 'compact' ? 'py-8' 
    : props?.spacing === 'comfortable' ? 'py-16'
    : 'py-24';

  const height = props?.fullHeight ? 'min-h-screen' : 'min-h-[500px]';

  return (
    <section className={`relative min-h-[600px] flex items-center justify-center overflow-hidden`}>
      {/* Full-width background image */}
      <img
        src="/images/hero-bg.jpg"
        alt="Farm background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ objectPosition: 'center' }}
      />
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 z-10" />

      <div className="relative z-20 w-full flex flex-col items-center justify-center text-center px-4">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-6xl md:text-7xl font-extrabold mb-4 tracking-tight"
          style={{ color: '#D2691E', fontFamily: theme.fontDisplay }}
        >
          RAW MILK
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-3xl md:text-4xl font-bold mb-8 tracking-wide text-white drop-shadow-lg"
        >
          PURE . ETHICAL . LOCAL
        </motion.h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-2">
          <Button
            size="lg"
            className="bg-white text-gray-900 font-semibold px-8 py-4 rounded-lg shadow hover:bg-orange-100 border border-gray-200"
            style={{ fontFamily: theme.fontDisplay }}
          >
            Meet Farmer Joe
          </Button>
          <Button
            size="lg"
            className="bg-green-700 text-white font-semibold px-8 py-4 rounded-lg shadow hover:bg-green-800 border border-green-700"
            style={{ fontFamily: theme.fontDisplay }}
          >
            Find nearest store
          </Button>
        </div>
      </div>
    </section>
  );
}
