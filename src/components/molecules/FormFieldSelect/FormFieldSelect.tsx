import {Col, Label, Select} from "@/components/atoms";
import {camelToTitleCase} from "@/utils/formatter.utils";
import type {FC} from "react";
import type {SelectHTMLAttributes} from "react";

interface Option {
  name: string;
  id: number;
}

interface FormFieldSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
  name: string;
}

const FormFieldSelect: FC<FormFieldSelectProps> = ({
  label,
  name,
  options,
  ...props
}) => {
  const computedLabel = label || camelToTitleCase(name);

  return (
    <Col className="w-full gap-2">
      <Label>{computedLabel}</Label>
      <Select name={name} label={label} options={options} {...props} />
    </Col>
  );
};

export default FormFieldSelect;
