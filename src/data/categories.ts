import type { CategoryId } from '../types';

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  shortLabel: string;
  tagline: string;
  /** CSS class that sets the category accent colors (see styles/comic.css). */
  tone: string;
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'marvel', label: 'Marvel', shortLabel: 'Marvel', tagline: 'Webs, hammers & heroes', tone: 'tone-red' },
  { id: 'dc', label: 'DC', shortLabel: 'DC', tagline: 'Capes, cowls & crime-fighting', tone: 'tone-blue' },
  { id: 'versus', label: 'Marvel vs. DC', shortLabel: 'Vs.', tagline: 'Crossovers & rivalries', tone: 'tone-yellow' },
  { id: 'random', label: 'Random', shortLabel: 'Random', tagline: 'Surprise me!', tone: 'tone-green' },
];

export const CATEGORY_BY_ID: Record<CategoryId, CategoryInfo> = Object.fromEntries(
  CATEGORIES.map((c) => [c.id, c]),
) as Record<CategoryId, CategoryInfo>;

export function isCategoryId(value: unknown): value is CategoryId {
  return typeof value === 'string' && value in CATEGORY_BY_ID;
}
