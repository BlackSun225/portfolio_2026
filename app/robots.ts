import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/work', '/services'],
      disallow: '/portfolio/', // Block folders you don't want indexed
    },
    sitemap: 'https://maisondoudjo.com/sitemap.xml',
  }
}