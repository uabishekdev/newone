'use client';

import { Button } from '@/components/ui/button';
import { useFarm } from '@/lib/contexts/FarmContext';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  variant?: 'image-left' | 'image-right' | 'centered';
  data?: any;
}

export function HeroSection({ variant = 'image-left', data }: HeroSectionProps) {
  const { config } = useFarm();
  const theme = config.theme;

  if (variant === 'image-left') {
    return (
      <section 
        className="relative min-h-[600px] lg:min-h-[700px] flex items-center overflow-hidden"
        style={{ backgroundColor: theme.colors.cream }}
      >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://customer-assets.emergentagent.com/job_multi-dairy/artifacts/uidvyviz_WhatsApp%20Image%202025-10-26%20at%2007.07.44_31a003e8.jpg"
            alt="Farmer Joe's Dairy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white"
            >
              <h1 
                className="text-5xl lg:text-7xl font-bold mb-6 leading-tight"
                style={{ fontFamily: theme.fontDisplay }}
              >
                <span style={{ color: theme.colors.primary }}>RAW MILK</span>
                <br />
                <span className="text-white">PURE - ETHICAL - LOCAL</span>
              </h1>
              
              <p className="text-2xl lg:text-3xl font-semibold mb-8">
                {config.tagline}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="px-8 py-6 text-lg"
                  style={{ 
                    backgroundColor: theme.colors.cream,
                    color: theme.colors.brown 
                  }}
                >
                  View Products
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-8 py-6 text-lg border-2"
                  style={{ 
                    backgroundColor: theme.colors.secondary,
                    color: 'white',
                    borderColor: theme.colors.secondary
                  }}
                >
                  Find Nearest Pickup
                </Button>
              </div>
            </motion.div>

            {/* Right Product Showcase */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:flex items-center justify-end gap-6"
            >
              <div className="relative">
                <img
                  src="https://customer-assets.emergentagent.com/job_multi-dairy/artifacts/roh0bgz9_WhatsApp%20Image%202025-10-25%20at%2015.11.27_b85b7a24.jpg"
                  alt="Raw A2 Milk"
                  className="w-64 h-auto drop-shadow-2xl"
                />
              </div>
              <div className="relative -ml-8">
                <img
                  src="https://customer-assets.emergentagent.com/job_multi-dairy/artifacts/uyn36lsk_WhatsApp%20Image%202025-10-25%20at%2014.54.29_fd1cc6f3.jpg"
                  alt="Farmer Joe Products"
                  className="w-56 h-auto drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
