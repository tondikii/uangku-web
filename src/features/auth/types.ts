export type User = {
  id: string;
  name: string;
  email: string;
};

export type AuthResponse = {
  user?: User;
  error?: string;
};

export type AuthForm = {
  name: string;
  email: string;
  password: string;
};
