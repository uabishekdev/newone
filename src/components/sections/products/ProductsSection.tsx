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
      description: '100% Pure Grass-Fed',
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
      name: 'Raw Goat Milk',
      description: 'Farm Fresh',
      image: 'https://customer-assets.emergentagent.com/job_multi-dairy/artifacts/uyn36lsk_WhatsApp%20Image%202025-10-25%20at%2014.54.29_fd1cc6f3.jpg'
    },
    {
      id: '5',
      name: 'Paneer',
      description: 'Handcrafted from A2 Cow Milk',
      image: 'https://customer-assets.emergentagent.com/job_multi-dairy/artifacts/bpolvpr8_WhatsApp%20Image%202025-10-25%20at%2015.08.50_7128accb.jpg'
    },
    {
      id: '6',
      name: 'Pinni',
      description: 'Traditional Recipe',
      image: 'https://customer-assets.emergentagent.com/job_multi-dairy/artifacts/uyn36lsk_WhatsApp%20Image%202025-10-25%20at%2014.54.29_fd1cc6f3.jpg'
    }
  ];

  if (variant === 'grid') {
    return (
      <section 
        className="py-20"
        style={{ backgroundColor: 'white' }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 
              className="text-5xl font-bold mb-4"
              style={{ 
                fontFamily: theme.fontDisplay,
                color: theme.colors.brown 
              }}
            >
              Our Products
            </h2>
            <div className="w-24 h-1 mx-auto" style={{ backgroundColor: theme.colors.secondary }} />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-4">
                    <div className="aspect-square mb-4 bg-white rounded-lg overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 
                      className="text-lg font-bold text-center mb-2"
                      style={{ color: theme.colors.brown }}
                    >
                      {product.name}
                    </h3>
                    <p className="text-sm text-center text-gray-600">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-4">
            <Button 
              variant="outline" 
              size="lg"
              style={{ 
                borderColor: theme.colors.brown,
                color: theme.colors.brown
              }}
            >
              View All
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
