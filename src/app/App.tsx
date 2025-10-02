import {Suspense} from "react";
import {Outlet} from "react-router";
import PageLoader from "./components/PageLoader";

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  );
}
