import React from "react";
import ReactDOM from "react-dom/client";
import "./css/index.css";
import App from "./App";
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "./contexts/AuthContext";
import { SettingsContextProvider } from "./contexts/SettingsContext";
import { GameDataProvider } from "./components/gameComponent/contexts/gameContext";

const router = createBrowserRouter(
  createRoutesFromElements(<Route path="/*" element={<App />} />),
  {
    basename: "/Chessverse",
  }
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SettingsContextProvider>
      <AuthContextProvider>
        <GameDataProvider>
          <RouterProvider router={router} />
        </GameDataProvider>
      </AuthContextProvider>
    </SettingsContextProvider>
  </React.StrictMode>
);

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <SettingsContextProvider>
//       <AuthContextProvider>
//         <GameDataProvider>
//           <BrowserRouter basename="Chessverse">
//             {/* <BrowserRouter> */}
//             <Routes>
//               <Route path="/*" element={<App />} />
//             </Routes>
//           </BrowserRouter>
//         </GameDataProvider>
//       </AuthContextProvider>
//     </SettingsContextProvider>
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
