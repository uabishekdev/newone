'use client';

import { useState } from 'react';
import { useFarm } from '@/lib/contexts/FarmContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Search } from 'lucide-react';
import { motion } from 'framer-motion';

interface LocationsSectionProps {
  variant?: 'map' | 'list';
  data?: any;
}

export function LocationsSection({ variant = 'map', data }: LocationsSectionProps) {
  const { config } = useFarm();
  const theme = config.theme;
  const [searchQuery, setSearchQuery] = useState('');

  // Mock locations data
  const locations = [
    { id: '1', name: 'Downtown Pickup Point', address: '123 Main St, City Center', distance: '2.3 mi' },
    { id: '2', name: 'Northside Farm Store', address: '456 North Ave, Suburb', distance: '5.7 mi' },
    { id: '3', name: 'Eastside Market', address: '789 East Rd, Eastville', distance: '8.1 mi' },
  ];

  if (variant === 'map') {
    return (
      <section className="py-20" style={{ backgroundColor: theme.colors.cream }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 
              className="text-5xl font-bold mb-4"
              style={{ 
                fontFamily: theme.fontDisplay,
                color: theme.colors.brown 
              }}
            >
              Find Nearest Pickup
            </h2>
            <p className="text-lg text-gray-600 mb-8">Enter your address or zip code</p>
          </motion.div>

          <div className="max-w-2xl mx-auto mb-12">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Enter your location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg border-2"
                  style={{ borderColor: theme.colors.secondary }}
                />
              </div>
              <Button 
                size="lg" 
                className="h-14 px-8"
                style={{ backgroundColor: theme.colors.primary }}
              >
                Go
              </Button>
            </div>
          </div>

          {/* Mock Map */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-gray-200 rounded-2xl h-96 flex items-center justify-center overflow-hidden">
              <div className="text-center">
                <MapPin size={64} className="mx-auto mb-4" style={{ color: theme.colors.primary }} />
                <p className="text-gray-600 font-semibold">Google Maps Integration</p>
                <p className="text-sm text-gray-500">(Mock - API key required)</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold mb-4" style={{ color: theme.colors.brown }}>
                Nearby Locations
              </h3>
              {locations.map((location, index) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div 
                          className="p-3 rounded-full"
                          style={{ backgroundColor: theme.colors.secondary + '20' }}
                        >
                          <MapPin size={24} style={{ color: theme.colors.secondary }} />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-lg mb-1" style={{ color: theme.colors.brown }}>
                            {location.name}
                          </h4>
                          <p className="text-gray-600 mb-2">{location.address}</p>
                          <p className="text-sm font-semibold" style={{ color: theme.colors.primary }}>
                            {location.distance} away
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          style={{ borderColor: theme.colors.primary, color: theme.colors.primary }}
                        >
                          Get Directions
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
