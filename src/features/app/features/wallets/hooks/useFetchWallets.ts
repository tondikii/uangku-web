import useFetch from "@/hooks/useFetch";
import {getWalletsService} from "../services/wallet.services";
import {getErrorMessage} from "@/utils/axios.utils";

const useFetchWallets = () => {
  const fetched = useFetch(getWalletsService);

  const data = fetched.data?.data || [];

  return {
    data,
    loading: fetched.loading,
    error: getErrorMessage(fetched.error),
    refetch: fetched.refetch,
    success: fetched?.data?.success,
  };
};

export default useFetchWallets;
