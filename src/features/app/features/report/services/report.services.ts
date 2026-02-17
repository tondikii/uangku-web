import {api} from "@/lib/axios";

export interface GetMonthlyReportResponse {
  period: {
    year: number;
    month: number;
    startDate: string;
    endDate: string;
  };
  summary: {
    income: number;
    expense: number;
    balance: number;
  };
  breakdown: {
    expense: {
      categories: {
        categoryId: number;
        categoryName: string;
        iconName: string;
        total: number;
        percentage: number;
      }[];
      adminFee: {
        total: number;
        percentage: number;
      };
    };
    income: {
      categories: {
        categoryId: number;
        categoryName: string;
        iconName: string;
        total: number;
        percentage: number;
      }[];
    };
  };
}

export async function getMonthlyReportService(
  params: {year: number; month: number},
  signal?: AbortSignal,
): Promise<GetMonthlyReportResponse> {
  const {data} = await api.get<GetMonthlyReportResponse>("/reports/monthly", {
    params,
    signal,
  });

  return data;
}
