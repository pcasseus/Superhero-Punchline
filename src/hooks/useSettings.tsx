import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { isCategoryId } from '../data/categories';
import type { Settings, ThemePreference } from '../types';
import { readJSON, STORAGE_KEYS, writeJSON } from '../utils/storage';
import { useMediaQuery } from './useMediaQuery';

export const DEFAULT_SETTINGS: Settings = {
  theme: 'system',
  defaultCategory: 'random',
  autoReveal: false,
  animations: true,
};

const THEMES: ThemePreference[] = ['light', 'dark', 'system'];

/** Accept only known values so a hand-edited or outdated localStorage entry can't break the app. */
function sanitize(raw: unknown): Settings {
  const value = (raw && typeof raw === 'object' ? raw : {}) as Partial<Record<keyof Settings, unknown>>;
  return {
    theme: THEMES.includes(value.theme as ThemePreference) ? (value.theme as ThemePreference) : DEFAULT_SETTINGS.theme,
    defaultCategory: isCategoryId(value.defaultCategory) ? value.defaultCategory : DEFAULT_SETTINGS.defaultCategory,
    autoReveal: typeof value.autoReveal === 'boolean' ? value.autoReveal : DEFAULT_SETTINGS.autoReveal,
    animations: typeof value.animations === 'boolean' ? value.animations : DEFAULT_SETTINGS.animations,
  };
}

interface SettingsContextValue {
  settings: Settings;
  update: (patch: Partial<Settings>) => void;
  /** The theme actually on screen after resolving "system". */
  resolvedTheme: 'light' | 'dark';
  /** True when the OS asks for reduced motion. */
  osReducedMotion: boolean;
  /** True when animations should be minimized (app setting OR OS preference). */
  reducedMotion: boolean;
}

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => sanitize(readJSON(STORAGE_KEYS.settings, DEFAULT_SETTINGS)));
  const systemDark = useMediaQuery('(prefers-color-scheme: dark)');
  const osReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  const resolvedTheme: 'light' | 'dark' =
    settings.theme === 'system' ? (systemDark ? 'dark' : 'light') : settings.theme;
  const reducedMotion = !settings.animations || osReducedMotion;

  useEffect(() => writeJSON(STORAGE_KEYS.settings, settings), [settings]);

  // Apply theme + motion preferences to <html> so CSS (and daisyUI) can react.
  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = resolvedTheme === 'dark' ? 'comic-night' : 'comic';
    root.dataset.motion = reducedMotion ? 'reduced' : 'full';
    root.style.colorScheme = resolvedTheme;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', resolvedTheme === 'dark' ? '#10142b' : '#d7141a');
  }, [resolvedTheme, reducedMotion]);

  const update = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => sanitize({ ...prev, ...patch }));
  }, []);

  const value = useMemo(
    () => ({ settings, update, resolvedTheme, osReducedMotion, reducedMotion }),
    [settings, update, resolvedTheme, osReducedMotion, reducedMotion],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used inside <SettingsProvider>');
  return ctx;
}
