import {useAuth} from "@/hooks";
import type {FC} from "react";
import {Navigate, type RouteProps} from "react-router";

const ProtectedRoute: FC<RouteProps> = ({children}) => {
  const {user} = useAuth();
  if (!user) {
    return <Navigate to="/sign-in" replace />;
  }
  return children;
};

export default ProtectedRoute;
