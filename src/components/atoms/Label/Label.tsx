import type {FC, ParamHTMLAttributes} from "react";

const Label: FC<ParamHTMLAttributes<HTMLLabelElement>> = ({
  className = "",
  ...props
}) => {
  return <label className={`label text-xs ${className}`} {...props} />;
};

export default Label;
