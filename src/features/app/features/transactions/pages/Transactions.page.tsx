import {useFetchTransactions} from "../hooks";
import {
  ScreenEmpty,
  ScreenLoader,
  ScreenError,
  ScreenContainer,
} from "@/features/app/components";
import {TransactionList} from "../components";

const TransactionsPage = () => {
  const {data, loading, error, success} = useFetchTransactions();

  const renderContent = () => {
    if (loading) {
      return <ScreenLoader />;
    }
    if (success && data.length < 1) {
      return <ScreenEmpty entityName="transaction" />;
    }
    if (error) {
      return <ScreenError errorMessage={error} />;
    }
    return <TransactionList data={data} />;
  };

  return (
    <ScreenContainer
      headerProps={{
        title: "TRANSACTIONS OVERVIEW",
      }}
      withAddButton
    >
      {renderContent()}
    </ScreenContainer>
  );
};

export default TransactionsPage;
