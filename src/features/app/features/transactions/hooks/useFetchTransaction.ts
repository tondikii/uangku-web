import {useCallback} from "react";
import {useFetch} from "@/hooks";
import {getTransactionService} from "../services/transaction.services";

const useFetchTransaction = (id?: string) => {
  const transactionId = id ? Number(id) : null;

  const service = useCallback(
    (signal?: AbortSignal) => {
      return getTransactionService(transactionId as number, signal);
    },
    [transactionId],
  );

  const fetched = useFetch(service, !transactionId);

  return {
    data: fetched.data?.data,
    loading: fetched.loading,
    error: fetched.error,
    refetch: fetched.refetch,
  };
};

export default useFetchTransaction;
