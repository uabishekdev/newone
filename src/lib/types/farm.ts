export interface FarmTheme {
  colors: {
    primary: string;
    secondary: string;
    cream: string;
    brown: string;
    accent?: string;
  };
  fontFamily: string;
  fontDisplay: string;
  borderRadius: string;
}

export interface SectionConfig {
  type: 'hero' | 'about' | 'products' | 'locations' | 'testimonials' | 'sanctuary' | 'distributor' | 'eventShare';
  variant: string;
  data?: any;
}

export interface FarmConfig {
  farmSlug: string;
  name: string;
  tagline: string;
  domain: string;
  layout: 'boxed' | 'full-width';
  sections: SectionConfig[];
  theme: FarmTheme;
  contact: {
    email: string;
    phone: string;
  };
  social: {
    instagram?: string;
    facebook?: string;
    youtube?: string;
    twitter?: string;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  price?: string;
  features?: string[];
}

export interface Location {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  type: 'pickup' | 'store' | 'farm';
}
