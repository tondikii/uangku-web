import {lazy} from "react";
import AuthLayout from "./components/AuthLayout";
import type {RouteObject} from "react-router";
import {PublicRoute} from "@/components/organisms";

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
