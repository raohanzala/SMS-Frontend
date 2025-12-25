// src/context/SettingsContext.tsx
import React, { createContext, useContext } from "react";
// import { useSettings } from "../features/useSettings";

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
  // const { settings, isPending, error } = useSettings() || {};

  const settings = {
    theme: "light",
    language: "en",
    fontSize: 16,
    fontFamily: "Roboto",
    fontWeight: "normal",
  };

  const isPending = false;
  const error = null;

  return (
    <SettingsContext.Provider value={{ settings, isPending, error }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useAppSettings = () => useContext(SettingsContext);