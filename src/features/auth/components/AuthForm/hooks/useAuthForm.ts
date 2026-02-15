import {useState, type FormEvent} from "react";
import type {AuthFormProps} from "../AuthForm";
import type {AuthFormType} from "@/features/auth/types/auth.types";
import {useAuth} from "@/hooks";

const useAuthForm = ({isSignUp}: AuthFormProps) => {
  const [authForm, setAuthForm] = useState<AuthFormType>({
    email: "",
    password: "",
    name: "",
  });

  const {loading, error, signIn, signUp} = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setAuthForm((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      await signUp(authForm);
      return;
    }
    await signIn(authForm);
  };

  return {handleChange, handleSubmit, loading, error};
};
export default useAuthForm;
