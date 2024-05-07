import { useContext } from "react";
import server from "../api/server";
import AuthContext from "../contexts/AuthContext";

const useRefreshToken = () => {
  const { accessToken, setAccessToken } = useContext(AuthContext);
  const refresh = async () => {
    const response = await server.post(
      "/users/refresh",
      {},
      {
        withCredentials: true,
      }
    );
    setAccessToken(response.data.accessToken);
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
