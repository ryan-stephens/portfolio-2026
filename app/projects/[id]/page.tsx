import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import SkillBadge from '@/components/SkillBadge';
import ScreenshotSlideshow from '@/components/ScreenshotSlideshow';
import { getProjectById, projects } from '@/content/projects';

interface ProjectDetailPageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = getProjectById(params.id);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const previousProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <div className="space-y-12 pb-20">
      {/* Back Button */}
      <div className="pt-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-primary hover:text-accent transition-colors font-semibold"
          >
            <ArrowLeft size={20} />
            Back to Projects
          </Link>
        </div>
      </div>

      {/* Header */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-primary/25 text-primary dark:text-white text-sm font-medium capitalize border border-primary/50">
                {project.category.replace('-', ' ')}
              </span>
              <span className="text-muted-foreground text-sm">{project.year}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              {project.title}
            </h1>

            <p className="text-xl text-muted-foreground">
              {project.tagline}
            </p>

            {/* Links */}
            <div className="flex flex-wrap gap-4 pt-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors font-semibold"
                >
                  <ExternalLink size={18} />
                  Visit Live
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-lg border-2 border-primary text-primary hover:bg-primary/10 transition-colors font-semibold"
                >
                  <Github size={18} />
                  View Code
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Tech Stack</h2>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech) => (
              <SkillBadge key={tech} skill={tech} variant="primary" size="md" />
            ))}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto glass rounded-lg p-8">
          <p className="text-lg text-foreground leading-relaxed whitespace-pre-wrap">
            {project.longDescription}
          </p>
        </div>
      </section>

      {/* Screenshots Slideshow */}
      {project.screenshots.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Screenshots</h2>
            <ScreenshotSlideshow
              screenshots={project.screenshots}
              projectTitle={project.title}
            />
          </div>
        </section>
      )}

      {/* Highlights */}
      {project.highlights.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Key Highlights</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.highlights.map((highlight, index) => (
                <div key={index} className="glass rounded-lg p-4 flex gap-3">
                  <div className="text-primary font-bold text-lg">✓</div>
                  <p className="text-foreground">{highlight}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Metrics */}
      {project.metrics && project.metrics.length > 0 && (
        <section className="px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Metrics</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {project.metrics.map((metric, index) => (
                <div key={index} className="glass rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold gradient-text mb-1">
                    {metric.value}
                  </div>
                  <p className="text-sm text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Navigation */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-4">
            {previousProject ? (
              <Link
                href={`/projects/${previousProject.id}`}
                className="glass rounded-lg p-4 hover:border-primary/50 transition-all group"
              >
                <p className="text-xs text-muted-foreground mb-1">← Previous</p>
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {previousProject.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link
                href={`/projects/${nextProject.id}`}
                className="glass rounded-lg p-4 hover:border-primary/50 transition-all group text-right"
              >
                <p className="text-xs text-muted-foreground mb-1">Next →</p>
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  {nextProject.title}
                </p>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
