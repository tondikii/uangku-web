import {Flex} from "@/components/atoms";
import {PageLoader} from "@/components/organisms";
import {WIDTH_SM} from "@/constants/sizes.constant";
import {Suspense} from "react";
import {Outlet} from "react-router";

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Flex className="min-h-screen bg-neutral-200 flex justify-center">
        <div
          className="w-full bg-base-100 min-h-screen"
          style={{maxWidth: WIDTH_SM}}
        >
          <Outlet />
        </div>
      </Flex>
    </Suspense>
  );
}
