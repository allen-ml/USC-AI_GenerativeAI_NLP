import type { ReactNode } from "react";
import React, { createContext, useContext } from "react";

interface ScrollContextType {
  scrollToSection: (sectionId: string) => void;
  snapToClosestSection: () => void;
}

const ScrollContext = createContext<ScrollContextType | undefined>(undefined);

export const useScrollContext = () => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScrollContext must be used within a ScrollProvider");
  }
  return context;
};

interface ScrollProviderProps {
  children: ReactNode;
  scrollToSection: (sectionId: string) => void;
  snapToClosestSection: () => void;
}

export const ScrollProvider: React.FC<ScrollProviderProps> = ({
  children,
  scrollToSection,
  snapToClosestSection,
}) => {
  return (
    <ScrollContext.Provider value={{ scrollToSection, snapToClosestSection }}>
      {children}
    </ScrollContext.Provider>
  );
};
