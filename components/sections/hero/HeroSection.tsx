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
      <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
        {/* Background with overlay */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0"
            style={{ backgroundColor: theme.colors.cream }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/80" />
        </div>

        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center lg:text-left order-2 lg:order-1"
              >
                <h1 
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 leading-tight"
                  style={{ fontFamily: theme.fontDisplay, color: theme.colors.primary }}
                >
                  RAW MILK
                </h1>
                
                <h2 
                  className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4 md:mb-6"
                  style={{ color: theme.colors.brown }}
                >
                  PURE - ETHICAL - LOCAL
                </h2>

                <p 
                  className="text-lg sm:text-xl lg:text-2xl font-semibold mb-6 md:mb-8"
                  style={{ color: theme.colors.brown }}
                >
                  {config.tagline}
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    size="lg" 
                    className="text-base md:text-lg py-6 px-6 md:px-8 shadow-lg hover:shadow-xl transition-shadow"
                    style={{ 
                      backgroundColor: theme.colors.primary,
                      color: 'white'
                    }}
                  >
                    View Products
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="text-base md:text-lg py-6 px-6 md:px-8 border-2 shadow-lg hover:shadow-xl transition-shadow"
                    style={{ 
                      backgroundColor: theme.colors.secondary,
                      color: 'white',
                      borderColor: theme.colors.secondary
                    }}
                  >
                    Find Pickup
                  </Button>
                </div>
              </motion.div>

              {/* Right Product Showcase */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center justify-center order-1 lg:order-2"
              >
                <div className="relative w-full max-w-md">
                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: -2 }}
                      className="bg-white rounded-2xl shadow-xl p-4 transform hover:z-10 transition-all"
                    >
                      <img
                        src="https://customer-assets.emergentagent.com/job_multi-dairy/artifacts/roh0bgz9_WhatsApp%20Image%202025-10-25%20at%2015.11.27_b85b7a24.jpg"
                        alt="Raw A2 Milk"
                        className="w-full h-40 sm:h-48 object-contain"
                      />
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      className="bg-white rounded-2xl shadow-xl p-4 transform hover:z-10 transition-all mt-8"
                    >
                      <img
                        src="https://customer-assets.emergentagent.com/job_multi-dairy/artifacts/bpolvpr8_WhatsApp%20Image%202025-10-25%20at%2015.08.50_7128accb.jpg"
                        alt="Paneer"
                        className="w-full h-40 sm:h-48 object-contain"
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
