import type {FC, ButtonHTMLAttributes} from "react";
import {Loading} from "../";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?:
    | "primary"
    | "secondary"
    | "accent"
    | "error"
    | "ghost"
    | "link"
    | "neutral";
  size?: "xs" | "sm" | "md" | "lg";
  loading?: boolean;
  outline?: boolean;
}

const Button: FC<ButtonProps> = ({
  loading,
  className = "text-xs",
  color = "primary",
  size = "md",
  outline = false,
  children,
  disabled,
  ...props
}) => {
  const colorClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    ghost: "btn-ghost",
    link: "btn-link",
    error: "btn-error",
    neutral: "btn-neutral",
  };

  const sizeClasses = {
    xs: "btn-xs",
    sm: "btn-sm",
    md: "btn-md",
    lg: "btn-lg",
  };

  const finalClass = [
    "btn",
    colorClasses[color],
    sizeClasses[size as keyof typeof sizeClasses],
    outline ? "btn-outline" : "",
    className,
  ]
    .join(" ")
    .trim();

  return (
    <button className={finalClass} disabled={loading || disabled} {...props}>
      {loading && <Loading size="xs" />}
      {children}
    </button>
  );
};

export default Button;
