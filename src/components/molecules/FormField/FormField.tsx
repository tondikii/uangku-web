import {Col, Input, Label} from "@/components/atoms";
import {camelToTitleCase} from "@/utils/formatter.utils";
import type {FC, InputHTMLAttributes} from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FormField: FC<FormFieldProps> = ({label, required = true, ...props}) => {
  const finalLabel = label || camelToTitleCase(props.name);

  const isOptional = !required;

  const placeholder =
    props.placeholder || `Enter the ${finalLabel.toLowerCase()}`;

  return (
    <Col className="w-full gap-1.5">
      <Label className="text-xs font-medium flex items-center gap-1">
        {finalLabel}
        {isOptional && (
          <span className="text-[10px] font-normal text-base-content/50">
            (optional)
          </span>
        )}
      </Label>

      <Input {...props} required={required} placeholder={placeholder} />
    </Col>
  );
};

export default FormField;
