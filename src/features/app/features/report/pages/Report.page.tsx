"use client";

import {useState, useMemo} from "react";
import {
  ScreenContainer,
  ScreenLoader,
  ScreenError,
  ScreenEmpty,
  SummaryCard,
  DateChanger,
} from "@/features/app/components";
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

  const renderContent = () => {
    if (loading) return <ScreenLoader />;
    if (error) return <ScreenError errorMessage={error} />;
    if (success && chartData.length < 1)
      return <ScreenEmpty entityName="report" />;

    return (
      <>
        <SummaryCard data={summary} />
        <ReportChart data={chartData} />
      </>
    );
  };

  return (
    <ScreenContainer
      headerProps={{
        title: "REPORT OVERVIEW",
        children: (
          <DateChanger
            type="month"
            value={selectedDate}
            setValue={setSelectedDate}
          />
        ),
      }}
    >
      {renderContent()}
    </ScreenContainer>
  );
}
