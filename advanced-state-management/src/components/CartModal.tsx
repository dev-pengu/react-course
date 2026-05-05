import { forwardRef, useImperativeHandle, useRef, type ComponentPropsWithoutRef, type ReactElement } from 'react';
import { createPortal } from 'react-dom';
import Cart from './Cart';

export interface ModalRef {
  open: () => void;
}

export type ModalProps = ComponentPropsWithoutRef<"dialog"> & {
  title: string;
  actions: ReactElement;
};

const CartModal = forwardRef<ModalRef, ModalProps>(function Modal(
  { title, actions }: ModalProps,
  ref
) {
  const dialog = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current?.showModal();
      },
    };
  });

  return createPortal(
    <dialog id="modal" ref={dialog}>
      <h2>{title}</h2>
      <Cart/>
      <form method="dialog" id="modal-actions">
        {actions}
      </form>
    </dialog>,
    document.getElementById('modal')!
  );
});

export default CartModal;