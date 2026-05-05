import type { ComponentPropsWithoutRef, ReactNode } from "react";

export type SectionProps = ComponentPropsWithoutRef<"section"> & {
  title: string;
  children: ReactNode | ReactNode[];
  id: string;
};

export default function Section({ title, children, ...props }: SectionProps) {
  return (
    <section {...props}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}
