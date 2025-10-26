🧭 Dairy Saathi
Config-Driven Multi-Farm Landing Page Platform

A scalable, future-proof web framework enabling multiple dairy farms to share a unified Next.js 14 codebase—while each farm enjoys a distinct theme, layout, and identity, powered entirely by configuration.

🌟 Overview
✨ Core Principles

Config-Driven UI – Each farm is fully defined by a JSON configuration (layout, theme, and content sections).

Composable Sections – A section registry enables mix-and-match layouts (Hero, Products, etc.) with pluggable variants.

Dynamic Theming – Per-farm color palettes, fonts, and border radii applied through React context.

Layout Variants – Sections can have multiple design and animation styles.

Full SSR/ISR – Built on Next.js App Router for speed and SEO.

🧱 Architecture & Tech Stack
Layer	Tech	Purpose
Frontend	Next.js 14 (App Router), React 18, TypeScript	Core UI rendering
Styling	Tailwind CSS + shadcn/ui + Framer Motion	Theming, components, animations
Backend	Next.js API Routes	Config + mock endpoints
Database (Future)	MongoDB	Content persistence
Deployment	Vercel	Zero-config hosting and per-domain mapping
🗂 Project Structure
app/
├── [farmSlug]/page.tsx         # Dynamic renderer for farm pages
├── layout.tsx                  # Global layout
├── globals.css                 # Tailwind & base styles
├── api/[[...path]]/route.ts    # API routes
├── farms/                      # Farm-specific configs
│   └── farmer-joe/
│       ├── config.json
│       └── theme.ts
components/
├── sections/                   # Modular content blocks
│   ├── hero/
│   ├── products/
│   ├── locations/
│   ├── event-share/
│   ├── distributor/
│   └── registry.ts
├── layout/                     # Header, Footer
└── ui/                         # shadcn primitives
lib/
├── contexts/FarmContext.tsx    # Provides farm theme/config
├── types/farm.ts               # TypeScript interfaces
├── db.ts                       # MongoDB connector (optional)
└── utils.ts                    # Shared helpers

⚙️ Config System

Each farm lives in /app/farms/{farmSlug}/config.json:

{
  "farmSlug": "farmer-joe",
  "name": "Farmer Joe's Dairy",
  "tagline": "No Kill, No Soy, No Corn, No Silage – No Bullshit",
  "domain": "farmerjoe.com",
  "layout": "boxed",
  "sections": [
    { "type": "hero", "variant": "image-left" },
    { "type": "products", "variant": "grid" },
    { "type": "locations", "variant": "map" },
    { "type": "eventShare", "variant": "card" },
    { "type": "distributor", "variant": "form" }
  ],
  "theme": {
    "colors": {
      "primary": "#D2691E",
      "secondary": "#5E9A5C",
      "cream": "#FCFCF9",
      "brown": "#5E5240"
    },
    "fontFamily": "Inter, sans-serif",
    "fontDisplay": "Poppins, sans-serif",
    "borderRadius": "12px"
  },
  "contact": {
    "email": "hello@farmerjoe.com",
    "phone": "(555) 123-MILK"
  },
  "social": {
    "instagram": "@farmerjoe_dairy",
    "facebook": "Farmer Joe Dairy",
    "youtube": "Farmer Joe Stories"
  }
}

🧩 Section System
Section	Variants	Description
Hero	image-left, image-right, centered	Configurable CTAs and imagery
Products	grid, carousel, list	Product presentation layouts
Locations	map, list	Pickup / store finder (distance-sorted)
Event Share	card, inline	User-submitted social posts
Distributor	form, compact	B2B onboarding

Each section component reads variant-specific props and renders accordingly.
Animations and filler assets (illustrations, motion effects, decorative icons) are registered per variant—allowing radically different visual expressions without code duplication.

🎨 Theme Context Example
import { useFarm } from '@/lib/contexts/FarmContext';

export function Banner() {
  const { config } = useFarm();
  const { colors, fontDisplay } = config.theme;

  return (
    <div style={{ backgroundColor: colors.primary }}>
      <h1 style={{ fontFamily: fontDisplay }}>{config.name}</h1>
    </div>
  );
}

🔌 API Endpoints
Method	Endpoint	Purpose
GET	/api/farms/:farmSlug	Retrieve farm config
GET	/api/products?farmSlug=x	Fetch products
GET	/api/locations?farmSlug=x	Fetch store/pickup points (sorted by nearest distance)
POST	/api/distributor-signup	Submit distributor application
POST	/api/event-share	Submit shared experience

Location Finder:
User inputs their full address (autofilled via browser geolocation + Google Places) — nearest locations are calculated client-side for now.

🛠️ Adding a New Farm

Create directory:

mkdir app/farms/sunshine-dairy


Add config.json + optional theme.ts.

Register in API route (if needed).

Access via http://localhost:3000/sunshine-dairy.

🧪 Development Flow
Add a New Section
mkdir components/sections/testimonial
touch components/sections/testimonial/Testimonial.tsx

export function Testimonial({ variant, data }) {
  // logic
  return <section>...</section>;
}


Register it:

import { Testimonial } from './testimonial/Testimonial';

export const SectionRegistry = {
  ...,
  testimonial: Testimonial
};


Use in a farm config:

{ "type": "testimonial", "variant": "carousel" }

🗺️ Roadmap
Phase	Goals
1️⃣ Current	Config architecture, 5 base sections, theming, Farmer Joe demo
2️⃣ Next	Google Maps API, Firestore/Firebase forms, new “About” & “Story” sections
3️⃣ Future	Multi-language support, E-commerce, Blog, Admin config editor, Analytics
🚀 Deployment
Vercel (Recommended)
yarn build && vercel


Environment Variables:

MONGO_URL=mongodb://localhost:27017/dairy-saathi
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here


Domain mapping in Vercel:

farmerjoe.com → /farmer-joe
invictusdairy.com → /invictus
gokuldairy.com → /gokul

📦 Dependencies

Core: Next 14, React 18, TypeScript 5.9

Styling: Tailwind CSS 3.4, shadcn/ui, Framer Motion

UI Tools: Radix UI, Lucide Icons

Data (optional): MongoDB 6.6

👥 Credits

Built with ❤️ for ethical dairy farming.
Flagship demo: Farmer Joe’s Dairy — showcasing cruelty-free, grass-fed, A2 milk practices.

📧 support@dairysaathi.com

🔗 GitHub Issues — coming soon

🧾 License

Proprietary – All Rights Reserved