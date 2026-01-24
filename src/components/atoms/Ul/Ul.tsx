import type {FC, HTMLAttributes} from "react";

const Ul: FC<HTMLAttributes<HTMLUListElement>> = ({
  className = "",
  ...props
}) => {
  const initialClass = "w-full flex-1 overflow-y-auto list p-0 pb-18";

  className = [initialClass, className].join(" ").trim();
  return <ul className={className} {...props} />;
};
export default Ul;
