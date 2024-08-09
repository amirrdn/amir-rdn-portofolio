// context/ThemeContext.tsx
"use client"; // Menandakan bahwa ini adalah Client Component

import React, { createContext, useContext, useState, FC } from 'react';

type ThemeContextType = {
  isLightTheme: boolean;
  setIsLightTheme: React.Dispatch<React.SetStateAction<boolean>>;
  locale: string;
  setLocal: React.Dispatch<React.SetStateAction<string>>;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLightTheme, setIsLightTheme] = useState(false);
  const [locale, setLocal] = useState('en');

  return (
    <ThemeContext.Provider value={{ isLightTheme, setIsLightTheme, locale, setLocal }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
