import {Col, Text, Row, Icon, Button} from "@/components/atoms";
import type {FC, HTMLAttributes} from "react";
import {useNavigate} from "react-router";

export interface ScreenHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  withGoBack?: boolean;
}

const ScreenHeader: FC<ScreenHeaderProps> = ({title, children, withGoBack}) => {
  const navigate = useNavigate();

  return (
    <Col className="flex-col p-4 bg-primary gap-2 shrink-0 w-full">
      <Row className="items-center gap-2">
        {withGoBack && (
          <Button
            onClick={() => navigate(-1)}
            className="btn btn-ghost btn-xs p-0 text-base-content/60"
          >
            <Icon name="chevron-left" size={14} />
          </Button>
        )}

        <Text
          size="xs"
          weight="semibold"
          color="base-60"
          className="tracking-wider opacity-70 uppercase"
        >
          {title}
        </Text>
      </Row>
      {children}
    </Col>
  );
};

export default ScreenHeader;
