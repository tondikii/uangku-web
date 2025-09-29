import type {RouteObject} from "react-router";
import DashboardLayout from "./components/DashboardLayout";
import {lazy} from "react";
const HomePage = lazy(() => import("./pages/HomePage"));

const dashboardRoutes: RouteObject[] = [
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
];

export default dashboardRoutes;
