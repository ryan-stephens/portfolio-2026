import SkillBadge from '@/components/SkillBadge';
import { skillCategories } from '@/content/skills';

export default function AboutPage() {
  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="pt-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              About Me
            </h1>
            <p className="text-lg text-muted-foreground">
              GenAI Engineer & Full-Stack Developer
            </p>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto glass rounded-lg p-8 space-y-6">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Background</h2>
            <p className="text-foreground leading-relaxed">
              I&apos;m an AI Engineer with 10+ years of software engineering experience, specializing in production LLM applications and MLOps infrastructure. My journey spans from traditional full-stack development to cutting-edge AI systems, combining deep technical expertise with a focus on building reliable, production-grade solutions.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Expertise</h2>
            <p className="text-foreground leading-relaxed">
              I specialize in building production AI systems with systematic evaluation frameworks, complete observability, and regression testing. My work includes designing domain-agnostic AI infrastructure templates, implementing medical data extraction platforms with enterprise MLOps practices, and creating full-stack applications with modern web technologies.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Approach</h2>
            <p className="text-foreground leading-relaxed">
              I believe in quality-first engineering with strong foundations in SOLID principles, type safety, and comprehensive testing. Whether working with LLMs, designing scalable infrastructure, or building user-facing applications, I focus on solutions that are maintainable, observable, and deliver real business value.
            </p>
          </div>
        </div>
      </section>

      {/* Skills by Category */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="text-3xl font-bold text-foreground">Skills & Technologies</h2>

          <div className="space-y-6">
            {skillCategories.map((category) => (
              <div key={category.name} className="space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {category.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <SkillBadge key={skill} skill={skill} variant="primary" size="md" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Highlights */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Experience Highlights</h2>

          <div className="space-y-4">
            <div className="glass rounded-lg p-6 space-y-2">
              <h3 className="text-lg font-bold text-foreground">
                Production AI Systems
              </h3>
              <p className="text-muted-foreground">
                Built medical data extraction platforms with systematic evaluation frameworks, LangGraph agents, and complete observability using custom traces and LangSmith integration.
              </p>
            </div>

            <div className="glass rounded-lg p-6 space-y-2">
              <h3 className="text-lg font-bold text-foreground">
                MLOps Infrastructure
              </h3>
              <p className="text-muted-foreground">
                Designed and deployed self-hosted MLOps platforms with compositional prompt architecture, evaluation frameworks, and complete observability stacks using Prometheus, Grafana, and Loki.
              </p>
            </div>

            <div className="glass rounded-lg p-6 space-y-2">
              <h3 className="text-lg font-bold text-foreground">
                Full-Stack Development
              </h3>
              <p className="text-muted-foreground">
                Developed production applications spanning desktop (Electron), web (Next.js, React), and backend (FastAPI, Node.js) with payment integration, authentication, and comprehensive testing.
              </p>
            </div>

            <div className="glass rounded-lg p-6 space-y-2">
              <h3 className="text-lg font-bold text-foreground">
                Cloud & DevOps
              </h3>
              <p className="text-muted-foreground">
                Deployed and managed applications on VPS with Docker, Coolify, Kubernetes, and AWS services. Implemented CI/CD pipelines, automated deployments, and infrastructure as code.
              </p>
            </div>

            <div className="glass rounded-lg p-6 space-y-2">
              <h3 className="text-lg font-bold text-foreground">
                Quality & Testing
              </h3>
              <p className="text-muted-foreground">
                Implemented comprehensive testing strategies including 298 E2E tests with 100% pass rate, systematic evaluations for AI systems, and regression testing frameworks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="glass rounded-lg p-8 text-center space-y-4">
            <h2 className="text-2xl font-bold text-foreground">
              Interested in working together?
            </h2>
            <p className="text-muted-foreground">
              I'm always open to discussing new projects, opportunities, or ideas.
            </p>
            <a
              href="mailto:ryan.stephens15@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-background font-semibold hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
            >
              Send me an email
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
