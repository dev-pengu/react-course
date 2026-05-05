import type { MouseEventHandler, ReactNode } from "react";

export type TabButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode | ReactNode[];
  isSelected: boolean;
};

export default function TabButton({ children, onClick, isSelected }: TabButtonProps) {
  return (
    <li>
      <button className={isSelected ? 'active' : undefined} onClick={onClick}>
        {children}
      </button>
    </li>
  );
}
