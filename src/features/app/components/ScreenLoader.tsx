import {Col, Loading} from "@/components/atoms";
import type {FC} from "react";

const LoadingPage: FC = () => {
  return (
    <Col className="h-full justify-center items-center">
      <Loading type="dots" size="xl" className="text-primary" />
    </Col>
  );
};

export default LoadingPage;
