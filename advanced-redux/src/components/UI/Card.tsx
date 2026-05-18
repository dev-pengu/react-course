import type { ComponentPropsWithoutRef, PropsWithChildren } from 'react';
import classes from './Card.module.css';

const Card = ({children, ...props}: PropsWithChildren & ComponentPropsWithoutRef<'section'>) => {
  return (
    <section
      className={`${classes.card} ${props.className ? props.className : ''}`}
    >
      {children}
    </section>
  );
};

export default Card;