import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';

// Bundled, open-licensed (SIL OFL) fonts — no external font requests.
import '@fontsource/bangers/400.css';
import '@fontsource/comic-neue/400.css';
import '@fontsource/comic-neue/700.css';
import '@fontsource-variable/nunito';
import './styles/main.css';

import Layout from './components/Layout';
import { FavoritesProvider } from './hooks/useFavorites';
import { SettingsProvider } from './hooks/useSettings';
import { ToastProvider } from './hooks/useToast';
import AboutPage from './pages/AboutPage';
import FavoritesPage from './pages/FavoritesPage';
import HelpPage from './pages/HelpPage';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import SettingsPage from './pages/SettingsPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'favorites', element: <FavoritesPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'help', element: <HelpPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <FavoritesProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </FavoritesProvider>
    </SettingsProvider>
  </StrictMode>,
);
