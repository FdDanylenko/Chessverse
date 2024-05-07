import { createContext, ReactNode, useState } from "react";

interface User {
  id: string;
  username: string;
  email: string;
}

const AuthContext = createContext<any>({});

type AuthContextProviderProps = {
  children: ReactNode;
};

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string>("");
  const [accessToken, setAccessToken] = useState<string>("");
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        username,
        setUsername,
        accessToken,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
