import {Col} from "@/components/atoms";
import type {FC, HTMLAttributes} from "react";

const FullScreenContainer: FC<HTMLAttributes<HTMLDivElement>> = ({
  className = "",
  children = null,
}) => {
  return (
    <Col className={`w-full h-screen justify-center items-center ${className}`}>
      {children}
    </Col>
  );
};
export default FullScreenContainer;
