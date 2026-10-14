import { useEffect } from 'react';

const APP_NAME = 'Superhero Punchlines';

export function useDocumentTitle(page?: string) {
  useEffect(() => {
    document.title = page ? `${page} · ${APP_NAME}` : `${APP_NAME} · Superhero Joke Generator`;
  }, [page]);
}
