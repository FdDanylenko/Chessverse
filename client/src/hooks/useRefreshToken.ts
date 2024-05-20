import { useContext } from "react";
import server from "../api/server";
import AuthContext from "../contexts/AuthContext";

const useRefreshToken = () => {
  const { accessToken, setAccessToken, setUser } = useContext(AuthContext);
  const refresh = async () => {
    const response = await server.post(
      "/users/refresh",
      {},
      {
        withCredentials: true,
      }
    );
    setAccessToken(response.data.accessToken);
    setUser(response.data.user);
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
