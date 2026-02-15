import {createContext} from "react";
import type {User} from "../types/user.types";

export interface ToastType {
  show: boolean;
  action?: string;
  message?: string;
}

export interface ShowToastType {
  action?: string;
  message?: string;
}

export const initialToast = {
  show: false,
  action: "",
  message: "",
};

interface ContextDataType {
  user: User | null;
  setUser: (user: User | null) => void;
  toast: ToastType;
  showToast: (params?: ShowToastType) => void;
}

const ContextData = createContext<ContextDataType>({
  user: null,
  setUser: () => {},
  toast: initialToast,
  showToast: () => {},
});

export default ContextData;
