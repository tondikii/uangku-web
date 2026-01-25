import type {FC} from "react";

const Li: FC<React.HTMLAttributes<HTMLLIElement>> = ({
  className = "",
  ...props
}) => {
  const initialClass =
    "flex justify-between items-center p-4 rounded-none hover:bg-primary/10 transition-all cursor-pointer";

  className = [initialClass, className].join(" ").trim();
  return <li className={className} {...props} />;
};
export default Li;
