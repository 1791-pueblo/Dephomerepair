export type TextureSample = {
  id: string;
  name: string;
  /** Short ratio / style note shown as a badge, e.g. "70/30 flattened" */
  style: string;
  description: string;
  videoSrc: string;
  posterSrc: string;
};

/**
 * Drywall texture examples for the gallery.
 * Add more named samples here as Jason sends additional clips or stills.
 */
export const drywallTextures: TextureSample[] = [
  {
    id: 'santa-fe',
    name: 'Santa Fe',
    style: 'About 70/30 flattened',
    description:
      'Santa Fe texture with roughly 70% flattened surface and 30% skipped pockets. Applied by DEP Home Repair — the kind of match that makes a patch disappear into the rest of the wall.',
    videoSrc: '/gallery/textures/santa-fe-texture.mp4',
    posterSrc: '/gallery/textures/santa-fe-poster.jpg',
  },
];
