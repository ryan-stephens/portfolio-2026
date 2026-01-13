import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Ryan Stephens - GenAI & Full-Stack Engineer | AI/ML Portfolio',
  description:
    'Portfolio of Ryan Stephens, a GenAI and Full-Stack Engineer specializing in production AI systems, LLMs, MLOps, and modern web development. Explore AI infrastructure, medical data extraction, voice-to-text SaaS, and more.',
  keywords: [
    'AI Engineer',
    'GenAI',
    'Full-Stack Developer',
    'LLM',
    'MLOps',
    'Python',
    'TypeScript',
    'Next.js',
    'Machine Learning',
    'Artificial Intelligence',
    'AI Infrastructure',
    'Production AI',
    'React',
    'Node.js',
    'FastAPI',
    'Docker',
    'AI Systems',
  ],
  authors: [{ name: 'Ryan Stephens', url: 'https://ryan-stephens.dev' }],
  creator: 'Ryan Stephens',
  metadataBase: new URL('https://ryan-stephens.dev'),
  alternates: {
    canonical: 'https://ryan-stephens.dev',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ryan-stephens.dev',
    title: 'Ryan Stephens - GenAI & Full-Stack Engineer',
    description:
      'Portfolio showcasing production-grade AI systems, full-stack applications, and MLOps expertise.',
    siteName: 'Ryan Stephens Portfolio',
    images: [
      {
        url: 'https://ryan-stephens.dev/assets/ryan-stephens-400x524.webp',
        width: 400,
        height: 524,
        alt: 'Ryan Stephens',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ryan Stephens - GenAI & Full-Stack Engineer',
    description: 'Portfolio showcasing AI/ML and full-stack development projects.',
    creator: '@ryan_stephens',
    images: ['https://ryan-stephens.dev/assets/ryan-stephens-400x524.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ryan Stephens',
    url: 'https://ryan-stephens.dev',
    image: 'https://ryan-stephens.dev/assets/ryan-stephens-400x524.webp',
    jobTitle: 'GenAI & Full-Stack Engineer',
    description:
      'GenAI and Full-Stack Engineer specializing in production AI systems, LLMs, MLOps, and modern web development.',
    sameAs: [
      'https://github.com/ryan-stephens',
      'https://www.linkedin.com/in/ryan-stephens-4a518359/',
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
      'LLMs',
      'Python',
      'TypeScript',
      'React',
      'Next.js',
      'FastAPI',
      'Docker',
      'MLOps',
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href="https://ryan-stephens.dev" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-slate-900">
        <Navigation />
        <main id="main-content" className="flex-1" role="main">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
