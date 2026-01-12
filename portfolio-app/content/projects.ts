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
    description: 'Self-hosted MLOps platform with production observability stack and multi-provider LLM support.',
    longDescription: `A production-ready, self-hosted MLOps platform designed to build any type of AI product with built-in best practices. Implements the three-phase AI Engineering maturity model: Development (prompts + evals), Production (traces + scorecards), and Evolution (backtests + leaderboards).

Features a compositional prompt architecture with auto-versioning, systematic evaluation framework, response caching to optimize costs, and complete observability with Prometheus, Grafana, and Loki. Deployed on VPS with Coolify, supporting multiple LLM providers (AWS Bedrock, OpenAI, Anthropic). Demonstrates production-grade infrastructure patterns and DevOps maturity.`,
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
      'Systematic evaluation framework with multiple matcher types',
      'Multi-provider LLM support (Bedrock, OpenAI, Anthropic)',
      'Complete observability stack (Prometheus, Grafana, Loki)',
      'Response caching and cost optimization',
      'Production-grade infrastructure patterns',
      'Self-hosted on VPS with Coolify',
    ],
    metrics: [
      { label: 'Microservices', value: '10' },
      { label: 'Status', value: 'Production' },
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
    description: 'Enterprise AI system for medical data extraction with dual interaction types and systematic evaluation.',
    longDescription: `A production-grade medical data extraction and intelligent agent platform built for insurance underwriting. Combines automated extraction of unstructured medical documents into structured JSON with a conversational AI agent featuring 8 specialized tools (risk assessment, policy compliance, knowledge base search, etc.).

Implements enterprise-level MLOps practices: systematic evaluation framework, complete observability with custom traces and LangSmith integration, LLM-based quality scoring, and regression testing with backtests. Supports dual interaction types (extraction and conversational) with field-level precision tracking and automated quality grading. Demonstrates production AI engineering maturity with comprehensive observability and quality assurance.`,
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
      'Dual interaction types (extraction + conversational agent)',
      'LangGraph ReAct agent with 8 specialized tools',
      'Field-level precision tracking for quality assurance',
      'LLM-based automated quality grading',
      'LangSmith integration for complete observability',
      'Regression testing with systematic backtests',
      'Schema-driven architecture for consistency',
      'Enterprise MLOps practices throughout',
    ],
    metrics: [
      { label: 'Agent Tools', value: '8' },
      { label: 'Dual Modes', value: 'Extract + Chat' },
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
    description: 'Live production SaaS platform (desktop + web) for voice-to-text with IDE integration.',
    longDescription: `A production-ready voice-to-text transcription platform deployed at speakeasydev.com, specifically designed for developers using AI chat editors (Windsurf, Cline, VS Code, Cursor). Consists of a Windows desktop application (Electron v28) and web SaaS platform (Next.js 14), providing seamless voice-to-text integration with intelligent formatting and IDE-specific features.

Features push-to-talk voice recording with hotkey activation, OpenAI Whisper API integration, 4 context-aware transcription modes (Agent Chat, Email, Document, Outline), and IDE integration with file reference support. Backed by 298 E2E tests with 100% pass rate. Includes Stripe payment integration for freemium business model, PostgreSQL database, and Azure Trusted Signing for Windows installer. Demonstrates full-stack SaaS capabilities from desktop to cloud.`,
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
      'Live production deployment at speakeasydev.com',
      'Desktop app with code signing (Azure Trusted Signing)',
      'Web SaaS platform with subscription management',
      'OpenAI Whisper integration for transcription',
      '4 context-aware transcription modes with intelligent formatting',
      'IDE integration with file reference support',
      'Freemium business model with 3 pricing tiers',
      '298 E2E tests with 100% pass rate',
      'Multi-device license binding and usage tracking',
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
    description: 'Open source AI knowledge management with Discord bot, semantic search, and 85% classification accuracy.',
    longDescription: `A production-grade AI-powered personal knowledge management system that automatically captures, classifies, and surfaces information through natural language conversation. Processes thoughts via Discord, uses Claude AI for intelligent classification with 85% accuracy, stores data in PostgreSQL with semantic search capabilities, and generates automated digests.

Built with TypeScript, Node.js, and Directus headless CMS. Features intelligent classification with confidence scoring, semantic search using pgvector embeddings, automated digest generation (morning/nightly/weekly) with timezone awareness, and complete DevOps setup with Docker and Coolify. MIT licensed open source project demonstrating self-hosting best practices, data ownership, and cost-efficient infrastructure. Processes 50+ thoughts monthly with zero manual intervention.`,
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
      'Intelligent classification with 85% accuracy and confidence scoring',
      'Semantic search with pgvector embeddings',
      'Automated digest generation (morning/nightly/weekly) with timezone awareness',
      'Discord bot interface for natural interaction',
      'Directus headless CMS for extensibility',
      'Production deployment on VPS with Docker',
      'MIT licensed open source project',
      'Processes 50+ thoughts monthly with zero manual intervention',
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
    description: 'Portfolio website demonstrating accessibility best practices and type-safe development.',
    longDescription: `A modern, high-performance portfolio website showcasing expertise in both software engineering and AI/ML technologies. Built with Next.js 14 (App Router), TailwindCSS, and deployed on self-hosted VPS using Docker and Coolify.

Demonstrates production-grade web development practices: WCAG 2.1 AA accessibility compliance, TypeScript strict mode throughout, skip navigation links, ARIA attributes, focus management, and semantic HTML. Features comprehensive project showcase with category filtering, skills display organized by 7 categories, contact form with validation, and complete mobile responsiveness. Includes accessibility documentation and systematic testing for compliance.`,
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
      'Next.js 14 with App Router for performance',
      'WCAG 2.1 AA accessibility compliance throughout',
      'TypeScript strict mode for type safety',
      'Skip navigation and ARIA attributes for screen readers',
      'Visible focus indicators and keyboard navigation',
      'Responsive mobile-first design',
      'Project showcase with category filtering',
      'Skills display organized by 7 categories',
      'Contact form with validation and error handling',
      'Docker deployment ready with Coolify',
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
