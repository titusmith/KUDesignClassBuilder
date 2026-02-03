// Common poster sizes used in the KU Design Professional Lecture Series
// Sizes represent width x height in inches

export const POSTER_SIZES = [
  // Traditional poster (most common)
  { width: 24, height: 36, label: "24×36\" Standard Poster", weight: 0.5 },
  
  // Wide horizontal
  { width: 40, height: 22, label: "40×22\" Wide Horizontal", weight: 0.1 },
  { width: 36, height: 24, label: "36×24\" Landscape", weight: 0.08 },
  
  // Tall vertical
  { width: 18, height: 48, label: "18×48\" Tall Banner", weight: 0.08 },
  { width: 20, height: 60, label: "20×60\" Extra Tall", weight: 0.05 },
  
  // Square-ish
  { width: 24, height: 24, label: "24×24\" Square", weight: 0.06 },
  { width: 30, height: 30, label: "30×30\" Large Square", weight: 0.04 },
  
  // Medium sizes
  { width: 18, height: 24, label: "18×24\" Medium", weight: 0.09 },
  { width: 22, height: 28, label: "22×28\" Medium+", weight: 0.06 },
  
  // Unusual proportions
  { width: 12, height: 36, label: "12×36\" Skinny", weight: 0.02 },
  { width: 48, height: 18, label: "48×18\" Extra Wide", weight: 0.02 },
];

// Get a poster size based on weighted random selection
export function getRandomPosterSize(seed?: number): { width: number; height: number } {
  // Use seed for deterministic selection if provided
  const random = seed !== undefined 
    ? (Math.sin(seed) + 1) / 2  // Pseudo-random based on seed
    : Math.random();
  
  const totalWeight = POSTER_SIZES.reduce((sum, size) => sum + size.weight, 0);
  let threshold = random * totalWeight;
  
  for (const size of POSTER_SIZES) {
    threshold -= size.weight;
    if (threshold <= 0) {
      return { width: size.width, height: size.height };
    }
  }
  
  // Fallback to standard poster
  return { width: 24, height: 36 };
}

// Get aspect ratio for a poster size
export function getAspectRatio(width: number, height: number): number {
  return width / height;
}

// Calculate display dimensions while maintaining aspect ratio
export function calculateDisplaySize(
  width: number, 
  height: number, 
  maxWidth: number, 
  maxHeight: number
): { width: number; height: number } {
  const aspectRatio = width / height;
  
  // Try fitting by width
  let displayWidth = maxWidth;
  let displayHeight = maxWidth / aspectRatio;
  
  // If too tall, fit by height instead
  if (displayHeight > maxHeight) {
    displayHeight = maxHeight;
    displayWidth = maxHeight * aspectRatio;
  }
  
  return { width: displayWidth, height: displayHeight };
}

// Get varied poster images for different aspect ratios
export function getPosterImageByAspectRatio(width: number, height: number, index: number): string {
  const aspectRatio = width / height;
  
  const imagePool = [
    // Vertical posters (aspect < 0.8)
    "https://images.unsplash.com/photo-1570401720350-cdd17d5b4730?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1522896696058-236b2f7fb361?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1706189797798-30d44496b274?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1758923530325-00b4ff765e9e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1559329311-d12f0b9d770d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1710976483763-25290f0212ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1712686421405-68ea9e3e7902?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1643888395130-4cb09f9814d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1621004805829-94ac33d1cd91?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1673824025478-f918f226ba56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  ];
  
  const horizontalImages = [
    // Horizontal posters (aspect > 1.2)
    "https://images.unsplash.com/photo-1654088054155-0259c4b1951c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1721007140070-06bbb3e8c97c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1763069227994-06906285b144?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  ];
  
  const squareImages = [
    // Square-ish posters (aspect 0.8-1.2)
    "https://images.unsplash.com/photo-1630388107342-811b5ee05484?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1586350922089-61d0340865c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
  ];
  
  // Select pool based on aspect ratio
  let pool: string[];
  if (aspectRatio < 0.8) {
    pool = imagePool;  // Vertical
  } else if (aspectRatio > 1.2) {
    pool = horizontalImages;  // Horizontal
  } else {
    pool = squareImages;  // Square-ish
  }
  
  // Return image from appropriate pool
  return pool[index % pool.length];
}
