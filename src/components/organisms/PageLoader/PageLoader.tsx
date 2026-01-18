import {FullScreenContainer} from "@/components/molecules";
import {PRIMARY_COLOR} from "@/constants/colors.constant";
import {PropagateLoader} from "react-spinners";

export default function PageLoader() {
  return (
    <FullScreenContainer>
      <PropagateLoader color={PRIMARY_COLOR} />
    </FullScreenContainer>
  );
}
