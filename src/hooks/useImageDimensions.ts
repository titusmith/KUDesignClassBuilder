import { useState, useEffect } from 'react';
import { Speaker } from '../data/types';

export interface ImageDimension {
  id: string;
  width: number;
  height: number;
  loaded: boolean;
}

// Cache for image dimensions to persist across component remounts
const dimensionCache = new Map<string, { width: number; height: number }>();

export function useImageDimensions(speakers: Speaker[]): {
  dimensions: Map<string, ImageDimension>;
  allLoaded: boolean;
} {
  const [dimensions, setDimensions] = useState<Map<string, ImageDimension>>(() => {
    // Initialize with cached dimensions or fallback to speaker data
    const initial = new Map<string, ImageDimension>();
    speakers.forEach(speaker => {
      const cached = dimensionCache.get(speaker.posterUrl);
      if (cached) {
        initial.set(speaker.id, { id: speaker.id, ...cached, loaded: true });
      } else {
        initial.set(speaker.id, {
          id: speaker.id,
          width: speaker.posterWidth || 24,
          height: speaker.posterHeight || 36,
          loaded: false
        });
      }
    });
    return initial;
  });

  const [allLoaded, setAllLoaded] = useState(() => {
    return speakers.every(s => dimensionCache.has(s.posterUrl));
  });

  useEffect(() => {
    let mounted = true;
    
    const loadImageDimensions = async () => {
      const updates: { id: string; url: string; width: number; height: number }[] = [];
      
      await Promise.all(
        speakers.map(speaker => {
          // Skip if already cached
          if (dimensionCache.has(speaker.posterUrl)) {
            return Promise.resolve();
          }
          
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.onload = () => {
              updates.push({
                id: speaker.id,
                url: speaker.posterUrl,
                width: img.naturalWidth,
                height: img.naturalHeight
              });
              resolve();
            };
            img.onerror = () => {
              // Use fallback dimensions on error
              updates.push({
                id: speaker.id,
                url: speaker.posterUrl,
                width: speaker.posterWidth || 24,
                height: speaker.posterHeight || 36
              });
              resolve();
            };
            img.src = speaker.posterUrl;
          });
        })
      );
      
      if (mounted && updates.length > 0) {
        setDimensions(prev => {
          const next = new Map(prev);
          updates.forEach(update => {
            dimensionCache.set(update.url, { width: update.width, height: update.height });
            next.set(update.id, {
              id: update.id,
              width: update.width,
              height: update.height,
              loaded: true
            });
          });
          return next;
        });
        setAllLoaded(true);
      }
    };
    
    loadImageDimensions();
    
    return () => {
      mounted = false;
    };
  }, [speakers]);

  return { dimensions, allLoaded };
}
