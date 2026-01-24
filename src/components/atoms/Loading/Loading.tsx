import type {FC} from "react";

interface LoadingProps {
  type?: "spinner" | "dots" | "ring" | "ball" | "bars" | "infinity";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const Loading: FC<LoadingProps> = ({
  type = "spinner",
  size = "md",
  className = "",
}) => {
  const typeClasses = {
    spinner: "loading-spinner",
    dots: "loading-dots",
    ring: "loading-ring",
    ball: "loading-ball",
    bars: "loading-bars",
    infinity: "loading-infinity",
  };

  const sizeClasses = {
    xs: "loading-xs",
    sm: "loading-sm",
    md: "loading-md",
    lg: "loading-lg",
    xl: "loading-xl",
  };

  const finalClass = `loading ${typeClasses[type]} ${sizeClasses[size]} ${className}`;

  return <span className={finalClass} />;
};

export default Loading;
