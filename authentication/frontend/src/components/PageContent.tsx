import { type PropsWithChildren } from 'react';

import classes from './PageContent.module.css';

function PageContent({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <div className={classes.content}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}

export default PageContent;