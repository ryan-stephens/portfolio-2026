import type { Metadata } from 'next';
import ProjectsPageClient from './client';
import { projects } from '@/content/projects';

export const metadata: Metadata = {
  title: 'Projects - Ryan Stephens | AI/ML & Full-Stack Portfolio',
  description:
    'Explore Ryan Stephens\' production-grade projects including AI infrastructure, medical data extraction, voice-to-text SaaS, and full-stack applications.',
  openGraph: {
    title: 'Projects - Ryan Stephens',
    description: 'Production-grade AI/ML and full-stack development projects',
    url: 'https://ryan-stephens.dev/projects',
    type: 'website',
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient projects={projects} />;
}
