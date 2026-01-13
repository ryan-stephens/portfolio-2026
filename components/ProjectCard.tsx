'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/content/projects';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
}

export default function ProjectCard({ project, featured = false }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`} className="group">
      <div 
        className={`glass rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 cursor-pointer h-full flex flex-col focus-within:ring-2 focus-within:ring-primary/50 ${
          featured ? 'md:col-span-2' : ''
        }`}
        role="article"
        aria-label={`${project.title} project`}
      >
        {/* Image */}
        <div className="relative w-full h-48 bg-muted/20 overflow-hidden">
          {project.screenshots.length > 0 ? (
            <Image
              src={project.screenshots[0]}
              alt={`${project.title} screenshot`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="text-4xl font-bold gradient-text mb-2">
                  {project.title.split(' ')[0][0]}
                </div>
                <p className="text-sm text-muted-foreground">{project.category}</p>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 flex-1">
            {project.tagline}
          </p>

          {/* Tech Stack */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.techStack.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-1 rounded-full bg-primary/25 text-primary dark:text-white border border-primary/50"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="text-xs px-2 py-1 rounded-full bg-muted/40 text-foreground border border-muted/60">
                  +{project.techStack.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-2 pt-4 border-t border-border">
            {project.liveUrl && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(project.liveUrl, '_blank');
                }}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-primary/25 text-primary dark:text-white border border-primary/50 hover:bg-primary/35 transition-colors cursor-pointer font-medium"
              >
                <ExternalLink size={14} />
                Live
              </button>
            )}
            {project.githubUrl && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  window.open(project.githubUrl, '_blank');
                }}
                className="flex items-center gap-1 text-xs px-2 py-1 rounded bg-primary/25 text-primary dark:text-white border border-primary/50 hover:bg-primary/35 transition-colors cursor-pointer font-medium"
              >
                <Github size={14} />
                Code
              </button>
            )}
            <div className="flex-1" />
            <div className="flex items-center gap-1 text-xs text-muted-foreground group-hover:text-primary transition-colors">
              View Details
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
