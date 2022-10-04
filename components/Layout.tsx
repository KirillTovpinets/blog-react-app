import * as React from 'react';
import { Header } from './Header';

export interface ILayoutProps {
    children: React.ReactNode
}

export function Layout (props: ILayoutProps) {
  return (
    <div>
      <Header />
      { props.children }
    </div>
  );
}
