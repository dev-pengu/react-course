import { useEffect, useRef, type PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export interface ModalRef {
  open: () => void;
  close: () => void;
}

export type ModalProps = PropsWithChildren & {
  open: boolean;
};

const Modal = function Modal({ open, children }: ModalProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
    } else {
      dialog.current?.close();
    }
  }, [open]);

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {open ? children : null}
    </dialog>,
    document.getElementById("modal")!,
  );
};

export default Modal;
