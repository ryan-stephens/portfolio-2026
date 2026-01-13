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
        <div className="relative w-full h-48 bg-gradient-to-br from-primary/20 to-accent/20 overflow-hidden">
          {project.screenshots.length > 0 ? (
            <Image
              src={project.screenshots[0]}
              alt={`${project.title} screenshot`}
              fill
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
                  className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary border border-primary/30"
                >
                  {tech}
                </span>
              ))}
              {project.techStack.length > 3 && (
                <span className="text-xs px-2 py-1 rounded-full bg-muted/20 text-muted-foreground">
                  +{project.techStack.length - 3} more
                </span>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="flex gap-2 pt-4 border-t border-border">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 text-xs text-primary hover:text-accent transition-colors"
              >
                <ExternalLink size={16} />
                Live
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="flex items-center gap-2 text-xs text-primary hover:text-accent transition-colors"
              >
                <Github size={16} />
                Code
              </a>
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
