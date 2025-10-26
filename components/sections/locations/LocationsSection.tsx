'use client';

import { useState } from 'react';
import { useFarm } from '@/lib/contexts/FarmContext';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPin, Search, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

interface LocationsSectionProps {
  variant?: 'map' | 'list';
  data?: any;
}

export function LocationsSection({ variant = 'map', data }: LocationsSectionProps) {
  const { config } = useFarm();
  const theme = config.theme;
  const [searchQuery, setSearchQuery] = useState('');

  const locations = [
    { id: '1', name: 'Downtown Pickup', address: '123 Main St, City Center', distance: '2.3 mi' },
    { id: '2', name: 'Northside Store', address: '456 North Ave, Suburb', distance: '5.7 mi' },
    { id: '3', name: 'Eastside Market', address: '789 East Rd, Eastville', distance: '8.1 mi' },
  ];

  if (variant === 'map') {
    return (
      <section className="py-12 md:py-20" style={{ backgroundColor: theme.colors.cream }}>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <h2 
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
              style={{ 
                fontFamily: theme.fontDisplay,
                color: theme.colors.brown 
              }}
            >
              Find Nearest Pickup
            </h2>
            <p className="text-base md:text-lg text-gray-600">Enter your address or zip code</p>
          </motion.div>

          <div className="max-w-2xl mx-auto mb-8 md:mb-12">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Enter your location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 md:h-14 text-base md:text-lg border-2"
                  style={{ borderColor: theme.colors.secondary }}
                />
              </div>
              <Button 
                size="lg" 
                className="h-12 md:h-14 px-6 md:px-8 text-base md:text-lg"
                style={{ backgroundColor: theme.colors.primary }}
              >
                <Search className="mr-2" size={20} />
                Search
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-100 rounded-2xl h-64 md:h-96 flex items-center justify-center overflow-hidden shadow-lg"
            >
              <div className="text-center p-6">
                <MapPin size={48} className="mx-auto mb-4" style={{ color: theme.colors.primary }} />
                <p className="text-base md:text-lg font-semibold text-gray-700">Interactive Map</p>
                <p className="text-sm text-gray-500 mt-2">(Google Maps integration ready)</p>
              </div>
            </motion.div>

            {/* Locations List */}
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl font-bold mb-4" style={{ color: theme.colors.brown }}>
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
                  <Card className="hover:shadow-xl transition-shadow border-2" style={{ borderColor: theme.colors.cream }}>
                    <CardContent className="p-4 md:p-6">
                      <div className="flex items-start gap-3 md:gap-4">
                        <div 
                          className="p-2 md:p-3 rounded-full flex-shrink-0"
                          style={{ backgroundColor: theme.colors.secondary + '20' }}
                        >
                          <MapPin size={20} style={{ color: theme.colors.secondary }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-base md:text-lg mb-1" style={{ color: theme.colors.brown }}>
                            {location.name}
                          </h4>
                          <p className="text-sm md:text-base text-gray-600 mb-2">{location.address}</p>
                          <p className="text-xs md:text-sm font-semibold" style={{ color: theme.colors.primary }}>
                            {location.distance} away
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="flex-shrink-0"
                          style={{ borderColor: theme.colors.primary, color: theme.colors.primary }}
                        >
                          <Navigation size={16} className="mr-1" />
                          <span className="hidden sm:inline">Directions</span>
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
