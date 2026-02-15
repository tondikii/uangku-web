import {useNavigate} from "react-router";
import {isAxiosError} from "axios";
import useContextData from "@/store/useContextData";
import useMutation from "@/hooks/useMutation"; // Pastikan path ini benar
import {
  signInService,
  signUpService,
} from "@/features/auth/services/auth.services";
import type {
  AuthFormType,
  SignInResponse,
  SignUpResponse,
} from "@/features/auth/types/auth.types";

export default function useAuth() {
  const navigate = useNavigate();
  const {user, setUser, showToast} = useContextData();

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
        showToast({action: "Sign In", message: "Welcome to Uangku."});
        navigate("/");
      }
      return res;
    } catch (err) {
      console.error("Sign in failed:", err);
    }
  };

  const signUp = async (payload: AuthFormType) => {
    try {
      await mutateSignUp(payload);
      showToast({action: "Sign Up", message: "You can sign in now."});
      return navigate("/");
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
