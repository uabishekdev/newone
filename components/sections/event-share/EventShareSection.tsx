'use client';

import { useState } from 'react';
import { useFarm } from '@/lib/contexts/FarmContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Facebook, Instagram, Twitter, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface EventShareSectionProps {
  variant?: 'card' | 'inline';
  data?: any;
}

export function EventShareSection({ variant = 'card', data }: EventShareSectionProps) {
  const { config } = useFarm();
  const theme = config.theme;
  const [shareData, setShareData] = useState({ name: '', email: '', message: '' });

  const handleShare = (platform: string) => {
    console.log(`Sharing to ${platform}`, shareData);
    alert(`Share to ${platform} feature coming soon!`);
  };

  if (variant === 'card') {
    return (
      <section className="py-12 md:py-20" style={{ backgroundColor: 'white' }}>
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
              Share Your Story
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Connect with our community and spread the word about ethical dairy farming
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 items-center max-w-6xl mx-auto">
            {/* Left Side - Social */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-0 shadow-xl">
                <div 
                  className="p-8 md:p-12 flex items-center justify-center text-white text-center"
                  style={{ backgroundColor: theme.colors.secondary, minHeight: '200px' }}
                >
                  <div>
                    <Share2 size={48} className="mx-auto mb-4" />
                    <h3 className="text-2xl md:text-3xl font-bold mb-3" style={{ fontFamily: theme.fontDisplay }}>
                      Share on Social Media
                    </h3>
                    <p className="text-base md:text-lg opacity-90">
                      Help us spread ethical farming practices
                    </p>
                  </div>
                </div>
                <CardContent className="p-6 md:p-8">
                  <div className="flex justify-center gap-4 md:gap-6">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleShare('facebook')}
                      className="p-3 md:p-4 rounded-full transition-all"
                      style={{ backgroundColor: '#1877F2' }}
                    >
                      <Facebook size={24} className="text-white" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleShare('instagram')}
                      className="p-3 md:p-4 rounded-full transition-all"
                      style={{ backgroundColor: '#E4405F' }}
                    >
                      <Instagram size={24} className="text-white" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleShare('twitter')}
                      className="p-3 md:p-4 rounded-full transition-all"
                      style={{ backgroundColor: '#1DA1F2' }}
                    >
                      <Twitter size={24} className="text-white" />
                    </motion.button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-xl">
                <CardContent className="p-6 md:p-8">
                  <h3 className="text-xl md:text-2xl font-bold mb-6" style={{ color: theme.colors.brown }}>
                    Share Your Experience
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block font-semibold mb-2 text-sm md:text-base" style={{ color: theme.colors.brown }}>
                        Your Name
                      </label>
                      <Input
                        type="text"
                        placeholder="Enter your name"
                        value={shareData.name}
                        onChange={(e) => setShareData({ ...shareData, name: e.target.value })}
                        className="h-11 md:h-12"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-2 text-sm md:text-base" style={{ color: theme.colors.brown }}>
                        Email Address
                      </label>
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={shareData.email}
                        onChange={(e) => setShareData({ ...shareData, email: e.target.value })}
                        className="h-11 md:h-12"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-2 text-sm md:text-base" style={{ color: theme.colors.brown }}>
                        Your Message
                      </label>
                      <Textarea
                        placeholder="Share your story or feedback..."
                        value={shareData.message}
                        onChange={(e) => setShareData({ ...shareData, message: e.target.value })}
                        rows={4}
                        className="resize-none"
                      />
                    </div>

                    <Button 
                      size="lg" 
                      className="w-full h-12 md:h-14 text-base md:text-lg"
                      style={{ backgroundColor: theme.colors.primary }}
                      onClick={() => handleShare('submit')}
                    >
                      Submit & Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
