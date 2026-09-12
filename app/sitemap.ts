import { MetadataRoute } from 'next'
import { ARTISTS, SITE_URL } from '@/lib/structured-data'

// Bump when page content changes so crawlers know to re-fetch.
const LAST_MODIFIED = new Date('2026-09-11')

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'weekly',
      priority: 1,
      images: [`${SITE_URL}/og-image.jpg`, ...ARTISTS.map((a) => `${SITE_URL}${a.image}`)],
    },
    {
      url: `${SITE_URL}/press`,
      lastModified: LAST_MODIFIED,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ]
}
