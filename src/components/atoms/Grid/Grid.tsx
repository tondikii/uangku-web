import type {FC, HTMLAttributes} from "react";

interface GridProps extends HTMLAttributes<HTMLDivElement> {
  direction?: "rows" | "cols";
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  num?: 1 | 2 | 3 | 4 | 5 | 6 | 12;
  center?: boolean;
}

const Grid: FC<GridProps> = ({
  direction = "cols",
  gap = 4,
  num = 1,
  center = false,
  className = "",
  ...props
}) => {
  // 1. Mapping yang aman untuk Tailwind Purge
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

  const colsMap = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    12: "grid-cols-12",
  };

  const rowsMap = {
    1: "grid-rows-1",
    2: "grid-rows-2",
    3: "grid-rows-3",
    4: "grid-rows-4",
    5: "grid-rows-5",
    6: "grid-rows-6",
    12: "grid-rows-12",
  };

  // 2. Logika penentuan class
  const baseClass = "grid";
  const gapClass = gapMap[gap];
  const centerClass = center ? "place-items-center" : "";

  // Jika direction 'cols', gunakan grid-cols-x. Jika 'rows', gunakan grid-rows-x.
  const templateClass = direction === "cols" ? colsMap[num] : rowsMap[num];

  // 3. Gabungkan semua
  const usedClassName = `
    ${baseClass} 
    ${templateClass} 
    ${gapClass} 
    ${centerClass} 
    ${className}
  `
    .replace(/\s+/g, " ")
    .trim();

  return <div className={usedClassName} {...props} />;
};

export default Grid;
