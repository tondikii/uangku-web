import {useAuth} from "@/hooks";
import type {FC} from "react";
import {Navigate, type RouteProps} from "react-router";

const PublicRoute: FC<RouteProps> = ({children}) => {
  const {user} = useAuth();
  if (user) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default PublicRoute;
