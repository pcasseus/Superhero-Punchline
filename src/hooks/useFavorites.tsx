import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { JOKE_BY_ID } from '../data/jokes';
import { readJSON, STORAGE_KEYS, writeJSON } from '../utils/storage';

interface FavoritesContextValue {
  /** Favorite joke ids, newest first. */
  ids: string[];
  isFavorite: (id: string) => boolean;
  /** Adds or removes a joke; returns true if it is now a favorite. */
  toggle: (id: string) => boolean;
  remove: (id: string) => void;
  clear: () => void;
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null);

function loadFavorites(): string[] {
  const raw = readJSON<unknown>(STORAGE_KEYS.favorites, []);
  if (!Array.isArray(raw)) return [];
  // Drop ids that no longer exist in the joke file and any duplicates.
  return [...new Set(raw.filter((id): id is string => typeof id === 'string' && id in JOKE_BY_ID))];
}

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [ids, setIds] = useState<string[]>(loadFavorites);

  useEffect(() => writeJSON(STORAGE_KEYS.favorites, ids), [ids]);

  // Keep several open tabs in sync.
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEYS.favorites) setIds(loadFavorites());
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const isFavorite = useCallback((id: string) => ids.includes(id), [ids]);

  const toggle = useCallback(
    (id: string) => {
      const willAdd = !ids.includes(id);
      setIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]));
      return willAdd;
    },
    [ids],
  );

  const remove = useCallback((id: string) => setIds((prev) => prev.filter((x) => x !== id)), []);
  const clear = useCallback(() => setIds([]), []);

  const value = useMemo(() => ({ ids, isFavorite, toggle, remove, clear }), [ids, isFavorite, toggle, remove, clear]);
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used inside <FavoritesProvider>');
  return ctx;
}
