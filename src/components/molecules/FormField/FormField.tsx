import {Col, Input, Label} from "@/components/atoms";
import {camelToTitleCase} from "@/utils/formatter.utils";
import type {FC, InputHTMLAttributes} from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FormField: FC<FormFieldProps> = ({...props}) => {
  const label = props?.label || camelToTitleCase(props.name);
  const placeholder = props?.placeholder || `Enter the ${label.toLowerCase()}`;

  return (
    <Col className="w-full gap-2">
      <Label>{label}</Label>
      <Input placeholder={placeholder} {...props} />
    </Col>
  );
};
export default FormField;
