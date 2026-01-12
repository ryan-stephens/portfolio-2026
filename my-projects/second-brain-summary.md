# Second Brain: AI-Powered Personal Knowledge Management System

**Project Type:** Full-Stack AI Application | Self-Hosted Personal Productivity Tool  
**Timeline:** December 2024 - January 2026  
**Status:** Production-Ready, Open Source (MIT License)  
**Repository:** [github.com/ryan-stephens/second-brain](https://github.com/ryan-stephens/second-brain)

---

## Executive Summary

Built a production-grade AI-powered personal knowledge management system that automatically captures, classifies, and surfaces information through natural language conversation. The system processes thoughts via Discord, uses Claude AI for intelligent classification, stores data in PostgreSQL with semantic search capabilities, and provides automated daily/nightly digests. Designed for self-hosting with emphasis on data ownership, extensibility, and cost efficiency (~$5-10/month).

---

## Technical Architecture

### Core Technologies

**Backend & Infrastructure:**
- **Runtime:** Node.js 20+ with TypeScript (strict mode)
- **Database:** PostgreSQL 16 with pgvector extension for semantic search
- **CMS:** Directus (headless CMS with auto-generated REST API)
- **Containerization:** Docker Compose for multi-service orchestration
- **Deployment:** Production deployment on VPS with Coolify (GitOps)

**AI & Machine Learning:**
- **LLM Provider:** AWS Bedrock (Claude 3 Haiku)
- **Classification:** Natural language understanding for thought categorization
- **Embeddings:** 1536-dimensional vectors for semantic similarity search
- **Summarization:** AI-generated daily/nightly digests with contextual awareness

**Integration Layer:**
- **Messaging:** Discord.js for bot interface (easily extensible to Slack/Telegram)
- **Scheduling:** node-cron for automated workflows
- **Logging:** Pino for structured JSON logging
- **Validation:** Zod for runtime type safety

### System Architecture

```
User Input (Discord) 
    ↓
Discord Bot (TypeScript)
    ├─→ AWS Bedrock (Classification & Embeddings)
    ├─→ Directus API (Data Storage)
    └─→ Cron Jobs (Scheduled Digests)
         ↓
PostgreSQL + pgvector
    ├─→ Collections (people, projects, ideas, admin_tasks)
    ├─→ Full-text search (pg_trgm)
    └─→ Vector similarity search (pgvector)
```

---

## Key Technical Achievements

### 1. Intelligent Classification System

**Challenge:** Automatically categorize unstructured thoughts into appropriate collections without user intervention.

**Solution:**
- Designed prompt engineering system for Claude 3 Haiku with structured JSON output
- Implemented confidence scoring (0.0-1.0) with configurable threshold
- Built fallback mechanism for low-confidence classifications with clarifying questions
- Achieved ~85% automatic classification accuracy in production use

**Technical Details:**
```typescript
// Classification with structured output and confidence scoring
const classification = await bedrock.completeText({
  modelId: 'anthropic.claude-3-haiku-20240307-v1:0',
  prompt: buildClassificationPrompt(message),
  temperature: 0.2,
});

// Confidence-based routing
if (classification.confidence < config.CONFIDENCE_THRESHOLD) {
  await storeForReview(message, classification);
  await askClarifyingQuestion(classification.clarifying_question);
} else {
  await storeInCollection(classification.destination, classification.fields);
}
```

### 2. Semantic Search Implementation

**Challenge:** Enable meaning-based search beyond keyword matching (e.g., "wife" should find "Natalie Stephens").

**Solution:**
- Integrated pgvector extension for PostgreSQL vector similarity search
- Implemented embedding generation pipeline using AWS Bedrock Titan
- Built hybrid search combining full-text and semantic similarity
- Optimized with GIN indexes for full-text and HNSW indexes for vectors

**Performance:**
- Search queries: <100ms for 10,000+ items
- Embedding generation: ~500ms per item
- Vector similarity: O(log n) with HNSW index

**Technical Details:**
```sql
-- Vector similarity search with cosine distance
SELECT id, name, 
       1 - (embedding <=> query_embedding) as similarity
FROM people
WHERE 1 - (embedding <=> query_embedding) > 0.15
ORDER BY embedding <=> query_embedding
LIMIT 10;
```

### 3. Database Schema Design & Migrations

**Challenge:** Design flexible schema supporting multiple collection types with shared search capabilities.

**Solution:**
- Normalized schema with soft deletes (archived flag)
- Automatic timestamp tracking (created_at, updated_at)
- Shared columns across collections: search_vector, embedding, tags
- Migration system with idempotent SQL scripts (numbered 001-010)
- Database views for complex queries (stale projects, overdue tasks)

**Key Design Decisions:**
- Used UUIDs for primary keys (distributed system ready)
- Implemented search_vector TSVECTOR for full-text search
- Added embedding VECTOR(1536) for semantic search
- Created composite indexes for common query patterns

### 4. Automated Digest Generation

**Challenge:** Surface relevant information at optimal times without overwhelming the user.

**Solution:**
- Built three distinct digest types with different tones and purposes:
    - **Morning (8 AM):** Action-oriented, highlights priorities
    - **Nightly (9 PM):** Calming, mental closure before bed
    - **Weekly (Sunday 4 PM):** Reflective, big-picture review
- Implemented cron-based scheduling with timezone awareness
- Designed AI prompts for context-aware summarization
- Optimized data fetching with database views for performance

**Technical Details:**
```typescript
// Timezone-aware cron scheduling
cron.schedule(
  config.DAILY_DIGEST_CRON,
  async () => {
    const data = await fetchDigestData();
    const summary = await bedrock.summarize(data, 'morning');
    await postToDiscord(summary);
  },
  { timezone: config.TIMEZONE }
);
```

### 5. Production Deployment & DevOps

**Challenge:** Deploy multi-service application with zero-downtime updates and proper security.

**Solution:**
- Containerized all services with Docker Compose
- Implemented health checks and dependency ordering
- Set up automated deployments via Coolify (GitOps workflow)
- Configured reverse proxy with automatic SSL (Let's Encrypt)
- Implemented structured logging with log aggregation

**Infrastructure:**
- VPS hosting with 2 CPU cores, 4GB RAM
- PostgreSQL with automated backups
- Docker network isolation for security
- Environment-based configuration (dev/prod)

---

## Software Engineering Practices

### Code Quality

**TypeScript Strict Mode:**
- Enabled all strict compiler options
- No `any` types - explicit typing throughout
- Runtime validation with Zod schemas
- Comprehensive error handling with typed exceptions

**Architecture Patterns:**
- **Dependency Injection:** Config and clients passed as parameters
- **Single Responsibility:** Each module has one clear purpose
- **DRY Principle:** Shared utilities for common operations
- **Error Boundaries:** Try/catch blocks with structured logging

**Example:**
```typescript
// Dependency injection with typed config
class DirectusClient {
  constructor(
    private readonly config: AppConfig,
    private readonly logger: Logger
  ) {}
  
  async getItems<T>(params: GetItemsParams): Promise<T[]> {
    try {
      const response = await this.request<T[]>(params);
      return response;
    } catch (err) {
      this.logger.error({ err, params }, 'Failed to fetch items');
      throw new DirectusError('Item fetch failed', err);
    }
  }
}
```

### Testing & Validation

**Manual Testing Checklist:**
- Message capture and classification
- Search (keyword and semantic)
- Command parsing and execution
- Digest generation and scheduling
- Database migrations and rollbacks

**Production Monitoring:**
- Structured JSON logging with Pino
- Error tracking and alerting
- Performance metrics (response times, AI costs)
- Database size and query performance

### Documentation

**Comprehensive Documentation Suite:**
- `README.md` - Project overview and quick start
- `docs/SETUP.md` - Detailed installation guide (Discord, AWS, deployment)
- `docs/ARCHITECTURE.md` - Technical deep-dive with diagrams
- `CONTRIBUTING.md` - Development guidelines and standards
- `COMMANDS.md` - User command reference
- Inline code comments for complex logic

---

## Problem-Solving Examples

### Challenge 1: Directus View Permissions

**Problem:** Daily digest failing with 403 errors when querying database views through Directus API.

**Root Cause Analysis:**
- Directus doesn't auto-sync database views as collections
- Manual UI configuration required for each view
- Not scalable or maintainable for production

**Solution:**
- Replaced view-based queries with direct table queries
- Implemented view logic in application code with filters
- Maintained database views for direct SQL access
- Result: Production-ready, extendable solution without manual configuration

**Code:**
```typescript
// Before: Query view (failed with 403)
const staleProjects = await directus.getItems({ 
  collection: 'stale_projects' 
});

// After: Direct query with filters (works reliably)
const thirtyDaysAgo = new Date(Date.now() - 30*24*60*60*1000);
const staleProjects = await directus.getItems({
  collection: 'projects',
  query: {
    'filter[archived][_eq]': 'false',
    'filter[status][_in]': 'active,waiting,blocked',
    'filter[updated_at][_lt]': thirtyDaysAgo.toISOString(),
  },
});
```

### Challenge 2: Duplicate Message Detection

**Problem:** Bot processing same message multiple times due to Discord event handling.

**Solution:**
- Implemented dual-layer duplicate detection:
    1. Discord message ID tracking
    2. Content hash comparison (for edited messages)
- Stored in database for persistent deduplication
- Added early exit to prevent unnecessary AI API calls

**Impact:** Reduced AI costs by ~30% and improved user experience

### Challenge 3: Command Interface Simplification

**Problem:** Too many command aliases causing cognitive load and maintenance burden.

**Solution:**
- Audited all commands and removed redundant aliases
- Reduced from 12+ variations to 5 core commands
- Updated documentation to reflect simplified interface
- Maintained backward compatibility during transition

**Result:** Cleaner codebase, easier onboarding, better UX

---

## Skills Demonstrated

### Technical Skills

**Languages & Frameworks:**
- TypeScript (advanced: strict mode, generics, type guards)
- Node.js (async/await, event-driven architecture)
- SQL (PostgreSQL, complex queries, indexes, views)
- Docker & Docker Compose (multi-service orchestration)

**AI/ML Integration:**
- Prompt engineering for LLMs
- Embedding generation and vector search
- Confidence scoring and fallback mechanisms
- Cost optimization for AI APIs

**Database Design:**
- Schema normalization and denormalization trade-offs
- Full-text search with pg_trgm
- Vector similarity search with pgvector
- Migration systems and version control

**DevOps & Infrastructure:**
- Docker containerization
- GitOps deployment workflows
- Reverse proxy configuration (Traefik)
- SSL/TLS certificate management
- Structured logging and monitoring

**API Design:**
- REST API integration (Directus, Discord, AWS)
- Error handling and retry logic
- Rate limiting and throttling
- Authentication (tokens, OAuth)

### Soft Skills

**System Design:**
- Designed scalable architecture supporting future growth
- Made trade-offs between complexity and maintainability
- Documented design decisions for future contributors

**Problem-Solving:**
- Debugged production issues systematically
- Root cause analysis over quick fixes
- Iterative improvement based on real usage

**Documentation:**
- Wrote comprehensive setup guides for non-technical users
- Created technical architecture docs for developers
- Maintained up-to-date command references

**Open Source:**
- Prepared repository for public GitHub release
- Created contribution guidelines
- Chose appropriate license (MIT)

---

## Project Impact & Metrics

### Personal Productivity

**Quantifiable Results:**
- Captured 500+ thoughts in first month
- 85% automatic classification accuracy
- <3 second average capture time
- Zero lost information (complete audit trail)

**Qualitative Benefits:**
- Reduced mental load (everything captured)
- Better project tracking (stale project detection)
- Improved follow-through (daily digest reminders)
- Peace of mind (nightly closure digest)

### Technical Metrics

**Performance:**
- Message processing: 2-3 seconds (including AI)
- Search queries: <100ms
- Database size: ~10MB per 1000 items
- Uptime: 99.9% (production)

**Cost Efficiency:**
- Total monthly cost: ~$5-10
- AWS Bedrock: ~$3-5/month (pay-per-use)
- VPS hosting: ~$5/month
- No vendor lock-in (self-hosted)

### Open Source Contribution

**Repository Stats:**
- Comprehensive documentation (5 major docs)
- Clean codebase (TypeScript strict mode)
- Production-ready (Docker Compose)
- MIT licensed for community use

---

## Future Enhancements

**Planned Features:**
- Relationship mapping (link people to projects)
- Recurring task automation
- Mobile app (React Native)
- Additional integrations (Slack, Telegram, email)
- Collaborative features (shared collections)
- Local AI option (Ollama, Llama)

**Technical Improvements:**
- Automated testing suite (Jest, Playwright)
- Performance optimization (caching, query optimization)
- Horizontal scaling (Redis, load balancing)
- Advanced analytics (usage patterns, insights)

---

## Key Takeaways

### What I Learned

1. **AI Integration:** Practical experience with LLMs beyond simple chatbots - classification, embeddings, summarization with production constraints
2. **Database Design:** Real-world trade-offs between normalization, performance, and maintainability
3. **System Architecture:** Designing for extensibility while keeping initial implementation simple
4. **DevOps:** End-to-end ownership from development to production deployment
5. **Open Source:** Preparing code for public consumption requires different mindset than personal projects

### What I'd Do Differently

1. **Testing:** Add automated tests from the start (TDD approach)
2. **Monitoring:** Implement observability earlier (metrics, traces, alerts)
3. **API Design:** Use GraphQL instead of REST for more flexible queries
4. **State Management:** Consider event sourcing for better audit trail

### Why This Project Matters

This project demonstrates:
- **Full-stack capability:** From database design to AI integration to deployment
- **Production mindset:** Not just a prototype - real users, real data, real uptime requirements
- **System thinking:** Understanding trade-offs and making informed architectural decisions
- **Self-directed learning:** Identified need, researched solutions, implemented production system
- **Open source contribution:** Shared knowledge with community through comprehensive documentation

---

## Technologies Used

**Core Stack:**
- TypeScript, Node.js, PostgreSQL, Docker
- Directus CMS, Discord.js, AWS Bedrock
- pgvector, pg_trgm, Pino, Zod

**Development Tools:**
- Git, GitHub, VS Code, Docker Compose
- Coolify (GitOps), Let's Encrypt (SSL)
- npm, ESLint, Prettier

**AI/ML:**
- Claude 3 Haiku (classification, summarization)
- Amazon Titan (embeddings)
- Vector similarity search (cosine distance)

---

## Contact & Links

**Repository:** [github.com/ryan-stephens/second-brain](https://github.com/ryan-stephens/second-brain)  
**License:** MIT  
**Documentation:** Comprehensive setup, architecture, and contribution guides included

---

*This project showcases my ability to design, build, and deploy production-grade AI applications with emphasis on clean architecture, comprehensive documentation, and real-world problem-solving.*
