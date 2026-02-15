import {FullScreenContainer} from "@/components/molecules";
import BottomNavbar from "./BottomNavbar";
import {Outlet} from "react-router";

export default function AppLayout() {
  return (
    <FullScreenContainer>
      <main className="flex-1 w-full h-full overflow-hidden relative">
        <Outlet />
      </main>

      <BottomNavbar />
    </FullScreenContainer>
  );
}
