import {Outlet} from "react-router";
import ManageMoneySvg from "@/assets/manage_money.svg";
import {Col, Image} from "@/components/atoms";
import {FullScreenContainer} from "@/components/molecules";

export default function AuthLayout() {
  return (
    <FullScreenContainer className="p-4">
      <Col className="gap-8 w-full items-center">
        <Image
          className="w-xs"
          src={ManageMoneySvg}
          alt="Manage Money Illustration"
        />
        <Outlet />
      </Col>
    </FullScreenContainer>
  );
}
