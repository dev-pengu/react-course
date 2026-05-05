import { useState, type ComponentPropsWithoutRef } from "react";
import "./InputField.css";

export type ValueChangeCallback = (newValue: number) => void;

export type NumberInputFieldProps = ComponentPropsWithoutRef<"input"> & {
  labelText: string;
  initialValue?: number;
  valueChangeCallback?: ValueChangeCallback;
};

export default function NumberInputField({
  labelText,
  initialValue = 0,
  valueChangeCallback,
  ...props
}: NumberInputFieldProps) {
  const [value, setValue] = useState<number>(initialValue);

  const handleChangeEvent = (newValue: number) => {
    setValue(newValue);
    if (valueChangeCallback) {
      valueChangeCallback(newValue);
    }
  };

  return (
    <p>
      <label htmlFor={props.name}>{labelText}</label>
      <input
        type="number"
        name={props.name}
        id={props.name}
        className={props.className}
        value={value}
        onChange={(e) => handleChangeEvent(e.target.valueAsNumber)}
      />
    </p>
  );
}
