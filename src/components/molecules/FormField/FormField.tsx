import {Grid, Input, Label} from "@/components/atoms";
import {camelToTitleCase} from "@/utils/formatters.util";
import type {FC, InputHTMLAttributes} from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const FormField: FC<FormFieldProps> = ({...props}) => {
  const label = props?.label || camelToTitleCase(props.name);
  const placeholder = props?.placeholder || label.toLowerCase();

  return (
    <Grid gap={2}>
      <Label>{label}</Label>
      <Input placeholder={placeholder} {...props} />
    </Grid>
  );
};
export default FormField;
