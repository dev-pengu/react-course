import { useRef } from "react";
import Input from "./Input";
import TextArea from "./TextArea";
import Modal, { type ModalRef } from "./Modal";

export type ProjectInputData = {
  title: string;
  description: string;
  dueDate: string;
};

export type NewProjectProps = {
  onAdd: (formData: ProjectInputData) => void;
  onCancel: () => void;
};

export default function NewProject({ onAdd, onCancel }: NewProjectProps) {
  const modal = useRef<ModalRef>(null);

  const title = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLTextAreaElement>(null);
  const dueDate = useRef<HTMLInputElement>(null);

  const handleFormSubmit = () => {
    const currentTitle = title.current?.value;
    const currentDescription = description.current?.value;
    const currentDueDate = dueDate.current?.value;

    if (
      currentTitle?.trim() === "" ||
      currentDescription?.trim() === "" ||
      currentDueDate?.trim() === ""
    ) {
      modal.current?.open();
      return;
    }

    onAdd({
      title: currentTitle!,
      description: currentDescription!,
      dueDate: currentDueDate!,
    });
  };

  return (
    <>
      <Modal ref={modal} buttonCaption="Okay">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">
          Oops ... looks like you forgot to enter a value.
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure you provide a valid value for every input field.
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              onClick={onCancel}
              type="button"
              className="text-stone-800 hover:text-stone-950"
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              onClick={handleFormSubmit}
              type="button"
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
            >
              Save
            </button>
          </li>
        </menu>
        <Input type="text" label="Title" ref={title} />
        <TextArea label="Description" ref={description} />
        <Input type="date" label="Due Date" ref={dueDate} />
      </div>
    </>
  );
}
