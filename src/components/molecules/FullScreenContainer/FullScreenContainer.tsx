import {Flex} from "@/components/atoms";
import type {FC, HTMLAttributes} from "react";

const FullScreenContainer: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  children = null,
}) => {
  return (
    <Flex
      className={`w-full h-screen justify-center items-center p-4 ${className}`}
    >
      {children}
    </Flex>
  );
};
export default FullScreenContainer;
