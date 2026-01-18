import {api} from "@/lib/axios";
import type {
  AuthFormType,
  SignInResponse,
  SignUpResponse,
} from "@/types/auth.type";

export async function signInService({
  email,
  password,
}: AuthFormType): Promise<SignInResponse> {
  const {data} = await api.post("/auth/sign-in", {email, password});
  return data;
}

export async function signUpService(
  payload: AuthFormType
): Promise<SignUpResponse> {
  const {data} = await api.post("/auth/sign-up", payload);

  return data;
}
