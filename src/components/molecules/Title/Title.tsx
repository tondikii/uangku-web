import {Text} from "@/components/atoms";
import type {TextProps} from "@/components/atoms/Text/Text";
import type {FC} from "react";

const Title: FC<TextProps> = ({...props}) => {
  return (
    <Text
      size="md"
      className={`font-bold ${props.className || ""}`}
      {...props}
    />
  );
};
export default Title;
