import type {FC} from "react";

const Li: FC<React.HTMLAttributes<HTMLLIElement>> = ({
  className = "",
  ...props
}) => {
  const initialClass =
    "flex justify-between items-center px-4 py-5 border-b rounded-none border-base-300 last:border-0 hover:bg-primary/10 transition-all cursor-pointer";

  className = [initialClass, className].join(" ").trim();
  return <li className={className} {...props} />;
};
export default Li;
