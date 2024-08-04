import {ReactNode} from 'react';

export default function AccountLayout({
    children,
  }: Readonly<{
    children: ReactNode;
  }>) {
    return (
      <div id="AccountLayout">
        {children}
      </div>
    );
  }
