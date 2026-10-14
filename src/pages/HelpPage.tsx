import type { ReactNode } from 'react';
import { Link } from 'react-router';
import PageHeader from '../components/PageHeader';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const STEPS: { title: string; body: ReactNode }[] = [
  {
    title: 'Get a joke',
    body: (
      <>
        A joke is waiting on the <Link to="/" className="font-bold underline underline-offset-4">Home</Link> page. Press the big red{' '}
        <strong>Next joke!</strong> button for a new one.
      </>
    ),
  },
  {
    title: 'Pick Marvel or DC',
    body: (
      <>
        Under <strong>Pick your universe</strong>, choose Marvel, DC, Marvel vs. DC, or Random. The chosen tile turns colorful
        and says “Selected!”, and a new joke appears right away.
      </>
    ),
  },
  {
    title: 'Reveal the punchline',
    body: (
      <>
        For two-part jokes, read the setup, then press <strong>Reveal punchline!</strong> One-liners show everything at once.
      </>
    ),
  },
  {
    title: 'Save a favorite',
    body: (
      <>
        Press the <strong>Favorite</strong> star under a joke. It turns yellow and says “Saved”. Find all saved jokes on the{' '}
        <Link to="/favorites" className="font-bold underline underline-offset-4">Favorites</Link> page.
      </>
    ),
  },
  {
    title: 'Remove favorites',
    body: (
      <>
        Press the star again on a saved joke, or use <strong>Remove</strong> on the Favorites page. To delete them all, use{' '}
        <strong>Clear all</strong> (you'll be asked to confirm).
      </>
    ),
  },
  {
    title: 'Copy a joke',
    body: (
      <>
        Press <strong>Copy</strong> to put the full joke, including the punchline, on your clipboard. A “BAM!” message confirms
        it worked.
      </>
    ),
  },
  {
    title: 'Change the theme',
    body: (
      <>
        Tap the sun/moon button in the header to flip between day and night, or pick Daylight, Night patrol, or Follow system
        in <Link to="/settings" className="font-bold underline underline-offset-4">Settings</Link>.
      </>
    ),
  },
  {
    title: 'Settings are saved',
    body: (
      <>
        Theme, default category, auto-reveal, animations, and favorites are saved automatically in this browser on this device.
        No account needed.
      </>
    ),
  },
  {
    title: 'Use it on your phone',
    body: (
      <>
        On phones, the navigation moves to a tab bar at the bottom of the screen. Panels stack vertically, and every button is
        sized for thumbs. You can also add the site to your home screen from your browser's share menu.
      </>
    ),
  },
];

const FAQ: [string, ReactNode][] = [
  ['Will I see the same joke over and over?', 'No. Each category is shuffled like a deck, so you see every joke in it before any joke repeats, and never the same joke twice in a row.'],
  ['Why did my favorites disappear?', 'Favorites are stored in your browser. Clearing browsing data, using private/incognito mode, or switching to another browser or device starts you with an empty list.'],
  ['Does the app need the internet?', 'Only to load the page. All jokes are built into the app. No joke service or account is used.'],
  ['The animations are too much. Can I turn them off?', <>Yes. Switch off <strong>Enable animations</strong> in Settings. If your device has “reduce motion” turned on, the app follows it automatically.</>],
  ['Are there keyboard shortcuts?', <>On the Home page: <kbd className="kbd kbd-sm">N</kbd> next joke, <kbd className="kbd kbd-sm">R</kbd> reveal, <kbd className="kbd kbd-sm">F</kbd> favorite, <kbd className="kbd kbd-sm">C</kbd> copy. Arrow keys move between categories, and Tab reaches every control.</>],
  ['Is this an official Marvel or DC app?', 'No. It is an original fan-made class project and is not affiliated with or endorsed by Marvel or DC.'],
];

export default function HelpPage() {
  useDocumentTitle('Help');
  return (
    <>
      <PageHeader kicker="Sidekick's handbook" title="Help & FAQ" burst="HA!" fill="fill-green">
        New to the team? Here's everything you need to know, one panel at a time.
      </PageHeader>

      <section aria-labelledby="guide-heading">
        <h2 id="guide-heading" className="comic-title mb-6 text-4xl sm:text-5xl">
          How to use the app
        </h2>
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="panel flex gap-4 p-5">
              <span
                className="grid h-12 w-12 flex-none place-items-center rounded-full border-[3px] border-[var(--ink)] bg-[var(--color-hero-yellow)] font-display text-2xl text-[#141414] shadow-[3px_3px_0_var(--ink)]"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div>
                <h3 className="text-2xl">{step.title}</h3>
                <p className="mt-1 leading-relaxed">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-14" aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="comic-title comic-title-blue mb-6 text-4xl sm:text-5xl">
          Frequently asked questions
        </h2>
        <div className="grid gap-4">
          {FAQ.map(([q, a], i) => (
            <details
              key={q}
              className="collapse collapse-arrow panel !rounded-md bg-[var(--panel-bg)]"
              open={i === 0}
            >
              <summary className="collapse-title font-display text-2xl tracking-wide">{q}</summary>
              <div className="collapse-content">
                <p className="font-semibold leading-relaxed">{a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      <section className="panel fill-yellow halftone mt-14 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center" aria-labelledby="ready-heading">
        <div className="flex-1">
          <h2 id="ready-heading" className="text-4xl">
            Ready for action?
          </h2>
          <p className="font-semibold">Your next terrible joke is one tap away.</p>
        </div>
        <Link to="/" className="comic-btn comic-btn-red comic-btn-lg">
          Tell me a joke!
        </Link>
      </section>
    </>
  );
}
