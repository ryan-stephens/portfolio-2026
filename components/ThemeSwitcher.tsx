'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme, type ColorScheme, type ThemeMode } from '@/lib/theme-context';
import { Moon, Sun, Palette } from 'lucide-react';

function ThemeSwitcherContent() {
  const { mode, colorScheme, setMode, setColorScheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
    return undefined;
  }, [isOpen]);

  const colorSchemes: ColorScheme[] = ['blue', 'purple', 'cyan', 'emerald', 'rose'];
  const themeModes: ThemeMode[] = ['light', 'dark', 'system'];

  const colorLabels: Record<ColorScheme, string> = {
    blue: 'Blue',
    purple: 'Purple',
    cyan: 'Cyan',
    emerald: 'Emerald',
    rose: 'Rose',
  };

  const modeLabels: Record<ThemeMode, string> = {
    light: 'Light',
    dark: 'Dark',
    system: 'System',
  };

  const colorDots: Record<ColorScheme, string> = {
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
    cyan: 'bg-cyan-500',
    emerald: 'bg-emerald-500',
    rose: 'bg-rose-500',
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-card transition-colors"
        aria-label="Toggle theme settings"
        title="Theme settings"
      >
        <Palette size={20} className="text-muted-foreground hover:text-foreground transition-colors" />
      </button>

      {/* Theme Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 bg-card border border-border rounded-lg shadow-lg z-50 p-4 space-y-4">
          {/* Mode Selection */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Theme Mode
            </label>
            <div className="grid grid-cols-3 gap-2">
              {themeModes.map((themeMode) => (
                <button
                  key={themeMode}
                  onClick={() => setMode(themeMode)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    mode === themeMode
                      ? 'bg-primary text-background'
                      : 'bg-muted text-foreground hover:bg-muted/80 hover:text-foreground'
                  }`}
                >
                  {themeMode === 'light' && <Sun size={16} className="mx-auto mb-1" />}
                  {themeMode === 'dark' && <Moon size={16} className="mx-auto mb-1" />}
                  {themeMode === 'system' && <Palette size={16} className="mx-auto mb-1" />}
                  <div className="text-xs">{modeLabels[themeMode]}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Color Scheme Selection */}
          <div>
            <label className="text-sm font-semibold text-foreground mb-2 block">
              Color Scheme
            </label>
            <div className="grid grid-cols-5 gap-2">
              {colorSchemes.map((scheme) => (
                <button
                  key={scheme}
                  onClick={() => setColorScheme(scheme)}
                  className={`w-full aspect-square rounded-lg transition-all border-2 ${
                    colorScheme === scheme
                      ? 'border-foreground scale-110'
                      : 'border-transparent hover:scale-105'
                  }`}
                  title={colorLabels[scheme]}
                >
                  <div className={`w-full h-full rounded-[6px] ${colorDots[scheme]}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="w-full px-3 py-2 rounded-lg bg-muted text-foreground hover:bg-muted/80 text-sm font-medium transition-all"
          >
            Done
          </button>
        </div>
      )}

    </div>
  );
}

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return <ThemeSwitcherContent />;
}
