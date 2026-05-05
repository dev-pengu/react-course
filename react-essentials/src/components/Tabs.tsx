import type { PropsWithChildren, ReactNode } from "react";

export type TabsProps = {
  buttons: ReactNode | ReactNode[];
  ButtonsContainer?: any;
} & PropsWithChildren;

export default function Tabs({
  children,
  buttons,
  ButtonsContainer = "menu",
}: TabsProps) {
  return (
    <>
      <ButtonsContainer>{buttons}</ButtonsContainer>
      {children}
    </>
  );
}
