import {Outlet} from "react-router";
import ManageMoneySvg from "@/assets/manage_money.svg";
import {Grid, Image} from "@/components/atoms";
import {FullScreenContainer} from "@/components/molecules";

export default function AuthLayout() {
  return (
    <FullScreenContainer>
      <Grid direction="rows" gap={8} className="place-items-center">
        <Image
          className="w-xs"
          src={ManageMoneySvg}
          alt="Manage Money Illustration"
        />
        <Outlet />
      </Grid>
    </FullScreenContainer>
  );
}
