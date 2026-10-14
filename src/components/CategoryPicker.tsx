import { useRef, type KeyboardEvent } from 'react';
import { CATEGORIES } from '../data/categories';
import type { CategoryId } from '../types';
import { jokesFor } from '../utils/jokes';
import CategoryIcon from './CategoryIcon';

interface CategoryPickerProps {
  value: CategoryId;
  onChange: (id: CategoryId) => void;
}

/** Accessible radio group (arrow keys move between options) styled as comic tiles. */
export default function CategoryPicker({ value, onChange }: CategoryPickerProps) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const forward = e.key === 'ArrowRight' || e.key === 'ArrowDown';
    const back = e.key === 'ArrowLeft' || e.key === 'ArrowUp';
    if (!forward && !back) return;
    e.preventDefault();
    const nextIndex = (index + (forward ? 1 : -1) + CATEGORIES.length) % CATEGORIES.length;
    onChange(CATEGORIES[nextIndex].id);
    refs.current[nextIndex]?.focus();
  };

  return (
    <div role="radiogroup" aria-labelledby="category-heading" className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 lg:grid-cols-1">
      {CATEGORIES.map((cat, i) => {
        const selected = cat.id === value;
        return (
          <button
            key={cat.id}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={selected}
            tabIndex={selected ? 0 : -1}
            onClick={() => onChange(cat.id)}
            onKeyDown={(e) => onKeyDown(e, i)}
            className={`cat-tile ${cat.tone}`}
          >
            <span className="cat-icon tone-bg" style={selected ? { background: '#fff', color: '#141414' } : undefined}>
              <CategoryIcon id={cat.id} size={20} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-[1.35rem] leading-none tracking-wide">{cat.label}</span>
              <span className="mt-0.5 hidden text-xs font-semibold opacity-85 sm:block">
                {cat.tagline} · {jokesFor(cat.id).length} jokes
              </span>
            </span>
            {selected && (
              <span className="absolute -right-2 -top-3 rotate-6 rounded border-2 border-[var(--ink)] bg-white px-1.5 font-display text-sm tracking-wider text-[#141414]">
                Selected!
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
