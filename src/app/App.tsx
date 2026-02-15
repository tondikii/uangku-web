import {Col, Loading} from "@/components/atoms";
import {FullScreenContainer, Toast} from "@/components/molecules";
import {BREAK_POINT_SM} from "@/constants/sizes.constant";
import useContextData from "@/store/useContextData";
import {Suspense} from "react";
import {Outlet} from "react-router";

export default function App() {
  const {toast} = useContextData();

  return (
    <Suspense
      fallback={
        <FullScreenContainer>
          <Loading type="dots" size="xl" className="text-primary" />
        </FullScreenContainer>
      }
    >
      <Col className="min-h-screen bg-neutral-200 items-center">
        <Col
          className="w-full bg-base-100 min-h-screen"
          style={{maxWidth: BREAK_POINT_SM}}
        >
          <Outlet />
          <Toast {...toast} />
        </Col>
      </Col>
    </Suspense>
  );
}
