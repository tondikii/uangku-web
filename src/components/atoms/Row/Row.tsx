import type {FC, HTMLAttributes} from "react";

interface ColProps extends HTMLAttributes<HTMLDivElement> {
  gap?: number;
}

const Col: FC<ColProps> = ({className = "", gap = 0, ...props}) => {
  const initialClass = "flex flex-row";

  const gapClass = gap > 0 ? `gap-${gap}` : "";

  const finalClass = [initialClass, gapClass, className].join(" ").trim();

  return <div className={finalClass} {...props} />;
};

export default Col;
