/**
 * Builds a Pexels image URL from a photo id.
 * Used for the demo content. Replace with your own image URLs later.
 */
export function pexelsImage(photoId: number, width = 940): string {
  return `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
}