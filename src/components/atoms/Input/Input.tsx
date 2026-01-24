import type {FC, InputHTMLAttributes} from "react";

const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({
  className = "",
  ...props
}) => {
  return (
    <input
      type={props.type || "text"}
      className={`w-full input input-primary text-sm text-base-content/60 font-medium ${className}`}
      required={props?.required === undefined ? true : props.required}
      {...props}
    />
  );
};
export default Input;
