/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl: process.env.SITE_URL || 'https://ryan-stephens.dev',
  generateRobotsTxt: false,
  sitemapSize: 7000,
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/admin', '/api/*', '404', '500'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api', '/.next'],
      },
    ],
    additionalSitemaps: [],
  },
};

module.exports = config;
