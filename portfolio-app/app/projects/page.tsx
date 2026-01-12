'use client';

import { useState, useEffect } from 'react';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/content/projects';

type Category = 'all' | 'ai-ml' | 'full-stack' | 'hybrid';

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const categories: Array<{ id: Category; label: string }> = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai-ml', label: 'AI/ML' },
    { id: 'full-stack', label: 'Full-Stack' },
    { id: 'hybrid', label: 'Hybrid' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-12 pb-20">
      {/* Header */}
      <section className="pt-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
              Projects
            </h1>
            <p className="text-lg text-muted-foreground">
              A collection of production-grade AI systems and full-stack applications
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  activeCategory === category.id
                    ? 'bg-gradient-to-r from-primary to-accent text-background'
                    : 'border border-primary/30 text-muted-foreground hover:text-primary hover:border-primary/50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No projects found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
