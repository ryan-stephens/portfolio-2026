export interface SkillCategory {
  name: string;
  description: string;
  skills: string[];
  icon: string;
}

export const skillCategories: SkillCategory[] = [
  {
    name: 'LLM & GenAI',
    description: 'Large Language Models and Generative AI technologies',
    icon: 'Sparkles',
    skills: [
      'AWS Bedrock',
      'OpenAI API',
      'LangChain',
      'LangGraph',
      'LangSmith',
      'Prompt Engineering',
      'Prompt Versioning',
      'Multi-turn Conversational AI',
      'AI Agents',
      'RAG (Retrieval-Augmented Generation)',
      'Vector Embeddings',
      'Semantic Search',
      'Fine-Tuning',
      'Streaming Responses (SSE)',
      'LLM-as-Judge',
      'Token Management',
      'Cost Optimization',
    ],
  },
  {
    name: 'MLOps & Production AI',
    description: 'Production-grade AI systems and observability',
    icon: 'Zap',
    skills: [
      'Systematic Evals',
      'AI Tracing',
      'Quality Grading',
      'Backtests',
      'Regression Testing',
      'A/B Testing',
      'Model Performance Monitoring',
      'Dataset Management',
      'Dataset Curation',
      'Model Registry',
      'MLflow',
      'Evaluation Frameworks',
      'Scorecard Systems',
      'Production Deployment',
    ],
  },
  {
    name: 'Python & ML Frameworks',
    description: 'Python development and machine learning libraries',
    icon: 'Code',
    skills: [
      'Python',
      'FastAPI',
      'Pydantic',
      'PyTorch',
      'TensorFlow',
      'Hugging Face Transformers',
      'Celery',
      'PyPDF2',
      'NumPy',
      'Pandas',
      'Pytest',
    ],
  },
  {
    name: 'Databases & Vector Search',
    description: 'Data storage and semantic search technologies',
    icon: 'Database',
    skills: [
      'PostgreSQL',
      'pgvector',
      'DynamoDB',
      'Redis',
      'FAISS',
      'SQLAlchemy',
      'Prisma ORM',
      'Pinecone',
      'Weaviate',
      'MongoDB',
      'SQL Server',
      'Firebase',
    ],
  },
  {
    name: 'Cloud & Infrastructure',
    description: 'Cloud platforms and DevOps tools',
    icon: 'Cloud',
    skills: [
      'AWS (Lambda, S3, Bedrock, SageMaker)',
      'Azure (DevOps, ML Studio)',
      'Docker',
      'Docker Compose',
      'Kubernetes',
      'AWS CDK',
      'Terraform',
      'Coolify',
      'Prometheus',
      'Grafana',
      'Loki',
      'Apache Kafka',
      'CI/CD Pipelines',
      'GitHub Actions',
      'ArgoCD',
    ],
  },
  {
    name: 'Full-Stack Development',
    description: 'Frontend and backend web development',
    icon: 'Layout',
    skills: [
      'React',
      'Next.js',
      'Angular',
      'TypeScript',
      'JavaScript',
      'C#',
      '.NET',
      'Node.js',
      'NestJS',
      'Express.js',
      'TailwindCSS',
      'Vite',
      'Responsive Design',
      'RxJS',
      'NGRX',
      'State Management',
      'REST APIs',
      'gRPC APIs',
    ],
  },
  {
    name: 'Development & Testing',
    description: 'Code quality, testing, and development practices',
    icon: 'CheckCircle',
    skills: [
      'Git',
      'GitHub',
      'SOLID Principles',
      'DRY Principle',
      'Agile/Scrum',
      'E2E Testing',
      'Playwright',
      'API Documentation',
      'Postman',
      'TypeScript Strict Mode',
      'ESLint',
      'Code Review',
      'DataDog',
      'Logging & Monitoring',
    ],
  },
];

export function getSkillsByCategory(categoryName: string): string[] {
  const category = skillCategories.find((c) => c.name === categoryName);
  return category?.skills || [];
}

export function getAllSkills(): string[] {
  return skillCategories.flatMap((c) => c.skills);
}

export function getSkillCategory(skillName: string): SkillCategory | undefined {
  return skillCategories.find((c) => c.skills.includes(skillName));
}
