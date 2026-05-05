import { useRef } from "react";
import Modal, { type ModalRef } from "./Modal";

export type NewTaskProps = {
  onTaskAdd: (text: string) => void;
};

export default function NewTask({ onTaskAdd }: NewTaskProps) {
  const ref = useRef<HTMLInputElement>(null);
  const modal = useRef<ModalRef>(null);

  const handleButtonClick = () => {
    const text = ref.current?.value;
    if (text?.trim() === "") {
      modal.current?.open();
      return;
    }
    ref.current!.value = '';
    onTaskAdd(text!);
  };

  return (
    <>
      <Modal buttonCaption="Okay" ref={modal}>
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">
          Oops ... looks like you forgot to enter a value.
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure you provide a valid value for every new task.
        </p>
      </Modal>
      <div className="flex items-center gap-4">
        <input
          ref={ref}
          type="text"
          className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        />
        <button
          onClick={handleButtonClick}
          className="text-stone-700 hover:text-stone-950"
        >
          Add Task
        </button>
      </div>
    </>
  );
}
