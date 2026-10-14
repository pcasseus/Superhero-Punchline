import { Link } from 'react-router';
import { NAV_ITEMS } from './navItems';

export default function Footer() {
  return (
    <footer className="mt-14 border-t-4 border-[var(--ink)] bg-[#141414] text-[#f5f1e6]">
      <div className="zip-divider" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-6 px-4 pb-24 pt-8 md:grid-cols-[1.4fr_1fr] md:pb-8">
        <div>
          <p className="font-display text-3xl tracking-wide text-[var(--color-hero-yellow)]">Superhero Punchlines</p>
          <p className="mt-1 text-sm leading-relaxed text-[#d8d4c8]">
            Saving the world, one terrible joke at a time. An original fan-made joke app built with AI-assisted development for a
            Mobile Web Development course.
          </p>
          <p className="mt-3 text-xs leading-relaxed text-[#b9b4a6]">
            Not affiliated with, sponsored, or endorsed by Marvel or DC. Character names are trademarks of their respective
            owners and are used here only as joke references.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="kicker mb-2 text-lg text-[var(--color-hero-yellow)]">Jump to</p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
            {NAV_ITEMS.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="inline-block py-1 font-bold underline decoration-[var(--color-hero-red)] decoration-2 underline-offset-4 hover:text-[var(--color-hero-yellow)]">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
