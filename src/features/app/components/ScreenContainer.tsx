import {Col} from "@/components/atoms";
import type {FC} from "react";
import ScreenHeader, {type ScreenHeaderProps} from "./ScreenHeader";
import type {ColProps} from "@/components/atoms/Col/Col";
import AddButton from "./AddButton";

interface ScreenContainerProps extends ColProps {
  headerProps: ScreenHeaderProps;
  withAddButton?: boolean;
}

const ScreenContainer: FC<ScreenContainerProps> = ({
  headerProps,
  withAddButton,
  children,
  ...colProps
}) => {
  return (
    <Col className="flex-col h-full relative overflow-hidden" {...colProps}>
      <ScreenHeader {...headerProps} />
      {children}
      {withAddButton && <AddButton />}
    </Col>
  );
};

export default ScreenContainer;
