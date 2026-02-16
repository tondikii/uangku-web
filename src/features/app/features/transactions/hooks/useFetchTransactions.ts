import {useMemo} from "react";
import useFetch from "@/hooks/useFetch";
import {getTransactionsService} from "../services/transaction.services";
import {getErrorMessage} from "@/utils/axios.utils";
import type {GetTransactionsResponse} from "../types/transaction.types";

const useFetchTransactions = (date: string) => {
  const service = useMemo(() => {
    return (signal?: AbortSignal) => getTransactionsService({date}, signal);
  }, [date]);

  const fetched = useFetch<GetTransactionsResponse>(service);

  const transactions = fetched.data?.data?.data ?? [];

  const summary = fetched.data?.data?.summary ?? {
    income: 0,
    expense: 0,
    balance: 0,
  };

  return {
    data: transactions,
    summary,
    loading: fetched.loading,
    error: getErrorMessage(fetched.error),
    refetch: fetched.refetch,
    success: fetched.data?.success ?? false,
  };
};

export default useFetchTransactions;
