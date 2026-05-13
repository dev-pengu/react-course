import { useEffect, useRef, type PropsWithChildren } from 'react';
import { createPortal } from 'react-dom';


function Modal({ open, children, onClose }: PropsWithChildren<{ open: boolean; onClose: (() => void) | null }>) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog} onClose={onClose ?? undefined}>
      {open ? children : null}
    </dialog>,
    document.getElementById('modal')!
  );
}

export default Modal;