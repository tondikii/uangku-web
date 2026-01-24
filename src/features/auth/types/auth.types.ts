import type {User} from "@/types/user.types";

export interface AuthFormType {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse {
  data?: {
    user: User;
  };
  message: string;
}

export interface SignInResponse extends SignUpResponse {
  data?: {
    user: User;
    accessToken: string;
  };
}
