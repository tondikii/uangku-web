import {PropagateLoader} from "react-spinners";

export default function PageLoader() {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <PropagateLoader color="#92e3a9" />
    </div>
  );
}
