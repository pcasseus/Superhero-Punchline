import { JOKES } from '../data/jokes';
import type { CategoryId, Joke } from '../types';

/** All jokes eligible for a category ("random" = every joke). */
export function jokesFor(category: CategoryId): Joke[] {
  return category === 'random' ? JOKES : JOKES.filter((j) => j.category === category);
}

/** Plain-text version of a joke, used for copying to the clipboard. */
export function jokeToText(joke: Joke): string {
  return joke.type === 'twopart' ? `${joke.setup}\n${joke.punchline}` : joke.text;
}

/** Short preview line for lists. */
export function jokeHeadline(joke: Joke): string {
  return joke.type === 'twopart' ? joke.setup : joke.text;
}

/** Fisher–Yates shuffle (returns a new array). */
export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Build a shuffled "deck" of joke ids. Every joke is shown once before any repeats,
 * and the first card of a new deck is never the joke that was just on screen.
 */
export function buildDeck(ids: readonly string[], avoidFirst?: string): string[] {
  const deck = shuffle(ids);
  if (avoidFirst && deck.length > 1 && deck[0] === avoidFirst) {
    const swap = 1 + Math.floor(Math.random() * (deck.length - 1));
    [deck[0], deck[swap]] = [deck[swap], deck[0]];
  }
  return deck;
}
