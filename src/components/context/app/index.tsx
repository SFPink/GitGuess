import React, { useContext } from "react";

enum Themes {
  Light = "LIGHT",
  Dark = "DARK",
}
type AppContextState = {
  sitename: string;
  description: string;
  theme: Themes;
};

const appDefaultValues: AppContextState = {
  sitename: "Git Guess",
  description: "Do you want to play a game?",
  theme: Themes.Dark,
};

const AppContext = React.createContext<AppContextState>(appDefaultValues);

function AppContextProvider({ children }) {
  return (
    <AppContext.Provider value={appDefaultValues}>
      {children}
    </AppContext.Provider>
  );
}

function useApp(): AppContextState {
  const context = useContext(AppContext);

  if (context === undefined) {
    throw new Error("useApp must be used within App Provider");
  }

  return context;
}

export { AppContextProvider, AppContext, useApp };
