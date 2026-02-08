import type {FC} from "react";
import * as FA6Icons from "react-icons/fa6";
import type {IconType} from "react-icons";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  onClick?: () => void;
}

const Icon: FC<IconProps> = ({name, size = 24, ...props}) => {
  const formatIconName = (): keyof typeof FA6Icons => {
    return ("Fa" +
      name
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join("")) as keyof typeof FA6Icons;
  };

  const iconName = formatIconName();
  const IconComponent = FA6Icons[iconName] as IconType | undefined;

  if (IconComponent) {
    return <IconComponent size={size} {...props} />;
  }

  return <FA6Icons.FaQuestion size={size} {...props} />;
};

export default Icon;
