import { useCallback, useEffect, useRef, useState } from 'react';
import { CATEGORY_BY_ID } from '../data/categories';
import { useFavorites } from '../hooks/useFavorites';
import { useSettings } from '../hooks/useSettings';
import { useToast } from '../hooks/useToast';
import type { CategoryId, Joke } from '../types';
import { copyText } from '../utils/clipboard';
import { jokeToText } from '../utils/jokes';
import ActionBurst from './ActionBurst';
import CategoryIcon from './CategoryIcon';
import { IconBolt, IconCopy, IconEye, IconStar } from './Icons';

const ACTION_WORDS = ['POW!', 'BAM!', 'ZAP!', 'BOOM!', 'HA!', 'GOTCHA!', 'WHAM!', 'KAPOW!'];

function pickWord(id: string): string {
  const n = id.split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return ACTION_WORDS[n % ACTION_WORDS.length];
}

function isTypingTarget(target: EventTarget | null): boolean {
  const el = target as HTMLElement | null;
  if (!el) return false;
  return el.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT'].includes(el.tagName);
}

interface JokePanelProps {
  joke: Joke;
  selectedCategory: CategoryId;
  onNext: () => void;
}

export default function JokePanel({ joke, selectedCategory, onNext }: JokePanelProps) {
  const { settings } = useSettings();
  const { isFavorite, toggle } = useFavorites();
  const { notify } = useToast();

  const [revealedId, setRevealedId] = useState<string | null>(null);
  const [favBounce, setFavBounce] = useState(0);
  const punchRef = useRef<HTMLDivElement>(null);
  const focusPunchline = useRef(false);

  const isTwoPart = joke.type === 'twopart';
  const revealed = !isTwoPart || settings.autoReveal || revealedId === joke.id;
  const favorite = isFavorite(joke.id);
  const universe = CATEGORY_BY_ID[joke.category];
  const mainText = joke.type === 'twopart' ? joke.setup : joke.text;

  const reveal = useCallback(() => {
    focusPunchline.current = true;
    setRevealedId(joke.id);
  }, [joke.id]);

  // When the user reveals the punchline, move focus to it so the reveal button
  // disappearing doesn't drop keyboard focus.
  useEffect(() => {
    if (revealed && focusPunchline.current) {
      focusPunchline.current = false;
      punchRef.current?.focus();
    }
  }, [revealed]);

  const toggleFavorite = useCallback(() => {
    const nowFavorite = toggle(joke.id);
    setFavBounce((n) => n + 1);
    notify(nowFavorite ? 'Saved to your favorites!' : 'Removed from favorites.', nowFavorite ? 'success' : 'info');
  }, [toggle, joke.id, notify]);

  const copy = useCallback(async () => {
    const ok = await copyText(jokeToText(joke));
    notify(ok ? 'Joke copied to your clipboard!' : "Couldn't copy. Try selecting the text instead.", ok ? 'success' : 'error');
  }, [joke, notify]);

  // Keyboard shortcuts: N = next, R = reveal, F = favorite, C = copy.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey || e.altKey || isTypingTarget(e.target) || document.querySelector('dialog[open]')) return;
      const key = e.key.toLowerCase();
      if (key === 'n') onNext();
      else if (key === 'r' && !revealed) reveal();
      else if (key === 'f') toggleFavorite();
      else if (key === 'c') void copy();
      else return;
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onNext, reveal, revealed, toggleFavorite, copy]);

  const long = mainText.length > 110;

  return (
    <section className="panel panel-lg flex flex-col" aria-labelledby="joke-heading">
      {/* Panel header strip: category caption */}
      <div className={`${universe.tone} tone-bg halftone relative flex items-center gap-3 border-b-4 border-[var(--ink)] px-4 py-3 sm:px-6`}>
        <span className="cat-icon bg-white text-[#141414]">
          <CategoryIcon id={joke.category} size={20} />
        </span>
        <div className="min-w-0 pr-20 sm:pr-28">
          <h2 id="joke-heading" className="text-[1.75rem] leading-none sm:text-3xl">
            {universe.label}
            <span className="sr-only"> joke</span>
          </h2>
          <p className="truncate text-sm font-bold opacity-90">
            Starring {joke.characters.join(', ')}
            {selectedCategory === 'random' && ' · random pick'}
          </p>
        </div>
        <ActionBurst
          word={pickWord(joke.id)}
          size={92}
          className="absolute -top-7 right-1 rotate-6 sm:-top-9 sm:right-3 sm:h-[112px] sm:w-[112px]"
        />
      </div>

      {/* Joke body */}
      <div className="scene relative flex flex-1 flex-col justify-center px-4 pb-10 pt-7 sm:px-8 sm:pt-9">
        <div key={joke.id} className="animate-panel-in">
          <div className="bubble">
            <p className={`${long ? 'text-xl sm:text-2xl' : 'text-2xl sm:text-[2rem]'} leading-snug`}>{mainText}</p>
          </div>

          {isTwoPart && (
            <div className="mt-10">
              {revealed ? (
                <div className="relative ml-auto max-w-[92%] sm:max-w-[85%]">
                  <div
                    className="motion-decor animate-burst pointer-events-none absolute -inset-8 rounded-full"
                    aria-hidden="true"
                    style={{
                      background: 'radial-gradient(circle, var(--color-hero-red) 30%, transparent 33%) 0 0 / 11px 11px',
                      WebkitMaskImage: 'radial-gradient(closest-side, #000 55%, transparent 100%)',
                      maskImage: 'radial-gradient(closest-side, #000 55%, transparent 100%)',
                    }}
                  />
                  <div ref={punchRef} tabIndex={-1} className="bubble bubble-shout bubble-right animate-pop-in relative">
                    <p className="sr-only">Punchline:</p>
                    <p className="text-2xl leading-snug sm:text-[2rem]">{joke.punchline}</p>
                  </div>
                </div>
              ) : (
                <div className="flex justify-end">
                  <button type="button" onClick={reveal} className="comic-btn comic-btn-blue" aria-label="Reveal the punchline">
                    <IconEye size={22} />
                    Reveal punchline!
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Action row */}
      <div className="flex flex-wrap items-center gap-3 border-t-4 border-[var(--ink)] bg-base-200 px-4 py-4 sm:px-6">
        <button
          type="button"
          onClick={toggleFavorite}
          aria-pressed={favorite}
          className={`comic-btn comic-btn-sm ${favorite ? 'comic-btn-yellow' : ''}`}
        >
          <span key={favBounce} className={favBounce ? 'animate-boing inline-flex' : 'inline-flex'}>
            <IconStar size={22} filled={favorite} className={favorite ? 'text-[var(--color-hero-red)]' : ''} />
          </span>
          {favorite ? 'Saved' : 'Favorite'}
        </button>
        <button type="button" onClick={() => void copy()} className="comic-btn comic-btn-sm">
          <IconCopy size={20} />
          Copy
        </button>
        <button type="button" onClick={onNext} className="comic-btn comic-btn-red comic-btn-lg w-full sm:ml-auto sm:w-auto">
          <IconBolt size={28} />
          Next joke!
        </button>
      </div>
    </section>
  );
}
