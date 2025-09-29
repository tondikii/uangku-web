import {Outlet} from "react-router";

export default function AuthLayout() {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <Outlet />
    </div>
  );
}
