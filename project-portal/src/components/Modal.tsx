import {
  type ComponentPropsWithoutRef,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { createPortal } from "react-dom";
import Button from "./Button";

export interface ModalRef {
  open: () => void;
}

export type ModalProps = ComponentPropsWithoutRef<"dialog"> & {
  buttonCaption: string;
};

export default forwardRef<ModalRef, ModalProps>(function Modal(
  { buttonCaption, children }: ModalProps,
  ref,
) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current?.showModal();
      },
    };
  });

  return createPortal(
    <dialog
      ref={dialog}
      className="backdrop:bg-stone-900/90 p-4 rounded-md shadow-md"
    >
      {children}
      <form method="dialog" className="mt-4 text-right">
        <Button>{buttonCaption}</Button>
      </form>
    </dialog>,
    document.getElementById("modal-root")!,
  );
});
