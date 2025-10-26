'use client';

import { useFarm } from '@/lib/contexts/FarmContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Product } from '@/lib/types/farm';

interface ProductsSectionProps {
  variant?: 'grid' | 'carousel' | 'list';
  data?: {
    products: Product[];
  };
}

export function ProductsSection({ variant = 'grid', data }: ProductsSectionProps) {
  const { config } = useFarm();
  const theme = config.theme;

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
    },
    {
      id: '5',
      name: 'Paneer',
      description: 'Handcrafted A2',
      image: 'https://customer-assets.emergentagent.com/job_multi-dairy/artifacts/bpolvpr8_WhatsApp%20Image%202025-10-25%20at%2015.08.50_7128accb.jpg'
    },
    {
      id: '6',
      name: 'Pinni',
      description: 'Traditional',
      image: 'https://customer-assets.emergentagent.com/job_multi-dairy/artifacts/uyn36lsk_WhatsApp%20Image%202025-10-25%20at%2014.54.29_fd1cc6f3.jpg'
    }
  ];

  if (variant === 'grid') {
    return (
      <section 
        className="py-12 md:py-20"
        style={{ backgroundColor: 'white' }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{ 
                fontFamily: theme.fontDisplay,
                color: theme.colors.brown 
              }}
            >
              Our Products
            </h2>
            <div className="w-20 h-1 mx-auto mb-4" style={{ backgroundColor: theme.colors.secondary }} />
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Premium quality dairy products from grass-fed, ethically raised cows
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card className="border-2 shadow-md hover:shadow-2xl transition-all duration-300 h-full" style={{ borderColor: theme.colors.cream }}>
                  <CardContent className="p-3 md:p-4 flex flex-col h-full">
                    <div className="bg-gray-50 rounded-xl mb-3 p-2 flex items-center justify-center" style={{ minHeight: '140px' }}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-contain"
                      />
                    </div>
                    <h3 
                      className="text-sm md:text-base font-bold text-center mb-1 md:mb-2"
                      style={{ color: theme.colors.brown }}
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs md:text-sm text-center text-gray-600">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2"
              style={{ 
                borderColor: theme.colors.brown,
                color: theme.colors.brown
              }}
            >
              View All Products
            </Button>
            <Button 
              size="lg"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Find Store Near You
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
