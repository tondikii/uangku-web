import {useEffect, useState, type FC, type FormEvent} from "react";
import {Link, useNavigate} from "react-router";
import {useAuth} from "../hooks/useAuth";
import type {AuthForm as AuthFormType} from "../types";

interface AuthFormProps {
  isSignUp?: boolean;
}

const AuthForm: FC<AuthFormProps> = ({isSignUp}) => {
  const {user, loading, error, login, register} = useAuth();
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    setAuthForm((prev) => ({...prev, [name]: value}));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (isSignUp) {
      return await register(authForm);
    }
    await login(authForm);
  };

  return (
    <form className="card-body" onSubmit={handleSubmit}>
      <h2 className="card-title self-center md:self-auto">{title} to Uangku</h2>
      {isSignUp && (
        <>
          <label className="label">Name</label>
          <input
            name="name"
            type="text"
            className="w-100 input input-primary"
            placeholder="Name"
            required
            onChange={handleChange}
          />
        </>
      )}

      <label className="label">Email</label>
      <input
        type="email"
        name="email"
        className="w-100 input input-primary"
        placeholder="Email"
        required
        onChange={handleChange}
      />

      <label className="label">Password</label>
      <input
        name="password"
        type="password"
        className="w-100 input input-primary"
        placeholder="Password"
        required
        onChange={handleChange}
      />

      <button type="submit" className="btn btn-primary mt-4" disabled={loading}>
        {loading && <span className="loading loading-spinner"></span>}
        {title}
      </button>
      {error && <p className="mt-2 text-red-500">{error}</p>}
      <p className="mt-4 text-sm text-center">
        Don’t have an account?{" "}
        <Link to={directRoute} className="text-blue-400 underline">
          {directTitle}
        </Link>
      </p>
    </form>
  );
};
export default AuthForm;
