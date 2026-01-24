import {useNavigate} from "react-router";
import {isAxiosError} from "axios";
import {signInService, signUpService} from "../services/auth.services";
import useContextData from "@/store/useContextData";
import useMutation from "@/hooks/useMutation"; // Pastikan path ini benar
import type {
  AuthFormType,
  SignInResponse,
  SignUpResponse,
} from "../types/auth.types";

export function useAuth() {
  const navigate = useNavigate();
  const {user, setUser} = useContextData();

  const {
    mutate: mutateSignIn,
    loading: signInLoading,
    error: signInError,
  } = useMutation<SignInResponse, AuthFormType>(signInService);

  const {
    mutate: mutateSignUp,
    loading: signUpLoading,
    error: signUpError,
  } = useMutation<SignUpResponse, AuthFormType>(signUpService);

  const signIn = async (payload: AuthFormType) => {
    try {
      const res = await mutateSignIn(payload);

      if (res?.data?.accessToken) {
        localStorage.setItem("access_token", res.data.accessToken);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setUser(res.data.user);
        navigate("/");
      }
      return res;
    } catch (err) {
      console.error("Sign in failed:", err);
    }
  };

  const signUp = async (payload: AuthFormType) => {
    try {
      return await mutateSignUp(payload);
    } catch (err) {
      console.error("Sign up failed:", err);
    }
  };

  const getErrorMessage = (error: unknown) => {
    if (isAxiosError(error)) {
      return error.response?.data?.message || error.message;
    }
    return null;
  };

  return {
    user,
    setUser,
    loading: signInLoading || signUpLoading,
    error: getErrorMessage(signInError) || getErrorMessage(signUpError),
    signIn,
    signUp,
  };
}
