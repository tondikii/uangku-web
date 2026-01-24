import {useState, type FC, type ReactNode} from "react";
import ContextData from "./contextData";
import type {User} from "@/types/user.types";

interface ContextProviderProps {
  children: ReactNode;
}

const ContextDataProvider: FC<ContextProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  return (
    <ContextData.Provider value={{user, setUser}}>
      {children}
    </ContextData.Provider>
  );
};

export default ContextDataProvider;
