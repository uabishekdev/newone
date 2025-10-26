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
      <section className="py-20" style={{ backgroundColor: 'white' }}>
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Image/Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden border-0 shadow-2xl">
                <div 
                  className="h-64 flex items-center justify-center text-white text-center p-8"
                  style={{ backgroundColor: theme.colors.secondary }}
                >
                  <div>
                    <Share2 size={64} className="mx-auto mb-4" />
                    <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: theme.fontDisplay }}>
                      Share Your Farm Story
                    </h3>
                    <p className="text-lg opacity-90">
                      Connect with our community and spread the word about ethical dairy farming
                    </p>
                  </div>
                </div>
                <CardContent className="p-8">
                  <div className="flex justify-center gap-6">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="p-4 rounded-full hover:scale-110 transition-transform"
                      style={{ backgroundColor: '#1877F2' }}
                    >
                      <Facebook size={28} className="text-white" />
                    </button>
                    <button
                      onClick={() => handleShare('instagram')}
                      className="p-4 rounded-full hover:scale-110 transition-transform"
                      style={{ backgroundColor: '#E4405F' }}
                    >
                      <Instagram size={28} className="text-white" />
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="p-4 rounded-full hover:scale-110 transition-transform"
                      style={{ backgroundColor: '#1DA1F2' }}
                    >
                      <Twitter size={28} className="text-white" />
                    </button>
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
              <h2 
                className="text-4xl font-bold mb-4"
                style={{ 
                  fontFamily: theme.fontDisplay,
                  color: theme.colors.brown 
                }}
              >
                Share Your Experience
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Tell us about your experience with {config.name} and help us grow the ethical dairy movement!
              </p>

              <div className="space-y-6">
                <div>
                  <label className="block font-semibold mb-2" style={{ color: theme.colors.brown }}>
                    Your Name
                  </label>
                  <Input
                    type="text"
                    placeholder="Enter your name"
                    value={shareData.name}
                    onChange={(e) => setShareData({ ...shareData, name: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2" style={{ color: theme.colors.brown }}>
                    Email Address
                  </label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    value={shareData.email}
                    onChange={(e) => setShareData({ ...shareData, email: e.target.value })}
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-2" style={{ color: theme.colors.brown }}>
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
                  className="w-full h-14 text-lg"
                  style={{ backgroundColor: theme.colors.primary }}
                  onClick={() => handleShare('submit')}
                >
                  Submit & Share
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  return null;
}
