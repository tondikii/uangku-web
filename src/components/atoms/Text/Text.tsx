import type {FC, ParamHTMLAttributes} from "react";

export interface TextProps extends ParamHTMLAttributes<HTMLParagraphElement> {
  size?: "8px" | "10px" | "xs" | "sm" | "md" | "lg";
  color?: "base-75" | "base-60" | "primary";
  weight?: "normal" | "medium" | "semibold" | "bold" | "extrabold";
}

const Text: FC<TextProps> = ({
  className = "",
  size = "xs",
  color = "base-75",
  weight = "normal",
  ...props
}) => {
  const sizeClasses = {
    "8px": "text-[8px]",
    "10px": "text-[10px]",
    xs: "text-xs",
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg",
  };

  const colorClasses = {
    "base-75": "text-base-content/75",
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
