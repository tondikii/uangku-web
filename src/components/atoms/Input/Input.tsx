import type {FC, InputHTMLAttributes} from "react";

type InputSize = "sm" | "md" | "lg";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  inputSize?: InputSize; // ✅ renamed
}

const sizeClasses: Record<InputSize, string> = {
  sm: "h-9 px-3 text-xs placeholder:!text-xs",
  md: "h-11 px-4 text-sm placeholder:!text-sm",
  lg: "h-12 px-4 text-base placeholder:!text-base",
};

const Input: FC<InputProps> = ({
  className = "",
  inputSize = "sm", // ✅ default
  ...props
}) => {
  return (
    <input
      type={props.type || "text"}
      className={`
        w-full
        input input-primary
        font-medium
        text-base-content/75
        ${sizeClasses[inputSize]}
        ${className}
      `}
      required={props?.required === undefined ? true : props.required}
      {...props}
    />
  );
};

export default Input;
