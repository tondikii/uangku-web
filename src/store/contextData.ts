import {createContext} from "react";
import type {User} from "../types/user.types";

interface ContextDataType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const ContextData = createContext<ContextDataType>({
  user: null,
  setUser: () => {},
});

export default ContextData;
