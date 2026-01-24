// components/Grid.tsx
import type {FC, HTMLAttributes} from "react";

interface GridProps extends HTMLAttributes<HTMLDivElement | HTMLFormElement> {
  direction?: "rows" | "cols";
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  num?: 1 | 2 | 3 | 4 | 6 | 12;
}

const Grid: FC<GridProps> = ({
  direction = "rows",
  gap = 4,
  num = 1,
  className = "",
  ...props
}) => {
  const baseClass = "w-full grid";
  const flowClass = direction === "cols" ? "grid-flow-col" : "grid-flow-row";

  const gapMap = {
    0: "gap-0",
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    7: "gap-7",
    8: "gap-8",
  };

  const templateMap = {
    1: direction === "cols" ? "grid-cols-1" : "grid-rows-1",
    2: direction === "cols" ? "grid-cols-2" : "grid-rows-2",
    3: direction === "cols" ? "grid-cols-3" : "grid-rows-3",
    4: direction === "cols" ? "grid-cols-4" : "grid-rows-4",
    6: direction === "cols" ? "grid-cols-6" : "grid-rows-6",
    12: direction === "cols" ? "grid-cols-12" : "grid-rows-12",
  };

  const gapClass = gapMap[gap as keyof typeof gapMap] || "gap-4";
  const templateClass =
    templateMap[num as keyof typeof templateMap] || "grid-rows-1";

  const usedClassName =
    `${baseClass} ${flowClass} ${templateClass} ${gapClass} ${className}`.trim();

  return <div className={usedClassName} {...props} />;
};

export default Grid;
