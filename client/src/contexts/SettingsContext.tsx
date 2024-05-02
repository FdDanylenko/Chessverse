import { createContext, ReactNode, useState } from "react";
import { SidebarCollapsed, Theme } from "../models/settings";

const SettingsContext = createContext<any>({});

type SettingsContextProviderProps = {
  children: ReactNode;
};

export const SettingsContextProvider = ({
  children,
}: SettingsContextProviderProps) => {
  const [themeUI, setThemeUI] = useState<Theme>(Theme.Dark);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<SidebarCollapsed>(
    SidebarCollapsed.False
  );
  return (
    <SettingsContext.Provider
      value={{ themeUI, setThemeUI, sidebarCollapsed, setSidebarCollapsed }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContext;
