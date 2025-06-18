
export interface Brand {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  
  // Basic branding
  personality: string[];
  toneOfVoice: string;
  targetAudience: string;
  
  // Visual identity
  primaryColors: string[];
  secondaryColors: string[];
  typography: {
    title: string;
    body: string;
    accent: string;
  };
  
  // Atmosphere
  atmosphere: {
    scents: string[];
    environments: string[];
    playlists: string[];
    references: string[];
  };
  
  // Logos and images
  logos: {
    primary: string;
    horizontal: string;
    favicon: string;
  };
  brandImage?: string; // New brand image field
  
  // New advanced sections
  brandStory?: string;
  timeline?: Array<{
    year: string;
    event: string;
  }>;
  
  publicObjections?: string[];
  
  desires: {
    internal: string[];
    external: string[];
  };
  
  fears?: string[];
  
  archetype: {
    name: string;
    description: string;
    example: string;
  };
  
  brandPromise?: string;
  coreValues?: string[];
  
  slogans: {
    main: string;
    secondary: string[];
  };
}
