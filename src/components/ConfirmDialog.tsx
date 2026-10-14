import { useEffect, useRef } from 'react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/** daisyUI modal built on the native <dialog> element (focus trap + Esc to close for free). */
export default function ConfirmDialog({ open, title, message, confirmLabel, cancelLabel = 'Cancel', onConfirm, onCancel }: ConfirmDialogProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog ref={ref} className="modal modal-bottom sm:modal-middle" aria-labelledby="confirm-title" onClose={onCancel}>
      <div className="modal-box panel !rounded-md border-4 !p-0">
        <div className="fill-red halftone border-b-4 border-[var(--ink)] px-5 py-3">
          <h2 id="confirm-title" className="comic-title text-3xl">
            {title}
          </h2>
        </div>
        <p className="px-5 py-5 text-base font-semibold">{message}</p>
        <div className="flex flex-wrap justify-end gap-3 px-5 pb-5">
          <button type="button" className="comic-btn comic-btn-sm" onClick={onCancel} autoFocus>
            {cancelLabel}
          </button>
          <button type="button" className="comic-btn comic-btn-sm comic-btn-red" onClick={onConfirm}>
            {confirmLabel}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="submit" aria-label="Cancel">
          close
        </button>
      </form>
    </dialog>
  );
}
