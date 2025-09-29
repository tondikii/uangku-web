import {useState, type FC, type FormEvent} from "react";
import {Link} from "react-router";
import {useAuth} from "../hooks/useAuth";
import type {AuthForm as AuthFormType} from "../types";

interface AuthFormProps {
  isSignUp?: boolean;
}

const AuthForm: FC<AuthFormProps> = ({isSignUp}) => {
  const {user, loading, error, login, register} = useAuth();
  const [authForm, setAuthForm] = useState<AuthFormType>({
    email: "",
    password: "",
    name: "",
  });

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
    <div>
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {error && <div className="mb-4 text-sm text-red-600">Error: {error}</div>}
      {user && (
        <div className="mb-4 text-sm text-green-600">
          Welcome back, {user.name}!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          required
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          value={authForm.email}
          placeholder="Email"
          required
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={authForm.password}
          placeholder="Password"
          required
          className="w-full border p-2 rounded"
          onChange={handleChange}
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Loading..." : title}
        </button>
      </form>

      <p className="mt-4 text-sm">
        Don’t have an account?{" "}
        <Link to={directRoute} className="text-blue-600">
          {directTitle}
        </Link>
      </p>
    </div>
  );
};
export default AuthForm;
