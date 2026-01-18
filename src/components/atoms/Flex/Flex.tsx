import type {FC, HTMLAttributes} from "react";

const Flex: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  ...props
}) => {
  return <div className={`flex ${className}`} {...props} />;
};
export default Flex;
