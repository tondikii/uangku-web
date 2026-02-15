import type {FC, HTMLAttributes} from "react";

export interface ColProps extends HTMLAttributes<HTMLDivElement> {
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12;
}

const Col: FC<ColProps> = ({className = "", gap = 0, ...props}) => {
  const gapMap = {
    0: "",
    1: "gap-1",
    2: "gap-2",
    3: "gap-3",
    4: "gap-4",
    5: "gap-5",
    6: "gap-6",
    8: "gap-8",
    10: "gap-10",
    12: "gap-12",
  };

  const initialClass = "flex flex-col";
  const gapClass = gapMap[gap as keyof typeof gapMap] || "";

  const finalClass = `${initialClass} ${gapClass} ${className}`
    .replace(/\s+/g, " ")
    .trim();

  return <div className={finalClass} {...props} />;
};

export default Col;
