import useFetch from "@/hooks/useFetch";
import {getWalletsService} from "../services/wallet.services";

const useFetchWallets = () => {
  const fetched = useFetch(getWalletsService);

  const data = fetched.data?.data || [];

  return {
    data,
    loading: fetched.loading,
    error: fetched.error,
    refetch: fetched.refetch,
  };
};

export default useFetchWallets;
