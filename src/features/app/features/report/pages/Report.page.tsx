"use client";

import {useState, useMemo} from "react";
import {
  ScreenContainer,
  ScreenLoader,
  ScreenError,
  ScreenEmpty,
} from "@/features/app/components";
import {Grid, Col, Text, Button, Row, Icon} from "@/components/atoms";
import {formatIdr} from "@/utils/formatter.utils";
import {ReportChart} from "../components";
import useFetchMonthlyReport from "../hooks/useFetchMonthlyReport";
import {getCategoryColor} from "@/utils/color.utils";

export default function ReportPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;

  const {summary, breakdown, loading, error, success} = useFetchMonthlyReport(
    year,
    month,
  );

  const chartData = useMemo(() => {
    if (!breakdown?.categories) return [];

    const mapped = breakdown.categories.map((item, index) => ({
      name: item.categoryName,
      value: item.total,
      percentage: item.percentage,
      color: getCategoryColor(index),
    }));

    if (breakdown.adminFee) {
      mapped.push({
        name: "Admin Fee",
        value: breakdown.adminFee.total,
        percentage: breakdown.adminFee.percentage,
        color: "hsl(0, 0%, 60%)",
      });
    }

    return mapped;
  }, [breakdown]);

  const changeMonth = (direction: "prev" | "next") => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + (direction === "prev" ? -1 : 1));
    setSelectedDate(newDate);
  };

  const handleMonthChange = (value: string) => {
    const [y, m] = value.split("-");
    setSelectedDate(new Date(Number(y), Number(m) - 1));
  };

  const renderContent = () => {
    if (loading) return <ScreenLoader />;
    if (error) return <ScreenError errorMessage={error} />;
    if (success && chartData.length < 1)
      return <ScreenEmpty entityName="report data" />;

    return (
      <>
        {/* Summary */}
        <div className="card bg-base-100 shadow-sm m-4 rounded-lg">
          <div className="card-body">
            <Grid direction="cols" num={3}>
              <Col className="items-center">
                <Text size="10px" color="base-60">
                  Income
                </Text>
                <Text weight="semibold">+ {formatIdr(summary.income)}</Text>
              </Col>

              <Col className="items-center">
                <Text size="10px" color="base-60">
                  Expense
                </Text>
                <Text weight="semibold">- {formatIdr(summary.expense)}</Text>
              </Col>

              <Col className="items-center">
                <Text size="10px" color="base-60">
                  Balance
                </Text>
                <Text
                  weight="semibold"
                  className={
                    summary.balance >= 0 ? "text-base/75" : "text-error"
                  }
                >
                  {summary.balance > 0 ? "+ " : summary.balance < 0 ? "- " : ""}
                  {formatIdr(Math.abs(summary.balance))}
                </Text>
              </Col>
            </Grid>
          </div>
        </div>

        <ReportChart data={chartData} />
      </>
    );
  };

  return (
    <ScreenContainer
      headerProps={{
        title: "REPORT OVERVIEW",
        children: (
          <Row className="items-center" gap={2}>
            <Button
              onClick={() => changeMonth("prev")}
              className="btn btn-ghost btn-xs p-0 text-base-content/60"
            >
              <Icon name="chevron-left" size={14} />
            </Button>

            <input
              type="month"
              value={`${year}-${String(month).padStart(2, "0")}`}
              onChange={(e) => handleMonthChange(e.target.value)}
              className="input input-xs input-ghost text-center font-semibold w-1/3"
            />

            <Button
              onClick={() => changeMonth("next")}
              className="btn btn-ghost btn-xs p-0 text-base-content/60"
            >
              <Icon name="chevron-right" size={14} />
            </Button>
          </Row>
        ),
      }}
    >
      {renderContent()}
    </ScreenContainer>
  );
}
