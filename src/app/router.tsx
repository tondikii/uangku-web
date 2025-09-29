import authRoutes from "@/features/auth/routes";
import dashboardRoutes from "@/features/dashboard/routes";
import {createBrowserRouter} from "react-router";
import App from "./App";
import ErrorPage from "@/features/error/pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [...dashboardRoutes, ...authRoutes],
  },
]);

export default router;
