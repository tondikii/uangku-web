export interface AuthFormType {
  name: string;
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface SignUpResponse {
  data?: {
    user: User;
  };
  message: string;
}

export interface SignInResponse {
  data?: {
    user: User;
    accessToken: string;
  };
  message: string;
}
