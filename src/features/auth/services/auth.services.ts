import {api} from "@/lib/axios";
import type {
  AuthFormType,
  SignInResponse,
  SignUpResponse,
} from "../types/auth.types";

export async function signInService(
  payload: AuthFormType,
): Promise<SignInResponse> {
  const {data} = await api.post("/auth/sign-in", {
    email: payload.email,
    password: payload.password,
  });
  return data;
}

export async function signUpService(
  payload: AuthFormType,
): Promise<SignUpResponse> {
  const {data} = await api.post("/auth/sign-up", payload);

  return data;
}
