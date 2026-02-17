import type {FC} from "react";
import {format, addDays, subDays, addMonths, subMonths, parse} from "date-fns";
import {Button, Icon, Row} from "@/components/atoms";

interface DateChangerProps {
  type?: "date" | "month";
  value: Date;
  setValue: (date: Date) => void;
}

const DateChanger: FC<DateChangerProps> = ({
  type = "date",
  value,
  setValue,
}) => {
  const inputFormat = type === "date" ? "yyyy-MM-dd" : "yyyy-MM";

  const changer = (direction: "prev" | "next") => {
    if (type === "date") {
      setValue(direction === "prev" ? subDays(value, 1) : addDays(value, 1));
    } else {
      setValue(
        direction === "prev" ? subMonths(value, 1) : addMonths(value, 1),
      );
    }
  };

  const handleInputChange = (params: string) => {
    if (!params) return;

    if (type === "month") {
      const date = parse(params, "yyyy-MM", new Date());
      setValue(date);
    } else {
      setValue(new Date(params));
    }
  };

  return (
    <Row className="flex items-center" gap={1}>
      <Button
        onClick={() => changer("prev")}
        className="btn btn-ghost btn-xs p-0 text-base-content/60"
      >
        <Icon name="chevron-left" size={14} />
      </Button>

      <input
        type={type}
        value={format(value, inputFormat)}
        onChange={(e) => handleInputChange(e.target.value)}
        className="input input-xs input-ghost text-center font-semibold w-2/5"
      />

      <Button
        onClick={() => changer("next")}
        className="btn btn-ghost btn-xs p-0 text-base-content/60"
      >
        <Icon name="chevron-right" size={14} />
      </Button>
    </Row>
  );
};

export default DateChanger;
