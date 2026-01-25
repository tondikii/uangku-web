import {EmptyData} from "@/assets";
import {Col, Image, Text} from "@/components/atoms";
import type {FC} from "react";

interface ScreenEmptyProps {
  entityName: string;
}

const ScreenEmpty: FC<ScreenEmptyProps> = ({entityName}) => {
  return (
    <Col className="h-full justify-center items-center gap-2">
      <Image className="w-xs" src={EmptyData} alt="Empty Data" />
      <Text color="base-60" size="sm">
        No {entityName} found.
      </Text>
    </Col>
  );
};

export default ScreenEmpty;
