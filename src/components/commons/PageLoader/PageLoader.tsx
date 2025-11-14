import {FullScreenContainer} from "@/components/layouts";
import {PropagateLoader} from "react-spinners";

export default function PageLoader() {
  return (
    <FullScreenContainer>
      <PropagateLoader color="#92e3a9" />
    </FullScreenContainer>
  );
}
