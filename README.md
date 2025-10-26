# 🧭 Dairy Saathi - Config-Driven Multi-Farm Landing Page System

A scalable, future-proof web platform where multiple dairy farms share a unified Next.js 14 codebase, each with unique themes, imagery, and layouts—all powered by JSON configuration.

## 🌟 Features

### Core Architecture
- **Config-Driven Design**: Each farm defined by a JSON config file
- **Section Registry Pattern**: Modular, reusable section components
- **Dynamic Theme System**: Per-farm color schemes, fonts, and styling
- **Variant Support**: Multiple layout variants per section type
- **Server-Side Rendering**: Next.js 14 App Router for optimal performance

### Built-In Sections
1. **Hero** - Image-left/right/centered variants with CTAs
2. **Products** - Grid/carousel/list layouts for dairy products
3. **Locations** - Map integration for pickup/store finder
4. **Event Share** - Social media integration and community engagement
5. **Distributor** - B2B signup forms with benefits showcase

### Tech Stack
- **Frontend**: Next.js 14 (App Router), TypeScript, React 18
- **Styling**: Tailwind CSS + shadcn/ui components
- **Animations**: Framer Motion
- **Backend**: Next.js API Routes
- **Database**: MongoDB (ready for integration)
- **Deployment**: Vercel-ready

---

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build
```

### Access Points
- **Home**: `http://localhost:3000` - Farm directory
- **Farmer Joe**: `http://localhost:3000/farmer-joe` - Live demo farm
- **API**: `http://localhost:3000/api/farms/{farmSlug}` - Farm config endpoint

---

## 📁 Project Structure

```
/app
├── app/
│   ├── [farmSlug]/page.tsx       # Dynamic farm renderer
│   ├── page.tsx                   # Home/directory page
│   ├── layout.tsx                 # Root layout
│   ├── globals.css                # Global styles
│   ├── api/[[...path]]/route.ts   # API routes
│   └── farms/                     # Farm configurations
│       └── farmer-joe/
│           ├── config.json        # Farm config
│           └── theme.ts           # Theme definition
│
├── components/
│   ├── sections/                  # Content sections
│   │   ├── hero/
│   │   ├── products/
│   │   ├── locations/
│   │   ├── event-share/
│   │   ├── distributor/
│   │   └── registry.ts            # Section registry
│   ├── layout/                    # Header/Footer
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   └── ui/                        # shadcn components
│       ├── button.tsx
│       ├── card.tsx
│       ├── input.tsx
│       └── textarea.tsx
│
├── lib/
│   ├── types/
│   │   └── farm.ts                # TypeScript interfaces
│   ├── contexts/
│   │   └── FarmContext.tsx        # Farm config provider
│   ├── db.ts                      # MongoDB connection
│   └── utils.ts                   # Utility functions
│
└── package.json
```

---

## ⚙️ Configuration System

### Farm Config Structure

Each farm is defined in `/app/farms/{farmSlug}/config.json`:

```json
{
  "farmSlug": "farmer-joe",
  "name": "Farmer Joe's Dairy",
  "tagline": "No Kill, No Soy, No Corn, No Silage - No Bullshit",
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
```

### Section Variants

**Hero Section**:
- `image-left` - Image on left, content on right
- `image-right` - Image on right, content on left
- `centered` - Centered content with background

**Products Section**:
- `grid` - Product grid layout (6 columns)
- `carousel` - Scrollable carousel
- `list` - Vertical list layout

**Locations Section**:
- `map` - Interactive map with search
- `list` - Simple location list

**Event Share Section**:
- `card` - Card-based social sharing
- `inline` - Compact inline form

**Distributor Section**:
- `form` - Full application form with benefits
- `compact` - Minimal signup form

---

## 🎨 Theme System

Themes are applied dynamically using inline styles and the FarmContext:

```tsx
import { useFarm } from '@/lib/contexts/FarmContext';

function MyComponent() {
  const { config } = useFarm();
  const theme = config.theme;
  
  return (
    <div style={{ backgroundColor: theme.colors.primary }}>
      <h1 style={{ fontFamily: theme.fontDisplay }}>
        {config.name}
      </h1>
    </div>
  );
}
```

---

## 🔌 API Endpoints

### GET `/api/farms/:farmSlug`
Returns farm configuration

**Response:**
```json
{
  "farmSlug": "farmer-joe",
  "name": "Farmer Joe's Dairy",
  "sections": [...],
  "theme": {...}
}
```

### GET `/api/products?farmSlug=farmer-joe`
Returns farm products

### GET `/api/locations?farmSlug=farmer-joe`
Returns pickup/store locations

### POST `/api/distributor-signup`
Submit distributor application

**Body:**
```json
{
  "businessName": "ABC Distributors",
  "contactName": "John Doe",
  "email": "john@abc.com",
  "phone": "(555) 123-4567",
  "location": "Chicago, IL",
  "message": "Interested in partnership"
}
```

### POST `/api/event-share`
Submit event/experience share

---

## 🧩 Adding a New Farm

1. **Create farm directory**:
```bash
mkdir app/farms/new-farm
```

2. **Create config file** (`app/farms/new-farm/config.json`):
```json
{
  "farmSlug": "new-farm",
  "name": "New Farm Dairy",
  "tagline": "Fresh & Local",
  "sections": [...],
  "theme": {...}
}
```

3. **Update API route** (`app/api/[[...path]]/route.ts`):
```typescript
const farmConfigs: Record<string, any> = {
  'farmer-joe': { /* ... */ },
  'new-farm': { /* ... */ },
};
```

4. **Access**: Navigate to `http://localhost:3000/new-farm`

---

## 🛠️ Development

### Adding New Sections

1. **Create section component**:
```bash
mkdir components/sections/my-section
touch components/sections/my-section/MySection.tsx
```

2. **Implement component**:
```tsx
import { useFarm } from '@/lib/contexts/FarmContext';

export function MySection({ variant, data }) {
  const { config } = useFarm();
  // Component logic
  return <section>...</section>;
}
```

3. **Register in registry** (`components/sections/registry.ts`):
```typescript
import { MySection } from './my-section/MySection';

export const SectionRegistry = {
  // ... existing sections
  mySection: MySection,
};
```

4. **Use in farm config**:
```json
{
  "sections": [
    { "type": "mySection", "variant": "default" }
  ]
}
```

---

## 🎯 Roadmap

### Phase 1 (Current) ✅
- Config-driven architecture
- 5 core sections (Hero, Products, Locations, Event Share, Distributor)
- Dynamic theming
- Farmer Joe demo farm

### Phase 2 (Next)
- Google Maps API integration
- Firebase/Firestore for form submissions
- About/Story section
- Testimonials section
- Cow Sanctuary section

### Phase 3 (Future)
- Multi-language support
- E-commerce integration
- Blog/News section
- Admin dashboard for config management
- Analytics integration

---

## 📦 Dependencies

### Core
- **next**: 14.2.3
- **react**: 18
- **typescript**: 5.9.3
- **tailwindcss**: 3.4.1

### UI Components
- **@radix-ui/react-\***: shadcn/ui primitives
- **lucide-react**: Icon library
- **framer-motion**: Animations

### Backend
- **mongodb**: 6.6.0 (for future integration)

---

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Build
yarn build

# Deploy
vercel

# Add environment variables in Vercel dashboard:
# - MONGO_URL
# - NEXT_PUBLIC_BASE_URL
```

### Custom Domains
Configure in Vercel:
- `farmerjoe.com` → `/farmer-joe`
- `invictusdairy.com` → `/invictus`
- `gokuldairy.com` → `/gokul`

---

## 🔐 Environment Variables

Create `.env` file:

```bash
# MongoDB Connection
MONGO_URL=mongodb://localhost:27017/dairy-saathi

# Base URL
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Google Maps (optional)
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here

# Firebase (optional)
NEXT_PUBLIC_FIREBASE_API_KEY=your_key_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
```

---

## 🧪 Testing

```bash
# Run development server
yarn dev

# Test API endpoints
curl http://localhost:3000/api/farms/farmer-joe

# Test farm page
open http://localhost:3000/farmer-joe
```

---

## 📝 License

Proprietary - All rights reserved

---

## 👥 Credits

Built with ❤️ for ethical dairy farming

**Farmer Joe's Dairy** - Our flagship demo farm showcasing premium A2 milk products with no-kill, grass-fed practices.

---

## 📞 Support

For questions or issues:
- Email: support@dairysaathi.com
- GitHub Issues: [Create an issue](#)

---

**Note**: This is a config-driven system. Mock data is currently used for demonstration. Connect to your NestJS backend or Firebase for production use.
