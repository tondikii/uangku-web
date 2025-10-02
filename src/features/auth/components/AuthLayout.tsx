import {Outlet} from "react-router";
import ManageMoneySvg from "@/assets/manage_money.svg";

export default function AuthLayout() {
  return (
    <div className="w-screen h-screen flex justify-center items-center p-4">
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
    </div>
  );
}
