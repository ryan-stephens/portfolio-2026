# Portfolio Application - Complete Summary

## 📋 Overview

**Purpose**: A modern, high-performance portfolio website designed to showcase Ryan Stephens as a **Senior Software Engineer with AI/ML Specialization**. The site demonstrates expertise in both traditional software engineering and cutting-edge AI/ML technologies, targeting roles in full-stack development, AI engineering, and MLOps.

**Live Site**: https://ryan-stephens.dev/

---

## 🎯 Key Features

### Dual-Focus Positioning
- **50/50 balance** between Software Engineering and AI/ML skills
- Interleaved project showcase alternating between AI and SWE projects
- Dual resume system with tabbed interface (Software Engineer vs AI Engineer)
- Optimized for both traditional SWE and AI Engineering job applications

### Core Sections
1. **Hero Section** - Dynamic introduction with stats, tech stack preview, and dual resume downloads
2. **About Section** - Comprehensive bio highlighting both SWE and AI/ML expertise with 70 balanced skills
3. **Projects Section** - Featured projects showcasing production-grade work
4. **Resume Page** - Tabbed interface displaying both resume versions with separate downloads
5. **Contact Section** - Professional contact form and social links

### Performance & Accessibility
- ✅ **WCAG AA compliant** - All text meets accessibility contrast standards
- ✅ **Optimized images** - WebP format with lazy loading
- ✅ **Fast load times** - Static site generation with Astro
- ✅ **SEO optimized** - Structured data, meta tags, and semantic HTML
- ✅ **Responsive design** - Mobile-first approach with breakpoints

---

## 🛠️ Tech Stack

### Core Framework
- **Astro 5.12.9** - Static site generator for blazing-fast performance
- **TypeScript** - Type-safe development
- **Node.js** - Runtime environment

### Styling
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **PostCSS 8.5.6** - CSS processing
- **Autoprefixer 10.4.21** - Browser compatibility
- **Custom CSS** - Dopefolio theme with readable, maintainable styles

### Fonts
- **Source Sans Pro** - Primary font family (Google Fonts)
- Optimized font loading with preload strategy

### Development Tools
- **Git** - Version control
- **GitHub Actions** - CI/CD pipeline
- **Docker** - Containerization
- **Coolify** - Self-hosted deployment orchestration

### Deployment
- **Self-hosted VPS** - Private server infrastructure
- **Docker containers** - Isolated application environment
- **Automated CI/CD** - GitHub Actions workflow
- **SSL certificates** - Secure HTTPS via Traefik reverse proxy

---

## 📂 Project Structure

```
portfolio-site/
├── public/
│   ├── assets/
│   │   ├── png/          # Project screenshots
│   │   ├── webp/         # Optimized images
│   │   ├── svg/          # Social icons
│   │   └── resume/       # Resume PDFs
│   │       ├── ai-engineer/
│   │       └── software-engineer/
├── src/
│   ├── components/
│   │   ├── dopefolio/    # Main UI components
│   │   └── common/       # Shared components
│   ├── data/
│   │   ├── projects.ts   # Project data
│   │   ├── resume.ts     # Resume data
│   │   └── navigation.ts # Site navigation
│   ├── layouts/
│   │   ├── DopefolioLayout.astro
│   │   └── ModernLayout.astro
│   ├── pages/
│   │   ├── index.astro   # Homepage
│   │   ├── projects.astro
│   │   ├── resume.astro
│   │   └── [projectId].astro
│   ├── styles/
│   │   ├── global.css
│   │   └── dopefolio/
│   └── types/
│       └── index.ts      # TypeScript types
├── package.json
├── tsconfig.json
└── tailwind.config.js
```

---

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#1e3a8a` (Dark blue background)
- **Accent Cyan**: `#00e5ff` → `#00d4ff` (Gradients, highlights)
- **Text**: White (`#ffffff`) with varying opacity for hierarchy
- **Backgrounds**: Semi-transparent overlays with backdrop blur

### Typography
- **Headings**: Source Sans Pro (800-900 weight)
- **Body**: Source Sans Pro (400-600 weight)
- **Font Sizes**: Responsive scaling from mobile to desktop

### Components
- **Buttons**: Primary (cyan gradient) and Secondary (outlined)
- **Cards**: Glass-morphism effect with hover states
- **Badges**: Skill tags with consistent styling
- **Stats**: Numeric highlights with labels

---

## 📊 Featured Projects

### 1. MedExtract (AI/ML)
Production-grade medical data extraction platform with enterprise MLOps practices, systematic evaluations, and complete observability.

**Tech**: Python, FastAPI, LangChain, LangGraph, AWS Bedrock, React, TypeScript, PostgreSQL, pgvector, Docker

### 2. AI Infrastructure Template (AI/ML)
Self-hosted MLOps platform with compositional prompts, domain-agnostic evaluations, and complete observability stack.

**Tech**: Python, FastAPI, Docker, PostgreSQL, pgvector, Redis, MinIO, Prometheus, Grafana, Loki, Coolify

### 3. SpeakEasy (Hybrid SWE + AI)
AI-powered voice-to-text platform with desktop app (Electron) and web platform (Next.js) featuring OpenAI Whisper integration.

**Tech**: Electron, TypeScript, Next.js, OpenAI Whisper, PostgreSQL, Stripe, Docker, Coolify

### 4. Scrum Scramble (SWE)
Real-time collaborative story pointing tool for agile teams with Azure DevOps integration and subscription management.

**Tech**: Angular 19, Firebase, Stripe, Docker, Azure DevOps, TypeScript, RxJS, Playwright

### 5. Portfolio Site (SWE)
This portfolio website demonstrating modern web development, performance optimization, and DevOps practices.

**Tech**: Astro, Tailwind CSS, TypeScript, Docker, Coolify

---

## 🎓 Skills Showcase (70 Total)

### Software Engineering (35 skills)
- **Full-Stack**: Angular, TypeScript, React, Next.js, .NET/C#, Node.js, RxJS, NGRX, TailwindCSS, Electron
- **Backend & APIs**: Kafka, gRPC, REST APIs, GraphQL, Microservices, FastAPI, Express.js, NestJS
- **Databases**: PostgreSQL, MongoDB, SQL Server, Redis, DynamoDB, Firebase, Prisma ORM
- **Cloud & Infrastructure**: Docker, Kubernetes, AWS, Azure, CI/CD, GitHub Actions, ArgoCD, Coolify

### AI/ML Engineering (35 skills)
- **LLM & AI**: AWS Bedrock, OpenAI API, LangChain, LangGraph, RAG, Prompt Engineering, AI Agents
- **MLOps**: Systematic Evaluations, AI Tracing, LLM-as-Judge, Model Versioning, A/B Testing
- **Python & ML**: Python, Pydantic, Celery, SQLAlchemy, Pytest
- **Observability**: Prometheus, Grafana, Loki, DataDog

---

## 🚀 Performance Optimizations

### Image Optimization
- WebP format for 30-40% file size reduction
- Lazy loading for off-screen images
- Responsive image sizing
- Optimized alt text for accessibility

### Font Loading
- Preload strategy for critical fonts
- Font-display: swap for faster rendering
- Fallback fonts to prevent layout shift

### Code Optimization
- Static site generation (SSG) with Astro
- Minimal JavaScript bundle
- CSS purging with Tailwind
- Minification and compression

### SEO
- Structured data (Schema.org markup)
- Meta tags for social sharing
- Semantic HTML5
- Canonical URLs
- Sitemap generation

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Mobile Optimizations
- Hamburger navigation menu
- Touch-friendly buttons and links
- Optimized font sizes
- Stacked layouts for narrow screens
- Reduced animation complexity

---

## 🔒 Security & Best Practices

### Code Quality
- TypeScript for type safety
- ESLint for code linting
- Consistent code formatting
- Component-based architecture
- DRY principles (centralized data)

### Deployment
- Docker containerization
- Environment variable management
- SSL/TLS encryption
- Automated backups
- CI/CD pipeline with GitHub Actions

### Accessibility
- WCAG AA compliance
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Screen reader compatibility

---

## 📈 Key Metrics & Achievements

### Performance
- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO, Best Practices)
- **Load Time**: < 2 seconds
- **Bundle Size**: Optimized with code splitting
- **Image Optimization**: 30-40% reduction with WebP

### Accessibility
- **Contrast Ratios**: All text meets WCAG AA (4.5:1 minimum)
- **Semantic HTML**: Proper heading hierarchy
- **Keyboard Navigation**: Full site accessible via keyboard
- **Screen Readers**: Compatible with assistive technologies

### SEO
- **Structured Data**: Schema.org markup for projects
- **Meta Tags**: Optimized for social sharing
- **Sitemap**: Automated generation
- **Mobile-Friendly**: Responsive design

---

## 🎯 Target Audience

### Primary
- **Hiring Managers** - Looking for Senior Software Engineers with AI/ML expertise
- **Recruiters** - Searching for full-stack developers or AI engineers
- **Technical Leads** - Evaluating candidates for technical roles

### Secondary
- **Potential Clients** - Seeking freelance development or consulting
- **Collaborators** - Looking for project partners
- **Peers** - Networking and knowledge sharing

---

## 🔄 Recent Updates (January 2026)

### Dual Resume System
- ✅ Added tabbed interface on Resume page
- ✅ Separate Software Engineer and AI Engineer resume versions
- ✅ Individual download buttons for each resume type
- ✅ Dual resume download buttons on homepage

### Skills Rebalancing
- ✅ Reorganized to 50/50 SWE/AI balance (70 total skills)
- ✅ Added missing SWE skills: Kafka, gRPC, NGRX, RxJS, Microservices
- ✅ Interleaved categories for equal emphasis
- ✅ Leads with Full-Stack Development

### Color Contrast Improvements
- ✅ Hero section text now pure white for maximum readability
- ✅ Badge backgrounds darkened for better contrast
- ✅ Tech stack badges updated to white text
- ✅ All elements now WCAG AA compliant
- ✅ Primary button gradient brightened for better contrast

### Project Updates
- ✅ Updated MedExtract and AI Infrastructure screenshots to PNG
- ✅ Reordered projects: MedExtract → AI Infrastructure → SpeakEasy → Scrum Scramble
- ✅ Balanced alternation between AI and SWE projects

---

## 📞 Contact Information

- **Website**: https://ryan-stephens.dev/
- **Email**: ryan.stephens15@gmail.com
- **Phone**: 712-310-3735
- **Location**: Omaha, NE
- **GitHub**: https://github.com/ryan-stephens
- **LinkedIn**: https://www.linkedin.com/in/ryan-stephens15/

---

## 📝 License & Usage

This portfolio is a personal project showcasing professional work and skills. All project descriptions and content are original work by Ryan Stephens.

**Built with**: Astro, TypeScript, Tailwind CSS  
**Deployed on**: Self-hosted VPS with Docker and Coolify  
**Last Updated**: January 2026
