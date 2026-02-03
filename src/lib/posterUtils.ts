/**
 * Converts a poster URL to its high-resolution detail version.
 * Uses the naming convention: filename.webp -> filename-detail.webp
 * Falls back to original URL if detail version doesn't exist.
 */
export function getDetailPosterUrl(posterUrl: string): string {
  // Only process local poster files
  if (!posterUrl.startsWith('/posters/')) {
    return posterUrl;
  }
  
  // Insert -detail before the file extension
  const lastDotIndex = posterUrl.lastIndexOf('.');
  if (lastDotIndex === -1) {
    return posterUrl;
  }
  
  const basePath = posterUrl.substring(0, lastDotIndex);
  const extension = posterUrl.substring(lastDotIndex);
  
  return `${basePath}-detail${extension}`;
}
