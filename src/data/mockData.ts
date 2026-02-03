// Re-export types for backwards compatibility
export type { Speaker, Memory } from "./types";

// Import the comprehensive speaker database
import { allSpeakers } from "./allSpeakers";

// Only show speakers with real poster files (not placeholder images)
export const mockSpeakers = allSpeakers.filter(
  speaker => speaker.posterUrl.startsWith('/posters/')
);

export const disciplines = [
  "All Disciplines",
  "Animation",
  "Architecture", 
  "Art Direction",
  "Book Arts",
  "Branding & Strategy",
  "Ceramics",
  "Concept Art",
  "Design Management / Entrepreneurship",
  "Design Scholarship / History",
  "Design Strategy",
  "Editorial Design",
  "Environmental Design",
  "Film / VFX",
  "Fine Art / Sculpture",
  "Graphic Design",
  "Illustration",
  "Industrial Design",
  "Interaction Design",
  "Interior Design",
  "Jewelry",
  "Lettering & Typography",
  "Lighting Design",
  "Metalsmithing",
  "Photography",
  "Printmaking",
  "Product Design",
  "Storyboard Art",
  "Textiles",
  "Type Design"
];

export const decades = [
  { label: "All Years", value: "all" },
  { label: "2020s", value: "2020" },
  { label: "2010s", value: "2010" },
  { label: "2000s", value: "2000" },
  { label: "1990s", value: "1990" },
  { label: "1980s", value: "1980" }
];
