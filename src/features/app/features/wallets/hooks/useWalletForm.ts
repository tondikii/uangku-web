import {useEffect, useState, type FormEvent} from "react";
import type {
  MutationWalletResponse,
  WalletFormType,
  WalletMutationParams,
} from "../types/wallet.types";
import useMutation from "@/hooks/useMutation";
import {
  createWalletService,
  editWalletService,
} from "../services/wallet.services";
import {useNavigate} from "react-router";
import {getErrorMessage} from "@/utils/axios.utils";
import type {Wallet} from "@/types/wallet.types";

const useWalletForm = (data?: Wallet) => {
  const navigate = useNavigate();

  const [walletForm, setWalletForm] = useState<WalletFormType>({
    name: data?.name || "",
    balance: data?.balance || 0,
  });

  useEffect(() => {
    if (data?.id) {
      setWalletForm({
        name: data.name,
        balance: data.balance,
      });
    }
  }, [data]);

  const {
    mutate: mutateWallet,
    loading: mutateLoading,
    error: mutateError,
  } = useMutation<MutationWalletResponse, WalletMutationParams>(
    async (params) => {
      if (data) {
        return editWalletService(params as {id: number} & WalletFormType);
      }
      return createWalletService(params);
    },
  );

  const disabledSubmit = !walletForm.name || walletForm.balance < 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    if (name === "balance") {
      const rawValue = value.replace(/\D/g, "");
      setWalletForm((prev) => ({...prev, [name]: Number(rawValue)}));
    } else {
      setWalletForm((prev) => ({...prev, [name]: value}));
    }
  };

  const submitWallet = async () => {
    try {
      const res = await mutateWallet({
        ...walletForm,
        ...(data ? {id: data.id} : {}),
      });
      if (res?.data?.id) {
        navigate(-1);
      }
      return res;
    } catch (err) {
      console.error("Save wallet failed:", err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!walletForm.name || walletForm.balance < 0) return;
    await submitWallet();
  };

  return {
    walletForm,
    handleChange,
    handleSubmit,
    loading: mutateLoading,
    error: getErrorMessage(mutateError),
    disabledSubmit,
  };
};

export default useWalletForm;
