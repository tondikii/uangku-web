import {useRouteError} from "react-router";
import Error404Svg from "@/assets/error_404.svg";
import Error500Svg from "@/assets/error_500.svg";
import {FullScreenContainer} from "@/components/molecules";
import {Image, Text} from "@/components/atoms";

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
      <Image className="w-xs" src={data.image} alt={data.imageAlt} />
      <Text className="mt-2" size="sm">
        {data.message}
      </Text>
    </FullScreenContainer>
  );
}
