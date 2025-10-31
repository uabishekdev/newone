export interface FarmTheme {
  colors: {
    primary: string;
    secondary: string;
    cream: string;
    brown: string;
    accent?: string;
    background?: string;
    surface?: string;
    danger?: string;
    heroHeading?: string;
    heroButton?: string;
    heroBanner?: string;
    quote?: string;
  };
  fontFamily: string;
  fontDisplay: string;
  borderRadius: string;
  heroGradient?: string;
  spacing?: {
    section?: {
      compact?: string;
      medium?: string;
      large?: string;
    };
    container?: {
      small?: string;
      medium?: string;
      large?: string;
    };
  };
  maxWidth?: {
    narrow?: string;
    container?: string;
    wide?: string;
  };
  layout?: {
    productImage?: {
      small?: string;
      medium?: string;
      large?: string;
    };
  };
}

export interface ProductItem {
  id: string;
  name: string;
  image: string;
  sizes?: string[];
  price?: string;
  description?: string;
  features?: string[];
}

export interface SectionConfig {
  type:
    | "hero"
    | "about"
    | "products"
    | "locations"
    | "testimonials"
    | "sanctuary"
    | "distributor"
    | "eventShare";
  variant: string;
  props?: any;
  data?: any;
}

export interface FarmConfig {
  farmSlug: string;
  name: string;
  tagline: string;
  domain: string;
  layout: "boxed" | "full-width";
  sections: SectionConfig[];
  products?: ProductItem[];
  theme: FarmTheme;
  contact: {
    email: string;
    phone: string;
    address?: {
      line1: string;
      cityState: string;
    };
  };
  social: {
    name: string;
    url: string;
    image: string;
  }[];
  footerLinks?: {
    title: string;
    href: string;
  }[];
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
  type: "pickup" | "store" | "farm";
}
