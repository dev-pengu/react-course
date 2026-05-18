import type { PropsWithChildren } from 'react';
import MainHeader from './MainHeader';

const Layout = ({children}: PropsWithChildren) => {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
    </>
  );
};

export default Layout;