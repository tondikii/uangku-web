import type {FC, SelectHTMLAttributes} from "react";

interface Option {
  name: string;
  id: number;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  options: Option[];
}

const Select: FC<SelectProps> = ({className = "", options, ...props}) => {
  return (
    <select
      className={`w-full select select-primary text-base-content/75 font-medium !placeholder:text-xs ${className}`}
      required={props?.required === undefined ? true : props.required}
      defaultValue={0}
      {...props}
    >
      <option disabled={true} value={0}>
        Select your {props.name}
      </option>
      {options.map((e) => (
        <option value={e.id}>{e.name}</option>
      ))}
    </select>
  );
};
export default Select;
