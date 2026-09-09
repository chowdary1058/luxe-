export interface Specification {
  engine: string;
  horsepower: number;
  torque: string;
  acceleration: number; // 0-60 in seconds
  topSpeed: number; // mph
  transmission: string;
  driveType: string;
  fuelType: 'Gasoline' | 'Hybrid' | 'Electric';
  rangeKm?: number;
  batteryKwh?: number;
  weightKg: number;
}

export interface ExteriorColorOption {
  name: string;
  hex: string;
  metallicHex: string;
  priceDelta: number;
  finish: 'Metallic' | 'Satin' | 'Matte' | 'Pearl';
}

export interface WheelOption {
  id: string;
  name: string;
  size: string;
  finish: string;
  priceDelta: number;
  image?: string;
}

export interface InteriorOption {
  id: string;
  name: string;
  material: string;
  primaryColorHex: string;
  accentColorHex: string;
  priceDelta: number;
}

export interface Vehicle {
  id: string;
  slug: string;
  brand: string;
  model: string;
  year: number;
  category: 'Hypercars' | 'Supercars' | 'Luxury' | 'Performance' | 'Electric' | 'SUVs' | 'Grand Tourers' | 'Classics';
  price: number;
  formattedPrice: string;
  specs: Specification;
  heroImage: string;
  interiorImage: string;
  gallery: string[];
  description: string;
  storyQuote: string;
  curatorNote: string;
  featured?: boolean;
  editionBadge?: string;
  exteriorColors: ExteriorColorOption[];
  wheels: WheelOption[];
  interiors: InteriorOption[];
}

export interface Brand {
  id: string;
  name: string;
  origin: string;
  founded: number;
  quote: string;
  description: string;
  tagline: string;
  heroVehicleId: string;
  backdropImage: string;
  accentColor: string;
  stats: {
    heritageYears: number;
    championships: number;
    highestHp: number;
    topSpeedRecord: number;
  };
}

export interface HeritageMilestone {
  era: string;
  year: number;
  title: string;
  vehicle: string;
  brand: string;
  quote: string;
  description: string;
  image: string;
  engineeringBreakthrough: string;
  milestone?: string;
}

export interface ExperienceOffering {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  perks: string[];
  image: string;
  badge: string;
  category?: string;
  location?: string;
  duration?: string;
  availability?: string;
  highlights?: string[];
  price?: string;
}

export interface ConfiguratorState {
  vehicleId: string;
  exteriorColor: ExteriorColorOption;
  wheel: WheelOption;
  interior: InteriorOption;
  aerodynamicPackage: boolean;
  carbonCeramicBrakes: boolean;
  starlightHeadliner: boolean;
  bespokeLuggageSet: boolean;
}
