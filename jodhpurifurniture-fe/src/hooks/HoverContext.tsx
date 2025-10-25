import { useRouter } from 'next/router';
import { useState, ReactNode, createContext, useEffect } from 'react';
type HoverContext = {
  sidebarToggle: any;
  toggleSidebar: (event) => void;
  closeSidebar: () => void;
};

export const HoverContext = createContext<HoverContext>(
  {} as HoverContext
);

type Props = {
  children: ReactNode;
};

export function HoverProvider({ children }: Props) {
  const router = useRouter();
  // const IsDashBoard = router.pathname?.split('/')[3] === 'dashboard';

  const [sidebarToggle, setSidebarToggle] = useState(null);


  const toggleSidebar = (event) => {
    setSidebarToggle(event.currentTarget);
  };

  const closeSidebar = () => {
    setSidebarToggle(null);
  };

  return (
    <HoverContext.Provider
      value={{ sidebarToggle, toggleSidebar, closeSidebar }}
    >
      {children}
    </HoverContext.Provider>
  );
}
