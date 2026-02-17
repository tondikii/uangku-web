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
import {Button, Row} from "@/components/atoms";

type ReportTab = "expense" | "income";

export default function ReportPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeTab, setActiveTab] = useState<ReportTab>("expense");

  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;

  const {summary, breakdown, loading, error, success} = useFetchMonthlyReport(
    year,
    month,
  );

  const chartData = useMemo(() => {
    if (!breakdown) return [];

    const currentBreakdown = breakdown[activeTab];

    if (!currentBreakdown?.categories) return [];

    const mapped = currentBreakdown.categories.map((item, index) => ({
      name: item.categoryName,
      value: item.total,
      percentage: item.percentage,
      color: getCategoryColor(index),
    }));

    if (activeTab === "expense" && breakdown.expense.adminFee) {
      mapped.push({
        name: "Admin Fee",
        value: breakdown.expense.adminFee.total,
        percentage: breakdown.expense.adminFee.percentage,
        color: "hsl(0, 0%, 60%)",
      });
    }

    return mapped;
  }, [breakdown, activeTab]);

  const renderContent = () => {
    if (loading) return <ScreenLoader />;
    if (error) return <ScreenError errorMessage={error} />;
    if (success && chartData.length < 1)
      return <ScreenEmpty entityName="report" />;

    return (
      <>
        <SummaryCard data={summary} />
        <Row className="px-8 mt-4 self-center" gap={1}>
          <Button
            outline={activeTab === "income"}
            onClick={() => setActiveTab("expense")}
          >
            Expense
          </Button>
          <Button
            outline={activeTab === "expense"}
            onClick={() => setActiveTab("income")}
          >
            Income
          </Button>
        </Row>

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
