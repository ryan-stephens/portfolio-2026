import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Ryan Stephens - GenAI & Full-Stack Engineer',
  description:
    'Portfolio showcasing AI/ML and full-stack development projects. Specializing in LLMs, MLOps, and production AI systems.',
  keywords: [
    'AI Engineer',
    'GenAI',
    'Full-Stack Developer',
    'LLM',
    'MLOps',
    'Python',
    'TypeScript',
    'Next.js',
  ],
  authors: [{ name: 'Ryan Stephens' }],
  creator: 'Ryan Stephens',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ryan-stephens.dev',
    title: 'Ryan Stephens - GenAI & Full-Stack Engineer',
    description:
      'Portfolio showcasing AI/ML and full-stack development projects.',
    siteName: 'Ryan Stephens',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ryan Stephens - GenAI & Full-Stack Engineer',
    description: 'Portfolio showcasing AI/ML and full-stack development projects.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
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
