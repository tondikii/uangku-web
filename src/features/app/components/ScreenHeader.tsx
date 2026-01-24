import {Col, Text, Row} from "@/components/atoms";
import type {FC, HTMLAttributes} from "react";
import {FiChevronLeft} from "react-icons/fi"; // Menggunakan react-icons
import {useNavigate} from "react-router";

interface ScreenHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  withGoBack?: boolean;
}

const ScreenHeader: FC<ScreenHeaderProps> = ({title, children, withGoBack}) => {
  const navigate = useNavigate();

  return (
    <Col className="flex-col p-4 bg-primary gap-2 shrink-0">
      <Row className="items-center gap-2">
        {withGoBack && (
          <FiChevronLeft
            size={18}
            className="text-base-content/60"
            onClick={() => navigate(-1)}
          />
        )}

        <Text
          size="10px"
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
