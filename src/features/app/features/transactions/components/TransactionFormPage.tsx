import {ScreenContainer} from "@/features/app/components";
import {useEffect, useState, type FC, type FormEvent} from "react";
import {Button, Form, Icon, Row, Select, Text} from "@/components/atoms";
import {FormField} from "@/components/molecules";
import {formatIdr} from "@/utils/formatter.utils";
import {useFetchWallets} from "../../wallets/hooks";
import {useMutation} from "@/hooks";
import type {
  MutationTransactionResponse,
  TransactionFormType,
  TransactionMutationParams,
} from "../types/transaction.types";
import {
  createTransactionService,
  deleteTransactionService,
  editTransactionService,
} from "../services/transaction.services";
import {getErrorMessage} from "@/utils/axios.utils";
import {useNavigate} from "react-router";
import {TransactionCategories} from "../components";
import {useFetchTransaction} from "../hooks";

interface TransactionFormPageProps {
  id?: string;
}

const TransactionFormPage: FC<TransactionFormPageProps> = ({id}) => {
  const title = id ? "EDIT" : "CREATE";
  const navigate = useNavigate();
  const [transactionForm, setTransactionForm] = useState<TransactionFormType>({
    transactionTypeId: 1,
    transactionCategoryId: 0,
    walletId: 0,
    amount: 0,
  });

  const {transactionTypeId, transactionCategoryId, walletId, amount} =
    transactionForm;
  const displayAmount = amount > 0 ? formatIdr(amount) : "";
  const disabledSubmit = !amount || !walletId;

  const {data} = useFetchTransaction(id);
  const fetchedWallets = useFetchWallets();

  const {
    mutate: mutateTransaction,
    loading: mutateLoading,
    error: mutateError,
  } = useMutation<MutationTransactionResponse, TransactionMutationParams>(
    async (params) => {
      if (data?.id) {
        return editTransactionService(
          params as {id: number} & TransactionFormType,
        );
      }
      return createTransactionService(params);
    },
  );
  const mutateErrorMessage = getErrorMessage(mutateError);

  const {
    mutate: deleteTransaction,
    loading: deleteLoading,
    error: deleteError,
  } = useMutation(deleteTransactionService);
  const deleteErrorMessage = getErrorMessage(deleteError);

  const handleDelete = async () => {
    try {
      await deleteTransaction(Number(id));
      navigate(-1);
    } catch (err) {
      console.error("Delete wallet failed:", err);
    }
  };

  const handleClickTab = (id: number) => {
    setTransactionForm({
      ...transactionForm,
      transactionTypeId: id,
      transactionCategoryId: 0,
    });
  };

  const handleClickCategory = (id: number) => {
    setTransactionForm({
      ...transactionForm,
      transactionCategoryId: id,
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const {name, value} = e.target;

    if (name === "wallet") {
      setTransactionForm({...transactionForm, walletId: Number(value)});
    } else {
      const rawValue = value.replace(/\D/g, "");
      setTransactionForm({...transactionForm, amount: Number(rawValue)});
    }
  };

  const submitTransaction = async () => {
    try {
      const res = await mutateTransaction({
        ...transactionForm,
        ...(data?.id ? {id: data?.id} : {}),
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
    if (disabledSubmit) return;
    await submitTransaction();
  };

  useEffect(() => {
    if (data?.id) {
      setTransactionForm({
        transactionTypeId: data.transactionType.id,
        transactionCategoryId: data.transactionCategory.id,
        walletId: data.transactionWallets[0].id,
        amount: data.amount,
      });
    }
  }, [data]);

  return (
    <ScreenContainer
      headerProps={{
        title: `${title} TRANSACTION`,
        withGoBack: true,
      }}
      className="items-center"
    >
      <TransactionCategories
        transactionTypeId={transactionTypeId}
        transactionCategoryId={transactionCategoryId}
        handleClickTab={handleClickTab}
        handleClickCategory={handleClickCategory}
      />

      {transactionCategoryId ? (
        <Form className="p-4" onSubmit={handleSubmit}>
          <Select
            name="wallet"
            options={fetchedWallets.data}
            onChange={handleChange}
          />
          <FormField
            placeholder="Rp 100.000"
            value={displayAmount}
            onChange={handleChange}
            required={false}
          />
          <Row className="gap-2 w-full justify-end">
            {id ? (
              <Button
                color="secondary"
                onClick={handleDelete}
                loading={deleteLoading}
              >
                <Icon name="trash-can" size={14} />
              </Button>
            ) : null}
            <Button loading={mutateLoading} disabled={disabledSubmit}>
              Save
            </Button>
          </Row>
          {mutateErrorMessage && (
            <Text className="text-red-500">{mutateErrorMessage}</Text>
          )}
          {deleteErrorMessage && (
            <Text className="text-red-500">{deleteErrorMessage}</Text>
          )}
        </Form>
      ) : null}
    </ScreenContainer>
  );
};

export default TransactionFormPage;
