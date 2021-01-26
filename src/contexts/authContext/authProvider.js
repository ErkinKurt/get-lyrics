import { createContext } from "react";
import useProviderAuth from "./useProviderAuth";

export const authContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = useProviderAuth();

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  )
};

export default AuthProvider;

