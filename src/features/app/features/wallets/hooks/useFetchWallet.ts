import {useCallback} from "react";
import {getWalletService} from "../services/wallet.services";
import {useFetch} from "@/hooks";

const useFetchWallet = (id?: string) => {
  const walletId = id ? Number(id) : null;

  const service = useCallback(
    (signal?: AbortSignal) => {
      return getWalletService(walletId as number, signal);
    },
    [walletId],
  );

  const fetched = useFetch(service, !walletId);

  return {
    data: fetched.data?.data,
    loading: fetched.loading,
    error: fetched.error,
    refetch: fetched.refetch,
  };
};

export default useFetchWallet;
