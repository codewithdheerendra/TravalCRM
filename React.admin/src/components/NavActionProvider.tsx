"use client";

import { createContext, useContext, useState, useMemo } from "react";

type NavContextType = {
  open: boolean;
  toggleNav: () => void;
  closeNav: () => void;
};

const NavContext = createContext<NavContextType>({
  open: true,
  toggleNav: () => {},
  closeNav: () => {},
});

export const NavActionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(true);

  const value = useMemo(
    () => ({
      open,
      toggleNav: () => setOpen((prev) => !prev),
      closeNav: () => setOpen(false),
    }),
    [open]
  );

  return <NavContext.Provider value={value}>{children}</NavContext.Provider>;
};

export const useNavAction = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useNavAction must be used within a NavActionProvider");
  }
  return context;
};
