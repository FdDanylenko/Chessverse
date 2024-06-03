import { createContext, ReactNode, useRef, useState } from "react";

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
  const formPictureRef = useRef<any>(null);
  const formDataRef = useRef<any>(null);
  const [persist, setPersist] = useState<any>(() => {
    const item = localStorage.getItem("persist");
    return item ? JSON.parse(item) : false;
  });
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        username,
        setUsername,
        accessToken,
        setAccessToken,
        persist,
        setPersist,
        formPictureRef,
        formDataRef,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
