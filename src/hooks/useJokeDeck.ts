import { useCallback, useRef, useState } from 'react';
import { JOKE_BY_ID } from '../data/jokes';
import type { CategoryId, Joke } from '../types';
import { buildDeck, jokesFor } from '../utils/jokes';

/**
 * Serves jokes from a shuffled deck per category so that every joke appears once
 * before any repeats, and the same joke never shows twice in a row.
 */
export function useJokeDeck(initialCategory: CategoryId, initialJokeId?: string | null) {
  const decks = useRef<Partial<Record<CategoryId, string[]>>>({});

  const draw = useCallback((category: CategoryId, avoid?: string): string => {
    const ids = jokesFor(category).map((j) => j.id);
    let deck = decks.current[category];
    if (!deck || deck.length === 0) deck = buildDeck(ids, avoid);
    let next = deck.shift()!;
    if (next === avoid && deck.length > 0) {
      deck.push(next);
      next = deck.shift()!;
    }
    decks.current[category] = deck;
    return next;
  }, []);

  const [currentId, setCurrentId] = useState<string>(() =>
    initialJokeId && initialJokeId in JOKE_BY_ID ? initialJokeId : draw(initialCategory),
  );
  const currentRef = useRef(currentId);
  currentRef.current = currentId;

  /** Draw the next joke for the given category. */
  const next = useCallback(
    (category: CategoryId) => {
      const id = draw(category, currentRef.current);
      currentRef.current = id;
      setCurrentId(id);
      return id;
    },
    [draw],
  );

  /** Jump straight to a specific joke (e.g. reopening a favorite). */
  const show = useCallback((id: string) => {
    if (!(id in JOKE_BY_ID) || id === currentRef.current) return;
    currentRef.current = id;
    setCurrentId(id);
  }, []);

  const joke: Joke = JOKE_BY_ID[currentId];
  return { joke, next, show };
}
