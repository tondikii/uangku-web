import useContextData from "@/store/useContextData";
import {useNavigate} from "react-router";

const useSignOut = () => {
  const navigate = useNavigate();
  const {setUser} = useContextData();

  const signOut = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
  };
  return {signOut};
};

export default useSignOut;
