import { HeroSection } from "./hero/HeroSection";
import { LocationsSection } from "./locations/LocationsSection";
import { EventShareSection } from "./event-share/EventShareSection";
import { DistributorSection } from "./distributor/DistributorSection";

export const SectionRegistry = {
  hero: HeroSection,
  locations: LocationsSection,
  eventShare: EventShareSection,
  distributor: DistributorSection,
} as const;

export type SectionType = keyof typeof SectionRegistry;
