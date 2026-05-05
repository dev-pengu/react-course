import { type ComponentPropsWithoutRef, forwardRef } from "react";

export type TextAreaProps = ComponentPropsWithoutRef<"textarea"> & {
  label: string;
};

export default forwardRef<HTMLTextAreaElement, TextAreaProps>(function TextArea(
  { label, ...props }: TextAreaProps,
  ref,
) {
  return (
    <p className="flex flex-col gap-1 my-4">
      <label className="text-sm font-bold uppercase text-stone-500">
        {label}
      </label>
      <textarea
        ref={ref}
        className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        {...props}
      />
    </p>
  );
});
