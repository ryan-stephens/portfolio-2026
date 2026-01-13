'use client';

import { useState, useEffect } from 'react';
import { useTheme, type ColorScheme, type ThemeMode } from '@/lib/theme-context';
import { Moon, Sun, Palette } from 'lucide-react';

function ThemeSwitcherContent() {
  const { mode, colorScheme, setMode, setColorScheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="relative">
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
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
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
            className="w-full px-3 py-2 rounded-lg bg-muted text-muted-foreground hover:bg-muted/80 text-sm font-medium transition-all"
          >
            Done
          </button>
        </div>
      )}

      {/* Mobile Theme Toggle (Floating) */}
      <div className="fixed bottom-6 right-6 md:hidden z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-3 rounded-full bg-primary text-background shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Toggle theme settings"
        >
          <Palette size={24} />
        </button>
      </div>
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
