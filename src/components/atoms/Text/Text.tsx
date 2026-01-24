import type {FC, ParamHTMLAttributes} from "react";

export interface TextProps extends ParamHTMLAttributes<HTMLParagraphElement> {
  size?: "10px" | "xs" | "sm" | "md" | "lg";
  color?: "base-80" | "base-60" | "primary";
  weight?: "normal" | "medium" | "semibold" | "bold" | "extrabold";
}

const Text: FC<TextProps> = ({
  className = "",
  size = "sm",
  color = "base-80",
  weight = "normal",
  ...props
}) => {
  const sizeClasses = {
    "10px": "text-[10px]",
    xs: "text-xs",
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
  };

  const colorClasses = {
    "base-80": "text-base-content/80",
    "base-60": "text-base-content/60",
    primary: "text-primary",
  };

  const weightClasses = {
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    extrabold: "font-extrabold",
  };

  const finalClass = [
    sizeClasses[size as keyof typeof sizeClasses],
    colorClasses[color as keyof typeof colorClasses],
    weightClasses[weight as keyof typeof weightClasses],
    className,
  ]
    .join(" ")
    .trim();

  return <p className={finalClass} {...props} />;
};

export default Text;
