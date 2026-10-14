import { Link, NavLink } from 'react-router';
import { useFavorites } from '../hooks/useFavorites';
import { useSettings } from '../hooks/useSettings';
import { IconMoon, IconSun } from './Icons';
import Logo from './Logo';
import { NAV_ITEMS } from './navItems';

export default function Header() {
  const { ids } = useFavorites();
  const { resolvedTheme, update } = useSettings();
  const nextTheme = resolvedTheme === 'dark' ? 'light' : 'dark';

  return (
    <header className="fill-red halftone border-b-4 border-[var(--ink)] text-white">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5">
        <Link to="/" className="flex min-w-0 items-center gap-2.5 rounded-md" aria-label="Superhero Punchlines home">
          <Logo size={48} className="flex-none -rotate-6" />
          <span className="comic-title comic-title-sm truncate text-[1.3rem] min-[360px]:text-[1.65rem] leading-none sm:text-3xl md:hidden lg:inline">
            Superhero Punchlines
          </span>
        </Link>

        <nav aria-label="Main" className="ml-auto hidden md:block">
          <ul className="flex items-center gap-1">
            {NAV_ITEMS.map(({ to, label, Icon }) => (
              <li key={to}>
                <NavLink to={to} end={to === '/'} className="nav-pill">
                  <Icon size={18} />
                  {label}
                  {to === '/favorites' && ids.length > 0 && (
                    <span className="badge badge-sm border-2 border-[var(--ink)] bg-white font-sans font-black text-[#141414]">
                      <span className="sr-only">(</span>
                      {ids.length}
                      <span className="sr-only"> saved)</span>
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          onClick={() => update({ theme: nextTheme })}
          className="comic-btn comic-btn-sm ml-auto flex-none px-2.5 md:ml-1"
          aria-label={`Switch to ${nextTheme} theme`}
          title={`Switch to ${nextTheme} theme`}
        >
          {resolvedTheme === 'dark' ? <IconSun size={20} /> : <IconMoon size={20} />}
        </button>
      </div>
    </header>
  );
}
