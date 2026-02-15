import type {FC, SelectHTMLAttributes} from "react";

interface Option {
  name: string;
  id: number;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  name: string;
  label?: string;
  options: Option[];
}

const Select: FC<SelectProps> = ({className = "", options, ...props}) => {
  return (
    <select
      className={`
        w-full
        select select-primary
        select-sm
        text-xs
        text-base-content/75
        font-medium
        placeholder:text-xs
        ${className}
      `}
      required={props.required ?? true}
      defaultValue={0}
      {...props}
    >
      <option disabled value={0}>
        Select your {(props.label || props.name).toLowerCase()}
      </option>

      {options.map((e) => (
        <option key={e.id} value={e.id}>
          {e.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
