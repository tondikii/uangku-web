import type {ApiResponse} from "@/types/api.types";
import type {User} from "@/types/user.types";

export interface AuthFormType {
  name: string;
  email: string;
  password: string;
}

export interface SignUpResponse extends ApiResponse {
  data?: {
    user: User;
  };
}

export interface SignInResponse extends ApiResponse {
  data?: {
    user: User;
    accessToken: string;
  };
}
