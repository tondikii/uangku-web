import {lazy} from "react";
import type {RouteObject} from "react-router";
import {PublicRoute} from "@/components/organisms";
import {AuthLayout} from "./components";

const SignInPage = lazy(() => import("./pages/SignIn.page"));
const SignUpPage = lazy(() => import("./pages/SignUp.page"));

const authRoutes: RouteObject[] = [
  {
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    children: [
      {
        path: "/sign-in",
        element: <SignInPage />,
      },
      {
        path: "/sign-up",
        element: <SignUpPage />,
      },
    ],
  },
];

export default authRoutes;
