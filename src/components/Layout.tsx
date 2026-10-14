import { useEffect, useRef } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import Footer from './Footer';
import Header from './Header';
import TabBar from './TabBar';

/** Shared page frame: header, main content, footer and the mobile tab bar. */
export default function Layout() {
  const { pathname } = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const firstRender = useRef(true);

  // After client-side navigation, move focus to the new page so keyboard and
  // screen-reader users start at the top of the new content.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    mainRef.current?.focus({ preventScroll: true });
  }, [pathname]);

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only-focusable fixed left-3 top-3 z-[60] rounded-md border-[3px] border-[var(--ink)] bg-[var(--color-hero-yellow)] px-4 py-2 font-bold text-[#141414]"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" ref={mainRef} tabIndex={-1} className="mx-auto w-full max-w-6xl flex-1 px-4 pt-6 outline-none sm:pt-8">
        <Outlet />
      </main>
      <Footer />
      <TabBar />
      <ScrollRestoration />
    </div>
  );
}
