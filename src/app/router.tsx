import authRoutes from "@/features/auth/AuthRoutes";
import appRoutes from "@/features/app/AppRoutes";
import {createBrowserRouter} from "react-router";
import App from "./App";
import ErrorPage from "@/features/error/pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [...appRoutes, ...authRoutes],
  },
]);

export default router;
