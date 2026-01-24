import {useCallback} from "react";
import {getWalletService} from "../services/wallet.services";
import {useFetch} from "@/hooks";

const useFetchWallet = (id?: string) => {
  // 1. Stabilkan ID. Jika id undefined/null, buat jadi null.
  const walletId = id ? Number(id) : null;

  // 2. Gunakan walletId sebagai dependency agar fungsi service tidak berubah
  // kecuali ID-nya memang berubah.
  const service = useCallback(
    (signal?: AbortSignal) => {
      return getWalletService(walletId as number, signal);
    },
    [walletId],
  );

  // 3. Gunakan LOGIKA PREVENT:
  // Jika !walletId (id tidak ada), maka prevent = true (jangan fetch).
  const fetched = useFetch(service, !walletId);

  return {
    data: fetched.data?.data,
    loading: fetched.loading,
    error: fetched.error,
    refetch: fetched.refetch,
  };
};

export default useFetchWallet;
