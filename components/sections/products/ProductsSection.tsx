'use client';

import { useFarm } from '@/lib/contexts/FarmContext';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types/farm';
import { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductsSectionProps {
  variant?: 'grid' | 'carousel' | 'list';
  data?: {
    products: Product[];
  };
}

export function ProductsSection({ variant = 'carousel', data }: ProductsSectionProps) {
  const { config } = useFarm();
  const theme = config.theme;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const products = data?.products || [
    {
      id: '1',
      name: 'Raw A2 Milk',
      description: 'No Corn • No Soy',
      image: 'https://customer-assets.emergentagent.com/job_multi-dairy/artifacts/roh0bgz9_WhatsApp%20Image%202025-10-25%20at%2015.11.27_b85b7a24.jpg'
    },
    {
      id: '2',
      name: 'Raw A2 Ghee',
      description: '100% Pure',
      image: 'https://customer-assets.emergentagent.com/job_multi-dairy/artifacts/uyn36lsk_WhatsApp%20Image%202025-10-25%20at%2014.54.29_fd1cc6f3.jpg'
    },
    {
      id: '3',
      name: 'Sheep Milk',
      description: 'Premium Quality',
      image: 'https://customer-assets.emergentagent.com/job_multi-dairy/artifacts/uyn36lsk_WhatsApp%20Image%202025-10-25%20at%2014.54.29_fd1cc6f3.jpg'
    },
    {
      id: '4',
      name: 'Goat Milk',
      description: 'Farm Fresh',
      image: 'https://customer-assets.emergentagent.com/job_multi-dairy/artifacts/uyn36lsk_WhatsApp%20Image%202025-10-25%20at%2014.54.29_fd1cc6f3.jpg'
    }
  ];

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setActiveIndex((current) => (current + 1) % Math.max(0, products.length - 3));
      }, 3000);
      return () => clearInterval(timer);
    }
  }, [isHovered, products.length]);

  return (
    <section 
      className="py-8 md:py-12 bg-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 
            className="text-2xl sm:text-3xl font-bold mb-3"
            style={{ 
              fontFamily: theme.fontDisplay,
              color: theme.colors.brown 
            }}
          >
            Our Products
          </h2>
          <div className="w-16 h-0.5 mx-auto mb-3" style={{ backgroundColor: theme.colors.secondary }} />
          <p className="text-sm md:text-base text-gray-600 max-w-xl mx-auto">
            Premium quality dairy products from grass-fed, ethically raised cows
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-all duration-500 ease-in-out -mx-2"
            style={{ transform: `translateX(-${activeIndex * 25}%)` }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                className="w-full sm:w-1/2 md:w-1/4 flex-none px-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-white shadow-sm hover:shadow-md transition-all duration-200">
                  <CardContent className="p-3">
                    <div className="aspect-square mb-3 bg-gray-50 rounded-lg overflow-hidden">
                      <img 
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-2"
                      />
                    </div>
                    <h3 
                      className="font-semibold text-sm mb-1"
                      style={{ color: theme.colors.brown }}
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setActiveIndex(Math.max(0, activeIndex - 1))}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white disabled:opacity-50"
            disabled={activeIndex === 0}
            style={{ color: theme.colors.primary }}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setActiveIndex(Math.min(products.length - 4, activeIndex + 1))}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow-md hover:bg-white disabled:opacity-50"
            disabled={activeIndex >= products.length - 4}
            style={{ color: theme.colors.primary }}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
