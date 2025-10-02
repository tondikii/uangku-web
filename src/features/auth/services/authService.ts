import type {AuthForm, AuthResponse, User} from "../types";

export async function loginService({
  email,
  password,
}: AuthForm): Promise<AuthResponse> {
  await new Promise((r) => setTimeout(r, 1000)); // simulate API delay

  if (email === "admin@example.com" && password === "password") {
    const user: User = {id: "1", name: "Admin", email};
    return {user};
  }

  return {error: "Invalid credentials"};
}

export async function registerService({
  name,
  email,
  password,
}: AuthForm): Promise<AuthResponse> {
  await new Promise((r) => setTimeout(r, 1000));

  if (!email || !password) {
    return {error: "Email and password required"};
  }

  const user: User = {id: "2", name, email};
  return {user};
}
