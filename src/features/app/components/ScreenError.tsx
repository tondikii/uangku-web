import {Error500Svg} from "@/assets";
import {Col, Image, Text} from "@/components/atoms";
import type {FC} from "react";

interface ErrorPageProps {
  errorMessage: string;
}

const ErrorPage: FC<ErrorPageProps> = ({errorMessage}) => {
  return (
    <Col className="h-full justify-center items-center gap-2">
      <Image className="w-xs" src={Error500Svg} alt="Server Error" />
      <Text color="base-60" size="sm">
        {errorMessage}
      </Text>
    </Col>
  );
};

export default ErrorPage;
