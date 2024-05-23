import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./contexts/AuthContext";
import { SettingsContextProvider } from "./contexts/SettingsContext";
import { GameDataProvider } from "./components/gameComponent/contexts/gameContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SettingsContextProvider>
      <AuthContextProvider>
        <GameDataProvider>
          <BrowserRouter basename="Chessverse">
            <Routes>
              <Route path="/*" element={<App />} />
            </Routes>
          </BrowserRouter>
        </GameDataProvider>
      </AuthContextProvider>
    </SettingsContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
