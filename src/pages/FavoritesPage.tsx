import { useState } from 'react';
import { Link } from 'react-router';
import CategoryIcon from '../components/CategoryIcon';
import ConfirmDialog from '../components/ConfirmDialog';
import { IconCopy, IconOpen, IconTrash } from '../components/Icons';
import PageHeader from '../components/PageHeader';
import { CATEGORIES, CATEGORY_BY_ID } from '../data/categories';
import { JOKE_BY_ID } from '../data/jokes';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import { useFavorites } from '../hooks/useFavorites';
import { useToast } from '../hooks/useToast';
import type { CategoryId } from '../types';
import { copyText } from '../utils/clipboard';
import { jokeToText } from '../utils/jokes';

type Filter = 'all' | Exclude<CategoryId, 'random'>;

export default function FavoritesPage() {
  useDocumentTitle('Favorites');
  const { ids, remove, clear } = useFavorites();
  const { notify } = useToast();
  const [filter, setFilter] = useState<Filter>('all');
  const [confirmOpen, setConfirmOpen] = useState(false);

  const jokes = ids.map((id) => JOKE_BY_ID[id]).filter(Boolean);
  const visible = filter === 'all' ? jokes : jokes.filter((j) => j.category === filter);
  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: `All (${jokes.length})` },
    ...CATEGORIES.filter((c) => c.id !== 'random').map((c) => ({
      id: c.id as Filter,
      label: `${c.shortLabel} (${jokes.filter((j) => j.category === c.id).length})`,
    })),
  ];

  const copy = async (id: string) => {
    const ok = await copyText(jokeToText(JOKE_BY_ID[id]));
    notify(ok ? 'Joke copied to your clipboard!' : "Couldn't copy that joke.", ok ? 'success' : 'error');
  };

  const removeOne = (id: string) => {
    remove(id);
    notify('Removed from favorites.', 'info');
  };

  return (
    <>
      <PageHeader kicker="The vault" title="Your favorites" burst="GOTCHA!" fill="fill-yellow">
        Every joke you star lands here and stays saved on this device, even after you close the browser.
      </PageHeader>

      {jokes.length === 0 ? (
        <section className="panel mx-auto max-w-2xl p-6 text-center sm:p-10" aria-labelledby="empty-heading">
          <div className="thought mx-auto mb-12 max-w-sm text-xl">
            <p>Hmm... no favorites yet?</p>
          </div>
          <h2 id="empty-heading" className="text-4xl">
            The vault is empty!
          </h2>
          <p className="mx-auto mt-2 max-w-md font-semibold">
            Find a joke that makes you groan in the best way, then press the <strong>Favorite</strong> star to save it here.
          </p>
          <Link to="/" className="comic-btn comic-btn-red mt-6">
            Find some jokes
          </Link>
        </section>
      ) : (
        <>
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <div role="group" aria-label="Filter favorites by universe" className="flex flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={filter === f.id}
                  onClick={() => setFilter(f.id)}
                  className={`comic-btn comic-btn-sm !text-base ${filter === f.id ? 'comic-btn-ink' : ''}`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <button type="button" onClick={() => setConfirmOpen(true)} className="comic-btn comic-btn-sm !text-base sm:ml-auto">
              <IconTrash size={18} />
              Clear all
            </button>
          </div>

          {visible.length === 0 ? (
            <p className="panel p-6 text-center font-bold">No saved jokes in this universe yet.</p>
          ) : (
            <ul className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((joke) => {
                const cat = CATEGORY_BY_ID[joke.category];
                return (
                  <li key={joke.id} className="panel flex flex-col">
                    <div className={`${cat.tone} tone-bg halftone flex items-center gap-2 border-b-4 border-[var(--ink)] px-4 py-2`}>
                      <CategoryIcon id={joke.category} size={18} />
                      <span className="font-display text-xl tracking-wide">{cat.label}</span>
                      <span className="ml-auto truncate text-xs font-bold opacity-90">{joke.characters.join(', ')}</span>
                    </div>
                    <div className="flex-1 space-y-3 p-4 font-comic text-lg font-bold leading-snug">
                      {joke.type === 'twopart' ? (
                        <>
                          <p>{joke.setup}</p>
                          <p className="rounded border-2 border-[var(--ink)] bg-[var(--color-hero-yellow)] px-3 py-2 text-[#141414]">
                            {joke.punchline}
                          </p>
                        </>
                      ) : (
                        <p>{joke.text}</p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 border-t-4 border-[var(--ink)] bg-base-200 p-3">
                      <Link to={`/?joke=${joke.id}`} className="comic-btn comic-btn-sm comic-btn-blue !text-base">
                        <IconOpen size={18} />
                        Open
                      </Link>
                      <button type="button" onClick={() => void copy(joke.id)} className="comic-btn comic-btn-sm !text-base">
                        <IconCopy size={18} />
                        Copy
                      </button>
                      <button
                        type="button"
                        onClick={() => removeOne(joke.id)}
                        className="comic-btn comic-btn-sm !text-base ml-auto"
                        aria-label={`Remove from favorites: ${jokeToText(joke).split('\n')[0]}`}
                      >
                        <IconTrash size={18} />
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </>
      )}

      <ConfirmDialog
        open={confirmOpen}
        title="Clear all favorites?"
        message={`This permanently deletes all ${jokes.length} saved joke${jokes.length === 1 ? '' : 's'} from this device. This can't be undone.`}
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
