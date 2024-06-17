import AppLayout from "./components/AppLayout";
import HomeComponent from "./components/HomeComponent";
import LoginComponent from "./components/LoginComponent";
import MissingComponent from "./components/MissingComponent";
import RegisterComponent from "./components/RegisterComponent";
import "./css/App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import ForgotPasswordComponent from "./components/ForgotPasswordComponent";
import UserProfileComponent from "./components/UserProfileComponent";
import GameBoardComponent from "./components/gameComponent/GameBoardComponent";

function App() {
  return (
    <Routes>
      <Route path="register" element={<RegisterComponent />} />
      <Route path="login" element={<LoginComponent />} />
      <Route path="forgot" element={<ForgotPasswordComponent />} />

      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomeComponent />} />
            <Route path="home" element={<HomeComponent />} />
            <Route path="user" element={<UserProfileComponent />} />
            <Route path="play" element={<GameBoardComponent />}>
              <Route path="online" element={<GameBoardComponent />} />
              <Route path="computer" element={<GameBoardComponent />} />
            </Route>
          </Route>
        </Route>
      </Route>

      <Route path="*" element={<MissingComponent />} />
    </Routes>
  );
}

export default App;
