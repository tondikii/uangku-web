import type {FC, HTMLAttributes} from "react";

interface GridProps extends HTMLAttributes<HTMLDivElement | HTMLFormElement> {
  direction?: "rows" | "cols";
  gap?: number;
  num?: 1 | 2 | 3 | 4 | 6 | 12;
  isForm?: boolean;
}

const Grid: FC<GridProps> = ({
  direction = "rows",
  gap = 4,
  num = 1,
  isForm = false,
  className = "",
  ...props
}) => {
  const usedClassName = `w-full grid grid-${direction}-${num} gap-${gap} ${className}`;

  if (isForm) {
    return <form className={usedClassName} {...props} />;
  }

  return <div className={usedClassName} {...props} />;
};
export default Grid;
