'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ScreenshotSlideshowProps {
  screenshots: string[];
  projectTitle: string;
}

export default function ScreenshotSlideshow({
  screenshots,
  projectTitle,
}: ScreenshotSlideshowProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!screenshots || screenshots.length === 0) {
    return null;
  }

  if (!mounted) {
    return (
      <div className="relative w-full bg-card rounded-lg overflow-hidden border border-border">
        <div className="relative aspect-video bg-muted animate-pulse" />
      </div>
    );
  }

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? screenshots.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === screenshots.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="space-y-4">
      {/* Main Slideshow */}
      <div className="relative w-full bg-card rounded-lg overflow-hidden border border-border">
        <div className="relative aspect-video">
          <Image
            src={screenshots[currentIndex]}
            alt={`${projectTitle} screenshot ${currentIndex + 1}`}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Navigation Buttons */}
        {screenshots.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
              aria-label="Previous screenshot"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors"
              aria-label="Next screenshot"
            >
              <ChevronRight size={24} />
            </button>

            {/* Slide Counter */}
            <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {screenshots.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {screenshots.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {screenshots.map((screenshot, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                index === currentIndex
                  ? 'border-primary ring-2 ring-primary/50'
                  : 'border-border hover:border-primary/50'
              }`}
              aria-label={`Go to screenshot ${index + 1}`}
            >
              <Image
                src={screenshot}
                alt={`${projectTitle} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
