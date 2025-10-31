export const COW_SANCTUARY_DONATE_URL =
  "https://ourcowsanctuary.org/?cause=chariti-foundation";
export const COW_SANCTUARY = "https://ourcowsanctuary.org";

export const DEFAULT_SOCIAL_CAPTION =
  "Experience the pure, ethical, and local difference! 🥛✨ No Kill • No Corn • No Soy • No Silage. Visit us today! #RawMilk #EthicalDairy #FarmFresh #LocalFood #DairySaathi";

export const CANVAS_CONFIG = {
  WIDTH: 1080,
  HEIGHT: 1080,
  IMAGE_SCALE: 0.7,
  MARGIN_TOP: 40,
  CAPTION_OFFSET: 60,
  FONT_SIZE: 32,
  FONT_FAMILY: "Inter, sans-serif",
  LINE_HEIGHT: 45,
  MAX_WIDTH_PADDING: 100,
  BACKGROUND_COLOR: "#ffffff",
  TEXT_COLOR: "#2E2E2E",
} as const;

//frames.ts
export interface Frame {
  id: string;
  name: string;
  description: string;
}

export const FRAMES: Frame[] = [
  {
    id: "none",
    name: "No Frame",
    description: "Clean look",
  },
  {
    id: "classic",
    name: "Classic",
    description: "White border",
  },
  {
    id: "polaroid",
    name: "Polaroid",
    description: "Vintage style",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Sleek edge",
  },
  {
    id: "vintage",
    name: "Vintage",
    description: "Retro frame",
  },
  {
    id: "wood",
    name: "Wooden",
    description: "Rustic charm",
  },
];
