import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://dietflow.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          tr: 'https://dietflow.com',
          en: 'https://dietflow.com/?lang=en',
        },
      },
    },
  ];
}
