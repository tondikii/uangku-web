import {useState, type FC, type ReactNode} from "react";
import ContextData, {
  initialToast,
  type ShowToastType,
  type ToastType,
} from "./contextData";
import type {User} from "@/types/user.types";

interface ContextProviderProps {
  children: ReactNode;
}

const ContextDataProvider: FC<ContextProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [toast, setToast] = useState<ToastType>(initialToast);

  const showToast = (params?: ShowToastType) => {
    setToast({show: true, ...params});
    setTimeout(() => {
      setToast(initialToast);
    }, 3000);
  };

  return (
    <ContextData.Provider value={{user, setUser, toast, showToast}}>
      {children}
    </ContextData.Provider>
  );
};

export default ContextDataProvider;
