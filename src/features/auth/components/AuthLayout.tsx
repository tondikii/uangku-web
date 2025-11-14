import {Outlet} from "react-router";
import ManageMoneySvg from "@/assets/manage_money.svg";
import FullScreenContainer from "@/components/layouts/FullScreenContainer/FullScreenContainer";

export default function AuthLayout() {
  return (
    <FullScreenContainer>
      <div className="card md:card-side bg-base-100 shadow-sm !items-center">
        <figure className="p-4">
          <img
            className="w-xs md:w-sm lg:w-sm xl:w-md 2xl:w-lg"
            src={ManageMoneySvg}
            alt="Manage Money Illustration"
          />
        </figure>
        <Outlet />
      </div>
    </FullScreenContainer>
  );
}
