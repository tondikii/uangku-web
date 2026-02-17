import {ScreenContainer} from "@/features/app/components";
import {useEffect, useState, type FC, type FormEvent} from "react";
import {Button, Form, Icon, Row, Text} from "@/components/atoms";
import {FormField, FormFieldSelect} from "@/components/molecules";
import {formatDate, formatIdr} from "@/utils/formatter.utils";
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

const TRANSFER_TYPE_ID = 3;

const TransactionFormPage: FC<TransactionFormPageProps> = ({id}) => {
  const title = id ? "EDIT" : "CREATE";
  const navigate = useNavigate();

  const [transactionForm, setTransactionForm] = useState<TransactionFormType>({
    transactionTypeId: 1,
    transactionCategoryId: 0,
    walletId: 0,
    targetWalletId: 0,
    amount: 0,
    adminFee: 0,
    createdAt: new Date(),
  });

  const {
    transactionTypeId,
    transactionCategoryId,
    walletId,
    targetWalletId,
    amount,
    adminFee,
    createdAt,
  } = transactionForm;

  const isTransfer = transactionTypeId === TRANSFER_TYPE_ID;

  const displayAmount = amount > 0 ? formatIdr(amount) : "";
  const displayAdminFee = adminFee ? formatIdr(adminFee) : "";

  const disabledSubmit =
    !amount ||
    !walletId ||
    (isTransfer && (!targetWalletId || walletId === targetWalletId));

  const {data} = useFetchTransaction(id);
  const fetchedWallets = useFetchWallets();

  const walletOptions = fetchedWallets.data || [];
  const targetWalletOptions = walletOptions.filter((w) => w.id !== walletId);

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

  const {
    mutate: deleteTransaction,
    loading: deleteLoading,
    error: deleteError,
  } = useMutation(deleteTransactionService);

  const handleDelete = async () => {
    await deleteTransaction(Number(id));
    navigate(-1);
  };

  const handleClickTab = (id: number) => {
    setTransactionForm({
      ...transactionForm,
      transactionTypeId: id,
      transactionCategoryId: 0,
      targetWalletId: 0,
      adminFee: 0,
    });
  };

  const handleClickCategory = (id: number) => {
    setTransactionForm({...transactionForm, transactionCategoryId: id});
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const {name, value, type} = e.target;

    if (type === "date") {
      setTransactionForm({...transactionForm, [name]: new Date(value)});
      return;
    }

    if (name === "walletId" || name === "targetWalletId") {
      setTransactionForm({...transactionForm, [name]: Number(value)});
      return;
    }

    const rawValue = value.replace(/\D/g, "");
    setTransactionForm({...transactionForm, [name]: Number(rawValue)});
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (disabledSubmit) return;

    await mutateTransaction({
      ...transactionForm,
      ...(data?.id ? {id: data.id} : {}),
    });

    navigate(-1);
  };

  useEffect(() => {
    if (!data?.id) return;

    const sourceWallet = data.transactionWallets.find(
      (w) => !w.isIncoming,
    )?.wallet;
    const targetWallet = data.transactionWallets.find(
      (w) => w.isIncoming,
    )?.wallet;

    setTransactionForm({
      transactionTypeId: data.transactionType.id,
      transactionCategoryId: data.transactionCategory.id,
      walletId: (isTransfer ? sourceWallet?.id : targetWallet?.id) || 0,
      targetWalletId: targetWallet?.id || 0,
      amount: data.amount,
      adminFee: data.adminFee || 0,
      createdAt: new Date(data.createdAt),
    });
  }, [data, isTransfer]);

  return (
    <ScreenContainer
      headerProps={{
        title: `${title} TRANSACTION`,
        withGoBack: true,
      }}
      className="items-center overflow-auto"
    >
      <TransactionCategories
        transactionTypeId={transactionTypeId}
        transactionCategoryId={transactionCategoryId}
        handleClickTab={handleClickTab}
        handleClickCategory={handleClickCategory}
      />

      {transactionCategoryId ? (
        <Form className="p-4 gap-4" onSubmit={handleSubmit}>
          <FormFieldSelect
            name="walletId"
            label="Wallet"
            options={fetchedWallets.data}
            value={walletId}
            onChange={handleChange}
          />

          {isTransfer && (
            <FormFieldSelect
              name="targetWalletId"
              label="Target Wallet"
              options={targetWalletOptions}
              onChange={handleChange}
              value={targetWalletId}
            />
          )}

          <FormField
            name="amount"
            placeholder="Rp 100.000"
            value={displayAmount}
            onChange={handleChange}
          />

          {isTransfer && (
            <FormField
              name="adminFee"
              placeholder="Rp 0"
              value={displayAdminFee}
              onChange={handleChange}
              required={false}
            />
          )}

          <FormField
            name="createdAt"
            type="date"
            value={formatDate(createdAt)}
            onChange={handleChange}
          />

          <Row className="gap-2 w-full justify-end">
            {id && (
              <Button
                color="secondary"
                onClick={handleDelete}
                loading={deleteLoading}
              >
                <Icon name="trash-can" size={12} />
              </Button>
            )}
            <Button loading={mutateLoading} disabled={disabledSubmit}>
              Save
            </Button>
          </Row>

          {mutateError && (
            <Text className="text-red-500">{getErrorMessage(mutateError)}</Text>
          )}
          {deleteError && (
            <Text className="text-red-500">{getErrorMessage(deleteError)}</Text>
          )}
        </Form>
      ) : null}
    </ScreenContainer>
  );
};

export default TransactionFormPage;
