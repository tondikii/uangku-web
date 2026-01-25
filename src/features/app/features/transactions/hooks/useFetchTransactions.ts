import useFetch from "@/hooks/useFetch";
import {getTransactionsService} from "../services/transaction.services";
import {getErrorMessage} from "@/utils/axios.utils";

const useFetchTransactions = () => {
  const fetched = useFetch(getTransactionsService);

  const data = fetched.data?.data?.data || [];

  return {
    data,
    loading: fetched.loading,
    error: getErrorMessage(fetched.error),
    refetch: fetched.refetch,
    success: fetched?.data?.success,
  };
};

export default useFetchTransactions;
