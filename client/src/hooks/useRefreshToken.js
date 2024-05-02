import { useContext } from "react";
import server from "../api/server";
import SettingsContext from "../contexts/SettingsContext";

const useRefreshToken = () => {
  const { accessToken, setAccessToken } = useContext(SettingsContext);
  try {
    const refresh = async () => {
      const response = await server.post(
        "/users/refresh",
        {},
        {
          withCredentials: true,
        }
      );
      setAccessToken(response.data.accessToken);
      console.log(accessToken);
      console.log(response.data.accessToken);
      return response.data.accessToken;
    };
    return refresh;
  } catch (err) {
    console.log(err.message);
  }
};

export default useRefreshToken;
