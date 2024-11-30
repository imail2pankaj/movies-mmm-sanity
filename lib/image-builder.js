
import { client } from '@/sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

// Utility function to build image URLs
export const urlFor = (source) => builder.image(source);