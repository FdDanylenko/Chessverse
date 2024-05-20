import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useServerPrivate from "../hooks/useServerPrivate";
import { useEffect } from "react";

const RequireAuth = () => {
  const { user, setUser, username, setUsername, accessToken, setAccessToken } =
    useAuth();
  const location = useLocation();

  const navigate = useNavigate();
  const serverPrivate = useServerPrivate();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await serverPrivate.post("/users/getUserData", {
          username: user.username,
        });
        setUser(result.data.user);
      } catch (error: any) {
        console.log(error.message);
        setUser(null);
        setUsername("");
        setAccessToken("");
        navigate("/login");
      }
    };
    fetchUser();
  }, [location]);

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
