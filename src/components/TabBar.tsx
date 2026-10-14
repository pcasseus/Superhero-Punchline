import { NavLink } from 'react-router';
import { useFavorites } from '../hooks/useFavorites';
import { NAV_ITEMS } from './navItems';

/** Thumb-friendly bottom navigation shown on phones and small tablets. */
export default function TabBar() {
  const { ids } = useFavorites();
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 border-t-4 border-[var(--ink)] bg-[#141414] pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      <ul className="grid grid-cols-5">
        {NAV_ITEMS.map(({ to, label, Icon }) => (
          <li key={to}>
            <NavLink to={to} end={to === '/'} className="tabbar-link relative">
              <Icon size={22} />
              <span>{label}</span>
              {to === '/favorites' && ids.length > 0 && (
                <span className="absolute right-[18%] top-1 grid h-5 min-w-5 place-items-center rounded-full border-2 border-[#141414] bg-[var(--color-hero-red)] px-1 font-sans text-[0.7rem] font-black text-white">
                  {ids.length}
                  <span className="sr-only"> saved</span>
                </span>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
