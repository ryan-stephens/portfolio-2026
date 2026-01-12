# AI Infrastructure Template - Project Summary

**Project Type**: Self-Hosted AI Product Infrastructure  
**Status**: Production-Ready Foundation (Phase 1 Complete)  
**Deployment**: Docker + Coolify on VPS  
**Live URL**: https://ai.ryan-stephens.dev  
**Completion**: ~65% (Infrastructure + Development Phase)

---

## 🎯 Project Intent

A **domain-agnostic, production-ready AI infrastructure template** designed to build any type of AI product with built-in best practices for AI engineering. Based on Incident.io's AI Engineering methodology, this template provides a complete foundation for developing, deploying, and iterating on AI applications following the three-phase maturity model:

1. **Development** (Build It) - Prompts + Evals
2. **Production** (Ship It) - Traces + Scorecards
3. **Evolution** (Improve It) - Backtests + Leaderboards

### Key Design Principles

- **Domain Agnostic** - Works for any AI interaction type (chat, extraction, classification, code generation, etc.)
- **Self-Hosted** - No vendor lock-in, runs entirely on your infrastructure
- **Production-First** - Built for scale and reliability from day one
- **Cost-Conscious** - Full instrumentation and cost tracking on every LLM call
- **Type-Safe** - Pydantic models throughout, proper error handling
- **Compositional** - Modular architecture with swappable components

---

## 🏗️ Architecture Overview

### Infrastructure Stack (10 Services)

**Frontend Layer**
- **Traefik** - Reverse proxy with automatic SSL (Let's Encrypt)
- **React Frontend** - Vite + TypeScript + shadcn/ui components

**Application Layer**
- **FastAPI Backend** - Python 3.12 REST API
- **Celery Worker** - Background task processing

**Data Layer**
- **PostgreSQL 16** - Primary database with pgvector extension
- **Redis 7** - Caching and message broker
- **MinIO** - S3-compatible object storage

**Observability Layer**
- **Prometheus** - Metrics collection
- **Grafana** - Dashboards and visualization
- **Loki + Promtail** - Log aggregation

### Deployment Architecture

**Production**:
- VPS with Coolify orchestration
- Docker Compose for service management
- Automatic SSL via Traefik + Let's Encrypt
- All services accessible via subdomains

**Local Development**:
- Windows PC with WSL2 + Docker Desktop
- Identical docker-compose.yml as production
- Hot reload enabled for rapid iteration

---

## 💻 Tech Stack

### Backend Technologies

**Core Framework**
- **FastAPI 0.109.0** - Modern async Python web framework
- **Uvicorn** - ASGI server with hot reload
- **Pydantic 2.5.3** - Data validation and settings management

**Database & ORM**
- **SQLAlchemy 2.0.25** - SQL toolkit and ORM
- **Alembic 1.13.1** - Database migrations
- **PostgreSQL 16** - Primary database
- **pgvector 0.2.4** - Vector similarity search extension
- **asyncpg 0.29.0** - Async PostgreSQL driver

**Caching & Background Tasks**
- **Redis 5.0.1** - In-memory data store
- **Celery 5.3.6** - Distributed task queue

**Storage**
- **MinIO 7.2.3** - S3-compatible object storage
- **boto3 1.34.34** - AWS SDK (for Bedrock)

**LLM Integration**
- **LangChain 0.1.4** - LLM framework
- **OpenAI 1.10.0** - OpenAI API client
- **Anthropic 0.8.1** - Anthropic API client
- **boto3** - AWS Bedrock integration

**Monitoring & Utilities**
- **prometheus-client 0.19.0** - Metrics instrumentation
- **slowapi 0.1.9** - Rate limiting
- **pyyaml 6.0.1** - YAML parsing for test cases
- **python-jose** - JWT token handling
- **passlib** - Password hashing

### Frontend Technologies

**Core Framework**
- **React 18.2.0** - UI library
- **TypeScript 5.3.3** - Type-safe JavaScript
- **Vite 5.0.11** - Build tool and dev server

**UI Components & Styling**
- **shadcn/ui** - Radix UI component library
    - Accordion, Dialog, Dropdown, Label, Select, Separator, Tabs, Toast
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Lucide React 0.309.0** - Icon library
- **class-variance-authority** - Component variants
- **tailwind-merge** - Tailwind class merging

**Routing & HTTP**
- **React Router DOM 6.30.2** - Client-side routing
- **Axios 1.6.5** - HTTP client

### Infrastructure Technologies

**Containerization**
- **Docker** - Container runtime
- **Docker Compose** - Multi-container orchestration

**Reverse Proxy**
- **Traefik** - Cloud-native edge router with automatic SSL

**Monitoring Stack**
- **Prometheus** - Time-series metrics database
- **Grafana** - Metrics visualization and dashboards
- **Loki** - Log aggregation system
- **Promtail** - Log shipping agent

**Deployment**
- **Coolify** - Self-hosted PaaS on VPS
- **GitHub Actions** - CI/CD pipeline (planned)

---

## 🎨 Core Features Implemented

### 1. Prompt Management System (100% Complete) ✅

**Compositional Architecture**
- **System Prompts** - Reusable system-level instructions
- **User Templates** - Input templates with variable extraction
- **Prompt Compositions** - Combine system prompts + user templates

**Features**
- Version management with auto-increment (v1.0 → v1.1 on edit)
- Default version management for production use
- Variable extraction from templates (e.g., `{user_input}`, `{document}`)
- Test prompts before saving with real LLM calls
- View metrics (tokens, cost, latency) for each test
- Professional shadcn/ui interface with tabs and modals

**API Endpoints**
```
POST   /api/prompts              - Create prompt composition
GET    /api/prompts              - List prompts (filter by type, default)
GET    /api/prompts/{id}         - Get specific prompt
PUT    /api/prompts/{id}         - Update prompt (auto-version)
DELETE /api/prompts/{id}         - Delete prompt
POST   /api/prompts/{id}/set-default - Set as default version
GET    /api/prompts/{name}/versions  - List all versions
```

### 2. Evaluation Framework (95% Complete) ✅

**Domain-Agnostic Matcher System**
- **ExactMatcher** - Exact string matching
- **ContainsMatcher** - Substring matching (case-insensitive option)
- **RegexMatcher** - Pattern matching with regex
- **LLMJudgeMatcher** - Semantic validation with cost tracking
- **JSONStructureMatcher** - JSON validation for required keys
- **FieldAccuracyMatcher** - Field-level extraction validation

**Execution Features**
- Parallel execution with semaphore-based concurrency control
- Redis-backed response caching to reduce costs
- Strategy-based execution via interaction type registry
- Proper cost tracking (prompt cost + judge cost separated)
- YAML import for test cases
- "Steal as eval" from interactions
- Regression comparison between runs

**API Endpoints**
```
POST   /api/evals/datasets                    - Create dataset
GET    /api/evals/datasets                    - List datasets
DELETE /api/evals/datasets/{id}               - Delete dataset
POST   /api/evals/datasets/{id}/test-cases    - Add test case
POST   /api/evals/datasets/{id}/import-yaml   - Import from YAML
POST   /api/evals/runs                        - Run evaluation
GET    /api/evals/runs                        - List eval runs
GET    /api/evals/runs/{id}                   - Get run details
POST   /api/evals/compare-runs                - Compare runs
```

### 3. Multi-Provider LLM Support (33% Complete) ⚠️

**AWS Bedrock Provider (100% Working)**
- Dynamic model listing from AWS API
- Static fallback catalog with 15+ models
- Inference profile support (global, regional)
- Cost calculation per model
- Token counting and latency tracking
- **Production Status**: Claude Sonnet 4.5 operational

**Supported Models**
- Claude Sonnet 4.5, 3.5 v2, 3.5, 3.5 Haiku
- Claude 3 Opus, Sonnet, Haiku
- Amazon Titan Express, Lite
- Meta Llama 3.1 70B, 3.1 8B, 3.2 90B
- Mistral 7B, Large, Mixtral 8x7B

**OpenAI & Anthropic** (Stubs Only)
- Interface defined, implementation pending

### 4. LLM Service Layer

**Provider Abstraction**
- Unified interface for all LLM providers
- Automatic cost calculation
- Token counting and latency measurement
- Error handling and retry logic
- Provider factory pattern for easy switching

**Instrumentation**
- Every LLM call tracked with:
    - Input/output tokens
    - Cost in USD
    - Latency in milliseconds
    - Model and provider used
    - Full prompt and response (for debugging)

---

## 📊 Database Schema

### Core AI Tables

**Prompts & Components**
```sql
prompts              - Prompt compositions (system + user template)
system_prompts       - Reusable system prompts
user_templates       - Reusable user input templates
```

**Evaluation System**
```sql
eval_datasets        - Collections of test cases
eval_test_cases      - Individual test cases
eval_runs            - Evaluation execution results
eval_results         - Per-test-case results
```

**Interaction Tracking** (Schema exists, not yet implemented)
```sql
ai_interactions      - All AI interactions (domain-agnostic)
ai_spans             - LLM call traces for observability
```

**Quality Measurement** (Schema exists, partial implementation)
```sql
scorecards           - Objective quality metrics
backtest_datasets    - Collections for regression testing
backtest_results     - Before/after comparison results
```

**User Management**
```sql
users                - User accounts
```

---

## 🎯 Supported Use Cases

The template is designed to handle **any type of AI interaction**:

| Interaction Type | Example Use Cases | Evaluation Focus |
|-----------------|-------------------|------------------|
| **Conversational AI** | Chatbots, customer support, virtual assistants | Alignment, helpfulness, conversation flow |
| **Document Extraction** | Invoice processing, form parsing, data extraction | Accuracy, completeness, field-level precision |
| **Risk Assessment** | Insurance underwriting, credit scoring, fraud detection | Accuracy, consistency, regulatory compliance |
| **Code Generation** | AI coding assistants, code review, refactoring | Correctness, idiomatic style, test coverage |
| **Content Generation** | Marketing copy, summaries, translations | Quality, tone, factual accuracy |
| **Investigation/Diagnosis** | Incident response, medical diagnosis, troubleshooting | Root cause accuracy, reasoning quality |
| **Recommendation Systems** | Product recommendations, content curation | Relevance, diversity, user satisfaction |

---

## 📁 Project Structure

```
AI-Infrastructure-Template/
├── backend/
│   ├── app/
│   │   ├── api/v1/              # REST API endpoints
│   │   │   ├── prompts.py       # Prompt management API
│   │   │   ├── prompt_components.py  # System prompts + templates
│   │   │   ├── llm.py           # LLM provider/model API
│   │   │   └── evals.py         # Evaluation framework API
│   │   ├── core/                # Core business logic
│   │   │   ├── llm/             # LLM provider abstraction
│   │   │   │   ├── base.py      # Provider interface
│   │   │   │   ├── service.py   # LLM service with instrumentation
│   │   │   │   ├── factory.py   # Provider factory
│   │   │   │   └── providers/   # Provider implementations
│   │   │   │       ├── bedrock.py    # AWS Bedrock (WORKING)
│   │   │   │       ├── openai.py     # OpenAI (STUB)
│   │   │   │       └── anthropic.py  # Anthropic (STUB)
│   │   │   ├── evals/           # Evaluation framework
│   │   │   │   ├── framework.py      # Eval execution engine
│   │   │   │   ├── matchers.py       # 6 matcher implementations
│   │   │   │   ├── matcher_factory.py # Matcher registry
│   │   │   │   ├── strategies.py     # Interaction strategies
│   │   │   │   ├── cache.py          # Response caching
│   │   │   │   ├── yaml_loader.py    # YAML import
│   │   │   │   └── llm_judge.py      # LLM-as-judge
│   │   │   ├── prompts/         # Prompt management
│   │   │   ├── tracing/         # AI tracing (STUB)
│   │   │   ├── scorecards/      # Quality graders (PARTIAL)
│   │   │   └── backtests/       # Regression testing (STUB)
│   │   ├── db/                  # Database layer
│   │   │   ├── models.py        # SQLAlchemy models
│   │   │   └── session.py       # DB session management
│   │   ├── schemas/             # Pydantic schemas
│   │   ├── services/            # Business logic services
│   │   └── utils/               # Utilities
│   ├── alembic/                 # Database migrations
│   ├── requirements.txt         # Python dependencies
│   └── Dockerfile               # Backend container
├── frontend/
│   ├── src/
│   │   ├── pages/               # Page components
│   │   │   ├── Prompts.tsx      # Prompt management (COMPLETE)
│   │   │   ├── Evaluations.tsx  # Eval framework (COMPLETE)
│   │   │   ├── Interactions.tsx # Interaction tracking (STUB)
│   │   │   ├── Traces.tsx       # AI tracing (STUB)
│   │   │   ├── Scorecards.tsx   # Quality metrics (STUB)
│   │   │   └── Backtests.tsx    # Regression testing (STUB)
│   │   ├── components/          # Reusable components
│   │   │   └── ui/              # shadcn/ui components
│   │   ├── services/            # API client
│   │   └── types/               # TypeScript types
│   ├── package.json             # Node dependencies
│   └── Dockerfile               # Frontend container
├── docker-compose.yml           # Service orchestration
├── init.sql                     # Database initialization
├── docs/                        # Documentation
│   ├── AI_INFRASTRUCTURE_TEMPLATE.md  # Full architecture docs
│   └── CURRENT_STATE.md         # Implementation status
└── README.md                    # Quick start guide
```

---

## 🚀 Deployment Status

### Production Environment ✅

**Live URLs**
- Frontend: https://ai.ryan-stephens.dev
- Backend API: https://api.ryan-stephens.dev
- MinIO Console: https://storage-console.ryan-stephens.dev
- Grafana: https://dashboards.ryan-stephens.dev
- Prometheus: https://metrics.ryan-stephens.dev

**Infrastructure**
- All 10 services deployed and running
- HTTPS with valid SSL certificates (Let's Encrypt)
- Real health checks implemented
- Database schema with pgvector extension
- Frontend-backend integration working

### Local Development ✅

**Setup**
- Windows PC with WSL2 + Docker Desktop
- Same docker-compose.yml as production
- Hot reload enabled for rapid iteration
- All services accessible on localhost

---

## 📈 Implementation Progress

### Phase 1: Development (Build It) - 85% Complete ✅

- ✅ Prompt abstraction layer (100%)
- ✅ Evaluation framework (95%)
- ⚠️ Multi-provider support (33% - Bedrock only)

### Phase 2: Production (Ship It) - 15% Complete ❌

- ❌ Interaction management (0%)
- ❌ AI tracing system (10%)
- ⚠️ Scorecard system (40% - 2/5 graders)

### Phase 3: Evolution (Improve It) - 10% Complete ❌

- ❌ Backtest framework (10%)
- ❌ Leaderboard system (0%)

---

## 🎯 Key Strengths

1. **Production-Ready Foundation** - Infrastructure and prompt management fully operational
2. **Domain Agnostic** - Works for any AI interaction type without modification
3. **Evaluation Framework** - Fully functional with extensible matcher system
4. **Type Safety** - Pydantic throughout, proper error handling
5. **Professional UI** - Consistent shadcn/ui styling across all pages
6. **Cost Tracking** - Full instrumentation on every LLM call
7. **Self-Hosted** - No vendor lock-in, runs entirely on your infrastructure
8. **Modular Architecture** - Easy to swap components and extend functionality

---

## 🔧 Technical Highlights

### Backend Architecture

**Provider Abstraction Pattern**
- Abstract base class defines contract for all LLM providers
- Factory pattern for provider instantiation
- Unified request/response models across providers
- Automatic cost calculation and token counting

**Evaluation Framework**
- Parallel execution with configurable concurrency
- Redis-backed caching to reduce costs
- Strategy pattern for different interaction types
- Extensible matcher registry for custom validators

**Database Design**
- Domain-agnostic schema supporting any interaction type
- JSONB columns for flexible data storage
- UUID primary keys for distributed systems
- Proper indexes for performance

### Frontend Architecture

**Component-Based Design**
- shadcn/ui components for consistent styling
- Reusable modals and forms
- Responsive grid layouts
- Professional dark mode theme

**State Management**
- React hooks for local state
- Axios for API communication
- Optimistic updates for better UX

---

## 🎓 Learning & Best Practices

This project demonstrates:

1. **AI Engineering Maturity Model** - Three-phase approach (Development → Production → Evolution)
2. **Prompt Versioning** - Track and manage prompt changes over time
3. **Evaluation-Driven Development** - Test prompts before deploying
4. **Cost Consciousness** - Track every dollar spent on LLM calls
5. **Observability** - Full tracing and metrics from day one
6. **Self-Hosting** - Avoid vendor lock-in with containerized infrastructure
7. **Type Safety** - Pydantic models prevent runtime errors
8. **Domain Agnostic Design** - Build once, use for any AI product

---

## 🔮 Future Roadmap

### High Priority
1. Complete interaction tracking and management
2. Implement AI tracing system with rerun capability
3. Finish scorecard graders (Alignment, Accuracy, Completeness)
4. Implement OpenAI and Anthropic providers

### Medium Priority
5. Complete backtest framework for safe iteration
6. Add CI/CD integration for automated evals
7. Implement pulse channels for quality monitoring

### Low Priority
8. Build leaderboard system for team culture
9. Add more LLM providers (Cohere, Mistral, etc.)
10. Create Grafana dashboards for metrics

---

## 📝 For AI Agents

When working with this codebase:

1. **Always use shadcn/ui components** - Never create custom styled components
2. **Maintain type safety** - Pydantic models for all data structures
3. **Domain agnostic design** - Never hardcode domain-specific logic
4. **Version everything** - Prompts, evals, all artifacts
5. **Instrument everything** - Tokens, cost, latency on all LLM calls
6. **Test with evals** - Not traditional unit tests
7. **Follow existing patterns** - Reference implementations in Prompts.tsx and Evaluations.tsx

---

## 📞 Project Context

**Built By**: Ryan Stephens  
**Purpose**: Production-ready template for building any AI product  
**Inspiration**: Incident.io's AI Engineering best practices  
**Status**: Foundation complete, ready for Phase 2 implementation  
**License**: Educational and commercial use

---

**Last Updated**: January 7, 2025
