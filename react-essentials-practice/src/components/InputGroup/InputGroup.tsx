import type { PropsWithChildren } from "react";
import "./InputGroup.css";

export type InputGroupProps = {} & PropsWithChildren;

export default function InputGroup({ children }: InputGroupProps) {
  return <div className="input-group">{children}</div>;
}
