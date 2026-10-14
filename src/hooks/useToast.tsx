import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react';

type ToastTone = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  tone: ToastTone;
}

interface ToastContextValue {
  /** Shows a visual toast and announces it to screen readers. */
  notify: (message: string, tone?: ToastTone) => void;
  /** Screen-reader-only announcement (no visual toast). */
  announce: (message: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const TONE_CLASS: Record<ToastTone, string> = {
  success: 'alert-success',
  error: 'alert-error',
  info: 'alert-info',
};
const TONE_WORD: Record<ToastTone, string> = { success: 'BAM!', error: 'OOF!', info: 'PSST!' };

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [liveMessage, setLiveMessage] = useState('');
  const nextId = useRef(1);

  const announce = useCallback((message: string) => {
    // Clear first so repeating the same message is announced again.
    setLiveMessage('');
    window.setTimeout(() => setLiveMessage(message), 40);
  }, []);

  const notify = useCallback(
    (message: string, tone: ToastTone = 'success') => {
      const id = nextId.current++;
      setToasts((prev) => [...prev.slice(-2), { id, message, tone }]);
      announce(message);
      window.setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2800);
    },
    [announce],
  );

  const value = useMemo(() => ({ notify, announce }), [notify, announce]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {liveMessage}
      </div>
      <div
        className="toast toast-end toast-bottom z-50 mb-20 md:mb-2 pointer-events-none"
        aria-hidden="true"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`alert ${TONE_CLASS[t.tone]} animate-pop-in border-[3px] border-[var(--ink)] shadow-[4px_4px_0_var(--ink)] font-bold`}
          >
            <span className="font-display text-xl tracking-wider">{TONE_WORD[t.tone]}</span>
            <span>{t.message}</span>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
}
