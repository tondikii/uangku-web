import useMutation from "@/hooks/useMutation";
import {deleteWalletService} from "../services/wallet.services";
import {useNavigate} from "react-router";
import {getErrorMessage} from "@/utils/axios.utils";

const useDeleteWallet = (id: string) => {
  const navigate = useNavigate();
  const {mutate, loading, error} = useMutation(deleteWalletService);

  const handleDelete = async () => {
    try {
      await mutate(Number(id));
      navigate(-1);
    } catch (err) {
      console.error("Delete wallet failed:", err);
    }
  };

  return {
    handleDelete,
    loading,
    error: getErrorMessage(error),
  };
};

export default useDeleteWallet;
