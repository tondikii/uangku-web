import {useState} from "react";
import {format} from "date-fns";
import {
  ScreenEmpty,
  ScreenLoader,
  ScreenError,
  ScreenContainer,
  DateChanger,
  SummaryCard,
} from "@/features/app/components";
import {TransactionList} from "../components";
import {useFetchTransactions} from "../hooks";

const TransactionsPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formattedDate = format(selectedDate, "yyyy-MM-dd");

  const {data, summary, loading, error, success} =
    useFetchTransactions(formattedDate);

  const renderContent = () => {
    if (loading) return <ScreenLoader />;
    if (error) return <ScreenError errorMessage={error} />;
    if (success && data.length < 1)
      return <ScreenEmpty entityName="transaction" />;

    return <TransactionList data={data} />;
  };

  return (
    <ScreenContainer
      headerProps={{
        title: "TRANSACTIONS OVERVIEW",
        children: (
          <DateChanger value={selectedDate} setValue={setSelectedDate} />
        ),
      }}
      withAddButton
    >
      <SummaryCard data={summary} />

      {renderContent()}
    </ScreenContainer>
  );
};

export default TransactionsPage;
