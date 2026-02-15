import type {FC} from "react";
import {Button, Form, Icon, Row, Text} from "@/components/atoms";
import {ScreenContainer} from "@/features/app/components";
import {useDeleteWallet, useFetchWallet, useWalletForm} from "../hooks";
import {formatIdr} from "@/utils/formatter.utils";
import {FormField} from "@/components/molecules";

interface WalletFormPageProps {
  id?: string;
}

const WalletFormPage: FC<WalletFormPageProps> = ({id}) => {
  const title = id ? "EDIT" : "CREATE";

  const {data} = useFetchWallet(id);

  const {
    walletForm,
    handleChange,
    handleSubmit,
    loading,
    error,
    disabledSubmit,
  } = useWalletForm(data);

  const {
    handleDelete,
    loading: deleteLoading,
    error: deleteError,
  } = useDeleteWallet(id || "");

  const displayBalance =
    walletForm.balance > 0 ? formatIdr(walletForm.balance) : "";

  return (
    <ScreenContainer
      headerProps={{
        title: `${title} WALLET`,
        withGoBack: true,
      }}
    >
      <Form className="p-4" onSubmit={handleSubmit}>
        <FormField
          name="name"
          label="Name"
          placeholder="Cash"
          value={walletForm.name}
          onChange={handleChange}
        />
        <FormField
          name="balance"
          label="Initial Balance"
          placeholder="Rp 100.000"
          value={displayBalance}
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
              <Icon name="trash-can" size={12} />
            </Button>
          ) : null}

          <Button loading={loading} disabled={disabledSubmit}>
            Save
          </Button>
        </Row>
        {error && <Text className="text-red-500">{error}</Text>}
        {deleteError && <Text className="text-red-500">{deleteError}</Text>}
      </Form>
    </ScreenContainer>
  );
};
export default WalletFormPage;
