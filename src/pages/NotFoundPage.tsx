import { Link } from 'react-router';
import ActionBurst from '../components/ActionBurst';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function NotFoundPage() {
  useDocumentTitle('Page not found');
  return (
    <section className="panel panel-lg mx-auto max-w-2xl p-6 text-center sm:p-10">
      <ActionBurst word="ZAP!" size={140} className="mx-auto -rotate-6" />
      <h1 className="comic-title mt-4 text-5xl sm:text-6xl">This page vanished!</h1>
      <p className="mx-auto mt-3 max-w-md text-lg font-semibold">
        Looks like a villain zapped this page into another dimension. Let's get you back to the jokes.
      </p>
      <Link to="/" className="comic-btn comic-btn-red mt-6">
        Back to Home
      </Link>
    </section>
  );
}
