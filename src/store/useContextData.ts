import {useContext} from "react";
import ContextData from "./contextData";

const useContextData = () => {
  const context = useContext(ContextData);
  if (!context) {
    throw new Error("useContextData must be used within a ContextDataProvider");
  }
  return context;
};
export default useContextData;
