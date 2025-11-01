import { ReactNode } from 'react';

interface PageToolbarProps {
  children: ReactNode;
}

function PageToolbar({ children }: PageToolbarProps) {
  return (
    <div className="flex justify-between items-center">
      {children}
    </div >
  )
}

export default PageToolbar;

