'use client';

import { useState } from 'react';
import { useFarm } from '@/lib/contexts/FarmContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

interface DistributorSectionProps {
  variant?: 'form' | 'compact';
  data?: any;
}

export function DistributorSection({ variant = 'form', data }: DistributorSectionProps) {
  const { config } = useFarm();
  const theme = config.theme;
  
  const [formData, setFormData] = useState({
    businessName: '',
    contactName: '',
    email: '',
    phone: '',
    location: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Distributor signup:', formData);
    // Mock API call
    alert('Thank you! We will contact you soon.');
    setFormData({ businessName: '', contactName: '', email: '', phone: '', location: '', message: '' });
  };

  if (variant === 'form') {
    return (
      <section 
        className="py-20"
        style={{ backgroundColor: theme.colors.secondary + '15' }}
      >
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
              Become a Distributor
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Join our network of ethical dairy distributors and bring {config.name} products to your community
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Left - Benefits */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <Building2 size={48} className="mb-4" style={{ color: theme.colors.primary }} />
                  <h3 className="text-2xl font-bold mb-3" style={{ color: theme.colors.brown }}>
                    Why Partner With Us?
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="text-2xl" style={{ color: theme.colors.secondary }}>✓</span>
                      <span>Premium quality raw A2 milk products</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl" style={{ color: theme.colors.secondary }}>✓</span>
                      <span>No kill, no corn, no soy - ethical farming practices</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl" style={{ color: theme.colors.secondary }}>✓</span>
                      <span>Competitive distributor pricing</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl" style={{ color: theme.colors.secondary }}>✓</span>
                      <span>Marketing and promotional support</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-2xl" style={{ color: theme.colors.secondary }}>✓</span>
                      <span>Growing demand for clean dairy products</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold mb-4" style={{ color: theme.colors.brown }}>
                    Contact Information
                  </h3>
                  <div className="space-y-3 text-gray-700">
                    <div className="flex items-center gap-3">
                      <Mail size={20} style={{ color: theme.colors.primary }} />
                      <span>{config.contact.email}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone size={20} style={{ color: theme.colors.primary }} />
                      <span>{config.contact.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="border-0 shadow-xl">
                <CardHeader style={{ backgroundColor: theme.colors.primary }} className="text-white">
                  <CardTitle className="text-2xl">Distributor Application</CardTitle>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block font-semibold mb-2" style={{ color: theme.colors.brown }}>
                        Business Name *
                      </label>
                      <Input
                        type="text"
                        placeholder="Your business name"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        required
                        className="h-12"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: theme.colors.brown }}>
                        Contact Name *
                      </label>
                      <Input
                        type="text"
                        placeholder="Your full name"
                        value={formData.contactName}
                        onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                        required
                        className="h-12"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold mb-2" style={{ color: theme.colors.brown }}>
                          Email *
                        </label>
                        <Input
                          type="email"
                          placeholder="email@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="h-12"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-2" style={{ color: theme.colors.brown }}>
                          Phone *
                        </label>
                        <Input
                          type="tel"
                          placeholder="(555) 123-4567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: theme.colors.brown }}>
                        Location *
                      </label>
                      <Input
                        type="text"
                        placeholder="City, State"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        required
                        className="h-12"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-2" style={{ color: theme.colors.brown }}>
                        Tell us about your business
                      </label>
                      <Textarea
                        placeholder="Share details about your distribution network, target markets, etc."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        rows={4}
                        className="resize-none"
                      />
                    </div>

                    <Button 
                      type="submit"
                      size="lg" 
                      className="w-full h-14 text-lg"
                      style={{ backgroundColor: theme.colors.secondary }}
                    >
                      Submit Application
                    </Button>
                  </form>
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
