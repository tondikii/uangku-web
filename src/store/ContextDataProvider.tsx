import {useState, type FC, type ReactNode} from "react";
import ContextData from "./contextData";
import type {User} from "@/types/auth.type";

interface ContextProviderProps {
  children: ReactNode;
}

const ContextDataProvider: FC<ContextProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null);

  return (
    <ContextData.Provider value={{user, setUser}}>
      {children}
    </ContextData.Provider>
  );
};
export default ContextDataProvider;
