export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  category: 'ai-ml' | 'full-stack' | 'hybrid';
  featured: boolean;
  liveUrl?: string;
  githubUrl?: string;
  screenshots: string[];
  techStack: string[];
  highlights: string[];
  metrics?: Array<{ label: string; value: string }>;
  year: number;
}

export const projects: Project[] = [
  {
    id: 'ai-infrastructure-template',
    title: 'AI Infrastructure Template',
    tagline: 'Self-hosted MLOps platform for rapid AI product development',
    description: 'Domain-agnostic AI infrastructure with compositional prompts, evaluation framework, and complete observability stack.',
    longDescription: `A production-ready, self-hosted MLOps platform designed as a template for building any type of AI product. Built on Incident.io's AI Engineering methodology, it provides a complete foundation for developing, deploying, and iterating on AI applications following the three-phase maturity model: Development (Build It), Production (Ship It), and Evolution (Improve It).

The template features a compositional prompt architecture, domain-agnostic evaluation framework with 6 matcher types, response caching, and complete observability with Prometheus, Grafana, and Loki. Deployed on VPS with Coolify, supporting multiple LLM providers including AWS Bedrock.`,
    category: 'ai-ml',
    featured: true,
    liveUrl: 'https://ai.ryan-stephens.dev',
    techStack: [
      'Python',
      'FastAPI',
      'Docker',
      'PostgreSQL',
      'pgvector',
      'Redis',
      'MinIO',
      'Prometheus',
      'Grafana',
      'Loki',
      'AWS Bedrock',
      'React',
      'TypeScript',
      'LangChain',
      'Prompt Engineering',
      'Systematic Evals',
      'AI Tracing',
    ],
    highlights: [
      'Prompt management system with auto-versioning',
      'Evaluation framework with 6 matcher types',
      'Multi-provider LLM support (Bedrock, OpenAI, Anthropic)',
      'Complete observability stack (Prometheus, Grafana, Loki)',
      'Response caching to reduce costs',
      'Production-ready infrastructure',
    ],
    metrics: [
      { label: 'Microservices', value: '10' },
      { label: 'Completion', value: '65%' },
    ],
    screenshots: [
      '/projects/ai-infrastructure-1.png',
      '/projects/ai-infrastructure-2.png',
    ],
    year: 2024,
  },
  {
    id: 'medextract',
    title: 'MedExtract',
    tagline: 'Medical data extraction platform with AI agent and MLOps',
    description: 'Production-grade system combining automated medical document extraction with LangGraph ReAct agent featuring 8 specialized tools.',
    longDescription: `A comprehensive medical data extraction and intelligent agent platform built for insurance underwriting. The system combines automated extraction of unstructured medical documents into structured JSON with a conversational AI agent featuring 8 specialized tools including risk assessment, policy compliance checking, and knowledge base search.

Implements enterprise-level MLOps practices including systematic evaluation framework, complete observability with custom traces and LangSmith integration, LLM-based quality scoring, and regression testing with backtests. Supports dual interaction types (extraction and conversational) with field-level precision tracking and automated quality grading.`,
    category: 'ai-ml',
    featured: true,
    techStack: [
      'Python',
      'FastAPI',
      'LangChain',
      'LangGraph',
      'AWS Bedrock',
      'DynamoDB',
      'S3',
      'PostgreSQL',
      'pgvector',
      'React',
      'TypeScript',
      'Docker',
      'AI Agents',
      'RAG',
      'Systematic Evals',
      'Quality Grading',
      'LangSmith',
      'Backtests',
    ],
    highlights: [
      'Dual interaction types (extraction + agent)',
      'LangGraph ReAct agent with 8 tools',
      'Field-level precision tracking',
      'Automated quality grading',
      'LangSmith integration for observability',
      'Regression testing with backtests',
      'Schema-driven architecture',
    ],
    metrics: [
      { label: 'Agent Tools', value: '8' },
      { label: 'Interaction Types', value: '2' },
    ],
    screenshots: [
      '/projects/medextract-1.png',
      '/projects/medextract-2.png',
    ],
    year: 2024,
  },
  {
    id: 'speakeasy',
    title: 'SpeakEasy',
    tagline: 'Voice-to-text platform for developers with IDE integration',
    description: 'Production Electron desktop app + Next.js SaaS platform with OpenAI Whisper integration and Stripe payments.',
    longDescription: `A production-ready voice-to-text transcription platform specifically designed for developers using AI chat editors (Windsurf, Cline, VS Code, Cursor). The platform consists of a Windows desktop application (Electron) and a web-based SaaS platform (Next.js 14), providing seamless voice-to-text integration with intelligent formatting, IDE-specific features, and a freemium business model.

Features push-to-talk voice recording with hotkey activation, OpenAI Whisper API integration for high-accuracy transcription, 4 specialized modes (Agent Chat, Email, Document, Outline) with context-aware formatting, and IDE integration with file reference support. Deployed on VPS with Docker, includes Stripe payment integration, PostgreSQL database, and 298 E2E tests with 100% pass rate.`,
    category: 'hybrid',
    featured: true,
    liveUrl: 'https://speakeasydev.com',
    techStack: [
      'Electron',
      'TypeScript',
      'Next.js',
      'React',
      'PostgreSQL',
      'Prisma',
      'Stripe',
      'OpenAI Whisper',
      'Docker',
      'Coolify',
      'Playwright',
      'Stripe Integration',
      'OpenAI API',
      'E2E Testing',
      'Payment Processing',
    ],
    highlights: [
      'Desktop app with code signing (Azure Trusted Signing)',
      'Web SaaS platform with subscription management',
      'OpenAI Whisper integration',
      '4 specialized transcription modes',
      'IDE integration with file references',
      'Freemium business model (3 tiers)',
      '298 E2E tests with 100% pass rate',
      'Multi-device license binding',
    ],
    metrics: [
      { label: 'E2E Tests', value: '298' },
      { label: 'Test Pass Rate', value: '100%' },
    ],
    screenshots: [
      '/projects/speakeasy-1.png',
      '/projects/speakeasy-2.png',
    ],
    year: 2025,
  },
  {
    id: 'second-brain',
    title: 'Second Brain',
    tagline: 'AI-powered personal knowledge management system',
    description: 'Self-hosted knowledge management with Discord bot, Claude AI classification, and semantic search.',
    longDescription: `A production-grade AI-powered personal knowledge management system that automatically captures, classifies, and surfaces information through natural language conversation. The system processes thoughts via Discord, uses Claude AI for intelligent classification, stores data in PostgreSQL with semantic search capabilities, and provides automated daily/nightly digests.

Built with TypeScript, Node.js, and Directus headless CMS, it features intelligent classification with confidence scoring, semantic search using pgvector embeddings, automated digest generation with timezone awareness, and complete DevOps setup with Docker and Coolify. Designed for self-hosting with emphasis on data ownership, extensibility, and cost efficiency (~$5-10/month).`,
    category: 'ai-ml',
    featured: true,
    githubUrl: 'https://github.com/ryan-stephens?tab=repositories',
    techStack: [
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'pgvector',
      'Discord.js',
      'AWS Bedrock',
      'Directus',
      'Docker',
      'Coolify',
      'Vector Search',
      'Prompt Engineering',
      'Semantic Search',
    ],
    highlights: [
      'Intelligent classification with confidence scoring',
      'Semantic search with pgvector',
      'Automated digest generation (morning/nightly/weekly)',
      'Discord bot interface',
      'Directus headless CMS',
      'Production deployment on VPS',
      'MIT licensed open source',
      '85% automatic classification accuracy',
    ],
    metrics: [
      { label: 'Classification Accuracy', value: '85%' },
      { label: 'Open Source', value: 'MIT' },
    ],
    screenshots: [
      '/projects/second-brain-1.png',
      '/projects/second-brain-2.png',
    ],
    year: 2025,
  },
  {
    id: 'portfolio-site',
    title: 'Portfolio Website',
    tagline: 'Modern portfolio showcasing GenAI and full-stack expertise',
    description: 'This website - built with Next.js, TailwindCSS, and deployed on VPS with Docker.',
    longDescription: `A modern, high-performance portfolio website designed to showcase expertise in both traditional software engineering and cutting-edge AI/ML technologies. Built with Next.js 14 for optimal performance, TailwindCSS for styling, and deployed on a self-hosted VPS using Docker and Coolify.

Features a dual-focus positioning with 50/50 balance between Software Engineering and AI/ML skills, interleaved project showcase alternating between AI and SWE projects, and a dual resume system with tabbed interface. Includes comprehensive project showcase with screenshots, skills display organized by category, contact form, and complete responsiveness for all devices.`,
    category: 'full-stack',
    featured: false,
    liveUrl: 'https://ryan-stephens.dev',
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'TailwindCSS',
      'Docker',
      'Coolify',
      'Responsive Design',
      'Performance Optimization',
    ],
    highlights: [
      'Next.js 14 with App Router',
      'TailwindCSS for modern styling',
      'Responsive mobile-first design',
      'Project showcase with filtering',
      'Skills display by category',
      'Contact form integration',
      'Docker deployment ready',
      'WCAG AA accessibility compliance',
    ],
    metrics: [
      { label: 'WCAG AA', value: 'Compliant' },
      { label: 'TypeScript', value: 'Strict' },
    ],
    screenshots: [
      '/projects/portfolio-1.png',
      '/projects/portfolio-2.png',
    ],
    year: 2026,
  },
];

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getProjectsByCategory(category: string): Project[] {
  if (category === 'all') return projects;
  return projects.filter((p) => p.category === category);
}
