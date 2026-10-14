/** Namespaced, crash-proof wrappers around window.localStorage. */
const PREFIX = 'superhero-punchlines:';

export const STORAGE_KEYS = {
  settings: `${PREFIX}settings`,
  favorites: `${PREFIX}favorites`,
} as const;

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    // Private mode, blocked storage, or corrupted JSON: fall back to defaults.
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or blocked; the app keeps working for this visit.
  }
}
