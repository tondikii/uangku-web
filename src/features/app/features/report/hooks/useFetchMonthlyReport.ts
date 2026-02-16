import {useMemo} from "react";
import useFetch from "@/hooks/useFetch";
import {getErrorMessage} from "@/utils/axios.utils";
import {
  getMonthlyReportService,
  type GetMonthlyReportResponse,
} from "../services/report.services";

const useFetchMonthlyReport = (year: number, month: number) => {
  const service = useMemo(() => {
    return (signal?: AbortSignal) =>
      getMonthlyReportService({year, month}, signal);
  }, [year, month]);

  const fetched = useFetch<GetMonthlyReportResponse>(service);

  return {
    data: fetched.data,
    summary: fetched.data?.summary ?? {
      income: 0,
      expense: 0,
      balance: 0,
    },
    breakdown: fetched.data?.breakdown,
    loading: fetched.loading,
    error: getErrorMessage(fetched.error),
    success: !!fetched.data,
    refetch: fetched.refetch,
  };
};

export default useFetchMonthlyReport;
