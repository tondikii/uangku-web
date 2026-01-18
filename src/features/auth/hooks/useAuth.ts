import {useState} from "react";
import {signInService, signUpService} from "../services/authService";
import type {
  AuthFormType,
  SignInResponse,
  SignUpResponse,
} from "@/types/auth.type";
import useContextData from "@/store/useContextData";
import {isAxiosError} from "axios";

export function useAuth() {
  const {user, setUser} = useContextData();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signIn(payload: AuthFormType) {
    try {
      setLoading(true);
      setError(null);
      const res: SignInResponse = await signInService(payload);
      if (res?.data?.accessToken) {
        localStorage.setItem("access_token", res.data.accessToken);
        setUser(res.data.user);
      }
      return res;
    } catch (err: unknown) {
      let errorMessage = "An error occurred during sign-in.";
      if (isAxiosError<SignInResponse>(err)) {
        errorMessage = err.response?.data?.message || err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  async function signUp(payload: AuthFormType) {
    try {
      setLoading(true);
      setError(null);
      const res: SignUpResponse = await signUpService(payload);
      return res;
    } catch (err) {
      let errorMessage = "An error occurred during sign-in.";
      if (isAxiosError<SignInResponse>(err)) {
        errorMessage = err.response?.data?.message || err.message;
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return {user, setUser, loading, error, signIn, signUp};
}
