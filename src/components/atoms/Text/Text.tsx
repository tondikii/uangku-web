import type {FC, ParamHTMLAttributes} from "react";

export interface TextProps extends ParamHTMLAttributes<HTMLParagraphElement> {
  size?: "xs" | "sm" | "md" | "lg";
}

const Text: FC<TextProps> = ({className = "", size = "xs", ...props}) => {
  return <p className={`text-${size} text-center ${className}`} {...props} />;
};

export default Text;
