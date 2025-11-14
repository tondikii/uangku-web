import {useRouteError} from "react-router";
import {FullScreenContainer} from "@/components";
import Error404Svg from "@/assets/error_404.svg";
import Error500Svg from "@/assets/error_500.svg";

interface RouteError {
  status: number;
}

const dataPageNotFound = {
  image: Error404Svg,
  imageAlt: "Page Not Found",
  message: "The page you are looking for does not exist.",
};

const dataServerError = {
  image: Error500Svg,
  imageAlt: "Server Error",
  message: "Something went wrong on our end. Please try again later.",
};

export default function ErrorPage() {
  const error = useRouteError() as RouteError;

  const isPageNotFoundError = error?.status === 404;

  const data = isPageNotFoundError ? dataPageNotFound : dataServerError;

  return (
    <FullScreenContainer className="flex-col">
      <img className="w-full sm:w-1/2" src={data.image} alt={data.imageAlt} />
      <p className="mt-2 sm:text-lg lg:text-xl text-center">{data.message}</p>
    </FullScreenContainer>
  );
}
