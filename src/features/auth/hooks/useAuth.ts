import {useState} from "react";
import {loginService, registerService} from "../services/authService";
import type {AuthForm, AuthResponse, User} from "../types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(payload: AuthForm) {
    setLoading(true);
    setError(null);
    const res: AuthResponse = await loginService(payload);
    setLoading(false);

    if (res.error) {
      setError(res.error);
      return;
    }

    if (res.user) setUser(res.user);
  }

  async function register(payload: AuthForm) {
    setLoading(true);
    setError(null);
    const res: AuthResponse = await registerService(payload);
    setLoading(false);

    if (res.error) {
      setError(res.error);
      return;
    }

    if (res.user) setUser(res.user);
  }

  return {user, loading, error, login, register};
}
