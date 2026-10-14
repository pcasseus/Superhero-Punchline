import { useCallback, useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import ActionBurst from '../components/ActionBurst';
import CategoryPicker from '../components/CategoryPicker';
import HeroArt from '../components/HeroArt';
import { IconStar } from '../components/Icons';
import JokePanel from '../components/JokePanel';
import { CATEGORY_BY_ID } from '../data/categories';
import { JOKE_BY_ID, JOKES } from '../data/jokes';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useFavorites } from '../hooks/useFavorites';
import { useJokeDeck } from '../hooks/useJokeDeck';
import { useSettings } from '../hooks/useSettings';
import { useToast } from '../hooks/useToast';
import type { CategoryId } from '../types';

export default function HomePage() {
  useDocumentTitle();
  const { settings } = useSettings();
  const { ids: favoriteIds } = useFavorites();
  const { announce } = useToast();
  const [params, setParams] = useSearchParams();

  // "/?joke=mv-01" opens a specific joke (used by the Favorites page).
  const requestedId = params.get('joke');
  const requested = requestedId ? JOKE_BY_ID[requestedId] : undefined;

  const [category, setCategory] = useState<CategoryId>(() => requested?.category ?? settings.defaultCategory);
  const { joke, next, show } = useJokeDeck(category, requested?.id);

  // Honor ?joke= links, then tidy the URL so "Next joke" doesn't keep a stale id in it.
  useEffect(() => {
    if (!requestedId) return;
    const target = JOKE_BY_ID[requestedId];
    if (target) {
      setCategory(target.category);
      show(target.id);
    }
    setParams({}, { replace: true });
  }, [requestedId, setParams, show]);

  const announceJoke = useCallback(
    (id: string) => {
      const j = JOKE_BY_ID[id];
      const label = CATEGORY_BY_ID[j.category].label;
      const body = j.type === 'twopart' ? (settings.autoReveal ? `${j.setup} ${j.punchline}` : j.setup) : j.text;
      announce(`New ${label} joke. ${body}`);
    },
    [announce, settings.autoReveal],
  );

  const handleNext = useCallback(() => announceJoke(next(category)), [announceJoke, next, category]);

  const handleCategory = (id: CategoryId) => {
    if (id === category) return;
    setCategory(id);
    announceJoke(next(id));
  };

  return (
    <>
      {/* ---------- Hero splash panel ---------- */}
      <section
        aria-labelledby="hero-title"
        className="panel panel-lg fill-red halftone relative mb-10 grid overflow-hidden md:grid-cols-[1.35fr_1fr]"
      >
        <div className="relative z-10 px-5 pb-7 pt-5 sm:px-8 sm:pb-9 sm:pt-7">
          <p className="caption -rotate-2 text-base">Issue #1 · Special edition</p>
          <h1 id="hero-title" className="comic-title mt-4 text-[3.1rem] leading-[0.92] min-[400px]:text-6xl sm:text-7xl lg:text-8xl">
            <span className="block">Superhero</span>
            <span className="block pl-[0.4em] text-white">Punchlines</span>
          </h1>
          <div className="bubble mt-6 max-w-md -rotate-1 !py-3 text-lg sm:text-xl">
            <p>Saving the world, one terrible joke at a time.</p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a href="#joke-zone" className="comic-btn comic-btn-yellow">
              Get a joke!
            </a>
            <p className="font-bold">
              {JOKES.length} clean jokes · Marvel · DC · Marvel vs. DC
            </p>
          </div>
        </div>
        <div className="hidden border-l-4 border-[var(--ink)] md:block">
          <HeroArt />
        </div>
        <ActionBurst word="BAM!" size={96} className="absolute -right-3 -top-3 rotate-12 md:hidden" />
      </section>

      {/* ---------- Joke zone ---------- */}
      <div id="joke-zone" className="grid scroll-mt-4 grid-cols-[minmax(0,1fr)] gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
        <aside className="flex flex-col gap-6" aria-label="Joke options">
          <section className="panel p-4 sm:p-5" aria-labelledby="category-heading">
            <h2 id="category-heading" className="mb-1 text-3xl">
              Pick your universe
            </h2>
            <p className="mb-4 text-sm font-semibold opacity-80">Choose where your next joke comes from.</p>
            <CategoryPicker value={category} onChange={handleCategory} />
          </section>

          <section className="panel fill-yellow halftone hidden p-5 lg:block" aria-labelledby="stash-heading">
            <h2 id="stash-heading" className="text-2xl">
              Your secret stash
            </h2>
            <p className="mt-1 font-semibold">
              {favoriteIds.length === 0
                ? 'No favorites yet. Tap the star on a joke to save it.'
                : `${favoriteIds.length} saved joke${favoriteIds.length === 1 ? '' : 's'} ready for your next mission.`}
            </p>
            <Link to="/favorites" className="comic-btn comic-btn-sm mt-3">
              <IconStar size={18} filled />
              View favorites
            </Link>
            <p className="kicker mt-5 text-lg">Keyboard shortcuts</p>
            <ul className="mt-1 grid grid-cols-2 gap-x-3 gap-y-1.5 text-sm font-bold">
              {[
                ['N', 'Next joke'],
                ['R', 'Reveal'],
                ['F', 'Favorite'],
                ['C', 'Copy'],
              ].map(([k, label]) => (
                <li key={k} className="flex items-center gap-2">
                  <kbd className="kbd kbd-sm border-[var(--ink)] bg-white text-[#141414]">{k}</kbd>
                  {label}
                </li>
              ))}
            </ul>
          </section>
        </aside>

        <JokePanel joke={joke} selectedCategory={category} onNext={handleNext} />
      </div>

      {/* ---------- How it works strip ---------- */}
      <section aria-labelledby="how-heading" className="mt-14">
        <h2 id="how-heading" className="comic-title mb-6 text-4xl sm:text-5xl">
          Three panels to a punchline
        </h2>
        <ol className="grid gap-6 sm:grid-cols-3">
          {[
            { n: 1, title: 'Pick a universe', text: 'Marvel, DC, a crossover clash, or let fate decide with Random.', fill: 'fill-blue' },
            { n: 2, title: 'Reveal the punchline', text: 'Read the setup, make your guess, then hit Reveal for the big finish.', fill: 'fill-yellow' },
            { n: 3, title: 'Save the best', text: 'Star the winners to keep them in Favorites, or copy one to share.', fill: 'fill-red' },
          ].map((step, i) => (
            <li key={step.n} className={`panel ${step.fill} halftone p-5 ${i % 2 ? 'sm:rotate-1' : 'sm:-rotate-1'}`}>
              <span className="caption text-lg">Panel {step.n}</span>
              <h3 className="mt-3 text-3xl">{step.title}</h3>
              <p className="mt-1 font-semibold">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
