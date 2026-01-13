import Link from 'next/link';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import SkillBadge from '@/components/SkillBadge';
import { getFeaturedProjects } from '@/content/projects';
import { skillCategories } from '@/content/skills';

export default function Home() {
  const featuredProjects = getFeaturedProjects();
  const displayedCategories = skillCategories.slice(0, 4);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6 text-center">
            <div className="space-y-4 animate-slide-in-left">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground">
                GenAI & Full-Stack
                <br />
                Engineer
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Building production-grade AI systems and modern web applications. Specializing in LLMs, MLOps, and scalable infrastructure.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <Link
                href="/projects"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
              >
                View Projects
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg border-2 border-primary text-primary hover:bg-primary/10 transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-6 pt-4 animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <a
                href="https://github.com/ryan-stephens?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                aria-label="GitHub"
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/ryan-stephens-4a518359/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a
                href="mailto:ryan.stephens15@gmail.com"
                className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-125 hover:-translate-y-1"
                aria-label="Email"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-2 animate-slide-in-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Featured Projects
              </h2>
              <p className="text-muted-foreground">
                Production-grade AI systems and full-stack applications
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} featured={project.featured} />
              ))}
            </div>

            <div className="text-center pt-4 animate-slide-in-right">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-primary hover:text-accent transition-all duration-300 font-semibold hover:gap-3"
              >
                View All Projects
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Showcase */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-2 animate-slide-in-right">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                Skills & Expertise
              </h2>
              <p className="text-muted-foreground">
                70+ technologies across AI/ML and full-stack development
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {displayedCategories.map((category) => (
                <div
                  key={category.name}
                  className="glass rounded-lg p-6 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
                >
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {category.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.slice(0, 8).map((skill) => (
                      <SkillBadge key={skill} skill={skill} variant="primary" size="sm" />
                    ))}
                    {category.skills.length > 8 && (
                      <span className="text-xs text-muted-foreground">
                        +{category.skills.length - 8} more
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center pt-4 animate-slide-in-left">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-primary hover:text-accent transition-all duration-300 font-semibold hover:gap-3"
              >
                View All Skills
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="glass rounded-lg p-12 text-center space-y-6 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Ready to collaborate?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you&apos;re looking to build AI systems, need full-stack development, or want to discuss technology, I&apos;d love to hear from you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
            >
              Send me a message
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
