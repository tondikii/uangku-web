import type {FC} from "react";

interface FullScreenContainerProps {
  className?: string;
  children?: React.ReactNode;
}

const FullScreenContainer: FC<FullScreenContainerProps> = ({
  className = "",
  children = null,
}) => {
  return (
    <div
      className={`w-screen h-screen flex justify-center items-center p-4 ${className}`}
    >
      {children}
    </div>
  );
};
export default FullScreenContainer;
