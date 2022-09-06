import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { AppContextProvider } from "./components/context/app";
import { ProfileContextProvider } from "./components/context/user";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AppContextProvider>
      <HelmetProvider>
        <ProfileContextProvider>
          <App />
        </ProfileContextProvider>
      </HelmetProvider>
    </AppContextProvider>
  </React.StrictMode>
);
