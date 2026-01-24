import type {FC, HTMLAttributes} from "react";

const Form: FC<HTMLAttributes<HTMLFormElement>> = ({
  className = "",
  ...props
}) => {
  return (
    <form
      className={`flex flex-col w-full gap-4 items-center ${className}`}
      {...props}
    />
  );
};
export default Form;
