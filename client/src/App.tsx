import AppLayout from "./components/AppLayout";
import HomeComponent from "./components/HomeComponent";
import LoginComponent from "./components/LoginComponent";
import MissingComponent from "./components/MissingComponent";
import PlayComponent from "./components/PlayComponent";
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
      <Route path="/Chessverse/register" element={<RegisterComponent />} />
      <Route path="/Chessverse/login" element={<LoginComponent />} />
      <Route path="/Chessverse/forgot" element={<ForgotPasswordComponent />} />

      <Route element={<PersistLogin />}>
        <Route element={<RequireAuth />}>
          <Route path="/Chessverse//" element={<AppLayout />}>
            <Route path="/Chessverse//" element={<HomeComponent />} />
            <Route path="/Chessverse//home" element={<HomeComponent />} />
            <Route
              path="/Chessverse//user"
              element={<UserProfileComponent />}
            />
            <Route path="/Chessverse//play">
              <Route path="/Chessverse/" element={<GameBoardComponent />} />
              <Route
                path="/Chessverse/online"
                element={<GameBoardComponent />}
              />
              <Route
                path="/Chessverse/computer"
                element={<GameBoardComponent />}
              />
              <Route path="/Chessverse/online/friend" />
              <Route path="/Chessverse/tournaments" />
              <Route path="/Chessverse/variants" />
            </Route>
          </Route>
        </Route>
      </Route>

      <Route path="/Chessverse//*" element={<MissingComponent />} />
    </Routes>
  );
}

export default App;
