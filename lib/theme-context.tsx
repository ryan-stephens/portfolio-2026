'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

export type ColorScheme = 'blue' | 'purple' | 'cyan' | 'emerald' | 'rose';
export type ThemeMode = 'light' | 'dark' | 'system';

interface ThemeContextType {
  mode: ThemeMode;
  colorScheme: ColorScheme;
  setMode: (mode: ThemeMode) => void;
  setColorScheme: (scheme: ColorScheme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Professional, muted color schemes with HSL values (hue saturation lightness)
const COLOR_SCHEMES: Record<ColorScheme, { hue: number; saturation: number; lightness: number }> = {
  blue: {
    hue: 220,
    saturation: 70,
    lightness: 50,
  },
  purple: {
    hue: 260,
    saturation: 60,
    lightness: 50,
  },
  cyan: {
    hue: 200,
    saturation: 65,
    lightness: 50,
  },
  emerald: {
    hue: 160,
    saturation: 50,
    lightness: 45,
  },
  rose: {
    hue: 350,
    saturation: 60,
    lightness: 50,
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>('dark');
  const [colorScheme, setColorSchemeState] = useState<ColorScheme>('blue');
  const [isDark, setIsDark] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage and apply theme
  useEffect(() => {
    const savedMode = localStorage.getItem('theme-mode') as ThemeMode | null;
    const savedScheme = localStorage.getItem('color-scheme') as ColorScheme | null;

    const newMode = savedMode || 'dark';
    const newScheme = savedScheme || 'blue';

    setModeState(newMode);
    setColorSchemeState(newScheme);

    // Apply theme immediately
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark =
      newMode === 'dark' || (newMode === 'system' && prefersDark);

    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
    applyColorScheme(newScheme);

    setMounted(true);
  }, []);

  // Update theme when mode or colorScheme changes
  useEffect(() => {
    if (!mounted) return;

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldBeDark =
      mode === 'dark' || (mode === 'system' && prefersDark);

    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
    applyColorScheme(colorScheme);
  }, [mode, colorScheme, mounted]);

  const applyColorScheme = (scheme: ColorScheme) => {
    const { hue, saturation, lightness } = COLOR_SCHEMES[scheme];
    document.documentElement.style.setProperty(
      '--primary',
      `${hue} ${saturation}% ${lightness}%`
    );
  };

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem('theme-mode', newMode);
  };

  const setColorScheme = (newScheme: ColorScheme) => {
    setColorSchemeState(newScheme);
    localStorage.setItem('color-scheme', newScheme);
  };

  return (
    <ThemeContext.Provider value={{ mode, colorScheme, setMode, setColorScheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}
