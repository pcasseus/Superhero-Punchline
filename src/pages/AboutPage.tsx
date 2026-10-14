import { Link } from 'react-router';
import ActionBurst from '../components/ActionBurst';
import CategoryIcon from '../components/CategoryIcon';
import PageHeader from '../components/PageHeader';
import { CATEGORIES } from '../data/categories';
import { JOKES } from '../data/jokes';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { jokesFor } from '../utils/jokes';

const FEATURES = [
  ['Punchline reveals', 'Two-part jokes hide the punchline until you are ready for it.'],
  ['Favorites vault', 'Star any joke to save it. Your list survives page refreshes and browser restarts.'],
  ['One-tap copy', 'Copy the whole joke, punchline included, to share anywhere.'],
  ['Day & night editions', 'A bright newsprint theme, a midnight theme, or follow your device.'],
  ['Motion control', 'Comic animations that you can switch off, and that respect reduced-motion settings.'],
  ['Phone ready', 'A thumb-friendly tab bar and stacked panels for small screens.'],
];

const STACK = ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'daisyUI', 'React Router', 'localStorage', 'Firebase Hosting'];

export default function AboutPage() {
  useDocumentTitle('About');
  return (
    <>
      <PageHeader kicker="Origin story" title="About this app" burst="BOOM!" fill="fill-red">
        Every hero has an origin story. This one starts with a homework assignment and a lot of bad puns.
      </PageHeader>

      <div className="grid gap-8 md:grid-cols-[1.3fr_1fr]">
        <section className="panel p-5 sm:p-7" aria-labelledby="what-heading">
          <p className="caption -rotate-1 text-sm">Meanwhile...</p>
          <h2 id="what-heading" className="mb-3 mt-2 text-4xl">
            What is Superhero Punchlines?
          </h2>
          <p className="text-lg font-semibold leading-relaxed">
            Superhero Punchlines is a comic-book-styled joke generator packed with {JOKES.length} clean, classroom-friendly
            jokes about Marvel and DC heroes, villains, and their never-ending rivalry.
          </p>
          <p className="mt-3 leading-relaxed">
            Its purpose is simple: give you a quick laugh (or a proud groan) whenever you need one, wrapped in an interface that
            feels like flipping through a comic book instead of using another plain web form.
          </p>
        </section>

        <section className="panel fill-yellow halftone relative overflow-hidden p-5 sm:p-7" aria-labelledby="ai-heading">
          <h2 id="ai-heading" className="mb-3 text-4xl">
            Built with AI
          </h2>
          <p className="font-semibold leading-relaxed">
            This app was created using AI-assisted development as a Week 6 assignment for a Mobile Web Development course. An AI
            coding agent planned the structure, wrote the code and jokes, ran the builds, and tested the result, working inside
            the student's own project folder.
          </p>
          <ActionBurst word="ZAP!" size={88} fill="#fff" textColor="var(--color-hero-blue)" className="absolute -bottom-3 -right-3 rotate-12" />
        </section>
      </div>

      <section className="mt-12" aria-labelledby="universe-heading">
        <h2 id="universe-heading" className="comic-title mb-6 text-4xl sm:text-5xl">
          Four ways to laugh
        </h2>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <li key={c.id} className={`panel ${c.tone} tone-bg halftone p-5 ${i % 2 ? 'lg:rotate-1' : 'lg:-rotate-1'}`}>
              <span className="cat-icon bg-white text-[#141414]">
                <CategoryIcon id={c.id} size={22} />
              </span>
              <h3 className="mt-3 text-3xl">{c.label}</h3>
              <p className="font-semibold">{c.tagline}.</p>
              <p className="mt-2 text-sm font-bold">{jokesFor(c.id).length} jokes</p>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm font-semibold opacity-80">
          Marvel jokes star heroes like Spider-Man, Iron Man, Thor and Deadpool. DC jokes feature Batman, Superman, Wonder Woman,
          The Flash and friends. The crossover category pits the two universes against each other.
        </p>
      </section>

      <section className="panel mt-12 p-5 sm:p-7" aria-labelledby="how-heading">
        <p className="caption -rotate-1 text-sm">Behind the panels</p>
        <h2 id="how-heading" className="mb-4 mt-2 text-4xl">
          How the generator works
        </h2>
        <ol className="grid gap-4 md:grid-cols-3">
          <li className="rounded-md border-[3px] border-[var(--ink)] bg-base-200 p-4">
            <span className="font-display text-2xl text-[var(--color-hero-red)]">1. A local joke file</span>
            <p className="mt-1">All jokes live in one editable data file inside the app. No internet joke service is needed.</p>
          </li>
          <li className="rounded-md border-[3px] border-[var(--ink)] bg-base-200 p-4">
            <span className="font-display text-2xl text-[var(--color-hero-red)]">2. A shuffled deck</span>
            <p className="mt-1">
              Each category is shuffled like a deck of cards. You see every joke once before any repeat, never the same one twice
              in a row.
            </p>
          </li>
          <li className="rounded-md border-[3px] border-[var(--ink)] bg-base-200 p-4">
            <span className="font-display text-2xl text-[var(--color-hero-red)]">3. Saved on your device</span>
            <p className="mt-1">Favorites and settings are stored in your browser's localStorage, so nothing is sent to a server.</p>
          </li>
        </ol>
      </section>

      <section className="mt-12" aria-labelledby="features-heading">
        <h2 id="features-heading" className="comic-title comic-title-blue mb-6 text-4xl sm:text-5xl">
          Super features
        </h2>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(([title, text]) => (
            <li key={title} className="panel p-5">
              <h3 className="text-2xl">{title}</h3>
              <p className="mt-1">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="panel fill-blue halftone mt-12 p-5 sm:p-7" aria-labelledby="stack-heading">
        <h2 id="stack-heading" className="comic-title mb-4 text-4xl">
          The utility belt
        </h2>
        <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
          {STACK.map((t) => (
            <li key={t} className="badge badge-lg border-[3px] border-[var(--ink)] bg-white px-3 py-4 font-bold text-[#141414]">
              {t}
            </li>
          ))}
        </ul>
        <p className="mt-5 text-sm font-semibold">
          Superhero Punchlines is an original fan project. It is not affiliated with, sponsored, or endorsed by Marvel or DC.
          All artwork in the app is original. Need a hand? Visit the{' '}
          <Link to="/help" className="underline decoration-2 underline-offset-4">
            Help page
          </Link>
          .
        </p>
      </section>
    </>
  );
}
