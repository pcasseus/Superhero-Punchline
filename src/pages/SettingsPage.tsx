import { useState, type ReactNode } from 'react';
import ConfirmDialog from '../components/ConfirmDialog';
import { IconMonitor, IconMoon, IconSun, IconTrash } from '../components/Icons';
import PageHeader from '../components/PageHeader';
import { CATEGORIES, isCategoryId } from '../data/categories';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useFavorites } from '../hooks/useFavorites';
import { DEFAULT_SETTINGS, useSettings } from '../hooks/useSettings';
import { useToast } from '../hooks/useToast';
import type { ThemePreference } from '../types';

function SettingsSection({ id, title, kicker, children }: { id: string; title: string; kicker: string; children: ReactNode }) {
  return (
    <section className="panel p-5 sm:p-7" aria-labelledby={id}>
      <p className="caption -rotate-1 text-sm">{kicker}</p>
      <h2 id={id} className="mb-4 mt-2 text-4xl">
        {title}
      </h2>
      {children}
    </section>
  );
}

const THEME_OPTIONS: { value: ThemePreference; label: string; hint: string; Icon: typeof IconSun }[] = [
  { value: 'light', label: 'Daylight', hint: 'Bright newsprint colors', Icon: IconSun },
  { value: 'dark', label: 'Night patrol', hint: 'Dramatic midnight panels', Icon: IconMoon },
  { value: 'system', label: 'Follow system', hint: 'Match your device setting', Icon: IconMonitor },
];

export default function SettingsPage() {
  useDocumentTitle('Settings');
  const { settings, update, resolvedTheme, osReducedMotion } = useSettings();
  const { ids, clear } = useFavorites();
  const { notify } = useToast();
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <PageHeader kicker="Mission control" title="Settings" burst="ZAP!" fill="fill-blue">
        Tune Superhero Punchlines to your liking. Changes apply instantly and are saved on this device automatically.
      </PageHeader>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* ---------- Appearance ---------- */}
        <SettingsSection id="appearance-heading" title="Appearance" kicker="Color scheme">
          <fieldset>
            <legend className="mb-3 font-bold">Theme</legend>
            <div className="grid gap-3">
              {THEME_OPTIONS.map(({ value, label, hint, Icon }) => (
                <label
                  key={value}
                  className={`flex cursor-pointer items-center gap-3 rounded-md border-[3px] border-[var(--ink)] p-3 transition-transform ${
                    settings.theme === value ? 'translate-x-1 bg-[var(--color-hero-yellow)] text-[#141414] shadow-[4px_4px_0_var(--ink)]' : 'bg-base-100'
                  }`}
                >
                  <input
                    type="radio"
                    name="theme"
                    value={value}
                    checked={settings.theme === value}
                    onChange={() => update({ theme: value })}
                    className="radio radio-secondary border-[var(--ink)]"
                  />
                  <Icon size={24} />
                  <span>
                    <span className="block font-display text-2xl leading-none tracking-wide">{label}</span>
                    <span className="text-sm font-semibold opacity-80">{hint}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <p className="mt-4 text-sm font-semibold" aria-live="polite">
            Now showing: <strong>{resolvedTheme === 'dark' ? 'Night patrol (dark)' : 'Daylight (light)'}</strong>
            {settings.theme === 'system' && ' — following your device'}
          </p>
        </SettingsSection>

        {/* ---------- Joke preferences ---------- */}
        <SettingsSection id="jokes-heading" title="Joke preferences" kicker="Your mission briefing">
          <div className="grid gap-6">
            <div>
              <label htmlFor="default-category" className="mb-2 block font-bold">
                Default category
              </label>
              <select
                id="default-category"
                className="select w-full border-[3px] border-[var(--ink)] bg-base-100 font-bold"
                value={settings.defaultCategory}
                onChange={(e) => {
                  if (isCategoryId(e.target.value)) update({ defaultCategory: e.target.value });
                }}
              >
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-sm font-semibold opacity-80">The Home page starts in this universe each time you open the app.</p>
            </div>

            <label className="flex cursor-pointer items-start justify-between gap-4 rounded-md border-[3px] border-[var(--ink)] bg-base-100 p-4">
              <span>
                <span className="block font-display text-2xl leading-none tracking-wide">Auto-reveal punchlines</span>
                <span className="mt-1 block text-sm font-semibold opacity-80">
                  Show the setup and punchline together, without pressing Reveal.
                </span>
              </span>
              <input
                type="checkbox"
                role="switch"
                className="toggle toggle-lg toggle-primary mt-1 flex-none border-[var(--ink)]"
                checked={settings.autoReveal}
                onChange={(e) => update({ autoReveal: e.target.checked })}
              />
            </label>
          </div>
        </SettingsSection>

        {/* ---------- Animation ---------- */}
        <SettingsSection id="motion-heading" title="Animations" kicker="Special effects">
          <label className="flex cursor-pointer items-start justify-between gap-4 rounded-md border-[3px] border-[var(--ink)] bg-base-100 p-4">
            <span>
              <span className="block font-display text-2xl leading-none tracking-wide">Enable animations</span>
              <span className="mt-1 block text-sm font-semibold opacity-80">
                Panel slides, punchline pops, and bouncing sound effects. Turn off for a calmer, still comic.
              </span>
            </span>
            <input
              type="checkbox"
              role="switch"
              className="toggle toggle-lg toggle-primary mt-1 flex-none border-[var(--ink)]"
              checked={settings.animations}
              onChange={(e) => update({ animations: e.target.checked })}
            />
          </label>
          {osReducedMotion && (
            <div role="note" className="alert alert-info mt-4 border-[3px] border-[var(--ink)] font-semibold">
              Your device asks for reduced motion, so animations stay minimized no matter what this switch says.
            </div>
          )}
        </SettingsSection>

        {/* ---------- Saved data ---------- */}
        <SettingsSection id="data-heading" title="Saved data" kicker="The vault">
          <p className="font-semibold">
            You have <strong>{ids.length}</strong> favorite joke{ids.length === 1 ? '' : 's'} saved in this browser.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              className="comic-btn comic-btn-red"
              onClick={() => setConfirmOpen(true)}
              disabled={ids.length === 0}
            >
              <IconTrash size={20} />
              Clear favorites
            </button>
            <button
              type="button"
              className="comic-btn"
              onClick={() => {
                update(DEFAULT_SETTINGS);
                notify('Settings reset to defaults.', 'info');
              }}
            >
              Reset settings
            </button>
          </div>
          {ids.length === 0 && <p className="mt-3 text-sm font-semibold opacity-80">Nothing to clear right now.</p>}
        </SettingsSection>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Clear all favorites?"
        message={`This permanently deletes all ${ids.length} saved joke${ids.length === 1 ? '' : 's'} from this device. This can't be undone.`}
        confirmLabel="Yes, clear them"
        cancelLabel="Keep them"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={() => {
          clear();
          setConfirmOpen(false);
          notify('All favorites cleared.', 'info');
        }}
      />
    </>
  );
}
