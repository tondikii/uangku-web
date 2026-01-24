import type {AuthFormProps} from "../components/AuthForm";

const useConditionalText = ({isSignUp}: AuthFormProps) => {
  const conditionalText = {
    title: isSignUp ? "Sign Up" : "Sign In",
    directTitle: !isSignUp ? "Sign Up" : "Sign In",
    directRoute: !isSignUp ? "/sign-up" : "/sign-in",
    directText: !isSignUp
      ? "Don’t have an account?"
      : "Already have an account?",
  };

  return {...conditionalText};
};
export default useConditionalText;
