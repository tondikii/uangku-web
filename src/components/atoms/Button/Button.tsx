import type {FC, ButtonHTMLAttributes} from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({loading, className = "", ...props}) => {
  return (
    <button
      className={`btn btn-primary ${className}`}
      disabled={loading}
      {...props}
    >
      {loading && <span className="loading loading-spinner" />}
      {props?.children}
    </button>
  );
};

export default Button;
