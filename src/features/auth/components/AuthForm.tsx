import {useEffect, useState, type FC, type FormEvent} from "react";
import {Link, useNavigate} from "react-router";
import {useAuth} from "../hooks/useAuth";
import type {AuthFormType} from "@/types/auth.type";
import {Button, Grid, Text} from "@/components/atoms";
import {FormField, Title} from "@/components/molecules";

interface AuthFormProps {
  isSignUp?: boolean;
}

const AuthForm: FC<AuthFormProps> = ({isSignUp}) => {
  const {user, loading, error, signIn, signUp} = useAuth();
  const navigate = useNavigate();

  const [authForm, setAuthForm] = useState<AuthFormType>({
    email: "",
    password: "",
    name: "",
  });

  useEffect(() => {
    if (user?.id) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const title = isSignUp ? "Sign Up" : "Sign In";
  const directTitle = !isSignUp ? "Sign Up" : "Sign In";
  const directRoute = !isSignUp ? "/sign-up" : "/sign-in";
  const directText = !isSignUp
    ? "Don’t have an account?"
    : "Already have an account?";

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

  return (
    <Grid isForm className="place-items-center" onSubmit={handleSubmit}>
      <Title>{title} to Uangku</Title>
      {isSignUp && <FormField name="name" onChange={handleChange} />}

      <FormField name="email" type="email" onChange={handleChange} />

      <FormField name="password" type="password" onChange={handleChange} />

      <Button className="w-full" loading={loading}>
        {title}
      </Button>

      {error && <Text className="text-red-500">{error}</Text>}
      <Text>
        {directText}{" "}
        <Link to={directRoute} className="text-blue-400 underline">
          {directTitle}
        </Link>
      </Text>
    </Grid>
  );
};
export default AuthForm;
